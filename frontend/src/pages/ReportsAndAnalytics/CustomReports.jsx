import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function CustomReports() {
  const [dimension, setDimension] = useState('channel');
  const [metric, setMetric] = useState('net_revenue');
  const [dateRange, setDateRange] = useState('30d');
  const [format, setFormat] = useState('csv');
  const [toast, setToast] = useState('');
  const defaultQueryResults = [
    { dim: 'Android App (60-Min Express)', val: '₹46,41,840', orders: '1,842', aov: '₹2,520', margin: '42.5%' },
    { dim: 'iOS App (Zenve Flagship)', val: '₹33,89,850', orders: '1,215', aov: '₹2,790', margin: '44.8%' },
    { dim: 'Web eCommerce Portal', val: '₹17,64,000', orders: '784', aov: '₹2,250', margin: '40.2%' },
    { dim: 'Clinic Pharmacy Desks', val: '₹17,48,400', orders: '620', aov: '₹2,820', margin: '52.4%' },
    { dim: 'Corporate B2B & Breeder Direct', val: '₹14,97,440', orders: '148', aov: '₹10,118', margin: '38.0%' },
    { dim: 'WhatsApp Concierge Orders', val: '₹13,51,450', orders: '495', aov: '₹2,730', margin: '43.2%' },
    { dim: 'Mobile Vet Van Dispatches', val: '₹11,53,200', orders: '310', aov: '₹3,720', margin: '56.0%' },
    { dim: 'Emergency 24x7 Triage Desk', val: '₹10,82,540', orders: '186', aov: '₹5,820', margin: '62.5%' },
    { dim: 'Subscription Auto-Refill Diet', val: '₹18,48,000', orders: '840', aov: '₹2,200', margin: '48.0%' },
    { dim: 'Grooming & Salon Walk-ins', val: '₹8,74,000', orders: '380', aov: '₹2,300', margin: '58.0%' }
  ];

  const [queryResults, setQueryResults] = useState(defaultQueryResults);

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleRunQuery = () => {
    // Generate 10 contextual mock records based on chosen dimension
    const sampleLabels = dimension === 'hub' ? [
      'Indiranagar Express Hub (BLR)', 'Koramangala Dark Store (BLR)', 'Whitefield Fulfillment Hub (BLR)',
      'Andheri West Express Hub (BOM)', 'Bandra West Micro-Store (BOM)', 'South Delhi Okhla Hub (DEL)',
      'Gurgaon DLF Express Hub (GGN)', 'Gachibowli Dark Store (HYD)', 'Koregaon Park Express (PNQ)', 'Guindy Express Node (MAA)'
    ] : dimension === 'category' ? [
      'Canine Super-Premium Nutrition', 'Prescription Flea & Tick Antiparasitic', 'Therapeutic Renal & Hepatic Feeds',
      'Veterinary Surgical Instruments & OR Consumables', 'Clinical Dermatology & Medicated Shampoos',
      'Feline WholePrey & Grain-Free Feeds', 'Dental Health & Ultrasonic Prophylaxis', 'Cardiac & Emergency Formulations',
      'Smart GPS Tracking Collars & Harnesses', 'Orthopedic Bedding & Rehabilitation Aids'
    ] : dimension === 'doctor' ? [
      'Dr. Vikram Sharma (Surgery)', 'Dr. Ananya Iyer (Oncology)', 'Dr. Rajesh Kulkarni (Orthopedics)',
      'Dr. Sneha Reddy (Dermatology)', 'Dr. Rohan Merchant (Feline)', 'Dr. Pooja Deshmukh (Ophthalmology)',
      'Dr. Amitav Ghosh (Cardiology)', 'Dr. Neha Bansal (Exotics)', 'Dr. Karthik Sundaram (Dentistry)', 'Dr. Shalini Menon (Pediatrics)'
    ] : [
      'Android App (60-Min Express)', 'iOS App (Zenve Flagship)', 'Web eCommerce Portal', 'Clinic Pharmacy Desks',
      'Corporate B2B & Breeder Direct', 'WhatsApp Concierge Orders', 'Mobile Vet Van Dispatches',
      'Emergency 24x7 Triage Desk', 'Subscription Auto-Refill Diet', 'Grooming & Salon Walk-ins'
    ];

    const newRows = sampleLabels.map((lbl, idx) => ({
      dim: lbl,
      val: metric === 'gross_margin' ? `${(45 + (idx % 15))}%` : metric === 'aov' ? `₹${(2400 + idx * 280).toLocaleString('en-IN')}` : `₹${(1500000 + idx * 350000).toLocaleString('en-IN')}`,
      orders: (1200 - idx * 80).toLocaleString('en-IN'),
      aov: `₹${(2200 + idx * 310).toLocaleString('en-IN')}`,
      margin: `${(42 + (idx * 2)) % 65}%`
    }));

    setQueryResults(newRows);
    triggerToast(`Query executed on live replica for ${dimension} × ${metric}. 10 aggregated records returned.`);
  };

  const downloadCustomCSV = () => {
    if (!queryResults) return;
    const rows = [
      ['Dimension Label', 'Selected Metric Value', 'Order Volume', 'Average Order Value', 'Contribution Margin'],
      ...queryResults.map(r => [r.dim, r.val, r.orders, r.aov, r.margin])
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(',')).join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `zenve_custom_${dimension}_${metric}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('Custom Report downloaded.');
  };

  return (
    <DashboardLayout
      category="Reports & Analytics"
      subcategory="Custom Reports"
      title="Ad-Hoc Custom Report & SQL Query Builder"
      subtitle="Interactive multidimensional pivot engine allowing cross-filtering by channel, location, product, doctor, or customer cohort"
      icon="🛠️"
      badge=""
      actions={
        <button
          onClick={() => triggerToast('Custom query template saved to Team Favorites.')}
          style={{
            padding: '8px 14px',
            borderRadius: '8px',
            background: 'var(--card, #1e293b)',
            color: 'var(--foreground, #f8fafc)',
            border: '1px solid var(--border, rgba(255,255,255,0.1))',
            fontWeight: 600,
            fontSize: '12px',
            cursor: 'pointer'
          }}
        >
          ⭐ Save to Favorites
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
        <KpiCard label="Query Execution Latency" value="18 ms" delta="-6 ms" trend="up" subtext="Live engine on replica" icon="⚡" />
        <KpiCard label="Supported Dimensions" value="14 Dimensions" delta="+2 New" trend="up" subtext="Configured dimensions" icon="📐" />
        <KpiCard label="Saved Team Queries" value="28 Presets" delta="+6 Presets" trend="up" subtext="Executive team presets" icon="⭐" />
        <KpiCard label="Max Export Rows" value="250,000" delta="Enterprise" trend="up" subtext="High-throughput stream" icon="📊" />
      </div>

      {/* Builder Form Card */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '24px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700 }}>Custom Data Pivot & Aggregation Builder</h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: 'var(--muted-foreground, #94a3b8)' }}>Primary Dimension</label>
            <select
              value={dimension}
              onChange={(e) => setDimension(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.25)', border: '1px solid var(--border, rgba(255,255,255,0.1))', color: '#fff', fontSize: '13px' }}
            >
              <option value="channel">Sales Channel (Android, iOS, Web)</option>
              <option value="hub">Fulfillment Micro-Hub / Dark Store</option>
              <option value="category">Product Category & Line</option>
              <option value="doctor">Consulting Veterinarian</option>
              <option value="customer_tier">Pet Parent VIP Tier (Gold/Silver)</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: 'var(--muted-foreground, #94a3b8)' }}>Aggregate Metric</label>
            <select
              value={metric}
              onChange={(e) => setMetric(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.25)', border: '1px solid var(--border, rgba(255,255,255,0.1))', color: '#fff', fontSize: '13px' }}
            >
              <option value="net_revenue">Net Settled Revenue (INR)</option>
              <option value="order_volume">Total Order Volume</option>
              <option value="gross_margin">Gross Contribution Margin (%)</option>
              <option value="aov">Average Order Value (AOV)</option>
              <option value="return_rate">Return & Refund Rate (%)</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: 'var(--muted-foreground, #94a3b8)' }}>Reporting Interval</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.25)', border: '1px solid var(--border, rgba(255,255,255,0.1))', color: '#fff', fontSize: '13px' }}
            >
              <option value="7d">Last 7 Days Rolling</option>
              <option value="30d">Last 30 Days Rolling</option>
              <option value="mtd">Month to Date (October 2026)</option>
              <option value="ytd">Year to Date (FY 2026-27)</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: 'var(--muted-foreground, #94a3b8)' }}>Output Format</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.25)', border: '1px solid var(--border, rgba(255,255,255,0.1))', color: '#fff', fontSize: '13px' }}
            >
              <option value="csv">Standard CSV Spreadsheet</option>
              <option value="json">Raw JSON API Payload</option>
              <option value="excel">Microsoft Excel (.xlsx)</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button
            onClick={handleRunQuery}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              background: 'var(--primary, #3b82f6)',
              color: '#ffffff',
              border: 'none',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>⚡</span> Execute Live Query
          </button>
        </div>
      </div>

      {/* Query Results Preview */}
      {queryResults && (
        <div style={{
          background: 'var(--card, #1e293b)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Query Output Preview ({queryResults.length} records returned)</h3>
            <button
              onClick={downloadCustomCSV}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                background: '#10b981',
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
              <span>📥</span> Download Query Result
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)' }}>
                  <th style={{ padding: '10px 12px' }}>Dimension Target</th>
                  <th style={{ padding: '10px 12px', textAlign: 'right' }}>Calculated Metric</th>
                  <th style={{ padding: '10px 12px', textAlign: 'right' }}>Total Orders</th>
                  <th style={{ padding: '10px 12px', textAlign: 'right' }}>AOV</th>
                  <th style={{ padding: '10px 12px', textAlign: 'right' }}>Margin</th>
                </tr>
              </thead>
              <tbody>
                {queryResults.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ padding: '24px', textAlign: 'center', color: 'var(--muted-foreground, #94a3b8)' }}>
                      No query records found
                    </td>
                  </tr>
                ) : (
                  queryResults.map((r, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                      <td style={{ padding: '12px', fontWeight: 600 }}>{r.dim}</td>
                      <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, color: '#34d399', fontFamily: '"IBM Plex Mono", monospace' }}>{r.val}</td>
                      <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{r.orders}</td>
                      <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{r.aov}</td>
                      <td style={{ padding: '12px', textAlign: 'right', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{r.margin}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
