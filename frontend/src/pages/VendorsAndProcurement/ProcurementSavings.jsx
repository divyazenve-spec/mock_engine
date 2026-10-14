import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ProcurementSavings() {
  const [selectedLever, setSelectedLever] = useState('ALL');

  const savingsLevers = [
    { lever: 'Direct Manufacturer Master Contracting', realized: '₹2,45,000', target: '₹3,00,000', achievement: 81.7, color: '#34d399', desc: 'Disintermediating regional sub-distributors across Zoetis, MSD, and BI for direct national factory invoicing.' },
    { lever: 'Centralized Bulk Volume Aggregation', realized: '₹1,68,000', target: '₹2,00,000', achievement: 84.0, color: '#38bdf8', desc: 'Consolidating prescription diets and surgical consumable demand across all 6 clinic hubs into bi-weekly orders.' },
    { lever: 'Branded-to-Generic Substitution Arbitrage', realized: '₹1,18,000', target: '₹1,50,000', achievement: 78.7, color: '#a78bfa', desc: 'Formulating clinical protocols to use bioequivalent generic NSAIDs and antibiotics without impacting care quality.' },
    { lever: 'Early Payment Cash Discounts (2/10 Net 30)', realized: '₹68,000', target: '₹80,000', achievement: 85.0, color: '#f59e0b', desc: 'Leveraging healthy treasury float to capture 2% upfront cash settlement discount on invoices cleared in 10 days.' },
    { lever: 'Surgical Implant Tray Rationalization', realized: '₹43,000', target: '₹60,000', achievement: 71.7, color: '#10b981', desc: 'Standardizing on Synthes TPLO locking screw diameters to eliminate obsolete non-standard sterile kits.' }
  ];

  const initiatives = [
    { id: 'SAV-001', initiative: 'Zoetis Annual Direct Master Contract', category: 'Vaccines & Biologics', leadPartner: 'Zoetis India', lever: 'Contract Renegotiation', baselineSpend: '₹13,87,000', negotiatedSpend: '₹12,45,000', netSavings: '₹1,42,000', status: 'Realized' },
    { id: 'SAV-002', initiative: 'MSD Bravecto Multi-Clinic Volume Tier Rebate', category: 'Ectoparasiticides', leadPartner: 'MSD Animal Health', lever: 'Volume Aggregation', baselineSpend: '₹11,92,000', negotiatedSpend: '₹10,80,000', netSavings: '₹1,12,000', status: 'Realized' },
    { id: 'SAV-003', initiative: 'Royal Canin Central Warehouse Factory Direct', category: 'Clinical Diets', leadPartner: 'Royal Canin India', lever: 'Volume Aggregation', baselineSpend: '₹9,83,000', negotiatedSpend: '₹8,95,000', netSavings: '₹88,000', status: 'Realized' },
    { id: 'SAV-004', initiative: 'Generic Meloxicam (Melonex) Clinical Switch', category: 'Generic APIs & NSAID', leadPartner: 'Intas Pharmaceuticals', lever: 'Generic Substitution', baselineSpend: '₹2,91,000', negotiatedSpend: '₹2,15,000', netSavings: '₹76,000', status: 'Realized' },
    { id: 'SAV-005', initiative: 'Dynamic 2/10 Net 30 Early Payout Capture', category: 'Treasury & AP', leadPartner: 'Multiple Tier 1', lever: 'Cash Discounts', baselineSpend: '₹19,18,000', negotiatedSpend: '₹18,50,000', netSavings: '₹68,000', status: 'Realized' },
    { id: 'SAV-006', initiative: 'TPLO Orthopedic Plate Tray Standardization', category: 'Surgical Implants', leadPartner: 'Synthes Vet Ortho', lever: 'Volume Aggregation', baselineSpend: '₹4,53,000', negotiatedSpend: '₹4,10,000', netSavings: '₹43,000', status: 'Realized' },
    { id: 'SAV-007', initiative: "Hill's Prescription Diet Strategic Re-tender", category: 'Clinical Diets', leadPartner: "Hill's Pet Nutrition", lever: 'Contract Renegotiation', baselineSpend: '₹5,85,000', negotiatedSpend: '₹5,40,000', netSavings: '₹45,000', status: 'In Progress' },
    { id: 'SAV-008', initiative: 'Broad-Spectrum Ceftriaxone Generic Protocol', category: 'Antibiotics', leadPartner: 'Intas Pharmaceuticals', lever: 'Generic Substitution', baselineSpend: '₹2,22,000', negotiatedSpend: '₹1,80,000', netSavings: '₹42,000', status: 'In Progress' },
    { id: 'SAV-009', initiative: 'Virbac Dermatology Consumable Consolidation', category: 'Topicals', leadPartner: 'Virbac Animal Health', lever: 'Volume Aggregation', baselineSpend: '₹3,21,000', negotiatedSpend: '₹2,95,000', netSavings: '₹26,000', status: 'Realized' },
    { id: 'SAV-010', initiative: 'Central IV Fluids Direct Batch Sourcing', category: 'Critical Care IV', leadPartner: 'Albert David Vet', lever: 'Generic Substitution', baselineSpend: '₹1,74,000', negotiatedSpend: '₹1,50,000', netSavings: '₹24,000', status: 'Pipeline' }
  ];

  const filteredInitiatives = initiatives.filter(init => {
    if (selectedLever !== 'ALL' && init.lever !== selectedLever) return false;
    return true;
  });

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(255,255,255,0.08))', borderRadius: '12px', padding: '22px 24px' };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Realized': return { bg: 'rgba(52,211,153,0.15)', color: '#34d399' };
      case 'In Progress': return { bg: 'rgba(56,189,248,0.15)', color: '#38bdf8' };
      case 'Pipeline': return { bg: 'rgba(251,191,36,0.15)', color: '#fbbf24' };
      default: return { bg: 'rgba(148,163,184,0.15)', color: 'var(--muted-foreground, #64748b)' };
    }
  };

  return (
    <DashboardLayout
      category="Vendors & Procurement"
      subcategory="Procurement Savings"
      title="Procurement Cost Savings & Value Realization"
      subtitle="Negotiated price variances, bulk volume consolidation rebates, generic substitution arbitrage, and cash discounts"
      icon="💰"
      badge="Savings Tracker FY26-27"
      actions={
        <button onClick={() => alert('Exporting Procurement Savings Audit Report...')} style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #3b82f6', background: 'rgba(59,130,246,0.15)', color: '#60a5fa', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
          📊 Savings Audit Report
        </button>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Realized Savings (FYTD)" value="₹6.42 Lakhs" delta="+108.2% vs target" trend="up" subtext="Across all 5 levers" icon="💰" />
        <KpiCard label="Savings % of Addressable Spend" value="12.1%" delta="+2.3% YoY" trend="up" subtext="Total addressable spend" icon="📉" />
        <KpiCard label="Cost Avoidance (Inflation)" value="₹3.80 Lakhs" delta="Price locks preserved" trend="up" subtext="Market inflation hedge" icon="🛡️" />
        <KpiCard label="Generic Substitution Arbitrage" value="₹1.18 Lakhs" delta="35.3% lower unit cost" trend="up" subtext="Pharma & antibiotics" icon="💊" />
        <KpiCard label="Early Pay Discounts Captured" value="₹68,000" delta="92.5% capture rate" trend="up" subtext="2/10 Net 30 terms" icon="⚡" />
        <KpiCard label="Savings in Pipeline (H2)" value="₹4.50 Lakhs" delta="3 major RFPs active" trend="up" subtext="Targeted for closure" icon="🎯" />
      </div>

      {/* Savings Levers Progress */}
      <div style={card}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>🎯 Procurement Savings by Strategic Lever</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
          {savingsLevers.map((sl, i) => (
            <div key={i} style={{ background: 'var(--muted, #f8fafc)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>{sl.lever}</span>
                <span style={{ fontSize: '11px', fontWeight: 700, color: sl.color }}>{sl.achievement}% Target</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                <span style={{ fontSize: '20px', fontWeight: 800, color: sl.color }}>{sl.realized}</span>
                <span style={{ fontSize: '11px', color: '#64748b' }}>Target: {sl.target}</span>
              </div>
              <p style={{ margin: 0, fontSize: '11px', color: 'var(--muted-foreground, #64748b)', lineHeight: 1.4 }}>{sl.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Savings Initiatives Ledger */}
      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>📋 Strategic Savings Projects & Initiatives Ledger</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Tracking baseline spend against negotiated contracts and realized financial value</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <select
              value={selectedLever}
              onChange={e => setSelectedLever(e.target.value)}
              style={{ background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.15))', borderRadius: '6px', padding: '6px 10px', color: 'var(--foreground, #0f172a)', fontSize: '12px' }}
            >
              <option value="ALL">All Savings Levers</option>
              <option value="Volume Aggregation">Volume Aggregation</option>
              <option value="Contract Renegotiation">Contract Renegotiation</option>
              <option value="Generic Substitution">Generic Substitution</option>
              <option value="Cash Discounts">Cash Discounts</option>
            </select>
          </div>
        </div>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'var(--muted, #f8fafc)', borderBottom: '1px solid var(--border, rgba(0,0,0,0.08))' }}>
                {['ID', 'Initiative Name', 'Category', 'Strategic Partner', 'Savings Lever', 'Baseline Spend', 'Contracted Spend', 'Net Savings', 'Status'].map(h => (
                  <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--muted-foreground, #64748b)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredInitiatives.map((item, i) => {
                const badge = getStatusBadge(item.status);
                return (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border, rgba(0,0,0,0.06))' }}>
                    <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', color: '#38bdf8', fontSize: '11px' }}>{item.id}</td>
                    <td style={{ padding: '11px 12px', color: 'var(--foreground, #0f172a)', fontWeight: 600 }}>{item.initiative}</td>
                    <td style={{ padding: '11px 12px', color: 'var(--muted-foreground, #64748b)' }}>{item.category}</td>
                    <td style={{ padding: '11px 12px', color: 'var(--foreground, #334155)' }}>{item.leadPartner}</td>
                    <td style={{ padding: '11px 12px', color: '#a78bfa', fontWeight: 500 }}>{item.lever}</td>
                    <td style={{ padding: '11px 12px', color: '#64748b', textDecoration: 'line-through' }}>{item.baselineSpend}</td>
                    <td style={{ padding: '11px 12px', color: 'var(--foreground, #334155)' }}>{item.negotiatedSpend}</td>
                    <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#34d399' }}>{item.netSavings}</td>
                    <td style={{ padding: '11px 12px' }}>
                      <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, background: badge.bg, color: badge.color }}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
