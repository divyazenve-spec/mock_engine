import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function FinancialForecast() {
  const [scenario, setScenario] = useState('Base Case');

  const projections = [
    { period: 'FY27 Q1', rev: '₹1.52 Cr', cogs: '₹65.4L', opex: '₹48.2L', ebitda: '₹38.4L', pat: '₹29.2L', cashClosing: '₹9.20 Cr' },
    { period: 'FY27 Q2', rev: '₹1.64 Cr', cogs: '₹69.8L', opex: '₹50.5L', ebitda: '₹43.7L', pat: '₹33.6L', cashClosing: '₹9.55 Cr' },
    { period: 'FY27 Q3', rev: '₹1.78 Cr', cogs: '₹74.5L', opex: '₹53.2L', ebitda: '₹50.3L', pat: '₹38.9L', cashClosing: '₹9.95 Cr' },
    { period: 'FY27 Q4', rev: '₹1.95 Cr', cogs: '₹81.2L', opex: '₹56.4L', ebitda: '₹57.4L', pat: '₹44.5L', cashClosing: '₹10.42 Cr' },
    { period: 'FY28 Q1', rev: '₹2.12 Cr', cogs: '₹87.8L', opex: '₹60.1L', ebitda: '₹64.1L', pat: '₹49.8L', cashClosing: '₹10.95 Cr' },
    { period: 'FY28 Q2', rev: '₹2.30 Cr', cogs: '₹94.5L', opex: '₹64.0L', ebitda: '₹71.5L', pat: '₹55.6L', cashClosing: '₹11.55 Cr' },
    { period: 'FY28 Q3', rev: '₹2.50 Cr', cogs: '₹1.02 Cr', opex: '₹68.2L', ebitda: '₹79.8L', pat: '₹62.1L', cashClosing: '₹12.22 Cr' },
    { period: 'FY28 Q4', rev: '₹2.75 Cr', cogs: '₹1.11 Cr', opex: '₹73.0L', ebitda: '₹91.0L', pat: '₹71.0L', cashClosing: '₹13.05 Cr' },
    { period: 'FY29 Q1', rev: '₹3.00 Cr', cogs: '₹1.20 Cr', opex: '₹78.5L', ebitda: '₹1.01 Cr', pat: '₹79.2L', cashClosing: '₹14.00 Cr' },
    { period: 'FY29 Q2', rev: '₹3.30 Cr', cogs: '₹1.31 Cr', opex: '₹84.5L', ebitda: '₹1.14 Cr', pat: '₹89.5L', cashClosing: '₹15.10 Cr' }
  ];

  const capexRoadmap = [
    { project: 'Whitefield Advanced Radiation Oncology Unit', city: 'Bengaluru', budget: '₹95,00,000', targetDate: 'Q1 FY28', roi: '16 Months', status: 'Civil Build' },
    { project: 'Cyber City 24/7 Tertiary Trauma Centre', city: 'Hyderabad', budget: '₹85,00,000', targetDate: 'Q2 FY28', roi: '14 Months', status: 'Procurement' },
    { project: 'BKC Specialist Feline Oncology Pavilion', city: 'Mumbai', budget: '₹60,00,000', targetDate: 'Q3 FY28', roi: '12 Months', status: 'Architectural' },
    { project: 'High-Field 1.5T Veterinary MRI Suite', city: 'Bengaluru', budget: '₹75,00,000', targetDate: 'Q1 FY28', roi: '18 Months', status: 'Vendor RFP' },
    { project: 'OMR Automated Central Pathology Lab', city: 'Chennai', budget: '₹40,00,000', targetDate: 'Q4 FY27', roi: '10 Months', status: 'Fitout' },
    { project: 'Sarjapur Canine Hydrotherapy & Rehab Spa', city: 'Bengaluru', budget: '₹25,00,000', targetDate: 'Q3 FY27', roi: '9 Months', status: 'Fitout' },
    { project: 'Alwarpet Emergency ICU Bed Expansion', city: 'Chennai', budget: '₹30,00,000', targetDate: 'Q4 FY27', roi: '11 Months', status: 'Approved' },
    { project: 'Jubilee Hills Robotic Minimally Invasive Suite', city: 'Hyderabad', budget: '₹55,00,000', targetDate: 'Q2 FY28', roi: '15 Months', status: 'Committed' },
    { project: 'Bandra West Cat-Friendly Luxury Boutique', city: 'Mumbai', budget: '₹35,00,000', targetDate: 'Q3 FY28', roi: '13 Months', status: 'Lease Signed' },
    { project: 'Central Cold-Chain Pharma Warehouse', city: 'Bengaluru', budget: '₹20,00,000', targetDate: 'Q2 FY27', roi: '8 Months', status: 'Commissioning' }
  ];

  return (
    <DashboardLayout
      category="Finance & Accounting"
      subcategory="Financial Forecast"
      title="Financial Forecasting & Predictive Runway"
      subtitle="12-month rolling balance sheet and P&L modeling, multi-scenario Monte Carlo simulations, and capital expenditure roadmap"
      icon="🔮"
      badge="Runway: >36M"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <select
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: '#090e17',
              color: '#cbd5e1',
              fontSize: '12px'
            }}
          >
            <option value="Base Case">Scenario: Base Case (Realistic)</option>
            <option value="Bull Case">Scenario: Bull Case (+25%)</option>
            <option value="Bear Case">Scenario: Conservative / Bear (-15%)</option>
          </select>
          <button
            onClick={() => alert('Exporting full dynamic Excel financial projection model...')}
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
            📊 Export Forecast Model
          </button>
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Next 12M Projected Revenue" value="₹19.45 Cr" delta="+36.2% YoY" trend="up" subtext="Base expansion path" icon="🔮" />
        <KpiCard label="Projected FY28 EBITDA" value="₹5.24 Cr" delta="26.9% margin" trend="up" subtext="Operating leverage" icon="⚡" />
        <KpiCard label="12M Free Cash Flow" value="₹3.62 Cr" delta="Post all CAPEX" trend="up" subtext="Self-funded pipeline" icon="💧" />
        <KpiCard label="Total Planned CAPEX" value="₹5.20 Cr" delta="Across 10 sites" trend="neutral" subtext="Board approved" icon="🏗️" />
        <KpiCard label="Target Breakeven / Bed" value="12.8 Months" delta="-2.4 MoM" trend="up" subtext="Capital efficiency" icon="⏱️" />
        <KpiCard label="Sensitivity Risk Score" value="0.18" delta="Low risk" trend="up" subtext="Stress-tested" icon="🛡️" />
      </div>

      <div style={{
        background: 'var(--card, #131d2e)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '22px 24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#fff' }}>📈 4-Quarter Rolling Forward P&L Projections ({scenario})</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Management predictive model incorporating 14 existing sites + 4 planned expansions</p>
          </div>
          <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>Active Simulation</span>
        </div>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.22)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <th style={{ padding: '10px 20px', textAlign: 'left', color: '#94a3b8' }}>Forward Quarter</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Forecast Revenue</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Direct COGS</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Forecast OPEX</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Projected EBITDA</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Projected PAT</th>
                <th style={{ padding: '10px 20px', textAlign: 'right', color: '#94a3b8' }}>Closing Treasury</th>
              </tr>
            </thead>
            <tbody>
              {projections.map((p, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 20px', color: '#fff', fontWeight: 600 }}>{p.period}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#10b981' }}>{p.rev}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#f87171' }}>{p.cogs}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#94a3b8' }}>{p.opex}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#38bdf8' }}>{p.ebitda}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#34d399' }}>{p.pat}</td>
                  <td style={{ padding: '12px 20px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#fff' }}>{p.cashClosing}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Planned Capital Expenditure (CAPEX) */}
      <div style={{
        background: 'var(--card, #131d2e)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '22px 24px'
      }}>
        <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 700, color: '#fff' }}>🏗️ Capital Expenditure (CAPEX) Expansion Pipeline</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Approved board allocations for modular OT theatres, MRI imaging, and tertiary hubs</p>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.22)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <th style={{ padding: '10px 20px', textAlign: 'left', color: '#94a3b8' }}>Project Name</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#94a3b8' }}>City Cluster</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Approved Budget</th>
                <th style={{ padding: '10px 14px', textAlign: 'center', color: '#94a3b8' }}>Target Live Date</th>
                <th style={{ padding: '10px 14px', textAlign: 'center', color: '#94a3b8' }}>Projected Payback</th>
                <th style={{ padding: '10px 20px', textAlign: 'right', color: '#94a3b8' }}>Execution Status</th>
              </tr>
            </thead>
            <tbody>
              {capexRoadmap.map((c, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 20px', color: '#fff', fontWeight: 600 }}>{c.project}</td>
                  <td style={{ padding: '12px 14px', color: '#38bdf8' }}>{c.city}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#f87171' }}>{c.budget}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'center', color: '#cbd5e1' }}>{c.targetDate}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'center', color: '#10b981', fontWeight: 600 }}>{c.roi}</td>
                  <td style={{ padding: '12px 20px', textAlign: 'right' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'rgba(56,189,248,0.15)', color: '#38bdf8', fontSize: '11px', fontWeight: 600 }}>{c.status}</span>
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
