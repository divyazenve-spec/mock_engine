import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function CustomerOrders() {
  const customerOrdersList = [
    { id: 'ORD-98101', parent: 'Ananya Sharma', pet: 'Bruno (Labrador)', items: 'Royal Canin Maxi Puppy 15kg + Pedigree Gravy (12x)', val: '₹6,850', channel: 'Android App', fulfillment: 'Delivered (60-Min)', time: '8 mins ago' },
    { id: 'ORD-98102', parent: 'Vikram Malhotra', pet: 'Rocky (German Shepherd)', items: 'Vet Consultation + NexGard Spectra 3-Pack', val: '₹4,200', channel: 'In-Clinic', fulfillment: 'Completed & Invoiced', time: '24 mins ago' },
    { id: 'ORD-98103', parent: 'Priya Iyer', pet: 'Coco (Shih Tzu)', items: 'Royal Spa Session + Orijen Small Breed Kibble', val: '₹5,400', channel: 'iOS App', fulfillment: 'Delivered (Express)', time: '42 mins ago' },
    { id: 'ORD-98104', parent: 'Rohan Deshmukh', pet: 'Milo & Bella', items: 'Whiskas Ocean Fish + Pedigree Biscuits + Cat Litter', val: '₹3,150', channel: 'Android App', fulfillment: 'Out for Delivery', time: '1 hr ago' },
    { id: 'ORD-98105', parent: 'Sneha Reddy', pet: 'Oreo (Golden Retriever)', items: 'Apoquel 16mg (Dermatology Rx) + Omega-3 Oil', val: '₹3,890', channel: 'Tele-Consult', fulfillment: 'Dispatched', time: '1 hr ago' },
    { id: 'ORD-98106', parent: 'Arjun Nair', pet: 'Leo (Siberian Husky)', items: 'Farmina N&D Ocean Salmon 12kg', val: '₹8,400', channel: 'Web Store', fulfillment: 'Delivered (Standard)', time: '2 hrs ago' },
    { id: 'ORD-98107', parent: 'Kavita Verma', pet: 'Casper (Samoyed)', items: 'Full Dental Scaling + Microchipping', val: '₹7,500', channel: 'In-Clinic', fulfillment: 'Completed', time: '3 hrs ago' },
    { id: 'ORD-98108', parent: 'Aditya Joshi', pet: 'Zoey (French Bulldog)', items: 'Hypoallergenic Kibble + Ear Cleaner Drops', val: '₹2,950', channel: 'iOS App', fulfillment: 'Delivered (60-Min)', time: '3 hrs ago' },
    { id: 'ORD-98109', parent: 'Meera Rao', pet: 'Rusty (Indie)', items: 'Annual 7-in-1 Booster Vaccination', val: '₹1,450', channel: 'In-Clinic', fulfillment: 'Completed', time: '4 hrs ago' },
    { id: 'ORD-98110', parent: 'Karthik Sundaram', pet: 'Max & Luna', items: 'Bravecto Chewable + Royal Canin Urinary S/O', val: '₹5,980', channel: 'Android App', fulfillment: 'Delivered (Express)', time: '5 hrs ago' }
  ];

  const cardStyle = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Customers 360°"
      subcategory="Omni-Channel Purchases"
      title="Customer Orders & Transaction History"
      subtitle="Complete multi-channel sales orders, clinic service bookings, pharmacy prescriptions, and dispatch status"
      icon="🛒"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Customer Orders" value="18,640" delta="+21.5%" trend="up" subtext="Across app, clinic & web" icon="🛒" />
        <KpiCard label="Average Order Value" value="₹3,480" delta="+8.6%" trend="up" subtext="Combined retail & medical basket" icon="💰" />
        <KpiCard label="60-Minute Fast Delivery" value="62.4%" delta="+14.8%" trend="up" subtext="Hyperlocal quick-commerce" icon="⚡" />
        <KpiCard label="Omni-Basket Attach Rate" value="38.6%" delta="+7.2%" trend="up" subtext="High multi-category cross-sell" icon="📦" />
      </div>

      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>🛒 Live Customer Purchase & Appointment Stream</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border, #e2e8f0)', textAlign: 'left', color: 'var(--muted-foreground, #475569)' }}>
                <th style={{ padding: '10px' }}>Order ID</th>
                <th style={{ padding: '10px' }}>Pet Parent</th>
                <th style={{ padding: '10px' }}>Pet Patient</th>
                <th style={{ padding: '10px' }}>Ordered Items / Services</th>
                <th style={{ padding: '10px' }}>Order Total</th>
                <th style={{ padding: '10px' }}>Sales Channel</th>
                <th style={{ padding: '10px' }}>Fulfillment Status</th>
                <th style={{ padding: '10px' }}>Time</th>
              </tr>
            </thead>
            <tbody>
              {customerOrdersList.length === 0 ? (<tr><td colSpan="8" style={{ textAlign: "center", padding: "32px", color: "var(--muted-foreground, #64748b)" }}>No customer order records found</td></tr>) : customerOrdersList.map((o, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '10px', fontFamily: 'monospace', fontWeight: 600 }}>{o.orderId || o.id}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{o.parent}</td>
                  <td style={{ padding: '10px', color: '#64748b' }}>{o.pet}</td>
                  <td style={{ padding: '10px' }}>{o.items}</td>
                  <td style={{ padding: '10px', fontWeight: 700, color: '#059669' }}>{o.val}</td>
                  <td style={{ padding: '10px' }}><span style={{ padding: '2px 6px', background: '#eff6ff', color: '#1d4ed8', borderRadius: '4px', fontWeight: 600 }}>{o.channel}</span></td>
                  <td style={{ padding: '10px' }}>
                    <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, background: '#f0fdf4', color: '#16a34a' }}>
                      {o.fulfillment}
                    </span>
                  </td>
                  <td style={{ padding: '10px', color: '#64748b' }}>{o.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
