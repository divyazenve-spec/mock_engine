import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function NetProfit() {
  const [period, setPeriod] = useState('Current Quarter');

  const netProfitSteps = [
    { step: 'Gross Invoiced Revenue', note: 'Combined veterinary consultations, surgery, pharmacy & diagnostics', amt: '₹1,42,85,000', margin: '100.0%', isKey: true },
    { step: 'Direct Cost of Goods Sold (COGS)', note: 'Pharmaceuticals, surgical consumables, implants, lab reagents', amt: '-₹62,85,000', margin: '-44.0%', isKey: false },
    { step: 'Gross Profit', note: 'Trading surplus generated directly by clinical care teams', amt: '₹80,00,000', margin: '56.0%', isKey: true },
    { step: 'Operating Expenses (OPEX)', note: 'Clinical payroll, facility lease, utilities, digital cloud, marketing', amt: '-₹45,71,600', margin: '-32.0%', isKey: false },
    { step: 'Operating EBITDA', note: 'Core earnings before financing, tax, and capital write-offs', amt: '₹34,28,400', margin: '24.0%', isKey: true },
    { step: 'Depreciation & Amortization (D&A)', note: 'MRI, CT-64, ultrasound machines, surgery suites & hospital fixtures', amt: '-₹3,18,133', margin: '-2.2%', isKey: false },
    { step: 'Operating Profit (EBIT)', note: 'Earnings before interest & tax from ongoing veterinary operations', amt: '₹31,10,267', margin: '21.8%', isKey: false },
    { step: 'Finance Cost & Debt Servicing', note: 'Working capital OD interest, hospital equipment lease term loans', amt: '-₹1,80,000', margin: '-1.3%', isKey: false },
    { step: 'Other Non-Operating Income', note: 'Treasury yields, vendor volume rebates & bio-waste recycling credit', amt: '+₹5,50,000', margin: '+3.9%', isKey: false },
    { step: 'Net Profit After Tax (PAT)', note: 'Statutory bottom line surplus retained for clinic expansion', amt: '₹26,10,200', margin: '18.3%', isKey: true }
  ];

  const quarterlyPAT = [
    { quarter: 'FY24 Q1', rev: '₹92,50,000', pat: '₹11,10,000', margin: '12.0%', eps: '₹7.40' },
    { quarter: 'FY24 Q2', rev: '₹98,20,000', pat: '₹12,76,600', margin: '13.0%', eps: '₹8.51' },
    { quarter: 'FY24 Q3', rev: '₹1,04,50,000', pat: '₹14,63,000', margin: '14.0%', eps: '₹9.75' },
    { quarter: 'FY24 Q4', rev: '₹1,12,00,000', pat: '₹16,80,000', margin: '15.0%', eps: '₹11.20' },
    { quarter: 'FY25 Q1', rev: '₹1,18,40,000', pat: '₹18,35,200', margin: '15.5%', eps: '₹12.23' },
    { quarter: 'FY25 Q2', rev: '₹1,24,60,000', pat: '₹20,55,900', margin: '16.5%', eps: '₹13.71' },
    { quarter: 'FY25 Q3', rev: '₹1,31,20,000', pat: '₹22,96,000', margin: '17.5%', eps: '₹15.31' },
    { quarter: 'FY25 Q4', rev: '₹1,38,00,000', pat: '₹24,84,000', margin: '18.0%', eps: '₹16.56' },
    { quarter: 'FY26 Q1', rev: '₹1,40,50,000', pat: '₹25,57,100', margin: '18.2%', eps: '₹17.05' },
    { quarter: 'FY26 Q2 (Current)', rev: '₹1,42,85,000', pat: '₹26,10,200', margin: '18.3%', eps: '₹17.40' }
  ];

  return (
    <DashboardLayout
      category="Finance & Accounting"
      subcategory="Net Profit"
      title="Net Profit (PAT) & Bottom-Line Intelligence"
      subtitle="Final statutory earnings after tax and financing obligations, quarterly profit expansion, and dividend retention"
      icon="🏆"
      badge=""
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => alert('Downloading official audited Net Profit (PAT) statement...')}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: '1px solid #10b981',
              background: 'rgba(16,185,129,0.15)',
              color: '#34d399',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            🏆 Export PAT Statement
          </button>
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Net Profit (PAT)" value="₹26,10,200" delta="+14.8% YoY" trend="up" subtext="Current month surplus" icon="🏆" />
        <KpiCard label="Net Profit Margin" value="18.3%" delta="+2.8% pts" trend="up" subtext="Net margin" icon="📈" />
        <KpiCard label="Profit Before Tax (PBT)" value="₹34,80,267" delta="+13.5% YoY" trend="up" subtext="Operating surplus" icon="💼" />
        <KpiCard label="Effective Tax Rate" value="25.0%" delta="Stable" trend="neutral" subtext="Standard corporate slab" icon="🏛️" />
        <KpiCard label="Annualized PAT Run-rate" value="₹3.13 Cr" delta="+14.8%" trend="up" subtext="For hospital builds" icon="🏗️" />
        <KpiCard label="Earnings Per Share (EPS)" value="₹17.40 / share" delta="+12.4%" trend="up" subtext="Common shares" icon="💎" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '20px' }}>
        {/* Waterfall from EBITDA to PAT */}
        <div style={{
          background: 'var(--card, #131d2e)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '12px',
          padding: '22px 24px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#fff' }}>💧 Net Profit Waterfall Bridge</h3>
              <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>From operating EBITDA to bottom-line PAT</p>
            </div>
            <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>Audited Accrual</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {netProfitSteps.map((s, idx) => (
              <div key={idx} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 16px',
                borderRadius: '8px',
                background: s.isKey ? 'rgba(16,185,129,0.12)' : 'rgba(0,0,0,0.18)',
                border: s.isKey ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(255,255,255,0.06)'
              }}>
                <div>
                  <b style={{ color: s.isKey ? '#34d399' : '#fff', fontSize: '12px' }}>{s.step}</b>
                  <div style={{ fontSize: '10px', color: '#94a3b8' }}>{s.note}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontWeight: 700,
                    fontSize: s.isKey ? '15px' : '13px',
                    color: s.isKey ? '#34d399' : s.amt.startsWith('-') ? '#f87171' : '#38bdf8'
                  }}>
                    {s.amt}
                  </div>
                  <div style={{ fontSize: '10px', color: '#94a3b8' }}>{s.margin}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quarterly PAT Growth Trend */}
        <div style={{
          background: 'var(--card, #131d2e)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '12px',
          padding: '22px 24px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#fff' }}>📈 Quarterly Net Profit Progression</h3>
              <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Consecutive quarterly margin expansion</p>
            </div>
            <span style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 600 }}>4 Consecutive Quarters</span>
          </div>

          <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ background: 'rgba(0,0,0,0.22)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <th style={{ padding: '10px 20px', textAlign: 'left', color: '#94a3b8' }}>Quarter</th>
                  <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Revenue</th>
                  <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Net PAT</th>
                  <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Margin</th>
                  <th style={{ padding: '10px 20px', textAlign: 'right', color: '#94a3b8' }}>EPS</th>
                </tr>
              </thead>
              <tbody>
                {quarterlyPAT.map((q, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '12px 20px', color: '#fff', fontWeight: 600 }}>{q.quarter}</td>
                    <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{q.rev}</td>
                    <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#10b981' }}>{q.pat}</td>
                    <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#38bdf8', fontWeight: 600 }}>{q.margin}</td>
                    <td style={{ padding: '12px 20px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#cbd5e1' }}>{q.eps}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
