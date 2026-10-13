import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function CustomerRevenue() {
  const revStreams = [
    { channel: 'Quick Commerce 60-Min Delivery', mtdRev: '₹1,14,50,000', share: '36.8%', avgUserSpend: '₹2,950', grossMargin: '34.2%', growth: '+48.6% ↑' },
    { channel: 'In-Clinic Veterinary Consults', mtdRev: '₹68,20,000', share: '21.9%', avgUserSpend: '₹1,850', grossMargin: '68.4%', growth: '+22.4% ↑' },
    { channel: 'Cold-Chain Prescription Pharmacy', mtdRev: '₹44,80,000', share: '14.4%', avgUserSpend: '₹2,400', grossMargin: '42.0%', growth: '+31.2% ↑' },
    { channel: 'Luxury Grooming & Spa Parlors', mtdRev: '₹28,40,000', share: '9.1%', avgUserSpend: '₹2,800', grossMargin: '58.6%', growth: '+28.5% ↑' },
    { channel: 'Monthly Replenishment Subscriptions', mtdRev: '₹22,60,000', share: '7.3%', avgUserSpend: '₹4,200', grossMargin: '36.0%', growth: '+54.2% ↑' },
    { channel: 'Specialized Surgical & Diagnostic Lab', mtdRev: '₹16,80,000', share: '5.4%', avgUserSpend: '₹7,600', grossMargin: '64.0%', growth: '+18.0% ↑' },
    { channel: 'Zenve Fashion & Boutique Wear', mtdRev: '₹8,90,000', share: '2.9%', avgUserSpend: '₹2,100', grossMargin: '52.4%', growth: '+38.0% ↑' },
    { channel: 'Daycare & Luxury Pet Boarding', mtdRev: '₹4,20,000', share: '1.3%', avgUserSpend: '₹1,400', grossMargin: '62.0%', growth: '+15.5% ↑' },
    { channel: 'Tele-Health Digital Consultations', mtdRev: '₹1,80,000', share: '0.6%', avgUserSpend: '₹600', grossMargin: '78.0%', growth: '+64.0% ↑' },
    { channel: 'Corporate B2B & Breeder Supply', mtdRev: '₹1,10,000', share: '0.4%', avgUserSpend: '₹12,500', grossMargin: '24.5%', growth: '+12.0% ↑' }
  ];

  const cardStyle = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Customers 360°"
      subcategory="Financial Intelligence"
      title="Customer Revenue & Monetization Streams"
      subtitle="Total customer-generated gross revenue, channel share, ARPU trajectory, and category margin analysis"
      icon="💰"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Customer Billed Revenue" value="₹3.11 Cr MTD" delta="+24.8%" trend="up" subtext="All retail and clinical channels" icon="💰" />
        <KpiCard label="Monthly ARPU" value="₹3,486 / User" delta="+11.2%" trend="up" subtext="Across active transactors" icon="📈" />
        <KpiCard label="Blended Gross Margin" value="44.8%" delta="+3.6%" trend="up" subtext="High margin clinical services" icon="💎" />
        <KpiCard label="Subscription Recurring Share" value="18.2%" delta="+5.4%" trend="up" subtext="Recurring baseline" icon="🔄" />
      </div>

      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>💰 Customer Revenue Contribution by Channel</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border, #e2e8f0)', textAlign: 'left', color: 'var(--muted-foreground, #475569)' }}>
                <th style={{ padding: '10px' }}>Revenue Channel</th>
                <th style={{ padding: '10px' }}>MTD Revenue</th>
                <th style={{ padding: '10px' }}>Revenue Share</th>
                <th style={{ padding: '10px' }}>Avg User Spend</th>
                <th style={{ padding: '10px' }}>Channel Gross Margin</th>
                <th style={{ padding: '10px' }}>YoY Growth Velocity</th>
              </tr>
            </thead>
            <tbody>
              {revStreams.length === 0 ? (<tr><td colSpan="6" style={{ textAlign: "center", padding: "32px", color: "var(--muted-foreground, #64748b)" }}>No customer revenue records found</td></tr>) : revStreams.map((r, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{r.channel}</td>
                  <td style={{ padding: '10px', fontWeight: 700, color: '#059669' }}>{r.mtdRev}</td>
                  <td style={{ padding: '10px', fontWeight: 600, color: '#2563eb' }}>{r.share}</td>
                  <td style={{ padding: '10px' }}>{r.avgUserSpend}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{r.grossMargin}</td>
                  <td style={{ padding: '10px', color: '#059669', fontWeight: 600 }}>{r.growth}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
