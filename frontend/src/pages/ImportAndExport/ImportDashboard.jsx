import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ImportDashboard() {
  const [filter, setFilter] = useState('ALL');

  const shipments = [
    { bl: 'BL-DE-99214', origin: 'Germany', product: 'Veterinary Monoclonal Antibodies & Antigens', port: 'Nhava Sheva (JNPT)', value: '₹84,50,000', customs: 'Customs Cleared (RMS)', eta: '12 Oct 2026', status: 'Received' },
    { bl: 'AWB-US-48102', origin: 'United States', product: 'Canine Rabies & Core Vaccines (Cold-Chain 2-8°C)', port: 'BLR Air Cargo Hub', value: '₹62,00,000', customs: 'CDSCO NOC Approved', eta: '14 Oct 2026', status: 'In Transit' },
    { bl: 'BL-NL-33109', origin: 'Netherlands', product: 'Bovine Synthetic Hormones & Somatotropins', port: 'Chennai Port', value: '₹48,20,000', customs: 'Duty Paid - Out of Charge', eta: '10 Oct 2026', status: 'Received' },
    { bl: 'AWB-FR-77120', origin: 'France', product: 'Veterinary Dental Scaling Ultrasonic Systems', port: 'BOM Air Cargo Complex', value: '₹39,80,000', customs: 'In Assessment (Icegate)', eta: '16 Oct 2026', status: 'In Customs' },
    { bl: 'BL-JP-19044', origin: 'Japan', product: 'Digital Radiography DR Flat Panels & Sensor Heads', port: 'Nhava Sheva (JNPT)', value: '₹92,40,000', customs: 'Customs Cleared', eta: '08 Oct 2026', status: 'Received' },
    { bl: 'AWB-CH-66231', origin: 'Switzerland', product: 'Cardiology Inotropic Chewables & Vetmedin', port: 'DEL Air Cargo Hub', value: '₹34,10,000', customs: 'AQCS Quarantine Clearance', eta: '15 Oct 2026', status: 'In Transit' },
    { bl: 'BL-DK-55102', origin: 'Denmark', product: 'Canine Recombinant Insulin & Glucose Monitors', port: 'Chennai Port', value: '₹53,90,000', customs: 'Under Examination', eta: '17 Oct 2026', status: 'In Customs' },
    { bl: 'AWB-AU-82910', origin: 'Australia', product: 'Injectable NSAIDs & Flunixin Meglumine', port: 'HYD Air Cargo Hub', value: '₹27,60,000', customs: 'Duty Debited via Icegate', eta: '11 Oct 2026', status: 'Received' },
    { bl: 'BL-UK-40291', origin: 'United Kingdom', product: 'Veterinary Ophthalmic Micro-Surgical Sets', port: 'Nhava Sheva (JNPT)', value: '₹21,80,000', customs: 'RMS Facilitation Approved', eta: '18 Oct 2026', status: 'In Transit' },
    { bl: 'AWB-IT-11928', origin: 'Italy', product: 'MyLab Equine Color Doppler Ultrasound Units', port: 'BLR Air Cargo Hub', value: '₹58,00,000', customs: 'Under Inspection (Sec 47)', eta: '19 Oct 2026', status: 'In Customs' }
  ];

  const filtered = filter === 'ALL' ? shipments : shipments.filter(s => s.status.toLowerCase().includes(filter.toLowerCase()));

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Import & Export"
      subcategory="Import Dashboard"
      title="Global Import Logistics & Cross-Border Supply"
      subtitle="International procurement manifests, ocean & air cargo shipments, CDSCO veterinary drug clearance, and customs duty tracking"
      icon="🌐"
      badge="10"
      actions={
        <button onClick={() => alert('New Import Shipment Manifest filing opened...')} style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #0891b2', background: 'rgba(8,145,178,0.12)', color: '#0e7490', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
          + New Import Consignment
        </button>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Import Procurement (MTD)" value="₹4.82 Cr" delta="+18.4% YoY" trend="up" subtext="CIF Valuation (Invoiced)" icon="🚢" />
        <KpiCard label="Avg Customs Clearance Time" value="1.4 Days" delta="-0.6 days" trend="up" subtext="Advance BE filing" icon="⚡" />
        <KpiCard label="Cold-Chain Sea Reefers" value="6 Containers" delta="100% in-range" trend="up" subtext="IoT GPS Telemetry" icon="❄️" />
        <KpiCard label="Customs Duty & IGST Paid" value="₹68.4 L" delta="Tariff 3002/3004" trend="neutral" subtext="Auto-debited via ICEGATE" icon="🏛️" />
        <KpiCard label="CDSCO / Animal Quarantine NOC" value="100%" delta="Zero holds" trend="up" subtext="Veterinary import permit" icon="🛡️" />
        <KpiCard label="International Suppliers" value="10 Global Partners" delta="Direct OEMs" trend="up" subtext="Exclusive distribution" icon="🌍" />
      </div>

      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>🌐 Active Inbound Import Consignments & Clearances ({filtered.length} records)</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Bill of Lading / Airway Bill status, port of entry, and customs clearance milestones</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['ALL', 'Received', 'In Customs', 'Transit'].map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                style={{
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: '1px solid ' + (filter === s ? '#0891b2' : 'var(--border, #cbd5e1)'),
                  background: filter === s ? 'rgba(8,145,178,0.1)' : 'transparent',
                  color: filter === s ? '#0e7490' : 'var(--muted-foreground, #64748b)',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)' }}>
                <th style={{ padding: '10px 12px' }}>B/L or AWB #</th>
                <th style={{ padding: '10px 12px' }}>Origin Country</th>
                <th style={{ padding: '10px 12px' }}>Consignment Description</th>
                <th style={{ padding: '10px 12px' }}>Port of Entry</th>
                <th style={{ padding: '10px 12px' }}>CIF Value</th>
                <th style={{ padding: '10px 12px' }}>Customs Status</th>
                <th style={{ padding: '10px 12px' }}>ETA / Delivery</th>
                <th style={{ padding: '10px 12px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: '24px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                    No import consignment records found
                  </td>
                </tr>
              ) : (
                filtered.map(s => (
                  <tr key={s.bl} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                    <td style={{ padding: '12px', fontFamily: 'monospace', fontWeight: 600 }}>{s.bl}</td>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{s.origin}</td>
                    <td style={{ padding: '12px' }}>{s.product}</td>
                    <td style={{ padding: '12px' }}>{s.port}</td>
                    <td style={{ padding: '12px', fontWeight: 600, color: '#059669' }}>{s.value}</td>
                    <td style={{ padding: '12px' }}>{s.customs}</td>
                    <td style={{ padding: '12px' }}>{s.eta}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: '999px',
                        fontSize: '10px',
                        fontWeight: 600,
                        background: s.status === 'Received' ? 'rgba(16,185,129,0.12)' : s.status === 'In Customs' ? 'rgba(245,158,11,0.14)' : 'rgba(8,145,178,0.12)',
                        color: s.status === 'Received' ? '#059669' : s.status === 'In Customs' ? '#d97706' : '#0e7490'
                      }}>
                        {s.status}
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
