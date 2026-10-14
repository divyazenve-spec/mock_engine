import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ConversionFunnel() {
  const funnelSteps = [
  {
    "stage": "1. Ad Impressions & Brand Discovery",
    "volume": "1,840,000",
    "convRate": "100%",
    "width": "100%",
    "color": "#2563eb",
    "channelLead": "Meta Ads & YouTube",
    "dropPct": "\u2014"
  },
  {
    "stage": "2. Landing Page & Clinic Site Visits",
    "volume": "184,500",
    "convRate": "10.0%",
    "width": "72%",
    "color": "#3b82f6",
    "channelLead": "Google PPC & Organic SEO",
    "dropPct": "90.0%"
  },
  {
    "stage": "3. Service or Medication Page Viewed",
    "volume": "74,200",
    "convRate": "40.2%",
    "width": "55%",
    "color": "#60a5fa",
    "channelLead": "Clinical Landing Pages",
    "dropPct": "59.8%"
  },
  {
    "stage": "4. Veterinary Consult or Cart Initiated",
    "volume": "18,400",
    "convRate": "24.8%",
    "width": "40%",
    "color": "#0ea5e9",
    "channelLead": "WhatsApp & In-App Booking",
    "dropPct": "75.2%"
  },
  {
    "stage": "5. Slot Scheduled or Prescription Uploaded",
    "volume": "7,850",
    "convRate": "42.7%",
    "width": "30%",
    "color": "#06b6d4",
    "channelLead": "Zenve Tele-Vet Engine",
    "dropPct": "57.3%"
  },
  {
    "stage": "6. Payment Completed & Order Confirmed",
    "volume": "3,420",
    "convRate": "43.6%",
    "width": "22%",
    "color": "#10b981",
    "channelLead": "Razorpay / UPI Gateway",
    "dropPct": "56.4%"
  },
  {
    "stage": "7. Post-Care Repeat Order (30 Days)",
    "volume": "1,310",
    "convRate": "38.3%",
    "width": "16%",
    "color": "#059669",
    "channelLead": "CRM Auto-Refill Triggers",
    "dropPct": "61.7%"
  }
];

  return (
    <DashboardLayout
      category="Marketing"
      subcategory="Conversion Funnel"
      title="Full Omni-Channel Conversion Funnel"
      subtitle="Visitor journey tracking, step-by-step conversion drop-offs, booking completion, and 30-day repeat reorder rates"
      icon="⚡"
      badge="1.85% Full Funnel Velocity"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Top of Funnel" value="1.84M" delta="+16.5% MoM" trend="up" subtext="Impressions across ads" icon="👁️" />
        <KpiCard label="Click-to-Install" value="8.8%" delta="High app intent" trend="up" subtext="App Store / Play Store" icon="📲" />
        <KpiCard label="Cart-to-Paid" value="43.6%" delta="+3.8% MoM" trend="up" subtext="Checkout conversion flow" icon="🛒" />
        <KpiCard label="Converted Buyers" value="3,420" delta="1.85% End-to-End" trend="up" subtext="Paying pet parents" icon="🎉" />
      </div>

      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Full Omni-Channel Conversion Funnel</h3>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Step-by-step visitor progression from initial ad view down to completed veterinary appointment</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {funnelSteps.map((s, idx) => (
            <div key={s.stage} style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: s.color,
                    color: '#ffffff',
                    fontSize: '12px',
                    fontWeight: 700
                  }}>
                    {idx + 1}
                  </span>
                  <span style={{ fontWeight: 700, fontSize: '14px', color: '#0f172a' }}>{s.stage}</span>
                </div>
                <div>
                  <span style={{ fontWeight: 700, fontSize: '16px', color: '#0f172a', fontFamily: '"IBM Plex Mono", monospace' }}>{s.volume}</span>
                  <span style={{ marginLeft: '8px', fontSize: '12px', color: '#16a34a', fontWeight: 600 }}>({s.convRate})</span>
                </div>
              </div>
              <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden', marginBottom: '8px' }}>
                <div style={{ width: s.width, height: '100%', background: s.color, borderRadius: '9999px' }}></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748b' }}>
                <span>Key Driver: <b style={{ color: '#334155' }}>{s.channelLead}</b></span>
                {s.dropPct !== '—' ? (
                  <span style={{ color: '#dc2626', fontWeight: 600 }}>Drop-off: {s.dropPct}</span>
                ) : (
                  <span style={{ color: '#16a34a', fontWeight: 600 }}>Top of Funnel Baseline</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
