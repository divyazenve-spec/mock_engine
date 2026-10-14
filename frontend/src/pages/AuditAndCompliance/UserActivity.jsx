import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function UserActivity() {
  const users = [
  {
    "name": "Dr. Arvind Rao",
    "dept": "Medical Administration",
    "role": "Chief Medical Officer",
    "actionsToday": "68 Actions",
    "activeHours": "8.5 hrs",
    "lastActive": "2 mins ago",
    "status": "Active"
  },
  {
    "name": "Priya Sharma",
    "dept": "Central Dispensing Hub",
    "role": "Lead Pharmacist",
    "actionsToday": "142 Actions",
    "activeHours": "7.2 hrs",
    "lastActive": "6 mins ago",
    "status": "Active"
  },
  {
    "name": "R. Venkataraman",
    "dept": "Finance & Taxation",
    "role": "Chief Financial Officer",
    "actionsToday": "45 Actions",
    "activeHours": "6.8 hrs",
    "lastActive": "15 mins ago",
    "status": "Active"
  },
  {
    "name": "Kavita Deshmukh",
    "dept": "Regulatory Affairs",
    "role": "Compliance Director",
    "actionsToday": "54 Actions",
    "activeHours": "7.5 hrs",
    "lastActive": "12 mins ago",
    "status": "Active"
  },
  {
    "name": "Siddharth Nair",
    "dept": "Warehouse & Cold Chain",
    "role": "Cold Chain Lead",
    "actionsToday": "118 Actions",
    "activeHours": "8.0 hrs",
    "lastActive": "4 mins ago",
    "status": "Active"
  },
  {
    "name": "Dr. Ananya Sen",
    "dept": "Oncology Daycare",
    "role": "Senior Consultant",
    "actionsToday": "39 Actions",
    "activeHours": "5.5 hrs",
    "lastActive": "28 mins ago",
    "status": "Active"
  },
  {
    "name": "Manish Verma",
    "dept": "Last-Mile Logistics",
    "role": "Fleet Dispatch Head",
    "actionsToday": "210 Actions",
    "activeHours": "9.1 hrs",
    "lastActive": "1 min ago",
    "status": "Active"
  },
  {
    "name": "Suresh Raina",
    "dept": "Quality Assurance",
    "role": "QA / Pharmacovigilance",
    "actionsToday": "86 Actions",
    "activeHours": "6.4 hrs",
    "lastActive": "18 mins ago",
    "status": "Active"
  },
  {
    "name": "Dr. Rajesh Iyer",
    "dept": "Cardiology & CCU",
    "role": "Attending Cardiologist",
    "actionsToday": "52 Actions",
    "activeHours": "7.0 hrs",
    "lastActive": "35 mins ago",
    "status": "Active"
  },
  {
    "name": "Anita Kurup",
    "dept": "Patient Services & Billing",
    "role": "Billing Supervisor",
    "actionsToday": "174 Actions",
    "activeHours": "8.2 hrs",
    "lastActive": "3 mins ago",
    "status": "Active"
  }
];

  return (
    <DashboardLayout
      category="Audit & Compliance"
      subcategory="User Activity & Telemetry"
      title="User Activity & Staff Telemetry"
      subtitle="Real-time session time, operation volume, and privilege utilization per staff member"
      icon="👥"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Active Staff Today" value="128 Staff" delta="+4.2%" trend="up" subtext="128 of 135 staff active" icon="👥" />
        <KpiCard label="Avg Actions / User" value="38.2 Actions" delta="+6.5%" trend="up" subtext="Consistent clinical velocity" icon="⚡" />
        <KpiCard label="Peak Activity Window" value="10:00 - 14:30" delta="Peak" trend="up" subtext="Outpatient & ICU peak rounds" icon="⏱️" />
        <KpiCard label="Suspicious Activity" value="0 Flagged" delta="0.0%" trend="neutral" subtext="Zero behavioral anomalies" icon="🛡️" />
      </div>

      <div style={{ background: 'var(--card, #ffffff)', border: '1px solid var(--border, #e2e8f0)', borderRadius: '12px', padding: '20px' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Staff Activity Telemetry Matrix</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)', fontSize: '11px', textTransform: 'uppercase' }}>
                <th style={{ padding: '10px 12px' }}>Staff Member</th>
                <th style={{ padding: '10px 12px' }}>Department</th>
                <th style={{ padding: '10px 12px' }}>Role</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Actions Today</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Active Time</th>
                <th style={{ padding: '10px 12px' }}>Last Heartbeat</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ padding: '36px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                    No staff activity telemetry records found.
                  </td>
                </tr>
              ) : (
                users.map((u, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)' }}>
                    <td style={{ padding: '12px', fontWeight: 700 }}>{u.name}</td>
                    <td style={{ padding: '12px' }}><span style={{ padding: '2px 8px', borderRadius: '99px', background: '#dbeafe', color: '#1d4ed8', fontSize: '11px', fontWeight: 600 }}>{u.dept}</span></td>
                    <td style={{ padding: '12px', color: '#64748b' }}>{u.role}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{u.actionsToday}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{u.activeHours}</td>
                    <td style={{ padding: '12px', fontSize: '12px' }}>{u.lastActive}</td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      <span style={{ padding: '2px 8px', borderRadius: '99px', background: '#dcfce7', color: '#15803d', fontWeight: 600, fontSize: '11px' }}>● {u.status}</span>
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
