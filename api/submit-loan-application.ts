import type { IncomingMessage, ServerResponse } from 'http';

interface VercelRequest extends IncomingMessage {
  body: any;
  query: { [key: string]: string | string[] };
  cookies: { [key: string]: string };
  method?: string;
  headers: { [key: string]: string | string[] | undefined };
}

interface VercelResponse extends ServerResponse {
  status: (statusCode: number) => VercelResponse;
  json: (data: any) => VercelResponse;
  send: (body: any) => VercelResponse;
  setHeader: (name: string, value: string | number | readonly string[]) => this;
}

const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID || 'd1cwze7g';
const SANITY_DATASET = process.env.SANITY_DATASET || 'production';
const SANITY_API_VERSION = process.env.SANITY_API_VERSION || '2024-01-01';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).send('OK');
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Only POST is accepted.' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        return res.status(400).json({ error: 'Invalid JSON body.' });
      }
    }

    if (!body || typeof body !== 'object') {
      return res.status(400).json({ error: 'Request body cannot be empty.' });
    }

    const {
      fullName,
      phone,
      email,
      state,
      city,
      loanType,
      requestedAmount,
      tenureMonths,
      purpose,
      employmentType,
      ippisNumber,
      ministryDepartmentAgency,
      collateralDescription,
      agreedToTerms,
      applicationReference,
      submittedAt,
      kycDocuments,
    } = body;

    // Validate required fields
    if (!fullName || !phone || !loanType || requestedAmount === undefined || requestedAmount === null) {
      return res.status(400).json({
        error: 'Missing required application fields (Full Name, Phone, Loan Type, or Amount).',
      });
    }

    const token = process.env.SANITY_API_WRITE_TOKEN;
    if (!token) {
      console.error('[Sanity API] SANITY_API_WRITE_TOKEN is not defined in server environment.');
      return res.status(500).json({
        error: 'Server configuration error: Sanity write token is missing.',
      });
    }

    // Process & upload KYC documents if provided
    let kycDocReferences: Array<{
      _key: string;
      _type: 'file';
      asset: {
        _type: 'reference';
        _ref: string;
      };
    }> | undefined = undefined;

    if (kycDocuments !== undefined && kycDocuments !== null) {
      if (!Array.isArray(kycDocuments)) {
        return res.status(400).json({ error: 'kycDocuments must be an array.' });
      }

      if (kycDocuments.length > 4) {
        return res.status(400).json({ error: 'A maximum of 4 KYC documents is permitted.' });
      }

      const allowedExtensions = ['pdf', 'jpg', 'jpeg', 'png', 'webp'];
      const allowedMimeTypes = [
        'application/pdf',
        'image/jpeg',
        'image/png',
        'image/webp',
      ];
      const maxFileBytes = 10 * 1024 * 1024; // 10 MB per file limit

      kycDocReferences = [];

      for (let i = 0; i < kycDocuments.length; i++) {
        const docItem = kycDocuments[i];
        if (!docItem || typeof docItem !== 'object' || !docItem.name || !docItem.base64) {
          return res.status(400).json({
            error: `Malformed document upload at item ${i + 1}. Missing name or file data.`,
          });
        }

        const filename = String(docItem.name).trim();
        const ext = (filename.split('.').pop() || '').toLowerCase();
        const mimeType = (docItem.type || '').toLowerCase();

        if (!allowedExtensions.includes(ext)) {
          return res.status(400).json({
            error: `File "${filename}" has an unsupported format. Allowed formats: PDF, JPG, PNG, WEBP.`,
          });
        }

        if (mimeType && !allowedMimeTypes.includes(mimeType)) {
          return res.status(400).json({
            error: `File "${filename}" has an unsupported MIME type (${mimeType}). Allowed types: PDF, JPG, PNG, WEBP.`,
          });
        }

        const base64Data = String(docItem.base64).replace(/^data:[^;]+;base64,/, '');
        let fileBuffer: Buffer;
        try {
          fileBuffer = Buffer.from(base64Data, 'base64');
        } catch (e) {
          return res.status(400).json({
            error: `Failed to decode file content for "${filename}".`,
          });
        }

        if (fileBuffer.length === 0) {
          return res.status(400).json({
            error: `File "${filename}" is empty.`,
          });
        }

        if ((docItem.size && Number(docItem.size) > maxFileBytes) || fileBuffer.length > maxFileBytes) {
          return res.status(400).json({
            error: `File "${filename}" exceeds the maximum 10 MB limit.`,
          });
        }

        // Upload file asset to Sanity
        const safeFilename = encodeURIComponent(filename.replace(/[^a-zA-Z0-9._-]/g, '_'));
        const contentType = mimeType || (ext === 'pdf' ? 'application/pdf' : `image/${ext === 'jpg' ? 'jpeg' : ext}`);
        const assetUploadEndpoint = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/assets/files/${SANITY_DATASET}?filename=${safeFilename}`;

        const assetRes = await fetch(assetUploadEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': contentType,
            Authorization: `Bearer ${token}`,
          },
          body: fileBuffer as unknown as BodyInit,
        });

        const assetResult = await assetRes.json();
        if (!assetRes.ok || !assetResult.document?._id) {
          console.error('[Sanity API] Asset upload error:', assetResult);
          return res.status(assetRes.status || 500).json({
            error: assetResult.message || `Failed to upload KYC document "${filename}" to Sanity.`,
          });
        }

        kycDocReferences.push({
          _key: `kyc_${Date.now()}_${i}_${Math.random().toString(36).substring(2, 8)}`,
          _type: 'file',
          asset: {
            _type: 'reference',
            _ref: assetResult.document._id,
          },
        });
      }
    }

    const doc: any = {
      _type: 'loanApplication',
      applicationReference:
        applicationReference ||
        `SKL-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'new',
      submittedAt: submittedAt || new Date().toISOString(),
      source: 'website',
      loanProduct: {
        _type: 'reference',
        _ref: `loanProduct-${loanType}`,
      },
      fullName: String(fullName).trim(),
      phone: String(phone).trim(),
      email: email ? String(email).trim() : undefined,
      state: state || 'FCT Abuja',
      city: city ? String(city).trim() : undefined,
      loanType: loanType || 'ippis',
      requestedAmount: Number(requestedAmount) || 0,
      tenureMonths: Number(tenureMonths) || 12,
      purpose: purpose ? String(purpose).trim() : undefined,
      employmentType: employmentType || 'civil_servant',
      ippisNumber: ippisNumber ? String(ippisNumber).trim() : undefined,
      ministryDepartmentAgency: ministryDepartmentAgency
        ? String(ministryDepartmentAgency).trim()
        : undefined,
      collateralDescription: collateralDescription
        ? String(collateralDescription).trim()
        : undefined,
      agreedToTerms: Boolean(agreedToTerms),
    };

    if (kycDocReferences && kycDocReferences.length > 0) {
      doc.kycDocuments = kycDocReferences;
    }

    const sanityEndpoint = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/mutate/${SANITY_DATASET}?returnDocuments=true`;

    const sanityRes = await fetch(sanityEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        mutations: [{ create: doc }],
      }),
    });

    const result = await sanityRes.json();

    if (!sanityRes.ok) {
      console.error('[Sanity API] Mutation rejected by Sanity:', result);
      return res.status(sanityRes.status).json({
        error: result.message || 'Failed to record loan application in Sanity.',
      });
    }

    return res.status(200).json({
      success: true,
      reference: doc.applicationReference,
      documentId: result.results?.[0]?.document?._id,
      result,
    });
  } catch (error: any) {
    console.error('[Sanity API] Unexpected server exception:', error);
    return res.status(500).json({
      error: error.message || 'Internal server error while processing loan application.',
    });
  }
}
