import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';
import { MOCK_MEDICINES, MOCK_THERAPEUTIC_CATEGORIES } from './mockPharmacyData';

export default function PharmacyProfitability() {
  const [period, setPeriod] = useState('Month to Date');

  const categoryMargins = [
    { cat: 'Antiparasitics & Dewormers', rev: '₹18.4L', cogs: '₹11.3L', grossProfit: '₹7.1L', margin: '38.5%', share: '34.8%', rebate: '₹95,000', color: '#38bdf8' },
    { cat: 'Antibiotics & Anti-Infectives', rev: '₹12.2L', cogs: '₹8.0L', grossProfit: '₹4.2L', margin: '34.2%', share: '20.5%', rebate: '₹58,000', color: '#10b981' },
    { cat: 'Chronic Wellness & Cardiac', rev: '₹9.8L', cogs: '₹6.3L', grossProfit: '₹3.5L', margin: '36.0%', share: '17.3%', rebate: '₹44,000', color: '#a855f7' },
    { cat: 'Vaccines & Cold Chain', rev: '₹7.6L', cogs: '₹5.4L', grossProfit: '₹2.2L', margin: '28.5%', share: '10.7%', rebate: '₹36,000', color: '#06b6d4' },
    { cat: 'Dermatologicals & Shampoos', rev: '₹6.1L', cogs: '₹3.5L', grossProfit: '₹2.6L', margin: '42.0%', share: '12.6%', rebate: '₹28,000', color: '#f59e0b' },
    { cat: 'Nutraceuticals & Joint Care', rev: '₹4.3L', cogs: '₹2.4L', grossProfit: '₹1.9L', margin: '45.0%', share: '9.5%', rebate: '₹19,000', color: '#ec4899' }
  ];

  const topProfitableDrugs = MOCK_MEDICINES.slice(0, 6).map((m, idx) => {
    const unitProfit = m.mrp - m.ptr;
    const margin = (((m.mrp - m.ptr) / m.mrp) * 100).toFixed(1) + '%';
    const units = 110 - idx * 12;
    const totalProfit = `₹${((unitProfit * units) / 1000).toFixed(1)}K`;
    return {
      name: m.name,
      sku: m.sku,
      mrp: m.mrp.toLocaleString('en-IN'),
      ptr: m.ptr.toLocaleString('en-IN'),
      unitProfit: unitProfit.toLocaleString('en-IN'),
      margin,
      units,
      totalProfit
    };
  });

  return (
    <DashboardLayout
      category="Pharmacy"
      subcategory="Pharmacy Profitability"
      title="Veterinary Pharmacy Margins & Unit Economics"
      subtitle="Therapeutic class margins, manufacturer volume rebates, inventory shrinkage audit, and net pharmacy contribution"
      icon="📈"
      badge="34.8% Blended Margin"
      actions={
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{
            display: 'flex',
            background: 'rgba(255,255,255,0.05)',
            padding: '3px',
            borderRadius: '8px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            {['Month to Date', 'Quarter to Date', 'Year to Date'].map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: period === p ? '#3b82f6' : 'transparent',
                  color: period === p ? '#fff' : '#94a3b8'
                }}
              >
                {p}
              </button>
            ))}
          </div>
          <button
            onClick={() => alert('Exporting full pharmaceutical gross margin and COGS reconciliation ledger...')}
            style={{
              padding: '7px 14px',
              borderRadius: '8px',
              background: '#10b981',
              color: '#fff',
              border: 'none',
              fontWeight: 600,
              fontSize: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>📥</span> Export Profitability Matrix
          </button>
        </div>
      }
    >
      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Gross Pharmaceutical Profit" value="₹20.3L" delta="+21.4% YoY" trend="up" subtext="34.8% gross margin" icon="💰" />
        <KpiCard label="Net Pharmacy Contribution" value="₹14.5L" delta="24.8% net" trend="up" subtext="After logistics & dispensary" icon="💎" />
        <KpiCard label="Vendor Volume Rebates" value="+₹2.8L" delta="+15.2%" trend="up" subtext="MSD, Zoetis, Boehringer" icon="🤝" />
        <KpiCard label="Damage & Expiry Shrinkage" value="-₹32K" delta="0.28% of COGS" trend="up" subtext="Industry benchmark < 0.5%" icon="📉" />
        <KpiCard label="Return on Pharmacy Capital" value="41.6%" delta="+5.2%" trend="up" subtext="ROIC on medicine inventory" icon="⚡" />
        <KpiCard label="Cold-Chain Loss Rate" value="0.00%" delta="Zero spoilage" trend="up" subtext="Continuous probe logs" icon="❄️" />
      </div>

      {/* Margins by Category Breakdown */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Therapeutic Category Margin & COGS Analysis</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#94a3b8' }}>Revenue realization, procurement cost (PTR), gross margin percentage, and vendor volume rebates</p>
          </div>
          <span style={{ fontSize: '12px', color: '#10b981', fontWeight: 600 }}>Total COGS: ₹36,95,260</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#94a3b8' }}>
                <th style={{ padding: '8px 12px' }}>Therapeutic Category</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Revenue (MRP)</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Procurement COGS</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Gross Profit</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Gross Margin</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Profit Share</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Vendor Rebates</th>
              </tr>
            </thead>
            <tbody>
              {categoryMargins.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ padding: '24px', textAlign: 'center', color: '#94a3b8' }}>
                    No records found
                  </td>
                </tr>
              ) : (
                categoryMargins.map((cm, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: cm.color }} />
                      {cm.cat}
                    </td>
                    <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{cm.rev}</td>
                    <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#94a3b8' }}>{cm.cogs}</td>
                    <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#10b981' }}>{cm.grossProfit}</td>
                    <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#38bdf8' }}>{cm.margin}</td>
                    <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{cm.share}</td>
                    <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#f59e0b' }}>{cm.rebate}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Profit Drivers */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Top Profit-Generating Pharmaceuticals</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#94a3b8' }}>Individual SKU unit margins and cumulative profit contribution</p>
          </div>
          <span style={{ fontSize: '12px', color: '#38bdf8', fontWeight: 600 }}>6 Core Formulations</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#94a3b8' }}>
                <th style={{ padding: '8px 12px' }}>Medicine & SKU</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>MRP</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Cost (PTR)</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Unit Profit</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Margin %</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Units Dispensed</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Total Profit</th>
              </tr>
            </thead>
            <tbody>
              {topProfitableDrugs.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ padding: '24px', textAlign: 'center', color: '#94a3b8' }}>
                    No records found
                  </td>
                </tr>
              ) : (
                topProfitableDrugs.map((d, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '10px 12px' }}>
                      <div style={{ fontWeight: 600, color: '#fff' }}>{d.name}</div>
                      <div style={{ fontSize: '10px', color: '#38bdf8', fontFamily: '"IBM Plex Mono", monospace' }}>{d.sku}</div>
                    </td>
                    <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>₹{d.mrp}</td>
                    <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#94a3b8' }}>₹{d.ptr}</td>
                    <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#10b981', fontWeight: 600 }}>₹{d.unitProfit}</td>
                    <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#38bdf8', fontWeight: 600 }}>{d.margin}</td>
                    <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{d.units}</td>
                    <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#10b981' }}>{d.totalProfit}</td>
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
