import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function CrmStatus() {
  const [connectors, setConnectors] = useState([
  {
    "name": "Zoho CRM Master Pet Records",
    "endpoint": "https://crm.zoho.com/api/v2/contacts",
    "type": "Core Contact & Pet Profile Master",
    "role": "Core Contact & Pet Profile Master",
    "volume": "142,850 Records",
    "syncedContacts": "142,850 Records",
    "freq": "Real-time Webhook",
    "syncFrequency": "Real-time Webhook",
    "lastSync": "Just now (2s ago)",
    "tokenExpiry": "Valid (OAuth 84d)",
    "status": "SYNCHRONIZED"
  },
  {
    "name": "Salesforce Health Cloud Vets",
    "endpoint": "https://healthcloud.salesforce.com/v58",
    "type": "Hospital Enterprise Vets Directory",
    "role": "Hospital Enterprise Vets Directory",
    "volume": "1,420 Vets",
    "syncedContacts": "1,420 Vets",
    "freq": "Hourly Delta Batch",
    "syncFrequency": "Hourly Delta Batch",
    "lastSync": "14 mins ago",
    "tokenExpiry": "Valid (OAuth 52d)",
    "status": "SYNCHRONIZED"
  },
  {
    "name": "HubSpot Marketing Leads",
    "endpoint": "https://api.hubapi.com/crm/v3/deals",
    "type": "Lead Scoring & Acquisition Pipeline",
    "role": "Lead Scoring & Acquisition Pipeline",
    "volume": "48,200 Leads",
    "syncedContacts": "48,200 Leads",
    "freq": "15 Mins Polling",
    "syncFrequency": "15 Mins Polling",
    "lastSync": "4 mins ago",
    "tokenExpiry": "Valid (API Key)",
    "status": "SYNCHRONIZED"
  },
  {
    "name": "Zendesk VIP Customer Support",
    "endpoint": "https://zenve.zendesk.com/api/v2/tickets",
    "type": "Omnichannel VIP Escalations",
    "role": "Omnichannel VIP Escalations",
    "volume": "12,400 Tickets",
    "syncedContacts": "12,400 Tickets",
    "freq": "Sub-second WebSocket",
    "syncFrequency": "Sub-second WebSocket",
    "lastSync": "Just now (1s ago)",
    "tokenExpiry": "Valid (OAuth 120d)",
    "status": "SYNCHRONIZED"
  },
  {
    "name": "Freshdesk Clinic OPD Tickets",
    "endpoint": "https://zenve-opd.freshdesk.com/api/v2",
    "type": "In-Clinic Front Desk Triage",
    "role": "In-Clinic Front Desk Triage",
    "volume": "24,800 Encounters",
    "syncedContacts": "24,800 Encounters",
    "freq": "5 Mins Polling",
    "syncFrequency": "5 Mins Polling",
    "lastSync": "2 mins ago",
    "tokenExpiry": "Valid (API Key)",
    "status": "SYNCHRONIZED"
  },
  {
    "name": "Klaviyo Lifecycle Segments",
    "endpoint": "https://a.klaviyo.com/api/profiles",
    "type": "Pet Food Subscription Lifecycle",
    "role": "Pet Food Subscription Lifecycle",
    "volume": "84,000 Profiles",
    "syncedContacts": "84,000 Profiles",
    "freq": "Hourly Sync",
    "syncFrequency": "Hourly Sync",
    "lastSync": "28 mins ago",
    "tokenExpiry": "Valid (Bearer 90d)",
    "status": "SYNCHRONIZED"
  },
  {
    "name": "MoEngage Push Notification CRM",
    "endpoint": "https://api.moengage.com/v1/customers",
    "type": "Behavioral Retention Triggers",
    "role": "Behavioral Retention Triggers",
    "volume": "118,500 Devices",
    "syncedContacts": "118,500 Devices",
    "freq": "Real-time Event Stream",
    "syncFrequency": "Real-time Event Stream",
    "lastSync": "Sub-second stream",
    "tokenExpiry": "Valid (API Key)",
    "status": "SYNCHRONIZED"
  },
  {
    "name": "WhatsApp Business CRM Connector",
    "endpoint": "https://api.gupshup.io/wa/crm/v1",
    "type": "WhatsApp Chatbot & Tele-Consults",
    "role": "WhatsApp Chatbot & Tele-Consults",
    "volume": "96,200 Chats",
    "syncedContacts": "96,200 Chats",
    "freq": "Real-time Inbound",
    "syncFrequency": "Real-time Inbound",
    "lastSync": "Just now (4s ago)",
    "tokenExpiry": "Valid (System Token)",
    "status": "SYNCHRONIZED"
  },
  {
    "name": "CleverTap Pet Parent Retention",
    "endpoint": "https://api.clevertap.com/1/upload",
    "type": "Churn Prediction & Win-Back",
    "role": "Churn Prediction & Win-Back",
    "volume": "72,400 Segments",
    "syncedContacts": "72,400 Segments",
    "freq": "Daily Recalibration",
    "syncFrequency": "Daily Recalibration",
    "lastSync": "45 mins ago",
    "tokenExpiry": "Valid (Passcode)",
    "status": "SYNCHRONIZED"
  },
  {
    "name": "LeadSquared B2B Franchise Leads",
    "endpoint": "https://api.leadsquared.com/v2/Lead",
    "type": "B2B Veterinary Clinic Partnerships",
    "role": "B2B Veterinary Clinic Partnerships",
    "volume": "3,450 Franchisees",
    "syncedContacts": "3,450 Franchisees",
    "freq": "30 Mins Polling",
    "syncFrequency": "30 Mins Polling",
    "lastSync": "12 mins ago",
    "tokenExpiry": "Valid (Access Key)",
    "status": "SYNCHRONIZED"
  }
]);

  const [toast, setToast] = useState('');

  const syncNow = (name) => {
    setToast(`Forced differential sync queued for ${name}. Processing 0 delta records.`);
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <DashboardLayout
      category="System Health"
      subcategory="CRM Status"
      title="CRM Integrations & Contact Sync Health"
      subtitle="HubSpot, Freshdesk & Salesforce connectors, contact sync queues, webhook listeners & auth status"
      icon="👥"
      badge=""
      actions={
        <button
          onClick={() => {
            setToast('Triggered CRM contact reconciliation.');
            setTimeout(() => setToast('Reconciliation finished: 0 contacts matched.'), 2500);
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
          🔄 Re-sync All Contacts
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
        <KpiCard label="Synced Pet Profiles" value="142,850" delta="+4,200" trend="positive" subtext="CRM sync master" icon="🐾" />
        <KpiCard label="Sync Lag" value="0.8 s" delta="-0.4s" trend="positive" subtext="Webhook pipeline" icon="⚡" />
        <KpiCard label="Failed Sync Payloads" value="0 Failed" delta="Optimal" trend="positive" subtext="Payload delivery nominal" icon="🟢" />
        <KpiCard label="API Quota Remaining" value="88.4%" delta="Safe" trend="positive" subtext="CRM daily quota" icon="📊" />
      </div>

      {/* CRM Connectors Table */}
      <div style={{
        background: 'var(--card, #ffffff)',
        border: '1px solid var(--border, #e2e8f0)',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Active CRM Connectors</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)', fontSize: '11px', background: '#f8fafc' }}>
              <th style={{ padding: '10px 12px' }}>Platform Name</th>
              <th style={{ padding: '10px 12px' }}>Role / Module</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Volume</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Frequency</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Last Run</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Token Status</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>State</th>
              <th style={{ padding: '10px 12px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {connectors.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ padding: '36px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                  No CRM connectors found.
                </td>
              </tr>
            ) : (
              connectors.map((c) => (
                <tr key={c.name} style={{ borderBottom: '1px solid var(--border, #f1f5f9)' }}>
                  <td style={{ padding: '12px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>
                    {c.name}
                    <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #64748b)', fontFamily: '"IBM Plex Mono", monospace' }}>{c.endpoint}</div>
                  </td>
                  <td style={{ padding: '12px', color: 'var(--muted-foreground, #64748b)' }}>{c.type}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{c.syncedContacts}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>{c.syncFrequency}</td>
                  <td style={{ padding: '12px', textAlign: 'right', color: '#16a34a', fontFamily: '"IBM Plex Mono", monospace' }}>{c.lastSync}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontSize: '11px', color: 'var(--muted-foreground, #64748b)' }}>{c.tokenExpiry}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '99px', background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', fontWeight: 600, fontSize: '11px' }}>
                      ● {c.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <button
                      onClick={() => syncNow(c.name)}
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
                      Sync Now
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
