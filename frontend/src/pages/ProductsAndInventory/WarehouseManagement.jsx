import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';
import { MOCK_WAREHOUSES } from './mockInventoryData';

export default function WarehouseManagement() {
  const totalVal = MOCK_WAREHOUSES.reduce((s, w) => s + w.value, 0);
  const avgCap = Math.round(MOCK_WAREHOUSES.reduce((s, w) => s + w.capacity, 0) / MOCK_WAREHOUSES.length);
  const totalStaff = MOCK_WAREHOUSES.reduce((s, w) => s + w.staff, 0);

  return (
    <DashboardLayout
      category="Products & Inventory"
      subcategory="Warehouse Management"
      title="Regional Fulfillment Hubs & Facilities"
      subtitle="Hub capacity utilization, temperature-controlled cold zones, cross-dock throughput & warehouse operating telemetry"
      icon="🏭"
      badge={`${MOCK_WAREHOUSES.length} Facilities Online`}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Active Warehouses" value={`${MOCK_WAREHOUSES.length} Hubs`} delta="All systems operational" trend="up" subtext="National fulfillment network" icon="🏭" />
        <KpiCard label="Total Network Value" value={`₹${(totalVal / 10000000).toFixed(2)} Cr`} delta="+14.2% MoM" trend="up" subtext="Holding stock valuation" icon="💰" />
        <KpiCard label="Avg. Hub Capacity" value={`${avgCap}%`} delta="Optimal range < 85%" trend="neutral" subtext="Average fill rate" icon="📊" />
        <KpiCard label="Dispatch SLA" value="98.8%" delta="+0.6% vs benchmark" trend="up" subtext="Same-day dispatch turnaround" icon="⚡" />
      </div>

      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>🏭 Regional Fulfillment Network Status</h3>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#94a3b8' }}>Operational health, storage zones, staff headcount & inventory value across all active facilities</p>
          </div>
          <span style={{
            padding: '3px 10px',
            borderRadius: '99px',
            fontSize: '11px',
            fontWeight: 700,
            background: 'rgba(16,185,129,0.15)',
            color: '#10b981'
          }}>100% Network Uptime</span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '16px'
        }}>
          {MOCK_WAREHOUSES.map(w => {
            const capColor = w.capacity > 85 ? '#f59e0b' : w.capacity > 70 ? '#10b981' : '#0ea5e9';
            return (
              <div key={w.id} style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid var(--border, rgba(255,255,255,0.06))',
                borderRadius: '10px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: '#f8fafc' }}>🏭 {w.name}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>{w.city} ({w.id})</div>
                  </div>
                  <span style={{
                    padding: '2px 8px',
                    borderRadius: '99px',
                    fontSize: '10px',
                    fontWeight: 700,
                    background: w.health > 92 ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)',
                    color: w.health > 92 ? '#10b981' : '#f59e0b'
                  }}>
                    {w.health}% Health
                  </span>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                    <span style={{ color: '#cbd5e1' }}>Capacity Used</span>
                    <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600, color: capColor }}>{w.capacity}%</span>
                  </div>
                  <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '99px', overflow: 'hidden' }}>
                    <div style={{ width: `${w.capacity}%`, height: '100%', background: capColor, borderRadius: '99px' }}></div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ padding: '3px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.04)', fontSize: '11px', color: '#cbd5e1' }}>
                    📦 {w.skus} SKUs
                  </span>
                  <span style={{ padding: '3px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.04)', fontSize: '11px', color: '#10b981', fontWeight: 600 }}>
                    💰 ₹{(w.value / 100000).toFixed(1)}L
                  </span>
                  <span style={{ padding: '3px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.04)', fontSize: '11px', color: '#cbd5e1' }}>
                    👷 {w.staff} Staff
                  </span>
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '10px' }}>
                  <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                    Storage Zones
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {w.zones.map(z => (
                      <div key={z} style={{ fontSize: '11px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: capColor }}></span>
                        {z}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ fontSize: '11px', color: '#64748b', marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '8px' }}>
                  Hub Manager: <span style={{ color: '#cbd5e1', fontWeight: 600 }}>{w.manager}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
