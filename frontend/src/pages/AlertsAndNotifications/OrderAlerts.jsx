import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function OrderAlerts() {
  const [alerts, setAlerts] = useState([
  {
    "id": "ORD-501",
    "title": "Urgent Prescription Verification Queue Stalled",
    "category": "Pharmacy Rx Verification",
    "hub": "Indiranagar Surgical Hospital",
    "severity": "Critical",
    "status": "Active",
    "metric": "10 Orders Delayed > 15 Mins",
    "impact": "Antibiotic & insulin deliveries blocked",
    "time": "8 mins ago"
  },
  {
    "id": "ORD-502",
    "title": "Cold-Chain Gel-Pack Packing Station Bottleneck",
    "category": "Vaccine Packaging",
    "hub": "Whitefield Dark Store",
    "severity": "High Warning",
    "status": "Active",
    "metric": "24 Orders in Packing Queue",
    "impact": "Risk of missing 60-min delivery SLA",
    "time": "16 mins ago"
  },
  {
    "id": "ORD-503",
    "title": "VIP High-Spender Order Delivery Delay Hazard",
    "category": "VIP Concierge",
    "hub": "Bandra West Medical Center",
    "severity": "High Warning",
    "status": "Active",
    "metric": "Order #VIP-9942 Elapsed: 42 mins",
    "impact": "Platinum member lifetime value \u20b91.8L",
    "time": "22 mins ago"
  },
  {
    "id": "ORD-504",
    "title": "Unmatched In-Clinic Diagnostic Blood Panel",
    "category": "Laboratory Diagnostics",
    "hub": "South Ext Trauma Center",
    "severity": "Warning",
    "status": "Active",
    "metric": "Barcode Scan Mismatch on 3 Blood Vials",
    "impact": "Patient discharge delayed by 40 mins",
    "time": "35 mins ago"
  },
  {
    "id": "ORD-505",
    "title": "High Customer Cancellation Spike on Pet Spa Bookings",
    "category": "Grooming & Wellness",
    "hub": "Koramangala Express Hub",
    "severity": "Warning",
    "status": "Active",
    "metric": "8 Appointments Cancelled in 1 Hr",
    "impact": "\u20b918K idle grooming groomer labor loss",
    "time": "45 mins ago"
  },
  {
    "id": "ORD-506",
    "title": "Surgical Kit Sterilization Queue Conflict",
    "category": "Operating Theatre Logistics",
    "hub": "Gurgaon Sec-29 Hospital",
    "severity": "High Warning",
    "status": "Active",
    "metric": "Autoclave cycle delay of 25 mins",
    "impact": "Ortho fracture surgery prep at risk",
    "time": "1 hr ago"
  },
  {
    "id": "ORD-507",
    "title": "Heavy Kibble Multi-Bag Courier Rejection Alert",
    "category": "Heavy Bulky Shipping",
    "hub": "Powai Micro-Hub",
    "severity": "Warning",
    "status": "Active",
    "metric": "6 Bags (15kg) rejected by 2-wheeler couriers",
    "impact": "Requires 3-wheeler cargo rerouting",
    "time": "2 hrs ago"
  },
  {
    "id": "ORD-508",
    "title": "Repeat Order Auto-Ship Payment Decline Loop",
    "category": "Subscription Commerce",
    "hub": "National Digital Commerce",
    "severity": "Warning",
    "status": "Active",
    "metric": "14 recurring auto-ship orders stuck",
    "impact": "\u20b932K recurring prescription orders paused",
    "time": "3 hrs ago"
  },
  {
    "id": "ORD-509",
    "title": "Cross-City Emergency Blood Plasma Transfer",
    "category": "Emergency Logistics",
    "hub": "Chennai Transit Hub",
    "severity": "High Warning",
    "status": "Active",
    "metric": "Canine plasma bag en route via intercity cab",
    "impact": "Trauma patient transfusion expected in 45m",
    "time": "4 hrs ago"
  },
  {
    "id": "ORD-510",
    "title": "POS Barcode Scanner Failure on Front Counter",
    "category": "Hospital Front Desk",
    "hub": "HSR Layout Polyclinic",
    "severity": "Warning",
    "status": "Resolved",
    "metric": "Manual entry required for 18 billing items",
    "impact": "Resolved: Backup Bluetooth scanner deployed",
    "time": "5 hrs ago"
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
      subcategory="Order Alerts"
      title="Order Fulfillment & Exception Alerts"
      subtitle="Monitoring prescription bottlenecks, packing station SLA breaches, abnormal cancellation rates, and VIP order escalations"
      icon="📦"
      badge=""
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => triggerToast('Emergency duty pharmacist assigned to clear Rx verification queue.')}
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
            👨‍⚕️ Page Duty Pharmacist
          </button>
          <button
            onClick={() => triggerToast('Automated retention apology vouchers (₹0) dispatched to cancelled customers.')}
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
            🎁 Issue Retention Credits
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
          label="Pending Rx Sign-Offs"
          value="10 Orders"
          delta="-8"
          trend="positive"
          subtext="Avg sign-off: 4.8m"
          icon="💊"
        />
        <KpiCard
          label="Packing Station SLA"
          value="98.6%"
          delta="+1.2%"
          trend="positive"
          subtext="14 hubs nominal"
          icon="📦"
        />
        <KpiCard
          label="Cancellation Rate"
          value="1.4%"
          delta="-0.6%"
          trend="positive"
          subtext="Below 2.5% threshold"
          icon="🚫"
        />
        <KpiCard
          label="VIP Escalations"
          value="2 Orders"
          delta="-3"
          trend="positive"
          subtext="Concierge handling"
          icon="⭐"
        />
      </div>

      {/* Alerts Table */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>
          Live Order Processing Bottlenecks & Anomaly Feed
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {alerts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '36px', color: 'var(--muted-foreground, #94a3b8)', fontSize: '13px' }}>
              No order processing bottlenecks or anomaly alerts detected.
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
                    Category: <strong style={{ color: 'var(--foreground, #f8fafc)' }}>{a.category}</strong> · Hub: <span>{a.hub}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#fbbf24' }}>{a.metric}</div>
                  <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)', marginTop: '2px' }}>
                    Status: <strong style={{ color: a.status === 'Resolved' ? '#10b981' : '#38bdf8' }}>{a.status}</strong>
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>
                <strong>Operational Impact:</strong> {a.impact}
              </div>

              {a.status !== 'Resolved' && (
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', paddingTop: '4px' }}>
                  {a.id === 'ORD-501' && (
                    <button
                      onClick={() => handleAction(a.id, 'Paging 2 standby clinical pharmacists to verify orders')}
                      style={{ padding: '6px 14px', borderRadius: '6px', background: 'var(--primary, #3b82f6)', color: '#fff', border: 'none', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Assign Standby Pharmacist
                    </button>
                  )}
                  {a.id === 'ORD-505' && (
                    <button
                      onClick={() => handleAction(a.id, 'Priority Dedicated Express Courier Rerouted & ₹0 Applied')}
                      style={{ padding: '6px 14px', borderRadius: '6px', background: '#ef4444', color: '#fff', border: 'none', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Expedite VIP Priority Courier
                    </button>
                  )}
                  {a.id === 'ORD-504' && (
                    <button
                      onClick={() => handleAction(a.id, 'Consolidated Order #ZV-99481 to Indiranagar Hub')}
                      style={{ padding: '6px 14px', borderRadius: '6px', background: '#10b981', color: '#fff', border: 'none', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Auto-Consolidate Shipment
                    </button>
                  )}
                  <button
                    onClick={() => handleAction(a.id, 'Acknowledged')}
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
