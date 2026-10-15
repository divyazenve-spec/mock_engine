import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';
import { MOCK_COMPANY_SETTINGS } from './mockSettingsData';

export default function CompanySettings() {
  const c = MOCK_COMPANY_SETTINGS;

  const cardStyle = {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '22px 24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    marginBottom: '18px'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '11px',
    fontWeight: 600,
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    marginBottom: '6px'
  };

  const inputStyle = {
    width: '100%',
    padding: '9px 12px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    background: '#f8fafc',
    fontSize: '13px',
    color: '#0f172a',
    fontWeight: 500,
    outline: 'none',
    boxSizing: 'border-box'
  };

  return (
    <DashboardLayout
      category="Settings"
      subcategory="Company Settings"
      title="Company Settings & Statutory Profile"
      subtitle="Enterprise identity, statutory registration, drug licenses, and financial standards governing Zenve Healthcare"
      icon="🏢"
      badge="Verified Corporate Entity"
    >
      {/* Top Corporate Vitals */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '18px' }}>
        <KpiCard label="Entity Name" value="Zenve Healthcare" delta="Pvt Ltd" trend="neutral" subtext="Formed under MCA 2013" icon="🏢" />
        <KpiCard label="Registered GSTIN" value={c.gstin} delta="Karnataka Active" trend="up" subtext="Monthly GSTR-1 & 3B verified" icon="🧾" />
        <KpiCard label="Drug License (Form 20B/21B)" value="Licensed" delta="Valid thru 2029" trend="up" subtext="Veterinary Drug Control" icon="💊" />
        <KpiCard label="VCI Accreditation" value="Compliant" delta="NABH Level-1" trend="up" subtext="National Council Audit" icon="🩺" />
      </div>

      {/* Card 1: Legal Entity & Corporate Registration */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>🏢 Legal Entity & Corporate Registration</h3>
          <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', background: '#ecfdf5', color: '#047857' }}>
            MCA Active
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
          <div>
            <label style={labelStyle}>Legal Entity Name</label>
            <input style={inputStyle} defaultValue={c.name} readOnly />
          </div>
          <div>
            <label style={labelStyle}>Consumer Brand Identity</label>
            <input style={inputStyle} defaultValue={c.brand} readOnly />
          </div>
          <div>
            <label style={labelStyle}>Corporate Identification Number (CIN)</label>
            <input style={{ ...inputStyle, fontFamily: '"IBM Plex Mono", monospace' }} defaultValue={c.cin} readOnly />
          </div>
          <div>
            <label style={labelStyle}>Permanent Account Number (PAN)</label>
            <input style={{ ...inputStyle, fontFamily: '"IBM Plex Mono", monospace' }} defaultValue={c.pan} readOnly />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>Registered Corporate Headquarters</label>
            <input style={inputStyle} defaultValue={c.address} readOnly />
          </div>
        </div>
      </div>

      {/* Card 2: Healthcare Licenses & Board Accreditations */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>🩺 Healthcare Licenses & Board Accreditations</h3>
          <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', background: '#ecfdf5', color: '#047857' }}>
            3 Active Licenses
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
          <div>
            <label style={labelStyle}>Retail / Wholesale Drug License</label>
            <input style={{ ...inputStyle, fontFamily: '"IBM Plex Mono", monospace' }} defaultValue={c.drugLicense} readOnly />
            <span style={{ fontSize: '11px', color: '#64748b', marginTop: '4px', display: 'block' }}>Form 20B/21B valid across all 5 state hub nodes</span>
          </div>
          <div>
            <label style={labelStyle}>Veterinary Council of India (VCI)</label>
            <input style={{ ...inputStyle, fontFamily: '"IBM Plex Mono", monospace' }} defaultValue={c.vciAccreditation} readOnly />
            <span style={{ fontSize: '11px', color: '#64748b', marginTop: '4px', display: 'block' }}>Verified telemedicine & clinical practice charter</span>
          </div>
          <div>
            <label style={labelStyle}>Bio-Medical Waste Authorization</label>
            <input style={{ ...inputStyle, fontFamily: '"IBM Plex Mono", monospace' }} defaultValue={c.bioWasteAuth} readOnly />
            <span style={{ fontSize: '11px', color: '#64748b', marginTop: '4px', display: 'block' }}>State Pollution Control Board certified</span>
          </div>
        </div>
      </div>

      {/* Card 3: Fiscal & Localization Standards */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>🌐 Fiscal & Localization Standards</h3>
          <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', background: '#ecfdf5', color: '#047857' }}>
            Standard
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
          <div>
            <label style={labelStyle}>Operating Currency</label>
            <input style={inputStyle} defaultValue={c.currency} readOnly />
          </div>
          <div>
            <label style={labelStyle}>Financial Year Cycle</label>
            <input style={inputStyle} defaultValue={`${c.fyStart} — ${c.fyEnd}`} readOnly />
          </div>
          <div>
            <label style={labelStyle}>System Timezone</label>
            <input style={{ ...inputStyle, fontFamily: '"IBM Plex Mono", monospace' }} defaultValue={c.timezone} readOnly />
          </div>
          <div>
            <label style={labelStyle}>Corporate Communications</label>
            <input style={inputStyle} defaultValue={`${c.email} · ${c.supportPhone}`} readOnly />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
