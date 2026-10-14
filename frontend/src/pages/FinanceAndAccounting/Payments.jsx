import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Payments() {
  const [gatewayFilter, setGatewayFilter] = useState('ALL');

  const gateways = [
    { name: 'Razorpay Dynamic QR UPI', rail: 'Direct NPCI UPI Rail', processed: '₹46,20,000', txns: '4,120', mdrRate: '0.00%', mdrCost: '₹0', netSettled: '₹46,20,000', status: 'T+0 Instant' },
    { name: 'Pine Labs Android POS', rail: 'Visa / MasterCard / RuPay Debit', processed: '₹32,50,000', txns: '1,840', mdrRate: '0.90%', mdrCost: '₹29,250', netSettled: '₹32,20,750', status: 'T+1 Morning' },
    { name: 'PhonePe Merchant Gateway', rail: 'UPI AutoPay & In-App QR', processed: '₹15,65,000', txns: '1,380', mdrRate: '0.00%', mdrCost: '₹0', netSettled: '₹15,65,000', status: 'T+0 Instant' },
    { name: 'Pine Labs Credit Card POS', rail: 'Domestic Premium & Corporate Cards', processed: '₹10,30,000', txns: '410', mdrRate: '1.65%', mdrCost: '₹16,995', netSettled: '₹10,13,005', status: 'T+1 Morning' },
    { name: 'Cashfree Virtual Accounts', rail: 'B2B Bank NEFT / RTGS Collect', processed: '₹5,80,000', txns: '85', mdrRate: '₹15/txn', mdrCost: '₹1,275', netSettled: '₹5,78,725', status: 'T+0 Direct' },
    { name: 'HDFC SmartHub NetBanking', rail: 'Retail Core NetBanking', processed: '₹1,90,000', txns: '142', mdrRate: '1.20%', mdrCost: '₹2,280', netSettled: '₹1,87,720', status: 'T+1 Sweep' },
    { name: 'Stripe International Card Rail', rail: 'Expat & NRI Visa / Amex Gate', processed: '₹1,20,000', txns: '28', mdrRate: '2.90%', mdrCost: '₹3,480', netSettled: '₹1,16,520', status: 'T+2 Global' },
    { name: 'PayU PG Checkout', rail: 'Secondary App Fallback Rail', processed: '₹80,000', txns: '64', mdrRate: '1.40%', mdrCost: '₹1,120', netSettled: '₹78,880', status: 'T+1 Morning' }
  ];

  const recentReceipts = [
    { txnId: 'PAY-9001', pet: 'Max (Golden Retriever)', client: 'Vikram Rao', facility: 'Indiranagar Flagship', amt: '₹56,640', channel: 'Pine Labs Credit POS', time: '10 mins ago', status: 'Settled' },
    { txnId: 'PAY-9002', pet: 'Milo (Persian Cat)', client: 'Ananya Deshmukh', facility: 'Koramangala Supercare', amt: '₹11,210', channel: 'Razorpay UPI QR', time: '24 mins ago', status: 'Settled' },
    { txnId: 'PAY-9003', pet: 'Thor (Rottweiler)', client: 'Karan Singhania', facility: 'Whitefield Emergency Hub', amt: '₹73,160', channel: 'HDFC NetBanking', time: '42 mins ago', status: 'Settled' },
    { txnId: 'PAY-9004', pet: 'Bella (Shih Tzu)', client: 'Pooja Hegde', facility: 'Jayanagar Wellness Clinic', amt: '₹8,024', channel: 'PhonePe QR', time: '1 hr ago', status: 'Settled' },
    { txnId: 'PAY-9005', pet: 'Simba (German Shepherd)', client: 'Rohit Verma', facility: 'HSR Layout Annex', amt: '₹9,676', channel: 'Razorpay UPI QR', time: '1 hr ago', status: 'Settled' },
    { txnId: 'PAY-9006', pet: 'Bruno (Boxer)', client: 'Nisha Pillai', facility: 'Indiranagar Flagship', amt: '₹14,500', channel: 'Pine Labs RuPay POS', time: '2 hrs ago', status: 'Settled' },
    { txnId: 'PAY-9007', pet: 'Coco (French Bulldog)', client: 'Sameer Sen', facility: 'Lavelle Road Specialty', amt: '₹22,400', channel: 'Razorpay UPI QR', time: '2 hrs ago', status: 'Settled' },
    { txnId: 'PAY-9008', pet: 'Oscar (Beagle)', client: 'Siddharth Nambiar', facility: 'Lavelle Road Specialty', amt: '₹36,580', channel: 'Pine Labs Credit POS', time: '3 hrs ago', status: 'Settled' },
    { txnId: 'PAY-9009', pet: 'Zara (Doberman)', client: 'Arjun Menon', facility: 'Koramangala Supercare', amt: '₹18,900', channel: 'Razorpay UPI QR', time: '3 hrs ago', status: 'Settled' },
    { txnId: 'PAY-9010', pet: 'Leo (British Shorthair)', client: 'Meera Swaminathan', facility: 'Whitefield Emergency Hub', amt: '₹7,850', channel: 'PhonePe QR', time: '4 hrs ago', status: 'Settled' }
  ];

  return (
    <DashboardLayout
      category="Finance & Accounting"
      subcategory="Payments"
      title="Inbound Payments, Gateways & Collections"
      subtitle="Real-time multi-gateway payment processing, merchant discount rate (MDR) audit, POS terminal census, and bank settlement reconciliation"
      icon="💳"
      badge=""
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => alert('Initiating instant payment reconciliation against core banking...')}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: '1px solid #10b981',
              background: 'rgba(16,185,129,0.15)',
              color: '#34d399',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            🔄 Run Bank Reconciliation
          </button>
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Gross Digital Collections" value="₹1,14,35,000" delta="+13.2% MoM" trend="up" subtext="Inbound MTD flow" icon="💳" />
        <KpiCard label="UPI Payment Share" value="54.2%" delta="+6.4% YoY" trend="up" subtext="Zero MDR settlement" icon="📱" />
        <KpiCard label="Card & POS Volume" value="₹42,80,000" delta="37.4% share" trend="neutral" subtext="Pine Labs smart terminals" icon="🏧" />
        <KpiCard label="Blended MDR Cost" value="0.48%" delta="-0.12% MoM" trend="up" subtext="Minimal fee leakage" icon="💰" />
        <KpiCard label="Failed / Dropped Txns" value="0.18%" delta="-0.06%" trend="up" subtext="High gateway uptime" icon="🛡️" />
        <KpiCard label="Settlement Window" value="T+0 / T+1" delta="Automated" trend="up" subtext="Direct HDFC sweep" icon="⚡" />
      </div>

      <div style={{
        background: 'var(--card, #131d2e)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '22px 24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#fff' }}>🏦 Payment Channel Mix & MDR Absorption</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Gross transaction volume, merchant fees, and net bank realization</p>
          </div>
          <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>T+1 Sweep Operational</span>
        </div>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.22)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <th style={{ padding: '10px 20px', textAlign: 'left', color: '#94a3b8' }}>Gateway / Channel Rail</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Processed Volume</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Transactions</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>MDR Rate</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>MDR Fee</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Net Bank Credit</th>
                <th style={{ padding: '10px 20px', textAlign: 'right', color: '#94a3b8' }}>Settlement Cycle</th>
              </tr>
            </thead>
            <tbody>
              {gateways.map((g, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 20px', color: '#fff', fontWeight: 600 }}>
                    {g.name}<br />
                    <span style={{ fontSize: '10px', color: '#94a3b8' }}>{g.rail}</span>
                  </td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#38bdf8' }}>{g.processed}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#cbd5e1' }}>{g.txns}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#94a3b8' }}>{g.mdrRate}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#f87171' }}>{g.mdrCost}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#10b981' }}>{g.netSettled}</td>
                  <td style={{ padding: '12px 20px', textAlign: 'right' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'rgba(16,185,129,0.15)', color: '#34d399', fontSize: '11px', fontWeight: 600 }}>{g.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Real-time Payment Inflow Stream */}
      <div style={{
        background: 'var(--card, #131d2e)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '22px 24px'
      }}>
        <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 700, color: '#fff' }}>⚡ Live Payment Authorization Feed</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Streaming successful client checkouts across 14 hospital front-desks and app consultations</p>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.22)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <th style={{ padding: '10px 20px', textAlign: 'left', color: '#94a3b8' }}>Transaction ID</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#94a3b8' }}>Pet & Owner</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#94a3b8' }}>Facility</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Settled Amount</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#94a3b8' }}>Payment Method</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#94a3b8' }}>Timestamp</th>
                <th style={{ padding: '10px 20px', textAlign: 'right', color: '#94a3b8' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentReceipts.map((r, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 20px', fontFamily: '"IBM Plex Mono", monospace', color: '#38bdf8' }}>{r.txnId}</td>
                  <td style={{ padding: '12px 14px', color: '#fff', fontWeight: 600 }}>
                    {r.pet}<br />
                    <span style={{ fontSize: '11px', color: '#94a3b8' }}>{r.client}</span>
                  </td>
                  <td style={{ padding: '12px 14px', color: '#cbd5e1' }}>{r.facility}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#10b981' }}>{r.amt}</td>
                  <td style={{ padding: '12px 14px', color: '#cbd5e1' }}>{r.channel}</td>
                  <td style={{ padding: '12px 14px', color: '#94a3b8' }}>{r.time}</td>
                  <td style={{ padding: '12px 20px', textAlign: 'right' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'rgba(16,185,129,0.15)', color: '#34d399', fontSize: '11px', fontWeight: 600 }}>{r.status}</span>
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
