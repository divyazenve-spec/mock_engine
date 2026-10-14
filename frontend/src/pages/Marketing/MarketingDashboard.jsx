import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';
import Campaigns from './Campaigns';
import Leads from './Leads';
import LeadSources from './LeadSources';
import WebsiteAnalytics from './WebsiteAnalytics';
import AppAnalytics from './AppAnalytics';
import SocialMedia from './SocialMedia';
import Advertising from './Advertising';
import MarketingSpend from './MarketingSpend';
import CustomerAcquisition from './CustomerAcquisition';
import CAC from './CAC';
import ROAS from './ROAS';
import MarketingROI from './MarketingROI';
import ConversionFunnel from './ConversionFunnel';

export default function MarketingDashboard() {
  const [activeSubcategory, setActiveSubcategory] = useState('overview');

  const subcategories = [
    { id: 'campaigns', label: 'Campaigns', icon: '🚀' },
    { id: 'leads', label: 'Leads', icon: '🎯' },
    { id: 'lead-sources', label: 'Lead Sources', icon: '🌐' },
    { id: 'website-analytics', label: 'Website Analytics', icon: '💻' },
    { id: 'app-analytics', label: 'App Analytics', icon: '📱' },
    { id: 'social-media', label: 'Social Media', icon: '📸' },
    { id: 'advertising', label: 'Advertising', icon: '📢' },
    { id: 'marketing-spend', label: 'Marketing Spend', icon: '💰' },
    { id: 'customer-acquisition', label: 'Customer Acquisition', icon: '🐾' },
    { id: 'cac', label: 'CAC', icon: '🎯' },
    { id: 'roas', label: 'ROAS', icon: '🚀' },
    { id: 'marketing-roi', label: 'Marketing ROI', icon: '💎' },
    { id: 'conversion-funnel', label: 'Conversion Funnel', icon: '⚡' },
  ];

  const topChannels = [
  {
    "name": "Google Search PPC (High Intent)",
    "visitors": "48,200",
    "leads": "2,410",
    "convRate": "5.00%",
    "spend": "₹68,500",
    "cac": "₹284",
    "quality": "9.4 / 10",
    "share": "28.5%",
    "roas": "6.8x"
  },
  {
    "name": "Meta Ads (Instagram & FB Reels)",
    "visitors": "64,500",
    "leads": "2,180",
    "convRate": "3.38%",
    "spend": "₹62,000",
    "cac": "₹284",
    "quality": "8.6 / 10",
    "share": "25.8%",
    "roas": "5.9x"
  },
  {
    "name": "Pet Parent Referral Program",
    "visitors": "14,800",
    "leads": "1,260",
    "convRate": "8.51%",
    "spend": "₹12,500",
    "cac": "₹99",
    "quality": "9.8 / 10",
    "share": "14.9%",
    "roas": "9.4x"
  },
  {
    "name": "Organic SEO & Clinical Blogs",
    "visitors": "52,600",
    "leads": "980",
    "convRate": "1.86%",
    "spend": "₹18,000",
    "cac": "₹184",
    "quality": "8.9 / 10",
    "share": "11.6%",
    "roas": "7.9x"
  },
  {
    "name": "WhatsApp Business & CRM Alerts",
    "visitors": "18,400",
    "leads": "840",
    "convRate": "4.57%",
    "spend": "₹14,500",
    "cac": "₹173",
    "quality": "9.1 / 10",
    "share": "9.9%",
    "roas": "6.6x"
  }
];
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

  if (activeSubcategory === 'campaigns') return <Campaigns />;
  if (activeSubcategory === 'leads') return <Leads />;
  if (activeSubcategory === 'lead-sources') return <LeadSources />;
  if (activeSubcategory === 'website-analytics') return <WebsiteAnalytics />;
  if (activeSubcategory === 'app-analytics') return <AppAnalytics />;
  if (activeSubcategory === 'social-media') return <SocialMedia />;
  if (activeSubcategory === 'advertising') return <Advertising />;
  if (activeSubcategory === 'marketing-spend') return <MarketingSpend />;
  if (activeSubcategory === 'customer-acquisition') return <CustomerAcquisition />;
  if (activeSubcategory === 'cac') return <CAC />;
  if (activeSubcategory === 'roas') return <ROAS />;
  if (activeSubcategory === 'marketing-roi') return <MarketingROI />;
  if (activeSubcategory === 'conversion-funnel') return <ConversionFunnel />;

  return (
    <DashboardLayout
      category="Marketing"
      subcategory="Marketing Dashboard"
      title="Marketing & Growth Command Center"
      subtitle="Complete multi-channel intelligence: campaigns, pet parent leads, ad spend efficiency, CAC, ROAS & conversion funnels"
      icon="📣"
      badge="Live Attribution Synced"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setActiveSubcategory('campaigns')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 600,
              background: '#2563eb',
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Launch Campaign 🚀
          </button>
        </div>
      }
    >
      {/* Subcategory Switcher Chips */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        padding: '12px',
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '10px'
      }}>
        {subcategories.map(sc => (
          <button
            key={sc.id}
            onClick={() => setActiveSubcategory(sc.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              border: activeSubcategory === sc.id ? '1px solid #2563eb' : '1px solid #e2e8f0',
              background: activeSubcategory === sc.id ? '#eff6ff' : '#ffffff',
              color: activeSubcategory === sc.id ? '#2563eb' : '#475569',
              transition: 'all 0.15s ease'
            }}
          >
            <span>{sc.icon}</span>
            <span>{sc.label}</span>
          </button>
        ))}
      </div>

      {/* Primary KPI Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Ad Spend" value="₹2,60,000" delta="7.1% Under" trend="up" subtext="OPEX burn (Budget: ₹2.80L)" icon="💳" />
        <KpiCard label="Acquired Leads" value="1,420" delta="+14.2%" trend="up" subtext="Inbound & app clicks" icon="🎯" />
        <KpiCard label="Blended CAC" value="₹420" delta="16.0% Better" trend="up" subtext="Industry benchmark: ₹500" icon="👥" />
        <KpiCard label="Blended ROAS" value="6.64x" delta="+1.1x" trend="up" subtext="₹17.25L attributed GMV" icon="🚀" />
      </div>

      {/* Grid of Main Channels & Funnel Snapshot */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '16px' }}>
        {/* Top Channels */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Top Acquisition Channels</h3>
              <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Multi-touch attribution share and ROAS return</p>
            </div>
            <button onClick={() => setActiveSubcategory('lead-sources')} style={{ fontSize: '12px', color: '#2563eb', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>View All Sources →</button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', color: '#64748b', fontSize: '11px', textTransform: 'uppercase' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Channel</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Leads</th>
                <th style={{ padding: '8px 12px', textAlign: 'center' }}>Share</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>ROAS</th>
              </tr>
            </thead>
            <tbody>
              {topChannels.map(tc => (
                <tr key={tc.name} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 600, color: '#0f172a' }}>{tc.name}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{tc.leads}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                    <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: '4px', background: '#eff6ff', color: '#2563eb', fontWeight: 600, fontSize: '11px' }}>{tc.share}</span>
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 700, color: '#16a34a', fontFamily: '"IBM Plex Mono", monospace' }}>{tc.roas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Funnel Preview */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Conversion Velocity & Drop-Off</h3>
              <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>7-Stage micro-conversion drop-off rate</p>
            </div>
            <button onClick={() => setActiveSubcategory('conversion-funnel')} style={{ fontSize: '12px', color: '#2563eb', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>Deep Funnel →</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {funnelSteps.slice(0, 5).map((s, idx) => (
              <div key={s.stage}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '3px' }}>
                  <span style={{ fontWeight: 600, color: '#334155' }}>{s.stage}</span>
                  <span style={{ fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{s.volume} ({s.convRate})</span>
                </div>
                <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ width: s.width, height: '100%', background: s.color, borderRadius: '9999px' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
