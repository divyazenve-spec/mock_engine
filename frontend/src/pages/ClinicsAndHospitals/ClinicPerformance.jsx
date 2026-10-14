import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ClinicPerformance() {
  const [selectedSort, setSelectedSort] = useState('csat');

    const performanceMetrics = [
    { name: 'Zenve Indiranagar Central Hospital', city: 'Bengaluru', opd: 580, surgeries: 48, waitTime: '7.5 Mins', bedOcc: '82%', readmission: '0.6%', csat: 4.98, revPerDoc: '₹7.10 L' },
    { name: 'Zenve Bandra West Trauma Centre', city: 'Mumbai', opd: 540, surgeries: 44, waitTime: '8.0 Mins', bedOcc: '83%', readmission: '0.8%', csat: 4.96, revPerDoc: '₹6.80 L' },
    { name: 'Zenve DLF CyberCity Critical Care', city: 'Delhi NCR', opd: 620, surgeries: 52, waitTime: '9.0 Mins', bedOcc: '81%', readmission: '0.7%', csat: 4.95, revPerDoc: '₹7.80 L' },
    { name: 'Zenve Jubilee Hills Specialty Center', city: 'Hyderabad', opd: 490, surgeries: 38, waitTime: '8.5 Mins', bedOcc: '82%', readmission: '0.9%', csat: 4.97, revPerDoc: '₹6.40 L' },
    { name: 'Zenve Koregaon Park Hospital', city: 'Pune', opd: 450, surgeries: 32, waitTime: '8.0 Mins', bedOcc: '80%', readmission: '0.8%', csat: 4.92, revPerDoc: '₹5.90 L' },
    { name: 'Zenve Koramangala Care Clinic', city: 'Bengaluru', opd: 410, surgeries: 14, waitTime: '6.5 Mins', bedOcc: '75%', readmission: '0.4%', csat: 4.94, revPerDoc: '₹4.70 L' },
    { name: 'Zenve Andheri Link Rd Clinic', city: 'Mumbai', opd: 430, surgeries: 16, waitTime: '7.0 Mins', bedOcc: '78%', readmission: '0.5%', csat: 4.93, revPerDoc: '₹5.10 L' },
    { name: 'Zenve Saket Pet Wellness', city: 'Delhi NCR', opd: 380, surgeries: 12, waitTime: '8.0 Mins', bedOcc: '72%', readmission: '0.6%', csat: 4.91, revPerDoc: '₹4.40 L' },
    { name: 'Zenve Gachibowli Daycare', city: 'Hyderabad', opd: 390, surgeries: 15, waitTime: '7.5 Mins', bedOcc: '74%', readmission: '0.5%', csat: 4.96, revPerDoc: '₹4.60 L' },
    { name: 'Zenve Alwarpet Community Clinic', city: 'Chennai', opd: 340, surgeries: 10, waitTime: '6.0 Mins', bedOcc: '70%', readmission: '0.4%', csat: 4.95, revPerDoc: '₹4.20 L' }
  ];

  const sortedData = [...performanceMetrics].sort((a, b) => {
    if (selectedSort === 'csat') return b.csat - a.csat;
    if (selectedSort === 'opd') return b.opd - a.opd;
    if (selectedSort === 'surgeries') return b.surgeries - a.surgeries;
    return 0;
  });

  return (
    <DashboardLayout
      category="Clinics & Hospitals"
      subcategory="Clinic Performance"
      title="Clinical Performance & Operational Efficiency"
      subtitle="OPD patient throughput, wait time benchmarking, surgical outcomes, bed turnover, and pet parent satisfaction (CSAT)"
      icon="📈"
      badge=""
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => alert('Exporting full Clinical Audit & Quality Assurance dossier (NABH/VCI standards)...')}
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
            <span>📄</span> Export Clinical QA Dossier
          </button>
        </div>
      }
    >
            {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Average OPD Wait Time" value="7.8 Mins" delta="-3.4 mins" trend="up" subtext="From check-in to consultation" icon="⏱️" />
        <KpiCard label="Surgical Success Rate" value="99.2%" delta="+0.5%" trend="up" subtext="Zero intra-op fatalities" icon="🔪" />
        <KpiCard label="Patient CSAT Score" value="4.95 ★" delta="+0.04 NPS" trend="up" subtext="4,200+ verified ratings" icon="⭐" />
        <KpiCard label="30-Day Readmission Rate" value="0.62%" delta="-0.2%" trend="up" subtext="Post-surgical recovery" icon="🔄" />
        <KpiCard label="Diagnostic Turnaround" value="22 Mins" delta="-6 mins" trend="up" subtext="Blood & imaging reports" icon="🔬" />
        <KpiCard label="Daily OPD Throughput" value="485 Pets" delta="+14.6%" trend="up" subtext="Across 10 facilities" icon="🐾" />
      </div>

      {/* Benchmarking Table */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Facility Efficiency & Clinical Quality Scorecard</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#94a3b8' }}>Comprehensive operational benchmarking across all network locations</p>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <span style={{ fontSize: '12px', color: '#94a3b8', alignSelf: 'center', marginRight: '4px' }}>Sort by:</span>
            {[
              { id: 'csat', label: 'CSAT Rating' },
              { id: 'opd', label: 'OPD Volume' },
              { id: 'surgeries', label: 'Surgeries' }
            ].map(s => (
              <button
                key={s.id}
                onClick={() => setSelectedSort(s.id)}
                style={{
                  padding: '5px 10px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: selectedSort === s.id ? 'rgba(59,130,246,0.25)' : 'rgba(255,255,255,0.05)',
                  color: selectedSort === s.id ? '#60a5fa' : '#94a3b8'
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#94a3b8' }}>
                <th style={{ padding: '8px 12px' }}>Facility</th>
                <th style={{ padding: '8px 12px' }}>City</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>OPD (Mo)</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Surgeries</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Avg Wait Time</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Bed Occupancy</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Readmission</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>CSAT Rating</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Rev / Doctor</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.length === 0 ? (<tr><td colSpan="9" style={{ textAlign: "center", padding: "32px", color: "var(--muted-foreground, #64748b)" }}>No clinical performance records found</td></tr>) : sortedData.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 600, color: '#fff' }}>{row.name}</td>
                  <td style={{ padding: '10px 12px', color: '#94a3b8' }}>{row.city}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600 }}>{row.opd}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#38bdf8' }}>{row.surgeries}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#10b981' }}>{row.waitTime}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{row.bedOcc}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#34d399' }}>{row.readmission}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#fbbf24' }}>
                    ⭐ {row.csat}
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#10b981' }}>
                    {row.revPerDoc}
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
