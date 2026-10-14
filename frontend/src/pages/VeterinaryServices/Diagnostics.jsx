import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Diagnostics() {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const diagnostics = [
    { id: 'DX-2026-301', pet: 'Bruno (Golden Retriever, 4y)', parent: 'Aditya Vikram Birla', testName: 'Digital Radiography (Stifle Joint AP/Lateral)', modality: 'Digital X-Ray', orderedBy: 'Dr. Rajeshwari Swaminathan', turnaroundTime: '15 mins', flag: 'Cruciate Rupture & Joint Effusion', status: 'Report Signed' },
    { id: 'DX-2026-302', pet: 'Simba (Persian Cat, 2y)', parent: 'Pooja Singhania', testName: 'Abdominal Color Ultrasound (Doppler)', modality: 'Ultrasound', orderedBy: 'Dr. Sneha Nair', turnaroundTime: '24 mins', flag: 'Cystic Calculi (Struvite) 4mm', status: 'Report Signed' },
    { id: 'DX-2026-303', pet: 'Max (German Shepherd, 6y)', parent: 'Rohan Deshmukh', testName: 'Emergency Pre-Op Blood Gas & Lactate Panel', modality: 'Biochemistry', orderedBy: 'Dr. Vikramaditya Rathore', turnaroundTime: '8 mins', flag: 'Lactate 6.2 mmol/L (Severe Hypoperfusion)', status: 'Report Signed' },
    { id: 'DX-2026-304', pet: 'Bella (Labrador Retriever, 3y)', parent: 'Sneha Kulkarni', testName: 'Skin Cytology & Deep Scrape Microscopy', modality: 'Pathology', orderedBy: 'Dr. Divya Reddy', turnaroundTime: '20 mins', flag: 'Malassezia pachydermatis > 15/HPF', status: 'Report Signed' },
    { id: 'DX-2026-305', pet: 'Coco (Beagle, 5y)', parent: 'Ananya Sen', testName: 'Echocardiogram 2D & M-Mode (Cardiac Index)', modality: 'Ultrasound', orderedBy: 'Dr. Siddharth Verma', turnaroundTime: '30 mins', flag: 'Left Atrium to Aorta Ratio 1.8 (Mild Enlarge)', status: 'Report Signed' },
    { id: 'DX-2026-306', pet: 'Leo (Shih Tzu, 1.5y)', parent: 'Kunal Kapoor', testName: 'Canine Parvovirus & Giardia Rapid Antigen PCR', modality: 'Rapid PCR', orderedBy: 'Dr. Maya Chandran', turnaroundTime: '12 mins', flag: 'CPV Negative / Giardia Positive', status: 'Report Signed' },
    { id: 'DX-2026-307', pet: 'Rocky (Rottweiler, 4y)', parent: 'Tarun Mathur', testName: 'High-Field MRI (Thoracolumbar Spine T10-L3)', modality: 'MRI Scan', orderedBy: 'Dr. Anirudh Sen', turnaroundTime: '45 mins', flag: 'T13-L1 Extruded Disc Herniation (Grade 3)', status: 'Report Signed' },
    { id: 'DX-2026-308', pet: 'Oskar (Siberian Husky, 2.5y)', parent: 'Vikram Merchant', testName: 'Fine Needle Aspiration (FNA) Histopathology', modality: 'Pathology', orderedBy: 'Dr. Rohan Kulkarni', turnaroundTime: '36 mins', flag: 'Benign Canine Cutaneous Histiocytoma', status: 'Report Signed' },
    { id: 'DX-2026-309', pet: 'Milo (British Shorthair, 3y)', parent: 'Meera Nambiar', testName: 'Fluorescein Corneal Stain & Intraocular Pressure', modality: 'Ophthalmology', orderedBy: 'Dr. Karthik Sundaram', turnaroundTime: '10 mins', flag: 'Superficial Dendritic Ulcer Positive', status: 'Report Signed' },
    { id: 'DX-2026-310', pet: 'Zoe (Indie Rescue, 1y)', parent: 'Dr. Rajeshwari Swaminathan', testName: 'Complete Blood Count (CBC) & 4Dx Plus ELISA', modality: 'Hematology', orderedBy: 'Dr. Gaurav Sharma', turnaroundTime: '18 mins', flag: 'Mild Thrombocytopenia / Ehrlichia Ab+', status: 'Report Signed' }
  ];

  const filtered = diagnostics.filter(l => {
    const matchesFilter = filter === 'ALL' || l.modality === filter;
    const matchesSearch = l.pet.toLowerCase().includes(search.toLowerCase()) ||
      l.parent.toLowerCase().includes(search.toLowerCase()) ||
      l.testName.toLowerCase().includes(search.toLowerCase()) ||
      l.flag.toLowerCase().includes(search.toLowerCase()) ||
      l.id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const cardStyle = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Veterinary Services"
      subcategory="Diagnostics"
      title="Clinical Pathology, In-House Lab & Advanced Imaging"
      subtitle="Hematology CBC, dry biochemistry panels, digital X-Ray DR, ultrasound Doppler, and rapid PCR panels"
      icon="🔬"
      badge="10 Diagnostic Orders Completed"
      actions={
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {['ALL', 'Digital X-Ray', 'Ultrasound', 'Biochemistry', 'Pathology', 'Rapid PCR'].map(f => (
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
        <KpiCard label="Tests Processed MTD" value="1,420 Tests" delta="+16.8% YoY" trend="up" subtext="In-house lab analyzers" icon="🔬" />
        <KpiCard label="Avg Turnaround Time" value="21.5 Mins" delta="Fast Triage" trend="up" subtext="Point-of-care biochemistry" icon="⏱️" />
        <KpiCard label="Critical Lab Alerts" value="18 Cases" delta="Escalated" trend="up" subtext="Direct doctor notification" icon="⚠️" />
        <KpiCard label="Digital Imaging Usage" value="98.2%" delta="PACS Synced" trend="up" subtext="Direct DICOM cloud archive" icon="🩻" />
      </div>

      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Live Clinical Lab Pipeline & Imaging Orders</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Hematology analyzers, dry chemistry rotors, radiography, and pathologist validations</p>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search pet, test, doctor or findings..."
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
                <th style={{ padding: '10px 12px' }}>Order ID</th>
                <th style={{ padding: '10px 12px' }}>Patient & Client</th>
                <th style={{ padding: '10px 12px' }}>Investigation / Panel</th>
                <th style={{ padding: '10px 12px' }}>Modality</th>
                <th style={{ padding: '10px 12px' }}>Referring Clinician</th>
                <th style={{ padding: '10px 12px' }}>Turnaround</th>
                <th style={{ padding: '10px 12px' }}>Key Finding / Flag</th>
                <th style={{ padding: '10px 12px', textAlign: 'center' }}>Report Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(l => (
                <tr key={l.id} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '12px', fontWeight: 600, color: '#059669', fontFamily: '"IBM Plex Mono", monospace' }}>{l.id}</td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{l.pet}</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>{l.parent}</div>
                  </td>
                  <td style={{ padding: '12px', fontWeight: 600 }}>{l.testName}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600,
                      background: l.modality === 'Biochemistry' ? 'rgba(16,185,129,0.1)' : l.modality === 'Digital X-Ray' ? 'rgba(37,99,235,0.1)' : 'rgba(168,85,247,0.1)',
                      color: l.modality === 'Biochemistry' ? '#047857' : l.modality === 'Digital X-Ray' ? '#1d4ed8' : '#7e22ce'
                    }}>
                      {l.modality}
                    </span>
                  </td>
                  <td style={{ padding: '12px', color: '#334155', fontWeight: 500 }}>{l.orderedBy}</td>
                  <td style={{ padding: '12px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600, color: '#475569' }}>{l.turnaroundTime}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600,
                      background: l.flag.includes('Severe') || l.flag.includes('Herniation') || l.flag.includes('Rupture') ? 'rgba(239,68,68,0.12)' : '#f1f5f9',
                      color: l.flag.includes('Severe') || l.flag.includes('Herniation') || l.flag.includes('Rupture') ? '#b91c1c' : '#334155'
                    }}>
                      {l.flag}
                    </span>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <span style={{
                      padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600,
                      background: 'rgba(16,185,129,0.12)', color: '#047857'
                    }}>
                      {l.status}
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