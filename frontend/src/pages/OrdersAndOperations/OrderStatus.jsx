import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';
import { MOCK_ORDERS, ORDER_STATUS_COLORS } from './mockOrdersData';

export default function OrderStatus() {
  const [filter, setFilter] = useState('ALL');
  const orders = MOCK_ORDERS;

  const filtered = filter === 'ALL' ? orders : orders.filter(o => o.status === filter);

  return (
    <DashboardLayout
      category="Orders & Operations"
      subcategory="Order Status"
      title="Live Order Status & Telematics"
      subtitle="Milestone fulfillment tracking, carrier telematics, cold-chain checks, and real-time delivery status"
      icon="📍"
      badge="Tracking"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Delivered Orders" value="3 Orders" delta="30% of total" trend="up" subtext="Successfully completed" icon="✅" />
        <KpiCard label="In Transit & Out" value="2 Orders" delta="Live telematics" trend="up" subtext="Rider moving on route" icon="🛵" />
        <KpiCard label="Hub Processing" value="3 Orders" delta="QA & packing" trend="neutral" subtext="In dark stores & pharmacy" icon="⚙️" />
        <KpiCard label="Exceptions / Returns" value="2 Orders" delta="20% of total" trend="down" subtext="1 Return, 1 Cancelled" icon="⚠️" />
      </div>

      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Live Order Status & Milestone Tracker</h3>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#64748b' }}>Visual progress completion for all 10 mock orders</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['ALL', 'Delivered', 'Out for Delivery', 'Processing', 'Returned', 'Cancelled'].map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                style={{
                  padding: '5px 10px',
                  borderRadius: '6px',
                  border: filter === s ? '1px solid #2563eb' : '1px solid #cbd5e1',
                  background: filter === s ? '#eff6ff' : '#ffffff',
                  color: filter === s ? '#1d4ed8' : '#475569',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gap: '12px' }}>
          {filtered.map(o => {
            const style = ORDER_STATUS_COLORS[o.status] || { bg: '#f1f5f9', color: '#475569', border: '#e2e8f0' };
            return (
              <div
                key={o.id}
                style={{
                  padding: '16px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  background: '#f8fafc',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace', fontSize: '14px', color: '#0f172a' }}>{o.id}</span>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '99px',
                      background: style.bg,
                      color: style.color,
                      border: `1px solid ${style.border}`,
                      fontWeight: 600,
                      fontSize: '11px'
                    }}>{o.status}</span>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>{o.channel} · {o.city}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>⚡ {o.sla}</span>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{o.amountFormatted}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#475569' }}>
                  <div>
                    <strong>Customer:</strong> {o.customer} ({o.pet}) — <em>{o.items}</em>
                  </div>
                  <div>
                    <strong>Rider:</strong> {o.rider}
                  </div>
                </div>

                {/* Progress bar */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>
                    <span>Pipeline Fulfillment</span>
                    <span>{o.progress}% Completed</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: '#e2e8f0', borderRadius: '99px', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${o.progress}%`,
                        height: '100%',
                        background: o.status === 'Cancelled' ? '#94a3b8' : o.status === 'Returned' ? '#f43f5e' : '#10b981',
                        borderRadius: '99px'
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
