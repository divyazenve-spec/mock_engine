import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function FashionProducts() {
  const [selectedCat, setSelectedCat] = useState('ALL');
  const [search, setSearch] = useState('');

  const products = [
    { sku: 'ZFS-0101', name: 'Royal Brocade Pet Sherwani', category: 'Formal Atelier', petType: 'Dog (All Breeds)', sizes: 'S, M, L, XL', material: 'Benarasi Silk & Gold Zari', price: '₹4,850', cost: '₹1,420', stock: 38, status: 'In Stock' },
    { sku: 'ZFS-0102', name: 'Italian Nappa Leather Ergonomic Harness', category: 'Ergonomic Harnesses', petType: 'Dog (Med/Large)', sizes: 'S, M, L', material: 'Full-Grain Nappa & Brass', price: '₹3,650', cost: '₹1,120', stock: 52, status: 'In Stock' },
    { sku: 'ZFS-0103', name: 'Himalayan Cashmere Cable-Knit Sweater', category: 'Winter Knits', petType: 'Dog & Cat', sizes: 'XS, S, M, L', material: '100% Grade-A Cashmere', price: '₹2,950', cost: '₹860', stock: 44, status: 'In Stock' },
    { sku: 'ZFS-0104', name: 'Alpine StormShield Waterproof Trench', category: 'Weatherwear', petType: 'Dog (All Breeds)', sizes: 'S, M, L, XL, XXL', material: '3-Layer GORE-TEX Membrane', price: '₹4,200', cost: '₹1,340', stock: 65, status: 'In Stock' },
    { sku: 'ZFS-0105', name: 'Florentine Calfskin Collar & Leash Set', category: 'Collars & Leashes', petType: 'Dog & Cat', sizes: 'XS, S, M, L', material: 'Tuscan Vegetable Leather', price: '₹3,200', cost: '₹950', stock: 78, status: 'In Stock' },
    { sku: 'ZFS-0106', name: 'Monaco Riviera Linen Sailor Polo', category: 'Loungewear', petType: 'Dog (Small/Med)', sizes: 'XS, S, M, L', material: 'Organic French Flax Linen', price: '₹2,150', cost: '₹620', stock: 30, status: 'In Stock' },
    { sku: 'ZFS-0107', name: 'Velvet Evening Tuxedo with Silk Bowtie', category: 'Formal Atelier', petType: 'Dog (All Breeds)', sizes: 'S, M, L, XL', material: 'Italian Velvet & Mulberry Silk', price: '₹5,400', cost: '₹1,680', stock: 22, status: 'Low Stock' },
    { sku: 'ZFS-0108', name: 'All-Terrain Orthopedic Rain Booties', category: 'Footwear', petType: 'Dog (All Breeds)', sizes: 'S, M, L, XL', material: 'Natural Vulcanized Rubber', price: '₹1,850', cost: '₹580', stock: 85, status: 'In Stock' },
    { sku: 'ZFS-0109', name: '24K Gold-Plated Bespoke ID Medallion', category: 'Accessories', petType: 'Dog & Cat', sizes: 'One Size', material: 'Solid Brass with 24K Gold', price: '₹2,450', cost: '₹690', stock: 96, status: 'In Stock' },
    { sku: 'ZFS-0110', name: 'Merino Wool Thermal Base Layer', category: 'Winter Knits', petType: 'Cat & Toy Dogs', sizes: 'XS, S, M', material: '100% Australian Merino Wool', price: '₹2,250', cost: '₹680', stock: 40, status: 'In Stock' }
  ];

  const filtered = products.filter(p => {
    if (selectedCat !== 'ALL' && p.category !== selectedCat) return false;
    if (search) {
      const q = search.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.material.toLowerCase().includes(q);
    }
    return true;
  });

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(255,255,255,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Zenve Fashion"
      subcategory="Product Catalog"
      title="Haute Couture Product Line & Sizing Master"
      subtitle="Bespoke pet apparel catalog, fabric specifications, ergonomic sizing matrices, and retail inventory valuation"
      icon="👗"
      badge="42 SKUs Live"
      actions={
        <button onClick={() => alert('Adding New Fashion Apparel Style to Atelier Catalog...')} style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #ec4899', background: 'rgba(236,72,153,0.15)', color: '#f472b6', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
          + Add New Style
        </button>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Active Fashion SKUs" value="42 Styles" delta="8 Categories" trend="up" subtext="Across apparel & leather" icon="👗" />
        <KpiCard label="Avg. Retail Price (ASP)" value="₹3,420" delta="+14.2% YoY" trend="up" subtext="Luxury price realization" icon="🏷️" />
        <KpiCard label="Average Product Margin" value="69.8%" delta="+2.4% expansion" trend="up" subtext="Artisan direct production" icon="💎" />
        <KpiCard label="Eco-Certified Fabrics" value="92.4%" delta="OEKO-TEX Certified" trend="up" subtext="Cruelty-free & organic" icon="🌱" />
        <KpiCard label="Low Stock Styles" value="2 SKUs" delta="<15u cover" trend="warn" subtext="Replenishment queued" icon="⚠️" />
        <KpiCard label="Custom Atelier Queue" value="64 Orders" delta="4.8-day TAT" trend="up" subtext="Bespoke tailoring active" icon="✂️" />
      </div>

      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>👗 Pet Fashion Master Catalog</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Fabrics, ergonomic cut specifications, and production unit economics</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search SKU, name, fabric..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.15))', borderRadius: '6px', padding: '6px 12px', color: 'var(--foreground, #0f172a)', fontSize: '12px', minWidth: '220px' }}
            />
            <select
              value={selectedCat}
              onChange={e => setSelectedCat(e.target.value)}
              style={{ background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.15))', borderRadius: '6px', padding: '6px 10px', color: 'var(--foreground, #0f172a)', fontSize: '12px' }}
            >
              <option value="ALL">All Categories</option>
              <option value="Formal Atelier">Formal Atelier</option>
              <option value="Ergonomic Harnesses">Ergonomic Harnesses</option>
              <option value="Winter Knits">Winter Knits</option>
              <option value="Weatherwear">Weatherwear</option>
              <option value="Collars & Leashes">Collars & Leashes</option>
              <option value="Loungewear">Loungewear</option>
              <option value="Footwear">Footwear</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>
        </div>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'var(--muted, #f8fafc)', borderBottom: '1px solid var(--border, rgba(0,0,0,0.08))' }}>
                {['SKU', 'Product Name', 'Category', 'Target Pet', 'Sizes', 'Fabric & Material', 'Retail Price', 'COGS Unit', 'Stock', 'Status'].map(h => (
                  <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--muted-foreground, #64748b)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={10} style={{ padding: '28px 12px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                    No fashion products found
                  </td>
                </tr>
              ) : (
                filtered.map((p, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border, rgba(0,0,0,0.06))' }}>
                    <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', color: '#f472b6', fontSize: '11px', fontWeight: 600 }}>{p.sku}</td>
                    <td style={{ padding: '11px 12px', fontWeight: 600, color: 'var(--foreground, #0f172a)' }}>{p.name}</td>
                    <td style={{ padding: '11px 12px', color: 'var(--muted-foreground, #64748b)' }}>{p.category}</td>
                    <td style={{ padding: '11px 12px', color: 'var(--foreground, #334155)' }}>{p.petType}</td>
                    <td style={{ padding: '11px 12px', color: '#a78bfa' }}>{p.sizes}</td>
                    <td style={{ padding: '11px 12px', color: 'var(--muted-foreground, #64748b)', fontSize: '11px' }}>{p.material}</td>
                    <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#34d399' }}>{p.price}</td>
                    <td style={{ padding: '11px 12px', color: '#64748b' }}>{p.cost}</td>
                    <td style={{ padding: '11px 12px', color: 'var(--foreground, #0f172a)', fontWeight: 600 }}>{p.stock}</td>
                    <td style={{ padding: '11px 12px' }}>
                      <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, background: p.status === 'In Stock' ? 'rgba(52,211,153,0.15)' : 'rgba(251,191,36,0.15)', color: p.status === 'In Stock' ? '#34d399' : '#fbbf24' }}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
