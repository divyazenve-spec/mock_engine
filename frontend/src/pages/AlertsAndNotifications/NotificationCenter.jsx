import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState([
  {
    "id": "NOTIF-101",
    "title": "Sev-1 Incident Escalation: Biologics Vaccine Chiller #2",
    "body": "Indiranagar Surgical Hospital reports chiller temp at 9.8\u00b0C (Limit: 2-8\u00b0C). Auxiliary cooling active; backup staged.",
    "channel": "SMS Broadcast & WhatsApp",
    "recipient": "Dr. Vivek Menon & Facilities Lead",
    "severity": "Critical",
    "status": "Delivered",
    "read": false,
    "time": "6 mins ago"
  },
  {
    "id": "NOTIF-102",
    "title": "Payment Pipeline Auto-Failover: Secondary HDFC Route Active",
    "body": "Primary Razorpay UPI failure rate breached 15.0%. Automated failover routed 100% checkout traffic to HDFC secondary gateway.",
    "channel": "Slack #payments-oncall",
    "recipient": "FinOps & Engineering Lead",
    "severity": "Critical",
    "status": "Delivered",
    "read": false,
    "time": "12 mins ago"
  },
  {
    "id": "NOTIF-103",
    "title": "Urgent Rx Verification Backlog in Central Pharmacy",
    "body": "10 patient antibiotic & critical care orders waiting > 15 mins for veterinary doctor digital signature.",
    "channel": "Pharmacy Portal & WhatsApp",
    "recipient": "Duty Vet Dr. Sunita Rao",
    "severity": "High Warning",
    "status": "Delivered",
    "read": false,
    "time": "18 mins ago"
  },
  {
    "id": "NOTIF-104",
    "title": "Express Fleet Dispatch Delay: Koramangala Rain Alert",
    "body": "Severe waterlogging on 80ft road corridor. 8 express deliveries at risk of 60-min SLA breach. Intercept 4x4 van dispatched.",
    "channel": "Rider Mobile App Push",
    "recipient": "Koramangala Hub Fleet Lead",
    "severity": "High Warning",
    "status": "Delivered",
    "read": true,
    "time": "25 mins ago"
  },
  {
    "id": "NOTIF-105",
    "title": "Emergency Bravecto 20-40kg PO-8821 Dispatched",
    "body": "Central Depot has dispatched 100 emergency units via dedicated courier to replenish Koramangala Hub stockout.",
    "channel": "Email & ERP Notification",
    "recipient": "Supply Chain Operations",
    "severity": "Warning",
    "status": "Delivered",
    "read": false,
    "time": "35 mins ago"
  },
  {
    "id": "NOTIF-106",
    "title": "Overnight Emergency ICU Veterinary Roster Confirmed",
    "body": "Standby ICU surgeon Dr. Ramesh Kumar confirmed for 22:00 - 06:00 trauma shift at Indiranagar Surgical Hospital.",
    "channel": "WhatsApp High-Priority",
    "recipient": "Medical Superintendent",
    "severity": "Info",
    "status": "Delivered",
    "read": true,
    "time": "45 mins ago"
  },
  {
    "id": "NOTIF-107",
    "title": "Unallocated Bank Inflow Mapped: Infosys B2B Invoice",
    "body": "\u20b94.5L RTGS transfer from Infosys Wellness verified against invoice #INV-2024-9912. Ledger cleared.",
    "channel": "Email Digest",
    "recipient": "Finance Controller",
    "severity": "Info",
    "status": "Delivered",
    "read": false,
    "time": "1 hr ago"
  },
  {
    "id": "NOTIF-108",
    "title": "AWS MySQL Cluster Lock Contention Auto-Mitigated",
    "channel": "Slack #devops-alerts",
    "recipient": "Cloud Infrastructure Team",
    "severity": "Critical",
    "status": "Delivered",
    "body": "Write lock wait time spiked to 4,820ms. Auto-remediation script terminated blocked read transaction and doubled thread pool.",
    "read": true,
    "time": "2 hrs ago"
  },
  {
    "id": "NOTIF-109",
    "title": "Near-Expiry Pharmaceutical Liquidation Notice",
    "channel": "Internal Audit Portal",
    "recipient": "Pharmacy Category Manager",
    "severity": "Warning",
    "status": "Delivered",
    "body": "FEFO auto-discounting applied to \u20b91.85L expiring inventory across 14 dark stores. Current liquidation rate at 78%.",
    "read": false,
    "time": "3 hrs ago"
  },
  {
    "id": "NOTIF-110",
    "title": "Meta WhatsApp Business Cloud API Green Tier Re-certified",
    "channel": "System Dashboard",
    "recipient": "Customer Support Operations",
    "severity": "Info",
    "status": "Delivered",
    "body": "Gupshup Cloud API quality rating maintained at High / Green. 99.2% delivery rate achieved over past 24 hours.",
    "read": false,
    "time": "4 hrs ago"
  }
]);

  const [activeFilter, setActiveFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState('');

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    triggerToast('All notifications marked as read.');
  };

  const handleToggleRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: !n.read } : n));
  };

  const filtered = notifications.filter(n => {
    if (activeFilter === 'unread' && n.read) return false;
    if (activeFilter === 'critical' && n.severity !== 'Critical') return false;
    if (activeFilter === 'warning' && !n.severity.includes('Warning')) return false;
    if (search) {
      const q = search.toLowerCase();
      return n.title.toLowerCase().includes(q) || n.body.toLowerCase().includes(q) || n.recipient.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <DashboardLayout
      category="Alerts & Notifications"
      subcategory="Notification Center"
      title="Omni-Channel Notification Center"
      subtitle="Unified real-time notification feed across WhatsApp, SMS, Push, Slack, and Email with delivery receipts and audit logs"
      icon="🔔"
      badge=""
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={handleMarkAllRead}
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
            ✓ Mark All Read
          </button>
          <button
            onClick={() => triggerToast('Notification delivery audit trail exported to CSV.')}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              background: 'var(--primary, #3b82f6)',
              color: '#ffffff',
              border: 'none',
              fontWeight: 600,
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            📥 Export Dispatch Logs
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
          label="Unread Notifications"
          value="7 Unread"
          delta="+3"
          trend="neutral"
          subtext="Prioritized inbox"
          icon="📬"
        />
        <KpiCard
          label="Dispatched Today"
          value="142 Alerts"
          delta="+28"
          trend="positive"
          subtext="99.4% delivery rate"
          icon="📤"
        />
        <KpiCard
          label="WhatsApp Business Delivery"
          value="99.2%"
          delta="+0.8%"
          trend="positive"
          subtext="Meta API Green Tier"
          icon="💬"
        />
        <KpiCard
          label="SMS Gateway Latency"
          value="1.2s"
          delta="-0.4s"
          trend="positive"
          subtext="DLT route clear"
          icon="⚡"
        />
      </div>

      {/* Filter and Search Bar */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '16px 20px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'All Notifications' },
            { id: 'unread', label: 'Unread Only' },
            { id: 'critical', label: 'Sev-1 Critical' },
            { id: 'warning', label: 'Warnings' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                border: 'none',
                background: activeFilter === f.id ? 'var(--primary, #3b82f6)' : 'rgba(255,255,255,0.05)',
                color: activeFilter === f.id ? '#ffffff' : 'var(--muted-foreground, #94a3b8)'
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Search notifications by title, recipient, body..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            padding: '8px 14px',
            borderRadius: '6px',
            background: 'rgba(0,0,0,0.2)',
            border: '1px solid var(--border, rgba(255,255,255,0.1))',
            color: '#fff',
            fontSize: '12px',
            minWidth: '280px'
          }}
        />
      </div>

      {/* Feed List */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '36px', color: 'var(--muted-foreground, #94a3b8)', fontSize: '13px' }}>
              No notifications found. All communication channels clear.
            </div>
          ) : (
            filtered.map((n) => (
            <div
              key={n.id}
              onClick={() => handleToggleRead(n.id)}
              style={{
                padding: '16px',
                borderRadius: '8px',
                background: n.read ? 'rgba(0,0,0,0.12)' : 'rgba(59,130,246,0.07)',
                border: n.read ? '1px solid var(--border, rgba(255,255,255,0.06))' : '1px solid rgba(59,130,246,0.3)',
                borderLeft: n.severity === 'Critical' ? '4px solid #ef4444' : n.severity.includes('Warning') ? '4px solid #f59e0b' : '4px solid #3b82f6',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                transition: 'background 0.2s'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {!n.read && (
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6', display: 'inline-block' }}></span>
                    )}
                    <span style={{ fontSize: '14px', fontWeight: n.read ? 600 : 700 }}>{n.title}</span>
                    <span style={{
                      fontSize: '10px',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: n.severity === 'Critical' ? 'rgba(239,68,68,0.2)' : 'rgba(245,158,11,0.2)',
                      color: n.severity === 'Critical' ? '#ef4444' : '#f59e0b',
                      fontWeight: 600
                    }}>
                      {n.severity}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)', marginTop: '4px' }}>
                    Channel: <strong style={{ color: '#38bdf8' }}>{n.channel}</strong> · Recipient: <strong style={{ color: 'var(--foreground, #f8fafc)' }}>{n.recipient}</strong>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)' }}>{n.time}</div>
                  <div style={{ fontSize: '10px', color: '#10b981', fontWeight: 600, marginTop: '2px' }}>{n.status}</div>
                </div>
              </div>

              <div style={{ fontSize: '13px', color: 'var(--foreground, #f8fafc)', lineHeight: 1.5 }}>
                {n.body}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '4px', fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)' }}>
                <span>ID: {n.id}</span>
                <span style={{ color: '#3b82f6', textDecoration: 'underline' }}>{n.read ? 'Mark as Unread' : 'Mark as Read'}</span>
              </div>
            </div>
          ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
