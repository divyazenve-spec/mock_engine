import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function HRReport() {
  const [toast, setToast] = useState('');

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const departments = [
    { dept: 'Veterinary Medicine & Surgery', headcount: 48, attendance: '98.5%', targetAttainment: '106.2%', monthlyPayroll: 3840000, avgOvertimeHrs: 12, attrition: '1.8%' },
    { dept: '60-Min Express Logistics & Dark Stores', headcount: 142, attendance: '96.2%', targetAttainment: '104.5%', monthlyPayroll: 4260000, avgOvertimeHrs: 18, attrition: '4.2%' },
    { dept: 'Customer Experience & Pet Tele-Triage', headcount: 34, attendance: '97.8%', targetAttainment: '102.8%', monthlyPayroll: 1870000, avgOvertimeHrs: 8, attrition: '2.5%' },
    { dept: 'Supply Chain, Procurement & Inventory', headcount: 26, attendance: '99.1%', targetAttainment: '105.0%', monthlyPayroll: 1950000, avgOvertimeHrs: 10, attrition: '1.2%' },
    { dept: 'Software Engineering, Product & AI', headcount: 38, attendance: '99.4%', targetAttainment: '108.4%', monthlyPayroll: 5320000, avgOvertimeHrs: 6, attrition: '1.0%' },
    { dept: 'Growth Marketing & Brand Communication', headcount: 18, attendance: '98.0%', targetAttainment: '103.5%', monthlyPayroll: 1890000, avgOvertimeHrs: 7, attrition: '2.1%' },
    { dept: 'Clinical Pathology & Lab Diagnostics', headcount: 22, attendance: '98.8%', targetAttainment: '105.6%', monthlyPayroll: 1760000, avgOvertimeHrs: 11, attrition: '1.5%' },
    { dept: 'Finance, Billing & Revenue Assurance', headcount: 16, attendance: '99.2%', targetAttainment: '101.8%', monthlyPayroll: 1520000, avgOvertimeHrs: 9, attrition: '0.8%' },
    { dept: 'People Operations & Clinical Training', headcount: 12, attendance: '99.5%', targetAttainment: '102.0%', monthlyPayroll: 1080000, avgOvertimeHrs: 4, attrition: '0.0%' },
    { dept: 'Legal, Regulatory Compliance & Pet Welfare', headcount: 8, attendance: '100.0%', targetAttainment: '100.0%', monthlyPayroll: 960000, avgOvertimeHrs: 3, attrition: '0.0%' }
  ];

  const inr = (n) => '₹' + (Number(n) / 100000).toFixed(2) + ' Lakhs';

  const downloadCSV = () => {
    const rows = [
      ['Department', 'Headcount', 'Attendance Rate', 'Target Attainment', 'Monthly Payroll (INR)', 'Avg Overtime Hours', 'Monthly Attrition'],
      ...departments.map(d => [d.dept, d.headcount, d.attendance, d.targetAttainment, d.monthlyPayroll, d.avgOvertimeHrs, d.attrition])
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(',')).join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `zenve_hr_workforce_report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('HR Workforce Report CSV downloaded.');
  };

  return (
    <DashboardLayout
      category="Reports & Analytics"
      subcategory="HR Reports"
      title="Workforce, Clinical Roster & Payroll Analytics Report"
      subtitle="Headcount allocation across 6 functional divisions, doctor/nurse shift attendance, quota pacing, overtime distribution, and monthly payroll"
      icon="🧑‍💼"
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
          <span>📥</span> Export HR CSV
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
        <KpiCard label="Total Organization Headcount" value="364 Personnel" delta="+28 Joined" trend="up" subtext="Across 10 corporate & medical teams" icon="👥" />
        <KpiCard label="Average Shift Attendance" value="98.6%" delta="+1.2%" trend="up" subtext="Shift adherence across nodes" icon="📅" />
        <KpiCard label="Monthly Payroll Disbursement" value="₹2.44 Cr" delta="+6.8%" trend="up" subtext="Disbursed October payroll" icon="💳" />
        <KpiCard label="Annualized Attrition Rate" value="1.9%" delta="-0.7%" trend="up" subtext="Industry-leading retention" icon="🌟" />
      </div>

      {/* Table Section */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Departmental Headcount, Attendance & Payroll Allocation</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)' }}>
                <th style={{ padding: '10px 12px' }}>Department Division</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Headcount</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Attendance</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Attainment</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Monthly Payroll</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Avg Overtime</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Attrition</th>
              </tr>
            </thead>
            <tbody>
              {departments.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '24px', textAlign: 'center', color: 'var(--muted-foreground, #94a3b8)' }}>
                    No department workforce records found
                  </td>
                </tr>
              ) : (
                departments.map((d) => (
                  <tr key={d.dept} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{d.dept}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{d.headcount}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{d.attendance}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, color: '#34d399', fontFamily: '"IBM Plex Mono", monospace' }}>{d.targetAttainment}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, color: '#60a5fa', fontFamily: '"IBM Plex Mono", monospace' }}>{inr(d.monthlyPayroll)}</td>
                    <td style={{ padding: '12px', textAlign: 'right', color: d.avgOvertimeHrs > 20 ? '#f87171' : 'var(--foreground, #f8fafc)', fontFamily: '"IBM Plex Mono", monospace' }}>{d.avgOvertimeHrs} hrs/wk</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{d.attrition}</td>
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
