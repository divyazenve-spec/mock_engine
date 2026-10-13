import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function TradeLogistics() {
  const legs = [
    { track: 'COR-EU-IN-01', route: 'Hamburg -> Nhava Sheva (JNPT)', carrier: 'Maersk Line (MV Madrid Maersk)', mode: 'Ocean Reefer 40ft', temp: '4.2°C (Optimal 2-8°C)', transitTime: '18 Days', currentLoc: 'Arabian Sea (18.9°N, 72.8°E)', status: 'In Transit' },
    { track: 'COR-US-IN-02', route: 'Chicago ORD -> Bengaluru BLR', carrier: 'Lufthansa Cargo (LH 8220)', mode: 'Air Cold-Chain Pallet', temp: '3.8°C (Optimal 2-8°C)', transitTime: '22 Hours', currentLoc: 'BLR Cold Storage Terminal', status: 'Arrived & Cleared' },
    { track: 'COR-NL-IN-03', route: 'Rotterdam -> Chennai Port', carrier: 'MSC Mediterranean (MSC Oscar)', mode: 'Ocean Dry Container 20ft', temp: 'Ambient (21.4°C)', transitTime: '21 Days', currentLoc: 'Bay of Bengal (Port Approach)', status: 'Berthing Scheduled' },
    { track: 'COR-FR-IN-04', route: 'Paris CDG -> Mumbai BOM', carrier: 'Air France Cargo (AF 6734)', mode: 'Air Express Cargo', temp: 'Ambient (20.1°C)', transitTime: '14 Hours', currentLoc: 'BOM Air Cargo Vault', status: 'In Inspection Yard' },
    { track: 'COR-JP-IN-05', route: 'Yokohama -> JNPT Nhava Sheva', carrier: 'ONE Ocean Network (ONE Apus)', mode: 'High-Cube 40ft Flat-Rack', temp: 'Controlled Ambient', transitTime: '14 Days', currentLoc: 'JNPT Dedicated Corridor', status: 'Customs Clearance Gate' },
    { track: 'COR-IN-ME-06', route: 'Mumbai BOM -> Dubai DXB', carrier: 'Emirates SkyCargo (EK 505)', mode: 'Air Freight Envirotainer', temp: '4.5°C (Validated)', transitTime: '3.5 Hours', currentLoc: 'Dubai DWC Logistics Park', status: 'Delivered' },
    { track: 'COR-IN-SG-07', route: 'Chennai MAA -> Singapore SIN', carrier: 'Singapore Airlines Cargo (SQ 7287)', mode: 'Air Cargo Container (LD3)', temp: 'Ambient (22.0°C)', transitTime: '4.2 Hours', currentLoc: 'Changi Airport Cargo Complex', status: 'Delivered' },
    { track: 'COR-IN-UK-08', route: 'Nhava Sheva -> Southampton', carrier: 'CMA CGM (MV Palais Royal)', mode: 'Ocean Container 40ft', temp: 'Ambient (19.5°C)', transitTime: '24 Days', currentLoc: 'Suez Canal Transit (Port Said)', status: 'In Maritime Transit' },
    { track: 'COR-IN-AU-09', route: 'BLR Bengaluru -> Sydney SYD', carrier: 'Qantas Freight (QF 7552)', mode: 'Air Heavy Cargo Pallet', temp: 'Controlled (18.0°C)', transitTime: '16 Hours', currentLoc: 'Sydney Kingsford Smith Hub', status: 'In Transit' },
    { track: 'COR-IN-QA-10', route: 'Mumbai BOM -> Doha DOH', carrier: 'Qatar Airways Cargo (QR 8411)', mode: 'Air Temperature Controlled', temp: '3.9°C (Continuous Log)', transitTime: '3.8 Hours', currentLoc: 'Hamad International Cargo Hub', status: 'Delivered' }
  ];

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Import & Export"
      subcategory="Logistics"
      title="International Ocean, Air & Reefer Multimodal Corridors"
      subtitle="Cross-border freight forwarding, maritime vessel telemetry, cold-chain flight routes, and container yard milestones"
      icon="🚢"
      badge="10"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Active Global Freight Corridors" value="10 Multi-modal Legs" delta="Ocean & Air Freight" trend="up" subtext="Direct OEM routing" icon="🚢" />
        <KpiCard label="Cold-Chain Marine IoT" value="100% In-Range" delta="Zero excursions" trend="up" subtext="Continuous thermal logs" icon="❄️" />
        <KpiCard label="Freight Cost per Kg" value="₹184 / kg" delta="-12.4% cost savings" trend="up" subtext="Annual volume contracted" icon="💰" />
        <KpiCard label="Average Port Clearance" value="18 Hours" delta="Direct Port Delivery" trend="up" subtext="Direct Port Delivery (DPD)" icon="⚡" />
      </div>

      <div style={card}>
        <h3 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Live Cross-Border Freight Telematics & Movement ({legs.length} records)</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Vessel tracking, air cargo waybills, in-transit temperatures, and port milestone progress</p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)' }}>
                <th style={{ padding: '10px 12px' }}>Corridor Code</th>
                <th style={{ padding: '10px 12px' }}>Trade Route</th>
                <th style={{ padding: '10px 12px' }}>Carrier & Vessel/Flight</th>
                <th style={{ padding: '10px 12px' }}>Transport Mode</th>
                <th style={{ padding: '10px 12px' }}>Temperature Telemetry</th>
                <th style={{ padding: '10px 12px' }}>Transit Duration</th>
                <th style={{ padding: '10px 12px' }}>Current Geo Location</th>
                <th style={{ padding: '10px 12px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {legs.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: '24px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                    No active multimodal freight corridors found
                  </td>
                </tr>
              ) : (
                legs.map(l => (
                  <tr key={l.track} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                    <td style={{ padding: '12px', fontFamily: 'monospace', fontWeight: 600 }}>{l.track}</td>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{l.route}</td>
                    <td style={{ padding: '12px' }}>{l.carrier}</td>
                    <td style={{ padding: '12px' }}>{l.mode}</td>
                    <td style={{ padding: '12px', color: '#0891b2', fontWeight: 600 }}>{l.temp}</td>
                    <td style={{ padding: '12px' }}>{l.transitTime}</td>
                    <td style={{ padding: '12px' }}>{l.currentLoc}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: '999px',
                        fontSize: '10px',
                        fontWeight: 600,
                        background: l.status === 'Delivered' || l.status.includes('Cleared') ? 'rgba(16,185,129,0.12)' : l.status.includes('Transit') ? 'rgba(8,145,178,0.12)' : 'rgba(245,158,11,0.14)',
                        color: l.status === 'Delivered' || l.status.includes('Cleared') ? '#059669' : l.status.includes('Transit') ? '#0e7490' : '#d97706'
                      }}>
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
