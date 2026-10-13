import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ImportExportProfitability() {
  const lanes = [
    { lane: 'Germany MAb Biologicals (Inbound JNPT)', grossCost: '₹68,20,000', landedLanded: '₹84,50,000', domesticNetRev: '₹1,32,00,000', grossProfit: '₹47,50,000', margin: '36.0%', status: 'High Yield ★★★★★' },
    { lane: 'USA Canine Core Vaccines Cold-Chain', grossCost: '₹49,60,000', landedLanded: '₹62,00,000', domesticNetRev: '₹1,05,40,000', grossProfit: '₹43,40,000', margin: '41.2%', status: 'Prime Margin ★★★★★' },
    { lane: 'Japan Digital Flat-Panel DR Imaging', grossCost: '₹76,00,000', landedLanded: '₹92,40,000', domesticNetRev: '₹1,44,00,000', grossProfit: '₹51,60,000', margin: '35.8%', status: 'High Yield ★★★★★' },
    { lane: 'Netherlands Synthetic Bovine Hormones', grossCost: '₹39,50,000', landedLanded: '₹48,20,000', domesticNetRev: '₹72,30,000', grossProfit: '₹24,10,000', margin: '33.3%', status: 'Stable ★★★★☆' },
    { lane: 'France Ultrasonic Dental Veterinary Sets', grossCost: '₹31,00,000', landedLanded: '₹39,80,000', domesticNetRev: '₹61,80,000', grossProfit: '₹22,00,000', margin: '35.6%', status: 'Strong ★★★★☆' },
    { lane: 'Outbound UAE Equine Orthopedic Implants', grossCost: '₹34,00,000', landedLanded: '₹38,20,000', domesticNetRev: '₹58,40,000', grossProfit: '₹20,20,000', margin: '34.6%', status: 'Export Prime ★★★★★' },
    { lane: 'Outbound Australia Titanium Bone Plates', grossCost: '₹27,80,000', landedLanded: '₹31,50,000', domesticNetRev: '₹49,80,000', grossProfit: '₹18,30,000', margin: '36.7%', status: 'Export Prime ★★★★★' },
    { lane: 'Outbound UK Herbal Hepato-Tonics', grossCost: '₹19,20,000', landedLanded: '₹22,10,000', domesticNetRev: '₹36,50,000', grossProfit: '₹14,40,000', margin: '39.5%', status: 'High Arbitrage ★★★★★' },
    { lane: 'Outbound Singapore Micro-Surgical Sutures', grossCost: '₹23,40,000', landedLanded: '₹26,80,000', domesticNetRev: '₹42,20,000', grossProfit: '₹15,40,000', margin: '36.5%', status: 'Export Prime ★★★★★' },
    { lane: 'Outbound Qatar Avian Specialty Medicines', grossCost: '₹17,50,000', landedLanded: '₹19,80,000', domesticNetRev: '₹31,10,000', grossProfit: '₹11,30,000', margin: '36.3%', status: 'High Yield ★★★★★' }
  ];

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Import & Export"
      subcategory="Profitability"
      title="Landed Cost Economics & Cross-Border Margins"
      subtitle="Total landed cost breakdown (CIF, customs duty, IGST, clearing, cold freight) and net international export arbitrage"
      icon="💎"
      badge="10"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Blended Trade Gross Margin" value="38.6%" delta="+4.2% YoY" trend="up" subtext="Direct OEM sourcing advantage" icon="💎" />
        <KpiCard label="Landed Cost Multiplier" value="1.28x CIF" delta="Duty + freight" trend="up" subtext="Lowest in specialty animal health" icon="📈" />
        <KpiCard label="Export Net Contribution" value="₹1.41 Cr" delta="36.8% export margin" trend="up" subtext="Haute couture luxury & pharma markup" icon="💰" />
        <KpiCard label="Forex Gain / Arbitrage" value="₹18.2 L" delta="Forward locked" trend="up" subtext="Treasury forward lock" icon="🌐" />
      </div>

      <div style={card}>
        <h3 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Trade Lane Unit Economics & Landed Margins ({lanes.length} records)</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Procurement costs, landed freight & customs duty, realized revenue, and gross profit realization</p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)' }}>
                <th style={{ padding: '10px 12px' }}>Trade Lane Description</th>
                <th style={{ padding: '10px 12px' }}>Procurement Cost</th>
                <th style={{ padding: '10px 12px' }}>Total Landed Cost</th>
                <th style={{ padding: '10px 12px' }}>Realized Net Revenue</th>
                <th style={{ padding: '10px 12px' }}>Gross Profit</th>
                <th style={{ padding: '10px 12px' }}>Gross Margin</th>
                <th style={{ padding: '10px 12px' }}>Rating</th>
              </tr>
            </thead>
            <tbody>
              {lanes.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '24px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                    No trade lane economics records found
                  </td>
                </tr>
              ) : (
                lanes.map(l => (
                  <tr key={l.lane} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{l.lane}</td>
                    <td style={{ padding: '12px' }}>{l.grossCost}</td>
                    <td style={{ padding: '12px', color: '#64748b' }}>{l.landedLanded}</td>
                    <td style={{ padding: '12px', fontWeight: 600, color: '#0f172a' }}>{l.domesticNetRev}</td>
                    <td style={{ padding: '12px', fontWeight: 600, color: '#059669' }}>{l.grossProfit}</td>
                    <td style={{ padding: '12px', fontWeight: 600, color: '#0891b2' }}>{l.margin}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ padding: '3px 8px', borderRadius: '999px', fontSize: '10px', fontWeight: 600, background: 'rgba(16,185,129,0.12)', color: '#059669' }}>
                        {l.status}
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
