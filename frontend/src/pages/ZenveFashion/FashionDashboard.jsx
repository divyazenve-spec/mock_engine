import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';
import FashionProducts from './FashionProducts';
import FashionOrders from './FashionOrders';
import FashionCustomers from './FashionCustomers';
import FashionInventory from './FashionInventory';
import FashionShowrooms from './FashionShowrooms';
import OnlineFashionSales from './OnlineFashionSales';
import FashionRevenue from './FashionRevenue';
import FashionProfitability from './FashionProfitability';
import FashionCollections from './FashionCollections';

export default function FashionDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const subcategories = [
    { id: 'overview', label: 'Fashion Dashboard', icon: '🎀' },
    { id: 'products', label: 'Fashion Products', icon: '👗' },
    { id: 'orders', label: 'Fashion Orders', icon: '🛍️' },
    { id: 'customers', label: 'Fashion Customers', icon: '💎' },
    { id: 'inventory', label: 'Fashion Inventory', icon: '📦' },
    { id: 'showrooms', label: 'Fashion Showrooms', icon: '🏛️' },
    { id: 'online', label: 'Online Fashion Sales', icon: '📱' },
    { id: 'revenue', label: 'Fashion Revenue', icon: '💵' },
    { id: 'profitability', label: 'Fashion Profitability', icon: '💎' },
    { id: 'collections', label: 'Fashion Collections', icon: '✨' }
  ];

  if (activeTab === 'products') return <FashionProducts />;
  if (activeTab === 'orders') return <FashionOrders />;
  if (activeTab === 'customers') return <FashionCustomers />;
  if (activeTab === 'inventory') return <FashionInventory />;
  if (activeTab === 'showrooms') return <FashionShowrooms />;
  if (activeTab === 'online') return <OnlineFashionSales />;
  if (activeTab === 'revenue') return <FashionRevenue />;
  if (activeTab === 'profitability') return <FashionProfitability />;
  if (activeTab === 'collections') return <FashionCollections />;

  const topProducts = [
    { sku: 'ZFS-0101', name: 'Royal Brocade Pet Sherwani', category: 'Formal Atelier', price: '₹4,850', unitsSold: 142, revenue: '₹6,88,700', margin: '70.7%', growth: '+44.2%' },
    { sku: 'ZFS-0102', name: 'Italian Nappa Leather Ergonomic Harness', category: 'Ergonomic Harnesses', price: '₹3,650', unitsSold: 128, revenue: '₹4,67,200', margin: '69.3%', growth: '+28.6%' },
    { sku: 'ZFS-0103', name: 'Himalayan Cashmere Cable-Knit Sweater', category: 'Winter Knits', price: '₹2,950', unitsSold: 114, revenue: '₹3,36,300', margin: '70.8%', growth: '+32.4%' },
    { sku: 'ZFS-0104', name: 'Alpine StormShield Waterproof Trench', category: 'Weatherwear', price: '₹4,200', unitsSold: 98, revenue: '₹4,11,600', margin: '68.1%', growth: '+36.0%' },
    { sku: 'ZFS-0105', name: 'Florentine Calfskin Collar & Leash Set', category: 'Collars & Leashes', price: '₹3,200', unitsSold: 94, revenue: '₹3,00,800', margin: '70.3%', growth: '+22.1%' },
    { sku: 'ZFS-0106', name: 'Monaco Riviera Linen Sailor Polo', category: 'Loungewear', price: '₹2,150', unitsSold: 82, revenue: '₹1,76,300', margin: '71.2%', growth: '+18.5%' },
    { sku: 'ZFS-0107', name: 'Velvet Evening Tuxedo with Silk Bowtie', category: 'Formal Atelier', price: '₹5,400', unitsSold: 68, revenue: '₹3,67,200', margin: '68.9%', growth: '+51.2%' },
    { sku: 'ZFS-0108', name: 'All-Terrain Orthopedic Rain Booties', category: 'Footwear', price: '₹1,850', unitsSold: 76, revenue: '₹1,40,600', margin: '68.6%', growth: '+14.8%' },
    { sku: 'ZFS-0109', name: '24K Gold-Plated Bespoke ID Medallion', category: 'Accessories', price: '₹2,450', unitsSold: 88, revenue: '₹2,15,600', margin: '71.8%', growth: '+38.0%' },
    { sku: 'ZFS-0110', name: 'Merino Wool Thermal Base Layer', category: 'Winter Knits', price: '₹2,250', unitsSold: 62, revenue: '₹1,39,500', margin: '69.8%', growth: '+25.4%' }
  ];

  const showroomPerformance = [
    { name: 'Bandra West Haute Couture Flagship', area: 'Linking Road, Mumbai', footfall: '480 Pets', sales: '₹14.80L', conversion: '70.8%', rating: '4.9 ★' },
    { name: 'Indiranagar Atelier & Styling Lounge', area: '100ft Road, Bengaluru', footfall: '420 Pets', sales: '₹12.40L', conversion: '69.0%', rating: '4.9 ★' },
    { name: 'Koramangala VIP Pet Experience Hub', area: '4th Block, Bengaluru', footfall: '360 Pets', sales: '₹9.80L', conversion: '66.7%', rating: '4.8 ★' },
    { name: 'Jubilee Hills Luxury Pet Salon', area: 'Rd No. 36, Hyderabad', footfall: '310 Pets', sales: '₹8.60L', conversion: '67.7%', rating: '4.8 ★' },
    { name: 'DLF CyberCity Pet Pavilion', area: 'Phase 2, Gurugram', footfall: '340 Pets', sales: '₹9.20L', conversion: '67.6%', rating: '4.8 ★' },
    { name: 'Colaba Heritage Boutique', area: 'Apollo Bunder, Mumbai', footfall: '260 Pets', sales: '₹7.40L', conversion: '69.2%', rating: '4.9 ★' },
    { name: 'Vasant Vihar Couture Salon', area: 'Priya Complex, South Delhi', footfall: '280 Pets', sales: '₹8.10L', conversion: '67.9%', rating: '4.8 ★' },
    { name: 'Whitefield Prestige Experience Hub', area: 'Outer Ring Rd, Bengaluru', footfall: '240 Pets', sales: '₹6.50L', conversion: '66.7%', rating: '4.7 ★' },
    { name: 'Alwarpet Luxury Pet Gallery', area: 'TTK Road, Chennai', footfall: '220 Pets', sales: '₹5.80L', conversion: '65.9%', rating: '4.7 ★' },
    { name: 'Koregaon Park Atelier', area: 'North Main Rd, Pune', footfall: '200 Pets', sales: '₹5.20L', conversion: '67.5%', rating: '4.8 ★' }
  ];

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(255,255,255,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Zenve Fashion"
      subcategory="Executive Dashboard"
      title="Zenve Pet Haute Couture & Lifestyle Command Center"
      subtitle="Bespoke luxury pet apparel, flagship showroom footfalls, online drops, and premium lifestyle unit economics"
      icon="🎀"
      badge="Showroom + Atelier Live"
      actions={
        <button onClick={() => alert('Launching New Seasonal Fashion Capsule Drop...')} style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #ec4899', background: 'rgba(236,72,153,0.15)', color: '#f472b6', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
          ✨ Launch Capsule Drop
        </button>
      }
    >
      {/* Subcategories Chip Navigator */}
      <div style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '8px',
        marginBottom: '16px',
        borderBottom: '1px solid #e2e8f0'
      }}>
        {subcategories.map(s => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActiveTab(s.id)}
            style={{
              padding: '6px 12px',
              borderRadius: '20px',
              border: activeTab === s.id ? '1px solid #ec4899' : '1px solid #cbd5e1',
              background: activeTab === s.id ? '#ec4899' : '#ffffff',
              color: activeTab === s.id ? '#ffffff' : '#475569',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap'
            }}
          >
            <span>{s.icon}</span>
            <span>{s.label}</span>
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Fashion Gross Revenue (MTD)" value="₹48.60L" delta="+34.8% MoM" trend="up" subtext="Combined online & boutique" icon="🎀" />
        <KpiCard label="Apparel Units Sold" value="730 Items" delta="+22.4% vs last month" trend="up" subtext="Average 2.4 items/cart" icon="👗" />
        <KpiCard label="Blended Gross Margin" value="68.4%" delta="+3.1% YoY" trend="up" subtext="High atelier contribution" icon="💎" />
        <KpiCard label="Flagship Showroom Footfall" value="1,640 Visitors" delta="+18.5% conversion" trend="up" subtext="Across 10 urban boutiques" icon="🛍️" />
        <KpiCard label="Bespoke Atelier Orders" value="64 Custom" delta="Fit guarantee 100%" trend="up" subtext="Handcrafted tailored fit" icon="✂️" />
        <KpiCard label="Return & Exchange Rate" value="1.2%" delta="-1.4% improvement" trend="up" subtext="Precision 3D pet sizing" icon="📐" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '18px' }}>
        {/* Top Product Lines */}
        <div style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>👗 Best-Selling Couture Lines (Top 10)</h3>
              <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>High-velocity pet apparel, weatherwear, and artisan accessories</p>
            </div>
            <button onClick={() => setActiveTab('products')} style={{ padding: '4px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '11px', cursor: 'pointer' }}>View Catalog</button>
          </div>
          <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ background: 'var(--muted, #f8fafc)', borderBottom: '1px solid var(--border, rgba(0,0,0,0.08))' }}>
                  {['SKU', 'Product Name', 'Category', 'Price', 'Units Sold', 'Revenue', 'Margin', 'Growth'].map(h => (
                    <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--muted-foreground, #64748b)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {topProducts.map((p, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border, rgba(0,0,0,0.06))' }}>
                    <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', color: '#f472b6', fontSize: '11px' }}>{p.sku}</td>
                    <td style={{ padding: '11px 12px', fontWeight: 600, color: 'var(--foreground, #0f172a)' }}>{p.name}</td>
                    <td style={{ padding: '11px 12px', color: 'var(--muted-foreground, #64748b)' }}>{p.category}</td>
                    <td style={{ padding: '11px 12px', color: 'var(--foreground, #334155)' }}>{p.price}</td>
                    <td style={{ padding: '11px 12px', color: 'var(--foreground, #0f172a)', fontWeight: 600 }}>{p.unitsSold}</td>
                    <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#34d399' }}>{p.revenue}</td>
                    <td style={{ padding: '11px 12px', fontWeight: 700, color: '#a78bfa' }}>{p.margin}</td>
                    <td style={{ padding: '11px 12px', color: '#34d399', fontWeight: 700 }}>{p.growth}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Showroom Performance */}
        <div style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>🏛️ Flagship Boutique Network (Top 10)</h3>
              <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Footfall conversion, sales volume, and retail ratings</p>
            </div>
            <button onClick={() => setActiveTab('showrooms')} style={{ padding: '4px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '11px', cursor: 'pointer' }}>All Boutiques</button>
          </div>
          <div style={{ display: 'grid', gap: '10px' }}>
            {showroomPerformance.map((s, idx) => (
              <div key={idx} style={{ background: 'var(--muted, #f8fafc)', border: '1px solid rgba(0,0,0,0.06)', borderRadius: '10px', padding: '12px 14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <strong style={{ fontSize: '13px', color: 'var(--foreground, #0f172a)' }}>{s.name}</strong>
                  <span style={{ padding: '2px 7px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, background: 'rgba(251,191,36,0.15)', color: '#fbbf24' }}>{s.rating}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', fontSize: '11px' }}>
                  <div><span style={{ color: '#64748b' }}>Area:</span> <strong style={{ color: 'var(--foreground, #334155)' }}>{s.area}</strong></div>
                  <div><span style={{ color: '#64748b' }}>Footfall:</span> <strong style={{ color: 'var(--foreground, #334155)' }}>{s.footfall}</strong></div>
                  <div><span style={{ color: '#64748b' }}>Sales:</span> <strong style={{ color: '#34d399', fontFamily: 'monospace' }}>{s.sales}</strong></div>
                  <div><span style={{ color: '#64748b' }}>Conversion:</span> <strong style={{ color: '#38bdf8' }}>{s.conversion}</strong></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
