import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function NewSubscriptions() {
  const acquisitions = [
    { channel: 'In-Clinic Vet Doctor Referrals', newSubs: 142, cac: '₹420', conversion: '42.8%', mrrAdded: '₹2,98,000', payback: '14 Days' },
    { channel: 'Puppy Vaccination Drive Camp', newSubs: 98, cac: '₹580', conversion: '36.4%', mrrAdded: '₹1,68,000', payback: '18 Days' },
    { channel: 'Doorstep Vet Home Visit Upsell', newSubs: 76, cac: '₹490', conversion: '31.2%', mrrAdded: '₹1,74,000', payback: '16 Days' },
    { channel: 'Zenve Mobile App Onboarding Flow', newSubs: 115, cac: '₹310', conversion: '24.5%', mrrAdded: '₹1,85,000', payback: '12 Days' },
    { channel: 'Instagram Pet Influencer Campaign', newSubs: 64, cac: '₹780', conversion: '18.6%', mrrAdded: '₹1,32,000', payback: '28 Days' },
    { channel: 'Partner Pet Grooming Salons', newSubs: 52, cac: '₹620', conversion: '22.4%', mrrAdded: '₹1,18,000', payback: '21 Days' },
    { channel: 'Google Search High-Intent Ads', newSubs: 88, cac: '₹890', conversion: '28.0%', mrrAdded: '₹1,94,000', payback: '26 Days' },
    { channel: 'Corporate Pet Wellness (B2B Perks)', newSubs: 65, cac: '₹350', conversion: '48.2%', mrrAdded: '₹1,42,000', payback: '11 Days' },
    { channel: 'Pet Adoption Shelter Welcome Kit', newSubs: 43, cac: '₹260', conversion: '38.5%', mrrAdded: '₹68,000', payback: '9 Days' },
    { channel: 'WhatsApp Concierge Reactivation Bot', newSubs: 39, cac: '₹180', conversion: '29.4%', mrrAdded: '₹76,000', payback: '7 Days' }
  ];

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Subscriptions"
      subcategory="New Subscriptions"
      title="New Subscriber Acquisition & Channel Velocity"
      subtitle="Monthly new subscriber signups, acquisition channel conversion, customer acquisition cost (CAC), and payback period"
      icon="✨"
      badge="10"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="New Subscriptions (MTD)" value="184 Signups" delta="+22.4% MoM" trend="up" subtext="Target: 160 signups" icon="✨" />
        <KpiCard label="Blended CAC per Subscriber" value="₹490" delta="-18.5% YoY" trend="up" subtext="Clinic referral advantage" icon="🎯" />
        <KpiCard label="New MRR Added" value="₹3.84 L" delta="+26.8% MoM" trend="up" subtext="Pure recurring ARR boost" icon="💰" />
        <KpiCard label="Avg Payback Period" value="14.2 Days" delta="Positive in 1 mo" trend="up" subtext="First month margin positive" icon="⏱️" />
      </div>

      <div style={card}>
        <h3 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>New Subscriber Acquisition Channels & Unit Economics ({acquisitions.length} channels)</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Conversion velocity, CAC efficiency, MRR addition, and channel payback duration</p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)' }}>
                <th style={{ padding: '10px 12px' }}>Acquisition Channel</th>
                <th style={{ padding: '10px 12px' }}>New Signups</th>
                <th style={{ padding: '10px 12px' }}>Channel CAC</th>
                <th style={{ padding: '10px 12px' }}>Lead-to-Sub Conversion</th>
                <th style={{ padding: '10px 12px' }}>New MRR Added</th>
                <th style={{ padding: '10px 12px' }}>Payback Period</th>
              </tr>
            </thead>
            <tbody>
              {acquisitions.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: '24px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                    No new subscriber acquisition records found
                  </td>
                </tr>
              ) : (
                acquisitions.map(a => (
                  <tr key={a.channel} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{a.channel}</td>
                    <td style={{ padding: '12px', fontWeight: 600, color: '#4338ca' }}>{a.newSubs} Subs</td>
                    <td style={{ padding: '12px' }}>{a.cac}</td>
                    <td style={{ padding: '12px', fontWeight: 600, color: '#059669' }}>{a.conversion}</td>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{a.mrrAdded}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ padding: '3px 8px', borderRadius: '999px', fontSize: '10px', fontWeight: 600, background: 'rgba(16,185,129,0.12)', color: '#059669' }}>
                        {a.payback}
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
