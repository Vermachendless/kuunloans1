import React from 'react'

export function KuunLoansLogo(props: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '1.2em',
        height: '1.2em',
        borderRadius: '50%',
        overflow: 'hidden',
        flexShrink: 0,
        backgroundColor: '#F4C430',
        border: '1px solid rgba(244, 196, 48, 0.4)',
        boxSizing: 'border-box',
        ...props.style,
      }}
      {...props}
    >
      <img
        src="/static/logo.png"
        alt="KuunLoans Logo"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />
    </span>
  )
}
