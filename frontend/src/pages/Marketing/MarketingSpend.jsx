import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function MarketingSpend() {
  const spendItems = [
  {
    "category": "Paid Search Engine Marketing (Google PPC)",
    "budget": "₹70,000",
    "actual": "₹68,500",
    "variance": "+₹1,500",
    "status": "Under Budget",
    "share": "26.3%"
  },
  {
    "category": "Paid Social Advertising (Meta & Reels)",
    "budget": "₹65,000",
    "actual": "₹62,000",
    "variance": "+₹3,000",
    "status": "Under Budget",
    "share": "23.8%"
  },
  {
    "category": "YouTube & Video Creative Production",
    "budget": "₹28,000",
    "actual": "₹25,000",
    "variance": "+₹3,000",
    "status": "Under Budget",
    "share": "9.6%"
  },
  {
    "category": "Veterinary Content & Medical SEO Copywriting",
    "budget": "₹20,000",
    "actual": "₹18,000",
    "variance": "+₹2,000",
    "status": "Under Budget",
    "share": "6.9%"
  },
  {
    "category": "Community Camps, Events & Pet Expos",
    "budget": "₹18,000",
    "actual": "₹16,000",
    "variance": "+₹2,000",
    "status": "Under Budget",
    "share": "6.2%"
  },
  {
    "category": "WhatsApp Business & Omnichannel CRM Messaging",
    "budget": "₹16,000",
    "actual": "₹14,500",
    "variance": "+₹1,500",
    "status": "Under Budget",
    "share": "5.6%"
  },
  {
    "category": "Pet Parent Referral Rewards & Vouchers",
    "budget": "₹15,000",
    "actual": "₹12,500",
    "variance": "+₹2,500",
    "status": "Under Budget",
    "share": "4.8%"
  },
  {
    "category": "Marketing Automation & Analytics Tools",
    "budget": "₹12,000",
    "actual": "₹11,500",
    "variance": "+₹500",
    "status": "Under Budget",
    "share": "4.4%"
  },
  {
    "category": "Pet Influencer & Breeder Engagement",
    "budget": "₹18,000",
    "actual": "₹17,000",
    "variance": "+₹1,000",
    "status": "Under Budget",
    "share": "6.5%"
  },
  {
    "category": "Print Collateral, Clinic Banners & Merch",
    "budget": "₹18,000",
    "actual": "₹15,000",
    "variance": "+₹3,000",
    "status": "Under Budget",
    "share": "5.8%"
  }
];

  return (
    <DashboardLayout
      category="Marketing"
      subcategory="Marketing Spend"
      title="Marketing Budget Allocation & OPEX Burn"
      subtitle="Budget allocation, media spend share, agency disbursements, and departmental cost adherence"
      icon="💰"
      badge="Budget Adherence: 7.1% Under Plan"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Monthly Budget" value="₹2,80,000" delta="Finance Approved" trend="neutral" subtext="Current Period" icon="📋" />
        <KpiCard label="Actual Burn" value="₹2,60,000" delta="7.1% Under Plan" trend="up" subtext="₹20,000 surplus" icon="💳" />
        <KpiCard label="Media Spend Share" value="79.4%" delta="Target: 80%" trend="up" subtext="Paid ad networks" icon="📊" />
        <KpiCard label="Mkt % of GMV" value="1.82%" delta="-0.3% MoM" trend="up" subtext="Cost structure" icon="📈" />
      </div>

      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Marketing Expense Line Items & OPEX Adherence</h3>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Departmental cost centers, agency fees, and influencer disbursements</p>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <th style={{ padding: '12px 16px' }}>Spend Category</th>
                <th style={{ padding: '12px 16px' }}>Monthly Budget</th>
                <th style={{ padding: '12px 16px' }}>Actual Spend</th>
                <th style={{ padding: '12px 16px' }}>Variance</th>
                <th style={{ padding: '12px 16px' }}>Status</th>
                <th style={{ padding: '12px 16px' }}>Share of Budget</th>
              </tr>
            </thead>
            <tbody>
              {spendItems.map(i => (
                <tr key={i.category} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 600, color: '#0f172a' }}>{i.category}</td>
                  <td style={{ padding: '14px 16px', fontFamily: '"IBM Plex Mono", monospace' }}>{i.budget}</td>
                  <td style={{ padding: '14px 16px', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{i.actual}</td>
                  <td style={{ padding: '14px 16px', fontFamily: '"IBM Plex Mono", monospace', color: '#16a34a', fontWeight: 600 }}>{i.variance}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: '4px', background: '#dcfce7', color: '#15803d', fontWeight: 600, fontSize: '11px' }}>{i.status}</span>
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: 600, color: '#0f172a' }}>{i.share}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
