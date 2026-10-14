import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function DeliveryTracking() {
  const activeStreams = [
    { trackerId: 'TRK-01', rider: 'Rohan Deshmukh (EV-04)', location: 'Indiranagar 100ft Rd, BLR', temp: '3.8°C', battery: '82%', eta: '7 mins' },
    { trackerId: 'TRK-02', rider: 'Suresh Kumar (EV-11)', location: 'Koramangala 4th Block, BLR', temp: 'Ambient', battery: '76%', eta: '12 mins' },
    { trackerId: 'TRK-03', rider: 'Sachin Kadam (EV-08)', location: 'Hill Road, Bandra West, BOM', temp: '4.2°C', battery: '89%', eta: '15 mins' },
    { trackerId: 'TRK-04', rider: 'Vinod Nair (EV-19)', location: 'ITPL Main Rd, Whitefield, BLR', temp: 'Ambient', battery: '64%', eta: '21 mins' },
    { trackerId: 'TRK-05', rider: 'Pradeep Singh (EV-31)', location: 'Saket District Centre, DEL', temp: 'Ambient', battery: '78%', eta: '9 mins' },
    { trackerId: 'TRK-06', rider: 'Ajay Gowda (EV-23)', location: '27th Main Rd, HSR Layout, BLR', temp: 'Ambient', battery: '91%', eta: '18 mins' },
    { trackerId: 'TRK-07', rider: 'Ganesh More (EV-14)', location: 'Lokhandwala Complex, BOM', temp: '3.6°C', battery: '71%', eta: '14 mins' },
    { trackerId: 'TRK-08', rider: 'Manjunath R (EV-27)', location: '15th Cross, JP Nagar, BLR', temp: 'Ambient', battery: '84%', eta: '25 mins' },
    { trackerId: 'TRK-09', rider: 'Deepak Yadav (EV-42)', location: 'DLF Phase 4, Gurugram', temp: 'Ambient', battery: '68%', eta: '19 mins' },
    { trackerId: 'TRK-10', rider: 'Farhan Akhtar (EV-06)', location: 'Jubilee Hills Checkpost, HYD', temp: '4.0°C', battery: '95%', eta: '11 mins' }
  ];

  return (
    <DashboardLayout
      category="Logistics & Delivery"
      subcategory="Delivery Tracking"
      title="Live GPS Fleet Telematics & Cold-Chain Tracking"
      subtitle="Real-time rider coordinates, digital cold-box temperature telemetry, EV battery state, and route milestones"
      icon="📍"
      badge="GPS & Telematics Live"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Live Tracked Riders" value="38 Active" delta="100% Signal lock" trend="up" subtext="Sub-second GPS updates" icon="📡" />
        <KpiCard label="Refrigerated Vaccines" value="14 Boxes" delta="2°C - 8°C Safe" trend="up" subtext="IoT Bluetooth sensors" icon="❄️" />
        <KpiCard label="Average Speed" value="26.8 km/h" delta="Optimal city pace" trend="up" subtext="Zero traffic infractions" icon="⚡" />
        <KpiCard label="Fleet EV Battery" value="74% Avg" delta="All above 30%" trend="up" subtext="Fast-swap stations ready" icon="🔋" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '16px' }}>
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
        }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Live Fleet GPS Stream</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Real-time geofence and route clustering across metros</p>
          </div>
          <div style={{
            height: '240px',
            background: 'linear-gradient(135deg, #0f172a, #1e293b)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#38bdf8',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ fontSize: '36px', marginBottom: '8px' }}>🗺️</div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#f8fafc' }}>Real-Time Geofence & Route Clustering</div>
            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>38 EV Riders transmitting telemetry across Bengaluru, Mumbai & Delhi-NCR</div>
            <div style={{
              position: 'absolute',
              bottom: '12px',
              left: '12px',
              background: 'rgba(15, 23, 42, 0.8)',
              padding: '4px 10px',
              borderRadius: '6px',
              border: '1px solid #334155',
              fontSize: '11px',
              color: '#34d399'
            }}>
              ● Live 1,000ms WebSocket Ping: OK
            </div>
          </div>
        </div>

        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
        }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Active Telematics Telemetry</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Current GPS waypoint, cold-box temp & destination ETA</p>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ background: '#f8fafc', color: '#64748b', fontSize: '11px', textTransform: 'uppercase' }}>
                  <th style={{ padding: '10px 14px', textAlign: 'left' }}>Rider</th>
                  <th style={{ padding: '10px 14px', textAlign: 'left' }}>Current Location</th>
                  <th style={{ padding: '10px 14px', textAlign: 'left' }}>Temp</th>
                  <th style={{ padding: '10px 14px', textAlign: 'left' }}>Battery</th>
                  <th style={{ padding: '10px 14px', textAlign: 'left' }}>ETA</th>
                </tr>
              </thead>
              <tbody>
                {activeStreams.map(s => (
                  <tr key={s.trackerId} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 14px', fontWeight: 600, color: '#0f172a' }}>{s.rider}</td>
                    <td style={{ padding: '12px 14px', color: '#475569' }}>{s.location}</td>
                    <td style={{ padding: '12px 14px' }}>
                      {s.temp !== 'Ambient' ? (
                        <span style={{ color: '#0891b2', fontWeight: 700 }}>❄️ {s.temp}</span>
                      ) : (
                        <span style={{ color: '#94a3b8' }}>Ambient</span>
                      )}
                    </td>
                    <td style={{ padding: '12px 14px', color: '#16a34a', fontWeight: 600 }}>{s.battery}</td>
                    <td style={{ padding: '12px 14px', color: '#2563eb', fontWeight: 700 }}>{s.eta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
