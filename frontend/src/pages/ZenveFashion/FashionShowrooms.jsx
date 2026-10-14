import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function FashionShowrooms() {
  const showrooms = [
    { id: 'SHW-01', name: 'Bandra West Haute Couture Flagship', area: 'Linking Road, Bandra', city: 'Mumbai', sqft: '2,400', footfall: '480', trials: '340', sales: '₹14.80L', revPerSqft: '₹616', conversion: '70.8%', avgTicket: '₹9,850', leadStylist: 'Rhea Sen', rating: '4.9 ★' },
    { id: 'SHW-02', name: 'Indiranagar Atelier & Styling Lounge', area: '100ft Road, Indiranagar', city: 'Bengaluru', sqft: '2,100', footfall: '420', trials: '290', sales: '₹12.40L', revPerSqft: '₹590', conversion: '69.0%', avgTicket: '₹8,920', leadStylist: 'Natasha Rao', rating: '4.9 ★' },
    { id: 'SHW-03', name: 'Koramangala VIP Pet Experience Hub', area: '4th Block, Koramangala', city: 'Bengaluru', sqft: '1,800', footfall: '360', trials: '240', sales: '₹9.80L', revPerSqft: '₹544', conversion: '66.7%', avgTicket: '₹8,450', leadStylist: 'Arjun Menon', rating: '4.8 ★' },
    { id: 'SHW-04', name: 'Jubilee Hills Luxury Pet Salon', area: 'Rd No. 36, Jubilee Hills', city: 'Hyderabad', sqft: '1,950', footfall: '310', trials: '210', sales: '₹8.60L', revPerSqft: '₹441', conversion: '67.7%', avgTicket: '₹7,980', leadStylist: 'Priya Reddy', rating: '4.8 ★' },
    { id: 'SHW-05', name: 'DLF CyberCity Pet Pavilion', area: 'Phase 2, DLF CyberCity', city: 'Gurugram', sqft: '2,200', footfall: '340', trials: '230', sales: '₹9.20L', revPerSqft: '₹418', conversion: '67.6%', avgTicket: '₹8,150', leadStylist: 'Sameer Malik', rating: '4.8 ★' },
    { id: 'SHW-06', name: 'Colaba Heritage Boutique', area: 'Apollo Bunder, Colaba', city: 'Mumbai', sqft: '1,600', footfall: '260', trials: '180', sales: '₹7.40L', revPerSqft: '₹462', conversion: '69.2%', avgTicket: '₹8,600', leadStylist: 'Farhan Merchant', rating: '4.9 ★' },
    { id: 'SHW-07', name: 'Vasant Vihar Couture Salon', area: 'Priya Complex, Vasant Vihar', city: 'South Delhi', sqft: '1,750', footfall: '280', trials: '190', sales: '₹8.10L', revPerSqft: '₹463', conversion: '67.9%', avgTicket: '₹8,350', leadStylist: 'Anika Sharma', rating: '4.8 ★' },
    { id: 'SHW-08', name: 'Whitefield Prestige Experience Hub', area: 'Outer Ring Rd, Whitefield', city: 'Bengaluru', sqft: '1,500', footfall: '240', trials: '160', sales: '₹6.50L', revPerSqft: '₹433', conversion: '66.7%', avgTicket: '₹7,800', leadStylist: 'Karthik Nair', rating: '4.7 ★' },
    { id: 'SHW-09', name: 'Alwarpet Luxury Pet Gallery', area: 'TTK Road, Alwarpet', city: 'Chennai', sqft: '1,650', footfall: '220', trials: '145', sales: '₹5.80L', revPerSqft: '₹351', conversion: '65.9%', avgTicket: '₹7,500', leadStylist: 'Divya Sundaram', rating: '4.7 ★' },
    { id: 'SHW-010', name: 'Koregaon Park Atelier', area: 'North Main Rd, Koregaon Park', city: 'Pune', sqft: '1,400', footfall: '200', trials: '135', sales: '₹5.20L', revPerSqft: '₹371', conversion: '67.5%', avgTicket: '₹7,250', leadStylist: 'Tanvi Kulkarni', rating: '4.8 ★' }
  ];

  const inStoreExperiences = [
    { icon: '🐕', title: '3D Optical Pet Body Scanner', stat: '1,420 Scans Completed', desc: 'Precision millimeter contactless 3D scanning generates instant bespoke sizing profiles and custom pattern cutting.' },
    { icon: '👗', title: 'Private VIP Dressing Rooms', stat: '94.2% Conversion Rate', desc: 'Sound-dampened fitting lounges equipped with calming organic pheromone diffusers for stress-free trials.' },
    { icon: '✨', title: 'Atelier Monogramming Bar', stat: '8-Minute Turnaround', desc: 'In-boutique laser engraving and gold zari embroidery customization while pet parents enjoy complimentary espresso.' },
    { icon: '🥂', title: 'Pet Parent Hospitality Lounge', stat: '4.96 ★ Experience Rating', desc: 'Artisanal organic canine bone-broth spritzers and luxury champagne tasting during private wardrobe consultations.' }
  ];

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(255,255,255,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Zenve Fashion"
      subcategory="Flagship Showrooms"
      title="Flagship Pet Couture Showrooms & Experience Centers"
      subtitle="Physical boutique performance, in-store trial room conversions, pet footfall, and retail revenue per square foot"
      icon="🏛️"
      badge="10 Boutiques Live"
      actions={
        <button onClick={() => alert('Scheduling Private Boutique VIP Styling Event...')} style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #ec4899', background: 'rgba(236,72,153,0.15)', color: '#f472b6', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
          ✨ VIP Showroom Event
        </button>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Showroom Revenue (MTD)" value="₹27.20L" delta="+28.4% MoM" trend="up" subtext="Physical flagship locations" icon="🛍️" />
        <KpiCard label="Pet Footfall (MTD)" value="1,640 Pets" delta="+18.5% YoY" trend="up" subtext="Across 10 urban showrooms" icon="🐾" />
        <KpiCard label="Dressing Room Trials" value="1,160 Trials" delta="70.7% Trial Rate" trend="up" subtext="Private fitting rooms" icon="👗" />
        <KpiCard label="Avg. Revenue per Sq Ft" value="₹580 / sqft" delta="+₹45 vs FY25" trend="up" subtext="Prime high-street retail" icon="📐" />
        <KpiCard label="On-Spot Customization" value="194 Orders" delta="8-min monogram" trend="up" subtext="Laser embroidery bar" icon="✨" />
        <KpiCard label="Showroom Client Rating" value="4.86 ★" delta="840 Reviews" trend="up" subtext="World-class hospitality" icon="⭐" />
      </div>

      {/* Boutique Experience Features */}
      <div style={card}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>✨ Signature In-Boutique Client Experiences</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
          {inStoreExperiences.map((exp, i) => (
            <div key={i} style={{ background: 'var(--muted, #f8fafc)', border: '1px solid rgba(0,0,0,0.06)', borderRadius: '10px', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>{exp.icon} {exp.title}</span>
              </div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#f472b6', marginBottom: '6px' }}>{exp.stat}</div>
              <p style={{ margin: 0, fontSize: '11px', color: 'var(--muted-foreground, #64748b)', lineHeight: 1.5 }}>{exp.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Showroom Table */}
      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>🛍️ Showroom Performance Matrix (10 Locations)</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Footfall conversion, sales volume, and retail square footage efficiency</p>
          </div>
        </div>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'var(--muted, #f8fafc)', borderBottom: '1px solid var(--border, rgba(0,0,0,0.08))' }}>
                {['ID', 'Showroom Name', 'City & Hub Area', 'Sq. Ft', 'Pet Footfall', 'Trials', 'Sales MTD', 'Rev / Sq Ft', 'Conversion', 'Avg Ticket', 'Lead Stylist', 'Rating'].map(h => (
                  <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--muted-foreground, #64748b)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {showrooms.map((s, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border, rgba(0,0,0,0.06))' }}>
                  <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', color: '#f472b6', fontSize: '11px' }}>{s.id}</td>
                  <td style={{ padding: '11px 12px', fontWeight: 600, color: 'var(--foreground, #0f172a)' }}>{s.name}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--foreground, #334155)' }}>{s.area}, {s.city}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--muted-foreground, #64748b)' }}>{s.sqft} sqft</td>
                  <td style={{ padding: '11px 12px', color: 'var(--foreground, #0f172a)', fontWeight: 600 }}>{s.footfall}</td>
                  <td style={{ padding: '11px 12px', color: '#a78bfa' }}>{s.trials}</td>
                  <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#34d399' }}>{s.sales}</td>
                  <td style={{ padding: '11px 12px', color: '#38bdf8', fontWeight: 600 }}>{s.revPerSqft}</td>
                  <td style={{ padding: '11px 12px', color: '#34d399', fontWeight: 700 }}>{s.conversion}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--foreground, #334155)' }}>{s.avgTicket}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--muted-foreground, #64748b)' }}>{s.leadStylist}</td>
                  <td style={{ padding: '11px 12px' }}><span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, background: 'rgba(251,191,36,0.15)', color: '#fbbf24' }}>{s.rating}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
