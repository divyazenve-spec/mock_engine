import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function CustomsDocumentation() {
  const [filter, setFilter] = useState('ALL');

  const docs = [
    { docId: 'BE-ICE-99214', type: 'Bill of Entry (Import)', port: 'JNPT Nhava Sheva', hsn: 'HSN 3004.90', assessableVal: '₹84,50,000', duty: 'Duty: ₹8,45,000 (Paid)', agency: 'CDSCO & Customs', status: 'Out of Charge (Cleared)' },
    { docId: 'SB-ICE-88102', type: 'Shipping Bill (Export)', port: 'Air Cargo BOM', hsn: 'HSN 9018.90', assessableVal: '₹58,40,000', duty: 'Drawback: ₹1,75,200', agency: 'DGFT & Customs', status: 'LEO Issued' },
    { docId: 'BE-ICE-48102', type: 'Bill of Entry (Import)', port: 'BLR Air Cargo', hsn: 'HSN 3002.20', assessableVal: '₹62,00,000', duty: 'Duty: ₹3,10,000 (Exempt Concession)', agency: 'CDSCO Drug Controller', status: 'RMS Facilitated' },
    { docId: 'SB-ICE-88103', type: 'Shipping Bill (Export)', port: 'Chennai Sea Port', hsn: 'HSN 3004.10', assessableVal: '₹42,20,000', duty: 'RoDTEP: ₹84,400', agency: 'Customs Export Cell', status: 'Let Export Order (LEO)' },
    { docId: 'BE-ICE-33109', type: 'Bill of Entry (Import)', port: 'Chennai Port', hsn: 'HSN 2937.19', assessableVal: '₹48,20,000', duty: 'Duty: ₹5,78,400 (Paid)', agency: 'Animal Quarantine (AQCS)', status: 'Out of Charge (Cleared)' },
    { docId: 'SB-ICE-88104', type: 'Shipping Bill (Export)', port: 'DEL Air Cargo', hsn: 'HSN 2309.90', assessableVal: '₹36,50,000', duty: 'Duty Drawback: ₹1,09,500', agency: 'DGFT / ICEGATE', status: 'LEO Cleared' },
    { docId: 'BE-ICE-77120', type: 'Bill of Entry (Import)', port: 'BOM Air Cargo', hsn: 'HSN 9018.50', assessableVal: '₹39,80,000', duty: 'Duty: ₹4,37,800 (Pending)', agency: 'CDSCO Medical Devices', status: 'In Assessment' },
    { docId: 'SB-ICE-88105', type: 'Shipping Bill (Export)', port: 'JNPT Nhava Sheva', hsn: 'HSN 9021.10', assessableVal: '₹49,80,000', duty: 'RoDTEP: ₹99,600', agency: 'Customs Division', status: 'Vessel Gate-In' },
    { docId: 'BE-ICE-19044', type: 'Bill of Entry (Import)', port: 'JNPT Nhava Sheva', hsn: 'HSN 9022.14', assessableVal: '₹92,40,000', duty: 'Duty: ₹10,16,400 (Paid)', agency: 'AERB / CDSCO NOC', status: 'Out of Charge (Cleared)' },
    { docId: 'SB-ICE-88106', type: 'Shipping Bill (Export)', port: 'BLR Air Cargo', hsn: 'HSN 3004.20', assessableVal: '₹31,10,000', duty: 'Drawback: ₹93,300', agency: 'Air Customs Commissioner', status: 'LEO Issued' }
  ];

  const filtered = filter === 'ALL' ? docs : docs.filter(d => d.type.toLowerCase().includes(filter.toLowerCase()));

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Import & Export"
      subcategory="Customs & Documentation"
      title="Customs Compliance, Bill of Entry & Shipping Bills"
      subtitle="DGFT import export code (IEC), CDSCO drug controller permits, ICEGATE electronic filings, and animal quarantine NOCs"
      icon="🏛️"
      badge="10"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="ICEGATE Electronic Filings" value="10 Filings" delta="100% digital e-Sanchit" trend="up" subtext="Direct port processing" icon="🏛️" />
        <KpiCard label="Customs Clearance Turnaround" value="1.2 Days" delta="-0.8 days improvement" trend="up" subtext="Advance filing protocol" icon="⚡" />
        <KpiCard label="Tariff Compliance Accuracy" value="100%" delta="Zero misdeclaration penalties" trend="up" subtext="Certified CHA audited" icon="🛡️" />
        <KpiCard label="Export Duty Drawback Claimed" value="₹24.5 L" delta="100% export incentive" trend="up" subtext="Credited to bank account" icon="💵" />
      </div>

      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Customs Declarations & Regulatory Certificates ({filtered.length} records)</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Bill of Entry, Shipping Bills, HSN tariff codes, duty amounts, and agency approvals</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['ALL', 'Import', 'Export'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: '1px solid ' + (filter === f ? '#0891b2' : 'var(--border, #cbd5e1)'),
                  background: filter === f ? 'rgba(8,145,178,0.1)' : 'transparent',
                  color: filter === f ? '#0e7490' : 'var(--muted-foreground, #64748b)',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)' }}>
                <th style={{ padding: '10px 12px' }}>Filing Reference #</th>
                <th style={{ padding: '10px 12px' }}>Document Type</th>
                <th style={{ padding: '10px 12px' }}>Port of Clearance</th>
                <th style={{ padding: '10px 12px' }}>HSN Tariff</th>
                <th style={{ padding: '10px 12px' }}>Declared Value</th>
                <th style={{ padding: '10px 12px' }}>Duty / Incentive</th>
                <th style={{ padding: '10px 12px' }}>Regulatory Agency</th>
                <th style={{ padding: '10px 12px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: '24px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                    No customs documentation records found
                  </td>
                </tr>
              ) : (
                filtered.map(d => (
                  <tr key={d.docId} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                    <td style={{ padding: '12px', fontFamily: 'monospace', fontWeight: 600 }}>{d.docId}</td>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{d.type}</td>
                    <td style={{ padding: '12px' }}>{d.port}</td>
                    <td style={{ padding: '12px', fontFamily: 'monospace' }}>{d.hsn}</td>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{d.assessableVal}</td>
                    <td style={{ padding: '12px', color: '#059669', fontWeight: 600 }}>{d.duty}</td>
                    <td style={{ padding: '12px' }}>{d.agency}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: '999px',
                        fontSize: '10px',
                        fontWeight: 600,
                        background: d.status.includes('Cleared') || d.status.includes('LEO') ? 'rgba(16,185,129,0.12)' : d.status.includes('In Assessment') ? 'rgba(245,158,11,0.14)' : 'rgba(8,145,178,0.12)',
                        color: d.status.includes('Cleared') || d.status.includes('LEO') ? '#059669' : d.status.includes('In Assessment') ? '#d97706' : '#0e7490'
                      }}>
                        {d.status}
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
