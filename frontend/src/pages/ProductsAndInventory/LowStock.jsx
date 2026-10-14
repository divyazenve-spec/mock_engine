import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';
import { MOCK_PRODUCTS } from './mockInventoryData';

export default function LowStock() {
  const [toastMessage, setToastMessage] = useState('');

  const lowItems = MOCK_PRODUCTS.filter(p => p.stock > 0 && p.stock <= p.reorder);
  const critItems = MOCK_PRODUCTS.filter(p => p.stock > 0 && p.stock <= p.reorder * 0.4);
  const estReorderVal = lowItems.reduce((acc, p) => acc + (p.reorder * 2 - p.stock) * p.cost, 0);

  const catsMap = {};
  lowItems.forEach(p => { catsMap[p.cat] = (catsMap[p.cat] || 0) + 1; });
  const catKeys = Object.keys(catsMap);

  function handleOrder(sku) {
    setToastMessage(`Emergency purchase order dispatched to vendor for ${sku}!`);
    setTimeout(() => setToastMessage(''), 3500);
  }

  return (
    <DashboardLayout
      category="Products & Inventory"
      subcategory="Low Stock"
      title="Low Stock Early Warning Center"
      subtitle="Critical stock levels below safety threshold with supplier reorder triggers and emergency procurement queues"
      icon="⚠️"
      badge={`${lowItems.length} SKUs Flagged`}
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
        <KpiCard label="Low Stock SKUs" value={String(lowItems.length)} delta={`${critItems.length} critical`} trend="down" subtext="Under reorder point" icon="⚠️" />
        <KpiCard label="Critical (<40% Reorder)" value={String(critItems.length)} delta="Immediate replenishment" trend="down" subtext="Severe stockout danger" icon="🔴" />
        <KpiCard label="Est. Stockout in 7 Days" value={`${critItems.length} SKUs`} delta="High velocity risk" trend="warn" subtext="Based on consumption" icon="📉" />
        <KpiCard label="Reorder Value Required" value={`₹${(estReorderVal / 100000).toFixed(2)}L`} delta="2 POs queued" trend="warn" subtext="Capital needed to restock" icon="💸" />
      </div>

      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>⚠️ Low Stock Alert Centre</h3>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#94a3b8' }}>Products below reorder threshold — sorted by criticality</p>
          </div>
          <span style={{
            padding: '3px 10px',
            borderRadius: '99px',
            fontSize: '11px',
            fontWeight: 700,
            background: 'rgba(245,158,11,0.15)',
            color: '#f59e0b'
          }}>{lowItems.length} SKUs Requiring Action</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)', fontSize: '11px' }}>
                <th style={{ padding: '10px 12px' }}>SKU</th>
                <th style={{ padding: '10px 12px' }}>Product Name</th>
                <th style={{ padding: '10px 12px' }}>Category</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>On-Hand</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Reorder Level</th>
                <th style={{ padding: '10px 12px' }}>Vendor & MOQ</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Reorder Value</th>
                <th style={{ padding: '10px 12px' }}>Priority</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {lowItems.map(p => {
                const isCrit = p.stock <= p.reorder * 0.4;
                const poVal = (p.reorder * 2 - p.stock) * p.cost;
                return (
                  <tr key={p.sku} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                    <td style={{ padding: '12px', fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', color: '#38bdf8' }}>{p.sku}</td>
                    <td style={{ padding: '12px', fontWeight: 600, color: '#f8fafc' }}>{p.name}</td>
                    <td style={{ padding: '12px', color: '#94a3b8' }}>{p.cat}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace', color: isCrit ? '#ef4444' : '#f59e0b' }}>{p.stock}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#64748b' }}>{p.reorder}</td>
                    <td style={{ padding: '12px', color: '#cbd5e1', fontSize: '11px' }}>{p.vendor} (MOQ: {p.moq})</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#f59e0b', fontWeight: 600 }}>₹{poVal.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '2px 8px',
                        borderRadius: '99px',
                        fontSize: '10px',
                        fontWeight: 700,
                        background: isCrit ? 'rgba(239,68,68,0.15)' : 'rgba(245,158,11,0.15)',
                        color: isCrit ? '#ef4444' : '#f59e0b'
                      }}>
                        {isCrit ? '🔴 Critical' : '🟡 Low Stock'}
                      </span>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      <button
                        onClick={() => handleOrder(p.sku)}
                        style={{
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          border: 'none',
                          background: isCrit ? '#ef4444' : '#f59e0b',
                          color: '#ffffff'
                        }}
                      >
                        Order Now
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Category-wise Low Stock Summary */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>📋 Category-wise Low Stock Summary</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {catKeys.map(ck => {
            const cnt = catsMap[ck];
            const pct = Math.min(100, Math.round((cnt / lowItems.length) * 100));
            return (
              <div key={ck}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600, color: '#f8fafc' }}>{ck}</span>
                  <span style={{ color: '#f59e0b', fontFamily: '"IBM Plex Mono", monospace' }}>{cnt} SKU(s) ({pct}%)</span>
                </div>
                <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: '#f59e0b', borderRadius: '4px' }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
