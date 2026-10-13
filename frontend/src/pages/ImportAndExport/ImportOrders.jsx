import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ImportOrders() {
  const [filter, setFilter] = useState('ALL');

  const orders = [
    { po: 'IPO-2026-001', supplier: 'Boehringer Ingelheim Vet (Germany)', goods: 'Metacam Anti-inflammatory Injectables (5,000 vials)', val: '$78,500 (₹65,15,500)', terms: 'CIF Nhava Sheva', orderDate: '28 Sep 2026', deliveryEta: '18 Oct 2026', status: 'In Transit' },
    { po: 'IPO-2026-002', supplier: 'Zoetis Global LLC (USA)', goods: 'Apoquel & Cytopoint Canine Monoclonals', val: '$112,000 (₹92,96,000)', terms: 'CIP BLR Airport', orderDate: '02 Oct 2026', deliveryEta: '16 Oct 2026', status: 'In Transit' },
    { po: 'IPO-2026-003', supplier: 'MSD Animal Health B.V. (Netherlands)', goods: 'Nobivac Tricat & Rabies Biological Batches', val: '€54,200 (₹48,78,000)', terms: 'DAP Chennai Hub', orderDate: '01 Oct 2026', deliveryEta: '15 Oct 2026', status: 'In Customs' },
    { po: 'IPO-2026-004', supplier: 'Virbac Laboratories (France)', goods: 'Milpro & Epiotic Dermatological Solutions', val: '€38,900 (₹35,01,000)', terms: 'FOB Marseille', orderDate: '25 Sep 2026', deliveryEta: '12 Oct 2026', status: 'Delivered' },
    { po: 'IPO-2026-005', supplier: 'Esaote SpA Diagnostic (Italy)', goods: 'Vet Dedicated Color Ultrasound Probes', val: '€44,000 (₹39,60,000)', terms: 'CIF Mumbai Air', orderDate: '05 Oct 2026', deliveryEta: '20 Oct 2026', status: 'In Transit' },
    { po: 'IPO-2026-006', supplier: 'Canon Medical Vet (Japan)', goods: 'CXDI Flat Panel Wireless Vet Detectors', val: '¥12.8M (₹71,68,000)', terms: 'CIF JNPT Port', orderDate: '22 Sep 2026', deliveryEta: '11 Oct 2026', status: 'Delivered' },
    { po: 'IPO-2026-007', supplier: 'Elanco Switzerland GmbH (Switzerland)', goods: 'Galliprant & Credelio Chewable Tablets', val: '$49,300 (₹40,91,900)', terms: 'CIP DEL Airport', orderDate: '03 Oct 2026', deliveryEta: '19 Oct 2026', status: 'In Transit' },
    { po: 'IPO-2026-008', supplier: 'NovoVet Biologicals ApS (Denmark)', goods: 'Caninsulin & Vet Glucose Monitoring Kits', val: '€42,100 (₹37,89,000)', terms: 'CIF Chennai Port', orderDate: '29 Sep 2026', deliveryEta: '17 Oct 2026', status: 'In Customs' },
    { po: 'IPO-2026-009', supplier: 'Troy Laboratories Pty Ltd (Australia)', goods: 'Ilium Anesthetic Formulations & Sedatives', val: 'A$62,000 (₹34,10,000)', terms: 'CIF Mumbai Port', orderDate: '20 Sep 2026', deliveryEta: '10 Oct 2026', status: 'Delivered' },
    { po: 'IPO-2026-010', supplier: 'Dechra Veterinary Products Ltd (UK)', goods: 'Vetoryl Capsules (Trilostane 10/30/60mg)', val: '£51,000 (₹57,63,000)', terms: 'CIP BOM Airport', orderDate: '06 Oct 2026', deliveryEta: '22 Oct 2026', status: 'In Transit' }
  ];

  const filtered = filter === 'ALL' ? orders : orders.filter(o => o.status.toLowerCase().includes(filter.toLowerCase()));

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Import & Export"
      subcategory="Import Orders"
      title="International Purchase Orders (IPO) & LC Pipeline"
      subtitle="Cross-border procurement orders, commercial proforma invoices, forex hedging contracts, and port ETA milestones"
      icon="📑"
      badge="10"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Open Import POs" value="10 Consignments" delta="₹5.24 Cr value" trend="up" subtext="Inbound cross-border" icon="📑" />
        <KpiCard label="Average Lead Time" value="16 Days" delta="-2.4 days" trend="up" subtext="Factory dispatch to hub" icon="⏱️" />
        <KpiCard label="Forex Hedging Coverage" value="92.5%" delta="Forward contracts locked" trend="up" subtext="Protected vs USD/EUR surge" icon="🔒" />
        <KpiCard label="Port Demurrage Incidents" value="0 Days" delta="Direct Port Delivery" trend="up" subtext="Zero port detention penalty" icon="⚡" />
      </div>

      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>International Purchase Orders (IPO) Master Stream ({filtered.length} records)</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Commercial values, incoterms, forex values, and logistics progress</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['ALL', 'Transit', 'Customs', 'Delivered'].map(s => (
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
                <th style={{ padding: '10px 12px' }}>IPO #</th>
                <th style={{ padding: '10px 12px' }}>International Supplier</th>
                <th style={{ padding: '10px 12px' }}>Procured Goods</th>
                <th style={{ padding: '10px 12px' }}>Forex & INR Value</th>
                <th style={{ padding: '10px 12px' }}>Incoterms</th>
                <th style={{ padding: '10px 12px' }}>Order Date</th>
                <th style={{ padding: '10px 12px' }}>ETA</th>
                <th style={{ padding: '10px 12px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: '24px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                    No import order records found
                  </td>
                </tr>
              ) : (
                filtered.map(o => (
                  <tr key={o.po} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                    <td style={{ padding: '12px', fontFamily: 'monospace', fontWeight: 600 }}>{o.po}</td>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{o.supplier}</td>
                    <td style={{ padding: '12px' }}>{o.goods}</td>
                    <td style={{ padding: '12px', fontWeight: 600, color: '#059669' }}>{o.val}</td>
                    <td style={{ padding: '12px' }}>{o.terms}</td>
                    <td style={{ padding: '12px' }}>{o.orderDate}</td>
                    <td style={{ padding: '12px' }}>{o.deliveryEta}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: '999px',
                        fontSize: '10px',
                        fontWeight: 600,
                        background: o.status.includes('Delivered') ? 'rgba(16,185,129,0.12)' : o.status.includes('Customs') ? 'rgba(245,158,11,0.14)' : 'rgba(8,145,178,0.12)',
                        color: o.status.includes('Delivered') ? '#059669' : o.status.includes('Customs') ? '#d97706' : '#0e7490'
                      }}>
                        {o.status}
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
