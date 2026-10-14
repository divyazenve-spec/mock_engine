import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Procurement() {
  const pipeline = [
    { stage: 'Requisitions Raised', count: 43, value: '₹52.85 Lakhs', pct: 100, color: '#38bdf8' },
    { stage: 'Medical & Budget Approval', count: 38, value: '₹47.20 Lakhs', pct: 89, color: '#818cf8' },
    { stage: 'POs Issued & In Transit', count: 28, value: '₹38.50 Lakhs', pct: 73, color: '#f59e0b' },
    { stage: 'GRN & Cold Chain Check', count: 22, value: '₹31.10 Lakhs', pct: 59, color: '#a78bfa' },
    { stage: '3-Way Match & AP Settled', count: 18, value: '₹26.40 Lakhs', pct: 50, color: '#34d399' }
  ];

  const requisitions = [
    { id: 'REQ-2026-0501', department: 'Surgery OT — Indiranagar', item: 'Titanium Orthopedic Bone Plates 2.7mm/3.5mm', qty: '25 kits', urgency: 'Critical', requestedBy: 'Dr. Rajesh K', status: 'PO Raised', created: '2026-10-10' },
    { id: 'REQ-2026-0502', department: '24x7 Emergency & ICU — Koramangala', item: 'Ceftriaxone + Sulbactam 3.0g Injectable Vials', qty: '200 vials', urgency: 'Critical', requestedBy: 'Dr. Ananya Sen', status: 'PO Raised', created: '2026-10-11' },
    { id: 'REQ-2026-0503', department: 'Pharmacy Central Hub — Bengaluru', item: 'Bravecto Chewable Tablets for Dogs (All Weight Bands)', qty: '150 packs', urgency: 'High', requestedBy: 'K. Sunder', status: 'PO Raised', created: '2026-10-11' },
    { id: 'REQ-2026-0504', department: 'Clinical Pathology Lab — Indiranagar', item: 'IDEXX Catalyst Chemistry Reagent Clips (Chem 17 + Lyte 4)', qty: '40 boxes', urgency: 'High', requestedBy: 'Dr. Meera N', status: 'In Approval', created: '2026-10-12' },
    { id: 'REQ-2026-0505', department: 'Inpatient & Critical Care — Whitefield', item: 'Ringers Lactate + Normal Saline IV Fluids 500ml', qty: '500 bottles', urgency: 'High', requestedBy: 'Nurse Supriya', status: 'In Approval', created: '2026-10-12' },
    { id: 'REQ-2026-0506', department: 'Nutrition & Preventive Wellness — HSR Hub', item: 'Royal Canin Hypoallergenic Hydrolyzed Protein 7kg', qty: '45 bags', urgency: 'Medium', requestedBy: 'Dr. Sneha V', status: 'Received', created: '2026-10-12' },
    { id: 'REQ-2026-0507', department: 'Dermatology OPD — JP Nagar Hub', item: 'Apoquel (Oclacitinib) 5.4mg & 16mg Tablets', qty: '80 bottles', urgency: 'High', requestedBy: 'Dr. Kavita Rao', status: 'In Approval', created: '2026-10-13' },
    { id: 'REQ-2026-0508', department: 'Dental Suite — Malleshwaram Hub', item: 'Ultrasonic Scaler Inserts & Dental Prophy Paste', qty: '15 sets', urgency: 'Medium', requestedBy: 'Dr. Arjun Patel', status: 'Pending', created: '2026-10-13' },
    { id: 'REQ-2026-0509', department: 'Grooming & Medicated Spa — Indiranagar', item: 'Malaseb Medicated Antifungal Shampoo 250ml', qty: '120 bottles', urgency: 'Low', requestedBy: 'Pooja Nair', status: 'Pending', created: '2026-10-14' },
    { id: 'REQ-2026-0510', department: 'Cardiology & Imaging — Koramangala', item: 'Vetmedin (Pimobendan) 1.25mg & 5mg Chewable', qty: '60 boxes', urgency: 'High', requestedBy: 'Dr. Vikram Deshmukh', status: 'Pending', created: '2026-10-14' }
  ];

  const urgencyColor = u => ({ Critical: '#f87171', High: '#fbbf24', Medium: '#38bdf8', Low: '#94a3b8' }[u] || '#94a3b8');
  const statusColor = s => ({ 'Received': '#34d399', 'PO Raised': '#3b82f6', 'In Approval': '#a78bfa', Pending: '#64748b' }[s] || '#94a3b8');
  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(255,255,255,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Vendors & Procurement"
      subcategory="Procurement"
      title="Procurement Workflow & Requisition Pipeline"
      subtitle="End-to-end procurement lifecycle: requisition → approval → vendor negotiation → PO → GRN → 3-way match → payment"
      icon="🔄"
      badge="Procurement Pipeline"
      actions={
        <button onClick={() => alert('Creating New Procurement Requisition...')} style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #3b82f6', background: 'rgba(59,130,246,0.15)', color: '#60a5fa', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
          + New Requisition
        </button>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Requisitions (MTD)" value="43 Requests" delta="+8 vs last month" trend="up" subtext="Cross all departments" icon="📋" />
        <KpiCard label="POs Issued (MTD)" value="18 POs" delta="₹38.5 Lakhs total value" trend="up" subtext="Oct 2026" icon="📑" />
        <KpiCard label="Avg. Requisition to PO" value="1.6 Days" delta="-0.8d improvement" trend="up" subtext="End-to-end cycle time" icon="⏱️" />
        <KpiCard label="3-Way Match Rate" value="99.2%" delta="+0.4% MoM" trend="up" subtext="PO-GRN-Invoice match" icon="🎯" />
        <KpiCard label="Critical Requisitions" value="2 Urgent" delta="Surgery OT + ICU" trend="up" subtext="Fast-track approved" icon="🚨" />
        <KpiCard label="Procurement Cycle Savings" value="₹6.42 Lakhs" delta="+18.4% vs target" trend="up" subtext="Negotiation & volume" icon="💰" />
      </div>

      {/* Pipeline Stages */}
      <div style={card}>
        <h3 style={{ margin: '0 0 18px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>🔄 Procurement Pipeline — Stage View</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
          {pipeline.map((s, i) => (
            <div key={i} style={{ background: 'var(--muted, #f8fafc)', borderRadius: '8px', padding: '14px', borderLeft: `3px solid ${s.color}` }}>
              <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>Stage {i + 1}</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--foreground, #0f172a)', marginBottom: '6px' }}>{s.stage}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: s.color, fontWeight: 700 }}>{s.count} orders</span>
                <span style={{ color: 'var(--muted-foreground, #64748b)', fontFamily: '"IBM Plex Mono", monospace' }}>{s.value}</span>
              </div>
              <div style={{ height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', marginTop: '8px' }}>
                <div style={{ width: `${s.pct}%`, height: '100%', background: s.color, borderRadius: '2px', opacity: 0.7 }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Requisitions Table */}
      <div style={card}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>📋 Active Procurement Requisitions</h3>
        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'var(--muted, #f8fafc)', borderBottom: '1px solid var(--border, rgba(0,0,0,0.08))' }}>
                {['REQ ID', 'Department', 'Item', 'Qty', 'Urgency', 'Requested By', 'Status', 'Created'].map(h => (
                  <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--muted-foreground, #64748b)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {requisitions.map((r, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border, rgba(0,0,0,0.06))' }}>
                  <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', color: '#38bdf8', fontSize: '11px' }}>{r.id}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--foreground, #334155)', fontWeight: 500 }}>{r.department}</td>
                  <td style={{ padding: '11px 12px', fontWeight: 600, color: 'var(--foreground, #0f172a)' }}>{r.item}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--muted-foreground, #64748b)' }}>{r.qty}</td>
                  <td style={{ padding: '11px 12px' }}><span style={{ padding: '2px 7px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, background: urgencyColor(r.urgency) + '22', color: urgencyColor(r.urgency) }}>{r.urgency}</span></td>
                  <td style={{ padding: '11px 12px', color: 'var(--muted-foreground, #64748b)' }}>{r.requestedBy}</td>
                  <td style={{ padding: '11px 12px' }}><span style={{ padding: '2px 7px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, background: statusColor(r.status) + '22', color: statusColor(r.status) }}>{r.status}</span></td>
                  <td style={{ padding: '11px 12px', color: '#64748b', fontSize: '11px' }}>{r.created}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
