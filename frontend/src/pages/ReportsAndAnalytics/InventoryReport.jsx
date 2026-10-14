import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function InventoryReport() {
  const [toast, setToast] = useState('');

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const warehouses = [
    { hub: 'BLR Central Distribution Warehouse (Electronic City)', type: 'Master Regional DC', totalSkus: 2450, stockValue: 14800000, daysCover: 24, nearExpiryValue: 340000, deadStockValue: 120000 },
    { hub: 'BLR Indiranagar Dark Store (Express 60-Min)', type: 'Urban Micro-Hub', totalSkus: 840, stockValue: 3800000, daysCover: 14, nearExpiryValue: 95000, deadStockValue: 32000 },
    { hub: 'BLR Koramangala Dark Store', type: 'Urban Micro-Hub', totalSkus: 780, stockValue: 3400000, daysCover: 12, nearExpiryValue: 88000, deadStockValue: 28000 },
    { hub: 'BOM Bhiwandi Master Distribution Center', type: 'Master Regional DC', totalSkus: 2380, stockValue: 13900000, daysCover: 22, nearExpiryValue: 310000, deadStockValue: 110000 },
    { hub: 'BOM Andheri West Express Hub', type: 'Urban Micro-Hub', totalSkus: 820, stockValue: 3600000, daysCover: 13, nearExpiryValue: 92000, deadStockValue: 35000 },
    { hub: 'DEL Okhla Master Logistics Hub', type: 'Master Regional DC', totalSkus: 2150, stockValue: 12400000, daysCover: 25, nearExpiryValue: 280000, deadStockValue: 95000 },
    { hub: 'GGN Sector 29 Express Micro-Hub', type: 'Urban Micro-Hub', totalSkus: 760, stockValue: 3100000, daysCover: 15, nearExpiryValue: 74000, deadStockValue: 26000 },
    { hub: 'HYD Gachibowli Dark Store', type: 'Urban Micro-Hub', totalSkus: 710, stockValue: 2900000, daysCover: 16, nearExpiryValue: 68000, deadStockValue: 24000 },
    { hub: 'PNQ Hadapsar Cold Storage Depot', type: 'Cold Chain Pharma Depot', totalSkus: 640, stockValue: 2650000, daysCover: 18, nearExpiryValue: 55000, deadStockValue: 19000 },
    { hub: 'MAA Guindy Express Fulfilment Center', type: 'Urban Micro-Hub', totalSkus: 690, stockValue: 2750000, daysCover: 17, nearExpiryValue: 62000, deadStockValue: 21000 }
  ];

  const inr = (n) => '₹' + (Number(n) / 100000).toFixed(2) + ' Lakhs';

  const downloadCSV = () => {
    const rows = [
      ['Warehouse / Hub Facility', 'Hub Type', 'Total SKUs Stocked', 'Stock Valuation (INR)', 'Days of Inventory Cover (DSI)', 'Near-Expiry Capital (<60d)', 'Aging Stock >90d'],
      ...warehouses.map(w => [w.hub, w.type, w.totalSkus, w.stockValue, w.daysCover, w.nearExpiryValue, w.deadStockValue])
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(',')).join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `zenve_warehouse_inventory_audit.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('Inventory Audit Report CSV downloaded.');
  };

  return (
    <DashboardLayout
      category="Reports & Analytics"
      subcategory="Inventory Reports"
      title="Warehouse Inventory & Batch Valuation Audit Report"
      subtitle="Stock valuation across 5 regional cold-chain distribution centers, days of inventory cover (DSI), near-expiry write-downs, and aging capital"
      icon="📦"
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
          <span>📥</span> Export Valuation CSV
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
        <KpiCard label="Consolidated Inventory Valuation" value="₹6.23 Cr" delta="+5.8%" trend="up" subtext="10 regional & micro-hubs" icon="🏭" />
        <KpiCard label="Days of Inventory Cover" value="18.4 Days" delta="-2.6 Days" trend="up" subtext="Target cover: 21 Days" icon="⏱️" />
        <KpiCard label="Near-Expiry Valuation (<60d)" value="₹14.64 Lakhs" delta="-12.5%" trend="up" subtext="Within strict threshold" icon="⏳" />
        <KpiCard label="Stock Fill Rate SLA" value="99.4%" delta="+0.9%" trend="up" subtext="Dispatched orders" icon="✅" />
      </div>

      {/* Table Section */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Hub Stock Valuation, Aging & Expiry Schedule</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)' }}>
                <th style={{ padding: '10px 12px' }}>Warehouse / Fulfillment Node</th>
                <th style={{ padding: '10px 12px' }}>Hub Classification</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Active SKUs</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Total Stock Valuation</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>DSI Cover</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Near Expiry (&lt;60d)</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Aging (&gt;90d)</th>
              </tr>
            </thead>
            <tbody>
              {warehouses.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '24px', textAlign: 'center', color: 'var(--muted-foreground, #94a3b8)' }}>
                    No warehouse inventory records found
                  </td>
                </tr>
              ) : (
                warehouses.map((w) => (
                  <tr key={w.hub} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{w.hub}</td>
                    <td style={{ padding: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>{w.type}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{w.totalSkus}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, color: '#34d399', fontFamily: '"IBM Plex Mono", monospace' }}>{inr(w.stockValue)}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{w.daysCover} Days</td>
                    <td style={{ padding: '12px', textAlign: 'right', color: '#fbbf24', fontFamily: '"IBM Plex Mono", monospace' }}>{inr(w.nearExpiryValue)}</td>
                    <td style={{ padding: '12px', textAlign: 'right', color: '#f87171', fontFamily: '"IBM Plex Mono", monospace' }}>{inr(w.deadStockValue)}</td>
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
