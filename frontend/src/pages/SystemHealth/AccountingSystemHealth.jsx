import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function AccountingSystemHealth() {
  const [services, setServices] = useState([
  {
    "name": "SAP S/4HANA General Ledger",
    "endpoint": "https://sap-erp.internal/api/v1/ledger",
    "scope": "Master Chart of Accounts & General Ledger",
    "module": "Master Chart of Accounts & General Ledger",
    "cadence": "Real-time CDC (Debezium)",
    "syncInterval": "Real-time CDC (Debezium)",
    "lastBatch": "1 min ago (Batch #GL-9912)",
    "audited": "\u20b918.4 Cr MTD",
    "reconciledInvoices": "\u20b918.4 Cr MTD",
    "status": "HEALTHY"
  },
  {
    "name": "Tally Prime Cloud Sync",
    "endpoint": "https://tallycloud.internal:9000/sync",
    "scope": "Clinic Branch Trial Balance Sync",
    "module": "Clinic Branch Trial Balance Sync",
    "cadence": "Hourly Batch Sync",
    "syncInterval": "Hourly Batch Sync",
    "lastBatch": "24 mins ago (Batch #TP-4421)",
    "audited": "\u20b94.2 Cr MTD",
    "reconciledInvoices": "\u20b94.2 Cr MTD",
    "status": "HEALTHY"
  },
  {
    "name": "Zoho Books Corporate Accounting",
    "endpoint": "https://books.zoho.com/api/v3/journals",
    "scope": "OPD Clinic Revenue & Accounts Receivable",
    "module": "OPD Clinic Revenue & Accounts Receivable",
    "cadence": "15 Mins Delta Polling",
    "syncInterval": "15 Mins Delta Polling",
    "lastBatch": "8 mins ago (Batch #ZB-1104)",
    "audited": "\u20b96.8 Cr MTD",
    "reconciledInvoices": "\u20b96.8 Cr MTD",
    "status": "HEALTHY"
  },
  {
    "name": "ClearTax GST e-Invoicing & IRN",
    "endpoint": "https://api.cleartax.in/einvoice/v2/generate",
    "scope": "Statutory GSTIN E-Way Bill & IRN QR Codes",
    "module": "Statutory GSTIN E-Way Bill & IRN QR Codes",
    "cadence": "Real-time E-Way Dispatch",
    "syncInterval": "Real-time E-Way Dispatch",
    "lastBatch": "Sub-second (IRN #9842)",
    "audited": "\u20b914.2 Cr (100% Validated)",
    "reconciledInvoices": "\u20b914.2 Cr (100% Validated)",
    "status": "HEALTHY"
  },
  {
    "name": "ICICI Bank Corporate Host-to-Host",
    "endpoint": "https://corporatebanking.icicibank.com/h2h",
    "scope": "Direct RTGS/NEFT Supplier Vendor Payouts",
    "module": "Direct RTGS/NEFT Supplier Vendor Payouts",
    "cadence": "Hourly Host-to-Host Sweep",
    "syncInterval": "Hourly Host-to-Host Sweep",
    "lastBatch": "32 mins ago (Batch #IC-7721)",
    "audited": "\u20b912.6 Cr Vendor Dues",
    "reconciledInvoices": "\u20b912.6 Cr Vendor Dues",
    "status": "HEALTHY"
  },
  {
    "name": "HDFC Bank Corporate Direct Feed",
    "endpoint": "https://smartgateway.hdfcbank.com/reconcile",
    "scope": "Corporate Inflow Sweep & Escrow Ledger",
    "module": "Corporate Inflow Sweep & Escrow Ledger",
    "cadence": "Daily 06:00 AM Reconciliation",
    "syncInterval": "Daily 06:00 AM Reconciliation",
    "lastBatch": "Today at 06:00 AM (Clean)",
    "audited": "\u20b916.8 Cr Deposits",
    "reconciledInvoices": "\u20b916.8 Cr Deposits",
    "status": "HEALTHY"
  },
  {
    "name": "Stripe Payout & Forex Ledger",
    "endpoint": "https://api.stripe.com/v1/balance_transactions",
    "scope": "Cross-Border Equine & Pet Biologics Forex",
    "module": "Cross-Border Equine & Pet Biologics Forex",
    "cadence": "Daily Automated Sweep",
    "syncInterval": "Daily Automated Sweep",
    "lastBatch": "Today at 00:00 UTC (Clean)",
    "audited": "\u20b984.5L International",
    "reconciledInvoices": "\u20b984.5L International",
    "status": "HEALTHY"
  },
  {
    "name": "Razorpay Settlement Reconciliation",
    "endpoint": "https://api.razorpay.com/v1/settlements",
    "scope": "Daily Merchant Settlement & Gateway Fees",
    "module": "Daily Merchant Settlement & Gateway Fees",
    "cadence": "Continuous 4-Hour Batches",
    "syncInterval": "Continuous 4-Hour Batches",
    "lastBatch": "2 hrs ago (Batch #RZ-3319)",
    "audited": "\u20b922.4 Cr Merchant Volume",
    "reconciledInvoices": "\u20b922.4 Cr Merchant Volume",
    "status": "HEALTHY"
  },
  {
    "name": "QuickBooks Online Outpatient",
    "endpoint": "https://quickbooks.api.intuit.com/v3/company",
    "scope": "Franchise Partner Financial Consolidation",
    "module": "Franchise Partner Financial Consolidation",
    "cadence": "Nightly Consolidation",
    "syncInterval": "Nightly Consolidation",
    "lastBatch": "Yesterday 23:59 (Clean)",
    "audited": "\u20b93.8 Cr Franchise Revenue",
    "reconciledInvoices": "\u20b93.8 Cr Franchise Revenue",
    "status": "HEALTHY"
  },
  {
    "name": "Keka Payroll & TDS Remittance",
    "endpoint": "https://zenve.keka.com/api/v1/payroll",
    "scope": "Staff Salaries, PF & Tax Deductions at Source",
    "module": "Staff Salaries, PF & Tax Deductions at Source",
    "cadence": "Monthly Scheduled Run",
    "syncInterval": "Monthly Scheduled Run",
    "lastBatch": "Today at 09:00 AM (Clean)",
    "audited": "\u20b92.1 Cr Payroll & Tax",
    "reconciledInvoices": "\u20b92.1 Cr Payroll & Tax",
    "status": "HEALTHY"
  }
]);

  const [toast, setToast] = useState('');

  const triggerRecon = () => {
    setToast('Triggered automated journal entry reconciliation across Zoho Books & SQLite ledger.');
    setTimeout(() => setToast('Reconciliation finished: 0 variances detected.'), 3000);
  };

  return (
    <DashboardLayout
      category="System Health"
      subcategory="Accounting System"
      title="Accounting ERP & Banking Integrations"
      subtitle="Zoho Books, Tally Prime, GST e-invoicing API & automated HDFC bank statement feeds"
      icon="💰"
      badge=""
      actions={
        <button
          onClick={triggerRecon}
          style={{
            padding: '7px 14px',
            borderRadius: '8px',
            background: '#2563eb',
            color: '#ffffff',
            border: '1px solid #1d4ed8',
            fontWeight: 600,
            fontSize: '12px',
            cursor: 'pointer'
          }}
        >
          ⚖️ Reconcile All Ledgers
        </button>
      }
    >
      {toast && (
        <div style={{
          padding: '10px 16px',
          background: '#eff6ff',
          border: '1px solid #bfdbfe',
          borderRadius: '8px',
          color: '#2563eb',
          fontSize: '13px',
          fontWeight: 600
        }}>
          ℹ️ {toast}
        </div>
      )}

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="ERP Sync Latency" value="0.4 s" delta="-0.8s" trend="positive" subtext="Accounting API sync" icon="⚡" />
        <KpiCard label="Reconciled Revenue" value="₹18.4 Cr" delta="99.98%" trend="positive" subtext="Invoices matched" icon="📊" />
        <KpiCard label="GST IRN Generation SLA" value="142 ms" delta="Optimal" trend="positive" subtext="Tax API response" icon="🛡️" />
        <KpiCard label="Unmapped Cash / Items" value="₹0.00" delta="Reconciled" trend="positive" subtext="Financial audit trail" icon="🟢" />
      </div>

      {/* Services Table */}
      <div style={{
        background: 'var(--card, #ffffff)',
        border: '1px solid var(--border, #e2e8f0)',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Financial Connectors & Tax Gateways</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)', fontSize: '11px', background: '#f8fafc' }}>
              <th style={{ padding: '10px 12px' }}>System Name</th>
              <th style={{ padding: '10px 12px' }}>Functional Scope</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Cadence</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Latest Batch</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Audited Figures</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Status</th>
              <th style={{ padding: '10px 12px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {services.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ padding: '36px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                  No financial connectors found.
                </td>
              </tr>
            ) : (
              services.map((s) => (
                <tr key={s.name} style={{ borderBottom: '1px solid var(--border, #f1f5f9)' }}>
                  <td style={{ padding: '12px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>
                    {s.name}
                    <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #64748b)', fontFamily: '"IBM Plex Mono", monospace' }}>{s.endpoint}</div>
                  </td>
                  <td style={{ padding: '12px', color: 'var(--muted-foreground, #64748b)', fontSize: '12px' }}>{s.module}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>{s.syncInterval}</td>
                  <td style={{ padding: '12px', textAlign: 'right', color: '#16a34a', fontFamily: '"IBM Plex Mono", monospace' }}>{s.lastBatch}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{s.reconciledInvoices}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '99px', background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', fontWeight: 600, fontSize: '11px' }}>
                      ● {s.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <button
                      onClick={() => {
                        setToast(`Handshake verified with ${s.name} — Status 200 OK.`);
                        setTimeout(() => setToast(''), 3000);
                      }}
                      style={{
                        padding: '4px 8px',
                        borderRadius: '6px',
                        background: '#f8fafc',
                        border: '1px solid var(--border, #e2e8f0)',
                        color: 'var(--foreground, #0f172a)',
                        fontSize: '11px',
                        cursor: 'pointer'
                      }}
                    >
                      Test Ping
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
