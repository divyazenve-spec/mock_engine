import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function VendorPayments() {
  const [filterStatus, setFilterStatus] = useState('ALL');

  const payments = [
    { id: 'PAY-8901', vendor: 'Zoetis Animal Health India', po: 'PO-2026-9401', amount: '₹3,85,000', gst: '₹69,300', tds: '₹7,700', due: '2026-10-20', bank: 'HDFC Bank', method: 'RTGS', status: 'Paid' },
    { id: 'PAY-8902', vendor: 'MSD Animal Health Pvt Ltd', po: 'PO-2026-9402', amount: '₹4,50,000', gst: '₹81,000', tds: '₹9,000', due: '2026-10-22', bank: 'ICICI Bank', method: 'NEFT', status: 'Paid' },
    { id: 'PAY-8903', vendor: 'Synthes Vet Orthopedics', po: 'PO-2026-9403', amount: '₹2,75,000', gst: '₹49,500', tds: '₹5,500', due: '2026-10-24', bank: 'HDFC CMS', method: 'RTGS', status: 'Scheduled' },
    { id: 'PAY-8904', vendor: 'Royal Canin India Pvt Ltd', po: 'PO-2026-9404', amount: '₹5,40,000', gst: '₹97,200', tds: '₹10,800', due: '2026-10-26', bank: 'HDFC CMS', method: 'RTGS', status: 'Scheduled' },
    { id: 'PAY-8905', vendor: 'Boehringer Ingelheim Vet', po: 'PO-2026-9405', amount: '₹3,15,000', gst: '₹56,700', tds: '₹6,300', due: '2026-10-28', bank: 'ICICI Bank', method: 'NEFT', status: 'Pending' },
    { id: 'PAY-8906', vendor: "Hill's Pet Nutrition India", po: 'PO-2026-9406', amount: '₹3,90,000', gst: '₹70,200', tds: '₹7,800', due: '2026-10-30', bank: 'HDFC CMS', method: 'NEFT', status: 'Pending' },
    { id: 'PAY-8907', vendor: 'Virbac Animal Health India', po: 'PO-2026-9407', amount: '₹1,85,000', gst: '₹33,300', tds: '₹3,700', due: '2026-11-02', bank: 'Axis Bank', method: 'NEFT', status: 'Pending' },
    { id: 'PAY-8908', vendor: 'Intas Pharmaceuticals Vet', po: 'PO-2026-9408', amount: '₹1,45,000', gst: '₹26,100', tds: '₹2,900', due: '2026-11-04', bank: 'HDFC Bank', method: 'RTGS', status: 'Pending' },
    { id: 'PAY-8909', vendor: 'Farmina Pet Foods India', po: 'PO-2026-9409', amount: '₹2,10,000', gst: '₹37,800', tds: '₹4,200', due: '2026-11-06', bank: 'ICICI Bank', method: 'NEFT', status: 'Pending' },
    { id: 'PAY-8910', vendor: 'Purina PetCare India', po: 'PO-2026-9410', amount: '₹1,65,000', gst: '₹29,700', tds: '₹3,300', due: '2026-11-08', bank: 'HDFC CMS', method: 'NEFT', status: 'Pending' }
  ];

  const filtered = filterStatus === 'ALL' ? payments : payments.filter(p => p.status === filterStatus);
  const statusColor = s => ({ Paid: '#34d399', Scheduled: '#38bdf8', Pending: '#fbbf24', Overdue: '#f87171' }[s] || '#94a3b8');
  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(255,255,255,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Vendors & Procurement"
      subcategory="Vendor Payments"
      title="Vendor Payments & AP Settlement Ledger"
      subtitle="Scheduled NEFT/RTGS disbursements, TDS deductions, GST payables, and supplier payment due dates"
      icon="💳"
      badge="AP Settlement"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => alert('Initiating Bulk Payment Schedule...')} style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #10b981', background: 'rgba(16,185,129,0.15)', color: '#34d399', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
            + Schedule Payment
          </button>
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Payable (MTD)" value="₹22.25 Lakhs" delta="8 vendor invoices" trend="neutral" subtext="Oct 2026" icon="💳" />
        <KpiCard label="Paid (MTD)" value="₹8.35 Lakhs" delta="2 settlements cleared" trend="up" subtext="On-time RTGS/NEFT" icon="✅" />
        <KpiCard label="Scheduled Payments" value="₹8.15 Lakhs" delta="2 upcoming batches" trend="neutral" subtext="Next 7 days" icon="📅" />
        <KpiCard label="Overdue Payments" value="₹0" delta="Zero overdue accounts" trend="up" subtext="100% on schedule" icon="✅" />
        <KpiCard label="TDS Deducted (MTD)" value="₹61,200" delta="TDS @ 2% on vendor Rx" trend="neutral" subtext="Form 16B issued" icon="🧾" />
        <KpiCard label="GST Payable (IGST)" value="₹5.51 Lakhs" delta="18% GST matched" trend="neutral" subtext="GSTR-2B matched" icon="📋" />
      </div>

      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>💳 Vendor Payment Schedule</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>NEFT/RTGS disbursements with TDS deduction and GST breakup</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['ALL', 'Paid', 'Scheduled', 'Pending'].map(s => (
              <button key={s} onClick={() => setFilterStatus(s)} style={{ padding: '4px 10px', borderRadius: '6px', border: '1px solid ' + (filterStatus === s ? '#3b82f6' : 'rgba(255,255,255,0.1)'), background: filterStatus === s ? 'rgba(59,130,246,0.15)' : 'transparent', color: filterStatus === s ? '#60a5fa' : '#94a3b8', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>{s}</button>
            ))}
          </div>
        </div>
        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'var(--muted, #f8fafc)', borderBottom: '1px solid var(--border, rgba(0,0,0,0.08))' }}>
                {['Pay ID', 'Vendor', 'PO Ref', 'Amount', 'GST', 'TDS', 'Due Date', 'Bank Channel', 'Method', 'Status'].map(h => (
                  <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--muted-foreground, #64748b)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border, rgba(0,0,0,0.06))' }}>
                  <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', color: '#38bdf8', fontSize: '11px' }}>{p.id}</td>
                  <td style={{ padding: '11px 12px', fontWeight: 600, color: 'var(--foreground, #0f172a)' }}>{p.vendor}</td>
                  <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', color: 'var(--muted-foreground, #64748b)', fontSize: '11px' }}>{p.po}</td>
                  <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', color: '#fbbf24', fontWeight: 600 }}>{p.amount}</td>
                  <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', color: 'var(--muted-foreground, #64748b)', fontSize: '11px' }}>{p.gst}</td>
                  <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', color: 'var(--muted-foreground, #64748b)', fontSize: '11px' }}>{p.tds}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--foreground, #334155)' }}>{p.due}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--muted-foreground, #64748b)' }}>{p.bank}</td>
                  <td style={{ padding: '11px 12px', color: '#64748b', fontSize: '11px' }}>{p.method}</td>
                  <td style={{ padding: '11px 12px' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, background: statusColor(p.status) + '22', color: statusColor(p.status) }}>{p.status}</span>
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
