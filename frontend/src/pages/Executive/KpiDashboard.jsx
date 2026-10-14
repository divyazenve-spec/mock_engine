import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';
import { MOCK_BALANCED_KPIS } from './mockExecutiveData';

export default function KpiDashboard() {
  const cardStyle = {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '22px 24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
  };

  const kpis = MOCK_BALANCED_KPIS;

  return (
    <DashboardLayout
      category="Executive Dashboard"
      subcategory="KPI Dashboard"
      title="Enterprise Master KPI Scorecard"
      subtitle="Strategic performance indicators across financial growth, operational velocity, clinical care, and customer satisfaction"
      icon="📊"
      badge="Scorecard Standard"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Overall Scorecard Health" value="96.8%" delta="10 of 10 Met" trend="up" subtext="Balanced scorecard targets met" icon="✅" />
        <KpiCard label="Customer NPS" value="78" delta="+6 pts QoQ" trend="up" subtext="Across pet parent cohort" icon="⭐" />
        <KpiCard label="Delivery SLA Velocity" value="96.8%" delta="38.4m average" trend="up" subtext="60-min door delivery" icon="⚡" />
        <KpiCard label="Gross Margin" value="40.1%" delta="+1.6% YoY" trend="up" subtext="Direct sourcing active" icon="💎" />
      </div>

      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Cross-Enterprise KPI Performance Matrix</h3>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#047857', background: '#ecfdf5', padding: '3px 8px', borderRadius: '12px', border: '1px solid #a7f3d0' }}>
            {kpis.length} KPIs Recorded
          </span>
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
              {kpis.map((kpi, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px', color: '#64748b', fontWeight: 500 }}>{kpi.category}</td>
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
