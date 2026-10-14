import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ClinicNetwork() {
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedTier, setSelectedTier] = useState('All');

    const facilities = [
    { id: 'FAC-01', name: 'Zenve Indiranagar Central Hospital', city: 'Bengaluru', tier: 'Tertiary Flagship', role: 'Regional Tertiary Hub & ICU', beds: '28 Beds (6 ICU)', ots: '3 Modular OTs', ambulance: '2 ALS Units Assigned', telemed: 'Central Command Host', referralsReceived: '42 / Mo', status: 'Operational' },
    { id: 'FAC-02', name: 'Zenve Bandra West Trauma Centre', city: 'Mumbai', tier: 'Tertiary Flagship', role: '24x7 Emergency Trauma Hub', beds: '24 Beds (5 ICU)', ots: '2 Modular OTs', ambulance: '1 ALS Unit Assigned', telemed: 'Hub Console Active', referralsReceived: '38 / Mo', status: 'Operational' },
    { id: 'FAC-03', name: 'Zenve DLF CyberCity Critical Care', city: 'Delhi NCR', tier: 'Tertiary Flagship', role: 'Multi-Specialty & Onco Hub', beds: '32 Beds (8 ICU)', ots: '3 Modular OTs', ambulance: '1 ALS Unit Assigned', telemed: 'Hub Console Active', referralsReceived: '46 / Mo', status: 'Operational' },
    { id: 'FAC-04', name: 'Zenve Jubilee Hills Specialty Center', city: 'Hyderabad', tier: 'Tertiary Flagship', role: 'Spine & Neurosurgery Hub', beds: '22 Beds (4 ICU)', ots: '2 Modular OTs', ambulance: '1 ALS Unit Assigned', telemed: 'Hub Console Active', referralsReceived: '34 / Mo', status: 'Operational' },
    { id: 'FAC-05', name: 'Zenve Koregaon Park Hospital', city: 'Pune', tier: 'Tertiary Flagship', role: 'Tertiary Care Referral Hospital', beds: '20 Beds (4 ICU)', ots: '2 Modular OTs', ambulance: '1 ALS Unit Assigned', telemed: 'Hub Console Active', referralsReceived: '28 / Mo', status: 'Operational' },
    { id: 'FAC-06', name: 'Zenve Koramangala Care Clinic', city: 'Bengaluru', tier: 'Secondary Specialty', role: 'Feline & Dental Daycare Spoke', beds: '6 Daycare Pods', ots: '1 Minor OT', ambulance: 'Stationed Spoke Unit', telemed: 'Tele-PACS Connected', referralsReceived: '14 / Mo', status: 'Operational' },
    { id: 'FAC-07', name: 'Zenve Andheri Link Rd Clinic', city: 'Mumbai', tier: 'Secondary Specialty', role: 'Surgery & Daycare Spoke', beds: '8 Daycare Pods', ots: '1 Minor OT', ambulance: 'Corridor Linked', telemed: 'Tele-PACS Connected', referralsReceived: '18 / Mo', status: 'Operational' },
    { id: 'FAC-08', name: 'Zenve Saket Pet Wellness & Diagnostics', city: 'Delhi NCR', tier: 'Primary Express', role: 'Diagnostics & OPD Spoke', beds: '6 Daycare Pods', ots: '1 Minor OT', ambulance: 'Corridor Linked', telemed: 'Tele-PACS Connected', referralsReceived: '12 / Mo', status: 'Operational' },
    { id: 'FAC-09', name: 'Zenve Gachibowli Daycare & Dental', city: 'Hyderabad', tier: 'Secondary Specialty', role: 'Dermatology & Daycare Spoke', beds: '8 Daycare Pods', ots: '1 Minor OT', ambulance: 'Corridor Linked', telemed: 'Tele-PACS Connected', referralsReceived: '15 / Mo', status: 'Operational' },
    { id: 'FAC-10', name: 'Zenve Alwarpet Community Pet Clinic', city: 'Chennai', tier: 'Primary Express', role: 'Primary OPD & Diagnostics', beds: '5 Daycare Pods', ots: '1 Minor OT', ambulance: 'On-Call Unit', telemed: 'Tele-PACS Connected', referralsReceived: '10 / Mo', status: 'Operational' }
  ];

  const ambulanceFleet = [
    { vehicle: 'KA-03-AG-4412', id: 'AMB-BLR-01', status: 'In Transit (Emergency)', base: 'Indiranagar Central Hospital', city: 'Bengaluru', medic: 'Paramedic Harish B. & Vet Tech Anitha', equipment: 'Onboard O2 Concentrator, Defibrillator & Neonatal Incubator', pet: 'Triage Case: Golden Retriever Trauma', eta: '8 mins (HAL Airport Rd)' },
    { vehicle: 'MH-02-DN-7731', id: 'AMB-BOM-01', status: 'Dispatched to Scene', base: 'Bandra Trauma Centre', city: 'Mumbai', medic: 'Paramedic Nilesh Shinde & Dr. Rathore', equipment: 'Mobile Suction, Multipara Monitor, Splint Kits', pet: 'Triage Case: Suspected GDV', eta: '12 mins (Linking Road)' },
    { vehicle: 'DL-01-ZA-9920', id: 'AMB-NCR-01', status: 'Standby at Base', base: 'DLF CyberCity Hospital', city: 'Delhi NCR', medic: 'Paramedic Rakesh Tanwar & Vet Tech Neetu', equipment: 'Advanced Life Support ICU, Cryo Oxygen, Syringe Drivers', pet: 'Base Ready', eta: 'Immediate Base Ready' },
    { vehicle: 'TS-09-EV-3345', id: 'AMB-HYD-01', status: 'Returning to Base', base: 'Jubilee Hills Center', city: 'Hyderabad', medic: 'Paramedic Santosh K. & Vet Tech Praveen', equipment: 'Crash Cart, Portable Ultrasound, Hydraulic Pet Stretcher', pet: 'Transfer Completed: Canine Spine Case', eta: '15 mins (Road No. 36)' },
    { vehicle: 'MH-12-PQ-8812', id: 'AMB-PUN-01', status: 'In Transit (Inter-Hospital)', base: 'Koregaon Park Hospital', city: 'Pune', medic: 'Paramedic Vaibhav J. & Vet Tech Meena', equipment: 'Ventilator Support, Heated Recovery Pod, IV Infusion', pet: 'Patient Transfer: Sepsis Support', eta: '20 mins (Viman Nagar)' },
    { vehicle: 'KA-04-MK-1190', id: 'AMB-BLR-02', status: 'Standby at Base', base: 'Koramangala Care Clinic', city: 'Bengaluru', medic: 'Paramedic Suresh G. & Vet Tech Deepa', equipment: 'Basic Emergency Trauma Kit, Oxygen Resuscitation Bag', pet: 'Base Ready', eta: 'Immediate Base Ready' }
  ];

  const expansionRoadmap = [
    { quarter: 'Q1 2027', facility: 'Zenve Kolkata Salt Lake Tertiary Hospital', city: 'Kolkata', type: 'Tertiary Care Flagship (30 Beds, 3 OTs)', status: 'MEP Fitout', progress: '85% Complete', targetOpening: 'February 2027' },
    { quarter: 'Q2 2027', facility: 'Zenve Ahmedabad SG Highway Center', city: 'Ahmedabad', type: 'Secondary Care Clinic & CT Lab', status: 'Civil Structure Ready', progress: '65% Complete', targetOpening: 'April 2027' },
    { quarter: 'Q2 2027', facility: 'Zenve Kochi Panampilly Nagar Clinic', city: 'Kochi', type: 'Primary OPD & Daycare Hub', status: 'Architectural Blueprint Approved', progress: '35% Complete', targetOpening: 'June 2027' },
    { quarter: 'Q3 2027', facility: 'Zenve Chandigarh Sector 17 Care Center', city: 'Chandigarh', type: 'Emergency Clinic & Daycare', status: 'Lease Signed & Permitted', progress: '15% Complete', targetOpening: 'August 2027' }
  ];

  const filteredFacilities = facilities.filter(f => {
    const matchesCity = selectedCity === 'All' || f.city === selectedCity;
    const matchesTier = selectedTier === 'All' || f.tier === selectedTier;
    return matchesCity && matchesTier;
  });

  return (
    <DashboardLayout
      category="Clinics & Hospitals"
      subcategory="Clinic Network"
      title="Regional Healthcare Network & Hub-and-Spoke Infrastructure"
      subtitle="Geographical distribution, inter-facility emergency referral corridors, 24x7 ALS veterinary ambulance fleet, and expansion pipeline"
      icon="🌐"
      badge=""
      actions={
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              background: '#0d1527',
              border: '1px solid #1e293b',
              color: '#94a3b8',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            <option value="All">All Metro Clusters</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Mumbai">Mumbai MMR</option>
            <option value="Delhi NCR">Delhi NCR</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Pune">Pune</option>
          </select>
          <select
            value={selectedTier}
            onChange={(e) => setSelectedTier(e.target.value)}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              background: '#0d1527',
              border: '1px solid #1e293b',
              color: '#94a3b8',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            <option value="All">All Facility Tiers</option>
            <option value="Tertiary Flagship">Tertiary Flagships</option>
            <option value="Secondary Specialty">Secondary Specialty Spokes</option>
            <option value="Primary Express">Primary Express OPD / Daycare</option>
          </select>
          <button
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              background: '#3b82f6',
              border: 'none',
              color: '#fff',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            + Register New Facility
          </button>
        </div>
      }
    >
            {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <KpiCard
          title="Active Healthcare Facilities"
          value="10 Centers"
          change="+3 YoY"
          trend="up"
          description="Operational licensed veterinary centers"
          icon="🏥"
        />
        <KpiCard
          title="ALS Pet Ambulance Fleet"
          value="6 Units"
          change="100% Active"
          trend="up"
          description="GPS-monitored mobile ICU vehicles"
          icon="🚑"
        />
        <KpiCard
          title="Inter-Facility Transfers"
          value="42 Transfers"
          change="+18.2%"
          trend="up"
          description="Primary clinic to tertiary ICU referrals"
          icon="🔄"
        />
        <KpiCard
          title="Avg Emergency Transit Time"
          value="11.4 Mins"
          change="-2.1 mins"
          trend="up"
          description="Point of pickup to tertiary triage intake"
          icon="⏱️"
        />
        <KpiCard
          title="Network System Uptime"
          value="99.98%"
          change="Zero downtime"
          trend="up"
          description="Continuous EMR, PACS & telemetry link"
          icon="📶"
        />
        <KpiCard
          title="Expansion Pipeline"
          value="4 Hubs"
          change="FY 2027"
          trend="up"
          description="Active construction & MEP fitout stage"
          icon="🏗️"
        />
      </div>

      {/* Hub & Spoke Topology Visual Overview */}
      <div style={{
        background: '#0d1527',
        border: '1px solid #1e293b',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', color: '#f8fafc', fontWeight: 600 }}>
              Hub-and-Spoke Topology & Tele-Specialty Grid
            </h3>
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>
              Peripheral clinics stabilize patients and execute primary diagnostics before routing complex cases through dedicated ALS corridors
            </span>
          </div>
          <span style={{
            fontSize: '11px',
            color: '#10b981',
            background: 'rgba(16, 185, 129, 0.1)',
            padding: '4px 10px',
            borderRadius: '12px',
            fontWeight: 600
          }}>
            Tele-PACS Network Grid
          </span>
        </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
          <div style={{ background: '#131f38', border: '1px solid #1e293b', borderRadius: '8px', padding: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <strong style={{ color: '#f8fafc', fontSize: '13px' }}>South Corridor (Bengaluru)</strong>
              <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>99.8% Sync</span>
            </div>
            <div style={{ fontSize: '11px', color: '#94a3b8' }}>Indiranagar Central (Hub) ↔ Koramangala Care ↔ Whitefield Diagnostics</div>
            <div style={{ fontSize: '10px', color: '#38bdf8', marginTop: '6px' }}>18 Inter-facility transfers • 2 Ambulances active</div>
          </div>
          <div style={{ background: '#131f38', border: '1px solid #1e293b', borderRadius: '8px', padding: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <strong style={{ color: '#f8fafc', fontSize: '13px' }}>West Corridor (Mumbai MMR)</strong>
              <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>99.5% Sync</span>
            </div>
            <div style={{ fontSize: '11px', color: '#94a3b8' }}>Bandra Trauma Centre (Hub) ↔ Andheri Link Rd ↔ Powai Satellite</div>
            <div style={{ fontSize: '10px', color: '#38bdf8', marginTop: '6px' }}>12 Inter-facility transfers • 1 Ambulance active</div>
          </div>
          <div style={{ background: '#131f38', border: '1px solid #1e293b', borderRadius: '8px', padding: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <strong style={{ color: '#f8fafc', fontSize: '13px' }}>North Corridor (Delhi NCR)</strong>
              <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>99.9% Sync</span>
            </div>
            <div style={{ fontSize: '11px', color: '#94a3b8' }}>DLF CyberCity (Hub) ↔ Saket Diagnostics ↔ Noida Care Unit</div>
            <div style={{ fontSize: '10px', color: '#38bdf8', marginTop: '6px' }}>10 Inter-facility transfers • 1 Ambulance active</div>
          </div>
          <div style={{ background: '#131f38', border: '1px solid #1e293b', borderRadius: '8px', padding: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <strong style={{ color: '#f8fafc', fontSize: '13px' }}>Deccan Corridor (Hyderabad)</strong>
              <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>99.2% Sync</span>
            </div>
            <div style={{ fontSize: '11px', color: '#94a3b8' }}>Jubilee Hills Center (Hub) ↔ Gachibowli Daycare & Dental</div>
            <div style={{ fontSize: '10px', color: '#38bdf8', marginTop: '6px' }}>8 Inter-facility transfers • 1 Ambulance active</div>
          </div>
        </div>
      </div>

      {/* Facilities Master Directory */}
      <div style={{
        background: '#0d1527',
        border: '1px solid #1e293b',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', color: '#f8fafc', fontWeight: 600 }}>
              Network Facility Infrastructure Directory ({filteredFacilities.length} Centers)
            </h3>
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>
              Tiered clinical capabilities, surgical capacity, telemedicine integration, and inter-facility referral load
            </span>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1e293b', color: '#64748b', fontWeight: 600 }}>
                <th style={{ padding: '12px 10px' }}>FACILITY & CODE</th>
                <th style={{ padding: '12px 10px' }}>CITY CLUSTER</th>
                <th style={{ padding: '12px 10px' }}>TIER & ROLE</th>
                <th style={{ padding: '12px 10px' }}>BEDS & OTS</th>
                <th style={{ padding: '12px 10px' }}>AMBULANCE / TRANSFER</th>
                <th style={{ padding: '12px 10px' }}>TELEMEDICINE</th>
                <th style={{ padding: '12px 10px' }}>REFERRALS</th>
                <th style={{ padding: '12px 10px' }}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {filteredFacilities.length === 0 ? (<tr><td colSpan="8" style={{ textAlign: "center", padding: "32px", color: "var(--muted-foreground, #64748b)" }}>No network facility records found</td></tr>) : filteredFacilities.map((f, idx) => (
                <tr
                  key={f.id}
                  style={{
                    borderBottom: '1px solid #1e293b',
                    background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)',
                    transition: 'background 0.2s ease'
                  }}
                >
                  <td style={{ padding: '12px 10px' }}>
                    <div style={{ fontWeight: 600, color: '#f8fafc' }}>{f.name}</div>
                    <span style={{ fontSize: '10px', color: '#64748b', fontFamily: 'monospace' }}>{f.id}</span>
                  </td>
                  <td style={{ padding: '12px 10px' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      background: 'rgba(255,255,255,0.05)',
                      color: '#cbd5e1',
                      fontSize: '11px',
                      fontWeight: 600
                    }}>
                      {f.city}
                    </span>
                  </td>
                  <td style={{ padding: '12px 10px' }}>
                    <div style={{
                      fontWeight: 600,
                      color: f.tier.includes('Tertiary') ? '#38bdf8' : f.tier.includes('Secondary') ? '#a855f7' : '#f59e0b',
                      fontSize: '11px'
                    }}>
                      {f.tier}
                    </div>
                    <div style={{ fontSize: '10px', color: '#94a3b8' }}>{f.role}</div>
                  </td>
                  <td style={{ padding: '12px 10px' }}>
                    <div style={{ color: '#f8fafc', fontWeight: 500 }}>{f.beds}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>{f.ots}</div>
                  </td>
                  <td style={{ padding: '12px 10px', color: '#cbd5e1' }}>
                    {f.ambulance}
                  </td>
                  <td style={{ padding: '12px 10px' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '11px',
                      color: '#34d399'
                    }}>
                      ● {f.telemed}
                    </span>
                  </td>
                  <td style={{ padding: '12px 10px', color: '#cbd5e1', fontWeight: 600 }}>
                    {f.referralsReceived}
                  </td>
                  <td style={{ padding: '12px 10px' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: 'rgba(16, 185, 129, 0.1)',
                      color: '#10b981'
                    }}>
                      {f.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ambulance Dispatch & Expansion Roadmap Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        {/* ALS Ambulance Fleet Live Telemetry */}
        <div style={{
          background: '#0d1527',
          border: '1px solid #1e293b',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '15px', color: '#f8fafc', fontWeight: 600 }}>
                24x7 Mobile ICU & ALS Vet Ambulance Fleet
              </h3>
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                Live GPS telemetry, onboard veterinary nurse & paramedic teams, oxygenation support
              </span>
            </div>
            <span style={{
              fontSize: '11px',
              color: '#38bdf8',
              background: 'rgba(56, 189, 248, 0.1)',
              padding: '3px 8px',
              borderRadius: '8px',
              fontWeight: 600
            }}>
              Ambulance Telemetry
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {ambulanceFleet.length === 0 ? (<div style={{ textAlign: "center", padding: "32px", color: "var(--muted-foreground, #64748b)" }}>No active ambulance units</div>) : ambulanceFleet.map((amb) => (
              <div
                key={amb.id}
                style={{
                  background: '#131f38',
                  border: '1px solid #1e293b',
                  borderRadius: '8px',
                  padding: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '16px' }}>🚑</span>
                    <div>
                      <span style={{ fontWeight: 600, color: '#f8fafc', fontSize: '12px' }}>{amb.vehicle}</span>
                      <span style={{ fontSize: '10px', color: '#64748b', marginLeft: '6px', fontFamily: 'monospace' }}>({amb.id})</span>
                    </div>
                  </div>
                  <span style={{
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '10px',
                    fontWeight: 600,
                    background: amb.status.includes('Transit') || amb.status.includes('Dispatched') || amb.status.includes('Emergency')
                      ? 'rgba(239, 68, 68, 0.15)'
                      : 'rgba(16, 185, 129, 0.15)',
                    color: amb.status.includes('Transit') || amb.status.includes('Dispatched') || amb.status.includes('Emergency')
                      ? '#f87171'
                      : '#34d399'
                  }}>
                    {amb.status}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8' }}>
                  <span>Base: <strong style={{ color: '#cbd5e1' }}>{amb.base}</strong> ({amb.city})</span>
                  <span>Crew: <strong style={{ color: '#cbd5e1' }}>{amb.medic}</strong></span>
                </div>

                <div style={{ fontSize: '10px', color: '#64748b' }}>
                  Equipment: {amb.equipment}
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  background: 'rgba(0,0,0,0.2)',
                  padding: '6px 8px',
                  borderRadius: '4px',
                  fontSize: '11px'
                }}>
                  <span style={{ color: '#cbd5e1' }}>Status: {amb.pet}</span>
                  <span style={{ color: '#38bdf8', fontWeight: 600 }}>ETA: {amb.eta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Network Expansion Roadmap */}
        <div style={{
          background: '#0d1527',
          border: '1px solid #1e293b',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '15px', color: '#f8fafc', fontWeight: 600 }}>
                Network Expansion & New Facility Pipeline
              </h3>
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                Target openings, civil construction progress, and equipment procurement status
              </span>
            </div>
            <span style={{
              fontSize: '11px',
              color: '#a855f7',
              background: 'rgba(168, 85, 247, 0.1)',
              padding: '3px 8px',
              borderRadius: '8px',
              fontWeight: 600
            }}>
              FY 2027 Pipeline
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {expansionRoadmap.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '32px', color: 'var(--muted-foreground, #64748b)', fontSize: '13px' }}>
                No expansion roadmap records found
              </div>
            ) : expansionRoadmap.map((exp, i) => (
              <div
                key={i}
                style={{
                  background: '#131f38',
                  border: '1px solid #1e293b',
                  borderRadius: '8px',
                  padding: '14px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <span style={{ fontSize: '10px', color: '#38bdf8', fontWeight: 700 }}>{exp.quarter} TARGET</span>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#f8fafc', marginTop: '2px' }}>{exp.facility}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>{exp.city} • {exp.type}</div>
                  </div>
                  <span style={{
                    padding: '3px 8px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 600,
                    background: 'rgba(59, 130, 246, 0.15)',
                    color: '#60a5fa'
                  }}>
                    {exp.status}
                  </span>
                </div>

                <div style={{ marginBottom: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px', color: '#cbd5e1' }}>
                    <span>Civil & Engineering Progress</span>
                    <span style={{ fontWeight: 600, color: '#38bdf8' }}>{exp.progress}</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: '#1e293b', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{
                      width: exp.progress.includes('85%') ? '85%' : exp.progress.includes('65%') ? '65%' : exp.progress.includes('Architect') ? '35%' : '15%',
                      height: '100%',
                      background: 'linear-gradient(90deg, #3b82f6, #06b6d4)',
                      borderRadius: '3px'
                    }} />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b' }}>
                  <span>Target Commissioning: <strong style={{ color: '#cbd5e1' }}>{exp.targetOpening}</strong></span>
                  <span style={{ color: '#10b981', fontWeight: 500 }}>VCI Compliance Cleared</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
