import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function PurchaseOrders() {
  const [filterStatus, setFilterStatus] = useState('ALL');

  const orders = [
    { id: 'PO-2026-9401', vendor: 'Zoetis Animal Health India', items: 'Vanguard Plus 5/CV-L (500 vials) + Apoquel (60 btls)', qty: '560 units', value: '₹3,85,000', raised: '2026-10-02', delivery: '2026-10-06', rcvd: '2026-10-05', approver: 'Dr. Ananya Sen', status: 'Received' },
    { id: 'PO-2026-9402', vendor: 'MSD Animal Health Pvt Ltd', items: 'Bravecto Chewable (120 packs) + Nobivac Rabies (800 doses)', qty: '920 units', value: '₹4,50,000', raised: '2026-10-04', delivery: '2026-10-08', rcvd: '2026-10-07', approver: 'Dr. Vikram Deshmukh', status: 'Received' },
    { id: 'PO-2026-9403', vendor: 'Synthes Vet Orthopedics', items: 'Titanium TPLO Locking Plates 3.5mm + Cortical Screws', qty: '40 kits', value: '₹2,75,000', raised: '2026-10-06', delivery: '2026-10-10', rcvd: '2026-10-09', approver: 'Dr. Rajesh K', status: 'Received' },
    { id: 'PO-2026-9404', vendor: 'Royal Canin India Pvt Ltd', items: 'Gastrointestinal High Energy (80 bags) + Hepatic Vet Diet', qty: '130 bags', value: '₹5,40,000', raised: '2026-10-08', delivery: '2026-10-12', rcvd: '-', approver: 'Priya Sharma', status: 'In Transit' },
    { id: 'PO-2026-9405', vendor: 'Boehringer Ingelheim Vet', items: 'NexGard Spectra 15-30kg (150 boxes) + Metacam Oral', qty: '230 units', value: '₹3,15,000', raised: '2026-10-09', delivery: '2026-10-13', rcvd: '-', approver: 'Dr. Ananya Sen', status: 'In Transit' },
    { id: 'PO-2026-9406', vendor: "Hill's Pet Nutrition India", items: 'Prescription Diet k/d Renal (60 bags) + c/d Urinary', qty: '110 bags', value: '₹3,90,000', raised: '2026-10-10', delivery: '2026-10-14', rcvd: '-', approver: 'Priya Sharma', status: 'Processing' },
    { id: 'PO-2026-9407', vendor: 'Virbac Animal Health India', items: 'Clavamox Palatable Drops (100 btls) + Epiotic Ear Cleanser', qty: '300 btls', value: '₹1,85,000', raised: '2026-10-11', delivery: '2026-10-15', rcvd: '-', approver: 'Dr. Vikram Deshmukh', status: 'Processing' },
    { id: 'PO-2026-9408', vendor: 'Intas Pharmaceuticals Vet', items: 'Melonex Plus Inj 100ml (150 vials) + Ceftriaxone Vet 3g', qty: '400 vials', value: '₹1,45,000', raised: '2026-10-11', delivery: '2026-10-16', rcvd: '-', approver: 'Dr. Rajesh K', status: 'Pending' },
    { id: 'PO-2026-9409', vendor: 'Farmina Pet Foods India', items: 'Vet Life Gastrointestinal 10kg (40 bags) + Vet Life Obesity', qty: '70 bags', value: '₹2,10,000', raised: '2026-10-12', delivery: '2026-10-17', rcvd: '-', approver: 'Priya Sharma', status: 'Pending' },
    { id: 'PO-2026-9410', vendor: 'Purina PetCare India', items: 'Pro Plan Veterinary Diets FortiFlora (120 boxes) + HA Diet', qty: '145 units', value: '₹1,65,000', raised: '2026-10-13', delivery: '2026-10-18', rcvd: '-', approver: 'Dr. Ananya Sen', status: 'In Transit' }
  ];

  const statusColor = s => ({ Received: '#34d399', 'In Transit': '#38bdf8', Processing: '#a78bfa', Pending: '#fbbf24', Delayed: '#f87171' }[s] || '#94a3b8');
  const filtered = filterStatus === 'ALL' ? orders : orders.filter(o => o.status === filterStatus);
  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(255,255,255,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Vendors & Procurement"
      subcategory="Purchase Orders"
      title="Purchase Order Management & Delivery Tracker"
      subtitle="All active and historical POs with delivery dates, quantities, approval chain, and real-time status tracking"
      icon="📑"
      badge="PO Management"
      actions={
        <button onClick={() => alert('Opening New Purchase Order Form...')} style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #3b82f6', background: 'rgba(59,130,246,0.15)', color: '#60a5fa', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
          + Raise PO
        </button>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Active POs" value="6 Orders" delta="₹14.85L in pipeline" trend="up" subtext="Oct 2026 active" icon="📑" />
        <KpiCard label="Received (MTD)" value="4 POs" delta="₹11.10L received" trend="up" subtext="100% GRN pass" icon="✅" />
        <KpiCard label="In Transit" value="3 POs" delta="₹10.20L en route" trend="up" subtext="Cold-chain tracked" icon="🚛" />
        <KpiCard label="Delayed POs" value="0 POs" delta="Zero delayed orders" trend="up" subtext="100% on schedule" icon="✅" />
        <KpiCard label="Avg. PO Value" value="₹3,46,000" delta="+4.8% vs last month" trend="up" subtext="Consolidated batch" icon="💰" />
        <KpiCard label="PO Approval TAT" value="1.8 Hours" delta="-0.6h improvement" trend="up" subtext="Paperless workflow" icon="⏱️" />
      </div>

      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>📑 Purchase Order Register</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>3-way PO matching: PO → GRN → Invoice verification workflow</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['ALL', 'Received', 'In Transit', 'Processing', 'Pending'].map(s => (
              <button key={s} onClick={() => setFilterStatus(s)} style={{ padding: '4px 10px', borderRadius: '6px', border: '1px solid ' + (filterStatus === s ? '#3b82f6' : 'rgba(255,255,255,0.1)'), background: filterStatus === s ? 'rgba(59,130,246,0.15)' : 'transparent', color: filterStatus === s ? '#60a5fa' : '#94a3b8', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>{s}</button>
            ))}
          </div>
        </div>
        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'var(--muted, #f8fafc)', borderBottom: '1px solid var(--border, rgba(0,0,0,0.08))' }}>
                {['PO ID', 'Vendor', 'Items', 'Qty', 'PO Value', 'Raised', 'Expected Delivery', 'Received', 'Approver', 'Status'].map(h => (
                  <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--muted-foreground, #64748b)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((o, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border, rgba(0,0,0,0.06))' }}>
                  <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', color: '#38bdf8', fontSize: '11px' }}>{o.id}</td>
                  <td style={{ padding: '11px 12px', fontWeight: 600, color: 'var(--foreground, #0f172a)' }}>{o.vendor}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--muted-foreground, #64748b)', maxWidth: '180px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{o.items}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--foreground, #334155)', fontSize: '11px' }}>{o.qty}</td>
                  <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', color: '#fbbf24', fontWeight: 600 }}>{o.value}</td>
                  <td style={{ padding: '11px 12px', color: '#64748b', fontSize: '11px' }}>{o.raised}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--foreground, #334155)', fontSize: '11px' }}>{o.delivery}</td>
                  <td style={{ padding: '11px 12px', color: o.rcvd !== '-' ? '#34d399' : '#64748b', fontSize: '11px' }}>{o.rcvd}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--muted-foreground, #64748b)' }}>{o.approver}</td>
                  <td style={{ padding: '11px 12px' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, background: statusColor(o.status) + '22', color: statusColor(o.status) }}>{o.status}</span>
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
