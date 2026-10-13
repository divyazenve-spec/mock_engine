import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Contracts() {
  const [filter, setFilter] = useState('ALL');

  const contracts = [
    { id: 'MSA-2026-001', title: 'Master Veterinary Clinical Supply Deed', entity: 'Apollo Veterinary Super-Speciality Hospitals Pvt Ltd', validFrom: '2025-04-01', validTo: '2027-03-31', value: '₹96,00,000', slaPenalty: '1.5% deduction per 24h dispatch delay', status: 'Active · 2-Year Term' },
    { id: 'MSA-2026-002', title: 'Emergency Care Consumables Framework Agreement', entity: 'Max Pet Healthcare & Emergency Centers', validFrom: '2025-06-01', validTo: '2027-05-31', value: '₹73,00,000', slaPenalty: '2.0% deduction on stockout of critical line items', status: 'Active · Multi-Year' },
    { id: 'MSA-2026-003', title: 'Government K9 Working Ration & Medical Deed', entity: 'CAPF K9 Breeding & Training Center', validFrom: '2024-11-01', validTo: '2026-10-31', value: '₹1,10,00,000', slaPenalty: 'Govt tender default clauses & warranty forfeiture', status: 'Under Renewal Milestone' },
    { id: 'MSA-2026-004', title: 'Breeders National Nutrition Wholesale Deed', entity: 'Canine Club of India Federation', validFrom: '2025-01-01', validTo: '2026-12-31', value: '₹56,00,000', slaPenalty: 'Rebate forfeiture on monthly minimum dip', status: 'Active · Annual Term' },
    { id: 'MSA-2026-005', title: 'Corporate Wellness & Doorstep Benefit Deed', entity: 'Infosys Technologies Limited', validFrom: '2025-08-01', validTo: '2027-07-31', value: '₹45,00,000', slaPenalty: 'Credit adjustment on delayed employee kits', status: 'Active · 2-Year Term' },
    { id: 'MSA-2026-006', title: 'Paws-at-Work Employee Healthcare Covenant', entity: 'Wipro Welfare Trust', validFrom: '2025-09-01', validTo: '2026-08-31', value: '₹36,00,000', slaPenalty: 'Standard Net 30 late fulfillment penalty', status: 'Active · Annual Term' },
    { id: 'MSA-2026-007', title: 'State Police Tactical K9 Healthcare Deed', entity: 'Karnataka State Police CID Wing', validFrom: '2025-03-01', validTo: '2027-02-28', value: '₹64,00,000', slaPenalty: 'Department audit compliance requirement', status: 'Active · Multi-Year' },
    { id: 'MSA-2026-008', title: 'Institutional Master Wholesale Distribution Deed', entity: 'Royal Canin Institutional Distribution Hub', validFrom: '2025-02-01', validTo: '2027-01-31', value: '₹84,00,000', slaPenalty: 'Minimum volume shortfall compensatory adjustment', status: 'Active · 2-Year Term' },
    { id: 'MSA-2026-009', title: 'Non-Profit Animal Healthcare Subsidy Deed', entity: 'Sanjeevani Animal Welfare & Referral Trust', validFrom: '2025-05-01', validTo: '2026-04-30', value: '₹26,50,000', slaPenalty: 'Subsidized terms tied to non-profit verification', status: 'Under Renewal Milestone' },
    { id: 'MSA-2026-010', title: 'Corporate Social Responsibility Pet Care Deed', entity: 'TCS Maitree Foundation', validFrom: '2025-07-01', validTo: '2026-06-30', value: '₹30,00,000', slaPenalty: 'Quarterly compliance and impact reporting SLA', status: 'Active · Annual Term' }
  ];

  const filtered = filter === 'ALL' ? contracts : contracts.filter(c => c.status.toLowerCase().includes(filter.toLowerCase()));

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="B2B / Enterprise"
      subcategory="Contracts"
      title="Master Services Agreements (MSA) & Contracts"
      subtitle="Corporate legal master deeds, SLA penalty terms, renewal milestones, and compliance tracking"
      icon="📜"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Active Commercial MSAs" value="10 Contracts" delta="₹4.12 Cr" trend="up" subtext="Binding bilateral deeds" icon="📜" />
        <KpiCard label="Contracts Expiring in 90D" value="2 Contracts" delta="Renewal in flight" trend="warn" subtext="Proactive legal follow-up" icon="⏳" />
        <KpiCard label="Legal SLA Compliance" value="99.2%" delta="0.5%" trend="up" subtext="Zero penalty disputes" icon="🛡️" />
        <KpiCard label="Avg Contract Duration" value="2.6 Years" delta="0.4y" trend="up" subtext="Multi-year lock-in agreements" icon="📅" />
      </div>

      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Enterprise Master Agreements & Deeds</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Commercial values, tenure validity, and strict SLA clauses</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['ALL', 'Active', 'Renewal'].map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                style={{
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: '1px solid ' + (filter === s ? '#4f46e5' : 'var(--border, #cbd5e1)'),
                  background: filter === s ? 'rgba(79,70,229,0.1)' : 'transparent',
                  color: filter === s ? '#4338ca' : 'var(--muted-foreground, #64748b)',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)' }}>
                <th style={{ padding: '10px 12px' }}>Contract ID</th>
                <th style={{ padding: '10px 12px' }}>Agreement Title</th>
                <th style={{ padding: '10px 12px' }}>Client Entity</th>
                <th style={{ padding: '10px 12px' }}>Tenure</th>
                <th style={{ padding: '10px 12px' }}>Total Committed Value</th>
                <th style={{ padding: '10px 12px' }}>SLA Default Terms</th>
                <th style={{ padding: '10px 12px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '24px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                    No contract records found
                  </td>
                </tr>
              ) : (
                filtered.map(c => (
                  <tr key={c.id} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                    <td style={{ padding: '12px', fontFamily: 'monospace', fontWeight: 600 }}>{c.id}</td>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{c.title}</td>
                    <td style={{ padding: '12px' }}>{c.entity}</td>
                    <td style={{ padding: '12px' }}>{c.validFrom} to {c.validTo}</td>
                    <td style={{ padding: '12px', fontWeight: 600, color: '#059669' }}>{c.value}</td>
                    <td style={{ padding: '12px', color: '#64748b' }}>{c.slaPenalty}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: '999px',
                        fontSize: '10px',
                        fontWeight: 600,
                        background: c.status.includes('Active') ? 'rgba(16,185,129,0.12)' : 'rgba(245,158,11,0.14)',
                        color: c.status.includes('Active') ? '#059669' : '#d97706'
                      }}>
                        {c.status}
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
