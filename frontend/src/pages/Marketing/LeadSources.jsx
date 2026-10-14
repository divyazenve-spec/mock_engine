import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function LeadSources() {
  const sources = [
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
  },
  {
    "name": "YouTube Vet Shorts & Tutorials",
    "visitors": "32,100",
    "leads": "420",
    "convRate": "1.31%",
    "spend": "₹25,000",
    "cac": "₹595",
    "quality": "7.8 / 10",
    "share": "5.0%",
    "roas": "3.4x"
  },
  {
    "name": "Local Vaccination Camps & Expos",
    "visitors": "6,200",
    "leads": "380",
    "convRate": "6.13%",
    "spend": "₹16,000",
    "cac": "₹421",
    "quality": "9.5 / 10",
    "share": "4.5%",
    "roas": "4.6x"
  },
  {
    "name": "Direct In-App Referrals",
    "visitors": "8,900",
    "leads": "310",
    "convRate": "3.48%",
    "spend": "₹8,500",
    "cac": "₹274",
    "quality": "8.7 / 10",
    "share": "3.7%",
    "roas": "8.0x"
  },
  {
    "name": "Google Local Maps / GMB Profile",
    "visitors": "24,000",
    "leads": "290",
    "convRate": "1.21%",
    "spend": "₹5,000",
    "cac": "₹172",
    "quality": "8.5 / 10",
    "share": "3.4%",
    "roas": "14.4x"
  },
  {
    "name": "Influencer & Breeder Partnerships",
    "visitors": "12,400",
    "leads": "190",
    "convRate": "1.53%",
    "spend": "₹17,000",
    "cac": "₹895",
    "quality": "7.4 / 10",
    "share": "2.2%",
    "roas": "3.2x"
  }
];

  return (
    <DashboardLayout
      category="Marketing"
      subcategory="Lead Sources"
      title="Acquisition Lead Sources & Channel Attribution"
      subtitle="Source performance, attribution efficiency, channel quality index, and lead volume share"
      icon="🌐"
      badge="10 Attribution Channels"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Top Lead Channel" value="Google Search PPC" delta="28.5% Share" trend="up" subtext="2,410 pet leads" icon="🔍" />
        <KpiCard label="Highest Quality Score" value="Pet Referrals" delta="9.8 / 10" trend="up" subtext="8.51% conversion rate" icon="🩺" />
        <KpiCard label="Lowest CAC Channel" value="Pet Referral" delta="₹99 / Lead" trend="up" subtext="₹12.5K viral budget" icon="👥" />
        <KpiCard label="Blended Channel Conv" value="4.12%" delta="+0.8% MoM" trend="up" subtext="Across all touchpoints" icon="⚡" />
      </div>

      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Channel Attribution & Conversion Breakdown</h3>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Comparative return, lead quality score, and direct marketing cost per acquisition</p>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <th style={{ padding: '12px 16px' }}>Lead Source</th>
                <th style={{ padding: '12px 16px' }}>Site Visitors</th>
                <th style={{ padding: '12px 16px' }}>Leads Generated</th>
                <th style={{ padding: '12px 16px' }}>Conv. Rate</th>
                <th style={{ padding: '12px 16px' }}>Channel Spend</th>
                <th style={{ padding: '12px 16px' }}>CAC / Lead</th>
                <th style={{ padding: '12px 16px' }}>Quality Index</th>
                <th style={{ padding: '12px 16px' }}>Volume Share</th>
              </tr>
            </thead>
            <tbody>
              {sources.map(s => (
                <tr key={s.name} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 600, color: '#0f172a' }}>{s.name}</td>
                  <td style={{ padding: '14px 16px', fontFamily: '"IBM Plex Mono", monospace' }}>{s.visitors}</td>
                  <td style={{ padding: '14px 16px', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{s.leads}</td>
                  <td style={{ padding: '14px 16px', fontFamily: '"IBM Plex Mono", monospace', color: '#16a34a', fontWeight: 600 }}>{s.convRate}</td>
                  <td style={{ padding: '14px 16px', fontFamily: '"IBM Plex Mono", monospace' }}>{s.spend}</td>
                  <td style={{ padding: '14px 16px', fontFamily: '"IBM Plex Mono", monospace', color: '#2563eb', fontWeight: 600 }}>{s.cac}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: '4px', background: '#dcfce7', color: '#15803d', fontWeight: 700, fontSize: '11px' }}>{s.quality}</span>
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: '#0f172a' }}>{s.share}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
