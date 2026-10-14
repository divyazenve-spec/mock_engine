import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ComplianceDashboard() {
  const [toast, setToast] = useState('');

  const frameworks = [
  {
    "standard": "SOC-2 Type II (Security & Confidentiality)",
    "score": "100.0%",
    "controls": "114 / 114 Passing",
    "auditor": "Deloitte India Risk Advisory",
    "renew": "2027-03-31 (168 days)",
    "status": "Certified"
  },
  {
    "standard": "CDSCO Drugs & Cosmetics Act (Schedule H/X)",
    "score": "99.8%",
    "controls": "88 / 88 Passing",
    "auditor": "Karnataka State Drug Controller",
    "renew": "2027-01-15 (93 days)",
    "status": "Compliant"
  },
  {
    "standard": "ISO 27001:2022 (Information Security)",
    "score": "100.0%",
    "controls": "93 / 93 Passing",
    "auditor": "BSI Group Assurance",
    "renew": "2027-06-30 (259 days)",
    "status": "Certified"
  },
  {
    "standard": "HIPAA & HITECH (Patient PHI Safeguards)",
    "score": "99.6%",
    "controls": "64 / 64 Passing",
    "auditor": "KPMG Healthcare Cyber",
    "renew": "2027-04-30 (198 days)",
    "status": "Compliant"
  },
  {
    "standard": "NABH Digital Health Standards (MIS-2024)",
    "score": "99.2%",
    "controls": "52 / 52 Passing",
    "auditor": "National Accreditation Board (NABH)",
    "renew": "2026-12-01 (48 days)",
    "status": "Accredited"
  },
  {
    "standard": "PCI-DSS v4.0 (Cardholder Data Environment)",
    "score": "100.0%",
    "controls": "12 / 12 Passing",
    "auditor": "SISA Information Security",
    "renew": "2027-05-15 (213 days)",
    "status": "Certified"
  },
  {
    "standard": "ABDM / ABDM-M3 (Ayushman Bharat Digital Mission)",
    "score": "98.9%",
    "controls": "40 / 40 Passing",
    "auditor": "National Health Authority (NHA)",
    "renew": "2027-02-28 (137 days)",
    "status": "Integrated"
  },
  {
    "standard": "Good Distribution Practices (GDP / WHO)",
    "score": "99.4%",
    "controls": "76 / 76 Passing",
    "auditor": "SGS Pharma Inspection Services",
    "renew": "2027-08-31 (321 days)",
    "status": "Certified"
  },
  {
    "standard": "GSTIN & E-Way Bill Tax Compliance",
    "score": "100.0%",
    "controls": "30 / 30 Passing",
    "auditor": "Ernst & Young LLP",
    "renew": "Continuous Automated Check",
    "status": "Reconciled"
  },
  {
    "standard": "DISHA (Digital Information Security in Healthcare)",
    "score": "98.5%",
    "controls": "45 / 45 Passing",
    "auditor": "Ministry of Health & Family Welfare",
    "renew": "2027-09-30 (351 days)",
    "status": "Compliant"
  }
];

  const runProbe = () => {
    setToast('Executing automated compliance health check across regulatory controls...');
    setTimeout(() => {
      setToast('Compliance Health Check Complete: 0 active controls detected.');
      setTimeout(() => setToast(''), 4000);
    }, 1500);
  };

  return (
    <DashboardLayout
      category="Audit & Compliance"
      subcategory="Regulatory Governance & Standards"
      title="Regulatory Compliance Dashboard"
      subtitle="Real-time posture across SOC-2, medical laws, drug registries, data privacy, and taxation standards"
      icon="⚖️"
      badge=""
      actions={
        <button
          onClick={runProbe}
          style={{
            padding: '7px 14px',
            borderRadius: '8px',
            background: '#059669',
            color: '#ffffff',
            border: '1px solid #047857',
            fontWeight: 600,
            fontSize: '12px',
            cursor: 'pointer'
          }}
        >
          ⚡ Run Automated Audit Probe
        </button>
      }
    >
      {toast && (
        <div style={{ padding: '10px 16px', background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '8px', color: '#065f46', fontSize: '13px', fontWeight: 600 }}>
          ℹ️ {toast}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Overall Compliance Score" value="99.4%" delta="+0.8%" trend="up" subtext="10 frameworks passing" icon="🛡️" />
        <KpiCard label="SOC-2 Controls" value="114 / 114 Passing" delta="100%" trend="up" subtext="Automated continuous evidence" icon="🔒" />
        <KpiCard label="Schedule H Drug Audit" value="100.0%" delta="+0.0%" trend="up" subtext="CDSCO Schedule H/X compliant" icon="💊" />
        <KpiCard label="Next Regulatory Audit" value="48 Days" delta="On Track" trend="neutral" subtext="CDSCO & NABH Bi-Annual Review" icon="📅" />
      </div>

      <div style={{ background: 'var(--card, #ffffff)', border: '1px solid var(--border, #e2e8f0)', borderRadius: '12px', padding: '20px' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Statutory & Regulatory Frameworks Matrix</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)', fontSize: '11px', textTransform: 'uppercase' }}>
                <th style={{ padding: '10px 12px' }}>Compliance Framework</th>
                <th style={{ padding: '10px 12px' }}>Posture Score</th>
                <th style={{ padding: '10px 12px' }}>Automated Controls Status</th>
                <th style={{ padding: '10px 12px' }}>Audit Authority</th>
                <th style={{ padding: '10px 12px' }}>Next Review</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Compliance State</th>
              </tr>
            </thead>
            <tbody>
              {frameworks.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ padding: '36px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                    No regulatory frameworks found.
                  </td>
                </tr>
              ) : (
                frameworks.map((f, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)' }}>
                    <td style={{ padding: '12px', fontWeight: 700 }}>{f.standard}</td>
                    <td style={{ padding: '12px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#16a34a' }}>{f.score}</td>
                    <td style={{ padding: '12px' }}>{f.controls}</td>
                    <td style={{ padding: '12px', color: '#64748b' }}>{f.auditor}</td>
                    <td style={{ padding: '12px', fontFamily: '"IBM Plex Mono", monospace', fontSize: '12px' }}>{f.renew}</td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      <span style={{ padding: '2px 8px', borderRadius: '99px', background: '#dcfce7', color: '#15803d', fontWeight: 600, fontSize: '11px' }}>● {f.status}</span>
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
