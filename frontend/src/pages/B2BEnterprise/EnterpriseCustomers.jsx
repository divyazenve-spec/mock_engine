import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function EnterpriseCustomers() {
  const [tier, setTier] = useState('ALL');
  const [search, setSearch] = useState('');

  const customers = [
    { id: 'CUST-B2B-01', name: 'Dr. Rajesh K. Varma', company: 'Apollo Veterinary Super-Speciality Hospitals', tier: 'Tier 1 Enterprise', locations: '14 Centers', annualSpend: '₹48,00,000', contact: 'procurement@apollovethospitals.com' },
    { id: 'CUST-B2B-02', name: 'Ananya Deshmukh', company: 'Max Pet Healthcare & Emergency Centers', tier: 'Tier 1 Enterprise', locations: '8 Centers', annualSpend: '₹36,50,000', contact: 'sourcing@maxpethealthcare.in' },
    { id: 'CUST-B2B-03', name: 'Col. R. S. Bhardwaj', company: 'CAPF K9 Breeding & Training Center', tier: 'Tier 1 Enterprise', locations: '5 Bases', annualSpend: '₹55,00,000', contact: 'dir.k9@capf.gov.in' },
    { id: 'CUST-B2B-04', name: 'Hormuzd C. Batliwala', company: 'Canine Club of India Federation', tier: 'Tier 2 Wholesale', locations: '22 Kennels', annualSpend: '₹28,00,000', contact: 'federation@canineclubindia.org' },
    { id: 'CUST-B2B-05', name: 'Kavita Narang', company: 'Infosys Technologies (Employee Wellness)', tier: 'Corporate Wellness', locations: '6 Campuses', annualSpend: '₹22,50,000', contact: 'benefits.petcare@infosys.com' },
    { id: 'CUST-B2B-06', name: 'Siddharth Menon', company: 'Wipro Welfare Trust (Paws at Work)', tier: 'Corporate Wellness', locations: '4 Campuses', annualSpend: '₹18,00,000', contact: 'wellness.trust@wipro.com' },
    { id: 'CUST-B2B-07', name: 'DySP M. Venkatesh Murthy', company: 'Karnataka State Police Dog Squad', tier: 'Tier 1 Enterprise', locations: '3 Hubs', annualSpend: '₹32,00,000', contact: 'cid.k9unit@ksp.gov.in' },
    { id: 'CUST-B2B-08', name: 'Gaurav Malhotra', company: 'Royal Canin Institutional Distribution Hub', tier: 'Tier 2 Wholesale', locations: '1 Central Hub', annualSpend: '₹42,00,000', contact: 'b2b.orders@royalcanin.co.in' },
    { id: 'CUST-B2B-09', name: 'Dr. Nandini Sundaram', company: 'Sanjeevani Animal Welfare & Referral Trust', tier: 'Tier 1 Enterprise', locations: '3 Shelters', annualSpend: '₹26,50,000', contact: 'trustee@sanjeevanianimalcare.org' },
    { id: 'CUST-B2B-10', name: 'Deepak K. Shinde', company: 'TCS Maitree Foundation', tier: 'Corporate Wellness', locations: '5 Facilities', annualSpend: '₹15,00,000', contact: 'maitree.pets@tcs.com' }
  ];

  const filtered = customers.filter(c => {
    if (tier !== 'ALL' && c.tier !== tier) return false;
    if (search) {
      const q = search.toLowerCase();
      return c.name.toLowerCase().includes(q) || c.company.toLowerCase().includes(q) || c.id.toLowerCase().includes(q);
    }
    return true;
  });

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="B2B / Enterprise"
      subcategory="Enterprise Customers"
      title="Enterprise Key Decision Makers & Stakeholders"
      subtitle="Corporate buyer hierarchy, authorized procurement officers, and institutional account owners"
      icon="👥"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Key Enterprise Stakeholders" value="10 Contacts" delta="+3 Added" trend="up" subtext="Authorized procurement heads" icon="👥" />
        <KpiCard label="Tier 1 Enterprise Clients" value="5 Accounts" delta="50.0%" trend="up" subtext="High-volume clinical buyers" icon="⭐" />
        <KpiCard label="Corporate Account NPS" value="84 NPS" delta="+6 pts" trend="up" subtext="Quarterly client survey" icon="🎯" />
        <KpiCard label="Avg Account Tenure" value="3.4 Years" delta="+0.8y" trend="up" subtext="Multi-year commitments" icon="📅" />
      </div>

      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Enterprise Procurement Contacts & Buyers</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Commercial liaisons, purchasing authority, and annual procurement spend</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search stakeholder or company..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--border, #cbd5e1)', fontSize: '12px', color: 'var(--foreground, #0f172a)', background: 'var(--background, #f8fafc)' }}
            />
            {['ALL', 'Tier 1 Enterprise', 'Tier 2 Wholesale', 'Corporate Wellness'].map(t => (
              <button
                key={t}
                onClick={() => setTier(t)}
                style={{
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: '1px solid ' + (tier === t ? '#4f46e5' : 'var(--border, #cbd5e1)'),
                  background: tier === t ? 'rgba(79,70,229,0.1)' : 'transparent',
                  color: tier === t ? '#4338ca' : 'var(--muted-foreground, #64748b)',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)' }}>
                <th style={{ padding: '10px 12px' }}>Customer ID</th>
                <th style={{ padding: '10px 12px' }}>Stakeholder Name</th>
                <th style={{ padding: '10px 12px' }}>Enterprise Entity</th>
                <th style={{ padding: '10px 12px' }}>Classification</th>
                <th style={{ padding: '10px 12px' }}>Locations</th>
                <th style={{ padding: '10px 12px' }}>Annual Spend</th>
                <th style={{ padding: '10px 12px' }}>Contact</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '24px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                    No enterprise customer records found
                  </td>
                </tr>
              ) : (
                filtered.map(c => (
                  <tr key={c.id} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                    <td style={{ padding: '12px', fontFamily: 'monospace', fontWeight: 600 }}>{c.id}</td>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{c.name}</td>
                    <td style={{ padding: '12px' }}>{c.company}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ padding: '3px 8px', borderRadius: '999px', fontSize: '10px', fontWeight: 600, background: 'rgba(79,70,229,0.1)', color: '#4338ca' }}>
                        {c.tier}
                      </span>
                    </td>
                    <td style={{ padding: '12px' }}>{c.locations}</td>
                    <td style={{ padding: '12px', fontWeight: 600, color: '#059669' }}>{c.annualSpend}</td>
                    <td style={{ padding: '12px', fontFamily: 'monospace' }}>{c.contact}</td>
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
