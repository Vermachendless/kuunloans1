import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import os from 'os';
import {defineConfig, Plugin} from 'vite';

function getSanityWriteToken(): string {
  if (process.env.SANITY_API_WRITE_TOKEN) {
    return process.env.SANITY_API_WRITE_TOKEN;
  }
  // Try reading from .env.local
  const envLocalPath = path.resolve(__dirname, '.env.local');
  if (fs.existsSync(envLocalPath)) {
    const content = fs.readFileSync(envLocalPath, 'utf8');
    const match = content.match(/SANITY_API_WRITE_TOKEN=(.+)/);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  // Fallback to local Sanity CLI config
  try {
    const configPath = path.join(os.homedir(), '.config', 'sanity', 'config.json');
    if (fs.existsSync(configPath)) {
      const cfg = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      if (cfg && cfg.authToken) {
        return cfg.authToken;
      }
    }
  } catch (e) {
    // Ignore fallback failure
  }
  return '';
}

const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID || 'd1cwze7g';
const SANITY_DATASET = process.env.SANITY_DATASET || 'production';

function loanApplicationApiPlugin(): Plugin {
  return {
    name: 'loan-application-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/submit-loan-application' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', async () => {
            try {
              if (!body) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Request body cannot be empty.' }));
                return;
              }

              const parsed = JSON.parse(body);

              // Validate required fields
              if (!parsed.fullName || !parsed.phone || !parsed.requestedAmount || !parsed.loanType) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Missing required application fields (Full Name, Phone, Loan Type, or Amount).' }));
                return;
              }

              const token = getSanityWriteToken();
              if (!token) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Sanity write token is missing on the server.' }));
                return;
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

              if (parsed.kycDocuments !== undefined && parsed.kycDocuments !== null) {
                if (!Array.isArray(parsed.kycDocuments)) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: 'kycDocuments must be an array.' }));
                  return;
                }

                if (parsed.kycDocuments.length > 4) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: 'A maximum of 4 KYC documents is permitted.' }));
                  return;
                }

                const allowedExtensions = ['pdf', 'jpg', 'jpeg', 'png', 'webp'];
                const allowedMimeTypes = [
                  'application/pdf',
                  'image/jpeg',
                  'image/png',
                  'image/webp',
                ];
                const maxFileBytes = 10 * 1024 * 1024; // 10 MB limit

                kycDocReferences = [];

                for (let i = 0; i < parsed.kycDocuments.length; i++) {
                  const docItem = parsed.kycDocuments[i];
                  if (!docItem || typeof docItem !== 'object' || !docItem.name || !docItem.base64) {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ error: `Malformed document upload at item ${i + 1}. Missing name or file data.` }));
                    return;
                  }

                  const filename = String(docItem.name).trim();
                  const ext = (filename.split('.').pop() || '').toLowerCase();
                  const mimeType = (docItem.type || '').toLowerCase();

                  if (!allowedExtensions.includes(ext)) {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ error: `File "${filename}" has an unsupported format. Allowed formats: PDF, JPG, PNG, WEBP.` }));
                    return;
                  }

                  if (mimeType && !allowedMimeTypes.includes(mimeType)) {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ error: `File "${filename}" has an unsupported MIME type (${mimeType}). Allowed types: PDF, JPG, PNG, WEBP.` }));
                    return;
                  }

                  const base64Data = String(docItem.base64).replace(/^data:[^;]+;base64,/, '');
                  let fileBuffer: Buffer;
                  try {
                    fileBuffer = Buffer.from(base64Data, 'base64');
                  } catch (e) {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ error: `Failed to decode file content for "${filename}".` }));
                    return;
                  }

                  if (fileBuffer.length === 0) {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ error: `File "${filename}" is empty.` }));
                    return;
                  }

                  if ((docItem.size && Number(docItem.size) > maxFileBytes) || fileBuffer.length > maxFileBytes) {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ error: `File "${filename}" exceeds the maximum 10 MB limit.` }));
                    return;
                  }

                  const safeFilename = encodeURIComponent(filename.replace(/[^a-zA-Z0-9._-]/g, '_'));
                  const contentType = mimeType || (ext === 'pdf' ? 'application/pdf' : `image/${ext === 'jpg' ? 'jpeg' : ext}`);
                  const assetUploadEndpoint = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2024-01-01/assets/files/${SANITY_DATASET}?filename=${safeFilename}`;

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
                    console.error('[Sanity API Plugin] Asset upload error:', assetResult);
                    res.statusCode = assetRes.status || 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ error: assetResult.message || `Failed to upload KYC document "${filename}" to Sanity.` }));
                    return;
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
                applicationReference: parsed.applicationReference || `SKL-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`,
                status: 'new',
                submittedAt: parsed.submittedAt || new Date().toISOString(),
                source: 'website',
                loanProduct: {
                  _type: 'reference',
                  _ref: `loanProduct-${parsed.loanType}`,
                },
                fullName: String(parsed.fullName).trim(),
                phone: String(parsed.phone).trim(),
                email: parsed.email ? String(parsed.email).trim() : undefined,
                state: parsed.state || 'FCT Abuja',
                city: parsed.city ? String(parsed.city).trim() : undefined,
                loanType: parsed.loanType || 'ippis',
                requestedAmount: Number(parsed.requestedAmount) || 0,
                tenureMonths: Number(parsed.tenureMonths) || 12,
                purpose: parsed.purpose ? String(parsed.purpose).trim() : undefined,
                employmentType: parsed.employmentType || 'civil_servant',
                ippisNumber: parsed.ippisNumber ? String(parsed.ippisNumber).trim() : undefined,
                ministryDepartmentAgency: parsed.ministryDepartmentAgency ? String(parsed.ministryDepartmentAgency).trim() : undefined,
                collateralDescription: parsed.collateralDescription ? String(parsed.collateralDescription).trim() : undefined,
                agreedToTerms: Boolean(parsed.agreedToTerms),
              };

              if (kycDocReferences && kycDocReferences.length > 0) {
                doc.kycDocuments = kycDocReferences;
              }

              const sanityRes = await fetch(
                `https://${SANITY_PROJECT_ID}.api.sanity.io/v2024-01-01/data/mutate/${SANITY_DATASET}?returnDocuments=true`,
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                  },
                  body: JSON.stringify({
                    mutations: [{ create: doc }],
                  }),
                }
              );

              const result = await sanityRes.json();
              if (!sanityRes.ok) {
                res.statusCode = sanityRes.status;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: result.message || 'Failed to submit loan application to Sanity.' }));
                return;
              }

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                success: true,
                reference: doc.applicationReference,
                documentId: result.results?.[0]?.document?._id,
                result
              }));
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message || 'Internal server error while processing loan application.' }));
            }
          });
        } else {
          next();
        }
      });
    },
  };
}

