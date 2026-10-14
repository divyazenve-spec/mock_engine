import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function InventorySystemHealth() {
  const [nodes, setNodes] = useState([
  {
    "hub": "Indiranagar Central Medical Depot",
    "type": "Class-A Central Distribution Depot",
    "ip": "10.24.101.12 (MQTT/TLS)",
    "latency": "12 ms",
    "syncLatency": "12 ms",
    "skus": "14,200 SKUs",
    "skuCount": "14,200 SKUs",
    "telemetry": "Chiller: 3.8\u00b0C (Nominal)",
    "status": "ONLINE"
  },
  {
    "hub": "Koramangala 60-Min Express Hub",
    "type": "60-Min Dark Store",
    "ip": "10.24.102.44 (IoT Gateway)",
    "latency": "14 ms",
    "syncLatency": "14 ms",
    "skus": "4,850 SKUs",
    "skuCount": "4,850 SKUs",
    "telemetry": "Chiller: 4.1\u00b0C (Nominal)",
    "status": "ONLINE"
  },
  {
    "hub": "Whitefield Dark Store & Fulfillment",
    "type": "Bulk Regional Fulfillment Center",
    "ip": "10.24.103.88 (Modbus/IP)",
    "latency": "18 ms",
    "syncLatency": "18 ms",
    "skus": "18,400 SKUs",
    "skuCount": "18,400 SKUs",
    "telemetry": "Chiller: 3.6\u00b0C (Nominal)",
    "status": "ONLINE"
  },
  {
    "hub": "Bandra West Medical Cold-Store",
    "type": "Hospital Cold-Chain Warehouse",
    "ip": "10.24.104.15 (MQTT/TLS)",
    "latency": "22 ms",
    "syncLatency": "22 ms",
    "skus": "3,920 SKUs",
    "skuCount": "3,920 SKUs",
    "telemetry": "Chiller: 4.0\u00b0C (Nominal)",
    "status": "ONLINE"
  },
  {
    "hub": "Powai Express Micro-Depot",
    "type": "Micro-Fulfillment Node",
    "ip": "10.24.105.62 (IoT Gateway)",
    "latency": "16 ms",
    "syncLatency": "16 ms",
    "skus": "4,100 SKUs",
    "skuCount": "4,100 SKUs",
    "telemetry": "Chiller: 4.2\u00b0C (Nominal)",
    "status": "ONLINE"
  },
  {
    "hub": "South Extension Emergency Depot",
    "type": "Trauma Care Supply Hub",
    "ip": "10.24.106.33 (MQTT/TLS)",
    "latency": "28 ms",
    "syncLatency": "28 ms",
    "skus": "5,600 SKUs",
    "skuCount": "5,600 SKUs",
    "telemetry": "Chiller: 3.9\u00b0C (Nominal)",
    "status": "ONLINE"
  },
  {
    "hub": "Gurgaon Sec-29 Logistics Facility",
    "type": "North Hub Distribution Center",
    "ip": "10.24.107.91 (Modbus/IP)",
    "latency": "24 ms",
    "syncLatency": "24 ms",
    "skus": "11,200 SKUs",
    "skuCount": "11,200 SKUs",
    "telemetry": "Chiller: 4.4\u00b0C (Nominal)",
    "status": "ONLINE"
  },
  {
    "hub": "HSR Layout Cold-Chain Hub",
    "type": "Automated Micro-Depot",
    "ip": "10.24.108.20 (IoT Gateway)",
    "latency": "15 ms",
    "syncLatency": "15 ms",
    "skus": "4,450 SKUs",
    "skuCount": "4,450 SKUs",
    "telemetry": "Chiller: 3.7\u00b0C (Nominal)",
    "status": "ONLINE"
  },
  {
    "hub": "Anna Nagar Express Fulfillment",
    "type": "South Hub Express Node",
    "ip": "10.24.109.55 (MQTT/TLS)",
    "latency": "26 ms",
    "syncLatency": "26 ms",
    "skus": "6,800 SKUs",
    "skuCount": "6,800 SKUs",
    "telemetry": "Chiller: 4.1\u00b0C (Nominal)",
    "status": "ONLINE"
  },
  {
    "hub": "Jayanagar Care Center Warehouse",
    "type": "South Bangalore Logistics Center",
    "ip": "10.24.110.18 (IoT Gateway)",
    "latency": "14 ms",
    "syncLatency": "14 ms",
    "skus": "4,200 SKUs",
    "skuCount": "4,200 SKUs",
    "telemetry": "Chiller: 3.8\u00b0C (Nominal)",
    "status": "ONLINE"
  }
]);

  const [toast, setToast] = useState('');

  const pingNode = (hub) => {
    setToast(`Telemetry ping received from ${hub} — Temperature, stock counters & RFID gateway OK.`);
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <DashboardLayout
      category="System Health"
      subcategory="Inventory System"
      title="Warehouse WMS & Cold-Chain IoT Health"
      subtitle="Warehouse node connectivity, stock delta sync, RFID scanner APIs & freezer telemetry streams"
      icon="📦"
      badge=""
      actions={
        <button
          onClick={() => {
            setToast('Dispatched stock recount beacon across fulfillment warehouses.');
            setTimeout(() => setToast('Warehouses synchronized to master inventory.'), 2500);
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
          🔄 Force Stock Recount
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
        <KpiCard label="Online Hubs" value="10 / 10 Hubs" delta="100%" trend="positive" subtext="IoT node streams" icon="🏬" />
        <KpiCard label="Cold-Chain Sensor Heartbeat" value="0.8 s" delta="Live" trend="positive" subtext="Temperature telemetries" icon="❄️" />
        <KpiCard label="Total Tracked SKUs" value="77,720 SKUs" delta="Real-time" trend="positive" subtext="Real-time stock sync" icon="📦" />
        <KpiCard label="Reorder Triggers Fired" value="42 Today" delta="+8" trend="positive" subtext="Stock replenishment triggers" icon="⚡" />
      </div>

      {/* Nodes Table */}
      <div style={{
        background: 'var(--card, #ffffff)',
        border: '1px solid var(--border, #e2e8f0)',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Fulfillment Hubs & IoT Sensor Streams</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)', fontSize: '11px', background: '#f8fafc' }}>
              <th style={{ padding: '10px 12px' }}>Hub / Location</th>
              <th style={{ padding: '10px 12px' }}>IP / Protocol</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Sync Latency</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Active SKUs</th>
              <th style={{ padding: '10px 12px' }}>Live Telemetry (IoT)</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Status</th>
              <th style={{ padding: '10px 12px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {nodes.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ padding: '36px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                  No fulfillment hubs or IoT streams found.
                </td>
              </tr>
            ) : (
              nodes.map((node) => (
                <tr key={node.hub} style={{ borderBottom: '1px solid var(--border, #f1f5f9)' }}>
                  <td style={{ padding: '12px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>
                    {node.hub}
                    <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #64748b)', fontWeight: 400 }}>{node.type}</div>
                  </td>
                  <td style={{ padding: '12px', fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', color: 'var(--muted-foreground, #64748b)' }}>{node.ip}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{node.syncLatency}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{node.skuCount}</td>
                  <td style={{ padding: '12px', fontSize: '11px', color: '#16a34a', fontFamily: '"IBM Plex Mono", monospace' }}>{node.telemetry}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '99px', background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', fontWeight: 600, fontSize: '11px' }}>
                      ● {node.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <button
                      onClick={() => pingNode(node.hub)}
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
                      Check IoT
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
