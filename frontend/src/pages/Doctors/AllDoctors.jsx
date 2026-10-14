import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function AllDoctors() {
  const [search, setSearch] = useState('');
  const [specFilter, setSpecFilter] = useState('ALL');

  const roster = [
    { id: 'DOC-2026-01', name: 'Dr. Rajeshwari Swaminathan', spec: 'Orthopedic Surgery & TPLO', qual: 'BVSc & AH, MVSc (Surgery), Dipl. ACVS', exp: '15 Yrs', vci: 'KVC-90214-A', clinic: 'Indiranagar Central Hospital', days: 'Mon, Wed, Fri', status: 'On Duty' },
    { id: 'DOC-2026-02', name: 'Dr. Vikramaditya Rathore', spec: 'Emergency & Critical Care', qual: 'BVSc & AH, MVSc, FCCM Fellow', exp: '13 Yrs', vci: 'MVC-81492-B', clinic: 'Bandra Trauma Centre', days: 'Tue, Thu, Sat', status: 'In Surgery' },
    { id: 'DOC-2026-03', name: 'Dr. Pooja Mehta', spec: 'Feline Medicine & Nephrology', qual: 'BVSc & AH, MVSc, ISFM AdvCert', exp: '11 Yrs', vci: 'MVC-78931-F', clinic: 'Bandra Trauma Centre', days: 'Mon, Tue, Thu, Sat', status: 'On Duty' },
    { id: 'DOC-2026-04', name: 'Dr. Anirudh Sen', spec: 'General Surgery & Laparoscopy', qual: 'BVSc & AH, MVSc (Surgery)', exp: '14 Yrs', vci: 'TSVC-64210-S', clinic: 'Jubilee Hills Center', days: 'Mon to Fri', status: 'On Duty' },
    { id: 'DOC-2026-05', name: 'Dr. Siddharth Verma', spec: 'Cardiology & Echocardiography', qual: 'BVSc & AH, MVSc, Dip. ECVIM-CA', exp: '12 Yrs', vci: 'DVC-51982-C', clinic: 'DLF CyberCity Hospital', days: 'Tue, Wed, Fri, Sat', status: 'On Call' },
    { id: 'DOC-2026-06', name: 'Dr. Rohan Kulkarni', spec: 'Surgical Oncology & Soft Tissue', qual: 'BVSc & AH, MVSc, F.Surg.Onc', exp: '10 Yrs', vci: 'MVC-94511-O', clinic: 'Koregaon Park Hospital', days: 'Mon, Wed, Thu, Sat', status: 'In Surgery' },
    { id: 'DOC-2026-07', name: 'Dr. Gaurav Sharma', spec: 'Spine Neurosurgery & Trauma', qual: 'BVSc & AH, MVSc, AOVET Spine', exp: '9 Yrs', vci: 'DVC-73204-N', clinic: 'DLF CyberCity Hospital', days: 'Mon, Tue, Thu, Fri', status: 'On Duty' },
    { id: 'DOC-2026-08', name: 'Dr. Sneha Nair', spec: 'Ophthalmology & Microsurgery', qual: 'BVSc & AH, MVSc, Cert. Vet. Ophthal', exp: '8 Yrs', vci: 'KVC-88741-E', clinic: 'Indiranagar Central Hospital', days: 'Wed to Sun', status: 'On Duty' },
    { id: 'DOC-2026-09', name: 'Dr. Divya Reddy', spec: 'Critical Care & Neonatology', qual: 'BVSc & AH, MVSc, VECCS Fellow', exp: '7 Yrs', vci: 'TSVC-91230-P', clinic: 'Jubilee Hills Center', days: 'Mon, Tue, Wed, Fri', status: 'On Duty' },
    { id: 'DOC-2026-10', name: 'Dr. Maya Chandran', spec: 'Gastroenterology & Endoscopy', qual: 'BVSc & AH, MVSc, SA Gastro Fellow', exp: '11 Yrs', vci: 'KVC-75412-G', clinic: 'Koramangala Care Clinic', days: 'Mon to Fri', status: 'On Duty' }
  ];

  const filtered = roster.filter(d => {
    if (specFilter !== 'ALL' && !d.spec.toLowerCase().includes(specFilter.toLowerCase())) return false;
    if (search) {
      const q = search.toLowerCase();
      return d.name.toLowerCase().includes(q) || d.id.toLowerCase().includes(q) || d.spec.toLowerCase().includes(q) || d.vci.toLowerCase().includes(q);
    }
    return true;
  });

  const cardStyle = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Doctors"
      subcategory="Physician Directory"
      title="All Registered Veterinary Practitioners"
      subtitle="Complete veterinary registry, state board licensing, clinical credentials, and center affiliations"
      icon="👨‍⚕️"
      badge="42 Board Registered"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Board Clinicians" value="42 Clinicians" delta="+6 YoY" trend="up" subtext="All state board registered" icon="👨‍⚕️" />
        <KpiCard label="Primary Specialties" value="8 Disciplines" delta="100% active" trend="up" subtext="Full tertiary care coverage" icon="🩺" />
        <KpiCard label="Avg Clinical Experience" value="11.4 Yrs" delta="Senior board" trend="up" subtext="Board certified clinicians" icon="🎓" />
        <KpiCard label="Clinic Shifts Scheduled" value="100.0%" delta="Zero absence" trend="up" subtext="Zero doctor absence backlog" icon="📅" />
      </div>

      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>📋 Clinical Registry & Practitioner Credentials</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>State Veterinary Board license numbers, verified qualifications, and tenure</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search by name, ID or license..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--border, #cbd5e1)', fontSize: '12px', background: '#f8fafc', color: '#0f172a', width: '220px' }}
            />
            {['ALL', 'Orthopedic', 'Emergency', 'Feline', 'Surgery', 'Cardiology', 'Oncology'].map(s => (
              <button
                key={s}
                onClick={() => setSpecFilter(s)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  border: specFilter === s ? '1px solid #059669' : '1px solid var(--border, #cbd5e1)',
                  background: specFilter === s ? '#059669' : '#ffffff',
                  color: specFilter === s ? '#ffffff' : '#334155',
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
                <th style={{ padding: '10px' }}>Clinician Name</th>
                <th style={{ padding: '10px' }}>Specialty</th>
                <th style={{ padding: '10px' }}>Qualifications</th>
                <th style={{ padding: '10px' }}>Experience</th>
                <th style={{ padding: '10px' }}>State VCI License</th>
                <th style={{ padding: '10px' }}>Primary Clinic Hub</th>
                <th style={{ padding: '10px' }}>OPD Days</th>
                <th style={{ padding: '10px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(d => (
                <tr key={d.id} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '10px', fontFamily: 'monospace', fontWeight: 600 }}>{d.id}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{d.name}</td>
                  <td style={{ padding: '10px' }}>{d.spec}</td>
                  <td style={{ padding: '10px', color: '#64748b' }}>{d.qual}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{d.exp}</td>
                  <td style={{ padding: '10px', fontFamily: 'monospace', color: '#0369a1' }}>{d.vci}</td>
                  <td style={{ padding: '10px' }}>{d.clinic}</td>
                  <td style={{ padding: '10px', color: '#475569' }}>{d.days}</td>
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
