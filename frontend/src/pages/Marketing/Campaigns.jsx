import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Campaigns() {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [campaigns, setCampaigns] = useState([
  {
    "id": "CMP-801",
    "name": "Canine Hip Dysplasia & Ortho Camp",
    "channel": "Meta Ads (IG/FB)",
    "spend": "₹42,500",
    "budget": "₹45,000",
    "impressions": "348,200",
    "ctr": "3.42%",
    "conv": 168,
    "cac": "₹253",
    "roas": "6.2x",
    "status": "Active"
  },
  {
    "id": "CMP-802",
    "name": "Monsoon Flea & Tick Shield Drive",
    "channel": "Google Search (PPC)",
    "spend": "₹38,000",
    "budget": "₹40,000",
    "impressions": "215,600",
    "ctr": "4.15%",
    "conv": 142,
    "cac": "₹268",
    "roas": "5.8x",
    "status": "Active"
  },
  {
    "id": "CMP-803",
    "name": "Kitten Core Triple Vaccination 360",
    "channel": "Meta Ads (IG Stories)",
    "spend": "₹28,400",
    "budget": "₹30,000",
    "impressions": "192,800",
    "ctr": "3.88%",
    "conv": 114,
    "cac": "₹249",
    "roas": "5.4x",
    "status": "Active"
  },
  {
    "id": "CMP-804",
    "name": "Senior Dog Arthritis & Laser Therapy",
    "channel": "Google Search (Local)",
    "spend": "₹32,600",
    "budget": "₹35,000",
    "impressions": "164,100",
    "ctr": "4.52%",
    "conv": 126,
    "cac": "₹259",
    "roas": "6.8x",
    "status": "Active"
  },
  {
    "id": "CMP-805",
    "name": "Zenve Pet App Free Tele-Vet Trial",
    "channel": "YouTube Shorts / Video",
    "spend": "₹25,000",
    "budget": "₹25,000",
    "impressions": "420,000",
    "ctr": "2.10%",
    "conv": 185,
    "cac": "₹135",
    "roas": "4.6x",
    "status": "Active"
  },
  {
    "id": "CMP-806",
    "name": "Breed-Specific Cardiac Screening Package",
    "channel": "Google Display Network",
    "spend": "₹22,100",
    "budget": "₹25,000",
    "impressions": "285,400",
    "ctr": "2.65%",
    "conv": 74,
    "cac": "₹299",
    "roas": "5.1x",
    "status": "Active"
  },
  {
    "id": "CMP-807",
    "name": "Dental Scaling & Ultrasonic Care Fest",
    "channel": "Meta Ads (Reels)",
    "spend": "₹19,800",
    "budget": "₹20,000",
    "impressions": "178,300",
    "ctr": "3.12%",
    "conv": 82,
    "cac": "₹241",
    "roas": "4.9x",
    "status": "Active"
  },
  {
    "id": "CMP-808",
    "name": "Grain-Free Renal Prescription Diet Promo",
    "channel": "WhatsApp Business Direct",
    "spend": "₹14,500",
    "budget": "₹15,000",
    "impressions": "68,400",
    "ctr": "7.84%",
    "conv": 98,
    "cac": "₹148",
    "roas": "7.4x",
    "status": "Completed"
  },
  {
    "id": "CMP-809",
    "name": "Emergency 24/7 Trauma Ambulance Bangalore",
    "channel": "Google Call-Only Ads",
    "spend": "₹21,200",
    "budget": "₹25,000",
    "impressions": "92,100",
    "ctr": "6.35%",
    "conv": 68,
    "cac": "₹312",
    "roas": "8.1x",
    "status": "Active"
  },
  {
    "id": "CMP-810",
    "name": "Puppy Socialization & Hydrotherapy Pass",
    "channel": "Meta Influencer Collabs",
    "spend": "₹15,900",
    "budget": "₹20,000",
    "impressions": "145,000",
    "ctr": "2.95%",
    "conv": 58,
    "cac": "₹274",
    "roas": "4.2x",
    "status": "Scheduled"
  }
]);

  const filtered = campaigns.filter(c => {
    const matchFilter = filter === 'ALL' || c.status === filter;
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
                        c.channel.toLowerCase().includes(search.toLowerCase()) ||
                        c.id.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const toggleStatus = (id) => {
    setCampaigns(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, status: c.status === 'Active' ? 'Paused' : 'Active' };
      }
      return c;
    }));
  };

  return (
    <DashboardLayout
      category="Marketing"
      subcategory="Campaigns"
      title="Omni-Channel Marketing Campaigns"
      subtitle="Live campaign flighting, channel allocation, lead conversions, and real-time ROAS"
      icon="🚀"
      badge={campaigns.filter(c => c.status === 'Active').length + ' Active Flights'}
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          {['ALL', 'Active', 'Scheduled', 'Completed'].map(st => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                border: filter === st ? '1px solid #2563eb' : '1px solid #e2e8f0',
                background: filter === st ? '#eff6ff' : '#ffffff',
                color: filter === st ? '#2563eb' : '#64748b'
              }}
            >
              {st}
            </button>
          ))}
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Campaign Spend" value="₹2,60,000" delta="7.1% Under" trend="up" subtext="Across 10 active flights" icon="💳" />
        <KpiCard label="Ad Impressions" value="1.84M" delta="+16.5%" trend="up" subtext="Meta, Google, YouTube" icon="👁️" />
        <KpiCard label="Click-Through Rate" value="3.82%" delta="+0.4%" trend="up" subtext="Industry benchmark: 2.1%" icon="🖱️" />
        <KpiCard label="Campaign Conversions" value="1,115" delta="+14.2%" trend="up" subtext="Orders & consultations" icon="🎯" />
      </div>

      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Live Campaign Registry</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Flight metrics, attribution channels, and ad spend efficiency</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Search campaigns..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                fontSize: '12px',
                width: '180px'
              }}
            />
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#2563eb' }}>{filtered.length} Campaigns</span>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <th style={{ padding: '12px 16px' }}>Campaign Name</th>
                <th style={{ padding: '12px 16px' }}>Channel</th>
                <th style={{ padding: '12px 16px' }}>Spend / Budget</th>
                <th style={{ padding: '12px 16px' }}>Impressions</th>
                <th style={{ padding: '12px 16px' }}>CTR</th>
                <th style={{ padding: '12px 16px' }}>Conversions</th>
                <th style={{ padding: '12px 16px' }}>CAC</th>
                <th style={{ padding: '12px 16px' }}>ROAS</th>
                <th style={{ padding: '12px 16px' }}>Status</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: 600, color: '#0f172a' }}>{c.name}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', fontFamily: '"IBM Plex Mono", monospace' }}>{c.id}</div>
                  </td>
                  <td style={{ padding: '14px 16px', color: '#334155' }}>{c.channel}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: 600, color: '#0f172a', fontFamily: '"IBM Plex Mono", monospace' }}>{c.spend}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>Plan: {c.budget}</div>
                  </td>
                  <td style={{ padding: '14px 16px', fontFamily: '"IBM Plex Mono", monospace' }}>{c.impressions}</td>
                  <td style={{ padding: '14px 16px', fontFamily: '"IBM Plex Mono", monospace', color: '#16a34a', fontWeight: 600 }}>{c.ctr}</td>
                  <td style={{ padding: '14px 16px', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{c.conv}</td>
                  <td style={{ padding: '14px 16px', fontFamily: '"IBM Plex Mono", monospace', color: '#2563eb' }}>{c.cac}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ display: 'inline-block', padding: '3px 8px', borderRadius: '4px', background: '#dcfce7', color: '#15803d', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{c.roas}</span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '2px 8px',
                      borderRadius: '9999px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: c.status === 'Active' ? '#dcfce7' : c.status === 'Completed' ? '#f1f5f9' : '#fef3c7',
                      color: c.status === 'Active' ? '#16a34a' : c.status === 'Completed' ? '#475569' : '#d97706'
                    }}>
                      {c.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    <button
                      onClick={() => toggleStatus(c.id)}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        background: '#ffffff',
                        fontSize: '11px',
                        fontWeight: 600,
                        color: '#475569',
                        cursor: 'pointer'
                      }}
                    >
                      {c.status === 'Active' ? 'Pause' : 'Activate'}
                    </button>
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
