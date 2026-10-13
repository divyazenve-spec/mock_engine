import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function CorporateAccounts() {
  const [statusFilter, setStatusFilter] = useState('ALL');

  const accounts = [
    { code: 'ACC-CORP-01', org: 'Apollo Veterinary Super-Speciality Hospitals Pvt Ltd', gst: '29AAACP8912K1Z8', creditLimit: '₹25,00,000', usedCredit: '₹8,45,000', paymentTerms: 'Net 45 Days', rm: 'Vikram Mehta (VP)', risk: 'Low Risk' },
    { code: 'ACC-CORP-02', org: 'Max Pet Healthcare & Emergency Centers', gst: '27AABCM4532P1ZQ', creditLimit: '₹20,00,000', usedCredit: '₹6,20,000', paymentTerms: 'Net 30 Days', rm: 'Sneha Rao (Senior RM)', risk: 'Low Risk' },
    { code: 'ACC-CORP-03', org: 'Central Armed Police Forces (CAPF) K9 Center', gst: '07AAACT9921D1ZO', creditLimit: '₹30,00,000', usedCredit: '₹12,80,000', paymentTerms: 'Net 60 Days', rm: 'Vikram Mehta (VP)', risk: 'Low Risk' },
    { code: 'ACC-CORP-04', org: 'Canine Club of India Federation', gst: '33AABCC7712M1ZT', creditLimit: '₹15,00,000', usedCredit: '₹4,10,000', paymentTerms: 'Net 30 Days', rm: 'Aarav Sen (RM)', risk: 'Low Risk' },
    { code: 'ACC-CORP-05', org: 'Infosys Technologies Pet Wellness Club', gst: '29AAACI4321E1Z3', creditLimit: '₹10,00,000', usedCredit: '₹3,50,000', paymentTerms: 'Net 30 Days', rm: 'Priya Sharma (RM)', risk: 'Low Risk' },
    { code: 'ACC-CORP-06', org: 'Wipro Welfare Trust (Paws at Work)', gst: '29AAACW6543F1Z1', creditLimit: '₹8,00,000', usedCredit: '₹2,80,000', paymentTerms: 'Net 30 Days', rm: 'Priya Sharma (RM)', risk: 'Low Risk' },
    { code: 'ACC-CORP-07', org: 'Karnataka State Police CID Dog Squad', gst: '29AAAGK8765G1Z9', creditLimit: '₹18,00,000', usedCredit: '₹5,20,000', paymentTerms: 'Net 60 Days', rm: 'Vikram Mehta (VP)', risk: 'Low Risk' },
    { code: 'ACC-CORP-08', org: 'Royal Canin Institutional Distribution Hub', gst: '27AAACR1234H1Z5', creditLimit: '₹22,00,000', usedCredit: '₹7,40,000', paymentTerms: 'Net 45 Days', rm: 'Aarav Sen (RM)', risk: 'Low Risk' },
    { code: 'ACC-CORP-09', org: 'Sanjeevani Animal Welfare & Referral Trust', gst: '36AAATS5678J1Z7', creditLimit: '₹12,00,000', usedCredit: '₹3,90,000', paymentTerms: 'Net 30 Days', rm: 'Sneha Rao (Senior RM)', risk: 'Medium Risk' },
    { code: 'ACC-CORP-10', org: 'TCS Maitree Foundation Pet Support', gst: '27AAACT9876K1Z2', creditLimit: '₹8,00,000', usedCredit: '₹2,30,000', paymentTerms: 'Net 30 Days', rm: 'Priya Sharma (RM)', risk: 'Low Risk' }
  ];

  const filtered = statusFilter === 'ALL' ? accounts : accounts.filter(a => a.risk.toLowerCase().includes(statusFilter.toLowerCase()));

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="B2B / Enterprise"
      subcategory="Corporate Accounts"
      title="Corporate Account Master & Credit Limits"
      subtitle="Corporate KYC compliance, GSTIN master, credit sanctions, and relationship manager assignments"
      icon="🏛️"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Sanctioned Credit" value="₹1,78,00,000" delta="10 Accounts" trend="up" subtext="Board approved credit limits" icon="🏛️" />
        <KpiCard label="Active Credit Utilization" value="44.6%" delta="₹79.4L drawn" trend="neutral" subtext="Safe operating buffer" icon="📊" />
        <KpiCard label="Weighted Avg Payment Terms" value="38.5 Days" delta="-3.5d" trend="up" subtext="Weighted invoice collection" icon="⏱️" />
        <KpiCard label="KYC & GST Compliance" value="100.0%" delta="10/10 verified" trend="up" subtext="Fully tax compliant" icon="✅" />
      </div>

      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Corporate Credit & Account Ledger</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Credit sanctions, current balances, and relationship managers</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['ALL', 'Low', 'Medium'].map(st => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                style={{
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: '1px solid ' + (statusFilter === st ? '#4f46e5' : 'var(--border, #cbd5e1)'),
                  background: statusFilter === st ? 'rgba(79,70,229,0.1)' : 'transparent',
                  color: statusFilter === st ? '#4338ca' : 'var(--muted-foreground, #64748b)',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {st === 'ALL' ? 'All Risks' : st + ' Risk'}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)' }}>
                <th style={{ padding: '10px 12px' }}>Account Code</th>
                <th style={{ padding: '10px 12px' }}>Corporate Entity</th>
                <th style={{ padding: '10px 12px' }}>GSTIN</th>
                <th style={{ padding: '10px 12px' }}>Sanctioned Limit</th>
                <th style={{ padding: '10px 12px' }}>Utilized Balance</th>
                <th style={{ padding: '10px 12px' }}>Terms</th>
                <th style={{ padding: '10px 12px' }}>Account RM</th>
                <th style={{ padding: '10px 12px' }}>Risk Rating</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: '24px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                    No corporate account records found
                  </td>
                </tr>
              ) : (
                filtered.map(acc => (
                  <tr key={acc.code} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                    <td style={{ padding: '12px', fontFamily: 'monospace', fontWeight: 600 }}>{acc.code}</td>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{acc.org}</td>
                    <td style={{ padding: '12px', fontFamily: 'monospace' }}>{acc.gst}</td>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{acc.creditLimit}</td>
                    <td style={{ padding: '12px', color: '#4338ca', fontWeight: 600 }}>{acc.usedCredit}</td>
                    <td style={{ padding: '12px' }}>{acc.paymentTerms}</td>
                    <td style={{ padding: '12px' }}>{acc.rm}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: '999px',
                        fontSize: '10px',
                        fontWeight: 600,
                        background: acc.risk.includes('Low') ? 'rgba(16,185,129,0.12)' : 'rgba(245,158,11,0.14)',
                        color: acc.risk.includes('Low') ? '#059669' : '#d97706'
                      }}>
                        {acc.risk}
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
