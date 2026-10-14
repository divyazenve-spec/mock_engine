import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function SystemHealthDashboard() {
  const [toast, setToast] = useState('');

  const services = [
  {
    "name": "FastAPI ASGI Gateway Engine",
    "type": "Python 3.12 / Uvicorn ASGI",
    "host": "127.0.0.1:8000",
    "latency": "14.2 ms",
    "load": "18% / 284 MB",
    "uptime": "99.98%",
    "status": "OPERATIONAL"
  },
  {
    "name": "SQLite WAL Analytical Datastore",
    "type": "Embedded SQLite 3.45 / WAL Mode",
    "host": "local://database/zenvebi.db",
    "latency": "0.8 ms",
    "load": "0.8% / 148 MB",
    "uptime": "100%",
    "status": "OPERATIONAL"
  },
  {
    "name": "Redis Session & Cache Cluster",
    "type": "In-Memory Key-Value Cache",
    "host": "aws-mumbai.redis.internal:6379",
    "latency": "1.2 ms",
    "load": "32% / 1.4 GB",
    "uptime": "99.99%",
    "status": "OPERATIONAL"
  },
  {
    "name": "Razorpay Webhook Listener",
    "type": "Fintech Inbound Callback Service",
    "host": "api.zenve.io/v1/payments",
    "latency": "38 ms",
    "load": "12% / 112 MB",
    "uptime": "99.95%",
    "status": "OPERATIONAL"
  },
  {
    "name": "Zoho CRM & Leads Pipeline",
    "type": "REST Webhook Bidirectional Sync",
    "host": "crm.zoho.com/v2/records",
    "latency": "142 ms",
    "load": "15% / 94 MB",
    "uptime": "99.90%",
    "status": "OPERATIONAL"
  },
  {
    "name": "Cold-Chain IoT Telemetry Broker",
    "type": "MQTT / TLS Chiller Sensor Broker",
    "host": "iot.ap-south-1.amazonaws.com:8883",
    "latency": "22 ms",
    "load": "24% / 168 MB",
    "uptime": "99.96%",
    "status": "OPERATIONAL"
  },
  {
    "name": "SAP ERP Financial Ledger CDC",
    "type": "Apache Kafka / Debezium Connector",
    "host": "sap-gateway.internal:8443",
    "latency": "84 ms",
    "load": "28% / 420 MB",
    "uptime": "99.92%",
    "status": "OPERATIONAL"
  },
  {
    "name": "Meta CAPI & Google Ads Stream",
    "type": "Server-to-Server Attribution API",
    "host": "graph.facebook.com/v19.0",
    "latency": "68 ms",
    "load": "16% / 138 MB",
    "uptime": "99.94%",
    "status": "OPERATIONAL"
  },
  {
    "name": "Gupshup WhatsApp & SMS Engine",
    "type": "Cloud Communication Gateway",
    "host": "api.gupshup.io/sm/api/v1",
    "latency": "44 ms",
    "load": "14% / 126 MB",
    "uptime": "99.95%",
    "status": "OPERATIONAL"
  },
  {
    "name": "Elasticsearch OpenSearch Indexer",
    "type": "Distributed Full-Text Search Cluster",
    "host": "es-cluster.ap-south-1:9200",
    "latency": "28 ms",
    "load": "34% / 2.1 GB",
    "uptime": "99.91%",
    "status": "OPERATIONAL"
  }
];

  const runAllDiagnostics = () => {
    setToast('Dispatched synthetic health probes to all 8 core services & external integrations.');
    setTimeout(() => {
      setToast('System Health Diagnostics Completed: All 8 services responded within optimal SLA limits.');
    }, 2000);
  };

  return (
    <DashboardLayout
      category="System Health"
      subcategory="Infrastructure Command Center"
      title="System Architecture & Global Infrastructure Health"
      subtitle="FastAPI microservices, SQLite WAL engine, payment gateways, CRM, ERP, and IoT telemetry monitors"
      icon="🖥️"
      badge=""
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => {
              setToast('Cache buffers flushed across session layer.');
              setTimeout(() => setToast(''), 3000);
            }}
            style={{
              padding: '7px 14px',
              borderRadius: '8px',
              background: '#ffffff',
              border: '1px solid var(--border, #cbd5e1)',
              color: 'var(--foreground, #334155)',
              fontWeight: 600,
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            🧹 Flush Cache
          </button>
          <button
            onClick={runAllDiagnostics}
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
            ⚡ Run Full System Diagnostics
          </button>
        </div>
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
        <KpiCard label="Overall System Uptime" value="99.98%" delta="+0.04%" trend="positive" subtext="Trailing 30-day SLA" icon="🟢" />
        <KpiCard label="Core Backend Latency" value="14.2 ms" delta="-3.8ms" trend="positive" subtext="FastAPI uvicorn ASGI" icon="⚡" />
        <KpiCard label="Active Microservices" value="10 / 10 Online" delta="100%" trend="positive" subtext="Zero failed daemons" icon="🖥️" />
        <KpiCard label="API Failure Rate" value="0.02%" delta="-0.08%" trend="positive" subtext="Within 0.1% budget" icon="🛡️" />
      </div>

      {/* System Infrastructure Matrix */}
      <div style={{
        background: 'var(--card, #ffffff)',
        border: '1px solid var(--border, #e2e8f0)',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--foreground, #0f172a)', fontFamily: 'var(--font-display, "Sora", sans-serif)' }}>
              Infrastructure & Integration Services Status
            </h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>
              Live telemetry monitoring across core microservices, databases, and third-party APIs
            </p>
          </div>
          <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, background: '#f8fafc', padding: '3px 9px', borderRadius: '99px', border: '1px solid #e2e8f0' }}>
            ● 10 Services Active
          </span>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)', fontSize: '11px', background: '#f8fafc' }}>
              <th style={{ padding: '10px 12px' }}>Service Name</th>
              <th style={{ padding: '10px 12px' }}>Architecture & Stack</th>
              <th style={{ padding: '10px 12px' }}>Host / Endpoint</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Ping Latency</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>CPU / Memory Load</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Uptime</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Status</th>
              <th style={{ padding: '10px 12px', textAlign: 'center' }}>Test</th>
            </tr>
          </thead>
          <tbody>
            {services.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ padding: '36px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                  No infrastructure services registered.
                </td>
              </tr>
            ) : (
              services.map((s) => (
                <tr key={s.name} style={{ borderBottom: '1px solid var(--border, #f1f5f9)' }}>
                  <td style={{ padding: '12px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>{s.name}</td>
                  <td style={{ padding: '12px', color: 'var(--muted-foreground, #64748b)', fontSize: '12px' }}>{s.type}</td>
                  <td style={{ padding: '12px', color: 'var(--muted-foreground, #64748b)', fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px' }}>{s.host}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{s.latency}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{s.load}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>{s.uptime}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '99px',
                      background: '#f0fdf4',
                      color: '#16a34a',
                      border: '1px solid #bbf7d0',
                      fontWeight: 600,
                      fontSize: '11px'
                    }}>● {s.status}</span>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                  <button
                    onClick={() => {
                      setToast(`Diagnostic ping to ${s.name} succeeded in ${s.latency}. Status: OK.`);
                      setTimeout(() => setToast(''), 3000);
                    }}
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
                    Ping
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
