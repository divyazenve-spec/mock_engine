import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function SubscriptionRevenue() {
  const plans = [
    { name: 'Zenve Prime Fresh Nutrition Auto-Ship', share: '20.3%', mrr: '₹5,87,832', arr: '₹70,53,984', arpu: '₹3,499', margin: '64.2%', growth: '+38.4% YoY' },
    { name: 'Adult Canine Preventive Care', share: '14.7%', mrr: '₹4,23,788', arr: '₹50,85,456', arpu: '₹1,999', margin: '72.5%', growth: '+24.6% YoY' },
    { name: 'Multi-Pet Family Platinum Care', share: '11.7%', mrr: '₹3,37,425', arr: '₹40,49,100', arpu: '₹4,499', margin: '76.8%', growth: '+42.1% YoY' },
    { name: 'Senior Pet Chronic Care & Mobility', share: '10.0%', mrr: '₹2,87,904', arr: '₹34,54,848', arpu: '₹2,999', margin: '78.4%', growth: '+29.5% YoY' },
    { name: 'Puppy & Kitten Complete Wellness', share: '9.5%', mrr: '₹2,75,816', arr: '₹33,09,792', arpu: '₹1,499', margin: '71.0%', growth: '+18.8% YoY' },
    { name: 'Equine Elite Stables Wellness', share: '8.7%', mrr: '₹2,51,972', arr: '₹30,23,664', arpu: '₹8,999', margin: '82.5%', growth: '+15.2% YoY' },
    { name: 'Telehealth 24/7 Digital Concierge', share: '8.2%', mrr: '₹2,37,660', arr: '₹28,51,920', arpu: '₹699', margin: '88.6%', growth: '+55.0% YoY' },
    { name: 'Dermatology & Allergy Relief Care', share: '7.1%', mrr: '₹2,04,918', arr: '₹24,59,016', arpu: '₹2,499', margin: '74.1%', growth: '+31.2% YoY' },
    { name: 'Feline Essential Health & Nutrition', share: '6.5%', mrr: '₹1,88,355', arr: '₹22,60,260', arpu: '₹1,299', margin: '69.4%', growth: '+22.4% YoY' },
    { name: 'Avian & Exotic Specialist Membership', share: '3.4%', mrr: '₹97,146', arr: '₹11,65,752', arpu: '₹1,799', margin: '79.0%', growth: '+19.0% YoY' }
  ];

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Subscriptions"
      subcategory="Subscription Revenue"
      title="Recurring Revenue (MRR / ARR) Trajectory"
      subtitle="Monthly recurring revenue breakdown, annualized contract run rates, expansion revenue, and gross margins"
      icon="💵"
      badge="10"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Annual Recurring Revenue (ARR)" value="₹3.47 Cr" delta="+32.4% YoY" trend="up" subtext="Current MRR x 12" icon="💵" />
        <KpiCard label="Monthly Recurring Revenue (MRR)" value="₹28.92 L" delta="+14.6% MoM" trend="up" subtext="100% contracted debits" icon="🔄" />
        <KpiCard label="Subscription Gross Margin" value="74.2%" delta="+3.8% YoY" trend="up" subtext="High digital & telehealth mix" icon="📈" />
        <KpiCard label="Expansion / Upsell MRR" value="₹4.65 L" delta="+21.5% MoM" trend="up" subtext="Upgrades to nutrition tiers" icon="🚀" />
      </div>

      <div style={card}>
        <h3 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Recurring Revenue Contribution by Subscription Tier ({plans.length} Tiers)</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Revenue realization, annualized velocity, ARPU, and plan contribution margins</p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)' }}>
                <th style={{ padding: '10px 12px' }}>Plan Architecture</th>
                <th style={{ padding: '10px 12px' }}>MRR Share</th>
                <th style={{ padding: '10px 12px' }}>Current MRR</th>
                <th style={{ padding: '10px 12px' }}>Annualized ARR</th>
                <th style={{ padding: '10px 12px' }}>ARPU</th>
                <th style={{ padding: '10px 12px' }}>Gross Margin</th>
                <th style={{ padding: '10px 12px' }}>YoY Growth</th>
              </tr>
            </thead>
            <tbody>
              {plans.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '24px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                    No subscription tier revenue records found
                  </td>
                </tr>
              ) : (
                plans.map(p => (
                  <tr key={p.name} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{p.name}</td>
                    <td style={{ padding: '12px' }}>{p.share}</td>
                    <td style={{ padding: '12px', fontWeight: 600, color: '#059669' }}>{p.mrr}</td>
                    <td style={{ padding: '12px', fontWeight: 600, color: '#4338ca' }}>{p.arr}</td>
                    <td style={{ padding: '12px' }}>{p.arpu}</td>
                    <td style={{ padding: '12px', fontWeight: 600, color: '#0891b2' }}>{p.margin}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ padding: '3px 8px', borderRadius: '999px', fontSize: '10px', fontWeight: 600, background: 'rgba(16,185,129,0.12)', color: '#059669' }}>
                        {p.growth}
                      </span>
                    </td>
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
