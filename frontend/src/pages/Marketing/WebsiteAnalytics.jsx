import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function WebsiteAnalytics() {
  const topPages = [
  {
    "title": "24/7 Emergency Pet Hospital & Ambulance",
    "path": "/emergency-trauma-care",
    "views": "38,420",
    "unique": "29,150",
    "time": "3m 48s",
    "bounce": "24.2%",
    "conv": "8.4%"
  },
  {
    "title": "Online Veterinary Video Consultation",
    "path": "/consult-doctor-online",
    "views": "45,800",
    "unique": "36,200",
    "time": "4m 12s",
    "bounce": "28.5%",
    "conv": "6.8%"
  },
  {
    "title": "Complete Canine & Feline Vaccine Packages",
    "path": "/pet-vaccination-schedule",
    "views": "32,150",
    "unique": "25,400",
    "time": "2m 54s",
    "bounce": "31.4%",
    "conv": "5.6%"
  },
  {
    "title": "Orthopedic TPLO & Spinal Surgery Center",
    "path": "/clinical/orthopedic-surgery",
    "views": "19,840",
    "unique": "14,900",
    "time": "5m 22s",
    "bounce": "21.0%",
    "conv": "7.9%"
  },
  {
    "title": "Veterinary Prescription Diet & Nutrition",
    "path": "/rx-pharmacy/specialized-diets",
    "views": "28,600",
    "unique": "21,300",
    "time": "3m 15s",
    "bounce": "33.2%",
    "conv": "4.8%"
  },
  {
    "title": "Pet Dental Health & Ultrasonic Scaling",
    "path": "/dental-cleaning-packages",
    "views": "16,750",
    "unique": "12,800",
    "time": "2m 38s",
    "bounce": "36.8%",
    "conv": "4.2%"
  },
  {
    "title": "Puppy & Kitten Pediatric Starter Pack",
    "path": "/wellness/pediatric-starter-pack",
    "views": "24,300",
    "unique": "19,450",
    "time": "3m 32s",
    "bounce": "26.9%",
    "conv": "6.1%"
  },
  {
    "title": "Zenve Diagnostic Lab Test Booking",
    "path": "/diagnostics/blood-xray-ultrasound",
    "views": "21,900",
    "unique": "16,800",
    "time": "3m 05s",
    "bounce": "29.7%",
    "conv": "5.4%"
  },
  {
    "title": "Pet Dermatology & Allergy Treatment Hub",
    "path": "/clinical/skin-coat-allergy",
    "views": "18,450",
    "unique": "13,900",
    "time": "3m 41s",
    "bounce": "27.3%",
    "conv": "5.1%"
  },
  {
    "title": "Zenve Care Plus Annual Subscription",
    "path": "/membership/zenve-care-plus",
    "views": "27,500",
    "unique": "20,600",
    "time": "4m 05s",
    "bounce": "25.6%",
    "conv": "7.2%"
  }
];

  return (
    <DashboardLayout
      category="Marketing"
      subcategory="Website Analytics"
      title="Digital Web Traffic & Behavioral Analytics"
      subtitle="Web traffic trends, session duration, landing page conversion, and visitor engagement"
      icon="💻"
      badge="184.5K Monthly Visitors"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Monthly Unique Visitors" value="184,500" delta="+12.4% MoM" trend="up" subtext="68% Mobile web traffic" icon="👥" />
        <KpiCard label="Avg Session Duration" value="3m 38s" delta="+42s" trend="up" subtext="Clinical dwell time" icon="⏱️" />
        <KpiCard label="Sitewide Bounce Rate" value="27.8%" delta="4.2% Lower" trend="up" subtext="High intent landing pages" icon="📉" />
        <KpiCard label="Goal Conversion Rate" value="5.92%" delta="+0.75%" trend="up" subtext="Add to Cart & Booking" icon="🎯" />
      </div>

      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Top Performing Pet Health Landing Pages</h3>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Page engagement, dwell time, and downstream consult or cart completion</p>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <th style={{ padding: '12px 16px' }}>Landing Page URL & Content</th>
                <th style={{ padding: '12px 16px' }}>Total Views</th>
                <th style={{ padding: '12px 16px' }}>Unique Visitors</th>
                <th style={{ padding: '12px 16px' }}>Avg Time on Page</th>
                <th style={{ padding: '12px 16px' }}>Bounce Rate</th>
                <th style={{ padding: '12px 16px' }}>Goal Conv. Rate</th>
              </tr>
            </thead>
            <tbody>
              {topPages.map(p => (
                <tr key={p.path} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: 600, color: '#0f172a' }}>{p.title}</div>
                    <div style={{ fontSize: '11px', color: '#2563eb', fontFamily: '"IBM Plex Mono", monospace' }}>{p.path}</div>
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{p.views}</td>
                  <td style={{ padding: '14px 16px', fontFamily: '"IBM Plex Mono", monospace' }}>{p.unique}</td>
                  <td style={{ padding: '14px 16px', fontFamily: '"IBM Plex Mono", monospace' }}>{p.time}</td>
                  <td style={{ padding: '14px 16px', fontFamily: '"IBM Plex Mono", monospace', color: '#64748b' }}>{p.bounce}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: '4px', background: '#dcfce7', color: '#16a34a', fontWeight: 600, fontSize: '12px' }}>{p.conv}</span>
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
