import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function InventoryAuditTrail() {
  const inv = [
  {
    "batch": "BAT-INS-2026-09",
    "product": "Human Insulin R 100IU/ml (Vial)",
    "hub": "Hub-1 Cold Vault (2-8\u00b0C)",
    "action": "IoT Sensor Audit",
    "adjustment": "0 (Verified 3.8\u00b0C)",
    "officer": "Siddharth Nair",
    "time": "2026-10-14 16:35:12",
    "status": "Normal"
  },
  {
    "batch": "BAT-FNT-2026-03",
    "product": "Fentanyl Citrate 50mcg/ml (Schedule X)",
    "hub": "Biometric Vault Safe-4",
    "action": "Dual-Key Physical Audit",
    "adjustment": "0 (Exact 240 Amps)",
    "officer": "Dr. Arvind Rao",
    "time": "2026-10-14 16:20:45",
    "status": "Normal"
  },
  {
    "batch": "BAT-AUG-2026-11",
    "product": "Augmentin 625 Duo (Amoxicillin+Clav)",
    "hub": "Bangalore Central Hub",
    "action": "FEFO Shelf Rotation",
    "adjustment": "0 (5,000 Packs)",
    "officer": "Priya Sharma",
    "time": "2026-10-14 16:05:10",
    "status": "Normal"
  },
  {
    "batch": "BAT-RMD-2025-12",
    "product": "Remdesivir Lyophilized 100mg",
    "hub": "Quarantine Zone C",
    "action": "Expiration Date Quarantine",
    "adjustment": "-12 Units (Disposal)",
    "officer": "Suresh Raina (QA)",
    "time": "2026-10-14 15:45:00",
    "status": "Quarantined"
  },
  {
    "batch": "BAT-PAR-2026-08",
    "product": "Paracetamol 650mg IV Infusion",
    "hub": "North Fulfillment Hub",
    "action": "Receiving Inspection",
    "adjustment": "+2,400 Units (Inward)",
    "officer": "K. Sundaram",
    "time": "2026-10-14 15:28:30",
    "status": "Normal"
  },
  {
    "batch": "BAT-TRA-2026-05",
    "product": "Trastuzumab 440mg Monoclonal Abs",
    "hub": "Cryo-Storage Unit (-20\u00b0C)",
    "action": "Thermal Chamber Verification",
    "adjustment": "0 (Verified -19.4\u00b0C)",
    "officer": "Siddharth Nair",
    "time": "2026-10-14 15:12:18",
    "status": "Normal"
  },
  {
    "batch": "BAT-ATOR-2026-10",
    "product": "Atorvastatin 20mg Tablets",
    "hub": "South Fulfillment Hub",
    "action": "Random Spot Count",
    "adjustment": "0 (1,200 Strips)",
    "officer": "Anita Kurup",
    "time": "2026-10-14 14:58:40",
    "status": "Normal"
  },
  {
    "batch": "BAT-MOR-2026-02",
    "product": "Morphine Sulphate 10mg Tablets",
    "hub": "Narcotics Biometric Locker",
    "action": "Weekly Excise Inspection",
    "adjustment": "0 (Reconciled with Register)",
    "officer": "Dr. Arvind Rao",
    "time": "2026-10-14 14:40:15",
    "status": "Normal"
  },
  {
    "batch": "BAT-ALB-2026-07",
    "product": "Human Albumin 20% 100ml Infusion",
    "hub": "Hub-1 Cold Vault (2-8\u00b0C)",
    "action": "Secondary Barcode Scan",
    "adjustment": "0 (350 Vials Verified)",
    "officer": "Priya Sharma",
    "time": "2026-10-14 14:22:05",
    "status": "Normal"
  },
  {
    "batch": "BAT-HEM-2026-04",
    "product": "Low Molecular Weight Heparin 40mg",
    "hub": "West Hub Refrigerated Bay",
    "action": "Pre-Dispatch Cold Log",
    "adjustment": "0 (Verified 4.1\u00b0C)",
    "officer": "Siddharth Nair",
    "time": "2026-10-14 14:05:50",
    "status": "Normal"
  }
];

  return (
    <DashboardLayout
      category="Audit & Compliance"
      subcategory="Inventory Movements & Cold-Chain Audits"
      title="Inventory Movements & Cold-Chain Audits"
      subtitle="Batch lineage, thermal storage telemetry, transfer manifests, and write-off records"
      icon="📋"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Cold-Chain Integrity" value="99.98%" delta="+0.05%" trend="up" subtext="Zero excursions > 8°C" icon="❄️" />
        <KpiCard label="Stock Variance Rate" value="0.02%" delta="-0.01%" trend="down" subtext="Physical cycle count variance" icon="📊" />
        <KpiCard label="Quarantine Actions" value="12 Units" delta="FEFO" trend="neutral" subtext="Damaged / expired batch isolation" icon="⚠️" />
        <KpiCard label="Batch Traceability" value="100.0%" delta="+0.0%" trend="up" subtext="1,240 batches mapped end-to-end" icon="🏷️" />
      </div>

      <div style={{ background: 'var(--card, #ffffff)', border: '1px solid var(--border, #e2e8f0)', borderRadius: '12px', padding: '20px' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Inventory Movements & Quality Control Log</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)', fontSize: '11px', textTransform: 'uppercase' }}>
                <th style={{ padding: '10px 12px' }}>Batch / Lot No</th>
                <th style={{ padding: '10px 12px' }}>Product Name</th>
                <th style={{ padding: '10px 12px' }}>Warehouse / Clinic Hub</th>
                <th style={{ padding: '10px 12px' }}>Audit Action</th>
                <th style={{ padding: '10px 12px' }}>Quantity Delta</th>
                <th style={{ padding: '10px 12px' }}>Verified By</th>
                <th style={{ padding: '10px 12px' }}>Timestamp</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Compliance</th>
              </tr>
            </thead>
            <tbody>
              {inv.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ padding: '36px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                    No inventory audit records found.
                  </td>
                </tr>
              ) : (
                inv.map((i, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)' }}>
                    <td style={{ padding: '12px', fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', color: '#2563eb', fontWeight: 600 }}>{i.batch}</td>
                    <td style={{ padding: '12px', fontWeight: 700 }}>{i.product}</td>
                    <td style={{ padding: '12px', color: '#64748b' }}>{i.hub}</td>
                    <td style={{ padding: '12px' }}>{i.action}</td>
                    <td style={{ padding: '12px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700 }}>{i.adjustment}</td>
                    <td style={{ padding: '12px' }}>{i.officer}</td>
                    <td style={{ padding: '12px', fontSize: '12px' }}>{i.time}</td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      <span style={{ padding: '2px 8px', borderRadius: '99px', background: '#dcfce7', color: '#15803d', fontWeight: 600, fontSize: '11px' }}>● {i.status}</span>
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
