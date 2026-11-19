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

const TRUSTED_PRODUCT_REQUIREMENTS: Record<string, string[]> = {
  ippis: [
    'Active IPPIS Number & recent payslips (last 3 months)',
    'Valid Federal MDA Staff ID Card & National ID (NIN/Voters/Passport)',
    'Duly completed SilverKuun loan application form',
    'Letter of Introduction from employer/MDA where required'
  ],
  collateral: [
    'Proof of asset ownership (Original Title Document / Vehicle Registration / Proof of Purchase)',
    'Valid government-issued identification (NIN, Drivers License, or International Passport)',
    'Proof of regular income or active business operations',
    'Physical inspection and valuation consent'
  ],
  business: [
    'CAC Business Registration documents (Certificate & Status Report)',
    '6 months active corporate bank statements',
    'Valid Director/Owner ID and BVN confirmation',
    'Brief description of business operations and loan utility'
  ],
  personal: [
    'Proof of regular employment or steady monthly income',
    '3 months stamped personal bank statements',
    'Valid national identification (NIN / Voter ID / Passport)',
    'Utility bill / proof of residential address'
  ]
};

function normalizeLoanCategory(loanType: string): string {
  const clean = String(loanType || '').toLowerCase().trim().replace(/-loan$/, '');
  if (clean.includes('ippis') || clean.includes('civil')) return 'ippis';
  if (clean.includes('collateral')) return 'collateral';
  if (clean.includes('business') || clean.includes('sme')) return 'business';
  if (clean.includes('personal') || clean.includes('emergency')) return 'personal';
  return clean;
}

