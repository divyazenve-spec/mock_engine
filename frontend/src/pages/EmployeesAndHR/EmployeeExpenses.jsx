import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function EmployeeExpenses() {
  const [filterCategory, setFilterCategory] = useState('ALL');

  const [claims, setClaims] = useState([
    { id: 'EXP-2026-501', empName: 'Dr. Priya Nair', role: 'Chief Veterinary Officer', dept: 'Clinical Care', category: 'Medical Consumables', date: '2026-10-10', merchant: 'Surgical Supplies Bangalore Pvt Ltd', amount: '₹14,500', receipt: 'INV-SSB-88392.pdf', status: 'Approved' },
    { id: 'EXP-2026-502', empName: 'Dr. Rajesh Varma', role: 'Lead Veterinary Surgeon', dept: 'Clinical Care', category: 'Travel & Conveyance', date: '2026-10-09', merchant: 'IndiGo Airlines (BLR to BOM Vet Summit)', amount: '₹18,450', receipt: '6E-TKT-99231.pdf', status: 'Approved' },
    { id: 'EXP-2026-503', empName: 'Karthik Subramaniam', role: 'Hyperlocal Fleet Operations Mgr', dept: 'Logistics & Fleet', category: 'Fuel & EV Charging', date: '2026-10-11', merchant: 'Shell Koramangala Station', amount: '₹8,650', receipt: 'SHL-REC-11204.pdf', status: 'Pending' },
    { id: 'EXP-2026-504', empName: 'Sneha Kulkarni', role: 'Head of Central Pharmacy', dept: 'Pharmacy', category: 'Medical Consumables', date: '2026-10-08', merchant: 'ColdChain MedTech Solutions', amount: '₹22,800', receipt: 'CCM-INV-4412.pdf', status: 'Approved' },
    { id: 'EXP-2026-505', empName: 'Vikramaditya Rao', role: 'Director of Engineering & AI', dept: 'Technology & AI', category: 'Software Subscriptions', date: '2026-10-05', merchant: 'Amazon Web Services / AWS India', amount: '₹84,200', receipt: 'AWS-INV-77319.pdf', status: 'Approved' },
    { id: 'EXP-2026-506', empName: 'Ananya Sen', role: 'Lead Talent Acquisition & HR', dept: 'People & HR', category: 'Meals & Offsite', date: '2026-10-07', merchant: 'Third Wave Coffee HSR Layout', amount: '₹3,450', receipt: 'TWC-BILL-9012.pdf', status: 'Approved' },
    { id: 'EXP-2026-507', empName: 'Pooja Hegde', role: 'Senior Veterinary Pathologist', dept: 'Diagnostics & Pathology', category: 'Medical Consumables', date: '2026-10-12', merchant: 'Bio-Rad Laboratories India', amount: '₹36,700', receipt: 'BR-INV-55102.pdf', status: 'Pending' },
    { id: 'EXP-2026-508', empName: 'Mohammed Zeeshan', role: 'Lead Customer Experience', dept: 'Customer Delight', category: 'Software Subscriptions', date: '2026-10-04', merchant: 'Freshdesk / Freshworks Inc', amount: '₹16,500', receipt: 'FW-INV-66190.pdf', status: 'Approved' },
    { id: 'EXP-2026-509', empName: 'Rahul Deshmukh', role: 'Dark Store Warehouse Supervisor', dept: 'Warehouse & Logistics', category: 'Travel & Conveyance', date: '2026-10-11', merchant: 'Uber India (Inter-warehouse audit)', amount: '₹2,600', receipt: 'UBR-TRIP-3321.pdf', status: 'Pending' },
    { id: 'EXP-2026-510', empName: 'Edwin Nambiar', role: 'Junior Clinical Associate', dept: 'Clinical Care', category: 'Meals & Offsite', date: '2026-10-06', merchant: 'Swiggy Gourmet Catering (Clinic Overtime)', amount: '₹4,250', receipt: 'SWG-ODR-8841.pdf', status: 'Pending' }
  ]);

  function handleAction(id, newStatus) {
    setClaims(claims.map(c => c.id === id ? { ...c, status: newStatus } : c));
  }

  const filtered = claims.filter(c => {
    if (filterCategory === 'ALL') return true;
    return c.category.toLowerCase().includes(filterCategory.toLowerCase());
  });

  return (
    <DashboardLayout
      category="Employees & HR"
      subcategory="Employee Expenses"
      title="Expense Reimbursements & Financial Disbursals"
      subtitle="Corporate travel, clinical consumable claims, fuel stipends, software subscriptions, and tax invoice audits"
      icon="🧾"
      badge="10 Logged Claims"
    >
      {/* Top Level KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Monthly Claims Disbursed" value="₹2,10,750" delta="+12.4% vs Sep" trend="positive" subtext="Across 10 corporate divisions" icon="💵" />
        <KpiCard label="Pending Approval Queue" value="4 Claims" delta="₹52,200 pending" trend="neutral" subtext="Standard 24h manager SLA" icon="⏳" />
        <KpiCard label="GST Input Credit Reclaimed" value="₹37,935" delta="18.0% GST Avg" trend="positive" subtext="Direct tax savings for Zenve" icon="🏛️" />
        <KpiCard label="Policy Compliance Rate" value="99.4%" delta="Zero fraud detected" trend="positive" subtext="Automated OCR receipt scan" icon="🛡️" />
      </div>

      {/* Expense Filter Bar */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)', fontWeight: 600 }}>Category Filter:</span>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {['ALL', 'Medical', 'Fuel', 'Travel', 'Software', 'Meals'].map(c => (
              <button
                key={c}
                onClick={() => setFilterCategory(c)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: filterCategory === c ? '#3b82f6' : 'rgba(255,255,255,0.1)',
                  background: filterCategory === c ? '#3b82f6' : 'transparent',
                  color: filterCategory === c ? '#fff' : 'var(--muted-foreground, #94a3b8)'
                }}
              >
                {c === 'ALL' ? 'All Categories' : c}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => alert('New reimbursement claim modal launched.')}
          style={{
            padding: '6px 14px',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            border: 'none',
            background: '#3b82f6',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span>➕</span> Submit Expense Claim
        </button>
      </div>

      {/* Expense Claims Table */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Employee Expense Claims ({filtered.length})</h3>
          <span style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)' }}>Audited for IT &amp; GST compliance</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)', color: 'var(--muted-foreground, #94a3b8)' }}>
                <th style={{ padding: '12px 16px' }}>Claim ID</th>
                <th style={{ padding: '12px 16px' }}>Employee</th>
                <th style={{ padding: '12px 16px' }}>Category</th>
                <th style={{ padding: '12px 16px' }}>Date</th>
                <th style={{ padding: '12px 16px' }}>Merchant / Vendor</th>
                <th style={{ padding: '12px 16px' }}>Amount</th>
                <th style={{ padding: '12px 16px' }}>Receipt Proof</th>
                <th style={{ padding: '12px 16px' }}>Status</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', color: '#93c5fd' }}>{c.id}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ fontWeight: 600, color: '#f8fafc' }}>{c.empName}</div>
                    <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)' }}>{c.role}</div>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#cbd5e1' }}>{c.category}</td>
                  <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', color: 'var(--muted-foreground, #94a3b8)' }}>{c.date}</td>
                  <td style={{ padding: '12px 16px', color: '#cbd5e1' }}>{c.merchant}</td>
                  <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#34d399' }}>{c.amount}</td>
                  <td style={{ padding: '12px 16px', fontSize: '11px', color: '#93c5fd' }}>{c.receipt}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '99px',
                      fontSize: '10px',
                      fontWeight: 700,
                      background: c.status === 'Approved' ? 'rgba(16,185,129,0.15)' : c.status === 'Pending' ? 'rgba(234,179,8,0.15)' : 'rgba(239,68,68,0.15)',
                      color: c.status === 'Approved' ? '#10b981' : c.status === 'Pending' ? '#eab308' : '#ef4444'
                    }}>
                      ● {c.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    {c.status === 'Pending' ? (
                      <div style={{ display: 'inline-flex', gap: '6px' }}>
                        <button
                          onClick={() => handleAction(c.id, 'Approved')}
                          style={{
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '10px',
                            fontWeight: 700,
                            background: '#10b981',
                            color: '#fff',
                            border: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleAction(c.id, 'Rejected')}
                          style={{
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '10px',
                            fontWeight: 700,
                            background: '#ef4444',
                            color: '#fff',
                            border: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)' }}>Reimbursed</span>
                    )}
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
