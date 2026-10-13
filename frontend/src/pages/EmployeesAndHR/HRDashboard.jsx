import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function HRDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [period, setPeriod] = useState('MTD');
  const [synced, setSynced] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('ALL');
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showReqModal, setShowReqModal] = useState(false);

  const deptHeadcounts = [
    { name: 'Clinical Veterinary Services', count: 48, budget: '₹38.5L / mo', color: '#10b981' },
    { name: 'Central Pet Pharmacy', count: 34, budget: '₹22.8L / mo', color: '#0ea5e9' },
    { name: 'Hyperlocal 60-Min Logistics', count: 42, budget: '₹21.5L / mo', color: '#f59e0b' },
    { name: 'Technology & AI Engineering', count: 28, budget: '₹36.2L / mo', color: '#8b5cf6' },
    { name: 'Warehouse & Inventory Hubs', count: 22, budget: '₹12.4L / mo', color: '#ec4899' },
    { name: 'Customer Delight & Concierge', count: 16, budget: '₹9.8L / mo', color: '#14b8a6' },
    { name: 'Diagnostic Labs & Pathology', count: 12, budget: '₹11.6L / mo', color: '#6366f1' },
    { name: 'HR & Talent Acquisition', count: 6, budget: '₹5.8L / mo', color: '#84cc16' },
    { name: 'Finance & Audit Operations', count: 5, budget: '₹6.2L / mo', color: '#eab308' },
    { name: 'Veterinary Surgery & ICU', count: 15, budget: '₹16.4L / mo', color: '#06b6d4' }
  ];

  const [employees, setEmployees] = useState([
    { id: 'EMP-1001', name: 'Dr. Priya Nair', role: 'Chief Veterinary Officer', dept: 'Clinical', loc: 'Koramangala Super-Specialty Hospital', email: 'priya.nair@zenvepet.com', phone: '+91 98450 11201', joined: '15 Jan 2022', status: 'Active', salary: '₹2,10,000 / mo', rating: '5.0★' },
    { id: 'EMP-1002', name: 'Dr. Rajesh Varma', role: 'Lead Veterinary Surgeon', dept: 'Clinical', loc: 'Indiranagar Hospital', email: 'rajesh.varma@zenvepet.com', phone: '+91 98450 22302', joined: '04 Mar 2022', status: 'Active', salary: '₹1,90,000 / mo', rating: '4.9★' },
    { id: 'EMP-1003', name: 'Sneha Kulkarni', role: 'Head of Central Pharmacy', dept: 'Pharmacy', loc: 'Whitefield Fulfilment Hub', email: 'sneha.kulkarni@zenvepet.com', phone: '+91 98450 33403', joined: '10 Aug 2022', status: 'Active', salary: '₹1,40,000 / mo', rating: '4.9★' },
    { id: 'EMP-1004', name: 'Vikramaditya Rao', role: 'Director of Engineering & AI', dept: 'Technology', loc: 'Bellandur Tech Park HQ', email: 'vikram.rao@zenvepet.com', phone: '+91 98450 44504', joined: '01 Feb 2023', status: 'Active', salary: '₹2,50,000 / mo', rating: '5.0★' },
    { id: 'EMP-1005', name: 'Ananya Sen', role: 'Lead Talent Acquisition & HR', dept: 'HR', loc: 'Koramangala Central HQ', email: 'ananya.sen@zenvepet.com', phone: '+91 98450 55605', joined: '18 May 2023', status: 'Active', salary: '₹1,18,000 / mo', rating: '4.8★' },
    { id: 'EMP-1006', name: 'Karthik Subramaniam', role: 'Hyperlocal Fleet Operations Mgr', dept: 'Logistics', loc: 'HSR Sector 2 Hub', email: 'karthik.s@zenvepet.com', phone: '+91 98450 66706', joined: '12 Jul 2023', status: 'Active', salary: '₹1,10,000 / mo', rating: '4.9★' },
    { id: 'EMP-1007', name: 'Pooja Hegde', role: 'Senior Veterinary Pathologist', dept: 'Clinical', loc: 'Jayanagar 4th Block Clinic', email: 'pooja.hegde@zenvepet.com', phone: '+91 98450 77807', joined: '20 Sep 2023', status: 'Active', salary: '₹1,45,000 / mo', rating: '4.9★' },
    { id: 'EMP-1008', name: 'Mohammed Zeeshan', role: 'Lead Customer Experience', dept: 'Customer Delight', loc: 'Central Support Node', email: 'm.zeeshan@zenvepet.com', phone: '+91 98450 88908', joined: '05 Jan 2024', status: 'Active', salary: '₹88,000 / mo', rating: '4.8★' },
    { id: 'EMP-1009', name: 'Rahul Deshmukh', role: 'Dark Store Warehouse Supervisor', dept: 'Warehouse', loc: 'Electronic City Warehouse', email: 'rahul.d@zenvepet.com', phone: '+91 98450 99009', joined: '15 Mar 2024', status: 'On Leave', salary: '₹82,000 / mo', rating: '4.7★' },
    { id: 'EMP-1010', name: 'Divya Nambiar', role: 'Junior Clinical Associate', dept: 'Clinical', loc: 'Koramangala Super-Specialty Hospital', email: 'divya.nambiar@zenvepet.com', phone: '+91 98450 00110', joined: '01 Aug 2024', status: 'Probation', salary: '₹75,000 / mo', rating: '4.8★' }
  ]);

  const [leaveRequests, setLeaveRequests] = useState([
    { id: 'LV-2026-101', name: 'Dr. Priya Nair', role: 'Chief Veterinary Officer', type: 'Casual Leave', dates: '18 Oct - 20 Oct (3d)', reason: 'Indian Vet Congress Keynote', bal: '14 Days Remaining', status: 'Pending' },
    { id: 'LV-2026-102', name: 'Rahul Deshmukh', role: 'Warehouse Supervisor', type: 'Privilege Leave', dates: '10 Oct - 16 Oct (7d)', reason: 'Family Wedding', bal: '8 Days Remaining', status: 'Approved' },
    { id: 'LV-2026-103', name: 'Sneha Kulkarni', role: 'Head of Pharmacy', type: 'Sick Leave', dates: '02 Oct - 03 Oct (2d)', reason: 'Seasonal Flu Recovery', bal: '10 Days Remaining', status: 'Approved' },
    { id: 'LV-2026-104', name: 'Karthik Subramaniam', role: 'Fleet Manager', type: 'Comp Off', dates: '22 Oct (1d)', reason: 'Overtime festival coverage', bal: '3 Days Remaining', status: 'Pending' },
    { id: 'LV-2026-105', name: 'Mohammed Zeeshan', role: 'CX Lead', type: 'Casual Leave', dates: '24 Oct - 25 Oct (2d)', reason: 'Personal errands', bal: '12 Days Remaining', status: 'Pending' },
    { id: 'LV-2026-106', name: 'Dr. Rajesh Varma', role: 'Lead Surgeon', type: 'Maternity/Paternity', dates: '01 Nov - 15 Nov (15d)', reason: 'Paternity leave', bal: '15 Days Remaining', status: 'Approved' },
    { id: 'LV-2026-107', name: 'Pooja Hegde', role: 'Pathologist', type: 'Casual Leave', dates: '28 Oct (1d)', reason: 'Family Function', bal: '11 Days Remaining', status: 'Pending' },
    { id: 'LV-2026-108', name: 'Vikramaditya Rao', role: 'Engineering Director', type: 'Privilege Leave', dates: '12 Nov - 16 Nov (5d)', reason: 'Annual Vacation', bal: '18 Days Remaining', status: 'Pending' },
    { id: 'LV-2026-109', name: 'Ananya Sen', role: 'Talent Acquisition', type: 'Casual Leave', dates: '19 Oct (1d)', reason: 'Doctor Appointment', bal: '9 Days Remaining', status: 'Approved' },
    { id: 'LV-2026-110', name: 'Divya Nambiar', role: 'Clinical Associate', type: 'Casual Leave', dates: '21 Oct (1d)', reason: 'University Convocation', bal: '5 Days Remaining', status: 'Pending' }
  ]);

  const [openJobs, setOpenJobs] = useState([
    { id: 'REQ-2026-081', title: 'Senior Small Animal Surgeon (Orthopedics)', dept: 'Clinical', loc: 'Indiranagar Hospital', openings: 2, applicants: 48, interview: 6, priority: 'Urgent' },
    { id: 'REQ-2026-082', title: 'Registered Veterinary Nurse (ICU Specialist)', dept: 'Clinical', loc: 'Koramangala Hospital', openings: 4, applicants: 72, interview: 12, priority: 'Urgent' },
    { id: 'REQ-2026-083', title: 'Clinical Pharmacist & Formulary Specialist', dept: 'Pharmacy', loc: 'Whitefield Hub', openings: 2, applicants: 34, interview: 5, priority: 'High' },
    { id: 'REQ-2026-084', title: 'Hyperlocal Fleet Dispatcher & Route Planner', dept: 'Logistics', loc: 'HSR Layout Node', openings: 3, applicants: 52, interview: 8, priority: 'High' },
    { id: 'REQ-2026-085', title: 'Senior AI Engineer (Pet Diagnostics & LLMs)', dept: 'Technology', loc: 'Bellandur HQ', openings: 2, applicants: 86, interview: 4, priority: 'Urgent' },
    { id: 'REQ-2026-086', title: 'Dark Store Operations Lead', dept: 'Warehouse', loc: 'Electronic City Hub', openings: 1, applicants: 26, interview: 3, priority: 'High' },
    { id: 'REQ-2026-087', title: 'Customer Delight Concierge (Kannada & English)', dept: 'Customer Delight', loc: 'Central Support HQ', openings: 5, applicants: 110, interview: 18, priority: 'Urgent' },
    { id: 'REQ-2026-088', title: 'Biomarker Lab Technologist', dept: 'Clinical', loc: 'Jayanagar Clinic', openings: 2, applicants: 29, interview: 4, priority: 'Standard' },
    { id: 'REQ-2026-089', title: 'Corporate HR Generalist & Payroll Specialist', dept: 'HR', loc: 'Koramangala HQ', openings: 1, applicants: 42, interview: 5, priority: 'Standard' },
    { id: 'REQ-2026-090', title: 'Senior Fullstack Engineer (React & FastAPI)', dept: 'Technology', loc: 'Bellandur HQ', openings: 2, applicants: 95, interview: 7, priority: 'High' }
  ]);

  function approveLeave(id) {
    setLeaveRequests(leaveRequests.map(l => l.id === id ? { ...l, status: 'Approved' } : l));
  }

  function rejectLeave(id) {
    setLeaveRequests(leaveRequests.map(l => l.id === id ? { ...l, status: 'Rejected' } : l));
  }

  const filteredEmployees = employees.filter(e => {
    const matchSearch = (e.name + ' ' + e.role + ' ' + e.dept + ' ' + e.loc + ' ' + e.id).toLowerCase().includes(searchTerm.toLowerCase());
    const matchDept = filterDept === 'ALL' || e.dept.toLowerCase().includes(filterDept.toLowerCase());
    return matchSearch && matchDept;
  });

  return (
    <DashboardLayout
      category="Employees & HR"
      subcategory="HR Dashboard"
      title="Human Resources & Workforce Executive Command Center"
      subtitle="Executive headcount telemetry, talent acquisition pacing, attendance governance, and payroll expenditure"
      icon="🧑‍💼"
      badge=""
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setShowAddModal(true)}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              border: 'none',
              background: '#3b82f6',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>➕</span> Onboard Staff
          </button>
          <button
            onClick={() => {
              setSynced(true);
              setTimeout(() => setSynced(false), 2200);
            }}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              border: '1px solid rgba(255,255,255,0.15)',
              background: synced ? '#10b981' : 'rgba(255,255,255,0.06)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>{synced ? '✅' : '🔄'}</span> {synced ? 'Roster Synced!' : 'Sync HRIS'}
          </button>
        </div>
      }
    >
      {/* Navigation Tabs Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        overflowX: 'auto',
        padding: '6px',
        background: 'var(--card, #131b2e)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '10px',
        marginBottom: '20px'
      }}>
        {[
          { id: 'overview', label: 'HR Executive Overview', icon: '🧑‍💼' },
          { id: 'directory', label: 'Workforce Directory', icon: '👥', badge: '10' },
          { id: 'attendance', label: 'Attendance & Leaves', icon: '⏰', badge: '6 Pending' },
          { id: 'payroll', label: 'Payroll & Cost Ledger', icon: '💵', badge: '₹1.81 Cr' },
          { id: 'recruitment', label: 'Talent Acquisition', icon: '📢', badge: '10 Roles' },
          { id: 'performance', label: 'Performance & Culture', icon: '⭐', badge: '95.2%' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              height: '36px',
              padding: '0 16px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === t.id ? '#3b82f6' : 'transparent',
              color: activeTab === t.id ? '#ffffff' : 'var(--muted-foreground, #94a3b8)',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease'
            }}
          >
            <span>{t.icon}</span>
            <span>{t.label}</span>
            {t.badge && (
              <span style={{
                fontSize: '10px',
                padding: '1px 6px',
                borderRadius: '99px',
                background: activeTab === t.id ? 'rgba(255,255,255,0.2)' : 'rgba(59,130,246,0.15)',
                color: activeTab === t.id ? '#fff' : '#93c5fd'
              }}>
                {t.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div>
          {/* Top Level KPIs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '20px' }}>
            <KpiCard label="Active Headcount" value="228 Staff" delta="+14 YoY" trend="up" subtext="Across 10 core divisions" icon="👥" />
            <KpiCard label="Monthly Payroll Burn" value="₹1,81,20,000" delta="+4.2%" trend="up" subtext="Salaries, PF, ESI & bonuses" icon="💵" />
            <KpiCard label="Workforce Retention Rate" value="96.8%" delta="+2.4%" trend="up" subtext="Top-quartile healthcare benchmark" icon="🤝" />
            <KpiCard label="eNPS Pulse Score" value="+68 eNPS" delta="+5.2" trend="up" subtext="Quarterly employee pulse" icon="❤️" />
          </div>

          {/* Department Stratification & Vital Signs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '16px', marginBottom: '20px' }}>
            <div style={{
              background: 'var(--card, #1e293b)',
              border: '1px solid var(--border, rgba(255,255,255,0.08))',
              borderRadius: '12px',
              padding: '20px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>🏢 Department Headcount &amp; Budget</h3>
                <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '6px', background: 'rgba(59,130,246,0.15)', color: '#60a5fa', fontWeight: 600 }}>Active Roster</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {deptHeadcounts.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--muted-foreground, #94a3b8)', fontSize: '12px' }}>
                    No department headcount records found
                  </div>
                ) : (
                  deptHeadcounts.map(d => {
                    const pct = Math.round((d.count / 228) * 100);
                    return (
                      <div key={d.name}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                          <span style={{ color: d.color, fontWeight: 600 }}>{d.name}</span>
                          <span style={{ color: 'var(--muted-foreground, #94a3b8)', fontFamily: '"IBM Plex Mono", monospace' }}>{d.count} staff · {pct}% ({d.budget})</span>
                        </div>
                        <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', overflow: 'hidden' }}>
                          <div style={{ width: `${pct}%`, height: '100%', background: d.color, borderRadius: '99px' }}></div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <div style={{
              background: 'var(--card, #1e293b)',
              border: '1px solid var(--border, rgba(255,255,255,0.08))',
              borderRadius: '12px',
              padding: '20px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>⚡ Workforce Vital Signs</h3>
                <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '6px', background: 'rgba(16,185,129,0.15)', color: '#10b981', fontWeight: 600 }}>Healthy Org</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)' }}>
                  <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>Clocked In Today</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: '#f8fafc', marginTop: '2px' }}>218 / 228</div>
                  <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>95.6% active staffing coverage</div>
                </div>
                <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(14,165,233,0.06)', border: '1px solid rgba(14,165,233,0.2)' }}>
                  <div style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 600 }}>Time to Hire</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: '#f8fafc', marginTop: '2px' }}>19 Days</div>
                  <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>10 active requisitions</div>
                </div>
                <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)' }}>
                  <div style={{ fontSize: '11px', color: '#fbbf24', fontWeight: 600 }}>Pending Leaves</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: '#f8fafc', marginTop: '2px' }}>6 Requests</div>
                  <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>Manager queue awaiting signoff</div>
                </div>
                <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.2)' }}>
                  <div style={{ fontSize: '11px', color: '#c4b5fd', fontWeight: 600 }}>Day-1 Readiness</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: '#f8fafc', marginTop: '2px' }}>98.5%</div>
                  <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>Hardware & BGV pre-provisioned</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Directory */}
      {activeTab === 'directory' && (
        <div style={{
          background: 'var(--card, #1e293b)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '12px',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <input
              type="text"
              placeholder="Search by name, role, department, location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: '1 1 300px',
                padding: '8px 14px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(0,0,0,0.25)',
                color: '#fff',
                fontSize: '12px'
              }}
            />
            <select
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.12)',
                background: '#0f172a',
                color: '#fff',
                fontSize: '12px'
              }}
            >
              <option value="ALL">All Departments</option>
              <option value="Clinical">Clinical</option>
              <option value="Pharmacy">Pharmacy</option>
              <option value="Logistics">Logistics</option>
              <option value="Warehouse">Warehouse</option>
              <option value="Technology">Technology</option>
            </select>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)', color: 'var(--muted-foreground, #94a3b8)' }}>
                  <th style={{ padding: '12px 16px' }}>Staff Member</th>
                  <th style={{ padding: '12px 16px' }}>Department</th>
                  <th style={{ padding: '12px 16px' }}>Location</th>
                  <th style={{ padding: '12px 16px' }}>Contact Info</th>
                  <th style={{ padding: '12px 16px' }}>Gross CTC</th>
                  <th style={{ padding: '12px 16px' }}>Status</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right' }}>Ac              <tbody>
                {filteredEmployees.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ padding: '36px 16px', textAlign: 'center', color: '#94a3b8' }}>
                      No staff records found
                    </td>
                  </tr>
                ) : (
                  filteredEmployees.map(e => (
                    <tr key={e.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ fontWeight: 600, color: '#f8fafc' }}>{e.name}</div>
                        <div style={{ fontSize: '11px', fontFamily: '"IBM Plex Mono", monospace', color: 'var(--muted-foreground, #94a3b8)' }}>{e.id} · {e.role}</div>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '11px', background: 'rgba(56,189,248,0.15)', color: '#38bdf8', fontWeight: 600 }}>
                          {e.dept}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', color: '#cbd5e1' }}>{e.loc}</td>
                      <td style={{ padding: '12px 16px', color: '#94a3b8' }}>{e.email}<br/><small style={{ color: '#64748b' }}>{e.phone}</small></td>
                      <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', color: '#34d399', fontWeight: 600 }}>{e.salary}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{
                          padding: '3px 8px',
                          borderRadius: '99px',
                          fontSize: '10px',
                          fontWeight: 700,
                          background: e.status === 'Active' ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)',
                          color: e.status === 'Active' ? '#10b981' : '#f59e0b'
                        }}>
                          ● {e.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                        <button
                          onClick={() => setSelectedStaff(e)}
                          style={{
                            padding: '4px 10px',
                            borderRadius: '6px',
                            fontSize: '11px',
                            border: '1px solid rgba(255,255,255,0.15)',
                            background: 'transparent',
                            color: '#93c5fd',
                            cursor: 'pointer'
                          }}
                        >
                          View 360°
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Attendance & Leaves */}
      {activeTab === 'attendance' && (
        <div style={{
          background: 'var(--card, #1e293b)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '12px',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Leave Requests Approval Queue ({leaveRequests.length})</h3>
            <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>Biometric Sync: Online</span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)', color: 'var(--muted-foreground, #94a3b8)' }}>
                  <th style={{ padding: '12px 16px' }}>Request ID</th>
                  <th style={{ padding: '12px 16px' }}>Staff Member</th>
                  <th style={{ padding: '12px 16px' }}>Leave Category</th>
                  <th style={{ padding: '12px 16px' }}>Duration</th>
                  <th style={{ padding: '12px 16px' }}>Available Balance</th>
                  <th style={{ padding: '12px 16px' }}>Status</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ padding: '36px 16px', textAlign: 'center', color: '#94a3b8' }}>
                      No leave requests found
                    </td>
                  </tr>
                ) : (
                  leaveRequests.map(lr => (
                    <tr key={lr.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', color: '#93c5fd' }}>{lr.id}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ fontWeight: 600, color: '#f8fafc' }}>{lr.name}</div>
                        <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)' }}>{lr.role}</div>
                      </td>
                      <td style={{ padding: '12px 16px', color: '#cbd5e1' }}>{lr.type}</td>
                      <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', color: '#f8fafc' }}>{lr.dates}</td>
                      <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', color: '#34d399' }}>{lr.bal}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{
                          padding: '3px 8px',
                          borderRadius: '99px',
                          fontSize: '10px',
                          fontWeight: 700,
                          background: lr.status === 'Approved' ? 'rgba(16,185,129,0.15)' : lr.status === 'Pending' ? 'rgba(234,179,8,0.15)' : 'rgba(239,68,68,0.15)',
                          color: lr.status === 'Approved' ? '#10b981' : lr.status === 'Pending' ? '#eab308' : '#ef4444'
                        }}>
                          ● {lr.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                        {lr.status === 'Pending' ? (
                          <div style={{ display: 'inline-flex', gap: '6px' }}>
                            <button onClick={() => approveLeave(lr.id)} style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, background: '#10b981', color: '#fff', border: 'none', cursor: 'pointer' }}>Approve</button>
                            <button onClick={() => rejectLeave(lr.id)} style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, background: '#ef4444', color: '#fff', border: 'none', cursor: 'pointer' }}>Reject</button>
                          </div>
                        ) : (
                          <span style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)' }}>Processed</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Payroll & Cost */}
      {activeTab === 'payroll' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '20px' }}>
            <KpiCard label="Monthly Gross Disbursal" value="₹1,81,20,000" delta="+4.2%" trend="up" subtext="Current period" icon="💵" />
            <KpiCard label="PF &amp; ESI Statutory" value="₹21,74,400" delta="Remitted to EPFO" trend="up" subtext="Zero compliance default" icon="🏛️" />
            <KpiCard label="TDS Tax Deducted" value="₹18,50,000" delta="+2.8%" trend="neutral" subtext="Tax deposit ready" icon="🧾" />
            <KpiCard label="Annualized CTC Spend" value="₹21.74 Cr" delta="+6.5%" trend="up" subtext="Current financial plan" icon="💰" />
          </div>

          <div style={{
            background: 'var(--card, #1e293b)',
            border: '1px solid var(--border, rgba(255,255,255,0.08))',
            borderRadius: '12px',
            padding: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>🏦 Corporate Bank Disbursal Batches</h3>
                <p style={{ margin: '2px 0 0', fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)' }}>HDFC Corporate Banking &amp; ICICI CMS gateway</p>
              </div>
              <button
                onClick={() => alert('Corporate NEFT Batch XML downloaded successfully.')}
                style={{ padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, background: '#10b981', color: '#fff', border: 'none', cursor: 'pointer' }}
              >
                📥 Download Bank Batch (NEFT)
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px', fontSize: '12px' }}>
              <div style={{ background: 'rgba(0,0,0,0.25)', padding: '14px', borderRadius: '10px' }}>
                <strong style={{ color: '#f8fafc' }}>Batch HDFC-0926-01 (Clinical &amp; Doctors)</strong>
                <div style={{ color: '#34d399', fontFamily: '"IBM Plex Mono", monospace', fontSize: '16px', margin: '4px 0' }}>₹66,50,000</div>
                <div style={{ color: '#94a3b8' }}>48 Accounts Credited · Verified ✅</div>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.25)', padding: '14px', borderRadius: '10px' }}>
                <strong style={{ color: '#f8fafc' }}>Batch HDFC-0926-02 (Tech, Pharmacy, Ops)</strong>
                <div style={{ color: '#34d399', fontFamily: '"IBM Plex Mono", monospace', fontSize: '16px', margin: '4px 0' }}>₹70,40,000</div>
                <div style={{ color: '#94a3b8' }}>82 Accounts Credited · Verified ✅</div>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.25)', padding: '14px', borderRadius: '10px' }}>
                <strong style={{ color: '#f8fafc' }}>Batch ICICI-0926-03 (Delivery Riders)</strong>
                <div style={{ color: '#34d399', fontFamily: '"IBM Plex Mono", monospace', fontSize: '16px', margin: '4px 0' }}>₹44,30,000</div>
                <div style={{ color: '#94a3b8' }}>78 Accounts Credited · Verified ✅</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Recruitment */}
      {activeTab === 'recruitment' && (
        <div style={{
          background: 'var(--card, #1e293b)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '12px',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Open Requisitions &amp; Hiring Pipeline ({openJobs.length})</h3>
            <button
              onClick={() => setShowReqModal(true)}
              style={{ padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, background: '#3b82f6', color: '#fff', border: 'none', cursor: 'pointer' }}
            >
              ➕ Post New Job
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)', color: 'var(--muted-foreground, #94a3b8)' }}>
                  <th style={{ padding: '12px 16px' }}>Requisition &amp; Role</th>
                  <th style={{ padding: '12px 16px' }}>Department</th>
                  <th style={{ padding: '12px 16px' }}>Location</th>
                  <th style={{ padding: '12px 16px' }}>Openings</th>
                  <th style={{ padding: '12px 16px' }}>Applicants</th>
                  <th style={{ padding: '12px 16px' }}>Interviews</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right' }}>Priority</th>
                </tr>
              </thead>
              <tbody>
                {openJobs.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ padding: '36px 16px', textAlign: 'center', color: '#94a3b8' }}>
                      No open job requisitions found
                    </td>
                  </tr>
                ) : (
                  openJobs.map(j => (
                    <tr key={j.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ fontWeight: 600, color: '#f8fafc' }}>{j.title}</div>
                        <div style={{ fontSize: '11px', fontFamily: '"IBM Plex Mono", monospace', color: 'var(--muted-foreground, #94a3b8)' }}>{j.id}</div>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '11px', background: 'rgba(56,189,248,0.15)', color: '#38bdf8' }}>{j.dept}</span>
                      </td>
                      <td style={{ padding: '12px 16px', color: '#cbd5e1' }}>{j.loc}</td>
                      <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#f8fafc' }}>{j.openings}</td>
                      <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', color: '#38bdf8' }}>{j.applicants}</td>
                      <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', color: '#f59e0b' }}>{j.interview}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                        <span style={{
                          padding: '3px 8px',
                          borderRadius: '99px',
                          fontSize: '10px',
                          fontWeight: 700,
                          background: j.priority === 'Urgent' ? 'rgba(239,68,68,0.15)' : 'rgba(245,158,11,0.15)',
                          color: j.priority === 'Urgent' ? '#ef4444' : '#f59e0b'
                        }}>
                          ● {j.priority}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 6: Performance */}
      {activeTab === 'performance' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '20px' }}>
            <KpiCard label="Avg Org KPI Score" value="94.6%" delta="+3.1%" trend="up" subtext="208 scorecards submitted" icon="🎯" />
            <KpiCard label="Top Performers" value="42 Staff" delta="Tier 1" trend="up" subtext="Eligible for merit bonus" icon="🌟" />
            <KpiCard label="Pet Parent CSAT" value="4.92 / 5.0" delta="+0.08" trend="up" subtext="12,480 pet reviews" icon="❤️" />
            <KpiCard label="Appraisals Completed" value="98.2%" delta="4 Pending" trend="up" subtext="Cycle closing 31 Oct" icon="📝" />
          </div>

          <div style={{
            background: 'var(--card, #1e293b)',
            border: '1px solid var(--border, rgba(255,255,255,0.08))',
            borderRadius: '12px',
            padding: '20px'
          }}>
            <h3 style={{ margin: '0 0 14px', fontSize: '15px', fontWeight: 700 }}>🏆 Q3 2026 Employee Recognition &amp; Spot Awards (10 Honorees)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
              {[
                { name: 'Dr. Priya Nair', role: 'Chief Veterinary Officer', award: 'Clinical Life Saver of the Quarter', reason: 'Zero mortality in 42 emergency polytrauma surgeries' },
                { name: 'Dr. Rajesh Varma', role: 'Lead Surgeon', award: 'Excellence in Surgical Care', reason: '99.4% post-operative recovery rate on 320 orthopedics' },
                { name: 'Sneha Kulkarni', role: 'Head of Pharmacy', award: 'Zero Cold-Chain Deviation', reason: '100% audit pass across 16,000 temperature-controlled biologics' },
                { name: 'Vikramaditya Rao', role: 'Engineering Director', award: 'AI Innovation Laureate', reason: 'Deployed Gemini pet symptom triaging with 94% diagnostic agreement' },
                { name: 'Ananya Sen', role: 'Talent Acquisition', award: 'Rapid Scale Champion', reason: 'Hired 19 specialty vets with a record 19-day average time-to-hire' },
                { name: 'Karthik Subramaniam', role: 'Fleet Manager', award: 'Lightning Dispatcher', reason: 'Achieved 44.2 min average 60-min express delivery in Bengaluru rains' },
                { name: 'Pooja Hegde', role: 'Senior Pathologist', award: 'STAT Lab Master', reason: 'Under 3.2 hour turnaround on 1,280 critical biomarker profiles' },
                { name: 'Mohammed Zeeshan', role: 'Customer Experience Lead', award: 'Pet Parent Delight Hero', reason: 'Maintained 4.98 CSAT across 4,680 empathetic support tickets' },
                { name: 'Rahul Deshmukh', role: 'Warehouse Supervisor', award: 'Inventory Precision Award', reason: 'Zero inventory variance across 51,200 pick/pack orders' },
                { name: 'Divya Nambiar', role: 'Junior Associate', award: 'Rising Star of the Year', reason: 'Exemplary clinical sedation monitoring across 180 critical patients' }
              ].map(a => (
                <div key={a.name} style={{ background: 'rgba(0,0,0,0.25)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <strong style={{ color: '#f8fafc', fontSize: '13px' }}>{a.name}</strong>
                    <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', background: 'rgba(245,158,11,0.15)', color: '#fbbf24', fontWeight: 600 }}>Spot Award</span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>{a.role}</div>
                  <div style={{ color: '#38bdf8', fontSize: '12px', fontWeight: 600, marginTop: '8px' }}>🏅 {a.award}</div>
                  <div style={{ color: '#cbd5e1', fontSize: '11px', marginTop: '4px', lineHeight: '1.4' }}>{a.reason}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Staff 360 Modal */}
      {selectedStaff && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{
            background: '#162036',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '14px',
            padding: '24px',
            maxWidth: '520px',
            width: '90%',
            color: '#fff'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '18px' }}>👤 Staff Profile: {selectedStaff.name}</h3>
              <button onClick={() => setSelectedStaff(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '18px', cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px' }}>
              <div><strong style={{ color: '#94a3b8' }}>ID:</strong> <div style={{ fontFamily: 'monospace' }}>{selectedStaff.id}</div></div>
              <div><strong style={{ color: '#94a3b8' }}>Role:</strong> <div>{selectedStaff.role}</div></div>
              <div><strong style={{ color: '#94a3b8' }}>Department:</strong> <div>{selectedStaff.dept}</div></div>
              <div><strong style={{ color: '#94a3b8' }}>Location:</strong> <div>{selectedStaff.loc}</div></div>
              <div><strong style={{ color: '#94a3b8' }}>Official Email:</strong> <div>{selectedStaff.email}</div></div>
              <div><strong style={{ color: '#94a3b8' }}>Phone:</strong> <div>{selectedStaff.phone}</div></div>
              <div><strong style={{ color: '#94a3b8' }}>Joined Date:</strong> <div>{selectedStaff.joined}</div></div>
              <div><strong style={{ color: '#94a3b8' }}>Gross CTC:</strong> <div style={{ color: '#34d399', fontWeight: 600 }}>{selectedStaff.salary}</div></div>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setSelectedStaff(null)} style={{ padding: '8px 16px', borderRadius: '8px', background: '#3b82f6', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Onboard Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{
            background: '#162036',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '14px',
            padding: '24px',
            maxWidth: '500px',
            width: '90%',
            color: '#fff'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '18px' }}>➕ Onboard New Employee</h3>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '18px', cursor: 'pointer' }}>✕</button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.target);
              const newEmp = {
                id: `EMP-${Math.floor(1000 + Math.random() * 9000)}`,
                name: fd.get('name'),
                role: fd.get('role'),
                dept: fd.get('dept'),
                loc: fd.get('loc'),
                email: fd.get('name').toLowerCase().replace(/ /g, '.') + '@zenve.in',
                phone: '+91 98000 00000',
                joined: 'Today',
                status: 'Active',
                salary: '₹0/mo',
                rating: '5.0★'
              };
              setEmployees([newEmp, ...employees]);
              setShowAddModal(false);
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input required name="name" placeholder="Full Name" style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(0,0,0,0.25)', color: '#fff' }} />
                <input required name="role" placeholder="Role / Designation" style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(0,0,0,0.25)', color: '#fff' }} />
                <select name="dept" style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.12)', background: '#0f172a', color: '#fff' }}>
                  <option value="Clinical">Veterinary Clinical</option>
                  <option value="Pharmacy">Pharmacy</option>
                  <option value="Logistics">Logistics & Delivery</option>
                  <option value="Warehouse">Warehouse Ops</option>
                  <option value="Technology">Technology & AI</option>
                  <option value="Customer Delight">Customer Delight</option>
                </select>
                <input required name="loc" placeholder="Work Location (e.g. Bengaluru Flagship)" style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(0,0,0,0.25)', color: '#fff' }} />
              </div>
              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setShowAddModal(false)} style={{ padding: '8px 16px', borderRadius: '8px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ padding: '8px 16px', borderRadius: '8px', background: '#3b82f6', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>Save Staff</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Requisition Modal */}
      {showReqModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{
            background: '#162036',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '14px',
            padding: '24px',
            maxWidth: '500px',
            width: '90%',
            color: '#fff'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '18px' }}>📢 Post Job Requisition</h3>
              <button onClick={() => setShowReqModal(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '18px', cursor: 'pointer' }}>✕</button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.target);
              const newJob = {
                id: `REQ-${Math.floor(100 + Math.random() * 900)}`,
                title: fd.get('title'),
                dept: fd.get('dept'),
                loc: fd.get('loc'),
                openings: Number(fd.get('openings')),
                applicants: 0,
                interview: 0,
                priority: 'High'
              };
              setOpenJobs([newJob, ...openJobs]);
              setShowReqModal(false);
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input required name="title" placeholder="Job Title (e.g. Critical Care Surgeon)" style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(0,0,0,0.25)', color: '#fff' }} />
                <select name="dept" style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.12)', background: '#0f172a', color: '#fff' }}>
                  <option value="Clinical">Veterinary Clinical</option>
                  <option value="Pharmacy">Pharmacy</option>
                  <option value="Logistics">Logistics & Delivery</option>
                  <option value="Warehouse">Warehouse Ops</option>
                  <option value="Technology">Technology & AI</option>
                </select>
                <input required name="loc" placeholder="Location" style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(0,0,0,0.25)', color: '#fff' }} />
                <input required name="openings" type="number" min="1" defaultValue="1" placeholder="Number of Vacancies" style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(0,0,0,0.25)', color: '#fff' }} />
              </div>
              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setShowReqModal(false)} style={{ padding: '8px 16px', borderRadius: '8px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ padding: '8px 16px', borderRadius: '8px', background: '#3b82f6', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>Publish Job</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
