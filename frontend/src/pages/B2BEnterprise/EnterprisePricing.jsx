import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function EnterprisePricing() {
  const tiers = [
    { tier: 'Tier 1 Elite Enterprise', minOrder: '₹5,00,000+', discount: '28% Off MRP', paymentTerms: 'Net 45 Days', freight: 'Free Express Air Cargo', rebate: '4.5% Annual Rebate' },
    { tier: 'Tier 2 Hospital Chain', minOrder: '₹2,50,000', discount: '22% Off MRP', paymentTerms: 'Net 30 Days', freight: 'Free Doorstep Surface', rebate: '3.0% Annual Rebate' },
    { tier: 'Tier 3 Breeder Network', minOrder: '₹1,00,000', discount: '18% Off MRP', paymentTerms: 'Net 15 Days', freight: 'Free Surface above ₹1.5L', rebate: '2.0% Annual Rebate' },
    { tier: 'Tier 4 Government & Police K9', minOrder: '₹3,00,000', discount: '25% Off MRP', paymentTerms: 'Net 60 Days', freight: 'Direct Depot Delivery', rebate: 'Government Fixed Price' },
    { tier: 'Tier 5 Corporate Wellness Benefit', minOrder: '₹1,50,000', discount: '20% Off MRP', paymentTerms: 'Net 30 Days', freight: 'Consolidated Monthly', rebate: '2.5% Annual Rebate' },
    { tier: 'Tier 6 Referral Clinic Alliance', minOrder: '₹75,000', discount: '15% Off MRP', paymentTerms: 'Net 15 Days', freight: 'Standard Flat ₹499', rebate: '1.5% Annual Rebate' },
    { tier: 'Tier 7 Animal Shelter & NGO Partner', minOrder: '₹50,00,000', discount: '30% At-Cost Subsidized', paymentTerms: 'Net 30 Days', freight: 'Free Sponsored Delivery', rebate: 'N/A (Subsidized)' },
    { tier: 'Tier 8 Emergency 24/7 Supply Pool', minOrder: '₹1,25,000', discount: '16% Off MRP', paymentTerms: 'Net 21 Days', freight: 'Priority 2-Hour Hot-Dispatch', rebate: '1.0% Annual Rebate' },
    { tier: 'Tier 9 Academic Veterinary Research', minOrder: '₹80,000', discount: '24% Off MRP', paymentTerms: 'Net 45 Days', freight: 'Free Surface', rebate: 'Educational Grant 3%' },
    { tier: 'Tier 10 Regional Sub-Wholesaler', minOrder: '₹10,00,000+', discount: '32% Off MRP', paymentTerms: 'Letter of Credit / Net 30', freight: 'Container Truckload Free', rebate: '5.0% Annual Rebate' }
  ];

  const skus = [
    { sku: 'SKU-B2B-VAC-01', name: 'Nobivac DHPPi + L4 Canine Core Vaccine (50-Vial Pack)', retailMrp: '₹18,500', tier1: '₹13,320', tier2: '₹14,430', tier3: '₹15,170', minQty: '5 Packs' },
    { sku: 'SKU-B2B-PAR-02', name: 'Bravecto Chewable Tablets 20-40kg (Box of 12)', retailMrp: '₹26,400', tier1: '₹19,008', tier2: '₹20,592', tier3: '₹21,648', minQty: '3 Boxes' },
    { sku: 'SKU-B2B-DIE-03', name: 'Royal Canin Veterinary Diet Gastrointestinal 14kg Bulk Bag', retailMrp: '₹9,800', tier1: '₹7,056', tier2: '₹7,644', tier3: '₹8,036', minQty: '10 Bags' },
    { sku: 'SKU-B2B-SUR-04', name: 'Surgical Monofilament Suture Kit USP 3-0 Box of 36', retailMrp: '₹4,500', tier1: '₹3,240', tier2: '₹3,510', tier3: '₹3,690', minQty: '8 Boxes' },
    { sku: 'SKU-B2B-DIA-05', name: 'Canine Parvovirus (CPV) Antigen Rapid Test Cassette Box of 25', retailMrp: '₹8,750', tier1: '₹6,300', tier2: '₹6,825', tier3: '₹7,175', minQty: '4 Boxes' },
    { sku: 'SKU-B2B-ANT-06', name: 'Amoxicillin + Clavulanate 500mg Tabs Veterinary 100-Pack', retailMrp: '₹3,200', tier1: '₹2,304', tier2: '₹2,496', tier3: '₹2,624', minQty: '12 Packs' },
    { sku: 'SKU-B2B-MIC-07', name: 'ISO Standard 134.2kHz RFID Microchip Syringe Implant 50-Pack', retailMrp: '₹14,000', tier1: '₹10,080', tier2: '₹10,920', tier3: '₹11,480', minQty: '2 Packs' },
    { sku: 'SKU-B2B-FLUID-08', name: "Ringer's Lactate Infusion Solution 500ml IV Case of 40", retailMrp: '₹2,800', tier1: '₹2,016', tier2: '₹2,184', tier3: '₹2,296', minQty: '15 Cases' },
    { sku: 'SKU-B2B-ORT-09', name: 'Veterinary Orthopedic Bone Plate & Screw Set Stainless Steel', retailMrp: '₹42,000', tier1: '₹30,240', tier2: '₹32,760', tier3: '₹34,440', minQty: '1 Set' },
    { sku: 'SKU-B2B-DEN-10', name: 'Veterinary Ultrasonic Dental Scaler Prophylaxis Tip Pack of 6', retailMrp: '₹7,500', tier1: '₹5,400', tier2: '₹5,850', tier3: '₹6,150', minQty: '4 Packs' }
  ];

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="B2B / Enterprise"
      subcategory="Enterprise Pricing"
      title="Enterprise Tiered Pricing & Rate Cards"
      subtitle="Volume discount tiers, institutional master rate cards, MOQs, and corporate price lock guarantees"
      icon="🏷️"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Average Volume Discount" value="22.5%" delta="Scale based" trend="neutral" subtext="Tiered volume brackets" icon="🏷️" />
        <KpiCard label="Annual Price Locked SKUs" value="10 Core SKUs" delta="12-Mo lock" trend="up" subtext="Contract guaranteed rates" icon="🔒" />
        <KpiCard label="Enterprise Rebates Issued" value="₹14,80,000" delta="YTD total" trend="neutral" subtext="Performance based rebates" icon="💵" />
        <KpiCard label="Minimum Order Quantity (MOQ)" value="₹50,000" delta="Base MOQ" trend="neutral" subtext="Wholesale fulfillment floor" icon="📦" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
        <div style={card}>
          <h3 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Volume Discount Tiers & Commercial Matrix</h3>
          <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Commercial threshold tiers, minimum order quantities, and annual volume rebates</p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)' }}>
                  <th style={{ padding: '10px 12px' }}>Tier Name</th>
                  <th style={{ padding: '10px 12px' }}>Min Order Value</th>
                  <th style={{ padding: '10px 12px' }}>Discount Off MRP</th>
                  <th style={{ padding: '10px 12px' }}>Payment Terms</th>
                  <th style={{ padding: '10px 12px' }}>Freight Policy</th>
                  <th style={{ padding: '10px 12px' }}>Volume Rebate</th>
                </tr>
              </thead>
              <tbody>
                {tiers.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ padding: '24px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                      No volume discount tiers found
                    </td>
                  </tr>
                ) : (
                  tiers.map(t => (
                    <tr key={t.tier} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                      <td style={{ padding: '12px', fontWeight: 600 }}>{t.tier}</td>
                      <td style={{ padding: '12px', fontWeight: 600, color: '#4338ca' }}>{t.minOrder}</td>
                      <td style={{ padding: '12px', fontWeight: 600, color: '#059669' }}>{t.discount}</td>
                      <td style={{ padding: '12px' }}>{t.paymentTerms}</td>
                      <td style={{ padding: '12px' }}>{t.freight}</td>
                      <td style={{ padding: '12px', color: '#64748b' }}>{t.rebate}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div style={card}>
          <h3 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>High-Velocity Master SKU Rate Card</h3>
          <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Contracted bulk unit pricing across Tier 1, Tier 2, and Tier 3</p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)' }}>
                  <th style={{ padding: '10px 12px' }}>SKU Code</th>
                  <th style={{ padding: '10px 12px' }}>Product Description</th>
                  <th style={{ padding: '10px 12px' }}>Standard MRP</th>
                  <th style={{ padding: '10px 12px' }}>Tier 1 Price</th>
                  <th style={{ padding: '10px 12px' }}>Tier 2 Price</th>
                  <th style={{ padding: '10px 12px' }}>Tier 3 Price</th>
                  <th style={{ padding: '10px 12px' }}>MOQ</th>
                </tr>
              </thead>
              <tbody>
                {skus.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ padding: '24px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                      No master SKU rate cards found
                    </td>
                  </tr>
                ) : (
                  skus.map(s => (
                    <tr key={s.sku} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                      <td style={{ padding: '12px', fontFamily: 'monospace', fontWeight: 600 }}>{s.sku}</td>
                      <td style={{ padding: '12px', fontWeight: 600 }}>{s.name}</td>
                      <td style={{ padding: '12px', color: '#64748b' }}>{s.retailMrp}</td>
                      <td style={{ padding: '12px', fontWeight: 600, color: '#059669' }}>{s.tier1}</td>
                      <td style={{ padding: '12px', fontWeight: 600, color: '#4338ca' }}>{s.tier2}</td>
                      <td style={{ padding: '12px', fontWeight: 600 }}>{s.tier3}</td>
                      <td style={{ padding: '12px' }}>{s.minQty}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
