import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function B2BOrders() {
  const [status, setStatus] = useState('ALL');

  const orders = [
    { po: 'PO-2026-B2B-001', client: 'Apollo Veterinary Super-Speciality Hospitals', items: '500x Nobivac DHPPi + 150x Bravecto 20-40kg', val: '₹4,85,000', orderDate: '2026-10-02', dispatchDate: '2026-10-04', status: 'Delivered' },
    { po: 'PO-2026-B2B-002', client: 'Max Pet Healthcare & Emergency Centers', items: '200x Ringer Lactate 500ml + 80x Amoxicillin Tabs', val: '₹2,95,000', orderDate: '2026-10-03', dispatchDate: '2026-10-05', status: 'Delivered' },
    { po: 'PO-2026-B2B-003', client: 'Central Armed Police Forces (CAPF) K9 Center', items: '300x High-Protein Working K9 Ration 20kg + 100x First-Aid', val: '₹6,40,000', orderDate: '2026-10-05', dispatchDate: '2026-10-08', status: 'Delivered' },
    { po: 'PO-2026-B2B-004', client: 'Canine Club of India Federation', items: '250x Microchip Syringe Packs + 500x Deworming Tabs', val: '₹1,95,000', orderDate: '2026-10-06', dispatchDate: '2026-10-09', status: 'Delivered' },
    { po: 'PO-2026-B2B-005', client: 'Infosys Technologies Pet Wellness Club', items: '350x Annual Pet Wellness Member Welcome Kits', val: '₹2,62,500', orderDate: '2026-10-07', dispatchDate: '2026-10-10', status: 'Delivered' },
    { po: 'PO-2026-B2B-006', client: 'Karnataka State Police CID Dog Squad', items: '120x Tactical Working Dog Harnesses + 60x Tracking Leashes', val: '₹3,15,000', orderDate: '2026-10-08', dispatchDate: '2026-10-11', status: 'Dispatched' },
    { po: 'PO-2026-B2B-007', client: 'Royal Canin Institutional Hub', items: '400x Gastrointestinal Veterinary Diet 14kg Bags', val: '₹5,80,000', orderDate: '2026-10-09', dispatchDate: '2026-10-12', status: 'Dispatched' },
    { po: 'PO-2026-B2B-008', client: 'Wipro Welfare Trust (Paws at Work)', items: '200x Preventive Flea/Tick Spot-On 6-Packs', val: '₹1,85,000', orderDate: '2026-10-10', dispatchDate: '2026-10-13', status: 'Dispatched' },
    { po: 'PO-2026-B2B-009', client: 'Sanjeevani Animal Welfare Trust', items: '150x Surgical Suture Boxes + 300x Sterile Gauze Bundles', val: '₹2,10,000', orderDate: '2026-10-11', dispatchDate: '2026-10-14', status: 'Processing' },
    { po: 'PO-2026-B2B-010', client: 'TCS Maitree Foundation Pet Support', items: '180x Comprehensive Preventive Care Kits', val: '₹1,45,000', orderDate: '2026-10-12', dispatchDate: '2026-10-15', status: 'Processing' }
  ];

  const filtered = status === 'ALL' ? orders : orders.filter(o => o.status === status);

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="B2B / Enterprise"
      subcategory="B2B Orders"
      title="B2B Purchase Orders & Bulk Fulfillment"
      subtitle="Institutional purchase orders, batch fulfillment allocations, warehouse dispatch manifests, and invoice linking"
      icon="📦"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="B2B Orders (MTD)" value="28 Orders" delta="18.2%" trend="up" subtext="Institutional order volume" icon="📦" />
        <KpiCard label="Order Value Pipeline" value="₹38,70,000" delta="22.4%" trend="up" subtext="MTD dispatched revenue" icon="💵" />
        <KpiCard label="On-Time Dispatch Rate" value="98.2%" delta="1.2%" trend="up" subtext="Dispatched within 24-48h" icon="⚡" />
        <KpiCard label="Pending Orders" value="3 Orders" delta="₹8.4L Value" trend="neutral" subtext="Packing & QC allocation" icon="⏳" />
      </div>

      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Institutional Bulk Orders Stream</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Live enterprise purchase orders and logistics dispatch progress</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['ALL', 'Processing', 'Dispatched', 'Delivered', 'Fulfilled'].map(s => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                style={{
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: '1px solid ' + (status === s ? '#4f46e5' : 'var(--border, #cbd5e1)'),
                  background: status === s ? 'rgba(79,70,229,0.1)' : 'transparent',
                  color: status === s ? '#4338ca' : 'var(--muted-foreground, #64748b)',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)' }}>
                <th style={{ padding: '10px 12px' }}>PO Number</th>
                <th style={{ padding: '10px 12px' }}>Client Organization</th>
                <th style={{ padding: '10px 12px' }}>Line Items</th>
                <th style={{ padding: '10px 12px' }}>PO Value</th>
                <th style={{ padding: '10px 12px' }}>Order Date</th>
                <th style={{ padding: '10px 12px' }}>Dispatch</th>
                <th style={{ padding: '10px 12px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '24px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                    No B2B order records found
                  </td>
                </tr>
              ) : (
                filtered.map(o => (
                  <tr key={o.po} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                    <td style={{ padding: '12px', fontFamily: 'monospace', fontWeight: 600 }}>{o.po}</td>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{o.client}</td>
                    <td style={{ padding: '12px' }}>{o.items}</td>
                    <td style={{ padding: '12px', fontWeight: 600, color: '#059669' }}>{o.val}</td>
                    <td style={{ padding: '12px' }}>{o.orderDate}</td>
                    <td style={{ padding: '12px' }}>{o.dispatchDate}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: '999px',
                        fontSize: '10px',
                        fontWeight: 600,
                        background: o.status === 'Delivered' || o.status === 'Fulfilled' ? 'rgba(16,185,129,0.12)' : o.status === 'Dispatched' ? 'rgba(79,70,229,0.1)' : 'rgba(245,158,11,0.14)',
                        color: o.status === 'Delivered' || o.status === 'Fulfilled' ? '#059669' : o.status === 'Dispatched' ? '#4338ca' : '#d97706'
                      }}>
                        {o.status}
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
