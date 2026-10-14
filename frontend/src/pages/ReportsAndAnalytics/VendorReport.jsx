import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function VendorReport() {
  const [toast, setToast] = useState('');

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const vendors = [
    { name: 'Royal Canin India Pvt Ltd', category: 'Super-Premium Pet Nutrition', poSpend: 4250000, fillRate: '99.4%', onTimeRate: '98.8%', qualityScore: '99.6%', paymentTerms: 'Net 45 Days', savingsGenerated: 380000 },
    { name: 'Boehringer Ingelheim Animal Health', category: 'Veterinary Pharmaceuticals & Vaccines', poSpend: 3680000, fillRate: '99.8%', onTimeRate: '99.2%', qualityScore: '100.0%', paymentTerms: 'Net 60 Days', savingsGenerated: 420000 },
    { name: 'Farmina Pet Foods India', category: 'Grain-Free Canine & Feline Feeds', poSpend: 2840000, fillRate: '98.9%', onTimeRate: '98.1%', qualityScore: '99.2%', paymentTerms: 'Net 45 Days', savingsGenerated: 260000 },
    { name: 'Zoetis India Animal Health', category: 'Rx Diagnostics & Anti-Infectives', poSpend: 3120000, fillRate: '99.6%', onTimeRate: '99.0%', qualityScore: '99.8%', paymentTerms: 'Net 60 Days', savingsGenerated: 340000 },
    { name: 'Virbac Animal Health India', category: 'Clinical Dermatology & Hygiene', poSpend: 1980000, fillRate: '99.1%', onTimeRate: '98.4%', qualityScore: '99.4%', paymentTerms: 'Net 30 Days', savingsGenerated: 180000 },
    { name: 'Hill\'s Pet Nutrition (Colgate)', category: 'Therapeutic Prescription Diets', poSpend: 2450000, fillRate: '98.7%', onTimeRate: '97.9%', qualityScore: '99.5%', paymentTerms: 'Net 45 Days', savingsGenerated: 220000 },
    { name: 'Savavet (Sava Healthcare Ltd)', category: 'Cardiology & Specialty Formulations', poSpend: 1650000, fillRate: '99.2%', onTimeRate: '98.6%', qualityScore: '99.3%', paymentTerms: 'Net 30 Days', savingsGenerated: 150000 },
    { name: 'Beaphar India Veterinary Goods', category: 'Dental Care & Behavioral Supplements', poSpend: 1240000, fillRate: '98.5%', onTimeRate: '97.5%', qualityScore: '98.9%', paymentTerms: 'Net 30 Days', savingsGenerated: 110000 },
    { name: 'PetSafe & Radio Systems Corp', category: 'Smart Collars, Harnesses & Leashes', poSpend: 980000, fillRate: '97.8%', onTimeRate: '96.8%', qualityScore: '98.5%', paymentTerms: 'Net 30 Days', savingsGenerated: 85000 },
    { name: 'Biomerieux Healthcare Diagnostics', category: 'Hospital Lab Reagents & Cartridges', poSpend: 1420000, fillRate: '99.5%', onTimeRate: '99.1%', qualityScore: '99.9%', paymentTerms: 'Net 60 Days', savingsGenerated: 135000 }
  ];

  const inr = (n) => '₹' + (Number(n) / 100000).toFixed(2) + ' Lakhs';

  const downloadCSV = () => {
    const rows = [
      ['Supplier / Vendor Name', 'Primary Product Category', 'PO Spend MTD (INR)', 'PO Order Fill Rate', 'On-Time Delivery Rate', 'Batch Quality Score', 'Payment Terms', 'Negotiated Savings (INR)'],
      ...vendors.map(v => [`"${v.name}"`, v.category, v.poSpend, v.fillRate, v.onTimeRate, v.qualityScore, v.paymentTerms, v.savingsGenerated])
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(',')).join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `zenve_vendor_procurement_scorecard.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('Vendor Procurement Scorecard CSV downloaded.');
  };

  return (
    <DashboardLayout
      category="Reports & Analytics"
      subcategory="Vendor Reports"
      title="Vendor Procurement & Supplier Scorecard Report"
      subtitle="Procurement expenditure, order fill rate accuracy, cold-chain compliance, vendor payment terms, and negotiated volume discounts"
      icon="🤝"
      badge=""
      actions={
        <button
          onClick={downloadCSV}
          style={{
            padding: '8px 14px',
            borderRadius: '8px',
            background: 'var(--primary, #3b82f6)',
            color: '#ffffff',
            border: 'none',
            fontWeight: 600,
            fontSize: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span>📥</span> Export Vendor CSV
        </button>
      }
    >
      {toast && (
        <div style={{
          padding: '10px 16px',
          background: 'rgba(59,130,246,0.15)',
          border: '1px solid #3b82f6',
          borderRadius: '8px',
          color: '#60a5fa',
          fontSize: '13px',
          fontWeight: 600
        }}>
          ⚡ {toast}
        </div>
      )}

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Procurement Spend MTD" value="₹2.36 Cr" delta="+12.4%" trend="up" subtext="Direct manufacturer spend" icon="🛒" />
        <KpiCard label="Average PO Fill Rate" value="99.1%" delta="+0.8%" trend="up" subtext="Stock readiness & fill" icon="📋" />
        <KpiCard label="On-Time Delivery Rate" value="98.3%" delta="+1.1%" trend="up" subtext="Factory to warehouse delivery" icon="🚚" />
        <KpiCard label="Procurement Savings" value="₹22.80 Lakhs" delta="+16.5%" trend="up" subtext="Volume negotiated savings" icon="💎" />
      </div>

      {/* Table Section */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Supplier SLA Scorecards & Contract Terms</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)' }}>
                <th style={{ padding: '10px 12px' }}>Supplier / Manufacturer</th>
                <th style={{ padding: '10px 12px' }}>Product Category</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>PO Spend MTD</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Fill Rate</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>On-Time</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Quality Score</th>
                <th style={{ padding: '10px 12px' }}>Payment Terms</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Volume Savings</th>
              </tr>
            </thead>
            <tbody>
              {vendors.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: '24px', textAlign: 'center', color: 'var(--muted-foreground, #94a3b8)' }}>
                    No vendor procurement records found
                  </td>
                </tr>
              ) : (
                vendors.map((v) => (
                  <tr key={v.name} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{v.name}</td>
                    <td style={{ padding: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>{v.category}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{inr(v.poSpend)}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, color: '#34d399', fontFamily: '"IBM Plex Mono", monospace' }}>{v.fillRate}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{v.onTimeRate}</td>
                    <td style={{ padding: '12px', textAlign: 'right', color: '#60a5fa', fontFamily: '"IBM Plex Mono", monospace' }}>{v.qualityScore}</td>
                    <td style={{ padding: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>{v.paymentTerms}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, color: '#34d399', fontFamily: '"IBM Plex Mono", monospace' }}>{inr(v.savingsGenerated)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
