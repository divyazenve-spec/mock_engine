import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function CustomerAcquisition() {
  const cohorts = [
  {
    "cohort": "Cohort Oct 2026",
    "acquired": "618",
    "m1Repeat": "38.2%",
    "m2Repeat": "29.4%",
    "aov": "₹2,150",
    "ltv60d": "₹3,420",
    "retention": "Exceptional"
  },
  {
    "cohort": "Cohort Sep 2026",
    "acquired": "594",
    "m1Repeat": "37.5%",
    "m2Repeat": "28.8%",
    "aov": "₹2,080",
    "ltv60d": "₹3,280",
    "retention": "Strong"
  },
  {
    "cohort": "Cohort Aug 2026",
    "acquired": "580",
    "m1Repeat": "36.8%",
    "m2Repeat": "28.1%",
    "aov": "₹2,040",
    "ltv60d": "₹3,190",
    "retention": "Strong"
  },
  {
    "cohort": "Cohort Jul 2026",
    "acquired": "552",
    "m1Repeat": "35.9%",
    "m2Repeat": "27.5%",
    "aov": "₹1,980",
    "ltv60d": "₹3,110",
    "retention": "Healthy"
  },
  {
    "cohort": "Cohort Jun 2026",
    "acquired": "530",
    "m1Repeat": "35.2%",
    "m2Repeat": "26.8%",
    "aov": "₹1,940",
    "ltv60d": "₹3,050",
    "retention": "Healthy"
  },
  {
    "cohort": "Cohort May 2026",
    "acquired": "515",
    "m1Repeat": "34.8%",
    "m2Repeat": "26.2%",
    "aov": "₹1,910",
    "ltv60d": "₹2,980",
    "retention": "Healthy"
  },
  {
    "cohort": "Cohort Apr 2026",
    "acquired": "490",
    "m1Repeat": "34.1%",
    "m2Repeat": "25.7%",
    "aov": "₹1,870",
    "ltv60d": "₹2,920",
    "retention": "Healthy"
  },
  {
    "cohort": "Cohort Mar 2026",
    "acquired": "465",
    "m1Repeat": "33.6%",
    "m2Repeat": "25.1%",
    "aov": "₹1,840",
    "ltv60d": "₹2,860",
    "retention": "Stable"
  },
  {
    "cohort": "Cohort Feb 2026",
    "acquired": "440",
    "m1Repeat": "33.0%",
    "m2Repeat": "24.8%",
    "aov": "₹1,810",
    "ltv60d": "₹2,810",
    "retention": "Stable"
  },
  {
    "cohort": "Cohort Jan 2026",
    "acquired": "420",
    "m1Repeat": "32.4%",
    "m2Repeat": "24.2%",
    "aov": "₹1,780",
    "ltv60d": "₹2,750",
    "retention": "Stable"
  }
];

  return (
    <DashboardLayout
      category="Marketing"
      subcategory="Customer Acquisition"
      title="Customer Acquisition & Cohort Retention"
      subtitle="Monthly pet parent acquisition cohorts, 30-day / 60-day repeat orders, and LTV progression"
      icon="🐾"
      badge="618 Acquired MTD"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="New Customers (MTD)" value="618" delta="+18.4% MoM" trend="up" subtext="First paid transaction" icon="👥" />
        <KpiCard label="30D Repeat Rate" value="38.2%" delta="+2.4% MoM" trend="up" subtext="Rx refills & nutrition" icon="🔄" />
        <KpiCard label="First Order AOV" value="₹2,150" delta="+₹150 vs target" trend="up" subtext="Average basket size" icon="🛍️" />
        <KpiCard label="60D Customer LTV" value="₹3,420" delta="+11.8%" trend="up" subtext="Pet lifetime value" icon="💎" />
      </div>

      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Monthly Cohort Repeat Behavior & 60D LTV</h3>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Retention tracking across acquired pet parent cohorts</p>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <th style={{ padding: '12px 16px' }}>Cohort</th>
                <th style={{ padding: '12px 16px' }}>Acquired Pet Parents</th>
                <th style={{ padding: '12px 16px' }}>30-Day Repeat</th>
                <th style={{ padding: '12px 16px' }}>60-Day Repeat</th>
                <th style={{ padding: '12px 16px' }}>First AOV</th>
                <th style={{ padding: '12px 16px' }}>60-Day LTV</th>
                <th style={{ padding: '12px 16px' }}>Retention Health</th>
              </tr>
            </thead>
            <tbody>
              {cohorts.map(c => (
                <tr key={c.cohort} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 600, color: '#0f172a' }}>{c.cohort}</td>
                  <td style={{ padding: '14px 16px', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{c.acquired}</td>
                  <td style={{ padding: '14px 16px', fontFamily: '"IBM Plex Mono", monospace', color: '#16a34a', fontWeight: 600 }}>{c.m1Repeat}</td>
                  <td style={{ padding: '14px 16px', fontFamily: '"IBM Plex Mono", monospace' }}>{c.m2Repeat}</td>
                  <td style={{ padding: '14px 16px', fontFamily: '"IBM Plex Mono", monospace' }}>{c.aov}</td>
                  <td style={{ padding: '14px 16px', fontFamily: '"IBM Plex Mono", monospace', color: '#2563eb', fontWeight: 700 }}>{c.ltv60d}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: '4px', background: '#dcfce7', color: '#15803d', fontWeight: 600, fontSize: '11px' }}>{c.retention}</span>
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
