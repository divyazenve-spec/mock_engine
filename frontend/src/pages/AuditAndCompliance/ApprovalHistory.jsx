import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ApprovalHistory() {
  const approvals = [
  {
    "id": "APP-5001",
    "type": "Schedule X Prescription",
    "entity": "RX-88410 (Morphine Sulfate 10mg)",
    "requester": "Dr. P. Nair (Oncology)",
    "approver": "Dr. Arvind Rao (CMO)",
    "time": "2026-10-14 16:40:15",
    "status": "Approved"
  },
  {
    "id": "APP-5002",
    "type": "Vendor CapEx PO",
    "entity": "PO-2026-441 (Cold Chain IoT Sensors \u20b9450,000)",
    "requester": "Siddharth Nair (Logistics)",
    "approver": "R. Venkataraman (CFO)",
    "time": "2026-10-14 16:25:30",
    "status": "Approved"
  },
  {
    "id": "APP-5003",
    "type": "Narcotic Inventory Disposal",
    "entity": "DISP-NAR-09 (12 Damaged Remdesivir Vials)",
    "requester": "Suresh Raina (QA)",
    "approver": "Kavita Deshmukh (Compliance)",
    "time": "2026-10-14 16:12:00",
    "status": "Approved"
  },
  {
    "id": "APP-5004",
    "type": "Emergency Clinical Bypass",
    "entity": "BYPASS-ICU-104 (Off-Protocol Thrombolysis)",
    "requester": "Dr. Rajesh Iyer (Cardiology)",
    "approver": "Dr. Arvind Rao (CMO)",
    "time": "2026-10-14 15:55:18",
    "status": "Approved"
  },
  {
    "id": "APP-5005",
    "type": "High-Value Bulk Discount",
    "entity": "DISC-B2B-82 (Fortis Healthcare 22% Bulk Tier)",
    "requester": "Manish Verma (Sales)",
    "approver": "R. Venkataraman (CFO)",
    "time": "2026-10-14 15:40:22",
    "status": "Approved"
  },
  {
    "id": "APP-5006",
    "type": "Doctor Credential Verification",
    "entity": "CRED-DOC-192 (Dr. Sneha Roy - Neuro Surgeon)",
    "requester": "HR Medical Board",
    "approver": "Dr. Arvind Rao (CMO)",
    "time": "2026-10-14 15:22:40",
    "status": "Approved"
  },
  {
    "id": "APP-5007",
    "type": "Drone Sky-Corridor Flight Exemption",
    "entity": "DGCA-FLT-091 (Airspace Clearance Sector 4)",
    "requester": "Manish Verma (Fleet)",
    "approver": "Aviation Officer In-Charge",
    "time": "2026-10-14 15:05:12",
    "status": "Approved"
  },
  {
    "id": "APP-5008",
    "type": "Patient PHI Export Request",
    "entity": "PHI-EXP-202 (Clinical Trial Data Anonymized)",
    "requester": "Dr. Ananya Sen (Principal Investigator)",
    "approver": "Kavita Deshmukh (DPO & Legal)",
    "time": "2026-10-14 14:48:33",
    "status": "Approved"
  },
  {
    "id": "APP-5009",
    "type": "Cold Chain Excursion Tolerance Review",
    "entity": "EXCUR-REV-03 (Hub-2 Transient spike to 6.2\u00b0C)",
    "requester": "Siddharth Nair (Cold Chain)",
    "approver": "Dr. Arvind Rao (CMO)",
    "time": "2026-10-14 14:30:15",
    "status": "Approved"
  },
  {
    "id": "APP-5010",
    "type": "Schedule H1 Audit Sign-Off",
    "entity": "AUD-H1-Q3 (Quarterly Register for Drug Inspector)",
    "requester": "Priya Sharma (Lead Pharmacist)",
    "approver": "Kavita Deshmukh (Compliance)",
    "time": "2026-10-14 14:10:00",
    "status": "Approved"
  }
];

  return (
    <DashboardLayout
      category="Audit & Compliance"
      subcategory="Multi-Level Approvals & Digital Signs"
      title="Approval Workflows & Digital Signatures"
      subtitle="Audit logs for medical sign-offs, high-value purchase orders, financial overrides, and staff leave approvals"
      icon="✍️"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Prescriptions Signed" value="99.8%" delta="+0.3%" trend="up" subtext="Digital signatures verified" icon="✍️" />
        <KpiCard label="Avg Approval SLA" value="3.4 Mins" delta="-18.0%" trend="up" subtext="Well under 10-min SLA" icon="⏱️" />
        <KpiCard label="Pending Approvals" value="2 Pending" delta="-60.0%" trend="down" subtext="Queue nearly cleared" icon="⏳" />
        <KpiCard label="Approval Escalations" value="1 Escalation" delta="-50.0%" trend="down" subtext="Emergency trauma bypass" icon="🚨" />
      </div>

      <div style={{ background: 'var(--card, #ffffff)', border: '1px solid var(--border, #e2e8f0)', borderRadius: '12px', padding: '20px' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Authority Clearances & Sign-Off History</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)', fontSize: '11px', textTransform: 'uppercase' }}>
                <th style={{ padding: '10px 12px' }}>Approval ID</th>
                <th style={{ padding: '10px 12px' }}>Workflow Category</th>
                <th style={{ padding: '10px 12px' }}>Subject Entity / Details</th>
                <th style={{ padding: '10px 12px' }}>Requested By</th>
                <th style={{ padding: '10px 12px' }}>Authorizing Officer</th>
                <th style={{ padding: '10px 12px' }}>Timestamp</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Decision State</th>
              </tr>
            </thead>
            <tbody>
              {approvals.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ padding: '36px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                    No approval workflow records found.
                  </td>
                </tr>
              ) : (
                approvals.map((a, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)' }}>
                    <td style={{ padding: '12px', fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', color: '#2563eb', fontWeight: 600 }}>{a.id}</td>
                    <td style={{ padding: '12px', fontWeight: 700 }}>{a.type}</td>
                    <td style={{ padding: '12px' }}>{a.entity}</td>
                    <td style={{ padding: '12px', color: '#64748b' }}>{a.requester}</td>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{a.approver}</td>
                    <td style={{ padding: '12px', fontSize: '12px' }}>{a.time}</td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      <span style={{ padding: '2px 8px', borderRadius: '99px', background: '#dcfce7', color: '#15803d', fontWeight: 600, fontSize: '11px' }}>● {a.status}</span>
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
