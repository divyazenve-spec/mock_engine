import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';
import { MOCK_ORDERS } from './mockOrdersData';

export default function ReturnsAndRefunds() {
  const returnOrders = MOCK_ORDERS.filter(o => o.status === 'Returned' || o.returnReason);
  const totalRefundAmount = returnOrders.reduce((sum, o) => sum + o.amount, 0);

  return (
    <DashboardLayout
      category="Orders & Operations"
      subcategory="Returns & Refunds"
      title="Returns & Reverse Logistics Management"
      subtitle="Reverse logistics tracking, quality control inspections, damaged in-transit audits, and instant customer refunds"
      icon="🔄"
      badge="Reverse Logistics"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Return Requests" value="1 Order" delta="10% of total" trend="neutral" subtext="In reverse logistics stream" icon="📦" />
        <KpiCard label="Refund Value in Queue" value={`₹${totalRefundAmount.toLocaleString('en-IN')}`} delta="Pending Approval" trend="down" subtext="Instant UPI refund method" icon="💰" />
        <KpiCard label="Reverse SLA (Avg)" value="4.2 hours" delta="Pickup within 90m" trend="up" subtext="Reverse fleet doorstep pickup" icon="⚡" />
        <KpiCard label="QA Inspection Pass Rate" value="0.0%" delta="1 of 1 damaged" trend="down" subtext="Confirmed transit pouch rupture" icon="🛡️" />
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
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Reverse Logistics & Refund Audit Queue</h3>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#64748b' }}>Detailed return disposition, damage root-cause, and payout status</p>
          </div>
          <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', background: '#fff1f2', color: '#e11d48', border: '1px solid #fecdd3' }}>
            {returnOrders.length} Return Incident Recorded
          </span>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
              <th style={{ padding: '12px 14px', fontWeight: 600 }}>ORDER ID</th>
              <th style={{ padding: '12px 14px', fontWeight: 600 }}>CUSTOMER & PET</th>
              <th style={{ padding: '12px 14px', fontWeight: 600 }}>RETURN REASON & QA DISPOSITION</th>
              <th style={{ padding: '12px 14px', fontWeight: 600 }}>REFUND METHOD</th>
              <th style={{ padding: '12px 14px', fontWeight: 600, textAlign: 'right' }}>AMOUNT</th>
              <th style={{ padding: '12px 14px', fontWeight: 600, textAlign: 'center' }}>REFUND STATUS</th>
              <th style={{ padding: '12px 14px', fontWeight: 600, textAlign: 'center' }}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {returnOrders.map(o => (
              <tr key={o.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '12px 14px', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{o.id}</td>
                <td style={{ padding: '12px 14px' }}>
                  <div style={{ fontWeight: 600, color: '#0f172a' }}>{o.customer}</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>{o.pet} · {o.city}</div>
                </td>
                <td style={{ padding: '12px 14px', color: '#334155' }}>
                  <div style={{ fontWeight: 600, color: '#e11d48' }}>⚠️ {o.returnReason}</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Item: {o.items}</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>QA Inspector: Kochi Central Hub · Collected by {o.rider}</div>
                </td>
                <td style={{ padding: '12px 14px', color: '#475569' }}>
                  <span style={{ fontWeight: 600 }}>{o.refundMode}</span>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Account: UPI verified</div>
                </td>
                <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: 700, color: '#0f172a' }}>{o.amountFormatted}</td>
                <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                  <span style={{
                    padding: '3px 8px',
                    borderRadius: '99px',
                    background: '#fffbeb',
                    color: '#b45309',
                    border: '1px solid #fef3c7',
                    fontWeight: 600,
                    fontSize: '11px'
                  }}>
                    {o.refundStatus}
                  </span>
                </td>
                <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                  <button
                    style={{
                      padding: '4px 10px',
                      background: '#10b981',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                    onClick={() => alert(`Approved instant refund of ${o.amountFormatted} for order ${o.id}`)}
                  >
                    Approve Refund
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
