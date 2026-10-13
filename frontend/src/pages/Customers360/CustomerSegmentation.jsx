import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function CustomerSegmentation() {
  const segments = [
    { name: 'Premium Pamperers', count: 1840, share: '14.7%', behavior: 'High grooming frequency, organic treats & designer collars', aov: '₹3,850', arpu: '₹92,400', campaign: 'Spa & Fashion Exclusive Showcase' },
    { name: 'Medical & Chronic Guardians', count: 1420, share: '11.4%', behavior: 'Strict Rx diets, timely insulin, monthly blood work', aov: '₹4,200', arpu: '₹1,00,800', campaign: 'Auto-Refill Guarantee & Doctor Support' },
    { name: 'Budget-Conscious Practicalists', count: 2980, share: '23.9%', behavior: 'Bulk kibble bags, economy vaccinations, deal hunters', aov: '₹1,650', arpu: '₹39,600', campaign: 'Monthly Smart Saver Bulk Discounts' },
    { name: 'Multi-Pet Dynasties (Dogs + Cats)', count: 1650, share: '13.2%', behavior: 'Balanced purchases across species, high cart sizes', aov: '₹5,100', arpu: '₹1,22,400', campaign: 'Multi-Pet Club Tiered Cashback' },
    { name: 'Puppy / Kitten First-Timers', count: 1140, share: '9.1%', behavior: 'High pediatric guidance needs, training pads, vaccines', aov: '₹2,900', arpu: '₹69,600', campaign: 'First Year Milestone Concierge' },
    { name: 'Quick-Commerce Urgent Shoppers', count: 1280, share: '10.3%', behavior: 'Immediate 60-min deliveries for food, meds & sprays', aov: '₹2,100', arpu: '₹50,400', campaign: 'Express Dark-Store Free Shipping' },
    { name: 'Natural & Raw Food Enthusiasts', count: 840, share: '6.7%', behavior: 'BARF diets, grain-free meals, refrigerated bone broth', aov: '₹4,400', arpu: '₹1,05,600', campaign: 'Farm-Fresh Cold Chain Alerts' },
    { name: 'Working Pet Parents', count: 920, share: '7.4%', behavior: 'High weekend boarding, automated feeders, smart cameras', aov: '₹3,200', arpu: '₹76,800', campaign: 'Weekend Daycare & Sitter Pass' },
    { name: 'Senior Pet Companions', count: 760, share: '6.1%', behavior: 'Orthopedic comfort, joint supplements, calm clinic visits', aov: '₹2,800', arpu: '₹67,200', campaign: 'Senior Mobility & Comfort Care' },
    { name: 'Cat-Only Urban Minimalists', count: 650, share: '5.2%', behavior: 'Tofu litter, wet mousse cans, catnip scratching posts', aov: '₹1,950', arpu: '₹46,800', campaign: 'Feline Oasis Secret Deals' }
  ];

  const cardStyle = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Customers 360°"
      subcategory="Behavioral & Persona Clusters"
      title="Customer Segmentation & Behavioral Clusters"
      subtitle="RFM analysis, pet life-stage clustering, basket composition patterns, and tailored marketing playbooks"
      icon="🧩"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Persona Segments" value="10 Active" delta="+2 New" trend="up" subtext="Dynamic daily cluster updates" icon="🧩" />
        <KpiCard label="Multi-Pet Cluster Share" value="28.5%" delta="+6.4%" trend="up" subtext="Multi-pet households" icon="🐾" />
        <KpiCard label="Senior & Chronic Care" value="17.5%" delta="+4.2%" trend="up" subtext="High recurring predictability" icon="🩺" />
        <KpiCard label="Segment Campaign ROAS" value="6.8x" delta="+1.4x" trend="up" subtext="Hyper-personalized CRM" icon="🎯" />
      </div>

      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>🧩 Behavioral Cohorts & Customer Segmentation Matrix</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border, #e2e8f0)', textAlign: 'left', color: 'var(--muted-foreground, #475569)' }}>
                <th style={{ padding: '10px' }}>Segment Persona</th>
                <th style={{ padding: '10px' }}>Customer Count</th>
                <th style={{ padding: '10px' }}>Base Share</th>
                <th style={{ padding: '10px' }}>Distinct Purchasing Behavior</th>
                <th style={{ padding: '10px' }}>Avg Basket (AOV)</th>
                <th style={{ padding: '10px' }}>Annual ARPU</th>
                <th style={{ padding: '10px' }}>Active CRM Campaign</th>
              </tr>
            </thead>
            <tbody>
              {segments.length === 0 ? (<tr><td colSpan="7" style={{ textAlign: "center", padding: "32px", color: "var(--muted-foreground, #64748b)" }}>No persona segment records found</td></tr>) : segments.map((s, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{s.name}</td>
                  <td style={{ padding: '10px', fontWeight: 600, color: '#2563eb' }}>{s.count.toLocaleString()}</td>
                  <td style={{ padding: '10px' }}>{s.share}</td>
                  <td style={{ padding: '10px', color: '#475569' }}>{s.behavior}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{s.aov}</td>
                  <td style={{ padding: '10px', fontWeight: 700, color: '#059669' }}>{s.arpu}</td>
                  <td style={{ padding: '10px', color: '#64748b' }}>{s.campaign}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
