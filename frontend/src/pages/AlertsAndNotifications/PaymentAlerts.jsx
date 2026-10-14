import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function PaymentAlerts() {
  const [alerts, setAlerts] = useState([
  {
    "id": "PAY-401",
    "title": "Razorpay Net Banking Success Rate Dropped to 64%",
    "gateway": "Razorpay NetBanking",
    "severity": "Critical",
    "status": "Active",
    "cause": "SBI & ICICI net banking server downtime",
    "rootCause": "SBI & ICICI net banking server downtime",
    "impact": "\u20b93.4L order checkouts abandoned",
    "time": "12 mins ago"
  },
  {
    "id": "PAY-402",
    "title": "Overdue High-Value Corporate Vet Account Receivables",
    "gateway": "B2B Credit Line",
    "severity": "High Warning",
    "status": "Active",
    "cause": "Overdue balance crossed \u20b94.5L credit ceiling by 28 days",
    "rootCause": "Overdue balance crossed \u20b94.5L credit ceiling by 28 days",
    "impact": "\u20b94.5L overdue receivable",
    "time": "25 mins ago"
  },
  {
    "id": "PAY-403",
    "title": "Spike in Rapid Card Chargeback Claims",
    "gateway": "Visa / Mastercard Processing",
    "severity": "Warning",
    "status": "Active",
    "cause": "Unrecognized charge complaints on automatic renewal",
    "rootCause": "Unrecognized charge complaints on automatic renewal",
    "impact": "7 claims / \u20b954K dispute hold",
    "time": "40 mins ago"
  },
  {
    "id": "PAY-404",
    "title": "Instant Refund Payout Bank Balance Running Low",
    "gateway": "Razorpay X Payouts",
    "severity": "High Warning",
    "status": "Active",
    "cause": "Disbursement pool balance dropped below \u20b91.0L threshold",
    "rootCause": "Disbursement pool balance dropped below \u20b91.0L threshold",
    "impact": "\u20b985K balance remaining",
    "time": "1 hr ago"
  },
  {
    "id": "PAY-405",
    "title": "COD Delivery Cash Settlement Delay in Delhi NCR Hub",
    "gateway": "Cash-on-Delivery (COD)",
    "severity": "Warning",
    "status": "Active",
    "cause": "12 express couriers delayed depositing collected cash",
    "rootCause": "12 express couriers delayed depositing collected cash",
    "impact": "\u20b91.85L unremitted cash",
    "time": "2 hrs ago"
  },
  {
    "id": "PAY-406",
    "title": "Pet Health Insurance Third-Party Claim Settlement Hold",
    "gateway": "CarePal Vet Insurance TPA",
    "severity": "Warning",
    "status": "Active",
    "cause": "Pending hospital invoice clarification on ortho surgeries",
    "rootCause": "Pending hospital invoice clarification on ortho surgeries",
    "impact": "\u20b92.65L trapped insurance claims",
    "time": "3 hrs ago"
  },
  {
    "id": "PAY-407",
    "title": "Paytm Wallet Checkout Disconnection Error",
    "gateway": "Paytm PG API",
    "severity": "Warning",
    "status": "Active",
    "cause": "API certificate renewal latency on third-party callback",
    "rootCause": "API certificate renewal latency on third-party callback",
    "impact": "48 failed transactions",
    "time": "4 hrs ago"
  },
  {
    "id": "PAY-408",
    "title": "Doctor Tele-Consultation Payout Batch Variance",
    "gateway": "Automated NEFT / IMPS",
    "severity": "Warning",
    "status": "Active",
    "cause": "Doctor bank IFSC changes unverified by HR portal",
    "rootCause": "Doctor bank IFSC changes unverified by HR portal",
    "impact": "\u20b91.15L payout rejected",
    "time": "5 hrs ago"
  },
  {
    "id": "PAY-409",
    "title": "Foreign International Credit Card Processing Failure Spike",
    "gateway": "Stripe International",
    "severity": "Warning",
    "status": "Active",
    "cause": "3D Secure 2.0 protocol handshake failure for expat cards",
    "rootCause": "3D Secure 2.0 protocol handshake failure for expat cards",
    "impact": "\u20b992K international spend at risk",
    "time": "6 hrs ago"
  },
  {
    "id": "PAY-410",
    "title": "HDFC Direct Bank Webhook Latency Spike",
    "gateway": "HDFC SmartHub",
    "severity": "Critical",
    "status": "Resolved",
    "cause": "Callback delay caused orders to remain in Pending state",
    "rootCause": "Callback delay caused orders to remain in Pending state",
    "impact": "Resolved via webhook re-synchronization",
    "time": "8 hrs ago"
  }
]);

  const [toast, setToast] = useState('');

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleAction = (id, act) => {
    triggerToast(`Action "${act}" executed for ${id}.`);
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'Resolved' } : a));
  };

  return (
    <DashboardLayout
      category="Alerts & Notifications"
      subcategory="Payment Alerts"
      title="Payment Gateways & Collections Alerts"
      subtitle="Monitoring UPI success rates, B2B aging receivables, payout float balances, chargebacks, and veterinary doctor commissions"
      icon="💳"
      badge=""
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => triggerToast('Automated failover: Switched 60% of checkout UPI traffic to Cashfree gateway.')}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              background: '#ef4444',
              color: '#ffffff',
              border: 'none',
              fontWeight: 600,
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            ⚡ Failover Gateway
          </button>
          <button
            onClick={() => triggerToast('Auto-dunning WhatsApp reminder sent to overdue B2B clinics.')}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              background: 'var(--card, #1e293b)',
              color: 'var(--foreground, #f8fafc)',
              border: '1px solid var(--border, rgba(255,255,255,0.1))',
              fontWeight: 600,
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            📩 Send Dunning Reminders
          </button>
        </div>
      }
    >
      {toast && (
        <div style={{
          padding: '10px 16px',
          background: 'rgba(59,130,246,0.15)',
          border: '1px solid #3b82f6',
          borderRadius: '8px',
          color: '#60a5fa',
          fontSize: '13px',
          fontWeight: 600
        }}>
          ⚡ {toast}
        </div>
      )}

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard
          label="Gateway Uptime (Razorpay)"
          value="99.82%"
          delta="+0.12%"
          trend="positive"
          subtext="Secondary HDFC active"
          icon="⚡"
        />
        <KpiCard
          label="Overdue B2B Receivables"
          value="₹4.5L"
          delta="-15%"
          trend="positive"
          subtext="Corporate billing active"
          icon="🏢"
        />
        <KpiCard
          label="Instant Refund Balance"
          value="₹85K"
          delta="Optimal"
          trend="positive"
          subtext="Payout buffer intact"
          icon="🔄"
        />
        <KpiCard
          label="Pending Vet Commissions"
          value="₹2.4L"
          delta="Scheduled"
          trend="neutral"
          subtext="Friday batch disbursement"
          icon="💳"
        />
      </div>

      {/* Main Alerts Table */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>
          Payment Gateway Disruptions & Collection Aging Alerts
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {alerts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '36px', color: 'var(--muted-foreground, #94a3b8)', fontSize: '13px' }}>
              No payment gateway disruptions or collection aging alerts detected.
            </div>
          ) : (
            alerts.map((a) => (
            <div
              key={a.id}
              style={{
                padding: '16px',
                borderRadius: '8px',
                background: a.status === 'Resolved' ? 'rgba(16,185,129,0.05)' : 'rgba(0,0,0,0.15)',
                borderLeft: a.severity === 'Critical' ? '4px solid #ef4444' : a.severity === 'High Warning' ? '4px solid #f97316' : '4px solid #f59e0b',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: '11px',
                      fontWeight: 700,
                      background: 'rgba(255,255,255,0.06)',
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}>
                      {a.id}
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: 700 }}>{a.title}</span>
                    <span style={{
                      fontSize: '10px',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: a.severity === 'Critical' ? 'rgba(239,68,68,0.2)' : 'rgba(245,158,11,0.2)',
                      color: a.severity === 'Critical' ? '#ef4444' : '#f59e0b',
                      fontWeight: 600
                    }}>
                      {a.severity}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)', marginTop: '4px' }}>
                    Channel: <strong style={{ color: 'var(--foreground, #f8fafc)' }}>{a.gateway}</strong> · Root Cause: <span>{a.rootCause}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#fbbf24' }}>{a.impact}</div>
                  <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)', marginTop: '2px' }}>
                    Status: <strong style={{ color: a.status === 'Resolved' ? '#10b981' : '#38bdf8' }}>{a.status}</strong>
                  </div>
                </div>
              </div>

              {a.status !== 'Resolved' && (
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', paddingTop: '4px' }}>
                  {a.id === 'PAY-401' && (
                    <button
                      onClick={() => handleAction(a.id, 'Rerouted 60% traffic to Cashfree')}
                      style={{ padding: '6px 14px', borderRadius: '6px', background: '#ef4444', color: '#fff', border: 'none', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Instant Gateway Failover
                    </button>
                  )}
                  {a.id === 'PAY-402' && (
                    <button
                      onClick={() => handleAction(a.id, 'WhatsApp Dunning with instant UPI payment link sent')}
                      style={{ padding: '6px 14px', borderRadius: '6px', background: 'var(--primary, #3b82f6)', color: '#fff', border: 'none', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Trigger Automated Dunning Notice
                    </button>
                  )}
                  {a.id === 'PAY-404' && (
                    <button
                      onClick={() => handleAction(a.id, 'CFO One-Touch Biometric Sign-off Verified')}
                      style={{ padding: '6px 14px', borderRadius: '6px', background: '#10b981', color: '#fff', border: 'none', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Approve Doctor Batch Payout
                    </button>
                  )}
                  <button
                    onClick={() => handleAction(a.id, 'Acknowledged & Escalated to Accounts')}
                    style={{ padding: '6px 12px', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border, rgba(255,255,255,0.1))', color: 'var(--foreground, #f8fafc)', fontSize: '11px', cursor: 'pointer' }}
                  >
                    Acknowledge
                  </button>
                </div>
              )}
            </div>
          ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
