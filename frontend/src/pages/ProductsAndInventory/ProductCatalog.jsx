import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';
import { MOCK_PRODUCTS } from './mockInventoryData';

export default function ProductCatalog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [warehouseFilter, setWarehouseFilter] = useState('ALL');

  const categories = ['ALL', ...new Set(MOCK_PRODUCTS.map(p => p.cat))];
  const warehouses = ['ALL', ...new Set(MOCK_PRODUCTS.map(p => p.warehouse))];

  const filtered = MOCK_PRODUCTS.filter(p => {
    const matchesCat = categoryFilter === 'ALL' || p.cat === categoryFilter;
    const matchesWh = warehouseFilter === 'ALL' || p.warehouse === warehouseFilter;
    const q = searchTerm.toLowerCase();
    const matchesSearch = !searchTerm ||
      p.sku.toLowerCase().includes(q) ||
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.vendor.toLowerCase().includes(q);
    return matchesCat && matchesWh && matchesSearch;
  });

  const totalCatalogVal = MOCK_PRODUCTS.reduce((s, p) => s + (p.stock * p.price), 0);
  const avgMargin = Math.round(
    MOCK_PRODUCTS.reduce((s, p) => s + (((p.price - p.cost) / p.price) * 100), 0) / MOCK_PRODUCTS.length
  );

  return (
    <DashboardLayout
      category="Products & Inventory"
      subcategory="Product Catalog"
      title="Master Product Catalog"
      subtitle="Complete veterinary pharmaceutical and pet healthcare SKU master registry with real-time pricing and channel availability"
      icon="🛍️"
      badge={`${MOCK_PRODUCTS.length} Listed SKUs`}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Active SKUs" value={String(MOCK_PRODUCTS.length)} delta="+2 this month" trend="up" subtext="Live in catalog" icon="🛍️" />
        <KpiCard label="Catalog Valuation" value={`₹${(totalCatalogVal / 100000).toFixed(2)}L`} delta="+12.4% MoM" trend="up" subtext="MRP gross valuation" icon="💰" />
        <KpiCard label="Avg. Gross Margin" value={`${avgMargin}%`} delta="+1.8% vs benchmark" trend="up" subtext="Cost to selling delta" icon="📊" />
        <KpiCard label="Cold-Chain Items" value={String(MOCK_PRODUCTS.filter(p => p.cold).length)} delta="2°C–8°C certified" trend="neutral" subtext="Refrigerated logistics" icon="❄️" />
      </div>

      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        {/* Filters Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>SKU Directory</h3>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Showing {filtered.length} of {MOCK_PRODUCTS.length} total products</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search SKU, name, brand, vendor..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '12px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--border, rgba(255,255,255,0.1))',
                color: '#f8fafc',
                minWidth: '220px'
              }}
            />
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              style={{
                padding: '6px 10px',
                borderRadius: '8px',
                fontSize: '12px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--border, rgba(255,255,255,0.1))',
                color: '#f8fafc'
              }}
            >
              {categories.map(c => <option key={c} value={c} style={{ background: '#1e293b' }}>{c === 'ALL' ? 'All Categories' : c}</option>)}
            </select>
            <select
              value={warehouseFilter}
              onChange={e => setWarehouseFilter(e.target.value)}
              style={{
                padding: '6px 10px',
                borderRadius: '8px',
                fontSize: '12px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--border, rgba(255,255,255,0.1))',
                color: '#f8fafc'
              }}
            >
              {warehouses.map(w => <option key={w} value={w} style={{ background: '#1e293b' }}>{w === 'ALL' ? 'All Warehouses' : w}</option>)}
            </select>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)', fontSize: '11px' }}>
                <th style={{ padding: '10px 12px' }}>SKU</th>
                <th style={{ padding: '10px 12px' }}>Product & Brand</th>
                <th style={{ padding: '10px 12px' }}>Category</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Cost Price</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Selling Price</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>MRP</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Margin</th>
                <th style={{ padding: '10px 12px' }}>Warehouse</th>
                <th style={{ padding: '10px 12px' }}>Badges</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => {
                const margin = Math.round(((p.price - p.cost) / p.price) * 100);
                return (
                  <tr key={p.sku} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                    <td style={{ padding: '12px', fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', color: '#38bdf8' }}>{p.sku}</td>
                    <td style={{ padding: '12px' }}>
                      <div style={{ fontWeight: 600, color: '#f8fafc' }}>{p.name}</div>
                      <div style={{ fontSize: '11px', color: '#94a3b8' }}>{p.brand} · Vendor: {p.vendor}</div>
                    </td>
                    <td style={{ padding: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>{p.cat}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>₹{p.cost.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600, color: '#f8fafc' }}>₹{p.price.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#94a3b8' }}>₹{p.mrp.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, color: margin > 30 ? '#10b981' : '#f59e0b' }}>{margin}%</td>
                    <td style={{ padding: '12px', color: '#cbd5e1' }}>{p.warehouse}</td>
                    <td style={{ padding: '12px' }}>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        {p.cold && <span style={{ padding: '2px 6px', borderRadius: '4px', background: 'rgba(56,189,248,0.15)', color: '#38bdf8', fontSize: '10px', fontWeight: 600 }}>❄️ Cold</span>}
                        {p.rx && <span style={{ padding: '2px 6px', borderRadius: '4px', background: 'rgba(245,158,11,0.15)', color: '#fbbf24', fontSize: '10px', fontWeight: 600 }}>Rx</span>}
                        {!p.cold && !p.rx && <span style={{ padding: '2px 6px', borderRadius: '4px', background: 'rgba(255,255,255,0.06)', color: '#94a3b8', fontSize: '10px' }}>Standard</span>}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
