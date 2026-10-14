import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';
import { MOCK_ORDERS, ORDER_STATUS_COLORS } from './mockOrdersData';

export default function OrderManagement() {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [selectedHub, setSelectedHub] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [search, setSearch] = useState('');

  const filteredOrders = orders.filter((o) => {
    const hubMatch = selectedHub === 'ALL' || o.city.toLowerCase().includes(selectedHub.toLowerCase());
    const statusMatch = selectedStatus === 'ALL' || o.status === selectedStatus;
    const searchMatch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.items.toLowerCase().includes(search.toLowerCase());
    return hubMatch && statusMatch && searchMatch;
  });

  return (
    <DashboardLayout
      category="Orders & Operations"
      subcategory="Order Management"
      title="Order Management Console"
      subtitle="Operational order dispatching, batch fulfillment actions, packaging checkpoints, and inventory allocation"
      icon="📦"
      badge="Console"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Queue Ready to Dispatch" value="2 Orders" delta="Packed & Barcoded" trend="neutral" subtext="Awaiting carrier pickup" icon="📦" />
        <KpiCard label="In-Transit Active" value="2 Orders" delta="Live telematics" trend="up" subtext="Rider assigned & en route" icon="🛵" />
        <KpiCard label="Pharmacist QA Queue" value="2 Orders" delta="Doctor prescription check" trend="neutral" subtext="Processing clinical verification" icon="💊" />
        <KpiCard label="Resolution Required" value="2 Orders" delta="1 Return, 1 Cancelled" trend="down" subtext="Customer support queue" icon="⚠️" />
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
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Fulfillment Queue & Actions</h3>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#64748b' }}>Manage live dispatch status, review pharmacist checks, and reassign carriers across 10 mock orders</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search order or customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                padding: '6px 12px',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                fontSize: '12px',
                outline: 'none',
                minWidth: '200px'
              }}
            />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              style={{ padding: '6px 10px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '12px', background: '#fff' }}
            >
              <option value="ALL">All Statuses</option>
              <option value="Delivered">Delivered</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Dispatched">Dispatched</option>
              <option value="Packed">Packed</option>
              <option value="Processing">Processing</option>
              <option value="Returned">Returned</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                <th style={{ padding: '12px 14px', fontWeight: 600 }}>ORDER ID</th>
                <th style={{ padding: '12px 14px', fontWeight: 600 }}>CUSTOMER & PET</th>
                <th style={{ padding: '12px 14px', fontWeight: 600 }}>ITEMS ORDERED</th>
                <th style={{ padding: '12px 14px', fontWeight: 600 }}>CARRIER & FLEET</th>
                <th style={{ padding: '12px 14px', fontWeight: 600, textAlign: 'right' }}>VALUE</th>
                <th style={{ padding: '12px 14px', fontWeight: 600, textAlign: 'center' }}>STATUS</th>
                <th style={{ padding: '12px 14px', fontWeight: 600, textAlign: 'center' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((o) => {
                const style = ORDER_STATUS_COLORS[o.status] || { bg: '#f1f5f9', color: '#475569', border: '#e2e8f0' };
                return (
                  <tr key={o.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 14px', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{o.id}</td>
                    <td style={{ padding: '12px 14px' }}>
                      <div style={{ fontWeight: 600, color: '#0f172a' }}>{o.customer}</div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>{o.pet} · {o.city}</div>
                    </td>
                    <td style={{ padding: '12px 14px', color: '#334155' }}>
                      <div>{o.items}</div>
                      <div style={{ fontSize: '11px', color: '#94a3b8' }}>Tier: {o.speed}</div>
                    </td>
                    <td style={{ padding: '12px 14px', color: '#475569' }}>
                      <div>{o.carrier}</div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>{o.rider}</div>
                    </td>
                    <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: 700, color: '#0f172a' }}>{o.amountFormatted}</td>
                    <td style={{ padding: '12px 14px', textAlign: 'center' }}>
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
                    <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                      <button
                        style={{
                          padding: '4px 10px',
                          border: '1px solid #e2e8f0',
                          borderRadius: '6px',
                          background: '#f8fafc',
                          fontSize: '11px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          color: '#2563eb'
                        }}
                        onClick={() => alert(`Order ${o.id} details: ${o.items} for ${o.customer}`)}
                      >
                        Manage
                      </button>
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
