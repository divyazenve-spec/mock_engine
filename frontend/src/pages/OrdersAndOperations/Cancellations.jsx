import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';
import { MOCK_ORDERS } from './mockOrdersData';

export default function Cancellations() {
  const cancelledOrders = MOCK_ORDERS.filter(o => o.status === 'Cancelled' || o.cancelReason);
  const totalCancelledVal = cancelledOrders.reduce((sum, o) => sum + o.amount, 0);

  return (
    <DashboardLayout
      category="Orders & Operations"
      subcategory="Cancellations"
      title="Order Cancellations & Root Cause Analytics"
      subtitle="Cancellation logs, pre-dispatch interventions, reason taxonomy, and customer wallet retention incentives"
      icon="🚫"
      badge="Root Cause"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Cancelled Orders" value="1 Order" delta="10% of total" trend="neutral" subtext="Pre-dispatch cancellation" icon="🚫" />
        <KpiCard label="Cancelled GMV" value={`₹${totalCancelledVal.toLocaleString('en-IN')}`} delta="Retained in Wallet" trend="up" subtext="Converted with +5% cash incentive" icon="💰" />
        <KpiCard label="Avg Time to Cancel" value="12 mins" delta="Post-placement" trend="neutral" subtext="Before carrier assignment" icon="⏱️" />
        <KpiCard label="Wallet Retention Rate" value="100.0%" delta="Full amount retained" trend="up" subtext="No card or bank chargeback" icon="🎯" />
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
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Order Cancellation Audit Stream</h3>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#64748b' }}>Root-cause classification, customer feedback notes, and financial settlement</p>
          </div>
          <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', background: '#f8fafc', color: '#64748b', border: '1px solid #cbd5e1' }}>
            {cancelledOrders.length} Cancellation Logged
          </span>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
              <th style={{ padding: '12px 14px', fontWeight: 600 }}>ORDER ID</th>
              <th style={{ padding: '12px 14px', fontWeight: 600 }}>CUSTOMER & PET</th>
              <th style={{ padding: '12px 14px', fontWeight: 600 }}>CANCEL REASON</th>
              <th style={{ padding: '12px 14px', fontWeight: 600 }}>TIMING & STAGE</th>
              <th style={{ padding: '12px 14px', fontWeight: 600, textAlign: 'right' }}>VALUE</th>
              <th style={{ padding: '12px 14px', fontWeight: 600, textAlign: 'center' }}>SETTLEMENT METHOD</th>
              <th style={{ padding: '12px 14px', fontWeight: 600, textAlign: 'center' }}>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {cancelledOrders.map(o => (
              <tr key={o.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '12px 14px', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{o.id}</td>
                <td style={{ padding: '12px 14px' }}>
                  <div style={{ fontWeight: 600, color: '#0f172a' }}>{o.customer}</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>{o.pet} · {o.city}</div>
                </td>
                <td style={{ padding: '12px 14px', color: '#334155' }}>
                  <div style={{ fontWeight: 600, color: '#dc2626' }}>{o.cancelReason}</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Items: {o.items}</div>
                </td>
                <td style={{ padding: '12px 14px', color: '#475569' }}>
                  <div>Pre-Dispatch (12 mins from order)</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>Dark store not yet dispatched</div>
                </td>
                <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: 700, color: '#0f172a' }}>{o.amountFormatted}</td>
                <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#2563eb' }}>{o.refundMode}</span>
                </td>
                <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                  <span style={{
                    padding: '3px 8px',
                    borderRadius: '99px',
                    background: '#f1f5f9',
                    color: '#475569',
                    border: '1px solid #cbd5e1',
                    fontWeight: 600,
                    fontSize: '11px'
                  }}>
                    {o.refundStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
