import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';
import {
  MOCK_EXECUTIVE_KPIS,
  MOCK_DIVISIONAL_CONTRIBUTION,
  MOCK_BUSINESS_UNITS
} from './mockExecutiveData';

export default function ExecutiveDashboard() {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const cardStyle = {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '22px 24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
  };

  const segments = MOCK_BUSINESS_UNITS;

  const filteredSegments = segments.filter(s => {
    if (filter !== 'ALL' && s.status !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        s.name.toLowerCase().includes(q) ||
        s.lead.toLowerCase().includes(q) ||
        s.volume.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <DashboardLayout
      category="Executive Dashboard"
      subcategory="Executive Dashboard"
      title="Zenve Executive Control Center"
      subtitle="Complete private business intelligence for healthier, happier pets across all healthcare and commerce operations"
      icon="🏛️"
      badge="All Systems Live"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => alert('Executive Financial Model export initiated (CSV/PDF)...')}
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
            Export Board Deck
          </button>
          <button
            onClick={() => alert('Refreshing live telemetry across facilities and digital nodes...')}
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
            🔄 Sync Enterprise Vitals
          </button>
        </div>
      }
    >
      {/* Executive KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Gross Revenue (MTD)" value={MOCK_EXECUTIVE_KPIS.grossRevenue} delta={MOCK_EXECUTIVE_KPIS.revenueGrowth} trend="up" subtext="All 14 centers + app" icon="💰" />
        <KpiCard label="Net Profit (PAT)" value={MOCK_EXECUTIVE_KPIS.netRevenue} delta={MOCK_EXECUTIVE_KPIS.netMargin} trend="up" subtext="Post tax & depreciation" icon="🏆" />
        <KpiCard label="Operating EBITDA" value={MOCK_EXECUTIVE_KPIS.ebitda} delta={MOCK_EXECUTIVE_KPIS.ebitdaMargin} trend="up" subtext="Operating surplus" icon="⚡" />
        <KpiCard label="Total Customer Base" value={MOCK_EXECUTIVE_KPIS.registeredPetParents} delta={MOCK_EXECUTIVE_KPIS.petParentsGrowth} trend="up" subtext="Verified pet parents" icon="🐾" />
        <KpiCard label="Active Veterinary Doctors" value={MOCK_EXECUTIVE_KPIS.clinicalPractitioners} delta={MOCK_EXECUTIVE_KPIS.cliniciansOnDuty} trend="neutral" subtext="Across 10 clinic centers" icon="👨‍⚕️" />
        <KpiCard label="60-Min SLA Velocity" value={MOCK_EXECUTIVE_KPIS.slaVelocity} delta={MOCK_EXECUTIVE_KPIS.slaAverageTime} trend="up" subtext="Across 10 urban hubs" icon="🚀" />
      </div>

      {/* Grid 2: Revenue Mix & Health Scorecard */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '18px' }}>
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Divisional Revenue Attribution</h3>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b' }}>₹1.43 Cr Total</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {MOCK_DIVISIONAL_CONTRIBUTION.map(div => (
              <div key={div.name} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span style={{ fontWeight: 600, color: '#334155' }}>{div.name}</span>
                  <span style={{ fontWeight: 700, color: '#0f172a' }}>{div.rev} <span style={{ color: '#64748b', fontWeight: 400 }}>({div.pct}%)</span></span>
                </div>
                <div style={{ width: '100%', height: '7px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${div.pct}%`, height: '100%', background: div.color, borderRadius: '4px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Executive Health Scorecard</h3>
            <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '12px', background: '#ecfdf5', color: '#047857', fontWeight: 600 }}>Healthy</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
            <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Working Capital</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>₹8.84 Cr</div>
              <div style={{ fontSize: '11px', color: '#059669', fontWeight: 600, marginTop: '2px' }}>14.2 Mos Runway</div>
            </div>
            <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Customer LTV / CAC</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>5.1x Ratio</div>
              <div style={{ fontSize: '11px', color: '#059669', fontWeight: 600, marginTop: '2px' }}>₹42,650 LTV (CAC ₹420)</div>
            </div>
            <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Doctor NPS</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>4.9 / 5.0</div>
              <div style={{ fontSize: '11px', color: '#059669', fontWeight: 600, marginTop: '2px' }}>99.4% Surgical Success</div>
            </div>
            <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Inventory Turns</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>6.4x / Year</div>
              <div style={{ fontSize: '11px', color: '#059669', fontWeight: 600, marginTop: '2px' }}>24.2 Days Cover</div>
            </div>
          </div>
        </div>
      </div>

      {/* Master 10-Record Business Segment Performance Ledger */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>🏛️ Master Business Segment Performance Ledger</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#64748b' }}>Consolidated revenue pacing, unit margins, and operational volumes across all 10 operating divisions</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search segment or executive lead..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '12px',
                background: '#f8fafc',
                color: '#0f172a',
                width: '230px'
              }}
            />
            {['ALL', 'Outperforming', 'Healthy', 'High Growth', 'On Track', 'Stable'].map(st => (
              <button
                key={st}
                onClick={() => setFilter(st)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  border: filter === st ? '1px solid #2563eb' : '1px solid #cbd5e1',
                  background: filter === st ? '#2563eb' : '#ffffff',
                  color: filter === st ? '#ffffff' : '#334155',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569', fontSize: '12px' }}>
                <th style={{ padding: '10px 14px' }}>Business Segment</th>
                <th style={{ padding: '10px 14px' }}>Executive Lead</th>
                <th style={{ padding: '10px 14px' }}>MTD Revenue</th>
                <th style={{ padding: '10px 14px' }}>Target Pacing</th>
                <th style={{ padding: '10px 14px' }}>Gross Margin</th>
                <th style={{ padding: '10px 14px' }}>Active Volume</th>
                <th style={{ padding: '10px 14px' }}>YoY Growth</th>
                <th style={{ padding: '10px 14px' }}>Health Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredSegments.map((s, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: '#0f172a' }}>{s.name}</td>
                  <td style={{ padding: '12px 14px', color: '#64748b' }}>{s.lead}</td>
                  <td style={{ padding: '12px 14px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#0f172a' }}>{s.revenue}</td>
                  <td style={{ padding: '12px 14px', fontFamily: '"IBM Plex Mono", monospace', color: '#059669', fontWeight: 600 }}>{s.pacing}</td>
                  <td style={{ padding: '12px 14px', fontFamily: '"IBM Plex Mono", monospace', color: '#2563eb', fontWeight: 600 }}>{s.margin}</td>
                  <td style={{ padding: '12px 14px', color: '#475569' }}>{s.volume}</td>
                  <td style={{ padding: '12px 14px', color: '#059669', fontWeight: 700 }}>{s.growth}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '4px',
                      background: s.status === 'Outperforming' || s.status === 'High Growth' ? '#ecfdf5' : s.status === 'Healthy' ? '#eff6ff' : '#f1f5f9',
                      color: s.status === 'Outperforming' || s.status === 'High Growth' ? '#047857' : s.status === 'Healthy' ? '#1d4ed8' : '#475569'
                    }}>
                      ● {s.status}
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
