import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';
import { MOCK_PRODUCTS } from './mockInventoryData';

export default function OutOfStock() {
  const [toastMessage, setToastMessage] = useState('');

  const outItems = MOCK_PRODUCTS.filter(p => p.stock === 0);
  const totalDailyLoss = outItems.reduce((acc, p) => acc + (Math.max(1, Math.round(p.reorder / 14)) * p.price), 0);

  function handleExpedite(sku) {
    setToastMessage(`Supplier expedite directive issued for ${sku} with priority air freight!`);
    setTimeout(() => setToastMessage(''), 3500);
  }

  return (
    <DashboardLayout
      category="Products & Inventory"
      subcategory="Out of Stock"
      title="Out of Stock & Lost Revenue Analytics"
      subtitle="Zero-inventory SKU tracking, daily lost revenue estimation, customer backorder volume & replenishment expedites"
      icon="🚫"
      badge={`${outItems.length} SKUs Unavailable`}
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
        <KpiCard label="Out of Stock SKUs" value={String(outItems.length)} delta="Zero inventory" trend="down" subtext="Unfulfillable listings" icon="🚫" />
        <KpiCard label="Est. Revenue Lost (MTD)" value={`₹${((totalDailyLoss * 30) / 1000).toFixed(1)}K`} delta="Based on 14d run-rate" trend="down" subtext="Uncaptured demand" icon="📉" />
        <KpiCard label="Orders Impacted" value="18" delta="Unfulfillable cart lines" trend="warn" subtext="Customer cart drops" icon="📦" />
        <KpiCard label="Avg. Days Out of Stock" value="4.5 Days" delta="Supplier lead delay" trend="warn" subtext="Average replenishment cycle" icon="📅" />
      </div>

      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>🚫 Out of Stock Products</h3>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#94a3b8' }}>Zero-inventory SKUs — replenishment urgency and lost revenue analysis</p>
          </div>
          <span style={{
            padding: '3px 10px',
            borderRadius: '99px',
            fontSize: '11px',
            fontWeight: 700,
            background: 'rgba(239,68,68,0.15)',
            color: '#ef4444'
          }}>{outItems.length} Zero-Stock Items</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)', fontSize: '11px' }}>
                <th style={{ padding: '10px 12px' }}>SKU</th>
                <th style={{ padding: '10px 12px' }}>Product Name</th>
                <th style={{ padding: '10px 12px' }}>Category</th>
                <th style={{ padding: '10px 12px' }}>Warehouse</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Reorder Level</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Est. Daily Demand</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Lost Rev/Day</th>
                <th style={{ padding: '10px 12px' }}>Vendor</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {outItems.map((p, i) => {
                const dailyDemand = Math.max(1, Math.round(p.reorder / 14));
                const lostRev = dailyDemand * p.price;
                return (
                  <tr key={p.sku} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                    <td style={{ padding: '12px', fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', color: '#38bdf8' }}>{p.sku}</td>
                    <td style={{ padding: '12px', fontWeight: 600, color: '#f8fafc' }}>{p.name}</td>
                    <td style={{ padding: '12px', color: '#94a3b8' }}>{p.cat}</td>
                    <td style={{ padding: '12px', color: '#cbd5e1' }}>{p.warehouse}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#64748b' }}>{p.reorder}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{dailyDemand} units/day</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#ef4444', fontWeight: 700 }}>₹{lostRev.toLocaleString('en-IN')}/day</td>
                    <td style={{ padding: '12px', color: '#94a3b8', fontSize: '11px' }}>{p.vendor}</td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      <button
                        onClick={() => handleExpedite(p.sku)}
                        style={{
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          border: 'none',
                          background: '#ef4444',
                          color: '#ffffff'
                        }}
                      >
                        Expedite PO
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Root Cause Analysis */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>📊 Out-of-Stock Root Cause Analysis</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
              <span style={{ fontWeight: 600, color: '#f8fafc' }}>Supplier Manufacturing Batch Delay (Mars Petcare - Hill's j/d)</span>
              <span style={{ color: '#ef4444', fontFamily: '"IBM Plex Mono", monospace' }}>60% Impact</span>
            </div>
            <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '60%', height: '100%', background: '#ef4444', borderRadius: '4px' }}></div>
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
              <span style={{ fontWeight: 600, color: '#f8fafc' }}>Cold-Chain Reefer Truck Logistics Lane Congestion (Virbac - Douxo S3)</span>
              <span style={{ color: '#f59e0b', fontFamily: '"IBM Plex Mono", monospace' }}>40% Impact</span>
            </div>
            <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '40%', height: '100%', background: '#f59e0b', borderRadius: '4px' }}></div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
