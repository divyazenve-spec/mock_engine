import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function DoctorCommissions() {
  const settlements = [
    { id: 'SET-DOC-901', doctor: 'Dr. Rajeshwari Swaminathan', spec: 'Orthopedics & Surgery', billed: '₹18,40,000', rate: '15%', gross: '₹2,76,000', tds: '₹27,600', net: '₹2,48,400' },
    { id: 'SET-DOC-902', doctor: 'Dr. Vikramaditya Rathore', spec: 'Trauma & Emergency', billed: '₹16,90,000', rate: '15%', gross: '₹2,53,500', tds: '₹25,350', net: '₹2,28,150' },
    { id: 'SET-DOC-903', doctor: 'Dr. Pooja Mehta', spec: 'Feline Medicine', billed: '₹14,25,000', rate: '15%', gross: '₹2,13,750', tds: '₹21,375', net: '₹1,92,375' },
    { id: 'SET-DOC-904', doctor: 'Dr. Anirudh Sen', spec: 'General Surgery', billed: '₹15,10,000', rate: '15%', gross: '₹2,26,500', tds: '₹22,650', net: '₹2,03,850' },
    { id: 'SET-DOC-905', doctor: 'Dr. Siddharth Verma', spec: 'Cardiology', billed: '₹13,80,000', rate: '15%', gross: '₹2,07,000', tds: '₹20,700', net: '₹1,86,300' },
    { id: 'SET-DOC-906', doctor: 'Dr. Rohan Kulkarni', spec: 'Surgical Oncology', billed: '₹12,60,000', rate: '15%', gross: '₹1,89,000', tds: '₹18,900', net: '₹1,70,100' },
    { id: 'SET-DOC-907', doctor: 'Dr. Gaurav Sharma', spec: 'Orthopedics & Spine', billed: '₹13,40,000', rate: '15%', gross: '₹2,01,000', tds: '₹20,100', net: '₹1,80,900' },
    { id: 'SET-DOC-908', doctor: 'Dr. Sneha Nair', spec: 'Ophthalmology', billed: '₹10,90,000', rate: '15%', gross: '₹1,63,500', tds: '₹16,350', net: '₹1,47,150' },
    { id: 'SET-DOC-909', doctor: 'Dr. Edwin Reddy', spec: 'Critical Care & Neonatal', billed: '₹11,85,000', rate: '15%', gross: '₹1,77,750', tds: '₹17,775', net: '₹1,59,975' },
    { id: 'SET-DOC-910', doctor: 'Dr. Maya Chandran', spec: 'Gastroenterology', billed: '₹13,60,000', rate: '15%', gross: '₹2,04,000', tds: '₹20,400', net: '₹1,83,600' }
  ];

  const cardStyle = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Doctors"
      subcategory="Incentive Settlements"
      title="Doctor Commissions & Compensation Settlement"
      subtitle="Bi-weekly incentive disbursements, surgical bonus slabs, consult rev-shares, and statutory TDS deduction ledgers"
      icon="💵"
      badge="₹18.45 L Disbursed"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Commission Disbursed" value="₹18.45 L" delta="+18.5%" trend="up" subtext="Bi-weekly direct transfer" icon="💵" />
        <KpiCard label="Avg. Physician Earning" value="₹1.84 L" delta="+12.4%" trend="up" subtext="Incentive & surgery share" icon="📈" />
        <KpiCard label="TDS Deducted (Section 194J)" value="₹1.84 L" delta="10% standard" trend="neutral" subtext="Form 16A filed auto" icon="🏛️" />
        <KpiCard label="Payment Reconciliation" value="100.0%" delta="Zero dispute" trend="up" subtext="Automated audit reconciled" icon="✅" />
      </div>

      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>💵 Clinician Settlement Ledger & TDS Withholding</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border, #e2e8f0)', textAlign: 'left', color: 'var(--muted-foreground, #475569)' }}>
                <th style={{ padding: '10px' }}>Settlement ID</th>
                <th style={{ padding: '10px' }}>Doctor Name</th>
                <th style={{ padding: '10px' }}>Department</th>
                <th style={{ padding: '10px' }}>Total Clinical Billing</th>
                <th style={{ padding: '10px' }}>Commission Rate</th>
                <th style={{ padding: '10px' }}>Gross Incentive</th>
                <th style={{ padding: '10px' }}>TDS Withheld (10%)</th>
                <th style={{ padding: '10px' }}>Net Bank Payout</th>
              </tr>
            </thead>
            <tbody>
              {settlements.map((s, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '10px', fontFamily: 'monospace', fontWeight: 600 }}>{s.id}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{s.doctor}</td>
                  <td style={{ padding: '10px', color: '#64748b' }}>{s.spec}</td>
                  <td style={{ padding: '10px' }}>{s.billed}</td>
                  <td style={{ padding: '10px' }}>{s.rate}</td>
                  <td style={{ padding: '10px' }}>{s.gross}</td>
                  <td style={{ padding: '10px', color: '#dc2626' }}>{s.tds}</td>
                  <td style={{ padding: '10px', fontWeight: 700, color: '#059669' }}>{s.net}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
