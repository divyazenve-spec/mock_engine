import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function MarketingReport() {
  const [toast, setToast] = useState('');

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const campaigns = [
    { name: 'Google Search: Express Pet Pharmacy Near Me', channel: 'Google Search Ads', spend: 385000, impressions: '482,000', clicks: 28900, newCustomers: 890, cac: 432, gmvGenerated: 2492000, roas: '6.47x' },
    { name: 'Instagram Reels: 60-Min Kibble Unboxing', channel: 'Meta Instagram', spend: 320000, impressions: '1,240,000', clicks: 34100, newCustomers: 740, cac: 432, gmvGenerated: 1850000, roas: '5.78x' },
    { name: 'YouTube Shorts: Ask A Vet Video Series', channel: 'YouTube Video', spend: 210000, impressions: '860,000', clicks: 18200, newCustomers: 420, cac: 500, gmvGenerated: 1176000, roas: '5.60x' },
    { name: 'Meta Retargeting: Cart Abandonment Refill', channel: 'Meta Retargeting', spend: 145000, impressions: '210,000', clicks: 14500, newCustomers: 510, cac: 284, gmvGenerated: 1326000, roas: '9.14x' },
    { name: 'Pet Parents Referral Club 2.0', channel: 'Referral & Organic', spend: 85000, impressions: '140,000', clicks: 19800, newCustomers: 620, cac: 137, gmvGenerated: 1612000, roas: '18.96x' },
    { name: 'Influencer Vet Ambassador Programme', channel: 'KOL Influencer', spend: 180000, impressions: '620,000', clicks: 16400, newCustomers: 380, cac: 473, gmvGenerated: 1064000, roas: '5.91x' },
    { name: 'Google Shopping: Premium Grain-Free Feed', channel: 'Google Shopping', spend: 240000, impressions: '390,000', clicks: 22100, newCustomers: 530, cac: 452, gmvGenerated: 1590000, roas: '6.62x' },
    { name: 'Local Community Park & Dog Fair Popups', channel: 'Field Marketing', spend: 95000, impressions: '45,000', clicks: 6200, newCustomers: 260, cac: 365, gmvGenerated: 676000, roas: '7.11x' },
    { name: 'Push Notification Flash Hours', channel: 'In-App CRM', spend: 40000, impressions: '520,000', clicks: 48900, newCustomers: 390, cac: 102, gmvGenerated: 1131000, roas: '28.27x' },
    { name: 'Corporate Pet Insurance HR Partnerships', channel: 'B2B Corporate', spend: 120000, impressions: '95,000', clicks: 8400, newCustomers: 280, cac: 428, gmvGenerated: 980000, roas: '8.16x' }
  ];

  const inr = (n) => '₹' + Number(n).toLocaleString('en-IN');

  const downloadCSV = () => {
    const rows = [
      ['Campaign Title', 'Marketing Channel', 'Ad Spend (INR)', 'Impressions', 'Clicks', 'New Customers', 'Blended CAC (INR)', 'GMV Generated (INR)', 'ROAS Multiplier'],
      ...campaigns.map(c => [`"${c.name}"`, c.channel, c.spend, c.impressions, c.clicks, c.newCustomers, c.cac, c.gmvGenerated, c.roas])
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(',')).join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `zenve_marketing_roas_report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('Marketing Performance Report CSV downloaded.');
  };

  return (
    <DashboardLayout
      category="Reports & Analytics"
      subcategory="Marketing Reports"
      title="Marketing Spend, ROAS & CAC Attribution Report"
      subtitle="Campaign conversion performance, customer acquisition costs (CAC), Return on Ad Spend (ROAS), and organic retention funnels"
      icon="📣"
      badge=""
      actions={
        <button
          onClick={downloadCSV}
          style={{
            padding: '8px 14px',
            borderRadius: '8px',
            background: 'var(--primary, #3b82f6)',
            color: '#ffffff',
            border: 'none',
            fontWeight: 600,
            fontSize: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span>📥</span> Export Marketing CSV
        </button>
      }
    >
      {toast && (
        <div style={{
          padding: '10px 16px',
          background: 'rgba(59,130,246,0.15)',
          border: '1px solid #3b82f6',
          borderRadius: '8px',
          color: '#60a5fa',
          fontSize: '13px',
          fontWeight: 600
        }}>
          ⚡ {toast}
        </div>
      )}

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Ad Spend MTD" value="₹18,20,000" delta="-6.8%" trend="up" subtext="Across 10 campaigns" icon="💳" />
        <KpiCard label="New Pet Parents Acquired" value="5,020 Parents" delta="+19.4%" trend="up" subtext="Acquired customers" icon="👶" />
        <KpiCard label="Blended CAC" value="₹362" delta="-14.2%" trend="up" subtext="Blended acquisition cost" icon="🎯" />
        <KpiCard label="Blended ROAS" value="7.63x" delta="+1.12x" trend="up" subtext="Return on marketing spend" icon="🚀" />
      </div>

      {/* Table Section */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Campaign Multi-Touch Attribution & ROAS Analysis</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)' }}>
                <th style={{ padding: '10px 12px' }}>Campaign Name & Channel</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Ad Spend</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Impressions</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Clicks</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>New Parents</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Blended CAC</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>GMV Generated</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>ROAS</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: '24px', textAlign: 'center', color: 'var(--muted-foreground, #94a3b8)' }}>
                    No marketing campaign records found
                  </td>
                </tr>
              ) : (
                campaigns.map((c) => (
                  <tr key={c.name} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                    <td style={{ padding: '12px' }}>
                      <div style={{ fontWeight: 700, color: 'var(--foreground, #f8fafc)' }}>{c.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)' }}>{c.channel}</div>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{inr(c.spend)}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{c.impressions}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{c.clicks.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{c.newCustomers}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, color: '#38bdf8', fontFamily: '"IBM Plex Mono", monospace' }}>{inr(c.cac)}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, color: '#34d399', fontFamily: '"IBM Plex Mono", monospace' }}>{inr(c.gmvGenerated)}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, color: '#fbbf24', fontFamily: '"IBM Plex Mono", monospace' }}>{c.roas}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
