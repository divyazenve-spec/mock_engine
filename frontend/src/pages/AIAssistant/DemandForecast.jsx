import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function DemandForecast() {
  const cardStyle = {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '22px 24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
  };

    const demandItems = [
    { sku: 'SKU-MED-0101', item: 'Bravecto Chewable Dog 20-40kg', category: 'Parasiticide / Tick-Flea', curStock: '120 Units', demand30d: '380 Units', surgePct: '+24.5%', replenishment: 'Dispatch Emergency PO-4481 for 400 Units' },
    { sku: 'SKU-MED-0104', item: 'Nexgard Spectra Large 15-30kg', category: 'Parasiticide / Heartworm', curStock: '85 Units', demand30d: '310 Units', surgePct: '+18.2%', replenishment: 'Trigger bulk PO-4482 with 12% vendor rebate' },
    { sku: 'SKU-NUT-0205', item: 'Royal Canin Gastrointestinal Dog 14kg', category: 'Therapeutic Nutrition', curStock: '64 Bags', demand30d: '220 Bags', surgePct: '+15.4%', replenishment: 'Rebalance 40 bags to Koramangala Hub' },
    { sku: 'SKU-CRD-0302', item: 'Vetmedin 5mg Chewable Tablets', category: 'Cardiology / Chronic', curStock: '45 Boxes', demand30d: '140 Boxes', surgePct: '+21.0%', replenishment: 'Auto-generate PO-4483 with cold-chain courier' },
    { sku: 'SKU-DERM-0410', item: 'Apoquel 16mg Tablets', category: 'Dermatology / Allergy', curStock: '70 Packs', demand30d: '260 Packs', surgePct: '+32.4%', replenishment: 'Increase safety stock buffer by 30%' },
    { sku: 'SKU-VAC-0501', item: 'Nobivac DHPPi Canine Vaccine 10-Dose', category: 'Immunization / Cold-Chain', curStock: '90 Vials', demand30d: '420 Vials', surgePct: '+28.0%', replenishment: 'Immediate PO-4484 to Intervet (2-8°C cold)' },
    { sku: 'SKU-NUT-0212', item: 'Hill\'s Prescription Diet c/d Feline 3.8kg', category: 'Urinary Diet / Cat', curStock: '35 Bags', demand30d: '115 Bags', surgePct: '+14.6%', replenishment: 'Place restocking requisition with Colgate Pet' },
    { sku: 'SKU-ORT-0608', item: 'Rimadyl 75mg Chewable NSAID', category: 'Orthopedic / Analgesic', curStock: '110 Bottles', demand30d: '290 Bottles', surgePct: '+12.8%', replenishment: 'Consolidate order across BLR & BOM hubs' },
    { sku: 'SKU-EMG-0714', item: 'Cerenia 10mg/ml Injectable Anti-Emetic', category: 'Emergency / Inpatient', curStock: '28 Vials', demand30d: '95 Vials', surgePct: '+19.5%', replenishment: 'Priority replenishment for 24x7 ICU inventory' },
    { sku: 'SKU-BEH-0822', item: 'Feliway Classic Cat Calming Diffuser', category: 'Behavioral / Feline', curStock: '40 Kits', demand30d: '130 Kits', surgePct: '+16.2%', replenishment: 'Promote in feline post-consultation care' }
  ];

  return (
    <DashboardLayout
      category="AI Assistant"
      subcategory="Demand Forecast"
      title="Predictive Demand & Category Velocity Forecasting"
      subtitle="SKU-level consumption projection, seasonal health surges, and procurement volume planning"
      icon="📦"
      badge="Demand Intelligence"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="SKUs with Surge Demand" value="0 SKUs" delta="--" trend="neutral" subtext="No active surges" icon="⚡" />
        <KpiCard label="Fulfillment Availability" value="0.0%" delta="--" trend="neutral" subtext="No fulfillment records" icon="✅" />
        <KpiCard label="Forecast Horizon" value="-- Days" delta="--" trend="neutral" subtext="No horizon configured" icon="📅" />
        <KpiCard label="Procurement Capital Plan" value="₹0" delta="--" trend="neutral" subtext="No procurement plan" icon="💰" />
      </div>

      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>High-Velocity SKU Demand Projections (30 Days)</h3>
          <button
            onClick={() => alert('No active surge SKUs available to generate Purchase Orders')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: '1px solid #2563eb',
              background: '#2563eb',
              color: '#ffffff',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Generate Auto-PO →
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>SKU & CODE</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>PRODUCT NAME</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>CATEGORY</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'right' }}>ON HAND</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'right' }}>30D DEMAND</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'right' }}>GROWTH</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>RECOMMENDED REPLENISHMENT</th>
              </tr>
            </thead>
            <tbody>
              {demandItems.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '24px', textAlign: 'center', color: '#94a3b8' }}>
                    No demand projection records found
                  </td>
                </tr>
              ) : (
                demandItems.map((item, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600, color: '#2563eb' }}>{item.sku}</td>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>{item.item}</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>{item.category}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{item.curStock}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#0f172a' }}>{item.demand30d}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 600, color: '#059669' }}>{item.surgePct}</td>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#b45309' }}>{item.replenishment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
