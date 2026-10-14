import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function SixtyMinuteDelivery() {
  const hubMetrics = [
    { hub: 'Indiranagar Micro-Hub', city: 'Bengaluru', orders60m: '84 Orders', avgFulfillment: '24 mins', dispatchTime: '4.2 mins', breachCount: 0, slaCompliance: '99.6%', peakCapacity: '12 EVs' },
    { hub: 'Koramangala 24x7 Hub', city: 'Bengaluru', orders60m: '96 Orders', avgFulfillment: '26 mins', dispatchTime: '4.8 mins', breachCount: 1, slaCompliance: '99.0%', peakCapacity: '14 EVs' },
    { hub: 'Bandra West Micro-Hub', city: 'Mumbai', orders60m: '72 Orders', avgFulfillment: '29 mins', dispatchTime: '5.1 mins', breachCount: 1, slaCompliance: '98.6%', peakCapacity: '10 EVs' },
    { hub: 'HSR Layout Hub', city: 'Bengaluru', orders60m: '58 Orders', avgFulfillment: '27 mins', dispatchTime: '4.5 mins', breachCount: 0, slaCompliance: '99.4%', peakCapacity: '8 EVs' },
    { hub: 'Whitefield Care Hub', city: 'Bengaluru', orders60m: '52 Orders', avgFulfillment: '32 mins', dispatchTime: '5.4 mins', breachCount: 2, slaCompliance: '97.8%', peakCapacity: '8 EVs' },
    { hub: 'Andheri West Hub', city: 'Mumbai', orders60m: '64 Orders', avgFulfillment: '31 mins', dispatchTime: '5.2 mins', breachCount: 1, slaCompliance: '98.4%', peakCapacity: '9 EVs' },
    { hub: 'Saket Care Micro-Hub', city: 'Delhi-NCR', orders60m: '48 Orders', avgFulfillment: '34 mins', dispatchTime: '5.6 mins', breachCount: 2, slaCompliance: '97.2%', peakCapacity: '7 EVs' },
    { hub: 'JP Nagar Hub', city: 'Bengaluru', orders60m: '42 Orders', avgFulfillment: '28 mins', dispatchTime: '4.6 mins', breachCount: 0, slaCompliance: '99.2%', peakCapacity: '6 EVs' },
    { hub: 'Gurugram DLF Hub', city: 'Delhi-NCR', orders60m: '38 Orders', avgFulfillment: '33 mins', dispatchTime: '5.3 mins', breachCount: 1, slaCompliance: '97.9%', peakCapacity: '6 EVs' },
    { hub: 'Jubilee Hills Hub', city: 'Hyderabad', orders60m: '36 Orders', avgFulfillment: '29 mins', dispatchTime: '4.9 mins', breachCount: 0, slaCompliance: '99.1%', peakCapacity: '5 EVs' }
  ];

  return (
    <DashboardLayout
      category="Logistics & Delivery"
      subcategory="60-Minute Delivery"
      title="Hyperlocal 60-Minute Rapid Delivery SLA"
      subtitle="Guaranteed sub-60 minute order-to-doorstep dispatch for critical pet medications, diets, and emergency supplies"
      icon="⚡"
      badge="Express SLA Benchmark"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Avg Doorstep Time" value="28.4 mins" delta="-3.2m vs SLA" trend="up" subtext="Benchmark < 60m" icon="⏱️" />
        <KpiCard label="Rapid SLA Compliance" value="98.8%" delta="+0.6% MoM" trend="up" subtext="Across 10 urban hubs" icon="⚡" />
        <KpiCard label="Pick & Pack Velocity" value="4.9 mins" delta="-0.8m faster" trend="up" subtext="Darkstore barcode binning" icon="📦" />
        <KpiCard label="60-Min Volume" value="8,820 Orders" delta="61% of total" trend="up" subtext="Monthly express dispatches" icon="🚀" />
      </div>

      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Micro-Hub 60-Minute Performance Benchmark</h3>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Fulfillment velocity, dark store packing times, and breach prevention across urban micro-hubs</p>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Hub Location</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>City</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>60M Orders</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Avg Doorstep Time</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Pack Time</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Breaches</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>SLA Compliance</th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Active EV Pool</th>
              </tr>
            </thead>
            <tbody>
              {hubMetrics.map(h => (
                <tr key={h.hub} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#0f172a' }}>{h.hub}</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>{h.city}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{h.orders60m}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', color: '#2563eb', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{h.avgFulfillment}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', color: '#475569', fontFamily: '"IBM Plex Mono", monospace' }}>{h.dispatchTime}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', color: h.breachCount > 1 ? '#dc2626' : '#64748b', fontWeight: 600 }}>{h.breachCount}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', color: '#16a34a', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{h.slaCompliance}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: '#0284c7', fontWeight: 600 }}>{h.peakCapacity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
