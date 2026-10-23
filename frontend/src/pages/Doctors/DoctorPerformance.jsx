import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function DoctorPerformance() {
  const performanceRoster = [
    { name: 'Dr. Rajeshwari Swaminathan', spec: 'Orthopedic Surgery & TPLO', consultTarget: 130, consultActual: 142, attainment: '109.2%', nps: '94.2', waitTime: '5.2 mins', success: '99.6%', grade: 'A+' },
    { name: 'Dr. Vikramaditya Rathore', spec: 'Emergency & Critical Care', consultTarget: 125, consultActual: 138, attainment: '110.4%', nps: '92.8', waitTime: '4.8 mins', success: '99.2%', grade: 'A+' },
    { name: 'Dr. Pooja Mehta', spec: 'Feline Medicine & Nephrology', consultTarget: 140, consultActual: 156, attainment: '111.4%', nps: '96.5', waitTime: '6.1 mins', success: '100.0%', grade: 'A+' },
    { name: 'Dr. Anirudh Sen', spec: 'General Surgery & Laparoscopy', consultTarget: 135, consultActual: 148, attainment: '109.6%', nps: '90.4', waitTime: '5.9 mins', success: '99.1%', grade: 'A+' },
    { name: 'Dr. Siddharth Verma', spec: 'Cardiology & Echocardiography', consultTarget: 115, consultActual: 124, attainment: '107.8%', nps: '93.6', waitTime: '6.8 mins', success: '99.5%', grade: 'A+' },
    { name: 'Dr. Rohan Kulkarni', spec: 'Surgical Oncology & Soft Tissue', consultTarget: 110, consultActual: 118, attainment: '107.3%', nps: '89.9', waitTime: '7.1 mins', success: '98.9%', grade: 'A' },
    { name: 'Dr. Gaurav Sharma', spec: 'Spine Neurosurgery & Trauma', consultTarget: 120, consultActual: 132, attainment: '110.0%', nps: '91.5', waitTime: '5.5 mins', success: '99.3%', grade: 'A+' },
    { name: 'Dr. Sneha Nair', spec: 'Ophthalmology & Microsurgery', consultTarget: 115, consultActual: 126, attainment: '109.5%', nps: '93.1', waitTime: '6.0 mins', success: '99.5%', grade: 'A+' },
    { name: 'Dr. Edwin Reddy', spec: 'Critical Care & Neonatology', consultTarget: 125, consultActual: 140, attainment: '112.0%', nps: '92.4', waitTime: '5.1 mins', success: '99.0%', grade: 'A+' },
    { name: 'Dr. Maya Chandran', spec: 'Gastroenterology & Endoscopy', consultTarget: 135, consultActual: 152, attainment: '112.6%', nps: '94.8', waitTime: '5.6 mins', success: '99.4%', grade: 'A+' }
  ];

  const cardStyle = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Doctors"
      subcategory="Clinical Performance"
      title="Doctor Clinical Performance & Quota Attainment"
      subtitle="Physician consultation benchmarks, Net Promoter Scores (NPS), patient wait times, and clinical outcomes"
      icon="⭐"
      badge="108.4% Quota"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Overall Quota Attainment" value="108.4%" delta="+8.4%" trend="up" subtext="All practitioners above goal" icon="🎯" />
        <KpiCard label="Clinical Net Promoter Score" value="91.8 NPS" delta="+4.2%" trend="up" subtext="1,840 verified surveys" icon="⭐" />
        <KpiCard label="Avg. Consultation Wait Time" value="6.2 mins" delta="-2.1 mins" trend="up" subtext="Strict appointment pacing" icon="⏱️" />
        <KpiCard label="Overall Surgical Success" value="99.4%" delta="+0.3%" trend="up" subtext="NABH protocol compliant" icon="🛡️" />
      </div>

      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>⭐ Physician Performance Scorecard & Quality Index</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border, #e2e8f0)', textAlign: 'left', color: 'var(--muted-foreground, #475569)' }}>
                <th style={{ padding: '10px' }}>Doctor Name</th>
                <th style={{ padding: '10px' }}>Specialty</th>
                <th style={{ padding: '10px' }}>Monthly Target</th>
                <th style={{ padding: '10px' }}>Completed Consults</th>
                <th style={{ padding: '10px' }}>Attainment %</th>
                <th style={{ padding: '10px' }}>Patient NPS</th>
                <th style={{ padding: '10px' }}>Avg Wait Time</th>
                <th style={{ padding: '10px' }}>Surgical Success</th>
                <th style={{ padding: '10px' }}>Clinical Grade</th>
              </tr>
            </thead>
            <tbody>
              {performanceRoster.map((p, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{p.name}</td>
                  <td style={{ padding: '10px', color: '#64748b' }}>{p.spec}</td>
                  <td style={{ padding: '10px' }}>{p.consultTarget} consults</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{p.consultActual} consults</td>
                  <td style={{ padding: '10px', color: '#059669', fontWeight: 700 }}>{p.attainment}</td>
                  <td style={{ padding: '10px', color: '#d97706', fontWeight: 600 }}>★ {p.nps}</td>
                  <td style={{ padding: '10px' }}>{p.waitTime}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{p.success}</td>
                  <td style={{ padding: '10px' }}>
                    <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, background: 'rgba(16,185,129,0.12)', color: '#047857' }}>
                      {p.grade}
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
