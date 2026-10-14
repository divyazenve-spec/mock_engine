import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function DataChanges() {
  const changes = [
  {
    "id": "CDC-201",
    "table": "patients_phi",
    "record": "PAT-84920",
    "field": "emergency_contact_phone",
    "oldVal": "+91-98450-11223",
    "newVal": "+91-98450-99887",
    "changedBy": "anita.k (Reception)",
    "reason": "Patient updated primary guardian contact",
    "time": "2026-10-14 16:15:02"
  },
  {
    "id": "CDC-202",
    "table": "prescriptions_schedule_x",
    "record": "RX-99412",
    "field": "dosage_frequency",
    "oldVal": "10mg TDS",
    "newVal": "5mg BD (Titrated down)",
    "changedBy": "dr.arvind.rao (CMO)",
    "reason": "Patient renal panel showed elevated creatinine",
    "time": "2026-10-14 16:05:40"
  },
  {
    "id": "CDC-203",
    "table": "pricing_ledger",
    "record": "SKU-INS-100",
    "field": "mrp_inr",
    "oldVal": "\u20b9680.00",
    "newVal": "\u20b9640.00",
    "changedBy": "venkat.r (CFO)",
    "reason": "National Pharmaceutical Pricing Authority (NPPA) ceiling compliance",
    "time": "2026-10-14 15:50:18"
  },
  {
    "id": "CDC-204",
    "table": "inventory_batches",
    "record": "BAT-COV-401",
    "field": "quarantine_flag",
    "oldVal": "FALSE",
    "newVal": "TRUE",
    "changedBy": "suresh.r (QA)",
    "reason": "Secondary seal tamper detected during cycle count",
    "time": "2026-10-14 15:32:10"
  },
  {
    "id": "CDC-205",
    "table": "hub_vault_sensors",
    "record": "IOT-TH-04",
    "field": "temp_threshold_high_c",
    "oldVal": "8.0\u00b0C",
    "newVal": "6.5\u00b0C",
    "changedBy": "siddharth.n (Cold Chain)",
    "reason": "Tighter variance threshold for mRNA biologic storage",
    "time": "2026-10-14 15:18:45"
  },
  {
    "id": "CDC-206",
    "table": "staff_roles_rbac",
    "record": "USR-1092",
    "field": "permission_scope",
    "oldVal": "PHARMACY_VIEW",
    "newVal": "PHARMACY_DISPENSE_SCH_H",
    "changedBy": "kavita.d (Compliance)",
    "reason": "Passed mandatory CDSCO pharmacist certification audit",
    "time": "2026-10-14 15:02:12"
  },
  {
    "id": "CDC-207",
    "table": "orders_dispatch",
    "record": "ORD-55412",
    "field": "delivery_sla_tier",
    "oldVal": "STANDARD_SAME_DAY",
    "newVal": "EXPRESS_60_MIN_DRONE",
    "changedBy": "manish.v (Logistics)",
    "reason": "Emergency cardiac medication dispatched via sky-corridor",
    "time": "2026-10-14 14:48:30"
  },
  {
    "id": "CDC-208",
    "table": "gst_tax_slabs",
    "record": "HSN-3004",
    "field": "cgst_rate_pct",
    "oldVal": "6.0%",
    "newVal": "6.0% (Re-verified)",
    "changedBy": "venkat.r (CFO)",
    "reason": "Quarterly GST council advisory reconciliation",
    "time": "2026-10-14 14:30:15"
  },
  {
    "id": "CDC-209",
    "table": "insurance_preauth",
    "record": "CLM-88192",
    "field": "approved_amount_inr",
    "oldVal": "\u20b9125,000",
    "newVal": "\u20b9160,000",
    "changedBy": "anita.k (Billing)",
    "reason": "TPA Star Health approved revised ICU day rate",
    "time": "2026-10-14 14:12:05"
  },
  {
    "id": "CDC-210",
    "table": "ai_agent_rules",
    "record": "RULE-INTERACT-09",
    "field": "confidence_threshold",
    "oldVal": "0.92",
    "newVal": "0.98",
    "changedBy": "dr.arvind.rao (CMO)",
    "reason": "Strict human-in-the-loop requirement for oncology regimens",
    "time": "2026-10-14 13:55:40"
  }
];

  return (
    <DashboardLayout
      category="Audit & Compliance"
      subcategory="Data Mutations & Diff Engine"
      title="Field-Level Data Mutation Log"
      subtitle="Granular Before-and-After change comparisons across all database entities"
      icon="🔄"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Field-Level Mutations" value="14,920" delta="+11.8%" trend="up" subtext="Tracked via CDC pipeline" icon="📝" />
        <KpiCard label="Rollback Readiness" value="100.0%" delta="+0.0%" trend="up" subtext="Point-in-time recovery active" icon="🔄" />
        <KpiCard label="Schema Migrations" value="v2.8.4" delta="Latest" trend="up" subtext="All migrations verified" icon="🗄️" />
        <KpiCard label="Critical Overrides" value="0 Flagged" delta="0.0%" trend="neutral" subtext="0 override alerts" icon="🛡️" />
      </div>

      <div style={{ background: 'var(--card, #ffffff)', border: '1px solid var(--border, #e2e8f0)', borderRadius: '12px', padding: '20px' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Database Field Mutations & Diffs</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)', fontSize: '11px', textTransform: 'uppercase' }}>
                <th style={{ padding: '10px 12px' }}>Change ID</th>
                <th style={{ padding: '10px 12px' }}>Database Table</th>
                <th style={{ padding: '10px 12px' }}>Record Key</th>
                <th style={{ padding: '10px 12px' }}>Modified Field</th>
                <th style={{ padding: '10px 12px' }}>Before vs After Diff</th>
                <th style={{ padding: '10px 12px' }}>Modified By</th>
                <th style={{ padding: '10px 12px' }}>Business Rationale</th>
                <th style={{ padding: '10px 12px' }}>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {changes.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ padding: '36px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                    No field-level mutation records found.
                  </td>
                </tr>
              ) : (
                changes.map((c, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)' }}>
                    <td style={{ padding: '12px', fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', color: '#2563eb', fontWeight: 600 }}>{c.id}</td>
                    <td style={{ padding: '12px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700 }}>{c.table}</td>
                    <td style={{ padding: '12px', fontFamily: '"IBM Plex Mono", monospace', color: '#2563eb' }}>{c.record}</td>
                    <td style={{ padding: '12px' }}><code>{c.field}</code></td>
                    <td style={{ padding: '12px', fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px' }}>
                      <div style={{ color: '#dc2626', background: '#fef2f2', padding: '2px 6px', borderRadius: '4px', textDecoration: 'line-through' }}>- {c.oldVal}</div>
                      <div style={{ color: '#16a34a', background: '#f0fdf4', padding: '2px 6px', borderRadius: '4px', fontWeight: 600, marginTop: '2px' }}>+ {c.newVal}</div>
                    </td>
                    <td style={{ padding: '12px' }}>{c.changedBy}</td>
                    <td style={{ padding: '12px', color: '#64748b' }}>{c.reason}</td>
                    <td style={{ padding: '12px', fontSize: '12px' }}>{c.time}</td>
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
