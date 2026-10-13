import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function EmployeeProductivity() {
  const [filterDept, setFilterDept] = useState('ALL');

  const teams = [
    {
      team: 'Veterinary In-Clinic Consultations',
      activeHours: '7.8 hrs',
      tasksDone: '28.4 consults / vet',
      turnaround: '18 mins / pet',
      idlePct: '4.2%',
      efficiency: '96.5%',
      status: 'Peak Velocity'
    },
    {
      team: 'Laparoscopic & Orthopedic Surgery Theatre',
      activeHours: '8.1 hrs',
      tasksDone: '3.8 major procedures',
      turnaround: '65 mins / case',
      idlePct: '2.8%',
      efficiency: '98.2%',
      status: 'Peak Velocity'
    },
    {
      team: 'Cold-Chain Central Pharmacy Dispensing',
      activeHours: '7.9 hrs',
      tasksDone: '540 Rx packages / tech',
      turnaround: '4.5 mins / order',
      idlePct: '3.1%',
      efficiency: '97.4%',
      status: 'Optimal'
    },
    {
      team: 'Hyperlocal 60-Minute Rider Fleet',
      activeHours: '7.5 hrs',
      tasksDone: '24.2 deliveries / rider',
      turnaround: '44 mins / delivery',
      idlePct: '5.2%',
      efficiency: '95.1%',
      status: 'Optimal'
    },
    {
      team: 'Core AI & Telemedicine Engineering',
      activeHours: '7.6 hrs',
      tasksDone: '4.8 sprint points / day',
      turnaround: '1.2 days / feature',
      idlePct: '3.5%',
      efficiency: '97.0%',
      status: 'Optimal'
    },
    {
      team: 'Pathology Automated Hematology Lab',
      activeHours: '7.9 hrs',
      tasksDone: '112 biomarker panels',
      turnaround: '3.2 hrs / report',
      idlePct: '3.9%',
      efficiency: '96.8%',
      status: 'Optimal'
    },
    {
      team: 'Dark Store Order Picking & Packing',
      activeHours: '8.0 hrs',
      tasksDone: '340 parcels / packer',
      turnaround: '2.8 mins / parcel',
      idlePct: '4.0%',
      efficiency: '96.0%',
      status: 'Optimal'
    },
    {
      team: 'Multilingual Customer Concierge Desk',
      activeHours: '7.7 hrs',
      tasksDone: '92 pet parent chats',
      turnaround: '1.8 mins / resolution',
      idlePct: '4.8%',
      efficiency: '95.4%',
      status: 'Optimal'
    },
    {
      team: 'Inpatient Critical Care & ICU Nursing',
      activeHours: '8.2 hrs',
      tasksDone: '14.2 monitoring rounds',
      turnaround: 'Continuous 24x7',
      idlePct: '2.1%',
      efficiency: '98.9%',
      status: 'Peak Velocity'
    },
    {
      team: 'Mobile Vet Van Field Services',
      activeHours: '7.4 hrs',
      tasksDone: '12.8 home visits / van',
      turnaround: '38 mins / visit',
      idlePct: '6.0%',
      efficiency: '94.2%',
      status: 'Optimal'
    }
  ];

  return (
    <DashboardLayout
      category="Employees & HR"
      subcategory="Employee Productivity"
      title="Productivity Telemetry & Operational Velocity"
      subtitle="Active hours utilization, unit handling throughput, clinical consult velocity, and idle capacity tracking"
      icon="⚡"
      badge=""
    >
      {/* Top Level KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Average Active Shift Time" value="7.8 hrs" delta="+0.4h" trend="up" subtext="Excluding designated breaks" icon="⏱️" />
        <KpiCard label="Overall Efficiency Index" value="96.4%" delta="+2.8%" trend="up" subtext="Output per scheduled hour" icon="📈" />
        <KpiCard label="Network Throughput" value="48,200 Units" delta="+6.2%" trend="up" subtext="Cross-functional daily total" icon="📦" />
        <KpiCard label="Idle / Down Capacity" value="3.8%" delta="-1.2%" trend="up" subtext="Lowest quarterly baseline" icon="📉" />
      </div>

      {/* Productivity by Functional Unit Table */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Team Productivity &amp; Throughput Benchmark</h3>
            <p style={{ margin: '4px 0 0', fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)' }}>Measured continuously across IoT biometrics, POS scanners, and rider telemetry</p>
          </div>
          <span style={{ fontSize: '10px', padding: '3px 8px', borderRadius: '99px', background: 'rgba(16,185,129,0.15)', color: '#10b981', fontWeight: 700 }}>Live Telemetry</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)', color: 'var(--muted-foreground, #94a3b8)' }}>
                <th style={{ padding: '12px 16px' }}>Operational Unit</th>
                <th style={{ padding: '12px 16px' }}>Active Hours / Shift</th>
                <th style={{ padding: '12px 16px' }}>Daily Unit Output</th>
                <th style={{ padding: '12px 16px' }}>Avg Turnaround Time</th>
                <th style={{ padding: '12px 16px' }}>Idle Capacity</th>
                <th style={{ padding: '12px 16px' }}>Efficiency Score</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Operating Status</th>
              </tr>
            </thead>
            <tbody>
              {teams.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ padding: '36px 16px', textAlign: 'center', color: '#94a3b8' }}>
                    No operational unit productivity records found
                  </td>
                </tr>
              ) : (
                teams.map(t => (
                  <tr key={t.team} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: '#f8fafc' }}>{t.team}</td>
                    <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', color: '#cbd5e1' }}>{t.activeHours}</td>
                    <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', color: '#38bdf8' }}>{t.tasksDone}</td>
                    <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', color: 'var(--muted-foreground, #94a3b8)' }}>{t.turnaround}</td>
                    <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', color: '#f59e0b' }}>{t.idlePct}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '80px', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '99px', overflow: 'hidden' }}>
                          <div style={{ width: t.efficiency, height: '100%', background: '#10b981', borderRadius: '99px' }}></div>
                        </div>
                        <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#10b981' }}>{t.efficiency}</span>
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: '99px',
                        fontSize: '10px',
                        fontWeight: 700,
                        background: 'rgba(16,185,129,0.15)',
                        color: '#10b981'
                      }}>
                        ● {t.status}
                      </span>
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
