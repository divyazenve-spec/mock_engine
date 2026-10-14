import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function FailedDeliveries() {
  const [search, setSearch] = useState('');

  const rootCauses = [
    { cause: 'Customer Unavailable / Door Locked', incidents: 38, pct: '44.2%', avgResolution: 'Automated IVR + 15m wait timer + Neighbor drop', rtoImpact: '0.1% RTO' },
    { cause: 'Incorrect / Incomplete Street Address', incidents: 16, pct: '18.6%', avgResolution: 'WhatsApp live GPS pin sharing + Map update', rtoImpact: '0.2% RTO' },
    { cause: 'Customer Requested Reschedule', incidents: 12, pct: '14.0%', avgResolution: 'One-click evening slot lock via app push', rtoImpact: '0.0% RTO' },
    { cause: 'Gated Community / Security Access Delay', incidents: 7, pct: '8.1%', avgResolution: 'Digital visitor pre-authorization token (MyGate)', rtoImpact: '0.0% RTO' },
    { cause: 'Heavy Rain / Flash Waterlogging', incidents: 5, pct: '5.8%', avgResolution: 'Alternative waterproof pod dispatch + Surge SLA banner', rtoImpact: '0.0% RTO' },
    { cause: 'OTP Verification Delay at Doorstep', incidents: 3, pct: '3.5%', avgResolution: 'Fallback SMS OTP + Call verification backup', rtoImpact: '0.0% RTO' },
    { cause: 'Pet Parent Emergency Vet Transit', incidents: 2, pct: '2.3%', avgResolution: 'Rerouted directly to clinic emergency reception desk', rtoImpact: '0.0% RTO' },
    { cause: 'Customer Cancelled at Doorstep', incidents: 1, pct: '1.2%', avgResolution: 'Reverse pickup to micro-hub cold-chain within 20m', rtoImpact: '100% RTO' },
    { cause: 'Rider EV Flat Tyre / Mechanical', incidents: 1, pct: '1.2%', avgResolution: 'Immediate secondary rider handover via SOS telematics', rtoImpact: '0.0% RTO' },
    { cause: 'Cold-Box Seal Sensor Trigger (Precautionary)', incidents: 1, pct: '1.2%', avgResolution: 'Automatic rejection and instant fresh batch dispatch', rtoImpact: '0.0% Spoilage' }
  ];

  const recentIncidents = [
    { ticketId: 'NDR-401', orderId: 'ORD-9290', customer: 'Pooja Varma', pet: 'Ginger (Cat)', hub: 'Gurugram DLF Hub', reason: 'Customer Unavailable / Door Locked', action: 'WhatsApp Slot Selector Triggered', time: '14 mins ago', status: 'Re-attempt Scheduled' },
    { ticketId: 'NDR-402', orderId: 'ORD-9278', customer: 'Rohan Mehta', pet: 'Baron (Rottweiler)', hub: 'Indiranagar Hub', reason: 'Security Gate Entry Delay', action: 'Digital Pre-Auth Token Sent', time: '38 mins ago', status: 'Delivered to Guard' },
    { ticketId: 'NDR-403', orderId: 'ORD-9265', customer: 'Sneha Patel', pet: 'Simba (Golden Retriever)', hub: 'Bandra West Hub', reason: 'Incorrect Address / Road Digging', action: 'GPS Pin Shared via WhatsApp', time: '1.2 hrs ago', status: 'Delivered (Doorstep)' },
    { ticketId: 'NDR-404', orderId: 'ORD-9252', customer: 'Kunal Kapoor', pet: 'Oreo (Frenchie)', hub: 'Whitefield Hub', reason: 'Heavy Waterlogging on Varthur Rd', action: 'Re-routed via HAL Main Rd', time: '2.1 hrs ago', status: 'Delivered (Doorstep)' },
    { ticketId: 'NDR-405', orderId: 'ORD-9240', customer: 'Dr. Anita Desai', pet: 'Milo (Labrador)', hub: 'Koramangala Hub', reason: 'Doorstep Reschedule Requested', action: 'Evening 7:00 PM Slot Locked', time: '3.4 hrs ago', status: 'Scheduled (Evening)' },
    { ticketId: 'NDR-406', orderId: 'ORD-9231', customer: 'Arvind Swamy', pet: 'Leo (Shih Tzu)', hub: 'Andheri West Hub', reason: 'SMS OTP Not Delivered', action: 'Voice Call OTP Verification', time: '4.0 hrs ago', status: 'Delivered (Doorstep)' },
    { ticketId: 'NDR-407', orderId: 'ORD-9218', customer: 'Kavita Menon', pet: 'Bella (Beagle)', hub: 'Saket Micro-Hub', reason: 'Emergency Vet Transit', action: 'Re-routed to Saket Pet Hospital', time: '5.2 hrs ago', status: 'Delivered to Clinic' },
    { ticketId: 'NDR-408', orderId: 'ORD-9204', customer: 'Farhan Zaidi', pet: 'Rocky (Husky)', hub: 'JP Nagar Hub', reason: 'Rider EV Flat Tyre', action: 'Secondary EV Handover (7 mins)', time: '6.0 hrs ago', status: 'Delivered (Doorstep)' },
    { ticketId: 'NDR-409', orderId: 'ORD-9192', customer: 'Deepak Chopra', pet: 'Zoe (Dachshund)', hub: 'Jubilee Hills Hub', reason: 'Customer Cancelled Order', action: 'Immediate Cold Box Hub Return', time: '7.5 hrs ago', status: 'Returned to Origin' },
    { ticketId: 'NDR-410', orderId: 'ORD-9180', customer: 'Priya Nambiar', pet: 'Thor (Great Dane)', hub: 'HSR Layout Hub', reason: 'Precautionary Cold-Box Seal Trigger', action: 'Fresh Vaccine Batch Re-dispatched', time: '8.2 hrs ago', status: 'Re-dispatched & Safe' }
  ];

  const filteredCauses = rootCauses.filter(r => {
    if (search) {
      const q = search.toLowerCase();
      return r.cause.toLowerCase().includes(q) || r.avgResolution.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <DashboardLayout
      category="Logistics & Delivery"
      subcategory="Failed Deliveries"
      title="Non-Delivery Reports (NDR) & Failed Delivery Analytics"
      subtitle="Failed first-attempt analysis, doorstep reachability, Return to Origin (RTO) prevention, and recovery velocity"
      icon="⚠️"
      badge="NDR Analytics"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Failed Attempt Rate" value="0.8%" delta="-0.3% MoM" trend="up" subtext="Benchmark: 3.5%" icon="🎯" />
        <KpiCard label="NDR Recovery Rate" value="94.8%" delta="+2.1% MoM" trend="up" subtext="Re-delivered on same day" icon="🔄" />
        <KpiCard label="Return to Origin (RTO)" value="0.08%" delta="Ultra-low" trend="up" subtext="Only 21 orders / mo" icon="📦" />
        <KpiCard label="Avg Re-attempt Speed" value="42 mins" delta="Same day loop" trend="up" subtext="Automated WhatsApp bot" icon="⚡" />
      </div>

      {/* Root Cause Diagnostics Table */}
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
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Failed Delivery Root Cause Diagnostics (10 Exception Types)</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Breakdown of 86 delivery exceptions recorded across 10,800 monthly dispatches</p>
          </div>
          <input
            type="text"
            placeholder="Search failure cause..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', minWidth: '200px' }}
          />
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Failure Root Cause</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Incidents</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>% of Failures</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Automated SOP & Resolution</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>RTO Impact</th>
              </tr>
            </thead>
            <tbody>
              {filteredCauses.map(r => (
                <tr key={r.cause} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>{r.cause}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: 'monospace', color: '#dc2626', fontWeight: 700 }}>{r.incidents}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: 'monospace', fontWeight: 600 }}>{r.pct}</td>
                  <td style={{ padding: '12px 16px', color: '#475569', fontSize: '11px' }}>{r.avgResolution}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, background: r.rtoImpact.indexOf('100%') >= 0 ? '#fee2e2' : '#dcfce7', color: r.rtoImpact.indexOf('100%') >= 0 ? '#dc2626' : '#16a34a' }}>
                      {r.rtoImpact}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Live NDR Incident Log Table */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Recent Non-Delivery Reports (NDR) Live Incident Log (Top 10)</h3>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Real-time exception resolutions and automated customer recovery workflows</p>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Ticket ID</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Order ID</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Customer & Pet</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Hub Location</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Exception Reason</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Automated Action</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Time</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentIncidents.map(inc => (
                <tr key={inc.ticketId} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#dc2626', fontWeight: 700 }}>{inc.ticketId}</td>
                  <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#2563eb', fontWeight: 600 }}>{inc.orderId}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ fontWeight: 600, color: '#0f172a' }}>{inc.customer}</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>{inc.pet}</div>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#475569' }}>{inc.hub}</td>
                  <td style={{ padding: '12px 16px', color: '#dc2626', fontWeight: 600, fontSize: '11px' }}>{inc.reason}</td>
                  <td style={{ padding: '12px 16px', color: '#16a34a', fontSize: '11px', fontWeight: 600 }}>{inc.action}</td>
                  <td style={{ padding: '12px 16px', color: '#64748b', fontSize: '11px' }}>{inc.time}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, background: inc.status.indexOf('Delivered') >= 0 ? '#dcfce7' : inc.status.indexOf('Scheduled') >= 0 ? '#e0f2fe' : '#fee2e2', color: inc.status.indexOf('Delivered') >= 0 ? '#16a34a' : inc.status.indexOf('Scheduled') >= 0 ? '#0284c7' : '#dc2626' }}>
                      {inc.status}
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
