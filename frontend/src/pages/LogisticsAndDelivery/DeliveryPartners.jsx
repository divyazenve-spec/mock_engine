import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function DeliveryPartners() {
  const partners = [
    { name: 'Zenve Direct EV Fleet', type: 'Dedicated In-House EV', fleetSize: '76 EVs', activeNow: 38, onTimeSla: '99.4%', avgCost: '₹46.50', coldChainReady: 'Yes (IoT Smart Box)', rating: '4.94 / 5', status: 'Primary' },
    { name: 'Shadowfax Hyperlocal', type: 'Contracted 3PL Hyperlocal', fleetSize: '45 On-Demand', activeNow: 24, onTimeSla: '97.8%', avgCost: '₹62.00', coldChainReady: 'Yes (Gel-Packs)', rating: '4.82 / 5', status: 'Primary' },
    { name: 'Dunzo for Business', type: 'B2B Quick Courier', fleetSize: '35 On-Demand', activeNow: 18, onTimeSla: '96.9%', avgCost: '₹65.00', coldChainReady: 'Yes (Insulated)', rating: '4.78 / 5', status: 'Active' },
    { name: 'Porter Enterprise', type: 'Inter-Hub Bulk Transfer', fleetSize: '16 Mini Trucks', activeNow: 11, onTimeSla: '98.5%', avgCost: '₹140.00', coldChainReady: 'Yes (Reefer Van)', rating: '4.89 / 5', status: 'Primary' },
    { name: 'Blitz Express Electric', type: 'Green EV Partner Fleet', fleetSize: '25 EV Bikes', activeNow: 14, onTimeSla: '98.2%', avgCost: '₹51.00', coldChainReady: 'Yes (IoT Box)', rating: '4.86 / 5', status: 'Active' },
    { name: 'BlueDart Cold-Chain Express', type: 'National Cold Chain Air', fleetSize: 'Scheduled Lines', activeNow: 6, onTimeSla: '99.8%', avgCost: '₹220.00', coldChainReady: 'Yes (Dry Ice/2-8°C)', rating: '4.95 / 5', status: 'Primary' },
    { name: 'Borzo Delivery', type: 'Emergency Surge Fleet', fleetSize: '20 On-Demand', activeNow: 8, onTimeSla: '95.4%', avgCost: '₹68.00', coldChainReady: 'No (Dry Cargo Only)', rating: '4.65 / 5', status: 'Active' },
    { name: 'Loadshare Networks', type: 'Regional Intra-City Hubs', fleetSize: '18 Vans', activeNow: 9, onTimeSla: '97.1%', avgCost: '₹95.00', coldChainReady: 'Yes (Insulated Boxes)', rating: '4.74 / 5', status: 'Active' },
    { name: 'Zypp Electric Logistics', type: 'Leased Commercial EV Fleet', fleetSize: '20 EV Scooters', activeNow: 12, onTimeSla: '98.0%', avgCost: '₹48.00', coldChainReady: 'Yes (Smart Box)', rating: '4.83 / 5', status: 'Active' },
    { name: 'Delhivery Flash', type: 'Inter-City Express', fleetSize: 'Scheduled Air/Surface', activeNow: 5, onTimeSla: '98.4%', avgCost: '₹115.00', coldChainReady: 'Yes (Gel Pack Shippers)', rating: '4.88 / 5', status: 'Active' }
  ];

  return (
    <DashboardLayout
      category="Logistics & Delivery"
      subcategory="Delivery Partners"
      title="Fleet & 3PL Logistics Delivery Partners"
      subtitle="Dedicated EV rider fleets, contracted hyperlocal 3PLs, inter-hub transfer networks, and SLA scorecards"
      icon="🛵"
      badge="Multi-Fleet Network"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Dedicated Fleet" value="76 EV Riders" delta="100% Electric" trend="up" subtext="Zero emissions hyperlocal" icon="⚡" />
        <KpiCard label="Active On Road" value="117 Riders" delta="Live capacity" trend="up" subtext="Zenve + 3PL partners" icon="🛵" />
        <KpiCard label="Blended On-Time SLA" value="98.6%" delta="+0.8% MoM" trend="up" subtext="Weighted network avg" icon="⏱️" />
        <KpiCard label="Avg Fleet Rating" value="4.86 / 5" delta="Exceptional" trend="up" subtext="Pet parent doorstep CSAT" icon="⭐" />
      </div>

      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Delivery Partners & Fleet Roster</h3>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Capacity allocation, cold-chain readiness, per-drop cost efficiency, and fulfillment compliance</p>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Partner Name</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Fleet Model</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Fleet Size</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Active Now</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>On-Time SLA</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Drop Cost</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Cold-Chain Ready</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>CSAT Rating</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {partners.map(p => (
                <tr key={p.name} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#0f172a' }}>{p.name}</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>{p.type}</td>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#334155' }}>{p.fleetSize}</td>
                  <td style={{ padding: '12px 16px', color: '#16a34a', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{p.activeNow} on road</td>
                  <td style={{ padding: '12px 16px', color: '#2563eb', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{p.onTimeSla}</td>
                  <td style={{ padding: '12px 16px', color: '#475569', fontFamily: '"IBM Plex Mono", monospace' }}>{p.avgCost}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: p.coldChainReady.includes('Yes') ? '#ecfeff' : '#f8fafc',
                      color: p.coldChainReady.includes('Yes') ? '#0891b2' : '#64748b'
                    }}>
                      {p.coldChainReady}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#d97706', fontWeight: 600 }}>{p.rating}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      padding: '4px 9px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: p.status === 'Primary' ? '#dcfce7' : '#f1f5f9',
                      color: p.status === 'Primary' ? '#15803d' : '#334155'
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