async function getTrustedRequiredDocuments(loanType: string, token: string): Promise<string[]> {
  const normType = normalizeLoanCategory(loanType);
  try {
    const query = `*[_type == "loanProduct" && (category == "${normType}" || slug.current == "${loanType}" || _id == "${loanType}" || _id == "loanProduct-${normType}")][0]{ requiredDocuments, requirements }`;
    const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${encodeURIComponent(query)}`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      const json = await res.json();
      if (json.result) {
        if (Array.isArray(json.result.requiredDocuments) && json.result.requiredDocuments.length > 0) {
          const docs = json.result.requiredDocuments.filter((d: any) => typeof d === 'string' && d.trim().length > 0);
          if (docs.length > 0) return docs;
        }
        if (Array.isArray(json.result.requirements) && json.result.requirements.length > 0) {
          const docs = json.result.requirements.map((r: any) => (typeof r === 'string' ? r : r?.title || '')).filter(Boolean);
          if (docs.length > 0) return docs;
        }
      }
    }
  } catch (err) {
    console.warn('[Submit API] Failed to fetch product requirements from Sanity, using fallback:', err);
  }
  return TRUSTED_PRODUCT_REQUIREMENTS[normType] || [];
}

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
        success: false,
        error: 'Missing required application fields (Full Name, Phone, Loan Type, or Amount).',
      });
    }

    const token = process.env.SANITY_API_WRITE_TOKEN;
    if (!token) {
      console.error('[Sanity API] SANITY_API_WRITE_TOKEN is not defined in server environment.');
      return res.status(500).json({
        success: false,
        error: 'Server configuration error: Sanity write token is missing.',
      });
    }

    // Server-side validation of mandatory KYC documents
    const uploadedDocs = Array.isArray(kycDocuments) ? kycDocuments : [];
    if (uploadedDocs.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Supporting KYC documents are mandatory. Please upload all required documents before submitting.',
      });
    }

    const requiredDocs = await getTrustedRequiredDocuments(loanType, token);
    const requiredCount = requiredDocs.length;

    // Fail safely if requirements cannot be reliably established
    if (requiredCount === 0) {
      console.error(`[Sanity API] Unable to establish required KYC documents for loanType: "${loanType}"`);
      return res.status(500).json({
        success: false,
        error: 'Unable to establish mandatory KYC document requirements for the selected loan product. Please verify your loan selection or contact support.',
      });
    }

    if (uploadedDocs.length < requiredCount) {
      const missingCount = requiredCount - uploadedDocs.length;
      return res.status(400).json({
        success: false,
        error: `Please upload ${missingCount} more required document${missingCount > 1 ? 's' : ''} before submitting your application. (${uploadedDocs.length} of ${requiredCount} uploaded)`,
      });
    }

    if (uploadedDocs.length > 4) {
      return res.status(400).json({
        success: false,
        error: 'A maximum of 4 KYC documents is permitted.',
      });
    }

    // Process & upload KYC documents
    let kycDocReferences: Array<{
      _key: string;
      _type: 'file';
      asset: {
        _type: 'reference';
        _ref: string;
      };
    }> | undefined = undefined;

    if (uploadedDocs.length > 0) {
      const allowedExtensions = ['pdf', 'jpg', 'jpeg', 'png', 'webp'];
      const allowedMimeTypes = [
        'application/pdf',
        'image/jpeg',
        'image/png',
        'image/webp',
      ];
      const maxFileBytes = 10 * 1024 * 1024; // 10 MB per file limit

      // Pre-validate all documents before commencing uploads
      const preparedFiles: Array<{
        filename: string;
        contentType: string;
        fileBuffer: Buffer;
        index: number;
      }> = [];

      for (let i = 0; i < uploadedDocs.length; i++) {
        const docItem = uploadedDocs[i];
        if (!docItem || typeof docItem !== 'object' || !docItem.name || !docItem.base64) {
          return res.status(400).json({
            success: false,
            error: `Malformed document upload at item ${i + 1}. Missing name or file data.`,
          });
        }

        const filename = String(docItem.name).trim();
        const ext = (filename.split('.').pop() || '').toLowerCase();
        const mimeType = (docItem.type || '').toLowerCase();

        if (!allowedExtensions.includes(ext)) {
          return res.status(400).json({
            success: false,
            error: `File "${filename}" has an unsupported format. Allowed formats: PDF, JPG, PNG, WEBP.`,
          });
        }

        if (mimeType && !allowedMimeTypes.includes(mimeType)) {
          return res.status(400).json({
            success: false,
            error: `File "${filename}" has an unsupported MIME type (${mimeType}). Allowed types: PDF, JPG, PNG, WEBP.`,
          });
        }

        const base64Data = String(docItem.base64).replace(/^data:[^;]+;base64,/, '');
        let fileBuffer: Buffer;
        try {
          fileBuffer = Buffer.from(base64Data, 'base64');
        } catch (e) {
          return res.status(400).json({
            success: false,
            error: `Failed to decode file content for "${filename}".`,
          });
        }

        if (fileBuffer.length === 0) {
          return res.status(400).json({
            success: false,
            error: `File "${filename}" is empty.`,
          });
        }

        if ((docItem.size && Number(docItem.size) > maxFileBytes) || fileBuffer.length > maxFileBytes) {
          return res.status(400).json({
            success: false,
            error: `File "${filename}" exceeds the maximum 10 MB limit.`,
          });
        }

        const safeFilename = encodeURIComponent(filename.replace(/[^a-zA-Z0-9._-]/g, '_'));
        const contentType = mimeType || (ext === 'pdf' ? 'application/pdf' : `image/${ext === 'jpg' ? 'jpeg' : ext}`);

        preparedFiles.push({
          filename: safeFilename,
          contentType,
          fileBuffer,
          index: i,
        });
      }

      // Concurrently upload assets to Sanity to prevent serverless function timeouts
      try {
        kycDocReferences = await Promise.all(
          preparedFiles.map(async (fileItem) => {
            const assetUploadEndpoint = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/assets/files/${SANITY_DATASET}?filename=${fileItem.filename}`;
            const assetRes = await fetch(assetUploadEndpoint, {
              method: 'POST',
              headers: {
                'Content-Type': fileItem.contentType,
                Authorization: `Bearer ${token}`,
              },
              body: fileItem.fileBuffer as unknown as BodyInit,
            });

            const assetResult = await assetRes.json();
            if (!assetRes.ok || !assetResult.document?._id) {
              console.error('[Sanity API] Asset upload error:', assetResult);
              throw new Error(assetResult.message || `Failed to upload KYC document to Sanity.`);
            }

            return {
              _key: `kyc_${Date.now()}_${fileItem.index}_${Math.random().toString(36).substring(2, 8)}`,
              _type: 'file' as const,
              asset: {
                _type: 'reference' as const,
                _ref: assetResult.document._id,
              },
            };
          })
        );
      } catch (uploadErr: any) {
        return res.status(500).json({
          success: false,
          error: uploadErr.message || 'Failed to upload supporting KYC documents to server storage.',
        });
      }
    }

    const normLoanType = String(loanType || 'ippis').toLowerCase().trim().replace(/-loan$/, '');
    const appRef = String(applicationReference || `SKL-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`).trim();
    const docId = `loanApp-${appRef}`;

    const doc: any = {
      _id: docId,
      _type: 'loanApplication',
      applicationReference: appRef,
      status: 'new',
      submittedAt: submittedAt || new Date().toISOString(),
      source: 'website',
      loanProduct: {
        _type: 'reference',
        _ref: `loanProduct-${normLoanType}`,
      },
      fullName: String(fullName).trim(),
      phone: String(phone).trim(),
      email: email ? String(email).trim() : undefined,
      state: state || 'FCT Abuja',
      city: city ? String(city).trim() : undefined,
      loanType: normLoanType,
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
        mutations: [{ createIfNotExists: doc }],
      }),
    });

    const result = await sanityRes.json();

    if (!sanityRes.ok) {
      console.error('[Sanity API] Mutation rejected by Sanity:', result);
      return res.status(sanityRes.status).json({
        success: false,
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
      success: false,
      error: error.message || 'Internal server error while processing loan application.',
    });
  }
}
