import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';
import { MOCK_USERS } from './mockSettingsData';

export default function Users() {
  const [searchTerm, setSearchTerm] = useState('');

  const cardStyle = {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '22px 24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
  };

  const filtered = MOCK_USERS.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.unit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout
      category="Settings"
      subcategory="Users"
      title="Users & Administrative Personnel"
      subtitle="Manage licensed veterinary practitioners, clinical directors, care coordinators, pharmacists, and operations staff"
      icon="👥"
      badge="260 Total Staff"
      actions={
        <button
          onClick={() => alert('Opening User Invitation modal...')}
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
          + Invite User
        </button>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '18px' }}>
        <KpiCard label="Registered Personnel" value="260 Users" delta="10 Active Today" trend="up" subtext="Across all 10 divisions" icon="👥" />
        <KpiCard label="Veterinary Doctors" value="48 Surgeons" delta="100% VCI Verified" trend="up" subtext="Prescription signing authority" icon="👨‍⚕️" />
        <KpiCard label="2FA Compliance" value="100.0%" delta="Enforced on all" trend="up" subtext="TOTP / SMS authenticator" icon="🔐" />
        <KpiCard label="Pending Invites" value="0 Pending" delta="All Accepted" trend="neutral" subtext="Zero credential backlog" icon="✉️" />
      </div>

      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Personnel Directory & Access Profiles</h3>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#64748b' }}>Designated roles, department mappings, facility locations, and multi-factor authentication status</p>
          </div>
          <input
            type="text"
            placeholder="Search personnel by name, email or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '12px',
              width: '280px',
              outline: 'none'
            }}
          />
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569', fontSize: '12px' }}>
                <th style={{ padding: '12px 14px' }}>Personnel</th>
                <th style={{ padding: '12px 14px' }}>Designated Role</th>
                <th style={{ padding: '12px 14px' }}>Business Unit</th>
                <th style={{ padding: '12px 14px' }}>Primary Facility</th>
                <th style={{ padding: '12px 14px' }}>2FA Security</th>
                <th style={{ padding: '12px 14px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => {
                const initials = u.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
                return (
                  <tr key={u.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: '#e0e7ff',
                          color: '#3730a3',
                          fontWeight: 700,
                          fontSize: '11px',
                          display: 'grid',
                          placeItems: 'center'
                        }}>
                          {initials}
                        </div>
                        <div>
                          <strong style={{ color: '#0f172a' }}>{u.name}</strong>
                          <div style={{ fontSize: '11px', color: '#64748b', fontFamily: '"IBM Plex Mono", monospace' }}>{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '4px', background: '#f5f3ff', color: '#6d28d9' }}>
                        {u.role}
                      </span>
                    </td>
                    <td style={{ padding: '12px 14px', color: '#334155' }}>{u.unit}</td>
                    <td style={{ padding: '12px 14px', color: '#64748b', fontSize: '12px' }}>{u.location}</td>
                    <td style={{ padding: '12px 14px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', background: '#ecfdf5', color: '#047857' }}>
                        🛡️ {u.mfa}
                      </span>
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', background: '#ecfdf5', color: '#047857' }}>
                        ● {u.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
