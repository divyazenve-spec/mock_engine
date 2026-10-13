import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ActiveCustomers() {
  const activeCohorts = [
    { cohort: 'Daily Hyper-Engagers (DAU)', count: '1,840', pctTotal: '14.7%', frequency: 'Daily health logs, food tracker & community', topActivity: '60-Min Quick Commerce', trend: '+24.2% ↑' },
    { cohort: 'Weekly Active Shoppers (WAU)', count: '4,620', pctTotal: '37.0%', frequency: 'Bi-weekly kibble replenishment & treats', topActivity: 'Fast Express Delivery', trend: '+18.5% ↑' },
    { cohort: 'Monthly Health & Clinic Cohort', count: '2,460', pctTotal: '19.7%', frequency: 'Monthly wellness checkup & Rx refill', topActivity: 'Veterinary Clinic & Rx', trend: '+12.8% ↑' },
    { cohort: 'Multi-Pet Active Parents', count: '1,980', pctTotal: '15.9%', frequency: 'Cross-purchases for dogs & cats', topActivity: 'Omnichannel Combo', trend: '+28.4% ↑' },
    { cohort: 'Grooming & Spa Subscribers', count: '890', pctTotal: '7.1%', frequency: 'Fortnightly grooming appointment bookings', topActivity: 'Luxury In-Clinic Spa', trend: '+16.2% ↑' },
    { cohort: 'Chronic Illness Management', count: '640', pctTotal: '5.1%', frequency: 'Scheduled insulin, cardiac & renal diet', topActivity: 'Cold-Chain Pharmacy', trend: '+9.4% ↑' },
    { cohort: 'New Puppy/Kitten Parents (0-6M)', count: '780', pctTotal: '6.2%', frequency: 'Milestone vaccines, training treats, chip', topActivity: 'Pediatric Vet Packages', trend: '+31.5% ↑' },
    { cohort: 'Weekend Walkers & Daycare Cohort', count: '520', pctTotal: '4.2%', frequency: 'Weekend social play sessions & boarding', topActivity: 'Clinic Daycare & Boarding', trend: '+21.0% ↑' },
    { cohort: 'Senior Pet Supportive Care', count: '430', pctTotal: '3.4%', frequency: 'Joint supplements, orthopedic beds, therapy', topActivity: 'Geriatric Vet Support', trend: '+8.7% ↑' },
    { cohort: 'Premium Fashion & Accessories', count: '680', pctTotal: '5.4%', frequency: 'Designer harnesses, winter coats, bowties', topActivity: 'Zenve Fashion Boutique', trend: '+26.8% ↑' }
  ];

  const cardStyle = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Customers 360°"
      subcategory="Active Engagement & Telemetry"
      title="Active Customers & Omni-Channel Frequency"
      subtitle="Rolling DAU / WAU / MAU ratios, commerce order frequency, clinic visits, and mobile digital engagement"
      icon="⚡"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Monthly Active Customers" value="8,920" delta="+22.1%" trend="up" subtext="Transacting or clinic visit" icon="⚡" />
        <KpiCard label="DAU / MAU Stickiness" value="28.6%" delta="+4.2%" trend="up" subtext="High daily app utility" icon="📱" />
        <KpiCard label="Avg Order Interval" value="14.2 Days" delta="-2.8 Days" trend="up" subtext="Faster replenishment" icon="⏱️" />
        <KpiCard label="Omni-Channel Engaged" value="44.8%" delta="+9.5%" trend="up" subtext="App + Physical Clinic" icon="🏬" />
      </div>

      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>⚡ Active Engagement Cadence & Platform Cohorts</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border, #e2e8f0)', textAlign: 'left', color: 'var(--muted-foreground, #475569)' }}>
                <th style={{ padding: '10px' }}>Engagement Window</th>
                <th style={{ padding: '10px' }}>Active User Count</th>
                <th style={{ padding: '10px' }}>Share of Total Base</th>
                <th style={{ padding: '10px' }}>Usage Profile & Frequency</th>
                <th style={{ padding: '10px' }}>Dominant Service Touchpoint</th>
                <th style={{ padding: '10px' }}>Growth Velocity</th>
              </tr>
            </thead>
            <tbody>
              {activeCohorts.length === 0 ? (<tr><td colSpan="6" style={{ textAlign: "center", padding: "32px", color: "var(--muted-foreground, #64748b)" }}>No active customer cohorts found</td></tr>) : activeCohorts.map((c, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{c.cohort}</td>
                  <td style={{ padding: '10px', fontWeight: 700, color: '#2563eb' }}>{c.count}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{c.pctTotal}</td>
                  <td style={{ padding: '10px', color: '#475569' }}>{c.frequency}</td>
                  <td style={{ padding: '10px', color: '#64748b' }}>{c.topActivity}</td>
                  <td style={{ padding: '10px', color: '#059669', fontWeight: 600 }}>{c.trend}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
