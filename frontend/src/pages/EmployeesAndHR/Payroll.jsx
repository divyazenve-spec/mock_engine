import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Payroll() {
  const [selectedMonth, setSelectedMonth] = useState('September 2026');
  const [disbursed, setDisbursed] = useState(true);
  const [showPayslip, setShowPayslip] = useState(null);

  const payrollRecords = [
    {
      empId: 'EMP-1001',
      name: 'Dr. Priya Nair',
      role: 'Chief Veterinary Officer',
      dept: 'Clinical',
      basic: '₹95,000',
      hra: '₹45,000',
      allowances: '₹45,000',
      pfDeduction: '₹11,400',
      tds: '₹18,500',
      netPay: '₹1,55,100',
      bankAcc: 'HDFC •••• 4091',
      pan: 'ABCDE1234F',
      disbursedDate: '01 Oct 2026'
    },
    {
      empId: 'EMP-1002',
      name: 'Dr. Rajesh Varma',
      role: 'Lead Veterinary Surgeon',
      dept: 'Clinical',
      basic: '₹88,000',
      hra: '₹40,000',
      allowances: '₹42,000',
      pfDeduction: '₹10,560',
      tds: '₹16,200',
      netPay: '₹1,43,240',
      bankAcc: 'ICICI •••• 8821',
      pan: 'BCDEF2345G',
      disbursedDate: '01 Oct 2026'
    },
    {
      empId: 'EMP-1003',
      name: 'Sneha Kulkarni',
      role: 'Head of Central Pharmacy',
      dept: 'Pharmacy',
      basic: '₹65,000',
      hra: '₹30,000',
      allowances: '₹30,000',
      pfDeduction: '₹7,800',
      tds: '₹10,500',
      netPay: '₹1,06,700',
      bankAcc: 'Axis •••• 3349',
      pan: 'CDEFG3456H',
      disbursedDate: '01 Oct 2026'
    },
    {
      empId: 'EMP-1004',
      name: 'Vikramaditya Rao',
      role: 'Director of Engineering & AI',
      dept: 'Technology',
      basic: '₹1,20,000',
      hra: '₹55,000',
      allowances: '₹50,000',
      pfDeduction: '₹14,400',
      tds: '₹26,000',
      netPay: '₹1,84,600',
      bankAcc: 'HDFC •••• 9912',
      pan: 'DEFGH4567I',
      disbursedDate: '01 Oct 2026'
    },
    {
      empId: 'EMP-1005',
      name: 'Ananya Sen',
      role: 'Lead Talent Acquisition & HR',
      dept: 'HR & People',
      basic: '₹55,000',
      hra: '₹25,000',
      allowances: '₹25,000',
      pfDeduction: '₹6,600',
      tds: '₹7,500',
      netPay: '₹90,900',
      bankAcc: 'Kotak •••• 1245',
      pan: 'EFGHI5678J',
      disbursedDate: '01 Oct 2026'
    },
    {
      empId: 'EMP-1006',
      name: 'Karthik Subramaniam',
      role: 'Hyperlocal Fleet Operations Mgr',
      dept: 'Logistics',
      basic: '₹52,000',
      hra: '₹22,000',
      allowances: '₹24,000',
      pfDeduction: '₹6,240',
      tds: '₹6,800',
      netPay: '₹84,960',
      bankAcc: 'SBI •••• 5532',
      pan: 'FGHIJ6789K',
      disbursedDate: '01 Oct 2026'
    },
    {
      empId: 'EMP-1007',
      name: 'Pooja Hegde',
      role: 'Senior Veterinary Pathologist',
      dept: 'Clinical',
      basic: '₹68,000',
      hra: '₹30,000',
      allowances: '₹32,000',
      pfDeduction: '₹8,160',
      tds: '₹11,000',
      netPay: '₹1,10,840',
      bankAcc: 'HDFC •••• 6610',
      pan: 'GHIJK7890L',
      disbursedDate: '01 Oct 2026'
    },
    {
      empId: 'EMP-1008',
      name: 'Mohammed Zeeshan',
      role: 'Lead Customer Experience',
      dept: 'Customer Delight',
      basic: '₹42,000',
      hra: '₹18,000',
      allowances: '₹18,000',
      pfDeduction: '₹5,040',
      tds: '₹4,200',
      netPay: '₹68,760',
      bankAcc: 'ICICI •••• 7741',
      pan: 'HIJKL8901M',
      disbursedDate: '01 Oct 2026'
    },
    {
      empId: 'EMP-1009',
      name: 'Rahul Deshmukh',
      role: 'Dark Store Warehouse Supervisor',
      dept: 'Warehouse',
      basic: '₹40,000',
      hra: '₹16,000',
      allowances: '₹18,000',
      pfDeduction: '₹4,800',
      tds: '₹3,800',
      netPay: '₹65,400',
      bankAcc: 'Canara •••• 8820',
      pan: 'IJKLM9012N',
      disbursedDate: '01 Oct 2026'
    },
    {
      empId: 'EMP-1010',
      name: 'Edwin Nambiar',
      role: 'Junior Clinical Associate',
      dept: 'Clinical',
      basic: '₹38,000',
      hra: '₹15,000',
      allowances: '₹15,000',
      pfDeduction: '₹4,560',
      tds: '₹3,200',
      netPay: '₹60,240',
      bankAcc: 'HDFC •••• 1044',
      pan: 'JKLMN0123O',
      disbursedDate: '01 Oct 2026'
    }
  ];

  return (
    <DashboardLayout
      category="Employees & HR"
      subcategory="Payroll"
      title="Payroll Ledger, Disbursals & Statutory Compliance"
      subtitle="Monthly salary register, PF, ESI, professional tax, TDS deductions, and automated direct-to-bank NEFT/RTGS batch processing"
      icon="💵"
      badge=""
      actions={
        <button
          onClick={() => alert(`Bank NEFT batch export initiated for all ${payrollRecords.length} accounts.`)}
          style={{
            padding: '6px 14px',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            border: 'none',
            background: '#10b981',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span>🏦</span> Export Bank Batch (NEFT)
        </button>
      }
    >
      {/* Top Level KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Gross Payroll Disbursal" value="₹1,81,20,000" delta="+4.2%" trend="up" subtext="Current period cycle" icon="💵" />
        <KpiCard label="Statutory Deductions (PF/ESI)" value="₹21,74,400" delta="Remitted to EPFO" trend="up" subtext="Remitted to EPFO & ESIC" icon="🏛️" />
        <KpiCard label="Income Tax TDS Deducted" value="₹18,50,000" delta="+2.8%" trend="neutral" subtext="Tax deposit ready" icon="🧾" />
        <KpiCard label="Net Disbursed to Bank" value="₹1,40,95,600" delta="208 Accounts" trend="up" subtext="Zero transaction failures" icon="✅" />
      </div>

      {/* Month Selector Bar */}
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
          <span style={{ fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)', fontWeight: 600 }}>Payroll Run:</span>
          {['July 2026', 'August 2026', 'September 2026', 'October 2026 (Draft)'].map(m => (
            <button
              key={m}
              onClick={() => setSelectedMonth(m)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
                border: '1px solid',
                borderColor: selectedMonth === m ? '#3b82f6' : 'rgba(255,255,255,0.1)',
                background: selectedMonth === m ? '#3b82f6' : 'transparent',
                color: selectedMonth === m ? '#fff' : 'var(--muted-foreground, #94a3b8)'
              }}
            >
              {m}
            </button>
          ))}
        </div>
        <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>● HDFC Bank Corporate Gateway Active</span>
      </div>

      {/* Payroll Register Table */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Employee Salary Register ({payrollRecords.length} staff displayed)</h3>
          <span style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)' }}>Values formatted in INR (₹)</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)', color: 'var(--muted-foreground, #94a3b8)' }}>
                <th style={{ padding: '12px 16px' }}>Employee</th>
                <th style={{ padding: '12px 16px' }}>Basic Pay</th>
                <th style={{ padding: '12px 16px' }}>HRA</th>
                <th style={{ padding: '12px 16px' }}>Allowances</th>
                <th style={{ padding: '12px 16px' }}>PF (Employee)</th>
                <th style={{ padding: '12px 16px' }}>TDS</th>
                <th style={{ padding: '12px 16px' }}>Net Pay Credited</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {payrollRecords.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ padding: '36px 16px', textAlign: 'center', color: '#94a3b8' }}>
                    No payroll records found
                  </td>
                </tr>
              ) : (
                payrollRecords.map(p => (
                  <tr key={p.empId} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ fontWeight: 600, color: '#f8fafc' }}>{p.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)' }}>{p.role} · <span style={{ fontFamily: '"IBM Plex Mono", monospace' }}>{p.empId}</span></div>
                    </td>
                    <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', color: '#cbd5e1' }}>{p.basic}</td>
                    <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', color: '#cbd5e1' }}>{p.hra}</td>
                    <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', color: '#cbd5e1' }}>{p.allowances}</td>
                    <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', color: '#f87171' }}>-{p.pfDeduction}</td>
                    <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', color: '#f87171' }}>-{p.tds}</td>
                    <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#34d399' }}>{p.netPay}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                      <button
                        onClick={() => setShowPayslip(p)}
                        style={{
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          border: '1px solid rgba(255,255,255,0.15)',
                          background: 'transparent',
                          color: '#93c5fd',
                          cursor: 'pointer'
                        }}
                      >
                        Payslip 📄
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payslip Modal */}
      {showPayslip && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999
        }}>
          <div style={{
            background: '#1e293b',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '14px',
            padding: '24px',
            maxWidth: '500px',
            width: '90%',
            color: '#fff'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '18px' }}>📄 Payslip: {selectedMonth}</h3>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>Zenve Healthcare Technologies India Pvt Ltd</span>
              </div>
              <button onClick={() => setShowPayslip(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '18px', cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ fontSize: '13px', lineHeight: '1.8' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Employee Name:</span> <strong>{showPayslip.name}</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Employee ID:</span> <span style={{ fontFamily: '"IBM Plex Mono", monospace' }}>{showPayslip.empId}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Designation:</span> <span>{showPayslip.role}</span></div>
              <div style={{ margin: '12px 0', borderTop: '1px dashed rgba(255,255,255,0.15)', paddingTop: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Basic Pay:</span> <span>{showPayslip.basic}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>HRA:</span> <span>{showPayslip.hra}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Special Allowance:</span> <span>{showPayslip.allowances}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#f87171' }}><span>Provident Fund (12%):</span> <span>-{showPayslip.pfDeduction}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#f87171' }}><span>TDS Income Tax:</span> <span>-{showPayslip.tds}</span></div>
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}>
                <strong>Net Take-Home Pay:</strong>
                <strong style={{ color: '#34d399', fontFamily: '"IBM Plex Mono", monospace' }}>{showPayslip.netPay}</strong>
              </div>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => alert('PDF Payslip Downloaded')} style={{ padding: '8px 16px', borderRadius: '8px', background: '#3b82f6', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>Download PDF</button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
