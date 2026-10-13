from app.core.database import SessionLocal
from app.models.all_models import B2BAccount

accounts_data = [
    {
        "id": 1,
        "account_code": "B2B-101",
        "company_name": "Apollo Veterinary Super-Speciality Hospitals Pvt Ltd",
        "contact_name": "Dr. Rajesh K. Varma (Chief Procurement Officer)",
        "email": "procurement@apollovethospitals.com",
        "phone": "+91 98450 11221",
        "city": "Bengaluru",
        "credit_limit": 2500000.0,
        "outstanding_balance": 845000.0,
        "contract_status": "Active",
        "annual_deal_value": 4800000.0
    },
    {
        "id": 2,
        "account_code": "B2B-102",
        "company_name": "Max Pet Healthcare & Emergency Centers",
        "contact_name": "Ananya Deshmukh (Head of Clinical Sourcing)",
        "email": "sourcing@maxpethealthcare.in",
        "phone": "+91 98220 33442",
        "city": "Mumbai",
        "credit_limit": 2000000.0,
        "outstanding_balance": 620000.0,
        "contract_status": "Active",
        "annual_deal_value": 3650000.0
    },
    {
        "id": 3,
        "account_code": "B2B-103",
        "company_name": "Central Armed Police Forces (CAPF) K9 Breeding Center",
        "contact_name": "Col. R. S. Bhardwaj (Director K9 Operations)",
        "email": "dir.k9@capf.gov.in",
        "phone": "+91 11 2345 6789",
        "city": "New Delhi",
        "credit_limit": 3000000.0,
        "outstanding_balance": 1280000.0,
        "contract_status": "Active",
        "annual_deal_value": 5500000.0
    },
    {
        "id": 4,
        "account_code": "B2B-104",
        "company_name": "Canine Club of India & Certified Breeders Federation",
        "contact_name": "Hormuzd C. Batliwala (President)",
        "email": "federation@canineclubindia.org",
        "phone": "+91 98401 55663",
        "city": "Chennai",
        "credit_limit": 1500000.0,
        "outstanding_balance": 410000.0,
        "contract_status": "Active",
        "annual_deal_value": 2800000.0
    },
    {
        "id": 5,
        "account_code": "B2B-105",
        "company_name": "Infosys Technologies Corporate Pet Wellness Club",
        "contact_name": "Kavita Narang (VP - Employee Benefits)",
        "email": "benefits.petcare@infosys.com",
        "phone": "+91 80 2852 0261",
        "city": "Bengaluru",
        "credit_limit": 1000000.0,
        "outstanding_balance": 350000.0,
        "contract_status": "Active",
        "annual_deal_value": 2250000.0
    },
    {
        "id": 6,
        "account_code": "B2B-106",
        "company_name": "Wipro Welfare Trust - Paws at Work Program",
        "contact_name": "Siddharth Menon (CSR & Wellness Lead)",
        "email": "wellness.trust@wipro.com",
        "phone": "+91 80 2844 0011",
        "city": "Bengaluru",
        "credit_limit": 800000.0,
        "outstanding_balance": 280000.0,
        "contract_status": "Active",
        "annual_deal_value": 1800000.0
    },
    {
        "id": 7,
        "account_code": "B2B-107",
        "company_name": "Karnataka State Police CID Dog Squad Wing",
        "contact_name": "DySP M. Venkatesh Murthy",
        "email": "cid.k9unit@ksp.gov.in",
        "phone": "+91 80 2294 2111",
        "city": "Bengaluru",
        "credit_limit": 1800000.0,
        "outstanding_balance": 520000.0,
        "contract_status": "Active",
        "annual_deal_value": 3200000.0
    },
    {
        "id": 8,
        "account_code": "B2B-108",
        "company_name": "Royal Canin Institutional Distribution Hub",
        "contact_name": "Gaurav Malhotra (National Key Accounts Lead)",
        "email": "b2b.orders@royalcanin.co.in",
        "phone": "+91 22 6155 8899",
        "city": "Pune",
        "credit_limit": 2200000.0,
        "outstanding_balance": 740000.0,
        "contract_status": "Active",
        "annual_deal_value": 4200000.0
    },
    {
        "id": 9,
        "account_code": "B2B-109",
        "company_name": "Sanjeevani Animal Welfare & Referral Trust",
        "contact_name": "Dr. Nandini Sundaram (Managing Trustee)",
        "email": "trustee@sanjeevanianimalcare.org",
        "phone": "+91 44 2491 3322",
        "city": "Hyderabad",
        "credit_limit": 1200000.0,
        "outstanding_balance": 390000.0,
        "contract_status": "Active",
        "annual_deal_value": 2650000.0
    },
    {
        "id": 10,
        "account_code": "B2B-110",
        "company_name": "TCS Maitree Foundation Pet Support Initiative",
        "contact_name": "Deepak K. Shinde (Program Director)",
        "email": "maitree.pets@tcs.com",
        "phone": "+91 22 6778 9999",
        "city": "Mumbai",
        "credit_limit": 800000.0,
        "outstanding_balance": 230000.0,
        "contract_status": "Active",
        "annual_deal_value": 1500000.0
    }
]

def seed():
    db = SessionLocal()
    db.query(B2BAccount).delete()
    for item in accounts_data:
        db.add(B2BAccount(**item))
    db.commit()
    print(f"Successfully seeded {len(accounts_data)} B2B accounts. DB count: {db.query(B2BAccount).count()}")
    db.close()

if __name__ == "__main__":
    seed()
