import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function CustomerRetention() {
  const retentionCohorts = [
    { cohortMonth: 'Jan 2024 (Foundation Cohort)', initialSize: 1200, m1: '84.5%', m3: '76.2%', m6: '71.8%', m12: '68.4%', status: 'Exceptional (Top 5%)' },
    { cohortMonth: 'Feb 2024 (Spring Launch)', initialSize: 1450, m1: '82.0%', m3: '74.8%', m6: '69.5%', m12: '66.2%', status: 'Strong Retention' },
    { cohortMonth: 'Mar 2024 (Campaign Scale)', initialSize: 1680, m1: '80.5%', m3: '72.4%', m6: '68.0%', m12: '64.8%', status: 'Stable' },
    { cohortMonth: 'Apr 2024 (Referral Boom)', initialSize: 1920, m1: '85.0%', m3: '78.2%', m6: '73.4%', m12: '69.8%', status: 'Exceptional (Top 5%)' },
    { cohortMonth: 'May 2024 (Vaccination Drive)', initialSize: 2150, m1: '83.2%', m3: '75.6%', m6: '71.0%', m12: '67.5%', status: 'Strong Retention' },
    { cohortMonth: 'Jun 2024 (Monsoon Care)', initialSize: 2340, m1: '81.8%', m3: '73.9%', m6: '69.4%', m12: '65.8%', status: 'Stable' },
    { cohortMonth: 'Jul 2024 (Bengaluru Core)', initialSize: 2580, m1: '84.2%', m3: '77.1%', m6: '72.8%', m12: '68.9%', status: 'Strong Retention' },
    { cohortMonth: 'Aug 2024 (Puppy Fest)', initialSize: 2820, m1: '86.4%', m3: '79.5%', m6: '74.6%', m12: '71.2%', status: 'Exceptional (Top 5%)' },
    { cohortMonth: 'Sep 2024 (Express Delivery Push)', initialSize: 3100, m1: '87.8%', m3: '81.2%', m6: '76.4%', m12: '73.0%', status: 'Best in Class' },
    { cohortMonth: 'Oct 2024 (Diwali & Festive)', initialSize: 3450, m1: '89.2%', m3: '83.0%', m6: '78.2%', m12: '74.5%', status: 'Best in Class' }
  ];

  const cardStyle = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Customers 360°"
      subcategory="Cohort Health & Churn"
      title="Customer Retention & Cohort Decay Curves"
      subtitle="Monthly cohort retention curves, churn rate tracking, at-risk customer indicators, and automated win-back triggers"
      icon="🛡️"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Month-1 Cohort Retention" value="84.6%" delta="+3.8%" trend="up" subtext="Benchmark tracked" icon="🛡️" />
        <KpiCard label="Annual Churn Rate" value="1.8% / mo" delta="-0.6%" trend="up" subtext="Subscribers & repeat clients" icon="📉" />
        <KpiCard label="Win-Back Campaign Success" value="38.4%" delta="+7.2%" trend="up" subtext="Automated reminder triggers" icon="🔄" />
        <KpiCard label="Net Revenue Retention (NRR)" value="124.6%" delta="+8.4%" trend="up" subtext="Expansion revenue from existing base" icon="💎" />
      </div>

      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>🛡️ Longitudinal Cohort Retention Analysis (M1 - M12)</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border, #e2e8f0)', textAlign: 'left', color: 'var(--muted-foreground, #475569)' }}>
                <th style={{ padding: '10px' }}>Cohort Inception</th>
                <th style={{ padding: '10px' }}>Initial Customers</th>
                <th style={{ padding: '10px' }}>Month 1</th>
                <th style={{ padding: '10px' }}>Month 3</th>
                <th style={{ padding: '10px' }}>Month 6</th>
                <th style={{ padding: '10px' }}>Month 12</th>
                <th style={{ padding: '10px' }}>Cohort Health Status</th>
              </tr>
            </thead>
            <tbody>
              {retentionCohorts.length === 0 ? (<tr><td colSpan="7" style={{ textAlign: "center", padding: "32px", color: "var(--muted-foreground, #64748b)" }}>No customer retention cohort records found</td></tr>) : retentionCohorts.map((c, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{c.cohortMonth}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{c.initialSize.toLocaleString()}</td>
                  <td style={{ padding: '10px', color: '#059669', fontWeight: 700 }}>{c.m1}</td>
                  <td style={{ padding: '10px', color: '#059669', fontWeight: 600 }}>{c.m3}</td>
                  <td style={{ padding: '10px', color: '#2563eb', fontWeight: 600 }}>{c.m6}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{c.m12}</td>
                  <td style={{ padding: '10px' }}>
                    <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, background: '#f0fdf4', color: '#16a34a' }}>
                      {c.status}
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
