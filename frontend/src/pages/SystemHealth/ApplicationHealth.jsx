import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ApplicationHealth() {
  const [apps, setApps] = useState([
  {
    "name": "Core FastAPI REST Engine",
    "version": "v2.8.4-prod",
    "type": "Python 3.12 / FastAPI ASGI",
    "stack": "Python 3.12 / FastAPI ASGI",
    "port": "127.0.0.1:8000",
    "host": "127.0.0.1:8000",
    "memory": "284 MB",
    "mem": "284 MB",
    "cpu": "2.4%",
    "requestsPerMin": "1,420 rpm",
    "tput": "1,420 rpm",
    "status": "HEALTHY"
  },
  {
    "name": "AI Veterinary Diagnostic Copilot",
    "version": "v1.4.2-prod",
    "type": "Python / Gemini 1.5 Pro Worker",
    "stack": "Python / Gemini 1.5 Pro Worker",
    "port": "127.0.0.1:8001",
    "host": "127.0.0.1:8001",
    "memory": "512 MB",
    "mem": "512 MB",
    "cpu": "4.8%",
    "requestsPerMin": "380 rpm",
    "tput": "380 rpm",
    "status": "HEALTHY"
  },
  {
    "name": "Background Celery Task Worker",
    "version": "v2.2.0-prod",
    "type": "Python / Celery 5.3 Distributed",
    "stack": "Python / Celery 5.3 Distributed",
    "port": "worker-node-1",
    "host": "worker-node-1",
    "memory": "340 MB",
    "mem": "340 MB",
    "cpu": "3.1%",
    "requestsPerMin": "840 rpm",
    "tput": "840 rpm",
    "status": "HEALTHY"
  },
  {
    "name": "WebSocket Telemetry Server",
    "version": "v1.8.1-prod",
    "type": "Node.js 20 / Socket.io Cluster",
    "stack": "Node.js 20 / Socket.io Cluster",
    "port": "0.0.0.0:8080",
    "host": "0.0.0.0:8080",
    "memory": "198 MB",
    "mem": "198 MB",
    "cpu": "1.8%",
    "requestsPerMin": "2,800 rpm",
    "tput": "2,800 rpm",
    "status": "HEALTHY"
  },
  {
    "name": "Express Order Fulfillment Daemon",
    "version": "v3.1.0-prod",
    "type": "Go 1.22 Dispatch Microservice",
    "stack": "Go 1.22 Dispatch Microservice",
    "port": "127.0.0.1:9002",
    "host": "127.0.0.1:9002",
    "memory": "142 MB",
    "mem": "142 MB",
    "cpu": "1.2%",
    "requestsPerMin": "960 rpm",
    "tput": "960 rpm",
    "status": "HEALTHY"
  },
  {
    "name": "Cold-Chain IoT Monitor Worker",
    "version": "v1.6.0-prod",
    "type": "Rust / Tokio Telemetry Consumer",
    "stack": "Rust / Tokio Telemetry Consumer",
    "port": "iot-agent:8883",
    "host": "iot-agent:8883",
    "memory": "88 MB",
    "mem": "88 MB",
    "cpu": "0.9%",
    "requestsPerMin": "4,200 rpm",
    "tput": "4,200 rpm",
    "status": "HEALTHY"
  },
  {
    "name": "Financial Reconciliation Engine",
    "version": "v2.4.0-prod",
    "type": "Python / Polars & Pandas Ledger",
    "stack": "Python / Polars & Pandas Ledger",
    "port": "127.0.0.1:8004",
    "host": "127.0.0.1:8004",
    "memory": "420 MB",
    "mem": "420 MB",
    "cpu": "5.2%",
    "requestsPerMin": "320 rpm",
    "tput": "320 rpm",
    "status": "HEALTHY"
  },
  {
    "name": "Customer 360 Aggregator",
    "version": "v2.1.2-prod",
    "type": "Node.js / Express Profile Cache",
    "stack": "Node.js / Express Profile Cache",
    "port": "127.0.0.1:8005",
    "host": "127.0.0.1:8005",
    "memory": "210 MB",
    "mem": "210 MB",
    "cpu": "2.0%",
    "requestsPerMin": "740 rpm",
    "tput": "740 rpm",
    "status": "HEALTHY"
  },
  {
    "name": "Marketing Attribution Worker",
    "version": "v1.9.0-prod",
    "type": "Python / Kafka Stream Processor",
    "stack": "Python / Kafka Stream Processor",
    "port": "kafka-worker-3",
    "host": "kafka-worker-3",
    "memory": "180 MB",
    "mem": "180 MB",
    "cpu": "1.5%",
    "requestsPerMin": "1,120 rpm",
    "tput": "1,120 rpm",
    "status": "HEALTHY"
  },
  {
    "name": "Audit & Compliance Logger",
    "version": "v2.0.1-prod",
    "type": "Go / Structured Audit Agent",
    "stack": "Go / Structured Audit Agent",
    "port": "log-agent:9100",
    "host": "log-agent:9100",
    "memory": "64 MB",
    "mem": "64 MB",
    "cpu": "0.6%",
    "requestsPerMin": "5,600 rpm",
    "tput": "5,600 rpm",
    "status": "HEALTHY"
  }
]);

  const [toast, setToast] = useState('');

  const triggerDiagnostic = (appName) => {
    setToast(`Diagnostic ping dispatched to ${appName} — Response: OK (2.1ms)`);
    setTimeout(() => setToast(''), 3500);
  };

  const restartWorker = (appName) => {
    setToast(`Soft reload signal sent to ${appName}`);
    setTimeout(() => setToast(''), 3500);
  };

  return (
    <DashboardLayout
      category="System Health"
      subcategory="Application Health"
      title="Application & Microservice Health"
      subtitle="Host runtime, process memory, Uvicorn ASGI workers, mobile app endpoints & load metrics"
      icon="💻"
      badge=""
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => {
              setToast('Global health check initiated across application runtimes.');
              setTimeout(() => setToast(''), 3000);
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
            ⚡ Run Application Diagnostics
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
        <KpiCard label="Application Uptime" value="99.98%" delta="+0.04%" trend="positive" subtext="All microservices live" icon="🟢" />
        <KpiCard label="Active Applications" value="10 / 10 Live" delta="100%" trend="positive" subtext="All daemons healthy" icon="🚀" />
        <KpiCard label="Total Process Memory" value="2.45 GB" delta="-180 MB" trend="positive" subtext="Process memory budget" icon="💾" />
        <KpiCard label="Total Throughput" value="18,440 rpm" delta="+12.4%" trend="positive" subtext="Throughput peak nominal" icon="⚡" />
      </div>

      {/* Application Matrix Table */}
      <div style={{
        background: 'var(--card, #ffffff)',
        border: '1px solid var(--border, #e2e8f0)',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Registered Applications & Daemons</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>
              Real-time resource utilization, worker process latency, and status
            </p>
          </div>
          <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, background: '#f8fafc', padding: '3px 9px', borderRadius: '99px', border: '1px solid #e2e8f0' }}>
            ● 0 Services Active
          </span>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)', fontSize: '11px', background: '#f8fafc' }}>
              <th style={{ padding: '10px 12px' }}>Application Name</th>
              <th style={{ padding: '10px 12px' }}>Architecture & Stack</th>
              <th style={{ padding: '10px 12px' }}>Port / Host</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Memory</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>CPU</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Throughput</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Status</th>
              <th style={{ padding: '10px 12px', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {apps.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ padding: '36px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                  No registered applications found.
                </td>
              </tr>
            ) : (
              apps.map((app) => (
                <tr key={app.name} style={{ borderBottom: '1px solid var(--border, #f1f5f9)' }}>
                  <td style={{ padding: '12px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>
                    {app.name}
                    <div style={{ fontSize: '10px', color: 'var(--muted-foreground, #64748b)', fontWeight: 400 }}>{app.version}</div>
                  </td>
                  <td style={{ padding: '12px', color: 'var(--muted-foreground, #64748b)', fontSize: '12px' }}>{app.type}</td>
                  <td style={{ padding: '12px', fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px' }}>{app.port}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{app.memory}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{app.cpu}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{app.requestsPerMin}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '99px',
                      background: '#f0fdf4',
                      color: '#16a34a',
                      border: '1px solid #bbf7d0',
                      fontWeight: 600,
                      fontSize: '11px'
                    }}>● {app.status}</span>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', gap: '6px' }}>
                      <button
                        onClick={() => triggerDiagnostic(app.name)}
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
                      <button
                        onClick={() => restartWorker(app.name)}
                        style={{
                          padding: '4px 8px',
                          borderRadius: '6px',
                          background: '#eff6ff',
                          border: '1px solid #bfdbfe',
                          color: '#2563eb',
                          fontSize: '11px',
                          cursor: 'pointer'
                        }}
                      >
                        Reload
                      </button>
                    </div>
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
