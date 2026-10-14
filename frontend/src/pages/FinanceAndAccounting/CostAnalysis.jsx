import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function CostAnalysis() {
  const [costModel, setCostModel] = useState('Activity-Based');

  const activityCosts = [
    { activity: 'General Outpatient Consultation', type: 'Outpatient Care', unitCost: '₹280', benchmark: '₹450', variance: '-37.8%', efficiency: 'Tier-1 Leader' },
    { activity: 'Canine TPLO Knee Reconstruction', type: 'Surgical Theatre', unitCost: '₹16,400', benchmark: '₹22,000', variance: '-25.5%', efficiency: 'High Margin' },
    { activity: 'Abdominal Ultrasound Sonography', type: 'Diagnostic Imaging', unitCost: '₹620', benchmark: '₹950', variance: '-34.7%', efficiency: 'Optimal Asset Use' },
    { activity: 'Automated Complete Blood Count (CBC)', type: 'Pathology Lab', unitCost: '₹145', benchmark: '₹220', variance: '-34.1%', efficiency: 'IDEXX High Volume' },
    { activity: 'Overnight ICU Inpatient Bed-Day', type: 'Inpatient Critical Care', unitCost: '₹1,850', benchmark: '₹2,600', variance: '-28.8%', efficiency: 'Staff Shift Optimal' },
    { activity: 'Dental Ultrasonic Scaling & Polishing', type: 'Preventive Care', unitCost: '₹890', benchmark: '₹1,400', variance: '-36.4%', efficiency: 'Automated Suite' },
    { activity: 'High-Resolution Brain MRI Scan', type: 'Advanced Radiology', unitCost: '₹4,200', benchmark: '₹6,000', variance: '-30.0%', efficiency: 'In-house Magnet' },
    { activity: 'Emergency Gastric Decompression & Surgery', type: 'Emergency Care', unitCost: '₹18,500', benchmark: '₹25,000', variance: '-26.0%', efficiency: 'Critical Response' },
    { activity: 'Chemotherapy Intravenous Infusion', type: 'Oncology Services', unitCost: '₹2,900', benchmark: '₹4,200', variance: '-31.0%', efficiency: 'Bio-Safety Cabinet' },
    { activity: 'Canine/Feline Core Annual Vaccination', type: 'Wellness Program', unitCost: '₹320', benchmark: '₹500', variance: '-36.0%', efficiency: 'Central Cold-Chain Bulk' }
  ];

  const costStructure = [
    { category: 'Clinical Staff Salaries (Permanent)', pct: '31.5%', monthlyAmt: '₹34,20,000', behavior: 'Fixed: 14 hospitals minimum staffing ratio' },
    { category: 'Direct Surgical Consumables & Implants', pct: '28.2%', monthlyAmt: '₹30,62,000', behavior: 'Variable: Scales strictly with surgical caseload' },
    { category: 'Facility Rent & Hospital Leases', pct: '10.6%', monthlyAmt: '₹11,50,000', behavior: 'Fixed: Long-term lease agreements across metros' },
    { category: 'Pharmaceuticals & Cold-chain Vaccines', pct: '18.5%', monthlyAmt: '₹20,08,000', behavior: 'Semi-Variable: High inventory turn with buffer stock' },
    { category: 'Medical Diagnostics Reagents & AMCs', pct: '6.8%', monthlyAmt: '₹7,38,000', behavior: 'Semi-Variable: Baseline commit + pay-per-test' },
    { category: 'Cloud Infrastructure & Digital Telehealth', pct: '4.4%', monthlyAmt: '₹4,78,000', behavior: 'Variable: AWS serverless consumption & EHR licenses' }
  ];

  return (
    <DashboardLayout
      category="Finance & Accounting"
      subcategory="Cost Analysis"
      title="Cost Structure, Activity-Based Costing & Breakeven"
      subtitle="Activity-based unit costs (ABC), marginal procedure absorption, fixed vs variable cost equilibrium, and safety margin"
      icon="🔍"
      badge="Margin of Safety: 38.5%"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => alert('Exporting comprehensive Activity-Based Costing (ABC) ledger...')}
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
            🔍 Export Cost Model
          </button>
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Network Monthly Breakeven" value="₹87,80,000" delta="Actual: ₹1,42,85,000" trend="up" subtext="61.5% capacity achieved" icon="⚖️" />
        <KpiCard label="Margin of Safety" value="38.5%" delta="+4.2% pts" trend="up" subtext="Substantial cushion" icon="🛡️" />
        <KpiCard label="Cost / Inpatient Bed-Day" value="₹1,850" delta="-6.2% vs BM" trend="up" subtext="Optimized nurse-to-pet ratio" icon="🛏️" />
        <KpiCard label="Cost / Surgical OT Hour" value="₹3,400 / hr" delta="High throughput" trend="up" subtext="Operating theatres" icon="🩺" />
        <KpiCard label="Fixed Cost Ratio" value="31.5%" delta="Lean real estate" trend="up" subtext="₹34.2L fixed base" icon="🏢" />
        <KpiCard label="Variable Cost Ratio" value="68.5%" delta="High elasticity" trend="up" subtext="Low risk capital model" icon="📉" />
      </div>

      <div style={{
        background: 'var(--card, #131d2e)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '22px 24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#fff' }}>📋 Activity-Based Unit Costing (ABC Model)</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Granular clinical unit costs compared to private hospital industry benchmarks</p>
          </div>
          <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>15–26% Cost Advantage</span>
        </div>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.22)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <th style={{ padding: '10px 20px', textAlign: 'left', color: '#94a3b8' }}>Clinical Activity / Procedure Unit</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#94a3b8' }}>Service Classification</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Zenve Unit Cost</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Metro Benchmark</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Variance</th>
                <th style={{ padding: '10px 20px', textAlign: 'right', color: '#94a3b8' }}>Efficiency Rating</th>
              </tr>
            </thead>
            <tbody>
              {activityCosts.map((a, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 20px', color: '#fff', fontWeight: 600 }}>{a.activity}</td>
                  <td style={{ padding: '12px 14px', color: '#38bdf8' }}>{a.type}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#34d399' }}>{a.unitCost}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#94a3b8' }}>{a.benchmark}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#10b981', fontWeight: 600 }}>{a.variance}</td>
                  <td style={{ padding: '12px 20px', textAlign: 'right' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'rgba(16,185,129,0.15)', color: '#34d399', fontSize: '11px', fontWeight: 600 }}>{a.efficiency}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cost Behavior & Fixed vs Variable Split */}
      <div style={{
        background: 'var(--card, #131d2e)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '22px 24px'
      }}>
        <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 700, color: '#fff' }}>⚖️ Cost Behavior Breakdown & Operating Leverage</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Analysis of operational flexibility during demand swings</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '14px' }}>
          {costStructure.map((c, idx) => (
            <div key={idx} style={{
              background: 'rgba(0,0,0,0.18)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '8px',
              padding: '14px 18px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <b style={{ color: '#38bdf8', fontSize: '13px' }}>{c.category}</b>
                <span style={{ color: '#fff', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{c.pct}</span>
              </div>
              <div style={{ fontSize: '18px', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace', color: '#10b981', marginBottom: '6px' }}>{c.monthlyAmt}</div>
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>{c.behavior}</div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
