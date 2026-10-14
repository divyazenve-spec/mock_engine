import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function CustomerReport() {
  const [toast, setToast] = useState('');

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const cohorts = [
    { cohort: 'VIP Titanium Pet Parents (Multi-Pet)', count: 2450, pct: 13.8, avgOrders: 8.4, ltv: 48500, repeatRate: '94.2%', churn: '1.2%' },
    { cohort: 'Monthly Wellness & Diet Subscribers', count: 3820, pct: 21.6, avgOrders: 6.2, ltv: 32400, repeatRate: '88.5%', churn: '2.8%' },
    { cohort: 'Active Prescription & Chronic Care', count: 2190, pct: 12.4, avgOrders: 5.7, ltv: 29800, repeatRate: '84.0%', churn: '3.1%' },
    { cohort: 'Premium Breed Champions', count: 1840, pct: 10.4, avgOrders: 4.8, ltv: 24200, repeatRate: '79.6%', churn: '4.5%' },
    { cohort: 'Puppy & Kitten Onboarding (0-1 yr)', count: 2980, pct: 16.8, avgOrders: 3.9, ltv: 18600, repeatRate: '72.1%', churn: '5.8%' },
    { cohort: 'Senior Pet Specialized Care (7+ yrs)', count: 1420, pct: 8.0, avgOrders: 5.1, ltv: 26700, repeatRate: '81.4%', churn: '3.6%' },
    { cohort: 'Bi-Monthly Grooming & Spa Cohort', count: 1160, pct: 6.5, avgOrders: 3.2, ltv: 14500, repeatRate: '68.0%', churn: '6.2%' },
    { cohort: 'Occasional Express Delivery Buyers', count: 980, pct: 5.5, avgOrders: 2.1, ltv: 8900, repeatRate: '46.5%', churn: '9.8%' },
    { cohort: 'Newly Registered Onboarders (<30d)', count: 640, pct: 3.6, avgOrders: 1.4, ltv: 4200, repeatRate: '38.2%', churn: '12.4%' },
    { cohort: 'At-Risk Dormant Accounts (>90d)', count: 240, pct: 1.4, avgOrders: 1.1, ltv: 3100, repeatRate: '14.0%', churn: '24.5%' }
  ];

  const inr = (n) => '₹' + Number(n).toLocaleString('en-IN');

  const downloadCSV = () => {
    const rows = [
      ['Customer Cohort / Segment', 'Total Pet Parents', 'Share (%)', 'Avg Orders', 'Average LTV (INR)', 'Repeat Purchase Rate', '30-Day Churn Rate'],
      ...cohorts.map(c => [c.cohort, c.count, c.pct + '%', c.avgOrders, c.ltv, c.repeatRate, c.churn])
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(',')).join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `zenve_customer_cohort_report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('Customer Report CSV exported successfully.');
  };

  return (
    <DashboardLayout
      category="Reports & Analytics"
      subcategory="Customer Reports"
      title="Customer Demographics, LTV & Retention Report"
      subtitle="Comprehensive cohort analytics, Lifetime Value (LTV), repeat purchase frequency, and RFM segmentation for registered pet parents"
      icon="👥"
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
          <span>📥</span> Download Cohort CSV
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
        <KpiCard label="Total Registered Pet Parents" value="17,720 Parents" delta="+12.8%" trend="up" subtext="Registered base" icon="🐾" />
        <KpiCard label="Average Blended LTV" value="₹24,800" delta="+9.4%" trend="up" subtext="Lifetime value" icon="💎" />
        <KpiCard label="Repeat Order Rate" value="76.4%" delta="+4.2%" trend="up" subtext="Target: 70.0%" icon="🔄" />
        <KpiCard label="Monthly Churn Rate" value="3.8%" delta="-0.6%" trend="up" subtext="Current period" icon="🛡️" />
      </div>

      {/* Table Section */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>RFM Segmentation & Cohort Retention Analysis</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)' }}>
                <th style={{ padding: '10px 12px' }}>Cohort / Segment</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Total Parents</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Share of Base</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Avg Orders</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Average LTV</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Repeat Rate</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Churn Rate</th>
              </tr>
            </thead>
            <tbody>
              {cohorts.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '24px', textAlign: 'center', color: 'var(--muted-foreground, #94a3b8)' }}>
                    No customer cohort records found
                  </td>
                </tr>
              ) : (
                cohorts.map((c) => (
                  <tr key={c.cohort} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{c.cohort}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{c.count.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{c.pct}%</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{c.avgOrders}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, color: '#34d399', fontFamily: '"IBM Plex Mono", monospace' }}>{inr(c.ltv)}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{c.repeatRate}</td>
                    <td style={{ padding: '12px', textAlign: 'right', color: Number(c.churn.replace('%','')) > 10 ? '#f87171' : '#60a5fa', fontFamily: '"IBM Plex Mono", monospace' }}>{c.churn}</td>
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
