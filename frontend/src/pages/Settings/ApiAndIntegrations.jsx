import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';
import { MOCK_INTEGRATIONS } from './mockSettingsData';

export default function ApiAndIntegrations() {
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);

  const apiKey = 'znv_live_9482bf7a810d2948cbb194208a002941e7f3';

  const cardStyle = {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '22px 24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    marginBottom: '18px'
  };

  const copyKey = () => {
    navigator.clipboard?.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DashboardLayout
      category="Settings"
      subcategory="API&Integrations"
      title="API&Integrations"
      subtitle="Connect EHR practice management systems, Tally ERP financial ledgers, WhatsApp Cloud, and logistics partners"
      icon="🔌"
      badge="10 Active Bridges"
      actions={
        <button
          onClick={() => alert('New Integration Connector provision wizard initiated...')}
          style={{
            padding: '7px 14px',
            borderRadius: '8px',
            border: '1px solid #2563eb',
            background: '#2563eb',
            color: '#ffffff',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          + Add Integration Bridge
        </button>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '18px' }}>
        <KpiCard label="Connected Microservices" value="10 Bridges" delta="100% Operational" trend="up" subtext="No connection timeouts" icon="🔌" />
        <KpiCard label="Overall Bridge Uptime" value="99.96%" delta="High Availability" trend="up" subtext="Over past 30 days" icon="⚡" />
        <KpiCard label="Daily API Throughput" value="1.42M Calls" delta="Avg 18ms latency" trend="up" subtext="Distributed Redis gateway" icon="📊" />
        <KpiCard label="Webhook Delivery Rate" value="99.98%" delta="< 500ms ack" trend="up" subtext="Automatic exponential retry" icon="📡" />
      </div>

      {/* Production API Credentials */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>🔑 Production API Credentials & Signing Secret</h3>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#64748b' }}>Rate limited to 1,000 requests per minute with signed HMAC SHA-256 header verification</p>
          </div>
          <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', background: '#ecfdf5', color: '#047857' }}>
            Production Key Active
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type={showKey ? 'text' : 'password'}
            value={apiKey}
            readOnly
            style={{
              flex: '1',
              minWidth: '280px',
              padding: '10px 14px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              background: '#f8fafc',
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '13px',
              color: '#0f172a',
              outline: 'none'
            }}
          />
          <button
            onClick={() => setShowKey(!showKey)}
            style={{
              padding: '10px 14px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              background: '#ffffff',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {showKey ? '🙈 Hide' : '👁️ Reveal'}
          </button>
          <button
            onClick={copyKey}
            style={{
              padding: '10px 14px',
              borderRadius: '8px',
              border: '1px solid #2563eb',
              background: '#2563eb',
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {copied ? '✓ Copied' : '📋 Copy Key'}
          </button>
        </div>
      </div>

      {/* Connected Integrations Table */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>🔌 Active Webhook & Microservice Bridges</h3>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#64748b' }}>Live operational status across payment rails, communications, logistics, and clinical software</p>
          </div>
          <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', background: '#ecfdf5', color: '#047857' }}>
            10 Connected
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569', fontSize: '12px' }}>
                <th style={{ padding: '12px 14px' }}>Integration Connector</th>
                <th style={{ padding: '12px 14px' }}>Service Type</th>
                <th style={{ padding: '12px 14px' }}>Status</th>
                <th style={{ padding: '12px 14px' }}>Uptime</th>
                <th style={{ padding: '12px 14px' }}>Last Synchronized</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_INTEGRATIONS.map((it, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: '#0f172a' }}>{it.name}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '4px', background: '#eff6ff', color: '#1d4ed8' }}>
                      {it.type}
                    </span>
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', background: '#ecfdf5', color: '#047857' }}>
                      ● {it.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 14px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600, color: '#059669' }}>{it.uptime}</td>
                  <td style={{ padding: '12px 14px', color: '#64748b', fontSize: '12px', fontFamily: '"IBM Plex Mono", monospace' }}>{it.lastSync}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
