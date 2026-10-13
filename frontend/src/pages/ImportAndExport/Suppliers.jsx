import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Suppliers() {
  const suppliers = [
    { code: 'SUP-GLB-01', name: 'Boehringer Ingelheim Animal Health', country: 'Germany', cat: 'Biologicals & NSAIDs', terms: 'Irrevocable LC 60 Days', annualVol: '₹8.40 Cr', cdsco: 'CDSCO Form 10 Approved', rating: '9.9 / 10' },
    { code: 'SUP-GLB-02', name: 'Zoetis Global Manufacturing LLC', country: 'United States', cat: 'Monoclonal Antibodies & Vaccines', terms: 'Confirmed LC 90 Days', annualVol: '₹12.20 Cr', cdsco: 'CDSCO Form 11 Cleared', rating: '9.8 / 10' },
    { code: 'SUP-GLB-03', name: 'MSD Animal Health B.V.', country: 'Netherlands', cat: 'Endoparasiticides & Vaccines', terms: 'Net 45 CAD', annualVol: '₹7.80 Cr', cdsco: 'EU GMP & CDSCO Valid', rating: '9.7 / 10' },
    { code: 'SUP-GLB-04', name: 'Virbac SA', country: 'France', cat: 'Dermatology & Parasiticides', terms: 'Advance TT Wire (30/70)', annualVol: '₹6.10 Cr', cdsco: 'CDSCO Form 10 Approved', rating: '9.6 / 10' },
    { code: 'SUP-GLB-05', name: 'Canon Medical Systems Vet', country: 'Japan', cat: 'Imaging & Diagnostic DR', terms: '100% Sight LC', annualVol: '₹9.50 Cr', cdsco: 'AERB / CDSCO Compliant', rating: '9.9 / 10' },
    { code: 'SUP-GLB-06', name: 'Elanco Switzerland GmbH', country: 'Switzerland', cat: 'Cardiovascular & Pain Mgmt', terms: 'Net 60 Days TT', annualVol: '₹5.40 Cr', cdsco: 'Swissmedic & CDSCO NOC', rating: '9.7 / 10' },
    { code: 'SUP-GLB-07', name: 'NovoVet Biologicals ApS', country: 'Denmark', cat: 'Veterinary Endocrine Solutions', terms: 'Irrevocable LC 45 Days', annualVol: '₹4.90 Cr', cdsco: 'CDSCO Cold-Chain Certified', rating: '9.8 / 10' },
    { code: 'SUP-GLB-08', name: 'Troy Laboratories Pty Ltd', country: 'Australia', cat: 'Anesthetics & Surgical Sedatives', terms: 'Sight TT Wire', annualVol: '₹3.80 Cr', cdsco: 'APVMA & CDSCO Form 10', rating: '9.5 / 10' },
    { code: 'SUP-GLB-09', name: 'Dechra Veterinary Products Ltd', country: 'United Kingdom', cat: 'Endocrinology & Ophthalmic', terms: 'LC 30 Days', annualVol: '₹6.70 Cr', cdsco: 'VMD UK & CDSCO Cleared', rating: '9.8 / 10' },
    { code: 'SUP-GLB-10', name: 'Esaote SpA Diagnostic', country: 'Italy', cat: 'Color Doppler Vet Ultrasounds', terms: 'LC at Sight', annualVol: '₹5.90 Cr', cdsco: 'CE Vet & CDSCO Registered', rating: '9.6 / 10' }
  ];

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Import & Export"
      subcategory="Suppliers"
      title="Global Veterinary & Raw Material Suppliers"
      subtitle="International manufacturer registry, CDSCO import licenses, country of origin compliance, and quality certifications"
      icon="🌍"
      badge="10"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Active Global Suppliers" value="10 Manufacturers" delta="Tier-1 network" trend="up" subtext="Direct OEM distribution" icon="🌍" />
        <KpiCard label="CDSCO Registered OEMs" value="100%" delta="Form 10 / 11 active" trend="up" subtext="Biologicals clearance" icon="🛡️" />
        <KpiCard label="Avg Import Lead Time" value="4.8 Days" delta="Direct air corridors" trend="up" subtext="Corridor optimization" icon="⏱️" />
        <KpiCard label="Supplier Quality Score" value="99.4%" delta="Zero batch rejections" trend="up" subtext="Pre-shipment COA verified" icon="✅" />
      </div>

      <div style={card}>
        <h3 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Global Supplier Master Directory ({suppliers.length} records)</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Commercial terms, CDSCO regulatory clearances, and manufacturer performance</p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)' }}>
                <th style={{ padding: '10px 12px' }}>Supplier Code</th>
                <th style={{ padding: '10px 12px' }}>Company Name</th>
                <th style={{ padding: '10px 12px' }}>Origin Country</th>
                <th style={{ padding: '10px 12px' }}>Category</th>
                <th style={{ padding: '10px 12px' }}>Payment Terms</th>
                <th style={{ padding: '10px 12px' }}>Annual Volume</th>
                <th style={{ padding: '10px 12px' }}>Regulatory Status</th>
                <th style={{ padding: '10px 12px' }}>Rating</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: '24px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                    No global supplier records found
                  </td>
                </tr>
              ) : (
                suppliers.map(s => (
                  <tr key={s.code} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                    <td style={{ padding: '12px', fontFamily: 'monospace', fontWeight: 600 }}>{s.code}</td>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{s.name}</td>
                    <td style={{ padding: '12px' }}>{s.country}</td>
                    <td style={{ padding: '12px' }}>{s.cat}</td>
                    <td style={{ padding: '12px' }}>{s.terms}</td>
                    <td style={{ padding: '12px', fontWeight: 600, color: '#059669' }}>{s.annualVol}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ padding: '3px 8px', borderRadius: '999px', fontSize: '10px', fontWeight: 600, background: 'rgba(16,185,129,0.12)', color: '#059669' }}>
                        {s.cdsco}
                      </span>
                    </td>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{s.rating}</td>
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
