import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function RevenueReport() {
  const [toast, setToast] = useState('');

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const buData = [
    { bu: 'Veterinary Clinical Network', lead: 'Dr. Arjun Mehta', mtdRev: 4820000, target: 4500000, attainment: 107.1, margin: 52.4, growth: '+24.5%' },
    { bu: '60-Min Express Pharmacy & Feeds', lead: 'Priya Sundaram', mtdRev: 6240000, target: 5800000, attainment: 107.6, margin: 41.2, growth: '+38.2%' },
    { bu: 'Premium Pet Nutrition & Diet', lead: 'Vikram Seth', mtdRev: 4150000, target: 4200000, attainment: 98.8, margin: 38.5, growth: '+18.1%' },
    { bu: 'Grooming Salons & Mobile Vans', lead: 'Ananya Rao', mtdRev: 2180000, target: 2000000, attainment: 109.0, margin: 58.0, growth: '+29.4%' },
    { bu: 'Diagnostic Laboratory & Imaging', lead: 'Dr. Rajesh Sharma', mtdRev: 2950000, target: 2800000, attainment: 105.4, margin: 64.2, growth: '+21.0%' },
    { bu: 'Pet Insurance & Wellness Plans', lead: 'Karan Mehra', mtdRev: 1820000, target: 1750000, attainment: 104.0, margin: 72.1, growth: '+45.8%' },
    { bu: 'Pet Boarding & Daycare Resorts', lead: 'Sneha Patel', mtdRev: 1240000, target: 1200000, attainment: 103.3, margin: 49.0, growth: '+15.2%' },
    { bu: 'Zenve Pet Club VIP Memberships', lead: 'Rohan Gupta', mtdRev: 1450000, target: 1300000, attainment: 111.5, margin: 82.0, growth: '+52.0%' },
    { bu: 'Prescription Compounding Lab', lead: 'Dr. Neha Kapoor', mtdRev: 860000, target: 800000, attainment: 107.5, margin: 61.5, growth: '+19.3%' },
    { bu: 'International Pet Relocation', lead: 'Capt. Sameer Verma', mtdRev: 1140000, target: 1100000, attainment: 103.6, margin: 46.8, growth: '+27.6%' }
  ];

  const inr = (n) => '₹' + Number(n).toLocaleString('en-IN');

  const downloadCSV = () => {
    const rows = [
      ['Business Unit', 'Lead', 'MTD Revenue (INR)', 'Target (INR)', 'Attainment (%)', 'Gross Margin (%)', 'YoY Growth'],
      ...buData.map(b => [b.bu, b.lead, b.mtdRev, b.target, b.attainment + '%', b.margin + '%', b.growth])
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(',')).join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `zenve_revenue_bu_report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('Revenue Report CSV exported.');
  };

  return (
    <DashboardLayout
      category="Reports & Analytics"
      subcategory="Revenue Reports"
      title="Business Unit & Margin Revenue Report"
      subtitle="Financial performance, recurring subscription revenue, gross contribution margins, and growth trajectory across all 5 operational business units"
      icon="💼"
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
          <span>📥</span> Export Revenue CSV
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
        <KpiCard label="Consolidated Revenue MTD" value="₹2,68,50,000" delta="+17.3%" trend="up" subtext="All 10 business units" icon="💰" />
        <KpiCard label="Target Attainment" value="105.5%" delta="+5.5%" trend="up" subtext="Current period" icon="🎯" />
        <KpiCard label="Blended Gross Margin" value="52.6%" delta="+3.4%" trend="up" subtext="Gross contribution" icon="📈" />
        <KpiCard label="Recurring ARR Run-Rate" value="₹16,40,00,000" delta="+28.2%" trend="up" subtext="Recurring subscriptions" icon="🔄" />
      </div>

      {/* Table Section */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Business Unit Revenue & Contribution Ledger</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)' }}>
                <th style={{ padding: '10px 12px' }}>Business Unit</th>
                <th style={{ padding: '10px 12px' }}>Operational Lead</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>MTD Revenue</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Target</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Attainment</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Gross Margin</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>YoY Growth</th>
              </tr>
            </thead>
            <tbody>
              {buData.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '24px', textAlign: 'center', color: 'var(--muted-foreground, #94a3b8)' }}>
                    No business unit revenue records found
                  </td>
                </tr>
              ) : (
                buData.map((b) => (
                  <tr key={b.bu} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{b.bu}</td>
                    <td style={{ padding: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>{b.lead}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{inr(b.mtdRev)}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{inr(b.target)}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, color: b.attainment >= 100 ? '#34d399' : '#fbbf24', fontFamily: '"IBM Plex Mono", monospace' }}>{b.attainment}%</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{b.margin}%</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, color: '#34d399', fontFamily: '"IBM Plex Mono", monospace' }}>{b.growth}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
