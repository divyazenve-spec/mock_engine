import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ExpiringSubscriptions() {
  const expiring = [
    { subId: 'SUB-EXP-301', petName: 'Simba (Golden Retriever)', parent: 'Rahul Khanna', plan: 'Annual Preventive Care Plan', expiryDate: 'Expiring in 3 Days (16 Oct)', val: '₹21,999 / yr', action: 'Automated WhatsApp Notice Sent' },
    { subId: 'SUB-EXP-302', petName: 'Cookie (Cocker Spaniel)', parent: 'Divya Sundaram', plan: 'Senior Canine Health Comprehensive', expiryDate: 'Expiring in 5 Days (18 Oct)', val: '₹32,999 / yr', action: 'Concierge Call Completed - Confirmed' },
    { subId: 'SUB-EXP-303', petName: 'Bella (Persian Cat)', parent: 'Naveen Chhabra', plan: 'Feline Complete Annual Care', expiryDate: 'Expiring in 7 Days (20 Oct)', val: '₹14,999 / yr', action: 'Card Token Expiry - Update Link Sent' },
    { subId: 'SUB-EXP-304', petName: 'Zeus (Rottweiler)', parent: 'Gaurav Aggarwal', plan: 'Adult Canine Preventive Care', expiryDate: 'Expiring in 9 Days (22 Oct)', val: '₹23,999 / yr', action: 'Renewal Discount Code Activated (10%)' },
    { subId: 'SUB-EXP-305', petName: 'Milo (Beagle)', parent: 'Deepika Raman', plan: 'Zenve Nutrition Annual Subscription', expiryDate: 'Expiring in 12 Days (25 Oct)', val: '₹38,400 / yr', action: 'Auto-Renewal Pre-Approved' },
    { subId: 'SUB-EXP-306', petName: 'Cleo (Siamese Cat)', parent: 'Sneha Kothari', plan: 'Feline Essential Health Care', expiryDate: 'Expiring in 14 Days (27 Oct)', val: '₹14,999 / yr', action: 'Reminder WhatsApp & SMS Delivered' },
    { subId: 'SUB-EXP-307', petName: 'Tiger (German Shepherd)', parent: 'Siddharth Verma', plan: 'Multi-Pet Family Platinum Care', expiryDate: 'Expiring in 18 Days (31 Oct)', val: '₹48,999 / yr', action: 'Clinic Nurse Consultation Scheduled' },
    { subId: 'SUB-EXP-308', petName: 'Oreo (Shih Tzu)', parent: 'Pooja Hegde', plan: 'Dermatology Allergy Long-Term Plan', expiryDate: 'Expiring in 21 Days (03 Nov)', val: '₹27,499 / yr', action: 'Vet Follow-up Visit Arranged' },
    { subId: 'SUB-EXP-309', petName: 'Shadow (Labrador)', parent: 'Karan Mehra', plan: 'Puppy Year-1 Graduation Renewal', expiryDate: 'Expiring in 24 Days (06 Nov)', val: '₹17,999 / yr', action: 'Adult Plan Upgrade Recommendation Sent' },
    { subId: 'SUB-EXP-310', petName: 'Rusty (Indie Hound)', parent: 'Tanvi Shah', plan: 'Preventive Healthcare & Vaccination', expiryDate: 'Expiring in 28 Days (10 Nov)', val: '₹12,999 / yr', action: 'Doorstep Vet Visit Booked' }
  ];

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Subscriptions"
      subcategory="Expiring Subscriptions"
      title="Upcoming Expiries & Proactive Retention Alerts"
      subtitle="Annual membership renewals due in 30 days, token expiration mitigation, and concierge outreach pipeline"
      icon="⏳"
      badge="10"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Subscriptions Due in 30D" value="10 Plans" delta="₹2.88 L Annualized" trend="up" subtext="Annual membership tier" icon="⏳" />
        <KpiCard label="Pre-Renewal Confirmation" value="91.4%" delta="Proactive contact" trend="up" subtext="Automated outreach response" icon="✅" />
        <KpiCard label="Card Token Expirations" value="14 Cards" delta="Mandate auto-refresh" trend="neutral" subtext="NPCI bank notification" icon="💳" />
        <KpiCard label="Concierge Retention Save Rate" value="94.2%" delta="Zero passive drop-off" trend="up" subtext="Zero passive drop-off" icon="🛡️" />
      </div>

      <div style={card}>
        <h3 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Proactive Expiration Watchlist & Action Queue ({expiring.length} Subscriptions)</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Subscriptions expiring within 30 days and automated retention actions</p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)' }}>
                <th style={{ padding: '10px 12px' }}>Subscription ID</th>
                <th style={{ padding: '10px 12px' }}>Pet Patient</th>
                <th style={{ padding: '10px 12px' }}>Pet Parent</th>
                <th style={{ padding: '10px 12px' }}>Plan Details</th>
                <th style={{ padding: '10px 12px' }}>Expiry Timeline</th>
                <th style={{ padding: '10px 12px' }}>Annual Value</th>
                <th style={{ padding: '10px 12px' }}>Outreach Action Taken</th>
              </tr>
            </thead>
            <tbody>
              {expiring.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '24px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                    No expiring subscription records found
                  </td>
                </tr>
              ) : (
                expiring.map(e => (
                  <tr key={e.subId} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                    <td style={{ padding: '12px', fontFamily: 'monospace', fontWeight: 600 }}>{e.subId}</td>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{e.petName}</td>
                    <td style={{ padding: '12px' }}>{e.parent}</td>
                    <td style={{ padding: '12px' }}>{e.plan}</td>
                    <td style={{ padding: '12px', color: '#d97706', fontWeight: 600 }}>{e.expiryDate}</td>
                    <td style={{ padding: '12px', fontWeight: 600, color: '#059669' }}>{e.val}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ padding: '3px 8px', borderRadius: '999px', fontSize: '10px', fontWeight: 600, background: 'rgba(124,58,237,0.12)', color: '#6d28d9' }}>
                        {e.action}
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
