import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function PetReport() {
  const [toast, setToast] = useState('');

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const breeds = [
    { breed: 'Golden Retriever', registered: 3420, share: '18.2%', avgAge: '3.4 yrs', vaxRate: '96.4%', commonIssues: 'Hip Dysplasia, Ear Infections', checkupsPerYr: 4.2 },
    { breed: 'Shih Tzu', registered: 2840, share: '15.1%', avgAge: '2.8 yrs', vaxRate: '95.1%', commonIssues: 'Brachycephalic Airway, Eye Ulcers', checkupsPerYr: 4.8 },
    { breed: 'Labrador Retriever', registered: 2650, share: '14.1%', avgAge: '4.1 yrs', vaxRate: '94.8%', commonIssues: 'Obesity, Arthritis, Atopy', checkupsPerYr: 3.9 },
    { breed: 'Persian Cat', registered: 2190, share: '11.6%', avgAge: '2.5 yrs', vaxRate: '93.2%', commonIssues: 'Hairballs, Polycystic Kidney', checkupsPerYr: 3.6 },
    { breed: 'German Shepherd', registered: 1780, share: '9.5%', avgAge: '3.8 yrs', vaxRate: '95.8%', commonIssues: 'Degenerative Myelopathy, Skin Allergy', checkupsPerYr: 4.0 },
    { breed: 'Indie / Indian Pariah Dog', registered: 1640, share: '8.7%', avgAge: '3.1 yrs', vaxRate: '97.2%', commonIssues: 'Tick Fever, Seasonal Dermatitis', checkupsPerYr: 3.2 },
    { breed: 'French Bulldog', registered: 1280, share: '6.8%', avgAge: '2.2 yrs', vaxRate: '94.0%', commonIssues: 'BOAS, Spinal Hemivertebrae', checkupsPerYr: 5.1 },
    { breed: 'Beagle', registered: 1120, share: '6.0%', avgAge: '3.6 yrs', vaxRate: '93.6%', commonIssues: 'Intervertebral Disc, Hypothyroidism', checkupsPerYr: 3.8 },
    { breed: 'Siamese Cat', registered: 980, share: '5.2%', avgAge: '2.9 yrs', vaxRate: '92.5%', commonIssues: 'Asthma, Dental Gingivitis', checkupsPerYr: 3.4 },
    { breed: 'Pomeranian', registered: 910, share: '4.8%', avgAge: '4.5 yrs', vaxRate: '94.3%', commonIssues: 'Tracheal Collapse, Luxating Patella', checkupsPerYr: 4.1 }
  ];

  const downloadCSV = () => {
    const rows = [
      ['Breed / Species', 'Registered Pets', 'Share (%)', 'Average Age', 'Vaccination Adherence', 'Top Clinical Conditions', 'Annual Vet Visits'],
      ...breeds.map(b => [b.breed, b.registered, b.share, b.avgAge, b.vaxRate, `"${b.commonIssues}"`, b.checkupsPerYr])
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(',')).join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `zenve_pet_demographics_report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('Pet Demographics Report CSV downloaded.');
  };

  return (
    <DashboardLayout
      category="Reports & Analytics"
      subcategory="Pet Reports"
      title="Pet Demographics & Health Profile Report"
      subtitle="Species distributions, breed prevalence, vaccination adherence, and chronic condition registries across active pet patient records"
      icon="🐾"
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
          <span>📥</span> Export Pet Census CSV
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
        <KpiCard label="Total Patient Census" value="18,810 Pets" delta="+14.5%" trend="up" subtext="In electronic health records" icon="🐕" />
        <KpiCard label="Vaccination Adherence" value="94.7%" delta="+3.1%" trend="up" subtext="Automated reminder active" icon="💉" />
        <KpiCard label="Chronic Care Cohort" value="3,240 Pets" delta="+8.2%" trend="up" subtext="Care protocol" icon="🩺" />
        <KpiCard label="Preventive Care Visits" value="4.1 / Year" delta="+0.4" trend="up" subtext="Includes teleconsults" icon="📋" />
      </div>

      {/* Table Section */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Breed Epidemiology & Preventive Healthcare Matrix</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)' }}>
                <th style={{ padding: '10px 12px' }}>Breed / Species Classification</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Active Registry</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Share</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Avg Age</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Vaccination Rate</th>
                <th style={{ padding: '10px 12px' }}>Prevalent Health Conditions</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Annual Visits</th>
              </tr>
            </thead>
            <tbody>
              {breeds.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '24px', textAlign: 'center', color: 'var(--muted-foreground, #94a3b8)' }}>
                    No pet demographic records found
                  </td>
                </tr>
              ) : (
                breeds.map((b) => (
                  <tr key={b.breed} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{b.breed}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{b.registered.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{b.share}</td>
                    <td style={{ padding: '12px', textAlign: 'right', color: 'var(--muted-foreground, #94a3b8)' }}>{b.avgAge}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, color: '#34d399', fontFamily: '"IBM Plex Mono", monospace' }}>{b.vaxRate}</td>
                    <td style={{ padding: '12px', color: '#93c5fd', fontSize: '11px' }}>{b.commonIssues}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{b.checkupsPerYr}</td>
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
