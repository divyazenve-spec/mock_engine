import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function AllPets() {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const pets = [
    { id: 'PET-101', name: 'Max', species: 'Canine', breed: 'Golden Retriever', age: '3 yrs 2 mos', gender: 'Neutered Male', parent: 'Priya Sharma', phone: '+91 98450 12345', city: 'Bengaluru (Indiranagar)', healthScore: 94, vaxStatus: 'Up to Date', microchip: '982000412891201' },
    { id: 'PET-102', name: 'Bella', species: 'Feline', breed: 'Persian Longhair', age: '2 yrs 4 mos', gender: 'Spayed Female', parent: 'Rahul Verma', phone: '+91 97312 98765', city: 'Bengaluru (Koramangala)', healthScore: 91, vaxStatus: 'Up to Date', microchip: '982000412891202' },
    { id: 'PET-103', name: 'Coco', species: 'Canine', breed: 'Shih Tzu', age: '1 yr 6 mos', gender: 'Intact Female', parent: 'Ananya Iyer', phone: '+91 99001 54321', city: 'Bengaluru (HSR Layout)', healthScore: 89, vaxStatus: 'Due in 14d', microchip: '982000412891203' },
    { id: 'PET-104', name: 'Rocky', species: 'Canine', breed: 'German Shepherd', age: '4 yrs 1 mo', gender: 'Neutered Male', parent: 'Vikram Malhotra', phone: '+91 98860 11223', city: 'Bengaluru (Whitefield)', healthScore: 92, vaxStatus: 'Up to Date', microchip: '982000412891204' },
    { id: 'PET-105', name: 'Milo', species: 'Canine', breed: 'Beagle', age: '2 yrs 8 mos', gender: 'Neutered Male', parent: 'Deepika Nair', phone: '+91 96118 77665', city: 'Bengaluru (Jayanagar)', healthScore: 86, vaxStatus: 'Up to Date', microchip: '982000412891205' },
    { id: 'PET-106', name: 'Leo', species: 'Canine', breed: 'Labrador Retriever', age: '5 yrs 3 mos', gender: 'Neutered Male', parent: 'Siddharth Rao', phone: '+91 94480 33445', city: 'Bengaluru (JP Nagar)', healthScore: 90, vaxStatus: 'Up to Date', microchip: '982000412891206' },
    { id: 'PET-107', name: 'Luna', species: 'Canine', breed: 'Siberian Husky', age: '3 yrs 0 mos', gender: 'Spayed Female', parent: 'Kavita Menon', phone: '+91 98200 66778', city: 'Bengaluru (Bellandur)', healthScore: 93, vaxStatus: 'Up to Date', microchip: '982000412891207' },
    { id: 'PET-108', name: 'Simba', species: 'Canine', breed: 'Indie Hound Cross', age: '1 yr 2 mos', gender: 'Neutered Male', parent: 'Arjun Kapoor', phone: '+91 97401 22334', city: 'Bengaluru (Sadashivnagar)', healthScore: 97, vaxStatus: 'Up to Date', microchip: '982000412891208' },
    { id: 'PET-109', name: 'Oreo', species: 'Canine', breed: 'French Bulldog', age: '2 yrs 1 mo', gender: 'Intact Male', parent: 'Meera Nambiar', phone: '+91 96325 88990', city: 'Bengaluru (Hebbal)', healthScore: 88, vaxStatus: 'Due in 14d', microchip: '982000412891209' },
    { id: 'PET-110', name: 'Bruno', species: 'Canine', breed: 'Rottweiler', age: '3 yrs 6 mos', gender: 'Neutered Male', parent: 'Rohan Gupta', phone: '+91 98110 44556', city: 'Bengaluru (Electronic City)', healthScore: 91, vaxStatus: 'Up to Date', microchip: '982000412891210' }
  ];

  const filtered = pets.filter(p => {
    const matchesFilter = filter === 'ALL' || p.species === filter || p.vaxStatus === filter;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.breed.toLowerCase().includes(search.toLowerCase()) ||
      p.parent.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.city.toLowerCase().includes(search.toLowerCase()) ||
      p.microchip.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <DashboardLayout
      category="Pets 360°"
      subcategory="All Pets"
      title="Master Pet Registry & Census"
      subtitle="Complete database of registered companion animals, pet parents, microchip IDs, and longitudinal health statuses"
      icon="🐾"
      badge="10 Registered Pets"
      actions={
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {['ALL', 'Canine', 'Feline', 'Avian', 'Up to Date', 'Due in 14d', 'Overdue'].map(f => (
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
        <KpiCard label="Total Registered Pets" value="10" delta="+100%" trend="up" subtext="Canine & Feline Registry" icon="🐾" />
        <KpiCard label="Canine Share" value="90.0%" delta="9 Dogs" trend="up" subtext="Primary demographic" icon="🐕" />
        <KpiCard label="Feline Share" value="10.0%" delta="1 Cat" trend="neutral" subtext="Bella (Persian)" icon="🐈" />
        <KpiCard label="Vaccine Compliant" value="100.0%" delta="8 / 10 Valid" trend="up" subtext="Health pass verified" icon="💉" />
        <KpiCard label="Microchip Enrolled" value="100.0%" delta="10 Chipped" trend="up" subtext="ISO 11784 RFID standard" icon="🏷️" />
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
        gap: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, maxWidth: '480px' }}>
          <span style={{ color: '#94a3b8', fontSize: '15px' }}>🔍</span>
          <input
            type="text"
            placeholder="Search by pet name, breed, parent, microchip, or city..."
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
          Showing <b>{filtered.length}</b> of <b>{pets.length}</b> pets
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
              <th style={{ padding: '12px 16px' }}>Pet</th>
              <th style={{ padding: '12px 16px' }}>Species / Breed</th>
              <th style={{ padding: '12px 16px' }}>Age & Gender</th>
              <th style={{ padding: '12px 16px' }}>Pet Parent & Contact</th>
              <th style={{ padding: '12px 16px' }}>City</th>
              <th style={{ padding: '12px 16px' }}>Health Score</th>
              <th style={{ padding: '12px 16px' }}>Vaccine Status</th>
              <th style={{ padding: '12px 16px' }}>Microchip</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, idx) => (
              <tr key={p.id} style={{ borderBottom: idx !== filtered.length - 1 ? '1px solid #f1f5f9' : 'none', transition: 'background 0.1s' }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = '#ffffff'}>
                <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '20px' }}>{p.avatar}</span>
                    <div>
                      <div style={{ fontWeight: 700 }}>{p.name}</div>
                      <div style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'monospace' }}>{p.id}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ fontWeight: 600, color: '#334155' }}>{p.species}</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>{p.breed}</div>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ color: '#334155' }}>{p.age}</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>{p.gender}</div>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ fontWeight: 600, color: '#0f172a' }}>{p.parent}</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>{p.phone}</div>
                </td>
                <td style={{ padding: '12px 16px', color: '#475569' }}>{p.city}</td>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{
                      fontWeight: 700,
                      color: p.healthScore >= 90 ? '#059669' : p.healthScore >= 80 ? '#2563eb' : '#d97706'
                    }}>
                      {p.healthScore}/100
                    </span>
                  </div>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '3px 8px',
                    borderRadius: '999px',
                    fontSize: '11px',
                    fontWeight: 600,
                    background: p.vaxStatus === 'Up to Date' ? '#ecfdf5' : p.vaxStatus.includes('Due') ? '#eff6ff' : '#fef2f2',
                    color: p.vaxStatus === 'Up to Date' ? '#059669' : p.vaxStatus.includes('Due') ? '#1d4ed8' : '#dc2626'
                  }}>
                    {p.vaxStatus}
                  </span>
                </td>
                <td style={{ padding: '12px 16px', fontFamily: 'monospace', fontSize: '11px', color: '#64748b' }}>
                  {p.microchip}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
