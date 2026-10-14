import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function SalesDashboard() {
  const velocityData = [
    { day: 'Day 1', rev: 142000, orders: 52 },
    { day: 'Day 2', rev: 158000, orders: 58 },
    { day: 'Day 3', rev: 151000, orders: 55 },
    { day: 'Day 4', rev: 169000, orders: 63 },
    { day: 'Day 5', rev: 174000, orders: 65 },
    { day: 'Day 6', rev: 182000, orders: 69 },
    { day: 'Day 7', rev: 195000, orders: 74 },
    { day: 'Day 8', rev: 178000, orders: 67 },
    { day: 'Day 9', rev: 188000, orders: 71 },
    { day: 'Day 10', rev: 184200, orders: 70 }
  ];

  const recentTransactions = [
    { id: 'TXN-9021', customer: 'Ananya Deshmukh', pet: 'Leo (Golden)', cat: 'Prescription Nutrition', channel: 'Android App', amount: '₹7,680', status: 'Settled', time: '12 mins ago' },
    { id: 'TXN-9020', customer: 'Vikramaditya Singhania', pet: 'Milo (Persian Cat)', cat: 'Clinical Surgery', channel: 'In-Clinic Kiosk', amount: '₹14,500', status: 'Settled', time: '28 mins ago' },
    { id: 'TXN-9019', customer: 'Rohan Kapoor', pet: 'Thor (GSD)', cat: 'Preventive Pharmacy', channel: 'iOS App', amount: '₹3,420', status: 'Settled', time: '45 mins ago' },
    { id: 'TXN-9018', customer: 'Meera Nambiar', pet: 'Buddy (Beagle)', cat: 'Teleconsultation', channel: 'Web Portal', amount: '₹1,850', status: 'Settled', time: '1 hr ago' },
    { id: 'TXN-9017', customer: 'Kavita Iyer', pet: 'Bruno (Labrador)', cat: 'Diagnostics & Labs', channel: 'Partner Clinic', amount: '₹4,900', status: 'Settled', time: '1.5 hrs ago' },
    { id: 'TXN-9016', customer: 'Dr. Siddharth Malhotra', pet: 'Charlie (Spaniel)', cat: 'Dental Scaling', channel: 'Android App', amount: '₹5,800', status: 'Settled', time: '2 hrs ago' },
    { id: 'TXN-9015', customer: 'Pooja Verma', pet: 'Ghost (Husky)', cat: 'OTC Supplements', channel: 'WhatsApp Care', amount: '₹2,650', status: 'Settled', time: '2.5 hrs ago' },
    { id: 'TXN-9014', customer: 'Farhan Akhtar', pet: 'Coco (Frenchie)', cat: 'Vaccination Protocol', channel: 'iOS App', amount: '₹3,200', status: 'Settled', time: '3 hrs ago' },
    { id: 'TXN-9013', customer: 'Deepa Swamy', pet: 'Bella (Shih Tzu)', cat: 'Wellness & Spa', channel: 'Android App', amount: '₹2,100', status: 'Settled', time: '3.5 hrs ago' },
    { id: 'TXN-9012', customer: 'Tanvi Chatterjee', pet: 'Sheru (Indie)', cat: 'Emergency Care', channel: 'Direct Dispatch', amount: '₹6,400', status: 'Settled', time: '4 hrs ago' }
  ];

  const maxRev = Math.max(...velocityData.map(v => v.rev));

  return (
    <DashboardLayout
      category="Revenue & Sales"
      subcategory="Sales Dashboard"
      title="Executive Sales Overview"
      subtitle="Comprehensive revenue velocity, order volumes, and financial transaction streams"
      icon="💼"
      badge="Live 10-Stream Feed"
      actions={
        <>
          <button style={{
            background: 'var(--card, #1e293b)',
            border: '1px solid var(--border, rgba(255,255,255,0.1))',
            color: 'var(--foreground, #f8fafc)',
            padding: '6px 14px',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer'
          }}>14D Filter</button>
          <button style={{
            background: 'var(--primary, #3b82f6)',
            border: 'none',
            color: '#fff',
            padding: '6px 14px',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer'
          }}>Export Report</button>
        </>
      }
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '14px'
      }}>
        <KpiCard label="Today's Sales" value="₹1,84,200" delta="+14.2%" trend="up" subtext="vs yesterday" icon="⚡" />
        <KpiCard label="Period Revenue" value="₹94,20,000" delta="+18.6%" trend="up" subtext="30 days volume" icon="📈" />
        <KpiCard label="Paid Transactions" value="3,420" delta="98.6%" trend="up" subtext="Settlement rate" icon="✅" />
        <KpiCard label="Avg Order Value" value="₹2,754" delta="+6.2%" trend="up" subtext="Basket size" icon="🛒" />
        <KpiCard label="Active Clients" value="1,890" delta="+12.4%" trend="up" subtext="Unique pet parents" icon="👥" />
        <KpiCard label="App Downloads" value="5,240" delta="+22.1%" trend="up" subtext="Android & iOS" icon="📱" />
      </div>

      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>10-Day Revenue Velocity & Order Volume</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Daily settled sales compared to previous period benchmark</p>
          </div>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#10b981' }}>+16.8% 10-Day Trend</span>
        </div>
        <div style={{
          height: '180px',
          display: 'flex',
          alignItems: 'flex-end',
          gap: '12px',
          padding: '16px 12px 10px',
          background: 'rgba(0,0,0,0.18)',
          borderRadius: '8px'
        }}>
          {velocityData.map((d, i) => {
            const heightPct = Math.round((d.rev / maxRev) * 100);
            return (
              <div key={d.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: '100%', justifyContent: 'flex-end' }}>
                <span style={{ fontSize: '10px', color: 'var(--muted-foreground, #94a3b8)', fontFamily: '"IBM Plex Mono", monospace' }}>₹{(d.rev / 1000).toFixed(0)}k</span>
                <div style={{
                  width: '100%',
                  height: `${heightPct}%`,
                  background: i === velocityData.length - 1 ? 'linear-gradient(180deg, #3b82f6, #1d4ed8)' : 'linear-gradient(180deg, rgba(59,130,246,0.6), rgba(59,130,246,0.25))',
                  borderRadius: '4px 4px 0 0',
                  transition: 'height 0.3s ease'
                }} />
                <span style={{ fontSize: '10px', color: 'var(--muted-foreground, #94a3b8)', fontWeight: 600 }}>{d.day}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Live Sales & Transactions Stream</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Recent 10 completed customer orders across all healthcare touchpoints</p>
          </div>
          <span style={{ padding: '3px 8px', borderRadius: '99px', background: 'rgba(16,185,129,0.15)', color: '#10b981', fontSize: '11px', fontWeight: 700 }}>● Live Feed Active</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)', fontSize: '11px' }}>
                <th style={{ padding: '8px 12px' }}>Txn ID</th>
                <th style={{ padding: '8px 12px' }}>Customer & Pet</th>
                <th style={{ padding: '8px 12px' }}>Category</th>
                <th style={{ padding: '8px 12px' }}>Channel</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Amount</th>
                <th style={{ padding: '8px 12px', textAlign: 'center' }}>Status</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Time</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map(tx => (
                <tr key={tx.id} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                  <td style={{ padding: '12px', fontFamily: '"IBM Plex Mono", monospace', fontSize: '12px', color: '#60a5fa' }}>{tx.id}</td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ fontWeight: 600 }}>{tx.customer}</div>
                    <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)' }}>{tx.pet}</div>
                  </td>
                  <td style={{ padding: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>{tx.cat}</td>
                  <td style={{ padding: '12px' }}>{tx.channel}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{tx.amount}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '99px', background: 'rgba(16,185,129,0.15)', color: '#10b981', fontSize: '11px', fontWeight: 600 }}>{tx.status}</span>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right', color: 'var(--muted-foreground, #94a3b8)', fontSize: '12px' }}>{tx.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
