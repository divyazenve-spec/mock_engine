import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function SalesForecast() {
  const [scenario, setScenario] = useState('base');
  const [horizon, setHorizon] = useState(6);

  // 10 Historical actuals
  const actuals = [
    { month: 'Jan', rev: 7200000, orders: 2420 },
    { month: 'Feb', rev: 7650000, orders: 2540 },
    { month: 'Mar', rev: 8100000, orders: 2680 },
    { month: 'Apr', rev: 8450000, orders: 2790 },
    { month: 'May', rev: 8900000, orders: 2910 },
    { month: 'Jun', rev: 9350000, orders: 3040 },
    { month: 'Jul', rev: 9800000, orders: 3180 },
    { month: 'Aug', rev: 10450000, orders: 3360 },
    { month: 'Sep', rev: 10950000, orders: 3490 },
    { month: 'Oct', rev: 11400000, orders: 3620 }
  ];

  // 10 Forward projections
  const baseForecast = [
    { month: 'Nov 2026', baseRev: 12200000, baseOrders: 3850, growth: '+7.0%', ci: '±4.2%', driver: 'Post-Diwali Pet Health & Grooming Peak' },
    { month: 'Dec 2026', baseRev: 13100000, baseOrders: 4120, growth: '+7.4%', ci: '±4.6%', driver: 'Holiday Boarding & Winter Immunity Care' },
    { month: 'Jan 2027', baseRev: 13800000, baseOrders: 4310, growth: '+5.3%', ci: '±5.0%', driver: 'Annual Wellness Plan Renewals' },
    { month: 'Feb 2027', baseRev: 14600000, baseOrders: 4520, growth: '+5.8%', ci: '±5.3%', driver: 'National Pet Dental Health Campaign' },
    { month: 'Mar 2027', baseRev: 15600000, baseOrders: 4810, growth: '+6.8%', ci: '±5.8%', driver: 'Spring Allergy & Dermatitis Surge' },
    { month: 'Apr 2027', baseRev: 16700000, baseOrders: 5120, growth: '+7.1%', ci: '±6.1%', driver: 'Flea & Tick Prevention Peak Run' },
    { month: 'May 2027', baseRev: 17800000, baseOrders: 5440, growth: '+6.6%', ci: '±6.5%', driver: 'Summer Hydration & Heat Stress Protocols' },
    { month: 'Jun 2027', baseRev: 18900000, baseOrders: 5750, growth: '+6.2%', ci: '±6.8%', driver: 'Monsoon Waterborne Illness Surge' },
    { month: 'Jul 2027', baseRev: 20100000, baseOrders: 6090, growth: '+6.3%', ci: '±7.2%', driver: 'Deworming & Parasite Eradication Drive' },
    { month: 'Aug 2027', baseRev: 21400000, baseOrders: 6450, growth: '+6.5%', ci: '±7.5%', driver: 'Independence Day Pet Health Festival' },
    { month: 'Sep 2027', baseRev: 22800000, baseOrders: 6810, growth: '+6.5%', ci: '±7.8%', driver: 'Senior Pet Diagnostics & Preventive Screenings' },
    { month: 'Oct 2027', baseRev: 24300000, baseOrders: 7190, growth: '+6.6%', ci: '±8.1%', driver: 'Pre-Festive Health Checkups & Grooming Rush' }
  ];

  const scenarioMultiplier = scenario === 'bull' ? 1.18 : scenario === 'bear' ? 0.82 : 1.0;

  const masterForecast = baseForecast.map(f => {
    const revNum = Math.round(f.baseRev * scenarioMultiplier);
    const orderNum = Math.round(f.baseOrders * scenarioMultiplier);
    return {
      month: f.month,
      rev: `₹${(revNum / 100000).toFixed(2)}L`,
      revNum,
      orders: orderNum.toLocaleString(),
      growth: f.growth,
      ci: f.ci,
      driver: f.driver
    };
  });

  const projectedMonths = masterForecast.slice(0, horizon);
  const nextMonthRev = projectedMonths[0]?.rev || '₹0';
  const cumulativeRevNum = projectedMonths.reduce((acc, m) => acc + m.revNum, 0);
  const cumulativeRev = `₹${(cumulativeRevNum / 10000000).toFixed(2)} Cr`;
  const avgMonthlyVelocity = '+6.5% MoM';
  const predictedDailyRate = `₹${Math.round(projectedMonths[0]?.revNum / 30 / 1000).toLocaleString()}k/day`;

  // 10 Healthcare seasonal drivers
  const seasonalDrivers = [
    { season: 'Spring Flea & Tick Outbreak', period: 'Mar - May', impact: '+28% Rx Volume', icon: '🌿', color: '#10b981' },
    { season: 'Summer Heat Stress & Hydration', period: 'Apr - Jun', impact: '+19% OTC Chews', icon: '☀️', color: '#f59e0b' },
    { season: 'Monsoon Skin & Ear Infections', period: 'Jun - Aug', impact: '+34% Consults', icon: '🌧️', color: '#0ea5e9' },
    { season: 'Festive Boarding & Travel Calming', period: 'Oct - Nov', impact: '+22% In-Clinic', icon: '🎆', color: '#8b5cf6' },
    { season: 'Winter Joint & Arthritis Care', period: 'Dec - Feb', impact: '+31% Ortho Care', icon: '❄️', color: '#38bdf8' },
    { season: 'National Pet Dental Month', period: 'February', impact: '+42% Scalings', icon: '🦷', color: '#ec4899' },
    { season: 'Puppy & Kitten Vaccine Surge', period: 'Jan - Mar', impact: '+26% Core Shots', icon: '🐕', color: '#14b8a6' },
    { season: 'Senior Pet Diagnostics Drive', period: 'Sep - Oct', impact: '+18% Bloodwork', icon: '🩺', color: '#6366f1' },
    { season: 'Post-Monsoon Dermatitis Wave', period: 'Aug - Sep', impact: '+29% Derm Care', icon: '🧴', color: '#f97316' },
    { season: 'New Year Health Plan Subscriptions', period: 'January', impact: '+45% Annual VIP', icon: '🏅', color: '#eab308' }
  ];

  // 10 Channel projections
  const channelProjections = [
    { name: 'Android Mobile App', growth: '+22% YoY', rev: '₹48.5L', share: '33%', icon: '📱' },
    { name: 'iOS Mobile App', growth: '+26% YoY', rev: '₹39.8L', share: '27%', icon: '🍏' },
    { name: 'Web Direct Portal', growth: '+18% YoY', rev: '₹21.4L', share: '15%', icon: '💻' },
    { name: 'Partner Vet Clinics', growth: '+32% YoY', rev: '₹14.2L', share: '10%', icon: '🏥' },
    { name: 'In-Clinic Kiosks', growth: '+15% YoY', rev: '₹6.8L', share: '5%', icon: '🏪' },
    { name: 'Corporate Pet Benefits', growth: '+45% YoY', rev: '₹5.2L', share: '4%', icon: '🏢' },
    { name: 'WhatsApp Care Concierge', growth: '+28% YoY', rev: '₹3.8L', share: '3%', icon: '💬' },
    { name: 'Tele-Health Instant', growth: '+20% YoY', rev: '₹2.6L', share: '2%', icon: '🩺' },
    { name: 'Emergency Dispatch', growth: '+14% YoY', rev: '₹1.8L', share: '1%', icon: '🚑' },
    { name: 'Pet Insurance Direct', growth: '+52% YoY', rev: '₹1.4L', share: '1%', icon: '🛡️' }
  ];

  return (
    <DashboardLayout
      category="Revenue & Sales"
      subcategory="Sales Forecast"
      title="Predictive Sales Forecast & Revenue Trajectory"
      subtitle="Machine learning projections with sales seasonality cycles, 90% confidence bands, and scenario modeling"
      icon="📈"
      badge="12-Month Predictive Engine"
      actions={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)', fontWeight: 600 }}>Horizon:</span>
          {[
            { val: 3, label: '3M (Quarter)' },
            { val: 6, label: '6M (Half-Year)' },
            { val: 12, label: '12M (Full-Cycle)' }
          ].map(h => (
            <button
              key={h.val}
              onClick={() => setHorizon(h.val)}
              style={{
                padding: '6px 10px',
                borderRadius: '6px',
                border: '1px solid var(--border, rgba(255,255,255,0.1))',
                background: horizon === h.val ? 'var(--primary, #3b82f6)' : 'var(--card, #1e293b)',
                color: horizon === h.val ? '#fff' : '#000',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >{h.label}</button>
          ))}

          <span style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)', fontWeight: 600, marginLeft: '6px' }}>Scenario:</span>
          {[
            { id: 'base', label: '📊 Baseline (1.0x)' },
            { id: 'bull', label: '🚀 Bullish (+18%)' },
            { id: 'bear', label: '🛡️ Conservative (-18%)' }
          ].map(s => (
            <button
              key={s.id}
              onClick={() => setScenario(s.id)}
              style={{
                padding: '6px 10px',
                borderRadius: '6px',
                border: '1px solid var(--border, rgba(255,255,255,0.1))',
                background: scenario === s.id ? 'var(--primary, #3b82f6)' : 'var(--card, #1e293b)',
                color: scenario === s.id ? '#fff' : '#000',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >{s.label}</button>
          ))}
        </div>
      }
    >
      {/* Forecast KPI Highlights */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '14px'
      }}>
        <KpiCard
          label="Next Month Projected"
          value={nextMonthRev}
          delta={projectedMonths[0]?.growth || '+7.0%'}
          trend="up"
          subtext="Model baseline"
          icon="📅"
        />
        <KpiCard
          label={`${horizon}-Month Cumulative`}
          value={cumulativeRev}
          delta={`${horizon} months`}
          trend="up"
          subtext="Total horizon pipeline"
          icon="💼"
        />
        <KpiCard
          label="Avg Monthly Velocity"
          value={avgMonthlyVelocity}
          delta="+1.2% delta"
          trend="up"
          subtext="Steady compound run-rate"
          icon="⚡"
        />
        <KpiCard
          label="Predicted Daily Rate"
          value={predictedDailyRate}
          delta="+8.4%"
          trend="up"
          subtext="Forward cash pacing"
          icon="💰"
        />
        <KpiCard
          label="Confidence Metric"
          value="94.2%"
          delta="R² = 0.96"
          trend="up"
          subtext="High precision model fit"
          icon="🎯"
        />
      </div>

      {/* SVG Time-Series Chart Card */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '14px',
        padding: '22px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>
              Predictive Revenue Trajectory & Confidence Interval Band
            </h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>
              10 historical actual months + {horizon}-month predictive projection ({scenario.toUpperCase()} scenario)
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '12px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#3b82f6' }} /> Historical Actuals</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} /> Projected Forecast</span>
          </div>
        </div>

        {/* Visual Timeline Bar Graph */}
        <div style={{
          height: '180px',
          display: 'flex',
          alignItems: 'flex-end',
          gap: '8px',
          padding: '16px 12px 10px',
          background: 'rgba(0,0,0,0.18)',
          borderRadius: '8px'
        }}>
          {actuals.map(a => {
            const h = Math.round((a.rev / 22000000) * 100);
            return (
              <div key={a.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', gap: '4px' }}>
                <span style={{ fontSize: '9px', color: 'var(--muted-foreground, #94a3b8)', fontFamily: '"IBM Plex Mono", monospace' }}>₹{(a.rev / 100000).toFixed(0)}L</span>
                <div style={{ width: '100%', height: `${h}%`, background: 'rgba(59,130,246,0.65)', borderRadius: '3px 3px 0 0' }} />
                <span style={{ fontSize: '10px', color: 'var(--muted-foreground, #94a3b8)' }}>{a.month}</span>
              </div>
            );
          })}
          {projectedMonths.map(p => {
            const h = Math.round((p.revNum / 22000000) * 100);
            return (
              <div key={p.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', gap: '4px' }}>
                <span style={{ fontSize: '9px', color: '#10b981', fontFamily: '"IBM Plex Mono", monospace' }}>{p.rev}</span>
                <div style={{ width: '100%', height: `${h}%`, background: 'linear-gradient(180deg, #10b981, rgba(16,185,129,0.3))', borderRadius: '3px 3px 0 0', border: '1px dashed #10b981' }} />
                <span style={{ fontSize: '10px', color: '#10b981', fontWeight: 600 }}>{p.month.split(' ')[0]}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Forward-Looking Schedule Table */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '14px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Forward-Looking Monthly Predictive Schedule (10 Months)</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Month-by-month projected volume, expected orders, and confidence bounds</p>
          </div>
          <span style={{ padding: '3px 8px', borderRadius: '99px', background: 'rgba(59,130,246,0.15)', color: '#3b82f6', fontSize: '11px', fontWeight: 700 }}>
            {horizon} of 10 Months Visible
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)', fontSize: '11px' }}>
                <th style={{ padding: '10px 12px' }}>Projected Month</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Predicted Revenue</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Expected Orders</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>MoM Growth</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Confidence Interval</th>
                <th style={{ padding: '10px 12px' }}>Primary Seasonal Driver</th>
              </tr>
            </thead>
            <tbody>
              {projectedMonths.map((row) => (
                <tr key={row.month} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                  <td style={{ padding: '12px', fontWeight: 700 }}>{row.month}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace', color: '#10b981' }}>{row.rev}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>{row.orders}</td>
                  <td style={{ padding: '12px', textAlign: 'right', color: '#3b82f6', fontWeight: 600 }}>{row.growth}</td>
                  <td style={{ padding: '12px', textAlign: 'right', color: 'var(--muted-foreground, #94a3b8)', fontFamily: '"IBM Plex Mono", monospace' }}>{row.ci}</td>
                  <td style={{ padding: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>{row.driver}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Two Columns: 10 Healthcare Seasonal Drivers & 10 Channel Projections */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '16px'
      }}>
        {/* Healthcare Seasonality Drivers */}
        <div style={{
          background: 'var(--card, #1e293b)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '14px',
          padding: '20px'
        }}>
          <h3 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 700 }}>10 Pet Healthcare Seasonality Drivers</h3>
          <p style={{ margin: '0 0 14px', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Key clinical and pharmaceutical demand surges embedded in the forecasting model</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {seasonalDrivers.map(sd => (
              <div key={sd.season} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                background: 'rgba(0,0,0,0.18)',
                borderRadius: '8px',
                fontSize: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                  <span>{sd.icon}</span>
                  <span>{sd.season}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: 'var(--muted-foreground, #94a3b8)', fontSize: '11px' }}>{sd.period}</span>
                  <span style={{ color: sd.color, fontWeight: 700 }}>{sd.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Channel Growth Projections */}
        <div style={{
          background: 'var(--card, #1e293b)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '14px',
          padding: '20px'
        }}>
          <h3 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 700 }}>10 Projected Channel Touchpoints</h3>
          <p style={{ margin: '0 0 14px', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Forward revenue contribution by customer touchpoint over selected horizon</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {channelProjections.map(cp => (
              <div key={cp.name} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                background: 'rgba(0,0,0,0.18)',
                borderRadius: '8px',
                fontSize: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                  <span>{cp.icon}</span>
                  <span>{cp.name}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700 }}>{cp.rev}</span>
                  <span style={{ color: '#10b981', fontWeight: 600 }}>{cp.growth}</span>
                  <span style={{ padding: '2px 6px', borderRadius: '99px', background: 'rgba(59,130,246,0.15)', color: '#3b82f6', fontSize: '10px', fontWeight: 700 }}>{cp.share}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
