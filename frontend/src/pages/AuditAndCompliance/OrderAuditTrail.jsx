import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function OrderAuditTrail() {
  const orders = [
  {
    "orderId": "ORD-99401",
    "customer": "Rajesh Malhotra",
    "event": "Schedule H Pharmacist Verification",
    "prevStatus": "Pending Rx Check",
    "newStatus": "Verified & Approved",
    "officer": "Pharm. Priya Sharma",
    "time": "2026-10-14 16:38:12"
  },
  {
    "orderId": "ORD-99402",
    "customer": "Sunita Kulkarni",
    "event": "Automated Packing in Cold Tote (2-8\u00b0C)",
    "prevStatus": "Picking Complete",
    "newStatus": "Cold Sealed with Sensor",
    "officer": "Packer P. Mohan",
    "time": "2026-10-14 16:30:45"
  },
  {
    "orderId": "ORD-99403",
    "customer": "Arunabh Mukherjee",
    "event": "Sky-Corridor Drone Airway Bill Assigned",
    "prevStatus": "Cold Sealed",
    "newStatus": "In-Flight Express",
    "officer": "Dispatcher Manish Verma",
    "time": "2026-10-14 16:22:10"
  },
  {
    "orderId": "ORD-99404",
    "customer": "Deepika Nambiar",
    "event": "Doorstep Handover OTP Validated",
    "prevStatus": "Out for Delivery",
    "newStatus": "Delivered (OTP 9482)",
    "officer": "Rider Vinod K.",
    "time": "2026-10-14 16:15:20"
  },
  {
    "orderId": "ORD-99405",
    "customer": "Karthik Swaminathan",
    "event": "Doctor Tele-Consult Digital Signoff",
    "prevStatus": "Rx Verification Pending",
    "newStatus": "Consult Passed",
    "officer": "Dr. Arvind Rao",
    "time": "2026-10-14 16:04:18"
  },
  {
    "orderId": "ORD-99406",
    "customer": "Meera Joshi",
    "event": "Senior Citizen Chronic Care Discount Applied",
    "prevStatus": "Cart Checkout",
    "newStatus": "Discount Approved (-15%)",
    "officer": "Supervisor Anita Kurup",
    "time": "2026-10-14 15:52:05"
  },
  {
    "orderId": "ORD-99407",
    "customer": "Tariq Mansoor",
    "event": "Schedule X Dual-Signature Escort Attached",
    "prevStatus": "Doctor Approved",
    "newStatus": "Dual-Signed & Vaulted",
    "officer": "Dr. Ananya Sen",
    "time": "2026-10-14 15:39:40"
  },
  {
    "orderId": "ORD-99408",
    "customer": "Lavanya Reddy",
    "event": "FEFO Allocation from Vault Batch B-88",
    "prevStatus": "Order Placed",
    "newStatus": "Inventory Allocated",
    "officer": "WMS Automated Engine",
    "time": "2026-10-14 15:25:12"
  },
  {
    "orderId": "ORD-99409",
    "customer": "Vikramaditya Bose",
    "event": "Prescription Validity Re-Check (30 Days)",
    "prevStatus": "Upload Pending",
    "newStatus": "Valid Script Logged",
    "officer": "Pharm. K. Sundaram",
    "time": "2026-10-14 15:10:35"
  },
  {
    "orderId": "ORD-99410",
    "customer": "Farah Qureshi",
    "event": "Post-Delivery Cold Integrity Telemetry Verified",
    "prevStatus": "Delivered",
    "newStatus": "Audit Completed (3.4\u00b0C)",
    "officer": "IoT Cloud Sentry",
    "time": "2026-10-14 14:55:00"
  }
];

  return (
    <DashboardLayout
      category="Audit & Compliance"
      subcategory="Order State Transitions & Overrides"
      title="Order State & Fulfillment Audit Trail"
      subtitle="State transitions, doctor verifications, price override logs, and courier handover receipts"
      icon="📦"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Audited Orders Today" value="9,420 Orders" delta="+15.2%" trend="up" subtext="End-to-end chain of custody" icon="📦" />
        <KpiCard label="OTP Delivery Validation" value="99.8%" delta="+0.4%" trend="up" subtext="Customer OTP verified at doorstep" icon="📱" />
        <KpiCard label="Price / Discount Overrides" value="3 Logged" delta="-25.0%" trend="down" subtext="Authorized discount adjustments" icon="🏷️" />
        <KpiCard label="Prescription Match SLA" value="1.8 Mins" delta="-14.0%" trend="up" subtext="Doctor-pharmacist verification" icon="⏱️" />
      </div>

      <div style={{ background: 'var(--card, #ffffff)', border: '1px solid var(--border, #e2e8f0)', borderRadius: '12px', padding: '20px' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Order Lifecycle State Audit</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)', fontSize: '11px', textTransform: 'uppercase' }}>
                <th style={{ padding: '10px 12px' }}>Order ID</th>
                <th style={{ padding: '10px 12px' }}>Customer & Location</th>
                <th style={{ padding: '10px 12px' }}>Lifecycle Event</th>
                <th style={{ padding: '10px 12px' }}>Previous State</th>
                <th style={{ padding: '10px 12px' }}>New State</th>
                <th style={{ padding: '10px 12px' }}>Authorizing Officer</th>
                <th style={{ padding: '10px 12px' }}>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ padding: '36px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                    No order audit trail records found.
                  </td>
                </tr>
              ) : (
                orders.map((o, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)' }}>
                    <td style={{ padding: '12px', fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', color: '#2563eb', fontWeight: 600 }}>{o.orderId}</td>
                    <td style={{ padding: '12px', fontWeight: 700 }}>{o.customer}</td>
                    <td style={{ padding: '12px' }}>{o.event}</td>
                    <td style={{ padding: '12px' }}><span style={{ padding: '2px 8px', borderRadius: '99px', background: '#fef3c7', color: '#b45309', fontSize: '11px', fontWeight: 600 }}>{o.prevStatus}</span></td>
                    <td style={{ padding: '12px' }}><span style={{ padding: '2px 8px', borderRadius: '99px', background: '#dcfce7', color: '#15803d', fontSize: '11px', fontWeight: 600 }}>{o.newStatus}</span></td>
                    <td style={{ padding: '12px', color: '#64748b' }}>{o.officer}</td>
                    <td style={{ padding: '12px', fontSize: '12px' }}>{o.time}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
