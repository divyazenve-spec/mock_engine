import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';
import { MOCK_ORDERS, ORDER_STATUS_COLORS } from './mockOrdersData';

export default function OrdersDashboard() {
  const orders = MOCK_ORDERS;

  const activeOrders = orders.filter((o) =>
    ['Out for Delivery', 'Dispatched', 'Packed', 'Processing'].includes(o.status)
  ).length;
  const deliveredToday = orders.filter((o) => o.status === 'Delivered').length;
  const returnedCount = orders.filter((o) => o.status === 'Returned').length;
  const returnRate = ((returnedCount / orders.length) * 100).toFixed(1);

  return (
    <DashboardLayout
      category="Orders & Operations"
      subcategory="Operations Dashboard"
      title="Fulfillment & Operations Control"
      subtitle="Rapid delivery SLA monitoring, dispatch status, returns, and order workflows"
      icon="🚚"
      badge="Active Operations"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Active Orders" value={`${activeOrders} Orders`} delta="In Pipeline" trend="neutral" subtext="Dispatched & Processing" icon="📦" />
        <KpiCard label="Avg Delivery Time" value="38 mins" delta="-6 mins vs target" trend="up" subtext="60-Min Express Tier" icon="⚡" />
        <KpiCard label="Delivered Today" value={`${deliveredToday} Orders`} delta="100% on SLA" trend="up" subtext="First attempt verified" icon="✅" />
        <KpiCard label="Return / Refund Rate" value={`${returnRate}%`} delta="1 of 10 orders" trend="neutral" subtext="Transit seal rupture" icon="🛡️" />
      </div>

      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Live Operations Stream</h3>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#64748b' }}>Real-time parcel status, dark store dispatch, and carrier telematics across 10 orders</p>
          </div>
          <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', background: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0' }}>
            10 Active Records
          </span>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '11px', background: '#f8fafc' }}>
              <th style={{ padding: '10px 12px' }}>Order ID</th>
              <th style={{ padding: '10px 12px' }}>Customer & Hub</th>
              <th style={{ padding: '10px 12px' }}>Items & Prescriptions</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Amount</th>
              <th style={{ padding: '10px 12px' }}>Fulfillment SLA</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => {
              const style = ORDER_STATUS_COLORS[o.status] || { bg: '#f1f5f9', color: '#475569', border: '#e2e8f0' };
              return (
                <tr key={o.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{o.id}</td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ fontWeight: 600, color: '#0f172a' }}>{o.customer}</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>{o.hub}</div>
                  </td>
                  <td style={{ padding: '12px', color: '#475569' }}>
                    <div>{o.items}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>Rider: {o.rider}</div>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, color: '#0f172a' }}>{o.amountFormatted}</td>
                  <td style={{ padding: '12px', color: '#334155', fontSize: '12px' }}>
                    ⚡ {o.sla}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '99px',
                      background: style.bg,
                      color: style.color,
                      border: `1px solid ${style.border}`,
                      fontWeight: 600,
                      fontSize: '11px'
                    }}>{o.status}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
