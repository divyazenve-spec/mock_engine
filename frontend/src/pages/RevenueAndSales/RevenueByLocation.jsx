import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function RevenueByLocation() {
  const cities = [
    { city: 'Bengaluru', state: 'Karnataka', rev: '₹36,20,000', share: '32.4%', orders: '1,280', growth: '+18.4%' },
    { city: 'Mumbai', state: 'Maharashtra', rev: '₹24,80,000', share: '22.2%', orders: '840', growth: '+14.2%' },
    { city: 'Delhi NCR', state: 'Delhi & Haryana', rev: '₹18,50,000', share: '16.5%', orders: '660', growth: '+12.8%' },
    { city: 'Hyderabad', state: 'Telangana', rev: '₹11,40,000', share: '10.2%', orders: '410', growth: '+24.8%' },
    { city: 'Chennai', state: 'Tamil Nadu', rev: '₹7,60,000', share: '6.8%', orders: '290', growth: '+9.5%' },
    { city: 'Pune', state: 'Maharashtra', rev: '₹5,20,000', share: '4.6%', orders: '210', growth: '+16.1%' },
    { city: 'Kolkata', state: 'West Bengal', rev: '₹3,40,000', share: '3.0%', orders: '145', growth: '+8.2%' },
    { city: 'Ahmedabad', state: 'Gujarat', rev: '₹2,50,000', share: '2.2%', orders: '110', growth: '+11.4%' },
    { city: 'Kochi', state: 'Kerala', rev: '₹1,30,000', share: '1.2%', orders: '65', growth: '+15.0%' },
    { city: 'Chandigarh', state: 'Punjab & Haryana', rev: '₹90,000', share: '0.9%', orders: '42', growth: '+10.6%' }
  ];

  return (
    <DashboardLayout
      category="Revenue & Sales"
      subcategory="Revenue by Location"
      title="Geographic Sales & Territory Intelligence"
      subtitle="Regional market penetration, city-level demand, and rapid delivery territory breakdown"
      icon="📍"
      badge="10 Metros"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Top Market" value="Bengaluru" delta="32.4% share" trend="up" subtext="₹36.2L volume" icon="🏙️" />
        <KpiCard label="Fastest Growing" value="Hyderabad" delta="+24.8% MoM" trend="up" subtext="Hub territory" icon="🚀" />
        <KpiCard label="Active Regions" value="10 Metros" delta="100% coverage" trend="neutral" subtext="Tier-1 & Tier-2" icon="📍" />
        <KpiCard label="Territory Revenue" value="₹1,11,80,000" delta="+15.2%" trend="up" subtext="Total regional sales" icon="💼" />
      </div>

      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Metro Territory Performance Breakdown</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)', fontSize: '11px' }}>
                <th style={{ padding: '8px 12px' }}>City & Territory</th>
                <th style={{ padding: '8px 12px' }}>State</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Revenue Realized</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Market Share</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Orders</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>MoM Expansion</th>
              </tr>
            </thead>
            <tbody>
              {cities.map((c) => (
                <tr key={c.city} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                  <td style={{ padding: '12px', fontWeight: 700 }}>{c.city}</td>
                  <td style={{ padding: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>{c.state}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{c.rev}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '99px',
                      background: 'rgba(59,130,246,0.15)',
                      color: '#3b82f6',
                      fontWeight: 600,
                      fontSize: '11px'
                    }}>{c.share}</span>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>{c.orders}</td>
                  <td style={{ padding: '12px', textAlign: 'right', color: '#10b981', fontWeight: 600 }}>{c.growth}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
