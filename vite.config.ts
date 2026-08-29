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

              const doc = {
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

              const sanityRes = await fetch(
                `https://${SANITY_PROJECT_ID}.api.sanity.io/v2024-01-01/data/mutate/${SANITY_DATASET}`,
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
              res.end(JSON.stringify({ success: true, reference: doc.applicationReference, result }));
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

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), loanApplicationApiPlugin()],
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
