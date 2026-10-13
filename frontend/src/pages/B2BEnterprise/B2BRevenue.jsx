import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function B2BRevenue() {
  const streams = [
    { stream: 'Institutional Vaccine Consignments (DHPPi, Rabies)', share: '24.5%', mtd: '₹14,20,000', ytd: '₹1,45,00,000', margin: '38.5%', status: 'Strong Growth' },
    { stream: 'Prescription Veterinary Diets & Nutrition Wholesale', share: '21.0%', mtd: '₹12,15,00,000', ytd: '₹1,24,50,000', margin: '32.0%', status: 'Steady High Volume' },
    { stream: 'Diagnostic Rapid Test Kits & Laboratory Reagents', share: '14.2%', mtd: '₹8,25,000', ytd: '₹84,00,000', margin: '46.5%', status: 'Expanding' },
    { stream: 'Surgical Disposables, Sutures & Sterile Consumables', share: '11.8%', mtd: '₹6,85,000', ytd: '₹70,00,000', margin: '41.2%', status: 'Consistent Run Rate' },
    { stream: 'Corporate Pet Wellness Employee Subscriptions', share: '8.5%', mtd: '₹4,95,000', ytd: '₹50,50,000', margin: '62.0%', status: 'Rapid Adoption' },
    { stream: 'Kennel Biosecurity & Professional Disinfection', share: '6.2%', mtd: '₹3,60,000', ytd: '₹36,80,000', margin: '44.0%', status: 'Contract Locked' },
    { stream: 'Parasiticide & Flea/Tick Preventive Bulk Batches', share: '5.4%', mtd: '₹3,15,000', ytd: '₹32,00,000', margin: '36.8%', status: 'High Seasonal Demand' },
    { stream: 'Microchipping & RFID Pet Registration Kits', share: '3.6%', mtd: '₹2,10,000', ytd: '₹21,50,000', margin: '52.0%', status: 'Regulatory Mandate' },
    { stream: 'Specialized Orthopedic & Dental Surgical Packs', share: '2.8%', mtd: '₹1,65,000', ytd: '₹16,80,000', margin: '48.5%', status: 'High Margin Niche' },
    { stream: 'Post-Operative Rehabilitation & Mobility Aids', share: '2.0%', mtd: '₹1,15,000', ytd: '₹11,90,000', margin: '39.0%', status: 'Emerging Segment' }
  ];

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="B2B / Enterprise"
      subcategory="B2B Revenue"
      title="B2B Revenue Trajectory & Unit Economics"
      subtitle="Institutional revenue breakdowns, channel contribution margins, contract run rates, and fiscal projections"
      icon="💰"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Annualized B2B Run Rate" value="₹4,28,00,000" delta="21.4%" trend="up" subtext="ARR expansion trajectory" icon="💰" />
        <KpiCard label="Blended Gross Margin" value="37.2%" delta="3.1%" trend="up" subtext="Weighted product margin" icon="📈" />
        <KpiCard label="Revenue per Enterprise Account" value="₹3,56,000" delta="12.0%" trend="up" subtext="ARPU commercial volume" icon="🏢" />
        <KpiCard label="Repeat Contract Revenue" value="91.8%" delta="4.2%" trend="up" subtext="Recurring purchase covenants" icon="🔄" />
      </div>

      <div style={card}>
        <h3 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>B2B Enterprise Revenue Streams & Profit Contribution</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Revenue realization, product margins, and YoY channel momentum</p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)' }}>
                <th style={{ padding: '10px 12px' }}>Revenue Stream</th>
                <th style={{ padding: '10px 12px' }}>Share of B2B</th>
                <th style={{ padding: '10px 12px' }}>MTD Revenue</th>
                <th style={{ padding: '10px 12px' }}>YTD Realized</th>
                <th style={{ padding: '10px 12px' }}>Gross Margin</th>
                <th style={{ padding: '10px 12px' }}>Trajectory</th>
              </tr>
            </thead>
            <tbody>
              {streams.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: '24px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                    No B2B revenue stream records found
                  </td>
                </tr>
              ) : (
                streams.map(s => (
                  <tr key={s.stream} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{s.stream}</td>
                    <td style={{ padding: '12px' }}>{s.share}</td>
                    <td style={{ padding: '12px', fontWeight: 600, color: '#059669' }}>{s.mtd}</td>
                    <td style={{ padding: '12px' }}>{s.ytd}</td>
                    <td style={{ padding: '12px', fontWeight: 600, color: '#4338ca' }}>{s.margin}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ padding: '3px 8px', borderRadius: '999px', fontSize: '10px', fontWeight: 600, background: 'rgba(16,185,129,0.12)', color: '#059669' }}>
                        {s.status}
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
