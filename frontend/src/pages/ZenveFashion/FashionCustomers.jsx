import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function FashionCustomers() {
  const [selectedTier, setSelectedTier] = useState('ALL');
  const [search, setSearch] = useState('');

  const customers = [
    { id: 'CLI-901', name: 'Natasha Poonawalla', city: 'Mumbai', pet: 'Princess', breed: 'Maltipoo', sizeProfile: 'N:24 C:36 B:30cm', ltv: '₹3,48,000', orders: 42, vipTier: 'Platinum Atelier', favCategory: 'Formal Atelier & Silk', lastOrder: '2026-10-14' },
    { id: 'CLI-902', name: 'Vikram Oberoi', city: 'Delhi-NCR', pet: 'Thor', breed: 'Golden Retriever', sizeProfile: 'N:48 C:78 B:64cm', ltv: '₹2,92,000', orders: 36, vipTier: 'Platinum Atelier', favCategory: 'Italian Leather & Harnesses', lastOrder: '2026-10-14' },
    { id: 'CLI-903', name: 'Tanya Dubash', city: 'Mumbai', pet: 'Bella', breed: 'Shih Tzu', sizeProfile: 'N:26 C:42 B:34cm', ltv: '₹2,45,000', orders: 28, vipTier: 'Platinum Atelier', favCategory: 'Himalayan Cashmere', lastOrder: '2026-10-13' },
    { id: 'CLI-904', name: 'Rohit Singhania', city: 'Bengaluru', pet: 'Simba', breed: 'French Bulldog', sizeProfile: 'N:42 C:62 B:38cm', ltv: '₹2,15,000', orders: 25, vipTier: 'Platinum Atelier', favCategory: 'Tuxedos & Velvet Collars', lastOrder: '2026-10-13' },
    { id: 'CLI-905', name: 'Ananya Birla', city: 'Mumbai', pet: 'Mochi', breed: 'Pomeranian', sizeProfile: 'N:20 C:32 B:26cm', ltv: '₹1,98,000', orders: 22, vipTier: 'Gold Couture', favCategory: 'Linen Polos & Rose Gold', lastOrder: '2026-10-12' },
    { id: 'CLI-906', name: 'Devika Ruia', city: 'Bengaluru', pet: 'Zara', breed: 'Beagle', sizeProfile: 'N:36 C:54 B:46cm', ltv: '₹1,65,000', orders: 19, vipTier: 'Gold Couture', favCategory: 'Weatherwear & Rain Boots', lastOrder: '2026-10-12' },
    { id: 'CLI-907', name: 'Kabir Wadia', city: 'Mumbai', pet: 'Ghost', breed: 'Siberian Husky', sizeProfile: 'N:46 C:74 B:62cm', ltv: '₹1,78,000', orders: 18, vipTier: 'Gold Couture', favCategory: 'Alpine StormShield Trench', lastOrder: '2026-10-12' },
    { id: 'CLI-908', name: 'Siddharth Goenka', city: 'Kolkata', pet: 'Bruno', breed: 'Labrador', sizeProfile: 'N:46 C:76 B:65cm', ltv: '₹1,42,000', orders: 16, vipTier: 'Gold Couture', favCategory: 'Italian Leather Sets', lastOrder: '2026-10-11' },
    { id: 'CLI-909', name: 'Rhea Kapoor', city: 'Delhi-NCR', pet: 'Leo', breed: 'Toy Poodle', sizeProfile: 'N:22 C:34 B:28cm', ltv: '₹1,56,000', orders: 17, vipTier: 'Gold Couture', favCategory: 'Bespoke Wedding Sherwanis', lastOrder: '2026-10-11' },
    { id: 'CLI-910', name: 'Meera Deora', city: 'Hyderabad', pet: 'Coco', breed: 'Persian Cat', sizeProfile: 'N:18 C:28 B:28cm', ltv: '₹1,18,000', orders: 14, vipTier: 'Silver Member', favCategory: 'Thermal Merino Knits', lastOrder: '2026-10-13' }
  ];

  const filtered = customers.filter(c => {
    if (selectedTier !== 'ALL' && c.vipTier !== selectedTier) return false;
    if (search) {
      const q = search.toLowerCase();
      return c.name.toLowerCase().includes(q) || c.pet.toLowerCase().includes(q) || c.breed.toLowerCase().includes(q) || c.city.toLowerCase().includes(q);
    }
    return true;
  });

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(255,255,255,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Zenve Fashion"
      subcategory="VIP Customers 360°"
      title="Haute Couture Clientele & Pet Sizing Profiles"
      subtitle="Exclusive pet fashion client directory, precision ergonomic sizing records, lifetime value, and styling consultation history"
      icon="💎"
      badge="VIP Couture Lounge"
      actions={
        <button onClick={() => alert('Booking Private Stylist Fitting Session...')} style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #ec4899', background: 'rgba(236,72,153,0.15)', color: '#f472b6', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
          ✨ Book Stylist Fitting
        </button>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Couture Clients" value="1,840 Parents" delta="+16.4% YoY" trend="up" subtext="Registered size profiles" icon="👥" />
        <KpiCard label="Average Client LTV" value="₹42,800" delta="+₹6,400 FY25" trend="up" subtext="Across apparel & accessories" icon="💎" />
        <KpiCard label="Repeat Purchase Rate" value="64.8%" delta="+5.2% MoM" trend="up" subtext="Seasonal capsule drops" icon="🔄" />
        <KpiCard label="Platinum VIP Members" value="142 Clients" delta="Spend > ₹1.5L/yr" trend="up" subtext="Bespoke atelier priority" icon="👑" />
        <KpiCard label="Personal Stylist Bookings" value="88 Sessions" delta="94% satisfaction" trend="up" subtext="In-showroom fittings" icon="✂️" />
        <KpiCard label="Pet Sizing Accuracy" value="98.8%" delta="Precision 3D guide" trend="up" subtext="Virtually zero fit returns" icon="📐" />
      </div>

      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>👑 VIP Pet Couture Clientele Roster</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Comprehensive customer measurement profiles, preferred aesthetics, and lifetime purchasing volume</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search parent, pet, breed, city..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.15))', borderRadius: '6px', padding: '6px 12px', color: 'var(--foreground, #0f172a)', fontSize: '12px', minWidth: '220px' }}
            />
            <select
              value={selectedTier}
              onChange={e => setSelectedTier(e.target.value)}
              style={{ background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.15))', borderRadius: '6px', padding: '6px 10px', color: 'var(--foreground, #0f172a)', fontSize: '12px' }}
            >
              <option value="ALL">All VIP Tiers</option>
              <option value="Platinum Atelier">Platinum Atelier</option>
              <option value="Gold Couture">Gold Couture</option>
              <option value="Silver Member">Silver Member</option>
            </select>
          </div>
        </div>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'var(--muted, #f8fafc)', borderBottom: '1px solid var(--border, rgba(0,0,0,0.08))' }}>
                {['Client ID', 'Pet Parent Name', 'Location', 'Pet & Breed', 'Sizing Metrics', 'Total LTV', 'Orders', 'VIP Tier', 'Preferred Style', 'Last Order'].map(h => (
                  <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--muted-foreground, #64748b)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border, rgba(0,0,0,0.06))' }}>
                  <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', color: '#f472b6', fontSize: '11px' }}>{c.id}</td>
                  <td style={{ padding: '11px 12px', fontWeight: 600, color: 'var(--foreground, #0f172a)' }}>{c.name}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--muted-foreground, #64748b)' }}>{c.city}</td>
                  <td style={{ padding: '11px 12px' }}>
                    <div style={{ fontWeight: 600, color: '#38bdf8' }}>{c.pet}</div>
                    <div style={{ fontSize: '11px', color: 'var(--foreground, #334155)' }}>{c.breed}</div>
                  </td>
                  <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', color: '#a78bfa' }}>{c.sizeProfile}</td>
                  <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#34d399' }}>{c.ltv}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--foreground, #334155)' }}>{c.orders} orders</td>
                  <td style={{ padding: '11px 12px' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, background: c.vipTier === 'Platinum Atelier' ? 'rgba(236,72,153,0.15)' : c.vipTier === 'Gold Couture' ? 'rgba(251,191,36,0.15)' : 'rgba(56,189,248,0.15)', color: c.vipTier === 'Platinum Atelier' ? '#f472b6' : c.vipTier === 'Gold Couture' ? '#fbbf24' : '#38bdf8' }}>
                      {c.vipTier}
                    </span>
                  </td>
                  <td style={{ padding: '11px 12px', color: 'var(--foreground, #334155)' }}>{c.favCategory}</td>
                  <td style={{ padding: '11px 12px', color: '#64748b', fontSize: '11px' }}>{c.lastOrder}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
