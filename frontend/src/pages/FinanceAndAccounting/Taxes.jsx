import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Taxes() {
  const [taxYear, setTaxYear] = useState('AY 2027-28');

  const gstFilings = [
    { form: 'GSTR-3B Monthly Return', period: 'Sep 2026', due: '20 Oct 2026', taxable: '₹1,42,85,000', taxAmt: '₹21,79,068', itcOffset: '₹9,58,000', netPayable: '₹12,21,068', status: 'Reconciled & Ready' },
    { form: 'GSTR-1 Outward Supplies', period: 'Sep 2026', due: '11 Oct 2026', taxable: '₹1,42,85,000', taxAmt: '₹21,79,068', itcOffset: '₹0', netPayable: '₹0 (Info)', status: 'Filed (ARN-4421)' },
    { form: 'GSTR-2B Auto-Drafted ITC', period: 'Sep 2026', due: '14 Oct 2026', taxable: '₹53,22,222', taxAmt: '₹9,58,000', itcOffset: '₹9,58,000', netPayable: 'Eligible ITC', status: 'Reconciled 100%' },
    { form: 'GSTR-3B Monthly Return', period: 'Aug 2026', due: '20 Sep 2026', taxable: '₹1,38,00,000', taxAmt: '₹21,05,200', itcOffset: '₹9,12,000', netPayable: '₹11,93,200', status: 'Filed & Paid' },
    { form: 'GSTR-1 Outward Supplies', period: 'Aug 2026', due: '11 Sep 2026', taxable: '₹1,38,00,000', taxAmt: '₹21,05,200', itcOffset: '₹0', netPayable: '₹0 (Info)', status: 'Filed (ARN-3891)' },
    { form: 'GSTR-3B Monthly Return', period: 'Jul 2026', due: '20 Aug 2026', taxable: '₹1,31,20,000', taxAmt: '₹20,01,400', itcOffset: '₹8,84,000', netPayable: '₹11,17,400', status: 'Filed & Paid' },
    { form: 'GSTR-1 Outward Supplies', period: 'Jul 2026', due: '11 Aug 2026', taxable: '₹1,31,20,000', taxAmt: '₹20,01,400', itcOffset: '₹0', netPayable: '₹0 (Info)', status: 'Filed (ARN-3120)' },
    { form: 'GSTR-9 Annual Return', period: 'FY 2025-26', due: '31 Dec 2026', taxable: '₹15,20,00,000', taxAmt: '₹2,31,80,000', itcOffset: '₹1,02,40,000', netPayable: 'Audited Final', status: 'Drafting' },
    { form: 'GSTR-9C Reconciliation', period: 'FY 2025-26', due: '31 Dec 2026', taxable: '₹15,20,00,000', taxAmt: '₹2,31,80,000', itcOffset: '₹1,02,40,000', netPayable: 'CA Certified', status: 'Under CA Audit' },
    { form: 'E-Way Bill Consolidated', period: 'Current Month', due: 'Real-time', taxable: '₹18,50,000', taxAmt: '₹3,33,000', itcOffset: '₹0', netPayable: 'Interstate Pharma', status: 'Active (NIC Sync)' }
  ];

  const tdsSummary = [
    { section: 'Section 194J', desc: 'Veterinary Surgeons & Specialist Consultants', baseAmt: '₹18,50,000', rate: '10.0%', tdsDeducted: '₹1,85,000', due: '07 Nov 2026', status: 'Challan Paid' },
    { section: 'Section 194I (Building)', desc: 'Hospital & Clinic Facility Leases (14 Units)', baseAmt: '₹11,50,000', rate: '10.0%', tdsDeducted: '₹1,15,000', due: '07 Nov 2026', status: 'Challan Paid' },
    { section: 'Section 192 (Salaries)', desc: 'Resident Doctors, Vet Nurses & Support Staff', baseAmt: '₹16,80,000', rate: 'Slab', tdsDeducted: '₹84,000', due: '07 Nov 2026', status: 'Challan Paid' },
    { section: 'Section 194C (Contractors)', desc: 'Biohazard Waste Logistics & Hospital Security', baseAmt: '₹2,80,000', rate: '2.0%', tdsDeducted: '₹5,600', due: '07 Nov 2026', status: 'Challan Paid' },
    { section: 'Section 194Q (Goods Purchase)', desc: 'Pharma & Vaccine Purchases exceeding ₹50L', baseAmt: '₹42,00,000', rate: '0.1%', tdsDeducted: '₹4,200', due: '07 Nov 2026', status: 'Challan Paid' },
    { section: 'Section 194J (IT Services)', desc: 'AWS Cloud, EHR Software & Tele-health SaaS', baseAmt: '₹2,40,000', rate: '2.0%', tdsDeducted: '₹4,800', due: '07 Nov 2026', status: 'Challan Paid' },
    { section: 'Section 194I (Machinery)', desc: 'CT-64 & MRI Diagnostic Equipment Lease', baseAmt: '₹4,50,000', rate: '2.0%', tdsDeducted: '₹9,000', due: '07 Nov 2026', status: 'Challan Paid' },
    { section: 'Section 194H (Commissions)', desc: 'Corporate Partner Referral Referral Retainers', baseAmt: '₹1,20,000', rate: '5.0%', tdsDeducted: '₹6,000', due: '07 Nov 2026', status: 'Challan Paid' },
    { section: 'Section 194C (Facility Maint)', desc: 'HVAC Cleanroom & Medical Gas Pipeline AMC', baseAmt: '₹1,80,000', rate: '2.0%', tdsDeducted: '₹3,600', due: '07 Nov 2026', status: 'Challan Paid' },
    { section: 'Advance Tax (Q2 FY27)', desc: 'Corporate Income Tax Section 115BAA (25.17%)', baseAmt: '₹34,80,267', rate: '25.0%', tdsDeducted: '₹8,70,000', due: '15 Sep 2026', status: 'Challan Paid' }
  ];

  return (
    <DashboardLayout
      category="Finance & Accounting"
      subcategory="Taxes"
      title="Statutory Tax Compliance, GST & TDS Ledger"
      subtitle="GST e-way bills & GSTR-1/3B filings, Section 194J/194C withholding tax remittances, and corporate tax provisioning"
      icon="🏛️"
      badge="Score: 100/100"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => alert('Exporting tax compliance certificate and e-Challan payment pack...')}
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
            🏛️ Export Tax Pack
          </button>
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="GST Output Liability" value="₹21,79,068" delta="+11.4% MoM" trend="up" subtext="Current month gross" icon="🏛️" />
        <KpiCard label="Input Tax Credit (ITC)" value="₹9,58,000" delta="100% matched GSTR-2B" trend="up" subtext="Zero disputed credit" icon="📥" />
        <KpiCard label="Net GST Cash Payable" value="₹12,21,068" delta="Due 20 Oct 2026" trend="neutral" subtext="Statutory due date" icon="💰" />
        <KpiCard label="TDS Deducted & Deposited" value="₹4,68,500" delta="100% deposited" trend="up" subtext="Challan ITNS 281" icon="📑" />
        <KpiCard label="Advance Income Tax" value="₹8,70,000" delta="Q2 FY27 cleared" trend="up" subtext="Section 115BAA rate" icon="🛡️" />
        <KpiCard label="Statutory Compliance Score" value="100 / 100" delta="Zero penalties" trend="up" subtext="Tier-1 clean audit" icon="⭐" />
      </div>

      <div style={{
        background: 'var(--card, #131d2e)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '22px 24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#fff' }}>📑 Goods & Services Tax (GST) Returns Dashboard</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>GSTIN: 29AABCZ8412K1Z9 · Government of India GST Portal Sync</p>
          </div>
          <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>GSTIN Verified Active</span>
        </div>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.22)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <th style={{ padding: '10px 20px', textAlign: 'left', color: '#94a3b8' }}>GST Form & Return Type</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#94a3b8' }}>Tax Period</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#94a3b8' }}>Filing Due Date</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Taxable Turnover</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Output Tax</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>ITC Offset</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Net Cash Paid</th>
                <th style={{ padding: '10px 20px', textAlign: 'right', color: '#94a3b8' }}>Filing Status</th>
              </tr>
            </thead>
            <tbody>
              {gstFilings.length === 0 ? (<tr><td colSpan="8" style={{ textAlign: "center", padding: "32px", color: "var(--muted-foreground, #64748b)" }}>No GST filing records found</td></tr>) : gstFilings.map((g, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 20px', color: '#fff', fontWeight: 600 }}>{g.form}</td>
                  <td style={{ padding: '12px 14px', color: '#38bdf8' }}>{g.period}</td>
                  <td style={{ padding: '12px 14px', color: '#cbd5e1' }}>{g.due}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{g.taxable}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#fbbf24' }}>{g.taxAmt}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#10b981' }}>{g.itcOffset}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#38bdf8' }}>{g.netPayable}</td>
                  <td style={{ padding: '12px 20px', textAlign: 'right' }}>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '10px',
                      fontWeight: 600,
                      background: g.status.includes('Filed') || g.status.includes('Reconciled') ? 'rgba(16,185,129,0.15)' : 'rgba(56,189,248,0.15)',
                      color: g.status.includes('Filed') || g.status.includes('Reconciled') ? '#34d399' : '#38bdf8'
                    }}>
                      {g.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tax Deducted at Source (TDS) */}
      <div style={{
        background: 'var(--card, #131d2e)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '22px 24px'
      }}>
        <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 700, color: '#fff' }}>🏛️ Tax Deducted at Source (TDS) Withholding & Remittance</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Quarterly Form 26Q & 24Q compliance for surgeons, landlords, and staff</p>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.22)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <th style={{ padding: '10px 20px', textAlign: 'left', color: '#94a3b8' }}>Income Tax Section</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#94a3b8' }}>Payee Category</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Gross Base</th>
                <th style={{ padding: '10px 14px', textAlign: 'center', color: '#94a3b8' }}>TDS Rate</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>TDS Deducted</th>
                <th style={{ padding: '10px 14px', textAlign: 'center', color: '#94a3b8' }}>Remittance Due</th>
                <th style={{ padding: '10px 20px', textAlign: 'right', color: '#94a3b8' }}>Challan Status</th>
              </tr>
            </thead>
            <tbody>
              {tdsSummary.map((t, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 20px', color: '#fff', fontWeight: 600 }}>{t.section}</td>
                  <td style={{ padding: '12px 14px', color: '#94a3b8' }}>{t.desc}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{t.baseAmt}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'center', fontFamily: '"IBM Plex Mono", monospace', color: '#38bdf8' }}>{t.rate}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#10b981' }}>{t.tdsDeducted}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'center', color: '#cbd5e1' }}>{t.due}</td>
                  <td style={{ padding: '12px 20px', textAlign: 'right' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'rgba(16,185,129,0.15)', color: '#34d399', fontSize: '11px', fontWeight: 600 }}>{t.status}</span>
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
