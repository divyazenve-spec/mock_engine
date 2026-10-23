import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function DoctorPatients() {
  const patientLogs = [
    { name: 'Bruno', breed: 'Golden Retriever, 4y', owner: 'Vikramaditya Malhotra', doctor: 'Dr. Rajeshwari Swaminathan', diagnosis: 'TPLO Cruciate Ligament Rupture', plan: 'Post-op rehab & Carprofen 75mg', nextVisit: '2026-10-22', status: 'Post-Op Recovery' },
    { name: 'Milo', breed: 'Persian Cat, 3y', owner: 'Sunita Kothari', doctor: 'Dr. Pooja Mehta', diagnosis: 'FLUTD Urinary Obstruction', plan: 'Catheterization & Hills c/d diet', nextVisit: '2026-10-18', status: 'Inpatient ICU' },
    { name: 'Simba', breed: 'German Shepherd, 6y', owner: 'Raghavendra Rao', doctor: 'Dr. Vikramaditya Rathore', diagnosis: 'Gastric Dilatation-Volvulus (GDV)', plan: 'Gastropexy post-care & IV fluids', nextVisit: '2026-10-24', status: 'Post-Op Recovery' },
    { name: 'Bella', breed: 'Shih Tzu, 5y', owner: 'Meera Kapoor', doctor: 'Dr. Anirudh Sen', diagnosis: 'Emergency Pyometra Resection', plan: 'Ceftriaxone & analgesia protocol', nextVisit: '2026-10-20', status: 'Stable Ward' },
    { name: 'Leo', breed: 'Beagle, 2y', owner: 'Ananya Sharma', doctor: 'Dr. Maya Chandran', diagnosis: 'Gastric Foreign Body (Sox)', plan: 'Endoscopic extraction post-care', nextVisit: '2026-10-19', status: 'Discharged Today' },
    { name: 'Coco', breed: 'Labrador, 7y', owner: 'Amit Deshmukh', doctor: 'Dr. Rohan Kulkarni', diagnosis: 'Splenic Mass Resection', plan: 'Histopathology & Yunnan Baiyao', nextVisit: '2026-10-25', status: 'Inpatient Ward' },
    { name: 'Zoe', breed: 'Siberian Husky, 1y', owner: 'Kabir Bedi', doctor: 'Dr. Gaurav Sharma', diagnosis: 'Diaphragmatic Hernia Repair', plan: 'ICU oxygen & thoracic drainage', nextVisit: '2026-10-23', status: 'Critical ICU' },
    { name: 'Oreo', breed: 'Indie Dog, 3y', owner: 'Edwin Pillai', doctor: 'Dr. Gaurav Sharma', diagnosis: 'Comminuted Femur Fracture', plan: '3.5mm LCP plate fixation & rest', nextVisit: '2026-10-28', status: 'Post-Op Recovery' },
    { name: 'Luna', breed: 'British Shorthair, 4y', owner: 'Priya Nambiar', doctor: 'Dr. Sneha Nair', diagnosis: 'Deep Corneal Ulceration', plan: 'Conjunctival flap & ofloxacin', nextVisit: '2026-10-21', status: 'Outpatient Care' },
    { name: 'Rocky', breed: 'Rottweiler, 5y', owner: 'Varun Tej', doctor: 'Dr. Siddharth Verma', diagnosis: 'Dilated Cardiomyopathy (DCM)', plan: 'Pimobendan 5mg BID & Furosemide', nextVisit: '2026-10-26', status: 'Monitored Stable' }
  ];

  const cardStyle = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Doctors"
      subcategory="Patient Log"
      title="Doctor Patients & Treatment Logs"
      subtitle="Outpatient records, clinical case histories, diagnoses, and scheduled medical follow-ups"
      icon="🐾"
      badge="840 Active Inpatients & OPD"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Active Patient Caseload" value="840 Pets" delta="+16.2%" trend="up" subtext="Inpatients & OPD caseload" icon="🐾" />
        <KpiCard label="Repeat Pet Consults" value="68.4%" delta="+5.8%" trend="up" subtext="High parent trust retention" icon="🔄" />
        <KpiCard label="Chronic Care Monitored" value="286 Pets" delta="Active telemetry" trend="up" subtext="Regular maintenance" icon="🩺" />
        <KpiCard label="Follow-Up Adherence" value="94.2%" delta="+3.4%" trend="up" subtext="Automated reminder sync" icon="📅" />
      </div>

      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>🐾 Active Clinical Cases & Follow-Up Regimens</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border, #e2e8f0)', textAlign: 'left', color: 'var(--muted-foreground, #475569)' }}>
                <th style={{ padding: '10px' }}>Patient Name & Breed</th>
                <th style={{ padding: '10px' }}>Pet Parent</th>
                <th style={{ padding: '10px' }}>Attending Doctor</th>
                <th style={{ padding: '10px' }}>Primary Diagnosis</th>
                <th style={{ padding: '10px' }}>Treatment Plan</th>
                <th style={{ padding: '10px' }}>Next Follow-Up</th>
                <th style={{ padding: '10px' }}>Clinical Status</th>
              </tr>
            </thead>
            <tbody>
              {patientLogs.map((p, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{p.name} <span style={{ color: '#64748b', fontWeight: 400 }}>({p.breed})</span></td>
                  <td style={{ padding: '10px' }}>{p.owner}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{p.doctor}</td>
                  <td style={{ padding: '10px', color: '#dc2626', fontWeight: 600 }}>{p.diagnosis}</td>
                  <td style={{ padding: '10px' }}>{p.plan}</td>
                  <td style={{ padding: '10px', fontFamily: 'monospace' }}>{p.nextVisit}</td>
                  <td style={{ padding: '10px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: p.status.includes('ICU') || p.status.includes('Critical') ? 'rgba(239,68,68,0.12)' : p.status.includes('Recovery') ? 'rgba(245,158,11,0.15)' : 'rgba(16,185,129,0.12)',
                      color: p.status.includes('ICU') || p.status.includes('Critical') ? '#dc2626' : p.status.includes('Recovery') ? '#b45309' : '#047857'
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
