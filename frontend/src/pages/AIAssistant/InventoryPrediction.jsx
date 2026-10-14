import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function InventoryPrediction() {
  const cardStyle = {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '22px 24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
  };

    const inventoryRisks = [
    { sku: 'SKU-MED-0101', name: 'Bravecto Chewable 20-40kg (Koramangala Hub)', stock: '14 Units', burnRate: '4.8 / Day', daysLeft: '3 Days', riskColor: '#dc2626', risk: 'CRITICAL', action: 'Emergency PO Dispatched' },
    { sku: 'SKU-VAC-0504', name: 'Nobivac Tricat Trio Feline (Indiranagar Hub)', stock: '22 Vials', burnRate: '4.2 / Day', daysLeft: '5 Days', riskColor: '#ea580c', risk: 'HIGH', action: 'Inter-Hub Transfer En Route' },
    { sku: 'SKU-NUT-0205', name: 'Royal Canin Gastro 14kg (Whitefield Dark Store)', stock: '8 Bags', burnRate: '2.0 / Day', daysLeft: '4 Days', riskColor: '#dc2626', risk: 'CRITICAL', action: 'Supplier PO Dispatched' },
    { sku: 'SKU-CRD-0302', name: 'Vetmedin 5mg Cardiology (Bandra West Hub)', stock: '11 Packs', burnRate: '1.8 / Day', daysLeft: '6 Days', riskColor: '#ea580c', risk: 'HIGH', action: 'Safety Buffer Active' },
    { sku: 'SKU-DERM-0410', name: 'Apoquel 16mg Anti-Itch (Powai Express Hub)', stock: '16 Packs', burnRate: '3.2 / Day', daysLeft: '5 Days', riskColor: '#ea580c', risk: 'HIGH', action: 'Rebalancing from Bandra' },
    { sku: 'SKU-EMG-0714', name: 'Cerenia 10mg Injectable (South Ext Trauma)', stock: '6 Vials', burnRate: '2.5 / Day', daysLeft: '2 Days', riskColor: '#dc2626', risk: 'CRITICAL', action: 'Same-Day Dispatch Ordered' },
    { sku: 'SKU-ORT-0608', name: 'Rimadyl 75mg Orthopedic (Gurgaon Sec-29)', stock: '18 Bottles', burnRate: '2.4 / Day', daysLeft: '7 Days', riskColor: '#2563eb', risk: 'MEDIUM', action: 'Reorder Queued' },
    { sku: 'SKU-NUT-0212', name: 'Hill\'s c/d Urinary Feline (HSR Layout Hub)', stock: '9 Bags', burnRate: '1.7 / Day', daysLeft: '5 Days', riskColor: '#ea580c', risk: 'HIGH', action: 'Dark Store Transfer' },
    { sku: 'SKU-MED-0115', name: 'Simparica Trio 10-20kg (Anna Nagar Facility)', stock: '15 Packs', burnRate: '2.4 / Day', daysLeft: '6 Days', riskColor: '#2563eb', risk: 'MEDIUM', action: 'Auto Requisition Active' },
    { sku: 'SKU-DIA-0801', name: 'Caninsulin 40 IU/ml 10ml (Velachery Hub)', stock: '8 Vials', burnRate: '1.9 / Day', daysLeft: '4 Days', riskColor: '#dc2626', risk: 'CRITICAL', action: 'Cold-Chain Transfer Inbound' }
  ];

  return (
    <DashboardLayout
      category="AI Assistant"
      subcategory="Inventory Prediction"
      title="Predictive Inventory & Stockout Early-Warning Radar"
      subtitle="Days-of-inventory runway modeling, autonomous safety stock calibration, and lead-time buffer analysis"
      icon="🛡️"
      badge="Early Warning System Active"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Imminent Stockout Risk" value="0 SKUs" delta="--" trend="neutral" subtext="No stockout risks detected" icon="⚠️" />
        <KpiCard label="Average Inventory Runway" value="-- Days" delta="--" trend="neutral" subtext="No buffer records" icon="📅" />
        <KpiCard label="Excess / Slow-Moving Stock" value="₹0" delta="--" trend="neutral" subtext="No excess stock detected" icon="📉" />
        <KpiCard label="Automated Reorder Accuracy" value="0.0%" delta="--" trend="neutral" subtext="No reorders logged" icon="🤖" />
      </div>

      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Predicted Inventory Exhaustion & Reorder Calibration</h3>
          <span style={{ fontSize: '11px', color: '#64748b' }}>Forecast Model: Prophet + XGBoost</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>SKU</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>PHARMACEUTICAL / PRODUCT</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'right' }}>ON HAND</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'right' }}>DAILY BURN RATE</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'right' }}>RUNWAY LEFT</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'center' }}>PREDICTED STATUS</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'right' }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {inventoryRisks.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '24px', textAlign: 'center', color: '#94a3b8' }}>
                    No inventory risk records found
                  </td>
                </tr>
              ) : (
                inventoryRisks.map((item, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600, color: '#2563eb' }}>{item.sku}</td>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>{item.name}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{item.stock}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#64748b' }}>{item.burnRate}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: item.riskColor }}>{item.daysLeft}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '12px', background: `${item.riskColor}15`, color: item.riskColor }}>
                      {item.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <button
                      onClick={() => alert(`Expedited reorder dispatched for ${item.sku}`)}
                      style={{
                        padding: '5px 12px',
                        borderRadius: '6px',
                        border: '1px solid #2563eb',
                        background: '#eff6ff',
                        color: '#1d4ed8',
                        fontSize: '11px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Instant Reorder
                    </button>
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
