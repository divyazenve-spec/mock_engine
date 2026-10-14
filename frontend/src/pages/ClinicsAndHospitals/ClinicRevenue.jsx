import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ClinicRevenue() {
  const [period, setPeriod] = useState('Month to Date');

    const facilityRevenue = [
    { name: 'Zenve Indiranagar Central Hospital', city: 'Bengaluru', opdRev: '₹6.80 L', surgeryRev: '₹12.40 L', diagRev: '₹4.20 L', ipdRev: '₹5.00 L', total: '₹28.40 L', share: '18.5%' },
    { name: 'Zenve DLF CyberCity Critical Care', city: 'Delhi NCR', opdRev: '₹7.20 L', surgeryRev: '₹13.65 L', diagRev: '₹4.80 L', ipdRev: '₹5.60 L', total: '₹31.25 L', share: '20.4%' },
    { name: 'Zenve Bandra West Trauma Centre', city: 'Mumbai', opdRev: '₹6.10 L', surgeryRev: '₹11.20 L', diagRev: '₹3.60 L', ipdRev: '₹4.20 L', total: '₹25.10 L', share: '16.4%' },
    { name: 'Zenve Jubilee Hills Specialty Center', city: 'Hyderabad', opdRev: '₹5.40 L', surgeryRev: '₹9.40 L', diagRev: '₹3.10 L', ipdRev: '₹3.70 L', total: '₹21.60 L', share: '14.1%' },
    { name: 'Zenve Koregaon Park Hospital', city: 'Pune', opdRev: '₹4.80 L', surgeryRev: '₹8.10 L', diagRev: '₹2.70 L', ipdRev: '₹3.30 L', total: '₹18.90 L', share: '12.3%' },
    { name: 'Zenve Andheri Link Rd Clinic', city: 'Mumbai', opdRev: '₹3.60 L', surgeryRev: '₹1.80 L', diagRev: '₹2.20 L', ipdRev: '₹3.60 L', total: '₹11.20 L', share: '7.3%' },
    { name: 'Zenve Gachibowli Daycare & Dental', city: 'Hyderabad', opdRev: '₹3.20 L', surgeryRev: '₹1.40 L', diagRev: '₹2.10 L', ipdRev: '₹3.45 L', total: '₹10.15 L', share: '6.6%' },
    { name: 'Zenve Koramangala Care Clinic', city: 'Bengaluru', opdRev: '₹3.10 L', surgeryRev: '₹0.95 L', diagRev: '₹1.95 L', ipdRev: '₹3.40 L', total: '₹9.40 L', share: '6.1%' },
    { name: 'Zenve Saket Pet Wellness', city: 'Delhi NCR', opdRev: '₹2.90 L', surgeryRev: '₹0.70 L', diagRev: '₹1.85 L', ipdRev: '₹3.40 L', total: '₹8.85 L', share: '5.8%' },
    { name: 'Zenve Alwarpet Community Clinic', city: 'Chennai', opdRev: '₹2.70 L', surgeryRev: '₹0.60 L', diagRev: '₹1.60 L', ipdRev: '₹3.00 L', total: '₹7.90 L', share: '5.2%' }
  ];

  return (
    <DashboardLayout
      category="Clinics & Hospitals"
      subcategory="Clinic Revenue"
      title="Hospital & Clinic Revenue Intelligence"
      subtitle="Departmental billing realization, surgical monetization, diagnostic revenue, and pet insurance settlements"
      icon="💰"
      badge=""
      actions={
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{
            display: 'flex',
            background: 'rgba(255,255,255,0.05)',
            padding: '3px',
            borderRadius: '8px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            {['This Week', 'Month to Date', 'Quarter to Date', 'Annual'].map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: period === p ? '#3b82f6' : 'transparent',
                  color: period === p ? '#fff' : '#94a3b8'
                }}
              >
                {p}
              </button>
            ))}
          </div>
          <button
            onClick={() => alert('Downloading comprehensive Clinic Billing Ledger & Insurance Claims Reconciliation (Excel & PDF)...')}
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
            <span>📥</span> Export Clinical P&L
          </button>
        </div>
      }
    >
            {/* KPI Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Gross Clinical Billings" value="₹1.53 Cr" delta="+16.8%" trend="up" subtext="Across 10 facilities" icon="💰" />
        <KpiCard label="Surgical Theatre Revenue" value="₹58.40 L" delta="38.1%" trend="up" subtext="Orthopedic, soft-tissue, neuro" icon="🔪" />
        <KpiCard label="Outpatient Consultations" value="₹39.80 L" delta="25.9%" trend="up" subtext="Routine & specialty OPD" icon="🩺" />
        <KpiCard label="Diagnostics & Imaging" value="₹19.90 L" delta="13.0%" trend="up" subtext="CT, ultrasound, in-house lab" icon="🔬" />
        <KpiCard label="Inpatient ICU / Daycare" value="₹27.60 L" delta="18.0%" trend="up" subtext="Critical care hospitalization" icon="🛏️" />
        <KpiCard label="Avg Revenue / Case" value="₹3,160" delta="+9.4%" trend="up" subtext="High multi-service adoption" icon="🧾" />
      </div>

      {/* Revenue Split & Payer Distribution */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '18px' }}>
        {/* Service Lines Contribution */}
        <div style={{
          background: 'var(--card, #1e293b)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <h3 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 700 }}>Revenue by Clinical Service Line</h3>
          <p style={{ margin: '0 0 16px', fontSize: '12px', color: '#94a3b8' }}>Breakdown of hospital and clinic billing departments</p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                <span style={{ color: '#fff', fontWeight: 600 }}>Surgeries & Specialized Procedures</span>
                <strong style={{ color: '#10b981', fontFamily: '"IBM Plex Mono", monospace' }}>₹58.40 L (38.1%)</strong>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: '38.1%', height: '100%', background: '#10b981', borderRadius: '3px' }} />
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                <span style={{ color: '#fff', fontWeight: 600 }}>Outpatient Consultations & Vaccinations</span>
                <strong style={{ color: '#38bdf8', fontFamily: '"IBM Plex Mono", monospace' }}>₹39.80 L (25.9%)</strong>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: '25.9%', height: '100%', background: '#38bdf8', borderRadius: '3px' }} />
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                <span style={{ color: '#fff', fontWeight: 600 }}>Inpatient ICU, Wards & Daycare Stays</span>
                <strong style={{ color: '#a855f7', fontFamily: '"IBM Plex Mono", monospace' }}>₹27.60 L (18.0%)</strong>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: '18.0%', height: '100%', background: '#a855f7', borderRadius: '3px' }} />
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                <span style={{ color: '#fff', fontWeight: 600 }}>Diagnostic Imaging (CT/X-Ray) & Pathology Lab</span>
                <strong style={{ color: '#f59e0b', fontFamily: '"IBM Plex Mono", monospace' }}>₹19.90 L (13.0%)</strong>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: '13.0%', height: '100%', background: '#f59e0b', borderRadius: '3px' }} />
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                <span style={{ color: '#fff', fontWeight: 600 }}>Emergency Mobile ICU & Hospital Pharmacy</span>
                <strong style={{ color: '#ec4899', fontFamily: '"IBM Plex Mono", monospace' }}>₹7.65 L (5.0%)</strong>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: '5.0%', height: '100%', background: '#ec4899', borderRadius: '3px' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Payer Instrument Mix */}
        <div style={{
          background: 'var(--card, #1e293b)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <h3 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 700 }}>Payer Mix & Cashless Insurance Claims</h3>
          <p style={{ margin: '0 0 16px', fontSize: '12px', color: '#94a3b8' }}>Payment instruments and pet health insurance settlement</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
            <div style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>Direct Parent Payment</span>
              <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px', color: '#38bdf8' }}>72.0%</div>
              <div style={{ fontSize: '10px', color: '#64748b' }}>₹1.10 Cr · UPI & Cards</div>
            </div>
            <div style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>Cashless Pet Insurance</span>
              <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px', color: '#10b981' }}>18.0%</div>
              <div style={{ fontSize: '10px', color: '#64748b' }}>₹27.60 L · Direct TPA settlement</div>
            </div>
            <div style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>Corporate / Wellness Plan</span>
              <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px', color: '#a855f7' }}>10.0%</div>
              <div style={{ fontSize: '10px', color: '#64748b' }}>₹15.34 L · Pre-paid bundles</div>
            </div>
            <div style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>Average Claim Settlement</span>
              <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px', color: '#f59e0b' }}>3.2 Days</div>
              <div style={{ fontSize: '10px', color: '#64748b' }}>98.4% claim approval rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Facility Revenue Table */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Facility-Level Revenue Realization</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#94a3b8' }}>Departmental revenue realization across network clinics and tertiary hospitals</p>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#94a3b8' }}>
                <th style={{ padding: '8px 12px' }}>Facility</th>
                <th style={{ padding: '8px 12px' }}>City</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>OPD Consults</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Surgeries</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Diagnostics</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Hospitalization</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Total Billings</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Share</th>
              </tr>
            </thead>
            <tbody>
              {facilityRevenue.length === 0 ? (<tr><td colSpan="8" style={{ textAlign: "center", padding: "32px", color: "var(--muted-foreground, #64748b)" }}>No facility revenue records found</td></tr>) : facilityRevenue.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 600, color: '#fff' }}>{row.name}</td>
                  <td style={{ padding: '10px 12px', color: '#94a3b8' }}>{row.city}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{row.opdRev}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#10b981' }}>{row.surgeryRev}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{row.diagRev}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{row.ipdRev}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#38bdf8' }}>{row.total}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#cbd5e1' }}>{row.share}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
