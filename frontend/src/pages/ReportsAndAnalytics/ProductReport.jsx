import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ProductReport() {
  const [toast, setToast] = useState('');

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const products = [
    { name: 'Royal Canin Maxi Adult Dog Food (15kg)', sku: 'SKU-RC-MAXI-15K', category: 'Canine Nutrition', unitsSold: 1420, revenue: 9940000, margin: '42.5%', returnRate: '0.8%', abcClass: 'Class A' },
    { name: 'Farmina N&D Grain-Free Pumpkin Lamb (12kg)', sku: 'SKU-FAR-PUMP-12K', category: 'Canine Nutrition', unitsSold: 980, revenue: 7840000, margin: '46.0%', returnRate: '0.6%', abcClass: 'Class A' },
    { name: 'NexGard Spectra Chewables (15-30kg)', sku: 'SKU-NEX-SPEC-MED', category: 'Prescription Antiparasitic', unitsSold: 2150, revenue: 5375000, margin: '52.0%', returnRate: '0.4%', abcClass: 'Class A' },
    { name: 'Bravecto Spot-On Chewable for Dogs', sku: 'SKU-BRV-CHW-DOG', category: 'Prescription Antiparasitic', unitsSold: 1840, revenue: 4968000, margin: '54.2%', returnRate: '0.5%', abcClass: 'Class A' },
    { name: 'Hill\'s Prescription Diet k/d Kidney Care', sku: 'SKU-HIL-KD-CAN', category: 'Therapeutic Prescription', unitsSold: 890, revenue: 4450000, margin: '48.5%', returnRate: '0.7%', abcClass: 'Class A' },
    { name: 'Orijen Six Fish WholePrey Adult Cat', sku: 'SKU-ORJ-CAT-6F', category: 'Feline Nutrition', unitsSold: 740, revenue: 3700000, margin: '44.0%', returnRate: '1.1%', abcClass: 'Class B' },
    { name: 'Virbac Epi-Otic Ear Cleanser (125ml)', sku: 'SKU-VIR-EPI-125', category: 'Clinical Dermatology', unitsSold: 3120, revenue: 2184000, margin: '62.0%', returnRate: '0.3%', abcClass: 'Class B' },
    { name: 'Beaphar Wimmies Dental Sticks (Large)', sku: 'SKU-BEA-DNT-LG', category: 'Dental & Oral Health', unitsSold: 2680, revenue: 1876000, margin: '58.5%', returnRate: '0.9%', abcClass: 'Class B' },
    { name: 'Savavet SafeHeart Pimobendan (5mg)', sku: 'SKU-SAV-SFH-5MG', category: 'Cardiac Therapeutics', unitsSold: 1150, revenue: 1610000, margin: '56.0%', returnRate: '0.2%', abcClass: 'Class B' },
    { name: 'Feliway Classic Diffuser Kit', sku: 'SKU-FEL-DIF-KIT', category: 'Behavioral & Calming', unitsSold: 620, revenue: 1240000, margin: '51.0%', returnRate: '1.4%', abcClass: 'Class C' }
  ];

  const inr = (n) => '₹' + Number(n).toLocaleString('en-IN');

  const downloadCSV = () => {
    const rows = [
      ['SKU Code', 'Product Title', 'Category', 'Units Sold MTD', 'Revenue Generated (INR)', 'Gross Margin', 'Return Rate', 'ABC Classification'],
      ...products.map(p => [p.sku, `"${p.name}"`, p.category, p.unitsSold, p.revenue, p.margin, p.returnRate, p.abcClass])
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(',')).join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `zenve_product_sales_report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('Product Analytics Report CSV exported.');
  };

  return (
    <DashboardLayout
      category="Reports & Analytics"
      subcategory="Product Reports"
      title="Product Catalog Sales & Margin Matrix"
      subtitle="Top performing SKUs, ABC inventory categorization, gross product margins, return rate benchmarks, and velocity tracking"
      icon="🏷️"
      badge=""
      actions={
        <button
          onClick={downloadCSV}
          style={{
            padding: '8px 14px',
            borderRadius: '8px',
            background: 'var(--primary, #3b82f6)',
            color: '#ffffff',
            border: 'none',
            fontWeight: 600,
            fontSize: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span>📥</span> Export Product CSV
        </button>
      }
    >
      {toast && (
        <div style={{
          padding: '10px 16px',
          background: 'rgba(59,130,246,0.15)',
          border: '1px solid #3b82f6',
          borderRadius: '8px',
          color: '#60a5fa',
          fontSize: '13px',
          fontWeight: 600
        }}>
          ⚡ {toast}
        </div>
      )}

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Top-Performing SKUs" value="184 Class A" delta="+12 SKUs" trend="up" subtext="Top tier SKUs" icon="🏆" />
        <KpiCard label="Blended Product Margin" value="49.4%" delta="+2.8%" trend="up" subtext="Product margin" icon="📊" />
        <KpiCard label="Avg Product Return Rate" value="0.7%" delta="-0.3%" trend="up" subtext="Within threshold" icon="🔄" />
        <KpiCard label="Active Catalog Units" value="2,450 SKUs" delta="+145" trend="up" subtext="Live catalog" icon="📦" />
      </div>

      {/* Table Section */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>SKU Velocity, Gross Contribution & Return Rate Matrix</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)' }}>
                <th style={{ padding: '10px 12px' }}>SKU Code & Product Title</th>
                <th style={{ padding: '10px 12px' }}>Category</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Units Sold</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Gross Revenue</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Margin</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Returns</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>ABC Tier</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '24px', textAlign: 'center', color: 'var(--muted-foreground, #94a3b8)' }}>
                    No product records found
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p.sku} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                    <td style={{ padding: '12px' }}>
                      <div style={{ fontWeight: 700, color: 'var(--foreground, #f8fafc)' }}>{p.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)', fontFamily: '"IBM Plex Mono", monospace' }}>{p.sku}</div>
                    </td>
                    <td style={{ padding: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>{p.category}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{p.unitsSold.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, color: '#34d399', fontFamily: '"IBM Plex Mono", monospace' }}>{inr(p.revenue)}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{p.margin}</td>
                    <td style={{ padding: '12px', textAlign: 'right', color: Number(p.returnRate.replace('%','')) > 4 ? '#f87171' : 'var(--foreground, #f8fafc)', fontFamily: '"IBM Plex Mono", monospace' }}>{p.returnRate}</td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      <span style={{
                        padding: '2px 8px',
                        borderRadius: '99px',
                        fontSize: '11px',
                        fontWeight: 700,
                        background: p.abcClass === 'Class A' ? 'rgba(16,185,129,0.15)' : 'rgba(59,130,246,0.15)',
                        color: p.abcClass === 'Class A' ? '#34d399' : '#60a5fa'
                      }}>
                        {p.abcClass}
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
