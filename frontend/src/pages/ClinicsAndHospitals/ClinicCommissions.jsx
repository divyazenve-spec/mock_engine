import React, { useState, useMemo } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ClinicCommissions() {
  const [partnerFilter, setPartnerFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [toast, setToast] = useState('');

    const commissionLedger = [
    { id: 'COM-2026-901', partner: 'Dr. Arvind Pet Care Clinic, HSR Layout', bankRef: 'HDFC-NEFT-90124', type: 'Partner Clinic', cases: 18, billed: 485000, rate: '12%', grossCom: 58200, tds: 5820, netPay: 52380, status: 'Settled' },
    { id: 'COM-2026-902', partner: 'Paws & Claws Specialty, Juhu', bankRef: 'ICIC-RTGS-88123', type: 'Partner Clinic', cases: 22, billed: 640000, rate: '12%', grossCom: 76800, tds: 7680, netPay: 69120, status: 'Scheduled (Friday)' },
    { id: 'COM-2026-903', partner: 'Dr. Roy Imaging & Ultrasound Lab, Gurgaon', bankRef: 'KKBK-NEFT-77190', type: 'Diagnostic Partner', cases: 35, billed: 390000, rate: '10%', grossCom: 39000, tds: 3900, netPay: 35100, status: 'Settled' },
    { id: 'COM-2026-904', partner: 'Canine Care Centre, Banjara Hills', bankRef: 'SBIN-NEFT-66219', type: 'Partner Clinic', cases: 14, billed: 365000, rate: '12%', grossCom: 43800, tds: 4380, netPay: 39420, status: 'Scheduled (Friday)' },
    { id: 'COM-2026-905', partner: 'Dr. Meenakshi Sundaram (Visiting Cardiologist)', bankRef: 'AXIS-RTGS-55412', type: 'Visiting Surgeon', cases: 12, billed: 520000, rate: '25%', grossCom: 130000, tds: 13000, netPay: 117000, status: 'Scheduled (Friday)' },
    { id: 'COM-2026-906', partner: 'Aundh Pet Clinic & Daycare, Pune', bankRef: 'BARB-NEFT-44109', type: 'Partner Clinic', cases: 16, billed: 345000, rate: '12%', grossCom: 41400, tds: 4140, netPay: 37260, status: 'Settled' },
    { id: 'COM-2026-907', partner: 'Velachery Veterinary Center, Chennai', bankRef: 'HDFC-NEFT-33210', type: 'Partner Clinic', cases: 11, billed: 280000, rate: '12%', grossCom: 33600, tds: 3360, netPay: 30240, status: 'In Audit' },
    { id: 'COM-2026-908', partner: 'Dr. Kapoor Oncology Consultancy, Vasant Kunj', bankRef: 'ICIC-RTGS-22901', type: 'Visiting Surgeon', cases: 9, billed: 495000, rate: '25%', grossCom: 123750, tds: 12375, netPay: 111375, status: 'Scheduled (Friday)' },
    { id: 'COM-2026-909', partner: 'South Mumbai Pet Hospital Network', bankRef: 'UTIB-RTGS-11890', type: 'Partner Clinic', cases: 28, billed: 810000, rate: '10%', grossCom: 81000, tds: 8100, netPay: 72900, status: 'Settled' },
    { id: 'COM-2026-910', partner: 'Kalyan Nagar Pet Polyclinic, Bengaluru', bankRef: 'SBIN-NEFT-99412', type: 'Partner Clinic', cases: 15, billed: 375000, rate: '12%', grossCom: 45000, tds: 4500, netPay: 40500, status: 'Scheduled (Friday)' }
  ];

  const filtered = useMemo(() => {
    return commissionLedger.filter(c => {
      const matchType = partnerFilter === 'ALL' || c.type === partnerFilter;
      const matchStatus = statusFilter === 'ALL' || c.status.startsWith(statusFilter);
      return matchType && matchStatus;
    });
  }, [partnerFilter, statusFilter]);

  function handleExecutePayout() {
    setToast('Weekly direct bank transfer (NEFT/RTGS) batch approved and sent to bank gateway!');
    setTimeout(() => setToast(''), 3500);
  }

  return (
    <DashboardLayout
      category="Clinics & Hospitals"
      subcategory="Clinic Commissions"
      title="Partner Clinic Commissions & Surgeon Honorariums"
      subtitle="B2B referral commissions, diagnostic cross-referrals, visiting surgeon honorariums, and TDS compliance (Section 194J)"
      icon="🤝"
      badge=""
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={handleExecutePayout}
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
            <span>💸</span> Process Friday Payout Batch
          </button>
        </div>
      }
    >
      {toast && (
        <div style={{
          padding: '12px 16px',
          borderRadius: '8px',
          background: 'rgba(16,185,129,0.15)',
          border: '1px solid rgba(16,185,129,0.3)',
          color: '#10b981',
          fontSize: '13px',
          fontWeight: 600
        }}>
          ✓ {toast}
        </div>
      )}

            {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Commissions Settled MTD" value="₹5,48,225" delta="+14.5%" trend="up" subtext="Direct to partner bank accounts" icon="💸" />
        <KpiCard label="Scheduled for Friday" value="₹1,85,400" delta="12 Partners" trend="up" subtext="Pre-audited & verified" icon="📅" />
        <KpiCard label="Partner Clinic Cases" value="190 Cases" delta="+24 MoM" trend="up" subtext="Advanced CT & surgeries" icon="🤝" />
        <KpiCard label="Surgeon Honorariums" value="₹2,53,750" delta="+18.2%" trend="up" subtext="TPLO, THR & neuro" icon="🔪" />
        <KpiCard label="TDS Tax Withheld (194J)" value="₹60,912" delta="10% Statutory" trend="up" subtext="Form 16A auto-generated" icon="🏛️" />
        <KpiCard label="On-Time Settlement SLA" value="100.0%" delta="Zero delays" trend="up" subtext="Every Friday cycle" icon="🎯" />
      </div>

      {/* Commission Ledger Table */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Commission & Honorarium Settlement Ledger</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#94a3b8' }}>Partner clinic referral credits, case billing, statutory tax deductions, and bank transaction references</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <select
              value={partnerFilter}
              onChange={e => setPartnerFilter(e.target.value)}
              style={{
                padding: '6px 10px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.2)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '12px'
              }}
            >
              <option value="ALL">All Partner Types</option>
              <option value="Partner Clinic">Partner Clinic</option>
              <option value="Visiting Surgeon">Visiting Surgeon</option>
              <option value="Diagnostic Partner">Diagnostic Partner</option>
            </select>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              style={{
                padding: '6px 10px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.2)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '12px'
              }}
            >
              <option value="ALL">All Settlement Statuses</option>
              <option value="Settled">Settled</option>
              <option value="Scheduled">Scheduled (Friday)</option>
              <option value="In Audit">In Audit</option>
            </select>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#94a3b8' }}>
                <th style={{ padding: '8px 12px' }}>Partner Name & Entity</th>
                <th style={{ padding: '8px 12px' }}>Type</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Referred Cases</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Billed Value</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Rate</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Gross Commission</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>TDS (10%)</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Net Payable</th>
                <th style={{ padding: '8px 12px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (<tr><td colSpan="9" style={{ textAlign: "center", padding: "32px", color: "var(--muted-foreground, #64748b)" }}>No commission records found</td></tr>) : filtered.map((item, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '10px 12px' }}>
                    <div style={{ fontWeight: 600, color: '#fff' }}>{item.partner}</div>
                    <div style={{ fontSize: '10px', color: '#64748b', fontFamily: '"IBM Plex Mono", monospace' }}>{item.id} · {item.bankRef}</div>
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{ padding: '2px 6px', borderRadius: '4px', fontSize: '10px', background: 'rgba(59,130,246,0.15)', color: '#60a5fa' }}>
                      {item.type}
                    </span>
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600 }}>{item.cases}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>₹{item.billed.toLocaleString('en-IN')}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#38bdf8' }}>{item.rate}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>₹{item.grossCom.toLocaleString('en-IN')}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#f87171' }}>- ₹{item.tds.toLocaleString('en-IN')}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#10b981' }}>
                    ₹{item.netPay.toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '99px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: item.status === 'Settled' ? 'rgba(16,185,129,0.15)' :
                        item.status.indexOf('Scheduled') >= 0 ? 'rgba(59,130,246,0.15)' : 'rgba(245,158,11,0.15)',
                      color: item.status === 'Settled' ? '#34d399' :
                        item.status.indexOf('Scheduled') >= 0 ? '#60a5fa' : '#fbbf24'
                    }}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
