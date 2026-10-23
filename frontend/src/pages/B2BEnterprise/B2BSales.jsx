import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function B2BSales() {
  const reps = [
    { rep: 'Vikram Mehta (VP - Enterprise Sales)', accounts: 11, quota: '₹75,00,000', actual: '₹84,50,000', attainment: '112.7%', pipeline: '₹38,00,000', commission: '₹4,22,500' },
    { rep: 'Sneha Rao (Senior Enterprise RM)', accounts: 9, quota: '₹60,00,000', actual: '₹65,20,000', attainment: '108.7%', pipeline: '₹32,50,000', commission: '₹3,26,000' },
    { rep: 'Aarav Sen (Regional Key Accounts Lead)', accounts: 10, quota: '₹55,00,000', actual: '₹58,90,000', attainment: '107.1%', pipeline: '₹28,00,000', commission: '₹2,94,500' },
    { rep: 'Priya Sharma (Corporate Wellness RM)', accounts: 8, quota: '₹45,00,000', actual: '₹48,60,000', attainment: '108.0%', pipeline: '₹24,50,000', commission: '₹2,43,000' },
    { rep: 'Karan Singhania (Institutional Govt Lead)', accounts: 6, quota: '₹65,00,000', actual: '₹69,40,000', attainment: '106.8%', pipeline: '₹35,00,000', commission: '₹3,47,000' },
    { rep: 'Ananya Ghosh (Hospital Alliances Manager)', accounts: 8, quota: '₹50,00,000', actual: '₹52,80,000', attainment: '105.6%', pipeline: '₹26,00,000', commission: '₹2,64,000' },
    { rep: 'Rohit Kulkarni (Breeder & Kennel Lead)', accounts: 12, quota: '₹40,00,000', actual: '₹43,10,000', attainment: '107.8%', pipeline: '₹21,50,000', commission: '₹2,15,500' },
    { rep: 'Meera Nambiar (South Regional Enterprise RM)', accounts: 7, quota: '₹48,00,000', actual: '₹49,90,000', attainment: '104.0%', pipeline: '₹23,00,000', commission: '₹2,49,500' },
    { rep: 'Siddharth Joshi (West Regional Enterprise RM)', accounts: 8, quota: '₹52,00,000', actual: '₹54,60,000', attainment: '105.0%', pipeline: '₹27,50,000', commission: '₹2,73,000' },
    { rep: 'Edwin Nair (Strategic RFP & Contracts Lead)', accounts: 9, quota: '₹58,00,000', actual: '₹61,40,000', attainment: '105.9%', pipeline: '₹31,00,000', commission: '₹3,07,000' }
  ];

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="B2B / Enterprise"
      subcategory="B2B Sales"
      title="Enterprise Sales Pipeline & Performance"
      subtitle="Deal stage velocity, relationship manager quotas, RFP win-loss ratios, and qualified corporate pipeline"
      icon="💼"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Quarterly Enterprise Bookings" value="₹6,42,80,000" delta="16.5%" trend="up" subtext="Q4 corporate pipeline" icon="💼" />
        <KpiCard label="Pipeline Value (Q4)" value="₹2,95,00,000" delta="14 Deals" trend="up" subtext="Weighted pipeline coverage" icon="📈" />
        <KpiCard label="Deal Win Rate" value="76.4%" delta="5.2%" trend="up" subtext="Institutional RFP wins" icon="🏆" />
        <KpiCard label="Avg Sales Cycle" value="32 Days" delta="-6 Days" trend="up" subtext="Proposal to signed deed" icon="⚡" />
      </div>

      <div style={card}>
        <h3 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Enterprise Account Executives & Quota Scorecard</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Commercial quotas, year-to-date attainment, pipeline coverage, and commissions</p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)' }}>
                <th style={{ padding: '10px 12px' }}>Sales Executive</th>
                <th style={{ padding: '10px 12px' }}>Assigned Accounts</th>
                <th style={{ padding: '10px 12px' }}>Target Quota</th>
                <th style={{ padding: '10px 12px' }}>Closed Bookings</th>
                <th style={{ padding: '10px 12px' }}>Attainment %</th>
                <th style={{ padding: '10px 12px' }}>Live Pipeline</th>
                <th style={{ padding: '10px 12px' }}>Commissions</th>
              </tr>
            </thead>
            <tbody>
              {reps.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '24px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                    No sales executive scorecard records found
                  </td>
                </tr>
              ) : (
                reps.map(r => (
                  <tr key={r.rep} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{r.rep}</td>
                    <td style={{ padding: '12px' }}>{r.accounts} Accounts</td>
                    <td style={{ padding: '12px' }}>{r.quota}</td>
                    <td style={{ padding: '12px', fontWeight: 600, color: '#059669' }}>{r.actual}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ padding: '3px 8px', borderRadius: '999px', fontSize: '10px', fontWeight: 600, background: 'rgba(16,185,129,0.12)', color: '#059669' }}>
                        {r.attainment}
                      </span>
                    </td>
                    <td style={{ padding: '12px', color: '#4338ca', fontWeight: 600 }}>{r.pipeline}</td>
                    <td style={{ padding: '12px' }}>{r.commission}</td>
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
