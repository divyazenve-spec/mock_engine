import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Vaccinations() {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const vaccinations = [
    { id: 'VAC-2026-901', pet: 'Zoe (Indie Rescue, 1y)', species: 'Canine', parent: 'Dr. Rajeshwari Swaminathan', vaccineName: 'Nobivac DHPPi + L4 (6-in-1)', mfg: 'MSD Animal Health', batchNo: 'MSD-NOB-9842A', administered: '14 Oct 2026', nextDue: '14 Oct 2027', coldChainVerified: '4.2°C (Validated)', certStatus: 'Certificate Issued' },
    { id: 'VAC-2026-902', pet: 'Bruno (Golden Retriever, 4y)', species: 'Canine', parent: 'Aditya Vikram Birla', vaccineName: 'Nobivac Rabies (1ml Sterile)', mfg: 'MSD Animal Health', batchNo: 'MSD-RAB-1102B', administered: '14 Oct 2026', nextDue: '14 Oct 2027', coldChainVerified: '3.8°C (Validated)', certStatus: 'Certificate Issued' },
    { id: 'VAC-2026-903', pet: 'Simba (Persian Cat, 2y)', species: 'Feline', parent: 'Pooja Singhania', vaccineName: 'Felocell 4 (FVRCP + Chlamydia)', mfg: 'Zoetis Healthcare', batchNo: 'ZTS-FEL-4421C', administered: '13 Oct 2026', nextDue: '13 Oct 2027', coldChainVerified: '4.5°C (Validated)', certStatus: 'Certificate Issued' },
    { id: 'VAC-2026-904', pet: 'Coco (Beagle, 5y)', species: 'Canine', parent: 'Ananya Sen', vaccineName: 'Nobivac KC (Bordetella Intranasal)', mfg: 'MSD Animal Health', batchNo: 'MSD-KC-8841E', administered: '13 Oct 2026', nextDue: '13 Apr 2027', coldChainVerified: '4.1°C (Validated)', certStatus: 'Certificate Issued' },
    { id: 'VAC-2026-905', pet: 'Milo (British Shorthair, 3y)', species: 'Feline', parent: 'Meera Nambiar', vaccineName: 'Defensor 3 (Feline Rabies)', mfg: 'Zoetis Healthcare', batchNo: 'ZTS-DEF-3019D', administered: '12 Oct 2026', nextDue: '12 Oct 2027', coldChainVerified: '3.9°C (Validated)', certStatus: 'Certificate Issued' },
    { id: 'VAC-2026-906', pet: 'Bella (Labrador Retriever, 3y)', species: 'Canine', parent: 'Sneha Kulkarni', vaccineName: 'Vanguard Plus 5/L (Core Canine)', mfg: 'Zoetis Healthcare', batchNo: 'ZTS-VAN-5520A', administered: '12 Oct 2026', nextDue: '12 Oct 2027', coldChainVerified: '4.0°C (Validated)', certStatus: 'Certificate Issued' },
    { id: 'VAC-2026-907', pet: 'Oskar (Siberian Husky, 2.5y)', species: 'Canine', parent: 'Vikram Merchant', vaccineName: 'Nobivac DHPPi Booster', mfg: 'MSD Animal Health', batchNo: 'MSD-NOB-9842A', administered: '11 Oct 2026', nextDue: '11 Oct 2027', coldChainVerified: '4.3°C (Validated)', certStatus: 'Certificate Issued' },
    { id: 'VAC-2026-908', pet: 'Leo (Shih Tzu, 1.5y)', species: 'Canine', parent: 'Kunal Kapoor', vaccineName: 'Canigen DHPPi/L (Virbac)', mfg: 'Virbac Animal Health', batchNo: 'VRB-CAN-7128F', administered: '10 Oct 2026', nextDue: '10 Oct 2027', coldChainVerified: '4.4°C (Validated)', certStatus: 'Certificate Issued' },
    { id: 'VAC-2026-909', pet: 'Rocky (Rottweiler, 4y)', species: 'Canine', parent: 'Tarun Mathur', vaccineName: 'Nobivac Rabies Annual Booster', mfg: 'MSD Animal Health', batchNo: 'MSD-RAB-1102B', administered: '09 Oct 2026', nextDue: '09 Oct 2027', coldChainVerified: '3.7°C (Validated)', certStatus: 'Certificate Issued' },
    { id: 'VAC-2026-910', pet: 'Max (German Shepherd, 6y)', species: 'Canine', parent: 'Rohan Deshmukh', vaccineName: 'Megavac-6 Core Puppy/Adult', mfg: 'Indian Immunologicals', batchNo: 'IIL-MEG-6602K', administered: '08 Oct 2026', nextDue: '08 Oct 2027', coldChainVerified: '4.1°C (Validated)', certStatus: 'Certificate Issued' }
  ];

  const filtered = vaccinations.filter(r => {
    const matchesFilter = filter === 'ALL' || r.species === filter || r.vaccineName.includes(filter);
    const matchesSearch = r.pet.toLowerCase().includes(search.toLowerCase()) ||
      r.parent.toLowerCase().includes(search.toLowerCase()) ||
      r.vaccineName.toLowerCase().includes(search.toLowerCase()) ||
      r.batchNo.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const cardStyle = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Veterinary Services"
      subcategory="Vaccinations"
      title="Immunization Schedules & Biological Lot Tracking"
      subtitle="Canine & feline vaccination schedules, IoT cold-chain batch tracking, booster recalls, and digital health pass generation"
      icon="💉"
      badge="10 Verified Doses Administered"
      actions={
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {['ALL', 'Canine', 'Feline', 'Nobivac', 'Zoetis'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                border: filter === f ? '1px solid #059669' : '1px solid #e2e8f0',
                background: filter === f ? '#059669' : '#ffffff',
                color: filter === f ? '#ffffff' : '#64748b'
              }}
            >
              {f}
            </button>
          ))}
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Vaccines Administered" value="482 Doses MTD" delta="+8.6% MoM" trend="up" subtext="Canine & feline schedules" icon="💉" />
        <KpiCard label="Cold-Chain Adherence" value="99.98%" delta="+2°C to +8°C" trend="up" subtext="Automated IoT probe alerts" icon="❄️" />
        <KpiCard label="Booster Recall Rate" value="94.2%" delta="WhatsApp push" trend="up" subtext="Zero overdue rabies breaches" icon="📲" />
        <KpiCard label="Digital Passports" value="1,840 Issued" delta="QR verified" trend="up" subtext="Tamper-proof vaccination card" icon="🛡️" />
      </div>

      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Official Immunization Registry & Cold-Chain Vials</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Biological product lot tracking, refrigeration temperature logs, and expiry management</p>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search pet, vaccine, batch or parent..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--border, #cbd5e1)', fontSize: '12px', background: '#f8fafc', color: '#0f172a', width: '280px' }}
            />
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #475569)' }}>
                <th style={{ padding: '10px 12px' }}>Vaccine Code</th>
                <th style={{ padding: '10px 12px' }}>Pet & Species</th>
                <th style={{ padding: '10px 12px' }}>Pet Parent</th>
                <th style={{ padding: '10px 12px' }}>Biological Product & Manufacturer</th>
                <th style={{ padding: '10px 12px' }}>Batch / Lot No</th>
                <th style={{ padding: '10px 12px' }}>Administered Date</th>
                <th style={{ padding: '10px 12px' }}>Next Booster Due</th>
                <th style={{ padding: '10px 12px' }}>Cold Chain</th>
                <th style={{ padding: '10px 12px', textAlign: 'center' }}>Passport Cert</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '12px', fontWeight: 600, color: '#059669', fontFamily: '"IBM Plex Mono", monospace' }}>{r.id}</td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{r.pet}</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>{r.species === 'Canine' ? '🐕 Canine' : '🐈 Feline'}</div>
                  </td>
                  <td style={{ padding: '12px', color: '#475569' }}>{r.parent}</td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ fontWeight: 600, color: '#0f172a' }}>{r.vaccineName}</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>{r.mfg}</div>
                  </td>
                  <td style={{ padding: '12px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600, color: '#334155' }}>{r.batchNo}</td>
                  <td style={{ padding: '12px', color: '#0f172a', fontWeight: 500 }}>{r.administered}</td>
                  <td style={{ padding: '12px', fontWeight: 600, color: '#059669', fontFamily: '"IBM Plex Mono", monospace' }}>{r.nextDue}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, background: '#ecfeff', color: '#0891b2', border: '1px solid #a5f3fc' }}>
                      ❄️ {r.coldChainVerified}
                    </span>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <span style={{
                      padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600,
                      background: 'rgba(16,185,129,0.12)', color: '#047857'
                    }}>
                      {r.certStatus}
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