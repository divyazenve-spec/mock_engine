import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';
import { MOCK_SECURITY } from './mockSettingsData';

export default function SecuritySettings() {
  const [sec, setSec] = useState(MOCK_SECURITY);

  const cardStyle = {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '22px 24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    marginBottom: '18px'
  };

  const toggleMfa = () => setSec(p => ({ ...p, mfaEnforced: !p.mfaEnforced }));
  const toggleGoogleSso = () => setSec(p => ({ ...p, ssoGoogle: !p.ssoGoogle }));
  const toggleAzureSso = () => setSec(p => ({ ...p, ssoAzure: !p.ssoAzure }));

  return (
    <DashboardLayout
      category="Settings"
      subcategory="Security"
      title="Security & Zero-Trust Governance"
      subtitle="Multi-Factor Authentication (2FA), clinical subnet IP whitelisting, session timeouts, and HIPAA/VCI data confidentiality"
      icon="🔐"
      badge="Zero-Trust Enforced"
      actions={
        <button
          onClick={() => alert('Security audit report downloaded (PDF)...')}
          style={{
            padding: '7px 14px',
            borderRadius: '8px',
            border: '1px solid #cbd5e1',
            background: '#ffffff',
            color: '#334155',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          📑 Export Security Audit
        </button>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '18px' }}>
        <KpiCard label="2FA Authentication" value="100.0%" delta="Enforced" trend="up" subtext="All practitioners & staff" icon="🔐" />
        <KpiCard label="Single Sign-On (SSO)" value="Google + Azure" delta="Active" trend="up" subtext="Domain-authenticated" icon="🔑" />
        <KpiCard label="Active Secure Sessions" value="4 Devices" delta="1 Current" trend="neutral" subtext="Encrypted TLS 1.3" icon="📱" />
        <KpiCard label="Audit Retention Window" value="365 Days" delta="Immutable Log" trend="up" subtext="SOC-2 & ISO-27001 standard" icon="📜" />
      </div>

      {/* Authentication & Access Security */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>🔐 Authentication & Access Security</h3>
          <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', background: '#ecfdf5', color: '#047857' }}>
            Strict
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
          <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong style={{ fontSize: '13px', color: '#0f172a' }}>Mandatory Two-Factor Auth (2FA)</strong>
              <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#64748b' }}>Enforced for all veterinarians, pharmacists, and admins</p>
            </div>
            <input type="checkbox" checked={sec.mfaEnforced} onChange={toggleMfa} style={{ transform: 'scale(1.3)', cursor: 'pointer' }} />
          </div>

          <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong style={{ fontSize: '13px', color: '#0f172a' }}>Google Workspace SSO</strong>
              <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#64748b' }}>Authenticate via @zenve.in accounts</p>
            </div>
            <input type="checkbox" checked={sec.ssoGoogle} onChange={toggleGoogleSso} style={{ transform: 'scale(1.3)', cursor: 'pointer' }} />
          </div>

          <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong style={{ fontSize: '13px', color: '#0f172a' }}>Microsoft Azure AD SSO</strong>
              <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#64748b' }}>Institutional corporate directory login</p>
            </div>
            <input type="checkbox" checked={sec.ssoAzure} onChange={toggleAzureSso} style={{ transform: 'scale(1.3)', cursor: 'pointer' }} />
          </div>
        </div>
      </div>

      {/* Clinical Subnet Whitelisting */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>🌐 Clinical Subnet IP Whitelisting</h3>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#64748b' }}>Restricts direct access to electronic medical records (EHR) and prescriptions to verified hospital networks</p>
          </div>
          <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', background: '#ecfdf5', color: '#047857' }}>
            Active
          </span>
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>
            Authorized Hospital Subnets (CIDR Format)
          </label>
          <input
            defaultValue={sec.ipWhitelist}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              background: '#f8fafc',
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '13px',
              color: '#0f172a',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
          <span style={{ fontSize: '11px', color: '#64748b', marginTop: '4px', display: 'block' }}>
            Hospital facility static IPs verified by Indian ISP Leased Lines
          </span>
        </div>
      </div>

      {/* Active Secure Sessions */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>📱 Active Administrative Sessions</h3>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#64748b' }}>Live authenticated sessions across clinical terminals and personal workstations</p>
          </div>
          <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', background: '#ecfdf5', color: '#047857' }}>
            {sec.activeSessions.length} Logged In
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569', fontSize: '12px' }}>
                <th style={{ padding: '12px 14px' }}>Device & Client</th>
                <th style={{ padding: '12px 14px' }}>IP Address</th>
                <th style={{ padding: '12px 14px' }}>Location</th>
                <th style={{ padding: '12px 14px' }}>Activity</th>
                <th style={{ padding: '12px 14px' }}>Session Status</th>
              </tr>
            </thead>
            <tbody>
              {sec.activeSessions.map((s, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 14px' }}>
                    <strong style={{ color: '#0f172a' }}>{s.device}</strong>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>{s.browser}</div>
                  </td>
                  <td style={{ padding: '12px 14px', fontFamily: '"IBM Plex Mono", monospace', color: '#334155' }}>{s.ip}</td>
                  <td style={{ padding: '12px 14px', color: '#475569' }}>{s.location}</td>
                  <td style={{ padding: '12px 14px', fontFamily: '"IBM Plex Mono", monospace', color: '#64748b', fontSize: '12px' }}>{s.time}</td>
                  <td style={{ padding: '12px 14px' }}>
                    {s.current ? (
                      <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', background: '#ecfdf5', color: '#047857' }}>
                        ● Current Session
                      </span>
                    ) : (
                      <button
                        onClick={() => alert(`Session for ${s.device} terminated.`)}
                        style={{
                          padding: '4px 10px',
                          borderRadius: '4px',
                          border: '1px solid #fca5a5',
                          background: '#fff1f2',
                          color: '#e11d48',
                          fontSize: '11px',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        Revoke
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
