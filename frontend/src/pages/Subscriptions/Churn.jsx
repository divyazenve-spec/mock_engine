import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Churn() {
  const churnReasons = [
    { reason: 'Relocated to City Without Zenve Clinic', pct: '24.2%', count: 18, mrrLost: '₹38,400', preventable: 'No (Geographic)', action: 'Offered Telehealth + Courier Medicine Delivery' },
    { reason: 'Pet Passed Away (Bereavement)', pct: '19.5%', count: 14, mrrLost: '₹42,800', preventable: 'No (Life Event)', action: 'Sent Memorial Care Hamper & Paused Records' },
    { reason: 'Financial Hardship / Cost Cutting', pct: '18.0%', count: 13, mrrLost: '₹28,600', preventable: 'Yes (High)', action: 'Downgrade Offer to Telehealth Tier (₹699)' },
    { reason: 'Pet Picky with Food Texture (Nutrition)', pct: '12.4%', count: 9, mrrLost: '₹31,500', preventable: 'Yes (High)', action: 'Free Flavor Consultation & Custom Recipe Switch' },
    { reason: 'Infrequent Clinic Visits (Underutilized)', pct: '10.2%', count: 7, mrrLost: '₹16,400', preventable: 'Yes (Medium)', action: 'Proactive Doorstep Vet Checkup Outreach' },
    { reason: 'Payment Card Expired / Involuntary Drop', pct: '6.8%', count: 5, mrrLost: '₹12,200', preventable: 'Yes (High)', action: 'NPCI Auto-Token Fetch & WhatsApp Mandate Link' },
    { reason: 'Switched to Local Neighborhood Vet', pct: '4.1%', count: 3, mrrLost: '₹8,900', preventable: 'Yes (Medium)', action: 'Matched Service Offer + Free Home Delivery' },
    { reason: 'Temporary Travel / Pet with Relative', pct: '2.8%', count: 2, mrrLost: '₹5,400', preventable: 'Yes (High)', action: 'Enabled Free 90-Day Subscription Pause Mode' },
    { reason: 'Pet Adopted Out / Transferred Ownership', pct: '1.2%', count: 1, mrrLost: '₹2,500', preventable: 'No (Transfer)', action: 'Transferred Subscription Profile to New Owner' },
    { reason: 'Technical App Glitch during Booking', pct: '0.8%', count: 1, mrrLost: '₹1,500', preventable: 'Yes (Critical)', action: 'Resolved in 2 Hours + 1 Month Free Service' }
  ];

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Subscriptions"
      subcategory="Churn"
      title="Subscriber Churn Analytics & Root Cause Mitigation"
      subtitle="Voluntary and involuntary churn analysis, exit survey insights, revenue attrition, and win-back campaigns"
      icon="📉"
      badge="10"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Gross Monthly Churn" value="0.7%" delta="-0.3% MoM" trend="up" subtext="10 categorizations monitored" icon="📉" />
        <KpiCard label="Net Revenue Retention (NRR)" value="114.8%" delta="+4.2% YoY" trend="up" subtext="Expansion > Churn" icon="📈" />
        <KpiCard label="Preventable Churn Ratio" value="78.5%" delta="Mitigated via downgrades" trend="up" subtext="Mitigated via downgrades" icon="🛡️" />
        <KpiCard label="Win-Back Campaign Rate" value="34.2%" delta="Targeted promotion" trend="up" subtext="Re-subscribed in 90D" icon="🔄" />
      </div>

      <div style={card}>
        <h3 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Root Cause Churn Categorization & Remediation ({churnReasons.length} Categories)</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Exit survey telemetry, lost MRR quantification, and automated win-back workflows</p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)' }}>
                <th style={{ padding: '10px 12px' }}>Stated Cancellation Reason</th>
                <th style={{ padding: '10px 12px' }}>Share of Churn</th>
                <th style={{ padding: '10px 12px' }}>Cancelled Accounts</th>
                <th style={{ padding: '10px 12px' }}>Lost Monthly MRR</th>
                <th style={{ padding: '10px 12px' }}>Preventable?</th>
                <th style={{ padding: '10px 12px' }}>Mitigation / Win-Back Action</th>
              </tr>
            </thead>
            <tbody>
              {churnReasons.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: '24px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                    No churn categorization records found
                  </td>
                </tr>
              ) : (
                churnReasons.map(c => (
                  <tr key={c.reason} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{c.reason}</td>
                    <td style={{ padding: '12px', color: '#4338ca', fontWeight: 600 }}>{c.pct}</td>
                    <td style={{ padding: '12px' }}>{c.count} Pets</td>
                    <td style={{ padding: '12px', fontWeight: 600, color: '#dc2626' }}>{c.mrrLost}</td>
                    <td style={{ padding: '12px' }}>{c.preventable}</td>
                    <td style={{ padding: '12px', color: '#059669' }}>{c.action}</td>
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
