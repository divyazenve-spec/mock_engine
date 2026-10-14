import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function OnlineFashionSales() {
  const [selectedChannel, setSelectedChannel] = useState('ALL');

  const onlineDrops = [
    { dropName: 'Royal Brocade Wedding Capsule Drop', status: 'Live', revenue: '₹34.80L', itemsOffered: '450 Bespoke Units', sellThrough: '94.2%', stockoutDays: '14 Days Sold Out' },
    { dropName: 'Alpine StormShield All-Weather Capsule', status: 'Live', revenue: '₹28.50L', itemsOffered: '600 Technical Trench Units', sellThrough: '91.8%', stockoutDays: '18 Days Active' },
    { dropName: 'Himalayan Cashmere Winter Runway Capsule', status: 'Live', revenue: '₹22.40L', itemsOffered: '500 Grade-A Sweaters', sellThrough: '96.4%', stockoutDays: '9 Days Sold Out' },
    { dropName: 'Monaco Riviera Cruise Linen Line', status: 'Archived', revenue: '₹18.60L', itemsOffered: '400 Resort Polos', sellThrough: '98.2%', stockoutDays: '12 Days Sold Out' }
  ];

  const channels = [
    { channel: 'iOS Native Luxury App', sessions: '48,200', orders: '1,480', convRate: '3.07%', aov: '₹5,680', revenue: '₹84.06L', share: '44.2%' },
    { channel: 'Android Flagship App', sessions: '42,600', orders: '1,120', convRate: '2.63%', aov: '₹5,120', revenue: '₹57.34L', share: '30.1%' },
    { channel: 'Mobile Responsive Web', sessions: '28,400', orders: '460', convRate: '1.62%', aov: '₹4,890', revenue: '₹22.49L', share: '11.8%' },
    { channel: 'Instagram Shopping Boutique', sessions: '24,100', orders: '390', convRate: '1.62%', aov: '₹5,450', revenue: '₹21.26L', share: '11.2%' },
    { channel: 'WhatsApp VIP Concierge Drops', sessions: '2,800', orders: '280', convRate: '10.00%', aov: '₹9,650', revenue: '₹27.02L', share: '14.2%' },
    { channel: 'Desktop Web Atelier', sessions: '12,500', orders: '210', convRate: '1.68%', aov: '₹6,420', revenue: '₹13.48L', share: '7.1%' },
    { channel: 'Tata CliQ Luxury Integration', sessions: '8,900', orders: '140', convRate: '1.57%', aov: '₹7,100', revenue: '₹9.94L', share: '5.2%' },
    { channel: 'Nykaa Man / Pet Luxe Corner', sessions: '7,600', orders: '110', convRate: '1.45%', aov: '₹6,200', revenue: '₹6.82L', share: '3.6%' },
    { channel: 'Cred Monarch Exclusives', sessions: '4,200', orders: '95', convRate: '2.26%', aov: '₹6,800', revenue: '₹6.46L', share: '3.4%' },
    { channel: 'Private Atelier Direct Link Drops', sessions: '1,600', orders: '115', convRate: '7.19%', aov: '₹11,200', revenue: '₹12.88L', share: '6.8%' }
  ];

  const filtered = channels.filter(c => {
    if (selectedChannel !== 'ALL' && c.channel !== selectedChannel) return false;
    return true;
  });

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(255,255,255,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Zenve Fashion"
      subcategory="Online E-Commerce"
      title="Online Fashion E-Commerce & Digital Drops"
      subtitle="Mobile app luxury storefront, limited-edition drop sell-through, digital 3D sizing guide, and social commerce"
      icon="📱"
      badge="Digital Storefront Live"
      actions={
        <button onClick={() => alert('Configuring Push Notification for Flash Fashion Drop...')} style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #ec4899', background: 'rgba(236,72,153,0.15)', color: '#f472b6', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
          📢 Broadcast Drop Alert
        </button>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Online Fashion Revenue" value="₹21.40L" delta="+38.6% MoM" trend="up" subtext="MTD digital e-commerce" icon="📱" />
        <KpiCard label="Online Orders (MTD)" value="420 Orders" delta="+29.2% YoY" trend="up" subtext="Avg 2.2 units/order" icon="🛍️" />
        <KpiCard label="Average Online AOV" value="₹5,420" delta="+₹640 vs FY25" trend="up" subtext="Multi-item styling kits" icon="💳" />
        <KpiCard label="E-Commerce Conversion" value="2.84%" delta="+0.42% boost" trend="up" subtext="Luxury fashion benchmark" icon="⚡" />
        <KpiCard label="3D AI Pet Sizing Assist" value="78.4% Adoption" delta="1,420 scans" trend="up" subtext="Returns down to 1.2%" icon="📐" />
        <KpiCard label="60-Min Rush Delivery" value="42.6% of Orders" delta="Rapid EV drop" trend="up" subtext="Available in BLR & MUM" icon="🚀" />
      </div>

      {/* Limited Edition Online Drops */}
      <div style={card}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>✨ Limited Edition Capsule Drops & Sell-Through</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '14px' }}>
          {onlineDrops.map((d, i) => (
            <div key={i} style={{ background: 'var(--muted, #f8fafc)', border: '1px solid rgba(0,0,0,0.06)', borderRadius: '10px', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#f472b6' }}>{d.dropName}</span>
                <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, background: d.status === 'Live' ? 'rgba(52,211,153,0.15)' : 'rgba(148,163,184,0.15)', color: d.status === 'Live' ? '#34d399' : '#94a3b8' }}>{d.status}</span>
              </div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--foreground, #0f172a)', marginBottom: '4px' }}>{d.revenue}</div>
              <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #64748b)', marginBottom: '8px' }}>Items: {d.itemsOffered}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--foreground, #334155)' }}>
                <span>Sell-Through: <strong style={{ color: '#34d399' }}>{d.sellThrough}</strong></span>
                <span>Velocity: {d.stockoutDays}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Online Sales Channels Table */}
      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>📱 Digital Channel Traffic & Conversion (10 Channels)</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Session volume, checkout conversion rates, and revenue share by digital channel</p>
          </div>
        </div>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'var(--muted, #f8fafc)', borderBottom: '1px solid var(--border, rgba(0,0,0,0.08))' }}>
                {['Channel Platform', 'Unique Sessions', 'Completed Orders', 'Conversion %', 'Average Order Value', 'Gross Revenue', 'Channel Share'].map(h => (
                  <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--muted-foreground, #64748b)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border, rgba(0,0,0,0.06))' }}>
                  <td style={{ padding: '11px 12px', fontWeight: 600, color: 'var(--foreground, #0f172a)' }}>{c.channel}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--foreground, #334155)' }}>{c.sessions}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--foreground, #0f172a)', fontWeight: 600 }}>{c.orders}</td>
                  <td style={{ padding: '11px 12px', fontWeight: 700, color: '#38bdf8' }}>{c.convRate}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--foreground, #334155)' }}>{c.aov}</td>
                  <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#34d399' }}>{c.revenue}</td>
                  <td style={{ padding: '11px 12px', fontWeight: 700, color: '#a78bfa' }}>{c.share}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
