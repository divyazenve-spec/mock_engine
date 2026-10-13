import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function PetHealthInsights() {
  const [filter, setFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [actionMessage, setActionMessage] = useState('');

  const insights = [
    { id: 'INS-01', title: 'Seasonal Canine Parvovirus & Vector Alert - East Bengaluru Hub', category: 'Infectious Epidemiology', severity: 'Critical', metric: '100% Vax Protected', preventable: 'Averts Outbreaks', cohort: 'Puppies & Young Canines (Indiranagar / Whitefield)', description: 'Geographic micro-clustering detected a surge in tick-borne hemoprotozoa cases across eastern corridors. Automated reminder broadcasts triggered for Bravecto/Simparica administration.', recommendation: 'Mandatory 4DX snap testing for febrile presentations and vector prophylaxis recall.', impact: 'Zero transmission among registered cohort', actionLabel: 'Dispatch Vector SMS' },
    { id: 'INS-02', title: 'Brachycephalic Upper Airway Monitoring - Milo & Oreo', category: 'Breed Genetic Risks', severity: 'Warning', metric: '2 Patients Monitored', preventable: 'Stenotic Prevention', cohort: 'French Bulldogs & Pugs (Grade 2 BAS)', description: 'Thermal stress indices in Bengaluru summer triggered heat vulnerability advisory. Milo completed successful staph surgical correction; Oreo recommended for cooling pad protocol.', recommendation: 'Schedule prophylactic elongated soft palate review before peak dry season.', impact: '95% reduction in respiratory distress', actionLabel: 'Book Airway Review' },
    { id: 'INS-03', title: 'Canine Hip Dysplasia & OA Management Protocol - Max', category: 'Musculoskeletal & Mobility', severity: 'Warning', metric: '82% Mobility Restored', preventable: 'Prevents Joint Collapse', cohort: 'Large Breed Canines > 25kg (Golden Retrievers)', description: 'Gait telemetry analysis and radiographic scoring showed Grade 2 coxofemoral laxity. Regenerative PRP and bi-weekly hydrotherapy achieved marked pain reduction without steroid dependency.', recommendation: 'Continuous Glyco-Flex 3 supplementation and quarterly mobility scoring.', impact: 'Maintained independent active ambulation', actionLabel: 'Refill Joint Formula' },
    { id: 'INS-04', title: 'Feline Lower Urinary Tract Surveillance - Luna', category: 'Metabolic & Feline Renal', severity: 'Critical', metric: 'pH 6.4 Controlled', preventable: 'Prevents Obstruction', cohort: 'Persian & Indoor Feline Breeds (Water-Averse)', description: 'Urinalysis indicated microscopic struvite crystalluria. Therapeutic prescription diet (Royal Canin S/O) and ceramic water fountain installation reversed crystal precipitation.', recommendation: 'Bimonthly urine specific gravity test and wet food intake tracking.', impact: 'Zero repeat urethral obstruction', actionLabel: 'Order Urinary S/O Pack' },
    { id: 'INS-05', title: 'Atopic Dermatitis & Cytopoint mAb Response - Coco', category: 'Immunology & Allergy', severity: 'Milestone', metric: 'Pruritus Index: 1/10', preventable: 'Prevents Secondary Pyoderma', cohort: 'Toy & Long-Haired Breeds (Shih Tzu / Lhasa)', description: 'Targeted Interleukin-31 antibody (Cytopoint 10mg) halted intractable itch-scratch cycles. Elimination diet trial established environmental dust-mite etiology.', recommendation: 'Maintain 8-week maintenance injections and chlorhexidine shampoo regimen.', impact: '100% resolution of skin erythema', actionLabel: 'Schedule Next Cytopoint' },
    { id: 'INS-06', title: 'Kennel Cough Tracheobronchitis Exposure - Rocky', category: 'Respiratory Cluster', severity: 'Milestone', metric: 'Resolved (Day 8)', preventable: 'Vaccine Preventable', cohort: 'Boarding & Daycare Active Canines', description: 'Bordetella bronchiseptica exposure post-boarding treated swiftly with nebulization and doxycycline. Nobivac KC booster logged for all dog park companions.', recommendation: 'Mandatory intrapent immunization prior to seasonal boarding.', impact: 'Zero secondary bronchopneumonia', actionLabel: 'Log Boarding Clearance' },
    { id: 'INS-07', title: 'Post-Gastroenteritis Gut Flora Reconstitution - Bella', category: 'Gastroenterology', severity: 'Milestone', metric: 'Normal Stool Score 2', preventable: 'Dietary Discipline', cohort: 'Working & Guard Breeds (German Shepherd)', description: 'Follow-up fecal analysis post-acute enteritis verified zero bacterial overgrowth. Hill\'s GI Biome prebiotic fiber successfully normalized microbiome biodiversity.', recommendation: 'Taper off anti-emetics; maintain strict probiotic administration for 14 days.', impact: 'Weight recovery of +1.2kg in 2 weeks', actionLabel: 'Verify Microbiome Panel' },
    { id: 'INS-08', title: 'Prophylactic Laparoscopic Gastropexy Efficacy - Bruno', category: 'Surgical Prophylaxis', severity: 'Milestone', metric: 'Zero GDV Risk', preventable: 'Life-Saving Intervention', cohort: 'Deep-Chested Molosser Breeds (Rottweiler)', description: 'Minimally invasive laparoscopic gastropexy permanently fixed the gastric antrum to abdominal wall, neutralizing life-threatening gastric torsion risk.', recommendation: 'Standard post-surgical incision check at Day 10 and gradual return to exercise.', impact: 'Lifetime eradication of torsion mortality', actionLabel: 'Schedule Suture Check' },
    { id: 'INS-09', title: 'Senior Canine Cognitive & Geriatric Biomarker Check - Leo', category: 'Geriatric Wellness', severity: 'Warning', metric: 'SDMA 11 µg/dL (Normal)', preventable: 'Early Renal Staging', cohort: 'Canines 5+ Years (Labrador)', description: 'Comprehensive baseline geriatric screening confirmed early osteoarthritis in right stifle, but excellent renal/hepatic clearance biomarkers.', recommendation: 'Transition to Royal Canin Mobility diet; commence low-impact swimming exercises.', impact: 'Preserved lean muscle mass & joint ease', actionLabel: 'Initiate Hydro Protocol' },
    { id: 'INS-10', title: 'Desi / Indie Resilience & Vaccination Passport - Simba', category: 'Community Health', severity: 'Milestone', metric: 'Optimal BCS 5.0', preventable: 'Full Core Immunity', cohort: 'Native / Indie Breeds (Hardy Phenotype)', description: 'Full core immunizations (DHPPi + Rabies) and broad-spectrum parasite deworming completed. Superior immunological response recorded with zero adverse events.', recommendation: 'Routine annual booster in August 2025; ongoing basic flea control.', impact: 'Exemplary baseline companion health', actionLabel: 'Issue Digital Passport' }
  ];

  const biomarkerSurveillance = [
    { test: 'SDMA (Symmetric Dimethylarginine)', indication: 'Early Renal Function (25% loss detection)', tested: 10, normal: '9 (90%)', atRisk: '1 (10%)', pathological: '0 (0%)', action: 'Renal protective wet diet' },
    { test: 'Canine 4Dx Plus (Heartworm, Lyme, Ehrlichia, Anaplasma)', indication: 'Tick-borne Hemoparasite Surveillance', tested: 10, normal: '9 (90%)', atRisk: '1 (10%)', pathological: '0 (0%)', action: 'Simparica Trio + Doxycycline' },
    { test: 'Alanine Aminotransferase (ALT)', indication: 'Hepatic Parenchymal Integrity', tested: 10, normal: '10 (100%)', atRisk: '0 (0%)', pathological: '0 (0%)', action: 'Standard dietary support' },
    { test: 'Serum Alkaline Phosphatase (ALP)', indication: 'Cholestasis & Bone Turnover', tested: 10, normal: '9 (90%)', atRisk: '1 (10%)', pathological: '0 (0%)', action: 'Hepatoprotective SAMe' },
    { test: 'Serum Lipase (DGGR / cPLI)', indication: 'Pancreatic Inflammation (Pancreatitis)', tested: 10, normal: '10 (100%)', atRisk: '0 (0%)', pathological: '0 (0%)', action: 'Low-fat dietary restriction' },
    { test: 'Thyroxine (Total T4 & fT4 by ED)', indication: 'Canine Hypo / Feline Hyperthyroidism', tested: 10, normal: '10 (100%)', atRisk: '0 (0%)', pathological: '0 (0%)', action: 'Annual endocrine screening' },
    { test: 'Urine Protein:Creatinine (UPC) Ratio', indication: 'Glomerular Proteinuria Early Marker', tested: 10, normal: '9 (90%)', atRisk: '1 (10%)', pathological: '0 (0%)', action: 'ACE inhibitor evaluation' },
    { test: 'Cardiac Troponin I (cTnI)', indication: 'Myocardial Injury & DCM Detection', tested: 10, normal: '10 (100%)', atRisk: '0 (0%)', pathological: '0 (0%)', action: 'Cardiology ultrasound' },
    { test: 'Fructosamine & Fasting Glucose', indication: 'Diabetes Mellitus Glycemic Trend', tested: 10, normal: '10 (100%)', atRisk: '0 (0%)', pathological: '0 (0%)', action: 'Weight management' },
    { test: 'Cobalamin (Vit B12) & Folate', indication: 'Distal Ileal GI Absorption & IBD', tested: 10, normal: '9 (90%)', atRisk: '1 (10%)', pathological: '0 (0%)', action: 'Oral cobalamin supplementation' }
  ];

  const handleAction = (title, label) => {
    setActionMessage(`Executing "${label}" for: ${title}`);
    setTimeout(() => setActionMessage(''), 4500);
  };

  const filteredInsights = insights.filter(ins => {
    const matchesFilter = filter === 'ALL' || ins.severity === filter || ins.category.toLowerCase().includes(filter.toLowerCase());
    const matchesSearch = ins.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ins.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ins.cohort.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <DashboardLayout
      category="Pets 360°"
      subcategory="Pet Health Insights"
      title="Zenve AI Pet Health Intelligence & Epidemiological Surveillance"
      subtitle="Machine learning-driven epidemiological alert triggers, infectious disease clustering, genetic risk flags, biomarker surveillance, and proactive clinical recall protocols"
      icon="🧠"
      badge="10 Active Intelligence Signals"
      actions={
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['ALL', 'Critical', 'Warning', 'Milestone'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                border: filter === f ? '1px solid #2563eb' : '1px solid #e2e8f0',
                background: filter === f ? '#eff6ff' : '#ffffff',
                color: filter === f ? '#2563eb' : '#64748b',
                transition: 'all 0.15s ease'
              }}
            >
              {f === 'ALL' ? 'All Signals' : f}
            </button>
          ))}
        </div>
      }
    >
      {/* Toast Feedback */}
      {actionMessage && (
        <div style={{
          marginBottom: '18px',
          padding: '12px 18px',
          borderRadius: '8px',
          background: '#eff6ff',
          border: '1px solid #93c5fd',
          color: '#1e40af',
          fontSize: '13px',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          animation: 'fadeIn 0.2s ease'
        }}>
          <span>⚡</span>
          <span>{actionMessage}</span>
        </div>
      )}

      {/* KPI Ribbon */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '22px' }}>
        <KpiCard label="Population Health Index" value="91.8" delta="Optimal Health Band" trend="up" subtext="Aggregated clinical wellness score" icon="🧠" />
        <KpiCard label="Active Surveillance Triggers" value="10" delta="10 Monitored" trend="up" subtext="Epidemiological clusters" icon="🚨" />
        <KpiCard label="Early Morbidity Staging" value="94.5%" delta="+6.2% YoY" trend="up" subtext="Averts late-stage hospitalization" icon="🛡️" />
        <KpiCard label="Parent Recall Action Rate" value="88.4%" delta="9/10 Recalls" trend="up" subtext="WhatsApp & push response" icon="📱" />
        <KpiCard label="Chronic Care Cohort" value="4" delta="4 Active" trend="neutral" subtext="Enrolled in remote monitoring" icon="🩺" />
      </div>

      {/* Filter and Search Bar */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '10px',
        padding: '14px 18px',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '260px' }}>
          <span style={{ fontSize: '14px' }}>🔍</span>
          <input
            type="text"
            placeholder="Search health insights by condition, breed, cohort, or symptom..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              border: 'none',
              outline: 'none',
              fontSize: '13px',
              color: '#0f172a'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '6px' }}>
          {['ALL', 'Critical Outbreak', 'Clinical Warning', 'Breed Genetic Risk', 'Wellness Milestone'].map(c => (
            <button
              key={c}
              onClick={() => setFilter(c === 'ALL' ? 'ALL' : c)}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
                border: filter === c ? '1px solid #2563eb' : '1px solid #e2e8f0',
                background: filter === c ? '#eff6ff' : '#f8fafc',
                color: filter === c ? '#2563eb' : '#64748b'
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Main Insights Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
        {filteredInsights.map(ins => {
          const isCritical = ins.severity === 'Critical';
          const isWarning = ins.severity === 'Warning';
          const isMilestone = ins.severity === 'Milestone';

          const badgeBg = isCritical ? '#fef2f2' : isWarning ? '#fffbeb' : '#ecfdf5';
          const badgeColor = isCritical ? '#dc2626' : isWarning ? '#d97706' : '#059669';
          const badgeBorder = isCritical ? '#fca5a5' : isWarning ? '#fde68a' : '#a7f3d0';

          return (
            <div key={ins.id} style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '20px 24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
              position: 'relative'
            }}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: '999px',
                    fontSize: '11px',
                    fontWeight: 700,
                    background: badgeBg,
                    color: badgeColor,
                    border: `1px solid ${badgeBorder}`
                  }}>
                    {ins.category}
                  </span>
                  <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>{ins.title}</h3>
                  <span style={{ fontSize: '11px', color: '#64748b', background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px' }}>
                    {ins.timeframe}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    fontSize: '13px',
                    color: isCritical ? '#dc2626' : '#2563eb',
                    background: isCritical ? '#fef2f2' : '#eff6ff',
                    padding: '4px 10px',
                    borderRadius: '6px'
                  }}>
                    {ins.metric}
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#059669', background: '#ecfdf5', padding: '4px 8px', borderRadius: '6px' }}>
                    {ins.preventable}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p style={{ margin: '0 0 14px', fontSize: '13px', color: '#475569', lineHeight: 1.6 }}>
                {ins.description}
              </p>

              {/* Recommendation Callout */}
              <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '14px 18px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '14px'
              }}>
                <div style={{ flex: 1, minWidth: '280px' }}>
                  <div style={{ fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>
                    <strong style={{ color: '#2563eb' }}>💡 Recommended Action Protocol:</strong> {ins.recommendation}
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>
                    Target Cohort: <strong style={{ color: '#334155' }}>{ins.cohort}</strong> • Impact: <strong style={{ color: '#334155' }}>{ins.impact}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <button
                    onClick={() => handleAction(ins.title, ins.actionLabel)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '6px',
                      background: '#2563eb',
                      color: '#ffffff',
                      border: 'none',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: '0 1px 2px rgba(37,99,235,0.2)',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span>⚡</span>
                    {ins.actionLabel}
                  </button>
                  <button
                    onClick={() => handleAction(ins.title, 'Export Cohort EHRs')}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '6px',
                      background: '#ffffff',
                      color: '#475569',
                      border: '1px solid #cbd5e1',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Export Cohort
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Biomarker Surveillance & Early Detection Clustering */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Biomarker Surveillance & Subclinical Pathology Clustering</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Automated telemetry monitoring early asymptomatic disease markers across clinical diagnostics</p>
          </div>
          <span style={{ fontSize: '11px', color: '#2563eb', fontWeight: 600, background: '#eff6ff', padding: '4px 10px', borderRadius: '4px' }}>
            1,149 Laboratory Panels Screened
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontSize: '11px', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px 16px' }}>Diagnostic Biomarker Test</th>
                <th style={{ padding: '12px 16px' }}>Clinical Indication</th>
                <th style={{ padding: '12px 16px' }}>Tested Count</th>
                <th style={{ padding: '12px 16px' }}>Normal Cohort</th>
                <th style={{ padding: '12px 16px' }}>At-Risk / Borderline</th>
                <th style={{ padding: '12px 16px' }}>Pathological</th>
                <th style={{ padding: '12px 16px' }}>Proactive Protocol</th>
              </tr>
            </thead>
            <tbody>
              {biomarkerSurveillance.map((bm, idx) => (
                <tr key={bm.test} style={{ borderBottom: idx !== biomarkerSurveillance.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#0f172a' }}>{bm.test}</td>
                  <td style={{ padding: '12px 16px', color: '#475569' }}>{bm.indication}</td>
                  <td style={{ padding: '12px 16px', fontWeight: 600 }}>{bm.tested}</td>
                  <td style={{ padding: '12px 16px', color: '#059669', fontWeight: 700 }}>{bm.normal}</td>
                  <td style={{ padding: '12px 16px', color: '#d97706', fontWeight: 700 }}>
                    <span style={{ background: '#fffbeb', padding: '2px 8px', borderRadius: '4px', border: '1px solid #fde68a' }}>
                      {bm.atRisk}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#dc2626', fontWeight: 700 }}>
                    <span style={{ background: '#fef2f2', padding: '2px 8px', borderRadius: '4px', border: '1px solid #fca5a5' }}>
                      {bm.pathological}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '12px', color: '#2563eb', fontWeight: 600 }}>
                    {bm.action}
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