function contactEnquiryApiPlugin(): Plugin {
  return {
    name: 'contact-enquiry-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/submit-contact-enquiry' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', async () => {
            try {
              if (!body) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Request body cannot be empty.' }));
                return;
              }

              const parsed = JSON.parse(body);
              const { name, phone, email, subject, location, message } = parsed;

              if (!name || typeof name !== 'string' || !name.trim()) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Full Name is required.' }));
                return;
              }

              if (!phone || typeof phone !== 'string' || !phone.trim()) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Phone Number is required.' }));
                return;
              }

              const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (email && typeof email === 'string' && email.trim().length > 0) {
                if (!EMAIL_REGEX.test(email.trim())) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: 'Invalid email address format.' }));
                  return;
                }
              }

              const token = getSanityWriteToken();
              if (!token) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Sanity write token is missing on the server.' }));
                return;
              }

              const doc = {
                _type: 'contactEnquiry',
                name: name.trim(),
                phone: phone.trim(),
                email: email && typeof email === 'string' && email.trim().length > 0 ? email.trim() : undefined,
                subject: subject && typeof subject === 'string' && subject.trim().length > 0 ? subject.trim() : 'General Information',
                location: location && typeof location === 'string' && location.trim().length > 0 ? location.trim() : 'Abuja (Utako)',
                message: message && typeof message === 'string' && message.trim().length > 0 ? message.trim() : '(No message details provided)',
                status: 'new',
                submittedAt: new Date().toISOString(),
                source: 'website',
              };

              const sanityRes = await fetch(
                `https://${SANITY_PROJECT_ID}.api.sanity.io/v2024-01-01/data/mutate/${SANITY_DATASET}?returnDocuments=true`,
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                  },
                  body: JSON.stringify({
                    mutations: [{ create: doc }],
                  }),
                }
              );

              const result = await sanityRes.json();
              if (!sanityRes.ok) {
                res.statusCode = sanityRes.status;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: result.message || 'Failed to submit contact enquiry to Sanity.' }));
                return;
              }

              const documentId = result.results?.[0]?.document?._id || result.results?.[0]?.id;

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                success: true,
                documentId,
                message: 'Enquiry submitted successfully.'
              }));
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message || 'Internal server error while processing contact enquiry.' }));
            }
          });
        } else {
          next();
        }
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), loanApplicationApiPlugin(), contactEnquiryApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
      proxy: {
        '/api/sanity': {
          target: `https://${SANITY_PROJECT_ID}.api.sanity.io`,
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/api\/sanity/, ''),
        },
      },
    },
  };
});
