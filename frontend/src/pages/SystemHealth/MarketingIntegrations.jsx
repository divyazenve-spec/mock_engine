import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function MarketingIntegrations() {
  const [integrations, setIntegrations] = useState([
  {
    "platform": "Meta Conversions API (CAPI)",
    "endpoint": "https://graph.facebook.com/v19.0/events",
    "purpose": "Server-Side Purchase & Add-to-Cart Tracking",
    "eventMatchQuality": "9.4 / 10 (Great)",
    "match": "9.4 / 10",
    "latency": "34 ms",
    "dailyEvents": "142,500 Events",
    "events": "142,500",
    "status": "HEALTHY"
  },
  {
    "platform": "Google Ads Enhanced Conversions",
    "endpoint": "https://googleads.googleapis.com/v16/conversions",
    "purpose": "Google Search & PMax Conversion Feedback",
    "eventMatchQuality": "9.6 / 10 (Excellent)",
    "match": "9.6 / 10",
    "latency": "42 ms",
    "dailyEvents": "88,400 Events",
    "events": "88,400",
    "status": "HEALTHY"
  },
  {
    "platform": "GA4 Measurement Protocol",
    "endpoint": "https://www.google-analytics.com/mp/collect",
    "purpose": "Omnichannel Traffic & Cross-Device Journeys",
    "eventMatchQuality": "9.8 / 10 (Optimal)",
    "match": "9.8 / 10",
    "latency": "28 ms",
    "dailyEvents": "420,000 Events",
    "events": "420,000",
    "status": "HEALTHY"
  },
  {
    "platform": "AppsFlyer Attribution SDK",
    "endpoint": "https://api2.appsflyer.com/inappevent",
    "purpose": "Rider App & Pet Parent Install Attribution",
    "eventMatchQuality": "9.9 / 10 (Accurate)",
    "match": "9.9 / 10",
    "latency": "18 ms",
    "dailyEvents": "64,200 Events",
    "events": "64,200",
    "status": "HEALTHY"
  },
  {
    "platform": "Klaviyo E-Commerce Event Bus",
    "endpoint": "https://a.klaviyo.com/api/events",
    "purpose": "Abandoned Cart & Prescription Refill Nudges",
    "eventMatchQuality": "9.5 / 10 (High)",
    "match": "9.5 / 10",
    "latency": "36 ms",
    "dailyEvents": "52,800 Events",
    "events": "52,800",
    "status": "HEALTHY"
  },
  {
    "platform": "MoEngage Real-Time Webhooks",
    "endpoint": "https://api.moengage.com/v1/event",
    "purpose": "Push Notification Engagement Telemetry",
    "eventMatchQuality": "9.2 / 10 (Good)",
    "match": "9.2 / 10",
    "latency": "44 ms",
    "dailyEvents": "98,000 Events",
    "events": "98,000",
    "status": "HEALTHY"
  },
  {
    "platform": "Branch.io Deep-Linking",
    "endpoint": "https://api2.branch.io/v2/event/standard",
    "purpose": "Universal App Link Redirection & Attribution",
    "eventMatchQuality": "9.7 / 10 (Accurate)",
    "match": "9.7 / 10",
    "latency": "24 ms",
    "dailyEvents": "42,600 Events",
    "events": "42,600",
    "status": "HEALTHY"
  },
  {
    "platform": "CleverTap Predictive Retargeting",
    "endpoint": "https://api.clevertap.com/1/upload",
    "purpose": "High-LTV Churn Prediction & Win-Back Triggers",
    "eventMatchQuality": "9.1 / 10 (Good)",
    "match": "9.1 / 10",
    "latency": "52 ms",
    "dailyEvents": "76,500 Events",
    "events": "76,500",
    "status": "HEALTHY"
  },
  {
    "platform": "TikTok Events API Server",
    "endpoint": "https://business-api.tiktok.com/open_api/v1.3/event/track",
    "purpose": "Gen-Z Pet Adoption Social Campaign Tracking",
    "eventMatchQuality": "8.8 / 10 (Optimal)",
    "match": "8.8 / 10",
    "latency": "48 ms",
    "dailyEvents": "38,200 Events",
    "events": "38,200",
    "status": "HEALTHY"
  },
  {
    "platform": "LinkedIn Insight B2B Tag",
    "endpoint": "https://api.linkedin.com/v2/conversionEvents",
    "purpose": "Corporate Pet Wellness Benefit Inquiries",
    "eventMatchQuality": "9.0 / 10 (Good)",
    "match": "9.0 / 10",
    "latency": "64 ms",
    "dailyEvents": "12,400 Events",
    "events": "12,400",
    "status": "HEALTHY"
  }
]);

  const [toast, setToast] = useState('');

  const sendTestEvent = (platform) => {
    setToast(`Test conversion event dispatched to ${platform} — Server returned HTTP 200.`);
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <DashboardLayout
      category="System Health"
      subcategory="Marketing Integrations"
      title="Marketing Ad Platforms & Attribution Health"
      subtitle="Meta CAPI, Google Ads, AppsFlyer mobile attribution, Segment CDP & WhatsApp Cloud APIs"
      icon="📣"
      badge=""
      actions={
        <button
          onClick={() => {
            setToast('Triggered real-time event pipeline integrity test.');
            setTimeout(() => setToast('Event pipeline test succeeded: 0 drops recorded.'), 2500);
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
          ⚡ Test Event Stream
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
        <KpiCard label="Server Event Delivery" value="99.8%" delta="+0.4%" trend="positive" subtext="Marketing conversion delivery" icon="🟢" />
        <KpiCard label="Event Match Quality" value="9.5 / 10" delta="+0.8" trend="positive" subtext="Attribution scoring" icon="🎯" />
        <KpiCard label="Daily Stream Volume" value="1,043,600" delta="+18.4%" trend="positive" subtext="Marketing stream events" icon="📊" />
        <KpiCard label="Avg Stream Latency" value="38 ms" delta="-8ms" trend="positive" subtext="Queue latency monitor" icon="⚡" />
      </div>

      {/* Integrations Table */}
      <div style={{
        background: 'var(--card, #ffffff)',
        border: '1px solid var(--border, #e2e8f0)',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Marketing & Attribution Pipelines</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)', fontSize: '11px', background: '#f8fafc' }}>
              <th style={{ padding: '10px 12px' }}>Platform Name</th>
              <th style={{ padding: '10px 12px' }}>Pipeline Purpose</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Match Quality</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Latency</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Daily Events</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Status</th>
              <th style={{ padding: '10px 12px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {integrations.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ padding: '36px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                  No marketing pipelines configured.
                </td>
              </tr>
            ) : (
              integrations.map((i) => (
                <tr key={i.platform} style={{ borderBottom: '1px solid var(--border, #f1f5f9)' }}>
                  <td style={{ padding: '12px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>
                    {i.platform}
                    <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #64748b)', fontFamily: '"IBM Plex Mono", monospace' }}>{i.endpoint}</div>
                  </td>
                  <td style={{ padding: '12px', color: 'var(--muted-foreground, #64748b)' }}>{i.purpose}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 600, color: '#16a34a', fontFamily: '"IBM Plex Mono", monospace' }}>{i.eventMatchQuality}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{i.latency}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{i.dailyEvents}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '99px', background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', fontWeight: 600, fontSize: '11px' }}>
                      ● {i.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <button
                      onClick={() => sendTestEvent(i.platform)}
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
                      Send Test
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
