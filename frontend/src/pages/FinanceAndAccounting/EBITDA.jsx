import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function EBITDA() {
  const [metricView, setMetricView] = useState('Operating');

  const facilityEbitda = [
    { facility: 'Koramangala Central Tertiary Hospital', city: 'Bengaluru', rev: '₹38,50,000', ebitda: '₹9,54,800', margin: '24.8%', status: 'Top Performer' },
    { facility: 'Indiranagar Surgical & Imaging Hub', city: 'Bengaluru', rev: '₹26,40,000', ebitda: '₹6,46,800', margin: '24.5%', status: 'Top Performer' },
    { facility: 'Whitefield Specialized Veterinary Center', city: 'Bengaluru', rev: '₹22,10,000', ebitda: '₹5,19,350', margin: '23.5%', status: 'Top Performer' },
    { facility: 'Bandra West Flagship Center', city: 'Mumbai', rev: '₹18,50,000', ebitda: '₹4,16,250', margin: '22.5%', status: 'Top Performer' },
    { facility: 'HSR Layout 24/7 Emergency Clinic', city: 'Bengaluru', rev: '₹14,20,000', ebitda: '₹3,19,500', margin: '22.5%', status: 'Healthy' },
    { facility: 'Jayanagar Specialty Outpatient Hub', city: 'Bengaluru', rev: '₹11,80,000', ebitda: '₹2,59,600', margin: '22.0%', status: 'Healthy' },
    { facility: 'Vasant Vihar Premium Outpatient Hub', city: 'Delhi-NCR', rev: '₹10,50,000', ebitda: '₹2,20,500', margin: '21.0%', status: 'Healthy' },
    { facility: 'Jubilee Hills Care Center', city: 'Hyderabad', rev: '₹8,40,000', ebitda: '₹1,68,000', margin: '20.0%', status: 'Healthy' },
    { facility: 'Powai Lakes Outpatient Clinic', city: 'Mumbai', rev: '₹5,70,000', ebitda: '₹1,08,300', margin: '19.0%', status: 'Healthy' },
    { facility: 'Bellandur Tech Park Express Clinic', city: 'Bengaluru', rev: '₹4,25,000', ebitda: '₹76,500', margin: '18.0%', status: 'Healthy' }
  ];

  const bridgeItems = [
    { step: 'Reported GAAP Operating Profit (EBIT)', amt: '₹28,85,000', type: 'subtotal' },
    { step: 'Add: Depreciation on Medical Equipment & OT Hardware', amt: '+₹4,15,000', type: 'add' },
    { step: 'Add: Amortization of EHR & Diagnostic Software Assets', amt: '+₹1,28,400', type: 'add' },
    { step: 'Consolidated Operating EBITDA (Reported)', amt: '₹34,28,400', type: 'total' },
    { step: 'Add: Non-Cash ESOP Stock Compensation Expense', amt: '+₹85,000', type: 'add' },
    { step: 'Add: Pre-Opening Capex for Hyderabad Jubilee Hills OT', amt: '+₹68,000', type: 'add' },
    { step: 'Add: One-Time NABH Hospital Accreditation Legal Fees', amt: '+₹42,000', type: 'add' },
    { step: 'Less: Retroactive Manufacturer Volume Rebate Accrual', amt: '-₹35,000', type: 'deduct' },
    { step: 'Add: Cloud Infrastructure R&D Pilot Migration Credits', amt: '+₹26,600', type: 'add' },
    { step: 'Normalized Adjusted EBITDA (Management Measure)', amt: '₹36,15,000', type: 'total' }
  ];

  return (
    <DashboardLayout
      category="Finance & Accounting"
      subcategory="EBITDA"
      title="EBITDA & Operating Cash Flow Velocity"
      subtitle="Operating profitability before capital structure & tax deductions, facility EBITDA margins, and adjusted EBITDA bridge"
      icon="⚡"
      badge="EBITDA: 24.0%"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => alert('Exporting EBITDA Bridge & Facility Margin Model...')}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: '1px solid #3b82f6',
              background: 'rgba(59,130,246,0.15)',
              color: '#60a5fa',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            ⚡ Export EBITDA Model
          </button>
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Operating EBITDA (MTD)" value="₹34,28,400" delta="+24.0% margin" trend="up" subtext="Operating surplus" icon="⚡" />
        <KpiCard label="Normalized Adjusted EBITDA" value="₹36,15,000" delta="+25.3% margin" trend="up" subtext="Adding non-recurring" icon="💎" />
        <KpiCard label="Annualized EBITDA Run-rate" value="₹4.11 Cr" delta="+28.4% YoY" trend="up" subtext="Coverage metric" icon="📈" />
        <KpiCard label="EBITDA-to-Cash Conversion" value="106.2%" delta="High cash flow" trend="up" subtext="CFO / EBITDA" icon="💧" />
        <KpiCard label="Flagship Tertiary EBITDA" value="24.8%" delta="Koramangala" trend="up" subtext="Highest volume center" icon="🏥" />
        <KpiCard label="Break-Even Hospital Month" value="4.2 Months" delta="-0.8 Mo vs target" trend="up" subtext="Average new center" icon="⏱️" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '20px' }}>
        {/* Facility EBITDA Contribution */}
        <div style={{
          background: 'var(--card, #131d2e)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '12px',
          padding: '22px 24px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#fff' }}>🏥 Facility-Level EBITDA Performance</h3>
              <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Individual clinic operating contribution after local facility expenses</p>
            </div>
            <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>100% Locations EBITDA Positive</span>
          </div>

          <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ background: 'rgba(0,0,0,0.22)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <th style={{ padding: '10px 20px', textAlign: 'left', color: '#94a3b8' }}>Facility</th>
                  <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Revenue</th>
                  <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>EBITDA</th>
                  <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>EBITDA Margin</th>
                  <th style={{ padding: '10px 20px', textAlign: 'right', color: '#94a3b8' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {facilityEbitda.map((f, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '12px 20px', color: '#fff', fontWeight: 600 }}>
                      {f.facility}<br />
                      <span style={{ fontSize: '10px', color: '#94a3b8' }}>{f.city}</span>
                    </td>
                    <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{f.rev}</td>
                    <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#10b981' }}>{f.ebitda}</td>
                    <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#38bdf8' }}>{f.margin}</td>
                    <td style={{ padding: '12px 20px', textAlign: 'right' }}>
                      <span style={{
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '10px',
                        fontWeight: 600,
                        background: f.status === 'Top Performer' ? 'rgba(16,185,129,0.15)' : 'rgba(56,189,248,0.15)',
                        color: f.status === 'Top Performer' ? '#34d399' : '#38bdf8'
                      }}>
                        {f.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* EBITDA Bridge */}
        <div style={{
          background: 'var(--card, #131d2e)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '12px',
          padding: '22px 24px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#fff' }}>🌉 Adjusted EBITDA Bridge (Normalized)</h3>
              <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Management non-recurring normalization adjustments</p>
            </div>
            <span style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 600 }}>Normalized: 22.3%</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {bridgeItems.map((b, idx) => {
              const isTot = b.type === 'total';
              const isSub = b.type === 'subtotal';
              return (
                <div key={idx} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  background: isTot ? 'rgba(56,189,248,0.12)' : isSub ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.18)',
                  border: isTot ? '1px solid rgba(56,189,248,0.3)' : '1px solid rgba(255,255,255,0.06)'
                }}>
                  <span style={{
                    fontSize: '12px',
                    fontWeight: isTot || isSub ? 700 : 400,
                    color: isTot ? '#38bdf8' : isSub ? '#fff' : '#cbd5e1'
                  }}>
                    {b.step}
                  </span>
                  <span style={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: isTot ? '15px' : '13px',
                    fontWeight: 700,
                    color: isTot ? '#38bdf8' : b.type === 'add' ? '#10b981' : '#fff'
                  }}>
                    {b.amt}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
