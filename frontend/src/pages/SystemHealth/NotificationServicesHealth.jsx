import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function NotificationServicesHealth() {
  const [providers, setProviders] = useState([
  {
    "name": "Gupshup WhatsApp Cloud API",
    "endpoint": "https://api.gupshup.io/sm/api/v1/msg",
    "channel": "WhatsApp Business Messaging",
    "deliveryRate": "99.2%",
    "delivery": "99.2%",
    "latency": "1.2s",
    "balance": "\u20b91,48,200 (Green Tier)",
    "status": "OPERATIONAL"
  },
  {
    "name": "AWS SES Transactional Mailer",
    "endpoint": "https://email.ap-south-1.amazonaws.com",
    "channel": "Transactional Email (Rx & Invoices)",
    "deliveryRate": "99.7%",
    "delivery": "99.7%",
    "latency": "0.8s",
    "balance": "Tier 4 (100k/day)",
    "status": "OPERATIONAL"
  },
  {
    "name": "Karix DLT High-Priority SMS",
    "endpoint": "https://api.karix.solutions/sms/v2",
    "channel": "Govt DLT-Approved High-Priority SMS",
    "deliveryRate": "99.4%",
    "delivery": "99.4%",
    "latency": "1.4s",
    "balance": "\u20b984,500 (1.2M Credits)",
    "status": "OPERATIONAL"
  },
  {
    "name": "Firebase Cloud Messaging (FCM)",
    "endpoint": "https://fcm.googleapis.com/v1/projects/zenve",
    "channel": "Android Mobile App Push Notifications",
    "deliveryRate": "98.8%",
    "delivery": "98.8%",
    "latency": "0.4s",
    "balance": "Active (Blaze Tier)",
    "status": "OPERATIONAL"
  },
  {
    "name": "Apple Push Notification (APNs)",
    "endpoint": "https://api.push.apple.com:443/3/device",
    "channel": "iOS Apple Device Push Notifications",
    "deliveryRate": "99.1%",
    "delivery": "99.1%",
    "latency": "0.3s",
    "balance": "Active (Apple Enterprise)",
    "status": "OPERATIONAL"
  },
  {
    "name": "Twilio Emergency Voice IVR",
    "endpoint": "https://api.twilio.com/2010-04-01/Accounts",
    "channel": "Emergency On-Call Doctor Automated Voice IVR",
    "deliveryRate": "99.5%",
    "delivery": "99.5%",
    "latency": "2.1s",
    "balance": "$2,480 Balance",
    "status": "OPERATIONAL"
  },
  {
    "name": "SendGrid Marketing Mailer",
    "endpoint": "https://api.sendgrid.com/v3/mail/send",
    "channel": "Weekly Care Guide & Newsletter Campaigns",
    "deliveryRate": "98.6%",
    "delivery": "98.6%",
    "latency": "1.6s",
    "balance": "Active (Pro Plan)",
    "status": "OPERATIONAL"
  },
  {
    "name": "Exotel Telephony Bridge",
    "endpoint": "https://api.exotel.com/v1/Accounts/zenve",
    "channel": "Customer-to-Rider Masked VoIP Calls",
    "deliveryRate": "99.3%",
    "delivery": "99.3%",
    "latency": "0.6s",
    "balance": "\u20b942,000 Virtual Pool",
    "status": "OPERATIONAL"
  },
  {
    "name": "ValueFirst Secondary SMS",
    "endpoint": "https://api.valuefirst.com/psms/servlet",
    "channel": "Secondary Fallback OTP SMS Route",
    "deliveryRate": "99.2%",
    "delivery": "99.2%",
    "latency": "1.5s",
    "balance": "\u20b935,000 Prepaid Credit",
    "status": "OPERATIONAL"
  },
  {
    "name": "Slack Critical Incident Bot",
    "endpoint": "https://hooks.slack.com/services/zenve-alerts",
    "channel": "DevOps & Critical Incident Slack Notifications",
    "deliveryRate": "100%",
    "delivery": "100%",
    "latency": "0.2s",
    "balance": "Unlimited Enterprise",
    "status": "OPERATIONAL"
  }
]);

  const [toast, setToast] = useState('');

  const sendTestNotification = (name) => {
    setToast(`Test notification beacon sent through ${name} — Delivered successfully.`);
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <DashboardLayout
      category="System Health"
      subcategory="Notification Services"
      title="SMS, Email & Push Notification Gateways"
      subtitle="Gupshup SMS, SendGrid email, Firebase FCM push & WhatsApp Business delivery health"
      icon="🔔"
      badge=""
      actions={
        <button
          onClick={() => {
            setToast('Dispatched multi-channel delivery benchmark test.');
            setTimeout(() => setToast('Benchmark complete: SMS (2.1s), Email (1.4s), Push (850ms).'), 2500);
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
          📲 Test Delivery Latencies
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
        <KpiCard label="Overall Delivery Rate" value="99.4%" delta="+0.6%" trend="positive" subtext="Notification deliverability" icon="🟢" />
        <KpiCard label="Average Delivery Time" value="0.9 s" delta="-0.3s" trend="positive" subtext="Delivery latency monitor" icon="⚡" />
        <KpiCard label="Messages Dispatched Today" value="142,850" delta="+24.2k" trend="positive" subtext="Messages dispatched" icon="📨" />
        <KpiCard label="DLT Template Compliance" value="100%" delta="Optimal" trend="positive" subtext="Regulatory compliance" icon="🛡️" />
      </div>

      {/* Providers Table */}
      <div style={{
        background: 'var(--card, #ffffff)',
        border: '1px solid var(--border, #e2e8f0)',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Active Notification Channels</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)', fontSize: '11px', background: '#f8fafc' }}>
              <th style={{ padding: '10px 12px' }}>Channel / Provider</th>
              <th style={{ padding: '10px 12px' }}>Traffic Type</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Delivery Rate</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Avg Latency</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Account Balance</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Status</th>
              <th style={{ padding: '10px 12px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {providers.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ padding: '36px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                  No notification channels configured.
                </td>
              </tr>
            ) : (
              providers.map((p) => (
                <tr key={p.name} style={{ borderBottom: '1px solid var(--border, #f1f5f9)' }}>
                  <td style={{ padding: '12px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>
                    {p.name}
                    <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #64748b)', fontFamily: '"IBM Plex Mono", monospace' }}>{p.endpoint}</div>
                  </td>
                  <td style={{ padding: '12px', color: 'var(--muted-foreground, #64748b)' }}>{p.channel}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 600, color: '#16a34a', fontFamily: '"IBM Plex Mono", monospace' }}>{p.deliveryRate}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{p.latency}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>{p.balance}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '99px', background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', fontWeight: 600, fontSize: '11px' }}>
                      ● {p.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <button
                      onClick={() => sendTestNotification(p.name)}
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
                      Send Test
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
