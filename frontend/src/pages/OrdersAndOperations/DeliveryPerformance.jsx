import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';
import { MOCK_ORDERS, ORDER_STATUS_COLORS } from './mockOrdersData';

export default function DeliveryPerformance() {
  const orders = MOCK_ORDERS;

  const deliveredOrders = orders.filter(o => o.status === 'Delivered');
  const onTimeCount = deliveredOrders.length;
  const onTimeRate = ((onTimeCount / deliveredOrders.length) * 100).toFixed(1);

  const carriers = [
    { name: 'Zenve Hyperlocal EV Fleet', orders: 6, onTime: '98.5%', avgMins: '36m', rating: '4.94' },
    { name: 'Bluedart Priority Healthcare', orders: 2, onTime: '96.2%', avgMins: '4.1h', rating: '4.88' },
    { name: 'In-Clinic Direct Handover', orders: 1, onTime: '100%', avgMins: 'Immediate', rating: '4.98' },
    { name: 'Zenve Reverse Logistics Fleet', orders: 1, onTime: '94.0%', avgMins: '82m', rating: '4.91' }
  ];

  return (
    <DashboardLayout
      category="Orders & Operations"
      subcategory="Delivery Performance"
      title="Fleet & Carrier Delivery Performance"
      subtitle="Carrier partner SLAs, on-time delivery benchmarks, rider scorecard, and transit telematics"
      icon="🚚"
      badge="Performance"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="On-Time Delivery Rate" value={`${onTimeRate}%`} delta="+1.8% vs last week" trend="up" subtext="3 of 3 delivered on-time" icon="🎯" />
        <KpiCard label="Avg Express SLA" value="38 mins" delta="-22 mins vs 60m SLA" trend="up" subtext="Hyperlocal rapid fleet" icon="⚡" />
        <KpiCard label="Active Fleet Riders" value="10 Riders" delta="100% EV scooters" trend="neutral" subtext="Zero emission deliveries" icon="🛵" />
        <KpiCard label="First-Attempt Success" value="100.0%" delta="Zero doorstep failures" trend="up" subtext="Doorstep OTP verified" icon="✅" />
      </div>

      {/* Carrier scorecard */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Carrier Partner Scorecard</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
              <th style={{ padding: '10px 14px', fontWeight: 600 }}>CARRIER PARTNER</th>
              <th style={{ padding: '10px 14px', fontWeight: 600, textAlign: 'center' }}>ALLOCATED ORDERS</th>
              <th style={{ padding: '10px 14px', fontWeight: 600, textAlign: 'center' }}>ON-TIME SLA</th>
              <th style={{ padding: '10px 14px', fontWeight: 600, textAlign: 'center' }}>AVG TRANSIT TIME</th>
              <th style={{ padding: '10px 14px', fontWeight: 600, textAlign: 'right' }}>RIDER RATING</th>
            </tr>
          </thead>
          <tbody>
            {carriers.map(c => (
              <tr key={c.name} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '12px 14px', fontWeight: 600, color: '#0f172a' }}>{c.name}</td>
                <td style={{ padding: '12px 14px', textAlign: 'center', color: '#475569' }}>{c.orders} Orders</td>
                <td style={{ padding: '12px 14px', textAlign: 'center', fontWeight: 700, color: '#059669' }}>{c.onTime}</td>
                <td style={{ padding: '12px 14px', textAlign: 'center', color: '#334155' }}>⚡ {c.avgMins}</td>
                <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: 700, color: '#d97706' }}>★ {c.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Manifest of 10 orders with rider telematics */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Order Dispatch & Rider Telematics</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                <th style={{ padding: '10px 14px', fontWeight: 600 }}>ORDER ID</th>
                <th style={{ padding: '10px 14px', fontWeight: 600 }}>CUSTOMER & ADDRESS</th>
                <th style={{ padding: '10px 14px', fontWeight: 600 }}>ASSIGNED RIDER & VEHICLE</th>
                <th style={{ padding: '10px 14px', fontWeight: 600 }}>DELIVERY SLA TIER</th>
                <th style={{ padding: '10px 14px', fontWeight: 600, textAlign: 'center' }}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(o => {
                const style = ORDER_STATUS_COLORS[o.status] || { bg: '#f1f5f9', color: '#475569', border: '#e2e8f0' };
                return (
                  <tr key={o.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 14px', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{o.id}</td>
                    <td style={{ padding: '12px 14px' }}>
                      <div style={{ fontWeight: 600, color: '#0f172a' }}>{o.customer}</div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>{o.address}</div>
                    </td>
                    <td style={{ padding: '12px 14px', color: '#334155' }}>
                      <div style={{ fontWeight: 600 }}>{o.rider}</div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>Carrier: {o.carrier}</div>
                    </td>
                    <td style={{ padding: '12px 14px', color: '#475569' }}>
                      <span style={{ fontWeight: 600 }}>⚡ {o.speed}</span>
                      <div style={{ fontSize: '11px', color: '#059669' }}>{o.sla}</div>
                    </td>
                    <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: '99px',
                        background: style.bg,
                        color: style.color,
                        border: `1px solid ${style.border}`,
                        fontWeight: 600,
                        fontSize: '11px'
                      }}>{o.status}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
