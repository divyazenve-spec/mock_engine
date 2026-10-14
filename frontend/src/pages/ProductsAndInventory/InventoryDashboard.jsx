import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';
import { MOCK_PRODUCTS } from './mockInventoryData';

export default function InventoryDashboard() {
  const stockItems = MOCK_PRODUCTS;
  const totalStockUnits = stockItems.reduce((acc, p) => acc + p.stock, 0);
  const totalStockValue = stockItems.reduce((acc, p) => acc + (p.stock * p.price), 0);
  const lowStockCount = stockItems.filter(p => p.stock > 0 && p.stock <= p.reorder).length;
  const outOfStockCount = stockItems.filter(p => p.stock === 0).length;

  return (
    <DashboardLayout
      category="Products & Inventory"
      subcategory="Inventory Dashboard"
      title="Warehouse & SKU Valuation Control"
      subtitle="Stock levels, batch tracking, expiry monitoring, and regional fulfillment hubs"
      icon="📦"
      badge={`Total Value: ₹${(totalStockValue / 100000).toFixed(2)} Lakhs`}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Stock Value" value={`₹${(totalStockValue / 100000).toFixed(2)}L`} delta="+14.2% MoM" trend="up" subtext="Across 5 fulfillment hubs" icon="💰" />
        <KpiCard label="Active SKUs" value={String(stockItems.length)} delta={`${totalStockUnits} units`} trend="neutral" subtext="Live catalog listings" icon="🏷️" />
        <KpiCard label="Low Stock SKUs" value={String(lowStockCount)} delta={`${outOfStockCount} out of stock`} trend="down" subtext="Below reorder threshold" icon="⚠️" />
        <KpiCard label="Expiring in 30 Days" value="1 batch" delta="Nobivac DHPPi" trend="warn" subtext="Immediate FEFO action" icon="⏳" />
      </div>

      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Real-Time SKU Stock Inventory</h3>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Active on-hand inventory levels across Bengaluru, Mumbai, Delhi, Pune, and Hyderabad fulfillment hubs</p>
          </div>
          <span style={{
            padding: '4px 10px',
            borderRadius: '99px',
            fontSize: '11px',
            fontWeight: 600,
            background: 'rgba(59,130,246,0.15)',
            color: '#60a5fa'
          }}>10 Live SKUs</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)', fontSize: '11px' }}>
                <th style={{ padding: '8px 12px' }}>SKU</th>
                <th style={{ padding: '8px 12px' }}>Product Name</th>
                <th style={{ padding: '8px 12px' }}>Category</th>
                <th style={{ padding: '8px 12px' }}>Warehouse</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Stock Qty</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Reorder Level</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Unit Price</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {stockItems.map((item) => {
                const isOut = item.stock === 0;
                const isLow = !isOut && item.stock <= item.reorder;
                const statusLabel = isOut ? 'Out of Stock' : isLow ? 'Low Stock' : 'Healthy';
                const statusBg = isOut ? 'rgba(239,68,68,0.15)' : isLow ? 'rgba(245,158,11,0.15)' : 'rgba(16,185,129,0.15)';
                const statusCol = isOut ? '#ef4444' : isLow ? '#f59e0b' : '#10b981';

                return (
                  <tr key={item.sku} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                    <td style={{ padding: '12px', fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', color: '#38bdf8' }}>{item.sku}</td>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{item.name}</td>
                    <td style={{ padding: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>{item.cat}</td>
                    <td style={{ padding: '12px', color: '#cbd5e1', fontSize: '12px' }}>{item.warehouse}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace', color: statusCol }}>{item.stock}</td>
                    <td style={{ padding: '12px', textAlign: 'right', color: 'var(--muted-foreground, #94a3b8)', fontFamily: '"IBM Plex Mono", monospace' }}>{item.reorder}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: 600 }}>₹{item.price.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      <span style={{
                        padding: '2px 8px',
                        borderRadius: '99px',
                        background: statusBg,
                        color: statusCol,
                        fontWeight: 600,
                        fontSize: '11px'
                      }}>{statusLabel}</span>
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
