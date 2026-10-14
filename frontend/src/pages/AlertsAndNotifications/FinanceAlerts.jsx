import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function FinanceAlerts() {
  const [alerts, setAlerts] = useState([
  {
    "id": "FIN-701",
    "title": "EBITDA Margin Slippage in Delhi Logistics Sub-Hub",
    "category": "Operating Margin Analysis",
    "severity": "High Warning",
    "status": "Active",
    "metric": "EBITDA: 11.2% (Target: 18.0%)",
    "impact": "\u20b93.2L regional EBITDA deficit",
    "rootCause": "Rider surge incentives paid during heavy rain week",
    "cause": "Rider surge incentives paid during heavy rain week",
    "time": "15 mins ago"
  },
  {
    "id": "FIN-702",
    "title": "Unallocated Bank Deposit Inflow on ICICI Current Account",
    "category": "Cash Flow Reconciliation",
    "severity": "Critical",
    "status": "Active",
    "metric": "\u20b94.2L Unmapped Wire Transfer",
    "impact": "B2B client invoices remain in Unpaid status",
    "rootCause": "Missing customer PAN / narration in bank RTGS remark",
    "cause": "Missing customer PAN / narration in bank RTGS remark",
    "time": "30 mins ago"
  },
  {
    "id": "FIN-703",
    "title": "High-Value Pharmaceutical Vendor Payables Due in < 24 Hours",
    "category": "Accounts Payable / Treasury",
    "severity": "High Warning",
    "status": "Active",
    "metric": "\u20b96.8L Due Today (Zoetis & Boehringer)",
    "impact": "Risk of losing 2% early settlement cash discount",
    "rootCause": "Cheque signatory dual authorization pending from CFO",
    "cause": "Cheque signatory dual authorization pending from CFO",
    "time": "45 mins ago"
  },
  {
    "id": "FIN-704",
    "title": "GST GSTR-3B Input Tax Credit (ITC) Reconciliation Gap",
    "category": "Tax & Regulatory Compliance",
    "severity": "Warning",
    "status": "Active",
    "metric": "6 Days to Filing Deadline (ITC Gap: \u20b91.45L)",
    "impact": "Potential interest penalty on delayed GSTR-2B matching",
    "rootCause": "3 tier-2 packaging vendors failed to file GSTR-1 returns",
    "cause": "3 tier-2 packaging vendors failed to file GSTR-1 returns",
    "time": "1 hr ago"
  },
  {
    "id": "FIN-705",
    "title": "Hospital Surgical Consumables Unbilled Inventory Variance",
    "category": "Cost of Goods Sold (COGS)",
    "severity": "Warning",
    "status": "Active",
    "metric": "COGS Variance: +4.8% in BLR Surgical Hub",
    "impact": "\u20b91.85L margin leakage in Q3 books",
    "rootCause": "Titanium bone plates logged on purchase but unbilled on discharge",
    "cause": "Titanium bone plates logged on purchase but unbilled on discharge",
    "time": "2 hrs ago"
  },
  {
    "id": "FIN-706",
    "title": "Doctor Tele-Consultation Commission Payout Ledger Discrepancy",
    "category": "Payroll & Provider Disbursements",
    "severity": "Warning",
    "status": "Active",
    "metric": "\u20b978K Discrepancy Across 22 Vets",
    "impact": "Delay in monthly provider pay disbursements",
    "rootCause": "Platform fee discount omitted during calculation script",
    "cause": "Platform fee discount omitted during calculation script",
    "time": "3 hrs ago"
  },
  {
    "id": "FIN-707",
    "title": "Commercial Dark Store Lease Escalation Due for Koramangala",
    "category": "Real Estate & Facility Lease",
    "severity": "Warning",
    "status": "Active",
    "metric": "5% Escalation Effective 1st Nov (\u20b935K/mo)",
    "impact": "Requires renewed lease addendum registration",
    "rootCause": "Annual contractual rent review cycle triggered",
    "cause": "Annual contractual rent review cycle triggered",
    "time": "4 hrs ago"
  },
  {
    "id": "FIN-708",
    "title": "Pet Insurance Reimbursement Aging Exceeding 60 Days",
    "category": "Receivables Management",
    "severity": "High Warning",
    "status": "Active",
    "metric": "\u20b92.8L in Overdue TPA Claims",
    "impact": "Negative working capital drag on outpatient clinic",
    "rootCause": "Bajaj Allianz TPA portal requiring itemized treatment notes",
    "cause": "Bajaj Allianz TPA portal requiring itemized treatment notes",
    "time": "5 hrs ago"
  },
  {
    "id": "FIN-709",
    "title": "Foreign Exchange Loss on Imported Veterinary Anesthesia Equipment",
    "category": "Forex Exposure",
    "severity": "Warning",
    "status": "Active",
    "metric": "USD/INR Depreciation Impact: \u20b91.12L",
    "impact": "CapEx equipment purchase budget overrun",
    "rootCause": "Unhedged USD letter of credit for Mindray ultrasound units",
    "cause": "Unhedged USD letter of credit for Mindray ultrasound units",
    "time": "6 hrs ago"
  },
  {
    "id": "FIN-710",
    "title": "Petty Cash Imprest Exhaustion in Powai Medical Center",
    "category": "Branch Cash Operations",
    "severity": "Warning",
    "status": "Resolved",
    "metric": "Balance Restored: \u20b925,000",
    "impact": "Resolved: Wire top-up completed via corporate net banking",
    "rootCause": "Unplanned emergency facility plumbing repairs",
    "cause": "Unplanned emergency facility plumbing repairs",
    "time": "7 hrs ago"
  }
]);

  const [toast, setToast] = useState('');

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleAction = (id, act) => {
    triggerToast(`Action "${act}" executed for ${id}.`);
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'Resolved' } : a));
  };

  return (
    <DashboardLayout
      category="Alerts & Notifications"
      subcategory="Finance Alerts"
      title="Financial Health & Statutory Compliance Alerts"
      subtitle="Early warnings for EBITDA margin erosion, unallocated bank deposits, vendor payables aging, and GST tax filing deadlines"
      icon="💰"
      badge=""
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => triggerToast('Automated AI Bank reconciliation matched ₹0 to PetCare Clinic network PO.')}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              background: 'var(--primary, #3b82f6)',
              color: '#ffffff',
              border: 'none',
              fontWeight: 600,
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            🔄 Run AI Reconciliation
          </button>
          <button
            onClick={() => triggerToast('Scheduled vendor NEFT batch for Royal Canin invoice.')}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              background: 'var(--card, #1e293b)',
              color: 'var(--foreground, #f8fafc)',
              border: '1px solid var(--border, rgba(255,255,255,0.1))',
              fontWeight: 600,
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            💳 Schedule Vendor Payables
          </button>
        </div>
      }
    >
      {toast && (
        <div style={{
          padding: '10px 16px',
          background: 'rgba(59,130,246,0.15)',
          border: '1px solid #3b82f6',
          borderRadius: '8px',
          color: '#60a5fa',
          fontSize: '13px',
          fontWeight: 600
        }}>
          ⚡ {toast}
        </div>
      )}

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard
          label="October EBITDA Margin"
          value="18.6%"
          delta="+2.4%"
          trend="positive"
          subtext="Budget: 16.2%"
          icon="📉"
        />
        <KpiCard
          label="Unallocated Bank Inflow"
          value="₹4.2L"
          delta="-48%"
          trend="positive"
          subtext="10 deposits matched"
          icon="🏦"
        />
        <KpiCard
          label="Vendor Payables Due (<24h)"
          value="₹6.8L"
          delta="2% Rebate"
          trend="positive"
          subtext="Early settlement live"
          icon="🧾"
        />
        <KpiCard
          label="Days to GST GSTR-3B"
          value="6 Days"
          delta="On Time"
          trend="positive"
          subtext="100% ITC matched"
          icon="📅"
        />
      </div>

      {/* Main Alerts Table */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>
          Corporate Financial Alerts & Tax Compliance Deadlines
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {alerts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '36px', color: 'var(--muted-foreground, #94a3b8)', fontSize: '13px' }}>
              No corporate financial alerts or tax compliance deadlines pending.
            </div>
          ) : (
            alerts.map((a) => (
            <div
              key={a.id}
              style={{
                padding: '16px',
                borderRadius: '8px',
                background: a.status === 'Resolved' ? 'rgba(16,185,129,0.05)' : 'rgba(0,0,0,0.15)',
                borderLeft: a.severity === 'Critical' ? '4px solid #ef4444' : a.severity === 'High Warning' ? '4px solid #f97316' : a.severity === 'Warning' ? '4px solid #f59e0b' : '4px solid #3b82f6',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: '11px',
                      fontWeight: 700,
                      background: 'rgba(255,255,255,0.06)',
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}>
                      {a.id}
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: 700 }}>{a.title}</span>
                    <span style={{
                      fontSize: '10px',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: a.severity === 'Critical' ? 'rgba(239,68,68,0.2)' : a.severity === 'High Warning' ? 'rgba(249,115,22,0.2)' : 'rgba(245,158,11,0.2)',
                      color: a.severity === 'Critical' ? '#ef4444' : '#f59e0b',
                      fontWeight: 600
                    }}>
                      {a.severity}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)', marginTop: '4px' }}>
                    Category: <strong style={{ color: 'var(--foreground, #f8fafc)' }}>{a.category}</strong> · Root Cause: <span>{a.rootCause}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#fbbf24' }}>{a.metric}</div>
                  <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)', marginTop: '2px' }}>
                    Status: <strong style={{ color: a.status === 'Resolved' ? '#10b981' : '#38bdf8' }}>{a.status}</strong>
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>
                <strong>Impact:</strong> {a.impact}
              </div>

              {a.status !== 'Resolved' && (
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', paddingTop: '4px' }}>
                  {a.id === 'FIN-702' && (
                    <button
                      onClick={() => handleAction(a.id, 'Mapped ₹0 to PetCare Clinic Account #CLI-102')}
                      style={{ padding: '6px 14px', borderRadius: '6px', background: 'var(--primary, #3b82f6)', color: '#fff', border: 'none', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Assign Deposit to Invoice
                    </button>
                  )}
                  {a.id === 'FIN-703' && (
                    <button
                      onClick={() => handleAction(a.id, 'GRN auto-validated against warehouse RFID scan')}
                      style={{ padding: '6px 14px', borderRadius: '6px', background: '#10b981', color: '#fff', border: 'none', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Approve GRN & Release NEFT
                    </button>
                  )}
                  <button
                    onClick={() => handleAction(a.id, 'Acknowledged & Logged to Finance Team')}
                    style={{ padding: '6px 12px', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border, rgba(255,255,255,0.1))', color: 'var(--foreground, #f8fafc)', fontSize: '11px', cursor: 'pointer' }}
                  >
                    Acknowledge
                  </button>
                </div>
              )}
            </div>
          ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
