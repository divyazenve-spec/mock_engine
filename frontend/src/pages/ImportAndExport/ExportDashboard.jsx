import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ExportDashboard() {
  const shipments = [
    { sb: 'SB-EXP-88102', destination: 'Dubai, UAE', client: 'Al-Khail Falcon & Equine Hospital', product: 'Endoscopic Orthopedic Kits & Equine Implants', fobValue: '₹58,40,000', shippingBill: 'LEO Issued', date: '10 Oct 2026', status: 'Delivered' },
    { sb: 'SB-EXP-88103', destination: 'Singapore', client: 'SingaVet Specialist Animal Hospitals', product: 'Canine Surgical Drapes & Micro-Cannulas', fobValue: '₹42,20,000', shippingBill: 'Icegate E-BRC Active', date: '12 Oct 2026', status: 'In Transit' },
    { sb: 'SB-EXP-88104', destination: 'London, UK', client: 'Cotswolds Pet Healthcare Group', product: 'Herbal Hepato-Protective Vet Suspensions', fobValue: '₹36,50,000', shippingBill: 'Customs Cleared', date: '08 Oct 2026', status: 'Delivered' },
    { sb: 'SB-EXP-88105', destination: 'Sydney, Australia', client: 'Outback Equine & Canine Centers', product: 'Stainless Titanium Bone Plates & Screws', fobValue: '₹49,80,000', shippingBill: 'Let Export Order', date: '14 Oct 2026', status: 'In Transit' },
    { sb: 'SB-EXP-88106', destination: 'Doha, Qatar', client: 'Royal Falcon & Exotic Hospital', product: 'Avian Critical Care Antibiotics & Fluids', fobValue: '₹31,10,000', shippingBill: 'LEO Issued', date: '11 Oct 2026', status: 'Delivered' },
    { sb: 'SB-EXP-88107', destination: 'Toronto, Canada', client: 'Maple Leaf Vet Specialty Clinics', product: 'Ayurvedic Joint Support Soft Chews', fobValue: '₹28,70,000', shippingBill: 'Customs Inspection Cleared', date: '15 Oct 2026', status: 'In Transit' },
    { sb: 'SB-EXP-88108', destination: 'Riyadh, Saudi Arabia', client: 'Najd Veterinary PolyClinic LLC', product: 'Large Animal Infusion Pumps & Sets', fobValue: '₹45,60,000', shippingBill: 'LEO Issued', date: '09 Oct 2026', status: 'Delivered' },
    { sb: 'SB-EXP-88109', destination: 'Nairobi, Kenya', client: 'Serengeti Wildlife Conservation Trust', product: 'Darting Sedative Reversible Formulations', fobValue: '₹22,90,000', shippingBill: 'Port Gate-in Completed', date: '16 Oct 2026', status: 'In Transit' },
    { sb: 'SB-EXP-88110', destination: 'Frankfurt, Germany', client: 'EuroPet Tierarzt Distributoren', product: 'Bio-degradable Vet Sutures & Polyglycolic', fobValue: '₹33,40,000', shippingBill: 'Customs Cleared', date: '07 Oct 2026', status: 'Delivered' },
    { sb: 'SB-EXP-88111', destination: 'Kuala Lumpur, Malaysia', client: 'PetCare ASEAN Distribution Sdn Bhd', product: 'Veterinary Probiotic Electrolyte Blends', fobValue: '₹16,50,000', shippingBill: 'ICEGATE Filed (Ready)', date: '17 Oct 2026', status: 'Pending Dispatch' }
  ];

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Import & Export"
      subcategory="Export Dashboard"
      title="International Export Sales & Global Trade"
      subtitle="Overseas market shipments, foreign exchange (Forex) remittances, Letter of Credit (LC) execution, and export duty incentives"
      icon="🛫"
      badge="10"
      actions={
        <button onClick={() => alert('New Export Shipping Bill creation opened...')} style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #0891b2', background: 'rgba(8,145,178,0.12)', color: '#0e7490', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
          + Create Export Consignment
        </button>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Export Revenue (MTD)" value="₹3.65 Cr" delta="+24.6% YoY" trend="up" subtext="FOB Realization ($438K USD)" icon="🛫" />
        <KpiCard label="Export Destinations" value="8 Countries" delta="10 active lanes" trend="up" subtext="Expanding to international markets" icon="🌍" />
        <KpiCard label="Letter of Credit (LC) Adherence" value="100%" delta="Zero payment default" trend="up" subtext="First-class international banks" icon="📑" />
        <KpiCard label="Duty Drawback / RoDTEP" value="₹14.8 L" delta="100% realized" trend="up" subtext="Auto-credited to bank" icon="💵" />
      </div>

      <div style={card}>
        <h3 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>🛫 Outbound Export Shipments & Foreign Trade Orders ({shipments.length} records)</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Shipping Bills, destination clearance, Freight on Board (FOB) valuation, and cargo dispatch</p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)' }}>
                <th style={{ padding: '10px 12px' }}>Shipping Bill #</th>
                <th style={{ padding: '10px 12px' }}>Destination</th>
                <th style={{ padding: '10px 12px' }}>Foreign Importer</th>
                <th style={{ padding: '10px 12px' }}>Product Line</th>
                <th style={{ padding: '10px 12px' }}>FOB Value</th>
                <th style={{ padding: '10px 12px' }}>Customs Clearance</th>
                <th style={{ padding: '10px 12px' }}>Dispatch Date</th>
                <th style={{ padding: '10px 12px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {shipments.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: '24px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                    No outbound export shipment records found
                  </td>
                </tr>
              ) : (
                shipments.map(s => (
                  <tr key={s.sb} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                    <td style={{ padding: '12px', fontFamily: 'monospace', fontWeight: 600 }}>{s.sb}</td>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{s.destination}</td>
                    <td style={{ padding: '12px' }}>{s.client}</td>
                    <td style={{ padding: '12px' }}>{s.product}</td>
                    <td style={{ padding: '12px', fontWeight: 600, color: '#059669' }}>{s.fobValue}</td>
                    <td style={{ padding: '12px' }}>{s.shippingBill}</td>
                    <td style={{ padding: '12px' }}>{s.date}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: '999px',
                        fontSize: '10px',
                        fontWeight: 600,
                        background: s.status === 'Delivered' ? 'rgba(16,185,129,0.12)' : 'rgba(8,145,178,0.12)',
                        color: s.status === 'Delivered' ? '#059669' : '#0e7490'
                      }}>
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
