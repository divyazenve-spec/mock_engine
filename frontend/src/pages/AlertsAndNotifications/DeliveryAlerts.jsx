import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function DeliveryAlerts() {
  const [alerts, setAlerts] = useState([
  {
    "id": "DEL-601",
    "title": "Express Courier Bike Breakdown in Indiranagar Corridor",
    "rider": "Rider Sunil Kumar (BLR-R-104)",
    "zone": "Indiranagar / Domlur Zone",
    "severity": "Critical",
    "status": "Active",
    "elapsed": "48 Mins Elapsed (SLA: 60 Mins)",
    "slaCountdown": "12 Mins to Breach",
    "rootCause": "Rear tyre puncture with 3 urgent prescription drops on board",
    "cause": "Rear tyre puncture with 3 urgent prescription drops on board",
    "time": "8 mins ago"
  },
  {
    "id": "DEL-602",
    "title": "Heavy Rain Waterlogging Delay in Koramangala 4th Block",
    "rider": "Rider Manjunath S. (BLR-R-089)",
    "zone": "Koramangala 4th Block",
    "severity": "Critical",
    "status": "Active",
    "elapsed": "52 Mins Elapsed (SLA: 60 Mins)",
    "slaCountdown": "8 Mins to Breach",
    "rootCause": "Water depth 40cm on 80ft road blocking delivery scooter",
    "cause": "Water depth 40cm on 80ft road blocking delivery scooter",
    "time": "10 mins ago"
  },
  {
    "id": "DEL-603",
    "title": "Whitefield Express Rider Capacity Overwhelmed by Surge",
    "rider": "Whitefield Hub Pool (14 Active Riders)",
    "zone": "Whitefield ITPL Corridor",
    "severity": "High Warning",
    "status": "Active",
    "elapsed": "Average Dwell Time: 24 Mins",
    "slaCountdown": "Queue Delay +18m",
    "rootCause": "Evening surge of 42 orders exceeding fleet baseline capacity",
    "cause": "Evening surge of 42 orders exceeding fleet baseline capacity",
    "time": "15 mins ago"
  },
  {
    "id": "DEL-604",
    "title": "Customer Unreachable on Cold-Chain Vaccine Delivery",
    "rider": "Rider Pradeep Verma (DEL-R-044)",
    "zone": "South Extension-II",
    "severity": "High Warning",
    "status": "Active",
    "elapsed": "Rider Waiting: 14 Mins at Gate",
    "slaCountdown": "6 Mins Cold-Chain Window",
    "rootCause": "Phone switched off; building security refusing cold-box custody",
    "cause": "Phone switched off; building security refusing cold-box custody",
    "time": "20 mins ago"
  },
  {
    "id": "DEL-605",
    "title": "Bandra West Coastal Traffic Congestion Halt",
    "rider": "Rider Imran Khan (MUM-R-072)",
    "zone": "Bandra Linking Road",
    "severity": "Warning",
    "status": "Active",
    "elapsed": "38 Mins Elapsed (SLA: 60 Mins)",
    "slaCountdown": "22 Mins Remaining",
    "rootCause": "VIP convoy traffic diversion slowing express bike",
    "cause": "VIP convoy traffic diversion slowing express bike",
    "time": "25 mins ago"
  },
  {
    "id": "DEL-606",
    "title": "Cold-Chain Smart Delivery Box Lid Latched Open",
    "rider": "Rider Ramesh Yadav (GUR-R-031)",
    "zone": "Gurgaon CyberHub Zone",
    "severity": "Critical",
    "status": "Active",
    "elapsed": "Internal Temp: 7.2\u00b0C (Approaching 8\u00b0C Max)",
    "slaCountdown": "Immediate Action Required",
    "rootCause": "Sensor telemetry flagged unsealed insulation zipper",
    "cause": "Sensor telemetry flagged unsealed insulation zipper",
    "time": "30 mins ago"
  },
  {
    "id": "DEL-607",
    "title": "Apartment Complex Entry Delay for Bulk Kibble Shipment",
    "rider": "Rider Karthik R. (BLR-R-112)",
    "zone": "Bellandur Green Glen Layout",
    "severity": "Warning",
    "status": "Active",
    "elapsed": "Gate Dwell: 18 Mins",
    "slaCountdown": "15 Mins Remaining",
    "rootCause": "Visitor management app OTP approval delayed by resident",
    "cause": "Visitor management app OTP approval delayed by resident",
    "time": "35 mins ago"
  },
  {
    "id": "DEL-608",
    "title": "Incorrect GPS Pin for Emergency Wound Dressing Order",
    "rider": "Rider Vikram Singh (HYD-R-018)",
    "zone": "Gachibowli Financial District",
    "severity": "High Warning",
    "status": "Active",
    "elapsed": "Rider Diverted 2.4km from True Location",
    "slaCountdown": "14 Mins to Breach",
    "rootCause": "Geocoding pinned commercial tower instead of residential block",
    "cause": "Geocoding pinned commercial tower instead of residential block",
    "time": "40 mins ago"
  },
  {
    "id": "DEL-609",
    "title": "Courier Smartphone Battery Exhaustion During Delivery",
    "rider": "Rider Deepak Nair (CHN-R-055)",
    "zone": "T. Nagar Corridor",
    "severity": "Warning",
    "status": "Active",
    "elapsed": "Offline for 12 Mins",
    "slaCountdown": "Re-routing Standby",
    "rootCause": "Delivery phone battery died; rider calling from hub phone",
    "cause": "Delivery phone battery died; rider calling from hub phone",
    "time": "50 mins ago"
  },
  {
    "id": "DEL-610",
    "title": "Wrong Parcel Handover Caught at Inspection Station",
    "rider": "Rider Anand K. (BLR-R-062)",
    "zone": "HSR Sector 2 Hub",
    "severity": "Critical",
    "status": "Resolved",
    "elapsed": "Discrepancy Rectified in 4 Mins",
    "slaCountdown": "Resolved",
    "rootCause": "Cross-swapped 2 parcel barcodes during batch sorting",
    "cause": "Cross-swapped 2 parcel barcodes during batch sorting",
    "time": "1 hr ago"
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
      subcategory="Delivery Alerts"
      title="60-Minute Express & Fleet Logistics Alerts"
      subtitle="Real-time rider SLA countdowns, vehicle breakdown recovery, dark-store dispatch bottlenecks, and cold-chain geofencing"
      icon="⚡"
      badge=""
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => triggerToast('AI Dynamic Route Clustering activated across 76 active riders.')}
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
            🧭 Optimize Rider Routes
          </button>
          <button
            onClick={() => triggerToast('Temporary standby 3PL Shadowfax fleet expanded by 10 riders in Whitefield.')}
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
            🛵 Call Standby Fleet
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
          label="60-Min On-Time SLA"
          value="97.8%"
          delta="+1.4%"
          trend="positive"
          subtext="Target met: 38.2m avg"
          icon="⚡"
        />
        <KpiCard
          label="At-Risk Deliveries (<10m SLA)"
          value="6 Orders"
          delta="-4"
          trend="positive"
          subtext="Express intercept active"
          icon="⏱️"
        />
        <KpiCard
          label="Active Fleet on Field"
          value="128 Riders"
          delta="+18"
          trend="positive"
          subtext="10 hubs monitored"
          icon="🛵"
        />
        <KpiCard
          label="Avg Dispatch Dwell Time"
          value="4.2 Mins"
          delta="-1.6m"
          trend="positive"
          subtext="Optimal staging speed"
          icon="🏬"
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
          Live Fleet Disruptions & 60-Minute SLA Watchlist
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {alerts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '36px', color: 'var(--muted-foreground, #94a3b8)', fontSize: '13px' }}>
              No fleet disruptions or SLA alerts detected. All riders on schedule.
            </div>
          ) : (
            alerts.map((a) => (
            <div
              key={a.id}
              style={{
                padding: '16px',
                borderRadius: '8px',
                background: a.status === 'Resolved' ? 'rgba(16,185,129,0.05)' : 'rgba(0,0,0,0.15)',
                borderLeft: a.severity === 'Critical' ? '4px solid #ef4444' : a.severity === 'High Warning' ? '4px solid #f97316' : a.severity === 'Warning' ? '4px solid #f59e0b' : '4px solid #3b82f6',
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
                      background: a.severity === 'Critical' ? 'rgba(239,68,68,0.2)' : a.severity === 'High Warning' ? 'rgba(249,115,22,0.2)' : 'rgba(245,158,11,0.2)',
                      color: a.severity === 'Critical' ? '#ef4444' : '#f59e0b',
                      fontWeight: 600
                    }}>
                      {a.severity}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)', marginTop: '4px' }}>
                    Assigned: <strong style={{ color: 'var(--foreground, #f8fafc)' }}>{a.rider}</strong> · Zone: <span>{a.zone}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: a.severity === 'Critical' ? '#ef4444' : '#fbbf24' }}>
                    {a.slaCountdown}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)', marginTop: '2px' }}>
                    Status: <strong style={{ color: a.status === 'Resolved' ? '#10b981' : '#38bdf8' }}>{a.status}</strong>
                  </div>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '8px',
                padding: '10px',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '6px',
                fontSize: '12px'
              }}>
                <div>Progress / Dwell: <strong>{a.elapsed}</strong></div>
                <div style={{ gridColumn: '1 / -1' }}>Root Cause: <span style={{ color: '#94a3b8' }}>{a.rootCause}</span></div>
              </div>

              {a.status !== 'Resolved' && (
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', paddingTop: '4px' }}>
                  {a.id === 'DEL-601' && (
                    <button
                      onClick={() => handleAction(a.id, 'Masked VoIP call connected to Rider & customer notified with live GPS')}
                      style={{ padding: '6px 14px', borderRadius: '6px', background: '#ef4444', color: '#fff', border: 'none', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Call Rider & Notify Customer
                    </button>
                  )}
                  {a.id === 'DEL-602' && (
                    <button
                      onClick={() => handleAction(a.id, 'Standby Rider #R-214 assigned to intercept and complete antibiotic drops')}
                      style={{ padding: '6px 14px', borderRadius: '6px', background: '#10b981', color: '#fff', border: 'none', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Dispatch Intercept Rider
                    </button>
                  )}
                  {a.id === 'DEL-603' && (
                    <button
                      onClick={() => handleAction(a.id, '14 Whitefield orders batch-assigned to 4 spillover riders')}
                      style={{ padding: '6px 14px', borderRadius: '6px', background: 'var(--primary, #3b82f6)', color: '#fff', border: 'none', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Auto-Batch Assign Parcels
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
