import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function CustomerLifetimeValue() {
  const ltvSegments = [
    { segment: 'VIP Diamond Cohort (Top 2%)', customers: 250, avgLifespan: '38 Months', avgAnnualSpend: '₹1,95,000', ltvValue: '₹6,17,500', marginContrib: '44.5%', ltvCac: '18.2x' },
    { segment: 'Elite Multi-Pet Gold (Top 8%)', customers: 980, avgLifespan: '32 Months', avgAnnualSpend: '₹1,24,000', ltvValue: '₹3,30,600', marginContrib: '41.2%', ltvCac: '12.4x' },
    { segment: 'Chronic Care & Medical (Top 15%)', customers: 1450, avgLifespan: '28 Months', avgAnnualSpend: '₹88,000', ltvValue: '₹2,05,300', marginContrib: '38.6%', ltvCac: '9.8x' },
    { segment: 'Subscription Food & Essentials', customers: 2860, avgLifespan: '24 Months', avgAnnualSpend: '₹54,000', ltvValue: '₹1,08,000', marginContrib: '32.4%', ltvCac: '7.6x' },
    { segment: 'Regular Care & Grooming', customers: 2240, avgLifespan: '18 Months', avgAnnualSpend: '₹36,000', ltvValue: '₹54,000', marginContrib: '36.8%', ltvCac: '5.4x' },
    { segment: 'Occasional Clinic & Retail', customers: 1890, avgLifespan: '14 Months', avgAnnualSpend: '₹22,000', ltvValue: '₹25,600', marginContrib: '28.5%', ltvCac: '3.8x' },
    { segment: 'Digital App Shoppers (Single Cat)', customers: 1120, avgLifespan: '16 Months', avgAnnualSpend: '₹26,000', ltvValue: '₹34,600', marginContrib: '31.0%', ltvCac: '4.6x' },
    { segment: 'Fashion & Accessories Shoppers', customers: 640, avgLifespan: '12 Months', avgAnnualSpend: '₹18,500', ltvValue: '₹18,500', marginContrib: '48.2%', ltvCac: '3.2x' },
    { segment: 'Emergency & One-Off Clinic', customers: 720, avgLifespan: '8 Months', avgAnnualSpend: '₹14,000', ltvValue: '₹9,300', marginContrib: '35.0%', ltvCac: '2.1x' },
    { segment: 'Reactivated Dormant Accounts', customers: 330, avgLifespan: '10 Months', avgAnnualSpend: '₹16,200', ltvValue: '₹13,500', marginContrib: '29.8%', ltvCac: '2.8x' }
  ];

  const cardStyle = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Customers 360°"
      subcategory="Unit Economics & Value"
      title="Customer Lifetime Value (LTV) & CAC Multiples"
      subtitle="Cohort lifetime economics, predictive CLV models, customer gross margin contribution, and LTV:CAC ratios"
      icon="💎"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Average Blended LTV" value="₹42,650" delta="+14.6%" trend="up" subtext="Across all cohorts" icon="💎" />
        <KpiCard label="Blended LTV : CAC Multiple" value="8.4x" delta="+1.2x" trend="up" subtext="Top-tier capital efficiency" icon="📈" />
        <KpiCard label="Average Customer Lifespan" value="21.4 Months" delta="+3.8 Mo" trend="up" subtext="Subscribers & clinic clients" icon="⏳" />
        <KpiCard label="Cumulative Cohort GMV" value="₹14.8 Cr" delta="+26.2%" trend="up" subtext="Realized value since launch" icon="💰" />
      </div>

      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>💎 Customer Lifetime Value (LTV) Tier Breakdown</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border, #e2e8f0)', textAlign: 'left', color: 'var(--muted-foreground, #475569)' }}>
                <th style={{ padding: '10px' }}>Value Tier Segment</th>
                <th style={{ padding: '10px' }}>Active Customers</th>
                <th style={{ padding: '10px' }}>Avg Lifespan</th>
                <th style={{ padding: '10px' }}>Annual Spend</th>
                <th style={{ padding: '10px' }}>Estimated LTV</th>
                <th style={{ padding: '10px' }}>Gross Margin %</th>
                <th style={{ padding: '10px' }}>LTV : CAC Multiple</th>
              </tr>
            </thead>
            <tbody>
              {ltvSegments.length === 0 ? (<tr><td colSpan="7" style={{ textAlign: "center", padding: "32px", color: "var(--muted-foreground, #64748b)" }}>No LTV segment records found</td></tr>) : ltvSegments.map((s, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{s.segment}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{s.customers.toLocaleString()}</td>
                  <td style={{ padding: '10px', color: '#64748b' }}>{s.avgLifespan}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{s.avgAnnualSpend}</td>
                  <td style={{ padding: '10px', fontWeight: 700, color: '#059669' }}>{s.ltvValue}</td>
                  <td style={{ padding: '10px' }}>{s.marginContrib}</td>
                  <td style={{ padding: '10px', fontWeight: 700, color: '#2563eb' }}>{s.ltvCac}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
