import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Advertising() {
  const adSets = [
  {
    "name": "Canine Joint Health & Mobility Video",
    "platform": "Meta Ads (IG/FB)",
    "spend": "₹36,500",
    "cpm": "₹112",
    "cpc": "₹3.80",
    "cpa": "₹228",
    "roas": "6.4x",
    "health": "Optimal"
  },
  {
    "name": "Emergency Vet Near Me (Call Only)",
    "platform": "Google Search PPC",
    "spend": "₹34,000",
    "cpm": "₹340",
    "cpc": "₹14.20",
    "cpa": "₹310",
    "roas": "8.2x",
    "health": "Optimal"
  },
  {
    "name": "Kitten First Vaccine Starter Discount",
    "platform": "Meta Ads (Feed & Story)",
    "spend": "₹28,500",
    "cpm": "₹95",
    "cpc": "₹3.10",
    "cpa": "₹215",
    "roas": "5.8x",
    "health": "Optimal"
  },
  {
    "name": "Renal & Hepatic Prescription Diets",
    "platform": "Google Shopping / PMax",
    "spend": "₹24,800",
    "cpm": "₹145",
    "cpc": "₹5.60",
    "cpa": "₹198",
    "roas": "7.1x",
    "health": "Optimal"
  },
  {
    "name": "Senior Pet Blood Panel Screening",
    "platform": "Meta Ads (IG Carousel)",
    "spend": "₹22,000",
    "cpm": "₹108",
    "cpc": "₹4.10",
    "cpa": "₹245",
    "roas": "5.2x",
    "health": "Scaling"
  },
  {
    "name": "App Install - Free Vet Consultation",
    "platform": "YouTube Video Action",
    "spend": "₹25,000",
    "cpm": "₹82",
    "cpc": "₹2.90",
    "cpa": "₹142",
    "roas": "4.6x",
    "health": "Scaling"
  },
  {
    "name": "Dental Cleaning & Breath Check Camp",
    "platform": "Meta Ads (Reels)",
    "spend": "₹18,500",
    "cpm": "₹102",
    "cpc": "₹3.60",
    "cpa": "₹235",
    "roas": "5.0x",
    "health": "Optimal"
  },
  {
    "name": "Flea, Tick & Heartworm Prevention",
    "platform": "Google Search Keyword",
    "spend": "₹29,200",
    "cpm": "₹180",
    "cpc": "₹6.80",
    "cpa": "₹260",
    "roas": "6.1x",
    "health": "Optimal"
  },
  {
    "name": "Puppy Deworming & Pediatric Camp",
    "platform": "Instagram Influencer Whitelist",
    "spend": "₹19,000",
    "cpm": "₹120",
    "cpc": "₹4.50",
    "cpa": "₹285",
    "roas": "4.4x",
    "health": "Scaling"
  },
  {
    "name": "Orthopedic TPLO Surgical Consult Retargeting",
    "platform": "Meta Dynamic Retargeting",
    "spend": "₹22,500",
    "cpm": "₹160",
    "cpc": "₹7.20",
    "cpa": "₹295",
    "roas": "7.8x",
    "health": "Optimal"
  }
];

  return (
    <DashboardLayout
      category="Marketing"
      subcategory="Advertising"
      title="Digital Advertising & Paid Media Control"
      subtitle="Programmatic ads, ad network CPC/CPM, direct CPA, and creative fatigue diagnostics"
      icon="📢"
      badge="10 Active Ad Sets"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Average CPM" value="₹142" delta="-8.5% MoM" trend="up" subtext="Cost per 1K impressions" icon="👁️" />
        <KpiCard label="Blended CPC" value="₹4.85" delta="-12.0%" trend="up" subtext="Cost per ad click" icon="🖱️" />
        <KpiCard label="Target CPA" value="₹245" delta="Cap: ₹350" trend="up" subtext="Cost per acquisition" icon="🎯" />
        <KpiCard label="Auction Share" value="68.4%" delta="+5.2%" trend="up" subtext="Top placement win rate" icon="⚡" />
      </div>

      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Active Ad Sets & Creative Flighting</h3>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Ad network spend, cost per acquisition, and creative fatigue diagnostics</p>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <th style={{ padding: '12px 16px' }}>Ad Set / Campaign</th>
                <th style={{ padding: '12px 16px' }}>Platform</th>
                <th style={{ padding: '12px 16px' }}>Spend</th>
                <th style={{ padding: '12px 16px' }}>CPM</th>
                <th style={{ padding: '12px 16px' }}>CPC</th>
                <th style={{ padding: '12px 16px' }}>CPA</th>
                <th style={{ padding: '12px 16px' }}>ROAS</th>
                <th style={{ padding: '12px 16px' }}>Creative Health</th>
              </tr>
            </thead>
            <tbody>
              {adSets.map(a => (
                <tr key={a.name} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 600, color: '#0f172a' }}>{a.name}</td>
                  <td style={{ padding: '14px 16px', color: '#334155' }}>{a.platform}</td>
                  <td style={{ padding: '14px 16px', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{a.spend}</td>
                  <td style={{ padding: '14px 16px', fontFamily: '"IBM Plex Mono", monospace' }}>{a.cpm}</td>
                  <td style={{ padding: '14px 16px', fontFamily: '"IBM Plex Mono", monospace' }}>{a.cpc}</td>
                  <td style={{ padding: '14px 16px', fontFamily: '"IBM Plex Mono", monospace', color: '#2563eb', fontWeight: 600 }}>{a.cpa}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ display: 'inline-block', padding: '3px 8px', borderRadius: '4px', background: '#dcfce7', color: '#15803d', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{a.roas}</span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '2px 8px',
                      borderRadius: '9999px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: a.health === 'Optimal' ? '#dcfce7' : '#dbeafe',
                      color: a.health === 'Optimal' ? '#16a34a' : '#2563eb'
                    }}>
                      {a.health}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
