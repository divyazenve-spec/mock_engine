import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function VendorDashboard() {
  const topVendors = [
    { rank: 1, name: 'Zoetis Animal Health India', category: 'Vaccines & Biologics', spend: '₹12,45,000', pos: 14, onTime: '99.2', quality: 'AAA', status: 'Preferred' },
    { rank: 2, name: 'MSD Animal Health Pvt Ltd', category: 'Antiparasitics & Vaccines', spend: '₹10,80,000', pos: 12, onTime: '98.9', quality: 'AAA', status: 'Preferred' },
    { rank: 3, name: 'Royal Canin India Pvt Ltd', category: 'Clinical Veterinary Diets', spend: '₹8,95,000', pos: 16, onTime: '98.4', quality: 'AAA', status: 'Preferred' },
    { rank: 4, name: 'Boehringer Ingelheim Vet', category: 'Rx Therapeutics & NSAIDs', spend: '₹6,70,000', pos: 10, onTime: '98.1', quality: 'AA+', status: 'Preferred' },
    { rank: 5, name: "Hill's Pet Nutrition India", category: 'Clinical Nutrition & Care', spend: '₹5,40,000', pos: 8, onTime: '97.8', quality: 'AA+', status: 'Preferred' },
    { rank: 6, name: 'Synthes Vet Orthopedics', category: 'Surgical Implants & Hardware', spend: '₹4,10,000', pos: 6, onTime: '96.5', quality: 'AA', status: 'Active' },
    { rank: 7, name: 'Farmina Pet Foods India', category: 'Veterinary Nutrition', spend: '₹3,65,000', pos: 7, onTime: '97.2', quality: 'AA', status: 'Active' },
    { rank: 8, name: 'Virbac Animal Health India', category: 'Dermatologicals & Anti-Infectives', spend: '₹2,95,000', pos: 9, onTime: '97.5', quality: 'AA', status: 'Active' },
    { rank: 9, name: 'Intas Pharmaceuticals Vet', category: 'Injectables & Critical Care', spend: '₹2,15,000', pos: 8, onTime: '96.8', quality: 'A+', status: 'Active' },
    { rank: 10, name: 'Purina PetCare India', category: 'Clinical Probiotics & Diets', spend: '₹1,65,000', pos: 5, onTime: '96.1', quality: 'A+', status: 'Active' }
  ];

  const categories = [
    { label: 'Vaccines & Biologics (Zoetis, MSD)', value: '₹14.85 Lakhs', pct: 28, color: '#3b82f6' },
    { label: 'Rx Therapeutics & NSAIDs (BI, Virbac)', value: '₹12.60 Lakhs', pct: 24, color: '#06b6d4' },
    { label: 'Clinical Veterinary Diets (Royal Canin, Hills)', value: '₹11.20 Lakhs', pct: 21, color: '#10b981' },
    { label: 'Surgical Implants & Hardware (Synthes Vet)', value: '₹7.80 Lakhs', pct: 15, color: '#8b5cf6' },
    { label: 'Injectables & Critical Care (Intas)', value: '₹6.40 Lakhs', pct: 12, color: '#f59e0b' }
  ];

  const months = [
    { month: 'May 2026', spend: '₹48.2 Lakhs', pct: 88 },
    { month: 'Jun 2026', spend: '₹49.5 Lakhs', pct: 90 },
    { month: 'Jul 2026', spend: '₹51.0 Lakhs', pct: 93 },
    { month: 'Aug 2026', spend: '₹52.1 Lakhs', pct: 95 },
    { month: 'Sep 2026', spend: '₹52.4 Lakhs', pct: 96 },
    { month: 'Oct 2026 (MTD)', spend: '₹52.85 Lakhs', pct: 97 }
  ];

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(255,255,255,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Vendors & Procurement"
      subcategory="Vendor Dashboard"
      title="Vendor Intelligence & Procurement Command Center"
      subtitle="Verified suppliers, real-time PO tracking, spend analytics, category breakdown, and quality scorecards"
      icon="🤝"
      badge="Live Center"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => alert('Opening New Vendor Onboarding Form...')} style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #3b82f6', background: 'rgba(59,130,246,0.15)', color: '#60a5fa', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
            + Onboard Vendor
          </button>
          <button onClick={() => alert('Opening New Purchase Order Form...')} style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #10b981', background: 'rgba(16,185,129,0.15)', color: '#34d399', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
            + Raise PO
          </button>
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Active Vendors" value="24 Vendors" delta="+3 YoY" trend="up" subtext="6 Preferred / 18 Active" icon="🏭" />
        <KpiCard label="Total Procurement Spend" value="₹52.85 Lakhs" delta="+2.4% MoM" trend="up" subtext="FY 2026 MTD" icon="💸" />
        <KpiCard label="Open Purchase Orders" value="6 POs" delta="₹14.85L in pipeline" trend="up" subtext="3 in transit to hub" icon="📑" />
        <KpiCard label="Avg. Vendor On-Time SLA" value="98.4%" delta="+1.2% MoM" trend="up" subtext="Delivery compliance" icon="⏱️" />
        <KpiCard label="Procurement Savings" value="₹6.42 Lakhs" delta="+12.1% of spend" trend="up" subtext="Negotiation & bulk discounts" icon="💰" />
        <KpiCard label="Vendor Quality Score" value="98.2 / 100" delta="+0.6 vs target" trend="up" subtext="Across all vendors" icon="⭐" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div style={card}>
          <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>📊 Spend by Category</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {categories.map((c, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--muted-foreground, #64748b)' }}>{c.label}</span>
                  <span style={{ color: 'var(--foreground, #0f172a)', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{c.value}</span>
                </div>
                <div style={{ height: '5px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px' }}>
                  <div style={{ width: `${c.pct}%`, height: '100%', background: c.color, borderRadius: '3px', opacity: 0.8 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={card}>
          <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>📈 Monthly Procurement Trend</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {months.map((m, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--muted-foreground, #64748b)' }}>{m.month}</span>
                  <span style={{ color: 'var(--foreground, #0f172a)', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{m.spend}</span>
                </div>
                <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px' }}>
                  <div style={{ width: `${m.pct}%`, height: '100%', background: 'linear-gradient(90deg, #3b82f6, #06b6d4)', borderRadius: '3px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={card}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>🏭 Top Vendor Scorecard — FY 2026</h3>
        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'var(--muted, #f8fafc)', borderBottom: '1px solid var(--border, rgba(0,0,0,0.08))' }}>
                {['Rank', 'Vendor Name', 'Category', 'Annual Spend', 'Open POs', 'On-Time SLA', 'Quality', 'Status'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', color: 'var(--muted-foreground, #64748b)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topVendors.map((v, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border, rgba(0,0,0,0.06))' }}>
                  <td style={{ padding: '11px 14px', color: '#fbbf24', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>#{v.rank}</td>
                  <td style={{ padding: '11px 14px', fontWeight: 600, color: 'var(--foreground, #0f172a)' }}>{v.name}</td>
                  <td style={{ padding: '11px 14px', color: 'var(--muted-foreground, #64748b)' }}>{v.category}</td>
                  <td style={{ padding: '11px 14px', fontFamily: '"IBM Plex Mono", monospace', color: '#38bdf8', fontWeight: 600 }}>{v.spend}</td>
                  <td style={{ padding: '11px 14px', textAlign: 'center', color: 'var(--foreground, #334155)' }}>{v.pos}</td>
                  <td style={{ padding: '11px 14px', color: Number(v.onTime) > 97 ? '#34d399' : '#fbbf24', fontWeight: 600 }}>{v.onTime}%</td>
                  <td style={{ padding: '11px 14px' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'rgba(59,130,246,0.12)', color: '#60a5fa', fontSize: '10px', fontWeight: 700 }}>{v.quality}</span>
                  </td>
                  <td style={{ padding: '11px 14px' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, background: v.status === 'Preferred' ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.06)', color: v.status === 'Preferred' ? '#34d399' : '#94a3b8' }}>{v.status}</span>
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
