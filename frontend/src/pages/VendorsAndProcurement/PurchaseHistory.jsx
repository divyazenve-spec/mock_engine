import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function PurchaseHistory() {
  const [search, setSearch] = useState('');
  const [filterQuarter, setFilterQuarter] = useState('ALL');
  const [filterCategory, setFilterCategory] = useState('ALL');

  const historyRecords = [
    { poNumber: 'PO-2024-8801', vendor: 'Zoetis Animal Health India', category: 'Vaccines & Biologics', itemsCount: 14, orderValue: '₹4,85,000', deliveredDate: '2024-08-12', location: 'Bengaluru Indiranagar Hub', invoiceRef: 'INV-ZOE-9102', paidDate: '2024-08-22', status: 'Settled & Audited' },
    { poNumber: 'PO-2024-8802', vendor: 'MSD Animal Health Pvt Ltd', category: 'Vaccines & Biologics', itemsCount: 18, orderValue: '₹6,20,000', deliveredDate: '2024-08-10', location: 'Bengaluru Koramangala Hub', invoiceRef: 'INV-MSD-4419', paidDate: '2024-08-20', status: 'Settled & Audited' },
    { poNumber: 'PO-2024-8803', vendor: 'Boehringer Ingelheim Vet', category: 'Rx Pharmaceuticals', itemsCount: 8, orderValue: '₹3,40,000', deliveredDate: '2024-08-05', location: 'Bengaluru Whitefield Hub', invoiceRef: 'INV-BI-7712', paidDate: '2024-08-15', status: 'Settled & Audited' },
    { poNumber: 'PO-2024-8804', vendor: 'Royal Canin India Pvt Ltd', category: 'Rx Diet Foods', itemsCount: 25, orderValue: '₹8,90,000', deliveredDate: '2024-07-28', location: 'Bengaluru Central Warehouse', invoiceRef: 'INV-RC-5520', paidDate: '2024-08-07', status: 'Settled & Audited' },
    { poNumber: 'PO-2024-8805', vendor: 'Virbac Animal Health India', category: 'Broad Spectrum Rx', itemsCount: 16, orderValue: '₹2,95,000', deliveredDate: '2024-07-20', location: 'Bengaluru HSR Layout Hub', invoiceRef: 'INV-VIR-3301', paidDate: '2024-07-30', status: 'Settled & Audited' },
    { poNumber: 'PO-2024-8806', vendor: "Hill's Pet Nutrition India", category: 'Rx Diet Foods', itemsCount: 20, orderValue: '₹5,75,000', deliveredDate: '2024-07-15', location: 'Bengaluru Central Warehouse', invoiceRef: 'INV-HIL-8841', paidDate: '2024-07-25', status: 'Settled & Audited' },
    { poNumber: 'PO-2024-8807', vendor: 'Synthes Vet Orthopedics', category: 'Surgical Implants', itemsCount: 6, orderValue: '₹4,10,000', deliveredDate: '2024-07-10', location: 'Bengaluru Indiranagar Surgery Hub', invoiceRef: 'INV-SYN-1109', paidDate: '2024-07-20', status: 'Settled & Audited' },
    { poNumber: 'PO-2024-8808', vendor: 'Farmina Pet Foods India', category: 'Veterinary Nutrition', itemsCount: 30, orderValue: '₹6,40,000', deliveredDate: '2024-07-02', location: 'Bengaluru JP Nagar Hub', invoiceRef: 'INV-FAR-6623', paidDate: '2024-07-12', status: 'Settled & Audited' },
    { poNumber: 'PO-2024-8809', vendor: 'Intas Pharmaceuticals Vet', category: 'Broad Spectrum Rx', itemsCount: 22, orderValue: '₹3,15,000', deliveredDate: '2024-06-25', location: 'Bengaluru Malleshwaram Hub', invoiceRef: 'INV-INT-9904', paidDate: '2024-07-05', status: 'Settled & Audited' },
    { poNumber: 'PO-2024-8810', vendor: 'Purina PetCare India', category: 'Veterinary Nutrition', itemsCount: 15, orderValue: '₹4,80,000', deliveredDate: '2024-06-18', location: 'Bengaluru Central Warehouse', invoiceRef: 'INV-PUR-2218', paidDate: '2024-06-28', status: 'Settled & Audited' }
  ];

  const quarterlySpend = [
    { quarter: 'Q1 FY24-25 (Apr – Jun)', totalSpend: '₹48.2 Lakhs', ordersCount: '42 POs', avgTicket: '₹1,14,760', onTimeDelivery: '98.4% SLA' },
    { quarter: 'Q2 FY24-25 (Jul – Sep)', totalSpend: '₹52.8 Lakhs', ordersCount: '46 POs', avgTicket: '₹1,14,780', onTimeDelivery: '98.9% SLA' },
    { quarter: 'Q3 FY23-24 (Oct – Dec)', totalSpend: '₹44.1 Lakhs', ordersCount: '38 POs', avgTicket: '₹1,16,050', onTimeDelivery: '97.8% SLA' },
    { quarter: 'Q4 FY23-24 (Jan – Mar)', totalSpend: '₹46.5 Lakhs', ordersCount: '40 POs', avgTicket: '₹1,16,250', onTimeDelivery: '98.1% SLA' }
  ];

  const filtered = historyRecords.filter(r => {
    if (filterCategory !== 'ALL' && r.category !== filterCategory) return false;
    if (search) {
      const q = search.toLowerCase();
      return r.poNumber.toLowerCase().includes(q) || r.vendor.toLowerCase().includes(q) || r.location.toLowerCase().includes(q) || r.invoiceRef.toLowerCase().includes(q);
    }
    return true;
  });

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(255,255,255,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Vendors & Procurement"
      subcategory="Purchase History"
      title="Purchase History & Fulfilled Order Archive"
      subtitle="Complete ledger of historical purchase orders, fulfillment timelines, invoice audit trail, and multi-hub spend"
      icon="📜"
      badge="10 Archived POs"
      actions={
        <button onClick={() => alert('Exporting Purchase History Audit Ledger (CSV)...')} style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #3b82f6', background: 'rgba(59,130,246,0.15)', color: '#60a5fa', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
          📥 Export Audit Ledger
        </button>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Cumulative Spend (FYTD)" value="₹50.5 Lakhs" delta="+18.4% YoY" trend="up" subtext="10 Audited POs" icon="💰" />
        <KpiCard label="Fulfilled Orders" value="10 Orders" delta="100% GRN Verified" trend="up" subtext="Across 6 Bengaluru hubs" icon="📦" />
        <KpiCard label="Avg. Order Value" value="₹5,05,000" delta="+6.2%" trend="up" subtext="Consolidated direct batch" icon="📊" />
        <KpiCard label="Historical Fulfillment SLA" value="98.8%" delta="Within 48h" trend="up" subtext="Cold-chain & dry freight" icon="⏱️" />
        <KpiCard label="Invoice Match Accuracy" value="99.6%" delta="3-way matched" trend="up" subtext="ERP vs GRN vs invoice" icon="🛡️" />
        <KpiCard label="Active Supplier Count" value="10 Vendors" delta="Tier 1 & OEMs" trend="up" subtext="Direct authorized partners" icon="🏭" />
      </div>

      {/* Quarterly Spend Overview */}
      <div style={card}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>📅 Quarterly Purchase Spend & Performance Breakdown</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
          {quarterlySpend.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)', fontSize: '13px', gridColumn: '1 / -1' }}>
              No quarterly purchase spend records found
            </div>
          ) : (
            quarterlySpend.map((q, idx) => (
              <div key={idx} style={{ background: 'rgba(0,0,0,0.22)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '16px' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#38bdf8', marginBottom: '8px' }}>{q.quarter}</div>
                <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--foreground, #0f172a)', marginBottom: '12px' }}>{q.totalSpend}</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px' }}>
                  <div><span style={{ color: '#64748b' }}>Fulfilled POs:</span> <span style={{ color: '#e2e8f0', fontWeight: 600 }}>{q.ordersCount}</span></div>
                  <div><span style={{ color: '#64748b' }}>Avg. Ticket:</span> <span style={{ color: '#e2e8f0', fontWeight: 600 }}>{q.avgTicket}</span></div>
                  <div style={{ gridColumn: 'span 2' }}><span style={{ color: '#64748b' }}>Fulfillment SLA:</span> <span style={{ color: '#34d399', fontWeight: 700 }}>{q.onTimeDelivery}</span></div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Historical Purchases Table */}
      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>📑 Fulfilled Purchase Ledger</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Archived PO records with invoice references, delivery destination, and settlement audit dates</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search PO, vendor, hub, inv..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.15))', borderRadius: '6px', padding: '6px 12px', color: 'var(--foreground, #0f172a)', fontSize: '12px', minWidth: '220px' }}
            />
            <select
              value={filterCategory}
              onChange={e => setFilterCategory(e.target.value)}
              style={{ background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.15))', borderRadius: '6px', padding: '6px 10px', color: 'var(--foreground, #0f172a)', fontSize: '12px' }}
            >
              <option value="ALL">All Categories</option>
              <option value="Vaccines & Biologics">Vaccines & Biologics</option>
              <option value="Surgical Implants">Surgical Implants</option>
              <option value="Rx Pharmaceuticals">Rx Pharmaceuticals</option>
              <option value="Broad Spectrum Rx">Broad Spectrum Rx</option>
              <option value="Rx Diet Foods">Rx Diet Foods</option>
              <option value="Veterinary Nutrition">Veterinary Nutrition</option>
            </select>
          </div>
        </div>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'var(--muted, #f8fafc)', borderBottom: '1px solid var(--border, rgba(0,0,0,0.08))' }}>
                {['PO Number', 'Vendor Name', 'Category', 'Items', 'Order Value', 'Delivered Date', 'Receiving Location', 'Invoice Ref', 'Paid Date', 'Status'].map(h => (
                  <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--muted-foreground, #64748b)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={10} style={{ padding: '28px 12px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                    No fulfilled purchase records found
                  </td>
                </tr>
              ) : (
                filtered.map((r, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border, rgba(0,0,0,0.06))' }}>
                    <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', color: '#38bdf8', fontSize: '11px', fontWeight: 600 }}>{r.poNumber}</td>
                    <td style={{ padding: '11px 12px', color: 'var(--foreground, #0f172a)', fontWeight: 600 }}>{r.vendor}</td>
                    <td style={{ padding: '11px 12px', color: 'var(--muted-foreground, #64748b)' }}>{r.category}</td>
                    <td style={{ padding: '11px 12px', color: 'var(--foreground, #334155)' }}>{r.itemsCount} SKUs</td>
                    <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#34d399' }}>{r.orderValue}</td>
                    <td style={{ padding: '11px 12px', color: '#64748b', fontSize: '11px' }}>{r.deliveredDate}</td>
                    <td style={{ padding: '11px 12px', color: 'var(--foreground, #334155)' }}>{r.location}</td>
                    <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', color: '#a78bfa', fontSize: '11px' }}>{r.invoiceRef}</td>
                    <td style={{ padding: '11px 12px', color: '#64748b', fontSize: '11px' }}>{r.paidDate}</td>
                    <td style={{ padding: '11px 12px' }}>
                      <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, background: 'rgba(52,211,153,0.15)', color: '#34d399' }}>
                        {r.status}
                      </span>
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