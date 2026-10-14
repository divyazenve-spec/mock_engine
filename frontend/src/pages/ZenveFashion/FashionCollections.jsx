import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function FashionCollections() {
  const collections = [
    { id: 'CAP-2601', name: 'Royal Brocade Wedding Capsule', season: 'Festive / Bridal 2026', styles: 12, launchDate: '2026-09-01', sellThrough: '94.2%', revenue: '₹34.80L', leadDesigner: 'Sabyasachi Mukherjee Collab', status: 'Active Drop' },
    { id: 'CAP-2602', name: 'Alpine StormShield Weatherwear', season: 'Monsoon / Autumn 2026', styles: 10, launchDate: '2026-06-15', sellThrough: '91.8%', revenue: '₹28.50L', leadDesigner: 'Marc Jacobs Studio', status: 'Active Drop' },
    { id: 'CAP-2603', name: 'Himalayan Cashmere Runway Series', season: 'Winter 2026', styles: 8, launchDate: '2026-10-01', sellThrough: '96.4%', revenue: '₹22.40L', leadDesigner: 'Zenve Atelier In-House', status: 'Active Drop' },
    { id: 'CAP-2504', name: 'Monaco Riviera Cruise Linen Line', season: 'Spring / Summer 2026', styles: 14, launchDate: '2026-02-10', sellThrough: '98.2%', revenue: '₹18.60L', leadDesigner: 'Roberto Cavalli Atelier', status: 'Archived' },
    { id: 'CAP-2505', name: 'Black Tie Gala Velvet Edition', season: 'Winter Gala 2025', styles: 6, launchDate: '2025-11-20', sellThrough: '97.5%', revenue: '₹16.20L', leadDesigner: 'Zenve Atelier In-House', status: 'Archived' },
    { id: 'CAP-2506', name: 'Florentine Tuscan Leather Heritage', season: 'Core Heritage 2025', styles: 8, launchDate: '2025-08-01', sellThrough: '95.0%', revenue: '₹19.40L', leadDesigner: 'Bottega Master Artisan', status: 'Active Drop' },
    { id: 'CAP-2507', name: 'Zenve Olympic High-Performance', season: 'Summer Sports 2025', styles: 9, launchDate: '2025-05-12', sellThrough: '89.4%', revenue: '₹12.80L', leadDesigner: 'Nike Trail Collab', status: 'Archived' },
    { id: 'CAP-2508', name: 'Diwali Zari & Velvet Shimmer', season: 'Festive 2025', styles: 11, launchDate: '2025-10-05', sellThrough: '99.1%', revenue: '₹26.50L', leadDesigner: 'Manish Malhotra Studio', status: 'Archived' },
    { id: 'CAP-2509', name: 'Parisian Silk Pajamas & Loungewear', season: 'Loungewear 2025', styles: 7, launchDate: '2025-03-18', sellThrough: '93.6%', revenue: '₹11.20L', leadDesigner: 'Zenve Atelier In-House', status: 'Archived' },
    { id: 'CAP-2510', name: '24K Gold Vermeil Heirloom Keepsakes', season: 'Luxury Jewelry 2025', styles: 5, launchDate: '2025-07-25', sellThrough: '92.0%', revenue: '₹14.50L', leadDesigner: 'Cartier Master Jeweler', status: 'Active Drop' }
  ];

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(255,255,255,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Zenve Fashion"
      subcategory="Seasonal Collections"
      title="Haute Couture Collections & Designer Runway Drops"
      subtitle="Limited-edition seasonal capsule launches, sell-through velocity, fabric sourcing lead times, and designer portfolios"
      icon="✨"
      badge="Runway Collections"
      actions={
        <button onClick={() => alert('Creating New Seasonal Capsule Blueprint...')} style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #ec4899', background: 'rgba(236,72,153,0.15)', color: '#f472b6', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
          ✨ Create Capsule Blueprint
        </button>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Active Capsule Collections" value="4 Live Drops" delta="Festive + Winter + Gala" trend="up" subtext="Current retail circulation" icon="✨" />
        <KpiCard label="Avg. Drop Sell-Through" value="94.8%" delta="+5.4% YoY" trend="up" subtext="Zero deadstock policy" icon="🎯" />
        <KpiCard label="Highest Grossing Drop" value="₹34.80L" delta="Royal Brocade Wedding" trend="up" subtext="Sold out in 22 days" icon="👑" />
        <KpiCard label="Design-to-Rack Lead Time" value="28 Days" delta="-8 days faster" trend="up" subtext="In-house artisan studio" icon="⏱️" />
        <KpiCard label="VIP Pre-Order Conversion" value="84.2%" delta="Platinum member reserve" trend="up" subtext="Sold prior to public launch" icon="💎" />
        <KpiCard label="Runway Pet Models" value="36 Verified" delta="Brand ambassador pets" trend="up" subtext="Instagram campaign reach" icon="📸" />
      </div>

      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>✨ Seasonal Capsule & Runway Lines Portfolio (10 Collections)</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Performance metrics, designer ownership, and revenue generated per fashion line</p>
          </div>
        </div>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'var(--muted, #f8fafc)', borderBottom: '1px solid var(--border, rgba(0,0,0,0.08))' }}>
                {['Collection ID', 'Collection Title', 'Season', 'Styles', 'Launch Date', 'Sell-Through', 'Revenue Generated', 'Lead Designer', 'Status'].map(h => (
                  <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--muted-foreground, #64748b)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {collections.map((c, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border, rgba(0,0,0,0.06))' }}>
                  <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', color: '#f472b6', fontSize: '11px' }}>{c.id}</td>
                  <td style={{ padding: '11px 12px', fontWeight: 600, color: 'var(--foreground, #0f172a)' }}>{c.name}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--foreground, #334155)' }}>{c.season}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--muted-foreground, #64748b)' }}>{c.styles} styles</td>
                  <td style={{ padding: '11px 12px', color: '#64748b', fontSize: '11px' }}>{c.launchDate}</td>
                  <td style={{ padding: '11px 12px', fontWeight: 700, color: '#34d399' }}>{c.sellThrough}</td>
                  <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#38bdf8' }}>{c.revenue}</td>
                  <td style={{ padding: '11px 12px', color: '#a78bfa' }}>{c.leadDesigner}</td>
                  <td style={{ padding: '11px 12px' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, background: c.status === 'Active Drop' ? 'rgba(52,211,153,0.15)' : 'rgba(167,139,250,0.15)', color: c.status === 'Active Drop' ? '#34d399' : '#a78bfa' }}>
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
