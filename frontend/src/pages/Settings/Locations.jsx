import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';
import { MOCK_LOCATIONS } from './mockSettingsData';

export default function Locations() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');

  const cardStyle = {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '22px 24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
  };

  const cities = ['All', 'Bengaluru', 'Mumbai MMR', 'Delhi NCR', 'Hyderabad'];

  const filtered = MOCK_LOCATIONS.filter(loc => {
    const matchesSearch =
      loc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === 'All' || loc.city === selectedCity;
    return matchesSearch && matchesCity;
  });

  return (
    <DashboardLayout
      category="Settings"
      subcategory="Locations"
      title="Locations & Facility Nodes"
      subtitle="Hospitals, trauma clinics, micro-fulfillment dark stores, and cold-chain hubs powering regional and 60-minute healthcare"
      icon="📍"
      badge="10 Active Nodes"
      actions={
        <button
          onClick={() => alert('Opening Location Provisioning form...')}
          style={{
            padding: '7px 14px',
            borderRadius: '8px',
            border: '1px solid #2563eb',
            background: '#2563eb',
            color: '#ffffff',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          + Add Facility Node
        </button>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '18px' }}>
        <KpiCard label="Active Facility Nodes" value="10 Facilities" delta="4 Hub Types" trend="up" subtext="Across 4 prime metro territories" icon="📍" />
        <KpiCard label="24/7 Trauma Hospitals" value="4 Centers" delta="100% NABH Ready" trend="up" subtext="With intensive surgical suites" icon="🏥" />
        <KpiCard label="Cold-Chain Dark Stores" value="4 Micro-Hubs" delta="2°C - 8°C Monitored" trend="up" subtext="IoT automated telemetry" icon="❄️" />
        <KpiCard label="Total Service Radius" value="134 km²" delta="96.8% On-Time" trend="up" subtext="Hyperlocal 60-min coverage" icon="⚡" />
      </div>

      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Operating Facilities & Regional Network Registry</h3>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#64748b' }}>Coverage radii, facility classifications, managing directors, and emergency helplines</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: '4px' }}>
              {cities.map(c => (
                <button
                  key={c}
                  onClick={() => setSelectedCity(c)}
                  style={{
                    padding: '6px 10px',
                    borderRadius: '6px',
                    border: '1px solid',
                    borderColor: selectedCity === c ? '#2563eb' : '#cbd5e1',
                    background: selectedCity === c ? '#2563eb' : '#ffffff',
                    color: selectedCity === c ? '#ffffff' : '#475569',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Search facilities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '7px 12px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '12px',
                width: '200px',
                outline: 'none'
              }}
            />
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569', fontSize: '12px' }}>
                <th style={{ padding: '12px 14px' }}>Node ID</th>
                <th style={{ padding: '12px 14px' }}>Facility & Area</th>
                <th style={{ padding: '12px 14px' }}>Facility Type</th>
                <th style={{ padding: '12px 14px' }}>City</th>
                <th style={{ padding: '12px 14px' }}>Coverage Radius</th>
                <th style={{ padding: '12px 14px' }}>Manager & Helpline</th>
                <th style={{ padding: '12px 14px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(loc => (
                <tr key={loc.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 14px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#2563eb' }}>{loc.id}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <strong style={{ color: '#0f172a' }}>{loc.name}</strong>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>{loc.area}</div>
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '4px', background: '#eff6ff', color: '#1d4ed8' }}>
                      {loc.type}
                    </span>
                  </td>
                  <td style={{ padding: '12px 14px', fontWeight: 600, color: '#334155' }}>{loc.city}</td>
                  <td style={{ padding: '12px 14px', fontFamily: '"IBM Plex Mono", monospace', color: '#059669', fontWeight: 600 }}>{loc.radius}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <div style={{ fontWeight: 600, color: '#0f172a' }}>{loc.manager}</div>
                    <div style={{ fontSize: '11px', color: '#64748b', fontFamily: '"IBM Plex Mono", monospace' }}>{loc.phone}</div>
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', background: '#ecfdf5', color: '#047857' }}>
                      ● {loc.status}
                    </span>
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
