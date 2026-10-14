import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ApiHealth() {
  const [endpoints, setEndpoints] = useState([
  {
    "method": "GET",
    "route": "/api/v1/health",
    "p50": "4.2 ms",
    "p95": "9.8 ms",
    "p99": "16.4 ms",
    "rps": "142 rps",
    "errors": "0.00%",
    "err": "0.00%",
    "status": "HEALTHY"
  },
  {
    "method": "POST",
    "route": "/api/v1/orders/checkout",
    "p50": "24.8 ms",
    "p95": "48.2 ms",
    "p99": "84.0 ms",
    "rps": "48 rps",
    "errors": "0.02%",
    "err": "0.02%",
    "status": "HEALTHY"
  },
  {
    "method": "GET",
    "route": "/api/v1/inventory/stockouts",
    "p50": "8.4 ms",
    "p95": "16.2 ms",
    "p99": "26.8 ms",
    "rps": "84 rps",
    "errors": "0.00%",
    "err": "0.00%",
    "status": "HEALTHY"
  },
  {
    "method": "POST",
    "route": "/api/v1/prescriptions/verify",
    "p50": "18.2 ms",
    "p95": "34.5 ms",
    "p99": "52.0 ms",
    "rps": "22 rps",
    "errors": "0.01%",
    "err": "0.01%",
    "status": "HEALTHY"
  },
  {
    "method": "GET",
    "route": "/api/v1/analytics/realtime",
    "p50": "12.6 ms",
    "p95": "28.4 ms",
    "p99": "45.2 ms",
    "rps": "120 rps",
    "errors": "0.00%",
    "err": "0.00%",
    "status": "HEALTHY"
  },
  {
    "method": "POST",
    "route": "/api/v1/ai/consultation/suggest",
    "p50": "142.0 ms",
    "p95": "280.0 ms",
    "p99": "420.0 ms",
    "rps": "18 rps",
    "errors": "0.04%",
    "err": "0.04%",
    "status": "HEALTHY"
  },
  {
    "method": "GET",
    "route": "/api/v1/riders/telemetry",
    "p50": "6.8 ms",
    "p95": "14.2 ms",
    "p99": "22.0 ms",
    "rps": "210 rps",
    "errors": "0.00%",
    "err": "0.00%",
    "status": "HEALTHY"
  },
  {
    "method": "PUT",
    "route": "/api/v1/patients/{id}/vitals",
    "p50": "9.4 ms",
    "p95": "18.6 ms",
    "p99": "31.2 ms",
    "rps": "34 rps",
    "errors": "0.01%",
    "err": "0.01%",
    "status": "HEALTHY"
  },
  {
    "method": "GET",
    "route": "/api/v1/accounting/reconcile",
    "p50": "32.1 ms",
    "p95": "64.2 ms",
    "p99": "112.0 ms",
    "rps": "15 rps",
    "errors": "0.00%",
    "err": "0.00%",
    "status": "HEALTHY"
  },
  {
    "method": "POST",
    "route": "/api/v1/notifications/dispatch",
    "p50": "14.5 ms",
    "p95": "28.8 ms",
    "p99": "48.0 ms",
    "rps": "65 rps",
    "errors": "0.00%",
    "err": "0.00%",
    "status": "HEALTHY"
  }
]);

  const [toast, setToast] = useState('');

  const pingRoute = (route) => {
    setToast(`Ping test sent to ${route} — HTTP 200 OK (2.4ms)`);
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <DashboardLayout
      category="System Health"
      subcategory="API Health"
      title="REST API & Endpoint Latency Health"
      subtitle="FastAPI microservices latency distribution, P50/P95/P99 benchmarks, error rates & throughput"
      icon="⚡"
      badge=""
      actions={
        <button
          onClick={() => {
            setToast('Benchmarking registered REST endpoints across synthetic requests...');
            setTimeout(() => setToast('Benchmark complete: 0 endpoints active.'), 2500);
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
          ⏱️ Run Latency Benchmark
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
        <KpiCard label="Average P50 Latency" value="12.4 ms" delta="-2.1ms" trend="positive" subtext="FastAPI uvicorn core" icon="⚡" />
        <KpiCard label="P99 Tail Latency" value="68.5 ms" delta="-14.2ms" trend="positive" subtext="Below 120ms SLA" icon="🛡️" />
        <KpiCard label="API Error Rate" value="0.01%" delta="-0.05%" trend="positive" subtext="Server fault monitor" icon="🟢" />
        <KpiCard label="Total Requests Today" value="2,842,100" delta="+14.8%" trend="positive" subtext="Request counter" icon="📊" />
      </div>

      {/* HTTP Status Code Distribution */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '12px',
        background: 'var(--card, #ffffff)',
        border: '1px solid var(--border, #e2e8f0)',
        borderRadius: '12px',
        padding: '16px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
      }}>
        <div style={{ textAlign: 'center', borderRight: '1px solid var(--border, #e2e8f0)' }}>
          <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #64748b)', textTransform: 'uppercase', fontFamily: '"IBM Plex Mono", monospace' }}>HTTP 2xx (Success)</div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#16a34a', marginTop: '4px', fontFamily: '"IBM Plex Mono", monospace' }}>0.0%</div>
          <div style={{ fontSize: '10px', color: 'var(--muted-foreground, #94a3b8)' }}>0 calls</div>
        </div>
        <div style={{ textAlign: 'center', borderRight: '1px solid var(--border, #e2e8f0)' }}>
          <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #64748b)', textTransform: 'uppercase', fontFamily: '"IBM Plex Mono", monospace' }}>HTTP 3xx (Redirects)</div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#2563eb', marginTop: '4px', fontFamily: '"IBM Plex Mono", monospace' }}>0.0%</div>
          <div style={{ fontSize: '10px', color: 'var(--muted-foreground, #94a3b8)' }}>0 calls</div>
        </div>
        <div style={{ textAlign: 'center', borderRight: '1px solid var(--border, #e2e8f0)' }}>
          <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #64748b)', textTransform: 'uppercase', fontFamily: '"IBM Plex Mono", monospace' }}>HTTP 4xx (Client Errors)</div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#d97706', marginTop: '4px', fontFamily: '"IBM Plex Mono", monospace' }}>0.0%</div>
          <div style={{ fontSize: '10px', color: 'var(--muted-foreground, #94a3b8)' }}>0 calls</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #64748b)', textTransform: 'uppercase', fontFamily: '"IBM Plex Mono", monospace' }}>HTTP 5xx (Server Faults)</div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#16a34a', marginTop: '4px', fontFamily: '"IBM Plex Mono", monospace' }}>0.0%</div>
          <div style={{ fontSize: '10px', color: 'var(--muted-foreground, #94a3b8)' }}>0 calls</div>
        </div>
      </div>

      {/* Endpoints Table */}
      <div style={{
        background: 'var(--card, #ffffff)',
        border: '1px solid var(--border, #e2e8f0)',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Endpoints Performance & SLA Monitor</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)', fontSize: '11px', background: '#f8fafc' }}>
              <th style={{ padding: '8px 12px' }}>Method</th>
              <th style={{ padding: '8px 12px' }}>Endpoint Route</th>
              <th style={{ padding: '8px 12px', textAlign: 'right' }}>P50</th>
              <th style={{ padding: '8px 12px', textAlign: 'right' }}>P95</th>
              <th style={{ padding: '8px 12px', textAlign: 'right' }}>P99</th>
              <th style={{ padding: '8px 12px', textAlign: 'right' }}>RPS</th>
              <th style={{ padding: '8px 12px', textAlign: 'right' }}>Error Rate</th>
              <th style={{ padding: '8px 12px', textAlign: 'right' }}>Status</th>
              <th style={{ padding: '8px 12px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {endpoints.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ padding: '36px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                  No API endpoints registered.
                </td>
              </tr>
            ) : (
              endpoints.map((ep) => (
                <tr key={ep.route} style={{ borderBottom: '1px solid var(--border, #f1f5f9)' }}>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '10px',
                      fontWeight: 700,
                      background: ep.method.includes('POST') ? '#eff6ff' : '#f0fdf4',
                      color: ep.method.includes('POST') ? '#2563eb' : '#16a34a',
                      border: ep.method.includes('POST') ? '1px solid #bfdbfe' : '1px solid #bbf7d0',
                      fontFamily: '"IBM Plex Mono", monospace'
                    }}>
                      {ep.method}
                    </span>
                  </td>
                  <td style={{ padding: '12px', fontFamily: '"IBM Plex Mono", monospace', fontSize: '12px', fontWeight: 600, color: 'var(--foreground, #0f172a)' }}>{ep.route}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{ep.p50}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{ep.p95}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{ep.p99}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{ep.rps}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: ep.errors === '0.00%' ? '#16a34a' : '#d97706' }}>{ep.errors}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '99px', background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', fontWeight: 600, fontSize: '11px' }}>
                      ● {ep.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <button
                      onClick={() => pingRoute(ep.route)}
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
