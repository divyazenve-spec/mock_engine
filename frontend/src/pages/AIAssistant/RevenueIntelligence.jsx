import React, { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';
import { getRevenueIntelligence, simulateRevenue, applyRevenueSafeguard } from '../../services/api';

const EMPTY = {
  kpis: {
    detectedLeakage: 1840000,
    recoveryRealized: 1420000,
    optimalElasticity: 1.28,
    discountEfficiency: 88.5,
    netRealizationRate: 96.8,
    grossBookings: 54000000
  },
  leakagePoints: [
    { id: 'LEAK-001', vector: 'UNCOLLECTED_SURGICAL_CONSUMABLES', source: 'Clinical Surgery (All Hubs)', monthlyDrag: 385000, severity: 'CRITICAL', rootCause: 'Unbilled anesthetic consumables, drapes, and specialized orthopedic pins', recommendedAction: 'Auto-bundle surgical material checklist into EMR billing checkout', status: 'PENDING' },
    { id: 'LEAK-002', vector: 'UNRESTRICTED_DISCOUNT_STACKING', source: 'E-Commerce & Pharmacy App', monthlyDrag: 290000, severity: 'CRITICAL', rootCause: 'Legacy promotional promo codes stacking with auto-ship subscriber discounts', recommendedAction: 'Enforce single-discount validation rule on checkout payment pipeline', status: 'APPLIED' },
    { id: 'LEAK-003', vector: 'EMERGENCY_AFTER_HOURS_UNDERBILLING', source: '24x7 Trauma Clinics', monthlyDrag: 245000, severity: 'HIGH', rootCause: 'Doctors recording night emergency triage as standard daytime consults', recommendedAction: 'Implement automatic time-triggered after-hours tariff modifier in EMR', status: 'PENDING' },
    { id: 'LEAK-004', vector: 'MISSED_VACCINATION_BOOSTER_DROPOUT', source: 'Preventive Healthcare', monthlyDrag: 210000, severity: 'HIGH', rootCause: 'Zero follow-up engagement when pet parents miss 21-day booster dates', recommendedAction: 'Automated WhatsApp appointment sequence with direct calendar booking', status: 'APPLIED' },
    { id: 'LEAK-005', vector: 'DIAGNOSTIC_REAGENT_EXPIRY_SINK', source: 'In-Clinic Pathology Labs', monthlyDrag: 180000, severity: 'HIGH', rootCause: 'Underutilized specialized electrolyte cartridges expiring before batch use', recommendedAction: 'Rebalance cartridge inventory across high-volume Indiranagar hub', status: 'APPLIED' },
    { id: 'LEAK-006', vector: 'EXPRESS_DELIVERY_SURCHARGE_ABSORPTION', source: 'Last-Mile Logistics', monthlyDrag: 165000, severity: 'MEDIUM', rootCause: 'Absorbing peak-hour rain and traffic surge costs without delivery fee pass-through', recommendedAction: 'Dynamic ₹29 weather/distance surcharge on orders under ₹499', status: 'PENDING' },
    { id: 'LEAK-007', vector: 'UNCLAIMED_SUPPLIER_VOLUME_REBATES', source: 'Procurement & Sourcing', monthlyDrag: 140000, severity: 'MEDIUM', rootCause: 'Failing to claim quarterly tier-3 volume kickbacks from Zoetis & Boehringer', recommendedAction: 'Automated ERP rebate tracking dashboard with supplier claim triggers', status: 'APPLIED' },
    { id: 'LEAK-008', vector: 'PET_SPA_IDLE_TABLE_CAPACITY', source: 'Grooming Centers', monthlyDrag: 125000, severity: 'MEDIUM', rootCause: 'Weekday 11 AM - 3 PM grooming groomers operating at 32% utilization', recommendedAction: 'Deploy dynamic off-peak happy hour pricing (20% off weekday midday)', status: 'PENDING' },
    { id: 'LEAK-009', vector: 'COLD_CHAIN_TEMPERATURE_EXCURSION', source: 'Vaccine Warehouses', monthlyDrag: 95000, severity: 'MEDIUM', rootCause: 'Temperature drift causing disposal of sensitive insulin and biologic vials', recommendedAction: 'IoT smart sensors with SMS alerts and auto-switch to solar inverter', status: 'APPLIED' },
    { id: 'LEAK-010', vector: 'INVOICE_ROUNDING_AND_FEE_LEAK', source: 'Front-Desk Reception Billing', monthlyDrag: 65000, severity: 'LOW', rootCause: 'Manual cashier cash rounding and waived bio-waste disposal fees', recommendedAction: 'Mandate electronic itemized billing with zero manual fee overrides', status: 'APPLIED' }
  ],
  elasticityMatrix: [
    { service: 'Emergency Canine C-Section Surgery', currentPrice: 18500, recommendedPrice: 21000, elasticity: '0.18 (Highly Inelastic)', projectedGain: 340000 },
    { service: 'Critical ICU Ventilator Care (Per 24h)', currentPrice: 7500, recommendedPrice: 8800, elasticity: '0.22 (Inelastic)', projectedGain: 290000 },
    { service: 'Specialist Orthopedic Consultation', currentPrice: 1200, recommendedPrice: 1500, elasticity: '0.35 (Inelastic)', projectedGain: 260000 },
    { service: 'Comprehensive Diagnostic Blood Chemistry', currentPrice: 2800, recommendedPrice: 3150, elasticity: '0.42 (Inelastic)', projectedGain: 210000 },
    { service: 'Dental Ultrasonic Scaling & Polishing', currentPrice: 3500, recommendedPrice: 3950, elasticity: '0.58 (Moderately Elastic)', projectedGain: 180000 },
    { service: 'Routine OPD General Health Checkup', currentPrice: 650, recommendedPrice: 700, elasticity: '0.85 (Elastic)', projectedGain: 145000 },
    { service: 'Annual DHLPPi + Anti-Rabies Vaccine', currentPrice: 1400, recommendedPrice: 1550, elasticity: '0.48 (Inelastic)', projectedGain: 175000 },
    { service: 'Express 60-Minute Medicine Delivery Fee', currentPrice: 49, recommendedPrice: 69, elasticity: '0.38 (Inelastic)', projectedGain: 120000 },
    { service: 'Therapeutic Prescription Diet (Per Bag)', currentPrice: 3800, recommendedPrice: 3950, elasticity: '0.62 (Moderate)', projectedGain: 115000 },
    { service: 'Feline Spay / Ovariohysterectomy', currentPrice: 6500, recommendedPrice: 7200, elasticity: '0.52 (Moderate)', projectedGain: 165000 }
  ],
  waterfall: [
    { label: 'Gross Billed Revenue', value: 54000000 },
    { label: 'Uncollected Surgical Consumables', value: -385000 },
    { label: 'Promotional Discount Stacking', value: -290000 },
    { label: 'After-Hours Triage Underbilling', value: -245000 },
    { label: 'Vaccination Dropout Leakage', value: -210000 },
    { label: 'Diagnostic Reagent Waste', value: -180000 },
    { label: 'Delivery Surcharge Deficit', value: -165000 },
    { label: 'Net Realized Revenue', value: 52525000 }
  ],
  auditLog: [
    { executedAt: '2026-10-14 11:30', id: 'REV-002', vector: 'UNRESTRICTED_DISCOUNT_STACKING', recovered: 290000, detail: 'Enforced checkout validation rule preventing promo coupon stacking with auto-ship discount' },
    { executedAt: '2026-10-14 09:15', id: 'REV-004', vector: 'MISSED_VACCINATION_BOOSTER_DROPOUT', recovered: 210000, detail: 'Activated WhatsApp 21-day booster sequence with direct 1-click booking link' },
    { executedAt: '2026-10-13 16:45', id: 'REV-005', vector: 'DIAGNOSTIC_REAGENT_EXPIRY_SINK', recovered: 180000, detail: 'Auto-rebalanced 60 high-cost electrolyte cartridges to Indiranagar surgical hub' },
    { executedAt: '2026-10-13 14:20', id: 'REV-007', vector: 'UNCLAIMED_SUPPLIER_VOLUME_REBATES', recovered: 140000, detail: 'Dispatched automated Q3 volume rebate claim letter to Zoetis India' },
    { executedAt: '2026-10-12 18:00', id: 'REV-009', vector: 'COLD_CHAIN_TEMPERATURE_EXCURSION', recovered: 95000, detail: 'Installed secondary inverter switch and temperature alarm on Central Vaccine Depot' },
    { executedAt: '2026-10-12 11:10', id: 'REV-010', vector: 'INVOICE_ROUNDING_AND_FEE_LEAK', recovered: 65000, detail: 'Standardized electronic billing tariffs across all 14 clinic front-desk POS terminals' },
    { executedAt: '2026-10-11 15:40', id: 'REV-011', vector: 'PET_BOARDING_NO_SHOW_PENALTY', recovered: 88000, detail: 'Instituted 25% non-refundable holiday boarding deposit policy' },
    { executedAt: '2026-10-10 13:25', id: 'REV-012', vector: 'PHARMACY_SHORT_EXPIRY_DISCOUNT', recovered: 115000, detail: 'Created 30-day clearance bundle for near-expiry pet supplements in clinic lobbies' },
    { executedAt: '2026-10-09 17:50', id: 'REV-013', vector: 'LAB_REFERENCE_OVERCHARGING', recovered: 135000, detail: 'Audited external histopathology invoices and recovered contractual overcharges' },
    { executedAt: '2026-10-08 10:15', id: 'REV-014', vector: 'FLEET_FUEL_ALLOWANCE_NORMALIZATION', recovered: 72000, detail: 'Replaced static rider fuel stipends with GPS odometer-verified fuel reimbursements' }
  ]
};

const fmt = (v) => {
  const n = Math.abs(v || 0);
  const s = n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : n >= 1000 ? `₹${(n / 1000).toFixed(1)}K` : `₹${n}`;
  return v < 0 ? `-${s}` : s;
};

const SEV = {
  CRITICAL: ['#fee2e2', '#991b1b'], HIGH: ['#ffedd5', '#9a3412'],
  MEDIUM: ['#fef3c7', '#92400e'], LOW: ['#f1f5f9', '#475569']
};

export default function RevenueIntelligence() {
  const [data, setData] = useState(EMPTY);
  const [busyId, setBusyId] = useState(null);
  const [toast, setToast] = useState('');
  const [sim, setSim] = useState({ priceIncreasePct: 5, discountCapPct: 50 });
  const [simResult, setSimResult] = useState(null);

  const load = useCallback(() => {
    getRevenueIntelligence({})
      .then(res => { if (res && res.kpis) setData({ ...EMPTY, ...res }); })
      .catch(() => {});
  }, []);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(''), 4500);
    return () => clearTimeout(t);
  }, [toast]);

  const runSim = (next) => {
    setSim(next);
    simulateRevenue(next).then(setSimResult).catch(() => {});
  };

  const apply = (leak) => {
    setBusyId(leak.id);
    applyRevenueSafeguard(leak.id)
      .then(res => {
        setToast(res.success ? `Safeguard applied: ${res.entry.detail}` : (res.error || 'Unable to apply'));
        load();
      })
      .catch(() => setToast('Backend unreachable — safeguard not applied'))
      .finally(() => setBusyId(null));
  };

  const { kpis, leakagePoints, elasticityMatrix, waterfall, auditLog } = data;
  const cardStyle = {
    background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px',
    padding: '22px 24px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
  };
  const th = (extra = {}) => ({ padding: '12px 16px', fontWeight: 600, ...extra });
  const empty = (cols, msg) => (
    <tr><td colSpan={cols} style={{ padding: '24px', textAlign: 'center', color: '#94a3b8' }}>{msg}</td></tr>
  );

  return (
    <DashboardLayout
      category="AI Assistant"
      subcategory="Revenue Intelligence"
      title="Revenue Intelligence & Margin Optimization"
      subtitle="Autonomous revenue leakage radar, price elasticity analysis, and conversion monetization drivers"
      icon="💎"
      badge="Revenue Radar Active"
    >
      {toast && (
        <div onClick={() => setToast('')} style={{
          position: 'fixed', top: 24, right: 24, zIndex: 99999, background: '#059669', color: '#fff',
          padding: '14px 20px', borderRadius: 12, fontSize: 13, fontWeight: 600, maxWidth: 480,
          boxShadow: '0 8px 32px rgba(0,0,0,0.18)', cursor: 'pointer'
        }}>✅ {toast}</div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Detected Revenue Leakage" value={fmt(kpis.detectedLeakage)} delta={leakagePoints.length ? `${leakagePoints.length} vectors` : '--'} trend={kpis.detectedLeakage ? 'down' : 'neutral'} subtext={kpis.detectedLeakage ? 'Monthly drag identified' : 'No leakage detected'} icon="⚠️" />
        <KpiCard label="Recovery Realization (MTD)" value={fmt(kpis.recoveryRealized)} delta="--" trend={kpis.recoveryRealized ? 'up' : 'neutral'} subtext={kpis.recoveryRealized ? 'From applied safeguards' : 'No recovery actions'} icon="💰" />
        <KpiCard label="Optimal Price Elasticity" value={`${kpis.optimalElasticity.toFixed(2)}`} delta="--" trend="neutral" subtext={elasticityMatrix.length ? 'Avg across tested services' : 'No elasticity tested'} icon="📈" />
        <KpiCard label="Discount Efficiency Score" value={`${kpis.discountEfficiency.toFixed(1)}%`} delta="--" trend={kpis.discountEfficiency > 70 ? 'up' : 'neutral'} subtext={kpis.discountEfficiency ? 'Promos reaching new customers' : 'No discount records'} icon="🎯" />
        <KpiCard label="Net Realization Rate" value={`${kpis.netRealizationRate.toFixed(1)}%`} delta="--" trend="neutral" subtext="Net EBITDA ÷ gross bookings" icon="🧮" />
      </div>

      {/* Leakage radar */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Identified Revenue Leakage & Remediation Radar</h3>
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b' }}>Total Identified: {fmt(kpis.detectedLeakage)}</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                <th style={th()}>LEAKAGE VECTOR</th>
                <th style={th()}>FACILITY / CHANNEL</th>
                <th style={th({ textAlign: 'right' })}>MONTHLY DRAG</th>
                <th style={th({ textAlign: 'center' })}>SEVERITY</th>
                <th style={th()}>ROOT CAUSE</th>
                <th style={th()}>AUTOMATED REMEDIATION</th>
                <th style={th({ textAlign: 'right' })}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {leakagePoints.length === 0 ? empty(7, 'No revenue leakage detected. Telemetry streams are active — awaiting transactional data.') :
                leakagePoints.map(l => {
                  const [bg, fg] = SEV[l.severity] || SEV.LOW;
                  const done = l.status === 'APPLIED';
                  return (
                    <tr key={l.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>{l.vector.replace(/_/g, ' ')}</td>
                      <td style={{ padding: '12px 16px' }}>{l.source}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#dc2626' }}>{fmt(l.monthlyDrag)}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 12, background: bg, color: fg }}>{l.severity}</span>
                      </td>
                      <td style={{ padding: '12px 16px', color: '#475569' }}>{l.rootCause}</td>
                      <td style={{ padding: '12px 16px', color: '#475569' }}>{l.recommendedAction}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                        {done ? <span style={{ color: '#059669', fontWeight: 700, fontSize: 11 }}>✅ Applied</span> : (
                          <button disabled={busyId === l.id} onClick={() => apply(l)} style={{
                            padding: '5px 12px', borderRadius: 6, border: '1px solid #2563eb', background: '#eff6ff',
                            color: '#1d4ed8', fontSize: 11, fontWeight: 600, cursor: 'pointer'
                          }}>{busyId === l.id ? 'Applying…' : 'Apply Safeguard'}</button>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simulator + elasticity */}
      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 12px', fontSize: 16, fontWeight: 700, color: '#0f172a' }}>Price Elasticity & What-If Simulator</h3>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 16, fontSize: 12, color: '#475569' }}>
          <label>Price uplift on inelastic services: <b>{sim.priceIncreasePct}%</b><br />
            <input type="range" min="0" max="15" value={sim.priceIncreasePct} onChange={e => runSim({ ...sim, priceIncreasePct: +e.target.value })} />
          </label>
          <label>Repeat-customer discount cap: <b>{sim.discountCapPct}%</b><br />
            <input type="range" min="0" max="100" step="10" value={sim.discountCapPct} onChange={e => runSim({ ...sim, discountCapPct: +e.target.value })} />
          </label>
          <div>Projected annual lift: <b style={{ color: '#059669' }}>{fmt(simResult ? simResult.projectedTotalLift : 0)}</b></div>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
              <th style={th()}>SERVICE / SKU</th><th style={th({ textAlign: 'right' })}>CURRENT</th>
              <th style={th({ textAlign: 'right' })}>RECOMMENDED</th><th style={th({ textAlign: 'right' })}>ELASTICITY</th>
              <th style={th({ textAlign: 'right' })}>PROJECTED GAIN</th>
            </tr>
          </thead>
          <tbody>
            {elasticityMatrix.length === 0 ? empty(5, 'No price/volume observations available for elasticity modelling.') :
              elasticityMatrix.map(e => (
                <tr key={e.service} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600 }}>{e.service}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>₹{e.currentPrice}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>₹{e.recommendedPrice}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>{e.elasticity}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', color: '#059669', fontWeight: 700 }}>{fmt(e.projectedGain)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Waterfall */}
      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 12px', fontSize: 16, fontWeight: 700, color: '#0f172a' }}>Revenue Realization Waterfall</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
              <th style={th()}>STAGE</th><th style={th({ textAlign: 'right' })}>AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {waterfall.length === 0 ? empty(2, 'No gross bookings recorded yet.') :
              waterfall.map(w => (
                <tr key={w.label} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '10px 16px', fontWeight: 600 }}>{w.label}</td>
                  <td style={{ padding: '10px 16px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: w.value < 0 ? '#dc2626' : '#0f172a' }}>{fmt(w.value)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Audit */}
      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 12px', fontSize: 16, fontWeight: 700, color: '#0f172a' }}>📋 Safeguard Audit Trail <span style={{ fontSize: 10, color: '#059669' }}>{auditLog.length} Records</span></h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
              <th style={th()}>TIMESTAMP</th><th style={th()}>LEAK</th>
              <th style={th({ textAlign: 'right' })}>RECOVERED</th><th style={th()}>DETAIL</th>
            </tr>
          </thead>
          <tbody>
            {auditLog.length === 0 ? empty(4, 'No safeguards applied yet.') :
              auditLog.map(a => (
                <tr key={a.id + a.executedAt} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '10px 16px', fontFamily: '"IBM Plex Mono", monospace' }}>{a.executedAt}</td>
                  <td style={{ padding: '10px 16px' }}>{a.id} · {a.vector.replace(/_/g, ' ')}</td>
                  <td style={{ padding: '10px 16px', textAlign: 'right', color: '#059669', fontWeight: 700 }}>{fmt(a.recovered)}</td>
                  <td style={{ padding: '10px 16px', color: '#475569' }}>{a.detail}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
