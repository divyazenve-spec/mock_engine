import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function FinanceReport() {
  const [toast, setToast] = useState('');

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const plItems = [
    { line: 'Net Operating Revenue (Consolidated GMV)', mtd: 26850000, priorMtd: 22900000, variance: '+17.2%', note: 'Accelerated by 60-min express & hospital beds' },
    { line: 'Cost of Goods Sold (Pharmaceuticals & Nutrition)', mtd: -14230000, priorMtd: -12360000, variance: '+15.1%', note: 'Improved bulk supplier tier discounts' },
    { line: 'Gross Profit (Operational Margin)', mtd: 12620000, priorMtd: 10540000, variance: '+19.7%', note: 'Gross margin expanded to 47.0%' },
    { line: 'Veterinary Doctors & Specialists Honorarium', mtd: -3140000, priorMtd: -2780000, variance: '+12.9%', note: '36 contracted full-time & consulting surgeons' },
    { line: 'Logistics, Dark Stores & 60-Min EV Fleet', mtd: -2080000, priorMtd: -1890000, variance: '+10.1%', note: 'Route density reduced per-drop cost to ₹39.80' },
    { line: 'Performance Marketing & Customer Acquisition', mtd: -1520000, priorMtd: -1680000, variance: '-9.5%', note: 'CAC reduced by 14% via organic referrals' },
    { line: 'Cloud Infrastructure, Telehealth & AI Systems', mtd: -740000, priorMtd: -680000, variance: '+8.8%', note: 'AWS HIPAA-compliant cluster & WebRTC' },
    { line: 'General Corporate Overhead & Quality Assurance', mtd: -890000, priorMtd: -840000, variance: '+6.0%', note: 'Facility leasing, ISO certifications & legal' },
    { line: 'Operating EBITDA (Normalized Run-Rate)', mtd: 4250000, priorMtd: 2670000, variance: '+59.2%', note: 'Record 15.8% operating EBITDA margin' },
    { line: 'Profit Before Tax (PBT)', mtd: 3820000, priorMtd: 2290000, variance: '+66.8%', note: 'Net corporate income after depreciation allowance' }
  ];

  const inr = (n) => {
    const isNeg = n < 0;
    const abs = Math.abs(n);
    const formatted = '₹' + (abs / 100000).toFixed(2) + ' Lakhs';
    return isNeg ? `(${formatted})` : formatted;
  };

  const downloadCSV = () => {
    const rows = [
      ['P&L Line Item', 'October 2026 MTD (INR)', 'Prior Month MTD (INR)', 'Variance YoY', 'Notes & Rationale'],
      ...plItems.map(p => [`"${p.line}"`, p.mtd, p.priorMtd, p.variance, `"${p.note}"`])
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(',')).join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `zenve_financial_pl_report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('Financial P&L Report CSV exported.');
  };

  return (
    <DashboardLayout
      category="Reports & Analytics"
      subcategory="Finance Reports"
      title="Financial P&L & EBITDA Statement Report"
      subtitle="Corporate Profit & Loss statement, gross contribution margin analysis, operating cost breakdown, and EBITDA reconciliation"
      icon="💰"
      badge=""
      actions={
        <button
          onClick={downloadCSV}
          style={{
            padding: '8px 14px',
            borderRadius: '8px',
            background: 'var(--primary, #3b82f6)',
            color: '#ffffff',
            border: 'none',
            fontWeight: 600,
            fontSize: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span>📥</span> Download P&L CSV
        </button>
      }
    >
      {toast && (
        <div style={{
          padding: '10px 16px',
          background: 'rgba(59,130,246,0.15)',
          border: '1px solid #3b82f6',
          borderRadius: '8px',
          color: '#60a5fa',
          fontSize: '13px',
          fontWeight: 600
        }}>
          ⚡ {toast}
        </div>
      )}

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Net Operating Revenue" value="₹2.68 Cr" delta="+17.2%" trend="up" subtext="October 2026 MTD" icon="📈" />
        <KpiCard label="Gross Profit Margin" value="47.0%" delta="+2.5%" trend="up" subtext="Gross contribution margin" icon="🛡️" />
        <KpiCard label="EBITDA Generated" value="₹42.50 Lakhs" delta="+59.2%" trend="up" subtext="Operating EBITDA run-rate" icon="💎" />
        <KpiCard label="Net Cash Runway" value="28 Months" delta="+4 Months" trend="up" subtext="Treasury liquid reserves" icon="🏦" />
      </div>

      {/* Table Section */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Monthly Profit & Loss Executive Statement (October 2026 MTD)</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)' }}>
                <th style={{ padding: '10px 12px' }}>Line Item Description</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>October MTD</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Prior MTD</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>YoY Variance</th>
                <th style={{ padding: '10px 12px' }}>Accounting Notes</th>
              </tr>
            </thead>
            <tbody>
              {plItems.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: '24px', textAlign: 'center', color: 'var(--muted-foreground, #94a3b8)' }}>
                    No financial statement line items found
                  </td>
                </tr>
              ) : (
                plItems.map((p) => {
                  const isHighlight = p.line.indexOf('Net Operating') >= 0 || p.line.indexOf('Gross Profit') >= 0 || p.line.indexOf('EBITDA') >= 0 || p.line.indexOf('PBT') >= 0;
                  return (
                    <tr key={p.line} style={{
                      borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))',
                      background: isHighlight ? 'rgba(59,130,246,0.06)' : 'transparent'
                    }}>
                      <td style={{ padding: '12px', fontWeight: isHighlight ? 700 : 500, color: isHighlight ? '#60a5fa' : 'var(--foreground, #f8fafc)' }}>
                        {p.line}
                      </td>
                      <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>
                        {inr(p.mtd)}
                      </td>
                      <td style={{ padding: '12px', textAlign: 'right', color: 'var(--muted-foreground, #94a3b8)', fontFamily: '"IBM Plex Mono", monospace' }}>
                        {inr(p.priorMtd)}
                      </td>
                      <td style={{ padding: '12px', textAlign: 'right', fontWeight: 600, color: p.variance.startsWith('+') ? '#34d399' : '#f87171', fontFamily: '"IBM Plex Mono", monospace' }}>
                        {p.variance}
                      </td>
                      <td style={{ padding: '12px', color: 'var(--muted-foreground, #94a3b8)', fontSize: '11px' }}>
                        {p.note}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
