import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function DoctorRevenue() {
  const revStreams = [
    { doctor: 'Dr. Rajeshwari Swaminathan', spec: 'Orthopedics & Surgery', consultsRev: '₹2.84 L', procRev: '₹11.20 L', medsRev: '₹4.36 L', totalRev: '₹18.40 L', margin: '68%', share: '15.6%' },
    { doctor: 'Dr. Vikramaditya Rathore', spec: 'Trauma & Critical Care', consultsRev: '₹2.48 L', procRev: '₹10.60 L', medsRev: '₹3.82 L', totalRev: '₹16.90 L', margin: '66%', share: '14.3%' },
    { doctor: 'Dr. Pooja Mehta', spec: 'Feline Medicine', consultsRev: '₹3.12 L', procRev: '₹6.85 L', medsRev: '₹4.28 L', totalRev: '₹14.25 L', margin: '71%', share: '12.1%' },
    { doctor: 'Dr. Anirudh Sen', spec: 'General Surgery', consultsRev: '₹2.66 L', procRev: '₹9.14 L', medsRev: '₹3.30 L', totalRev: '₹15.10 L', margin: '69%', share: '12.8%' },
    { doctor: 'Dr. Siddharth Verma', spec: 'Cardiology', consultsRev: '₹2.72 L', procRev: '₹7.88 L', medsRev: '₹3.20 L', totalRev: '₹13.80 L', margin: '73%', share: '11.7%' },
    { doctor: 'Dr. Rohan Kulkarni', spec: 'Surgical Oncology', consultsRev: '₹2.12 L', procRev: '₹7.96 L', medsRev: '₹2.52 L', totalRev: '₹12.60 L', margin: '67%', share: '10.7%' },
    { doctor: 'Dr. Gaurav Sharma', spec: 'Spine Neurosurgery', consultsRev: '₹2.38 L', procRev: '₹8.44 L', medsRev: '₹2.58 L', totalRev: '₹13.40 L', margin: '70%', share: '11.4%' },
    { doctor: 'Dr. Sneha Nair', spec: 'Ophthalmology', consultsRev: '₹2.27 L', procRev: '₹6.18 L', medsRev: '₹2.45 L', totalRev: '₹10.90 L', margin: '74%', share: '9.2%' },
    { doctor: 'Dr. Edwin Reddy', spec: 'Critical Care', consultsRev: '₹2.52 L', procRev: '₹6.45 L', medsRev: '₹2.88 L', totalRev: '₹11.85 L', margin: '68%', share: '10.0%' },
    { doctor: 'Dr. Maya Chandran', spec: 'Gastroenterology', consultsRev: '₹2.74 L', procRev: '₹7.82 L', medsRev: '₹3.04 L', totalRev: '₹13.60 L', margin: '72%', share: '11.5%' }
  ];

  const cardStyle = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Doctors"
      subcategory="Financial Attribution"
      title="Doctor Revenue & Financial Attribution"
      subtitle="Comprehensive revenue breakdowns by consultation fees, clinical procedures, surgical billings, and pharmacy write-ups"
      icon="💰"
      badge="₹1.18 Cr Total Revenue"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Doctor Billed Revenue" value="₹1.18 Cr" delta="+18.5%" trend="up" subtext="Direct physician billing" icon="💰" />
        <KpiCard label="Procedure Billings" value="₹54.80 L" delta="+22.4%" trend="up" subtext="Surgeries & diagnostics" icon="🩺" />
        <KpiCard label="Consultation Fees" value="₹38.25 L" delta="+12.8%" trend="up" subtext="Outpatient OPD fee" icon="📋" />
        <KpiCard label="Pharmacy & Rx Uplift" value="₹25.40 L" delta="+16.1%" trend="up" subtext="Prescriptions filled in-house" icon="💊" />
      </div>

      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>💰 Clinician Revenue Matrix & Departmental Contribution</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border, #e2e8f0)', textAlign: 'left', color: 'var(--muted-foreground, #475569)' }}>
                <th style={{ padding: '10px' }}>Doctor Name</th>
                <th style={{ padding: '10px' }}>Department</th>
                <th style={{ padding: '10px' }}>Consult Fees</th>
                <th style={{ padding: '10px' }}>Procedures & Surgery</th>
                <th style={{ padding: '10px' }}>Rx Medicines</th>
                <th style={{ padding: '10px' }}>Total Attributed</th>
                <th style={{ padding: '10px' }}>Operating Margin</th>
                <th style={{ padding: '10px' }}>Revenue Share</th>
              </tr>
            </thead>
            <tbody>
              {revStreams.map((r, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{r.doctor}</td>
                  <td style={{ padding: '10px', color: '#64748b' }}>{r.spec}</td>
                  <td style={{ padding: '10px' }}>{r.consultsRev}</td>
                  <td style={{ padding: '10px' }}>{r.procRev}</td>
                  <td style={{ padding: '10px' }}>{r.medsRev}</td>
                  <td style={{ padding: '10px', fontWeight: 700, color: '#059669' }}>{r.totalRev}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{r.margin}</td>
                  <td style={{ padding: '10px', color: '#4f46e5', fontWeight: 600 }}>{r.share}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
