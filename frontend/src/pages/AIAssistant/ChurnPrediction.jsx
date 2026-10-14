import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ChurnPrediction() {
  const cardStyle = {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '22px 24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
  };

    const churnCohorts = [
    { cohort: 'Vikram Malhotra · Max (Golden Retriever, 4Y)', users: '₹48,500 LTV', riskScore: '92%', decayFactor: '65 Days overdue since expected gastro prescription refill', playbook: 'WhatsApp Concierge: VIP ₹500 Refill Voucher + Free Vet Call', winbackRate: '88.5%' },
    { cohort: 'Priya Sengupta · Cleo (Persian Cat, 3Y)', users: '₹34,200 LTV', riskScore: '88%', decayFactor: 'Cancelled dental checkup after 40-minute clinic reception wait', playbook: 'Personal Call from Medical Director + Free Home Consultation', winbackRate: '84.0%' },
    { cohort: 'Ananya Deshmukh · Bruno (German Shepherd, 6Y)', users: '₹62,000 LTV', riskScore: '84%', decayFactor: 'Switched prescription renal food purchase to third-party website', playbook: 'Price-Match Guarantee + Auto-Ship Subscription 10% Discount', winbackRate: '81.2%' },
    { cohort: 'Karan Grover · Leo (Beagle, 2Y)', users: '₹28,400 LTV', riskScore: '81%', decayFactor: 'Completed puppy shots; 180 days with zero preventive engagement', playbook: 'Free Canine Annual Wellness Exam invite via App Notification', winbackRate: '79.5%' },
    { cohort: 'Dr. Sneha Reddy · Bella (Labrador, 8Y)', users: '₹78,900 LTV', riskScore: '79%', decayFactor: 'Senior arthritis pain medication lapsed 30 days past schedule', playbook: 'Urgent Vet Nurse Wellness Check-in Call + Pain Scorecard', winbackRate: '86.4%' },
    { cohort: 'Rahul Nambiar · Simba (Indie Cat, 2Y)', users: '₹21,500 LTV', riskScore: '76%', decayFactor: 'Missed annual booster; 2 unresolved chat inquiries on fees', playbook: 'Senior Support Ticket Escalation + 1-Click Vaccine Home Visit', winbackRate: '74.8%' },
    { cohort: 'Meera Swaminathan · Rocky (Rottweiler, 5Y)', users: '₹54,000 LTV', riskScore: '74%', decayFactor: 'Express delivery delayed by 45 min during last storm order', playbook: 'Delivery Fee Refund Credit + Apology Gift Box of Treats', winbackRate: '82.0%' },
    { cohort: 'Aditya Chopra · Milo (Shih Tzu, 1.5Y)', users: '₹19,800 LTV', riskScore: '72%', decayFactor: 'Grooming appointment rescheduled twice due to slot shortage', playbook: 'Guaranteed Weekend Morning VIP Grooming Slot Reserved', winbackRate: '85.2%' },
    { cohort: 'Tanvi Saxena · Coco (Cocker Spaniel, 3Y)', users: '₹31,000 LTV', riskScore: '68%', decayFactor: 'Ear infection follow-up visit unconfirmed 14 days overdue', playbook: 'Automated Otitis Follow-Up Nudge with Attending Vet Dr. Ramesh', winbackRate: '77.5%' },
    { cohort: 'Arjun Singhal · Oscar (Pug, 7Y)', users: '₹44,200 LTV', riskScore: '65%', decayFactor: 'Decreasing order frequency from 2.4x/mo down to 0.8x/mo', playbook: 'Curated Senior Pug Nutrition & Respiratory Care Package', winbackRate: '79.0%' }
  ];

  return (
    <DashboardLayout
      category="AI Assistant"
      subcategory="Churn Prediction"
      title="Predictive Churn Radar & Proactive Retention Playbooks"
      subtitle="Early-warning indicators, churn risk probability distributions, and automated win-back intervention funnels"
      icon="🛡️"
      badge="Early Warning Churn Radar"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Overall Churn Risk Index" value="0.0%" delta="--" trend="neutral" subtext="No baseline records" icon="🛡️" />
        <KpiCard label="High-Risk Pet Parents" value="0 Users" delta="--" trend="neutral" subtext="No users queued" icon="⚠️" />
        <KpiCard label="Intervention Win-Back Rate" value="0.0%" delta="--" trend="neutral" subtext="No win-back records" icon="🔄" />
        <KpiCard label="Protected Annual Revenue" value="₹0" delta="--" trend="neutral" subtext="No protected revenue" icon="💎" />
      </div>

      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>At-Risk Cohorts & Automated Retention Playbooks</h3>
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b' }}>Model: Survival Analysis + Random Forest</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>AT-RISK COHORT</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'right' }}>USERS</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'center' }}>CHURN PROBABILITY</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>PRIMARY DECAY CAUSE</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>AUTOMATED INTERVENTION</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'right' }}>WIN-BACK RATE</th>
              </tr>
            </thead>
            <tbody>
              {churnCohorts.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: '24px', textAlign: 'center', color: '#94a3b8' }}>
                    No at-risk cohorts or churn predictions found
                  </td>
                </tr>
              ) : (
                churnCohorts.map((c, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>{c.cohort}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{c.users}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '12px',
                      background: parseFloat(c.riskScore) > 75 ? '#fee2e2' : '#fef3c7',
                      color: parseFloat(c.riskScore) > 75 ? '#991b1b' : '#92400e'
                    }}>
                      {c.riskScore}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>{c.rootCause}</td>
                  <td style={{ padding: '12px 16px', color: '#2563eb', fontWeight: 500 }}>{c.intervention}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 700, color: '#059669' }}>{c.recoveryRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
