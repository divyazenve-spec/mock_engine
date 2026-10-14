import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function BalanceSheet() {
  const [asOfDate, setAsOfDate] = useState('September 30, 2026');

  const assets = [
    { name: 'Cash & Liquid Bank Balances (HDFC + ICICI)', val: '₹8,84,00,000', prev: '₹7,90,00,000', change: '+11.9%', isSubtotal: false },
    { name: 'Trade Receivables (Insurance TPAs & Corporate)', val: '₹2,85,00,000', prev: '₹2,95,00,000', change: '-3.4%', isSubtotal: false },
    { name: 'Veterinary Pharmacy & Consumables Stock', val: '₹1,45,20,000', prev: '₹1,32,00,000', change: '+10.0%', isSubtotal: false },
    { name: 'Prepaid Operational Leases & AMC Retainers', val: '₹42,50,000', prev: '₹38,00,000', change: '+11.8%', isSubtotal: false },
    { name: 'Total Current Operating Assets', val: '₹13,56,70,000', prev: '₹12,55,00,000', change: '+8.1%', isSubtotal: true },
    { name: 'Surgical OT Equipment, Ultrasounds & Digital X-Ray', val: '₹3,40,00,000', prev: '₹3,10,00,000', change: '+9.7%', isSubtotal: false },
    { name: 'Hospital Modular Fitouts & Leasehold Infra', val: '₹95,00,000', prev: '₹90,00,000', change: '+5.6%', isSubtotal: false },
    { name: 'Proprietary EHR Platform & AI Diagnostic Software', val: '₹35,80,000', prev: '₹32,00,000', change: '+11.9%', isSubtotal: false },
    { name: 'Long-Term Facility Security Deposits', val: '₹15,00,000', prev: '₹15,00,000', change: '0.0%', isSubtotal: false },
    { name: 'Total Capital & Operating Assets', val: '₹18,42,50,000', prev: '₹17,02,00,000', change: '+8.3%', isTotal: true }
  ];

  const liabilitiesAndEquity = [
    { name: 'Trade Payables to Pharmaceutical Vendors', val: '₹1,92,00,000', prev: '₹1,85,00,000', change: '+3.8%', isSubtotal: false },
    { name: 'Veterinary Surgeon Retainers & Staff Dues', val: '₹48,50,000', prev: '₹45,00,000', change: '+7.8%', isSubtotal: false },
    { name: 'Statutory GST & TDS Withholding Obligations', val: '₹16,40,000', prev: '₹15,20,000', change: '+7.9%', isSubtotal: false },
    { name: 'Client Advances & Annual Wellness Subscriptions', val: '₹5,40,000', prev: '₹4,80,000', change: '+12.5%', isSubtotal: false },
    { name: 'Total Current Operating Liabilities', val: '₹2,62,30,000', prev: '₹2,50,00,000', change: '+4.9%', isSubtotal: true },
    { name: 'Equity Share Capital (Face Value ₹10)', val: '₹5,00,00,000', prev: '₹5,00,00,000', change: '0.0%', isSubtotal: false },
    { name: 'Securities Premium Account Reserve', val: '₹6,80,00,000', prev: '₹6,80,00,000', change: '0.0%', isSubtotal: false },
    { name: 'Retained Operating Surplus & Free Reserves', val: '₹3,75,20,000', prev: '₹2,50,00,000', change: '+50.1%', isSubtotal: false },
    { name: 'ESOP Trust Capital Pool Reserve', val: '₹25,00,000', prev: '₹22,00,000', change: '+13.6%', isSubtotal: false },
    { name: 'Total Liabilities & Shareholders Equity', val: '₹18,42,50,000', prev: '₹17,02,00,000', change: '+8.3%', isTotal: true }
  ];

  return (
    <DashboardLayout
      category="Finance & Accounting"
      subcategory="Balance Sheet"
      title="Statement of Financial Position (Balance Sheet)"
      subtitle="Comprehensive capital structure, working capital liquidity, fixed hospital assets, and shareholder net worth"
      icon="🏛️"
      badge="Net Worth: ₹15.80 Cr"
      actions={
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: '#94a3b8' }}>As of: <b>{asOfDate}</b></span>
          <button
            onClick={() => alert('Downloading official audited Balance Sheet...')}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: '1px solid #3b82f6',
              background: 'rgba(59,130,246,0.15)',
              color: '#60a5fa',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            📥 Download Balance Sheet
          </button>
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Assets" value="₹18.42 Cr" delta="+8.3% YoY" trend="up" subtext="Fully balanced" icon="🏛️" />
        <KpiCard label="Shareholders Equity" value="₹15.80 Cr" delta="+16.2% YoY" trend="up" subtext="Strong net worth" icon="💎" />
        <KpiCard label="Current Ratio" value="5.17x" delta="High liquidity" trend="up" subtext="Benchmark: >2.0x" icon="💧" />
        <KpiCard label="Quick Ratio" value="4.62x" delta="Instant solvency" trend="up" subtext="Excluding stock" icon="⚡" />
        <KpiCard label="Debt to Equity" value="0.00x" delta="Zero Long-Term Debt" trend="up" subtext="Self-capitalized" icon="🛡️" />
        <KpiCard label="Working Capital" value="₹10.94 Cr" delta="+8.9% YoY" trend="up" subtext="Current A - Current L" icon="📈" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '20px' }}>
        {/* Assets Side */}
        <div style={{
          background: 'var(--card, #131d2e)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '12px',
          padding: '22px 24px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#fff' }}>💼 Assets Breakdown</h3>
              <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Current liquid assets and capital infrastructure</p>
            </div>
            <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>Total: ₹18.42 Cr</span>
          </div>

          <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ background: 'rgba(0,0,0,0.22)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <th style={{ padding: '10px 20px', textAlign: 'left', color: '#94a3b8' }}>Asset Item</th>
                  <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Current Quarter</th>
                  <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Previous</th>
                  <th style={{ padding: '10px 20px', textAlign: 'right', color: '#94a3b8' }}>YoY %</th>
                </tr>
              </thead>
              <tbody>
                {assets.map((a, idx) => (
                  <tr key={idx} style={{
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    background: a.isTotal ? 'rgba(56,189,248,0.1)' : a.isSubtotal ? 'rgba(255,255,255,0.04)' : 'transparent',
                    fontWeight: a.isTotal || a.isSubtotal ? 700 : 400
                  }}>
                    <td style={{ padding: '10px 20px', color: a.isTotal ? '#38bdf8' : a.isSubtotal ? '#fff' : '#cbd5e1' }}>{a.name}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: a.isTotal ? '#38bdf8' : '#fff' }}>{a.val}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#94a3b8' }}>{a.prev}</td>
                    <td style={{ padding: '10px 20px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: a.change.startsWith('+') ? '#10b981' : '#cbd5e1' }}>{a.change}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Liabilities & Equity Side */}
        <div style={{
          background: 'var(--card, #131d2e)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '12px',
          padding: '22px 24px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#fff' }}>⚖️ Liabilities & Equity</h3>
              <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>External obligations and shareholder capitalization</p>
            </div>
            <span style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 600 }}>Total: ₹18.42 Cr</span>
          </div>

          <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ background: 'rgba(0,0,0,0.22)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <th style={{ padding: '10px 20px', textAlign: 'left', color: '#94a3b8' }}>Obligation / Capital Item</th>
                  <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Current Quarter</th>
                  <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Previous</th>
                  <th style={{ padding: '10px 20px', textAlign: 'right', color: '#94a3b8' }}>YoY %</th>
                </tr>
              </thead>
              <tbody>
                {liabilitiesAndEquity.map((l, idx) => (
                  <tr key={idx} style={{
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    background: l.isTotal ? 'rgba(56,189,248,0.1)' : l.isSubtotal ? 'rgba(255,255,255,0.04)' : 'transparent',
                    fontWeight: l.isTotal || l.isSubtotal ? 700 : 400
                  }}>
                    <td style={{ padding: '10px 20px', color: l.isTotal ? '#38bdf8' : l.isSubtotal ? '#fff' : '#cbd5e1' }}>{l.name}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: l.isTotal ? '#38bdf8' : '#fff' }}>{l.val}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#94a3b8' }}>{l.prev}</td>
                    <td style={{ padding: '10px 20px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: l.change.startsWith('+') ? '#10b981' : '#cbd5e1' }}>{l.change}</td>
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
