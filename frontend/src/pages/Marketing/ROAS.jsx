import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ROAS() {
  const categoryROAS = [
  {
    "category": "Specialized Veterinary Surgery (TPLO/Spine)",
    "spend": "₹42,500",
    "revenue": "₹3,48,500",
    "roas": "8.2x",
    "target": "6.0x",
    "status": "Outperforming"
  },
  {
    "category": "Emergency Care & 24/7 ICU Trauma",
    "spend": "₹34,000",
    "revenue": "₹2,85,600",
    "roas": "8.4x",
    "target": "6.5x",
    "status": "Outperforming"
  },
  {
    "category": "Prescription Diets & Clinical Nutrition",
    "spend": "₹28,500",
    "revenue": "₹2,02,350",
    "roas": "7.1x",
    "target": "5.0x",
    "status": "Outperforming"
  },
  {
    "category": "Core Vaccinations & Pediatric Wellness",
    "spend": "₹32,600",
    "revenue": "₹1,89,080",
    "roas": "5.8x",
    "target": "4.5x",
    "status": "Optimal"
  },
  {
    "category": "Canine Joint Health & Laser Therapy",
    "spend": "₹25,000",
    "revenue": "₹1,62,500",
    "roas": "6.5x",
    "target": "5.0x",
    "status": "Outperforming"
  },
  {
    "category": "Advanced Diagnostics (CT/Ultrasound/Lab)",
    "spend": "₹22,100",
    "revenue": "₹1,32,600",
    "roas": "6.0x",
    "target": "5.0x",
    "status": "Optimal"
  },
  {
    "category": "Dental Cleaning & Ultrasonic Scaling",
    "spend": "₹18,500",
    "revenue": "₹96,200",
    "roas": "5.2x",
    "target": "4.0x",
    "status": "Optimal"
  },
  {
    "category": "Flea, Tick & Parasitic Preventatives",
    "spend": "₹24,800",
    "revenue": "₹1,43,840",
    "roas": "5.8x",
    "target": "4.5x",
    "status": "Optimal"
  },
  {
    "category": "Pet Dermatology & Allergy Desensitization",
    "spend": "₹16,000",
    "revenue": "₹88,000",
    "roas": "5.5x",
    "target": "4.0x",
    "status": "Optimal"
  },
  {
    "category": "General OPD Video Consultation (Tele-Vet)",
    "spend": "₹16,000",
    "revenue": "₹76,800",
    "roas": "4.8x",
    "target": "4.0x",
    "status": "Optimal"
  }
];

  return (
    <DashboardLayout
      category="Marketing"
      subcategory="ROAS"
      title="Return on Ad Spend (ROAS) Intelligence"
      subtitle="Ad spend efficiency by clinical service, search vs social ad multiples, and attributed GMV revenue"
      icon="🚀"
      badge="Blended ROAS: 6.64x"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Blended ROAS" value="6.64x" delta="+1.1x vs target" trend="up" subtext="₹17.25L Attributed GMV" icon="🚀" />
        <KpiCard label="Search Ads ROAS" value="7.65x" delta="High Intent" trend="up" subtext="Google campaign return" icon="🔍" />
        <KpiCard label="Social Ads ROAS" value="5.85x" delta="Meta & Reels" trend="up" subtext="Direct order checkout" icon="📸" />
        <KpiCard label="Incremental ROAS" value="5.10x" delta="Baseline lift" trend="up" subtext="Incremental revenue" icon="📈" />
      </div>

      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Category Ad Return & Revenue Generated</h3>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Ad efficiency mapped directly to top pet healthcare and wellness categories</p>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <th style={{ padding: '12px 16px' }}>Product & Clinical Category</th>
                <th style={{ padding: '12px 16px' }}>Ad Spend</th>
                <th style={{ padding: '12px 16px' }}>Attributed GMV</th>
                <th style={{ padding: '12px 16px' }}>ROAS Multiple</th>
                <th style={{ padding: '12px 16px' }}>Target Benchmark</th>
                <th style={{ padding: '12px 16px' }}>Performance Status</th>
              </tr>
            </thead>
            <tbody>
              {categoryROAS.map(c => (
                <tr key={c.category} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 600, color: '#0f172a' }}>{c.category}</td>
                  <td style={{ padding: '14px 16px', fontFamily: '"IBM Plex Mono", monospace' }}>{c.spend}</td>
                  <td style={{ padding: '14px 16px', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{c.revenue}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ display: 'inline-block', padding: '3px 8px', borderRadius: '4px', background: '#dcfce7', color: '#15803d', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{c.roas}</span>
                  </td>
                  <td style={{ padding: '14px 16px', color: '#64748b', fontFamily: '"IBM Plex Mono", monospace' }}>{c.target}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: '4px', background: '#eff6ff', color: '#2563eb', fontWeight: 600, fontSize: '11px' }}>{c.status}</span>
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
