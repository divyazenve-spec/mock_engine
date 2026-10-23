import React, { useState, useMemo } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ClinicDoctors() {
  const [specialtyFilter, setSpecialtyFilter] = useState('ALL');
  const [dutyFilter, setDutyFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState('');

  const doctorsList = [
    { name: 'Dr. Rajeshwari Swaminathan', qualification: 'B.V.Sc & A.H, M.V.Sc (Surgery & Rad)', specialty: 'Orthopedics', facility: 'Indiranagar Central Hospital', vci: 'VCI-KAR-2012-0891', shift: 'Morning (08:00 – 16:00)', consults: 1420, surgeries: 284, rating: 4.98, status: 'In Surgery' },
    { name: 'Dr. Vikramaditya Rathore', qualification: 'B.V.Sc & A.H, M.V.Sc (Surgery), Dipl. ECVS', specialty: 'Laparoscopy', facility: 'Bandra Trauma Centre', vci: 'VCI-MAH-2010-0412', shift: 'Emergency 24x7 Rotation', consults: 1680, surgeries: 312, rating: 4.96, status: 'On Duty' },
    { name: 'Dr. Maya Chandran', qualification: 'B.V.Sc & A.H, M.V.Sc (Internal Medicine)', specialty: 'Cardiology', facility: 'DLF CyberCity Hospital', vci: 'VCI-DEL-2014-1104', shift: 'Morning (09:00 – 17:00)', consults: 2140, surgeries: 48, rating: 4.95, status: 'On Duty' },
    { name: 'Dr. Anirudh Sen', qualification: 'B.V.Sc & A.H, M.V.Sc, PhD (Neurology)', specialty: 'Orthopedics', facility: 'Jubilee Hills Center', vci: 'VCI-TEL-2013-0678', shift: 'Morning (08:00 – 16:00)', consults: 1120, surgeries: 164, rating: 4.97, status: 'On Duty' },
    { name: 'Dr. Sneha Nair', qualification: 'B.V.Sc & A.H, MRCVS', specialty: 'Feline', facility: 'Koramangala Care Clinic', vci: 'VCI-KAR-2017-2034', shift: 'General (10:00 – 18:00)', consults: 1890, surgeries: 86, rating: 4.94, status: 'On Duty' },
    { name: 'Dr. Rohan Kulkarni', qualification: 'B.V.Sc & A.H, M.V.Sc (Clinical Med)', specialty: 'Laparoscopy', facility: 'Koregaon Park Hospital', vci: 'VCI-MAH-2015-1445', shift: 'Night Shift (20:00 – 08:00)', consults: 1340, surgeries: 72, rating: 4.92, status: 'On Duty' },
    { name: 'Dr. Pooja Mehta', qualification: 'B.V.Sc & A.H, PGD-Surg', specialty: 'Laparoscopy', facility: 'Andheri Link Rd Clinic', vci: 'VCI-MAH-2018-2490', shift: 'Evening (14:00 – 22:00)', consults: 1210, surgeries: 118, rating: 4.93, status: 'On Duty' },
    { name: 'Dr. Gaurav Sharma', qualification: 'B.V.Sc & A.H, M.V.Sc (Surgery)', specialty: 'Orthopedics', facility: 'Saket Pet Wellness', vci: 'VCI-DEL-2016-1782', shift: 'Morning (08:00 – 16:00)', consults: 1460, surgeries: 134, rating: 4.91, status: 'On Duty' },
    { name: 'Dr. Edwin Reddy', qualification: 'B.V.Sc & A.H, M.V.Sc (Dermatology)', specialty: 'Dermatology', facility: 'Gachibowli Daycare', vci: 'VCI-TEL-2017-2190', shift: 'General (09:30 – 17:30)', consults: 1980, surgeries: 24, rating: 4.96, status: 'On Duty' },
    { name: 'Dr. Karthik Sundaram', qualification: 'B.V.Sc & A.H, M.V.Sc (Ophthalmology)', specialty: 'Feline', facility: 'Alwarpet Community Clinic', vci: 'VCI-TN-2015-1329', shift: 'General (10:00 – 18:00)', consults: 1530, surgeries: 94, rating: 4.95, status: 'Off Duty' }
  ];

  const filtered = useMemo(() => {
    return doctorsList.filter(d => {
      const matchSpecialty = specialtyFilter === 'ALL' || d.specialty.includes(specialtyFilter);
      const matchDuty = dutyFilter === 'ALL' || d.status === dutyFilter;
      const matchSearch = search === '' ||
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.facility.toLowerCase().includes(search.toLowerCase()) ||
        d.specialty.toLowerCase().includes(search.toLowerCase()) ||
        d.vci.toLowerCase().includes(search.toLowerCase());
      return matchSpecialty && matchDuty && matchSearch;
    });
  }, [specialtyFilter, dutyFilter, search]);

  function handleRosterUpdate() {
    setToast('Duty roster sync completed across all 14 hospital emergency centers!');
    setTimeout(() => setToast(''), 3500);
  }

  return (
    <DashboardLayout
      category="Clinics & Hospitals"
      subcategory="Clinic Doctors"
      title="Clinic Doctors"
      subtitle="Veterinary Clinicians, Surgeons, Specialists & Rosters — Registered clinicians, VCI licenses, and shifts"
      icon="👨‍⚕️"
      badge=""
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={handleRosterUpdate}
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
            <span>🔄</span> Publish Weekly Roster
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
        <KpiCard label="Network Clinicians" value="28 Clinicians" delta="+4 YoY" trend="up" subtext="10 centers active" icon="👨‍⚕️" />
        <KpiCard label="Specialist Surgeons" value="12 Specialists" delta="Board-certified" trend="up" subtext="Diplomates & M.V.Sc" icon="🔪" />
        <KpiCard label="Clinicians On-Duty Now" value="18 Doctors" delta="Full shift" trend="up" subtext="All OPD suites staffed" icon="⚡" />
        <KpiCard label="Daily Consults / Doc" value="17 Patients" delta="+2.4" trend="up" subtext="Optimal clinical pacing" icon="🩺" />
        <KpiCard label="Doctor Patient CSAT" value="4.95 ★" delta="+0.03" trend="up" subtext="3,850+ verified reviews" icon="⭐" />
        <KpiCard label="CME Training Credits" value="98.4%" delta="+3.2%" trend="up" subtext="Annual surgical workshops" icon="📚" />
      </div>

      {/* Clinicians Table */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '22px 24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#fff' }}>Veterinary Doctor Registry & Active Shifts</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#94a3b8' }}>Licensure credentials, primary facility assignment, surgical procedures, and performance ratings</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search doctor, hospital, specialty..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                padding: '7px 12px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.25)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '12px',
                width: '240px',
                outline: 'none'
              }}
            />
            <select
              value={specialtyFilter}
              onChange={e => setSpecialtyFilter(e.target.value)}
              style={{
                padding: '7px 10px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.25)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#cbd5e1',
                fontSize: '12px',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="ALL">All Clinical Specialties</option>
              <option value="Orthopedics">Orthopedics & TPLO</option>
              <option value="Feline">Feline Medicine</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Dermatology">Dermatology</option>
              <option value="Laparoscopy">Laparoscopy</option>
            </select>
            <select
              value={dutyFilter}
              onChange={e => setDutyFilter(e.target.value)}
              style={{
                padding: '7px 10px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.25)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#cbd5e1',
                fontSize: '12px',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="ALL">All Duty Status</option>
              <option value="On Duty">On Duty</option>
              <option value="In Surgery">In Surgery</option>
              <option value="Off Duty">Off Duty</option>
            </select>
          </div>
        </div>

        <div style={{
          overflowX: 'auto',
          margin: '0 -24px -22px',
          borderTop: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '0 0 12px 12px'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.18)', borderBottom: '1px solid rgba(255,255,255,0.08)', textAlign: 'left', color: '#94a3b8' }}>
                <th style={{ padding: '12px 24px', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: '"IBM Plex Mono", monospace' }}>Doctor Name & Credentials</th>
                <th style={{ padding: '12px 24px', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: '"IBM Plex Mono", monospace' }}>Specialty</th>
                <th style={{ padding: '12px 24px', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: '"IBM Plex Mono", monospace' }}>Hospital / Clinic</th>
                <th style={{ padding: '12px 24px', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: '"IBM Plex Mono", monospace' }}>VCI License</th>
                <th style={{ padding: '12px 24px', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: '"IBM Plex Mono", monospace' }}>Active Shift</th>
                <th style={{ padding: '12px 24px', textAlign: 'right', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: '"IBM Plex Mono", monospace' }}>Consults</th>
                <th style={{ padding: '12px 24px', textAlign: 'right', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: '"IBM Plex Mono", monospace' }}>Surgeries</th>
                <th style={{ padding: '12px 24px', textAlign: 'right', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: '"IBM Plex Mono", monospace' }}>Rating</th>
                <th style={{ padding: '12px 24px', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: '"IBM Plex Mono", monospace' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (<tr><td colSpan="9" style={{ textAlign: "center", padding: "32px", color: "var(--muted-foreground, #64748b)" }}>No doctor records found</td></tr>) : filtered.map((d, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '14px 24px' }}>
                    <div style={{ fontWeight: 600, color: '#fff' }}>{d.name}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>{d.qualification}</div>
                  </td>
                  <td style={{ padding: '14px 24px' }}>
                    <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, background: 'rgba(59,130,246,0.15)', color: '#60a5fa' }}>
                      {d.specialty}
                    </span>
                  </td>
                  <td style={{ padding: '14px 24px', color: '#cbd5e1' }}>{d.facility}</td>
                  <td style={{ padding: '14px 24px', fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', color: '#38bdf8' }}>{d.vci}</td>
                  <td style={{ padding: '14px 24px', color: '#94a3b8', fontSize: '11px' }}>{d.shift}</td>
                  <td style={{ padding: '14px 24px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600 }}>{d.consults}</td>
                  <td style={{ padding: '14px 24px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#10b981', fontWeight: 600 }}>{d.surgeries}</td>
                  <td style={{ padding: '14px 24px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#fbbf24', fontWeight: 700 }}>
                    ⭐ {d.rating}
                  </td>
                  <td style={{ padding: '14px 24px' }}>
                    <span style={{
                      padding: '3px 9px',
                      borderRadius: '99px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: d.status === 'On Duty' ? 'rgba(16,185,129,0.15)' :
                        d.status === 'In Surgery' ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.06)',
                      color: d.status === 'On Duty' ? '#34d399' :
                        d.status === 'In Surgery' ? '#f87171' : '#94a3b8'
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
