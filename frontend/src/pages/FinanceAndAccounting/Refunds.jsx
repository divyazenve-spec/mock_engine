import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Refunds() {
  const [filterReason, setFilterReason] = useState('ALL');

  const refunds = [
    { id: 'REF-201', invId: 'INV-2026-880', client: 'Geeta Krishnan (Rusty - Beagle)', amt: '₹1,200', reason: 'Consult Rescheduled - Emergency Conflict', rail: 'Razorpay UPI', time: 'Today 09:30 AM', status: 'Refunded' },
    { id: 'REF-202', invId: 'INV-2026-874', client: 'Rahul Nair (Simba - Golden Retriever)', amt: '₹6,800', reason: 'Pharmacy Unopened Renal Diet Return', rail: 'Original Card Rail', time: 'Yesterday', status: 'Refunded' },
    { id: 'REF-203', invId: 'INV-2026-869', client: 'Sneha Kapoor (Bella - Persian Cat)', amt: '₹4,500', reason: 'Duplicate Front-Desk POS Tap', rail: 'Pine Labs Reversal', time: 'Yesterday', status: 'Settled' },
    { id: 'REF-204', invId: 'INV-2026-855', client: 'Arun Varma (Rocky - Rottweiler)', amt: '₹12,000', reason: 'Pre-Op Deposit Adjustment Post-Surgery', rail: 'NEFT Account Sweep', time: 'Oct 11, 2026', status: 'Refunded' },
    { id: 'REF-205', invId: 'INV-2026-848', client: 'Kavita Menon (Leo - Shih Tzu)', amt: '₹2,500', reason: 'Vaccine Cold-chain Delivery Delay Credit', rail: 'PhonePe UPI', time: 'Oct 10, 2026', status: 'Refunded' },
    { id: 'REF-206', invId: 'INV-2026-832', client: 'Aditya Sen (Milo - Indie Pup)', amt: '₹1,800', reason: 'OPD Consultation Doctor Out of Station', rail: 'Razorpay UPI', time: 'Oct 09, 2026', status: 'Refunded' },
    { id: 'REF-207', invId: 'INV-2026-820', client: 'Deepak Joshi (Thor - German Shepherd)', amt: '₹19,500', reason: 'Duplicate POS Debit Gateway Timeout', rail: 'HDFC PG Reversal', time: 'Oct 08, 2026', status: 'Settled' },
    { id: 'REF-208', invId: 'INV-2026-811', client: 'Sunita Rao (Zoe - Cocker Spaniel)', amt: '₹8,200', reason: 'Unused Surgical Implant Exchange Return', rail: 'Original Card Rail', time: 'Oct 06, 2026', status: 'Refunded' },
    { id: 'REF-209', invId: 'INV-2026-795', client: 'Farhan Akhtar (Bruno - Boxer)', amt: '₹3,400', reason: 'Telemetry ECG Artifact Cancellation', rail: 'Razorpay UPI', time: 'Oct 04, 2026', status: 'Refunded' },
    { id: 'REF-210', invId: 'INV-2026-788', client: 'Edwin Nambisan (Coco - Dachshund)', amt: '₹14,600', reason: 'Insurance Pre-Auth Settlement Overcharge', rail: 'NEFT Client Sweep', time: 'Oct 02, 2026', status: 'Refunded' }
  ];

  return (
    <DashboardLayout
      category="Finance & Accounting"
      subcategory="Refunds"
      title="Refunds, Reversals & Dispute Resolution"
      subtitle="Chargeback dispute defense, automated reversal processing, medication return audit, and customer credit ledger"
      icon="🔄"
      badge="0.59% Refund Rate"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Processed Refunds" value="₹84,500" delta="0.59% of revenue" trend="up" subtext="Across 10 audited cases" icon="🔄" />
        <KpiCard label="Cancelled OPD Consults" value="₹18,500" delta="Doctor rescheduling" trend="neutral" subtext="Instant automated credit" icon="📅" />
        <KpiCard label="Pharmacy Sealed Returns" value="₹32,000" delta="Sealed batch checked" trend="up" subtext="Within 7-day policy" icon="💊" />
        <KpiCard label="Duplicate POS Swipes" value="₹24,000" delta="Bank gateway sync" trend="up" subtext="100% resolved in 24h" icon="💳" />
        <KpiCard label="Avg Dispute TAT" value="4.2 Hours" delta="-1.5h MoM" trend="up" subtext="Industry benchmark 48h" icon="⏱️" />
        <KpiCard label="Chargeback Loss Rate" value="0.02%" delta="Minimal dispute loss" trend="up" subtext="Full evidence trail" icon="🛡️" />
      </div>

      <div style={{
        background: 'var(--card, #131d2e)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '22px 24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#fff' }}>📋 Customer Refunds & Disputed Reversals Log</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Audited clinical refunds linked directly to original tax invoices</p>
          </div>
          <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>10 Audited Records</span>
        </div>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.22)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <th style={{ padding: '10px 20px', textAlign: 'left', color: '#94a3b8' }}>Refund ID</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#94a3b8' }}>Original Invoice</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#94a3b8' }}>Pet Parent & Pet</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Refund Amount</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#94a3b8' }}>Clinical Reason</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#94a3b8' }}>Settlement Channel</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#94a3b8' }}>Processed At</th>
                <th style={{ padding: '10px 20px', textAlign: 'right', color: '#94a3b8' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {refunds.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '24px', color: '#94a3b8' }}>
                    No refund records found
                  </td>
                </tr>
              ) : (
                refunds.map((r, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '12px 20px', fontFamily: '"IBM Plex Mono", monospace', color: '#f87171', fontWeight: 600 }}>{r.id}</td>
                    <td style={{ padding: '12px 14px', fontFamily: '"IBM Plex Mono", monospace', color: '#38bdf8' }}>{r.invId}</td>
                    <td style={{ padding: '12px 14px', color: '#fff', fontWeight: 600 }}>{r.client}</td>
                    <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#f87171' }}>{r.amt}</td>
                    <td style={{ padding: '12px 14px', color: '#cbd5e1' }}>{r.reason}</td>
                    <td style={{ padding: '12px 14px', color: '#94a3b8' }}>{r.rail}</td>
                    <td style={{ padding: '12px 14px', color: '#94a3b8' }}>{r.time}</td>
                    <td style={{ padding: '12px 20px', textAlign: 'right' }}>
                      <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'rgba(16,185,129,0.15)', color: '#34d399', fontSize: '11px', fontWeight: 600 }}>{r.status}</span>
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
