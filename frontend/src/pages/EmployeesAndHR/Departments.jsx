import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Departments() {
  const [selectedDept, setSelectedDept] = useState(null);

  const departments = [
    {
      id: 'DEPT-01',
      name: 'Clinical Veterinary Services',
      headcount: 48,
      color: '#10b981',
      description: 'Super-specialty veterinary consultations, routine diagnostics, preventive care, and ICU inpatient coverage across Bengaluru hospitals.',
      lead: 'Dr. Priya Nair (Chief Vet Officer)',
      budget: '₹38.5L / mo',
      openings: 6,
      kpiHealth: 98.2,
      retention: '97.4%'
    },
    {
      id: 'DEPT-02',
      name: 'Veterinary Surgery & Anesthesiology',
      headcount: 15,
      color: '#06b6d4',
      description: 'Laparoscopic, orthopedic, neurosurgical and soft-tissue procedures with sterile operating theatres and dedicated post-op recovery suites.',
      lead: 'Dr. Rajesh Varma (Lead Surgeon)',
      budget: '₹16.4L / mo',
      openings: 2,
      kpiHealth: 99.1,
      retention: '98.5%'
    },
    {
      id: 'DEPT-03',
      name: 'Central Pet Pharmacy & Cold Chain',
      headcount: 34,
      color: '#0ea5e9',
      description: 'Formulary management, batch verification, automated prescription dispensing, and 2°C–8°C cold-chain biologics compliance.',
      lead: 'Sneha Kulkarni (Head of Pharmacy)',
      budget: '₹22.8L / mo',
      openings: 3,
      kpiHealth: 96.8,
      retention: '96.2%'
    },
    {
      id: 'DEPT-04',
      name: 'Hyperlocal 60-Min Logistics Fleet',
      headcount: 42,
      color: '#f59e0b',
      description: 'Temperature-monitored dark store to doorstep delivery network powering 60-minute emergency medication and pet nutrition logistics.',
      lead: 'Karthik Subramaniam (Fleet Manager)',
      budget: '₹21.5L / mo',
      openings: 5,
      kpiHealth: 94.5,
      retention: '92.8%'
    },
    {
      id: 'DEPT-05',
      name: 'Technology & AI Engineering',
      headcount: 28,
      color: '#8b5cf6',
      description: 'Electronic Health Record (EHR) pipelines, IoT diagnostic sensors, Gemini symptom analysis, and high-availability clinical core APIs.',
      lead: 'Vikramaditya Rao (Director AI/Eng)',
      budget: '₹36.2L / mo',
      openings: 4,
      kpiHealth: 97.4,
      retention: '96.8%'
    },
    {
      id: 'DEPT-06',
      name: 'Dark Store & Warehouse Hubs',
      headcount: 22,
      color: '#ec4899',
      description: 'Central fulfilment warehousing, SKU pallet management, supplier receiving docks, and high-velocity picking automation.',
      lead: 'Rahul Deshmukh (Warehouse Lead)',
      budget: '₹12.4L / mo',
      openings: 2,
      kpiHealth: 95.0,
      retention: '94.6%'
    },
    {
      id: 'DEPT-07',
      name: 'Customer Delight & Pet Concierge',
      headcount: 16,
      color: '#14b8a6',
      description: '24x7 multilingual pet parent assistance, post-op consultation follow-ups, prescription renewals, and care coordinator booking.',
      lead: 'Mohammed Zeeshan (CX Lead)',
      budget: '₹9.8L / mo',
      openings: 3,
      kpiHealth: 96.2,
      retention: '95.1%'
    },
    {
      id: 'DEPT-08',
      name: 'Pathology & Diagnostic Laboratories',
      headcount: 12,
      color: '#6366f1',
      description: 'Automated hematology, biochemical profiling, microbiological cultures, and rapid point-of-care PCR diagnostic testing.',
      lead: 'Pooja Hegde (Chief Pathologist)',
      budget: '₹11.6L / mo',
      openings: 1,
      kpiHealth: 98.6,
      retention: '97.2%'
    },
    {
      id: 'DEPT-09',
      name: 'Human Resources & Talent Acquisition',
      headcount: 6,
      color: '#84cc16',
      description: 'Clinical recruitment, Karnataka Veterinary Council verification, staff learning & development, payroll, and cultural governance.',
      lead: 'Ananya Sen (Lead TA & People)',
      budget: '₹5.8L / mo',
      openings: 1,
      kpiHealth: 95.8,
      retention: '96.0%'
    },
    {
      id: 'DEPT-10',
      name: 'Finance, Procurement & Audit',
      headcount: 5,
      color: '#eab308',
      description: 'Corporate treasury, pharma vendor billing, GST compliance, asset capitalization, and operational unit financial audits.',
      lead: 'Harish Mehta (VP Finance)',
      budget: '₹6.2L / mo',
      openings: 1,
      kpiHealth: 97.0,
      retention: '98.0%'
    }
  ];

  return (
    <DashboardLayout
      category="Employees & HR"
      subcategory="Departments"
      title="Departmental Hierarchy & Resource Stratification"
      subtitle="Organizational divisions, departmental leadership, monthly payroll commitments, and headcount capacity"
      icon="🏢"
      badge=""
    >
      {/* Top Level KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Operating Units" value="10 Units" delta="+2 YoY" trend="up" subtext="Clinical, logistics & tech" icon="🏛️" />
        <KpiCard label="Total Monthly Budget" value="₹1.81 Cr / mo" delta="+4.2%" trend="up" subtext="Direct payroll & incentives" icon="💳" />
        <KpiCard label="Open Requisitions" value="28 Open Roles" delta="Active" trend="neutral" subtext="Across 10 divisions" icon="📢" />
        <KpiCard label="Average Org Health" value="96.8%" delta="+1.8%" trend="up" subtext="Blended satisfaction & SLA" icon="⭐" />
      </div>

      {/* Department Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '16px' }}>
        {departments.map(dept => (
          <div
            key={dept.id}
            style={{
              background: 'var(--card, #1e293b)',
              border: '1px solid var(--border, rgba(255,255,255,0.08))',
              borderRadius: '14px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 0.15s ease, border-color 0.15s ease'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <span style={{ fontSize: '11px', fontFamily: '"IBM Plex Mono", monospace', color: dept.color, fontWeight: 700 }}>{dept.id}</span>
                  <h3 style={{ margin: '4px 0 0', fontSize: '16px', fontWeight: 700, color: '#f8fafc' }}>{dept.name}</h3>
                </div>
                <span style={{
                  padding: '3px 8px',
                  borderRadius: '99px',
                  fontSize: '11px',
                  fontWeight: 700,
                  background: `${dept.color}22`,
                  color: dept.color
                }}>
                  {dept.headcount} Staff
                </span>
              </div>

              <p style={{ fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)', lineHeight: '1.5', margin: '0 0 16px' }}>
                {dept.description}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '10px', fontSize: '12px', marginBottom: '16px' }}>
                <div>
                  <div style={{ color: 'var(--muted-foreground, #94a3b8)', fontSize: '11px' }}>Department Head</div>
                  <div style={{ fontWeight: 600, color: '#e2e8f0', marginTop: '2px' }}>{dept.lead}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--muted-foreground, #94a3b8)', fontSize: '11px' }}>Monthly Payroll</div>
                  <div style={{ fontWeight: 600, color: '#34d399', marginTop: '2px', fontFamily: '"IBM Plex Mono", monospace' }}>{dept.budget}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--muted-foreground, #94a3b8)', fontSize: '11px' }}>Open Positions</div>
                  <div style={{ fontWeight: 600, color: '#f59e0b', marginTop: '2px' }}>{dept.openings} roles vacant</div>
                </div>
                <div>
                  <div style={{ color: 'var(--muted-foreground, #94a3b8)', fontSize: '11px' }}>KPI Health Index</div>
                  <div style={{ fontWeight: 600, color: dept.color, marginTop: '2px' }}>{dept.kpiHealth}% Score</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)' }}>Retention: <strong style={{ color: '#fff' }}>{dept.retention}</strong></span>
              <button
                onClick={() => setSelectedDept(dept)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 600,
                  border: '1px solid rgba(255,255,255,0.15)',
                  background: 'transparent',
                  color: '#93c5fd',
                  cursor: 'pointer'
                }}
              >
                Department 360° →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Department Detail Modal */}
      {selectedDept && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999
        }}>
          <div style={{
            background: '#1e293b',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '14px',
            padding: '24px',
            maxWidth: '550px',
            width: '90%',
            color: '#fff'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '18px' }}>🏢 {selectedDept.name} Overview</h3>
              <button onClick={() => setSelectedDept(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '18px', cursor: 'pointer' }}>✕</button>
            </div>
            <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: '1.6', marginBottom: '16px' }}>{selectedDept.description}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '13px' }}>
              <div><strong style={{ color: '#94a3b8' }}>Designated Lead:</strong> <div>{selectedDept.lead}</div></div>
              <div><strong style={{ color: '#94a3b8' }}>Total Headcount:</strong> <div>{selectedDept.headcount} active personnel</div></div>
              <div><strong style={{ color: '#94a3b8' }}>Monthly Payroll:</strong> <div style={{ color: '#34d399', fontWeight: 600 }}>{selectedDept.budget}</div></div>
              <div><strong style={{ color: '#94a3b8' }}>Average Salary:</strong> <div>{selectedDept.avgSalary}</div></div>
              <div><strong style={{ color: '#94a3b8' }}>Retention Rate:</strong> <div>{selectedDept.retention}</div></div>
              <div><strong style={{ color: '#94a3b8' }}>Active Vacancies:</strong> <div style={{ color: '#f59e0b' }}>{selectedDept.openings} roles hiring</div></div>
            </div>
            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setSelectedDept(null)} style={{ padding: '8px 16px', borderRadius: '8px', background: '#3b82f6', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>Close View</button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
