import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function VaccinationRecords() {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const vaccinations = [
    { id: 'VAX-901', pet: 'Max (Golden Retriever)', passId: 'VPASS-KA-001', vaccine: 'Nobivac DHPPi + L4', manufacturer: 'MSD Animal Health', batch: 'MSD-DH-9921', administeredOn: '2024-08-10', nextDue: '2025-08-10', vet: 'Dr. Ramesh Rao', status: 'Valid (Immune)' },
    { id: 'VAX-902', pet: 'Bella (German Shepherd)', passId: 'VPASS-KA-002', vaccine: 'Defensor 3 (Rabies)', manufacturer: 'Zoetis Animal Health', batch: 'ZOE-RB-4011', administeredOn: '2024-05-18', nextDue: '2025-05-18', vet: 'Dr. Priya Nair', status: 'Valid (Immune)' },
    { id: 'VAX-903', pet: 'Coco (Shih Tzu)', passId: 'VPASS-KA-003', vaccine: 'Felocell 4 (Core Feline)', manufacturer: 'Zoetis Animal Health', batch: 'ZOE-FC-3312', administeredOn: '2024-06-25', nextDue: '2025-06-25', vet: 'Dr. Ramesh Rao', status: 'Valid (Immune)' },
    { id: 'VAX-904', pet: 'Rocky (Beagle)', passId: 'VPASS-KA-004', vaccine: 'Nobivac KC (Kennel Cough)', manufacturer: 'MSD Animal Health', batch: 'MSD-KC-8801', administeredOn: '2024-09-02', nextDue: '2025-09-02', vet: 'Dr. Ananya Sen', status: 'Valid (Immune)' },
    { id: 'VAX-905', pet: 'Milo (French Bulldog)', passId: 'VPASS-KA-005', vaccine: 'Eurican DAPPi-Lmulti', manufacturer: 'Boehringer Ingelheim', batch: 'BI-EUR-1190', administeredOn: '2024-02-14', nextDue: '2025-02-14', vet: 'Dr. Priya Nair', status: 'Due in 30 Days' },
    { id: 'VAX-906', pet: 'Leo (Labrador)', passId: 'VPASS-KA-006', vaccine: 'Vanguard Plus 5/L', manufacturer: 'Zoetis Animal Health', batch: 'ZOE-VG-7704', administeredOn: '2024-07-20', nextDue: '2025-07-20', vet: 'Dr. Vikram Malhotra', status: 'Valid (Immune)' },
    { id: 'VAX-907', pet: 'Luna (Persian Cat)', passId: 'VPASS-KA-007', vaccine: 'Nobivac Tricat Trio', manufacturer: 'MSD Animal Health', batch: 'MSD-TT-5022', administeredOn: '2024-01-10', nextDue: '2025-01-10', vet: 'Dr. Ananya Sen', status: 'Due in 30 Days' },
    { id: 'VAX-908', pet: 'Simba (Indie / Desi Dog)', passId: 'VPASS-KA-008', vaccine: 'Rabigen Mono (Rabies)', manufacturer: 'Virbac Animal Health', batch: 'VIR-RM-9120', administeredOn: '2024-08-30', nextDue: '2025-08-30', vet: 'Dr. Ramesh Rao', status: 'Valid (Immune)' },
    { id: 'VAX-909', pet: 'Oreo (Pug)', passId: 'VPASS-KA-009', vaccine: 'Canigen DHPPi/L', manufacturer: 'Virbac Animal Health', batch: 'VIR-CN-6045', administeredOn: '2024-04-12', nextDue: '2025-04-12', vet: 'Dr. Vikram Malhotra', status: 'Valid (Immune)' },
    { id: 'VAX-910', pet: 'Bruno (Rottweiler)', passId: 'VPASS-KA-010', vaccine: 'Nobivac Rabies + DHPPi', manufacturer: 'MSD Animal Health', batch: 'MSD-RD-2234', administeredOn: '2024-06-05', nextDue: '2025-06-05', vet: 'Dr. Priya Nair', status: 'Valid (Immune)' }
  ];

  const filtered = vaccinations.filter(v => {
    const matchesFilter = filter === 'ALL' || v.status.includes(filter);
    const matchesSearch = v.pet.toLowerCase().includes(search.toLowerCase()) ||
      v.vaccine.toLowerCase().includes(search.toLowerCase()) ||
      v.batch.toLowerCase().includes(search.toLowerCase()) ||
      v.passId.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <DashboardLayout
      category="Pets 360°"
      subcategory="Vaccination Records"
      title="Digital Vaccination Passports & Biological Records"
      subtitle="Verifiable immunization records, vaccine manufacturer lot tracing, expiry recalls, and digital health pass passes"
      icon="🐾"
      badge="10 Active Passports"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          {['ALL', 'Valid', 'Due', 'Overdue'].map(f => (
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
        <KpiCard label="Doses Administered" value="10" delta="+100%" trend="up" subtext="YTD across network" icon="💉" />
        <KpiCard label="Immunity Compliance" value="94.2%" delta="High" trend="up" subtext="Protected population" icon="🛡️" />
        <KpiCard label="Due Within 30 Days" value="2" delta="Milo, Luna" trend="neutral" subtext="WhatsApp & SMS alerts" icon="🔔" />
        <KpiCard label="Cold-Chain Lot Tracked" value="100%" delta="Zoetis / MSD" trend="up" subtext="IoT monitored" icon="❄️" />
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
            placeholder="Search by pet name, vaccine brand, batch number, or passport ID..."
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
          Showing <b>{filtered.length}</b> biological certificates
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
              <th style={{ padding: '12px 16px' }}>Pet Patient & Passport</th>
              <th style={{ padding: '12px 16px' }}>Vaccine & Manufacturer</th>
              <th style={{ padding: '12px 16px' }}>Batch / Lot ID</th>
              <th style={{ padding: '12px 16px' }}>Administered Date</th>
              <th style={{ padding: '12px 16px' }}>Next Recall Date</th>
              <th style={{ padding: '12px 16px' }}>Attending Vet</th>
              <th style={{ padding: '12px 16px' }}>Passport Validity</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((v, idx) => (
              <tr key={v.id} style={{ borderBottom: idx !== filtered.length - 1 ? '1px solid #f1f5f9' : 'none', transition: 'background 0.1s' }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = '#ffffff'}>
                <td style={{ padding: '12px 16px', fontWeight: 600 }}>
                  <div style={{ color: '#0f172a' }}>{v.pet}</div>
                  <div style={{ fontSize: '11px', fontFamily: 'monospace', color: '#2563eb' }}>{v.passId}</div>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ fontWeight: 600, color: '#0f172a' }}>{v.vaccine}</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>{v.manufacturer}</div>
                </td>
                <td style={{ padding: '12px 16px', fontFamily: 'monospace', fontSize: '11px', color: '#475569' }}>
                  {v.batch}
                </td>
                <td style={{ padding: '12px 16px', color: '#334155' }}>{v.administeredOn}</td>
                <td style={{ padding: '12px 16px', fontWeight: 600, color: v.status.includes('Overdue') ? '#dc2626' : '#0f172a' }}>{v.nextDue}</td>
                <td style={{ padding: '12px 16px', color: '#2563eb', fontSize: '12px', fontWeight: 600 }}>{v.vet}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '3px 8px',
                    borderRadius: '999px',
                    fontSize: '11px',
                    fontWeight: 600,
                    background: v.status.includes('Valid') ? '#ecfdf5' : v.status.includes('Due') ? '#eff6ff' : '#fef2f2',
                    color: v.status.includes('Valid') ? '#059669' : v.status.includes('Due') ? '#1d4ed8' : '#dc2626'
                  }}>
                    {v.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
