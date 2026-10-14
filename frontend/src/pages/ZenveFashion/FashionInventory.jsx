import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function FashionInventory() {
  const [selectedLocation, setSelectedLocation] = useState('ALL');
  const [search, setSearch] = useState('');

  const rawMaterials = [
    { fabric: 'Grade-A Himalayan Cashmere Yarn', stock: '120 kg (480 Sweaters)', allocated: 'Winter Knitwear Line', leadTime: '18 days', reorder: 'Safe' },
    { fabric: 'Tuscan Full-Grain Vegetable Nappa Leather', stock: '420 sq meters', allocated: 'Luxury Harnesses & Collars', leadTime: '24 days', reorder: 'Safe' },
    { fabric: 'Benarasi Pure Silk Brocade with Real Zari', stock: '180 meters', allocated: 'Wedding Atelier Sherwanis', leadTime: '14 days', reorder: 'Safe' },
    { fabric: '3-Layer GORE-TEX Waterproof Membrane', stock: '350 meters', allocated: 'Alpine StormShield Line', leadTime: '21 days', reorder: 'Safe' }
  ];

  const inventoryItems = [
    { sku: 'ZFS-0101', name: 'Royal Brocade Pet Sherwani', cat: 'Formal Atelier', xs: 6, s: 10, m: 12, l: 8, xl: 2, total: 38, valuation: '₹1,84,300', location: 'Central Fashion Hub', status: 'Healthy' },
    { sku: 'ZFS-0102', name: 'Italian Nappa Leather Harness', cat: 'Ergonomic Harnesses', xs: 0, s: 14, m: 22, l: 16, xl: 0, total: 52, valuation: '₹1,89,800', location: 'Central Fashion Hub', status: 'Healthy' },
    { sku: 'ZFS-0103', name: 'Himalayan Cashmere Knit Sweater', cat: 'Winter Knits', xs: 8, s: 14, m: 12, l: 10, xl: 0, total: 44, valuation: '₹1,29,800', location: 'Central Fashion Hub', status: 'Healthy' },
    { sku: 'ZFS-0104', name: 'Alpine StormShield Waterproof Trench', cat: 'Weatherwear', xs: 4, s: 12, m: 20, l: 18, xl: 11, total: 65, valuation: '₹2,73,000', location: 'Central Fashion Hub', status: 'Healthy' },
    { sku: 'ZFS-0105', name: 'Florentine Calfskin Collar & Leash Set', cat: 'Collars & Leashes', xs: 14, s: 22, m: 26, l: 16, xl: 0, total: 78, valuation: '₹2,49,600', location: 'Bandra Boutique', status: 'Healthy' },
    { sku: 'ZFS-0106', name: 'Monaco Riviera Linen Sailor Polo', cat: 'Loungewear', xs: 6, s: 10, m: 8, l: 6, xl: 0, total: 30, valuation: '₹64,500', location: 'Indiranagar Studio', status: 'Healthy' },
    { sku: 'ZFS-0107', name: 'Velvet Evening Tuxedo with Bowtie', cat: 'Formal Atelier', xs: 0, s: 6, m: 8, l: 6, xl: 2, total: 22, valuation: '₹1,18,800', location: 'Bandra Boutique', status: 'Low Stock' },
    { sku: 'ZFS-0108', name: 'All-Terrain Orthopedic Rain Booties', cat: 'Footwear', xs: 0, s: 25, m: 32, l: 20, xl: 8, total: 85, valuation: '₹1,57,250', location: 'Central Fashion Hub', status: 'Healthy' },
    { sku: 'ZFS-0109', name: '24K Gold-Plated Bespoke ID Medallion', cat: 'Accessories', xs: 0, s: 0, m: 96, l: 0, xl: 0, total: 96, valuation: '₹2,35,200', location: 'Bandra Boutique', status: 'Healthy' },
    { sku: 'ZFS-0110', name: 'Merino Wool Thermal Base Layer', cat: 'Winter Knits', xs: 10, s: 16, m: 14, l: 0, xl: 0, total: 40, valuation: '₹90,000', location: 'Indiranagar Studio', status: 'Healthy' }
  ];

  const filtered = inventoryItems.filter(item => {
    if (selectedLocation !== 'ALL' && item.location !== selectedLocation) return false;
    if (search) {
      const q = search.toLowerCase();
      return item.name.toLowerCase().includes(q) || item.sku.toLowerCase().includes(q) || item.cat.toLowerCase().includes(q);
    }
    return true;
  });

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(255,255,255,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Zenve Fashion"
      subcategory="Inventory & Sizing Matrix"
      title="Fashion Stock Allocation & Sizing Matrix"
      subtitle="Finished pet garments distribution across sizing grids (XS to XXL), raw atelier materials, and showroom stock cover"
      icon="📦"
      badge="Stock Ledger"
      actions={
        <button onClick={() => alert('Initiating Inter-Boutique Stock Rebalance...')} style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #ec4899', background: 'rgba(236,72,153,0.15)', color: '#f472b6', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
          🔄 Rebalance Stock
        </button>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Finished Apparel Valuation" value="₹16.92L" delta="1,746 Units" trend="up" subtext="Across all 3 locations" icon="💎" />
        <KpiCard label="Raw Fabric Inventory" value="₹8.40L" delta="Premium certified rolls" trend="up" subtext="Italian leather & cashmere" icon="🧵" />
        <KpiCard label="Sizing Completeness Rate" value="96.2%" delta="XS - XXL coverage" trend="up" subtext="Zero stockouts on core sizes" icon="📐" />
        <KpiCard label="Low Stock Styles (<20u)" value="2 Styles" delta="Tuxedo & Knits" trend="warn" subtext="Replenishment in progress" icon="⚠️" />
        <KpiCard label="Showroom Display Stock" value="₹4.80L" delta="Bandra + Indiranagar" trend="up" subtext="Trial room samples" icon="🛍️" />
        <KpiCard label="Inventory Turnover Ratio" value="4.6x" delta="+0.8x vs FY25" trend="up" subtext="Rapid fashion cycles" icon="⚡" />
      </div>

      {/* Raw Materials Highlight */}
      <div style={card}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>🧵 Atelier Raw Fabric & Hardware Reserves</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
          {rawMaterials.map((rm, idx) => (
            <div key={idx} style={{ background: 'var(--muted, #f8fafc)', border: '1px solid rgba(0,0,0,0.06)', borderRadius: '10px', padding: '16px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#f472b6', marginBottom: '6px' }}>{rm.fabric}</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--foreground, #0f172a)', marginBottom: '8px' }}>{rm.stock}</div>
              <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #64748b)', lineHeight: 1.4 }}>Allocated to: <strong style={{ color: 'var(--foreground, #334155)' }}>{rm.allocated}</strong></div>
              <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                <span style={{ color: '#64748b' }}>Lead time: {rm.leadTime}</span>
                <span style={{ color: '#34d399', fontWeight: 700 }}>{rm.reorder}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sizing Breakdown Table */}
      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>📦 Finished Garment Stock by Size Breakdown</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Unit counts per size tier, hub location, and total inventory value</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search style, SKU, category..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.15))', borderRadius: '6px', padding: '6px 12px', color: 'var(--foreground, #0f172a)', fontSize: '12px', minWidth: '220px' }}
            />
            <select
              value={selectedLocation}
              onChange={e => setSelectedLocation(e.target.value)}
              style={{ background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.15))', borderRadius: '6px', padding: '6px 10px', color: 'var(--foreground, #0f172a)', fontSize: '12px' }}
            >
              <option value="ALL">All Locations</option>
              <option value="Central Fashion Hub">Central Fashion Hub</option>
              <option value="Indiranagar Studio">Indiranagar Studio</option>
              <option value="Bandra Boutique">Bandra Boutique</option>
            </select>
          </div>
        </div>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'var(--muted, #f8fafc)', borderBottom: '1px solid var(--border, rgba(0,0,0,0.08))' }}>
                {['SKU Code', 'Product Name', 'Category', 'XS', 'S', 'M', 'L', 'XL', 'Total Stock', 'Valuation', 'Location', 'Status'].map(h => (
                  <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--muted-foreground, #64748b)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border, rgba(0,0,0,0.06))' }}>
                  <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', color: '#f472b6', fontSize: '11px' }}>{item.sku}</td>
                  <td style={{ padding: '11px 12px', fontWeight: 600, color: 'var(--foreground, #0f172a)' }}>{item.name}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--muted-foreground, #64748b)' }}>{item.cat}</td>
                  <td style={{ padding: '11px 12px', color: item.xs === 0 ? '#94a3b8' : '#334155' }}>{item.xs}</td>
                  <td style={{ padding: '11px 12px', color: item.s === 0 ? '#94a3b8' : '#334155' }}>{item.s}</td>
                  <td style={{ padding: '11px 12px', color: item.m === 0 ? '#94a3b8' : '#334155' }}>{item.m}</td>
                  <td style={{ padding: '11px 12px', color: item.l === 0 ? '#94a3b8' : '#334155' }}>{item.l}</td>
                  <td style={{ padding: '11px 12px', color: item.xl === 0 ? '#94a3b8' : '#334155' }}>{item.xl}</td>
                  <td style={{ padding: '11px 12px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>{item.total}</td>
                  <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#34d399' }}>{item.valuation}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--foreground, #334155)' }}>{item.location}</td>
                  <td style={{ padding: '11px 12px' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, background: item.status === 'Healthy' ? 'rgba(52,211,153,0.15)' : 'rgba(251,191,36,0.15)', color: item.status === 'Healthy' ? '#34d399' : '#fbbf24' }}>
                      {item.status}
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
