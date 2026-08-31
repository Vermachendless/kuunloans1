import React, {useEffect, useState} from 'react'
import {useClient} from 'sanity'

interface Stats {
  totalApps: number
  newApps: number
  processingApps: number
  approvedApps: number
  rejectedApps: number
  totalProducts: number
  totalInquiries: number
}

export function DashboardOverview() {
  const client = useClient({apiVersion: '2024-01-01'})
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const query = `{
          "totalApps": count(*[_type == "loanApplication"]),
          "newApps": count(*[_type == "loanApplication" && status == "new"]),
          "processingApps": count(*[_type == "loanApplication" && (status == "reviewed" || status == "processing")]),
          "approvedApps": count(*[_type == "loanApplication" && status == "approved"]),
          "rejectedApps": count(*[_type == "loanApplication" && status == "rejected"]),
          "totalProducts": count(*[_type == "loanProduct"]),
          "totalInquiries": count(*[_type in ["financialAidInquiry", "contactEnquiry"]])
        }`
        const res = await client.fetch(query)
        setStats(res)
      } catch (err) {
        console.error('Failed to load dashboard metrics:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [client])

  return (
    <div
      style={{
        padding: '32px 24px',
        maxWidth: '1200px',
        margin: '0 auto',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        color: '#0f172a',
      }}
    >
      {/* Top Welcome Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          borderRadius: '16px',
          padding: '32px',
          color: '#ffffff',
          marginBottom: '28px',
          boxShadow: '0 4px 20px rgba(15, 23, 42, 0.08)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-40px',
            right: '-40px',
            width: '220px',
            height: '220px',
            background: 'radial-gradient(circle, rgba(244, 196, 48, 0.18) 0%, rgba(244, 196, 48, 0) 70%)',
            borderRadius: '50%',
          }}
        />
        <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px'}}>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              backgroundColor: '#F4C430',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              boxShadow: '0 2px 10px rgba(244, 196, 48, 0.4)',
              flexShrink: 0,
            }}
          >
            <img
              src="/static/logo.png"
              alt="KuunLoans Logo"
              style={{width: '100%', height: '100%', objectFit: 'cover'}}
            />
          </div>
          <div>
            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
              <h1 style={{margin: 0, fontSize: '24px', fontWeight: '700', letterSpacing: '-0.02em'}}>
                KuunLoans Administration Portal
              </h1>
              <span
                style={{
                  backgroundColor: 'rgba(244, 196, 48, 0.2)',
                  color: '#F4C430',
                  border: '1px solid rgba(244, 196, 48, 0.4)',
                  fontSize: '11px',
                  fontWeight: '600',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Financial Ops
              </span>
            </div>
            <p style={{margin: '4px 0 0', color: '#94a3b8', fontSize: '14px'}}>
              Internal Operations, Applications Review & Content Management
            </p>
          </div>
        </div>

        <p style={{margin: 0, color: '#cbd5e1', fontSize: '15px', lineHeight: '1.5', maxWidth: '700px'}}>
          Welcome to the KuunLoans Administration Portal. Use the sidebar desks or quick action cards below to process borrower applications, manage loan rates and limits, and update company settings.
        </p>
      </div>

      {/* Aggregate Overview Metrics (Zero PII Exposed) */}
      <h2 style={{fontSize: '16px', fontWeight: '700', color: '#0f172a', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.04em'}}>
        Operational Overview
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
          marginBottom: '32px',
        }}
      >
        {/* Total Apps */}
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '18px 20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          }}
        >
          <div style={{fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em'}}>
            Total Applications
          </div>
          <div style={{fontSize: '28px', fontWeight: '700', color: '#0f172a', marginTop: '6px'}}>
            {loading ? '—' : stats?.totalApps ?? 0}
          </div>
          <div style={{fontSize: '12px', color: '#64748b', marginTop: '4px'}}>All-time submissions</div>
        </div>

        {/* New / Pending */}
        <div
          style={{
            backgroundColor: '#fffbeb',
            border: '1px solid #fef3c7',
            borderRadius: '12px',
            padding: '18px 20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          }}
        >
          <div style={{fontSize: '12px', fontWeight: '600', color: '#b45309', textTransform: 'uppercase', letterSpacing: '0.05em'}}>
            🆕 New Submissions
          </div>
          <div style={{fontSize: '28px', fontWeight: '700', color: '#b45309', marginTop: '6px'}}>
            {loading ? '—' : stats?.newApps ?? 0}
          </div>
          <div style={{fontSize: '12px', color: '#92400e', marginTop: '4px'}}>Awaiting review</div>
        </div>

        {/* Processing */}
        <div
          style={{
            backgroundColor: '#f0f9ff',
            border: '1px solid #e0f2fe',
            borderRadius: '12px',
            padding: '18px 20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          }}
        >
          <div style={{fontSize: '12px', fontWeight: '600', color: '#0369a1', textTransform: 'uppercase', letterSpacing: '0.05em'}}>
            ⚙️ Under Processing
          </div>
          <div style={{fontSize: '28px', fontWeight: '700', color: '#0369a1', marginTop: '6px'}}>
            {loading ? '—' : stats?.processingApps ?? 0}
          </div>
          <div style={{fontSize: '12px', color: '#0284c7', marginTop: '4px'}}>Verification active</div>
        </div>

        {/* Approved */}
        <div
          style={{
            backgroundColor: '#f0fdf4',
            border: '1px solid #dcfce7',
            borderRadius: '12px',
            padding: '18px 20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          }}
        >
          <div style={{fontSize: '12px', fontWeight: '600', color: '#15803d', textTransform: 'uppercase', letterSpacing: '0.05em'}}>
            ✅ Approved Facilities
          </div>
          <div style={{fontSize: '28px', fontWeight: '700', color: '#15803d', marginTop: '6px'}}>
            {loading ? '—' : stats?.approvedApps ?? 0}
          </div>
          <div style={{fontSize: '12px', color: '#16a34a', marginTop: '4px'}}>Disbursement ready</div>
        </div>

        {/* Active Products */}
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '18px 20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          }}
        >
          <div style={{fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em'}}>
            💳 Loan Products
          </div>
          <div style={{fontSize: '28px', fontWeight: '700', color: '#0f172a', marginTop: '6px'}}>
            {loading ? '—' : stats?.totalProducts ?? 0}
          </div>
          <div style={{fontSize: '12px', color: '#64748b', marginTop: '4px'}}>Published credit lines</div>
        </div>
      </div>

      {/* Management Desks Grid */}
      <h2 style={{fontSize: '16px', fontWeight: '700', color: '#0f172a', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.04em'}}>
        Operational Management Desks
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '20px',
          marginBottom: '32px',
        }}
      >
        {/* Card 1: Loan Applications */}
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px'}}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: '#fef9c3',
                color: '#854d0e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
              }}
            >
              📄
            </div>
            <div>
              <h3 style={{margin: 0, fontSize: '16px', fontWeight: '600', color: '#0f172a'}}>
                Loan Applications Desk
              </h3>
              <span style={{fontSize: '12px', color: '#64748b'}}>Incoming borrower requests</span>
            </div>
          </div>
          <p style={{fontSize: '13px', color: '#475569', lineHeight: '1.5', marginBottom: '16px'}}>
            Review applicant KYC data, verify IPPIS numbers or collateral details, adjust workflow status (New, Reviewed, Processing, Approved, Rejected), and add internal credit notes.
          </p>
          <div
            style={{
              padding: '8px 12px',
              backgroundColor: '#f8fafc',
              borderRadius: '6px',
              fontSize: '12px',
              color: '#334155',
              border: '1px solid #f1f5f9',
            }}
          >
            👉 <strong>Access via:</strong> Sidebar → <em>Loan Applications</em>
          </div>
        </div>

        {/* Card 2: Loan Products */}
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px'}}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: '#fef3c7',
                color: '#92400e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
              }}
            >
              💳
            </div>
            <div>
              <h3 style={{margin: 0, fontSize: '16px', fontWeight: '600', color: '#0f172a'}}>
                Loan Products Manager
              </h3>
              <span style={{fontSize: '12px', color: '#64748b'}}>Live credit facilities</span>
            </div>
          </div>
          <p style={{fontSize: '13px', color: '#475569', lineHeight: '1.5', marginBottom: '16px'}}>
            Manage active loan offerings including IPPIS Civil Service, Collateral-Backed, SME Business, and Personal Loans. Update interest rates, minimum/maximum amounts, and badges.
          </p>
          <div
            style={{
              padding: '8px 12px',
              backgroundColor: '#f8fafc',
              borderRadius: '6px',
              fontSize: '12px',
              color: '#334155',
              border: '1px solid #f1f5f9',
            }}
          >
            👉 <strong>Access via:</strong> Sidebar → <em>Loan Products</em>
          </div>
        </div>

        {/* Card 3: Inquiries & Communications */}
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px'}}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: '#e0f2fe',
                color: '#0369a1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
              }}
            >
              ✉️
            </div>
            <div>
              <h3 style={{margin: 0, fontSize: '16px', fontWeight: '600', color: '#0f172a'}}>
                Inquiries & Leads Desk
              </h3>
              <span style={{fontSize: '12px', color: '#64748b'}}>Client communications</span>
            </div>
          </div>
          <p style={{fontSize: '13px', color: '#475569', lineHeight: '1.5', marginBottom: '16px'}}>
            Review incoming general contact messages and financial aid advisory inquiries submitted by site visitors.
          </p>
          <div
            style={{
              padding: '8px 12px',
              backgroundColor: '#f8fafc',
              borderRadius: '6px',
              fontSize: '12px',
              color: '#334155',
              border: '1px solid #f1f5f9',
            }}
          >
            👉 <strong>Access via:</strong> Sidebar → <em>Inquiries & Messages</em>
          </div>
        </div>

        {/* Card 4: Website Content */}
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px'}}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: '#f1f5f9',
                color: '#334155',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
              }}
            >
              🌐
            </div>
            <div>
              <h3 style={{margin: 0, fontSize: '16px', fontWeight: '600', color: '#0f172a'}}>
                Website Content Management
              </h3>
              <span style={{fontSize: '12px', color: '#64748b'}}>Public marketing & FAQs</span>
            </div>
          </div>
          <p style={{fontSize: '13px', color: '#475569', lineHeight: '1.5', marginBottom: '16px'}}>
            Update FAQs, customer testimonials, financial solution overviews, and community aid program details.
          </p>
          <div
            style={{
              padding: '8px 12px',
              backgroundColor: '#f8fafc',
              borderRadius: '6px',
              fontSize: '12px',
              color: '#334155',
              border: '1px solid #f1f5f9',
            }}
          >
            👉 <strong>Access via:</strong> Sidebar → <em>Website Content</em>
          </div>
        </div>

        {/* Card 5: Site Settings */}
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px'}}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: '#f1f5f9',
                color: '#334155',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
              }}
            >
              ⚙️
            </div>
            <div>
              <h3 style={{margin: 0, fontSize: '16px', fontWeight: '600', color: '#0f172a'}}>
                Company Settings (Singleton)
              </h3>
              <span style={{fontSize: '12px', color: '#64748b'}}>Global business metadata</span>
            </div>
          </div>
          <p style={{fontSize: '13px', color: '#475569', lineHeight: '1.5', marginBottom: '16px'}}>
            Configure company phone numbers, WhatsApp lines, head office address, branch locations, and office hours.
          </p>
          <div
            style={{
              padding: '8px 12px',
              backgroundColor: '#f8fafc',
              borderRadius: '6px',
              fontSize: '12px',
              color: '#334155',
              border: '1px solid #f1f5f9',
            }}
          >
            👉 <strong>Access via:</strong> Sidebar → <em>Company Information & Settings</em>
          </div>
        </div>
      </div>

      {/* System Status Footer */}
      <div
        style={{
          borderTop: '1px solid #e2e8f0',
          paddingTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '12px',
          color: '#64748b',
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
          <span style={{width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e', display: 'inline-block'}} />
          <span>Sanity Production Lake Connected</span>
          <span style={{color: '#cbd5e1'}}>•</span>
          <span>Project ID: <code>d1cwze7g</code></span>
          <span style={{color: '#cbd5e1'}}>•</span>
          <span>Dataset: <code>production</code></span>
        </div>
        <div>
          <span>KuunLoans Financial Services © {new Date().getFullYear()}</span>
        </div>
      </div>
    </div>
  )
}
