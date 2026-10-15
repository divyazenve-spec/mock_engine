import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';
import {
  MOCK_COMPANY_SETTINGS,
  MOCK_BUSINESS_UNITS,
  MOCK_LOCATIONS,
  MOCK_USERS,
  MOCK_INTEGRATIONS,
  MOCK_SECURITY,
  MOCK_BACKUP
} from './mockSettingsData';

export default function SettingsDashboard() {
  const cardStyle = {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '22px 24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    marginBottom: '18px'
  };

  const modules = [
    { name: 'Company Settings', icon: '🏢', desc: 'Legal entity, CIN, GSTIN, Drug License, and VCI accreditations', link: '#company-settings' },
    { name: 'Business Units', icon: '🏛️', desc: '10 operating divisions, vertical leaders, and monthly P&L run-rates', link: '#business-units' },
    { name: 'Locations & Facilities', icon: '📍', desc: '10 hospital hubs, emergency clinics, and 60-min dark stores', link: '#locations' },
    { name: 'Users & Personnel', icon: '👥', desc: '260 registered clinicians, pharmacists, specialists, and admins', link: '#users' },
    { name: 'Roles & Permissions', icon: '🛡️', desc: '6 role profiles with fine-grained 7-module privilege matrix', link: '#roles-permissions' },
    { name: 'API & Integrations', icon: '🔌', desc: '10 connected microservice bridges with 99.96% uptime', link: '#api-integrations' },
    { name: 'Security & Zero-Trust', icon: '🔐', desc: '100% 2FA enforcement, SSO, and clinical subnet IP whitelist', link: '#security' }
  ];

  return (
    <DashboardLayout
      category="Settings"
      subcategory="Platform Overview"
      title="Platform Settings & Enterprise Governance"
      subtitle="Centralized management of corporate profile, operating divisions, healthcare facilities, RBAC, and system integrations"
      icon="⚙️"
      badge="All Systems Live"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => alert('Platform configuration backup archive created (JSON)...')}
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
            Export Config
          </button>
          <button
            onClick={() => alert('Syncing live configuration across all 10 facility nodes...')}
            style={{
              padding: '7px 14px',
              borderRadius: '8px',
              border: '1px solid #2563eb',
              background: '#2563eb',
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            🔄 Sync Settings
          </button>
        </div>
      }
    >
      {/* Top Level Vitals */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '18px' }}>
        <KpiCard label="Entity Name" value="Zenve Healthcare" delta="Pvt Ltd" trend="neutral" subtext={MOCK_COMPANY_SETTINGS.cin} icon="🏢" />
        <KpiCard label="Active Facility Nodes" value={`${MOCK_LOCATIONS.length} Facilities`} delta="4 Hub Types" trend="up" subtext="Bengaluru, Mumbai, NCR, Hyd" icon="📍" />
        <KpiCard label="Registered Users" value={`${MOCK_USERS.length * 26} Personnel`} delta="100% 2FA" trend="up" subtext="Zero credential backlog" icon="👤" />
        <KpiCard label="Connected Integrations" value={`${MOCK_INTEGRATIONS.length} Active`} delta="99.96% Uptime" trend="up" subtext="Payment, SMS, Logistics, EHR" icon="🔌" />
      </div>

      {/* Quick Navigation to Settings Subcategories */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>⚙️ Governance Subcategories & Modules</h3>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#64748b' }}>Direct navigation to specialized configuration panels</p>
          </div>
          <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', background: '#ecfdf5', color: '#047857' }}>
            7 Subcategories
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
          {modules.map(mod => (
            <div
              key={mod.name}
              style={{
                padding: '16px',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
                background: '#f8fafc',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '8px',
                transition: 'border-color 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '20px' }}>{mod.icon}</span>
                <strong style={{ fontSize: '14px', color: '#0f172a' }}>{mod.name}</strong>
              </div>
              <p style={{ margin: 0, fontSize: '12px', color: '#64748b', lineHeight: 1.4 }}>{mod.desc}</p>
              <div style={{ marginTop: '4px' }}>
                <a
                  href={mod.link}
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#2563eb',
                    textDecoration: 'none'
                  }}
                >
                  Configure {mod.name} →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cloud Infrastructure & Resiliency Sentinel */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '18px' }}>
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>💾 Cloud Database Resiliency</h3>
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', background: '#ecfdf5', color: '#047857' }}>
              Multi-Region Active
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: '#f8fafc', borderRadius: '6px' }}>
              <span style={{ color: '#64748b' }}>Primary DB Region</span>
              <strong style={{ fontFamily: '"IBM Plex Mono", monospace', color: '#0f172a' }}>{MOCK_BACKUP.primaryRegion}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: '#f8fafc', borderRadius: '6px' }}>
              <span style={{ color: '#64748b' }}>Standby Replica</span>
              <strong style={{ fontFamily: '"IBM Plex Mono", monospace', color: '#0f172a' }}>{MOCK_BACKUP.secondaryRegion}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: '#f8fafc', borderRadius: '6px' }}>
              <span style={{ color: '#64748b' }}>Recovery Point Objective (RPO)</span>
              <strong style={{ color: '#059669', fontFamily: '"IBM Plex Mono", monospace' }}>{MOCK_BACKUP.rpo}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: '#f8fafc', borderRadius: '6px' }}>
              <span style={{ color: '#64748b' }}>Continuous Archive (PITR)</span>
              <strong style={{ color: '#2563eb', fontFamily: '"IBM Plex Mono", monospace' }}>{MOCK_BACKUP.pitrRetention}</strong>
            </div>
          </div>
        </div>

        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>🔐 Zero-Trust Security Sentinel</h3>
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', background: '#ecfdf5', color: '#047857' }}>
              100% Compliant
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: '#f8fafc', borderRadius: '6px' }}>
              <span style={{ color: '#64748b' }}>MFA / 2FA Status</span>
              <strong style={{ color: '#059669' }}>Enforced on all Accounts</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: '#f8fafc', borderRadius: '6px' }}>
              <span style={{ color: '#64748b' }}>SSO Identity Provider</span>
              <strong style={{ color: '#0f172a' }}>Google Workspace + Azure AD</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: '#f8fafc', borderRadius: '6px' }}>
              <span style={{ color: '#64748b' }}>Audit Log Retention</span>
              <strong style={{ fontFamily: '"IBM Plex Mono", monospace', color: '#0f172a' }}>365 Days WORM Storage</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: '#f8fafc', borderRadius: '6px' }}>
              <span style={{ color: '#64748b' }}>Clinical Subnet Whitelist</span>
              <strong style={{ color: '#059669' }}>3 Subnet CIDRs Active</strong>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
