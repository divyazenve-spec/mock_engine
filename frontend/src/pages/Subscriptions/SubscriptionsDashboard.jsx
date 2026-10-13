import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function SubscriptionsDashboard() {
  const [filter, setFilter] = useState('ALL');

  const plans = [
    { id: 'SUB-PLN-01', name: 'Puppy & Kitten Complete Wellness', price: '₹1,499 / mo', activeSubscribers: 184, mrr: '₹2,75,816', renewalRate: '97.4%', churn: '0.6%', benefits: 'Unlimited Vet Consults, Vaccinations & Deworming' },
    { id: 'SUB-PLN-02', name: 'Adult Canine Preventive Care', price: '₹1,999 / mo', activeSubscribers: 212, mrr: '₹4,23,788', renewalRate: '96.8%', churn: '0.8%', benefits: 'Annual Blood Panel, Dental Scaling & Flea/Tick' },
    { id: 'SUB-PLN-03', name: 'Senior Pet Chronic Care & Mobility', price: '₹2,999 / mo', activeSubscribers: 96, mrr: '₹2,87,904', renewalRate: '98.2%', churn: '0.5%', benefits: 'Joint Supplements, Renal Screens & Physiotherapy' },
    { id: 'SUB-PLN-04', name: 'Feline Essential Health & Nutrition', price: '₹1,299 / mo', activeSubscribers: 145, mrr: '₹1,88,355', renewalRate: '96.2%', churn: '0.9%', benefits: 'Core FVRCP, Dental Checkups & Wet Food Delivery' },
    { id: 'SUB-PLN-05', name: 'Zenve Prime Fresh Nutrition Auto-Ship', price: '₹3,499 / mo', activeSubscribers: 168, mrr: '₹5,87,832', renewalRate: '98.8%', churn: '0.4%', benefits: 'Custom Fresh Food Pouches & Probiotics Bi-weekly' },
    { id: 'SUB-PLN-06', name: 'Dermatology & Allergy Relief Care', price: '₹2,499 / mo', activeSubscribers: 82, mrr: '₹2,04,918', renewalRate: '95.9%', churn: '1.1%', benefits: 'Cytopoint/Apoquel Injections, Medicated Baths & Diet' },
    { id: 'SUB-PLN-07', name: 'Telehealth 24/7 Digital Concierge', price: '₹699 / mo', activeSubscribers: 340, mrr: '₹2,37,660', renewalRate: '94.5%', churn: '1.2%', benefits: 'Unlimited Video Consults & 1-Hr Prescription Delivery' },
    { id: 'SUB-PLN-08', name: 'Equine Elite Stables Wellness', price: '₹8,999 / mo', activeSubscribers: 28, mrr: '₹2,51,972', renewalRate: '99.1%', churn: '0.3%', benefits: 'On-site Equine Vet Visits, Parasite Control & Injections' },
    { id: 'SUB-PLN-09', name: 'Avian & Exotic Specialist Membership', price: '₹1,799 / mo', activeSubscribers: 54, mrr: '₹97,146', renewalRate: '95.4%', churn: '1.0%', benefits: 'Specialist Avian Consults, Beak Trimming & Vitamins' },
    { id: 'SUB-PLN-10', name: 'Multi-Pet Family Platinum Care', price: '₹4,499 / mo', activeSubscribers: 75, mrr: '₹3,37,425', renewalRate: '98.5%', churn: '0.5%', benefits: 'Covers up to 3 Pets, Free Clinic Emergencies & Grooming' }
  ];

  const filtered = filter === 'ALL' ? plans : plans.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()));

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Subscriptions"
      subcategory="Command Center"
      title="Recurring Subscriptions & Pet Wellness Memberships"
      subtitle="Monthly recurring revenue (MRR), automated doorstep auto-shipments, preventive wellness plans, and subscriber cohorts"
      icon="🔄"
      badge="10"
      actions={
        <button onClick={() => alert('Creating New Recurring Membership Plan...')} style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #7c3aed', background: 'rgba(124,58,237,0.12)', color: '#6d28d9', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
          + Create Subscription Plan
        </button>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Monthly Recurring Revenue (MRR)" value="₹28.92 L" delta="+14.6% MoM" trend="up" subtext="Annualized ARR: ₹3.47 Cr" icon="🔄" />
        <KpiCard label="Active Paying Subscribers" value="1,388 Pets" delta="+184 new MTD" trend="up" subtext="Across 10 recurring plans" icon="👥" />
        <KpiCard label="Subscriber Renewal Rate" value="97.2%" delta="NPCI E-Mandates" trend="up" subtext="Auto-debit UPI / Cards" icon="🛡️" />
        <KpiCard label="Gross Monthly Churn" value="0.7%" delta="-0.3% vs benchmark" trend="up" subtext="Industry benchmark 2.5%" icon="📉" />
        <KpiCard label="Average Revenue Per User (ARPU)" value="₹2,084 / mo" delta="+8.4% YoY" trend="up" subtext="Multi-tier add-ons" icon="💎" />
        <KpiCard label="Customer Lifetime Value (LTV)" value="₹31,260" delta="5.1x LTV/CAC" trend="up" subtext="LTV/CAC ratio: 5.1x" icon="⭐" />
      </div>

      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>🔄 Recurring Membership Plans & MRR Performance ({filtered.length} Plans)</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Active subscriber counts, recurring revenue contribution, and plan benefits</p>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)' }}>
                <th style={{ padding: '10px 12px' }}>Plan Code</th>
                <th style={{ padding: '10px 12px' }}>Subscription Plan Name</th>
                <th style={{ padding: '10px 12px' }}>Monthly Price</th>
                <th style={{ padding: '10px 12px' }}>Active Pets</th>
                <th style={{ padding: '10px 12px' }}>Monthly Run Rate (MRR)</th>
                <th style={{ padding: '10px 12px' }}>Renewal Rate</th>
                <th style={{ padding: '10px 12px' }}>Monthly Churn</th>
                <th style={{ padding: '10px 12px' }}>Included Core Benefits</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: '24px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                    No recurring subscription plans found
                  </td>
                </tr>
              ) : (
                filtered.map(p => (
                  <tr key={p.id} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                    <td style={{ padding: '12px', fontFamily: 'monospace', fontWeight: 600 }}>{p.id}</td>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{p.name}</td>
                    <td style={{ padding: '12px', fontWeight: 600, color: '#4338ca' }}>{p.price}</td>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{p.activeSubscribers} Pets</td>
                    <td style={{ padding: '12px', fontWeight: 600, color: '#059669' }}>{p.mrr}</td>
                    <td style={{ padding: '12px' }}>{p.renewalRate}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ padding: '3px 8px', borderRadius: '999px', fontSize: '10px', fontWeight: 600, background: 'rgba(16,185,129,0.12)', color: '#059669' }}>
                        {p.churn}
                      </span>
                    </td>
                    <td style={{ padding: '12px', color: '#64748b' }}>{p.benefits}</td>
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
