import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function GrossProfit() {
  const [viewBy, setViewBy] = useState('Department');

  const departmentMargins = [
    { dept: 'Specialized Orthopedic Surgery', rev: '₹28,60,000', cogs: '₹10,20,000', gp: '₹18,40,000', margin: '64.3%', target: '60.0%', status: 'Exceeded' },
    { dept: 'General Outpatient (OPD) Consults', rev: '₹32,40,000', cogs: '₹14,50,000', gp: '₹17,90,000', margin: '55.2%', target: '52.0%', status: 'Exceeded' },
    { dept: 'In-House Veterinary Pharmacy', rev: '₹24,80,000', cogs: '₹12,02,000', gp: '₹12,78,000', margin: '51.5%', target: '48.0%', status: 'Exceeded' },
    { dept: 'Pathology & Diagnostic Imaging', rev: '₹14,80,000', cogs: '₹5,74,000', gp: '₹9,06,000', margin: '61.2%', target: '55.0%', status: 'Exceeded' },
    { dept: 'Emergency, Trauma & Critical Care', rev: '₹18,50,000', cogs: '₹7,65,000', gp: '₹10,85,000', margin: '58.6%', target: '54.0%', status: 'Exceeded' },
    { dept: 'Oncology & Infusion Protocols', rev: '₹10,00,000', cogs: '₹3,90,000', gp: '₹6,10,000', margin: '61.0%', target: '58.0%', status: 'Exceeded' },
    { dept: 'Veterinary Dental & Periodontal', rev: '₹4,80,000', cogs: '₹1,80,000', gp: '₹3,00,000', margin: '62.5%', target: '55.0%', status: 'Exceeded' },
    { dept: 'Inpatient Hospitalization & Boarding', rev: '₹4,10,000', cogs: '₹1,50,000', gp: '₹2,60,000', margin: '63.4%', target: '50.0%', status: 'Exceeded' },
    { dept: 'Clinical Nutrition & Diet Consultation', rev: '₹2,95,000', cogs: '₹1,40,000', gp: '₹1,55,000', margin: '52.5%', target: '45.0%', status: 'Exceeded' },
    { dept: 'Physiotherapy & Hydrotherapy', rev: '₹1,90,000', cogs: '₹65,000', gp: '₹1,25,000', margin: '65.8%', target: '55.0%', status: 'Exceeded' }
  ];

  const unitEconomics = [
    { service: 'Tibial Plateau Leveling Osteotomy (TPLO)', avgPrice: '₹42,000', directCost: '₹14,800', contribution: '₹27,200', margin: '64.8%', volume: '38 cases/mo' },
    { service: 'Comprehensive Blood Panel (IDEXX Catalyst)', avgPrice: '₹3,200', directCost: '₹1,150', contribution: '₹2,050', margin: '64.1%', volume: '480 tests/mo' },
    { service: 'Digital Abdominal Ultrasound & Doppler', avgPrice: '₹3,800', directCost: '₹850', contribution: '₹2,950', margin: '77.6%', volume: '290 scans/mo' },
    { service: 'Ultrasonic Dental Scaling & Polishing', avgPrice: '₹4,500', directCost: '₹1,400', contribution: '₹3,100', margin: '68.9%', volume: '95 cases/mo' },
    { service: 'Puppy Complete Core Immunization Pack', avgPrice: '₹2,800', directCost: '₹1,180', contribution: '₹1,620', margin: '57.9%', volume: '420 packs/mo' },
    { service: 'Canine Spay / Neuter (Laparoscopic)', avgPrice: '₹14,500', directCost: '₹4,600', contribution: '₹9,900', margin: '68.3%', volume: '115 cases/mo' },
    { service: 'Emergency Gastrointestinal Foreign Body Removal', avgPrice: '₹36,000', directCost: '₹11,400', contribution: '₹24,600', margin: '68.3%', volume: '24 cases/mo' },
    { service: 'Chemotherapy Protocol (Single Infusion)', avgPrice: '₹16,500', directCost: '₹5,800', contribution: '₹10,700', margin: '64.8%', volume: '32 cycles/mo' },
    { service: 'Canine Hydrotherapy & Laser Rehab Session', avgPrice: '₹2,200', directCost: '₹550', contribution: '₹1,650', margin: '75.0%', volume: '140 sessions/mo' },
    { service: 'Complex Fracture External Skeletal Fixation', avgPrice: '₹34,000', directCost: '₹11,800', contribution: '₹22,200', margin: '65.3%', volume: '22 cases/mo' }
  ];

  return (
    <DashboardLayout
      category="Finance & Accounting"
      subcategory="Gross Profit"
      title="Gross Profit & Contribution Margin Intelligence"
      subtitle="Unit economics by medical service, gross margin expansion across therapeutic specialties, and pricing leverage"
      icon="💎"
      badge="Margin: 56.0%"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => alert('Exporting Unit Economics & Gross Margin Model...')}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: '1px solid #10b981',
              background: 'rgba(16,185,129,0.15)',
              color: '#34d399',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            💎 Export Unit Economics
          </button>
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Gross Profit" value="₹80,00,000" delta="+15.9% vs Budget" trend="up" subtext="Revenue - COGS" icon="💎" />
        <KpiCard label="Blended Gross Margin" value="56.0%" delta="+3.8% YoY" trend="up" subtext="Target: 52.0%" icon="📈" />
        <KpiCard label="Surgical Gross Margin" value="64.3%" delta="Highest margin unit" trend="up" subtext="Specialist OTs" icon="🩺" />
        <KpiCard label="Diagnostics Margin" value="61.2%" delta="High capital efficiency" trend="up" subtext="In-house blood lab" icon="🔬" />
        <KpiCard label="Pharmacy Gross Margin" value="51.5%" delta="+3.5% YoY" trend="up" subtext="Direct OEM sourcing" icon="💊" />
        <KpiCard label="Price Realization Index" value="102.4" delta="+2.4% price lever" trend="up" subtext="Zero discounting in OTs" icon="🛡️" />
      </div>

      <div style={{
        background: 'var(--card, #131d2e)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '22px 24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#fff' }}>📊 Gross Profit by Clinical Division</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Direct profitability by department after material & pharmaceutical cost deductions</p>
          </div>
          <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>Target Met Across All 5 Units</span>
        </div>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.22)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <th style={{ padding: '10px 20px', textAlign: 'left', color: '#94a3b8' }}>Clinical Department / Unit</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Gross Revenue</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Direct COGS</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Gross Profit</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Gross Margin %</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Target Margin</th>
                <th style={{ padding: '10px 20px', textAlign: 'right', color: '#94a3b8' }}>Performance</th>
              </tr>
            </thead>
            <tbody>
              {departmentMargins.map((d, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 20px', color: '#fff', fontWeight: 600 }}>{d.dept}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{d.rev}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#f87171' }}>{d.cogs}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#10b981', fontWeight: 700 }}>{d.gp}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#38bdf8', fontWeight: 700 }}>{d.margin}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#94a3b8' }}>{d.target}</td>
                  <td style={{ padding: '12px 20px', textAlign: 'right' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'rgba(16,185,129,0.15)', color: '#34d399', fontSize: '11px', fontWeight: 600 }}>{d.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Unit Economics Deep Dive */}
      <div style={{
        background: 'var(--card, #131d2e)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '22px 24px'
      }}>
        <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 700, color: '#fff' }}>🐾 Unit Economics: Top High-Volume Clinical Procedures</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Revenue realization, direct consumables cost, and per-case gross contribution</p>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.22)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <th style={{ padding: '10px 20px', textAlign: 'left', color: '#94a3b8' }}>Medical Service / Procedure</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Average Price</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Direct Cost / Case</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Contribution Margin</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Margin %</th>
                <th style={{ padding: '10px 20px', textAlign: 'right', color: '#94a3b8' }}>Monthly Throughput</th>
              </tr>
            </thead>
            <tbody>
              {unitEconomics.map((u, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 20px', color: '#fff', fontWeight: 600 }}>{u.service}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{u.avgPrice}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#f87171' }}>{u.directCost}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#10b981' }}>{u.contribution}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#38bdf8', fontWeight: 600 }}>{u.margin}</td>
                  <td style={{ padding: '12px 20px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#cbd5e1' }}>{u.volume}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
