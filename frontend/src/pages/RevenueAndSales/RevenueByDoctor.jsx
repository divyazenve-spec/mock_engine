import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function RevenueByDoctor() {
  const doctors = [
    { name: 'Dr. Edwin .', spec: 'Chief Veterinary Surgeon (BVSc & AH, MVSc)', reg: 'KVC-8492', consults: 328, rev: '₹9,84,000', aov: '₹3,000', rating: '4.96' },
    { name: 'Dr. Ananya Deshmukh', spec: 'Small Animal Internist (BVSc, MVSc Med)', reg: 'MVC-5120', consults: 294, rev: '₹8,23,200', aov: '₹2,800', rating: '4.94' },
    { name: 'Dr. Vikramaditya Rathore', spec: 'Orthopedic Veterinary Specialist (MVSc Surgery)', reg: 'DVC-3914', consults: 246, rev: '₹7,87,200', aov: '₹3,200', rating: '4.93' },
    { name: 'Dr. Shalini Mukherjee', spec: 'Canine & Feline Dermatologist (MVSc)', reg: 'WVC-7219', consults: 215, rev: '₹5,37,500', aov: '₹2,500', rating: '4.91' },
    { name: 'Dr. Rajeshwar Kulkarni', spec: 'Veterinary Cardiologist & Critical Care (MVSc)', reg: 'TVC-6042', consults: 188, rev: '₹5,64,000', aov: '₹3,000', rating: '4.95' },
    { name: 'Dr. Meera Nambiar', spec: 'Veterinary Dental Specialist (BVSc & AH)', reg: 'KVC-9311', consults: 172, rev: '₹4,12,800', aov: '₹2,400', rating: '4.89' },
    { name: 'Dr. Farhan Qureshi', spec: 'Exotic Pet & Avian Practitioner (MVSc Wildlife)', reg: 'DVC-4402', consults: 156, rev: '₹3,90,000', aov: '₹2,500', rating: '4.88' },
    { name: 'Dr. Pooja Chandrasekhar', spec: 'Animal Behavioral & Wellness Specialist (BVSc)', reg: 'TVC-8190', consults: 148, rev: '₹3,25,600', aov: '₹2,200', rating: '4.92' },
    { name: 'Dr. Siddharth Sen', spec: 'Emergency & Trauma Veterinary Lead (BVSc, MVSc)', reg: 'MVC-6744', consults: 198, rev: '₹5,94,000', aov: '₹3,000', rating: '4.90' },
    { name: 'Dr. Tanvi Venkatesh', spec: 'Preventive Medicine & Vaccination Specialist (BVSc)', reg: 'KVC-7721', consults: 195, rev: '₹3,51,000', aov: '₹1,800', rating: '4.87' }
  ];

  return (
    <DashboardLayout
      category="Revenue & Sales"
      subcategory="Revenue by Doctor"
      title="Veterinary Practitioners & Clinical Billings"
      subtitle="Doctor consultations, medical procedure billings, and practitioner ratings"
      icon="🩺"
      badge="Active Medical Board"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <KpiCard label="Top Physician" value="Dr. Edwin ." delta="₹9,84,000 billings" trend="up" subtext="328 consults" icon="🩺" />
        <KpiCard label="Total Consultations" value="2,140" delta="+18.2%" trend="up" subtext="Across medical board" icon="📋" />
        <KpiCard label="Avg Consult Fee" value="₹2,695" delta="+7.4%" trend="up" subtext="Per clinical session" icon="💰" />
        <KpiCard label="Medical Rating" value="4.92 / 5.0" delta="Top Tier" trend="up" subtext="Patient parent reviews" icon="⭐" />
      </div>

      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px 24px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Physician Billings & Consultation Quota</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)', fontSize: '11px' }}>
                <th style={{ padding: '10px 14px 10px 16px', verticalAlign: 'middle' }}>Doctor Name</th>
                <th style={{ padding: '10px 14px', verticalAlign: 'middle' }}>Specialty & Qualifications</th>
                <th style={{ padding: '10px 14px', verticalAlign: 'middle' }}>MCI Reg</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', verticalAlign: 'middle' }}>Consultations</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', verticalAlign: 'middle' }}>Total Billings</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', verticalAlign: 'middle' }}>Avg Fee</th>
                <th style={{ padding: '10px 16px 10px 14px', textAlign: 'right', verticalAlign: 'middle' }}>Patient Rating</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((d) => (
                <tr key={d.name} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                  <td style={{ padding: '12px 14px 12px 16px', fontWeight: 700, verticalAlign: 'middle' }}>{d.name}</td>
                  <td style={{ padding: '12px 14px', color: 'var(--muted-foreground, #94a3b8)', verticalAlign: 'middle' }}>{d.spec}</td>
                  <td style={{ padding: '12px 14px', fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', verticalAlign: 'middle' }}>{d.reg}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: 600, verticalAlign: 'middle' }}>{d.consults}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace', verticalAlign: 'middle' }}>{d.rev}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', verticalAlign: 'middle' }}>{d.aov}</td>
                  <td style={{ padding: '12px 16px 12px 14px', textAlign: 'right', color: '#f59e0b', fontWeight: 600, verticalAlign: 'middle' }}>⭐ {d.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
