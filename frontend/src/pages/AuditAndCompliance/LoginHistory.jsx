import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function LoginHistory() {
  const logins = [
  {
    "user": "arvind.rao@zenve.med",
    "role": "Chief Medical Officer",
    "authMethod": "FIDO2 WebAuthn",
    "ip": "10.0.14.22",
    "location": "Bangalore HQ (Secure Subnet)",
    "device": "macOS Sonoma / Safari 18",
    "time": "2026-10-14 16:30:12",
    "status": "Success"
  },
  {
    "user": "priya.sharma@zenve.med",
    "role": "Lead Pharmacist",
    "authMethod": "Hardware Token (YubiKey)",
    "ip": "10.0.28.105",
    "location": "Central Dispense Hub 1",
    "device": "ChromeOS 124 / Chrome 128",
    "time": "2026-10-14 16:25:40",
    "status": "Success"
  },
  {
    "user": "venkat.r@zenve.med",
    "role": "CFO",
    "authMethod": "Azure AD SSO + TOTP",
    "ip": "10.0.10.14",
    "location": "Corporate Executive Wing",
    "device": "Windows 11 / Edge 129",
    "time": "2026-10-14 16:15:00",
    "status": "Success"
  },
  {
    "user": "unknown_intruder@botnet.ru",
    "role": "Unauthenticated",
    "authMethod": "Password Brute Force",
    "ip": "185.220.101.45",
    "location": "Frankfurt, Germany (Tor Node)",
    "device": "Python-requests / 2.31",
    "time": "2026-10-14 16:08:19",
    "status": "Blocked"
  },
  {
    "user": "kavita.d@zenve.med",
    "role": "Compliance Director",
    "authMethod": "TOTP Multi-Factor",
    "ip": "10.0.12.88",
    "location": "Bangalore Legal & Audit Cell",
    "device": "macOS Sequoia / Chrome 129",
    "time": "2026-10-14 15:52:10",
    "status": "Success"
  },
  {
    "user": "siddharth.n@zenve.med",
    "role": "Cold Chain Lead",
    "authMethod": "Biometric (Touch ID)",
    "ip": "10.0.35.40",
    "location": "Cold Vault Terminal 4",
    "device": "iPadOS 18 / Mobile Safari",
    "time": "2026-10-14 15:38:22",
    "status": "Success"
  },
  {
    "user": "manish.v@zenve.med",
    "role": "Logistics Dispatcher",
    "authMethod": "TOTP Multi-Factor",
    "ip": "10.0.40.12",
    "location": "Fulfillment Hub North",
    "device": "Ubuntu 24.04 / Firefox 131",
    "time": "2026-10-14 15:20:45",
    "status": "Success"
  },
  {
    "user": "api_gateway_service@zenve.internal",
    "role": "Service Account",
    "authMethod": "mTLS Certificate (X.509)",
    "ip": "10.0.0.5",
    "location": "Internal VPC Gateway",
    "device": "Go HTTP Client / 1.23",
    "time": "2026-10-14 15:10:00",
    "status": "Success"
  },
  {
    "user": "ananya.sen@zenve.med",
    "role": "Consultant Oncologist",
    "authMethod": "Azure AD SSO + FIDO2",
    "ip": "10.0.14.77",
    "location": "Oncology Consultation OPD 3",
    "device": "macOS Sonoma / Safari 18",
    "time": "2026-10-14 14:55:18",
    "status": "Success"
  },
  {
    "user": "credential_stuffing_probe@scan.net",
    "role": "Unauthenticated",
    "authMethod": "Dictionary Attack",
    "ip": "194.26.29.112",
    "location": "Seychelles (Suspicious Proxy)",
    "device": "curl / 8.4.0",
    "time": "2026-10-14 14:40:02",
    "status": "Blocked"
  }
];

  return (
    <DashboardLayout
      category="Audit & Compliance"
      subcategory="Authentication & Access Control"
      title="Login History & Access Security"
      subtitle="Tracks multi-factor authentication events, terminal fingerprints, IP addresses, and intrusion blocks"
      icon="🔑"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="2FA Enforcement" value="100.0%" delta="+0.2%" trend="up" subtext="TOTP / SSO / FIDO2 enforced" icon="🔐" />
        <KpiCard label="Successful Logins (24h)" value="1,842" delta="+9.4%" trend="up" subtext="1,842 authenticated sessions" icon="🔑" />
        <KpiCard label="Blocked Intrusion Attempts" value="14 Blocked" delta="-45.0%" trend="down" subtext="Rate-limited at ingress" icon="🚫" />
        <KpiCard label="Concurrent Sessions" value="86 Active" delta="+5.0%" trend="up" subtext="Clinical & admin seats active" icon="💻" />
      </div>

      <div style={{ background: 'var(--card, #ffffff)', border: '1px solid var(--border, #e2e8f0)', borderRadius: '12px', padding: '20px' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Authentication & Access Security Log</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)', fontSize: '11px', textTransform: 'uppercase' }}>
                <th style={{ padding: '10px 12px' }}>User Account</th>
                <th style={{ padding: '10px 12px' }}>Role</th>
                <th style={{ padding: '10px 12px' }}>Auth Method</th>
                <th style={{ padding: '10px 12px' }}>IP Address</th>
                <th style={{ padding: '10px 12px' }}>Location</th>
                <th style={{ padding: '10px 12px' }}>Device</th>
                <th style={{ padding: '10px 12px' }}>Timestamp</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Result</th>
              </tr>
            </thead>
            <tbody>
              {logins.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ padding: '36px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                    No login history records found.
                  </td>
                </tr>
              ) : (
                logins.map((l, idx) => {
                  const isSuccess = l.status === 'Success';
                  return (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)' }}>
                      <td style={{ padding: '12px', fontWeight: 700 }}>{l.user}</td>
                      <td style={{ padding: '12px', color: '#64748b' }}>{l.role}</td>
                      <td style={{ padding: '12px' }}><span style={{ padding: '2px 8px', borderRadius: '99px', background: isSuccess ? '#dbeafe' : '#fee2e2', color: isSuccess ? '#1d4ed8' : '#dc2626', fontSize: '11px', fontWeight: 600 }}>{l.authMethod}</span></td>
                      <td style={{ padding: '12px', fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px' }}>{l.ip}</td>
                      <td style={{ padding: '12px' }}>{l.location}</td>
                      <td style={{ padding: '12px', color: '#64748b', fontSize: '12px' }}>{l.device}</td>
                      <td style={{ padding: '12px', fontSize: '12px' }}>{l.time}</td>
                      <td style={{ padding: '12px', textAlign: 'right' }}>
                        <span style={{ padding: '2px 8px', borderRadius: '99px', background: isSuccess ? '#dcfce7' : '#fee2e2', color: isSuccess ? '#15803d' : '#b91c1c', fontWeight: 600, fontSize: '11px' }}>● {l.status}</span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
