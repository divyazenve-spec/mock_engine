import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';
import { MOCK_PRODUCTS, MOCK_ABC_ANALYSIS } from './mockInventoryData';

export default function SkuManagement() {
  const [selectedClass, setSelectedClass] = useState('ALL');

  const combined = MOCK_PRODUCTS.map(p => {
    const abc = MOCK_ABC_ANALYSIS.find(a => a.sku === p.sku) || { class: 'C', shareRev: '2.0%', turnover: '3.0x', policy: 'Standard' };
    return { ...p, ...abc };
  });

  const filtered = selectedClass === 'ALL' ? combined : combined.filter(item => item.class === selectedClass);

  return (
    <DashboardLayout
      category="Products & Inventory"
      subcategory="SKU Management"
      title="SKU Master & Specifications"
      subtitle="SKU specifications, minimum order quantities (MOQ), package dimensions, cold-chain regulatory status & ABC velocity stratification"
      icon="🏷️"
      badge="10 Master SKUs"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Master SKUs" value="10" delta="100% active" trend="up" subtext="In active rotation" icon="🏷️" />
        <KpiCard label="Class A Drivers" value="3 SKUs" delta="60.5% Revenue" trend="up" subtext="Daily cycle counting" icon="🥇" />
        <KpiCard label="Class B Items" value="3 SKUs" delta="28.4% Revenue" trend="neutral" subtext="Weekly audit cadence" icon="🥈" />
        <KpiCard label="Class C Long-Tail" value="4 SKUs" delta="11.1% Revenue" trend="down" subtext="Monthly reconciliation" icon="🥉" />
      </div>

      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>SKU Lifecycle Master Register</h3>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#94a3b8' }}>Comprehensive barcode, packaging spec, supplier MOQ and ABC replenishment policy</p>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            {['ALL', 'A', 'B', 'C'].map(cls => (
              <button
                key={cls}
                onClick={() => setSelectedClass(cls)}
                style={{
                  padding: '4px 12px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: selectedClass === cls ? '1px solid #3b82f6' : '1px solid rgba(255,255,255,0.1)',
                  background: selectedClass === cls ? 'rgba(59,130,246,0.18)' : 'rgba(255,255,255,0.03)',
                  color: selectedClass === cls ? '#60a5fa' : '#94a3b8'
                }}
              >
                {cls === 'ALL' ? 'All Classes' : `Class ${cls}`}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)', fontSize: '11px' }}>
                <th style={{ padding: '10px 12px' }}>SKU Code</th>
                <th style={{ padding: '10px 12px' }}>Product & Specifications</th>
                <th style={{ padding: '10px 12px' }}>Category & Subcategory</th>
                <th style={{ padding: '10px 12px', textAlign: 'center' }}>ABC Class</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>MOQ</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Turnover</th>
                <th style={{ padding: '10px 12px' }}>Vendor & Batch</th>
                <th style={{ padding: '10px 12px' }}>Audit Policy</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => {
                const classBadgeCol = item.class === 'A' ? '#10b981' : item.class === 'B' ? '#38bdf8' : '#94a3b8';
                const classBadgeBg = item.class === 'A' ? 'rgba(16,185,129,0.15)' : item.class === 'B' ? 'rgba(56,189,248,0.15)' : 'rgba(255,255,255,0.08)';
                return (
                  <tr key={item.sku} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                    <td style={{ padding: '12px', fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', color: '#38bdf8', fontWeight: 600 }}>{item.sku}</td>
                    <td style={{ padding: '12px' }}>
                      <div style={{ fontWeight: 600, color: '#f8fafc' }}>{item.name}</div>
                      <div style={{ fontSize: '11px', color: '#94a3b8' }}>Unit Wt: {item.weight} · {item.batches} active batch(es)</div>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <div style={{ color: '#f8fafc' }}>{item.cat}</div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>{item.subcat}</div>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <span style={{
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: 700,
                        background: classBadgeBg,
                        color: classBadgeCol
                      }}>
                        Class {item.class}
                      </span>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{item.moq} units</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#10b981', fontWeight: 600 }}>{item.turnover}</td>
                    <td style={{ padding: '12px' }}>
                      <div style={{ fontSize: '11px', color: '#cbd5e1' }}>{item.vendor}</div>
                      <div style={{ fontSize: '10px', color: '#64748b', fontFamily: '"IBM Plex Mono", monospace' }}>{item.batch}</div>
                    </td>
                    <td style={{ padding: '12px', fontSize: '11px', color: '#a78bfa' }}>{item.policy}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
