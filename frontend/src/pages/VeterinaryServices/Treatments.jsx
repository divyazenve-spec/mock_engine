import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Treatments() {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const treatments = [
    { id: 'TRT-401', pet: 'Max (German Shepherd, 6y)', parent: 'Rohan Deshmukh', ward: 'Critical Care ICU Bed-02', daysAdmitted: 2, vet: 'Dr. Vikramaditya Rathore', protocol: 'Post-Op Gastropexy & Fluid Decompression', meds: 'Fentanyl CRI (3mcg/kg/hr), Maropitant 1mg/kg, Cefazolin', vitals: 'HR: 104, BP: 118/74, Temp: 38.6°C', recoveryProgress: '78%', status: 'Stable Recovery' },
    { id: 'TRT-402', pet: 'Bruno (Golden Retriever, 4y)', parent: 'Aditya Vikram Birla', ward: 'Orthopedic Recovery Bed-04', daysAdmitted: 1, vet: 'Dr. Rajeshwari Swaminathan', protocol: 'Post-TPLO Cryotherapy & Cold-Compression', meds: 'Carprofen 4.4mg/kg, Gabapentin 10mg/kg, Tramadol', vitals: 'HR: 92, BP: 122/80, Temp: 38.4°C', recoveryProgress: '88%', status: 'Discharge Ready' },
    { id: 'TRT-403', pet: 'Simba (Persian Cat, 2y)', parent: 'Pooja Singhania', ward: 'Feline Special Care Bed-01', daysAdmitted: 3, vet: 'Dr. Sneha Nair', protocol: 'Urinary Catheterization & Acid-Base Balance', meds: 'Prazosin 0.5mg, Buprenorphine 0.02mg/kg, Plasmalyte', vitals: 'HR: 148, BP: 110/70, Temp: 38.2°C', recoveryProgress: '92%', status: 'Discharge Ready' },
    { id: 'TRT-404', pet: 'Leo (Shih Tzu, 1.5y)', parent: 'Kunal Kapoor', ward: 'Inpatient Isolation Ward Bed-03', daysAdmitted: 2, vet: 'Dr. Maya Chandran', protocol: 'Targeted Fluid Rehydration & Antiemetic Line', meds: 'Ondansetron 0.5mg/kg, Metronidazole, Potassium KCl CRI', vitals: 'HR: 116, BP: 114/72, Temp: 38.5°C', recoveryProgress: '65%', status: 'Under Observation' },
    { id: 'TRT-405', pet: 'Rocky (Rottweiler, 4y)', parent: 'Tarun Mathur', ward: 'Neurology High Dependency Bed-01', daysAdmitted: 4, vet: 'Dr. Anirudh Sen', protocol: 'High-Dose Methylprednisolone & Strict Cage Rest', meds: 'Methylprednisolone Sodium Succinate, Omeprazole, Methocarbamol', vitals: 'HR: 88, BP: 126/82, Temp: 38.3°C', recoveryProgress: '82%', status: 'Stable Recovery' },
    { id: 'TRT-406', pet: 'Bella (Labrador Retriever, 3y)', parent: 'Sneha Kulkarni', ward: 'Daycare Infusion Suite Bed-06', daysAdmitted: 1, vet: 'Dr. Edwin Reddy', protocol: 'Apoquel Induction & Medicated Chlorhexidine Wash', meds: 'Oclacitinib 0.4mg/kg BID, Cephalexin 25mg/kg', vitals: 'HR: 96, BP: 120/78, Temp: 38.4°C', recoveryProgress: '95%', status: 'Discharge Ready' },
    { id: 'TRT-407', pet: 'Coco (Beagle, 5y)', parent: 'Ananya Sen', ward: 'Cardiology Telemetry Ward Bed-02', daysAdmitted: 2, vet: 'Dr. Siddharth Verma', protocol: 'Pimobendan Inotropic Support & Enalapril Titration', meds: 'Vetmedin 0.25mg/kg, Enalapril 0.5mg/kg, Spironolactone', vitals: 'HR: 112, BP: 116/74, Temp: 38.1°C', recoveryProgress: '85%', status: 'Stable Recovery' },
    { id: 'TRT-408', pet: 'Oskar (Siberian Husky, 2.5y)', parent: 'Vikram Merchant', ward: 'Surgical Day Recovery Bed-05', daysAdmitted: 1, vet: 'Dr. Rohan Kulkarni', protocol: 'Excisional Biopsy Healing & Laser Therapy', meds: 'Meloxicam 0.1mg/kg, Amoxicillin-Clavulanate 20mg/kg', vitals: 'HR: 94, BP: 124/80, Temp: 38.5°C', recoveryProgress: '90%', status: 'Discharge Ready' },
    { id: 'TRT-409', pet: 'Milo (British Shorthair, 3y)', parent: 'Meera Nambiar', ward: 'Feline Day Ward Bed-03', daysAdmitted: 1, vet: 'Dr. Karthik Sundaram', protocol: 'Autologous Serum Eye Drops & Terramycin Ointment', meds: 'Ciprofloxacin Eye Drops, Buprenorphine, L-Lysine', vitals: 'HR: 154, BP: 118/72, Temp: 38.4°C', recoveryProgress: '84%', status: 'Discharge Ready' },
    { id: 'TRT-410', pet: 'Zoe (Indie Rescue, 1y)', parent: 'Dr. Rajeshwari Swaminathan', ward: 'Observation Nursery Bed-08', daysAdmitted: 1, vet: 'Dr. Gaurav Sharma', protocol: 'Doxycycline Course for Subclinical Ehrlichia', meds: 'Doxycycline 10mg/kg, Hepato-supportive silymarin', vitals: 'HR: 102, BP: 120/76, Temp: 38.3°C', recoveryProgress: '96%', status: 'Discharge Ready' }
  ];

  const filtered = treatments.filter(t => {
    const matchesFilter = filter === 'ALL' || t.status === filter || t.ward.includes(filter);
    const matchesSearch = t.pet.toLowerCase().includes(search.toLowerCase()) ||
      t.parent.toLowerCase().includes(search.toLowerCase()) ||
      t.vet.toLowerCase().includes(search.toLowerCase()) ||
      t.protocol.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const cardStyle = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Veterinary Services"
      subcategory="Treatments"
      title="Inpatient Care, ICU & Chronic Treatment Regimens"
      subtitle="Ward bed occupancy, fluid therapy rates, surgical recovery milestones, chronic medical protocols, and discharge ready"
      icon="💊"
      badge="10 Active Inpatient Cases"
      actions={
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {['ALL', 'ICU', 'Recovery', 'Feline', 'Discharge Ready', 'Stable Recovery'].map(f => (
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
        <KpiCard label="Active Inpatients" value="26 Patients" delta="81.2% Cap" trend="up" subtext="6 ICU • 14 Post-Op • 6 Ward" icon="🏥" />
        <KpiCard label="Recovery Success" value="98.4%" delta="+1.2% MoM" trend="up" subtext="Discharge clinical pass" icon="🎯" />
        <KpiCard label="Avg Stay Duration" value="2.1 Days" delta="Target < 3d" trend="up" subtext="Optimized recovery cycles" icon="⏱️" />
        <KpiCard label="Discharge Ready" value="7 Patients" delta="Today" trend="up" subtext="Pending final discharge vitals" icon="🏡" />
      </div>

      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Inpatient Ward Management & Daily Clinical Progress</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Active therapy lines, intravenous fluids, vital signs monitoring, and attending physician notes</p>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search patient, ward, doctor, protocol..."
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
                <th style={{ padding: '10px 12px' }}>Patient & Case</th>
                <th style={{ padding: '10px 12px' }}>Ward & Bed</th>
                <th style={{ padding: '10px 12px' }}>Primary Veterinarian</th>
                <th style={{ padding: '10px 12px' }}>Clinical Treatment Protocol</th>
                <th style={{ padding: '10px 12px' }}>Medication & Infusion</th>
                <th style={{ padding: '10px 12px' }}>Vitals & Parameters</th>
                <th style={{ padding: '10px 12px' }}>Recovery Progress</th>
                <th style={{ padding: '10px 12px', textAlign: 'center' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(t => (
                <tr key={t.id} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '12px' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{t.pet}</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>{t.id} • {t.parent}</div>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600,
                      background: t.ward.includes('ICU') ? 'rgba(239,68,68,0.12)' : t.ward.includes('Orthopedic') ? 'rgba(37,99,235,0.12)' : '#f8fafc',
                      color: t.ward.includes('ICU') ? '#b91c1c' : t.ward.includes('Orthopedic') ? '#1d4ed8' : '#334155'
                    }}>
                      {t.ward}
                    </span>
                    <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>Day {t.daysAdmitted} of stay</div>
                  </td>
                  <td style={{ padding: '12px', fontWeight: 600, color: '#059669' }}>{t.vet}</td>
                  <td style={{ padding: '12px', fontWeight: 600 }}>{t.protocol}</td>
                  <td style={{ padding: '12px', color: '#475569', fontSize: '11px' }}>{t.meds}</td>
                  <td style={{ padding: '12px', color: '#0f172a', fontWeight: 500, fontSize: '11px', fontFamily: '"IBM Plex Mono", monospace' }}>{t.vitals}</td>
                  <td style={{ padding: '12px', minWidth: '120px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>
                      <span>{t.recoveryProgress}</span>
                    </div>
                    <div style={{ height: '6px', width: '100%', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: t.recoveryProgress, background: parseInt(t.recoveryProgress) > 85 ? '#059669' : '#2563eb', borderRadius: '999px' }} />
                    </div>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <span style={{
                      padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600,
                      background: t.status === 'Discharge Ready' ? 'rgba(16,185,129,0.12)' : t.status === 'Stable Recovery' ? 'rgba(37,99,235,0.12)' : 'rgba(245,158,11,0.12)',
                      color: t.status === 'Discharge Ready' ? '#047857' : t.status === 'Stable Recovery' ? '#1d4ed8' : '#b45309'
                    }}>
                      {t.status}
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