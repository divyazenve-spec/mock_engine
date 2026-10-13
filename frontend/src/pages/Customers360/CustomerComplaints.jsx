import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

const INITIAL_TICKETS = [
  { id: 'TIK-4401', customer: 'Priya Sharma', pet: 'Max (Golden Retriever)', category: 'Delivery Delay', priority: 'High', issue: 'Emergency Prescription delayed by 45 mins past 60-min express SLA in Indiranagar', rep: 'Kiran R. (Escalations)', sla: '18 mins (Target 30m)', remedy: 'Delivery fee waived + ₹250 instant wallet credit', csat: '5.0 ⭐', status: 'Closed' },
  { id: 'TIK-4402', customer: 'Rahul Verma', pet: 'Bella (Persian Cat)', category: 'Packaging', priority: 'Medium', issue: 'Royal Canin Mother & Babycat kibble bag had a microscopic seal tear during transit', rep: 'Sneha P. (Quality)', sla: '25 mins (Target 45m)', remedy: 'Fresh 2kg pack dispatched with complimentary catnip treat', csat: '5.0 ⭐', status: 'Closed' },
  { id: 'TIK-4403', customer: 'Ananya Iyer', pet: 'Coco (Shih Tzu)', category: 'Billing', priority: 'Low', issue: 'First-time subscriber discount coupon (PETPASS20) did not deduct on UPI auto-debit', rep: 'Rohan M. (FinOps)', sla: '12 mins (Target 30m)', remedy: '₹340 credited directly to original UPI source + ₹100 credit', csat: '5.0 ⭐', status: 'Closed' },
  { id: 'TIK-4404', customer: 'Vikram Malhotra', pet: 'Rocky (German Shepherd)', category: 'Clinic', priority: 'High', issue: 'Consultation delayed by 30 mins due to emergency trauma surgery at Koramangala clinic', rep: 'Dr. Tanya S. (Chief Vet)', sla: '35 mins (Target 60m)', remedy: 'Consultation complimentary + VIP priority lane allocated', csat: '4.8 ⭐', status: 'Closed' },
  { id: 'TIK-4405', customer: 'Deepika Nair', pet: 'Milo (Beagle)', category: 'Pharmacy', priority: 'Critical', issue: 'Cold-chain Canine Insulin arrived at +9.2°C temperature threshold (Safe limit: 2-8°C)', rep: 'Amit K. (Pharma Lead)', sla: '22 mins (Target 30m)', remedy: 'Instant temperature-controlled courier dispatched + verified zero cost', csat: '5.0 ⭐', status: 'Closed' },
  { id: 'TIK-4406', customer: 'Siddharth Rao', pet: 'Leo (Labrador)', category: 'Delivery Delay', priority: 'Medium', issue: 'Heavy monsoon downpour delayed orthopaedic mattress delivery to Whitefield by 2 hours', rep: 'Pooja B. (Logistics)', sla: '40 mins (Target 60m)', remedy: 'Priority express dispatch + waterproof bed protector gift', csat: '4.7 ⭐', status: 'Closed' },
  { id: 'TIK-4407', customer: 'Kavita Menon', pet: 'Luna (Siberian Husky)', category: 'Clinic', priority: 'Low', issue: 'Grooming deshedding session was rescheduled on short notice due to power grid failure', rep: 'Vinay T. (Ops)', sla: '15 mins (Target 45m)', remedy: 'Complimentary spa upgrade + lavender aromabath pass', csat: '5.0 ⭐', status: 'Closed' },
  { id: 'TIK-4408', customer: 'Arjun Kapoor', pet: 'Simba (Indie Dog)', category: 'Pharmacy', priority: 'High', issue: 'NexGard tick chewable single blister strip missing in 3-pack combo box', rep: 'Sneha P. (Quality)', sla: '28 mins (Target 45m)', remedy: 'Full 3-pack dispatched free of cost + immediate apology follow-up', csat: '4.9 ⭐', status: 'Closed' },
  { id: 'TIK-4409', customer: 'Meera Nambiar', pet: 'Oreo (French Bulldog)', category: 'Delivery Delay', priority: 'High', issue: 'Rider delivered to Block B security gate instead of direct apartment doorstep', rep: 'Kiran R. (Escalations)', sla: '14 mins (Target 20m)', remedy: 'Delivery executive rerouted + ₹150 wallet credit applied', csat: '4.9 ⭐', status: 'Closed' },
  { id: 'TIK-4410', customer: 'Rohan Gupta', pet: 'Bruno (Rottweiler)', category: 'Packaging', priority: 'Low', issue: 'Joint supplement bottle cap was overtightened and seal difficult to open', rep: 'Rohan M. (Customer Care)', sla: '20 mins (Target 30m)', remedy: 'Bottle replacement with easy-twist cap shipped immediately', csat: '5.0 ⭐', status: 'Closed' }
];

