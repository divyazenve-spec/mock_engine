import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';
import Consultations from './Consultations';
import Appointments from './Appointments';
import Treatments from './Treatments';
import Vaccinations from './Vaccinations';
import Diagnostics from './Diagnostics';
import Procedures from './Procedures';
import ServiceRevenue from './ServiceRevenue';
import ServiceProfitability from './ServiceProfitability';

export default function ServicesDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const subdomains = [
    { id: 'overview', label: 'Services Dashboard', icon: '🩺' },
    { id: 'consultations', label: 'Consultations', icon: '👨‍⚕️' },
    { id: 'appointments', label: 'Appointments', icon: '📅' },
    { id: 'treatments', label: 'Treatments', icon: '💊' },
    { id: 'vaccinations', label: 'Vaccinations', icon: '💉' },
    { id: 'diagnostics', label: 'Diagnostics', icon: '🔬' },
    { id: 'procedures', label: 'Procedures', icon: '✂️' },
    { id: 'revenue', label: 'Service Revenue', icon: '💰' },
    { id: 'profitability', label: 'Service Profitability', icon: '📈' }
  ];

  if (activeTab === 'consultations') return <Consultations />;
  if (activeTab === 'appointments') return <Appointments />;
  if (activeTab === 'treatments') return <Treatments />;
  if (activeTab === 'vaccinations') return <Vaccinations />;
  if (activeTab === 'diagnostics') return <Diagnostics />;
  if (activeTab === 'procedures') return <Procedures />;
  if (activeTab === 'revenue') return <ServiceRevenue />;
  if (activeTab === 'profitability') return <ServiceProfitability />;

  const hospitalFloors = [
    { id: 'FLR-101', facility: 'Indiranagar Central Hospital', floor: 'Floor 3 (ICU & Critical Care)', dept: 'Canine Intensive Care Unit', capacity: 12, occupied: 10, available: 2, rate: 83.3, status: 'High Demand', lead: 'Dr. Vikramaditya Rathore', badgeType: '#d97706' },
    { id: 'FLR-102', facility: 'Indiranagar Central Hospital', floor: 'Floor 2 (Surgical Suites)', dept: 'Sterile OT 1 - 4 (Orthopedic & Soft Tissue)', capacity: 4, occupied: 3, available: 1, rate: 75.0, status: 'Active Surgeries', lead: 'Dr. Rajeshwari Swaminathan', badgeType: '#2563eb' },
    { id: 'FLR-103', facility: 'Bandra Trauma Centre', floor: 'Level 1 (Emergency Wing)', dept: 'Trauma Resuscitation & Crash Bays', capacity: 8, occupied: 7, available: 1, rate: 87.5, status: 'High Demand', lead: 'Dr. Maya Chandran', badgeType: '#d97706' },
    { id: 'FLR-104', facility: 'Bandra Trauma Centre', floor: 'Level 2 (Inpatient Recovery)', dept: 'Post-Op High Dependency Unit (HDU)', capacity: 16, occupied: 13, available: 3, rate: 81.3, status: 'Optimal Load', lead: 'Dr. Sneha Nair', badgeType: '#16a34a' },
    { id: 'FLR-105', facility: 'DLF CyberCity Multispecialty', floor: 'Floor 1 (Outpatient OPD)', dept: 'Specialist Consultation Suites', capacity: 10, occupied: 9, available: 1, rate: 90.0, status: 'Peak OPD Hours', lead: 'Dr. Anirudh Sen', badgeType: '#2563eb' },
    { id: 'FLR-106', facility: 'DLF CyberCity Multispecialty', floor: 'Ground Floor (Advanced Imaging)', dept: 'CT Scanner, Echocardiography & Digital DR', capacity: 4, occupied: 4, available: 0, rate: 100.0, status: 'Fully Booked', lead: 'Dr. Siddharth Verma', badgeType: '#7c3aed' },
    { id: 'FLR-107', facility: 'Jubilee Hills Center', floor: 'Floor 2 (Specialty Care)', dept: 'Chemotherapy & Oncology Infusion Ward', capacity: 6, occupied: 4, available: 2, rate: 66.7, status: 'Optimal Load', lead: 'Dr. Rohan Kulkarni', badgeType: '#16a34a' },
    { id: 'FLR-108', facility: 'Koregaon Park Hospital', floor: 'Floor 1 (Rehabilitation)', dept: 'Physical Therapy & Hydrotherapy Pool', capacity: 8, occupied: 6, available: 2, rate: 75.0, status: 'Active Sessions', lead: 'Dr. Divya Reddy', badgeType: '#2563eb' },
    { id: 'FLR-109', facility: 'Alwarpet Community Clinic', floor: 'Ground Floor (Primary Care)', dept: 'General Health & Ophthalmic Exam Rooms', capacity: 6, occupied: 4, available: 2, rate: 66.7, status: 'Available', lead: 'Dr. Karthik Sundaram', badgeType: '#16a34a' },
    { id: 'FLR-110', facility: 'Koramangala Care Clinic', floor: 'Ground Floor (Preventive Bay)', dept: 'Immunization, Microchipping & Triage', capacity: 5, occupied: 3, available: 2, rate: 60.0, status: 'Available', lead: 'Dr. Gaurav Sharma', badgeType: '#16a34a' }
  ];

  const cardStyle = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Veterinary Services"
      subcategory="Services Dashboard"
      title="Veterinary Clinical Operations & Healthcare Control Center"
      subtitle="Executive command center orchestrating outpatient consults, emergency triage, surgeries, laboratory pathology, and clinical unit economics"
      icon="🩺"
      badge="All 6 Clinical Hubs Live & Accredited"
      actions={
        <button
          onClick={() => alert('New Clinical Encounter launched...')}
          style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #059669', background: 'rgba(5,150,105,0.12)', color: '#065f46', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
        >
          + New Clinical Admission
        </button>
      }
    >
      {/* Subcategory Chip Navigator */}
      <div style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '8px',
        marginBottom: '16px',
        borderBottom: '1px solid #e2e8f0'
      }}>
        {subdomains.map(s => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActiveTab(s.id)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: activeTab === s.id ? 700 : 500,
              background: activeTab === s.id ? '#059669' : '#ffffff',
              color: activeTab === s.id ? '#ffffff' : '#475569',
              border: activeTab === s.id ? '1px solid #059669' : '1px solid #e2e8f0',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              boxShadow: activeTab === s.id ? '0 2px 4px rgba(5,150,105,0.2)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <span>{s.icon}</span>
            <span>{s.label}</span>
          </button>
        ))}
      </div>

      {/* KPI Highlights */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Clinical Revenue (MTD)" value="₹1.48 Cr" delta="+18.4% MoM" trend="up" subtext="Across 6 surgical hubs" icon="💰" />
        <KpiCard label="Completed Consults" value="1,842 Cases" delta="+12.6% YoY" trend="up" subtext="In-clinic, video & home visits" icon="🩺" />
        <KpiCard label="Surgical Procedures" value="284 Surgeries" delta="100% Sterility" trend="up" subtext="Orthopedic, soft tissue, laparoscopy" icon="✂️" />
        <KpiCard label="Clinical Profit Margin" value="44.8%" delta="+2.3% YoY" trend="up" subtext="High margin surgical core" icon="📈" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '16px' }}>
        {/* Live Hospital Floor Status & Capacity Column */}
        <div style={cardStyle}>
          <div style={{ paddingBottom: '16px', borderBottom: '1px solid #e2e8f0' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Live Hospital Floor Status & Capacity</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Real-time patient intake and facility load across all 6 clinical hospitals</p>
          </div>
          <div style={{ paddingTop: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>OUTPATIENT CLINICS</div>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: '4px 0' }}>48 Patients</div>
                <div style={{ fontSize: '11px', color: '#16a34a', fontWeight: 600 }}>● 18 Vets On Duty</div>
              </div>
              <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>STERILE OPERATION THEATER</div>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: '4px 0' }}>6 Theaters Active</div>
                <div style={{ fontSize: '11px', color: '#2563eb', fontWeight: 600 }}>● 14 Surgeries Today</div>
              </div>
              <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>INPATIENT & ICU WARDS</div>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: '4px 0' }}>26 Beds Occupied</div>
                <div style={{ fontSize: '11px', color: '#ea580c', fontWeight: 600 }}>● 81.2% Ward Occupancy</div>
              </div>
              <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>PATHOLOGY & LAB DIAGNOSTICS</div>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: '4px 0' }}>384 Tests MTD</div>
                <div style={{ fontSize: '11px', color: '#059669', fontWeight: 600 }}>● 28m Avg Turnaround</div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>HOSPITAL FACILITY OCCUPANCY SNAPSHOT</span>
                <span style={{ fontSize: '11px', color: '#059669', fontWeight: 600 }}>● Live Telemetry</span>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', textAlign: 'left' }}>
                      <th style={{ padding: '6px 8px', color: '#64748b', fontWeight: 600 }}>Facility & Wing</th>
                      <th style={{ padding: '6px 8px', color: '#64748b', fontWeight: 600, textAlign: 'center' }}>Beds</th>
                      <th style={{ padding: '6px 8px', color: '#64748b', fontWeight: 600, textAlign: 'center' }}>Occ.</th>
                      <th style={{ padding: '6px 8px', color: '#64748b', fontWeight: 600 }}>Rate</th>
                      <th style={{ padding: '6px 8px', color: '#64748b', fontWeight: 600 }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hospitalFloors.slice(0, 5).map(f => (
                      <tr key={f.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '8px', fontWeight: 600, color: '#0f172a' }}>
                          {f.facility}
                          <div style={{ fontSize: '11px', color: '#64748b' }}>{f.floor}</div>
                        </td>
                        <td style={{ padding: '8px', fontFamily: 'monospace', fontWeight: 700, textAlign: 'center' }}>{f.capacity}</td>
                        <td style={{ padding: '8px', fontFamily: 'monospace', fontWeight: 700, color: '#0f172a', textAlign: 'center' }}>{f.occupied}</td>
                        <td style={{ padding: '8px', fontWeight: 700, color: f.rate > 85 ? '#dc2626' : f.rate > 75 ? '#d97706' : '#16a34a' }}>{f.rate}%</td>
                        <td style={{ padding: '8px' }}>
                          <span style={{ padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 600, background: 'rgba(5,150,105,0.1)', color: f.badgeType }}>
                            {f.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Launchpad to All Subdomains */}
        <div style={cardStyle}>
          <div style={{ paddingBottom: '16px', borderBottom: '1px solid #e2e8f0' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Veterinary Subdomains Directory</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Dedicated subcategory consoles for clinical departments</p>
          </div>
          <div style={{ paddingTop: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {subdomains.slice(1).map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#1e293b',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#059669'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; }}
              >
                <span style={{ fontSize: '16px' }}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Comprehensive Live Hospital Floor Status & Capacity Roster Table */}
      <div style={cardStyle}>
        <div style={{ marginBottom: '18px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Live Hospital Floor Status & Capacity Roster</h3>
          <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Real-time facility capacity, bed occupancy, ICU readiness, and department charge leads across all 6 hospitals</p>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border, #e2e8f0)', background: 'var(--muted, #f8fafc)' }}>
                <th style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--muted-foreground, #64748b)' }}>Floor ID</th>
                <th style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--muted-foreground, #64748b)' }}>Hospital Facility</th>
                <th style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--muted-foreground, #64748b)' }}>Floor & Wing</th>
                <th style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--muted-foreground, #64748b)' }}>Department / Specialty</th>
                <th style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--muted-foreground, #64748b)', textAlign: 'center' }}>Total Capacity</th>
                <th style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--muted-foreground, #64748b)', textAlign: 'center' }}>Occupied</th>
                <th style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--muted-foreground, #64748b)', textAlign: 'center' }}>Available</th>
                <th style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--muted-foreground, #64748b)' }}>Occupancy %</th>
                <th style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--muted-foreground, #64748b)' }}>Clinical In-Charge</th>
                <th style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--muted-foreground, #64748b)' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {hospitalFloors.map(f => (
                <tr key={f.id} style={{ borderBottom: '1px solid var(--border, #e2e8f0)', transition: 'background 0.15s' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: '#2563eb', fontFamily: 'monospace' }}>{f.id}</td>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>{f.facility}</td>
                  <td style={{ padding: '12px 14px', fontWeight: 600, color: '#475569' }}>{f.floor}</td>
                  <td style={{ padding: '12px 14px', color: 'var(--foreground, #0f172a)' }}>{f.dept}</td>
                  <td style={{ padding: '12px 14px', fontFamily: 'monospace', fontWeight: 700, textAlign: 'center' }}>{f.capacity} Units</td>
                  <td style={{ padding: '12px 14px', fontFamily: 'monospace', fontWeight: 700, color: 'var(--foreground, #0f172a)', textAlign: 'center' }}>{f.occupied}</td>
                  <td style={{ padding: '12px 14px', fontFamily: 'monospace', fontWeight: 700, color: '#16a34a', textAlign: 'center' }}>{f.available}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ flex: 1, background: '#e2e8f0', borderRadius: '4px', height: '6px', overflow: 'hidden', minWidth: '60px' }}>
                        <div style={{ background: f.rate > 85 ? '#ef4444' : f.rate > 75 ? '#f59e0b' : '#10b981', width: `${f.rate}%`, height: '100%' }}></div>
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: 700, minWidth: '40px' }}>{f.rate}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 14px', fontWeight: 600, color: 'var(--foreground, #0f172a)' }}>{f.lead}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: f.badgeType === '#d97706' ? 'rgba(217,119,6,0.1)' : f.badgeType === '#16a34a' ? 'rgba(22,163,74,0.1)' : 'rgba(37,99,235,0.1)',
                      color: f.badgeType
                    }}>
                      {f.status}
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