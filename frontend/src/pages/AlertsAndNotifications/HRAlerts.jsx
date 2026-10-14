import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function HRAlerts() {
  const [alerts, setAlerts] = useState([
  {
    "id": "HR-801",
    "title": "Critical ICU Veterinary Surgeon Shift Shortage Tonight",
    "department": "Emergency Inpatient Surgery",
    "facility": "Indiranagar Surgical Hospital",
    "severity": "Critical",
    "status": "Active",
    "metric": "0 On-Call Trauma Vets for 22:00 - 06:00 Shift",
    "impact": "Emergency surgical triage diverted to peripheral clinics",
    "time": "15 mins ago"
  },
  {
    "id": "HR-802",
    "title": "Veterinary Council State Registration Expiry Warnings",
    "department": "Clinical Governance & Licensing",
    "facility": "Karnataka & Maharashtra Network",
    "severity": "Critical",
    "status": "Active",
    "metric": "4 Senior Vets Licenses Expire in < 15 Days",
    "impact": "Regulatory bar on dispensing Schedule X narcotics",
    "time": "30 mins ago"
  },
  {
    "id": "HR-803",
    "title": "Weekend Pet Groomer Absenteeism Spike across Mumbai Hubs",
    "department": "Spa & Grooming Operations",
    "facility": "Bandra & Powai Centers",
    "severity": "High Warning",
    "status": "Active",
    "metric": "5 Groomers on Unplanned Leave on Saturday",
    "impact": "28 scheduled pet spa appointments at risk of cancellation",
    "time": "45 mins ago"
  },
  {
    "id": "HR-804",
    "title": "Overtime Hour Threshold Breach in Central Packing Hub",
    "department": "Logistics & Fulfillment",
    "facility": "Whitefield Dark Store",
    "severity": "Warning",
    "status": "Active",
    "metric": "14 Warehouse Associates Exceeded 60h Weekly Cap",
    "impact": "Factory inspector compliance risk & staff fatigue hazard",
    "time": "1 hr ago"
  },
  {
    "id": "HR-805",
    "title": "Pharmacy Dispenser Mandatory Continuing Education Overdue",
    "department": "Pharmacy Quality Assurance",
    "facility": "National Pharmacy Network",
    "severity": "Warning",
    "status": "Active",
    "metric": "8 Registered Pharmacists Overdue on Antibiotic Protocols",
    "impact": "NABH hospital accreditation compliance audit flag",
    "time": "2 hrs ago"
  },
  {
    "id": "HR-806",
    "title": "Radiation Safety Dosimeter Badge Monitoring Non-Compliance",
    "department": "Veterinary Radiology & CT",
    "facility": "Gurgaon Sec-29 Hospital",
    "severity": "High Warning",
    "status": "Active",
    "metric": "3 X-Ray Technicians Failed Quarterly TLD Badge Submission",
    "impact": "AERB nuclear safety regulatory violation notice risk",
    "time": "3 hrs ago"
  },
  {
    "id": "HR-807",
    "title": "Express Rider Attrition Spike in Delhi NCR Cluster",
    "department": "Last-Mile Field Delivery",
    "facility": "South Ext & Noida Hubs",
    "severity": "High Warning",
    "status": "Active",
    "metric": "Monthly Rider Turnover Rose to 18.4% (Threshold: 10%)",
    "impact": "Sub-hub dispatch delays and rising onboarding costs",
    "time": "4 hrs ago"
  },
  {
    "id": "HR-808",
    "title": "Workplace Biohazard Safety Protocol Training Lapsed",
    "department": "Infection Control",
    "facility": "HSR Layout Polyclinic",
    "severity": "Warning",
    "status": "Active",
    "metric": "6 New Veterinary Nurses Need Sharps Handling Certification",
    "impact": "Needlestick injury prevention compliance",
    "time": "5 hrs ago"
  },
  {
    "id": "HR-809",
    "title": "Front Desk Receptionist High Customer NPS Churn",
    "department": "Patient Experience",
    "facility": "Anna Nagar Hospital",
    "severity": "Warning",
    "status": "Active",
    "metric": "Front Desk CSAT Dropped from 4.8 to 3.9",
    "impact": "Patient check-in bottlenecks during peak hours",
    "time": "6 hrs ago"
  },
  {
    "id": "HR-810",
    "title": "Anesthesiologist Emergency Mutual Aid Roster Rebalanced",
    "department": "Surgical Anesthesia",
    "facility": "Bangalore Metro Network",
    "severity": "Critical",
    "status": "Resolved",
    "metric": "Full Coverage Restored: 14 Vets Active",
    "impact": "Resolved: Standby anesthesiologist deployed from Jayanagar",
    "time": "7 hrs ago"
  }
]);

  const [toast, setToast] = useState('');

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleAction = (id, act) => {
    triggerToast(`Action "${act}" executed for ${id}.`);
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'Resolved' } : a));
  };

  return (
    <DashboardLayout
      category="Alerts & Notifications"
      subcategory="HR Alerts"
      title="People, Clinical Roster & Credentialing Alerts"
      subtitle="Shift staffing shortages in ICU, on-call doctor emergency absences, sales quota deficits, and veterinary licensing renewals"
      icon="🧑‍💼"
      badge=""
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => triggerToast('Locum emergency surgical doctor pool broadcasted with surge incentive bonus.')}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              background: '#ef4444',
              color: '#ffffff',
              border: 'none',
              fontWeight: 600,
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            🚨 Page Locum Surgeon
          </button>
          <button
            onClick={() => triggerToast('Automated WhatsApp license renewal wizard sent to Dr. Aisha Khan.')}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              background: 'var(--card, #1e293b)',
              color: 'var(--foreground, #f8fafc)',
              border: '1px solid var(--border, rgba(255,255,255,0.1))',
              fontWeight: 600,
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            📋 Send Renewal Wizard
          </button>
        </div>
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
        <KpiCard
          label="Shift Coverage Rate"
          value="98.4%"
          delta="+2.1%"
          trend="positive"
          subtext="14 facilities covered"
          icon="🏥"
        />
        <KpiCard
          label="On-Call Specialist Roster"
          value="14 Active"
          delta="100%"
          trend="positive"
          subtext="Emergency ICU staffed"
          icon="👨‍⚕️"
        />
        <KpiCard
          label="Quota Lagging Personnel"
          value="3 Employees"
          delta="-5"
          trend="positive"
          subtext="Coaching enrolled"
          icon="🎯"
        />
        <KpiCard
          label="Credentialing Expirations"
          value="4 Licenses"
          delta="Filed"
          trend="positive"
          subtext="State vet boards live"
          icon="📜"
        />
      </div>

      {/* Main Alerts Table */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>
          Live Workforce Exceptions & Clinical Governance Alerts
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {alerts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '36px', color: 'var(--muted-foreground, #94a3b8)', fontSize: '13px' }}>
              No workforce exceptions or clinical governance alerts active.
            </div>
          ) : (
            alerts.map((a) => (
            <div
              key={a.id}
              style={{
                padding: '16px',
                borderRadius: '8px',
                background: a.status === 'Resolved' ? 'rgba(16,185,129,0.05)' : 'rgba(0,0,0,0.15)',
                borderLeft: a.severity === 'Critical' ? '4px solid #ef4444' : a.severity === 'High Warning' ? '4px solid #f97316' : a.severity === 'Warning' ? '4px solid #f59e0b' : '4px solid #3b82f6',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: '11px',
                      fontWeight: 700,
                      background: 'rgba(255,255,255,0.06)',
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}>
                      {a.id}
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: 700 }}>{a.title}</span>
                    <span style={{
                      fontSize: '10px',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: a.severity === 'Critical' ? 'rgba(239,68,68,0.2)' : a.severity === 'High Warning' ? 'rgba(249,115,22,0.2)' : 'rgba(245,158,11,0.2)',
                      color: a.severity === 'Critical' ? '#ef4444' : '#f59e0b',
                      fontWeight: 600
                    }}>
                      {a.severity}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)', marginTop: '4px' }}>
                    Department: <strong style={{ color: 'var(--foreground, #f8fafc)' }}>{a.department}</strong> · Facility: <span>{a.facility}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: a.severity === 'Critical' ? '#ef4444' : '#fbbf24' }}>
                    {a.metric}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)', marginTop: '2px' }}>
                    Status: <strong style={{ color: a.status === 'Resolved' ? '#10b981' : '#38bdf8' }}>{a.status}</strong>
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>
                <strong>Impact on Operations:</strong> {a.impact}
              </div>

              {a.status !== 'Resolved' && (
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', paddingTop: '4px' }}>
                  {a.id === 'HR-801' && (
                    <button
                      onClick={() => handleAction(a.id, 'Dispatched urgent nurse pool call to 4 off-duty nurses with 1.5x shift pay')}
                      style={{ padding: '6px 14px', borderRadius: '6px', background: '#ef4444', color: '#fff', border: 'none', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Broadcast Shift Call (+1.5x Pay)
                    </button>
                  )}
                  {a.id === 'HR-802' && (
                    <button
                      onClick={() => handleAction(a.id, 'Dr. Arvind Swaminathan confirmed coverage for Mumbai trauma call')}
                      style={{ padding: '6px 14px', borderRadius: '6px', background: '#10b981', color: '#fff', border: 'none', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Assign Standby Surgeon
                    </button>
                  )}
                  <button
                    onClick={() => handleAction(a.id, 'Acknowledged')}
                    style={{ padding: '6px 12px', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border, rgba(255,255,255,0.1))', color: 'var(--foreground, #f8fafc)', fontSize: '11px', cursor: 'pointer' }}
                  >
                    Acknowledge
                  </button>
                </div>
              )}
            </div>
          ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
