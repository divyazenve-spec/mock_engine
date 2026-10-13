import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ExportOrders() {
  const orders = [
    { expPo: 'XPO-2026-101', buyer: 'Al-Khail Equine Center LLC', country: 'United Arab Emirates', items: 'Specialized Equine Arthroscopy Packs & Implants', val: '$64,000 (₹53,12,000)', payment: 'Confirmed LC at Sight', terms: '100% Sight', dispatch: '08 Oct 2026', status: 'Delivered' },
    { expPo: 'XPO-2026-102', buyer: 'SingaVet Specialist Clinics Pte', country: 'Singapore', items: 'Canine Micro-surgical Sutures & Haemostats', val: '$48,500 (₹40,25,500)', payment: 'Advance Wire TT', terms: '50/50', dispatch: '11 Oct 2026', status: 'In Transit' },
    { expPo: 'XPO-2026-103', buyer: 'Cotswolds Pet Healthcare Group', country: 'United Kingdom', items: 'Herbal Liver Tonics & Omega Vet Formulations', val: '£32,000 (₹36,16,000)', payment: 'Irrevocable LC', terms: '60 Days', dispatch: '06 Oct 2026', status: 'Delivered' },
    { expPo: 'XPO-2026-104', buyer: 'Outback Vet Centers Australia', country: 'Australia', items: 'Titanium Locking Bone Plate Surgical Systems', val: 'A$78,000 (₹42,90,000)', payment: 'Advance TT Wire', terms: '100% Advance', dispatch: '13 Oct 2026', status: 'In Transit' },
    { expPo: 'XPO-2026-105', buyer: 'Royal Falcon Care Hospital', country: 'Qatar', items: 'Avian Respiratory Chelation & Nutriceuticals', val: '$35,000 (₹29,05,000)', payment: 'Confirmed LC', terms: 'At Sight', dispatch: '09 Oct 2026', status: 'Delivered' },
    { expPo: 'XPO-2026-106', buyer: 'Maple Leaf Pet Specialty Clinics', country: 'Canada', items: 'Ayurvedic Turmeric-Curcumin Joint Chews', val: 'C$46,000 (₹28,52,000)', payment: 'CAD TT Bank Transfer', terms: 'Net 30', dispatch: '14 Oct 2026', status: 'In Transit' },
    { expPo: 'XPO-2026-107', buyer: 'Najd Veterinary PolyClinics', country: 'Saudi Arabia', items: 'Veterinary Infusion Warmer Pumps & Sensors', val: '$52,000 (₹43,16,000)', payment: 'Irrevocable LC', terms: '100% LC', dispatch: '07 Oct 2026', status: 'Delivered' },
    { expPo: 'XPO-2026-108', buyer: 'Serengeti Wildlife Hospital', country: 'Kenya', items: 'Wild Animal Immobilization & Reversal Syringes', val: '$26,000 (₹21,58,000)', payment: 'NGO Grant TT', terms: 'Wire Pre-ship', dispatch: '15 Oct 2026', status: 'In Transit' },
    { expPo: 'XPO-2026-109', buyer: 'EuroPet Tierarzt Distributoren', country: 'Germany', items: 'Surgical Absorbable Polyglycolic Sutures', val: '€36,000 (₹32,40,000)', payment: 'CAD Bank Wire', terms: 'Net 30', dispatch: '05 Oct 2026', status: 'Delivered' },
    { expPo: 'XPO-2026-110', buyer: 'PetCare ASEAN Distribution', country: 'Malaysia', items: 'Probiotic Vet Electrolytes (Sachets 100g)', val: '$18,000 (₹14,94,000)', payment: 'LC at Sight', terms: 'Standard LC', dispatch: '16 Oct 2026', status: 'Pending Dispatch' }
  ];

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Import & Export"
      subcategory="Export Orders"
      title="International Export Sales Orders & Invoicing"
      subtitle="Overseas commercial sales orders, foreign bank letters of credit, customs shipping bill filings, and cargo manifests"
      icon="📦"
      badge="10"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Active Export Orders" value="10 Consignments" delta="₹3.42 Cr Value" trend="up" subtext="Middle East & APAC" icon="📦" />
        <KpiCard label="Export Order Realization" value="98.4%" delta="LC + Advance wire" trend="up" subtext="Zero bad debt risk" icon="🛡️" />
        <KpiCard label="Avg Export Ticket Size" value="₹34.2 L" delta="+14.2% YoY" trend="up" subtext="High-value luxury apparel & pharma" icon="💰" />
        <KpiCard label="Export Airway Days" value="2.1 Days" delta="Direct express flights" trend="up" subtext="BOM/BLR to DXB/SIN" icon="⚡" />
      </div>

      <div style={card}>
        <h3 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>International Export Sales Orders ({orders.length} records)</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Foreign buyer details, export items, contract terms, and payment status</p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)' }}>
                <th style={{ padding: '10px 12px' }}>Export Order #</th>
                <th style={{ padding: '10px 12px' }}>Foreign Buyer Entity</th>
                <th style={{ padding: '10px 12px' }}>Destination Country</th>
                <th style={{ padding: '10px 12px' }}>Goods Description</th>
                <th style={{ padding: '10px 12px' }}>Forex Value</th>
                <th style={{ padding: '10px 12px' }}>Payment Terms</th>
                <th style={{ padding: '10px 12px' }}>Dispatch</th>
                <th style={{ padding: '10px 12px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: '24px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                    No export order records found
                  </td>
                </tr>
              ) : (
                orders.map(o => (
                  <tr key={o.expPo} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                    <td style={{ padding: '12px', fontFamily: 'monospace', fontWeight: 600 }}>{o.expPo}</td>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{o.buyer}</td>
                    <td style={{ padding: '12px' }}>{o.country}</td>
                    <td style={{ padding: '12px' }}>{o.items}</td>
                    <td style={{ padding: '12px', fontWeight: 600, color: '#059669' }}>{o.val}</td>
                    <td style={{ padding: '12px' }}>{o.payment} ({o.terms})</td>
                    <td style={{ padding: '12px' }}>{o.dispatch}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: '999px',
                        fontSize: '10px',
                        fontWeight: 600,
                        background: o.status === 'Delivered' ? 'rgba(16,185,129,0.12)' : o.status === 'In Transit' ? 'rgba(8,145,178,0.12)' : 'rgba(245,158,11,0.14)',
                        color: o.status === 'Delivered' ? '#059669' : o.status === 'In Transit' ? '#0e7490' : '#d97706'
                      }}>
                        {o.status}
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
