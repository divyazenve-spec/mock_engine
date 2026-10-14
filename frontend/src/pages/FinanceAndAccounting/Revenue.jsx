import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Revenue() {
  const [streamFilter, setStreamFilter] = useState('ALL');

  const streams = [
    { stream: 'General OPD Consultations & Wellness', type: 'Clinical OPD', rev: '₹32,40,000', txns: '2,240', avgTxn: '₹1,446', share: '22.7%', mom: '+12.4%' },
    { stream: 'Orthopedic & Soft Tissue Surgeries', type: 'Surgical IPD', rev: '₹28,60,000', txns: '102', avgTxn: '₹28,039', share: '20.0%', mom: '+18.2%' },
    { stream: 'Prescription Medicines & Cold Chain', type: 'Pharma Retail', rev: '₹24,80,000', txns: '3,120', avgTxn: '₹795', share: '17.4%', mom: '+9.1%' },
    { stream: 'Emergency, Critical Care & ICU Stays', type: 'Clinical OPD', rev: '₹18,50,000', txns: '210', avgTxn: '₹8,810', share: '13.0%', mom: '+22.5%' },
    { stream: 'Advanced Diagnostics, Ultrasound & Lab', type: 'Clinical OPD', rev: '₹14,80,000', txns: '1,450', avgTxn: '₹1,020', share: '10.4%', mom: '+14.6%' },
    { stream: 'Specialized Oncology & Chemotherapy', type: 'Surgical IPD', rev: '₹10,00,000', txns: '42', avgTxn: '₹23,810', share: '7.0%', mom: '+28.0%' },
    { stream: 'Prescription Diets & Clinical Nutrition', type: 'Digital E-Com', rev: '₹5,80,000', txns: '890', avgTxn: '₹652', share: '4.1%', mom: '+8.3%' },
    { stream: 'B2B Corporate Pet Benefit Programs', type: 'B2B Contracts', rev: '₹4,20,000', txns: '18', avgTxn: '₹23,333', share: '2.9%', mom: '+15.0%' },
    { stream: 'Dental Scaling & Periodontal Surgery', type: 'Clinical OPD', rev: '₹2,60,000', txns: '68', avgTxn: '₹3,823', share: '1.8%', mom: '+6.2%' },
    { stream: 'Breeder & Kennel Preventive Care', type: 'B2B Contracts', rev: '₹1,15,000', txns: '6', avgTxn: '₹19,167', share: '0.8%', mom: '+4.5%' }
  ];

  const cityRevenue = [
    { city: 'Bengaluru Central Tertiary', rev: '₹48,50,000', pct: '34.0%', growth: '+19.2%', lead: 'Koramangala Tertiary Hospital' },
    { city: 'Bengaluru Tech East Corridor', rev: '₹32,40,000', pct: '22.7%', growth: '+16.5%', lead: 'Whitefield Specialized Hub' },
    { city: 'Mumbai Suburban Flagship', rev: '₹24,20,000', pct: '16.9%', growth: '+24.1%', lead: 'Bandra West Flagship' },
    { city: 'Delhi-NCR South Care Hub', rev: '₹16,80,000', pct: '11.8%', growth: '+18.0%', lead: 'Vasant Vihar Outpatient Hub' },
    { city: 'Hyderabad Cyberabad Cluster', rev: '₹11,50,000', pct: '8.0%', growth: '+14.8%', lead: 'Jubilee Hills Care Center' },
    { city: 'Pune West Specialty Clinic', rev: '₹4,85,000', pct: '3.4%', growth: '+12.0%', lead: 'Koregaon Park Clinic' },
    { city: 'Chennai Central Care Unit', rev: '₹2,40,000', pct: '1.7%', growth: '+9.4%', lead: 'Adyar Care Center' },
    { city: 'Kolkata South Outpatient Annex', rev: '₹1,20,000', pct: '0.8%', growth: '+7.1%', lead: 'Alipore Center' },
    { city: 'Ahmedabad West Care Point', rev: '₹65,000', pct: '0.5%', growth: '+5.5%', lead: 'Bodakdev Annex' },
    { city: 'Digital App & Omni-Delivery', rev: '₹35,000', pct: '0.2%', growth: '+22.0%', lead: 'Zenve Mobile App Platform' }
  ];

  const filteredStreams = streamFilter === 'ALL' ? streams : streams.filter(s => s.type === streamFilter);

  return (
    <DashboardLayout
      category="Finance & Accounting"
      subcategory="Revenue"
      title="Revenue Intelligence & Commercial Inflow"
      subtitle="Multi-channel revenue recognition, annual recurring run-rate (ARR), clinical stream mix, and metro city contribution"
      icon="💰"
      badge="ARR: ₹17.14 Cr"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => alert('Exporting comprehensive revenue ledger (CSV)...')}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: '1px solid #3b82f6',
              background: 'rgba(59,130,246,0.15)',
              color: '#60a5fa',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            📥 Export Revenue Breakdown
          </button>
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Monthly Run-Rate (MRR)" value="₹1,42,85,000" delta="+18.4% MoM" trend="up" subtext="Current monthly intake" icon="💰" />
        <KpiCard label="Annualized Run-Rate (ARR)" value="₹17.14 Cr" delta="+22.5% YoY" trend="up" subtext="Network facilities" icon="🌐" />
        <KpiCard label="Avg Revenue / Consultation" value="₹1,446" delta="+8.2% YoY" trend="up" subtext="Diagnosis + Rx add-on" icon="🐾" />
        <KpiCard label="Surgical Revenue / Case" value="₹28,039" delta="High-margin OT throughput" trend="up" subtext="OT utilization" icon="🩺" />
        <KpiCard label="Pharmacy Attachment Rate" value="78.4%" delta="+4.2% MoM" trend="up" subtext="Inpatient & OPD Rx" icon="💊" />
        <KpiCard label="Recognized Under ASC 606" value="100.0%" delta="Zero revenue leakage" trend="up" subtext="Statutory recognized" icon="🛡️" />
      </div>

      <div style={{
        background: 'var(--card, #131d2e)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '22px 24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#fff' }}>📊 Clinical & Commercial Revenue Streams</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Breakdown by consultation, surgical, pharmacy retail, and corporate contracts</p>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            {['ALL', 'Clinical OPD', 'Surgical IPD', 'Pharma Retail', 'Digital E-Com', 'B2B Contracts'].map(type => (
              <button
                key={type}
                onClick={() => setStreamFilter(type)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: streamFilter === type ? '#3b82f6' : 'rgba(255,255,255,0.03)',
                  color: streamFilter === type ? '#fff' : '#94a3b8',
                  fontSize: '11px',
                  cursor: 'pointer'
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.22)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <th style={{ padding: '10px 20px', textAlign: 'left', color: '#94a3b8' }}>Stream Name</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#94a3b8' }}>Category</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Monthly Revenue</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Transactions</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Avg Ticket</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Revenue Share</th>
                <th style={{ padding: '10px 20px', textAlign: 'right', color: '#94a3b8' }}>MoM Growth</th>
              </tr>
            </thead>
            <tbody>
              {filteredStreams.map((s, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 20px', color: '#fff', fontWeight: 600 }}>{s.stream}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.06)', color: '#38bdf8', fontSize: '11px' }}>{s.type}</span>
                  </td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#10b981' }}>{s.rev}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#cbd5e1' }}>{s.txns}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#94a3b8' }}>{s.avgTxn}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600, color: '#38bdf8' }}>{s.share}</td>
                  <td style={{ padding: '12px 20px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#10b981' }}>{s.mom}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Regional Metro Revenue Contribution */}
      <div style={{
        background: 'var(--card, #131d2e)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '22px 24px'
      }}>
        <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 700, color: '#fff' }}>🏙️ Metro Geographic Revenue Distribution</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Regional performance across hospital corridors and outpatient hubs</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
          {cityRevenue.map((c, idx) => (
            <div key={idx} style={{
              background: 'rgba(0,0,0,0.18)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '8px',
              padding: '14px 16px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <b style={{ color: '#fff', fontSize: '13px' }}>{c.city}</b>
                <span style={{ color: '#10b981', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{c.growth}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                <span style={{ fontSize: '18px', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace', color: '#38bdf8' }}>{c.rev}</span>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>({c.pct} share)</span>
              </div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>
                Top Center: <strong style={{ color: '#cbd5e1' }}>{c.lead}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
