import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ServiceRevenue() {
  const [selectedBranch, setSelectedBranch] = useState('ALL');

  const specialtyRevenue = [
    { specialty: 'Orthopedics & TPLO Surgery', revenue: '₹34,80,000', cases: 88, aov: '₹39,545', share: '23.5%', margin: '48.2%' },
    { specialty: 'General & Laparoscopic Surgery', revenue: '₹26,40,000', cases: 142, aov: '₹18,591', share: '17.8%', margin: '42.6%' },
    { specialty: 'Emergency, ICU & Critical Care', revenue: '₹22,10,000', cases: 114, aov: '₹19,386', share: '14.9%', margin: '52.4%' },
    { specialty: 'Clinical Outpatient Consultations', revenue: '₹18,50,000', cases: 1240, aov: '₹1,492', share: '12.5%', margin: '68.0%' },
    { specialty: 'In-House Diagnostics & Imaging', revenue: '₹16,20,000', cases: 820, aov: '₹1,975', share: '10.9%', margin: '58.5%' },
    { specialty: 'Cardiology & Echocardiography', revenue: '₹11,40,000', cases: 94, aov: '₹12,127', share: '7.7%', margin: '54.2%' },
    { specialty: 'Preventive Vaccines & Health Passes', revenue: '₹8,90,000', cases: 540, aov: '₹1,648', share: '6.0%', margin: '41.0%' },
    { specialty: 'Dental Prophylaxis & Extractions', revenue: '₹4,80,000', cases: 62, aov: '₹7,742', share: '3.2%', margin: '62.5%' },
    { specialty: 'Feline Internal Medicine Specialty', revenue: '₹3,40,000', cases: 48, aov: '₹7,083', share: '2.3%', margin: '46.8%' },
    { specialty: 'Neurology & Spinal Rehabilitation', revenue: '₹1,80,000', cases: 22, aov: '₹8,182', share: '1.2%', margin: '50.0%' }
  ];

  const branchRevenue = [
    { branch: 'Indiranagar Central Hospital, Bengaluru', revenue: '₹48,50,000', share: '32.7%', docCount: 12, csat: '4.98' },
    { branch: 'Bandra Trauma Centre, Mumbai', revenue: '₹38,20,000', share: '25.8%', docCount: 10, csat: '4.96' },
    { branch: 'DLF CyberCity Hospital, Delhi NCR', revenue: '₹24,60,000', share: '16.6%', docCount: 8, csat: '4.94' },
    { branch: 'Jubilee Hills Surgical Specialty, Hyderabad', revenue: '₹18,40,000', share: '12.4%', docCount: 6, csat: '4.95' },
    { branch: 'Koregaon Park Multi-Specialty, Pune', revenue: '₹11,20,000', share: '7.6%', docCount: 4, csat: '4.92' },
    { branch: 'Koramangala Care Clinic, Bengaluru', revenue: '₹7,40,000', share: '5.0%', docCount: 3, csat: '4.97' },
    { branch: 'Whitefield Ambulatory Center, Bengaluru', revenue: '₹5,80,000', share: '3.9%', docCount: 2, csat: '4.91' },
    { branch: 'South Mumbai Specialty Outpost, Mumbai', revenue: '₹4,90,000', share: '3.3%', docCount: 2, csat: '4.93' },
    { branch: 'Saket Pet Wellness Annex, New Delhi', revenue: '₹4,20,000', share: '2.8%', docCount: 2, csat: '4.90' },
    { branch: 'Alwarpet Community Clinic, Chennai', revenue: '₹3,10,000', share: '2.1%', docCount: 2, csat: '4.94' }
  ];

  const filteredBranches = selectedBranch === 'ALL' ? branchRevenue :
    selectedBranch === 'Bangalore Hubs' ? branchRevenue.filter(b => b.branch.includes('Bengaluru')) :
    selectedBranch === 'Mumbai Hubs' ? branchRevenue.filter(b => b.branch.includes('Mumbai')) :
    branchRevenue.filter(b => b.branch.includes('Delhi'));

  const cardStyle = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Veterinary Services"
      subcategory="Service Revenue"
      title="Veterinary Services Clinical Revenue & Billings"
      subtitle="Financial performance by clinical specialty, procedure revenue streams, multi-clinic billing analytics, and doctor collections"
      icon="💰"
      badge="₹1.48 Cr MTD Revenue"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          {['ALL', 'Bangalore Hubs', 'Mumbai Hubs', 'Delhi NCR'].map(b => (
            <button
              key={b}
              onClick={() => setSelectedBranch(b)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                border: selectedBranch === b ? '1px solid #059669' : '1px solid #e2e8f0',
                background: selectedBranch === b ? '#059669' : '#ffffff',
                color: selectedBranch === b ? '#ffffff' : '#64748b'
              }}
            >
              {b}
            </button>
          ))}
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Gross Clinical Revenue" value="₹1.48 Cr" delta="+18.4% MoM" trend="up" subtext="100% collections billed" icon="🩺" />
        <KpiCard label="Avg Realization per Case" value="₹8,050" delta="+4.2% YoY" trend="up" subtext="Blended consult + surgery" icon="💳" />
        <KpiCard label="Surgery Billings" value="₹61.20 L" delta="41.3% share" trend="up" subtext="High value surgical cases" icon="✂️" />
        <KpiCard label="Collection Realization" value="99.4%" delta="Zero Bad Debt" trend="up" subtext="Instant UPI / Insurance TPA" icon="🎯" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '16px' }}>
        {/* Specialty Breakdown Card */}
        <div style={cardStyle}>
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Clinical Revenue by Medical Specialty</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Billings, procedure counts, and average order values per veterinary discipline</p>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #475569)' }}>
                  <th style={{ padding: '10px 12px' }}>Specialty</th>
                  <th style={{ padding: '10px 12px', textAlign: 'right' }}>Revenue</th>
                  <th style={{ padding: '10px 12px', textAlign: 'right' }}>Cases</th>
                  <th style={{ padding: '10px 12px', textAlign: 'right' }}>AOV</th>
                  <th style={{ padding: '10px 12px', textAlign: 'right' }}>Share</th>
                </tr>
              </thead>
              <tbody>
                {specialtyRevenue.map(s => (
                  <tr key={s.specialty} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 600 }}>{s.specialty}</td>
                    <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 700, color: '#059669', fontFamily: '"IBM Plex Mono", monospace' }}>{s.revenue}</td>
                    <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{s.cases}</td>
                    <td style={{ padding: '10px 12px', textAlign: 'right', color: '#64748b', fontFamily: '"IBM Plex Mono", monospace' }}>{s.aov}</td>
                    <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 600, color: '#2563eb' }}>{s.share}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Clinic Revenue Card */}
        <div style={cardStyle}>
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Branch Hospital Revenue Contributions</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Monthly revenue performance across flagship veterinary hospitals</p>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #475569)' }}>
                  <th style={{ padding: '10px 12px' }}>Hospital Branch</th>
                  <th style={{ padding: '10px 12px', textAlign: 'right' }}>Revenue</th>
                  <th style={{ padding: '10px 12px', textAlign: 'right' }}>Share</th>
                  <th style={{ padding: '10px 12px', textAlign: 'right' }}>Doctors</th>
                  <th style={{ padding: '10px 12px', textAlign: 'center' }}>CSAT</th>
                </tr>
              </thead>
              <tbody>
                {filteredBranches.map(b => (
                  <tr key={b.branch} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 600 }}>{b.branch}</td>
                    <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 700, color: '#0f172a', fontFamily: '"IBM Plex Mono", monospace' }}>{b.revenue}</td>
                    <td style={{ padding: '10px 12px', textAlign: 'right', color: '#059669', fontWeight: 600 }}>{b.share}</td>
                    <td style={{ padding: '10px 12px', textAlign: 'right', color: '#64748b' }}>{b.docCount} Vets</td>
                    <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                      <span style={{ padding: '2px 6px', borderRadius: '4px', fontSize: '11px', fontWeight: 700, background: '#fef3c7', color: '#b45309' }}>
                        ⭐ {b.csat}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}