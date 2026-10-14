import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function SocialMedia() {
  const channels = [
  {
    "icon": "\ud83d\udcf8",
    "handle": "@ZenvePets_Instagram",
    "followers": "148,500",
    "growth": "+8,400 / mo",
    "engRate": "4.82%",
    "topPost": "Reel: 5 Silent Signs of Hip Dysplasia in Dogs",
    "reach": "1.45M Reach"
  },
  {
    "icon": "\ud83c\udfa5",
    "handle": "Zenve Pet Care YouTube",
    "followers": "94,200",
    "growth": "+6,100 / mo",
    "engRate": "6.15%",
    "topPost": "Full Vet Guide: Kitten Vaccination Timeline",
    "reach": "890K Views"
  },
  {
    "icon": "\ud83d\udcac",
    "handle": "Zenve WhatsApp Pet Community",
    "followers": "38,600",
    "growth": "+3,200 / mo",
    "engRate": "14.20%",
    "topPost": "Weekly Live Q&A with Senior Chief Surgeon",
    "reach": "180K Opens"
  },
  {
    "icon": "\ud83d\udcd8",
    "handle": "Zenve Veterinary Facebook Page",
    "followers": "86,400",
    "growth": "+2,100 / mo",
    "engRate": "3.45%",
    "topPost": "Pet Parent Testimonial: TPLO Recovery Journey",
    "reach": "540K Reach"
  },
  {
    "icon": "\ud83d\udc26",
    "handle": "@ZenveHealth_X",
    "followers": "22,800",
    "growth": "+1,400 / mo",
    "engRate": "2.95%",
    "topPost": "Infographic: Toxic Household Foods for Canines",
    "reach": "210K Impressions"
  },
  {
    "icon": "\ud83d\udcbc",
    "handle": "Zenve Healthcare LinkedIn",
    "followers": "18,900",
    "growth": "+1,250 / mo",
    "engRate": "5.10%",
    "topPost": "Clinical Research: Orthopedic Surgical Outcomes",
    "reach": "125K Views"
  },
  {
    "icon": "\ud83c\udfb5",
    "handle": "@ZenvePets_Shorts",
    "followers": "62,400",
    "growth": "+5,800 / mo",
    "engRate": "5.90%",
    "topPost": "Viral Pup Hydrotherapy First Swim Session",
    "reach": "1.10M Views"
  },
  {
    "icon": "\ud83c\udf99\ufe0f",
    "handle": "Zenve Vet Talks (Spotify)",
    "followers": "14,200",
    "growth": "+950 / mo",
    "engRate": "8.40%",
    "topPost": "Ep 24: Managing Arthritis in Senior Labradors",
    "reach": "42K Listens"
  },
  {
    "icon": "\ud83d\udccd",
    "handle": "Google Maps Local Community",
    "followers": "54,000",
    "growth": "+2,800 / mo",
    "engRate": "7.60%",
    "topPost": "Bangalore Flagship Hospital 4.9 Star Celebration",
    "reach": "320K Views"
  },
  {
    "icon": "\ud83d\udc3e",
    "handle": "Zenve Pet Parent Forum (App)",
    "followers": "41,500",
    "growth": "+4,200 / mo",
    "engRate": "12.80%",
    "topPost": "Crowdsourced Vet Advice & Puppy Playdates",
    "reach": "260K Interactions"
  }
];

  return (
    <DashboardLayout
      category="Marketing"
      subcategory="Social Media"
      title="Social Community & Viral Brand Channels"
      subtitle="Follower growth velocity, social engagement, viral reach, and community advocacy"
      icon="📸"
      badge="494.9K Total Community"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Community Followers" value="494,900" delta="+33,100 / mo" trend="up" subtext="Across 10 social channels" icon="👥" />
        <KpiCard label="Engagement Rate" value="6.85%" delta="+1.2%" trend="up" subtext="Industry Avg: 2.4%" icon="💬" />
        <KpiCard label="Content Reach" value="4.85M" delta="+24.5% MoM" trend="up" subtext="Reels & video guides" icon="🔥" />
        <KpiCard label="UGC Submissions" value="1,240" delta="+18.2%" trend="up" subtext="Tagging #ZenvePets" icon="🐕" />
      </div>

      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Official Brand Social Accounts & Organic Reach</h3>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Follower acquisition velocity, viral reach, and community engagement</p>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <th style={{ padding: '12px 16px' }}>Network & Handle</th>
                <th style={{ padding: '12px 16px' }}>Followers</th>
                <th style={{ padding: '12px 16px' }}>Monthly Growth</th>
                <th style={{ padding: '12px 16px' }}>Engagement Rate</th>
                <th style={{ padding: '12px 16px' }}>Top Performing Content</th>
                <th style={{ padding: '12px 16px' }}>Reach Impact</th>
              </tr>
            </thead>
            <tbody>
              {channels.map(c => (
                <tr key={c.handle} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 600, color: '#0f172a' }}>{c.icon} {c.handle}</td>
                  <td style={{ padding: '14px 16px', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{c.followers}</td>
                  <td style={{ padding: '14px 16px', fontFamily: '"IBM Plex Mono", monospace', color: '#16a34a', fontWeight: 600 }}>{c.growth}</td>
                  <td style={{ padding: '14px 16px', fontFamily: '"IBM Plex Mono", monospace' }}>{c.engRate}</td>
                  <td style={{ padding: '14px 16px', color: '#334155' }}>{c.topPost}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: '4px', background: '#eff6ff', color: '#2563eb', fontWeight: 600, fontSize: '11px' }}>{c.reach}</span>
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
