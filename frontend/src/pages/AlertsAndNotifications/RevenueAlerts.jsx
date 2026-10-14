import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function RevenueAlerts() {
  const [alerts, setAlerts] = useState([
  {
    "id": "REV-201",
    "title": "Uncontrolled Promotional Coupon Stacking on Premium Grooming",
    "channel": "Mobile App / Checkout",
    "severity": "High Warning",
    "status": "Active",
    "trigger": "50% discount stacked on top of subscriber pricing",
    "cause": "Checkout API failed single-coupon validator rule",
    "impact": "\u20b92.9L revenue leak",
    "time": "15 mins ago"
  },
  {
    "id": "REV-202",
    "title": "Uncollected Surgical Consumable Billings across BLR Surgical Hubs",
    "channel": "Hospital Inpatient Billing",
    "severity": "High Warning",
    "status": "Active",
    "trigger": "Discharge bills omitting specialized titanium ortho pins",
    "cause": "Manual checkbox missed on front-desk discharge POS",
    "impact": "\u20b93.85L monthly leakage",
    "time": "28 mins ago"
  },
  {
    "id": "REV-203",
    "title": "Delhi NCR Regional Gross Margin Compression",
    "channel": "Delhi Logistics / Dark Store",
    "severity": "Warning",
    "status": "Active",
    "trigger": "Gross margin dropped to 38.2% (Benchmark: 46%)",
    "cause": "Couriers absorbing surge rain delivery fees",
    "impact": "\u20b91.85L delivery deficit",
    "time": "45 mins ago"
  },
  {
    "id": "REV-204",
    "title": "After-Hours Emergency Triage Underbilling",
    "channel": "24x7 Emergency OPD",
    "severity": "High Warning",
    "status": "Active",
    "trigger": "Night consultations logged under standard daytime tariff",
    "cause": "Doctors defaulting to \u20b9650 standard fee instead of \u20b91,200",
    "impact": "\u20b92.45L margin gap",
    "time": "1 hr ago"
  },
  {
    "id": "REV-205",
    "title": "Therapeutic Renal Food Subscription Pause Spike",
    "channel": "Auto-Ship Subscriptions",
    "severity": "Warning",
    "status": "Active",
    "trigger": "42 subscribers paused Hill's k/d deliveries this week",
    "cause": "Customer feedback citing bag size availability issues",
    "impact": "\u20b91.65L MRR at risk",
    "time": "2 hrs ago"
  },
  {
    "id": "REV-206",
    "title": "Diagnostic Blood Chemistry Reagent Cost Escalation",
    "channel": "In-Clinic Laboratory",
    "severity": "Warning",
    "status": "Active",
    "trigger": "Reagent cost per panel rose from \u20b9380 to \u20b9490",
    "cause": "Unclaimed manufacturer volume discount rebate",
    "impact": "\u20b91.40L cost variance",
    "time": "3 hrs ago"
  },
  {
    "id": "REV-207",
    "title": "Corporate Pet Wellness B2B Account Payment Delay",
    "channel": "B2B Enterprise Portal",
    "severity": "Warning",
    "status": "Active",
    "trigger": "Infosys Pet Wellness account overdue by 45 days",
    "cause": "Billing address discrepancy in enterprise purchase order",
    "impact": "\u20b94.5L receivable aging",
    "time": "4 hrs ago"
  },
  {
    "id": "REV-208",
    "title": "Grooming Appointment High No-Show Rate on Weekends",
    "channel": "Pet Spa & Grooming",
    "severity": "Warning",
    "status": "Active",
    "trigger": "24% no-show rate recorded across Bandra and Indiranagar",
    "cause": "Lack of mandatory 20% advance booking deposit",
    "impact": "\u20b91.25L idle table loss",
    "time": "5 hrs ago"
  },
  {
    "id": "REV-209",
    "title": "Vaccination Booster Drop-off Revenue Attrition",
    "channel": "Preventive Healthcare",
    "severity": "High Warning",
    "status": "Active",
    "trigger": "28% puppy parents missed 21-day booster sequence",
    "cause": "Manual calling nurse roster overwhelmed",
    "impact": "\u20b92.10L follow-up revenue",
    "time": "6 hrs ago"
  },
  {
    "id": "REV-210",
    "title": "Pet Pharmacy Return Rate Spike on Prescription Diets",
    "channel": "Express Pharmacy Delivery",
    "severity": "Warning",
    "status": "Resolved",
    "trigger": "Kibble bag packaging puncture claims increased by 3.2%",
    "cause": "Transit packaging tearing during monsoon bike delivery",
    "impact": "\u20b985K credit note drain",
    "time": "7 hrs ago"
  }
]);

  const [toast, setToast] = useState('');

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleAction = (id, action) => {
    triggerToast(`Applied "${action}" to ${id}. Notification sent to Commercial Ops.`);
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'Mitigated' } : a));
  };

  return (
    <DashboardLayout
      category="Alerts & Notifications"
      subcategory="Revenue Alerts"
      title="Revenue Pacing & Margin Risk Alerts"
      subtitle="Automated commercial anomaly detection for sales drop-offs, return surges, CAC inflation, and high-value B2B accounts"
      icon="💼"
      badge=""
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => triggerToast('Commercial pacing report dispatched to Sales VP.')}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              background: 'var(--primary, #3b82f6)',
              color: '#ffffff',
              border: 'none',
              fontWeight: 600,
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            📊 Pacing Briefing
          </button>
          <button
            onClick={() => triggerToast('Recalculated automated dynamic targets based on monsoon seasonality.')}
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
            Auto-Tune Thresholds
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
          label="Total Revenue at Risk"
          value="₹18.4L"
          delta="-24% MoM"
          trend="positive"
          subtext="10 automated triggers"
          icon="📉"
        />
        <KpiCard
          label="Target Attainment Gap"
          value="+4.8% MTD"
          delta="+4.8%"
          trend="positive"
          subtext="Oct pacing: 104.8%"
          icon="🎯"
        />
        <KpiCard
          label="Average Return Rate"
          value="1.8%"
          delta="-0.7%"
          trend="positive"
          subtext="Below 2.5% threshold"
          icon="🔄"
        />
        <KpiCard
          label="High-Value Accounts Alert"
          value="10 Accounts"
          delta="+3"
          trend="neutral"
          subtext="VIP retention active"
          icon="💎"
        />
      </div>

      {/* Alerts Table */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>
          Commercial Revenue Anomalies & Pacing Warnings
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {alerts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '36px', color: 'var(--muted-foreground, #94a3b8)', fontSize: '13px' }}>
              No revenue pacing warnings or commercial anomalies detected.
            </div>
          ) : (
            alerts.map((a) => (
            <div
              key={a.id}
              style={{
                padding: '16px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.15)',
                borderLeft: a.severity === 'High Warning' ? '4px solid #ef4444' : a.severity === 'Warning' ? '4px solid #f59e0b' : '4px solid #3b82f6',
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
                      background: a.severity === 'High Warning' ? 'rgba(239,68,68,0.2)' : 'rgba(245,158,11,0.2)',
                      color: a.severity === 'High Warning' ? '#ef4444' : '#f59e0b',
                      fontWeight: 600
                    }}>
                      {a.severity}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)', marginTop: '4px' }}>
                    Channel: <strong style={{ color: 'var(--foreground, #f8fafc)' }}>{a.channel}</strong> · Trigger: <span style={{ color: '#f87171' }}>{a.trigger}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)' }}>{a.time}</div>
                  <div style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: a.status === 'Mitigated' ? '#10b981' : '#f59e0b',
                    marginTop: '2px'
                  }}>
                    Status: {a.status}
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)', lineHeight: 1.5 }}>
                <div><strong>Root Cause:</strong> {a.cause}</div>
                <div><strong>Estimated Financial Exposure:</strong> <span style={{ color: '#fbbf24', fontWeight: 600 }}>{a.impact}</span></div>
              </div>

              {a.status !== 'Mitigated' && (
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', paddingTop: '4px' }}>
                  {a.id === 'REV-201' && (
                    <button
                      onClick={() => handleAction(a.id, 'Dynamic Rain Surcharge Waiver + Push Promo')}
                      style={{ padding: '6px 12px', borderRadius: '6px', background: 'var(--primary, #3b82f6)', color: '#fff', border: 'none', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Trigger Gurgaon Flash Recovery Promo
                    </button>
                  )}
                  {a.id === 'REV-202' && (
                    <button
                      onClick={() => handleAction(a.id, 'Mandatory Pet Weight Prompt at Checkout')}
                      style={{ padding: '6px 12px', borderRadius: '6px', background: 'var(--primary, #3b82f6)', color: '#fff', border: 'none', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Deploy Weight Verification Prompt
                    </button>
                  )}
                  {a.id === 'REV-205' && (
                    <button
                      onClick={() => handleAction(a.id, 'Dispatched Corporate Renewal Terms & SLA')}
                      style={{ padding: '6px 12px', borderRadius: '6px', background: '#10b981', color: '#fff', border: 'none', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Send 1-Click Renewal Contract
                    </button>
                  )}
                  <button
                    onClick={() => handleAction(a.id, 'Acknowledged & Logged to Revenue Ops')}
                    style={{ padding: '6px 12px', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border, rgba(255,255,255,0.1))', color: 'var(--foreground, #f8fafc)', fontSize: '11px', cursor: 'pointer' }}
                  >
                    Acknowledge Alert
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
