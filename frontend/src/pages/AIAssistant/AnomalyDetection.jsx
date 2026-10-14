import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function AnomalyDetection() {
  const cardStyle = {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '22px 24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
  };

    const anomalies = [
    { id: 'ALRT-901', metric: 'Bravecto Pharmacy Margin Floor', type: '-4.2σ Negative Margin Spike', rootCause: 'Unrestricted promo coupon PETFEST50 stacking below MSRP', sev: 'CRITICAL', status: 'Safeguard Enforced', action: 'Price Floor Locked' },
    { id: 'ALRT-902', metric: 'Vaccine Chiller B Temperature (Indiranagar)', type: '+3.6σ Heat Drift (9.4°C)', rootCause: 'Condenser compressor electrical circuit trip during storm', sev: 'CRITICAL', status: 'Remediated', action: 'Backup Unit Active' },
    { id: 'ALRT-903', metric: 'Express 60-Min Rider SLA (Whitefield)', type: '+3.2σ Delivery Latency (68m)', rootCause: 'Waterlogging on Outer Ring Road causing route diversion', sev: 'HIGH', status: 'Rerouted', action: 'Float Riders Deployed' },
    { id: 'ALRT-904', metric: 'HDFC UPI Payment Gateway Failover', type: '+3.8σ Failure Spike (8.4%)', rootCause: 'Bank webhook timeout on UPI 2.0 collect requests', sev: 'HIGH', status: 'Switched', action: 'Razorpay Primary Active' },
    { id: 'ALRT-905', metric: 'Bandra ICU Surgery Overbooking', type: '+2.8σ Ortho Slot Conflict', rootCause: 'Simultaneous emergency cruciate rupture and elective surgery booking', sev: 'HIGH', status: 'Rescheduled', action: 'Slot 4 Assigned' },
    { id: 'ALRT-906', metric: 'Rimadyl 75mg Inventory Count (HSR)', type: '+3.1σ Stockout Discrepancy', rootCause: '14 units dispensed for post-op ward without barcode scan', sev: 'MEDIUM', status: 'Reconciled', action: 'Audit Log Updated' },
    { id: 'ALRT-907', metric: 'Blood Chemistry Turnaround Time (South Ext)', type: '+2.9σ Diagnostic Delay (95m)', rootCause: 'Reagent cartridge calibration cycle initiated during peak OPD', sev: 'MEDIUM', status: 'Calibrated', action: 'Normal Flow Resumed' },
    { id: 'ALRT-908', metric: 'Grooming Promotional Coupon Drainage', type: '+4.4σ Outlier Volume', rootCause: 'Expired influencer discount code leaked on social forum', sev: 'CRITICAL', status: 'Deactivated', action: 'Promo Code Revoked' },
    { id: 'ALRT-909', metric: 'Client CSAT Wait-Time Rating Drop', type: '+3.4σ Negative Sentiment', rootCause: 'Doctor emergency surgery delay impacted 3 afternoon consults', sev: 'HIGH', status: 'Followed Up', action: 'Client Recovery Credit' },
    { id: 'ALRT-910', metric: 'Reports Database Replication Lag', type: '+2.7σ Replica Delay (480ms)', rootCause: 'Heavy analytical batch report execution on secondary read node', sev: 'MEDIUM', status: 'Auto-Scaled', action: 'Query Cache Cleared' }
  ];

  return (
    <DashboardLayout
      category="AI Assistant"
      subcategory="Anomaly Detection"
      title="Autonomous Statistical Anomaly & Outlier Radar"
      subtitle="Real-time multi-dimensional telemetry scanning (3σ deviation), root-cause diagnostics, and automated remediation"
      icon="🛡️"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Active Anomalies" value="0 Active" delta="--" trend="neutral" subtext="Continuous telemetry scanning" icon="⚠️" />
        <KpiCard label="Detection Latency" value="--" delta="--" trend="neutral" subtext="From telemetry stream" icon="⚡" />
        <KpiCard label="False Positive Rate" value="0.0%" delta="--" trend="neutral" subtext="No baseline data" icon="🎯" />
        <KpiCard label="Auto-Remediated (MTD)" value="0 Incidents" delta="--" trend="neutral" subtext="No incidents logged" icon="🤖" />
      </div>

      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Real-Time Operational Outlier Feed</h3>
          <span style={{ fontSize: '11px', color: '#64748b' }}>No anomaly events in stream</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>ALERT ID</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>MONITORED METRIC</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>ANOMALY DEVIATION</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>DIAGNOSED ROOT CAUSE</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'center' }}>SEVERITY</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>STATUS & ACTION</th>
              </tr>
            </thead>
            <tbody>
              {anomalies.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: '24px', textAlign: 'center', color: '#94a3b8' }}>
                    No statistical anomalies or operational outliers detected
                  </td>
                </tr>
              ) : (
                anomalies.map((anm, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#2563eb' }}>{anm.id}</td>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>{anm.metric}</td>
                  <td style={{ padding: '12px 16px', color: anm.type.includes('Negative') ? '#dc2626' : '#059669', fontWeight: 600 }}>{anm.type}</td>
                  <td style={{ padding: '12px 16px', color: '#475569' }}>{anm.rootCause}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                    <span style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '12px',
                      background: anm.severity === 'High' ? '#fee2e2' : anm.severity === 'Medium' ? '#fef3c7' : '#ecfdf5',
                      color: anm.severity === 'High' ? '#991b1b' : anm.severity === 'Medium' ? '#92400e' : '#047857'
                    }}>
                      {anm.severity}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#334155', fontWeight: 500 }}>{anm.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
