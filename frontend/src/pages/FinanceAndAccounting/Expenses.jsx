import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Expenses() {
  const [costCenter, setCostCenter] = useState('ALL');

  const expenseBreakdown = [
    { code: 'OPX-101', name: 'Veterinary Surgeon Salaries & Retainers', cc: 'Clinical Operations', budget: '₹18,00,000', actual: '₹17,80,000', var: '-1.1%', pct: '38.9%', status: 'Favorable' },
    { code: 'OPX-102', name: 'Clinical Veterinary Nurses & Techs', cc: 'Clinical Operations', budget: '₹7,20,000', actual: '₹7,00,000', var: '-2.8%', pct: '15.3%', status: 'Favorable' },
    { code: 'OPX-103', name: 'Hospital Facility Leases & Common Maint', cc: 'Real Estate & Infrastructure', budget: '₹7,80,000', actual: '₹7,80,000', var: '0.0%', pct: '17.1%', status: 'Fixed' },
    { code: 'OPX-104', name: 'Performance Marketing & Pet Owner CAC', cc: 'Growth & Acquisition', budget: '₹4,50,000', actual: '₹4,20,000', var: '-6.7%', pct: '9.2%', status: 'Favorable' },
    { code: 'OPX-105', name: 'Hospital Power, Clean Air & Medical Gases', cc: 'Facilities Management', budget: '₹2,20,000', actual: '₹2,15,000', var: '-2.3%', pct: '4.7%', status: 'Favorable' },
    { code: 'OPX-106', name: 'Biomedical Waste Disposal & Sterilization', cc: 'Quality & Regulatory', budget: '₹1,50,000', actual: '₹1,48,000', var: '-1.3%', pct: '3.2%', status: 'Favorable' },
    { code: 'OPX-107', name: 'AWS Cloud, EHR & AI Diagnostic Servers', cc: 'Technology & AI', budget: '₹1,80,000', actual: '₹1,78,000', var: '-1.1%', pct: '3.9%', status: 'Favorable' },
    { code: 'OPX-108', name: 'Diagnostic Analyzer Annual Maintenance (AMC)', cc: 'Lab Operations', budget: '₹1,20,000', actual: '₹1,25,000', var: '+4.2%', pct: '2.7%', status: 'Review' },
    { code: 'OPX-109', name: 'Corporate Legal, Audit & Statutory Filings', cc: 'Finance & Compliance', budget: '₹1,10,000', actual: '₹1,05,000', var: '-4.5%', pct: '2.3%', status: 'Favorable' },
    { code: 'OPX-110', name: 'Patient Transport & Emergency Van Fuel', cc: 'Logistics Fleet', budget: '₹1,25,000', actual: '₹1,20,600', var: '-3.5%', pct: '2.6%', status: 'Favorable' }
  ];

  const recentExpenseApprovals = [
    { id: 'EXP-8801', desc: 'Siemens Digital X-Ray Detector Calibration & AMC', dept: 'Jayanagar Specialty', amt: '₹1,45,000', requester: 'Dr. Priya Nair', approver: 'VP Clinical', status: 'Approved' },
    { id: 'EXP-8802', desc: 'Quarterly Bio-Medical Hazard Neutralization Run', dept: 'Whitefield Annex', amt: '₹84,000', requester: 'Karthik Subramaniam', approver: 'COO Ops', status: 'Approved' },
    { id: 'EXP-8803', desc: 'Hospital Power Backup UPS Battery Bank Overhaul', dept: 'Koramangala HQ', amt: '₹1,12,000', requester: 'Ramesh Sundaram', approver: 'Head Infra', status: 'Approved' },
    { id: 'EXP-8804', desc: 'Cold Chain Vaccine Transport IoT Loggers (10 Units)', dept: 'Pharmacy Central', amt: '₹62,00,0', requester: 'Sneha Kulkarni', approver: 'Supply Head', status: 'Approved' },
    { id: 'EXP-8805', desc: 'Google Ads & Meta Targeted Geo-Fenced Campaign', dept: 'Marketing Growth', amt: '₹2,50,000', requester: 'Ananya Sen', approver: 'CMO Growth', status: 'Approved' },
    { id: 'EXP-8806', desc: 'Surgical Arthroscopy Fiber Optic Cable Replacement', dept: 'Indiranagar Hub', amt: '₹95,000', requester: 'Dr. Rajesh Varma', approver: 'VP Clinical', status: 'Approved' },
    { id: 'EXP-8807', desc: 'Corporate Statutory Internal Audit Fees Q2', dept: 'Finance & Accounts', amt: '₹1,20,000', requester: 'Vikramaditya Rao', approver: 'CFO Office', status: 'Approved' },
    { id: 'EXP-8808', desc: 'Staff Clinical Uniforms & Infection Barrier Scrubs', dept: 'People Operations', amt: '₹58,000', requester: 'Pooja Hegde', approver: 'HR Lead', status: 'Approved' },
    { id: 'EXP-8809', desc: 'Fleet Van Fast-Charger Installation & Wiring', dept: 'Fleet Logistics', amt: '₹74,000', requester: 'Rahul Deshmukh', approver: 'COO Ops', status: 'Approved' },
    { id: 'EXP-8810', desc: 'AI Radiology DICOM Model Server Hosting (AWS)', dept: 'Technology & AI', amt: '₹1,35,000', requester: 'Divya Nambiar', approver: 'CTO Office', status: 'Approved' }
  ];

  return (
    <DashboardLayout
      category="Finance & Accounting"
      subcategory="Expenses"
      title="Operating Expenses (OPEX) Control & Ledger"
      subtitle="Departmental cost centers, monthly budget variance, automated expense approvals, and facility overheads"
      icon="🏢"
      badge="Total OPEX: ₹45.72 L"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => alert('New expense voucher requisition initiated.')}
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
            + New Expense Voucher
          </button>
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Monthly OPEX" value="₹45,71,600" delta="-1.6% vs Budget" trend="down" subtext="Under budget" icon="🏢" />
        <KpiCard label="Clinical Staffing Payroll" value="₹24,80,000" delta="54.2% of OPEX" trend="neutral" subtext="Surgeons & Nurses" icon="👨‍⚕️" />
        <KpiCard label="Facility Rental Leases" value="₹7,80,000" delta="17.1% of OPEX" trend="neutral" subtext="14 locations" icon="📍" />
        <KpiCard label="Marketing & CAC" value="₹4,20,000" delta="Blended CAC: ₹480" trend="down" subtext="Acquisition burn" icon="📣" />
        <KpiCard label="Hospital Utilities" value="₹2,15,000" delta="-2.3% MoM" trend="down" subtext="Clean power + bio-gas" icon="⚡" />
        <KpiCard label="Budget Adherence" value="98.4%" delta="High compliance" trend="up" subtext="Disciplined burn" icon="🛡️" />
      </div>

      <div style={{
        background: 'var(--card, #131d2e)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '22px 24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#fff' }}>📋 Departmental OPEX Cost Centers</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Actual disbursements vs approved financial budget allocation</p>
          </div>
          <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>Active Controls</span>
        </div>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.22)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <th style={{ padding: '10px 20px', textAlign: 'left', color: '#94a3b8' }}>Code & Line Item</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#94a3b8' }}>Cost Center</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Approved Budget</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Actual Spend</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Variance</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>% of OPEX</th>
                <th style={{ padding: '10px 20px', textAlign: 'right', color: '#94a3b8' }}>Compliance</th>
              </tr>
            </thead>
            <tbody>
              {expenseBreakdown.map((e, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 20px', color: '#fff', fontWeight: 600 }}>
                    <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px', color: '#64748b', marginRight: '8px' }}>{e.code}</span>
                    {e.name}
                  </td>
                  <td style={{ padding: '12px 14px', color: '#38bdf8' }}>{e.cc}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#94a3b8' }}>{e.budget}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#f87171', fontWeight: 700 }}>{e.actual}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: e.var.startsWith('-') ? '#10b981' : e.var === '0.0%' ? '#94a3b8' : '#fbbf24' }}>
                    {e.var}
                  </td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#cbd5e1' }}>{e.pct}</td>
                  <td style={{ padding: '12px 20px', textAlign: 'right' }}>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '10px',
                      fontWeight: 600,
                      background: e.status === 'Favorable' || e.status === 'Fixed' ? 'rgba(16,185,129,0.15)' : e.status === 'Review' ? 'rgba(245,158,11,0.15)' : 'rgba(56,189,248,0.15)',
                      color: e.status === 'Favorable' || e.status === 'Fixed' ? '#34d399' : e.status === 'Review' ? '#fbbf24' : '#38bdf8'
                    }}>
                      {e.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Expense Approvals */}
      <div style={{
        background: 'var(--card, #131d2e)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '22px 24px'
      }}>
        <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 700, color: '#fff' }}>📑 Expense Requisitions & Approvals Audit</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Recent corporate card and procurement requisitions verified against delegation of powers (DoP)</p>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.22)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <th style={{ padding: '10px 20px', textAlign: 'left', color: '#94a3b8' }}>Requisition ID</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#94a3b8' }}>Description</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#94a3b8' }}>Facility / Department</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Amount</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#94a3b8' }}>Requester & Approver</th>
                <th style={{ padding: '10px 20px', textAlign: 'right', color: '#94a3b8' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentExpenseApprovals.map((req, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 20px', fontFamily: '"IBM Plex Mono", monospace', color: '#38bdf8' }}>{req.id}</td>
                  <td style={{ padding: '12px 14px', color: '#fff', fontWeight: 600 }}>{req.desc}</td>
                  <td style={{ padding: '12px 14px', color: '#94a3b8' }}>{req.dept}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#f87171' }}>{req.amt}</td>
                  <td style={{ padding: '12px 14px', color: '#cbd5e1' }}>
                    <b>{req.requester}</b><br />
                    <span style={{ fontSize: '10px', color: '#64748b' }}>Appr: {req.approver}</span>
                  </td>
                  <td style={{ padding: '12px 20px', textAlign: 'right' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'rgba(16,185,129,0.15)', color: '#34d399', fontSize: '11px', fontWeight: 600 }}>{req.status}</span>
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
