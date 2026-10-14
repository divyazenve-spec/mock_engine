import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function MarketingROI() {
  const financialROI = [
  {
    "channel": "Google Search PPC (High Intent)",
    "spend": "₹68,500",
    "grossProfitContrib": "₹2,84,000",
    "netProfitLift": "₹2,15,500",
    "netROI": "314.6%",
    "paybackDays": "24 Days"
  },
  {
    "channel": "Meta Ads (Instagram & FB)",
    "spend": "₹62,000",
    "grossProfitContrib": "₹2,28,000",
    "netProfitLift": "₹1,66,000",
    "netROI": "267.7%",
    "paybackDays": "28 Days"
  },
  {
    "channel": "Pet Parent Referral Program",
    "spend": "₹12,500",
    "grossProfitContrib": "₹1,18,000",
    "netProfitLift": "₹1,05,500",
    "netROI": "844.0%",
    "paybackDays": "11 Days"
  },
  {
    "channel": "Organic SEO & Clinical Content",
    "spend": "₹18,000",
    "grossProfitContrib": "₹1,42,000",
    "netProfitLift": "₹1,24,000",
    "netROI": "688.9%",
    "paybackDays": "14 Days"
  },
  {
    "channel": "WhatsApp Direct Veterinary CRM",
    "spend": "₹14,500",
    "grossProfitContrib": "₹96,000",
    "netProfitLift": "₹81,500",
    "netROI": "562.1%",
    "paybackDays": "16 Days"
  },
  {
    "channel": "YouTube Educational Video Shorts",
    "spend": "₹25,000",
    "grossProfitContrib": "₹84,000",
    "netProfitLift": "₹59,000",
    "netROI": "236.0%",
    "paybackDays": "34 Days"
  },
  {
    "channel": "Local Vaccination Camps & Expos",
    "spend": "₹16,000",
    "grossProfitContrib": "₹74,000",
    "netProfitLift": "₹58,000",
    "netROI": "362.5%",
    "paybackDays": "22 Days"
  },
  {
    "channel": "In-App Product Retargeting",
    "spend": "₹11,500",
    "grossProfitContrib": "₹68,000",
    "netProfitLift": "₹56,500",
    "netROI": "491.3%",
    "paybackDays": "18 Days"
  },
  {
    "channel": "Google Local Service Maps Ads",
    "spend": "₹15,000",
    "grossProfitContrib": "₹72,000",
    "netProfitLift": "₹57,000",
    "netROI": "380.0%",
    "paybackDays": "20 Days"
  },
  {
    "channel": "Influencer & Breeder Partnerships",
    "spend": "₹17,000",
    "grossProfitContrib": "₹54,000",
    "netProfitLift": "₹37,000",
    "netROI": "217.6%",
    "paybackDays": "38 Days"
  }
];

  return (
    <DashboardLayout
      category="Marketing"
      subcategory="Marketing ROI"
      title="Marketing Return on Investment (ROI)"
      subtitle="Net ROI accounting for gross margin, COGS, payback velocity, and bottom-line profit lift"
      icon="💎"
      badge="Net ROI: 394.2%"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Net Marketing ROI" value="394.2%" delta="+42.5% MoM" trend="up" subtext="Net profit / Ad spend" icon="📈" />
        <KpiCard label="Gross Profit Lift" value="₹12,88,000" delta="Margin-adjusted" trend="up" subtext="After product COGS" icon="💰" />
        <KpiCard label="Payback Window" value="23 Days" delta="-6 Days" trend="up" subtext="Time to recoup CAC" icon="⏱️" />
        <KpiCard label="Efficiency Ratio" value="6.64" delta="Total Sales / Spend" trend="up" subtext="Capital efficiency" icon="⚡" />
      </div>

      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Margin-Adjusted Marketing Return on Investment (ROI)</h3>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Bottom-line profit generation after deducting product cost and agency spend</p>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <th style={{ padding: '12px 16px' }}>Marketing Channel</th>
                <th style={{ padding: '12px 16px' }}>Spend</th>
                <th style={{ padding: '12px 16px' }}>Gross Profit Generated</th>
                <th style={{ padding: '12px 16px' }}>Net Profit Lift</th>
                <th style={{ padding: '12px 16px' }}>Net ROI %</th>
                <th style={{ padding: '12px 16px' }}>Payback Window</th>
              </tr>
            </thead>
            <tbody>
              {financialROI.map(f => (
                <tr key={f.channel} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 600, color: '#0f172a' }}>{f.channel}</td>
                  <td style={{ padding: '14px 16px', fontFamily: '"IBM Plex Mono", monospace' }}>{f.spend}</td>
                  <td style={{ padding: '14px 16px', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{f.grossProfitContrib}</td>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: '#16a34a', fontFamily: '"IBM Plex Mono", monospace' }}>{f.netProfitLift}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ display: 'inline-block', padding: '3px 8px', borderRadius: '4px', background: '#dcfce7', color: '#15803d', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{f.netROI}</span>
                  </td>
                  <td style={{ padding: '14px 16px', color: '#475569', fontFamily: '"IBM Plex Mono", monospace' }}>{f.paybackDays}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
