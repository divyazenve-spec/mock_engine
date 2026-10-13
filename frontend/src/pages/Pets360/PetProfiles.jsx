import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function PetProfiles() {
  const [selectedPet, setSelectedPet] = useState('PET-101');

  const profiles = [
    { id: 'PET-101', name: 'Max', species: 'Canine', breed: 'Golden Retriever', dob: 'Nov 2021 (3y 2m)', gender: 'Neutered Male', weight: '32.4 kg (BCS 5/9)', color: 'Dark Golden', parent: 'Priya Sharma', phone: '+91 98450 12345', email: 'priya.sharma@gmail.com', address: '12th Main, HAL 2nd Stage, Indiranagar', clinic: 'Zenve Koramangala Super Clinic', primaryVet: 'Dr. Tanya S. (BVSc & AH)', vaxStatus: 'Up to Date', microchip: '982000412891201', diet: 'Royal Canin Maxi Adult (380g/day) + Salmon Omega-3', allergies: 'Chicken byproduct (mild contact pruritus)', notes: 'Bilateral hip palpation clear; teeth pristine post annual scaling; cardiac auscultation grade 0.', insurance: 'PetCover Gold Shield (#PCG-881920)' },
    { id: 'PET-102', name: 'Bella', species: 'Feline', breed: 'Persian Longhair', dob: 'Sep 2022 (2y 4m)', gender: 'Spayed Female', weight: '4.1 kg (BCS 5/9)', color: 'Pure White / Copper Eyes', parent: 'Rahul Verma', phone: '+91 97312 98765', email: 'rahul.verma@techmail.com', address: '4th Block, Koramangala, Bengaluru', clinic: 'Zenve Koramangala Super Clinic', primaryVet: 'Dr. Vikram Rao (Feline Specialist)', vaxStatus: 'Up to Date', microchip: '982000412891202', diet: 'Royal Canin Persian Adult + Hairball Control Pastes', allergies: 'Synthetic flea collars (pyrethroid sensitivity)', notes: 'Feline renal SDMA normal; tear ducts flushed cleanly; coat combed without matting.', insurance: 'PawProtect Silver Plus (#PPS-331042)' },
    { id: 'PET-103', name: 'Coco', species: 'Canine', breed: 'Shih Tzu', dob: 'Jul 2023 (1y 6m)', gender: 'Intact Female', weight: '6.2 kg (BCS 5/9)', color: 'Tri-color (Gold, White & Black)', parent: 'Ananya Iyer', phone: '+91 99001 54321', email: 'ananya.iyer@outlook.com', address: 'Sector 2, HSR Layout, Bengaluru', clinic: 'Zenve HSR Clinic & Spa', primaryVet: 'Dr. Ananya Roy (Dermatology)', vaxStatus: 'Due in 14d', microchip: '982000412891203', diet: 'Farmina N&D Small Breed Pumpkin & Lamb', allergies: 'Pollen seasonal allergic contact dermatitis', notes: 'Ear canal cytology clear of Malassezia; patellar score Grade 0 bilaterally.', insurance: 'Care4Pets Shield (#C4P-552910)' },
    { id: 'PET-104', name: 'Rocky', species: 'Canine', breed: 'German Shepherd', dob: 'Dec 2020 (4y 1m)', gender: 'Neutered Male', weight: '38.6 kg (Athletic)', color: 'Black & Tan Saddle', parent: 'Vikram Malhotra', phone: '+91 98860 11223', email: 'v.malhotra@corp.in', address: 'Prestige Ozone, Whitefield, Bengaluru', clinic: 'Zenve Whitefield Specialty Hospital', primaryVet: 'Dr. Rajesh Patel (Orthopedic Surgeon)', vaxStatus: 'Up to Date', microchip: '982000412891204', diet: 'Taste of the Wild High Prairie + Joint Synovial Chews', allergies: 'Wheat gluten & corn meal fillers', notes: 'Right TPLO surgical follow-up shows 100% bone union; gait symmetrical on pressure plate.', insurance: 'Zenve Elite Lifetime (#ZEL-109284)' },
    { id: 'PET-105', name: 'Milo', species: 'Canine', breed: 'Beagle', dob: 'May 2022 (2y 8m)', gender: 'Neutered Male', weight: '14.2 kg (BCS 5/9)', color: 'Classic Tri-color Hound', parent: 'Deepika Nair', phone: '+91 96118 77665', email: 'deepika.nair@biotech.res', address: '4th T Block, Jayanagar, Bengaluru', clinic: 'Zenve Jayanagar Clinic', primaryVet: 'Dr. Priya Desai (Internal Medicine)', vaxStatus: 'Up to Date', microchip: '982000412891205', diet: 'Hill\'s Science Diet Light Adult (Caloric Controlled)', allergies: 'Beef liver jerky treats', notes: 'Weight successfully lowered from 15.4 kg to 14.2 kg; fasting glucose 88 mg/dL.', insurance: 'PetCover Gold Shield (#PCG-882411)' },
    { id: 'PET-106', name: 'Leo', species: 'Canine', breed: 'Labrador Retriever', dob: 'Oct 2019 (5y 3m)', gender: 'Neutered Male', weight: '34.8 kg (Optimal)', color: 'Chocolate Brown', parent: 'Siddharth Rao', phone: '+91 94480 33445', email: 'sid.rao@fintech.io', address: 'Brigade Millennium, JP Nagar 7th Phase', clinic: 'Zenve Jayanagar Clinic', primaryVet: 'Dr. Tanya S. (BVSc & AH)', vaxStatus: 'Up to Date', microchip: '982000412891206', diet: 'Orijen Six Fish Grain-Free + Glucosamine-Chondroitin', allergies: 'Soy protein isolate', notes: 'Cardiorespiratory stamina excellent; routine ultrasound clean; thyroid profile T4 normal.', insurance: 'PawProtect Silver Plus (#PPS-338901)' },
    { id: 'PET-107', name: 'Luna', species: 'Canine', breed: 'Siberian Husky', dob: 'Jan 2022 (3y 0m)', gender: 'Spayed Female', weight: '21.5 kg (Lean)', color: 'Silver & White / Bi-eyed', parent: 'Kavita Menon', phone: '+91 98200 66778', email: 'kavita.menon@designhub.in', address: 'Green Glen Layout, Bellandur, Bengaluru', clinic: 'Zenve HSR Clinic & Spa', primaryVet: 'Dr. Ananya Roy (Dermatology)', vaxStatus: 'Up to Date', microchip: '982000412891207', diet: 'Acana Wild Prairie + Zinc Methionine Supplements', allergies: 'Humid heat rash (prescribed cool indoor climate)', notes: 'Dermal barrier reinforced with ceramide shampoos; coat density optimal.', insurance: 'Care4Pets Shield (#C4P-559021)' },
    { id: 'PET-108', name: 'Simba', species: 'Canine', breed: 'Indie Hound Cross', dob: 'Nov 2023 (1y 2m)', gender: 'Neutered Male', weight: '18.2 kg (Vigorous)', color: 'Fawn & Tan Short Coat', parent: 'Arjun Kapoor', phone: '+91 97401 22334', email: 'arjun.k@venturecap.co', address: 'Armane Nagar, Sadashivnagar, Bengaluru', clinic: 'Zenve Central Animal Hospital', primaryVet: 'Dr. Tanya S. (BVSc & AH)', vaxStatus: 'Up to Date', microchip: '982000412891208', diet: 'Fresh Home-cooked Chicken, Rice, Pumpkin & Bone Broth', allergies: 'None known (robust native immunity)', notes: 'Complete vaccination series finalized; CBC parameters perfect; high athletic stamina.', insurance: 'Zenve Elite Lifetime (#ZEL-104920)' },
    { id: 'PET-109', name: 'Oreo', species: 'Canine', breed: 'French Bulldog', dob: 'Dec 2022 (2y 1m)', gender: 'Intact Male', weight: '11.8 kg (Stocky)', color: 'Black & White Pied', parent: 'Meera Nambiar', phone: '+91 96325 88990', email: 'meera.nambiar@gmail.com', address: 'Godrej Woodsman Estate, Hebbal, Bengaluru', clinic: 'Zenve Central Animal Hospital', primaryVet: 'Dr. Rajesh Patel (Airway Specialist)', vaxStatus: 'Due in 14d', microchip: '982000412891209', diet: 'Royal Canin French Bulldog Adult + Digest Zen', allergies: 'Dust mites & synthetic room fragrances', notes: 'Stenotic nares evaluate BOAS Grade 1 (mild); soft palate unobstructed; no exercise distress.', insurance: 'PetCover Gold Shield (#PCG-889102)' },
    { id: 'PET-110', name: 'Bruno', species: 'Canine', breed: 'Rottweiler', dob: 'Jul 2021 (3y 6m)', gender: 'Neutered Male', weight: '46.2 kg (Powerful)', color: 'Mahogany & Black', parent: 'Rohan Gupta', phone: '+91 98110 44556', email: 'rohan.g@startupnest.in', address: 'Neeladri Nagar, Phase 1, Electronic City', clinic: 'Zenve Koramangala Super Clinic', primaryVet: 'Dr. Rajesh Patel (Orthopedic Surgeon)', vaxStatus: 'Up to Date', microchip: '982000412891210', diet: 'Farmina N&D Maxi Pumpkin, Lamb & Blueberry + Joint Chews', allergies: 'Dairy milk proteins (lactose intolerant)', notes: 'Elbow dysplasia screen clear; cardiac echo verified 0 murmur; temperament calm.', insurance: 'Zenve Elite Lifetime (#ZEL-108845)' }
  ];

  const pet = profiles.find(p => p.id === selectedPet) || profiles[0];

  return (
    <DashboardLayout
      category="Pets 360°"
      subcategory="Pet Profiles"
      title="Comprehensive Longitudinal Pet Profiles"
      subtitle="Holistic biometric identifiers, ownership records, insurance policies, clinical notes, and nutritional profiles"
      icon="🐾"
      badge="10 Active Dossiers"
      actions={
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {profiles.map(p => (
            <button
              key={p.id}
              onClick={() => setSelectedPet(p.id)}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                border: selectedPet === p.id ? '1px solid #2563eb' : '1px solid #cbd5e1',
                background: selectedPet === p.id ? '#2563eb' : '#ffffff',
                color: selectedPet === p.id ? '#ffffff' : '#475569'
              }}
            >
              {p.name} ({p.breed.split(' ')[0]})
            </button>
          ))}
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '14px', marginBottom: '20px' }}>
        <KpiCard label="Selected Pet" value={pet.name} delta={pet.species} trend="neutral" subtext={pet.id} icon="🐾" />
        <KpiCard label="Weight & Condition" value={pet.weight.split(' ')[0] + ' kg'} delta="BCS 5/9" trend="up" subtext="Monthly weighed" icon="⚖️" />
        <KpiCard label="Vaccine Status" value={pet.vaxStatus} delta="Verified" trend="up" subtext="Biological passport" icon="💉" />
        <KpiCard label="Attending Vet" value={pet.primaryVet.split(' ')[0] + ' ' + pet.primaryVet.split(' ')[1]} delta={pet.clinic.split(' ')[1] || 'Clinic'} trend="neutral" subtext="Assigned clinician" icon="👨‍⚕️" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        {/* Left Column: Biological & Clinical Details */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid #f1f5f9', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#eff6ff', display: 'grid', placeItems: 'center', fontSize: '24px' }}>
                {pet.species === 'Canine' ? '🐕' : '🐈'}
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>{pet.name}’s Medical Passport</h3>
                <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>{pet.species} • {pet.breed} • {pet.dob}</p>
              </div>
            </div>
            <span style={{ padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 700, background: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0' }}>
              ACTIVE RECORD
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', fontSize: '13px' }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>Microchip RFID</div>
              <div style={{ fontWeight: 600, color: '#0f172a', fontFamily: 'monospace', marginTop: '2px' }}>{pet.microchip}</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>Gender & Spay Status</div>
              <div style={{ fontWeight: 600, color: '#0f172a', marginTop: '2px' }}>{pet.gender}</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>Current Weight & Body Score</div>
              <div style={{ fontWeight: 600, color: '#0f172a', marginTop: '2px' }}>{pet.weight}</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>Coat Color & Markings</div>
              <div style={{ fontWeight: 600, color: '#0f172a', marginTop: '2px' }}>{pet.color}</div>
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>Clinical Nutrition & Feeding Protocol</div>
              <div style={{ fontWeight: 600, color: '#0f172a', marginTop: '2px' }}>{pet.diet}</div>
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>Allergies & Contraindications</div>
              <div style={{ fontWeight: 600, color: '#dc2626', marginTop: '2px' }}>⚠️ {pet.allergies}</div>
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>Clinical Physician Notes</div>
              <div style={{ color: '#475569', marginTop: '2px', lineHeight: 1.5, background: '#f8fafc', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                {pet.notes}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Ownership, Facility & Insurance */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
            <h4 style={{ margin: '0 0 14px', fontSize: '13px', fontWeight: 700, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.04em' }}>👤 Pet Parent Information</h4>
            <div style={{ fontSize: '13px', lineHeight: 1.6 }}>
              <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '15px' }}>{pet.parent}</div>
              <div style={{ color: '#475569', marginTop: '4px' }}>📞 {pet.phone}</div>
              <div style={{ color: '#475569' }}>✉️ {pet.email}</div>
              <div style={{ color: '#64748b', fontSize: '12px', marginTop: '6px' }}>📍 {pet.address}</div>
            </div>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
            <h4 style={{ margin: '0 0 14px', fontSize: '13px', fontWeight: 700, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.04em' }}>🏥 Care Provider & Coverage</h4>
            <div style={{ fontSize: '13px', lineHeight: 1.6 }}>
              <div style={{ fontWeight: 600, color: '#0f172a' }}>{pet.clinic}</div>
              <div style={{ color: '#2563eb', fontSize: '12px', fontWeight: 600 }}>{pet.primaryVet}</div>
              <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase' }}>Pet Insurance Policy</div>
                <div style={{ fontWeight: 600, color: '#059669' }}>🛡️ {pet.insurance}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
