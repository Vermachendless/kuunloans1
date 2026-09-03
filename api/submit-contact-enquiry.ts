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

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

    const { name, phone, email, subject, location, message, source, escalationReason, chatTranscript } = body;

    const isChatbot = source === 'chatbot' || source === 'website-chatbot';

    // Validate required fields
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({
        error: 'Full Name is required.',
      });
    }

    const trimmedPhone = phone && typeof phone === 'string' ? phone.trim() : '';
    const trimmedEmail = email && typeof email === 'string' ? email.trim() : '';

    if (!isChatbot && !trimmedPhone) {
      return res.status(400).json({
        error: 'Phone Number is required.',
      });
    }

    if (isChatbot && !trimmedPhone && !trimmedEmail) {
      return res.status(400).json({
        error: 'Please provide either a phone number or email address so an administrator can reach you.',
      });
    }

    // Validate optional email format
    if (trimmedEmail.length > 0) {
      if (!EMAIL_REGEX.test(trimmedEmail)) {
        return res.status(400).json({
          error: 'Invalid email address format.',
        });
      }
    }

    const token = process.env.SANITY_API_WRITE_TOKEN;
    if (!token) {
      console.error('[Sanity API] SANITY_API_WRITE_TOKEN is not defined in server environment.');
      return res.status(500).json({
        error: 'Server configuration error: Sanity write token is missing.',
      });
    }

    const doc: any = {
      _type: 'contactEnquiry',
      name: name.trim(),
      phone: trimmedPhone || '(Not provided)',
      email: trimmedEmail || undefined,
      subject: subject && typeof subject === 'string' && subject.trim().length > 0 
        ? subject.trim() 
        : (isChatbot ? 'Chatbot Admin Escalation' : 'General Information'),
      location: location && typeof location === 'string' && location.trim().length > 0 
        ? location.trim() 
        : 'Abuja (Utako)',
      message: message && typeof message === 'string' && message.trim().length > 0 
        ? message.trim() 
        : '(No message details provided)',
      status: 'new',
      submittedAt: new Date().toISOString(),
      source: isChatbot ? 'website-chatbot' : 'website',
    };

    if (isChatbot) {
      if (escalationReason && typeof escalationReason === 'string') {
        doc.escalationReason = escalationReason.trim();
      }
      if (chatTranscript && typeof chatTranscript === 'string') {
        doc.chatTranscript = chatTranscript.trim();
      }
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
        error: result.message || 'Failed to record contact enquiry in Sanity.',
      });
    }

    const documentId = result.results?.[0]?.document?._id || result.results?.[0]?.id;

    return res.status(200).json({
      success: true,
      documentId,
      message: 'Enquiry submitted successfully.',
    });
  } catch (error: any) {
    console.error('[Sanity API] Unexpected server exception:', error);
    return res.status(500).json({
      error: error.message || 'Internal server error while processing contact enquiry.',
    });
  }
}
