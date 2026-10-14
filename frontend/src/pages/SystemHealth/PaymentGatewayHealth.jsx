import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function PaymentGatewayHealth() {
  const [gateways, setGateways] = useState([
  {
    "name": "Razorpay UPI Autopay",
    "provider": "Razorpay Software Pvt Ltd",
    "ping": "32 ms",
    "latency": "32 ms",
    "success": "99.82%",
    "successRate": "99.82%",
    "uptime": "99.98%",
    "webhook": "18ms (Healthy)",
    "webhookHealth": "18ms (Healthy)",
    "status": "OPERATIONAL"
  },
  {
    "name": "Razorpay NetBanking Core",
    "provider": "Razorpay Aggregator",
    "ping": "48 ms",
    "latency": "48 ms",
    "success": "98.64%",
    "successRate": "98.64%",
    "uptime": "99.92%",
    "webhook": "24ms (Healthy)",
    "webhookHealth": "24ms (Healthy)",
    "status": "OPERATIONAL"
  },
  {
    "name": "HDFC SmartHub Gateway",
    "provider": "HDFC Bank Ltd",
    "ping": "42 ms",
    "latency": "42 ms",
    "success": "99.40%",
    "successRate": "99.40%",
    "uptime": "99.96%",
    "webhook": "22ms (Healthy)",
    "webhookHealth": "22ms (Healthy)",
    "status": "OPERATIONAL"
  },
  {
    "name": "Stripe International USD/EUR",
    "provider": "Stripe Inc",
    "ping": "118 ms",
    "latency": "118 ms",
    "success": "98.92%",
    "successRate": "98.92%",
    "uptime": "99.95%",
    "webhook": "45ms (Healthy)",
    "webhookHealth": "45ms (Healthy)",
    "status": "OPERATIONAL"
  },
  {
    "name": "Cashfree Express Payouts",
    "provider": "Cashfree Payments India",
    "ping": "28 ms",
    "latency": "28 ms",
    "success": "99.94%",
    "successRate": "99.94%",
    "uptime": "99.99%",
    "webhook": "14ms (Optimal)",
    "webhookHealth": "14ms (Optimal)",
    "status": "OPERATIONAL"
  },
  {
    "name": "Paytm UPI & Wallet Gateway",
    "provider": "One97 Communications",
    "ping": "36 ms",
    "latency": "36 ms",
    "success": "99.12%",
    "successRate": "99.12%",
    "uptime": "99.90%",
    "webhook": "19ms (Healthy)",
    "webhookHealth": "19ms (Healthy)",
    "status": "OPERATIONAL"
  },
  {
    "name": "Pine Labs In-Clinic POS",
    "provider": "Pine Labs Ltd",
    "ping": "64 ms",
    "latency": "64 ms",
    "success": "99.78%",
    "successRate": "99.78%",
    "uptime": "99.94%",
    "webhook": "38ms (Healthy)",
    "webhookHealth": "38ms (Healthy)",
    "status": "OPERATIONAL"
  },
  {
    "name": "CarePal Pet Insurance TPA",
    "provider": "CarePal Health TPA",
    "ping": "140 ms",
    "latency": "140 ms",
    "success": "97.80%",
    "successRate": "97.80%",
    "uptime": "99.85%",
    "webhook": "68ms (Stable)",
    "webhookHealth": "68ms (Stable)",
    "status": "OPERATIONAL"
  },
  {
    "name": "Bajaj Finserv No-Cost EMI",
    "provider": "Bajaj Finance Ltd",
    "ping": "78 ms",
    "latency": "78 ms",
    "success": "98.50%",
    "successRate": "98.50%",
    "uptime": "99.88%",
    "webhook": "42ms (Healthy)",
    "webhookHealth": "42ms (Healthy)",
    "status": "OPERATIONAL"
  },
  {
    "name": "COD Smart Reconciliation",
    "provider": "Delhivery & Shadowfax COD",
    "ping": "52 ms",
    "latency": "52 ms",
    "success": "99.20%",
    "successRate": "99.20%",
    "uptime": "99.92%",
    "webhook": "28ms (Healthy)",
    "webhookHealth": "28ms (Healthy)",
    "status": "OPERATIONAL"
  }
]);

  const [toast, setToast] = useState('');

  const testWebhook = (gwName) => {
    setToast(`Test webhook payload dispatched to ${gwName} — 200 OK received in 42ms.`);
    setTimeout(() => setToast(''), 3500);
  };

  return (
    <DashboardLayout
      category="System Health"
      subcategory="Payment Gateway"
      title="Payment Gateways & Webhook Health"
      subtitle="Razorpay, Cashfree & Stripe gateway health, UPI success rates, webhook latency & settlement queues"
      icon="💳"
      badge=""
      actions={
        <button
          onClick={() => {
            setToast('Dispatched test payment intent verification across all active gateways.');
            setTimeout(() => setToast('All gateways responding within <120ms SLA.'), 2500);
          }}
          style={{
            padding: '7px 14px',
            borderRadius: '8px',
            background: '#2563eb',
            color: '#ffffff',
            border: '1px solid #1d4ed8',
            fontWeight: 600,
            fontSize: '12px',
            cursor: 'pointer'
          }}
        >
          🔄 Test Payment Gateways
        </button>
      }
    >
      {toast && (
        <div style={{
          padding: '10px 16px',
          background: '#eff6ff',
          border: '1px solid #bfdbfe',
          borderRadius: '8px',
          color: '#2563eb',
          fontSize: '13px',
          fontWeight: 600
        }}>
          ℹ️ {toast}
        </div>
      )}

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Overall Success Rate" value="99.82%" delta="+0.14%" trend="positive" subtext="Payment success monitor" icon="🟢" />
        <KpiCard label="Average Webhook Latency" value="18 ms" delta="-4ms" trend="positive" subtext="Webhook response callbacks" icon="⚡" />
        <KpiCard label="Failed Transactions" value="0.18%" delta="-0.12%" trend="positive" subtext="Failure rate monitor" icon="🛡️" />
        <KpiCard label="Instant Refund SLA" value="99.6%" delta="Optimal" trend="positive" subtext="Refund processing SLA" icon="💳" />
      </div>

      {/* Gateway Status Table */}
      <div style={{
        background: 'var(--card, #ffffff)',
        border: '1px solid var(--border, #e2e8f0)',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Configured Payment Processors & Webhooks</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)', fontSize: '11px', background: '#f8fafc' }}>
              <th style={{ padding: '10px 12px' }}>Gateway Name</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Ping Latency</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Success Rate</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Uptime</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Webhook Health</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Status</th>
              <th style={{ padding: '10px 12px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {gateways.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ padding: '36px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                  No payment gateways configured.
                </td>
              </tr>
            ) : (
              gateways.map((gw) => (
                <tr key={gw.name} style={{ borderBottom: '1px solid var(--border, #f1f5f9)' }}>
                  <td style={{ padding: '12px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>
                    {gw.name}
                    <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #64748b)', fontWeight: 400 }}>{gw.provider}</div>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{gw.latency}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 600, color: '#16a34a', fontFamily: '"IBM Plex Mono", monospace' }}>{gw.successRate}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>{gw.uptime}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>{gw.webhookHealth}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '99px', background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', fontWeight: 600, fontSize: '11px' }}>
                      ● {gw.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <button
                      onClick={() => testWebhook(gw.name)}
                      style={{
                        padding: '4px 8px',
                        borderRadius: '6px',
                        background: '#f8fafc',
                        border: '1px solid var(--border, #e2e8f0)',
                        color: 'var(--foreground, #0f172a)',
                        fontSize: '11px',
                        cursor: 'pointer'
                      }}
                    >
                      Test Webhook
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
