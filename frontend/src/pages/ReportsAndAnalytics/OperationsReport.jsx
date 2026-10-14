import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function OperationsReport() {
  const [toast, setToast] = useState('');

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const hubs = [
    { hub: 'Indiranagar Express Hub (BLR)', city: 'Bengaluru', orders: '4,280', onTimeRate: '98.8%', avgDispatchMins: '7.8 mins', riderCount: '32 Riders', deliveryCostPerOrder: '₹38.50', returnsPct: '0.6%' },
    { hub: 'Koramangala Dark Store (BLR)', city: 'Bengaluru', orders: '3,840', onTimeRate: '98.2%', avgDispatchMins: '8.2 mins', riderCount: '28 Riders', deliveryCostPerOrder: '₹39.80', returnsPct: '0.8%' },
    { hub: 'Whitefield Fulfillment Hub (BLR)', city: 'Bengaluru', orders: '3,190', onTimeRate: '97.6%', avgDispatchMins: '8.9 mins', riderCount: '24 Riders', deliveryCostPerOrder: '₹42.00', returnsPct: '0.7%' },
    { hub: 'Andheri West Express Hub (BOM)', city: 'Mumbai', orders: '4,120', onTimeRate: '98.4%', avgDispatchMins: '7.9 mins', riderCount: '30 Riders', deliveryCostPerOrder: '₹41.20', returnsPct: '0.9%' },
    { hub: 'Bandra West Micro-Store (BOM)', city: 'Mumbai', orders: '3,650', onTimeRate: '98.0%', avgDispatchMins: '8.4 mins', riderCount: '26 Riders', deliveryCostPerOrder: '₹43.10', returnsPct: '0.7%' },
    { hub: 'South Delhi Okhla Hub (DEL)', city: 'New Delhi', orders: '3,780', onTimeRate: '97.9%', avgDispatchMins: '8.5 mins', riderCount: '28 Riders', deliveryCostPerOrder: '₹40.50', returnsPct: '0.8%' },
    { hub: 'Gurgaon DLF Express Hub (GGN)', city: 'Gurgaon', orders: '2,940', onTimeRate: '98.6%', avgDispatchMins: '7.6 mins', riderCount: '22 Riders', deliveryCostPerOrder: '₹39.00', returnsPct: '0.5%' },
    { hub: 'Gachibowli Dark Store (HYD)', city: 'Hyderabad', orders: '2,680', onTimeRate: '98.1%', avgDispatchMins: '8.3 mins', riderCount: '20 Riders', deliveryCostPerOrder: '₹38.20', returnsPct: '0.6%' },
    { hub: 'Koregaon Park Express (PNQ)', city: 'Pune', orders: '2,150', onTimeRate: '98.5%', avgDispatchMins: '7.8 mins', riderCount: '18 Riders', deliveryCostPerOrder: '₹37.90', returnsPct: '0.5%' },
    { hub: 'Guindy Express Node (MAA)', city: 'Chennai', orders: '1,980', onTimeRate: '98.0%', avgDispatchMins: '8.1 mins', riderCount: '16 Riders', deliveryCostPerOrder: '₹38.60', returnsPct: '0.6%' }
  ];

  const downloadCSV = () => {
    const rows = [
      ['Operations Hub', 'Metro City', 'Orders Dispatched MTD', '60-Min On-Time SLA', 'Avg Staging Dwell (Mins)', 'Active EV Riders', 'Delivery Cost / Order (INR)', 'Returns Rate'],
      ...hubs.map(h => [h.hub, h.city, h.orders, h.onTimeRate, h.avgDispatchMins, h.riderCount, h.deliveryCostPerOrder, h.returnsPct])
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(',')).join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `zenve_operations_logistics_report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('Operations & Logistics Report CSV downloaded.');
  };

  return (
    <DashboardLayout
      category="Reports & Analytics"
      subcategory="Operations Reports"
      title="Fulfillment Logistics & 60-Minute SLA Report"
      subtitle="Warehouse packing throughput, dark-store staging dwell times, delivery cost per drop, rider fleet efficiency, and SLA compliance"
      icon="🚚"
      badge=""
      actions={
        <button
          onClick={downloadCSV}
          style={{
            padding: '8px 14px',
            borderRadius: '8px',
            background: 'var(--primary, #3b82f6)',
            color: '#ffffff',
            border: 'none',
            fontWeight: 600,
            fontSize: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span>📥</span> Export Logistics CSV
        </button>
      }
    >
      {toast && (
        <div style={{
          padding: '10px 16px',
          background: 'rgba(59,130,246,0.15)',
          border: '1px solid #3b82f6',
          borderRadius: '8px',
          color: '#60a5fa',
          fontSize: '13px',
          fontWeight: 600
        }}>
          ⚡ {toast}
        </div>
      )}

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Consolidated On-Time SLA" value="98.2%" delta="+1.4%" trend="up" subtext="60-min express deliveries" icon="⚡" />
        <KpiCard label="Average Dispatch Dwell" value="8.1 Mins" delta="-1.2 Mins" trend="up" subtext="Order pick to dispatch" icon="⏱️" />
        <KpiCard label="Active Dedicated Fleet" value="244 EV Riders" delta="+36 Riders" trend="up" subtext="Zero-emission express fleet" icon="🛵" />
        <KpiCard label="Blended Cost / Delivery" value="₹39.80" delta="-₹4.20" trend="up" subtext="Optimized cluster routing" icon="📉" />
      </div>

      {/* Table Section */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Micro-Hub Fulfillment & Express Delivery Benchmark</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)' }}>
                <th style={{ padding: '10px 12px' }}>Fulfillment Node</th>
                <th style={{ padding: '10px 12px' }}>City</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Orders Dispatched</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>On-Time SLA</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Staging Dwell</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Riders</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Cost / Order</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Returns Rate</th>
              </tr>
            </thead>
            <tbody>
              {hubs.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '24px', color: 'var(--muted-foreground, #94a3b8)' }}>
                    No fulfillment hub records found
                  </td>
                </tr>
              ) : (
                hubs.map((h, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{h.hub}</td>
                    <td style={{ padding: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>{h.city}</td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>{h.orders}</td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>{h.onTimeRate}</td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>{h.avgDispatchMins}</td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>{h.riderCount}</td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>{h.deliveryCostPerOrder}</td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>{h.returnsPct}</td>
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
