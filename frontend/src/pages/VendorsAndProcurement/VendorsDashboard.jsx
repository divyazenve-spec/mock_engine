import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function VendorsDashboard() {
  const suppliers = [
    { name: 'Zoetis Animal Health India', cat: 'Vaccines & Biologics', lead: '2.1 Days', sla: '99.2%', rating: 'AAA' },
    { name: 'MSD Animal Health Pvt Ltd', cat: 'Antiparasitics & Vaccines', lead: '2.4 Days', sla: '98.9%', rating: 'AAA' },
    { name: 'Royal Canin India Pvt Ltd', cat: 'Clinical Veterinary Diets', lead: '3.2 Days', sla: '98.4%', rating: 'AAA' },
    { name: 'Boehringer Ingelheim Vet', cat: 'Rx Therapeutics & NSAIDs', lead: '2.8 Days', sla: '98.1%', rating: 'AA+' },
    { name: "Hill's Pet Nutrition India", cat: 'Clinical Nutrition & Care', lead: '3.5 Days', sla: '97.8%', rating: 'AA+' }
  ];

  return (
    <DashboardLayout
      category="Vendors & Procurement"
      subcategory="Vendor Performance & POs"
      title="Vendor Relations & Procurement"
      subtitle="Purchase order status, pharmaceutical supplier pricing, procurement savings, and fulfillment SLAs"
      icon="🤝"
      badge="Direct Sourcing"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Active Suppliers" value="24 Vendors" delta="+3 YoY" trend="up" subtext="Direct pharma & food" icon="🏭" />
        <KpiCard label="Open Purchase Orders" value="₹14.85 Lakhs" delta="6 active POs" trend="up" subtext="In transit to hub" icon="📑" />
        <KpiCard label="Procurement Savings" value="₹6.42 Lakhs" delta="+12.1% of spend" trend="up" subtext="Bulk discount savings" icon="💰" />
        <KpiCard label="Vendor On-Time SLA" value="98.4%" delta="+1.2% MoM" trend="up" subtext="Delivery compliance" icon="⏱️" />
      </div>

      <div style={{
        background: 'var(--card, #ffffff)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 6px', fontSize: '15px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Primary Pharmaceutical & Diet Suppliers</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Verified clinical pharmaceutical and dietary supplier network with SLA performance</p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'var(--muted, #f8fafc)', borderBottom: '1px solid var(--border, rgba(0,0,0,0.08))' }}>
                {['Supplier Partner', 'Category', 'Avg Lead Time', 'Fulfillment SLA', 'Quality Tier'].map(h => (
                  <th key={h} style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--muted-foreground, #64748b)', fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {suppliers.map((s, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border, rgba(0,0,0,0.06))' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 600, color: 'var(--foreground, #0f172a)' }}>{s.name}</td>
                  <td style={{ padding: '10px 12px', color: 'var(--muted-foreground, #64748b)' }}>{s.cat}</td>
                  <td style={{ padding: '10px 12px', color: 'var(--foreground, #334155)' }}>{s.lead}</td>
                  <td style={{ padding: '10px 12px', color: '#34d399', fontWeight: 600 }}>{s.sla}</td>
                  <td style={{ padding: '10px 12px' }}><span style={{ padding: '2px 7px', borderRadius: '4px', background: 'rgba(59,130,246,0.12)', color: '#60a5fa', fontSize: '10px', fontWeight: 700 }}>{s.rating}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
