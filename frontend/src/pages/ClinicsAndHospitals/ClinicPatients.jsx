import React, { useState, useMemo } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ClinicPatients() {
  const [wardFilter, setWardFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [toast, setToast] = useState('');

    const inpatientList = [
    { id: 'INP-8801', petName: 'Max', species: 'Labrador Retriever', weight: '32 kg', bed: 'ICU Pod-01', facility: 'Indiranagar Central Hospital', diagnosis: 'Post-TPLO Cruciate Stabilization Recovery', doctor: 'Dr. Rajeshwari Swaminathan', vitals: 'HR: 104 bpm | Temp: 38.6°C | SpO2: 98%', wardStatus: 'High Dependency', dischargeEta: 'Tomorrow, 04:00 PM' },
    { id: 'INP-8802', petName: 'Cleo', species: 'Siamese Cat', weight: '3.8 kg', bed: 'Feline Isolation Bay-2', facility: 'Bandra Trauma Centre', diagnosis: 'FLUTD De-obstruction & IV Diuresis', doctor: 'Dr. Pooja Mehta', vitals: 'HR: 160 bpm | Temp: 38.2°C | SpO2: 99%', wardStatus: 'High Dependency', dischargeEta: '16 Oct 2026' },
    { id: 'INP-8803', petName: 'Thor', species: 'Great Dane', weight: '54 kg', bed: 'ICU Large Ward-03', facility: 'DLF CyberCity Hospital', diagnosis: 'Post-GDV Gastropexy Continuous Telemetry', doctor: 'Dr. Vikramaditya Rathore', vitals: 'HR: 92 bpm | Temp: 38.5°C | SpO2: 97%', wardStatus: 'Critical ICU', dischargeEta: '17 Oct 2026' },
    { id: 'INP-8804', petName: 'Cookie', species: 'Cocker Spaniel', weight: '14 kg', bed: 'Step-Down Ward-05', facility: 'Jubilee Hills Center', diagnosis: 'Acute Hemorrhagic Gastroenteritis', doctor: 'Dr. Anirudh Sen', vitals: 'HR: 112 bpm | Temp: 38.8°C | SpO2: 98%', wardStatus: 'Stable Inpatient', dischargeEta: 'Today, 06:00 PM' },
    { id: 'INP-8805', petName: 'Shadow', species: 'Doberman Pinscher', weight: '36 kg', bed: 'Surgical Ward-02', facility: 'Indiranagar Central Hospital', diagnosis: 'External Skeletal Fixation Radius-Ulna', doctor: 'Dr. Maya Chandran', vitals: 'HR: 88 bpm | Temp: 38.4°C | SpO2: 99%', wardStatus: 'Discharge Ready', dischargeEta: 'Today, 02:30 PM' },
    { id: 'INP-8806', petName: 'Whiskey', species: 'Beagle', weight: '12 kg', bed: 'ICU Pod-02', facility: 'Koregaon Park Hospital', diagnosis: 'Parvoviral Enteritis & Septicemia Support', doctor: 'Dr. Rohan Kulkarni', vitals: 'HR: 128 bpm | Temp: 39.2°C | SpO2: 96%', wardStatus: 'Isolation Ward', dischargeEta: '18 Oct 2026' },
    { id: 'INP-8807', petName: 'Bella', species: 'Persian Cat', weight: '4.2 kg', bed: 'Daycare Suite-01', facility: 'Andheri Care Clinic', diagnosis: 'Full Mouth Dental Extractions & Fluid Therapy', doctor: 'Dr. Sneha Nair', vitals: 'HR: 155 bpm | Temp: 38.3°C | SpO2: 98%', wardStatus: 'Discharge Ready', dischargeEta: 'Today, 05:00 PM' },
    { id: 'INP-8808', petName: 'Tiger', species: 'Indie Dog', weight: '22 kg', bed: 'Trauma Bay-03', facility: 'Bandra Trauma Centre', diagnosis: 'Pelvic Fracture Post-RTA Stabilization', doctor: 'Dr. Vikramaditya Rathore', vitals: 'HR: 118 bpm | Temp: 38.1°C | SpO2: 95%', wardStatus: 'Critical ICU', dischargeEta: '19 Oct 2026' },
    { id: 'INP-8809', petName: 'Mia', species: 'Golden Retriever', weight: '29 kg', bed: 'Oncology Bay-01', facility: 'Indiranagar Central Hospital', diagnosis: 'Post-Mastectomy & Chemo Hydration Protocol', doctor: 'Dr. Rajeshwari Swaminathan', vitals: 'HR: 96 bpm | Temp: 38.7°C | SpO2: 99%', wardStatus: 'Stable Inpatient', dischargeEta: '16 Oct 2026' },
    { id: 'INP-8810', petName: 'Casper', species: 'Pomeranian', weight: '5.5 kg', bed: 'Cardiac Ward-02', facility: 'DLF CyberCity Hospital', diagnosis: 'CHF Acute Pulmonary Edema Diuresis', doctor: 'Dr. Gaurav Sharma', vitals: 'HR: 135 bpm | Temp: 38.4°C | SpO2: 94%', wardStatus: 'Critical ICU', dischargeEta: '17 Oct 2026' }
  ];

  const filtered = useMemo(() => {
    return inpatientList.filter(p => {
      const matchWard = wardFilter === 'ALL' || p.wardStatus === wardFilter;
      const matchSearch = search === '' ||
        p.id.toLowerCase().includes(search.toLowerCase()) ||
        p.petName.toLowerCase().includes(search.toLowerCase()) ||
        p.parent.toLowerCase().includes(search.toLowerCase()) ||
        p.diagnosis.toLowerCase().includes(search.toLowerCase());
      return matchWard && matchSearch;
    });
  }, [wardFilter, search]);

  function handleDischarge(petName) {
    setSelectedPatient(null);
    setToast(`Discharge Summary & Home Care Instructions generated for ${petName}!`);
    setTimeout(() => setToast(''), 3500);
  }

  return (
    <DashboardLayout
      category="Clinics & Hospitals"
      subcategory="Clinic Patients"
      title="Inpatient Ward Census & Patient Tracking"
      subtitle="24x7 hospital admissions, ICU critical care telemetry, recovery monitoring, and digital discharge summaries"
      icon="🐾"
      badge=""
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => alert('Exporting full Inpatient Census & Medication Administration Records (MAR)...')}
            style={{
              padding: '7px 14px',
              borderRadius: '8px',
              background: '#3b82f6',
              color: '#fff',
              border: 'none',
              fontWeight: 600,
              fontSize: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>📋</span> Export Inpatient MAR Records
          </button>
        </div>
      }
    >
      {toast && (
        <div style={{
          padding: '12px 16px',
          borderRadius: '8px',
          background: 'rgba(16,185,129,0.15)',
          border: '1px solid rgba(16,185,129,0.3)',
          color: '#10b981',
          fontSize: '13px',
          fontWeight: 600
        }}>
          ✓ {toast}
        </div>
      )}

            {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Admitted Inpatients" value="64 Pets" delta="82.5%" trend="up" subtext="Across 10 facilities" icon="🛏️" />
        <KpiCard label="Critical ICU Pods" value="18 Pets" delta="Continuous" trend="up" subtext="Continuous vitals telemetry" icon="💓" />
        <KpiCard label="Daily OPD Consults" value="485 Pets" delta="+14.6%" trend="up" subtext="Network OPD visits" icon="🐾" />
        <KpiCard label="Planned Discharges" value="14 Pets" delta="Post-Op Ready" trend="up" subtext="Post-op recovery cleared" icon="🏡" />
        <KpiCard label="Average Length of Stay" value="2.4 Days" delta="-0.3 days" trend="up" subtext="Rapid patient stabilization" icon="📅" />
        <KpiCard label="Hospital Infection Rate" value="0.08%" delta="-0.02%" trend="up" subtext="UV-C sterilized wards" icon="🛡️" />
      </div>

      {/* Patients Filter & Inpatient Census Table */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Active Hospitalized Patients (Inpatient Census)</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#94a3b8' }}>Live clinical status, vitals telemetry, attending doctor, and scheduled discharge</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search patient, parent, diagnosis..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.2)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '12px',
                width: '220px'
              }}
            />
            <div style={{ display: 'flex', gap: '4px' }}>
              {['ALL', 'Critical ICU', 'High Dependency', 'Stable Inpatient', 'Discharge Ready', 'Isolation Ward'].map(wf => (
                <button
                  key={wf}
                  onClick={() => setWardFilter(wf)}
                  style={{
                    padding: '5px 10px',
                    borderRadius: '6px',
                    border: 'none',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: wardFilter === wf ? 'rgba(59,130,246,0.25)' : 'rgba(255,255,255,0.05)',
                    color: wardFilter === wf ? '#60a5fa' : '#94a3b8'
                  }}
                >
                  {wf}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#94a3b8' }}>
                <th style={{ padding: '8px 12px' }}>Patient & Pet</th>
                <th style={{ padding: '8px 12px' }}>Facility & Bed</th>
                <th style={{ padding: '8px 12px' }}>Clinical Diagnosis</th>
                <th style={{ padding: '8px 12px' }}>Attending Doctor</th>
                <th style={{ padding: '8px 12px' }}>Live Vitals Telemetry</th>
                <th style={{ padding: '8px 12px' }}>Ward Status</th>
                <th style={{ padding: '8px 12px' }}>Discharge ETA</th>
                <th style={{ padding: '8px 12px', textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (<tr><td colSpan="8" style={{ textAlign: "center", padding: "32px", color: "var(--muted-foreground, #64748b)" }}>No patient records found</td></tr>) : filtered.map((pt, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '10px 12px' }}>
                    <div style={{ fontWeight: 600, color: '#fff' }}>{pt.petName}</div>
                    <div style={{ fontSize: '10px', color: '#38bdf8' }}>{pt.species} · {pt.weight}</div>
                    <div style={{ fontSize: '10px', color: '#64748b' }}>{pt.id}</div>
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <div style={{ fontWeight: 600, color: '#cbd5e1' }}>{pt.bed}</div>
                    <div style={{ fontSize: '10px', color: '#94a3b8' }}>{pt.facility}</div>
                  </td>
                  <td style={{ padding: '10px 12px', maxWidth: '200px' }}>
                    <div style={{ color: '#fff' }}>{pt.diagnosis}</div>
                  </td>
                  <td style={{ padding: '10px 12px', fontWeight: 600, color: '#cbd5e1' }}>
                    {pt.doctor}
                  </td>
                  <td style={{ padding: '10px 12px', fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', color: '#38bdf8' }}>
                    {pt.vitals}
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '99px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: pt.wardStatus === 'Critical ICU' ? 'rgba(239,68,68,0.15)' :
                        pt.wardStatus === 'Discharge Ready' ? 'rgba(16,185,129,0.15)' :
                        pt.wardStatus === 'Isolation Ward' ? 'rgba(245,158,11,0.15)' : 'rgba(59,130,246,0.15)',
                      color: pt.wardStatus === 'Critical ICU' ? '#f87171' :
                        pt.wardStatus === 'Discharge Ready' ? '#34d399' :
                        pt.wardStatus === 'Isolation Ward' ? '#fbbf24' : '#60a5fa'
                    }}>
                      {pt.wardStatus}
                    </span>
                  </td>
                  <td style={{ padding: '10px 12px', color: '#cbd5e1' }}>
                    {pt.dischargeEta}
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                    <button
                      onClick={() => setSelectedPatient(pt)}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        background: 'rgba(59,130,246,0.2)',
                        border: '1px solid rgba(59,130,246,0.4)',
                        color: '#60a5fa',
                        fontSize: '11px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Chart & Plan
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Patient Chart Modal */}
      {selectedPatient && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999
        }}>
          <div style={{
            background: '#1e293b',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            padding: '24px',
            width: '90%',
            maxWidth: '560px',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>
              <div>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>INPATIENT MEDICAL CHART</span>
                <h3 style={{ margin: '2px 0 0', fontSize: '18px', fontWeight: 700, color: '#38bdf8' }}>{selectedPatient.petName} ({selectedPatient.id})</h3>
              </div>
              <span style={{ padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, background: 'rgba(59,130,246,0.15)', color: '#60a5fa' }}>
                {selectedPatient.bed}
              </span>
            </div>

            <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
              <div style={{ padding: '10px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                <span style={{ color: '#94a3b8' }}>Pet Parent:</span> <strong>{selectedPatient.parent}</strong>
                <div style={{ marginTop: '4px', color: '#cbd5e1' }}>Species: {selectedPatient.species} · Weight: {selectedPatient.weight}</div>
              </div>
              <div style={{ padding: '10px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                <span style={{ color: '#94a3b8' }}>Diagnosis:</span>
                <div style={{ marginTop: '4px', fontWeight: 600, color: '#fff' }}>{selectedPatient.diagnosis}</div>
              </div>
              <div style={{ padding: '10px', background: 'rgba(6,182,212,0.1)', borderRadius: '8px', border: '1px solid rgba(6,182,212,0.25)', color: '#38bdf8' }}>
                <span>Real-Time Vitals:</span> <strong>{selectedPatient.vitals}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px' }}>
              <button
                onClick={() => setSelectedPatient(null)}
                style={{ padding: '8px 16px', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', cursor: 'pointer' }}
              >
                Close
              </button>
              <button
                onClick={() => handleDischarge(selectedPatient.petName)}
                style={{ padding: '8px 16px', borderRadius: '6px', background: '#10b981', border: 'none', color: '#fff', fontWeight: 600, cursor: 'pointer' }}
              >
                Generate Discharge Summary
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
