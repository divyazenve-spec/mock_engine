import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function AppAnalytics() {
  const osMetrics = [
  {
    "platform": "Android (Google Play)",
    "installs": "18,450",
    "dau": "4,820",
    "rating": "4.8 ★"
  },
  {
    "platform": "iOS (Apple App Store)",
    "installs": "12,950",
    "dau": "3,940",
    "rating": "4.9 ★"
  }
];
  const appActions = [
  {
    "action": "Pet Profile Registration (Breed/Age/Weight)",
    "volume": "14,250 events",
    "completion": "94.2%",
    "change": "+5.8% MoM"
  },
  {
    "action": "Vaccination Reminder Alert Acknowledgement",
    "volume": "11,800 alerts",
    "completion": "88.6%",
    "change": "+4.1% MoM"
  },
  {
    "action": "Instant Tele-Vet Video Call Initiated",
    "volume": "4,620 calls",
    "completion": "96.4%",
    "change": "+8.2% MoM"
  },
  {
    "action": "E-Prescription Refill Order Placed",
    "volume": "6,840 orders",
    "completion": "91.2%",
    "change": "+6.9% MoM"
  },
  {
    "action": "Digital Medical Record (DMR) Download",
    "volume": "5,910 downloads",
    "completion": "97.5%",
    "change": "+3.4% MoM"
  },
  {
    "action": "Diagnostic Lab Home Sample Scheduled",
    "volume": "2,480 bookings",
    "completion": "84.8%",
    "change": "+9.1% MoM"
  },
  {
    "action": "Puppy Deworming & Diet Log Tracked",
    "volume": "8,950 logs",
    "completion": "89.3%",
    "change": "+7.5% MoM"
  },
  {
    "action": "Emergency Ambulance Dispatch Triggered",
    "volume": "410 dispatches",
    "completion": "99.1%",
    "change": "+12.0% MoM"
  },
  {
    "action": "Surgical Post-Op Video Followup Logged",
    "volume": "1,260 sessions",
    "completion": "93.8%",
    "change": "+4.6% MoM"
  },
  {
    "action": "Pet Parent Community Q&A Participated",
    "volume": "9,420 queries",
    "completion": "86.0%",
    "change": "+11.3% MoM"
  }
];

  return (
    <DashboardLayout
      category="Marketing"
      subcategory="App Analytics"
      title="Mobile App Acquisition & Product Analytics"
      subtitle="Android & iOS store installs, daily active users (DAU/MAU), and in-app pet health actions"
      icon="📱"
      badge="31.4K Active App Users"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total App Downloads" value="31,400" delta="+18.4% MoM" trend="up" subtext="Android (58%) · iOS (42%)" icon="📲" />
        <KpiCard label="Daily Active Users" value="8,760" delta="27.9%" trend="up" subtext="DAU / MAU ratio" icon="⚡" />
        <KpiCard label="Monthly Active Users" value="31,400" delta="+14.6% MoM" trend="up" subtext="Active pet parents" icon="🐾" />
        <KpiCard label="App Store Rating" value="4.85 ★" delta="+0.12" trend="up" subtext="4,820 verified reviews" icon="⭐" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '16px' }}>
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
          <h3 style={{ margin: '0 0 14px', fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Platform Distribution (Android vs iOS)</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', color: '#64748b', fontSize: '11px', textTransform: 'uppercase' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Platform</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Installs</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>DAU</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Rating</th>
              </tr>
            </thead>
            <tbody>
              {osMetrics.map(m => (
                <tr key={m.platform} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px', fontWeight: 600 }}>{m.platform}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{m.installs}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{m.dau}</td>
                  <td style={{ padding: '12px', textAlign: 'right', color: '#16a34a', fontWeight: 600 }}>{m.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
          <h3 style={{ margin: '0 0 14px', fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>In-App Veterinary Milestone Completion</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {appActions.map(a => (
              <div key={a.action} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: '#f8fafc', borderRadius: '8px' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '13px', color: '#0f172a' }}>{a.action}</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>{a.volume}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 700, fontSize: '13px', color: '#2563eb' }}>{a.completion}</div>
                  <div style={{ fontSize: '11px', color: '#16a34a' }}>{a.change}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
