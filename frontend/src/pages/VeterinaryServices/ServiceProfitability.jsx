import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ServiceProfitability() {
  const profitLines = [
    { service: 'Orthopedic & TPLO Surgery', revenue: '₹34,80,000', directCost: '₹14,20,000', grossProfit: '₹20,60,000', margin: '59.2%', costDrivers: 'Titanium TPLO plates, sterile OT gas, surgical screws', status: 'Highest Margin' },
    { service: 'General & Laparoscopy Surgery', revenue: '₹26,40,000', directCost: '₹11,60,000', grossProfit: '₹14,80,000', margin: '56.1%', costDrivers: 'Laparoscopic trocars, harmonic scalpel blade', status: 'Highest Margin' },
    { service: 'Emergency, ICU & Critical Care', revenue: '₹22,10,000', directCost: '₹10,50,000', grossProfit: '₹11,60,000', margin: '52.5%', costDrivers: 'Blood gases, fentanyl CRI, arterial line kits', status: 'High Margin' },
    { service: 'Clinical Outpatient Consultations', revenue: '₹18,50,000', directCost: '₹4,80,000', grossProfit: '₹13,70,000', margin: '74.1%', costDrivers: 'Physician time quota, disposable otoscope tips', status: 'Highest Margin' },
    { service: 'In-House Diagnostics & Labs', revenue: '₹16,20,000', directCost: '₹5,80,000', grossProfit: '₹10,40,000', margin: '64.2%', costDrivers: 'Dry chemistry rotors, CBC reagent packs, DR sensor', status: 'High Margin' },
    { service: 'Cardiology & Ultrasound', revenue: '₹11,40,000', directCost: '₹3,90,000', grossProfit: '₹7,50,000', margin: '65.8%', costDrivers: 'Ultrasound probe gel, ECG electrodes, cardiologist fee', status: 'High Margin' },
    { service: 'Preventive Vaccines & Certs', revenue: '₹8,90,000', directCost: '₹4,40,000', grossProfit: '₹4,50,000', margin: '50.6%', costDrivers: 'MSD Nobivac cold-chain biological vials, sterile syringes', status: 'Healthy Margin' },
    { service: 'Dental Prophylaxis & Scaling', revenue: '₹4,80,000', directCost: '₹1,50,000', grossProfit: '₹3,30,000', margin: '68.8%', costDrivers: 'Ultrasonic scaler tips, prophy paste, nerve blocks', status: 'Highest Margin' },
    { service: 'Feline Internal Medicine', revenue: '₹3,40,000', directCost: '₹1,60,000', grossProfit: '₹1,80,000', margin: '52.9%', costDrivers: 'Feline catheters, specialized micro-infusions', status: 'Healthy Margin' },
    { service: 'Neurology & Spinal Therapy', revenue: '₹1,80,000', directCost: '₹80,000', grossProfit: '₹1,00,000', margin: '55.6%', costDrivers: 'MRI coils, contrast media, methylprednisolone', status: 'Healthy Margin' }
  ];

  const cardStyle = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Veterinary Services"
      subcategory="Service Profitability"
      title="Veterinary Clinical Unit Economics & Margin Diagnostics"
      subtitle="Gross profit margins, doctor compensation splits, surgical consumable expenses, diagnostic test cost-of-goods, and operating EBITDA"
      icon="📈"
      badge="Blended Clinical Margin: 60.3%"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Blended Gross Margin" value="60.3%" delta="+2.8% YoY" trend="up" subtext="Benchmark: 55.0%" icon="📈" />
        <KpiCard label="Clinical Gross Profit" value="₹89.20 L" delta="+19.4% MoM" trend="up" subtext="From ₹1.48 Cr revenue" icon="💰" />
        <KpiCard label="Doctor Commission Split" value="15.2%" delta="Highly Accretive" trend="up" subtext="Aligned practitioner incentive" icon="👨‍⚕️" />
        <KpiCard label="Operating EBITDA" value="₹48.60 L" delta="32.8% Net" trend="up" subtext="After all hub operating overheads" icon="💎" />
      </div>

      <div style={cardStyle}>
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Clinical Service Line Profitability & Margin Matrix</h3>
          <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Granular contribution margins per specialty after direct consumables, lab reagents, and doctor clinical incentives</p>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #475569)' }}>
                <th style={{ padding: '10px 12px' }}>Service Line</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Revenue (MTD)</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Direct COGS</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Gross Profit (₹)</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Margin %</th>
                <th style={{ padding: '10px 12px' }}>Key Cost Drivers</th>
                <th style={{ padding: '10px 12px', textAlign: 'center' }}>Tier</th>
              </tr>
            </thead>
            <tbody>
              {profitLines.map(p => (
                <tr key={p.service} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '12px', fontWeight: 700, color: '#0f172a' }}>{p.service}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 600, color: '#0f172a', fontFamily: '"IBM Plex Mono", monospace' }}>{p.revenue}</td>
                  <td style={{ padding: '12px', textAlign: 'right', color: '#dc2626', fontFamily: '"IBM Plex Mono", monospace' }}>{p.directCost}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, color: '#059669', fontFamily: '"IBM Plex Mono", monospace' }}>{p.grossProfit}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, color: '#2563eb' }}>{p.margin}</td>
                  <td style={{ padding: '12px', color: '#64748b', fontSize: '12px' }}>{p.costDrivers}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <span style={{
                      padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600,
                      background: p.status === 'Highest Margin' ? 'rgba(16,185,129,0.12)' : 'rgba(37,99,235,0.12)',
                      color: p.status === 'Highest Margin' ? '#047857' : '#1d4ed8'
                    }}>
                      {p.status}
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