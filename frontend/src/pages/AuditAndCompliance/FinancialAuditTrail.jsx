import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function FinancialAuditTrail() {
  const financial = [
  {
    "ref": "FIN-TXN-9011",
    "type": "Vendor Payout",
    "account": "2100 - Accounts Payable (Cipla Laboratories)",
    "debit": "\u20b91,450,000",
    "credit": "-",
    "approver": "R. Venkat (CFO)",
    "time": "2026-10-14 16:21:05",
    "status": "Reconciled"
  },
  {
    "ref": "FIN-TXN-9012",
    "type": "Customer Collection",
    "account": "1100 - Razorpay Escrow Settlement",
    "debit": "-",
    "credit": "\u20b9842,500",
    "approver": "System Auto-Match",
    "time": "2026-10-14 16:10:44",
    "status": "Reconciled"
  },
  {
    "ref": "FIN-TXN-9013",
    "type": "GST ITC Claim",
    "account": "1310 - Input Tax Credit (CGST + SGST)",
    "debit": "\u20b9174,000",
    "credit": "-",
    "approver": "Kavita D. (Tax Head)",
    "time": "2026-10-14 15:45:12",
    "status": "Reconciled"
  },
  {
    "ref": "FIN-TXN-9014",
    "type": "Cold Chain Logistics",
    "account": "5200 - Third-Party Fleet Payout (ColdEx)",
    "debit": "\u20b9285,000",
    "credit": "-",
    "approver": "R. Venkat (CFO)",
    "time": "2026-10-14 15:30:00",
    "status": "Reconciled"
  },
  {
    "ref": "FIN-TXN-9015",
    "type": "Insurance Remittance",
    "account": "1120 - TPA Star Health Direct Settlement",
    "debit": "-",
    "credit": "\u20b91,120,000",
    "approver": "Anita K. (Billing)",
    "time": "2026-10-14 15:12:18",
    "status": "Reconciled"
  },
  {
    "ref": "FIN-TXN-9016",
    "type": "Vendor Payout",
    "account": "2100 - Accounts Payable (Sun Pharma)",
    "debit": "\u20b9980,000",
    "credit": "-",
    "approver": "R. Venkat (CFO)",
    "time": "2026-10-14 14:50:33",
    "status": "Reconciled"
  },
  {
    "ref": "FIN-TXN-9017",
    "type": "Clinical Refund",
    "account": "4100 - Patient Cancelled Order Refund",
    "debit": "\u20b94,250",
    "credit": "-",
    "approver": "Priya S. (Pharmacist)",
    "time": "2026-10-14 14:35:10",
    "status": "Reconciled"
  },
  {
    "ref": "FIN-TXN-9018",
    "type": "TDS Remittance",
    "account": "2210 - Withholding Tax Sec 194C",
    "debit": "\u20b948,200",
    "credit": "-",
    "approver": "Kavita D. (Tax Head)",
    "time": "2026-10-14 14:15:20",
    "status": "Reconciled"
  },
  {
    "ref": "FIN-TXN-9019",
    "type": "Depreciation Entry",
    "account": "6100 - Automated Vault IoT Machinery Deprec.",
    "debit": "\u20b9112,000",
    "credit": "-",
    "approver": "System Scheduled",
    "time": "2026-10-14 13:50:00",
    "status": "Reconciled"
  },
  {
    "ref": "FIN-TXN-9020",
    "type": "Corporate Retainer",
    "account": "1140 - Apollo Hospitals Corporate B2B Billing",
    "debit": "-",
    "credit": "\u20b92,450,000",
    "approver": "R. Venkat (CFO)",
    "time": "2026-10-14 13:30:15",
    "status": "Reconciled"
  }
];

  return (
    <DashboardLayout
      category="Audit & Compliance"
      subcategory="Financial Ledger & Journal Audits"
      title="Financial Ledger & Journal Audit Trail"
      subtitle="Double-entry accounting validation, refund authorizations, and tax compliance trails"
      icon="💰"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Reconciliation Variance" value="₹0.00" delta="0.0%" trend="neutral" subtext="Ledgers 100% matched" icon="⚖️" />
        <KpiCard label="Total Audited Ledger" value="₹42,850,200" delta="+14.6%" trend="up" subtext="1,420 journals audited" icon="💰" />
        <KpiCard label="GST Input Tax Credit" value="₹3,842,100" delta="+6.2%" trend="up" subtext="GSTR-2B invoice cross-checked" icon="📑" />
        <KpiCard label="Audit Sign-off" value="Unqualified" delta="Clean" trend="up" subtext="Independent auditor approval" icon="✅" />
      </div>

      <div style={{ background: 'var(--card, #ffffff)', border: '1px solid var(--border, #e2e8f0)', borderRadius: '12px', padding: '20px' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Audited Financial Journals & Transactions</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)', fontSize: '11px', textTransform: 'uppercase' }}>
                <th style={{ padding: '10px 12px' }}>Reference</th>
                <th style={{ padding: '10px 12px' }}>Transaction Type</th>
                <th style={{ padding: '10px 12px' }}>Account / Target</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Debit</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Credit</th>
                <th style={{ padding: '10px 12px' }}>Authorized Approver</th>
                <th style={{ padding: '10px 12px' }}>Timestamp</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {financial.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ padding: '36px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                    No financial journal audit records found.
                  </td>
                </tr>
              ) : (
                financial.map((f, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)' }}>
                    <td style={{ padding: '12px', fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', color: '#2563eb', fontWeight: 600 }}>{f.ref}</td>
                    <td style={{ padding: '12px', fontWeight: 700 }}>{f.type}</td>
                    <td style={{ padding: '12px' }}>{f.account}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#16a34a', fontWeight: 600 }}>{f.debit}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#2563eb', fontWeight: 600 }}>{f.credit}</td>
                    <td style={{ padding: '12px' }}>{f.approver}</td>
                    <td style={{ padding: '12px', fontSize: '12px' }}>{f.time}</td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      <span style={{ padding: '2px 8px', borderRadius: '99px', background: '#dcfce7', color: '#15803d', fontWeight: 600, fontSize: '11px' }}>● {f.status}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
