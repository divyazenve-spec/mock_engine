import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function TargetsAndAchievement() {
  const [targetAdjust, setTargetAdjust] = useState(0);
  const [selectedDept, setSelectedDept] = useState('all');

  const basePeriodTarget = 12000000;
  const targetMultiplier = 1 + targetAdjust / 100;
  const adjustedTarget = Math.round(basePeriodTarget * targetMultiplier);
  const realizedRevenue = 12840000;
  const attainment = adjustedTarget > 0 ? ((realizedRevenue / adjustedTarget) * 100) : 0;
  const calendarElapsedPct = 78.5;
  const pacingDiff = attainment - calendarElapsedPct;
  const projectedFinish = Math.round(realizedRevenue / (calendarElapsedPct / 100));
  const surplusDeficit = realizedRevenue - adjustedTarget;

  // 10 Department targets
  const departments = [
    { id: 'surgery', name: 'Veterinary Surgery & Trauma', target: '₹22,00,000', achieved: '₹24,80,000', attain: '112.7%', count: '312 procedures', color: '#10b981' },
    { id: 'nutrition', name: 'Prescription Diets & Nutrition', target: '₹20,00,000', achieved: '₹21,40,000', attain: '107.0%', count: '540 bags', color: '#3b82f6' },
    { id: 'pharmacy', name: 'Preventive Pharmacy & Parasite Care', target: '₹18,00,000', achieved: '₹19,20,000', attain: '106.7%', count: '890 packs', color: '#0ea5e9' },
    { id: 'diagnostics', name: 'Pathology Diagnostics & Imaging', target: '₹15,00,000', achieved: '₹16,30,000', attain: '108.7%', count: '410 panels', color: '#8b5cf6' },
    { id: 'vaccines', name: 'Immunization & Preventive Protocols', target: '₹12,00,000', achieved: '₹12,90,000', attain: '107.5%', count: '760 doses', color: '#ec4899' },
    { id: 'dental', name: 'Veterinary Dentistry & Scaling', target: '₹10,00,000', achieved: '₹10,40,000', attain: '104.0%', count: '185 cases', color: '#f59e0b' },
    { id: 'telehealth', name: 'Tele-Health & Remote Triage', target: '₹8,00,000', achieved: '₹8,60,000', attain: '107.5%', count: '460 consults', color: '#14b8a6' },
    { id: 'wellness', name: 'Pet Wellness & Grooming Spa', target: '₹7,00,000', achieved: '₹7,20,000', attain: '102.9%', count: '390 sessions', color: '#6366f1' },
    { id: 'emergency', name: '24/7 Rapid Ambulance & Dispatch', target: '₹5,00,000', achieved: '₹4,90,000', attain: '98.0%', count: '94 dispatches', color: '#f97316' },
    { id: 'insurance', name: 'Corporate Pet Benefits & Claims', target: '₹3,00,000', achieved: '₹2,70,000', attain: '90.0%', count: '62 accounts', color: '#a855f7' }
  ];

  const filteredDepts = selectedDept === 'all'
    ? departments
    : departments.filter(d => d.id === selectedDept);

  // 10 Team Reps & Coordinators
  const reps = [
    { rank: 1, name: 'Karthik Sundaram', target: '₹12,00,000', achieved: '₹14,20,000', attain: '118.3%', incentive: '₹48,000' },
    { rank: 2, name: 'Ananya Sen', target: '₹11,50,000', achieved: '₹13,10,000', attain: '113.9%', incentive: '₹42,000' },
    { rank: 3, name: 'Vivek Joshi', target: '₹10,00,000', achieved: '₹11,20,000', attain: '112.0%', incentive: '₹36,000' },
    { rank: 4, name: 'Sneha Pillai', target: '₹9,50,000', achieved: '₹10,50,000', attain: '110.5%', incentive: '₹32,000' },
    { rank: 5, name: 'Rohan Mehta', target: '₹9,00,000', achieved: '₹9,80,000', attain: '108.9%', incentive: '₹28,000' },
    { rank: 6, name: 'Meenakshi Rao', target: '₹8,50,000', achieved: '₹9,10,000', attain: '107.1%', incentive: '₹24,000' },
    { rank: 7, name: 'Arjun Nambisan', target: '₹8,00,000', achieved: '₹8,45,000', attain: '105.6%', incentive: '₹20,000' },
    { rank: 8, name: 'Edwin Namboodiri', target: '₹7,50,000', achieved: '₹7,80,000', attain: '104.0%', incentive: '₹18,000' },
    { rank: 9, name: 'Vikram Chawla', target: '₹7,00,000', achieved: '₹7,15,000', attain: '102.1%', incentive: '₹15,000' },
    { rank: 10, name: 'Shreya Iyer', target: '₹6,50,000', achieved: '₹6,20,000', attain: '95.4%', incentive: '₹0' }
  ];

  // 10 Doctors Quotas
  const doctors = [
    { name: 'Dr. Edwin .', consults: 328, rate: '₹3,000', attain: '124.2%' },
    { name: 'Dr. Ananya Deshmukh', consults: 294, rate: '₹2,800', attain: '119.5%' },
    { name: 'Dr. Vikramaditya Rathore', consults: 246, rate: '₹3,200', attain: '116.8%' },
    { name: 'Dr. Priya Sharma', consults: 232, rate: '₹3,100', attain: '115.4%' },
    { name: 'Dr. Rajeshwar Kulkarni', consults: 188, rate: '₹3,000', attain: '112.0%' },
    { name: 'Dr. Shalini Mukherjee', consults: 215, rate: '₹2,500', attain: '110.2%' },
    { name: 'Dr. Siddharth Sen', consults: 198, rate: '₹3,000', attain: '108.6%' },
    { name: 'Dr. Meera Nambiar', consults: 172, rate: '₹2,400', attain: '105.1%' },
    { name: 'Dr. Farhan Qureshi', consults: 156, rate: '₹2,500', attain: '102.4%' },
    { name: 'Dr. Tanvi Venkatesh', consults: 195, rate: '₹1,800', attain: '98.5%' }
  ];

  // Circular gauge calculations
  const rad = 65;
  const circ = 2 * Math.PI * rad;
  const cappedAttain = Math.min(100, Math.max(0, attainment));
  const arcOffset = circ - (cappedAttain / 100) * circ;
  const dialColor = attainment >= 100 ? '#10b981' : attainment >= 80 ? '#3b82f6' : '#f59e0b';

  return (
    <DashboardLayout
      category="Revenue & Sales"
      subcategory="Targets & Achievement"
      title="Sales Targets & Quota Realization"
      subtitle="Executive pacing command center, calendar elapsed pacing, and departmental quota attainment"
      icon="🎯"
      badge="10-Department Matrix"
      actions={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)', fontWeight: 600 }}>Scenario:</span>
          <button
            onClick={() => setTargetAdjust(0)}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid var(--border, rgba(255,255,255,0.1))',
              background: targetAdjust === 0 ? 'var(--primary, #3b82f6)' : 'var(--card, #1e293b)',
              color: targetAdjust === 0 ? '#fff' : '#000',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >Baseline Goal</button>
          <button
            onClick={() => setTargetAdjust(10)}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid var(--border, rgba(255,255,255,0.1))',
              background: targetAdjust === 10 ? 'var(--primary, #3b82f6)' : 'var(--card, #1e293b)',
              color: targetAdjust === 10 ? '#fff' : '#000',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >+10% Stretch</button>
          <button
            onClick={() => setTargetAdjust(20)}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid var(--border, rgba(255,255,255,0.1))',
              background: targetAdjust === 20 ? 'var(--primary, #3b82f6)' : 'var(--card, #1e293b)',
              color: targetAdjust === 20 ? '#fff' : '#000',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >+20% High Growth</button>
          <button
            onClick={() => setTargetAdjust(-10)}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid var(--border, rgba(255,255,255,0.1))',
              background: targetAdjust === -10 ? 'var(--primary, #3b82f6)' : 'var(--card, #1e293b)',
              color: targetAdjust === -10 ? '#fff' : '#000',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >-10% Conservative</button>
        </div>
      }
    >
      {/* Quota KPI Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '14px'
      }}>
        <KpiCard
          label="Active Target Quota"
          value={`₹${(adjustedTarget / 10000000).toFixed(2)} Cr`}
          delta={targetAdjust !== 0 ? `${targetAdjust > 0 ? '+' : ''}${targetAdjust}% goal` : 'Base target'}
          trend="neutral"
          subtext="Period baseline"
          icon="🎯"
        />
        <KpiCard
          label="Realized Revenue"
          value={`₹${(realizedRevenue / 10000000).toFixed(2)} Cr`}
          delta={`${attainment.toFixed(1)}% Attained`}
          trend={attainment >= 100 ? 'up' : 'down'}
          subtext="Confirmed healthcare billings"
          icon="🏆"
        />
        <KpiCard
          label="Pacing vs Calendar"
          value={`+${pacingDiff.toFixed(1)}%`}
          delta={`${calendarElapsedPct}% elapsed`}
          trend="up"
          subtext="Ahead of calendar pace"
          icon="⚡"
        />
        <KpiCard
          label="Projected Finish"
          value={`₹${(projectedFinish / 10000000).toFixed(2)} Cr`}
          delta={`${((projectedFinish / adjustedTarget) * 100).toFixed(1)}% of Goal`}
          trend="up"
          subtext="Run-rate pacing forecast"
          icon="🚀"
        />
        <KpiCard
          label="Net Quota Variance"
          value={`+₹${(surplusDeficit / 100000).toFixed(2)}L`}
          delta={surplusDeficit >= 0 ? 'Surplus' : 'Deficit'}
          trend={surplusDeficit >= 0 ? 'up' : 'down'}
          subtext="Above baseline target"
          icon="📊"
        />
      </div>

      {/* Executive Pacing Speedometer & Goal Gauge Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(280px, 340px) 1fr',
        gap: '16px',
        alignItems: 'stretch'
      }}>
        {/* Radial SVG Dial Card */}
        <div style={{
          background: 'linear-gradient(145deg, rgba(30,41,59,0.9), rgba(15,23,42,0.95))',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '14px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #10b981, #3b82f6)'
          }} />

          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--muted-foreground, #94a3b8)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '14px' }}>
            Overall Quota Attainment
          </div>

          <div style={{ position: 'relative', width: '160px', height: '160px' }}>
            <svg width="160" height="160" viewBox="0 0 160 160">
              <circle
                cx="80"
                cy="80"
                r={rad}
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="14"
              />
              <circle
                cx="80"
                cy="80"
                r={rad}
                fill="none"
                stroke={dialColor}
                strokeWidth="14"
                strokeLinecap="round"
                strokeDasharray={circ}
                strokeDashoffset={arcOffset}
                transform="rotate(-90 80 80)"
              />
            </svg>
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ fontSize: '28px', fontWeight: 800, fontFamily: '"IBM Plex Mono", monospace', color: '#10b981' }}>
                {attainment.toFixed(1)}%
              </span>
              <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 700, textTransform: 'uppercase', marginTop: '2px' }}>
                Quota Surpassed
              </span>
            </div>
          </div>

          <div style={{ marginTop: '16px', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)', maxWidth: '240px' }}>
            Tracking ₹1.28 Cr settled revenue against ₹1.20 Cr baseline with 10 operating departments.
          </div>
        </div>

        {/* Speedometer & Comparative Velocity Card */}
        <div style={{
          background: 'var(--card, #1e293b)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '14px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '16px'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 700 }}>Calendar Pacing & Velocity Index</h3>
                <p style={{ margin: 0, fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>
                  Tracking realized run-rate against calendar time elapsed
                </p>
              </div>
              <div style={{
                background: 'rgba(16,185,129,0.15)',
                color: '#10b981',
                padding: '4px 10px',
                borderRadius: '99px',
                fontSize: '11px',
                fontWeight: 700
              }}>
                +{pacingDiff.toFixed(1)}% Ahead of Calendar
              </div>
            </div>

            {/* Pacing Bars */}
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--muted-foreground, #94a3b8)' }}>📅 Calendar Period Elapsed</span>
                  <span style={{ fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{calendarElapsedPct}%</span>
                </div>
                <div style={{ height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', overflow: 'hidden' }}>
                  <div style={{ width: `${calendarElapsedPct}%`, height: '100%', background: '#3b82f6', borderRadius: '99px' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--muted-foreground, #94a3b8)', fontWeight: 600 }}>🎯 Revenue Target Realized ({attainment.toFixed(1)}%)</span>
                  <span style={{ fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace', color: '#10b981' }}>₹1.28 Cr / ₹1.20 Cr</span>
                </div>
                <div style={{ height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', overflow: 'hidden' }}>
                  <div style={{ width: `${Math.min(100, attainment)}%`, height: '100%', background: '#10b981', borderRadius: '99px' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--muted-foreground, #94a3b8)', fontWeight: 600 }}>🚀 Projected Month-End Run Rate</span>
                  <span style={{ fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace', color: '#60a5fa' }}>₹1.63 Cr (136%)</span>
                </div>
                <div style={{ height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', overflow: 'hidden' }}>
                  <div style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)', borderRadius: '99px' }} />
                </div>
              </div>
            </div>
          </div>

          <div style={{
            background: 'rgba(0,0,0,0.2)',
            borderRadius: '10px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            border: '1px solid var(--border, rgba(255,255,255,0.04))'
          }}>
            <span style={{ fontSize: '20px' }}>💡</span>
            <span style={{ fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)', lineHeight: 1.5 }}>
              <b style={{ color: 'var(--foreground, #f8fafc)' }}>Executive Pacing Note:</b> Surgery, Diets, and Preventives are pacing at +112% attainment, offsetting mild delays in B2B accounts.
            </span>
          </div>
        </div>
      </div>

      {/* Departmental Quota Realization Grid (10 Departments) */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '14px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>10 Departmental Quota Benchmarks</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Individual operating business units and their realized targets</p>
          </div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {['all', 'surgery', 'nutrition', 'pharmacy', 'diagnostics'].map(deptKey => (
              <button
                key={deptKey}
                onClick={() => setSelectedDept(deptKey)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: '1px solid var(--border, rgba(255,255,255,0.1))',
                  background: selectedDept === deptKey ? 'var(--primary, #3b82f6)' : 'transparent',
                  color: selectedDept === deptKey ? '#fff' : '#000',
                  fontSize: '11px',
                  cursor: 'pointer',
                  textTransform: 'capitalize'
                }}
              >{deptKey}</button>
            ))}
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '14px'
        }}>
          {filteredDepts.map(dept => (
            <div key={dept.id} style={{
              background: 'rgba(0,0,0,0.18)',
              border: '1px solid var(--border, rgba(255,255,255,0.06))',
              borderRadius: '10px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontWeight: 700, fontSize: '13px' }}>{dept.name}</span>
                <span style={{
                  padding: '2px 8px',
                  borderRadius: '99px',
                  background: parseFloat(dept.attain) >= 100 ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)',
                  color: parseFloat(dept.attain) >= 100 ? '#10b981' : '#f59e0b',
                  fontSize: '11px',
                  fontWeight: 700
                }}>{dept.attain}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>
                <span>Target: <b>{dept.target}</b></span>
                <span>Achieved: <b style={{ color: '#10b981' }}>{dept.achieved}</b></span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', overflow: 'hidden' }}>
                <div style={{ width: `${Math.min(100, parseFloat(dept.attain))}%`, height: '100%', background: dept.color, borderRadius: '99px' }} />
              </div>
              <span style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)' }}>{dept.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Two Columns: 10 Reps & 10 Doctors */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '16px'
      }}>
        {/* Rep & Coordinator Quota Attainment */}
        <div style={{
          background: 'var(--card, #1e293b)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '14px',
          padding: '20px'
        }}>
          <h3 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 700 }}>Top 10 Care Coordinators & Rep Quotas</h3>
          <p style={{ margin: '0 0 14px', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Individual team member contribution to revenue targets</p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)', fontSize: '11px' }}>
                  <th style={{ padding: '8px 6px' }}>Rank</th>
                  <th style={{ padding: '8px 10px' }}>Coordinator</th>
                  <th style={{ padding: '8px 10px', textAlign: 'right' }}>Target</th>
                  <th style={{ padding: '8px 10px', textAlign: 'right' }}>Achieved</th>
                  <th style={{ padding: '8px 10px', textAlign: 'right' }}>Attainment</th>
                  <th style={{ padding: '8px 10px', textAlign: 'right' }}>Incentive</th>
                </tr>
              </thead>
              <tbody>
                {reps.map(rep => (
                  <tr key={rep.rank} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                    <td style={{ padding: '10px 6px', fontWeight: 700, color: rep.rank <= 3 ? '#f59e0b' : 'var(--muted-foreground, #94a3b8)' }}>#{rep.rank}</td>
                    <td style={{ padding: '10px 10px', fontWeight: 600 }}>{rep.name}</td>
                    <td style={{ padding: '10px 10px', textAlign: 'right', color: 'var(--muted-foreground, #94a3b8)' }}>{rep.target}</td>
                    <td style={{ padding: '10px 10px', textAlign: 'right', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{rep.achieved}</td>
                    <td style={{ padding: '10px 10px', textAlign: 'right', color: '#10b981', fontWeight: 700 }}>{rep.attain}</td>
                    <td style={{ padding: '10px 10px', textAlign: 'right', color: '#38bdf8' }}>{rep.incentive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Doctor Consultation & Billings Quota */}
        <div style={{
          background: 'var(--card, #1e293b)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '14px',
          padding: '20px'
        }}>
          <h3 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 700 }}>Top 10 Doctor Quota Attainment</h3>
          <p style={{ margin: '0 0 14px', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Practitioner clinical appointment volume and revenue target realization</p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)', fontSize: '11px' }}>
                  <th style={{ padding: '8px 10px' }}>Veterinarian</th>
                  <th style={{ padding: '8px 10px', textAlign: 'right' }}>Consultations</th>
                  <th style={{ padding: '8px 10px', textAlign: 'right' }}>Consult Rate</th>
                  <th style={{ padding: '8px 10px', textAlign: 'right' }}>Billing Attainment</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map(doc => (
                  <tr key={doc.name} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                    <td style={{ padding: '10px 10px', fontWeight: 600 }}>{doc.name}</td>
                    <td style={{ padding: '10px 10px', textAlign: 'right' }}>{doc.consults}</td>
                    <td style={{ padding: '10px 10px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{doc.rate}</td>
                    <td style={{ padding: '10px 10px', textAlign: 'right', color: '#10b981', fontWeight: 700 }}>{doc.attain}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
