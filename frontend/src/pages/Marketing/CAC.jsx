import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function CAC() {
  const cityCAC = [
  {
    "city": "Bengaluru Urban (Indiranagar/Koramangala)",
    "blendedCAC": "₹385",
    "paidCAC": "₹480",
    "organicCAC": "₹145",
    "newCustomers": "192",
    "ltvRatio": "8.4x",
    "status": "Highly Efficient"
  },
  {
    "city": "Bengaluru Tech Corridor (Whitefield/HSR)",
    "blendedCAC": "₹395",
    "paidCAC": "₹495",
    "organicCAC": "₹150",
    "newCustomers": "148",
    "ltvRatio": "8.1x",
    "status": "Highly Efficient"
  },
  {
    "city": "Mumbai Western Suburbs (Bandra/Andheri)",
    "blendedCAC": "₹440",
    "paidCAC": "₹560",
    "organicCAC": "₹180",
    "newCustomers": "124",
    "ltvRatio": "7.6x",
    "status": "Efficient"
  },
  {
    "city": "Mumbai Central & South (Worli/Colaba)",
    "blendedCAC": "₹465",
    "paidCAC": "₹590",
    "organicCAC": "₹190",
    "newCustomers": "98",
    "ltvRatio": "7.2x",
    "status": "Efficient"
  },
  {
    "city": "Delhi NCR - Gurugram Prime",
    "blendedCAC": "₹435",
    "paidCAC": "₹550",
    "organicCAC": "₹175",
    "newCustomers": "112",
    "ltvRatio": "7.8x",
    "status": "Efficient"
  },
  {
    "city": "Delhi NCR - South Delhi",
    "blendedCAC": "₹450",
    "paidCAC": "₹575",
    "organicCAC": "₹185",
    "newCustomers": "86",
    "ltvRatio": "7.4x",
    "status": "Efficient"
  },
  {
    "city": "Hyderabad - Hitec City / Gachibowli",
    "blendedCAC": "₹370",
    "paidCAC": "₹465",
    "organicCAC": "₹135",
    "newCustomers": "105",
    "ltvRatio": "8.6x",
    "status": "Highly Efficient"
  },
  {
    "city": "Chennai - Central & OMR Corridor",
    "blendedCAC": "₹360",
    "paidCAC": "₹450",
    "organicCAC": "₹130",
    "newCustomers": "78",
    "ltvRatio": "8.8x",
    "status": "Highly Efficient"
  },
  {
    "city": "Pune - Koregaon Park & Viman Nagar",
    "blendedCAC": "₹340",
    "paidCAC": "₹430",
    "organicCAC": "₹120",
    "newCustomers": "64",
    "ltvRatio": "9.2x",
    "status": "Top Yield"
  },
  {
    "city": "Kolkata - Salt Lake & New Town",
    "blendedCAC": "₹315",
    "paidCAC": "₹395",
    "organicCAC": "₹110",
    "newCustomers": "52",
    "ltvRatio": "9.8x",
    "status": "Top Yield"
  }
];

  return (
    <DashboardLayout
      category="Marketing"
      subcategory="CAC"
      title="Customer Acquisition Cost (CAC) Intelligence"
      subtitle="Blended CAC, paid vs organic acquisition cost, payback window, and LTV-to-CAC health ratio"
      icon="🎯"
      badge="Blended CAC: ₹420"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Blended CAC" value="₹420" delta="-16.0%" trend="up" subtext="Across all acquisition channels" icon="🎯" />
        <KpiCard label="Paid Only CAC" value="₹512" delta="-12.5%" trend="up" subtext="Meta & Google ad spend" icon="💳" />
        <KpiCard label="Organic / Referral CAC" value="₹152" delta="-8.0%" trend="up" subtext="Viral invite & SEO" icon="🌱" />
        <KpiCard label="LTV to CAC Ratio" value="8.14x" delta="Target > 3.0x" trend="up" subtext="Unit economics healthy" icon="⚖️" />
      </div>

      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Metro City CAC & LTV Multiple Comparison</h3>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Unit economics by metropolitan region, customer volume, and organic acquisition discount</p>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <th style={{ padding: '12px 16px' }}>Metro Territory</th>
                <th style={{ padding: '12px 16px' }}>Blended CAC</th>
                <th style={{ padding: '12px 16px' }}>Paid CAC</th>
                <th style={{ padding: '12px 16px' }}>Organic CAC</th>
                <th style={{ padding: '12px 16px' }}>New Customers</th>
                <th style={{ padding: '12px 16px' }}>LTV : CAC Multiple</th>
                <th style={{ padding: '12px 16px' }}>Unit Health</th>
              </tr>
            </thead>
            <tbody>
              {cityCAC.map(c => (
                <tr key={c.city} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 600, color: '#0f172a' }}>{c.city}</td>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: '#2563eb', fontFamily: '"IBM Plex Mono", monospace' }}>{c.blendedCAC}</td>
                  <td style={{ padding: '14px 16px', fontFamily: '"IBM Plex Mono", monospace' }}>{c.paidCAC}</td>
                  <td style={{ padding: '14px 16px', fontFamily: '"IBM Plex Mono", monospace', color: '#16a34a', fontWeight: 600 }}>{c.organicCAC}</td>
                  <td style={{ padding: '14px 16px', fontFamily: '"IBM Plex Mono", monospace' }}>{c.newCustomers}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ display: 'inline-block', padding: '3px 8px', borderRadius: '4px', background: '#dcfce7', color: '#15803d', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{c.ltvRatio}</span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: '4px', background: '#eff6ff', color: '#2563eb', fontWeight: 600, fontSize: '11px' }}>{c.status}</span>
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
