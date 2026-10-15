import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';
import { MOCK_PL_STATEMENT, MOCK_GEOGRAPHIC_CLUSTERS } from './mockExecutiveData';

export default function BusinessOverview() {
  const [regionFilter, setRegionFilter] = useState('ALL');
  const [regionSearch, setRegionSearch] = useState('');

  const cardStyle = {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '22px 24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
  };

  const plItems = MOCK_PL_STATEMENT;
  const regions = MOCK_GEOGRAPHIC_CLUSTERS;

  const filteredRegions = regions.filter(r => {
    if (regionFilter !== 'ALL' && r.pos !== regionFilter) return false;
    if (regionSearch) {
      const q = regionSearch.toLowerCase();
      return r.name.toLowerCase().includes(q) || r.pos.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <DashboardLayout
      category="Executive Dashboard"
      subcategory="Business Overview"
      title="Macro Business Overview & Divisional P&L"
      subtitle="Comprehensive cross-divisional profit & loss, geographic penetration, and business unit balance across 10 metropolitan markets"
      icon="🌐"
      badge="Enterprise View"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => alert('Generating P&L Variance Analysis Deck (PDF/Excel)...')}
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
            📊 Export P&L Ledger
          </button>
          <button
            onClick={() => alert('Refreshing geographic footfall telematics and center sync...')}
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
            🗺️ Sync Geo Footprint
          </button>
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Consolidated Sales" value="₹1.84 Cr" delta="+24.2% YoY" trend="up" subtext="Consolidated billed revenue" icon="💰" />
        <KpiCard label="Consolidated COGS" value="₹1.03 Cr" delta="55.9% of Rev" trend="down" subtext="Direct formulary & goods" icon="📦" />
        <KpiCard label="Operating Profit" value="₹18.9L" delta="11.0% EBITDA" trend="up" subtext="Surplus after opex" icon="📈" />
        <KpiCard label="Regional Coverage" value="10 Metros" delta="38 Hubs & Centers" trend="up" subtext="National territory presence" icon="🗺️" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '18px' }}>
        {/* Condensed P&L (10 line items) */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Consolidated Executive P&L (MTD)</h3>
              <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#64748b' }}>Statutory recognized income and expenditure breakdown (10 Line Ledger)</p>
            </div>
            <span style={{ fontSize: '11px', color: '#64748b', fontFamily: '"IBM Plex Mono", monospace' }}>Currency: INR (₹)</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {plItems.map(item => (
              <div key={item.label} style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '8px 12px',
                borderRadius: '6px',
                background: item.hl ? '#f0fdf4' : 'transparent',
                borderBottom: item.bold ? '1px solid #e2e8f0' : 'none'
              }}>
                <span style={{ fontSize: '12px', fontWeight: item.bold ? 700 : 500, color: item.bold ? '#0f172a' : '#475569' }}>
                  {item.label}
                </span>
                <span style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  fontFamily: '"IBM Plex Mono", monospace',
                  color: item.neg ? '#dc2626' : item.hl ? '#15803d' : '#0f172a'
                }}>
                  {item.val}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Geographic Breakdown & Progress (10 clusters) */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Geographic Market Penetration</h3>
              <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#64748b' }}>Revenue attribution across 10 major metropolitan clusters</p>
            </div>
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', background: '#ecfdf5', color: '#047857' }}>
              10 Clusters
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {regions.slice(0, 5).map(r => (
              <div key={r.name} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span style={{ fontWeight: 600, color: '#0f172a' }}>{r.name}</span>
                  <span style={{ fontWeight: 700, color: '#0f172a' }}>{r.rev} <span style={{ color: '#64748b', fontWeight: 400 }}>({r.pct}%)</span></span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#64748b' }}>
                  <span>Footfall: {r.footfall} · {r.hubs}</span>
                  <span style={{ color: '#059669', fontWeight: 700 }}>{r.mom} MoM</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${r.pct}%`, height: '100%', background: '#2563eb', borderRadius: '3px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 10-Record Master Metropolitan Territory Ledger */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>🗺️ Metropolitan Market Share & Economic Ledger</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#64748b' }}>Territory clinic footprint, active pet visits, monthly revenue, and competitive market positioning (10 Hubs)</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search territory or position..."
              value={regionSearch}
              onChange={e => setRegionSearch(e.target.value)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '12px',
                background: '#f8fafc',
                color: '#0f172a',
                width: '200px'
              }}
            />
            {['ALL', 'Dominant', 'Co-Leader', 'Rapid Expansion', 'Fast Scaling', 'High Growth', 'Scaling', 'New Launch', 'Emerging'].map(pos => (
              <button
                key={pos}
                onClick={() => setRegionFilter(pos)}
                style={{
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: regionFilter === pos ? '1px solid #2563eb' : '1px solid #cbd5e1',
                  background: regionFilter === pos ? '#2563eb' : '#ffffff',
                  color: regionFilter === pos ? '#ffffff' : '#334155',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {pos}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569', fontSize: '12px' }}>
                <th style={{ padding: '10px 14px' }}>Metropolitan Cluster</th>
                <th style={{ padding: '10px 14px' }}>Monthly Revenue</th>
                <th style={{ padding: '10px 14px' }}>Share %</th>
                <th style={{ padding: '10px 14px' }}>Active Hubs</th>
                <th style={{ padding: '10px 14px' }}>Pet Parent Footfall</th>
                <th style={{ padding: '10px 14px' }}>MoM Growth</th>
                <th style={{ padding: '10px 14px' }}>Market Position</th>
              </tr>
            </thead>
            <tbody>
              {filteredRegions.map((r, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: '#0f172a' }}>{r.name}</td>
                  <td style={{ padding: '12px 14px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#0f172a' }}>{r.rev}</td>
                  <td style={{ padding: '12px 14px', fontFamily: '"IBM Plex Mono", monospace', color: '#2563eb', fontWeight: 600 }}>{r.pct}%</td>
                  <td style={{ padding: '12px 14px', color: '#475569' }}>{r.hubs}</td>
                  <td style={{ padding: '12px 14px', color: '#0f172a' }}>{r.footfall}</td>
                  <td style={{ padding: '12px 14px', color: '#059669', fontWeight: 700 }}>{r.mom}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '4px',
                      background: r.pos === 'Dominant' || r.pos === 'Co-Leader' ? '#eff6ff' : '#ecfdf5',
                      color: r.pos === 'Dominant' || r.pos === 'Co-Leader' ? '#1d4ed8' : '#047857'
                    }}>
                      ● {r.pos}
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
