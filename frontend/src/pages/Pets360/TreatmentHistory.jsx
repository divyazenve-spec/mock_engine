import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function TreatmentHistory() {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const treatments = [
    { id: 'TRT-701', pet: 'Max (Golden Retriever)', condition: 'Bilateral Hip Dysplasia (Grade 2)', procedure: 'Platelet-Rich Plasma (PRP) Injection + Hydrotherapy', duration: '4 Weeks', vet: 'Dr. Ramesh Rao', cost: '₹14,500', outcome: 'Resolved (Active Mobility)' },
    { id: 'TRT-702', pet: 'Bella (German Shepherd)', condition: 'Gastroenteritis & Dehydration', procedure: 'IV Fluids (Ringer Lactate) + Anti-emetic Protocol', duration: '24 Hours ICU', vet: 'Dr. Priya Nair', cost: '₹4,800', outcome: 'Discharged (Full Recovery)' },
    { id: 'TRT-703', pet: 'Coco (Shih Tzu)', condition: 'Canine Atopic Dermatitis', procedure: 'Cytopoint mAb Therapy + Medicated Chlorhexidine Baths', duration: '6 Weeks', vet: 'Dr. Ramesh Rao', cost: '₹8,200', outcome: 'Resolved (Zero Pruritus)' },
    { id: 'TRT-704', pet: 'Rocky (Beagle)', condition: 'Canine Infectious Tracheobronchitis', procedure: 'Nebulization + Doxycycline & Bronchodilators', duration: '10 Days', vet: 'Dr. Ananya Sen', cost: '₹3,500', outcome: 'Resolved (Cough Free)' },
    { id: 'TRT-705', pet: 'Milo (French Bulldog)', condition: 'Brachycephalic Airway Syndrome', procedure: 'Stenotic Nares Rhinoplasty & Soft Palate Resection', duration: '3 Days Inpatient', vet: 'Dr. Vikram Malhotra', cost: '₹28,000', outcome: 'Discharged (Normal Airway)' },
    { id: 'TRT-706', pet: 'Leo (Labrador)', condition: 'Cruciate Ligament Strain', procedure: 'Laser Therapy + NSAID Carprofen Protocol', duration: '3 Weeks Rehab', vet: 'Dr. Priya Nair', cost: '₹9,600', outcome: 'Rehab (Weight Reduced)' },
    { id: 'TRT-707', pet: 'Luna (Persian Cat)', condition: 'Feline Lower Urinary Tract Disease', procedure: 'Urinary Catheterization + Therapeutic Royal Canin S/O', duration: '48 Hours Stay', vet: 'Dr. Ananya Sen', cost: '₹6,400', outcome: 'Stable (Dietary Mgt)' },
    { id: 'TRT-708', pet: 'Simba (Indie / Desi Dog)', condition: 'Flea Allergy Dermatitis & Pyoderma', procedure: 'Simparica Trio + Cephalexin Oral Antibiotics', duration: '2 Weeks', vet: 'Dr. Ramesh Rao', cost: '₹2,900', outcome: 'Resolved (Coat Regrowth)' },
    { id: 'TRT-709', pet: 'Oreo (Pug)', condition: 'Corneal Ulcer (Right Eye)', procedure: 'Debridement + Ofloxacin & Hyaluronic Eye Drops', duration: '14 Days', vet: 'Dr. Vikram Malhotra', cost: '₹4,200', outcome: 'Resolved (Cornea Clear)' },
    { id: 'TRT-710', pet: 'Bruno (Rottweiler)', condition: 'Gastric Dilatation-Volvulus (GDV Risk)', procedure: 'Prophylactic Laparoscopic Gastropexy + Castration', duration: '36 Hours Inpatient', vet: 'Dr. Priya Nair', cost: '₹32,500', outcome: 'Recovery (Complete)' }
  ];

  const filtered = treatments.filter(t => {
    const matchesFilter = filter === 'ALL' || t.outcome.includes(filter);
    const matchesSearch = t.pet.toLowerCase().includes(search.toLowerCase()) ||
      t.condition.toLowerCase().includes(search.toLowerCase()) ||
      t.procedure.toLowerCase().includes(search.toLowerCase()) ||
      t.vet.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <DashboardLayout
      category="Pets 360°"
      subcategory="Treatment History"
      title="Inpatient Protocols, ICU & Surgical Recovery Logs"
      subtitle="Historical treatment regimens, emergency interventions, surgical procedures, and discharge outcome tracking"
      icon="🐾"
      badge="10 Recorded Episodes"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          {['ALL', 'Resolved', 'Discharged', 'Rehab', 'Stable', 'Recovery'].map(f => (
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
        <KpiCard label="Total Procedures Logged" value="10" delta="+100%" trend="up" subtext="Medical & surgical" icon="💊" />
        <KpiCard label="Average Recovery Rate" value="98.5%" delta="High success" trend="up" subtext="Discharged safely" icon="📈" />
        <KpiCard label="Avg Inpatient Stay" value="1.2 Days" delta="-20% vs benchmark" trend="up" subtext="Optimized recovery" icon="⏱️" />
        <KpiCard label="Surgical Success Rate" value="100%" delta="Zero sepsis" trend="up" subtext="Sterile theater suite" icon="🏥" />
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
            placeholder="Search treatment history by pet, medical condition, procedure, or clinician..."
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
          Showing <b>{filtered.length}</b> treatment episodes
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
              <th style={{ padding: '12px 16px' }}>Encounter & Date</th>
              <th style={{ padding: '12px 16px' }}>Pet Patient</th>
              <th style={{ padding: '12px 16px' }}>Medical Condition</th>
              <th style={{ padding: '12px 16px' }}>Procedure / Protocol Executed</th>
              <th style={{ padding: '12px 16px' }}>Care Duration</th>
              <th style={{ padding: '12px 16px' }}>Lead Clinician</th>
              <th style={{ padding: '12px 16px' }}>Total Cost</th>
              <th style={{ padding: '12px 16px' }}>Clinical Outcome</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t, idx) => (
              <tr key={t.id} style={{ borderBottom: idx !== filtered.length - 1 ? '1px solid #f1f5f9' : 'none', transition: 'background 0.1s' }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = '#ffffff'}>
                <td style={{ padding: '12px 16px', fontWeight: 600 }}>
                  <div style={{ fontFamily: 'monospace', color: '#2563eb' }}>{t.id}</div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{t.date}</div>
                </td>
                <td style={{ padding: '12px 16px', fontWeight: 700, color: '#0f172a' }}>
                  {t.pet}
                </td>
                <td style={{ padding: '12px 16px', fontWeight: 600, color: '#334155' }}>
                  {t.condition}
                </td>
                <td style={{ padding: '12px 16px', color: '#475569' }}>
                  {t.procedure}
                </td>
                <td style={{ padding: '12px 16px', color: '#64748b', fontSize: '12px' }}>
                  {t.duration}
                </td>
                <td style={{ padding: '12px 16px', color: '#2563eb', fontWeight: 600 }}>
                  {t.vet}
                </td>
                <td style={{ padding: '12px 16px', fontWeight: 700, color: '#0f172a', fontFamily: 'monospace' }}>
                  {t.cost}
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '3px 8px',
                    borderRadius: '999px',
                    fontSize: '11px',
                    fontWeight: 600,
                    background: t.outcome.includes('Resolved') || t.outcome.includes('Full Recovery') ? '#ecfdf5' : '#eff6ff',
                    color: t.outcome.includes('Resolved') || t.outcome.includes('Full Recovery') ? '#059669' : '#1d4ed8'
                  }}>
                    {t.outcome}
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
