import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function BusinessInsights() {
  const cardStyle = {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '22px 24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
  };

    const insights = [
    { category: 'PHARMACY & FULFILLMENT', tag: 'CRITICAL', tagColor: '#dc2626', title: 'Batch Expiry Clustering on Feline Antibiotic Injectables at Koramangala', desc: '180 vials of specialized feline injectable antibiotics are within 45 days of expiration. Moving them to high-velocity surgical hubs prevents inventory loss.', impact: '₹1.85L Protected Margin' },
    { category: 'CLINICAL SURGERY', tag: 'HIGH IMPACT', tagColor: '#ea580c', title: 'Post-Operative Ultrasound Under-Utilization Across Mumbai Clinics', desc: 'Post-operative scan attachment rate lags surgical procedures by 34%. Adding standard ultrasound prompts to EMR discharge generates clinical diagnostic yield.', impact: '₹4.2L Monthly Diagnostic Lift' },
    { category: 'EXPRESS LOGISTICS', tag: 'HIGH IMPACT', tagColor: '#ea580c', title: 'Peak Evening Dispatch Bottleneck in Whitefield Micro-Hub', desc: 'Between 6 PM and 8 PM, prescription delivery times extend by 22 minutes. Pre-staging top 40 emergency pharmaceuticals mitigates SLA breaches.', impact: '98.5% Delivery SLA Restoration' },
    { category: 'CLIENT RETENTION', tag: 'CRITICAL', tagColor: '#dc2626', title: 'Puppy Vaccination Dropout Following 2nd DHLPP Administration', desc: 'Over 28% of registered puppy owners miss the crucial third booster shot. Automated WhatsApp video guides from attending veterinarians reverse the drop.', impact: '₹8.9L LTV Retention' },
    { category: 'DIAGNOSTIC LABS', tag: 'EFFICIENCY', tagColor: '#2563eb', title: 'Blood Chemistry Turnaround Lag at HSR Polyclinic', desc: 'Biochemical panel processing delays increased consultation wait times to 54 minutes. Deploying dedicated auxiliary centrifuges cuts queue by half.', impact: '18 Minutes Saved / Visit' },
    { category: 'EMERGENCY & ICU', tag: 'CAPACITY', tagColor: '#ea580c', title: 'Weekend Night-Shift ICU Surge in Bandra Medical Center', desc: 'Weekend emergency trauma admissions spiked 42%, causing surgeon overtime fatigue. Roster adjustments for Friday-Sunday on-call coverage balance demand.', impact: '₹3.1L Surplus Billing Capture' },
    { category: 'RETAIL & DIETS', tag: 'RETENTION', tagColor: '#2563eb', title: 'Prescription Renal Diet Reorder Cycle Elongation', desc: 'Pet parents are purchasing therapeutic renal bags 14 days later than clinical intake requirements. Auto-ship reminder sequence with free treats secures regimen.', impact: '₹2.4L Recurring Revenue' },
    { category: 'PREVENTIVE CARE', tag: 'CLINICAL', tagColor: '#2563eb', title: 'Annual Dental Prophylaxis Gap in Senior Canines', desc: 'Periodontal disease screenings show 64% of canines over 6 years exhibit Grade 2+ tartar. Introducing preventive ultrasonic dental checkups improves health.', impact: '₹3.6L Clinical Revenue' },
    { category: 'SOURCING & COGS', tag: 'PROCUREMENT', tagColor: '#059669', title: 'National Microchip Supplier Contract Consolidation', desc: 'Current decentralized procurement across regional hubs results in a 7.2% unit price variance. Consolidating volume with Trovan lowers cost.', impact: '₹1.15L Cost Reduction' },
    { category: 'DERMATOLOGY', tag: 'SPECIALTY', tagColor: '#ea580c', title: 'Seasonal Canine Atopic Dermatitis Outbreak in Bangalore', desc: 'Monsoon humidity triggered a 65% surge in allergic dermatitis consultations. Expanding tele-triage allergy slots eliminates a 3-day appointment backlog.', impact: '₹2.8L Consult Fee Capture' }
  ];

  return (
    <DashboardLayout
      category="AI Assistant"
      subcategory="Business Insights"
      title="Automated Business Insights & Executive Synthesis"
      subtitle="AI-synthesized operational patterns, cross-functional growth vectors, and real-time efficiency unlocks"
      icon="💡"
      badge="Daily Briefing Active"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Synthesized Insights" value="10 Active" delta="+3 Today" trend="up" subtext="Across 14 facilities" icon="💡" />
        <KpiCard label="Estimated Revenue Value" value="₹28.4L" delta="+18.2%" trend="up" subtext="Projected monthly upside" icon="💰" />
        <KpiCard label="Action Adoption Rate" value="92.4%" delta="+4.1% MoM" trend="up" subtext="Clinical teams executing" icon="🚀" />
        <KpiCard label="Efficiency Gain" value="+18.2%" delta="+2.8%" trend="up" subtext="Operating velocity boost" icon="⚡" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {insights.length === 0 ? (
          <div style={{ ...cardStyle, textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
            No priority business intelligence insights available
          </div>
        ) : (
          insights.map((ins, i) => (
            <div key={i} style={cardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{ins.category}</span>
                <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '12px', background: '#f1f5f9', color: ins.tagColor }}>
                  {ins.tag}
                </span>
              </div>
              <h3 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>{ins.title}</h3>
              <p style={{ margin: '0 0 14px', fontSize: '13px', lineHeight: '1.6', color: '#475569' }}>{ins.desc}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#059669' }}>Projected Financial Impact: {ins.impact}</span>
                <button
                  onClick={() => alert(`Initiating action workflow for: ${ins.title}`)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '6px',
                    border: '1px solid #4f46e5',
                    background: '#eef2ff',
                    color: '#4338ca',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Execute Recommendation →
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
}
