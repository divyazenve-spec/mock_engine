import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function FashionProfitability() {
  const unitEconomics = [
    { product: 'Royal Brocade Pet Sherwani', asp: '₹4,850', fabricCost: '₹720', artisanLabor: '₹480', packagingHardware: '₹220', totalCogs: '₹1,420', grossProfit: '₹3,430', margin: '70.7%' },
    { product: 'Italian Nappa Leather Harness', asp: '₹3,650', fabricCost: '₹580', artisanLabor: '₹360', packagingHardware: '₹180', totalCogs: '₹1,120', grossProfit: '₹2,530', margin: '69.3%' },
    { product: 'Himalayan Cashmere Sweater', asp: '₹2,950', fabricCost: '₹480', artisanLabor: '₹280', packagingHardware: '₹100', totalCogs: '₹860', grossProfit: '₹2,090', margin: '70.8%' },
    { product: 'Alpine StormShield Trench', asp: '₹4,200', fabricCost: '₹740', artisanLabor: '₹420', packagingHardware: '₹180', totalCogs: '₹1,340', grossProfit: '₹2,860', margin: '68.1%' },
    { product: 'Florentine Calfskin Collar & Leash', asp: '₹3,200', fabricCost: '₹510', artisanLabor: '₹300', packagingHardware: '₹140', totalCogs: '₹950', grossProfit: '₹2,250', margin: '70.3%' },
    { product: 'Monaco Riviera Linen Sailor Polo', asp: '₹2,150', fabricCost: '₹320', artisanLabor: '₹220', packagingHardware: '₹80', totalCogs: '₹620', grossProfit: '₹1,530', margin: '71.2%' },
    { product: 'Velvet Evening Tuxedo & Bowtie', asp: '₹5,400', fabricCost: '₹880', artisanLabor: '₹560', packagingHardware: '₹240', totalCogs: '₹1,680', grossProfit: '₹3,720', margin: '68.9%' },
    { product: 'All-Terrain Orthopedic Rain Booties', asp: '₹1,850', fabricCost: '₹280', artisanLabor: '₹210', packagingHardware: '₹90', totalCogs: '₹580', grossProfit: '₹1,270', margin: '68.6%' },
    { product: '24K Gold-Plated Bespoke ID Medallion', asp: '₹2,450', fabricCost: '₹340', artisanLabor: '₹240', packagingHardware: '₹110', totalCogs: '₹690', grossProfit: '₹1,760', margin: '71.8%' },
    { product: 'Merino Wool Thermal Base Layer', asp: '₹2,250', fabricCost: '₹360', artisanLabor: '₹240', packagingHardware: '₹80', totalCogs: '₹680', grossProfit: '₹1,570', margin: '69.8%' }
  ];

  const channelProfitability = [
    { channel: 'Bandra West Flagship Boutique', rev: '₹14.80L', cogs: '₹4.44L', opex: '₹2.65L', netContribution: '₹7.71L', margin: '52.1%' },
    { channel: 'Indiranagar Lifestyle Studio', rev: '₹12.40L', cogs: '₹3.72L', opex: '₹2.20L', netContribution: '₹6.48L', margin: '52.3%' },
    { channel: 'Koramangala VIP Lounge', rev: '₹9.80L', cogs: '₹2.94L', opex: '₹1.85L', netContribution: '₹5.01L', margin: '51.1%' },
    { channel: 'Jubilee Hills Salon', rev: '₹8.60L', cogs: '₹2.58L', opex: '₹1.65L', netContribution: '₹4.37L', margin: '50.8%' },
    { channel: 'DLF CyberCity Pavilion', rev: '₹9.20L', cogs: '₹2.76L', opex: '₹1.75L', netContribution: '₹4.69L', margin: '51.0%' },
    { channel: 'iOS Luxury App Store', rev: '₹84.06L', cogs: '₹26.05L', opex: '₹8.40L', netContribution: '₹49.61L', margin: '59.0%' },
    { channel: 'Android Flagship App', rev: '₹57.34L', cogs: '₹17.78L', opex: '₹5.70L', netContribution: '₹33.86L', margin: '59.1%' },
    { channel: 'WhatsApp VIP Concierge', rev: '₹27.02L', cogs: '₹7.84L', opex: '₹1.80L', netContribution: '₹17.38L', margin: '64.3%' },
    { channel: 'Instagram Social Commerce', rev: '₹21.26L', cogs: '₹6.59L', opex: '₹3.20L', netContribution: '₹11.47L', margin: '54.0%' },
    { channel: 'Private Atelier Direct Drops', rev: '₹12.88L', cogs: '₹3.61L', opex: '₹0.90L', netContribution: '₹8.37L', margin: '65.0%' }
  ];

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(255,255,255,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Zenve Fashion"
      subcategory="Unit Economics & Margins"
      title="Fashion Margins, COGS & Contribution Profitability"
      subtitle="Bespoke pet apparel unit economics, artisan atelier labor costs, channel contribution margins, and markdown protection"
      icon="💎"
      badge="Unit Economics"
      actions={
        <button onClick={() => alert('Exporting Fashion Unit Economics Model...')} style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #ec4899', background: 'rgba(236,72,153,0.15)', color: '#f472b6', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
          📑 Profit Model Export
        </button>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Blended Gross Margin" value="68.4%" delta="+3.1% YoY" trend="up" subtext="Direct atelier sourcing" icon="💎" />
        <KpiCard label="Net Contribution Margin" value="54.2%" delta="+4.2% expansion" trend="up" subtext="After showroom OPEX" icon="📊" />
        <KpiCard label="Full-Price Sell-Through" value="94.6%" delta="Markdowns < 5.4%" trend="up" subtext="No discount brand equity" icon="🏷️" />
        <KpiCard label="Custom Monogram Margin" value="86.4%" delta="₹750 add-on fee" trend="up" subtext="Artisan laser embroidery" icon="✨" />
        <KpiCard label="Sizing Exchange Cost" value="1.2% of Rev" delta="-0.8% reduction" trend="up" subtext="Precise 3D size fitting" icon="📐" />
        <KpiCard label="Fashion Operating EBITDA" value="₹17.92L" delta="36.9% EBITDA margin" trend="up" subtext="Highly lucrative luxury line" icon="⚡" />
      </div>

      {/* Unit Economics Breakdown */}
      <div style={card}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>💎 Core SKU Unit Economics & Margin Matrix (10 SKUs)</h3>
        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'var(--muted, #f8fafc)', borderBottom: '1px solid var(--border, rgba(0,0,0,0.08))' }}>
                {['Apparel Product', 'Retail ASP', 'Fabric Cost', 'Artisan Labor', 'Hardware & Pkg', 'Total COGS', 'Gross Profit', 'Gross Margin'].map(h => (
                  <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--muted-foreground, #64748b)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {unitEconomics.map((u, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border, rgba(0,0,0,0.06))' }}>
                  <td style={{ padding: '11px 12px', fontWeight: 600, color: 'var(--foreground, #0f172a)' }}>{u.product}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--foreground, #334155)' }}>{u.asp}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--muted-foreground, #64748b)' }}>{u.fabricCost}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--muted-foreground, #64748b)' }}>{u.artisanLabor}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--muted-foreground, #64748b)' }}>{u.packagingHardware}</td>
                  <td style={{ padding: '11px 12px', color: '#f87171' }}>{u.totalCogs}</td>
                  <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#34d399' }}>{u.grossProfit}</td>
                  <td style={{ padding: '11px 12px', fontWeight: 800, color: '#a78bfa' }}>{u.margin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Channel Contribution */}
      <div style={card}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>📊 Channel Contribution & Operating Margins (10 Channels)</h3>
        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'var(--muted, #f8fafc)', borderBottom: '1px solid var(--border, rgba(0,0,0,0.08))' }}>
                {['Channel', 'Gross Revenue', 'Direct COGS', 'Channel OPEX / Fulfillment', 'Net Contribution', 'Contribution %'].map(h => (
                  <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--muted-foreground, #64748b)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {channelProfitability.map((cp, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border, rgba(0,0,0,0.06))' }}>
                  <td style={{ padding: '11px 12px', fontWeight: 600, color: 'var(--foreground, #0f172a)' }}>{cp.channel}</td>
                  <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#34d399' }}>{cp.rev}</td>
                  <td style={{ padding: '11px 12px', color: '#f87171' }}>{cp.cogs}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--muted-foreground, #64748b)' }}>{cp.opex}</td>
                  <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#38bdf8' }}>{cp.netContribution}</td>
                  <td style={{ padding: '11px 12px', fontWeight: 800, color: '#34d399' }}>{cp.margin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
