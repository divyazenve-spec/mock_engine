import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Leads() {
  const [stageFilter, setStageFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [leads] = useState([
  {
    "id": "LED-401",
    "parent": "Ananya Deshmukh",
    "pet": "Milo (Golden Retriever)",
    "city": "Bengaluru, Indiranagar",
    "source": "Meta Ads",
    "score": "A+ (96)",
    "stage": "Converted",
    "rep": "Dr. Arvind Rao",
    "value": "₹8,500"
  },
  {
    "id": "LED-402",
    "parent": "Rohan Malhotra",
    "pet": "Leo (Persian Cat)",
    "city": "Mumbai, Bandra West",
    "source": "Google Search",
    "score": "A (91)",
    "stage": "Consult Booked",
    "rep": "Dr. Sneha Pillai",
    "value": "₹4,200"
  },
  {
    "id": "LED-403",
    "parent": "Kavita Swaminathan",
    "pet": "Bella (Labrador)",
    "city": "Chennai, Adyar",
    "source": "Pet Referral",
    "score": "A+ (98)",
    "stage": "Converted",
    "rep": "Dr. Arvind Rao",
    "value": "₹14,800"
  },
  {
    "id": "LED-404",
    "parent": "Vikramaditya Bose",
    "pet": "Simba (Beagle)",
    "city": "Kolkata, Salt Lake",
    "source": "YouTube Video",
    "score": "B+ (84)",
    "stage": "Contacted",
    "rep": "Pooja Varma",
    "value": "₹3,500"
  },
  {
    "id": "LED-405",
    "parent": "Meera Nambiar",
    "pet": "Oreo (Shih Tzu)",
    "city": "Bengaluru, Whitefield",
    "source": "WhatsApp Promo",
    "score": "A (93)",
    "stage": "Converted",
    "rep": "Dr. Sneha Pillai",
    "value": "₹6,400"
  },
  {
    "id": "LED-406",
    "parent": "Aditya Singhania",
    "pet": "Bruno (German Shepherd)",
    "city": "Delhi NCR, Gurugram",
    "source": "Google Search",
    "score": "A+ (95)",
    "stage": "Consult Booked",
    "rep": "Dr. Arvind Rao",
    "value": "₹18,500"
  },
  {
    "id": "LED-407",
    "parent": "Priyanka Shenoy",
    "pet": "Coco (Indie Pup)",
    "city": "Hyderabad, Jubilee Hills",
    "source": "Meta Ads",
    "score": "B (79)",
    "stage": "Qualified",
    "rep": "Pooja Varma",
    "value": "₹2,800"
  },
  {
    "id": "LED-408",
    "parent": "Siddharth Joshi",
    "pet": "Zoe (Siberian Husky)",
    "city": "Pune, Koregaon Park",
    "source": "Local Event / Camp",
    "score": "A (90)",
    "stage": "Consult Booked",
    "rep": "Dr. Sneha Pillai",
    "value": "₹9,200"
  },
  {
    "id": "LED-409",
    "parent": "Tanvi Kulkarni",
    "pet": "Casper (British Shorthair)",
    "city": "Mumbai, Powai",
    "source": "Organic Search",
    "score": "B+ (82)",
    "stage": "Contacted",
    "rep": "Pooja Varma",
    "value": "₹4,800"
  },
  {
    "id": "LED-410",
    "parent": "Farhan Merchant",
    "pet": "Rocky (Rottweiler)",
    "city": "Bengaluru, Koramangala",
    "source": "Emergency Call Ad",
    "score": "A+ (99)",
    "stage": "Converted",
    "rep": "Dr. Arvind Rao",
    "value": "₹22,000"
  }
]);

  const filtered = leads.filter(l => {
    const matchStage = stageFilter === 'ALL' || l.stage === stageFilter;
    const matchSearch = l.parent.toLowerCase().includes(search.toLowerCase()) ||
                        l.pet.toLowerCase().includes(search.toLowerCase()) ||
                        l.city.toLowerCase().includes(search.toLowerCase()) ||
                        l.id.toLowerCase().includes(search.toLowerCase());
    return matchStage && matchSearch;
  });

  return (
    <DashboardLayout
      category="Marketing"
      subcategory="Leads"
      title="Inbound Pet Parent Leads & Pipeline"
      subtitle="Inbound pet parent prospects, consultation bookings, breed scoring, and assigned veterinary reps"
      icon="🎯"
      badge="1,420 Active Pipeline"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          {['ALL', 'Converted', 'Consult Booked', 'Contacted', 'Qualified'].map(st => (
            <button
              key={st}
              onClick={() => setStageFilter(st)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                border: stageFilter === st ? '1px solid #2563eb' : '1px solid #e2e8f0',
                background: stageFilter === st ? '#eff6ff' : '#ffffff',
                color: stageFilter === st ? '#2563eb' : '#64748b'
              }}
            >
              {st}
            </button>
          ))}
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Active Inbound Leads" value="1,420" delta="+14.2%" trend="up" subtext="Pet parent inquiries" icon="🎯" />
        <KpiCard label="Consultations Booked" value="482" delta="33.9%" trend="up" subtext="Doctor appointments" icon="🩺" />
        <KpiCard label="Pipeline Order Value" value="₹14,85,000" delta="+18.5%" trend="up" subtext="Rx + clinical diets" icon="💎" />
        <KpiCard label="Lead Conversion Rate" value="24.1%" delta="+3.2%" trend="up" subtext="Benchmark: 18.0%" icon="🔄" />
      </div>

      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Inbound Pet Parent Pipeline</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Lead prioritization by pet clinical urgency, source attribution, and estimated lifetime order</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Search parent, pet, city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                fontSize: '12px',
                width: '180px'
              }}
            />
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#2563eb' }}>{filtered.length} Leads</span>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <th style={{ padding: '12px 16px' }}>Pet Parent</th>
                <th style={{ padding: '12px 16px' }}>Pet Companion</th>
                <th style={{ padding: '12px 16px' }}>City & Zone</th>
                <th style={{ padding: '12px 16px' }}>Lead Source</th>
                <th style={{ padding: '12px 16px' }}>Lead Score</th>
                <th style={{ padding: '12px 16px' }}>Stage</th>
                <th style={{ padding: '12px 16px' }}>Assigned Rep</th>
                <th style={{ padding: '12px 16px' }}>Est. Value</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(l => (
                <tr key={l.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: 600, color: '#0f172a' }}>{l.parent}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', fontFamily: '"IBM Plex Mono", monospace' }}>{l.id}</div>
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: 600, color: '#0f172a' }}>{l.pet}</td>
                  <td style={{ padding: '14px 16px', color: '#64748b', fontSize: '12px' }}>{l.city}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: '4px', background: '#eff6ff', color: '#2563eb', fontWeight: 600, fontSize: '11px' }}>{l.source}</span>
                  </td>
                  <td style={{ padding: '14px 16px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: l.score.startsWith('A') ? '#16a34a' : '#2563eb' }}>{l.score}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '2px 8px',
                      borderRadius: '9999px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: l.stage === 'Converted' ? '#dcfce7' : l.stage === 'Consult Booked' ? '#dbeafe' : '#fef3c7',
                      color: l.stage === 'Converted' ? '#16a34a' : l.stage === 'Consult Booked' ? '#2563eb' : '#d97706'
                    }}>
                      {l.stage}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', color: '#334155' }}>{l.rep}</td>
                  <td style={{ padding: '14px 16px', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{l.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
