import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function SubscriptionAnalytics() {
  const cohorts = [
    { cohort: 'Cohort Oct 2025', startingUsers: 180, m3Ret: '94.4%', m6Ret: '91.2%', m9Ret: '88.5%', cumulativeLtv: '₹36,400', ltvCacRatio: '5.2x LTV/CAC' },
    { cohort: 'Cohort Nov 2025', startingUsers: 210, m3Ret: '95.2%', m6Ret: '92.0%', m9Ret: '89.1%', cumulativeLtv: '₹34,200', ltvCacRatio: '4.8x LTV/CAC' },
    { cohort: 'Cohort Dec 2025', startingUsers: 245, m3Ret: '94.8%', m6Ret: '91.5%', m9Ret: '88.0%', cumulativeLtv: '₹32,800', ltvCacRatio: '4.6x LTV/CAC' },
    { cohort: 'Cohort Jan 2026', startingUsers: 220, m3Ret: '96.0%', m6Ret: '93.1%', m9Ret: '89.8%', cumulativeLtv: '₹31,500', ltvCacRatio: '5.1x LTV/CAC' },
    { cohort: 'Cohort Feb 2026', startingUsers: 195, m3Ret: '95.5%', m6Ret: '92.8%', m9Ret: '89.2%', cumulativeLtv: '₹28,600', ltvCacRatio: '4.9x LTV/CAC' },
    { cohort: 'Cohort Mar 2026', startingUsers: 260, m3Ret: '96.4%', m6Ret: '93.5%', m9Ret: '90.2%', cumulativeLtv: '₹26,400', ltvCacRatio: '5.4x LTV/CAC' },
    { cohort: 'Cohort Apr 2026', startingUsers: 230, m3Ret: '95.8%', m6Ret: '92.6%', m9Ret: '89.5%', cumulativeLtv: '₹22,800', ltvCacRatio: '4.7x LTV/CAC' },
    { cohort: 'Cohort May 2026', startingUsers: 275, m3Ret: '96.2%', m6Ret: '93.4%', m9Ret: '90.1%', cumulativeLtv: '₹19,500', ltvCacRatio: '5.0x LTV/CAC' },
    { cohort: 'Cohort Jun 2026', startingUsers: 290, m3Ret: '96.8%', m6Ret: '94.0%', m9Ret: '90.8%', cumulativeLtv: '₹16,200', ltvCacRatio: '5.3x LTV/CAC' },
    { cohort: 'Cohort Jul 2026', startingUsers: 310, m3Ret: '97.1%', m6Ret: '94.5%', m9Ret: '91.4%', cumulativeLtv: '₹12,800', ltvCacRatio: '5.6x LTV/CAC' }
  ];

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Subscriptions"
      subcategory="Analytics"
      title="Cohort Retention & Lifetime Value (LTV) Deep-Dive"
      subtitle="Multi-month retention heatmaps, customer lifetime value expansion, payback velocity, and subscriber health scores"
      icon="📊"
      badge="10"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Blended LTV / CAC" value="5.1x" delta="World-class > 3.0x" trend="up" subtext="Healthy acquisition engine" icon="📊" />
        <KpiCard label="Average Customer Lifetime" value="18.4 Months" delta="+2.6 mo vs FY25" trend="up" subtext="Long-term pet relationship" icon="⏱️" />
        <KpiCard label="Quick Ratio (Growth / Churn)" value="4.8x" delta="New vs Lost MRR" trend="up" subtext="Growth vs churn velocity" icon="🚀" />
        <KpiCard label="Net Revenue Retention (NRR)" value="114.8%" delta="+14.8% expansion" trend="up" subtext="Net retention rate" icon="📈" />
      </div>

      <div style={card}>
        <h3 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Subscriber Cohort Retention Analysis ({cohorts.length} Cohorts)</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Month-over-month cohort retention longevity, cumulative customer LTV, and unit efficiency</p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)' }}>
                <th style={{ padding: '10px 12px' }}>Signup Cohort</th>
                <th style={{ padding: '10px 12px' }}>Starting Subscribers</th>
                <th style={{ padding: '10px 12px' }}>Month 3 Retention</th>
                <th style={{ padding: '10px 12px' }}>Month 6 Retention</th>
                <th style={{ padding: '10px 12px' }}>Month 9 Retention</th>
                <th style={{ padding: '10px 12px' }}>Cumulative LTV</th>
                <th style={{ padding: '10px 12px' }}>LTV / CAC Multiple</th>
              </tr>
            </thead>
            <tbody>
              {cohorts.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '24px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                    No subscriber cohort retention records found
                  </td>
                </tr>
              ) : (
                cohorts.map(c => (
                  <tr key={c.cohort} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{c.cohort}</td>
                    <td style={{ padding: '12px' }}>{c.startingUsers} Pets</td>
                    <td style={{ padding: '12px', color: '#059669', fontWeight: 600 }}>{c.m3Ret}</td>
                    <td style={{ padding: '12px', color: '#059669', fontWeight: 600 }}>{c.m6Ret}</td>
                    <td style={{ padding: '12px', color: '#059669', fontWeight: 600 }}>{c.m9Ret}</td>
                    <td style={{ padding: '12px', fontWeight: 600, color: '#4338ca' }}>{c.cumulativeLtv}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ padding: '3px 8px', borderRadius: '999px', fontSize: '10px', fontWeight: 600, background: 'rgba(16,185,129,0.12)', color: '#059669' }}>
                        {c.ltvCacRatio}
                      </span>
                    </td>
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
