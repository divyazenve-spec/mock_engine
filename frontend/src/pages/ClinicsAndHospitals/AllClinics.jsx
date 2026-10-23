import React, { useState, useMemo } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function AllClinics() {
  const [cityFilter, setCityFilter] = useState('ALL');
  const [tierFilter, setTierFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [toast, setToast] = useState('');

  const clinicsData = [
    { name: 'Zenve Koramangala Care Clinic', code: 'CLN-BLR-01', city: 'Bengaluru', address: '80 Feet Rd, 4th Block, Koramangala', tier: 'Specialty Outpatient', rooms: 4, leadVet: 'Dr. Sneha Nair', staff: 8, hours: '08:00 – 21:00', footfall: '58 Pets/day', monthlyRev: '₹9.40 L' },
    { name: 'Zenve Andheri Link Rd Clinic', code: 'CLN-BOM-01', city: 'Mumbai', address: 'Oshiwara Link Rd, Andheri West', tier: 'Specialty Outpatient', rooms: 5, leadVet: 'Dr. Pooja Mehta', staff: 10, hours: '08:00 – 22:00', footfall: '64 Pets/day', monthlyRev: '₹11.20 L' },
    { name: 'Zenve Saket Pet Wellness & Diagnostics', code: 'CLN-DEL-01', city: 'Delhi NCR', address: 'J-Block, Saket, South Delhi', tier: 'Diagnostic Care Center', rooms: 4, leadVet: 'Dr. Gaurav Sharma', staff: 9, hours: '08:00 – 20:30', footfall: '52 Pets/day', monthlyRev: '₹8.85 L' },
    { name: 'Zenve Gachibowli Daycare & Dental', code: 'CLN-HYD-01', city: 'Hyderabad', address: 'Telecom Nagar, Gachibowli', tier: 'Specialty Outpatient', rooms: 4, leadVet: 'Dr. Edwin Reddy', staff: 8, hours: '09:00 – 21:00', footfall: '60 Pets/day', monthlyRev: '₹10.15 L' },
    { name: 'Zenve Alwarpet Community Pet Clinic', code: 'CLN-MAA-01', city: 'Chennai', address: 'TTK Road, Alwarpet', tier: 'Primary Outpatient', rooms: 3, leadVet: 'Dr. Karthik Sundaram', staff: 6, hours: '09:00 – 20:00', footfall: '46 Pets/day', monthlyRev: '₹7.90 L' },
    { name: 'Zenve Whitefield Pet Health Hub', code: 'CLN-BLR-02', city: 'Bengaluru', address: 'Inner Circle, Whitefield', tier: 'Diagnostic Care Center', rooms: 5, leadVet: 'Dr. Ananya Ray', staff: 9, hours: '08:30 – 21:00', footfall: '54 Pets/day', monthlyRev: '₹8.60 L' },
    { name: 'Zenve Powai Lake Pet Polyclinic', code: 'CLN-BOM-02', city: 'Mumbai', address: 'Hiranandani Gardens, Powai', tier: 'Primary Outpatient', rooms: 4, leadVet: 'Dr. Siddharth Joshi', staff: 7, hours: '09:00 – 21:00', footfall: '48 Pets/day', monthlyRev: '₹7.80 L' },
    { name: 'Zenve Noida Sector 50 Pet Care', code: 'CLN-DEL-02', city: 'Delhi NCR', address: 'Main Market, Sector 50, Noida', tier: 'Primary Outpatient', rooms: 3, leadVet: 'Dr. Neha Verma', staff: 6, hours: '09:00 – 20:00', footfall: '42 Pets/day', monthlyRev: '₹6.90 L' },
    { name: 'Zenve Banjara Hills Wellness Suite', code: 'CLN-HYD-02', city: 'Hyderabad', address: 'Road No. 12, Banjara Hills', tier: 'Specialty Outpatient', rooms: 4, leadVet: 'Dr. Praveen Varma', staff: 8, hours: '08:30 – 20:30', footfall: '50 Pets/day', monthlyRev: '₹8.20 L' },
    { name: 'Zenve Aundh Pet Health Clinic', code: 'CLN-PNQ-01', city: 'Pune', address: 'DP Road, Aundh, Pune', tier: 'Primary Outpatient', rooms: 3, leadVet: 'Dr. Ketan Phadke', staff: 6, hours: '09:00 – 20:00', footfall: '38 Pets/day', monthlyRev: '₹6.40 L' }
  ];

  const filtered = useMemo(() => {
    return clinicsData.filter(c => {
      const matchCity = cityFilter === 'ALL' || c.city === cityFilter;
      const matchTier = tierFilter === 'ALL' || c.tier === tierFilter;
      const matchSearch = search === '' ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.code.toLowerCase().includes(search.toLowerCase()) ||
        c.city.toLowerCase().includes(search.toLowerCase()) ||
        c.leadVet.toLowerCase().includes(search.toLowerCase());
      return matchCity && matchTier && matchSearch;
    });
  }, [cityFilter, tierFilter, search]);

  function handleAddClinic(e) {
    e.preventDefault();
    setShowAddModal(false);
    setToast('New Zenve Pet Clinic location added to network directory!');
    setTimeout(() => setToast(''), 3500);
  }

  return (
    <DashboardLayout
      category="Clinics & Hospitals"
      subcategory="All Clinics"
      title="Outpatient Clinics Directory & Operations"
      subtitle="Complete primary care clinic network, consultation suites, lead veterinarians, diagnostics, and patient throughput"
      icon="🩺"
      badge=""
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setShowAddModal(true)}
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
            <span>+</span> Register New Clinic
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
        <KpiCard label="Outpatient Clinics" value="10 Centers" delta="+2 YoY" trend="up" subtext="Own & operated" icon="🩺" />
        <KpiCard label="Consultation Rooms" value="39 Suites" delta="+6 MTD" trend="up" subtext="Equipped with exam tables" icon="🚪" />
        <KpiCard label="Active Attending Vets" value="28 Clinicians" delta="+4 YoY" trend="up" subtext="VCI registered clinicians" icon="👨‍⚕️" />
        <KpiCard label="Daily OPD Footfall" value="485 Pets" delta="+14.6%" trend="up" subtext="Canine & feline consults" icon="🐾" />
        <KpiCard label="Avg Patient Wait Time" value="8.5 Mins" delta="-4.2 mins" trend="up" subtext="Appointment slotted" icon="⏱️" />
        <KpiCard label="Total Clinics Revenue" value="₹85.40 L" delta="+18.2%" trend="up" subtext="Consults, labs & pharmacy" icon="💰" />
      </div>

      {/* Filter and Search Bar */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Search clinic name, code, city, doctor..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.2)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '12px',
                width: '260px'
              }}
            />
            <select
              value={cityFilter}
              onChange={e => setCityFilter(e.target.value)}
              style={{
                padding: '6px 10px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.2)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '12px'
              }}
            >
              <option value="ALL">All Cities</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi NCR">Delhi NCR</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Pune">Pune</option>
            </select>
            <select
              value={tierFilter}
              onChange={e => setTierFilter(e.target.value)}
              style={{
                padding: '6px 10px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.2)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '12px'
              }}
            >
              <option value="ALL">All Facility Tiers</option>
              <option value="Diagnostic Care Center">Diagnostic Care Center</option>
              <option value="Specialty Outpatient">Specialty Outpatient</option>
              <option value="Primary Outpatient">Primary Outpatient</option>
            </select>
          </div>
          <span style={{ fontSize: '12px', color: '#94a3b8' }}>Showing {filtered.length} of {clinicsData.length} clinics</span>
        </div>

        {/* Clinics Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#94a3b8' }}>
                <th style={{ padding: '8px 12px' }}>Clinic Code & Name</th>
                <th style={{ padding: '8px 12px' }}>City & Address</th>
                <th style={{ padding: '8px 12px' }}>Facility Tier</th>
                <th style={{ padding: '8px 12px' }}>Suites</th>
                <th style={{ padding: '8px 12px' }}>Lead Clinician</th>
                <th style={{ padding: '8px 12px' }}>Operating Hours</th>
                <th style={{ padding: '8px 12px' }}>Daily Footfall</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Monthly Billings</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (<tr><td colSpan="8" style={{ textAlign: "center", padding: "32px", color: "var(--muted-foreground, #64748b)" }}>No clinic records found</td></tr>) : filtered.map((c, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '10px 12px' }}>
                    <div style={{ fontWeight: 600, color: '#fff' }}>{c.name}</div>
                    <div style={{ fontSize: '10px', color: '#38bdf8', fontFamily: '"IBM Plex Mono", monospace' }}>{c.code}</div>
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <div style={{ fontWeight: 600 }}>{c.city}</div>
                    <div style={{ fontSize: '10px', color: '#64748b' }}>{c.address}</div>
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{ padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 600, background: 'rgba(59,130,246,0.15)', color: '#60a5fa' }}>
                      {c.tier}
                    </span>
                  </td>
                  <td style={{ padding: '10px 12px', fontFamily: '"IBM Plex Mono", monospace' }}>
                    {c.rooms} Rooms
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <div style={{ fontWeight: 600, color: '#cbd5e1' }}>{c.leadVet}</div>
                    <div style={{ fontSize: '10px', color: '#94a3b8' }}>{c.staff} clinical staff</div>
                  </td>
                  <td style={{ padding: '10px 12px', color: '#94a3b8', fontSize: '11px' }}>{c.hours}</td>
                  <td style={{ padding: '10px 12px', fontFamily: '"IBM Plex Mono", monospace', color: '#10b981' }}>{c.footfall}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#38bdf8' }}>
                    {c.monthlyRev}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Register Clinic Modal */}
      {showAddModal && (
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
            <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: 700 }}>Register New Clinic Location</h3>
            <p style={{ margin: '0 0 16px', fontSize: '12px', color: '#94a3b8' }}>Set up physical outpatient facility, examination rooms, and operational details</p>

            <form onSubmit={handleAddClinic} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>Clinic Name</label>
                <input required type="text" placeholder="e.g. Zenve Malleshwaram Companion Clinic" style={{ width: '100%', padding: '8px', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>Metro / City</label>
                <select style={{ width: '100%', padding: '8px', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}>
                  <option>Bengaluru</option>
                  <option>Mumbai</option>
                  <option>Delhi NCR</option>
                  <option>Hyderabad</option>
                  <option>Pune</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>Facility Tier</label>
                <select style={{ width: '100%', padding: '8px', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}>
                  <option>Primary Outpatient</option>
                  <option>Diagnostic Care Center</option>
                  <option>Specialty Outpatient</option>
                </select>
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>Complete Address</label>
                <input required type="text" placeholder="Street, landmark, pincode" style={{ width: '100%', padding: '8px', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>Consultation Rooms</label>
                <input required type="number" defaultValue="3" style={{ width: '100%', padding: '8px', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>Operating Hours</label>
                <input required type="text" defaultValue="09:00 AM – 09:00 PM" style={{ width: '100%', padding: '8px', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
              </div>

              <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  style={{ padding: '8px 16px', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '8px 16px', borderRadius: '6px', background: '#3b82f6', border: 'none', color: '#fff', fontWeight: 600, cursor: 'pointer' }}
                >
                  Confirm Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
