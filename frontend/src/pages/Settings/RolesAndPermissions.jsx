import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';
import { MOCK_ROLES, MOCK_PERMISSIONS } from './mockSettingsData';

export default function RolesAndPermissions() {
  const [permissions, setPermissions] = useState(MOCK_PERMISSIONS);

  const cardStyle = {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '22px 24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    marginBottom: '18px'
  };

  const togglePerm = (idx, field) => {
    setPermissions(prev => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: !copy[idx][field] };
      return copy;
    });
  };

  return (
    <DashboardLayout
      category="Settings"
      subcategory="Roles & Permissions"
      title="Roles & Access Permissions (RBAC)"
      subtitle="Fine-grained role-based governance protecting clinical data confidentiality, order controls, and financial ledgers"
      icon="🛡️"
      badge="Zero-Trust RBAC"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => alert('New Role Profile creator wizard launched...')}
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
            + Add Role Profile
          </button>
          <button
            onClick={() => alert('RBAC Permissions saved & synchronized across microservices successfully!')}
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
            💾 Save Changes
          </button>
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '18px' }}>
        <KpiCard label="Defined Role Profiles" value="6 Profiles" delta="0 Privilege Escalations" trend="up" subtext="Hierarchical RBAC model" icon="🛡️" />
        <KpiCard label="Governed Module Scopes" value="7 Modules" delta="42 Granular Permissions" trend="up" subtext="HIPAA & VCI compliant" icon="📋" />
        <KpiCard label="Super Administrators" value="3 Root Users" delta="Hardware Key Protected" trend="neutral" subtext="YubiKey FIDO2 enforced" icon="🔑" />
        <KpiCard label="Permission Audit Log" value="Clean" delta="100% Verified" trend="up" subtext="Continuous tamper logging" icon="✅" />
      </div>

      {/* Role Profiles Cards */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>🛡️ Standard Enterprise Role Profiles</h3>
          <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', background: '#ecfdf5', color: '#047857' }}>
            6 Role Presets
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
          {MOCK_ROLES.map(role => (
            <div key={role.name} style={{ padding: '14px 16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '13px', color: '#0f172a' }}>{role.name}</strong>
                <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px', background: '#e0e7ff', color: '#3730a3' }}>
                  {role.users} Users
                </span>
              </div>
              <p style={{ margin: '6px 0 0', fontSize: '11px', color: '#64748b', lineHeight: 1.4 }}>{role.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Granular Permission Matrix */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>📋 Granular Privilege Governance Matrix</h3>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#64748b' }}>Configure exact read, write, update, delete, export, and approval capabilities per domain module</p>
          </div>
          <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', background: '#ecfdf5', color: '#047857' }}>
            Fine-Grained
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <th style={{ padding: '10px 14px' }}>Module Scope</th>
                <th style={{ padding: '10px 14px', textAlign: 'center' }}>View</th>
                <th style={{ padding: '10px 14px', textAlign: 'center' }}>Create</th>
                <th style={{ padding: '10px 14px', textAlign: 'center' }}>Edit</th>
                <th style={{ padding: '10px 14px', textAlign: 'center' }}>Delete</th>
                <th style={{ padding: '10px 14px', textAlign: 'center' }}>Export CSV</th>
                <th style={{ padding: '10px 14px', textAlign: 'center' }}>Approve</th>
              </tr>
            </thead>
            <tbody>
              {permissions.map((p, idx) => (
                <tr key={p.module} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 600, color: '#0f172a' }}>{p.module}</td>
                  {['view', 'create', 'edit', 'del', 'exp', 'app'].map(field => (
                    <td key={field} style={{ padding: '12px 14px', textAlign: 'center' }}>
                      <input
                        type="checkbox"
                        checked={p[field]}
                        onChange={() => togglePerm(idx, field)}
                        style={{ cursor: 'pointer', transform: 'scale(1.2)' }}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
