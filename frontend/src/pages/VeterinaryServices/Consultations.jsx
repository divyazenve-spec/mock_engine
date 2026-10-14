import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Consultations() {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const consultations = [
    { id: 'CNS-2026-081', pet: 'Bruno (Golden Retriever, 4y)', parent: 'Aditya Vikram Birla', doctor: 'Dr. Rajeshwari Swaminathan', specialty: 'Orthopedics', mode: 'In-Clinic', diagnosis: 'Cranial Cruciate Ligament (CCL) Rupture', complaint: 'Acute right hindlimb lameness after park run', fee: '₹1,500', status: 'Completed' },
    { id: 'CNS-2026-082', pet: 'Simba (Persian Cat, 2y)', parent: 'Pooja Singhania', doctor: 'Dr. Sneha Nair', specialty: 'Feline Medicine', mode: 'In-Clinic', diagnosis: 'Feline Lower Urinary Tract Disease (FLUTD)', complaint: 'Dysuria, hematuria & frequent litter box visits', fee: '₹1,200', status: 'Completed' },
    { id: 'CNS-2026-083', pet: 'Max (German Shepherd, 6y)', parent: 'Rohan Deshmukh', doctor: 'Dr. Vikramaditya Rathore', specialty: 'Critical Care', mode: 'In-Clinic', diagnosis: 'Gastric Dilatation-Volvulus (GDV) Triage', complaint: 'Non-productive retching, abdominal distension', fee: '₹2,500', status: 'Under Observation' },
    { id: 'CNS-2026-084', pet: 'Bella (Labrador Retriever, 3y)', parent: 'Sneha Kulkarni', doctor: 'Dr. Divya Reddy', specialty: 'Dermatology', mode: 'Video Telehealth', diagnosis: 'Atopic Dermatitis & Malassezia Pododermatitis', complaint: 'Chronic paw licking & erythematous lesions', fee: '₹850', status: 'Completed' },
    { id: 'CNS-2026-085', pet: 'Leo (Shih Tzu, 1.5y)', parent: 'Kunal Kapoor', doctor: 'Dr. Maya Chandran', specialty: 'Internal Medicine', mode: 'In-Clinic', diagnosis: 'Acute Hemorrhagic Gastroenteritis', complaint: 'Sudden onset vomiting & bloody diarrhea', fee: '₹1,400', status: 'In Consultation' },
    { id: 'CNS-2026-086', pet: 'Coco (Beagle, 5y)', parent: 'Ananya Sen', doctor: 'Dr. Siddharth Verma', specialty: 'Cardiology', mode: 'In-Clinic', diagnosis: 'Mitral Valve Disease (Stage B1 Murmur)', complaint: 'Mild exercise intolerance & nighttime dry cough', fee: '₹1,800', status: 'Completed' },
    { id: 'CNS-2026-087', pet: 'Rocky (Rottweiler, 4y)', parent: 'Tarun Mathur', doctor: 'Dr. Anirudh Sen', specialty: 'Neurology', mode: 'In-Clinic', diagnosis: 'Thoracolumbar Intervertebral Disc Disease (IVDD)', complaint: 'Spinal pain, kyphosis & hindlimb ataxia', fee: '₹2,000', status: 'Completed' },
    { id: 'CNS-2026-088', pet: 'Milo (British Shorthair, 3y)', parent: 'Meera Nambiar', doctor: 'Dr. Sneha Nair', specialty: 'Ophthalmology', mode: 'Home Visit', diagnosis: 'Corneal Ulceration & Herpesvirus Keratitis', complaint: 'Blepharospasm, epiphora & conjunctival hyperemia', fee: '₹1,800', status: 'Completed' },
    { id: 'CNS-2026-089', pet: 'Oskar (Siberian Husky, 2.5y)', parent: 'Vikram Merchant', doctor: 'Dr. Rohan Kulkarni', specialty: 'Oncology', mode: 'Video Telehealth', diagnosis: 'Cutaneous Histiocytoma (Benign)', complaint: 'Rapidly growing button-like lesion on left ear pinna', fee: '₹850', status: 'Completed' },
    { id: 'CNS-2026-090', pet: 'Zoe (Indie Rescue, 1y)', parent: 'Dr. Rajeshwari Swaminathan', doctor: 'Dr. Gaurav Sharma', specialty: 'Preventive Care', mode: 'In-Clinic', diagnosis: 'Post-Adoption Wellness & Tick Fever Screening', complaint: 'Routine blood panel, microchipping & deworming', fee: '₹1,000', status: 'Completed' }
  ];

  const filtered = consultations.filter(c => {
    const matchesFilter = filter === 'ALL' || c.mode === filter || c.status === filter;
    const matchesSearch = c.pet.toLowerCase().includes(search.toLowerCase()) ||
      c.parent.toLowerCase().includes(search.toLowerCase()) ||
      c.doctor.toLowerCase().includes(search.toLowerCase()) ||
      c.diagnosis.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const cardStyle = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Veterinary Services"
      subcategory="Consultations"
      title="Clinical Consultations & Patient Triage"
      subtitle="In-clinic visits, video telehealth consults, chief complaints, diagnostic triage, and attending veterinarian assignments"
      icon="🩺"
      badge="10 Encounters Logged Today"
      actions={
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {['ALL', 'In-Clinic', 'Video Telehealth', 'Home Visit', 'Completed', 'Under Observation'].map(f => (
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
        <KpiCard label="Consultations Today" value="58 Cases" delta="+14.2% YoY" trend="up" subtext="42 In-Clinic • 12 Video • 4 Home" icon="🩺" />
        <KpiCard label="Avg Duration" value="22.4 Mins" delta="Target 20m" trend="up" subtext="In-depth diagnostic triage" icon="⏱️" />
        <KpiCard label="Active Triage Queue" value="3 Patients" delta="Avg wait: 6 mins" trend="up" subtext="Zero critical backlog" icon="🏥" />
        <KpiCard label="Consultation CSAT" value="4.96 / 5" delta="+0.04 MoM" trend="up" subtext="Based on 482 verified ratings" icon="⭐" />
      </div>

      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Live Consultation Registry & Clinical Encounter Records</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Real-time medical stream of veterinary consults across all Zenve specialty clinic networks</p>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search pet, parent, doctor, diagnosis..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--border, #cbd5e1)', fontSize: '12px', background: '#f8fafc', color: '#0f172a', width: '260px' }}
            />
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #475569)' }}>
                <th style={{ padding: '10px 12px' }}>Encounter ID</th>
                <th style={{ padding: '10px 12px' }}>Pet & Companion</th>
                <th style={{ padding: '10px 12px' }}>Pet Parent</th>
                <th style={{ padding: '10px 12px' }}>Attending Vet</th>
                <th style={{ padding: '10px 12px' }}>Consult Mode</th>
                <th style={{ padding: '10px 12px' }}>Chief Complaint & Diagnosis</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Fee</th>
                <th style={{ padding: '10px 12px', textAlign: 'center' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '12px', fontWeight: 600, color: '#059669', fontFamily: '"IBM Plex Mono", monospace' }}>{c.id}</td>
                  <td style={{ padding: '12px', fontWeight: 700 }}>{c.pet}</td>
                  <td style={{ padding: '12px', color: '#475569' }}>{c.parent}</td>
                  <td style={{ padding: '12px', fontWeight: 600 }}>{c.doctor} <span style={{ fontSize: '11px', color: '#64748b' }}>({c.specialty})</span></td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600,
                      background: c.mode === 'Video Telehealth' ? 'rgba(37,99,235,0.1)' : c.mode === 'Home Visit' ? 'rgba(168,85,247,0.1)' : 'rgba(5,150,105,0.1)',
                      color: c.mode === 'Video Telehealth' ? '#1d4ed8' : c.mode === 'Home Visit' ? '#7e22ce' : '#047857'
                    }}>
                      {c.mode === 'Video Telehealth' ? '📹 ' : c.mode === 'Home Visit' ? '🏡 ' : '🏥 '}{c.mode}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ fontWeight: 600, color: '#0f172a' }}>{c.diagnosis}</div>
                    <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{c.complaint}</div>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{c.fee}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <span style={{
                      padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600,
                      background: c.status === 'Completed' ? 'rgba(16,185,129,0.12)' : c.status === 'Under Observation' ? 'rgba(239,68,68,0.12)' : 'rgba(59,130,246,0.12)',
                      color: c.status === 'Completed' ? '#047857' : c.status === 'Under Observation' ? '#b91c1c' : '#1d4ed8'
                    }}>
                      {c.status}
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