import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';
import { MOCK_PRODUCTS } from './mockInventoryData';

export default function StockManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const totalUnits = MOCK_PRODUCTS.reduce((s, p) => s + p.stock, 0);
  const reorderCount = MOCK_PRODUCTS.filter(p => p.stock <= p.reorder).length;
  const estReorderVal = MOCK_PRODUCTS
    .filter(p => p.stock <= p.reorder)
    .reduce((s, p) => s + (Math.max(0, p.reorder * 2 - p.stock) * p.cost), 0);

  const filtered = MOCK_PRODUCTS.filter(p => {
    const q = searchTerm.toLowerCase();
    return !searchTerm ||
      p.sku.toLowerCase().includes(q) ||
      p.name.toLowerCase().includes(q) ||
      p.cat.toLowerCase().includes(q) ||
      p.warehouse.toLowerCase().includes(q);
  });

  function handleRaisePo(sku, name) {
    setToastMessage(`Purchase order successfully raised for ${sku} (${name})!`);
    setTimeout(() => setToastMessage(''), 3500);
  }

  return (
    <DashboardLayout
      category="Products & Inventory"
      subcategory="Stock Management"
      title="Stock Levels & Safety Stock Control"
      subtitle="Operational inventory on-hand, lead-time safety stock thresholds, coverage run-rate & procurement replenishment actions"
      icon="🏗️"
      badge={`${reorderCount} Action Items`}
    >
      {toastMessage && (
        <div style={{
          padding: '12px 16px',
          borderRadius: '8px',
          background: 'rgba(16,185,129,0.15)',
          border: '1px solid rgba(16,185,129,0.3)',
          color: '#10b981',
          fontSize: '13px',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span>✓</span> {toastMessage}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Units On-Hand" value={totalUnits.toLocaleString('en-IN')} delta="Across 5 hubs" trend="up" subtext="Live physical inventory" icon="🏗️" />
        <KpiCard label="Reorder Required" value={String(reorderCount)} delta="Below safety threshold" trend="warn" subtext="Actionable replenishment" icon="🔔" />
        <KpiCard label="Reorder Value (Est.)" value={`₹${(estReorderVal / 100000).toFixed(2)}L`} delta="Procurement backlog" trend="neutral" subtext="Estimated replenishment POs" icon="💸" />
        <KpiCard label="Avg. Days of Cover" value="24.2 Days" delta="Optimal safety band" trend="up" subtext="Run-rate based coverage" icon="📅" />
      </div>

      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Real-Time Stock Thresholds</h3>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#94a3b8' }}>Monitor on-hand inventory relative to reorder minimums and days of cover</p>
          </div>
          <input
            type="text"
            placeholder="Search SKU, product or hub..."
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
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)', fontSize: '11px' }}>
                <th style={{ padding: '10px 12px' }}>SKU</th>
                <th style={{ padding: '10px 12px' }}>Product</th>
                <th style={{ padding: '10px 12px' }}>Category</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>On-Hand</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Reorder Level</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Days Cover</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Est. PO Value</th>
                <th style={{ padding: '10px 12px' }}>Warehouse</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Replenishment Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => {
                const daysCover = p.stock > 0 ? Math.round(p.stock / Math.max(1, p.reorder / 14)) : 0;
                const poVal = Math.max(0, (p.reorder * 2 - p.stock)) * p.cost;
                const isUnder = p.stock <= p.reorder;
                const isOut = p.stock === 0;
                const stockCol = isOut ? '#ef4444' : isUnder ? '#f59e0b' : '#10b981';

                return (
                  <tr key={p.sku} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                    <td style={{ padding: '12px', fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', color: '#38bdf8' }}>{p.sku}</td>
                    <td style={{ padding: '12px', fontWeight: 600, color: '#f8fafc' }}>{p.name}</td>
                    <td style={{ padding: '12px', color: '#94a3b8' }}>{p.cat}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace', color: stockCol }}>{p.stock}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#64748b' }}>{p.reorder}</td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      <span style={{
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: 600,
                        background: daysCover > 20 ? 'rgba(16,185,129,0.15)' : daysCover > 7 ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.15)',
                        color: daysCover > 20 ? '#10b981' : daysCover > 7 ? '#f59e0b' : '#ef4444'
                      }}>
                        {daysCover}d
                      </span>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: poVal > 0 ? '#f59e0b' : '#64748b' }}>
                      {poVal > 0 ? `₹${poVal.toLocaleString('en-IN')}` : '—'}
                    </td>
                    <td style={{ padding: '12px', color: '#cbd5e1' }}>{p.warehouse}</td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      {isUnder ? (
                        <button
                          onClick={() => handleRaisePo(p.sku, p.name)}
                          style={{
                            padding: '4px 10px',
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            border: '1px solid rgba(139,92,246,0.3)',
                            background: 'rgba(139,92,246,0.18)',
                            color: '#a78bfa'
                          }}
                        >
                          Raise PO
                        </button>
                      ) : (
                        <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>Adequate</span>
                      )}
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
