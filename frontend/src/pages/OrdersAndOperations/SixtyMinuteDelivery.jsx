import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';
import { MOCK_ORDERS, ORDER_STATUS_COLORS } from './mockOrdersData';

export default function SixtyMinuteDelivery() {
  const expressOrders = MOCK_ORDERS.filter(o => o.speed === '60-Min Express');
  const deliveredExpress = expressOrders.filter(o => o.status === 'Delivered');
  const inTransitExpress = expressOrders.filter(o => o.status === 'Out for Delivery');

  return (
    <DashboardLayout
      category="Orders & Operations"
      subcategory="60-Minute Delivery"
      title="60-Minute Rapid Delivery Command Center"
      subtitle="Hyperlocal dark store dispatch, countdown SLA monitoring, EV fleet live routing, and doorstep fulfillment"
      icon="⚡"
      badge="Hyperlocal SLA"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="60-Min Rapid Orders" value={`${expressOrders.length} Orders`} delta="40% of all orders" trend="up" subtext="Ultra-fast delivery tier" icon="⚡" />
        <KpiCard label="Average Delivery TAT" value="38 mins" delta="-22 mins under SLA" trend="up" subtext="Dark store pick & pack" icon="⏱️" />
        <KpiCard label="Live In-Transit SLA" value={`${inTransitExpress.length} Order`} delta="18m remaining" trend="neutral" subtext="ORD-9019 on route" icon="🛵" />
        <KpiCard label="On-Time Delivery SLA" value="100.0%" delta="Zero SLA breaches" trend="up" subtext="Doorstep OTP verified" icon="🎯" />
      </div>

      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>60-Minute Express Dispatch Stream</h3>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#64748b' }}>Live order tracking, dark store origins, and rider SLA countdowns</p>
          </div>
          <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', background: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe' }}>
            {expressOrders.length} Express Orders Tracked
          </span>
        </div>

        <div style={{ display: 'grid', gap: '12px' }}>
          {expressOrders.map(o => {
            const style = ORDER_STATUS_COLORS[o.status] || { bg: '#f1f5f9', color: '#475569', border: '#e2e8f0' };
            return (
              <div
                key={o.id}
                style={{
                  padding: '16px',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  background: o.status === 'Out for Delivery' ? '#eff6ff' : '#f8fafc',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace', fontSize: '14px', color: '#0f172a' }}>{o.id}</span>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '99px',
                      background: style.bg,
                      color: style.color,
                      border: `1px solid ${style.border}`,
                      fontWeight: 600,
                      fontSize: '11px'
                    }}>{o.status}</span>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>{o.city} · {o.hub}</span>
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>
                    {o.customer} ({o.pet})
                  </div>
                  <div style={{ fontSize: '12px', color: '#475569', marginTop: '2px' }}>
                    {o.items}
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
                    🛵 <strong>Rider:</strong> {o.rider} | <strong>Carrier:</strong> {o.carrier}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>{o.amountFormatted}</div>
                  <div style={{
                    marginTop: '4px',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: o.status === 'Delivered' ? '#059669' : o.status === 'Cancelled' ? '#64748b' : '#2563eb'
                  }}>
                    ⚡ {o.sla}
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                    Ordered at {o.date.split(' ')[1]} {o.date.split(' ')[2]}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