export default function CustomerComplaints() {
  const [tickets, setTickets] = useState(INITIAL_TICKETS);
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newTicket, setNewTicket] = useState({
    customer: '',
    pet: '',
    category: 'Delivery Delay',
    priority: 'Medium',
    issue: '',
    rep: 'Kiran R. (Escalations)',
    remedy: 'Instant replacement + ₹0 credit'
  });

  const cardStyle = {
    background: 'var(--card, #ffffff)',
    border: '1px solid var(--border, rgba(0,0,0,0.08))',
    borderRadius: '12px',
    padding: '22px 24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
  };

  const filteredTickets = tickets.filter(t => {
    const matchesFilter =
      filter === 'ALL' ? true :
      filter === 'OPEN' ? t.status !== 'Closed' :
      filter === 'CLOSED' ? t.status === 'Closed' :
      t.category.toLowerCase().includes(filter.toLowerCase());

    const q = search.toLowerCase();
    const matchesSearch = !q ||
      t.id.toLowerCase().includes(q) ||
      t.customer.toLowerCase().includes(q) ||
      t.pet.toLowerCase().includes(q) ||
      t.issue.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q);

    return matchesFilter && matchesSearch;
  });

  const handleResolve = (id) => {
    const ticket = tickets.find(t => t.id === id);
    if (!ticket) return;
    const remedy = window.prompt(`Enter resolution outcome & compensation for ${ticket.id} (${ticket.customer}):`, 'Full fee waiver + ₹0 credit provided');
    if (remedy) {
      setTickets(prev => prev.map(t => t.id === id ? {
        ...t,
        status: 'Closed',
        remedy: remedy,
        sla: 'Resolved just now',
        csat: '5.0 ⭐'
      } : t));
      alert(`Ticket ${id} marked as Closed & Resolved! Pet parent notified via SMS/WhatsApp.`);
    }
  };

  const handleAddTicket = (e) => {
    e.preventDefault();
    const id = `TICK-${4400 + tickets.length + 1}`;
    const created = {
      id,
      customer: newTicket.customer,
      pet: newTicket.pet,
      category: newTicket.category,
      priority: newTicket.priority,
      issue: newTicket.issue,
      rep: newTicket.rep,
      sla: 'Active (Now)',
      remedy: newTicket.remedy,
      csat: 'Pending',
      status: 'Investigating'
    };
    setTickets([created, ...tickets]);
    setShowModal(false);
    setNewTicket({
      customer: '',
      pet: '',
      category: 'Delivery Delay',
      priority: 'Medium',
      issue: '',
      rep: 'Kiran R. (Escalations)',
      remedy: 'Instant replacement + ₹0 credit'
    });
    alert(`Complaint ${id} registered! Priority alert dispatched.`);
  };

  return (
    <DashboardLayout
      category="Customers 360°"
      subcategory="Customer Service & Resolution"
      title="Customer Complaints & Grievance Resolution"
      subtitle="Executive grievance telemetry, root-cause categorization, SLA turnaround countdowns, and automated pet parent compensation SOPs"
      icon="⚠️"
      badge="10 Grievances Tracked"
    >
      {/* 6 Executive KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Grievances (MTD)" value="10" delta="-28.4%" trend="down" subtext="Resolved across Bengaluru" icon="⚠️" />
        <KpiCard label="First Contact Resolution" value="92.4%" delta="+4.2%" trend="up" subtext="Resolved in initial interaction" icon="⚡" />
        <KpiCard label="Avg. SLA Resolution Time" value="21 mins" delta="-6 mins" trend="up" subtext="Target: <30 mins" icon="⏱️" />
        <KpiCard label="Post-Resolution CSAT" value="4.92 / 5" delta="+0.18" trend="up" subtext="Delighted pet parents" icon="⭐" />
        <KpiCard label="Cold-Chain / Rx SLA" value="100.0%" delta="Zero breaches" trend="up" subtext="Insulin & emergency Rx" icon="❄️" />
        <KpiCard label="Sentiment Recovery" value="98.2%" delta="+3.1%" trend="up" subtext="Retained pet parent accounts" icon="❤️" />
      </div>

      {/* 2-Column Root Cause and SOP Remedy Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '16px' }}>
        {/* Root Cause Distribution */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: 'var(--foreground, #0f172a)' }}>📊 Grievance Category & Root-Cause Distribution</h3>
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '12px', background: '#ecfdf5', color: '#059669' }}>Real-Time Telemetry</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              { label: 'Delivery Delay / ETA Breach', count: 3, pct: 30, color: '#f59e0b' },
              { label: 'Packaging & Damaged Seal', count: 2, pct: 20, color: '#3b82f6' },
              { label: 'Pharmacy & Cold-Chain Check', count: 2, pct: 20, color: '#ef4444' },
              { label: 'Clinic Schedule Adjustment', count: 2, pct: 20, color: '#8b5cf6' },
              { label: 'Billing / Wallet Credit Adjustment', count: 1, pct: 10, color: '#10b981' }
            ].map(item => (
              <div key={item.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600, color: '#334155' }}>{item.label}</span>
                  <span style={{ fontWeight: 700, color: '#0f172a' }}>{item.count} tickets ({item.pct}%)</span>
                </div>
                <div style={{ height: '7px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${item.pct}%`, background: item.color, borderRadius: '4px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SOP Remedies Matrix */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: 'var(--foreground, #0f172a)' }}>📋 SOP Remedies & Resolution Matrix</h3>
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '12px', background: '#fef2f2', color: '#ef4444' }}>Strict Tier-1 Protocol</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#f59e0b' }}>🚚 Delivery Delay > 20 Mins</span>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#2563eb' }}>Full Waiver + ₹0</span>
              <p style={{ margin: 0, fontSize: '11px', color: '#64748b', lineHeight: 1.4 }}>Auto-triggered if rider GPS exceeds 70 mins. Team lead provides live ETA.</p>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#ef4444' }}>❄️ Cold-Chain > 8°C Deviation</span>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#2563eb' }}>Instant Swap + Vet Sign-off</span>
              <p style={{ margin: 0, fontSize: '11px', color: '#64748b', lineHeight: 1.4 }}>Vaccines & insulins replaced free of cost from nearest fridge hub in 25 mins.</p>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#3b82f6' }}>📦 Damaged Kibble Seal</span>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#2563eb' }}>100% Free Swap + Treat Pouch</span>
              <p style={{ margin: 0, fontSize: '11px', color: '#64748b', lineHeight: 1.4 }}>No return pickup needed. Fresh sealed pack dispatched with complimentary treat.</p>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#8b5cf6' }}>🏥 Clinic Reschedule by Hospital</span>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#2563eb' }}>VIP Priority Slot + Free Checkup</span>
              <p style={{ margin: 0, fontSize: '11px', color: '#64748b', lineHeight: 1.4 }}>If surgery delays vet, parent receives guaranteed priority queue + free nails trim.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grievance Register Table with Search, Filter & Actions */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 800, color: 'var(--foreground, #0f172a)' }}>⚠️ Live Customer Support & Grievance Register</h3>
            <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>Active customer complaints, priority triage, SLA countdowns, and resolution logging</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search ticket, parent, pet, or issue..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                padding: '7px 12px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '12px',
                width: '240px',
                outline: 'none'
              }}
            />

            <div style={{ display: 'flex', gap: '4px', background: '#f1f5f9', padding: '3px', borderRadius: '8px' }}>
              {['ALL', 'Delivery', 'Packaging', 'Billing', 'Clinic', 'Pharmacy', 'OPEN'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    border: 'none',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: filter === f ? '#ffffff' : 'transparent',
                    color: filter === f ? '#1d4ed8' : '#64748b',
                    boxShadow: filter === f ? '0 1px 2px rgba(0,0,0,0.06)' : 'none'
                  }}
                >
                  {f}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowModal(true)}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                border: 'none',
                background: '#2563eb',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              + Log New Grievance
            </button>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border, #e2e8f0)', textAlign: 'left', color: 'var(--muted-foreground, #475569)' }}>
                <th style={{ padding: '10px' }}>Ticket ID</th>
                <th style={{ padding: '10px' }}>Pet Parent & Pet</th>
                <th style={{ padding: '10px' }}>Category</th>
                <th style={{ padding: '10px' }}>Priority</th>
                <th style={{ padding: '10px', minWidth: '220px' }}>Grievance Description</th>
                <th style={{ padding: '10px' }}>Care Lead</th>
                <th style={{ padding: '10px' }}>SLA Turnaround</th>
                <th style={{ padding: '10px' }}>Outcome / Remedy</th>
                <th style={{ padding: '10px' }}>CSAT</th>
                <th style={{ padding: '10px' }}>Status</th>
                <th style={{ padding: '10px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.length === 0 ? (
                <tr>
                  <td colSpan="11" style={{ textAlign: 'center', padding: '24px', color: '#64748b' }}>
                    No complaints match current filter or search criteria.
                  </td>
                </tr>
              ) : (
                filteredTickets.map((t) => (
                  <tr key={t.id} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                    <td style={{ padding: '10px', fontFamily: 'monospace', fontWeight: 700, color: '#2563eb' }}>{t.id}</td>
                    <td style={{ padding: '10px' }}>
                      <div style={{ fontWeight: 700 }}>{t.customer}</div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>🐾 {t.pet}</div>
                    </td>
                    <td style={{ padding: '10px' }}>
                      <span style={{ padding: '2px 8px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '4px', fontWeight: 600, fontSize: '11px' }}>
                        {t.category}
                      </span>
                    </td>
                    <td style={{ padding: '10px' }}>
                      <span style={{
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontWeight: 700,
                        fontSize: '11px',
                        background: t.priority === 'Critical' ? '#fee2e2' : t.priority === 'High' ? '#fef3c7' : '#f0fdf4',
                        color: t.priority === 'Critical' ? '#b91c1c' : t.priority === 'High' ? '#b45309' : '#15803d'
                      }}>
                        {t.priority}
                      </span>
                    </td>
                    <td style={{ padding: '10px', color: '#334155', fontWeight: 500, lineHeight: 1.4 }}>{t.issue}</td>
                    <td style={{ padding: '10px', color: '#64748b', fontWeight: 600 }}>{t.rep}</td>
                    <td style={{ padding: '10px', fontWeight: 700 }}>{t.sla}</td>
                    <td style={{ padding: '10px', color: '#059669', fontWeight: 600 }}>{t.remedy}</td>
                    <td style={{ padding: '10px', fontWeight: 700, color: '#eab308' }}>{t.csat}</td>
                    <td style={{ padding: '10px' }}>
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: 700,
                        background: t.status === 'Closed' ? '#f0fdf4' : '#fee2e2',
                        color: t.status === 'Closed' ? '#16a34a' : '#dc2626'
                      }}>
                        {t.status}
                      </span>
                    </td>
                    <td style={{ padding: '10px' }}>
                      {t.status === 'Closed' ? (
                        <button
                          onClick={() => alert(`Ticket ${t.id} is resolved.\nOutcome: ${t.remedy}`)}
                          style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#ffffff', fontSize: '11px', cursor: 'pointer' }}
                        >
                          View Details
                        </button>
                      ) : (
                        <button
                          onClick={() => handleResolve(t.id)}
                          style={{ padding: '4px 8px', borderRadius: '4px', border: 'none', background: '#2563eb', color: '#ffffff', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
                        >
                          Resolve Ticket
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Dialog for Logging New Grievance */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          zIndex: 100000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '14px',
            border: '1px solid #cbd5e1',
            padding: '24px',
            maxWidth: '540px',
            width: '100%',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 800, color: '#0f172a' }}>⚠️ Log Customer Grievance</h3>
              <button
                onClick={() => setShowModal(false)}
                style={{ background: 'transparent', border: 'none', fontSize: '16px', cursor: 'pointer', color: '#64748b' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddTicket}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Pet Parent Name</label>
                  <input
                    type="text"
                    required
                    value={newTicket.customer}
                    onChange={(e) => setNewTicket({ ...newTicket, customer: e.target.value })}
                    placeholder="e.g. Roshni Kapoor"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Pet Name & Breed</label>
                  <input
                    type="text"
                    required
                    value={newTicket.pet}
                    onChange={(e) => setNewTicket({ ...newTicket, pet: e.target.value })}
                    placeholder="e.g. Bella (Beagle)"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Complaint Category</label>
                  <select
                    value={newTicket.category}
                    onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  >
                    <option value="Delivery Delay">Delivery Delay (Dark Store)</option>
                    <option value="Product Packaging">Product Packaging / Damaged Seal</option>
                    <option value="Cold-Chain Pharmacy">Cold-Chain Pharmacy (Temperature)</option>
                    <option value="Clinic Reschedule">Clinic OPD Reschedule</option>
                    <option value="Billing Query">Billing & Loyalty Coins</option>
                    <option value="Grooming Service">Grooming Service Issue</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Priority Level</label>
                  <select
                    value={newTicket.priority}
                    onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  >
                    <option value="Critical">Critical (Immediate Triage)</option>
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium (Standard)</option>
                    <option value="Low">Low (Informational)</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Grievance Description</label>
                <textarea
                  required
                  rows={3}
                  value={newTicket.issue}
                  onChange={(e) => setNewTicket({ ...newTicket, issue: e.target.value })}
                  placeholder="Describe customer issue, order ID, and pet parent feedback..."
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Assigned Care Specialist</label>
                  <input
                    type="text"
                    required
                    value={newTicket.rep}
                    onChange={(e) => setNewTicket({ ...newTicket, rep: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Initial Remedy Offer</label>
                  <input
                    type="text"
                    required
                    value={newTicket.remedy}
                    onChange={(e) => setNewTicket({ ...newTicket, remedy: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#ffffff', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: '#2563eb', color: '#ffffff', cursor: 'pointer', fontSize: '12px', fontWeight: 700 }}
                >
                  Log & Initiate SLA Timer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
