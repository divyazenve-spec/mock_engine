import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function EmployeeTargets() {
  const [filterPeriod, setFilterPeriod] = useState('October 2026');

  const targets = [
    {
      name: 'Dr. Priya Nair',
      role: 'Chief Veterinary Officer',
      dept: 'Clinical',
      metric: 'Clinical Consultations & Complex Surgeries',
      quota: '350 Cases',
      achieved: '382 Cases',
      attainment: 109.1,
      status: 'Target Exceeded',
      incentive: 'Tier 1 (₹35,000)'
    },
    {
      name: 'Dr. Rajesh Varma',
      role: 'Lead Veterinary Surgeon',
      dept: 'Clinical',
      metric: 'Orthopedic & Soft-Tissue Surgeries',
      quota: '300 Surgeries',
      achieved: '324 Surgeries',
      attainment: 108.0,
      status: 'Target Exceeded',
      incentive: 'Tier 1 (₹30,000)'
    },
    {
      name: 'Sneha Kulkarni',
      role: 'Head of Central Pharmacy',
      dept: 'Pharmacy',
      metric: 'Cold-Chain Prescription Fulfilments',
      quota: '15,000 Batches',
      achieved: '16,240 Batches',
      attainment: 108.3,
      status: 'Target Exceeded',
      incentive: 'Tier 1 (₹20,000)'
    },
    {
      name: 'Vikramaditya Rao',
      role: 'Director of Engineering & AI',
      dept: 'Technology',
      metric: 'AI Model Releases & Core Platform SLA',
      quota: '4 AI Milestones',
      achieved: '5 AI Milestones',
      attainment: 125.0,
      status: 'Target Exceeded',
      incentive: 'Tier 1 (₹40,000)'
    },
    {
      name: 'Ananya Sen',
      role: 'Lead Talent Acquisition & HR',
      dept: 'HR & People',
      metric: 'Specialist Veterinary & Tech Hires',
      quota: '18 Hires',
      achieved: '19 Hires',
      attainment: 105.6,
      status: 'Target Exceeded',
      incentive: 'Tier 2 (₹15,000)'
    },
    {
      name: 'Karthik Subramaniam',
      role: 'Hyperlocal Fleet Operations Mgr',
      dept: 'Logistics',
      metric: '60-Min Express Order Deliveries',
      quota: '25,000 Deliveries',
      achieved: '26,850 Deliveries',
      attainment: 107.4,
      status: 'Target Exceeded',
      incentive: 'Tier 2 (₹15,000)'
    },
    {
      name: 'Pooja Hegde',
      role: 'Senior Veterinary Pathologist',
      dept: 'Clinical',
      metric: 'Biomarker Diagnostics & Lab Profiles',
      quota: '1,200 Panels',
      achieved: '1,280 Panels',
      attainment: 106.7,
      status: 'Target Exceeded',
      incentive: 'Tier 2 (₹18,000)'
    },
    {
      name: 'Mohammed Zeeshan',
      role: 'Lead Customer Experience',
      dept: 'Customer Delight',
      metric: 'Resolution CSAT & Care Booking Volume',
      quota: '4,500 Tickets',
      achieved: '4,680 Tickets',
      attainment: 104.0,
      status: 'Target Exceeded',
      incentive: 'Tier 2 (₹10,000)'
    },
    {
      name: 'Rahul Deshmukh',
      role: 'Dark Store Warehouse Supervisor',
      dept: 'Warehouse',
      metric: 'Order Pick/Pack & Dispatch Accuracy',
      quota: '50,000 SKUs',
      achieved: '51,200 SKUs',
      attainment: 102.4,
      status: 'Target Met',
      incentive: 'Standard (₹8,000)'
    },
    {
      name: 'Divya Nambiar',
      role: 'Junior Clinical Associate',
      dept: 'Clinical',
      metric: 'Anesthetic & ICU Patient Monitoring',
      quota: '180 Assists',
      achieved: '186 Assists',
      attainment: 103.3,
      status: 'Target Met',
      incentive: 'Probation (₹6,000)'
    }
  ];

  return (
    <DashboardLayout
      category="Employees & HR"
      subcategory="Employee Targets"
      title="Quota Attainment & Target Leaderboard"
      subtitle="Monthly & quarterly revenue quotas, clinical case targets, operational delivery SLAs, and incentive tiers"
      icon="🎯"
      badge=""
    >
      {/* Top Level KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Blended Quota Attainment" value="107.2%" delta="+5.4%" trend="up" subtext="Across all 10 core divisions" icon="🏆" />
        <KpiCard label="Team Members Surpassing Target" value="38 Staff" delta="88.4%" trend="up" subtext="Surpassing set baseline" icon="🚀" />
        <KpiCard label="Incentive Pool Allocated" value="₹18,50,000" delta="+8.2%" trend="up" subtext="Disbursed with October payroll" icon="💰" />
        <KpiCard label="Quota Deficit Cases" value="2 Personnel" delta="Coaching Active" trend="neutral" subtext="PIPs in active progress" icon="⚠️" />
      </div>

      {/* Period Selection */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)', fontWeight: 600 }}>Active Period:</span>
          {['August 2026', 'September 2026', 'October 2026', 'Q4 2026 Target'].map(p => (
            <button
              key={p}
              onClick={() => setFilterPeriod(p)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
                border: '1px solid',
                borderColor: filterPeriod === p ? '#3b82f6' : 'rgba(255,255,255,0.1)',
                background: filterPeriod === p ? '#3b82f6' : 'transparent',
                color: filterPeriod === p ? '#fff' : 'var(--muted-foreground, #94a3b8)'
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Table Section */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        overflow: 'hidden',
        marginTop: '16px'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Quota Delivery Matrix ({targets.length} entries)</h3>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Individual staff quota targets and achievement breakdown</p>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.2)', color: 'var(--muted-foreground, #94a3b8)', fontSize: '11px', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Team Member</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Target Metric</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Set Quota</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Achieved</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', width: '180px' }}>Attainment %</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Status</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Incentive Tier</th>
              </tr>
            </thead>
            <tbody>
              {targets.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '24px', color: 'var(--muted-foreground, #94a3b8)' }}>
                    No quota records found
                  </td>
                </tr>
              ) : (
                targets.map(t => (
                  <tr key={t.name} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ fontWeight: 600, color: '#f8fafc' }}>{t.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)' }}>{t.role} · {t.dept}</div>
                    </td>
                    <td style={{ padding: '12px 16px', color: '#cbd5e1' }}>{t.metric}</td>
                    <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', color: 'var(--muted-foreground, #94a3b8)' }}>{t.quota}</td>
                    <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600, color: '#f8fafc' }}>{t.achieved}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '99px', overflow: 'hidden' }}>
                          <div style={{ width: `${Math.min(t.attainment, 100)}%`, height: '100%', background: t.attainment >= 100 ? '#10b981' : '#f59e0b', borderRadius: '99px' }}></div>
                        </div>
                        <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', fontWeight: 700, color: t.attainment >= 100 ? '#34d399' : '#fbbf24' }}>
                          {t.attainment}%
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: '99px',
                        fontSize: '10px',
                        fontWeight: 700,
                        background: t.status.includes('Exceeded') ? 'rgba(16,185,129,0.15)' : 'rgba(59,130,246,0.15)',
                        color: t.status.includes('Exceeded') ? '#10b981' : '#60a5fa'
                      }}>
                        ● {t.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600, color: '#38bdf8' }}>
                      {t.incentive}
                    </td>
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
