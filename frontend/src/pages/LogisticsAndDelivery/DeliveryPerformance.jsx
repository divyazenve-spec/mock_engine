import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function DeliveryPerformance() {
  const topRiders = [
    { rank: 1, name: 'Rohan Deshmukh', vehicleId: 'EV-BLR-04', hub: 'Indiranagar Hub', deliveries: '448 Drops', onTime: '99.6%', avgSpeed: '27.4 km/h', csat: '4.98 / 5', badge: 'Diamond Speedstar' },
    { rank: 2, name: 'Suresh Kumar', vehicleId: 'EV-BLR-11', hub: 'Koramangala Hub', deliveries: '432 Drops', onTime: '99.4%', avgSpeed: '26.8 km/h', csat: '4.96 / 5', badge: 'Gold Master Courier' },
    { rank: 3, name: 'Sachin Kadam', vehicleId: 'EV-BOM-08', hub: 'Bandra West Hub', deliveries: '416 Drops', onTime: '99.1%', avgSpeed: '25.2 km/h', csat: '4.95 / 5', badge: 'Cold-Chain Champion' },
    { rank: 4, name: 'Ajay Gowda', vehicleId: 'EV-BLR-23', hub: 'HSR Layout Hub', deliveries: '404 Drops', onTime: '98.9%', avgSpeed: '28.1 km/h', csat: '4.94 / 5', badge: 'Hyperlocal Ace' },
    { rank: 5, name: 'Vinod Nair', vehicleId: 'EV-BLR-19', hub: 'Whitefield Hub', deliveries: '392 Drops', onTime: '98.6%', avgSpeed: '29.0 km/h', csat: '4.92 / 5', badge: 'Zero Incident Star' },
    { rank: 6, name: 'Pradeep Singh', vehicleId: 'EV-DEL-31', hub: 'Saket Micro-Hub', deliveries: '388 Drops', onTime: '98.4%', avgSpeed: '27.5 km/h', csat: '4.91 / 5', badge: 'Capital Express' },
    { rank: 7, name: 'Ganesh More', vehicleId: 'EV-BOM-14', hub: 'Andheri West Hub', deliveries: '376 Drops', onTime: '98.2%', avgSpeed: '24.8 km/h', csat: '4.90 / 5', badge: 'Monsoon Hero' },
    { rank: 8, name: 'Manjunath R', vehicleId: 'EV-BLR-27', hub: 'JP Nagar Hub', deliveries: '364 Drops', onTime: '98.5%', avgSpeed: '26.2 km/h', csat: '4.89 / 5', badge: 'Precision Deliverer' },
    { rank: 9, name: 'Deepak Yadav', vehicleId: 'EV-DEL-42', hub: 'Gurugram Hub', deliveries: '352 Drops', onTime: '97.9%', avgSpeed: '28.8 km/h', csat: '4.88 / 5', badge: 'Speed Specialist' },
    { rank: 10, name: 'Farhan Akhtar', vehicleId: 'EV-HYD-06', hub: 'Jubilee Hills Hub', deliveries: '344 Drops', onTime: '98.3%', avgSpeed: '27.1 km/h', csat: '4.87 / 5', badge: 'Deccan Ace' }
  ];

  return (
    <DashboardLayout
      category="Logistics & Delivery"
      subcategory="Delivery Performance"
      title="Rider & Fleet Delivery Performance Scorecards"
      subtitle="Fulfillment efficiency rankings, doorstep customer satisfaction (CSAT), cold-chain compliance, and safety scorecards"
      icon="🏆"
      badge="Fleet Leaderboard"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Network CSAT Score" value="4.92 / 5" delta="Exceptional" trend="up" subtext="14,280 pet parent reviews" icon="⭐" />
        <KpiCard label="On-Time Delivery Rate" value="98.8%" delta="+0.6% MoM" trend="up" subtext="Across 76 EV couriers" icon="⏱️" />
        <KpiCard label="Avg Rider Velocity" value="26.8 km/h" delta="Optimal city pace" trend="up" subtext="No speed incidents" icon="⚡" />
        <KpiCard label="Cold-Chain Audit Pass" value="100.0%" delta="2-8°C Verified" trend="up" subtext="3,450 vaccine drops" icon="❄️" />
      </div>

      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Top Rider Leaderboard & Performance Scorecards</h3>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Monthly top performers based on on-time delivery rates, pet parent feedback, and cold-chain precision</p>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Rank</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Rider Name</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>EV Unit</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Base Hub</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Deliveries (MTD)</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>On-Time %</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Avg Speed</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Doorstep CSAT</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Achievement Badge</th>
              </tr>
            </thead>
            <tbody>
              {topRiders.map(r => (
                <tr key={r.rank} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 700, color: r.rank === 1 ? '#eab308' : r.rank === 2 ? '#94a3b8' : '#b45309' }}>
                    {r.rank === 1 ? '🥇' : r.rank === 2 ? '🥈' : r.rank === 3 ? '🥉' : '#' + r.rank}
                  </td>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#0f172a' }}>{r.name}</td>
                  <td style={{ padding: '12px 16px', color: '#0284c7', fontFamily: '"IBM Plex Mono", monospace' }}>{r.vehicleId}</td>
                  <td style={{ padding: '12px 16px', color: '#475569' }}>{r.hub}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{r.deliveries}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', color: '#16a34a', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{r.onTime}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', color: '#334155' }}>{r.avgSpeed}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', color: '#d97706', fontWeight: 700 }}>{r.csat}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      padding: '4px 9px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: '#fef3c7',
                      color: '#b45309'
                    }}>
                      ⭐ {r.badge}
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
