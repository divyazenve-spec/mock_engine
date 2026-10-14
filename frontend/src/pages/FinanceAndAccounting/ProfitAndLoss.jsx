import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ProfitAndLoss() {
  const [period, setPeriod] = useState('FY 2026-27 Q2');

  const pnlWaterfall = [
    { code: 'REV-01', line: 'Gross Clinical Outpatient (OPD) Consultations', type: 'Revenue', actual: '₹54,20,000', budget: '₹50,00,000', var: '+8.4%', pctOfRev: '37.9%' },
    { code: 'REV-02', line: 'Inpatient Surgical & Orthopedic Case Fees', type: 'Revenue', actual: '₹38,60,000', budget: '₹35,00,000', var: '+10.3%', pctOfRev: '27.0%' },
    { code: 'REV-03', line: 'Pharmacy & Cold-Chain Biological Sales', type: 'Revenue', actual: '₹28,45,000', budget: '₹26,50,000', var: '+7.4%', pctOfRev: '19.9%' },
    { code: 'REV-04', line: 'In-House Diagnostic Pathology & Ultrasound Scans', type: 'Revenue', actual: '₹14,80,000', budget: '₹14,00,000', var: '+5.7%', pctOfRev: '10.4%' },
    { code: 'REV-05', line: 'B2B Corporate Wellness & Kennel Health Contracts', type: 'Revenue', actual: '₹6,80,000', budget: '₹6,50,000', var: '+4.6%', pctOfRev: '4.8%' },
    { code: 'TOT-REV', line: 'Consolidated Gross Operating Revenue', type: 'KeyResult', actual: '₹1,42,85,000', budget: '₹1,32,00,000', var: '+8.2%', pctOfRev: '100.0%' },
    { code: 'COG-01', line: 'Direct Pharmaceuticals, Titanium Implants & Consumables', type: 'COGS', actual: '₹62,85,000', budget: '₹63,00,000', var: '-0.2%', pctOfRev: '44.0%' },
    { code: 'TOT-GP', line: 'Gross Operating Profit (Gross Margin)', type: 'KeyResult', actual: '₹80,00,000', budget: '₹69,00,000', var: '+15.9%', pctOfRev: '56.0%' },
    { code: 'OPX-01', line: 'Staffing, Leases, Bio-Waste & Admin Overheads', type: 'OPEX', actual: '₹45,71,600', budget: '₹45,00,000', var: '+1.6%', pctOfRev: '32.0%' },
    { code: 'NET-PAT', line: 'Net Profit After Tax (PAT)', type: 'KeyResult', actual: '₹26,10,200', budget: '₹18,00,000', var: '+45.0%', pctOfRev: '18.3%' }
  ];

  return (
    <DashboardLayout
      category="Finance & Accounting"
      subcategory="Profit & Loss"
      title="Profit & Loss Statement (P&L / Income Statement)"
      subtitle="Audited GAAP & Ind-AS income statement, operating revenue streams, cost absorption, and net profit margins"
      icon="📈"
      badge="PAT Margin: 18.3%"
      actions={
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: '#090e17',
              color: '#cbd5e1',
              fontSize: '12px'
            }}
          >
            <option value="FY 2026-27 Q2">FY 2026-27 Q2 (Current)</option>
            <option value="FY 2026-27 Q1">FY 2026-27 Q1</option>
            <option value="FY 2025-26 Full Year">FY 2025-26 Full Year</option>
          </select>
          <button
            onClick={() => alert('Downloading official GAAP P&L statement...')}
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
            📊 Export Signed P&L
          </button>
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Gross Revenue" value="₹1,42,85,000" delta="+18.4%" trend="up" subtext="Top line inflow" icon="💰" />
        <KpiCard label="Cost of Goods Sold" value="₹62,85,000" delta="44.0% of rev" trend="down" subtext="Direct medical cost" icon="📦" />
        <KpiCard label="Gross Profit" value="₹80,00,000" delta="+56.0% margin" trend="up" subtext="Gross contribution" icon="📊" />
        <KpiCard label="Operating OPEX" value="₹45,71,600" delta="32.0% burn" trend="neutral" subtext="Controlled overheads" icon="🏢" />
        <KpiCard label="Operating EBITDA" value="₹34,28,400" delta="+24.0% margin" trend="up" subtext="Operating surplus" icon="⚡" />
        <KpiCard label="Net Profit (PAT)" value="₹26,10,200" delta="+18.3% margin" trend="up" subtext="Clean net earnings" icon="🏆" />
      </div>

      <div style={{
        background: 'var(--card, #131d2e)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '22px 24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#fff' }}>📑 Detailed Income Statement & Waterfall (All Figures in INR)</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Period: {period} · Statutory Audit Ready</p>
          </div>
          <span style={{ fontSize: '11px', padding: '3px 9px', borderRadius: '4px', background: 'rgba(59,130,246,0.15)', color: '#60a5fa', fontWeight: 600 }}>Standard GAAP / Ind-AS 1</span>
        </div>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.22)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <th style={{ padding: '10px 20px', textAlign: 'left', color: '#94a3b8' }}>Line Item Code & Description</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#94a3b8' }}>Classification</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Actual</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Approved Budget</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Variance</th>
                <th style={{ padding: '10px 20px', textAlign: 'right', color: '#94a3b8' }}>% of Revenue</th>
              </tr>
            </thead>
            <tbody>
              {pnlWaterfall.map((row, idx) => {
                const isKey = row.type === 'KeyResult';
                const isSub = row.type === 'Subtotal';
                return (
                  <tr key={idx} style={{
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    background: isKey ? 'rgba(56,189,248,0.07)' : isSub ? 'rgba(255,255,255,0.03)' : 'transparent',
                    fontWeight: isKey || isSub ? 700 : 400
                  }}>
                    <td style={{ padding: '11px 20px', color: isKey ? '#38bdf8' : isSub ? '#fff' : '#cbd5e1' }}>
                      <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px', color: '#64748b', marginRight: '8px' }}>{row.code}</span>
                      {row.line}
                    </td>
                    <td style={{ padding: '11px 14px' }}>
                      <span style={{
                        padding: '2px 7px',
                        borderRadius: '4px',
                        fontSize: '10px',
                        background: row.type === 'Revenue' ? 'rgba(16,185,129,0.15)' : row.type === 'COGS' ? 'rgba(239,68,68,0.15)' : row.type === 'OPEX' ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.08)',
                        color: row.type === 'Revenue' ? '#34d399' : row.type === 'COGS' ? '#f87171' : row.type === 'OPEX' ? '#fbbf24' : '#cbd5e1'
                      }}>
                        {row.type}
                      </span>
                    </td>
                    <td style={{ padding: '11px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: isKey ? '#38bdf8' : '#f8fafc' }}>{row.actual}</td>
                    <td style={{ padding: '11px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#94a3b8' }}>{row.budget}</td>
                    <td style={{ padding: '11px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: row.var.startsWith('+') ? '#10b981' : '#f87171' }}>{row.var}</td>
                    <td style={{ padding: '11px 20px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#94a3b8' }}>{row.pctOfRev}</td>
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
