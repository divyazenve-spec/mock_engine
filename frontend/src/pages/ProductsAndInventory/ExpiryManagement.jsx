import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';
import { MOCK_PRODUCTS } from './mockInventoryData';

export default function ExpiryManagement() {
  const [toastMessage, setToastMessage] = useState('');

  const now = new Date();
  const expiryItems = MOCK_PRODUCTS.filter(p => p.expiry).map(p => {
    const diffDays = Math.round((new Date(p.expiry) - now) / 86400000);
    return { ...p, days: diffDays };
  }).sort((a, b) => a.days - b.days);

  const critical = expiryItems.filter(p => p.days <= 30);
  const soon = expiryItems.filter(p => p.days > 30 && p.days <= 60);
  const ok = expiryItems.filter(p => p.days > 60);

  const disposalRisk = critical.reduce((s, p) => s + (p.stock * p.cost), 0);

  function handleQuarantine(sku, batch) {
    setToastMessage(`Batch ${batch} for SKU ${sku} quarantined and moved to return staging!`);
    setTimeout(() => setToastMessage(''), 3500);
  }

  return (
    <DashboardLayout
      category="Products & Inventory"
      subcategory="Expiry Management"
      title="FEFO & Expiry Life-Cycle Management"
      subtitle="First-Expired-First-Out (FEFO) automated dispatch routing, near-expiry vendor markdown queues & quarantine compliance"
      icon="⏳"
      badge={`${critical.length} Critical Batches`}
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
        <KpiCard label="Expiring ≤ 30 Days" value={`${critical.length} Batches`} delta="Immediate action required" trend="down" subtext="Nobivac DHPPi Kit" icon="🔴" />
        <KpiCard label="Expiring ≤ 60 Days" value={`${soon.length} Batches`} delta="Plan promotional markdown" trend="warn" subtext="NexGard Spectra Chew" icon="🟡" />
        <KpiCard label="FEFO Compliance" value="99.2%" delta="+0.4% vs SLA" trend="up" subtext="First-expiry dispatch accuracy" icon="📋" />
        <KpiCard label="Disposal Risk Value" value={`₹${disposalRisk.toLocaleString('en-IN')}`} delta="Pending vendor credit" trend="warn" subtext="Total at-risk holding value" icon="💸" />
      </div>

      {/* Critical Expiry Section */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#f87171' }}>🔴 Critical — Expiring Within 30 Days</h3>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#94a3b8' }}>Immediate markdown, return-to-vendor, or quarantine action required</p>
          </div>
          <span style={{
            padding: '3px 10px',
            borderRadius: '99px',
            fontSize: '11px',
            fontWeight: 700,
            background: 'rgba(239,68,68,0.15)',
            color: '#ef4444'
          }}>{critical.length} Batch(es)</span>
        </div>

        {critical.map(p => (
          <div key={p.sku} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 14px',
            background: 'rgba(239,68,68,0.06)',
            border: '1px solid rgba(239,68,68,0.2)',
            borderRadius: '8px',
            marginBottom: '10px'
          }}>
            <div>
              <div style={{ fontWeight: 600, color: '#f8fafc', fontSize: '13px' }}>{p.name}</div>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                SKU: <span style={{ color: '#38bdf8', fontFamily: '"IBM Plex Mono", monospace' }}>{p.sku}</span> · Batch: <span style={{ color: '#a78bfa', fontFamily: '"IBM Plex Mono", monospace' }}>{p.batch}</span> · Expires: <span style={{ color: '#ef4444', fontWeight: 700 }}>{p.expiry} ({p.days}d remaining)</span> · Stock: {p.stock} units
              </div>
            </div>
            <button
              onClick={() => handleQuarantine(p.sku, p.batch)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
                border: 'none',
                background: '#ef4444',
                color: '#ffffff'
              }}
            >
              Quarantine Batch
            </button>
          </div>
        ))}
      </div>

      {/* Healthy Stock Section */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#10b981' }}>✅ Healthy Stock (> 60 Days Remaining)</h3>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#94a3b8' }}>Normal lifecycle — active rotation under standard FEFO routing</p>
          </div>
          <span style={{
            padding: '3px 10px',
            borderRadius: '99px',
            fontSize: '11px',
            fontWeight: 700,
            background: 'rgba(16,185,129,0.15)',
            color: '#10b981'
          }}>{ok.length} Batches</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {ok.map(p => (
            <div key={p.sku} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '8px'
            }}>
              <div>
                <span style={{ fontWeight: 600, color: '#f8fafc', fontSize: '12px' }}>{p.name}</span>
                <span style={{ fontSize: '11px', color: '#64748b', marginLeft: '8px' }}>({p.sku})</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11px' }}>
                <span style={{ color: '#94a3b8' }}>Expires: {p.expiry}</span>
                <span style={{ color: '#10b981', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>+{p.days}d</span>
                <span style={{ color: '#cbd5e1' }}>{p.stock} units</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
