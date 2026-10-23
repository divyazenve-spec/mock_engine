import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function DoctorsDashboard() {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const doctors = [
    { id: 'DOC-2026-01', name: 'Dr. Rajeshwari Swaminathan', spec: 'Orthopedic Surgery & TPLO', clinic: 'Indiranagar Central Hospital, Bengaluru', patientsMtd: 142, revMtd: '₹18.40 L', comm: '₹2.76 L', rating: '4.9', status: 'On Duty' },
    { id: 'DOC-2026-02', name: 'Dr. Vikramaditya Rathore', spec: 'Emergency & Critical Care', clinic: 'Bandra Trauma Centre, Mumbai', patientsMtd: 138, revMtd: '₹16.90 L', comm: '₹2.53 L', rating: '4.9', status: 'In Surgery' },
    { id: 'DOC-2026-03', name: 'Dr. Pooja Mehta', spec: 'Feline Medicine & Nephrology', clinic: 'Bandra Trauma Centre, Mumbai', patientsMtd: 156, revMtd: '₹14.25 L', comm: '₹2.13 L', rating: '5.0', status: 'On Duty' },
    { id: 'DOC-2026-04', name: 'Dr. Anirudh Sen', spec: 'General Surgery & Laparoscopy', clinic: 'Jubilee Hills Center, Hyderabad', patientsMtd: 148, revMtd: '₹15.10 L', comm: '₹2.26 L', rating: '4.8', status: 'On Duty' },
    { id: 'DOC-2026-05', name: 'Dr. Siddharth Verma', spec: 'Cardiology & Echocardiography', clinic: 'DLF CyberCity Hospital, Delhi NCR', patientsMtd: 124, revMtd: '₹13.80 L', comm: '₹2.07 L', rating: '4.9', status: 'On Call' },
    { id: 'DOC-2026-06', name: 'Dr. Rohan Kulkarni', spec: 'Surgical Oncology & Soft Tissue', clinic: 'Koregaon Park Hospital, Pune', patientsMtd: 118, revMtd: '₹12.60 L', comm: '₹1.89 L', rating: '4.8', status: 'In Surgery' },
    { id: 'DOC-2026-07', name: 'Dr. Gaurav Sharma', spec: 'Spine Neurosurgery & Trauma', clinic: 'DLF CyberCity Hospital, Delhi NCR', patientsMtd: 132, revMtd: '₹13.40 L', comm: '₹2.01 L', rating: '4.9', status: 'On Duty' },
    { id: 'DOC-2026-08', name: 'Dr. Sneha Nair', spec: 'Ophthalmology & Microsurgery', clinic: 'Indiranagar Central Hospital, Bengaluru', patientsMtd: 126, revMtd: '₹10.90 L', comm: '₹1.63 L', rating: '4.9', status: 'On Duty' },
    { id: 'DOC-2026-09', name: 'Dr. Edwin Reddy', spec: 'Critical Care & Neonatology', clinic: 'Jubilee Hills Center, Hyderabad', patientsMtd: 140, revMtd: '₹11.85 L', comm: '₹1.77 L', rating: '4.8', status: 'On Duty' },
    { id: 'DOC-2026-10', name: 'Dr. Maya Chandran', spec: 'Gastroenterology & Endoscopy', clinic: 'Koramangala Care Clinic, Bengaluru', patientsMtd: 152, revMtd: '₹13.60 L', comm: '₹2.04 L', rating: '4.9', status: 'On Duty' }
  ];

  const filtered = doctors.filter(d => {
    if (filter !== 'ALL' && d.status !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      return d.name.toLowerCase().includes(q) || d.spec.toLowerCase().includes(q) || d.clinic.toLowerCase().includes(q);
    }
    return true;
  });

  const cardStyle = {
    background: 'var(--card, #ffffff)',
    border: '1px solid var(--border, rgba(0,0,0,0.08))',
    borderRadius: '12px',
    padding: '22px 24px'
  };

  return (
    <DashboardLayout
      category="Doctors"
      subcategory="Executive Medical Command"
      title="Veterinary Medical Board & Practitioners"
      subtitle="Physician consultation quotas, clinical patient volume, surgical rosters, and commission settlements"
      icon="👨‍⚕️"
      badge="42 Clinicians Active"
      actions={
        <button
          onClick={() => alert('New Doctor Onboarding modal initiated...')}
          style={{
            padding: '6px 14px',
            borderRadius: '8px',
            border: '1px solid #059669',
            background: 'rgba(5,150,105,0.12)',
            color: '#065f46',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          + Add New Practitioner
        </button>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Active Veterinary Doctors" value="42 Clinicians" delta="+6 YoY" trend="up" subtext="Across 10 clinic centers" icon="👨‍⚕️" />
        <KpiCard label="Monthly Patient Consults" value="3,480 Consults" delta="+14.2%" trend="up" subtext="142 daily consult average" icon="🐾" />
        <KpiCard label="Doctor Attributed Revenue" value="₹1.18 Cr" delta="+18.5%" trend="up" subtext="Consults, meds & surgery" icon="💰" />
        <KpiCard label="Doctor Commissions Paid" value="₹18.45 L" delta="100%" trend="up" subtext="Settled bi-weekly direct" icon="📋" />
        <KpiCard label="Avg. Patient Satisfaction" value="4.9 / 5.0" delta="1,840 ratings" trend="up" subtext="Verified pet parents" icon="⭐" />
        <KpiCard label="Surgical Success Rate" value="99.4%" delta="482 procedures" trend="up" subtext="Zero cross-contamination" icon="🛡️" />
      </div>

      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>👨‍⚕️ Practitioner Roster & Real-Time Clinical Standing</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Accreditation details, MTD consultation volume, and clinical commission accruals</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search practitioner or specialty..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--border, #cbd5e1)', fontSize: '12px', background: '#f8fafc', color: '#0f172a', width: '220px' }}
            />
            {['ALL', 'On Duty', 'In Surgery', 'On Call'].map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  border: filter === s ? '1px solid #059669' : '1px solid var(--border, #cbd5e1)',
                  background: filter === s ? '#059669' : '#ffffff',
                  color: filter === s ? '#ffffff' : '#334155',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border, #e2e8f0)', textAlign: 'left', color: 'var(--muted-foreground, #475569)' }}>
                <th style={{ padding: '10px' }}>Doctor ID</th>
                <th style={{ padding: '10px' }}>Practitioner Name</th>
                <th style={{ padding: '10px' }}>Specialty</th>
                <th style={{ padding: '10px' }}>Center Clinic</th>
                <th style={{ padding: '10px' }}>MTD Patients</th>
                <th style={{ padding: '10px' }}>Attributed Revenue</th>
                <th style={{ padding: '10px' }}>Commissions</th>
                <th style={{ padding: '10px' }}>Rating</th>
                <th style={{ padding: '10px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(d => (
                <tr key={d.id} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '10px', fontFamily: 'monospace', fontWeight: 600 }}>{d.id}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{d.name}</td>
                  <td style={{ padding: '10px' }}>{d.spec}</td>
                  <td style={{ padding: '10px', color: '#64748b' }}>{d.clinic}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{d.patientsMtd} pets</td>
                  <td style={{ padding: '10px', fontWeight: 600, color: '#059669' }}>{d.revMtd}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{d.comm}</td>
                  <td style={{ padding: '10px', color: '#d97706', fontWeight: 600 }}>★ {d.rating}</td>
                  <td style={{ padding: '10px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: d.status === 'On Duty' ? 'rgba(16,185,129,0.12)' : d.status === 'In Surgery' ? 'rgba(245,158,11,0.15)' : 'rgba(99,102,241,0.12)',
                      color: d.status === 'On Duty' ? '#047857' : d.status === 'In Surgery' ? '#b45309' : '#4338ca'
                    }}>
                      {d.status}
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
