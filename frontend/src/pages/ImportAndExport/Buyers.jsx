import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Buyers() {
  const buyers = [
    { code: 'BUY-INT-01', name: 'Al-Khail Falcon & Equine Healthcare LLC', country: 'Dubai, UAE', type: 'Premier Equine Hospital Group', contractVal: '₹9.20 Cr ($1.1M)', paymentTerms: 'Irrevocable LC at Sight', rep: 'Tariq Mansoor', status: 'Active Tier-1' },
    { code: 'BUY-INT-02', name: 'SingaVet Hospital Networks Pte', country: 'Singapore', type: 'Specialty Vet Chain (14 clinics)', contractVal: '₹6.40 Cr ($770K)', paymentTerms: 'Net 30 TT Wire', rep: 'Mei Ling Tan', status: 'Active Tier-1' },
    { code: 'BUY-INT-03', name: 'Cotswolds Pet Healthcare Ltd', country: 'United Kingdom', type: 'High-End Companion Animal Group', contractVal: '₹5.80 Cr ($700K)', paymentTerms: 'Irrevocable LC 60 Days', rep: 'Oliver Sterling', status: 'Active Tier-1' },
    { code: 'BUY-INT-04', name: 'Outback Equine & Canine Centers', country: 'Australia', type: 'Large Animal & Livestock Consortium', contractVal: '₹7.50 Cr ($900K)', paymentTerms: 'Sight Bank Wire', rep: 'Liam Hemsworth', status: 'Active Tier-1' },
    { code: 'BUY-INT-05', name: 'Royal Falcon Care Medical Hospital', country: 'Qatar', type: 'Royal Falcon & Avian Specialty', contractVal: '₹4.80 Cr ($580K)', paymentTerms: '100% Confirmed LC', rep: 'Fahad Al-Thani', status: 'Active Tier-1' },
    { code: 'BUY-INT-06', name: 'Maple Leaf Vet Specialty Partners', country: 'Canada', type: 'Emergency & Critical Care Chain', contractVal: '₹4.20 Cr ($505K)', paymentTerms: 'Net 45 Bank Wire', rep: 'Jean-Luc Dubois', status: 'Active' },
    { code: 'BUY-INT-07', name: 'Najd Veterinary PolyClinics', country: 'Saudi Arabia', type: 'Livestock & Camel Care Network', contractVal: '₹6.90 Cr ($830K)', paymentTerms: 'Irrevocable LC at Sight', rep: 'Abdullah Al-Dosari', status: 'Active Tier-1' },
    { code: 'BUY-INT-08', name: 'Serengeti Wildlife Conservation Trust', country: 'Kenya', type: 'Sanctuary Wildlife Medical Supplies', contractVal: '₹2.90 Cr ($350K)', paymentTerms: 'Advance NGO TT', rep: 'Dr. Jane Odhiambo', status: 'Active' },
    { code: 'BUY-INT-09', name: 'EuroPet Tierarzt Distributoren GmbH', country: 'Germany', type: 'DACH Region Veterinary Wholesale', contractVal: '₹5.30 Cr ($640K)', paymentTerms: 'CAD Bank Transfer', rep: 'Klaus Fischer', status: 'Active' },
    { code: 'BUY-INT-10', name: 'PetCare ASEAN Distribution Sdn Bhd', country: 'Malaysia', type: 'Southeast Asia Pet Retail Distributor', contractVal: '₹3.40 Cr ($410K)', paymentTerms: 'LC 30 Days', rep: 'Zulkepli Hassan', status: 'Active' }
  ];

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Import & Export"
      subcategory="Buyers"
      title="International Buyers & Distribution Partners"
      subtitle="Overseas retail chains, international veterinary hospital groups, luxury boutique distributors, and credit limits"
      icon="🤝"
      badge="10"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Active Global Buyers" value="10 Overseas Accounts" delta="8 countries" trend="up" subtext="Direct export agreements" icon="🤝" />
        <KpiCard label="Annual Contracted Demand" value="$6.8M USD" delta="+28.5% YoY" trend="up" subtext="₹56.4 Cr INR equivalent" icon="💰" />
        <KpiCard label="Buyer Payment Track Record" value="100%" delta="Zero default history" trend="up" subtext="Bank LC backed" icon="🛡️" />
        <KpiCard label="Export Territory Expansion" value="8 Active Regions" delta="Regulatory cleared" trend="up" subtext="Expansion pipeline" icon="🌍" />
      </div>

      <div style={card}>
        <h3 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>International Buyer Master Ledger ({buyers.length} records)</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Commercial contracts, buyer classification, payment security, and account managers</p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)' }}>
                <th style={{ padding: '10px 12px' }}>Buyer ID</th>
                <th style={{ padding: '10px 12px' }}>Organization Name</th>
                <th style={{ padding: '10px 12px' }}>Country / Region</th>
                <th style={{ padding: '10px 12px' }}>Channel Profile</th>
                <th style={{ padding: '10px 12px' }}>Annual Commitment</th>
                <th style={{ padding: '10px 12px' }}>Payment Terms</th>
                <th style={{ padding: '10px 12px' }}>Account Lead</th>
                <th style={{ padding: '10px 12px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {buyers.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: '24px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                    No international buyer records found
                  </td>
                </tr>
              ) : (
                buyers.map(b => (
                  <tr key={b.code} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                    <td style={{ padding: '12px', fontFamily: 'monospace', fontWeight: 600 }}>{b.code}</td>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{b.name}</td>
                    <td style={{ padding: '12px' }}>{b.country}</td>
                    <td style={{ padding: '12px' }}>{b.type}</td>
                    <td style={{ padding: '12px', fontWeight: 600, color: '#059669' }}>{b.contractVal}</td>
                    <td style={{ padding: '12px' }}>{b.paymentTerms}</td>
                    <td style={{ padding: '12px' }}>{b.rep}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ padding: '3px 8px', borderRadius: '999px', fontSize: '10px', fontWeight: 600, background: 'rgba(8,145,178,0.12)', color: '#0e7490' }}>
                        {b.status}
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
