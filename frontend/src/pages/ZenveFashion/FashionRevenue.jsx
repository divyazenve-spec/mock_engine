import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function FashionRevenue() {
  const [timeframe, setTimeframe] = useState('FY26-27');

  const categoryRevenue = [
    { cat: 'Formal Atelier & Wedding Wear', rev: '₹18.60L', share: '38.3%', growth: '+44.2%', aov: '₹8,450' },
    { cat: 'Ergonomic Harnesses & Leashes', rev: '₹10.40L', share: '21.4%', growth: '+28.6%', aov: '₹5,200' },
    { cat: 'Weatherwear & Rain Trenchcoats', rev: '₹7.80L', share: '16.0%', growth: '+36.4%', aov: '₹4,850' },
    { cat: 'Himalayan Winter Knitwear', rev: '₹5.20L', share: '10.7%', growth: '+24.8%', aov: '₹3,450' },
    { cat: 'Loungewear & Resort Polos', rev: '₹2.80L', share: '5.8%', growth: '+18.2%', aov: '₹2,600' },
    { cat: 'Bridal Trousseau Trunk Sets', rev: '₹2.40L', share: '4.9%', growth: '+64.0%', aov: '₹24,000' },
    { cat: 'Footwear & All-Terrain Boots', rev: '₹1.60L', share: '3.3%', growth: '+14.5%', aov: '₹1,850' },
    { cat: 'Solid Gold & Brass Accessories', rev: '₹1.40L', share: '2.9%', growth: '+32.0%', aov: '₹2,450' },
    { cat: 'Bespoke Monogramming Services', rev: '₹0.80L', share: '1.6%', growth: '+52.0%', aov: '₹750' },
    { cat: 'In-Home Stylist Consultation Fees', rev: '₹0.60L', share: '1.2%', growth: '+40.0%', aov: '₹2,500' }
  ];

  const cityRevenue = [
    { city: 'Mumbai Metro (Bandra & Colaba)', rev: '₹22.20L', share: '45.7%', stores: '2 Flagship Boutiques', topCategory: 'Formal Atelier & Italian Leather' },
    { city: 'Bengaluru (Indiranagar & Whitefield)', rev: '₹18.90L', share: '38.9%', stores: '3 Boutiques & Studio', topCategory: 'Winter Knits & Weatherwear' },
    { city: 'Delhi-NCR (South Delhi & Gurugram)', rev: '₹17.30L', share: '35.6%', stores: '2 Salons & Pavilions', topCategory: 'Royal Brocade & Cashmere' },
    { city: 'Hyderabad (Jubilee Hills)', rev: '₹8.60L', share: '17.7%', stores: '1 Luxury Salon', topCategory: 'Wedding Sherwanis & Gold IDs' },
    { city: 'Chennai (Alwarpet)', rev: '₹5.80L', share: '11.9%', stores: '1 Luxury Gallery', topCategory: 'Linen Polos & Breathable Harnesses' },
    { city: 'Pune (Koregaon Park)', rev: '₹5.20L', share: '10.7%', stores: '1 Atelier Studio', topCategory: 'Winter Knits & Rain Booties' },
    { city: 'Kolkata (Alipore / Park St online)', rev: '₹3.80L', share: '7.8%', stores: 'Digital VIP Atelier', topCategory: 'Formal Velvet Tuxedos' },
    { city: 'Ahmedabad (Bodakdev online)', rev: '₹3.20L', share: '6.6%', stores: 'Digital VIP Atelier', topCategory: 'Brocade Wedding Apparel' },
    { city: 'Chandigarh (Sector 9 online)', rev: '₹2.60L', share: '5.3%', stores: 'Digital VIP Atelier', topCategory: 'Cashmere Sweaters & Trenchcoats' },
    { city: 'Goa (North Goa Villas concierge)', rev: '₹2.10L', share: '4.3%', stores: 'Resort Concierge Pop-up', topCategory: 'Monaco Riviera Linen Polos' }
  ];

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(255,255,255,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Zenve Fashion"
      subcategory="Revenue Intelligence"
      title="Fashion Revenue Streams & Financial Trajectory"
      subtitle="Financial performance across apparel lines, seasonal holiday surges, geographic luxury hubs, and channel distribution"
      icon="💵"
      badge="Revenue Intelligence"
      actions={
        <button onClick={() => alert('Exporting Fashion Financial Revenue Deck (PDF)...')} style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #ec4899', background: 'rgba(236,72,153,0.15)', color: '#f472b6', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
          📊 Revenue Export
        </button>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Fashion Gross Revenue (FYTD)" value="₹6.28 Cr" delta="+38.4% YoY" trend="up" subtext="On track to beat target" icon="💵" />
        <KpiCard label="Monthly Revenue Run-Rate" value="₹52.40L / Mo" delta="+24.8% MoM" trend="up" subtext="High seasonal velocity" icon="📈" />
        <KpiCard label="Showroom vs Online Mix" value="54% : 46%" delta="Omnichannel balance" trend="up" subtext="Boutiques drive app trials" icon="⚖️" />
        <KpiCard label="Festive Season Surge" value="+74.2%" delta="Wedding surge" trend="up" subtext="Peak demand for Sherwanis" icon="✨" />
        <KpiCard label="Blended Average Order Value" value="₹6,650" delta="+₹820 vs FY25" trend="up" subtext="Higher bundled accessories" icon="🛒" />
        <KpiCard label="Fashion Revenue / Pet Parent" value="₹42,800" delta="+18.6% growth" trend="up" subtext="Loyal luxury client base" icon="💎" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '18px' }}>
        {/* Revenue by Category */}
        <div style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>👗 Revenue by Product Category (10 Categories)</h3>
              <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Category sales contribution, year-on-year growth, and average ticket</p>
            </div>
          </div>
          <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ background: 'var(--muted, #f8fafc)', borderBottom: '1px solid var(--border, rgba(0,0,0,0.08))' }}>
                  {['Apparel Category', 'Revenue FYTD', 'Share %', 'Growth YoY', 'Avg Order Value'].map(h => (
                    <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--muted-foreground, #64748b)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {categoryRevenue.map((c, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border, rgba(0,0,0,0.06))' }}>
                    <td style={{ padding: '11px 12px', fontWeight: 600, color: 'var(--foreground, #0f172a)' }}>{c.cat}</td>
                    <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#34d399' }}>{c.rev}</td>
                    <td style={{ padding: '11px 12px', color: '#a78bfa', fontWeight: 600 }}>{c.share}</td>
                    <td style={{ padding: '11px 12px', color: '#34d399', fontWeight: 700 }}>{c.growth}</td>
                    <td style={{ padding: '11px 12px', color: 'var(--foreground, #334155)' }}>{c.aov}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Geographic Revenue */}
        <div style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>📍 Regional Revenue Distribution (10 Metros)</h3>
              <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Geographic luxury metro contribution and dominant wardrobe styles</p>
            </div>
          </div>
          <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ background: 'var(--muted, #f8fafc)', borderBottom: '1px solid var(--border, rgba(0,0,0,0.08))' }}>
                  {['Metro Market', 'Revenue', 'Share %', 'Store Presence', 'Top Category'].map(h => (
                    <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--muted-foreground, #64748b)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cityRevenue.map((c, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border, rgba(0,0,0,0.06))' }}>
                    <td style={{ padding: '11px 12px', fontWeight: 600, color: 'var(--foreground, #0f172a)' }}>{c.city}</td>
                    <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#34d399' }}>{c.rev}</td>
                    <td style={{ padding: '11px 12px', color: '#38bdf8', fontWeight: 600 }}>{c.share}</td>
                    <td style={{ padding: '11px 12px', color: 'var(--foreground, #334155)' }}>{c.stores}</td>
                    <td style={{ padding: '11px 12px', color: '#f472b6', fontSize: '11px' }}>{c.topCategory}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
