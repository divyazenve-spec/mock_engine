import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function PurchaseHistory() {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const purchases = [
    { id: 'ORD-8811', date: '2024-09-15', pet: 'Max (Golden Retriever)', item: 'Royal Canin Maxi Adult (15kg) + Joint Care Chews', category: 'Food & Nutrition', channel: 'Auto-Ship Delivery', parent: 'Priya Sharma', amount: '₹8,900', status: 'Delivered' },
    { id: 'ORD-8812', date: '2024-09-12', pet: 'Bella (German Shepherd)', item: 'Hill\'s Prescription Diet Gastrointestinal Biome (12kg)', category: 'Prescription Diet', channel: 'In-Clinic Pharmacy', parent: 'Rahul Verma', amount: '₹10,500', status: 'Delivered' },
    { id: 'ORD-8813', date: '2024-09-10', pet: 'Coco (Shih Tzu)', item: 'Apoquel 5.4mg (30 Tabs) + Malaseb Medicated Shampoo', category: 'Pharmacy & Wellness', channel: 'Same-Day Dispatch', parent: 'Ananya Rao', amount: '₹4,850', status: 'Delivered' },
    { id: 'ORD-8814', date: '2024-09-08', pet: 'Rocky (Beagle)', item: 'Drools Focus Super Premium Puppy + Kong Classic Toy', category: 'Food & Nutrition', channel: 'E-Commerce App', parent: 'Vikram Singh', amount: '₹3,400', status: 'Delivered' },
    { id: 'ORD-8815', date: '2024-09-05', pet: 'Milo (French Bulldog)', item: 'Royal Canin French Bulldog Adult + Cooling Harness', category: 'Food & Nutrition', channel: 'Auto-Ship Delivery', parent: 'Deepika Padukone', amount: '₹6,700', status: 'Delivered' },
    { id: 'ORD-8816', date: '2024-09-02', pet: 'Leo (Labrador)', item: 'Purina Pro Plan Mobility Joint Care (12kg) + Fish Oil', category: 'Prescription Diet', channel: 'In-Clinic Pharmacy', parent: 'Siddharth Roy', amount: '₹9,200', status: 'Delivered' },
    { id: 'ORD-8817', date: '2024-08-30', pet: 'Luna (Persian Cat)', item: 'Royal Canin Feline Urinary S/O Wet & Dry Pack (4kg)', category: 'Prescription Diet', channel: 'Auto-Ship Delivery', parent: 'Kavita Iyer', amount: '₹4,200', status: 'Delivered' },
    { id: 'ORD-8818', date: '2024-08-28', pet: 'Simba (Indie / Desi Dog)', item: 'Bravecto Tick & Flea Chewable + Calcium Syrup 500ml', category: 'Pharmacy & Wellness', channel: 'E-Commerce App', parent: 'Arjun Kapoor', amount: '₹3,150', status: 'Delivered' },
    { id: 'ORD-8819', date: '2024-08-25', pet: 'Oreo (Pug)', item: 'Farmina N&D Quinoa Skin & Coat (7kg)', category: 'Food & Nutrition', channel: 'Auto-Ship Delivery', parent: 'Meera Nair', amount: '₹5,400', status: 'Delivered' },
    { id: 'ORD-8820', date: '2024-08-20', pet: 'Bruno (Rottweiler)', item: 'Orijen Amazing Grains Puppy Large Breed (11.4kg) + Leash', category: 'Food & Nutrition', channel: 'In-Clinic Pharmacy', parent: 'Rohan Mehra', amount: '₹12,400', status: 'Delivered' }
  ];

  const filtered = purchases.filter(p => {
    const matchesFilter = filter === 'ALL' || p.category === filter || p.status === filter;
    const matchesSearch = p.pet.toLowerCase().includes(search.toLowerCase()) ||
      p.item.toLowerCase().includes(search.toLowerCase()) ||
      p.parent.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <DashboardLayout
      category="Pets 360°"
      subcategory="Purchase History"
      title="Pet Nutrition, Pharmacy & Merchandise Purchases"
      subtitle="Complete ledger of food, prescription diets, tick & flea treatments, and accessories purchased across omni-channels"
      icon="🐾"
      badge="10 Orders Logged"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          {['ALL', 'Food & Nutrition', 'Prescription Diet', 'Pharmacy & Wellness', 'Delivered'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                border: filter === f ? '1px solid #2563eb' : '1px solid #e2e8f0',
                background: filter === f ? '#eff6ff' : '#ffffff',
                color: filter === f ? '#2563eb' : '#64748b'
              }}
            >
              {f}
            </button>
          ))}
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '14px', marginBottom: '20px' }}>
        <KpiCard label="Total Pet Orders" value="10" delta="+100%" trend="up" subtext="All categories" icon="📦" />
        <KpiCard label="Average Pet Spend / Yr" value="₹40,165" delta="+22% YoY" trend="up" subtext="Annualized LTV" icon="💰" />
        <KpiCard label="Prescription Diet Share" value="42.5%" delta="High margin" trend="up" subtext="Clinical nutrition" icon="🥗" />
        <KpiCard label="Auto-Ship Recurring" value="80.0%" delta="4/5 active" trend="up" subtext="High retention" icon="🔄" />
      </div>

      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '16px 20px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, maxWidth: '480px' }}>
          <span style={{ color: '#94a3b8', fontSize: '15px' }}>🔍</span>
          <input
            type="text"
            placeholder="Search purchases by pet, product, parent, or order ID..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '13px',
              outline: 'none',
              background: '#f8fafc'
            }}
          />
        </div>
        <div style={{ fontSize: '12px', color: '#64748b' }}>
          Showing <b>{filtered.length}</b> purchase orders
        </div>
      </div>

      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <th style={{ padding: '12px 16px' }}>Order & Date</th>
              <th style={{ padding: '12px 16px' }}>Pet Consumer</th>
              <th style={{ padding: '12px 16px' }}>Purchased Product / SKU</th>
              <th style={{ padding: '12px 16px' }}>Category</th>
              <th style={{ padding: '12px 16px' }}>Fulfillment Channel</th>
              <th style={{ padding: '12px 16px' }}>Pet Parent</th>
              <th style={{ padding: '12px 16px' }}>Amount</th>
              <th style={{ padding: '12px 16px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '36px 16px', color: '#94a3b8' }}>
                  No purchase history records found
                </td>
              </tr>
            ) : (
              filtered.map((p, idx) => (
                <tr key={p.id} style={{ borderBottom: idx !== filtered.length - 1 ? '1px solid #f1f5f9' : 'none', transition: 'background 0.1s' }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = '#ffffff'}>
                  <td style={{ padding: '12px 16px', fontWeight: 600 }}>
                    <div style={{ fontFamily: 'monospace', color: '#2563eb' }}>{p.id}</div>
                    <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{p.date}</div>
                  </td>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#0f172a' }}>
                    {p.pet}
                  </td>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#334155' }}>
                    {p.item}
                  </td>
                  <td style={{ padding: '12px 16px', color: '#64748b', fontSize: '12px' }}>
                    {p.category}
                  </td>
                  <td style={{ padding: '12px 16px', color: '#2563eb', fontSize: '12px', fontWeight: 600 }}>
                    {p.channel}
                  </td>
                  <td style={{ padding: '12px 16px', color: '#0f172a' }}>
                    {p.parent}
                  </td>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#0f172a', fontFamily: 'monospace' }}>
                    {p.amount}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '3px 8px',
                      borderRadius: '999px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: p.status === 'Delivered' || p.status === 'Fulfilled' ? '#ecfdf5' : '#eff6ff',
                      color: p.status === 'Delivered' || p.status === 'Fulfilled' ? '#059669' : '#1d4ed8'
                    }}>
                      {p.status}
                    </span>
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
