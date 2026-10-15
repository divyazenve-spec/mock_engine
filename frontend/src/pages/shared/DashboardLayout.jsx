import React from 'react';

export default function DashboardLayout({
  title,
  category,
  subcategory,
  subtitle,
  icon,
  badge,
  actions,
  noPadding,
  hideHeader = false,
  children
}) {
  const containerPadding = noPadding ? 0 : '24px 28px 48px';

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      padding: containerPadding,
      width: '100%',
      margin: 0,
      color: 'var(--foreground, #0f172a)',
      fontFamily: 'var(--font-sans, "Manrope", sans-serif)'
    }}>
      {/* Header section */}
      {!hideHeader && (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '16px',
          borderBottom: '1px solid var(--border, #e2e8f0)',
          paddingBottom: '16px'
        }}>
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '11px',
            color: 'var(--muted-foreground, #64748b)',
            marginBottom: '4px',
            fontFamily: '"IBM Plex Mono", monospace'
          }}>
            <span>{category}</span>
            <span>›</span>
            <span style={{ color: 'var(--primary, #2563eb)', fontWeight: 600 }}>{subcategory || title}</span>
          </div>
          <h1 style={{
            fontSize: '22px',
            fontWeight: 700,
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: 'var(--foreground, #0f172a)',
            fontFamily: 'var(--font-display, "Sora", sans-serif)'
          }}>
            {icon && <span>{icon}</span>}
            {title}
            {badge && (
              <span style={{
                fontSize: '11px',
                fontWeight: 600,
                padding: '3px 9px',
                borderRadius: '9999px',
                background: '#f0fdf4',
                color: '#166534',
                border: '1px solid #bbf7d0'
              }}>
                {badge}
              </span>
            )}
          </h1>
          {subtitle && (
            <p style={{
              margin: '4px 0 0',
              fontSize: '13px',
              color: 'var(--muted-foreground, #64748b)'
            }}>
              {subtitle}
            </p>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => window.ZenveCopilot?.open()}
            title="Open Global AI Co-Pilot (Cmd+K / Ctrl+K)"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.08), rgba(99, 102, 241, 0.08))',
              color: '#0284c7',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <span>✨ AI Co-Pilot</span>
            <span style={{
              fontSize: '10px',
              fontFamily: '"IBM Plex Mono", monospace',
              opacity: 0.85,
              padding: '1px 5px',
              borderRadius: '4px',
              background: '#e0f2fe',
              color: '#0369a1'
            }}>
              Ctrl+K
            </span>
          </button>
          {actions}
        </div>
      </div>
      )}

      {/* Main Content Area */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {children}
      </div>
    </div>
  );
}
