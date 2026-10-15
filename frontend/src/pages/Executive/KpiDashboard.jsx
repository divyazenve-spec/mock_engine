import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';
import { MOCK_BALANCED_KPIS } from './mockExecutiveData';

export default function KpiDashboard() {
  const [catFilter, setCatFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const cardStyle = {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '22px 24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
  };

  const kpis = MOCK_BALANCED_KPIS;

  const filteredKpis = kpis.filter(k => {
    if (catFilter !== 'ALL' && k.category !== catFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return k.metric.toLowerCase().includes(q) || k.category.toLowerCase().includes(q);
    }
    return true;
  });

  const pillarHealth = [
    { pillar: 'Financial Growth', score: '98.5%', status: 'Target Met', color: '#10b981', note: 'Revenue & EBITDA margins beating plan' },
    { pillar: 'Operational SLA', score: '96.8%', status: 'Target Met', color: '#2563eb', note: '60-min door delivery at 38.4m avg' },
    { pillar: 'Clinical Excellence', score: '100.0%', status: 'Target Met', color: '#06b6d4', note: 'Zero cross-infection & 100% NABH' },
    { pillar: 'Pet Parent Retention', score: '94.2%', status: 'Target Met', color: '#8b5cf6', note: '78 NPS and 74.2% chronic refill' },
    { pillar: 'Subscription Growth', score: '105.3%', status: 'Target Met', color: '#f59e0b', note: '8,420 Wellness Club active pets' }
  ];

  return (
    <DashboardLayout
      category="Executive Dashboard"
      subcategory="KPI Dashboard"
      title="Enterprise Master KPI Scorecard"
      subtitle="Strategic performance indicators across financial growth, operational velocity, clinical care, and customer satisfaction (10 Balanced KPIs)"
      icon="📊"
      badge="Scorecard Standard"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => alert('Printing Executive Balanced Scorecard (PDF)...')}
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
            🖨️ Print Scorecard
          </button>
          <button
            onClick={() => alert('Recalibrating Q4 KPI targets with Board of Directors audit committee...')}
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
            🎯 Recalibrate Targets
          </button>
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Overall Scorecard Health" value="96.8%" delta="10 of 10 Met" trend="up" subtext="Balanced scorecard targets met" icon="✅" />
        <KpiCard label="Customer NPS" value="78" delta="+6 pts QoQ" trend="up" subtext="Across pet parent cohort" icon="⭐" />
        <KpiCard label="Delivery SLA Velocity" value="96.8%" delta="38.4m average" trend="up" subtext="60-min door delivery" icon="⚡" />
        <KpiCard label="Gross Margin" value="40.1%" delta="+1.6% YoY" trend="up" subtext="Direct sourcing active" icon="💎" />
      </div>

      {/* Balanced Scorecard Pillar Summary */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Balanced Scorecard Pillar Index</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#64748b' }}>Consolidated health index across 5 core enterprise governance pillars</p>
          </div>
          <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', background: '#ecfdf5', color: '#047857' }}>
            All 5 Nominal
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          {pillarHealth.map(p => (
            <div key={p.pillar} style={{ padding: '14px', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>{p.pillar}</span>
                <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px', background: '#ecfdf5', color: '#047857' }}>{p.status}</span>
              </div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>{p.score}</div>
              <p style={{ margin: 0, fontSize: '11px', color: '#64748b', lineHeight: 1.3 }}>{p.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 10-Record Cross-Enterprise KPI Performance Matrix */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Cross-Enterprise KPI Performance Matrix</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#64748b' }}>Benchmark targets vs actual performance with variance analysis across all strategic domains</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search KPI or category..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '12px',
                background: '#f8fafc',
                color: '#0f172a',
                width: '180px'
              }}
            />
            {['ALL', 'Financial', 'Operational', 'Clinical', 'Customer', 'Growth'].map(cat => (
              <button
                key={cat}
                onClick={() => setCatFilter(cat)}
                style={{
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: catFilter === cat ? '1px solid #2563eb' : '1px solid #cbd5e1',
                  background: catFilter === cat ? '#2563eb' : '#ffffff',
                  color: catFilter === cat ? '#ffffff' : '#334155',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>CATEGORY</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>STRATEGIC KPI</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'right' }}>BENCHMARK TARGET</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'right' }}>ACTUAL PERFORMANCE</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'right' }}>VARIANCE</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'center' }}>HEALTH STATUS</th>
              </tr>
            </thead>
            <tbody>
              {filteredKpis.map((kpi, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px', color: '#64748b', fontWeight: 600 }}>
                    <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', background: '#f1f5f9', color: '#334155' }}>
                      {kpi.category}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#0f172a', fontWeight: 600 }}>{kpi.metric}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#475569' }}>{kpi.target}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#0f172a' }}>{kpi.actual}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600, color: '#059669' }}>{kpi.variance}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '12px', background: '#ecfdf5', color: '#047857' }}>
                      ● {kpi.status}
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
