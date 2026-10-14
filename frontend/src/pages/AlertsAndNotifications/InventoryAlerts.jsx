import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function InventoryAlerts() {
  const [alerts, setAlerts] = useState([
  {
    "id": "INV-301",
    "sku": "SKU-MED-0101",
    "title": "Bravecto Chewable Dog 20-40kg",
    "hub": "Koramangala Express Hub",
    "severity": "Critical",
    "status": "Active",
    "currentStock": 14,
    "stock": "14 Units",
    "safetyStock": 40,
    "burnRate": "4.8 units/day",
    "burn": "4.8 / Day",
    "estStockout": "2.9 Days (Critical)",
    "action": "Emergency PO Dispatched"
  },
  {
    "id": "INV-302",
    "sku": "SKU-VAC-0504",
    "title": "Nobivac Tricat Trio Feline Vaccine",
    "hub": "Indiranagar Surgical Hospital",
    "severity": "High Warning",
    "status": "Active",
    "currentStock": 22,
    "stock": "22 Vials",
    "safetyStock": 50,
    "burnRate": "4.2 units/day",
    "burn": "4.2 / Day",
    "estStockout": "5.2 Days",
    "action": "Inter-Hub Transfer En Route"
  },
  {
    "id": "INV-303",
    "sku": "SKU-NUT-0205",
    "title": "Royal Canin Gastrointestinal Dog 14kg",
    "hub": "Whitefield Dark Store",
    "severity": "Critical",
    "status": "Active",
    "currentStock": 8,
    "stock": "8 Bags",
    "safetyStock": 30,
    "burnRate": "2.0 units/day",
    "burn": "2.0 / Day",
    "estStockout": "4.0 Days (Critical)",
    "action": "Supplier Bulk PO Placed"
  },
  {
    "id": "INV-304",
    "sku": "SKU-CRD-0302",
    "title": "Vetmedin 5mg Chewable Tablets",
    "hub": "Bandra West Medical Center",
    "severity": "High Warning",
    "status": "Active",
    "currentStock": 11,
    "stock": "11 Packs",
    "safetyStock": 25,
    "burnRate": "1.8 units/day",
    "burn": "1.8 / Day",
    "estStockout": "6.1 Days",
    "action": "Safety Buffer Reorder Active"
  },
  {
    "id": "INV-305",
    "sku": "SKU-DERM-0410",
    "title": "Apoquel 16mg Anti-Itch Tablets",
    "hub": "Powai Express Hub",
    "severity": "High Warning",
    "status": "Active",
    "currentStock": 16,
    "stock": "16 Packs",
    "safetyStock": 35,
    "burnRate": "3.2 units/day",
    "burn": "3.2 / Day",
    "estStockout": "5.0 Days",
    "action": "Rebalance from Bandra Hub"
  },
  {
    "id": "INV-306",
    "sku": "SKU-EMG-0714",
    "title": "Cerenia 10mg/ml Injectable Anti-Emetic",
    "hub": "South Ext Trauma Center",
    "severity": "Critical",
    "status": "Active",
    "currentStock": 6,
    "stock": "6 Vials",
    "safetyStock": 20,
    "burnRate": "2.5 units/day",
    "burn": "2.5 / Day",
    "estStockout": "2.4 Days (Critical)",
    "action": "Same-Day Courier En Route"
  },
  {
    "id": "INV-307",
    "sku": "SKU-ORT-0608",
    "title": "Rimadyl 75mg Chewable NSAID",
    "hub": "Gurgaon Sec-29 Hospital",
    "severity": "Warning",
    "status": "Active",
    "currentStock": 18,
    "stock": "18 Bottles",
    "safetyStock": 30,
    "burnRate": "2.4 units/day",
    "burn": "2.4 / Day",
    "estStockout": "7.5 Days",
    "action": "Supplier Requisition Queued"
  },
  {
    "id": "INV-308",
    "sku": "SKU-NUT-0212",
    "title": "Hill's Prescription Diet c/d Feline 3.8kg",
    "hub": "HSR Layout Polyclinic",
    "severity": "High Warning",
    "status": "Active",
    "currentStock": 9,
    "stock": "9 Bags",
    "safetyStock": 20,
    "burnRate": "1.7 units/day",
    "burn": "1.7 / Day",
    "estStockout": "5.3 Days",
    "action": "Dark Store Stock Transferred"
  },
  {
    "id": "INV-309",
    "sku": "SKU-MED-0115",
    "title": "Simparica Trio 10-20kg Chewable",
    "hub": "Anna Nagar Facility",
    "severity": "Warning",
    "status": "Active",
    "currentStock": 15,
    "stock": "15 Packs",
    "safetyStock": 28,
    "burnRate": "2.4 units/day",
    "burn": "2.4 / Day",
    "estStockout": "6.2 Days",
    "action": "Automated PO Requisition Active"
  },
  {
    "id": "INV-310",
    "sku": "SKU-SUR-0820",
    "title": "Vicryl 3-0 Absorbable Surgical Suture",
    "hub": "Jayanagar Care Center",
    "severity": "Critical",
    "status": "Resolved",
    "currentStock": 48,
    "stock": "48 Boxes",
    "safetyStock": 40,
    "burnRate": "3.5 units/day",
    "burn": "3.5 / Day",
    "estStockout": "13.7 Days (Safe)",
    "action": "Emergency Batch Received & Audited"
  }
]);

  const [toast, setToast] = useState('');

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleResolve = (id, act) => {
    triggerToast(`Action executed: "${act}" for SKU alert ${id}.`);
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'Resolved' } : a));
  };

  return (
    <DashboardLayout
      category="Alerts & Notifications"
      subcategory="Inventory Alerts"
      title="Inventory & Cold-Chain Stock Alerts"
      subtitle="Stockout early-warning system, near-expiry pharmaceutical batches, cold-chain telemetry, and negative physical audit variances"
      icon="📦"
      badge=""
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => triggerToast('Generated automated Purchase Orders for 4 low-stock SKUs.')}
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
            📋 Auto-Generate POs
          </button>
          <button
            onClick={() => triggerToast('Inter-hub replenishment truck scheduled from Bhiwandi to Bengaluru.')}
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
            🚚 Expedite Transfers
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
          label="SKUs Below Reorder Point"
          value="10 SKUs"
          delta="-4"
          trend="positive"
          subtext="Buffer stocks active"
          icon="⚠️"
        />
        <KpiCard
          label="Near-Expiry Valuation (<30d)"
          value="₹1.85L"
          delta="-64% vs Q2"
          trend="positive"
          subtext="FEFO clearance active"
          icon="⏳"
        />
        <KpiCard
          label="Cold-Chain Temperature SLA"
          value="99.8%"
          delta="+0.4%"
          trend="positive"
          subtext="14 hubs in compliance"
          icon="❄️"
        />
        <KpiCard
          label="Capital Trapped in Slow-Moving"
          value="₹3.4L"
          delta="-18%"
          trend="positive"
          subtext="Stock rebalanced"
          icon="🧊"
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
          Live SKU Stock Triggers & Expiry Exceptions
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {alerts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '36px', color: 'var(--muted-foreground, #94a3b8)', fontSize: '13px' }}>
              No inventory stock triggers or expiry exceptions detected.
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
                      {a.sku}
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: 700 }}>{a.title}</span>
                    <span style={{
                      fontSize: '10px',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: a.severity === 'Critical' ? 'rgba(239,68,68,0.2)' : a.severity === 'High Warning' ? 'rgba(249,115,22,0.2)' : 'rgba(245,158,11,0.2)',
                      color: a.severity === 'Critical' ? '#ef4444' : a.severity === 'High Warning' ? '#f97316' : '#f59e0b',
                      fontWeight: 600
                    }}>
                      {a.severity}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)', marginTop: '4px' }}>
                    Location: <strong style={{ color: 'var(--foreground, #f8fafc)' }}>{a.hub}</strong> · Burn Rate: <strong>{a.burnRate}</strong>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: a.severity === 'Critical' ? '#ef4444' : '#f59e0b' }}>
                    {a.estStockout}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)', marginTop: '2px' }}>
                    Status: <strong style={{ color: a.status === 'Resolved' ? '#10b981' : '#38bdf8' }}>{a.status}</strong>
                  </div>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '10px',
                padding: '10px',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '6px',
                fontSize: '12px'
              }}>
                <div>Current Stock: <strong style={{ color: a.currentStock <= a.safetyStock ? '#ef4444' : '#10b981' }}>{a.currentStock} units</strong></div>
                <div>Safety Stock Threshold: <strong>{a.safetyStock} units</strong></div>
                <div style={{ gridColumn: '1 / -1', color: '#38bdf8' }}>
                  Recommended Action: <strong>{a.action}</strong>
                </div>
              </div>

              {a.status !== 'Resolved' && (
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', paddingTop: '4px' }}>
                  <button
                    onClick={() => handleResolve(a.id, a.action)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '6px',
                      background: 'var(--primary, #3b82f6)',
                      border: 'none',
                      color: '#ffffff',
                      fontSize: '11px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Execute Recommended Action
                  </button>
                  <button
                    onClick={() => handleResolve(a.id, 'Snoozed for 4 hours')}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid var(--border, rgba(255,255,255,0.1))',
                      color: 'var(--foreground, #f8fafc)',
                      fontSize: '11px',
                      cursor: 'pointer'
                    }}
                  >
                    Snooze (4h)
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
