import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function RevenueByProduct() {
  const products = [
    { name: 'Royal Canin Veterinary Diet (Gastrointestinal 10kg)', cat: 'Prescription Nutrition', rev: '₹18,40,000', units: 380, margin: '36%', share: '19.5%' },
    { name: 'Comprehensive Full Pet Health Checkup & Diagnostics', cat: 'Clinical Procedure', rev: '₹14,20,000', units: 710, margin: '76%', share: '15.1%' },
    { name: 'Bravecto Chewable Flea & Tick Treatment (20-40kg)', cat: 'Preventive Pharmacy', rev: '₹11,60,000', units: 580, margin: '42%', share: '12.3%' },
    { name: 'NexGard Spectra Multi-Parasite Chew for Dogs', cat: 'Prescription Pharmacy', rev: '₹9,80,000', units: 490, margin: '44%', share: '10.4%' },
    { name: "Hill's Prescription Diet c/d Multicare Feline", cat: 'Prescription Nutrition', rev: '₹8,50,000', units: 220, margin: '35%', share: '9.0%' },
    { name: 'Canine Core 7-in-1 Annual Booster Vaccination', cat: 'Immunization Protocol', rev: '₹7,90,000', units: 660, margin: '68%', share: '8.4%' },
    { name: 'Feline Tricat Trio Core Vaccine Protocol', cat: 'Immunization Protocol', rev: '₹6,40,000', units: 480, margin: '70%', share: '6.8%' },
    { name: 'Veterinary Dental Ultrasonic Scaling & Polishing', cat: 'Surgical & Dental', rev: '₹5,80,000', units: 145, margin: '72%', share: '6.1%' },
    { name: 'Orthopedic Joint Support Supplement (Glycoflex Plus)', cat: 'Wellness & Supplements', rev: '₹5,10,000', units: 340, margin: '48%', share: '5.4%' },
    { name: 'Zenve Calming Anti-Anxiety Chews (Organic Chamomile)', cat: 'OTC Wellness', rev: '₹3,90,000', units: 650, margin: '55%', share: '4.1%' }
  ];

  return (
    <DashboardLayout
      category="Revenue & Sales"
      subcategory="Revenue by Product"
      title="Product Catalog & Service Margins"
      subtitle="SKU-level profitability, unit velocity, and category sales attribution"
      icon="📦"
      badge="Top 10 SKUs"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Top Revenue SKU" value="Royal Canin Diet" delta="₹18.4L rev" trend="up" subtext="19.5% catalog share" icon="📦" />
        <KpiCard label="Highest Margin SKU" value="Pet Health Checkup" delta="76% margin" trend="up" subtext="Clinical procedure" icon="🩺" />
        <KpiCard label="Total Units Moved" value="4,655" delta="+18.4% MoM" trend="up" subtext="Across top 10 SKUs" icon="📊" />
        <KpiCard label="Avg Product Margin" value="51.6%" delta="+3.8%" trend="up" subtext="Blended catalog" icon="💰" />
      </div>

      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Top Products & Services Leaderboard</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)', fontSize: '11px' }}>
                <th style={{ padding: '8px 12px' }}>Product / Procedure Name</th>
                <th style={{ padding: '8px 12px' }}>Category</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Revenue</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Units Sold</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Gross Margin</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Catalog Share</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.name} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                  <td style={{ padding: '12px', fontWeight: 700 }}>{p.name}</td>
                  <td style={{ padding: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>{p.cat}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{p.rev}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>{p.units}</td>
                  <td style={{ padding: '12px', textAlign: 'right', color: '#10b981', fontWeight: 600 }}>{p.margin}</td>
                  <td style={{ padding: '12px', textAlign: 'right', color: '#3b82f6', fontWeight: 600 }}>{p.share}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
