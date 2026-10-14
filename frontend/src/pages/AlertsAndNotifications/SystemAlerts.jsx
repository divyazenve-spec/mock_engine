import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function SystemAlerts() {
  const [alerts, setAlerts] = useState([
  {
    "id": "SYS-901",
    "title": "REST API Gateway P99 Latency Crossed 240ms SLA",
    "service": "Kong API Gateway / AWS Mumbai",
    "severity": "Critical",
    "status": "Active",
    "metric": "P99 Latency: 284ms (Baseline: 84ms)",
    "impact": "Mobile checkout screen lag during evening traffic peak",
    "time": "10 mins ago"
  },
  {
    "id": "SYS-902",
    "title": "SQLite WAL Mode Database Lock Contention Warning",
    "service": "Edge Mock Analytical Engine",
    "severity": "High Warning",
    "status": "Active",
    "metric": "14 Pending Write Locks Queued > 2,000ms",
    "impact": "Real-time dashboard KPI metrics refresh delayed",
    "time": "18 mins ago"
  },
  {
    "id": "SYS-903",
    "title": "Google Gemini 1.5 Pro AI Token Rate Limit Warning",
    "service": "AI Veterinary Assistant Engine",
    "severity": "High Warning",
    "status": "Active",
    "metric": "Quota Consumption: 88.4% of Per-Minute Token Limit",
    "impact": "Clinical diagnostic copilot prompts experiencing fallback delay",
    "time": "25 mins ago"
  },
  {
    "id": "SYS-904",
    "title": "Enterprise SAP ERP Connector CDC Pipeline Lagging",
    "service": "Apache Kafka / Debezium CDC",
    "severity": "Warning",
    "status": "Active",
    "metric": "Replication Lag: 8.4 Mins (Threshold: 2.0 Mins)",
    "impact": "ERP general ledger synchronization out of sync with POS",
    "time": "35 mins ago"
  },
  {
    "id": "SYS-905",
    "title": "Redis In-Memory Session Cache Memory Utilization at 89%",
    "service": "Redis Cluster (AWS ElastiCache)",
    "severity": "High Warning",
    "status": "Active",
    "metric": "Used Memory: 7.12 GB / 8.00 GB Max",
    "impact": "Risk of key eviction on active customer shopping carts",
    "time": "45 mins ago"
  },
  {
    "id": "SYS-906",
    "title": "IoT Cold-Chain Telemetry Broker MQTT Connection Drops",
    "service": "AWS IoT Core / MQTT Broker",
    "severity": "Critical",
    "status": "Active",
    "metric": "18 Vaccine Chiller Sensors Disconnected in BLR",
    "impact": "Gaps in temperature audit trail for drug regulator",
    "time": "55 mins ago"
  },
  {
    "id": "SYS-907",
    "title": "Elasticsearch Clinical Records Index Disk Storage at 84%",
    "service": "Elasticsearch OpenSearch Cluster",
    "severity": "Warning",
    "status": "Active",
    "metric": "Disk Free: 32 GB on Primary Node B",
    "impact": "Need snapshot archival of 2024 historical medical records",
    "time": "1 hr ago"
  },
  {
    "id": "SYS-908",
    "title": "External SendGrid Email Webhook SSL Certificate Expiry Alert",
    "service": "Transactional Email Gateway",
    "severity": "Warning",
    "status": "Active",
    "metric": "TLS Certificate Expires in 7 Days",
    "impact": "Risk of automated patient receipt email delivery stalling",
    "time": "2 hrs ago"
  },
  {
    "id": "SYS-909",
    "title": "S3 Medical Imaging DICOM Bucket Write Latency Anomaly",
    "service": "AWS S3 Mumbai (ap-south-1)",
    "severity": "Warning",
    "status": "Active",
    "metric": "PUT Latency: 1,840ms (>300ms SLA)",
    "impact": "Veterinary radiologist upload of X-ray studies delayed",
    "time": "3 hrs ago"
  },
  {
    "id": "SYS-910",
    "title": "Cloudflare Edge DDoS Scraper Attack Mitigated",
    "service": "Cloudflare WAF / Bot Management",
    "severity": "Critical",
    "status": "Resolved",
    "metric": "14,200 Scraper Requests Blocked in 5 Mins",
    "impact": "Resolved: Challenge mode engaged on pricing APIs",
    "time": "4 hrs ago"
  }
]);

  const [toast, setToast] = useState('');

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleAction = (id, act) => {
    triggerToast(`DevOps action "${act}" executed for ${id}.`);
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'Resolved' } : a));
  };

  return (
    <DashboardLayout
      category="Alerts & Notifications"
      subcategory="System Alerts"
      title="System Health, API & Infrastructure Alerts"
      subtitle="Monitoring FastAPI latency spikes, SQLite database concurrency locks, Gemini AI quotas, and ERP financial synchronization"
      icon="🖥️"
      badge=""
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => triggerToast('FastAPI worker thread pools flushed and restarted gracefully.')}
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
            ⚡ Flush Worker Pools
          </button>
          <button
            onClick={() => triggerToast('Forced bidirectional Tally Prime sync handshake via secure tunnel.')}
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
            🔄 Force ERP Sync
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
          label="API Gateway P99 Latency"
          value="84 ms"
          delta="-22ms"
          trend="positive"
          subtext="Below 120ms SLA"
          icon="⚡"
        />
        <KpiCard
          label="Database WAL Contention"
          value="0 Queued"
          delta="Optimal"
          trend="positive"
          subtext="WAL mode clear"
          icon="🗄️"
        />
        <KpiCard
          label="Gemini AI Quota Headroom"
          value="82.4%"
          delta="Safe"
          trend="positive"
          subtext="Enterprise tier ok"
          icon="🤖"
        />
        <KpiCard
          label="ERP Connector Status"
          value="0.4 mins Lag"
          delta="-1.8m"
          trend="positive"
          subtext="CDC pipeline live"
          icon="🔌"
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
          Infrastructure Telemetry, Database & API Exception Watch
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {alerts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '36px', color: 'var(--muted-foreground, #94a3b8)', fontSize: '13px' }}>
              No infrastructure exceptions or API alerts detected. All systems green.
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
                    Service: <strong style={{ color: 'var(--foreground, #f8fafc)' }}>{a.service}</strong>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: a.severity === 'Critical' ? '#ef4444' : '#fbbf24' }}>
                    {a.metric}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)', marginTop: '2px' }}>
                    Status: <strong style={{ color: a.status === 'Resolved' ? '#10b981' : '#38bdf8' }}>{a.status}</strong>
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>
                <strong>User / Business Impact:</strong> {a.impact}
              </div>

              {a.status !== 'Resolved' && (
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', paddingTop: '4px' }}>
                  {a.id === 'SYS-901' && (
                    <button
                      onClick={() => handleAction(a.id, 'Scaled up Uvicorn workers from 4 to 8 instances')}
                      style={{ padding: '6px 14px', borderRadius: '6px', background: 'var(--primary, #3b82f6)', color: '#fff', border: 'none', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Scale Worker Instances
                    </button>
                  )}
                  {a.id === 'SYS-902' && (
                    <button
                      onClick={() => handleAction(a.id, 'Executed SQLite PRAGMA wal_checkpoint(TRUNCATE)')}
                      style={{ padding: '6px 14px', borderRadius: '6px', background: '#10b981', color: '#fff', border: 'none', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Truncate WAL Checkpoint
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
