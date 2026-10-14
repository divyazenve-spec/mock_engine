import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Appointments() {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const appointments = [
    { id: 'APT-1081', time: '09:00 AM', duration: '30m', pet: 'Bruno (Golden Retriever, 4y)', parent: 'Aditya Vikram Birla', doctor: 'Dr. Rajeshwari Swaminathan', clinic: 'Indiranagar Central Hospital', service: 'Orthopedic Joint Evaluation & TPLO Followup', slotType: 'Scheduled Slot', status: 'In Session' },
    { id: 'APT-1082', time: '09:30 AM', duration: '20m', pet: 'Simba (Persian Cat, 2y)', parent: 'Pooja Singhania', doctor: 'Dr. Sneha Nair', clinic: 'Indiranagar Central Hospital', service: 'Feline Urinalysis & Renal Ultrasound', slotType: 'Scheduled Slot', status: 'Arrived / Checked In' },
    { id: 'APT-1083', time: '10:00 AM', duration: '45m', pet: 'Max (German Shepherd, 6y)', parent: 'Rohan Deshmukh', doctor: 'Dr. Vikramaditya Rathore', clinic: 'Bandra Trauma Centre', service: 'Emergency GDV Decompression & Pre-Op', slotType: 'Emergency Triage', status: 'Confirmed' },
    { id: 'APT-1084', time: '10:30 AM', duration: '20m', pet: 'Bella (Labrador Retriever, 3y)', parent: 'Sneha Kulkarni', doctor: 'Dr. Divya Reddy', clinic: 'Bandra Trauma Centre', service: 'Dermatology Skin Scraping & Allergy Test', slotType: 'Scheduled Slot', status: 'Confirmed' },
    { id: 'APT-1085', time: '11:00 AM', duration: '30m', pet: 'Leo (Shih Tzu, 1.5y)', parent: 'Kunal Kapoor', doctor: 'Dr. Maya Chandran', clinic: 'DLF CyberCity Hospital', service: 'Gastroenterology IV Infusion & Vitals Check', slotType: 'Walk-In Priority', status: 'Confirmed' },
    { id: 'APT-1086', time: '11:30 AM', duration: '30m', pet: 'Coco (Beagle, 5y)', parent: 'Ananya Sen', doctor: 'Dr. Siddharth Verma', clinic: 'DLF CyberCity Hospital', service: 'Color Doppler Echocardiogram Screening', slotType: 'Scheduled Slot', status: 'Confirmed' },
    { id: 'APT-1087', time: '12:00 PM', duration: '40m', pet: 'Rocky (Rottweiler, 4y)', parent: 'Tarun Mathur', doctor: 'Dr. Anirudh Sen', clinic: 'Jubilee Hills Center', service: 'Neurology Spinal Myelography & Reflex Test', slotType: 'Scheduled Slot', status: 'Confirmed' },
    { id: 'APT-1088', time: '02:00 PM', duration: '20m', pet: 'Milo (British Shorthair, 3y)', parent: 'Meera Nambiar', doctor: 'Dr. Karthik Sundaram', clinic: 'Alwarpet Community Clinic', service: 'Slit Lamp Ophthalmic Staining Exam', slotType: 'Scheduled Slot', status: 'Confirmed' },
    { id: 'APT-1089', time: '02:30 PM', duration: '25m', pet: 'Oskar (Siberian Husky, 2.5y)', parent: 'Vikram Merchant', doctor: 'Dr. Rohan Kulkarni', clinic: 'Koregaon Park Hospital', service: 'Fine Needle Aspirate (FNA) Oncology Biopsy', slotType: 'Scheduled Slot', status: 'Confirmed' },
    { id: 'APT-1090', time: '03:00 PM', duration: '20m', pet: 'Zoe (Indie Rescue, 1y)', parent: 'Dr. Rajeshwari Swaminathan', doctor: 'Dr. Gaurav Sharma', clinic: 'Koramangala Care Clinic', service: 'Nobivac Comprehensive Annual Booster', slotType: 'Walk-In Priority', status: 'Confirmed' }
  ];

  const filtered = appointments.filter(a => {
    const matchesFilter = filter === 'ALL' || a.status === filter || a.slotType === filter;
    const matchesSearch = a.pet.toLowerCase().includes(search.toLowerCase()) ||
      a.parent.toLowerCase().includes(search.toLowerCase()) ||
      a.doctor.toLowerCase().includes(search.toLowerCase()) ||
      a.clinic.toLowerCase().includes(search.toLowerCase()) ||
      a.service.toLowerCase().includes(search.toLowerCase()) ||
      a.id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const cardStyle = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Veterinary Services"
      subcategory="Appointments"
      title="Appointment Dispatch & Clinic Scheduling"
      subtitle="Calendar capacity, slot utilization, doctor availability, patient queues, and no-show prevention metrics"
      icon="📅"
      badge="10 Live Slot Bookings"
      actions={
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {['ALL', 'Scheduled Slot', 'Walk-In Priority', 'Emergency Triage', 'Confirmed', 'In Session'].map(f => (
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
        <KpiCard label="Booked Slots Today" value="94 Slots" delta="91.2% Cap" trend="up" subtext="Across 6 urban hospitals" icon="📅" />
        <KpiCard label="Walk-In Intake" value="18 Pets" delta="Fast Triage" trend="up" subtext="Fast-track priority buffer" icon="🚶" />
        <KpiCard label="No-Show Rate" value="1.8%" delta="-0.9% MoM" trend="up" subtext="Automated WhatsApp 2h alert" icon="📉" />
        <KpiCard label="Doctor Punctuality" value="98.4%" delta="SLA Met" trend="up" subtext="On-time consultation start" icon="⏱️" />
      </div>

      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Live Master Appointment Roster & Schedule</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Real-time schedule of pet healthcare bookings across outpatient, surgical, and wellness consultation slots</p>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search pet, parent, clinic, doctor..."
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
                <th style={{ padding: '10px 12px' }}>Time & Slot</th>
                <th style={{ padding: '10px 12px' }}>Pet & Companion</th>
                <th style={{ padding: '10px 12px' }}>Pet Parent</th>
                <th style={{ padding: '10px 12px' }}>Doctor Assigned</th>
                <th style={{ padding: '10px 12px' }}>Clinic Location</th>
                <th style={{ padding: '10px 12px' }}>Requested Service</th>
                <th style={{ padding: '10px 12px' }}>Slot Type</th>
                <th style={{ padding: '10px 12px', textAlign: 'center' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a.id} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '12px' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a', fontFamily: '"IBM Plex Mono", monospace' }}>{a.time}</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>{a.id} • {a.duration}</div>
                  </td>
                  <td style={{ padding: '12px', fontWeight: 700 }}>{a.pet}</td>
                  <td style={{ padding: '12px', color: '#475569' }}>{a.parent}</td>
                  <td style={{ padding: '12px', fontWeight: 600, color: '#059669' }}>{a.doctor}</td>
                  <td style={{ padding: '12px', color: '#334155' }}>{a.clinic}</td>
                  <td style={{ padding: '12px', fontWeight: 600 }}>{a.service}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600,
                      background: a.slotType === 'Emergency Triage' ? 'rgba(239,68,68,0.12)' : a.slotType === 'Walk-In Priority' ? 'rgba(245,158,11,0.12)' : 'rgba(5,150,105,0.1)',
                      color: a.slotType === 'Emergency Triage' ? '#b91c1c' : a.slotType === 'Walk-In Priority' ? '#b45309' : '#047857'
                    }}>
                      {a.slotType}
                    </span>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <span style={{
                      padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600,
                      background: a.status === 'Confirmed' ? 'rgba(16,185,129,0.12)' : a.status === 'In Session' ? 'rgba(37,99,235,0.12)' : 'rgba(99,102,241,0.12)',
                      color: a.status === 'Confirmed' ? '#047857' : a.status === 'In Session' ? '#1d4ed8' : '#4338ca'
                    }}>
                      {a.status}
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