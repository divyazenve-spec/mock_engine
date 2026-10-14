import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';
import { MOCK_EXECUTIVE_KPIS, MOCK_DIVISIONAL_CONTRIBUTION } from './mockExecutiveData';

export default function ExecutiveDashboard() {
  const [period, setPeriod] = useState('MTD');

  const cardStyle = {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '22px 24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
  };

  return (
    <DashboardLayout
      category="Executive Dashboard"
      subcategory="CEO Control Center"
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
        <KpiCard label="Gross Revenue (MTD)" value={MOCK_EXECUTIVE_KPIS.grossRevenue} delta={MOCK_EXECUTIVE_KPIS.revenueGrowth} trend="up" subtext="Consolidated across 6 units" icon="💰" />
        <KpiCard label="Net Revenue" value={MOCK_EXECUTIVE_KPIS.netRevenue} delta={MOCK_EXECUTIVE_KPIS.netMargin} trend="up" subtext="Post discounts & refunds" icon="📈" />
        <KpiCard label="EBITDA Margin" value={MOCK_EXECUTIVE_KPIS.ebitdaMargin} delta={MOCK_EXECUTIVE_KPIS.ebitda} trend="up" subtext="Operational surplus" icon="💎" />
        <KpiCard label="Registered Pet Parents" value={MOCK_EXECUTIVE_KPIS.registeredPetParents} delta={MOCK_EXECUTIVE_KPIS.petParentsGrowth} trend="up" subtext="Across 5 active metros" icon="🐾" />
        <KpiCard label="Clinical Practitioners" value={MOCK_EXECUTIVE_KPIS.clinicalPractitioners} delta={MOCK_EXECUTIVE_KPIS.cliniciansOnDuty} trend="neutral" subtext="Surgeons & specialists" icon="👨‍⚕️" />
        <KpiCard label="60-Min SLA Velocity" value={MOCK_EXECUTIVE_KPIS.slaVelocity} delta={MOCK_EXECUTIVE_KPIS.slaAverageTime} trend="up" subtext="Express delivery fleet" icon="⚡" />
      </div>

      {/* Grid 2: Revenue Mix & Operations */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '18px' }}>
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Divisional Revenue Attribution</h3>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b' }}>₹1.84 Cr Total</span>
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
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>₹4.85 Cr</div>
              <div style={{ fontSize: '11px', color: '#059669', fontWeight: 600, marginTop: '2px' }}>28 Mos Runway</div>
            </div>
            <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Customer LTV / CAC</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>4.8x Ratio</div>
              <div style={{ fontSize: '11px', color: '#059669', fontWeight: 600, marginTop: '2px' }}>Payback 4.2 Mos</div>
            </div>
            <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Doctor NPS</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>4.9 / 5.0</div>
              <div style={{ fontSize: '11px', color: '#059669', fontWeight: 600, marginTop: '2px' }}>99.4% Diagnostic Acc</div>
            </div>
            <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Inventory Turns</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>7.2x / Year</div>
              <div style={{ fontSize: '11px', color: '#059669', fontWeight: 600, marginTop: '2px' }}>1.4% Stockout Rate</div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
