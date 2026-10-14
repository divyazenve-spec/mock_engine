import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function DoctorOrders() {
  const clinicalOrders = [
    { id: 'ORD-DOC-701', doctor: 'Dr. Rajeshwari Swaminathan', patient: 'Bruno (Golden Retriever)', items: 'Cefpodoxime 200mg, Carprofen 75mg, Joint Support (90 tabs)', center: 'Indiranagar Central Hospital', amount: '₹4,850', status: 'Dispensed & Billed' },
    { id: 'ORD-DOC-702', doctor: 'Dr. Pooja Mehta', patient: 'Milo (Persian Cat)', items: 'Buprenorphine 0.3mg, Royal Canin Urinary S/O (2kg), Prazosin', center: 'Bandra Trauma Centre', amount: '₹3,920', status: 'Dispensed & Billed' },
    { id: 'ORD-DOC-703', doctor: 'Dr. Vikramaditya Rathore', patient: 'Simba (German Shepherd)', items: 'Metronidazole IV, Pantoprazole 40mg, Surgical Abdominal Pack', center: 'DLF CyberCity Hospital', amount: '₹8,400', status: 'Dispensed & Billed' },
    { id: 'ORD-DOC-704', doctor: 'Dr. Anirudh Sen', patient: 'Bella (Shih Tzu)', items: 'Amoxicillin-Clav 375mg, Tramadol Drops, Chlorhexidine Scrub', center: 'Jubilee Hills Center', amount: '₹3,150', status: 'Dispensed & Billed' },
    { id: 'ORD-DOC-705', doctor: 'Dr. Maya Chandran', patient: 'Leo (Beagle)', items: 'Sucralfate Oral Susp, Metoclopramide, GI Recovery Wet Food (12 cans)', center: 'Koramangala Care Clinic', amount: '₹2,880', status: 'Dispensed & Billed' },
    { id: 'ORD-DOC-706', doctor: 'Dr. Rohan Kulkarni', patient: 'Coco (Labrador)', items: 'Yunnan Baiyao, Ondansetron IV, Surgical Hemostatic Sponges', center: 'Koregaon Park Hospital', amount: '₹5,620', status: 'Dispensed & Billed' },
    { id: 'ORD-DOC-707', doctor: 'Dr. Gaurav Sharma', patient: 'Zoe (Siberian Husky)', items: 'Butorphanol, Meropenem 500mg, Thoracic Trocar Catheter', center: 'DLF CyberCity Hospital', amount: '₹9,200', status: 'Dispensed & Billed' },
    { id: 'ORD-DOC-708', doctor: 'Dr. Gaurav Sharma', patient: 'Oreo (Indie Dog)', items: '3.5mm Titanium Locking Screws, Cefazolin IV, Robenacoxib 20mg', center: 'Bandra Trauma Centre', amount: '₹7,450', status: 'Dispensed & Billed' },
    { id: 'ORD-DOC-709', doctor: 'Dr. Sneha Nair', patient: 'Luna (British Shorthair)', items: 'Tobramycin Ophthalmic, Atropine 1%, Ocular Lubricant Gel', center: 'Indiranagar Central Hospital', amount: '₹2,100', status: 'Dispensed & Billed' },
    { id: 'ORD-DOC-710', doctor: 'Dr. Siddharth Verma', patient: 'Rocky (Rottweiler)', items: 'Vetmedin (Pimobendan 5mg), Torsemide, Cardipro Omega-3', center: 'DLF CyberCity Hospital', amount: '₹6,750', status: 'Dispensed & Billed' }
  ];

  const cardStyle = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Doctors"
      subcategory="Clinical Prescriptions"
      title="Doctor Prescriptions & Pharmacy Order Tracking"
      subtitle="Physician pharmaceutical orders, surgical consumables requisition, and automated clinical dispensary sync"
      icon="📦"
      badge="1,240 Fulfilled Rx"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Physician Orders Raised" value="1,240 Orders" delta="+15.6%" trend="up" subtext="Prescriptions & consumables" icon="📦" />
        <KpiCard label="Order Fulfillment Rate" value="99.1%" delta="+0.8%" trend="up" subtext="Express in-clinic dispensary" icon="⚡" />
        <KpiCard label="Order Value Generated" value="₹34.80 L" delta="+17.2%" trend="up" subtext="Direct pharmacy attach" icon="💰" />
        <KpiCard label="Formulary Adherence" value="97.8%" delta="+1.2%" trend="up" subtext="NABH quality standards" icon="🛡️" />
      </div>

      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>📦 Clinical Dispensary & Requisition Log</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border, #e2e8f0)', textAlign: 'left', color: 'var(--muted-foreground, #475569)' }}>
                <th style={{ padding: '10px' }}>Order ID</th>
                <th style={{ padding: '10px' }}>Doctor Name</th>
                <th style={{ padding: '10px' }}>Patient / Pet</th>
                <th style={{ padding: '10px' }}>Prescribed Drugs & Supplies</th>
                <th style={{ padding: '10px' }}>Dispensary Center</th>
                <th style={{ padding: '10px' }}>Total Amount</th>
                <th style={{ padding: '10px' }}>Fulfillment Status</th>
              </tr>
            </thead>
            <tbody>
              {clinicalOrders.map((o, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '10px', fontFamily: 'monospace', fontWeight: 600 }}>{o.id}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{o.doctor}</td>
                  <td style={{ padding: '10px' }}>{o.patient}</td>
                  <td style={{ padding: '10px', color: '#64748b' }}>{o.items}</td>
                  <td style={{ padding: '10px' }}>{o.center}</td>
                  <td style={{ padding: '10px', fontWeight: 600, color: '#059669' }}>{o.amount}</td>
                  <td style={{ padding: '10px' }}>
                    <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, background: 'rgba(16,185,129,0.12)', color: '#047857' }}>
                      {o.status}
                    </span>
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
