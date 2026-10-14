import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function FashionOrders() {
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterChannel, setFilterChannel] = useState('ALL');
  const [search, setSearch] = useState('');

  const orders = [
    { orderId: 'ORD-F801', customer: 'Natasha Poonawalla', pet: 'Princess (Maltipoo)', items: 'Royal Brocade Pet Sherwani + Gold ID', channel: 'Bandra Boutique', customDetails: 'Gold Monogram "P"', value: '₹7,300', date: '2026-10-14', payment: 'Amex Centurion', status: 'In Tailoring' },
    { orderId: 'ORD-F802', customer: 'Vikram Oberoi', pet: 'Thor (Golden Retriever)', items: 'Italian Leather Harness + Leash', channel: 'Online Store Drop', customDetails: 'Brass Nameplate Engraved', value: '₹6,850', date: '2026-10-14', payment: 'Razorpay CC', status: 'Dispatched' },
    { orderId: 'ORD-F803', customer: 'Tanya Dubash', pet: 'Bella (Shih Tzu)', items: 'Cashmere Sweater + Linen Polo', channel: 'Indiranagar Studio', customDetails: 'Custom Back Length (32cm)', value: '₹5,100', date: '2026-10-13', payment: 'NetBanking', status: 'Delivered' },
    { orderId: 'ORD-F804', customer: 'Rohit Singhania', pet: 'Simba (French Bulldog)', items: 'Velvet Evening Tuxedo & Bowtie', channel: 'Koramangala Lounge', customDetails: 'Silk Collar Initial "S"', value: '₹5,400', date: '2026-10-13', payment: 'POS Card', status: 'Delivered' },
    { orderId: 'ORD-F805', customer: 'Meera Deora', pet: 'Coco (Persian Cat)', items: 'Merino Thermal Layer + Calfskin Collar', channel: 'Concierge Atelier', customDetails: 'Made-to-Measure Cat Pattern', value: '₹5,450', date: '2026-10-13', payment: 'UPI Instant', status: 'Delivered' },
    { orderId: 'ORD-F806', customer: 'Kabir Wadia', pet: 'Ghost (Siberian Husky)', items: 'Alpine StormShield Trench (XXL)', channel: 'Bandra Boutique', customDetails: 'High-Vis Patch "GHOST"', value: '₹4,200', date: '2026-10-12', payment: 'Apple Pay', status: 'Delivered' },
    { orderId: 'ORD-F807', customer: 'Ananya Birla', pet: 'Mochi (Pomeranian)', items: 'Monaco Linen Polo + Rose Gold Leash', channel: 'Online Store Drop', customDetails: 'Rose Gold Charm Engraving', value: '₹4,350', date: '2026-10-12', payment: 'Razorpay CC', status: 'Delivered' },
    { orderId: 'ORD-F808', customer: 'Devika Ruia', pet: 'Zara (Beagle)', items: 'Orthopedic Rain Booties (Set of 4)', channel: 'Indiranagar Studio', customDetails: 'In-Store Paw Sizing Verified', value: '₹1,850', date: '2026-10-12', payment: 'UPI Instant', status: 'Delivered' },
    { orderId: 'ORD-F809', customer: 'Siddharth Goenka', pet: 'Bruno (Labrador)', items: 'Alpine StormShield + Leather Harness', channel: 'Online Store Drop', customDetails: 'Reflective Name Stamping', value: '₹7,850', date: '2026-10-11', payment: 'Visa Infinite', status: 'Delivered' },
    { orderId: 'ORD-F810', customer: 'Rhea Kapoor', pet: 'Leo (Toy Poodle)', items: 'Royal Brocade Sherwani + Velvet Bowtie', channel: 'Concierge Atelier', customDetails: 'Bridal Collection Custom Fit', value: '₹6,900', date: '2026-10-11', payment: 'Amex Platinum', status: 'Delivered' }
  ];

  const filtered = orders.filter(o => {
    if (filterStatus !== 'ALL' && o.status !== filterStatus) return false;
    if (filterChannel !== 'ALL' && o.channel !== filterChannel) return false;
    if (search) {
      const q = search.toLowerCase();
      return o.orderId.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q) || o.pet.toLowerCase().includes(q) || o.items.toLowerCase().includes(q);
    }
    return true;
  });

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(255,255,255,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Zenve Fashion"
      subcategory="Order Management"
      title="Fashion Orders & Tailoring Pipeline"
      subtitle="Bespoke atelier tailoring queues, showroom styling orders, online drops, and custom monogram fulfillment"
      icon="🛍️"
      badge="Order Ledger"
      actions={
        <button onClick={() => alert('Opening Custom Atelier Measurement Order...')} style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #ec4899', background: 'rgba(236,72,153,0.15)', color: '#f472b6', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
          ✂️ Create Bespoke Order
        </button>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Fashion Orders (MTD)" value="730 Orders" delta="+24.6% MoM" trend="up" subtext="Showroom & e-commerce" icon="🛍️" />
        <KpiCard label="Average Order Value" value="₹6,650" delta="+₹820 vs FY25" trend="up" subtext="Bundled collar & harness" icon="💳" />
        <KpiCard label="Monogram Customization" value="48.5%" delta="354 personalized items" trend="up" subtext="Custom name embroidery" icon="✨" />
        <KpiCard label="In-Store Trial Conversion" value="68.2%" delta="+4.1% conversion" trend="up" subtext="Pet dressing rooms" icon="🐕" />
        <KpiCard label="Atelier Turnaround (TAT)" value="4.8 Days" delta="-1.2d faster" trend="up" subtext="Bespoke made-to-measure" icon="⏱️" />
        <KpiCard label="On-Time Delivery Rate" value="99.4%" delta="Zero transit damage" trend="up" subtext="Luxury packaging" icon="📦" />
      </div>

      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>🛍️ Real-Time Fashion Order Stream</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Omnichannel pet fashion orders, custom monogramming details, and fulfillment statuses</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search order ID, pet parent, breed..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.15))', borderRadius: '6px', padding: '6px 12px', color: 'var(--foreground, #0f172a)', fontSize: '12px', minWidth: '220px' }}
            />
            <select
              value={filterChannel}
              onChange={e => setFilterChannel(e.target.value)}
              style={{ background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.15))', borderRadius: '6px', padding: '6px 10px', color: 'var(--foreground, #0f172a)', fontSize: '12px' }}
            >
              <option value="ALL">All Sales Channels</option>
              <option value="Bandra Boutique">Bandra Boutique</option>
              <option value="Indiranagar Studio">Indiranagar Studio</option>
              <option value="Koramangala Lounge">Koramangala Lounge</option>
              <option value="Online Store Drop">Online Store Drop</option>
              <option value="Concierge Atelier">Concierge Atelier</option>
            </select>
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              style={{ background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.15))', borderRadius: '6px', padding: '6px 10px', color: 'var(--foreground, #0f172a)', fontSize: '12px' }}
            >
              <option value="ALL">All Order Statuses</option>
              <option value="Delivered">Delivered</option>
              <option value="Dispatched">Dispatched</option>
              <option value="In Tailoring">In Tailoring</option>
            </select>
          </div>
        </div>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'var(--muted, #f8fafc)', borderBottom: '1px solid var(--border, rgba(0,0,0,0.08))' }}>
                {['Order ID', 'Pet Parent & Pet', 'Items Ordered', 'Channel', 'Customization / Atelier', 'Value', 'Date', 'Payment', 'Status'].map(h => (
                  <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--muted-foreground, #64748b)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((o, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border, rgba(0,0,0,0.06))' }}>
                  <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', color: '#f472b6', fontSize: '11px', fontWeight: 600 }}>{o.orderId}</td>
                  <td style={{ padding: '11px 12px' }}>
                    <div style={{ fontWeight: 600, color: 'var(--foreground, #0f172a)' }}>{o.customer}</div>
                    <div style={{ fontSize: '11px', color: '#38bdf8' }}>{o.pet}</div>
                  </td>
                  <td style={{ padding: '11px 12px', color: 'var(--foreground, #334155)' }}>{o.items}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--muted-foreground, #64748b)' }}>{o.channel}</td>
                  <td style={{ padding: '11px 12px', color: '#a78bfa', fontSize: '11px' }}>{o.customDetails}</td>
                  <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#34d399' }}>{o.value}</td>
                  <td style={{ padding: '11px 12px', color: '#64748b', fontSize: '11px' }}>{o.date}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--foreground, #334155)' }}>{o.payment}</td>
                  <td style={{ padding: '11px 12px' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, background: o.status === 'Delivered' ? 'rgba(52,211,153,0.15)' : o.status === 'Dispatched' ? 'rgba(56,189,248,0.15)' : 'rgba(236,72,153,0.15)', color: o.status === 'Delivered' ? '#34d399' : o.status === 'Dispatched' ? '#38bdf8' : '#f472b6' }}>
                      {o.status}
                    </span>
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
