import React from 'react'
import type {NavbarProps} from 'sanity'

export function CustomNavbar(props: NavbarProps) {
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      {/* Top KuunLoans Financial Services Brand Bar */}
      <div
        style={{
          background: '#0f172a',
          color: '#ffffff',
          padding: '6px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '12px',
          borderBottom: '1px solid rgba(244, 196, 48, 0.25)',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
          <img
            src="/static/logo.png"
            alt="KuunLoans"
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '1px solid #F4C430',
            }}
          />
          <span style={{fontWeight: '700', letterSpacing: '0.04em', color: '#F4C430', fontSize: '13px'}}>
            KUUNLOANS
          </span>
          <span style={{color: '#475569'}}>|</span>
          <span style={{color: '#cbd5e1', fontWeight: '500'}}>
            Administration Portal
          </span>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(34, 197, 94, 0.15)',
              color: '#4ade80',
              padding: '2px 8px',
              borderRadius: '12px',
              fontSize: '11px',
              fontWeight: '600',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#22c55e',
                display: 'inline-block',
              }}
            />
            Production Environment
          </span>
        </div>
      </div>

      {/* Render the standard Sanity Studio Navbar with Search, Tools & User Menu */}
      {props.renderDefault(props)}
    </div>
  )
}
