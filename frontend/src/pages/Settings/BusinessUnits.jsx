import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';
import { MOCK_BUSINESS_UNITS } from './mockSettingsData';

export default function BusinessUnits() {
  const [searchTerm, setSearchTerm] = useState('');

  const cardStyle = {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '22px 24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
  };

  const filtered = MOCK_BUSINESS_UNITS.filter(bu =>
    bu.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bu.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bu.lead.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout
      category="Settings"
      subcategory="Business Units"
      title="Business Units & Operating Divisions"
      subtitle="Organizational cost centers, vertical heads, and P&L allocations across hospitals, telemedicine, pharmacy, and lifestyle"
      icon="🏛️"
      badge="10 Active Divisions"
      actions={
        <button
          onClick={() => alert('Initiating new Business Unit provision wizard...')}
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
          + Add Business Unit
        </button>
      }
    >
      {/* Vitals */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '18px' }}>
        <KpiCard label="Total Divisions" value="10 Operating Units" delta="100% Active" trend="up" subtext="Across healthcare & commerce" icon="🏛️" />
        <KpiCard label="Total Staff Allocated" value="260 Personnel" delta="0 Unallocated" trend="neutral" subtext="Doctors, staff & specialists" icon="👥" />
        <KpiCard label="Consolidated Run-Rate" value="₹2.26 Cr / mo" delta="+24.2% YoY" trend="up" subtext="Across all 10 divisions" icon="💰" />
        <KpiCard label="Top Performing Unit" value="Pet Nutrition" delta="₹68.4L / mo" trend="up" subtext="Rahul Mehta (VP Products)" icon="⭐" />
      </div>

      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Divisional Structure & Executive P&L Allocation</h3>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#64748b' }}>Designated department codes, vertical leaders, workforce headcount, and monthly run-rates</p>
          </div>
          <input
            type="text"
            placeholder="Search divisions by name, code or lead..."
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
                <th style={{ padding: '12px 14px' }}>Unit ID</th>
                <th style={{ padding: '12px 14px' }}>Division Name & Code</th>
                <th style={{ padding: '12px 14px' }}>Division Lead</th>
                <th style={{ padding: '12px 14px' }}>Staff Headcount</th>
                <th style={{ padding: '12px 14px' }}>Monthly Run-Rate</th>
                <th style={{ padding: '12px 14px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(bu => (
                <tr key={bu.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 14px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#2563eb' }}>{bu.id}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <strong style={{ color: '#0f172a' }}>{bu.name}</strong>
                    <div style={{ fontSize: '11px', color: '#64748b', fontFamily: '"IBM Plex Mono", monospace' }}>{bu.code}</div>
                  </td>
                  <td style={{ padding: '12px 14px', color: '#334155', fontWeight: 500 }}>{bu.lead}</td>
                  <td style={{ padding: '12px 14px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600 }}>{bu.staff} Staff</td>
                  <td style={{ padding: '12px 14px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: bu.revenue.includes('₹') ? '#059669' : '#475569' }}>
                    {bu.revenue}
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', background: '#ecfdf5', color: '#047857' }}>
                      ● {bu.status}
                    </span>
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
