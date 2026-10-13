import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function RevenueByEmployee() {
  const employees = [
    { name: 'Dr. Priya Sharma', dept: 'Veterinary Surgery', role: 'Chief Lead Surgeon', target: '₹7,10,000', rev: '₹8,42,000', attain: '118.6%', rating: '4.95' },
    { name: 'Karthik Sundaram', dept: 'Clinical Operations', role: 'Senior Care Manager', target: '₹5,50,000', rev: '₹6,18,000', attain: '112.4%', rating: '4.88' },
    { name: 'Dr. Rajesh Nair', dept: 'Veterinary Medicine', role: 'Senior Internist', target: '₹5,80,000', rev: '₹6,45,000', attain: '111.2%', rating: '4.92' },
    { name: 'Ananya Sen', dept: 'Pet Nutrition & Diet', role: 'Lead Nutritionist', target: '₹4,20,000', rev: '₹4,65,000', attain: '110.7%', rating: '4.86' },
    { name: 'Dr. Shalini Verma', dept: 'Dermatology & Allergy', role: 'Senior Dermatologist', target: '₹4,80,000', rev: '₹5,25,000', attain: '109.4%', rating: '4.91' },
    { name: 'Vivek Joshi', dept: 'Teleconsultation', role: 'Care Lead Coordinator', target: '₹3,60,000', rev: '₹3,92,000', attain: '108.9%', rating: '4.82' },
    { name: 'Dr. Arun Kulkarni', dept: 'Dental & Ortho', role: 'Veterinary Dentist', target: '₹4,50,000', rev: '₹4,82,000', attain: '107.1%', rating: '4.89' },
    { name: 'Sneha Pillai', dept: 'Diagnostics & Labs', role: 'Pathology Lead', target: '₹3,80,000', rev: '₹3,98,000', attain: '104.7%', rating: '4.85' },
    { name: 'Rohan Mehta', dept: 'Rapid Pharmacy', role: 'Fulfillment Operations', target: '₹4,40,000', rev: '₹4,52,000', attain: '102.7%', rating: '4.79' },
    { name: 'Meenakshi Rao', dept: 'Wellness & Grooming', role: 'Spa & Wellness Director', target: '₹4,10,000', rev: '₹3,99,000', attain: '97.3%', rating: '4.75' }
  ];

  return (
    <DashboardLayout
      category="Revenue & Sales"
      subcategory="Revenue by Employee"
      title="Staff Performance & Quota Attainment"
      subtitle="Care coordinators, operational leads, and clinic staff quota benchmarks"
      icon="👨‍💼"
      badge="Staff Leaderboard"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <KpiCard label="Top Staff Producer" value="Dr. Priya Sharma" delta="₹8,42,000 billings" trend="up" subtext="118.6% quota" icon="⭐" />
        <KpiCard label="Team Attainment Rate" value="108.3%" delta="+8.3% surplus" trend="up" subtext="Average achievement" icon="👥" />
        <KpiCard label="Total Staff Quota" value="₹47,80,000" delta="10 members" trend="neutral" subtext="Period baseline" icon="🎯" />
        <KpiCard label="Total Realized" value="₹52,18,000" delta="+₹4,38,000 surplus" trend="up" subtext="Net revenue" icon="💰" />
      </div>

      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px 24px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Employee Performance Matrix</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)', fontSize: '11px' }}>
                <th style={{ padding: '10px 14px 10px 16px', verticalAlign: 'middle' }}>Staff Name</th>
                <th style={{ padding: '10px 14px', verticalAlign: 'middle' }}>Department</th>
                <th style={{ padding: '10px 14px', verticalAlign: 'middle' }}>Role</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', verticalAlign: 'middle' }}>Target</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', verticalAlign: 'middle' }}>Realized Billings</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', verticalAlign: 'middle' }}>Attainment</th>
                <th style={{ padding: '10px 16px 10px 14px', textAlign: 'right', verticalAlign: 'middle' }}>Satisfaction</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((e) => (
                <tr key={e.name} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                  <td style={{ padding: '12px 14px 12px 16px', fontWeight: 700, verticalAlign: 'middle' }}>{e.name}</td>
                  <td style={{ padding: '12px 14px', color: 'var(--muted-foreground, #94a3b8)', verticalAlign: 'middle' }}>{e.dept}</td>
                  <td style={{ padding: '12px 14px', verticalAlign: 'middle' }}>{e.role}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', color: 'var(--muted-foreground, #94a3b8)', verticalAlign: 'middle' }}>{e.target}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace', verticalAlign: 'middle' }}>{e.rev}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', color: '#10b981', fontWeight: 600, verticalAlign: 'middle' }}>{e.attain}</td>
                  <td style={{ padding: '12px 16px 12px 14px', textAlign: 'right', verticalAlign: 'middle' }}>⭐ {e.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
