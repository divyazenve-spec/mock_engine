import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ClinicReport() {
  const [toast, setToast] = useState('');

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const clinics = [
    { name: 'Indiranagar Flagship Hospital & ICU', city: 'Bengaluru', beds: 36, occupancy: '92.4%', opdFootfall: 1840, labScans: 960, revenue: 3420000, margin: '54.2%' },
    { name: 'Whitefield Trauma & Surgical Hub', city: 'Bengaluru', beds: 28, occupancy: '89.1%', opdFootfall: 1420, labScans: 810, revenue: 2680000, margin: '52.0%' },
    { name: 'Koramangala Specialty Care Node', city: 'Bengaluru', beds: 22, occupancy: '86.5%', opdFootfall: 1290, labScans: 740, revenue: 2340000, margin: '51.5%' },
    { name: 'Bandra West Comprehensive Hospital', city: 'Mumbai', beds: 32, occupancy: '94.2%', opdFootfall: 1760, labScans: 920, revenue: 3580000, margin: '55.8%' },
    { name: 'Andheri West Emergency Medical Center', city: 'Mumbai', beds: 26, occupancy: '88.0%', opdFootfall: 1380, labScans: 760, revenue: 2490000, margin: '50.2%' },
    { name: 'South Delhi Animal Care Hospital', city: 'New Delhi', beds: 34, occupancy: '91.8%', opdFootfall: 1690, labScans: 890, revenue: 3260000, margin: '53.6%' },
    { name: 'Gurgaon DLF Phase 5 Surgical Pavilion', city: 'Gurgaon', beds: 24, occupancy: '87.4%', opdFootfall: 1250, labScans: 690, revenue: 2280000, margin: '49.8%' },
    { name: 'Kondapur Multispecialty Center', city: 'Hyderabad', beds: 20, occupancy: '84.6%', opdFootfall: 1180, labScans: 620, revenue: 1980000, margin: '48.5%' },
    { name: 'Banjara Hills Pet Wellness Center', city: 'Hyderabad', beds: 18, occupancy: '82.0%', opdFootfall: 1040, labScans: 580, revenue: 1760000, margin: '47.2%' },
    { name: 'Koregaon Park Veterinary Center', city: 'Pune', beds: 16, occupancy: '80.5%', opdFootfall: 980, labScans: 510, revenue: 1620000, margin: '46.4%' }
  ];

  const inr = (n) => '₹' + Number(n).toLocaleString('en-IN');

  const downloadCSV = () => {
    const rows = [
      ['Clinic / Hospital Facility', 'Metro City', 'Total Inpatient Beds', 'Bed Occupancy Rate', 'Monthly OPD Footfall', 'Lab Tests Conducted', 'Gross Revenue (INR)', 'Net Margin'],
      ...clinics.map(c => [c.name, c.city, c.beds, c.occupancy, c.opdFootfall, c.labScans, c.revenue, c.margin])
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(',')).join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `zenve_clinic_facility_report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('Clinic Facility Report CSV downloaded.');
  };

  return (
    <DashboardLayout
      category="Reports & Analytics"
      subcategory="Clinic Reports"
      title="Clinic Network & Hospital Facility Utilization Report"
      subtitle="Operational performance across metropolitan hospitals and surgical centers, ICU bed occupancy, OPD throughput, and clinical margins"
      icon="🏥"
      badge=""
      actions={
        <button
          onClick={downloadCSV}
          style={{
            padding: '8px 14px',
            borderRadius: '8px',
            background: 'var(--primary, #3b82f6)',
            color: '#ffffff',
            border: 'none',
            fontWeight: 600,
            fontSize: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span>📥</span> Export Clinic CSV
        </button>
      }
    >
      {toast && (
        <div style={{
          padding: '10px 16px',
          background: 'rgba(59,130,246,0.15)',
          border: '1px solid #3b82f6',
          borderRadius: '8px',
          color: '#60a5fa',
          fontSize: '13px',
          fontWeight: 600
        }}>
          ⚡ {toast}
        </div>
      )}

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Inpatient Beds" value="256 Beds" delta="+24 Beds" trend="up" subtext="10 metro centers" icon="🛏️" />
        <KpiCard label="Monthly OPD Footfall" value="13,830 Visits" delta="+16.4%" trend="up" subtext="Consultations & checkups" icon="🚶‍♂️" />
        <KpiCard label="Diagnostic Lab Scans" value="7,480 Tests" delta="+18.2%" trend="up" subtext="Diagnostic tests" icon="🔬" />
        <KpiCard label="Consolidated Clinical GMV" value="₹2,54,10,000" delta="+17.8%" trend="up" subtext="Clinical revenue" icon="💼" />
      </div>

      {/* Table Section */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Hospital Node Utilization & Revenue Contribution Matrix</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)' }}>
                <th style={{ padding: '10px 12px' }}>Facility Name</th>
                <th style={{ padding: '10px 12px' }}>Metro City</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Total Beds</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Bed Occupancy</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>OPD Footfall</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Lab Tests</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Gross Revenue</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Net Margin</th>
              </tr>
            </thead>
            <tbody>
              {clinics.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: '24px', textAlign: 'center', color: 'var(--muted-foreground, #94a3b8)' }}>
                    No clinic facility records found
                  </td>
                </tr>
              ) : (
                clinics.map((c) => (
                  <tr key={c.name} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{c.name}</td>
                    <td style={{ padding: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>{c.city}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{c.beds}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, color: '#34d399', fontFamily: '"IBM Plex Mono", monospace' }}>{c.occupancy}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{c.opdFootfall.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{c.labScans.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, color: '#34d399', fontFamily: '"IBM Plex Mono", monospace' }}>{inr(c.revenue)}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{c.margin}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
