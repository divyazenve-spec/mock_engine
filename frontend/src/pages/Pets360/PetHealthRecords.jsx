import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function PetHealthRecords() {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const records = [
    { id: 'EHR-8801', date: '10 Oct 2026', pet: 'Max (Golden Retriever)', type: 'Annual Wellness & ECG', vitals: 'Temp: 38.6°C • HR: 88 bpm • Wt: 32.4 kg', diagnosis: 'Comprehensive Wellness Clearance', notes: 'Cardiac ECG shows normal sinus rhythm; dentition Grade 0; clear corneas.', vet: 'Dr. Tanya S.', status: 'Resolved' },
    { id: 'EHR-8802', date: '08 Oct 2026', pet: 'Bella (Persian Cat)', type: 'Renal Biomarker Screening', vitals: 'Temp: 38.2°C • HR: 140 bpm • Wt: 4.1 kg', diagnosis: 'Feline Renal SDMA Normal Screening', notes: 'Creatinine 1.2 mg/dL, SDMA 9 ug/dL (Well below reference threshold of 14).', vet: 'Dr. Vikram Rao', status: 'Resolved' },
    { id: 'EHR-8803', date: '05 Oct 2026', pet: 'Coco (Shih Tzu)', type: 'Dermatology Cytology Exam', vitals: 'Temp: 38.4°C • HR: 110 bpm • Wt: 6.2 kg', diagnosis: 'Mild Atopic Allergic Pruritus', notes: 'Tape strip cytology confirmed zero yeast; prescribed hypoallergenic chlorhexidine rinse.', vet: 'Dr. Ananya Roy', status: 'Under Regimen' },
    { id: 'EHR-8804', date: '01 Oct 2026', pet: 'Rocky (German Shepherd)', type: 'Orthopedic Digital Radiography', vitals: 'Temp: 38.5°C • HR: 76 bpm • Wt: 38.6 kg', diagnosis: 'Post-TPLO 12-Month Osseous Consolidation', notes: 'Digital X-ray confirms 100% cortical bridging; full weight bearing on hindlimb.', vet: 'Dr. Rajesh Patel', status: 'Resolved' },
    { id: 'EHR-8805', date: '28 Sep 2026', pet: 'Milo (Beagle)', type: 'Metabolic & Thyroid Evaluation', vitals: 'Temp: 38.7°C • HR: 92 bpm • Wt: 14.2 kg', diagnosis: 'Canine Dietary Obesity - In Remission', notes: 'Loss of 1.2 kg achieved via portion control; fasting triglycerides normalized.', vet: 'Dr. Priya Desai', status: 'Under Regimen' },
    { id: 'EHR-8806', date: '25 Sep 2026', pet: 'Leo (Labrador Retriever)', type: 'Senior Wellness & Ultrasound', vitals: 'Temp: 38.3°C • HR: 80 bpm • Wt: 34.8 kg', diagnosis: 'Age-Appropriate Hepatosplenic Scan', notes: 'Abdominal ultrasound shows homogenous liver & spleen parenchyma; no cystic lesions.', vet: 'Dr. Tanya S.', status: 'Resolved' },
    { id: 'EHR-8807', date: '22 Sep 2026', pet: 'Luna (Siberian Husky)', type: 'Dermal Barrier Follow-up', vitals: 'Temp: 38.5°C • HR: 84 bpm • Wt: 21.5 kg', diagnosis: 'Seasonal Humidity Erythema Resolved', notes: 'Skin lesion completely epithelized; full hair regrowth noted on ventral abdomen.', vet: 'Dr. Ananya Roy', status: 'Resolved' },
    { id: 'EHR-8808', date: '18 Sep 2026', pet: 'Simba (Indie Hound)', type: 'Juvenile Vitality & Microchipping', vitals: 'Temp: 38.4°C • HR: 96 bpm • Wt: 18.2 kg', diagnosis: 'Juvenile Health Passport Certification', notes: 'ISO 11784 RFID transponder implanted in left interscapular space; verified with scanner.', vet: 'Dr. Tanya S.', status: 'Resolved' },
    { id: 'EHR-8809', date: '14 Sep 2026', pet: 'Oreo (French Bulldog)', type: 'Upper Airway BOAS Assessment', vitals: 'Temp: 38.8°C • HR: 104 bpm • Wt: 11.8 kg', diagnosis: 'BOAS Grade 1 (Stable Non-Surgical)', notes: 'Pharyngeal airway unobstructed; heat tolerance testing passed with 15-min trot.', vet: 'Dr. Rajesh Patel', status: 'Chronic Monitoring' },
    { id: 'EHR-8810', date: '10 Sep 2026', pet: 'Bruno (Rottweiler)', type: 'Cardiology Echo & Holter Screen', vitals: 'Temp: 38.5°C • HR: 72 bpm • Wt: 46.2 kg', diagnosis: 'Cardiovascular Clearance Screening', notes: 'Left ventricular fractional shortening 36% (Normal: 28-40%); zero premature contractions.', vet: 'Dr. Rajesh Patel', status: 'Resolved' }
  ];

  const filtered = records.filter(r => {
    const matchesFilter = filter === 'ALL' || r.status === filter || r.type.includes(filter);
    const matchesSearch = r.pet.toLowerCase().includes(search.toLowerCase()) ||
      r.diagnosis.toLowerCase().includes(search.toLowerCase()) ||
      r.vet.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <DashboardLayout
      category="Pets 360°"
      subcategory="Pet Health Records"
      title="Electronic Health Records (EHR) & Clinical Timeline"
      subtitle="Longitudinal medical history, physical examination findings, vital signs trends, and clinical diagnosis logs"
      icon="🐾"
      badge="10 Clinical Encounters"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          {['ALL', 'Resolved', 'Under Regimen', 'Post-Op Rehab', 'Chronic Monitoring'].map(f => (
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
        <KpiCard label="Total Medical Records" value="10" delta="+100%" trend="up" subtext="All time logged" icon="📋" />
        <KpiCard label="Records Added This Month" value="10" delta="100% active" trend="up" subtext="Current period" icon="📅" />
        <KpiCard label="Active Chronic Regimens" value="3" delta="Monitored" trend="neutral" subtext="Renal, cardio, endocrine" icon="💊" />
        <KpiCard label="Vital Signs Compliance" value="100.0%" delta="Standard" trend="up" subtext="Temp, HR, Wt recorded" icon="🩺" />
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
            placeholder="Search health records by pet, diagnosis, doctor, or record ID..."
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
          Showing <b>{filtered.length}</b> clinical records
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
              <th style={{ padding: '12px 16px' }}>Record ID & Date</th>
              <th style={{ padding: '12px 16px' }}>Pet Patient</th>
              <th style={{ padding: '12px 16px' }}>Clinical Encounter Type</th>
              <th style={{ padding: '12px 16px' }}>Recorded Vitals</th>
              <th style={{ padding: '12px 16px' }}>Diagnosis</th>
              <th style={{ padding: '12px 16px' }}>Attending Vet</th>
              <th style={{ padding: '12px 16px' }}>Outcome Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, idx) => (
              <tr key={r.id} style={{ borderBottom: idx !== filtered.length - 1 ? '1px solid #f1f5f9' : 'none', transition: 'background 0.1s' }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = '#ffffff'}>
                <td style={{ padding: '12px 16px', fontWeight: 600 }}>
                  <div style={{ fontFamily: 'monospace', color: '#2563eb' }}>{r.id}</div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{r.date}</div>
                </td>
                <td style={{ padding: '12px 16px', fontWeight: 700, color: '#0f172a' }}>
                  {r.pet}
                </td>
                <td style={{ padding: '12px 16px', color: '#334155' }}>
                  {r.type}
                </td>
                <td style={{ padding: '12px 16px', fontFamily: 'monospace', fontSize: '11px', color: '#475569' }}>
                  {r.vitals}
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ fontWeight: 600, color: '#0f172a' }}>{r.diagnosis}</div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{r.notes}</div>
                </td>
                <td style={{ padding: '12px 16px', color: '#2563eb', fontWeight: 600 }}>
                  {r.vet}
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '3px 8px',
                    borderRadius: '999px',
                    fontSize: '11px',
                    fontWeight: 600,
                    background: r.status === 'Resolved' || r.status === 'Fully Recovered' ? '#ecfdf5' : '#eff6ff',
                    color: r.status === 'Resolved' || r.status === 'Fully Recovered' ? '#059669' : '#1d4ed8'
                  }}>
                    {r.status}
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
