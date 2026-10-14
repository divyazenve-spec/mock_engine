import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function DeliveryCost() {
  const [search, setSearch] = useState('');
  const [filterMode, setFilterMode] = useState('ALL');

  const costLines = [
    { component: 'Rider Fuel / Power per Drop', internalEv: '₹2.80 (Electric)', partner3pl: '₹14.50 (Petrol ICE)', variance: '-80.7% EV Advantage', shareOfCost: '16.2%', category: 'Energy & Fuel' },
    { component: 'Rider Payout / Base Fare', internalEv: '₹28.00', partner3pl: '₹36.00', variance: '-22.2% EV Advantage', shareOfCost: '54.5%', category: 'Labor' },
    { component: 'Insulated & Cold-Box Amortization', internalEv: '₹3.40', partner3pl: '₹6.20', variance: '-45.2% Own Assets', shareOfCost: '7.8%', category: 'Hardware' },
    { component: 'Packaging, Ice-Gel Packs & Tamper Seal', internalEv: '₹4.20', partner3pl: '₹4.20', variance: '0.0% Standardized', shareOfCost: '7.2%', category: 'Packaging' },
    { component: 'GPS Telematics, SIM & IoT Sensors', internalEv: '₹1.10', partner3pl: '₹2.80', variance: '-60.7% Central IoT', shareOfCost: '2.8%', category: 'Tech & IoT' },
    { component: 'Hub Sortation, Pick & Pack Labor', internalEv: '₹3.60', partner3pl: '₹3.60', variance: '0.0% Fixed Darkstore', shareOfCost: '6.4%', category: 'Labor' },
    { component: 'Transit Spoilage & Breakage Loss', internalEv: '₹0.40', partner3pl: '₹1.80', variance: '-77.8% Secure Pods', shareOfCost: '1.2%', category: 'Loss & Risk' },
    { component: 'Doorstep Re-attempt & NDR Reverse', internalEv: '₹0.80', partner3pl: '₹2.40', variance: '-66.7% WhatsApp Bot', shareOfCost: '1.8%', category: 'Operations' },
    { component: 'Dispatch Software & Route Optimization', internalEv: '₹1.20', partner3pl: '₹2.50', variance: '-52.0% Internal Tech', shareOfCost: '2.1%', category: 'Tech & IoT' },
    { component: 'Total Blended Cost per Drop', internalEv: '₹46.50', partner3pl: '₹68.00', variance: '-31.6% EV Fleet Edge', shareOfCost: '100.0%', category: 'Summary' }
  ];

  const hubCosts = [
    { hub: 'Indiranagar Micro-Hub', city: 'Bengaluru', drops: '3,840', evShare: '88%', avgDistance: '3.2 km', costPerDrop: '₹48.20', monthlySpend: '₹1,85,088', efficiency: 'High Efficiency' },
    { hub: 'Koramangala 24x7 Hub', city: 'Bengaluru', drops: '4,120', evShare: '85%', avgDistance: '3.6 km', costPerDrop: '₹49.80', monthlySpend: '₹2,05,176', efficiency: 'High Efficiency' },
    { hub: 'Bandra West Micro-Hub', city: 'Mumbai', drops: '3,450', evShare: '80%', avgDistance: '3.8 km', costPerDrop: '₹52.40', monthlySpend: '₹1,80,780', efficiency: 'High Efficiency' },
    { hub: 'HSR Layout Hub', city: 'Bengaluru', drops: '2,920', evShare: '82%', avgDistance: '3.4 km', costPerDrop: '₹50.60', monthlySpend: '₹1,47,752', efficiency: 'High Efficiency' },
    { hub: 'Whitefield Care Hub', city: 'Bengaluru', drops: '2,640', evShare: '72%', avgDistance: '5.2 km', costPerDrop: '₹58.50', monthlySpend: '₹1,54,440', efficiency: 'Optimal' },
    { hub: 'Andheri West Hub', city: 'Mumbai', drops: '3,100', evShare: '75%', avgDistance: '4.6 km', costPerDrop: '₹56.80', monthlySpend: '₹1,76,080', efficiency: 'Optimal' },
    { hub: 'Saket Care Micro-Hub', city: 'Delhi-NCR', drops: '2,420', evShare: '68%', avgDistance: '5.8 km', costPerDrop: '₹61.20', monthlySpend: '₹1,48,104', efficiency: 'Optimal' },
    { hub: 'JP Nagar Care Hub', city: 'Bengaluru', drops: '2,180', evShare: '84%', avgDistance: '3.5 km', costPerDrop: '₹51.00', monthlySpend: '₹1,11,180', efficiency: 'High Efficiency' },
    { hub: 'Gurugram DLF Hub', city: 'Delhi-NCR', drops: '1,980', evShare: '70%', avgDistance: '5.4 km', costPerDrop: '₹59.40', monthlySpend: '₹1,17,612', efficiency: 'Optimal' },
    { hub: 'Jubilee Hills Hub', city: 'Hyderabad', drops: '1,850', evShare: '78%', avgDistance: '4.2 km', costPerDrop: '₹53.80', monthlySpend: '₹99,530', efficiency: 'High Efficiency' }
  ];

  const filteredCostLines = costLines.filter(c => {
    if (search) {
      const q = search.toLowerCase();
      return c.component.toLowerCase().includes(q) || c.category.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <DashboardLayout
      category="Logistics & Delivery"
      subcategory="Delivery Cost"
      title="Delivery Cost Economics & Per-Drop Efficiency"
      subtitle="Unit economics of last-mile delivery, EV vs ICE cost comparison, packaging expenses, and hub efficiency"
      icon="💰"
      badge="₹54.20 Cost Per Delivery"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Blended Cost / Drop" value="₹54.20" delta="-₹6.40 vs FY25" trend="up" subtext="Target < ₹60" icon="💰" />
        <KpiCard label="Internal EV Cost" value="₹46.50" delta="31.6% cheaper" trend="up" subtext="Own electric fleet" icon="⚡" />
        <KpiCard label="3PL Partner Cost" value="₹68.00" delta="Flex on-demand" trend="neutral" subtext="Surge & overflow" icon="🛵" />
        <KpiCard label="Monthly Fleet Spend" value="₹14.42 Lakhs" delta="-8.4% vs Budget" trend="up" subtext="26,600 deliveries" icon="📉" />
      </div>

      {/* Component Breakdown Table */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
        marginBottom: '18px'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Delivery Cost Component Breakdown (10 Line Items)</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Granular per-delivery line items: Internal EV Fleet vs Partner 3PL comparison</p>
          </div>
          <input
            type="text"
            placeholder="Search cost component..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', minWidth: '200px' }}
          />
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Cost Component</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Internal EV Fleet</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Partner 3PL</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Variance (EV Advantage)</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Share of Cost</th>
              </tr>
            </thead>
            <tbody>
              {filteredCostLines.map(c => (
                <tr key={c.component} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>{c.component}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: 'monospace', color: '#16a34a', fontWeight: 700 }}>{c.internalEv}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: 'monospace', color: '#dc2626', fontWeight: 700 }}>{c.partner3pl}</td>
                  <td style={{ padding: '12px 16px', color: '#2563eb', fontWeight: 600 }}>{c.variance}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: 'monospace', color: '#475569', fontWeight: 600 }}>{c.shareOfCost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Urban Micro-Hub Cost Efficiency Table */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Urban Micro-Hub Unit Cost Efficiency (10 Hubs)</h3>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Dispatches, EV share, delivery radius, cost per drop, and monthly hub spend</p>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Hub Location</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>City</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Monthly Drops</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>EV Fleet Share</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Avg Radius</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Cost / Drop</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Total Spend</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Efficiency</th>
              </tr>
            </thead>
            <tbody>
              {hubCosts.map((h, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>{h.hub}</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>{h.city}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: 'monospace', fontWeight: 600 }}>{h.drops}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', color: '#16a34a', fontWeight: 700 }}>{h.evShare}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', color: '#475569' }}>{h.avgDistance}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: 'monospace', color: '#0284c7', fontWeight: 700 }}>{h.costPerDrop}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: 'monospace', color: '#0f172a', fontWeight: 700 }}>{h.monthlySpend}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, background: h.efficiency === 'High Efficiency' ? '#dcfce7' : '#f1f5f9', color: h.efficiency === 'High Efficiency' ? '#16a34a' : '#475569' }}>
                      {h.efficiency}
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
