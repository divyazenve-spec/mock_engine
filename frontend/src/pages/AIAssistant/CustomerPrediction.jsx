import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function CustomerPrediction() {
  const cardStyle = {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '22px 24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
  };

    const nextActions = [
    { petParent: 'Ananya Sharma · Simba (Puppy 4M)', propensity: 'DHLPP 3rd Booster + Rabies Vaccine', prob: '96.4%', affinity: 'Preventive Core Immunization Package', estRev: '₹3,850', channel: 'WhatsApp 1-Click Booking' },
    { petParent: 'Rajesh Nair · Bruno (Labrador 5Y)', propensity: 'Post-Op Cruciate Rehab & Joint Chondroitin', prob: '94.2%', affinity: 'Laser Therapy + Synoquin Mobility Pack', estRev: '₹8,200', channel: 'Pet Concierge Nurse Callback' },
    { petParent: 'Kavita Pillai · Leo (Beagle 8Y)', propensity: 'Caninsulin Chronic Refill + Sensor Pack', prob: '95.8%', affinity: 'Monthly Diabetic Management Plan', estRev: '₹4,500', channel: 'SMS Auto-Ship 1-Tap Reorder' },
    { petParent: 'Sameer Sen · Cleo (Persian Cat 9Y)', propensity: 'Comprehensive Senior Renal Diagnostic Panel', prob: '91.5%', affinity: 'Geriatric Wellness Screening + SDMA', estRev: '₹5,400', channel: 'In-App Doctor Health Card' },
    { petParent: 'Deepak Joshi · Tyson (German Shepherd 2Y)', propensity: 'Kennel Cough (Bordetella) + Tick Chewables', prob: '89.4%', affinity: 'Social Pet Preventive Bundle (15% Off)', estRev: '₹2,900', channel: 'Push Notification Prompt' },
    { petParent: 'Pooja Hegde · Bella (French Bulldog 3Y)', propensity: 'Cytopoint Injection / Apoquel Dermatitis Refill', prob: '93.7%', affinity: 'Specialist Dermatology Protocol', estRev: '₹6,100', channel: 'Dermatology Clinic Nudge' },
    { petParent: 'Rohan Mehra · Oscar (Indie Cat 1Y)', propensity: 'Spay/Neuter Procedure Consultation', prob: '88.1%', affinity: 'Pediatric Surgery + Post-Op Recovery Kit', estRev: '₹4,200', channel: 'Personalized Email Video' },
    { petParent: 'Sunita Aggarwal · Thor (Rottweiler 6Y)', propensity: 'Adequan Injection Course + Orthopedic Bedding', prob: '95.0%', affinity: 'Advanced Osteoarthritis Therapy', estRev: '₹12,500', channel: 'Specialist Vet Direct Booking' },
    { petParent: 'Naveen Reddy · Coco (Shih Tzu 4Y)', propensity: 'Ultrasonic Dental Scaling + Plaque Chews', prob: '92.3%', affinity: 'Dental Care Hygiene Session', estRev: '₹4,800', channel: 'WhatsApp Before/After Case' },
    { petParent: 'Alok Verma · Charlie (Indie Dog 3Y)', propensity: 'Therapeutic GI Food Subscription (Monthly)', prob: '94.8%', affinity: 'Gastrointestinal Care Diet Package', estRev: '₹3,400', channel: '60-Min Express Repeat Delivery' }
  ];

  return (
    <DashboardLayout
      category="AI Assistant"
      subcategory="Customer Prediction"
      title="Predictive Customer Intelligence & Next-Best-Action"
      subtitle="Machine-learned repurchase cycles, clinical preventive health triggers, and omnichannel affinity modeling"
      icon="👥"
      badge="NBA Predictor Online"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Next-Best-Action Accuracy" value="0.0%" delta="--" trend="neutral" subtext="No conversion data" icon="🎯" />
        <KpiCard label="Predicted Repurchase Pipeline" value="₹0" delta="--" trend="neutral" subtext="No pipeline data" icon="💰" />
        <KpiCard label="Vaccination Recall Accuracy" value="0.0%" delta="--" trend="neutral" subtext="No schedule records" icon="💉" />
        <KpiCard label="Cross-Sell Conversion Rate" value="0.0%" delta="--" trend="neutral" subtext="No nudges active" icon="🚀" />
      </div>

      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Next-Best-Action Customer Triggers</h3>
          <span style={{ fontSize: '11px', color: '#64748b' }}>Omnichannel Engagement Queue</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>PET PARENT & PET</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>PREDICTED HEALTH / BUY EVENT</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'center' }}>PROBABILITY</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>RECOMMENDED PRODUCT / SERVICE</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'right' }}>EST. VALUE</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'right' }}>AUTOMATION</th>
              </tr>
            </thead>
            <tbody>
              {nextActions.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: '24px', textAlign: 'center', color: '#94a3b8' }}>
                    No next-best-action customer triggers found
                  </td>
                </tr>
              ) : (
                nextActions.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>{row.petParent}</td>
                  <td style={{ padding: '12px 16px', color: '#334155' }}>{row.propensity}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '12px', background: '#ecfdf5', color: '#047857' }}>
                      {row.prob}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#2563eb', fontWeight: 500 }}>{row.affinity}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#0f172a' }}>{row.estRev}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <button
                      onClick={() => alert(`Triggered: ${row.action} for ${row.petParent}`)}
                      style={{
                        padding: '5px 12px',
                        borderRadius: '6px',
                        border: '1px solid #4f46e5',
                        background: '#eef2ff',
                        color: '#4338ca',
                        fontSize: '11px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Trigger Nudge
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
