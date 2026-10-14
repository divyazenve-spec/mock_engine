import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function SupplierPerformance() {
  const [selectedTier, setSelectedTier] = useState('ALL');
  const [search, setSearch] = useState('');

  const suppliers = [
    { id: 'SUP-01', name: 'Zoetis Animal Health India', qbrTier: 'Tier 1 Strategic', otifRate: 99.2, coldChainCompliance: 100, defectPpm: 18, invoiceAccuracy: 99.8, avgLeadDays: 2.1, auditCert: 'WHO-GMP & USFDA', status: 'Excellent' },
    { id: 'SUP-02', name: 'MSD Animal Health Pvt Ltd', qbrTier: 'Tier 1 Strategic', otifRate: 98.9, coldChainCompliance: 100, defectPpm: 24, invoiceAccuracy: 99.6, avgLeadDays: 2.4, auditCert: 'WHO-GMP & EMA', status: 'Excellent' },
    { id: 'SUP-03', name: 'Royal Canin India Pvt Ltd', qbrTier: 'Tier 1 Strategic', otifRate: 98.4, coldChainCompliance: 99.4, defectPpm: 32, invoiceAccuracy: 99.2, avgLeadDays: 3.2, auditCert: 'ISO 22000 & HACCP', status: 'Excellent' },
    { id: 'SUP-04', name: 'Boehringer Ingelheim Vet', qbrTier: 'Tier 1 Strategic', otifRate: 98.1, coldChainCompliance: 99.6, defectPpm: 28, invoiceAccuracy: 99.4, avgLeadDays: 2.8, auditCert: 'WHO-GMP & EU-GMP', status: 'Excellent' },
    { id: 'SUP-05', name: "Hill's Pet Nutrition India", qbrTier: 'Tier 2 Preferred', otifRate: 97.8, coldChainCompliance: 99.1, defectPpm: 45, invoiceAccuracy: 99.0, avgLeadDays: 3.5, auditCert: 'SQF Level 3 & ISO', status: 'Good' },
    { id: 'SUP-06', name: 'Synthes Vet Orthopedics', qbrTier: 'Tier 2 Preferred', otifRate: 96.5, coldChainCompliance: 99.8, defectPpm: 35, invoiceAccuracy: 98.8, avgLeadDays: 4.1, auditCert: 'ISO 13485 Med-Device', status: 'Good' },
    { id: 'SUP-07', name: 'Farmina Pet Foods India', qbrTier: 'Tier 2 Preferred', otifRate: 97.2, coldChainCompliance: 98.9, defectPpm: 52, invoiceAccuracy: 98.6, avgLeadDays: 3.0, auditCert: 'ISO 9001 & Cruelty-Free', status: 'Good' },
    { id: 'SUP-08', name: 'Virbac Animal Health India', qbrTier: 'Tier 2 Preferred', otifRate: 97.5, coldChainCompliance: 99.2, defectPpm: 48, invoiceAccuracy: 99.1, avgLeadDays: 2.7, auditCert: 'WHO-GMP & cGMP', status: 'Good' },
    { id: 'SUP-09', name: 'Intas Pharmaceuticals Vet', qbrTier: 'Tier 3 Tactical', otifRate: 96.8, coldChainCompliance: 98.8, defectPpm: 64, invoiceAccuracy: 98.4, avgLeadDays: 3.8, auditCert: 'WHO-GMP Certified', status: 'Good' },
    { id: 'SUP-10', name: 'Purina PetCare India', qbrTier: 'Tier 3 Tactical', otifRate: 96.1, coldChainCompliance: 98.5, defectPpm: 72, invoiceAccuracy: 98.1, avgLeadDays: 4.2, auditCert: 'FSSC 22000 & ISO', status: 'Acceptable' }
  ];

  const auditHighlights = [
    { title: 'Cold-Chain Integrity Compliance', status: '100% Pass', score: '2°C - 8°C Verified', desc: 'Active continuous temperature logger data verified for all vaccine & biologic consignments across hubs.' },
    { title: 'Defect Rate (PPM Benchmark)', status: '38 PPM', score: 'World-Class Quality', desc: 'Pharmaceutical packaging, sterile packaging seal integrity, and batch code readability audited on GRN.' },
    { title: '3-Way ERP Match Precision', status: '99.2% Match', score: 'Zero Discrepancies', desc: 'Automated digital verification of Purchase Order lines, Goods Receipt Notes (GRN), and Supplier Invoices.' }
  ];

  const filtered = suppliers.filter(s => {
    if (selectedTier !== 'ALL' && s.qbrTier !== selectedTier) return false;
    if (search) {
      const q = search.toLowerCase();
      return s.name.toLowerCase().includes(q) || s.auditCert.toLowerCase().includes(q) || s.id.toLowerCase().includes(q);
    }
    return true;
  });

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(255,255,255,0.08))', borderRadius: '12px', padding: '22px 24px' };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Excellent': return { bg: 'rgba(52,211,153,0.15)', color: '#34d399' };
      case 'Good': return { bg: 'rgba(56,189,248,0.15)', color: '#38bdf8' };
      case 'Acceptable': return { bg: 'rgba(251,191,36,0.15)', color: '#fbbf24' };
      case 'Under Review': return { bg: 'rgba(248,113,113,0.15)', color: '#f87171' };
      default: return { bg: 'rgba(148,163,184,0.15)', color: 'var(--muted-foreground, #64748b)' };
    }
  };

  return (
    <DashboardLayout
      category="Vendors & Procurement"
      subcategory="Supplier Performance"
      title="Supplier Quality Engineering & SLA Scorecards"
      subtitle="On-time in-full (OTIF), cold-chain compliance, defect rates (PPM), invoice accuracy, and GMP audit certifications"
      icon="🎯"
      badge="Supplier SLA Audit"
      actions={
        <button onClick={() => alert('Initiating Supplier Quality Audit & QBR Review...')} style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #3b82f6', background: 'rgba(59,130,246,0.15)', color: '#60a5fa', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
          🩺 Schedule Audit
        </button>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Network OTIF Delivery Rate" value="98.4%" delta="+1.4% MoM" trend="up" subtext="On-Time In-Full benchmark" icon="⏱️" />
        <KpiCard label="Cold-Chain Compliance" value="100%" delta="Zero breaches YTD" trend="up" subtext="2°C - 8°C vaccine integrity" icon="❄️" />
        <KpiCard label="Avg. Defect PPM" value="38 PPM" delta="-14 PPM vs target" trend="up" subtext="World-class pharma spec" icon="🛡️" />
        <KpiCard label="Invoice Match Accuracy" value="99.2%" delta="Three-way PO-GRN-Inv" trend="up" subtext="Discrepancy < 0.8%" icon="📑" />
        <KpiCard label="Strategic Tier 1 Suppliers" value="4 Vendors" delta="68% total spend" trend="up" subtext="High reliability index" icon="⭐" />
        <KpiCard label="Audit Recertifications" value="100% Passed" delta="10 of 10 certified" trend="up" subtext="WHO-GMP & ISO 13485" icon="📜" />
      </div>

      {/* Quality Highlights */}
      <div style={card}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>🛡️ Quality Assurance & Regulatory Compliance Highlights</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
          {auditHighlights.map((a, i) => (
            <div key={i} style={{ background: 'var(--muted, #f8fafc)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>{a.title}</span>
                <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, background: 'rgba(52,211,153,0.15)', color: '#34d399' }}>{a.status}</span>
              </div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#38bdf8', marginBottom: '6px' }}>{a.score}</div>
              <p style={{ margin: 0, fontSize: '11px', color: 'var(--muted-foreground, #64748b)', lineHeight: 1.5 }}>{a.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Supplier Scorecard Table */}
      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>📊 Comprehensive Supplier Scorecard</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>OTIF delivery fulfillment, cold chain integrity, defect PPM, and lead-time audit</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search supplier, cert, ID..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.15))', borderRadius: '6px', padding: '6px 12px', color: 'var(--foreground, #0f172a)', fontSize: '12px', minWidth: '220px' }}
            />
            <select
              value={selectedTier}
              onChange={e => setSelectedTier(e.target.value)}
              style={{ background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.15))', borderRadius: '6px', padding: '6px 10px', color: 'var(--foreground, #0f172a)', fontSize: '12px' }}
            >
              <option value="ALL">All QBR Tiers</option>
              <option value="Tier 1 Strategic">Tier 1 Strategic</option>
              <option value="Tier 2 Preferred">Tier 2 Preferred</option>
              <option value="Tier 3 Tactical">Tier 3 Tactical</option>
            </select>
          </div>
        </div>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'var(--muted, #f8fafc)', borderBottom: '1px solid var(--border, rgba(0,0,0,0.08))' }}>
                {['ID', 'Supplier Name', 'QBR Tier', 'OTIF Rate', 'Cold-Chain SLA', 'Defect PPM', 'Invoice Accuracy', 'Avg Lead Time', 'Audit Certifications', 'Overall Status'].map(h => (
                  <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--muted-foreground, #64748b)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => {
                const badge = getStatusBadge(s.status);
                return (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border, rgba(0,0,0,0.06))' }}>
                    <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', color: '#38bdf8', fontSize: '11px' }}>{s.id}</td>
                    <td style={{ padding: '11px 12px', color: 'var(--foreground, #0f172a)', fontWeight: 600 }}>{s.name}</td>
                    <td style={{ padding: '11px 12px', color: '#a78bfa', fontWeight: 600 }}>{s.qbrTier}</td>
                    <td style={{ padding: '11px 12px', fontWeight: 700, color: s.otifRate >= 98 ? '#34d399' : s.otifRate >= 95 ? '#38bdf8' : '#fbbf24' }}>{s.otifRate}%</td>
                    <td style={{ padding: '11px 12px', color: s.coldChainCompliance >= 99.5 ? '#34d399' : '#38bdf8' }}>{s.coldChainCompliance}%</td>
                    <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', color: s.defectPpm < 30 ? '#34d399' : s.defectPpm < 80 ? '#fbbf24' : '#f87171' }}>{s.defectPpm} PPM</td>
                    <td style={{ padding: '11px 12px', color: 'var(--foreground, #334155)' }}>{s.invoiceAccuracy}%</td>
                    <td style={{ padding: '11px 12px', color: 'var(--foreground, #334155)' }}>{s.avgLeadDays} days</td>
                    <td style={{ padding: '11px 12px', color: 'var(--muted-foreground, #64748b)', fontSize: '11px' }}>{s.auditCert}</td>
                    <td style={{ padding: '11px 12px' }}>
                      <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, background: badge.bg, color: badge.color }}>
                        {s.status}
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
