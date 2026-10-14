import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function AuditLog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState('');

  const auditLogs = [
  {
    "id": "AUD-1001",
    "actor": "Dr. Arvind Rao",
    "role": "Chief Medical Officer",
    "action": "Digitally signed Schedule X Rx for Fentanyl 50mcg/hr",
    "module": "Clinical Approvals",
    "ip": "10.0.14.22",
    "time": "2026-10-14 16:42:18",
    "hash": "7f8b9a2c...4d1e",
    "status": "Verified"
  },
  {
    "id": "AUD-1002",
    "actor": "Priya Sharma",
    "role": "Lead Pharmacist",
    "action": "Dispensed Emergency ICU Kit (Atropine + Epinephrine)",
    "module": "Pharmacy Dispense",
    "ip": "10.0.28.105",
    "time": "2026-10-14 16:35:40",
    "hash": "3e4a1b9c...8f2a",
    "status": "Verified"
  },
  {
    "id": "AUD-1003",
    "actor": "R. Venkataraman",
    "role": "Chief Financial Officer",
    "action": "Approved Supplier Payment \u20b91,450,000 to Cipla Ltd",
    "module": "Financial Accounts",
    "ip": "10.0.10.14",
    "time": "2026-10-14 16:21:05",
    "hash": "9c8a7b6d...1e3f",
    "status": "Verified"
  },
  {
    "id": "AUD-1004",
    "actor": "Siddharth Nair",
    "role": "Cold Chain Officer",
    "action": "Logged thermal excursion check for Hub-1 Vault (-20\u00b0C)",
    "module": "Cold Chain IoT",
    "ip": "10.0.35.40",
    "time": "2026-10-14 16:11:50",
    "hash": "1a2b3c4d...5e6f",
    "status": "Verified"
  },
  {
    "id": "AUD-1005",
    "actor": "Kavita Deshmukh",
    "role": "Compliance Officer",
    "action": "Executed CDSCO Schedule H2 quarterly reconciliation report",
    "module": "Regulatory Filing",
    "ip": "10.0.12.88",
    "time": "2026-10-14 15:58:12",
    "hash": "6f5e4d3c...2b1a",
    "status": "Verified"
  },
  {
    "id": "AUD-1006",
    "actor": "Dr. Ananya Sen",
    "role": "HOD Oncology",
    "action": "Prescription override for Off-Label Pembrolizumab infusion",
    "module": "Clinical Overrides",
    "ip": "10.0.14.77",
    "time": "2026-10-14 15:42:33",
    "hash": "8b7c6d5e...4f3a",
    "status": "Verified"
  },
  {
    "id": "AUD-1007",
    "actor": "DevOps Bot / Vault",
    "role": "System Automation",
    "action": "Rotated HSM AES-256 master key for Patient PHI DB",
    "module": "Security Keyring",
    "ip": "127.0.0.1",
    "time": "2026-10-14 15:30:00",
    "hash": "2c3d4e5f...6a7b",
    "status": "Verified"
  },
  {
    "id": "AUD-1008",
    "actor": "Manish Verma",
    "role": "Hub Logistics Manager",
    "action": "Dispatched express refrigerated drone delivery DRN-402",
    "module": "Dispatch & OTP",
    "ip": "10.0.40.12",
    "time": "2026-10-14 15:15:22",
    "hash": "5d4c3b2a...1f9e",
    "status": "Verified"
  },
  {
    "id": "AUD-1009",
    "actor": "Dr. Rajesh Iyer",
    "role": "Senior Consultant",
    "action": "Accessed unmasked patient medical history for PAT-99214",
    "module": "PHI Access Control",
    "ip": "10.0.18.52",
    "time": "2026-10-14 15:02:44",
    "hash": "4a5b6c7d...8e9f",
    "status": "Verified"
  },
  {
    "id": "AUD-1010",
    "actor": "Suresh Raina",
    "role": "Quality Assurance Lead",
    "action": "Quarantined damaged carton of Remdesivir (Batch RD-889)",
    "module": "Inventory QA",
    "ip": "10.0.32.19",
    "time": "2026-10-14 14:45:10",
    "hash": "9e8d7c6b...5a4f",
    "status": "Verified"
  }
];

  const filteredLogs = auditLogs.filter(l =>
    l.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.module.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout
      category="Audit & Compliance"
      subcategory="Master Audit Log"
      title="Master Immutable Audit Log"
      subtitle="Cryptographically sealed chronological log of all administrative, clinical, and financial actions"
      icon="🛡️"
      badge=""
    >
      {toast && (
        <div style={{ padding: '10px 16px', background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '8px', color: '#065f46', fontSize: '13px', fontWeight: 600 }}>
          ℹ️ {toast}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Audit Events" value="1,428,950" delta="+12.4%" trend="up" subtext="Immutable WAL records" icon="📑" />
        <KpiCard label="Cryptographic Integrity" value="100.0%" delta="+0.0%" trend="up" subtext="Zero hash mismatches" icon="🔒" />
        <KpiCard label="Staff Actions Logged" value="4,892" delta="+8.1%" trend="up" subtext="Audited across 128 staff" icon="👥" />
        <KpiCard label="Tamper Alerts" value="0 Detected" delta="0.0%" trend="neutral" subtext="Zero unauthorized diffs" icon="🛡️" />
      </div>

      <div style={{
        background: 'var(--card, #ffffff)',
        border: '1px solid var(--border, #e2e8f0)',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <input
            type="text"
            placeholder="Search actor, action, or module..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid var(--border, #cbd5e1)',
              fontSize: '12px',
              minWidth: '260px',
              outline: 'none'
            }}
          />
          <button
            onClick={() => {
              setToast('SHA-256 Ledger integrity verified. 0 audit records.');
              setTimeout(() => setToast(''), 3000);
            }}
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
            ⚡ Verify SHA-256 Ledger
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)', fontSize: '11px', textTransform: 'uppercase' }}>
                <th style={{ padding: '10px 12px' }}>Event ID</th>
                <th style={{ padding: '10px 12px' }}>Staff Actor</th>
                <th style={{ padding: '10px 12px' }}>Action & Description</th>
                <th style={{ padding: '10px 12px' }}>Module</th>
                <th style={{ padding: '10px 12px' }}>IP / Terminal</th>
                <th style={{ padding: '10px 12px' }}>Timestamp</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Audit Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ padding: '36px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                    No audit events found. Log ledger is empty.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)' }}>
                    <td style={{ padding: '12px', fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', fontWeight: 600, color: '#2563eb' }}>{log.id}</td>
                    <td style={{ padding: '12px', fontWeight: 700 }}>
                      {log.actor}
                      <div style={{ fontSize: '10.5px', color: '#64748b', fontWeight: 400 }}>{log.role}</div>
                    </td>
                    <td style={{ padding: '12px' }}>{log.action}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ padding: '2px 8px', borderRadius: '99px', background: '#f3e8ff', color: '#7e22ce', fontSize: '11px', fontWeight: 600 }}>{log.module}</span>
                    </td>
                    <td style={{ padding: '12px', fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', color: 'var(--muted-foreground, #64748b)' }}>{log.ip}</td>
                    <td style={{ padding: '12px', fontSize: '12px' }}>{log.time}</td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      <span style={{
                        padding: '2px 8px',
                        borderRadius: '99px',
                        background: '#dcfce7',
                        color: '#15803d',
                        fontWeight: 600,
                        fontSize: '11px'
                      }}>● {log.status}</span>
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
