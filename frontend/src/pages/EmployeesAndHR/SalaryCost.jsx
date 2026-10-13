import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function SalaryCost() {
  const [viewBy, setViewBy] = useState('department');

  const deptCosts = [
    { dept: 'Clinical Veterinary Services', headcount: 48, monthlyCTC: '₹38,50,000', annualCTC: '₹4,62,00,000', pctShare: 21.2, color: '#10b981' },
    { dept: 'Technology & AI Engineering', headcount: 28, monthlyCTC: '₹36,20,000', annualCTC: '₹4,34,40,000', pctShare: 20.0, color: '#8b5cf6' },
    { dept: 'Central Pet Pharmacy', headcount: 34, monthlyCTC: '₹22,80,000', annualCTC: '₹2,73,60,000', pctShare: 12.6, color: '#0ea5e9' },
    { dept: 'Hyperlocal Logistics Fleet', headcount: 42, monthlyCTC: '₹21,50,000', annualCTC: '₹2,58,00,000', pctShare: 11.9, color: '#f59e0b' },
    { dept: 'Veterinary Surgery & ICU', headcount: 15, monthlyCTC: '₹16,40,000', annualCTC: '₹1,96,80,000', pctShare: 9.1, color: '#06b6d4' },
    { dept: 'Dark Store & Warehouse Hubs', headcount: 22, monthlyCTC: '₹12,40,000', annualCTC: '₹1,48,80,000', pctShare: 6.8, color: '#ec4899' },
    { dept: 'Pathology & Diagnostic Labs', headcount: 12, monthlyCTC: '₹11,60,000', annualCTC: '₹1,39,20,000', pctShare: 6.4, color: '#6366f1' },
    { dept: 'Customer Delight & Concierge', headcount: 16, monthlyCTC: '₹9,80,000', annualCTC: '₹1,17,60,000', pctShare: 5.4, color: '#14b8a6' },
    { dept: 'Finance, Procurement & Audit', headcount: 5, monthlyCTC: '₹6,20,000', annualCTC: '₹74,40,000', pctShare: 3.4, color: '#eab308' },
    { dept: 'HR & Talent Acquisition', headcount: 6, monthlyCTC: '₹5,80,000', annualCTC: '₹69,60,000', pctShare: 3.2, color: '#84cc16' }
  ];

  const salaryBands = [
    { band: 'Executive / C-Suite (L7)', range: '₹35L - ₹60L+', count: 6, totalSpend: '₹2,85,00,000' },
    { band: 'Principal Surgeons & Directors (L6)', range: '₹20L - ₹35L', count: 18, totalSpend: '₹4,50,00,000' },
    { band: 'Lead Specialists & Sr Engineers (L5)', range: '₹12L - ₹20L', count: 34, totalSpend: '₹5,10,00,000' },
    { band: 'Veterinary Associates & Managers (L4)', range: '₹6L - ₹12L', count: 72, totalSpend: '₹6,12,00,000' },
    { band: 'Fleet Logistics, Pickers & Technicians (L3)', range: '₹3L - ₹6L', count: 98, totalSpend: '₹3,17,00,000' }
  ];

  return (
    <DashboardLayout
      category="Employees & HR"
      subcategory="Salary Cost"
      title="Workforce CTC & Departmental Compensation Analytics"
      subtitle="Executive Cost-to-Company (CTC) breakdown, salary band stratification, employer statutory liabilities, and annual payroll forecast"
      icon="💰"
      badge=""
    >
      {/* Top Level KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Monthly Total CTC Burn" value="₹1.81 Cr / mo" delta="+4.2%" trend="up" subtext="Direct compensation & benefits" icon="💵" />
        <KpiCard label="Annualized Payroll Commitment" value="₹21.74 Cr" delta="+6.5%" trend="up" subtext="Projected for full financial year" icon="📊" />
        <KpiCard label="Average CTC per Employee" value="₹9.54 LPA" delta="Median: ₹8.4L" trend="up" subtext="Blended clinical, tech & fleet" icon="🏷️" />
        <KpiCard label="Employer Statutory Match" value="₹21.74L / mo" delta="EPFO & ESIC" trend="neutral" subtext="Fully provisioned on balance sheet" icon="🏛️" />
      </div>

      {/* View Switcher */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setViewBy('department')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              border: '1px solid',
              borderColor: viewBy === 'department' ? '#3b82f6' : 'rgba(255,255,255,0.1)',
              background: viewBy === 'department' ? '#3b82f6' : 'transparent',
              color: viewBy === 'department' ? '#fff' : 'var(--muted-foreground, #94a3b8)'
            }}
          >
            🏢 Breakdown by Department
          </button>
          <button
            onClick={() => setViewBy('band')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              border: '1px solid',
              borderColor: viewBy === 'band' ? '#3b82f6' : 'rgba(255,255,255,0.1)',
              background: viewBy === 'band' ? '#3b82f6' : 'transparent',
              color: viewBy === 'band' ? '#fff' : 'var(--muted-foreground, #94a3b8)'
            }}
          >
            📊 Breakdown by Salary Band
          </button>
        </div>
        <span style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)' }}>Audited for FY 2026-2027</span>
      </div>

      {/* Department Breakdown Table */}
      {viewBy === 'department' ? (
        <div style={{
          background: 'var(--card, #1e293b)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '12px',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Departmental CTC Distribution</h3>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)', color: 'var(--muted-foreground, #94a3b8)' }}>
                  <th style={{ padding: '12px 16px' }}>Department</th>
                  <th style={{ padding: '12px 16px' }}>Headcount</th>
                  <th style={{ padding: '12px 16px' }}>Monthly CTC</th>
                  <th style={{ padding: '12px 16px' }}>Annual Commitment</th>
                  <th style={{ padding: '12px 16px' }}>Share of Budget</th>
                </tr>
              </thead>
              <tbody>
                {deptCosts.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center", padding: "36px 16px", color: "#94a3b8" }}>
                      No department cost records found
                    </td>
                  </tr>
                ) : (
                  deptCosts.map(d => (
                    <tr key={d.dept} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <td style={{ padding: '12px 16px', fontWeight: 600, color: d.color }}>{d.dept}</td>
                      <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace' }}>{d.headcount} staff</td>
                      <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600, color: '#f8fafc' }}>{d.monthlyCTC}</td>
                      <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', color: '#38bdf8' }}>{d.annualCTC}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '100px', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '99px', overflow: 'hidden' }}>
                            <div style={{ width: `${d.pctShare}%`, height: '100%', background: d.color, borderRadius: '99px' }}></div>
                          </div>
                          <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: d.color }}>{d.pctShare}%</span>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div style={{
          background: 'var(--card, #1e293b)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '12px',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Compensation Band Stratification</h3>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)', color: 'var(--muted-foreground, #94a3b8)' }}>
                  <th style={{ padding: '12px 16px' }}>Salary Band</th>
                  <th style={{ padding: '12px 16px' }}>CTC Range</th>
                  <th style={{ padding: '12px 16px' }}>Staff Count</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right' }}>Total Annual Spend</th>
                </tr>
              </thead>
              <tbody>
                {salaryBands.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center", padding: "36px 16px", color: "#94a3b8" }}>
                      No compensation band records found
                    </td>
                  </tr>
                ) : (
                  salaryBands.map(b => (
                    <tr key={b.band} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <td style={{ padding: '12px 16px', fontWeight: 600, color: '#f8fafc' }}>{b.band}</td>
                      <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', color: '#93c5fd' }}>{b.range}</td>
                      <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace' }}>{b.count} Employees</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#34d399' }}>{b.totalSpend}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
