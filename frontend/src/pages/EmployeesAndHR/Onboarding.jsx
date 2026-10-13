import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Onboarding() {
  const [selectedCohort, setSelectedCohort] = useState('October 2026');

  const recruits = [
    { name: 'Dr. Arvind Swaminathan', role: 'Associate Veterinary Surgeon', dept: 'Clinical Care', joinDate: '2026-10-15', buddy: 'Dr. Priya Nair', itHardware: 'MacBook Pro M3 + iPad Pro', bvg: 'Verified (SpringVerify)', completion: 90, status: 'In Progress' },
    { name: 'Pooja Hegde', role: 'Senior Veterinary Pathologist', dept: 'Clinical Care', joinDate: '2026-10-01', buddy: 'Dr. Rajesh Varma', itHardware: 'ThinkPad P16s + Lab Terminal', bvg: 'Verified (SpringVerify)', completion: 100, status: 'Completed' },
    { name: 'Divya Nambiar', role: 'Junior Clinical Associate', dept: 'Clinical Care', joinDate: '2026-10-06', buddy: 'Pooja Hegde', itHardware: 'Dell Latitude 7440', bvg: 'Verified (SpringVerify)', completion: 100, status: 'Completed' },
    { name: 'Rohan Shenoy', role: 'Emergency Critical Care Vet', dept: 'Emergency & ICU', joinDate: '2026-10-18', buddy: 'Dr. Rajesh Varma', itHardware: 'MacBook Air M3', bvg: 'Verified (SpringVerify)', completion: 75, status: 'In Progress' },
    { name: 'Ananya Sen', role: 'Lead Talent Acquisition & HR', dept: 'People & HR', joinDate: '2026-09-28', buddy: 'Vikramaditya Rao', itHardware: 'MacBook Air M3', bvg: 'Verified (SpringVerify)', completion: 100, status: 'Completed' },
    { name: 'Mohammed Zeeshan', role: 'Lead Customer Experience', dept: 'Customer Delight', joinDate: '2026-10-03', buddy: 'Sneha Kulkarni', itHardware: 'MacBook Air M3', bvg: 'Verified (SpringVerify)', completion: 100, status: 'Completed' },
    { name: 'Sumitra Banerjee', role: 'Compounding Pharmacist', dept: 'Pharmacy & OTC', joinDate: '2026-10-20', buddy: 'Sneha Kulkarni', itHardware: 'Dell OptiPlex Pharma Terminal', bvg: 'Under Review', completion: 60, status: 'In Progress' },
    { name: 'Tanmay Joshi', role: 'Full-Stack Telehealth Engineer', dept: 'Technology & AI', joinDate: '2026-10-22', buddy: 'Vikramaditya Rao', itHardware: 'MacBook Pro M3 Max', bvg: 'Verified (SpringVerify)', completion: 50, status: 'In Progress' },
    { name: 'Farooq Abdullah', role: 'Cold-Chain Logistics Executive', dept: 'Supply Chain & Ops', joinDate: '2026-10-08', buddy: 'Karthik Subramaniam', itHardware: 'Samsung Galaxy Tab Active', bvg: 'Verified (SpringVerify)', completion: 100, status: 'Completed' },
    { name: 'Meera Krishnan', role: 'Feline Behavioral Specialist', dept: 'Clinical Care', joinDate: '2026-10-25', buddy: 'Dr. Priya Nair', itHardware: 'iPad Air + Apple Pencil', bvg: 'Under Review', completion: 40, status: 'In Progress' }
  ];

  const checklistItems = [
    { title: 'Karnataka State Veterinary Council (KSVC) License Verification', progress: '10/10 Verified' },
    { title: 'Statutory Aadhaar / PAN / EPFO UAN Linkage', progress: '10/10 Completed' },
    { title: 'SpringVerify Address & Criminal Record Checks', progress: '10/10 Cleared' },
    { title: 'Zenve Pet EHR & Diagnostic System Training', progress: '8/10 Certified' },
    { title: 'Corporate Medical & Pet Healthcare Group Insurance Enrollment', progress: '10/10 Enrolled' },
    { title: 'Anti-Bite Safety & Biohazard Waste Protocol Orientation', progress: '9/10 Completed' }
  ];

  return (
    <DashboardLayout
      category="Employees & HR"
      subcategory="Onboarding"
      title="New Hire Onboarding & Day-1 Readiness"
      subtitle="Recruit integration journeys, hardware provisioning, background checks, medical council verification, and buddy assignments"
      icon="🐣"
      badge="10 Active Recruits"
    >
      {/* Top Level KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Active Onboarding Cohort" value="10 Recruits" delta="+4 vs Sep" trend="positive" subtext="Clinical, tech & operations" icon="👥" />
        <KpiCard label="Average Day-1 Readiness" value="98.5%" delta="+2.4%" trend="positive" subtext="Zero downtime on joining day" icon="💻" />
        <KpiCard label="Background Checks (BGV)" value="100% Verified" delta="10/10 Cleared" trend="positive" subtext="SpringVerify certified" icon="🛡️" />
        <KpiCard label="Buddy Allocation Rate" value="100%" delta="10 Assigned" trend="positive" subtext="Accelerates time-to-productivity" icon="🤝" />
      </div>

      {/* Onboarding Recruits Table */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>New Hire Readiness Telemetry</h3>
            <p style={{ margin: '4px 0 0', fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)' }}>Comprehensive tracking from offer acceptance to 90-day confirmation</p>
          </div>
          <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>● Automated HRIS Sync Active</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)', color: 'var(--muted-foreground, #94a3b8)' }}>
                <th style={{ padding: '12px 16px' }}>New Team Member</th>
                <th style={{ padding: '12px 16px' }}>Joining Date</th>
                <th style={{ padding: '12px 16px' }}>Assigned Buddy</th>
                <th style={{ padding: '12px 16px' }}>Hardware / Assets</th>
                <th style={{ padding: '12px 16px' }}>BGV Verification</th>
                <th style={{ padding: '12px 16px', width: '160px' }}>Readiness %</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {recruits.length === 0 ? (<tr><td colSpan="7" style={{ textAlign: "center", padding: "36px 16px", color: "#94a3b8" }}>No onboarding records found</td></tr>) : recruits.map(r => (
                <tr key={r.name} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ fontWeight: 600, color: '#f8fafc' }}>{r.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)' }}>{r.role} · {r.dept}</div>
                  </td>
                  <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', color: '#cbd5e1' }}>{r.joinDate}</td>
                  <td style={{ padding: '12px 16px', color: '#93c5fd' }}>🤝 {r.buddy}</td>
                  <td style={{ padding: '12px 16px', color: '#cbd5e1' }}>{r.itHardware}</td>
                  <td style={{ padding: '12px 16px', color: r.bvg.includes('Verified') ? '#34d399' : '#f59e0b', fontWeight: 600 }}>{r.bvg}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '99px', overflow: 'hidden' }}>
                        <div style={{ width: `${r.completion}%`, height: '100%', background: r.completion === 100 ? '#10b981' : '#38bdf8', borderRadius: '99px' }}></div>
                      </div>
                      <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', fontWeight: 700, color: r.completion === 100 ? '#10b981' : '#38bdf8' }}>
                        {r.completion}%
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '99px',
                      fontSize: '10px',
                      fontWeight: 700,
                      background: r.status === 'Completed' ? 'rgba(16,185,129,0.15)' : 'rgba(59,130,246,0.15)',
                      color: r.status === 'Completed' ? '#10b981' : '#60a5fa'
                    }}>
                      ● {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Compliance & Checklist */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 14px', fontSize: '15px', fontWeight: 700 }}>📋 Onboarding Statutory Milestones &amp; Audit</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '12px' }}>
          {checklistItems.length === 0 ? (
            <div style={{ padding: '24px 16px', textAlign: 'center', color: '#94a3b8', background: 'rgba(0,0,0,0.15)', borderRadius: '8px', gridColumn: '1 / -1' }}>
              No onboarding statutory milestones recorded
            </div>
          ) : (
            checklistItems.map(c => (
              <div key={c.title} style={{ background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: '#cbd5e1' }}>{c.title}</span>
                <span style={{ fontSize: '11px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#34d399' }}>{c.progress}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
