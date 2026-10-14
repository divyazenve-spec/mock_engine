import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function COGS() {
  const [category, setCategory] = useState('ALL');

  const cogsCategories = [
    { code: 'COG-01', name: 'Specialty Vaccines & Biologics (Rabies, DHPPiL)', spend: '₹14,50,000', revLinked: '₹32,40,000', margin: '55.2%', vendor: 'Zoetis / MSD Animal Health', status: 'Optimized' },
    { code: 'COG-02', name: 'Titanium TPLO Plates, Screws & Bone Pins', spend: '₹10,20,000', revLinked: '₹28,60,000', margin: '64.3%', vendor: 'Synthes Vet / DePuy', status: 'Optimized' },
    { code: 'COG-03', name: 'Prescription Antibiotics, Cardiac & Dermatology', spend: '₹9,80,000', revLinked: '₹18,50,000', margin: '47.0%', vendor: 'Boehringer Ingelheim / Virbac', status: 'Negotiated' },
    { code: 'COG-04', name: 'Blood Chemistry & Electrolyte Cartridges', spend: '₹6,40,000', revLinked: '₹14,80,000', margin: '56.8%', vendor: 'IDEXX Laboratories', status: 'Direct OEM' },
    { code: 'COG-05', name: 'Inhalation Anesthesia Isoflurane & Oxygen', spend: '₹4,80,000', revLinked: '₹12,40,000', margin: '61.3%', vendor: 'Piramal Critical Care', status: 'Direct OEM' },
    { code: 'COG-06', name: 'Therapeutic Prescription Diets (GI, Renal, Urinary)', spend: '₹5,10,000', revLinked: '₹10,50,000', margin: '51.4%', vendor: 'Royal Canin / Hills Diet', status: 'Optimized' },
    { code: 'COG-07', name: 'Chemotherapy Infusion Protocols & Cytotoxic Agents', spend: '₹3,90,000', revLinked: '₹9,80,000', margin: '60.2%', vendor: 'Fresenius Kabi Oncology', status: 'Direct OEM' },
    { code: 'COG-08', name: 'Surgical Drapes, Sutures & Sterile Disposables', spend: '₹3,40,000', revLinked: '₹7,60,000', margin: '55.3%', vendor: 'Ethicon / Johnson & Johnson', status: 'Contracted' },
    { code: 'COG-09', name: 'Tick, Flea & Deworming Chewables (Bravecto, Simparica)', spend: '₹2,95,000', revLinked: '₹6,10,000', margin: '51.6%', vendor: 'MSD / Elanco India', status: 'Volume Tier' },
    { code: 'COG-10', name: 'Dental Polishing Pastes & Fluoride Varnishes', spend: '₹1,80,000', revLinked: '₹3,80,000', margin: '52.6%', vendor: 'Midmark Animal Health', status: 'Contracted' }
  ];

  const vendorContracts = [
    { vendor: 'Zoetis Animal Health India', category: 'Vaccines & Anti-Infectives', volumeYTD: '₹84,50,000', rebateRate: '6.5%', earnedRebate: '₹5,49,250', rating: 'Tier-1 Platinum' },
    { vendor: 'Boehringer Ingelheim Vetmedica', category: 'Therapeutics & Parasiticides', volumeYTD: '₹62,00,000', rebateRate: '5.5%', earnedRebate: '₹3,41,000', rating: 'Tier-1 Platinum' },
    { vendor: 'IDEXX Laboratories India', category: 'Diagnostic Reagents & Equipment', volumeYTD: '₹54,00,000', rebateRate: '7.0%', earnedRebate: '₹3,78,000', rating: 'Strategic Partner' },
    { vendor: 'Royal Canin India Pvt Ltd', category: 'Clinical Diets & Nutrition', volumeYTD: '₹48,20,000', rebateRate: '4.8%', earnedRebate: '₹2,31,360', rating: 'National Account' },
    { vendor: 'MSD Animal Health India', category: 'Biologics & Ectoparasiticides', volumeYTD: '₹41,00,000', rebateRate: '5.0%', earnedRebate: '₹2,05,000', rating: 'Preferred Vendor' },
    { vendor: 'Virbac Animal Health India', category: 'Dermatology & Nutraceuticals', volumeYTD: '₹36,50,000', rebateRate: '4.5%', earnedRebate: '₹1,64,250', rating: 'Contracted Partner' },
    { vendor: 'DePuy Synthes Vet Solutions', category: 'Orthopedic Titanium Implants', volumeYTD: '₹31,00,000', rebateRate: '8.0%', earnedRebate: '₹2,48,000', rating: 'Direct OEM' },
    { vendor: 'Johnson & Johnson MedTech', category: 'Sutures & Hemostats', volumeYTD: '₹24,80,000', rebateRate: '4.0%', earnedRebate: '₹99,200', rating: 'Contracted Partner' },
    { vendor: 'Piramal Critical Care', category: 'General Inhalation Anesthesia', volumeYTD: '₹18,50,000', rebateRate: '5.0%', earnedRebate: '₹92,500', rating: 'Preferred Vendor' },
    { vendor: 'Elanco India Private Ltd', category: 'Canine Pain Management', volumeYTD: '₹14,20,000', rebateRate: '4.0%', earnedRebate: '₹56,800', rating: 'Contracted Partner' }
  ];

  return (
    <DashboardLayout
      category="Finance & Accounting"
      subcategory="COGS"
      title="Cost of Goods Sold (COGS) & Direct Material Analytics"
      subtitle="Direct pharmaceutical cost absorption, surgical implants bill of materials (BOM), supplier volume rebates, and gross cost control"
      icon="📦"
      badge="COGS Ratio: 44.0%"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => alert('Initiating bulk procurement purchase order review...')}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: '1px solid #3b82f6',
              background: 'rgba(59,130,246,0.15)',
              color: '#60a5fa',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            📦 Vendor Procurement Run
          </button>
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Monthly COGS" value="₹62,85,000" delta="44.0% of revenue" trend="down" subtext="Procurement cost" icon="📦" />
        <KpiCard label="Pharma Procurement" value="₹32,40,000" delta="-2.1% MoM" trend="down" subtext="Vaccines & cold chain" icon="💊" />
        <KpiCard label="Surgical Hardware" value="₹14,20,000" delta="+4.2% cases" trend="neutral" subtext="Titanium TPLO & Pins" icon="🔩" />
        <KpiCard label="Diagnostics Consumables" value="₹9,45,000" delta="High automation" trend="down" subtext="IDEXX lab cartridges" icon="🔬" />
        <KpiCard label="Manufacturer Rebates" value="₹3,80,000" delta="5.8% retroactive" trend="up" subtext="Direct margin credit" icon="🎁" />
        <KpiCard label="Inventory Waste / Spoilage" value="0.42%" delta="-0.15% MoM" trend="down" subtext="Strict FEFO control" icon="🛡️" />
      </div>

      <div style={{
        background: 'var(--card, #131d2e)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '22px 24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#fff' }}>📋 Direct COGS Material Absorption Ledger</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Direct cost of consumables compared to linked clinical revenue</p>
          </div>
          <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>Active FEFO Audit</span>
        </div>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.22)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <th style={{ padding: '10px 20px', textAlign: 'left', color: '#94a3b8' }}>COGS Category</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Direct Spend</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Linked Revenue</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Gross Margin</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#94a3b8' }}>Primary Suppliers</th>
                <th style={{ padding: '10px 20px', textAlign: 'right', color: '#94a3b8' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {cogsCategories.map((c, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 20px', color: '#fff', fontWeight: 600 }}>
                    <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px', color: '#64748b', marginRight: '8px' }}>{c.code}</span>
                    {c.name}
                  </td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#f87171', fontWeight: 700 }}>{c.spend}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#10b981' }}>{c.revLinked}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#38bdf8' }}>{c.margin}</td>
                  <td style={{ padding: '12px 14px', color: '#cbd5e1' }}>{c.vendor}</td>
                  <td style={{ padding: '12px 20px', textAlign: 'right' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'rgba(16,185,129,0.15)', color: '#34d399', fontSize: '11px', fontWeight: 600 }}>{c.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* OEM Vendor Contracts & Rebates */}
      <div style={{
        background: 'var(--card, #131d2e)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '22px 24px'
      }}>
        <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 700, color: '#fff' }}>🤝 OEM Supplier Master Agreements & Volume Rebates</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Institutional contracts yielding retroactive gross margin rebates on bulk animal healthcare supplies</p>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.22)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <th style={{ padding: '10px 20px', textAlign: 'left', color: '#94a3b8' }}>Vendor / Partner</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#94a3b8' }}>Product Category</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Procurement YTD</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Rebate %</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Accrued Rebate</th>
                <th style={{ padding: '10px 20px', textAlign: 'right', color: '#94a3b8' }}>Partnership Tier</th>
              </tr>
            </thead>
            <tbody>
              {vendorContracts.map((v, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 20px', color: '#fff', fontWeight: 600 }}>{v.vendor}</td>
                  <td style={{ padding: '12px 14px', color: '#94a3b8' }}>{v.category}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{v.volumeYTD}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#38bdf8' }}>{v.rebateRate}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#10b981' }}>{v.earnedRebate}</td>
                  <td style={{ padding: '12px 20px', textAlign: 'right' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'rgba(59,130,246,0.15)', color: '#60a5fa', fontSize: '11px', fontWeight: 600 }}>{v.rating}</span>
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
