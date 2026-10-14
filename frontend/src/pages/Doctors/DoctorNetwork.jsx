import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function DoctorNetwork() {
  const centers = [
    { name: 'Zenve Indiranagar Central Hospital', location: 'Bengaluru, KA', doctors: '12 Senior Doctors', specialties: 'Orthopedics, Trauma, Ophthalmology, ICU', ots: '3 Modular OTs', beds: '28 Inpatient Beds (6 ICU)', capacity: '1,200 Pets / Mo' },
    { name: 'Zenve Bandra West Trauma Centre', location: 'Mumbai, MH', doctors: '10 Senior Doctors', specialties: 'Emergency, Critical Care, Feline Medicine, Surgery', ots: '2 Modular OTs', beds: '24 Inpatient Beds (5 ICU)', capacity: '1,050 Pets / Mo' },
    { name: 'Zenve DLF CyberCity Critical Care', location: 'Delhi NCR', doctors: '14 Senior Doctors', specialties: 'Cardiology, Neurosurgery, Critical Care, Oncology', ots: '3 Modular OTs', beds: '32 Inpatient Beds (8 ICU)', capacity: '1,400 Pets / Mo' },
    { name: 'Zenve Jubilee Hills Specialty Center', location: 'Hyderabad, TS', doctors: '8 Senior Doctors', specialties: 'General Surgery, Neonatology, Critical Care', ots: '2 Modular OTs', beds: '22 Inpatient Beds (4 ICU)', capacity: '900 Pets / Mo' },
    { name: 'Zenve Koregaon Park Veterinary Hospital', location: 'Pune, MH', doctors: '7 Senior Doctors', specialties: 'Soft Tissue Surgery, Oncology, Rehabilitation', ots: '2 Modular OTs', beds: '20 Inpatient Beds (4 ICU)', capacity: '850 Pets / Mo' },
    { name: 'Zenve Koramangala Care Clinic', location: 'Bengaluru, KA', doctors: '5 Senior Doctors', specialties: 'Primary OPD, Endoscopy, Preventive Care', ots: '1 Minor OT', beds: '6 Daycare Pods', capacity: '650 Pets / Mo' },
    { name: 'Zenve Andheri Link Rd Clinic', location: 'Mumbai, MH', doctors: '4 Senior Doctors', specialties: 'Dermatology, Internal Medicine, Minor Procedures', ots: '1 Minor OT', beds: '8 Daycare Pods', capacity: '580 Pets / Mo' },
    { name: 'Zenve Saket Pet Wellness & Diagnostics', location: 'Delhi NCR', doctors: '4 Senior Doctors', specialties: 'Pediatric Health, Routine Vaccinations, Ultrasound', ots: '1 Minor OT', beds: '6 Daycare Pods', capacity: '540 Pets / Mo' },
    { name: 'Zenve Anna Nagar Care Clinic', location: 'Chennai, TN', doctors: '4 Senior Doctors', specialties: 'Primary Healthcare, Dental Prophylaxis, Lab', ots: '1 Minor OT', beds: '6 Daycare Pods', capacity: '510 Pets / Mo' },
    { name: 'Zenve Salt Lake City Polyclinic', location: 'Kolkata, WB', doctors: '4 Senior Doctors', specialties: 'General OPD, Geriatric Care, Clinical Lab', ots: '1 Minor OT', beds: '6 Daycare Pods', capacity: '480 Pets / Mo' }
  ];

  const cardStyle = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Doctors"
      subcategory="Clinical Infrastructure"
      title="Doctor Network & Hospital Affiliations"
      subtitle="Hospital clinical staffing, specialty distribution across network centers, physician rotas, and referral flows"
      icon="🌐"
      badge="10 Hospital Centers"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Affiliated Hospital Hubs" value="10 Centers" delta="5 Hosp + 5 Clin" trend="up" subtext="Key metropolitan coverage" icon="🏥" />
        <KpiCard label="Total Medical Staff" value="148 Staff" delta="+18 YoY" trend="up" subtext="Doctors, nurses & techs" icon="👨‍⚕️" />
        <KpiCard label="Inter-Hospital Referrals" value="184 Referrals" delta="+24.0%" trend="up" subtext="Specialty cross-referrals" icon="🔄" />
        <KpiCard label="Network Bed Utilization" value="82.5%" delta="+6.2%" trend="up" subtext="Emergency surge ready" icon="🛏️" />
      </div>

      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>🌐 Hospital Network Staffing & Facility Profile</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border, #e2e8f0)', textAlign: 'left', color: 'var(--muted-foreground, #475569)' }}>
                <th style={{ padding: '10px' }}>Hospital Center</th>
                <th style={{ padding: '10px' }}>Location</th>
                <th style={{ padding: '10px' }}>Senior Doctors</th>
                <th style={{ padding: '10px' }}>Specialty Wings</th>
                <th style={{ padding: '10px' }}>Operating Theaters</th>
                <th style={{ padding: '10px' }}>Inpatient Beds</th>
                <th style={{ padding: '10px' }}>Monthly Patient Capacity</th>
              </tr>
            </thead>
            <tbody>
              {centers.map((c, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{c.name}</td>
                  <td style={{ padding: '10px', color: '#64748b' }}>{c.location}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{c.doctors}</td>
                  <td style={{ padding: '10px' }}>{c.specialties}</td>
                  <td style={{ padding: '10px' }}>{c.ots}</td>
                  <td style={{ padding: '10px' }}>{c.beds}</td>
                  <td style={{ padding: '10px', fontWeight: 600, color: '#059669' }}>{c.capacity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
