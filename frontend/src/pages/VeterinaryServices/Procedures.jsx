import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Procedures() {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const procedures = [
    { id: 'SRG-801', patient: 'Bruno (Golden Retriever, 4y)', parent: 'Aditya Vikram Birla', procedureName: 'Tibial Plateau Leveling Osteotomy (TPLO)', theater: 'Sterile OT-1 (Orthopedic)', leadSurgeon: 'Dr. Rajeshwari Swaminathan', anesthetist: 'Dr. Vikramaditya Rathore', duration: '95 mins', recoveryStatus: 'Extubated, Sternal Recumbency', anesthesiaType: 'Isoflurane + Epidural Bupivacaine', status: 'Completed' },
    { id: 'SRG-802', patient: 'Max (German Shepherd, 6y)', parent: 'Rohan Deshmukh', procedureName: 'Emergency Laparotomy & Incisional Gastropexy', theater: 'Emergency Surgical Suite-2', leadSurgeon: 'Dr. Vikramaditya Rathore', anesthetist: 'Dr. Sneha Nair', duration: '120 mins', recoveryStatus: 'PACU Monitored, ICU Transferred', anesthesiaType: 'Sevoflurane + Fentanyl CRI', status: 'Completed' },
    { id: 'SRG-803', patient: 'Rocky (Rottweiler, 4y)', parent: 'Tarun Mathur', procedureName: 'Hemilaminectomy Spinal Decompression (T13-L1)', theater: 'Sterile OT-1 (Neuro)', leadSurgeon: 'Dr. Anirudh Sen', anesthetist: 'Dr. Gaurav Sharma', duration: '140 mins', recoveryStatus: 'Stable, Deep Pain Sensation Intact', anesthesiaType: 'Isoflurane + Ketamine CRI', status: 'Completed' },
    { id: 'SRG-804', patient: 'Simba (Persian Cat, 2y)', parent: 'Pooja Singhania', procedureName: 'Cystotomy for Bladder Urolith Removal', theater: 'Sterile OT-3 (Soft Tissue)', leadSurgeon: 'Dr. Sneha Nair', anesthetist: 'Dr. Divya Reddy', duration: '55 mins', recoveryStatus: 'Awake, Catheter Flushed Clear', anesthesiaType: 'Propofol Induction + Isoflurane', status: 'Completed' },
    { id: 'SRG-805', patient: 'Bella (Labrador Retriever, 3y)', parent: 'Sneha Kulkarni', procedureName: 'Laparoscopic Preventive Gastropexy & Ovariohysterectomy', theater: 'Laparoscopic Minimally Invasive OT', leadSurgeon: 'Dr. Anirudh Sen', anesthetist: 'Dr. Vikramaditya Rathore', duration: '60 mins', recoveryStatus: 'Ambulatory, Incisions Sealed', anesthesiaType: 'Sevoflurane + Local Bupivacaine', status: 'Completed' },
    { id: 'SRG-806', patient: 'Oskar (Siberian Husky, 2.5y)', parent: 'Vikram Merchant', procedureName: 'Wide Local Excision of Pinna Mass & Flap', theater: 'Sterile OT-3 (Soft Tissue)', leadSurgeon: 'Dr. Rohan Kulkarni', anesthetist: 'Dr. Pooja Mehta', duration: '45 mins', recoveryStatus: 'Extubated, Elizabethan Collar On', anesthesiaType: 'Isoflurane Inhalation', status: 'Completed' },
    { id: 'SRG-807', patient: 'Coco (Beagle, 5y)', parent: 'Ananya Sen', procedureName: 'Ultrasonic Dental Scaling & Polishing (Grade 2)', theater: 'Dental & Minor OT Suite', leadSurgeon: 'Dr. Pooja Mehta', anesthetist: 'Dr. Siddharth Verma', duration: '40 mins', recoveryStatus: 'Full Recovery, Gingival Sulcus Probed', anesthesiaType: 'Cuffed Endotracheal + Isoflurane', status: 'Completed' },
    { id: 'SRG-808', patient: 'Leo (Shih Tzu, 1.5y)', parent: 'Kunal Kapoor', procedureName: 'Upper Gastrointestinal Video Endoscopy & Foreign Body Removal', theater: 'Endoscopy Intervention Suite', leadSurgeon: 'Dr. Maya Chandran', anesthetist: 'Dr. Gaurav Sharma', duration: '35 mins', recoveryStatus: 'Foreign Body Retrieved, Mucosa Intact', anesthesiaType: 'Propofol Infusion TIVA', status: 'Completed' },
    { id: 'SRG-809', patient: 'Milo (British Shorthair, 3y)', parent: 'Meera Nambiar', procedureName: 'Corneal Grid Keratotomy & Third Eyelid Flap', theater: 'Ophthalmic Microsurgery OT', leadSurgeon: 'Dr. Karthik Sundaram', anesthetist: 'Dr. Sneha Nair', duration: '50 mins', recoveryStatus: 'Flap Sutured with 8-0 Vicryl', anesthesiaType: 'Isoflurane + Topical Tetracaine', status: 'Completed' },
    { id: 'SRG-810', patient: 'Zoe (Indie Rescue, 1y)', parent: 'Dr. Rajeshwari Swaminathan', procedureName: 'Pediatric Ovariohysterectomy (Spay)', theater: 'Sterile OT-3 (Soft Tissue)', leadSurgeon: 'Dr. Gaurav Sharma', anesthetist: 'Dr. Divya Reddy', duration: '30 mins', recoveryStatus: 'Active, Pain Score 0/4', anesthesiaType: 'Isoflurane + Meloxicam Pre-emptive', status: 'Completed' }
  ];

  const filtered = procedures.filter(p => {
    const matchesFilter = filter === 'ALL' || p.theater.includes(filter) || p.status === filter;
    const matchesSearch = p.patient.toLowerCase().includes(search.toLowerCase()) ||
      p.parent.toLowerCase().includes(search.toLowerCase()) ||
      p.procedureName.toLowerCase().includes(search.toLowerCase()) ||
      p.leadSurgeon.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const cardStyle = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Veterinary Services"
      subcategory="Procedures"
      title="Surgical Operations & Sterile Theater Suite"
      subtitle="Sterile OT occupancy, orthopedic/soft tissue surgeries, inhalation anesthesia logs, and recovery PACU"
      icon="✂️"
      badge="10 Surgeries Logged Today"
      actions={
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {['ALL', 'Orthopedic', 'Emergency', 'Soft Tissue', 'Neuro', 'Dental', 'Completed'].map(f => (
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
        <KpiCard label="Surgeries Today" value="14 Surgeries" delta="+2 over plan" trend="up" subtext="6 sterile theaters active" icon="✂️" />
        <KpiCard label="OT Utilization" value="88.4%" delta="Peak capacity" trend="up" subtext="Zero sterile theater idle gap" icon="🏥" />
        <KpiCard label="Anesthesia Safety" value="99.98%" delta="Multi-parameter" trend="up" subtext="Capnography & ECG logging" icon="🫁" />
        <KpiCard label="Infection Rate" value="0.00%" delta="Zero SSI" trend="up" subtext="Strict laminar airflow pass" icon="🛡️" />
      </div>

      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Live Surgical Theater Manifest & Operation Log</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Sterile theater assignments, procedure duration, lead surgeon, and anesthesia protocols</p>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search surgery, surgeon, theater, pet..."
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
                <th style={{ padding: '10px 12px' }}>Surgical ID</th>
                <th style={{ padding: '10px 12px' }}>Patient & Client</th>
                <th style={{ padding: '10px 12px' }}>Procedure Details</th>
                <th style={{ padding: '10px 12px' }}>Theater</th>
                <th style={{ padding: '10px 12px' }}>Surgical Team</th>
                <th style={{ padding: '10px 12px' }}>Duration</th>
                <th style={{ padding: '10px 12px' }}>Anesthesia & Post-Op Recovery</th>
                <th style={{ padding: '10px 12px', textAlign: 'center' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '12px', fontWeight: 600, color: '#059669', fontFamily: '"IBM Plex Mono", monospace' }}>{p.id}</td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{p.patient}</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>{p.parent}</div>
                  </td>
                  <td style={{ padding: '12px', fontWeight: 600 }}>{p.procedureName}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600,
                      background: p.theater.includes('Orthopedic') ? 'rgba(37,99,235,0.1)' : p.theater.includes('Dental') ? 'rgba(16,185,129,0.1)' : 'rgba(168,85,247,0.1)',
                      color: p.theater.includes('Orthopedic') ? '#1d4ed8' : p.theater.includes('Dental') ? '#047857' : '#7e22ce'
                    }}>
                      {p.theater}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ fontWeight: 600, color: '#059669' }}>{p.leadSurgeon}</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>Anesth: {p.anesthetist}</div>
                  </td>
                  <td style={{ padding: '12px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600, color: '#475569' }}>{p.duration}</td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ fontWeight: 500, color: '#0f172a', fontSize: '11px' }}>{p.recoveryStatus}</div>
                    <div style={{ fontSize: '10px', color: '#64748b' }}>{p.anesthesiaType}</div>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <span style={{
                      padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600,
                      background: 'rgba(16,185,129,0.12)', color: '#047857'
                    }}>
                      {p.status}
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