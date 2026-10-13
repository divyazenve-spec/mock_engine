import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function RevenueByChannel() {
  const channels = [
    { name: 'Android Mobile App', icon: '📱', color: '#10b981', share: '34.5%', rev: '₹38,40,000', orders: '1,420', aov: '₹2,704' },
    { name: 'iOS Mobile App', icon: '🍏', color: '#0ea5e9', share: '28.2%', rev: '₹31,35,000', orders: '980', aov: '₹3,198' },
    { name: 'Web Direct Portal', icon: '💻', color: '#8b5cf6', share: '14.8%', rev: '₹16,45,000', orders: '540', aov: '₹3,046' },
    { name: 'Partner Veterinary Clinics', icon: '🏥', color: '#f59e0b', share: '8.4%', rev: '₹9,35,000', orders: '195', aov: '₹4,794' },
    { name: 'In-Clinic Digital Kiosks', icon: '🏪', color: '#ec4899', share: '4.6%', rev: '₹5,12,000', orders: '165', aov: '₹3,103' },
    { name: 'Corporate Pet Benefits (B2B)', icon: '🏢', color: '#6366f1', share: '3.2%', rev: '₹3,56,000', orders: '84', aov: '₹4,238' },
    { name: 'WhatsApp Concierge Care', icon: '💬', color: '#22c55e', share: '2.5%', rev: '₹2,78,000', orders: '112', aov: '₹2,482' },
    { name: 'Tele-Health Instant Consults', icon: '🩺', color: '#14b8a6', share: '1.8%', rev: '₹2,00,000', orders: '98', aov: '₹2,040' },
    { name: 'Emergency Rapid Dispatch', icon: '🚑', color: '#ef4444', share: '1.2%', rev: '₹1,34,000', orders: '32', aov: '₹4,187' },
    { name: 'Pet Insurance Direct Billing', icon: '🛡️', color: '#f97316', share: '0.8%', rev: '₹89,000', orders: '22', aov: '₹4,045' }
  ];

  return (
    <DashboardLayout
      category="Revenue & Sales"
      subcategory="Revenue by Channel"
      title="Channel Attribution & Performance"
      subtitle="Platform contribution, order volumes, and average ticket sizes across customer entrypoints"
      icon="📱"
      badge="10 Omni-Channels"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Top Channel" value="Android App" delta="34.5% share" trend="up" subtext="₹38.4L volume" icon="📱" />
        <KpiCard label="Highest Ticket Size" value="Partner Clinics" delta="₹4,794 AOV" trend="up" subtext="+58% vs blended" icon="🏥" />
        <KpiCard label="Web Direct Volume" value="₹16,45,000" delta="14.8% share" trend="neutral" subtext="540 orders" icon="💻" />
        <KpiCard label="Total Omnichannel Sales" value="₹1,11,24,000" delta="3,648 orders" trend="up" subtext="10 Active Channels" icon="🌐" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
        {channels.map((ch) => (
          <div key={ch.name} style={{
            background: 'var(--card, #1e293b)',
            border: '1px solid var(--border, rgba(255,255,255,0.08))',
            borderRadius: '12px',
            padding: '18px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
                <span>{ch.icon}</span>
                <span>{ch.name}</span>
              </div>
              <span style={{
                fontSize: '11px',
                fontWeight: 700,
                color: ch.color,
                background: `color-mix(in oklab, ${ch.color} 15%, transparent)`,
                padding: '2px 8px',
                borderRadius: '99px'
              }}>{ch.share}</span>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{ch.rev}</div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '8px',
              padding: '10px',
              background: 'rgba(0,0,0,0.15)',
              borderRadius: '8px',
              fontSize: '12px'
            }}>
              <div><span style={{ color: 'var(--muted-foreground, #94a3b8)' }}>Orders:</span> <b>{ch.orders}</b></div>
              <div><span style={{ color: 'var(--muted-foreground, #94a3b8)' }}>Avg Ticket:</span> <b>{ch.aov}</b></div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
