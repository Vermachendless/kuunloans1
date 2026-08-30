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

    const doc = {
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

    const sanityEndpoint = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/mutate/${SANITY_DATASET}`;

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
      result,
    });
  } catch (error: any) {
    console.error('[Sanity API] Unexpected server exception:', error);
    return res.status(500).json({
      error: error.message || 'Internal server error while processing loan application.',
    });
  }
}
