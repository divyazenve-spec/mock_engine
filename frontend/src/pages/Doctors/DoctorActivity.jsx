import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function DoctorActivity() {
  const liveActivities = [
    { time: '10:30 AM', doctor: 'Dr. Rajeshwari Swaminathan', type: 'TPLO Cruciate Ligament Repair', patient: 'Bruno (Golden Retriever)', location: 'Indiranagar Central - OT 1', vitals: 'HR 118, SpO2 99%, Stable', duration: '45 mins', state: 'In Surgery' },
    { time: '10:45 AM', doctor: 'Dr. Vikramaditya Rathore', type: 'Emergency Thoracic Drainage', patient: 'Zoe (Siberian Husky)', location: 'Bandra Trauma - Emergency OT', vitals: 'HR 135, BP 110/70, Critical', duration: '25 mins', state: 'In Surgery' },
    { time: '11:15 AM', doctor: 'Dr. Pooja Mehta', type: 'Ultrasound Renal & Doppler', patient: 'Milo (Persian Cat)', location: 'Bandra Trauma - Bay 2', vitals: 'Stable, Alert', duration: '15 mins', state: 'In Consultation' },
    { time: '11:30 AM', doctor: 'Dr. Anirudh Sen', type: 'Post-Op Wound & Drain Check', patient: 'Bella (Shih Tzu)', location: 'Jubilee Hills - Post-Op Ward', vitals: 'Normal Afebrile', duration: '20 mins', state: 'Post-Op Round' },
    { time: '11:45 AM', doctor: 'Dr. Siddharth Verma', type: '2D Echocardiography & Doppler', patient: 'Rocky (Rottweiler)', location: 'DLF CyberCity - Echo Lab', vitals: 'FS 18%, DCM Monitored', duration: '30 mins', state: 'Diagnostic Scan' },
    { time: '12:00 PM', doctor: 'Dr. Maya Chandran', type: 'Upper GI Video Endoscopy', patient: 'Leo (Beagle)', location: 'Koramangala - Minor OT', vitals: 'Foreign Body Extracted', duration: '35 mins', state: 'Procedure Complete' },
    { time: '12:15 PM', doctor: 'Dr. Rohan Kulkarni', type: 'Tumor Margin Cryo-Cauterization', patient: 'Coco (Labrador)', location: 'Koregaon Park - OT 2', vitals: 'Margin Clear, Hemostasis Ok', duration: '40 mins', state: 'In Surgery' },
    { time: '12:30 PM', doctor: 'Dr. Gaurav Sharma', type: 'Post-Fixation X-Ray Review', patient: 'Oreo (Indie Dog)', location: 'DLF CyberCity - Radiology Wing', vitals: 'Anatomical Alignment 100%', duration: '15 mins', state: 'Imaging Review' },
    { time: '12:45 PM', doctor: 'Dr. Sneha Nair', type: 'Slit-Lamp Biomicroscopy', patient: 'Luna (British Shorthair)', location: 'Indiranagar - Ophthalmic Suite', vitals: 'IOP 14 mmHg, Healing', duration: '20 mins', state: 'In Consultation' },
    { time: '01:00 PM', doctor: 'Dr. Edwin Reddy', type: 'Pediatric Incubator Triage', patient: 'Kitten Litter (4 Kittens)', location: 'Jubilee Hills - Neonatal ICU', vitals: 'Temp 38.1°C, Feeding Well', duration: '25 mins', state: 'Active Monitoring' }
  ];

  const cardStyle = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Doctors"
      subcategory="Clinical Telemetry"
      title="Doctor Real-Time Activity & Shift Telemetry"
      subtitle="Live operating theater status, ongoing consultations, outpatient pacing, and urgent case queues"
      icon="⚡"
      badge="28 Doctors Live"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Doctors Currently On Duty" value="28 Clinicians" delta="10 Centers" trend="up" subtext="Full day-shift coverage" icon="👨‍⚕️" />
        <KpiCard label="Surgeries in Progress" value="6 Active OTs" delta="Modular suites" trend="up" subtext="Sterile positive-pressure" icon="🩺" />
        <KpiCard label="OPD Consults Today" value="164 Consults" delta="Pacing 18/hr" trend="up" subtext="Zero patient backlog" icon="📋" />
        <KpiCard label="Tele-Consult Queue" value="4 Waiting" delta="<4 mins wait" trend="up" subtext="Video consultation active" icon="📱" />
      </div>

      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>⚡ Live Physician Activity Feed</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border, #e2e8f0)', textAlign: 'left', color: 'var(--muted-foreground, #475569)' }}>
                <th style={{ padding: '10px' }}>Timestamp</th>
                <th style={{ padding: '10px' }}>Doctor Name</th>
                <th style={{ padding: '10px' }}>Activity Type</th>
                <th style={{ padding: '10px' }}>Patient / Case</th>
                <th style={{ padding: '10px' }}>Clinic / OT Location</th>
                <th style={{ padding: '10px' }}>Vitals / Alert Status</th>
                <th style={{ padding: '10px' }}>Duration</th>
                <th style={{ padding: '10px' }}>Current State</th>
              </tr>
            </thead>
            <tbody>
              {liveActivities.map((a, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '10px', fontFamily: 'monospace' }}>{a.time}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{a.doctor}</td>
                  <td style={{ padding: '10px' }}>{a.type}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{a.patient}</td>
                  <td style={{ padding: '10px', color: '#64748b' }}>{a.location}</td>
                  <td style={{ padding: '10px' }}>{a.vitals}</td>
                  <td style={{ padding: '10px' }}>{a.duration}</td>
                  <td style={{ padding: '10px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: a.state.includes('Surgery') ? 'rgba(245,158,11,0.15)' : a.state.includes('Monitoring') || a.state.includes('Complete') ? 'rgba(16,185,129,0.12)' : 'rgba(59,130,246,0.12)',
                      color: a.state.includes('Surgery') ? '#b45309' : a.state.includes('Monitoring') || a.state.includes('Complete') ? '#047857' : '#1d4ed8'
                    }}>
                      {a.state}
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
