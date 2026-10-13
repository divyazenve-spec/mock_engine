import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function RepeatCustomers() {
  const repeatMetrics = [
    { tier: '2nd Purchase (Retention Gate)', count: 2840, share: '22.8%', nextPurchaseProb: '76.5%', avgDaysToReorder: '18 Days', marketingAction: 'Automated 10-day food replenishment prompt' },
    { tier: '3rd - 5th Purchase (Habit Formed)', count: 3420, share: '27.4%', nextPurchaseProb: '84.2%', avgDaysToReorder: '14 Days', marketingAction: 'Complementary treat bundle attach' },
    { tier: '6th - 10th Purchase (Loyalty Core)', count: 2150, share: '17.2%', nextPurchaseProb: '91.0%', avgDaysToReorder: '12 Days', marketingAction: 'Silver to Gold loyalty tier upgrade gift' },
    { tier: '11th - 20th Purchase (Brand Advocate)', count: 1480, share: '11.9%', nextPurchaseProb: '94.8%', avgDaysToReorder: '9 Days', marketingAction: 'VIP dark-store priority 45-min delivery' },
    { tier: '21+ Purchases (Zenve Champions)', count: 980, share: '7.9%', nextPurchaseProb: '98.2%', avgDaysToReorder: '7 Days', marketingAction: 'Dedicated concierge vet WhatsApp line' },
    { tier: 'Bi-Weekly Food Replenishers', count: 1860, share: '14.9%', nextPurchaseProb: '88.4%', avgDaysToReorder: '14 Days', marketingAction: 'WhatsApp 1-click reorder trigger' },
    { tier: 'Monthly Prescription Refills', count: 720, share: '5.8%', nextPurchaseProb: '96.1%', avgDaysToReorder: '28 Days', marketingAction: 'Doctor automated refill authorization' },
    { tier: 'Fortnightly Grooming Repeats', count: 640, share: '5.1%', nextPurchaseProb: '82.3%', avgDaysToReorder: '15 Days', marketingAction: 'Calendar slot auto-reserve prompt' },
    { tier: 'Multi-Category Re-purchasers', count: 1290, share: '10.3%', nextPurchaseProb: '89.5%', avgDaysToReorder: '11 Days', marketingAction: 'Cross-category reward points multiplier' },
    { tier: 'Annual Health Plan Renewers', count: 850, share: '6.8%', nextPurchaseProb: '92.4%', avgDaysToReorder: '365 Days', marketingAction: 'Pre-expiry health review + booster shot' }
  ];

  const cardStyle = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Customers 360°"
      subcategory="Repurchase Dynamics"
      title="Repeat Customers & Order Frequency Progression"
      subtitle="Reorder curve analysis, multi-visit customer counts, replenishment intervals, and habit formation loops"
      icon="🔄"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Overall Repeat Purchase Rate" value="74.8%" delta="+5.2%" trend="up" subtext="Highest retention tier" icon="🔄" />
        <KpiCard label="Repeat Customer Revenue" value="₹2.84 Cr MTD" delta="+19.4%" trend="up" subtext="Predictable recurring baseline" icon="💰" />
        <KpiCard label="Avg Order Count / User" value="6.8 Orders" delta="+1.4" trend="up" subtext="Annualized replenishment" icon="🛒" />
        <KpiCard label="Reorder Retention 90D" value="81.2%" delta="+6.5%" trend="up" subtext="90-day repurchase rate" icon="🛡️" />
      </div>

      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>🔄 Customer Order Progression Ladder</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border, #e2e8f0)', textAlign: 'left', color: 'var(--muted-foreground, #475569)' }}>
                <th style={{ padding: '10px' }}>Order Frequency Ladder</th>
                <th style={{ padding: '10px' }}>Customer Count</th>
                <th style={{ padding: '10px' }}>Base Share</th>
                <th style={{ padding: '10px' }}>Next Purchase Likelihood</th>
                <th style={{ padding: '10px' }}>Avg Days to Next Reorder</th>
                <th style={{ padding: '10px' }}>Automated CRM Action</th>
              </tr>
            </thead>
            <tbody>
              {repeatMetrics.length === 0 ? (<tr><td colSpan="6" style={{ textAlign: "center", padding: "32px", color: "var(--muted-foreground, #64748b)" }}>No repeat customer records found</td></tr>) : repeatMetrics.map((r, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{r.tier}</td>
                  <td style={{ padding: '10px', fontWeight: 700, color: '#2563eb' }}>{r.count.toLocaleString()}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{r.share}</td>
                  <td style={{ padding: '10px', color: '#059669', fontWeight: 700 }}>{r.nextPurchaseProb}</td>
                  <td style={{ padding: '10px', color: '#64748b' }}>{r.avgDaysToReorder}</td>
                  <td style={{ padding: '10px', color: '#475569' }}>{r.marketingAction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
