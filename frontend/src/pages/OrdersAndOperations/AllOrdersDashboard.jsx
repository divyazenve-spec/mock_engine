import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';
import { MOCK_ORDERS, ORDER_STATUS_COLORS } from './mockOrdersData';

export default function AllOrdersDashboard() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const orders = MOCK_ORDERS;

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = statusFilter === 'ALL' || o.status === statusFilter;
    const matchesSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.items.toLowerCase().includes(search.toLowerCase()) ||
      o.city.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalOrders = orders.length;
  const deliveredCount = orders.filter((o) => o.status === 'Delivered').length;
  const activeCount = orders.filter((o) =>
    ['Out for Delivery', 'Dispatched', 'Packed', 'Processing'].includes(o.status)
  ).length;
  const returnedCount = orders.filter((o) => o.status === 'Returned').length;
  const cancelledCount = orders.filter((o) => o.status === 'Cancelled').length;
  const totalAmount = orders.reduce((sum, o) => sum + o.amount, 0);

  const cardStyle = {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '22px 24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
  };

  return (
    <DashboardLayout
      category="Orders & Operations"
      subcategory="All Orders"
      title="All Orders Master Ledger"
      subtitle="Comprehensive multi-channel order repository across e-commerce, pharmacy, clinical care, B2B, and fashion operations"
      icon="📋"
      badge="Master Ledger"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <KpiCard
          label="Total Master Orders"
          value={`${totalOrders} Orders`}
          delta="+14.2% MoM"
          trend="up"
          subtext="10 live mock records"
          icon="📋"
        />
        <KpiCard
          label="Fulfilled & Delivered"
          value={`${deliveredCount} Orders`}
          delta={`${((deliveredCount / totalOrders) * 100).toFixed(0)}% Rate`}
          trend="up"
          subtext="Delivered successfully"
          icon="✅"
        />
        <KpiCard
          label="Processing & Active"
          value={`${activeCount} Active`}
          delta="Real-time queue"
          trend="neutral"
          subtext="In fulfillment pipeline"
          icon="⚡"
        />
        <KpiCard
          label="Cancelled / Returned"
          value={`${returnedCount + cancelledCount} Orders`}
          delta={`${(((returnedCount + cancelledCount) / totalOrders) * 100).toFixed(0)}% Rate`}
          trend="down"
          subtext="1 Return, 1 Cancelled"
          icon="🚫"
        />
        <KpiCard
          label="Gross Order Value"
          value={`₹${totalAmount.toLocaleString('en-IN')}`}
          delta="+18.9% YoY"
          trend="up"
          subtext="Across 10 transactions"
          icon="💰"
        />
      </div>

      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Master Orders Repository</h3>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#64748b' }}>Real-time audit log of all orders placed across all operational hubs</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Search by ID, customer, item..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                padding: '6px 12px',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                fontSize: '12px',
                outline: 'none',
                minWidth: '220px'
              }}
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                padding: '6px 10px',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                fontSize: '12px',
                outline: 'none',
                background: '#fff'
              }}
            >
              <option value="ALL">All status</option>
              <option value="Delivered">Delivered</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Dispatched">Dispatched</option>
              <option value="Packed">Packed</option>
              <option value="Processing">Processing</option>
              <option value="Returned">Returned</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', background: '#f1f5f9', color: '#475569', border: '1px solid #e2e8f0' }}>
              {filteredOrders.length} Records
            </span>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                <th style={{ padding: '12px 16px', fontWeight: 600, verticalAlign: 'middle' }}>ORDER ID</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, verticalAlign: 'middle' }}>DATE & TIME</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, verticalAlign: 'middle' }}>CUSTOMER / ENTITY</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, verticalAlign: 'middle' }}>CHANNEL / SOURCE</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, verticalAlign: 'middle' }}>ITEMS & FULFILLMENT</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'right', verticalAlign: 'middle' }}>ORDER AMOUNT</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'center', verticalAlign: 'middle' }}>PAYMENT STATUS</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'center', verticalAlign: 'middle' }}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '36px', color: '#94a3b8', verticalAlign: 'middle' }}>
                    No records found
                  </td>
                </tr>
              ) : (
                filteredOrders.map((o) => {
                  const style = ORDER_STATUS_COLORS[o.status] || { bg: '#f1f5f9', color: '#475569', border: '#e2e8f0' };
                  return (
                    <tr key={o.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px 16px', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace', verticalAlign: 'middle' }}>{o.id}</td>
                      <td style={{ padding: '12px 16px', color: '#64748b', verticalAlign: 'middle' }}>{o.date}</td>
                      <td style={{ padding: '12px 16px', color: '#0f172a', fontWeight: 600, verticalAlign: 'middle' }}>
                        <div>{o.customer}</div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>{o.pet} · {o.city}</div>
                      </td>
                      <td style={{ padding: '12px 16px', color: '#64748b', verticalAlign: 'middle' }}>{o.channel}</td>
                      <td style={{ padding: '12px 16px', color: '#475569', verticalAlign: 'middle' }}>
                        <div>{o.items}</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>⚡ {o.speed} ({o.sla})</div>
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 700, verticalAlign: 'middle' }}>{o.amountFormatted}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', verticalAlign: 'middle' }}>
                        <span style={{ fontSize: '11px', fontWeight: 600, color: '#334155' }}>{o.paymentStatus}</span>
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', verticalAlign: 'middle' }}>
                        <span style={{
                          padding: '3px 10px',
                          borderRadius: '99px',
                          background: style.bg,
                          color: style.color,
                          border: `1px solid ${style.border}`,
                          fontWeight: 600,
                          fontSize: '11px'
                        }}>
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
