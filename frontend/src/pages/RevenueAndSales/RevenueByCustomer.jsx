import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function RevenueByCustomer() {
  const customers = [
    { name: 'Ananya Deshmukh', city: 'Bengaluru', pet: 'Golden Retriever (Leo, 3y)', spend: '₹1,84,500', orders: 24, aov: '₹7,688', tier: 'Diamond' },
    { name: 'Vikramaditya Singhania', city: 'Mumbai', pet: 'Persian Cat (Milo, 2y)', spend: '₹1,56,200', orders: 19, aov: '₹8,221', tier: 'Diamond' },
    { name: 'Rohan & Sneha Kapoor', city: 'Delhi NCR', pet: 'German Shepherd (Thor, 4y)', spend: '₹1,38,900', orders: 18, aov: '₹7,717', tier: 'Diamond' },
    { name: 'Meera Nambiar', city: 'Hyderabad', pet: 'Beagle (Buddy, 1y)', spend: '₹1,12,400', orders: 15, aov: '₹7,493', tier: 'Diamond' },
    { name: 'Kavita & Rajesh Iyer', city: 'Chennai', pet: 'Labrador Retriever (Bruno, 5y)', spend: '₹98,600', orders: 14, aov: '₹7,043', tier: 'Gold' },
    { name: 'Dr. Siddharth Malhotra', city: 'Pune', pet: 'Cocker Spaniel (Charlie, 3y)', spend: '₹87,400', orders: 12, aov: '₹7,283', tier: 'Gold' },
    { name: 'Pooja & Amit Verma', city: 'Kolkata', pet: 'Siberian Husky (Ghost, 2y)', spend: '₹76,800', orders: 11, aov: '₹6,982', tier: 'Gold' },
    { name: 'Farhan Akhtar Khan', city: 'Ahmedabad', pet: 'French Bulldog (Coco, 2y)', spend: '₹64,500', orders: 9, aov: '₹7,167', tier: 'Gold' },
    { name: 'Deepa & Arvind Swamy', city: 'Kochi', pet: 'Shih Tzu (Bella, 4y)', spend: '₹52,300', orders: 8, aov: '₹6,538', tier: 'Silver' },
    { name: 'Tanvi Chatterjee', city: 'Chandigarh', pet: 'Indie Rescue (Sheru, 3y)', spend: '₹41,900', orders: 7, aov: '₹5,986', tier: 'Silver' }
  ];

  return (
    <DashboardLayout
      category="Revenue & Sales"
      subcategory="Revenue by Customer"
      title="High-Value Client Lifetime Value & Loyalty"
      subtitle="Client order frequencies, lifetime healthcare spend, and customer loyalty tiers"
      icon="👥"
      badge="Top Clients"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <KpiCard label="Top Client Spend" value="₹1,84,500" delta="24 orders" trend="up" subtext="Diamond Tier" icon="💎" />
        <KpiCard label="Avg Lifetime Value" value="₹1,01,350" delta="+16.4%" trend="up" subtext="Top 10 cohort average" icon="📈" />
        <KpiCard label="Repeat Customer Rate" value="84.2%" delta="+5.8%" trend="up" subtext="Multi-order loyalty" icon="🔁" />
        <KpiCard label="Loyalty Tier Members" value="1,420" delta="Tiered base" trend="neutral" subtext="Diamond/Gold/Silver" icon="🏅" />
      </div>

      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px 24px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>VIP Client Directory</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)', fontSize: '11px' }}>
                <th style={{ padding: '10px 14px 10px 16px', verticalAlign: 'middle' }}>Customer Name</th>
                <th style={{ padding: '10px 14px', verticalAlign: 'middle' }}>City</th>
                <th style={{ padding: '10px 14px', verticalAlign: 'middle' }}>Pet Profile</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', verticalAlign: 'middle' }}>Lifetime Spend</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', verticalAlign: 'middle' }}>Orders</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', verticalAlign: 'middle' }}>Avg Ticket</th>
                <th style={{ padding: '10px 16px 10px 14px', textAlign: 'right', verticalAlign: 'middle' }}>Loyalty Tier</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.name} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                  <td style={{ padding: '12px 14px 12px 16px', fontWeight: 700, verticalAlign: 'middle' }}>{c.name}</td>
                  <td style={{ padding: '12px 14px', verticalAlign: 'middle' }}>{c.city}</td>
                  <td style={{ padding: '12px 14px', color: 'var(--muted-foreground, #94a3b8)', verticalAlign: 'middle' }}>{c.pet}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace', verticalAlign: 'middle' }}>{c.spend}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', verticalAlign: 'middle' }}>{c.orders}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', verticalAlign: 'middle' }}>{c.aov}</td>
                  <td style={{ padding: '12px 16px 12px 14px', textAlign: 'right', verticalAlign: 'middle' }}>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '99px',
                      background: c.tier === 'Diamond' ? 'rgba(168,85,247,0.2)' : 'rgba(245,158,11,0.2)',
                      color: c.tier === 'Diamond' ? '#c084fc' : '#fbbf24',
                      fontWeight: 700,
                      fontSize: '11px'
                    }}>{c.tier}</span>
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
