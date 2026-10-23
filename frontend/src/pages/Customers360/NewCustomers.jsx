import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function NewCustomers() {
  const newSignups = [
    { id: 'NEW-8901', name: 'Edwin Hegde', pet: 'Bruno (Golden Retriever Pup)', channel: 'Instagram Ad', date: 'Today, 09:15', firstOrder: 'Welcome Puppy Kit (₹3,450)', cac: '₹320', status: 'Activated' },
    { id: 'NEW-8902', name: 'Rajesh Gupte', pet: 'Simba (Persian Kitten)', channel: 'Google Search', date: 'Today, 11:30', firstOrder: 'Royal Canin + Litter (₹2,890)', cac: '₹410', status: 'Activated' },
    { id: 'NEW-8903', name: 'Ayesha Khan', pet: 'Tobby (Pug)', channel: 'Vet Referral', date: 'Yesterday', firstOrder: 'First Vet Consultation (₹1,200)', cac: '₹180', status: 'Activated' },
    { id: 'NEW-8904', name: 'Sameer Kulkarni', pet: 'Shadow (Doberman Pup)', channel: 'App Install Ad', date: 'Yesterday', firstOrder: 'Deworming + Starter Pack (₹4,120)', cac: '₹460', status: 'Activated' },
    { id: 'NEW-8905', name: 'Nidhi Bansal', pet: 'Penny (Corgi)', channel: 'Influencer Reel', date: '2 days ago', firstOrder: 'Organic Kibble + Toy (₹3,850)', cac: '₹290', status: 'Activated' },
    { id: 'NEW-8906', name: 'Farhan Akhtar', pet: 'Hazel (Beagle Pup)', channel: 'Society Camp', date: '2 days ago', firstOrder: 'Vaccination Starter (₹2,600)', cac: '₹140', status: 'Activated' },
    { id: 'NEW-8907', name: 'Anjali Menon', pet: 'Yuki (Indie Kitten)', channel: 'Organic Search', date: '3 days ago', firstOrder: 'Kitten Wellness Check (₹1,500)', cac: '₹0', status: 'Activated' },
    { id: 'NEW-8908', name: 'Tarun Chawla', pet: 'Bolt (German Shepherd)', channel: 'Facebook Ad', date: '3 days ago', firstOrder: 'High-Protein Kibble 12kg (₹5,400)', cac: '₹480', status: 'Activated' },
    { id: 'NEW-8909', name: 'Ritu Sen', pet: 'Ginny (Maltese)', channel: 'Friend Referral', date: '4 days ago', firstOrder: 'Luxury Spa & Grooming (₹2,950)', cac: '₹110', status: 'Activated' },
    { id: 'NEW-8910', name: 'Varun Pillai', pet: 'Buster (Boxer Pup)', channel: 'Pet Expo Stall', date: '4 days ago', firstOrder: 'Leash + Harness + Food (₹4,750)', cac: '₹220', status: 'Activated' }
  ];

  const cardStyle = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Customers 360°"
      subcategory="Acquisition & Onboarding"
      title="New Customer Acquisition & First-Order Velocity"
      subtitle="New pet parent signups, onboarding funnel progression, acquisition channels, and CAC efficiency"
      icon="✨"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="New Customers (MTD)" value="842" delta="+28.4%" trend="up" subtext="Across organic & paid channels" icon="✨" />
        <KpiCard label="Blended CAC" value="₹295 / Acq" delta="-14.2%" trend="up" subtext="High organic referral mix" icon="📉" />
        <KpiCard label="Day 1 Activation Rate" value="68.4%" delta="+6.8%" trend="up" subtext="First order within 24h" icon="⚡" />
        <KpiCard label="First Order Avg. Basket" value="₹3,275" delta="+12.5%" trend="up" subtext="Welcome bundle attach" icon="🛒" />
      </div>

      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>✨ Recent New Pet Parent Registrations & First Purchase</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border, #e2e8f0)', textAlign: 'left', color: 'var(--muted-foreground, #475569)' }}>
                <th style={{ padding: '10px' }}>Customer ID</th>
                <th style={{ padding: '10px' }}>Pet Parent</th>
                <th style={{ padding: '10px' }}>Pet Details</th>
                <th style={{ padding: '10px' }}>Acquisition Channel</th>
                <th style={{ padding: '10px' }}>Signup Date</th>
                <th style={{ padding: '10px' }}>First Order Items & Value</th>
                <th style={{ padding: '10px' }}>Attributed CAC</th>
                <th style={{ padding: '10px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {newSignups.length === 0 ? (<tr><td colSpan="8" style={{ textAlign: "center", padding: "32px", color: "var(--muted-foreground, #64748b)" }}>No new customer registration records found</td></tr>) : newSignups.map((n, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '10px', fontFamily: 'monospace', fontWeight: 600 }}>{n.id}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{n.name}</td>
                  <td style={{ padding: '10px', color: '#475569' }}>{n.pet}</td>
                  <td style={{ padding: '10px' }}><span style={{ padding: '2px 8px', background: '#eff6ff', color: '#1d4ed8', borderRadius: '4px', fontWeight: 600 }}>{n.channel}</span></td>
                  <td style={{ padding: '10px', color: '#64748b' }}>{n.date}</td>
                  <td style={{ padding: '10px', fontWeight: 600, color: '#059669' }}>{n.firstOrder}</td>
                  <td style={{ padding: '10px', color: '#64748b' }}>{n.cac}</td>
                  <td style={{ padding: '10px' }}>
                    <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, background: '#f0fdf4', color: '#16a34a' }}>
                      {n.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
