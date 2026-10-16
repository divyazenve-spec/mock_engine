/* =====================================================================
   Zenve BI — Marketing & Growth Executive Control Center
   Sidebar: Marketing Suite (14 Subcategories)
   Pure Light Executive Design System
   ===================================================================== */

(function () {
  'use strict';

  var root = null;
  var S = {
    open: false,
    tab: 'overview',
    searchQuery: '',
    statusFilter: 'ALL',
    toastTimeout: null
  };

  /* ── 14 Subcategories Matching Marketing Suite ────────────────────── */
  var MODULES = [
    { id: 'overview', label: 'Marketing Dashboard', icon: '📊', hash: '#marketing-dashboard' },
    { id: 'campaigns', label: 'Campaigns', icon: '🚀', hash: '#campaigns' },
    { id: 'leads', label: 'Leads', icon: '🎯', hash: '#leads' },
    { id: 'lead-sources', label: 'Lead Sources', icon: '🌐', hash: '#lead-sources' },
    { id: 'website-analytics', label: 'Website Analytics', icon: '💻', hash: '#website-analytics' },
    { id: 'app-analytics', label: 'App Analytics', icon: '📱', hash: '#app-analytics' },
    { id: 'social-media', label: 'Social Media', icon: '📸', hash: '#social-media' },
    { id: 'advertising', label: 'Advertising', icon: '📢', hash: '#advertising' },
    { id: 'marketing-spend', label: 'Marketing Spend', icon: '💰', hash: '#marketing-spend' },
    { id: 'customer-acquisition', label: 'Customer Acquisition', icon: '🐾', hash: '#customer-acquisition' },
    { id: 'cac', label: 'CAC', icon: '🎯', hash: '#cac' },
    { id: 'roas', label: 'ROAS', icon: '🚀', hash: '#roas' },
    { id: 'marketing-roi', label: 'Marketing ROI', icon: '💎', hash: '#marketing-roi' },
    { id: 'conversion-funnel', label: 'Conversion Funnel', icon: '⚡', hash: '#conversion-funnel' }
  ];

  /* ── Datasets ─────────────────────────────────────────────────────── */
  var CAMPAIGNS = [
    {
        "id": "CMP-801",
        "name": "Canine Hip Dysplasia & Ortho Camp",
        "channel": "Meta Ads (IG/FB)",
        "spend": "₹42,500",
        "budget": "₹45,000",
        "impressions": "348,200",
        "ctr": "3.42%",
        "conv": 168,
        "cac": "₹253",
        "roas": "6.2x",
        "status": "Active"
    },
    {
        "id": "CMP-802",
        "name": "Monsoon Flea & Tick Shield Drive",
        "channel": "Google Search (PPC)",
        "spend": "₹38,000",
        "budget": "₹40,000",
        "impressions": "215,600",
        "ctr": "4.15%",
        "conv": 142,
        "cac": "₹268",
        "roas": "5.8x",
        "status": "Active"
    },
    {
        "id": "CMP-803",
        "name": "Kitten Core Triple Vaccination 360",
        "channel": "Meta Ads (IG Stories)",
        "spend": "₹28,400",
        "budget": "₹30,000",
        "impressions": "192,800",
        "ctr": "3.88%",
        "conv": 114,
        "cac": "₹249",
        "roas": "5.4x",
        "status": "Active"
    },
    {
        "id": "CMP-804",
        "name": "Senior Dog Arthritis & Laser Therapy",
        "channel": "Google Search (Local)",
        "spend": "₹32,600",
        "budget": "₹35,000",
        "impressions": "164,100",
        "ctr": "4.52%",
        "conv": 126,
        "cac": "₹259",
        "roas": "6.8x",
        "status": "Active"
    },
    {
        "id": "CMP-805",
        "name": "Zenve Pet App Free Tele-Vet Trial",
        "channel": "YouTube Shorts / Video",
        "spend": "₹25,000",
        "budget": "₹25,000",
        "impressions": "420,000",
        "ctr": "2.10%",
        "conv": 185,
        "cac": "₹135",
        "roas": "4.6x",
        "status": "Active"
    },
    {
        "id": "CMP-806",
        "name": "Breed-Specific Cardiac Screening Package",
        "channel": "Google Display Network",
        "spend": "₹22,100",
        "budget": "₹25,000",
        "impressions": "285,400",
        "ctr": "2.65%",
        "conv": 74,
        "cac": "₹299",
        "roas": "5.1x",
        "status": "Active"
    },
    {
        "id": "CMP-807",
        "name": "Dental Scaling & Ultrasonic Care Fest",
        "channel": "Meta Ads (Reels)",
        "spend": "₹19,800",
        "budget": "₹20,000",
        "impressions": "178,300",
        "ctr": "3.12%",
        "conv": 82,
        "cac": "₹241",
        "roas": "4.9x",
        "status": "Active"
    },
    {
        "id": "CMP-808",
        "name": "Grain-Free Renal Prescription Diet Promo",
        "channel": "WhatsApp Business Direct",
        "spend": "₹14,500",
        "budget": "₹15,000",
        "impressions": "68,400",
        "ctr": "7.84%",
        "conv": 98,
        "cac": "₹148",
        "roas": "7.4x",
        "status": "Completed"
    },
    {
        "id": "CMP-809",
        "name": "Emergency 24/7 Trauma Ambulance Bangalore",
        "channel": "Google Call-Only Ads",
        "spend": "₹21,200",
        "budget": "₹25,000",
        "impressions": "92,100",
        "ctr": "6.35%",
        "conv": 68,
        "cac": "₹312",
        "roas": "8.1x",
        "status": "Active"
    },
    {
        "id": "CMP-810",
        "name": "Puppy Socialization & Hydrotherapy Pass",
        "channel": "Meta Influencer Collabs",
        "spend": "₹15,900",
        "budget": "₹20,000",
        "impressions": "145,000",
        "ctr": "2.95%",
        "conv": 58,
        "cac": "₹274",
        "roas": "4.2x",
        "status": "Scheduled"
    }
];

  var LEADS = [
    {
        "id": "LED-401",
        "parent": "Ananya Deshmukh",
        "pet": "Milo (Golden Retriever)",
        "city": "Bengaluru, Indiranagar",
        "source": "Meta Ads",
        "score": "A+ (96)",
        "stage": "Converted",
        "rep": "Dr. Arvind Rao",
        "value": "₹8,500"
    },
    {
        "id": "LED-402",
        "parent": "Rohan Malhotra",
        "pet": "Leo (Persian Cat)",
        "city": "Mumbai, Bandra West",
        "source": "Google Search",
        "score": "A (91)",
        "stage": "Consult Booked",
        "rep": "Dr. Sneha Pillai",
        "value": "₹4,200"
    },
    {
        "id": "LED-403",
        "parent": "Kavita Swaminathan",
        "pet": "Bella (Labrador)",
        "city": "Chennai, Adyar",
        "source": "Pet Referral",
        "score": "A+ (98)",
        "stage": "Converted",
        "rep": "Dr. Arvind Rao",
        "value": "₹14,800"
    },
    {
        "id": "LED-404",
        "parent": "Vikramaditya Bose",
        "pet": "Simba (Beagle)",
        "city": "Kolkata, Salt Lake",
        "source": "YouTube Video",
        "score": "B+ (84)",
        "stage": "Contacted",
        "rep": "Pooja Varma",
        "value": "₹3,500"
    },
    {
        "id": "LED-405",
        "parent": "Meera Nambiar",
        "pet": "Oreo (Shih Tzu)",
        "city": "Bengaluru, Whitefield",
        "source": "WhatsApp Promo",
        "score": "A (93)",
        "stage": "Converted",
        "rep": "Dr. Sneha Pillai",
        "value": "₹6,400"
    },
    {
        "id": "LED-406",
        "parent": "Aditya Singhania",
        "pet": "Bruno (German Shepherd)",
        "city": "Delhi NCR, Gurugram",
        "source": "Google Search",
        "score": "A+ (95)",
        "stage": "Consult Booked",
        "rep": "Dr. Arvind Rao",
        "value": "₹18,500"
    },
    {
        "id": "LED-407",
        "parent": "Priyanka Shenoy",
        "pet": "Coco (Indie Pup)",
        "city": "Hyderabad, Jubilee Hills",
        "source": "Meta Ads",
        "score": "B (79)",
        "stage": "Qualified",
        "rep": "Pooja Varma",
        "value": "₹2,800"
    },
    {
        "id": "LED-408",
        "parent": "Siddharth Joshi",
        "pet": "Zoe (Siberian Husky)",
        "city": "Pune, Koregaon Park",
        "source": "Local Event / Camp",
        "score": "A (90)",
        "stage": "Consult Booked",
        "rep": "Dr. Sneha Pillai",
        "value": "₹9,200"
    },
    {
        "id": "LED-409",
        "parent": "Tanvi Kulkarni",
        "pet": "Casper (British Shorthair)",
        "city": "Mumbai, Powai",
        "source": "Organic Search",
        "score": "B+ (82)",
        "stage": "Contacted",
        "rep": "Pooja Varma",
        "value": "₹4,800"
    },
    {
        "id": "LED-410",
        "parent": "Farhan Merchant",
        "pet": "Rocky (Rottweiler)",
        "city": "Bengaluru, Koramangala",
        "source": "Emergency Call Ad",
        "score": "A+ (99)",
        "stage": "Converted",
        "rep": "Dr. Arvind Rao",
        "value": "₹22,000"
    }
];

  var SOURCES = [
    {
        "name": "Google Search PPC (High Intent)",
        "visitors": "48,200",
        "leads": "2,410",
        "convRate": "5.00%",
        "spend": "₹68,500",
        "cac": "₹284",
        "quality": "9.4 / 10",
        "share": "28.5%",
        "roas": "6.8x"
    },
    {
        "name": "Meta Ads (Instagram & FB Reels)",
        "visitors": "64,500",
        "leads": "2,180",
        "convRate": "3.38%",
        "spend": "₹62,000",
        "cac": "₹284",
        "quality": "8.6 / 10",
        "share": "25.8%",
        "roas": "5.9x"
    },
    {
        "name": "Pet Parent Referral Program",
        "visitors": "14,800",
        "leads": "1,260",
        "convRate": "8.51%",
        "spend": "₹12,500",
        "cac": "₹99",
        "quality": "9.8 / 10",
        "share": "14.9%",
        "roas": "9.4x"
    },
    {
        "name": "Organic SEO & Clinical Blogs",
        "visitors": "52,600",
        "leads": "980",
        "convRate": "1.86%",
        "spend": "₹18,000",
        "cac": "₹184",
        "quality": "8.9 / 10",
        "share": "11.6%",
        "roas": "7.9x"
    },
    {
        "name": "WhatsApp Business & CRM Alerts",
        "visitors": "18,400",
        "leads": "840",
        "convRate": "4.57%",
        "spend": "₹14,500",
        "cac": "₹173",
        "quality": "9.1 / 10",
        "share": "9.9%",
        "roas": "6.6x"
    },
    {
        "name": "YouTube Vet Shorts & Tutorials",
        "visitors": "32,100",
        "leads": "420",
        "convRate": "1.31%",
        "spend": "₹25,000",
        "cac": "₹595",
        "quality": "7.8 / 10",
        "share": "5.0%",
        "roas": "3.4x"
    },
    {
        "name": "Local Vaccination Camps & Expos",
        "visitors": "6,200",
        "leads": "380",
        "convRate": "6.13%",
        "spend": "₹16,000",
        "cac": "₹421",
        "quality": "9.5 / 10",
        "share": "4.5%",
        "roas": "4.6x"
    },
    {
        "name": "Direct In-App Referrals",
        "visitors": "8,900",
        "leads": "310",
        "convRate": "3.48%",
        "spend": "₹8,500",
        "cac": "₹274",
        "quality": "8.7 / 10",
        "share": "3.7%",
        "roas": "8.0x"
    },
    {
        "name": "Google Local Maps / GMB Profile",
        "visitors": "24,000",
        "leads": "290",
        "convRate": "1.21%",
        "spend": "₹5,000",
        "cac": "₹172",
        "quality": "8.5 / 10",
        "share": "3.4%",
        "roas": "14.4x"
    },
    {
        "name": "Influencer & Breeder Partnerships",
        "visitors": "12,400",
        "leads": "190",
        "convRate": "1.53%",
        "spend": "₹17,000",
        "cac": "₹895",
        "quality": "7.4 / 10",
        "share": "2.2%",
        "roas": "3.2x"
    }
];

  var WEB_PAGES = [
    {
        "title": "24/7 Emergency Pet Hospital & Ambulance",
        "path": "/emergency-trauma-care",
        "views": "38,420",
        "unique": "29,150",
        "time": "3m 48s",
        "bounce": "24.2%",
        "conv": "8.4%"
    },
    {
        "title": "Online Veterinary Video Consultation",
        "path": "/consult-doctor-online",
        "views": "45,800",
        "unique": "36,200",
        "time": "4m 12s",
        "bounce": "28.5%",
        "conv": "6.8%"
    },
    {
        "title": "Complete Canine & Feline Vaccine Packages",
        "path": "/pet-vaccination-schedule",
        "views": "32,150",
        "unique": "25,400",
        "time": "2m 54s",
        "bounce": "31.4%",
        "conv": "5.6%"
    },
    {
        "title": "Orthopedic TPLO & Spinal Surgery Center",
        "path": "/clinical/orthopedic-surgery",
        "views": "19,840",
        "unique": "14,900",
        "time": "5m 22s",
        "bounce": "21.0%",
        "conv": "7.9%"
    },
    {
        "title": "Veterinary Prescription Diet & Nutrition",
        "path": "/rx-pharmacy/specialized-diets",
        "views": "28,600",
        "unique": "21,300",
        "time": "3m 15s",
        "bounce": "33.2%",
        "conv": "4.8%"
    },
    {
        "title": "Pet Dental Health & Ultrasonic Scaling",
        "path": "/dental-cleaning-packages",
        "views": "16,750",
        "unique": "12,800",
        "time": "2m 38s",
        "bounce": "36.8%",
        "conv": "4.2%"
    },
    {
        "title": "Puppy & Kitten Pediatric Starter Pack",
        "path": "/wellness/pediatric-starter-pack",
        "views": "24,300",
        "unique": "19,450",
        "time": "3m 32s",
        "bounce": "26.9%",
        "conv": "6.1%"
    },
    {
        "title": "Zenve Diagnostic Lab Test Booking",
        "path": "/diagnostics/blood-xray-ultrasound",
        "views": "21,900",
        "unique": "16,800",
        "time": "3m 05s",
        "bounce": "29.7%",
        "conv": "5.4%"
    },
    {
        "title": "Pet Dermatology & Allergy Treatment Hub",
        "path": "/clinical/skin-coat-allergy",
        "views": "18,450",
        "unique": "13,900",
        "time": "3m 41s",
        "bounce": "27.3%",
        "conv": "5.1%"
    },
    {
        "title": "Zenve Care Plus Annual Subscription",
        "path": "/membership/zenve-care-plus",
        "views": "27,500",
        "unique": "20,600",
        "time": "4m 05s",
        "bounce": "25.6%",
        "conv": "7.2%"
    }
];

  var APP_PLATFORMS = [
    {
        "platform": "Android (Google Play)",
        "installs": "18,450",
        "dau": "4,820",
        "rating": "4.8 ★"
    },
    {
        "platform": "iOS (Apple App Store)",
        "installs": "12,950",
        "dau": "3,940",
        "rating": "4.9 ★"
    }
];

  var APP_ACTIONS = [
    {
        "action": "Pet Profile Registration (Breed/Age/Weight)",
        "volume": "14,250 events",
        "completion": "94.2%",
        "change": "+5.8% MoM"
    },
    {
        "action": "Vaccination Reminder Alert Acknowledgement",
        "volume": "11,800 alerts",
        "completion": "88.6%",
        "change": "+4.1% MoM"
    },
    {
        "action": "Instant Tele-Vet Video Call Initiated",
        "volume": "4,620 calls",
        "completion": "96.4%",
        "change": "+8.2% MoM"
    },
    {
        "action": "E-Prescription Refill Order Placed",
        "volume": "6,840 orders",
        "completion": "91.2%",
        "change": "+6.9% MoM"
    },
    {
        "action": "Digital Medical Record (DMR) Download",
        "volume": "5,910 downloads",
        "completion": "97.5%",
        "change": "+3.4% MoM"
    },
    {
        "action": "Diagnostic Lab Home Sample Scheduled",
        "volume": "2,480 bookings",
        "completion": "84.8%",
        "change": "+9.1% MoM"
    },
    {
        "action": "Puppy Deworming & Diet Log Tracked",
        "volume": "8,950 logs",
        "completion": "89.3%",
        "change": "+7.5% MoM"
    },
    {
        "action": "Emergency Ambulance Dispatch Triggered",
        "volume": "410 dispatches",
        "completion": "99.1%",
        "change": "+12.0% MoM"
    },
    {
        "action": "Surgical Post-Op Video Followup Logged",
        "volume": "1,260 sessions",
        "completion": "93.8%",
        "change": "+4.6% MoM"
    },
    {
        "action": "Pet Parent Community Q&A Participated",
        "volume": "9,420 queries",
        "completion": "86.0%",
        "change": "+11.3% MoM"
    }
];

  var SOCIAL_CHANNELS = [
    {
        "icon": "\ud83d\udcf8",
        "handle": "@ZenvePets_Instagram",
        "followers": "148,500",
        "growth": "+8,400 / mo",
        "engRate": "4.82%",
        "topPost": "Reel: 5 Silent Signs of Hip Dysplasia in Dogs",
        "reach": "1.45M Reach"
    },
    {
        "icon": "\ud83c\udfa5",
        "handle": "Zenve Pet Care YouTube",
        "followers": "94,200",
        "growth": "+6,100 / mo",
        "engRate": "6.15%",
        "topPost": "Full Vet Guide: Kitten Vaccination Timeline",
        "reach": "890K Views"
    },
    {
        "icon": "\ud83d\udcac",
        "handle": "Zenve WhatsApp Pet Community",
        "followers": "38,600",
        "growth": "+3,200 / mo",
        "engRate": "14.20%",
        "topPost": "Weekly Live Q&A with Senior Chief Surgeon",
        "reach": "180K Opens"
    },
    {
        "icon": "\ud83d\udcd8",
        "handle": "Zenve Veterinary Facebook Page",
        "followers": "86,400",
        "growth": "+2,100 / mo",
        "engRate": "3.45%",
        "topPost": "Pet Parent Testimonial: TPLO Recovery Journey",
        "reach": "540K Reach"
    },
    {
        "icon": "\ud83d\udc26",
        "handle": "@ZenveHealth_X",
        "followers": "22,800",
        "growth": "+1,400 / mo",
        "engRate": "2.95%",
        "topPost": "Infographic: Toxic Household Foods for Canines",
        "reach": "210K Impressions"
    },
    {
        "icon": "\ud83d\udcbc",
        "handle": "Zenve Healthcare LinkedIn",
        "followers": "18,900",
        "growth": "+1,250 / mo",
        "engRate": "5.10%",
        "topPost": "Clinical Research: Orthopedic Surgical Outcomes",
        "reach": "125K Views"
    },
    {
        "icon": "\ud83c\udfb5",
        "handle": "@ZenvePets_Shorts",
        "followers": "62,400",
        "growth": "+5,800 / mo",
        "engRate": "5.90%",
        "topPost": "Viral Pup Hydrotherapy First Swim Session",
        "reach": "1.10M Views"
    },
    {
        "icon": "\ud83c\udf99\ufe0f",
        "handle": "Zenve Vet Talks (Spotify)",
        "followers": "14,200",
        "growth": "+950 / mo",
        "engRate": "8.40%",
        "topPost": "Ep 24: Managing Arthritis in Senior Labradors",
        "reach": "42K Listens"
    },
    {
        "icon": "\ud83d\udccd",
        "handle": "Google Maps Local Community",
        "followers": "54,000",
        "growth": "+2,800 / mo",
        "engRate": "7.60%",
        "topPost": "Bangalore Flagship Hospital 4.9 Star Celebration",
        "reach": "320K Views"
    },
    {
        "icon": "\ud83d\udc3e",
        "handle": "Zenve Pet Parent Forum (App)",
        "followers": "41,500",
        "growth": "+4,200 / mo",
        "engRate": "12.80%",
        "topPost": "Crowdsourced Vet Advice & Puppy Playdates",
        "reach": "260K Interactions"
    }
];

  var AD_SETS = [
    {
        "name": "Canine Joint Health & Mobility Video",
        "platform": "Meta Ads (IG/FB)",
        "spend": "₹36,500",
        "cpm": "₹112",
        "cpc": "₹3.80",
        "cpa": "₹228",
        "roas": "6.4x",
        "health": "Optimal"
    },
    {
        "name": "Emergency Vet Near Me (Call Only)",
        "platform": "Google Search PPC",
        "spend": "₹34,000",
        "cpm": "₹340",
        "cpc": "₹14.20",
        "cpa": "₹310",
        "roas": "8.2x",
        "health": "Optimal"
    },
    {
        "name": "Kitten First Vaccine Starter Discount",
        "platform": "Meta Ads (Feed & Story)",
        "spend": "₹28,500",
        "cpm": "₹95",
        "cpc": "₹3.10",
        "cpa": "₹215",
        "roas": "5.8x",
        "health": "Optimal"
    },
    {
        "name": "Renal & Hepatic Prescription Diets",
        "platform": "Google Shopping / PMax",
        "spend": "₹24,800",
        "cpm": "₹145",
        "cpc": "₹5.60",
        "cpa": "₹198",
        "roas": "7.1x",
        "health": "Optimal"
    },
    {
        "name": "Senior Pet Blood Panel Screening",
        "platform": "Meta Ads (IG Carousel)",
        "spend": "₹22,000",
        "cpm": "₹108",
        "cpc": "₹4.10",
        "cpa": "₹245",
        "roas": "5.2x",
        "health": "Scaling"
    },
    {
        "name": "App Install - Free Vet Consultation",
        "platform": "YouTube Video Action",
        "spend": "₹25,000",
        "cpm": "₹82",
        "cpc": "₹2.90",
        "cpa": "₹142",
        "roas": "4.6x",
        "health": "Scaling"
    },
    {
        "name": "Dental Cleaning & Breath Check Camp",
        "platform": "Meta Ads (Reels)",
        "spend": "₹18,500",
        "cpm": "₹102",
        "cpc": "₹3.60",
        "cpa": "₹235",
        "roas": "5.0x",
        "health": "Optimal"
    },
    {
        "name": "Flea, Tick & Heartworm Prevention",
        "platform": "Google Search Keyword",
        "spend": "₹29,200",
        "cpm": "₹180",
        "cpc": "₹6.80",
        "cpa": "₹260",
        "roas": "6.1x",
        "health": "Optimal"
    },
    {
        "name": "Puppy Deworming & Pediatric Camp",
        "platform": "Instagram Influencer Whitelist",
        "spend": "₹19,000",
        "cpm": "₹120",
        "cpc": "₹4.50",
        "cpa": "₹285",
        "roas": "4.4x",
        "health": "Scaling"
    },
    {
        "name": "Orthopedic TPLO Surgical Consult Retargeting",
        "platform": "Meta Dynamic Retargeting",
        "spend": "₹22,500",
        "cpm": "₹160",
        "cpc": "₹7.20",
        "cpa": "₹295",
        "roas": "7.8x",
        "health": "Optimal"
    }
];

  var SPEND_ITEMS = [
    {
        "category": "Paid Search Engine Marketing (Google PPC)",
        "budget": "₹70,000",
        "actual": "₹68,500",
        "variance": "+₹1,500",
        "status": "Under Budget",
        "share": "26.3%"
    },
    {
        "category": "Paid Social Advertising (Meta & Reels)",
        "budget": "₹65,000",
        "actual": "₹62,000",
        "variance": "+₹3,000",
        "status": "Under Budget",
        "share": "23.8%"
    },
    {
        "category": "YouTube & Video Creative Production",
        "budget": "₹28,000",
        "actual": "₹25,000",
        "variance": "+₹3,000",
        "status": "Under Budget",
        "share": "9.6%"
    },
    {
        "category": "Veterinary Content & Medical SEO Copywriting",
        "budget": "₹20,000",
        "actual": "₹18,000",
        "variance": "+₹2,000",
        "status": "Under Budget",
        "share": "6.9%"
    },
    {
        "category": "Community Camps, Events & Pet Expos",
        "budget": "₹18,000",
        "actual": "₹16,000",
        "variance": "+₹2,000",
        "status": "Under Budget",
        "share": "6.2%"
    },
    {
        "category": "WhatsApp Business & Omnichannel CRM Messaging",
        "budget": "₹16,000",
        "actual": "₹14,500",
        "variance": "+₹1,500",
        "status": "Under Budget",
        "share": "5.6%"
    },
    {
        "category": "Pet Parent Referral Rewards & Vouchers",
        "budget": "₹15,000",
        "actual": "₹12,500",
        "variance": "+₹2,500",
        "status": "Under Budget",
        "share": "4.8%"
    },
    {
        "category": "Marketing Automation & Analytics Tools",
        "budget": "₹12,000",
        "actual": "₹11,500",
        "variance": "+₹500",
        "status": "Under Budget",
        "share": "4.4%"
    },
    {
        "category": "Pet Influencer & Breeder Engagement",
        "budget": "₹18,000",
        "actual": "₹17,000",
        "variance": "+₹1,000",
        "status": "Under Budget",
        "share": "6.5%"
    },
    {
        "category": "Print Collateral, Clinic Banners & Merch",
        "budget": "₹18,000",
        "actual": "₹15,000",
        "variance": "+₹3,000",
        "status": "Under Budget",
        "share": "5.8%"
    }
];

  var COHORTS = [
    {
        "cohort": "Cohort Oct 2026",
        "acquired": "618",
        "m1Repeat": "38.2%",
        "m2Repeat": "29.4%",
        "aov": "₹2,150",
        "ltv60d": "₹3,420",
        "retention": "Exceptional"
    },
    {
        "cohort": "Cohort Sep 2026",
        "acquired": "594",
        "m1Repeat": "37.5%",
        "m2Repeat": "28.8%",
        "aov": "₹2,080",
        "ltv60d": "₹3,280",
        "retention": "Strong"
    },
    {
        "cohort": "Cohort Aug 2026",
        "acquired": "580",
        "m1Repeat": "36.8%",
        "m2Repeat": "28.1%",
        "aov": "₹2,040",
        "ltv60d": "₹3,190",
        "retention": "Strong"
    },
    {
        "cohort": "Cohort Jul 2026",
        "acquired": "552",
        "m1Repeat": "35.9%",
        "m2Repeat": "27.5%",
        "aov": "₹1,980",
        "ltv60d": "₹3,110",
        "retention": "Healthy"
    },
    {
        "cohort": "Cohort Jun 2026",
        "acquired": "530",
        "m1Repeat": "35.2%",
        "m2Repeat": "26.8%",
        "aov": "₹1,940",
        "ltv60d": "₹3,050",
        "retention": "Healthy"
    },
    {
        "cohort": "Cohort May 2026",
        "acquired": "515",
        "m1Repeat": "34.8%",
        "m2Repeat": "26.2%",
        "aov": "₹1,910",
        "ltv60d": "₹2,980",
        "retention": "Healthy"
    },
    {
        "cohort": "Cohort Apr 2026",
        "acquired": "490",
        "m1Repeat": "34.1%",
        "m2Repeat": "25.7%",
        "aov": "₹1,870",
        "ltv60d": "₹2,920",
        "retention": "Healthy"
    },
    {
        "cohort": "Cohort Mar 2026",
        "acquired": "465",
        "m1Repeat": "33.6%",
        "m2Repeat": "25.1%",
        "aov": "₹1,840",
        "ltv60d": "₹2,860",
        "retention": "Stable"
    },
    {
        "cohort": "Cohort Feb 2026",
        "acquired": "440",
        "m1Repeat": "33.0%",
        "m2Repeat": "24.8%",
        "aov": "₹1,810",
        "ltv60d": "₹2,810",
        "retention": "Stable"
    },
    {
        "cohort": "Cohort Jan 2026",
        "acquired": "420",
        "m1Repeat": "32.4%",
        "m2Repeat": "24.2%",
        "aov": "₹1,780",
        "ltv60d": "₹2,750",
        "retention": "Stable"
    }
];

  var CITY_CAC = [
    {
        "city": "Bengaluru Urban (Indiranagar/Koramangala)",
        "blendedCAC": "₹385",
        "paidCAC": "₹480",
        "organicCAC": "₹145",
        "newCustomers": "192",
        "ltvRatio": "8.4x",
        "status": "Highly Efficient"
    },
    {
        "city": "Bengaluru Tech Corridor (Whitefield/HSR)",
        "blendedCAC": "₹395",
        "paidCAC": "₹495",
        "organicCAC": "₹150",
        "newCustomers": "148",
        "ltvRatio": "8.1x",
        "status": "Highly Efficient"
    },
    {
        "city": "Mumbai Western Suburbs (Bandra/Andheri)",
        "blendedCAC": "₹440",
        "paidCAC": "₹560",
        "organicCAC": "₹180",
        "newCustomers": "124",
        "ltvRatio": "7.6x",
        "status": "Efficient"
    },
    {
        "city": "Mumbai Central & South (Worli/Colaba)",
        "blendedCAC": "₹465",
        "paidCAC": "₹590",
        "organicCAC": "₹190",
        "newCustomers": "98",
        "ltvRatio": "7.2x",
        "status": "Efficient"
    },
    {
        "city": "Delhi NCR - Gurugram Prime",
        "blendedCAC": "₹435",
        "paidCAC": "₹550",
        "organicCAC": "₹175",
        "newCustomers": "112",
        "ltvRatio": "7.8x",
        "status": "Efficient"
    },
    {
        "city": "Delhi NCR - South Delhi",
        "blendedCAC": "₹450",
        "paidCAC": "₹575",
        "organicCAC": "₹185",
        "newCustomers": "86",
        "ltvRatio": "7.4x",
        "status": "Efficient"
    },
    {
        "city": "Hyderabad - Hitec City / Gachibowli",
        "blendedCAC": "₹370",
        "paidCAC": "₹465",
        "organicCAC": "₹135",
        "newCustomers": "105",
        "ltvRatio": "8.6x",
        "status": "Highly Efficient"
    },
    {
        "city": "Chennai - Central & OMR Corridor",
        "blendedCAC": "₹360",
        "paidCAC": "₹450",
        "organicCAC": "₹130",
        "newCustomers": "78",
        "ltvRatio": "8.8x",
        "status": "Highly Efficient"
    },
    {
        "city": "Pune - Koregaon Park & Viman Nagar",
        "blendedCAC": "₹340",
        "paidCAC": "₹430",
        "organicCAC": "₹120",
        "newCustomers": "64",
        "ltvRatio": "9.2x",
        "status": "Top Yield"
    },
    {
        "city": "Kolkata - Salt Lake & New Town",
        "blendedCAC": "₹315",
        "paidCAC": "₹395",
        "organicCAC": "₹110",
        "newCustomers": "52",
        "ltvRatio": "9.8x",
        "status": "Top Yield"
    }
];

  var CATEGORY_ROAS = [
    {
        "category": "Specialized Veterinary Surgery (TPLO/Spine)",
        "spend": "₹42,500",
        "revenue": "₹3,48,500",
        "roas": "8.2x",
        "target": "6.0x",
        "status": "Outperforming"
    },
    {
        "category": "Emergency Care & 24/7 ICU Trauma",
        "spend": "₹34,000",
        "revenue": "₹2,85,600",
        "roas": "8.4x",
        "target": "6.5x",
        "status": "Outperforming"
    },
    {
        "category": "Prescription Diets & Clinical Nutrition",
        "spend": "₹28,500",
        "revenue": "₹2,02,350",
        "roas": "7.1x",
        "target": "5.0x",
        "status": "Outperforming"
    },
    {
        "category": "Core Vaccinations & Pediatric Wellness",
        "spend": "₹32,600",
        "revenue": "₹1,89,080",
        "roas": "5.8x",
        "target": "4.5x",
        "status": "Optimal"
    },
    {
        "category": "Canine Joint Health & Laser Therapy",
        "spend": "₹25,000",
        "revenue": "₹1,62,500",
        "roas": "6.5x",
        "target": "5.0x",
        "status": "Outperforming"
    },
    {
        "category": "Advanced Diagnostics (CT/Ultrasound/Lab)",
        "spend": "₹22,100",
        "revenue": "₹1,32,600",
        "roas": "6.0x",
        "target": "5.0x",
        "status": "Optimal"
    },
    {
        "category": "Dental Cleaning & Ultrasonic Scaling",
        "spend": "₹18,500",
        "revenue": "₹96,200",
        "roas": "5.2x",
        "target": "4.0x",
        "status": "Optimal"
    },
    {
        "category": "Flea, Tick & Parasitic Preventatives",
        "spend": "₹24,800",
        "revenue": "₹1,43,840",
        "roas": "5.8x",
        "target": "4.5x",
        "status": "Optimal"
    },
    {
        "category": "Pet Dermatology & Allergy Desensitization",
        "spend": "₹16,000",
        "revenue": "₹88,000",
        "roas": "5.5x",
        "target": "4.0x",
        "status": "Optimal"
    },
    {
        "category": "General OPD Video Consultation (Tele-Vet)",
        "spend": "₹16,000",
        "revenue": "₹76,800",
        "roas": "4.8x",
        "target": "4.0x",
        "status": "Optimal"
    }
];

  var FINANCIAL_ROI = [
    {
        "channel": "Google Search PPC (High Intent)",
        "spend": "₹68,500",
        "grossProfitContrib": "₹2,84,000",
        "netProfitLift": "₹2,15,500",
        "netROI": "314.6%",
        "paybackDays": "24 Days"
    },
    {
        "channel": "Meta Ads (Instagram & FB)",
        "spend": "₹62,000",
        "grossProfitContrib": "₹2,28,000",
        "netProfitLift": "₹1,66,000",
        "netROI": "267.7%",
        "paybackDays": "28 Days"
    },
    {
        "channel": "Pet Parent Referral Program",
        "spend": "₹12,500",
        "grossProfitContrib": "₹1,18,000",
        "netProfitLift": "₹1,05,500",
        "netROI": "844.0%",
        "paybackDays": "11 Days"
    },
    {
        "channel": "Organic SEO & Clinical Content",
        "spend": "₹18,000",
        "grossProfitContrib": "₹1,42,000",
        "netProfitLift": "₹1,24,000",
        "netROI": "688.9%",
        "paybackDays": "14 Days"
    },
    {
        "channel": "WhatsApp Direct Veterinary CRM",
        "spend": "₹14,500",
        "grossProfitContrib": "₹96,000",
        "netProfitLift": "₹81,500",
        "netROI": "562.1%",
        "paybackDays": "16 Days"
    },
    {
        "channel": "YouTube Educational Video Shorts",
        "spend": "₹25,000",
        "grossProfitContrib": "₹84,000",
        "netProfitLift": "₹59,000",
        "netROI": "236.0%",
        "paybackDays": "34 Days"
    },
    {
        "channel": "Local Vaccination Camps & Expos",
        "spend": "₹16,000",
        "grossProfitContrib": "₹74,000",
        "netProfitLift": "₹58,000",
        "netROI": "362.5%",
        "paybackDays": "22 Days"
    },
    {
        "channel": "In-App Product Retargeting",
        "spend": "₹11,500",
        "grossProfitContrib": "₹68,000",
        "netProfitLift": "₹56,500",
        "netROI": "491.3%",
        "paybackDays": "18 Days"
    },
    {
        "channel": "Google Local Service Maps Ads",
        "spend": "₹15,000",
        "grossProfitContrib": "₹72,000",
        "netProfitLift": "₹57,000",
        "netROI": "380.0%",
        "paybackDays": "20 Days"
    },
    {
        "channel": "Influencer & Breeder Partnerships",
        "spend": "₹17,000",
        "grossProfitContrib": "₹54,000",
        "netProfitLift": "₹37,000",
        "netROI": "217.6%",
        "paybackDays": "38 Days"
    }
];

  var FUNNEL_STEPS = [
    {
        "stage": "1. Ad Impressions & Brand Discovery",
        "volume": "1,840,000",
        "convRate": "100%",
        "width": "100%",
        "color": "#2563eb",
        "channelLead": "Meta Ads & YouTube",
        "dropPct": "\u2014"
    },
    {
        "stage": "2. Landing Page & Clinic Site Visits",
        "volume": "184,500",
        "convRate": "10.0%",
        "width": "72%",
        "color": "#3b82f6",
        "channelLead": "Google PPC & Organic SEO",
        "dropPct": "90.0%"
    },
    {
        "stage": "3. Service or Medication Page Viewed",
        "volume": "74,200",
        "convRate": "40.2%",
        "width": "55%",
        "color": "#60a5fa",
        "channelLead": "Clinical Landing Pages",
        "dropPct": "59.8%"
    },
    {
        "stage": "4. Veterinary Consult or Cart Initiated",
        "volume": "18,400",
        "convRate": "24.8%",
        "width": "40%",
        "color": "#0ea5e9",
        "channelLead": "WhatsApp & In-App Booking",
        "dropPct": "75.2%"
    },
    {
        "stage": "5. Slot Scheduled or Prescription Uploaded",
        "volume": "7,850",
        "convRate": "42.7%",
        "width": "30%",
        "color": "#06b6d4",
        "channelLead": "Zenve Tele-Vet Engine",
        "dropPct": "57.3%"
    },
    {
        "stage": "6. Payment Completed & Order Confirmed",
        "volume": "3,420",
        "convRate": "43.6%",
        "width": "22%",
        "color": "#10b981",
        "channelLead": "Razorpay / UPI Gateway",
        "dropPct": "56.4%"
    },
    {
        "stage": "7. Post-Care Repeat Order (30 Days)",
        "volume": "1,310",
        "convRate": "38.3%",
        "width": "16%",
        "color": "#059669",
        "channelLead": "CRM Auto-Refill Triggers",
        "dropPct": "61.7%"
    }
];

  /* ── Helpers ──────────────────────────────────────────────────────── */
  function showToast(msg) {
    var existing = document.querySelector('.zmkt-toast');
    if (existing) existing.remove();
    var t = document.createElement('div');
    t.className = 'zmkt-toast';
    t.innerHTML = '<span>📣</span><span>' + msg + '</span>';
    document.body.appendChild(t);
    clearTimeout(S.toastTimeout);
    S.toastTimeout = setTimeout(function () { t.remove(); }, 3200);
  }

  function closeOthers() {
    document.querySelectorAll('.zpanel-root, #zset-root, #zod-root, #zsd-root, #zph-root, #zch-root, #zalt-root, #zrep-root, #zsh-root, #zhr-dashboard-root').forEach(function (p) {
      p.classList.remove('zpanel-open');
      p.classList.remove('zset-open');
      p.classList.remove('zod-open');
      p.classList.remove('zsd-open');
      p.classList.remove('zph-open');
      p.classList.remove('zch-open');
      p.classList.remove('zalt-open');
      p.classList.remove('zrep-open');
      p.classList.remove('zsh-open');
    });
    if (window.ZenveSettingsDashboard && window.ZenveSettingsDashboard.close) {
      try { window.ZenveSettingsDashboard.close(); } catch (err) {}
    }
  }

  function tabFromHash(hash) {
    if (!hash) return null;
    var clean = (hash.startsWith('#') ? hash : '#' + hash).toLowerCase().trim();
    for (var i = 0; i < MODULES.length; i++) {
      if (MODULES[i].hash === clean || clean === '#' + MODULES[i].id) {
        return MODULES[i].id;
      }
    }
    if (clean === '#marketing' || clean === '#marketing-dashboard' || clean === '#mkt') return 'overview';
    return null;
  }

  function tabFromText(text) {
    if (!text) return null;
    var t = text.trim().toLowerCase();
    if (t === 'marketing dashboard' || t === 'marketing' || t === 'mkt') return 'overview';
    if (t === 'campaigns' || t === 'marketing campaigns') return 'campaigns';
    if (t === 'leads' || t === 'pet leads' || t === 'all leads') return 'leads';
    if (t === 'lead sources' || t === 'sources') return 'lead-sources';
    if (t === 'website analytics' || t === 'web traffic') return 'website-analytics';
    if (t === 'app analytics' || t === 'mobile analytics') return 'app-analytics';
    if (t === 'social media' || t === 'social') return 'social-media';
    if (t === 'advertising' || t === 'ads') return 'advertising';
    if (t === 'marketing spend' || t === 'mkt spend') return 'marketing-spend';
    if (t === 'customer acquisition' || t === 'acquisition') return 'customer-acquisition';
    if (t === 'cac' || t === 'customer acquisition cost') return 'cac';
    if (t === 'roas' || t === 'return on ad spend') return 'roas';
    if (t === 'marketing roi' || t === 'roi') return 'marketing-roi';
    if (t === 'conversion funnel' || t === 'funnel') return 'conversion-funnel';
    return null;
  }

  /* ── Shell Renderer ───────────────────────────────────────────────── */
  function render() {
    if (!root) return;

    var curMod = MODULES.find(function (m) { return m.id === S.tab; }) || MODULES[0];

    // Build chip navigation
    var chipsHtml = MODULES.map(function (m) {
      var isActive = S.tab === m.id;
      var count = '';
      if (m.id === 'campaigns') count = '<span class="zmkt-chip-count">' + CAMPAIGNS.length + '</span>';
      else if (m.id === 'leads') count = '<span class="zmkt-chip-count">' + LEADS.length + '</span>';
      else if (m.id === 'roas') count = '<span class="zmkt-chip-count">6.6x</span>';

      return [
        '<button type="button" class="zmkt-chip ' + (isActive ? 'active' : '') + '" data-tab="' + m.id + '">',
        '  <span>' + m.icon + '</span>',
        '  <span>' + m.label + '</span>',
        count,
        '</button>'
      ].join('');
    }).join('');

    root.innerHTML = [
      '<!-- Top Executive Header -->',
      '<div class="zmkt-header">',
      '  <div class="zmkt-header-left">',
      '    <div class="zmkt-brand-badge">📣</div>',
      '    <div class="zmkt-title-group">',
      '      <div class="zmkt-title-row">',
      '        <h2 class="zmkt-main-title">' + curMod.label + '</h2>',
      '        <span class="zmkt-status-badge"><span class="zmkt-status-dot"></span> Live Attribution Synced</span>',
      '      </div>',
      '      <p class="zmkt-subtitle">Marketing & Growth Suite · Private Sales, Ad Spend, CAC & Multi-Channel ROAS</p>',
      '    </div>',
      '  </div>',
      '  <div class="zmkt-header-right">',
      '    <button type="button" class="zmkt-btn zmkt-btn-secondary" id="zmkt-calc-btn"><span>⚡</span> ROAS Calculator</button>',
      '    <button type="button" class="zmkt-btn zmkt-btn-secondary" id="zmkt-export-btn"><span>📥</span> Export CSV</button>',
      '    <button type="button" class="zmkt-btn zmkt-btn-primary" id="zmkt-add-campaign-btn"><span>🚀</span> Launch Campaign</button>',
      '  </div>',
      '</div>',

      '<!-- Sticky Chips Navigation -->',
      '<div class="zmkt-nav-bar">' + chipsHtml + '</div>',

      '<!-- Main Viewport -->',
      '<div class="zmkt-content" id="zmkt-view-container"></div>'
    ].join('');

    renderTabContent();
    wireEvents();
  }

  /* ── Tab Content Switcher ─────────────────────────────────────────── */
  function renderTabContent() {
    var container = root.querySelector('#zmkt-view-container');
    if (!container) return;

    var html = '';
    switch (S.tab) {
      case 'overview':
        html = renderOverview();
        break;
      case 'campaigns':
        html = renderCampaigns();
        break;
      case 'leads':
        html = renderLeads();
        break;
      case 'lead-sources':
        html = renderLeadSources();
        break;
      case 'website-analytics':
        html = renderWebsiteAnalytics();
        break;
      case 'app-analytics':
        html = renderAppAnalytics();
        break;
      case 'social-media':
        html = renderSocialMedia();
        break;
      case 'advertising':
        html = renderAdvertising();
        break;
      case 'marketing-spend':
        html = renderMarketingSpend();
        break;
      case 'customer-acquisition':
        html = renderCustomerAcquisition();
        break;
      case 'cac':
        html = renderCAC();
        break;
      case 'roas':
        html = renderROAS();
        break;
      case 'marketing-roi':
        html = renderMarketingROI();
        break;
      case 'conversion-funnel':
        html = renderConversionFunnel();
        break;
      default:
        html = renderOverview();
    }

    container.innerHTML = html;
    wireTabSpecificEvents();
  }

  /* ── Renderers for all 14 Tabs ────────────────────────────────────── */

  function renderOverview() {
    var topChannelRows = SOURCES.slice(0, 5).map(function(s) {
      return [
        '<tr>',
        '  <td><b>' + s.name + '</b></td>',
        '  <td style="font-family:IBM Plex Mono,monospace;font-weight:600;">' + s.leads + '</td>',
        '  <td><span class="zmkt-tag zmkt-tag-active">' + s.share + '</span></td>',
        '  <td><span class="zmkt-roas-pill">' + s.roas + '</span></td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zmkt-kpi-grid">',
      '  <div class="zmkt-kpi-card">',
      '    <div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Total Ad Spend</span><span class="zmkt-kpi-icon-wrap">💳</span></div>',
      '    <div class="zmkt-kpi-val">₹2,60,000</div>',
      '    <div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">7.1% Under Budget</span><span>OPEX burn</span></div>',
      '  </div>',
      '  <div class="zmkt-kpi-card">',
      '    <div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Acquired Leads</span><span class="zmkt-kpi-icon-wrap">🎯</span></div>',
      '    <div class="zmkt-kpi-val">1,420</div>',
      '    <div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">+14.2% MTD</span><span>Qualified pet parents</span></div>',
      '  </div>',
      '  <div class="zmkt-kpi-card">',
      '    <div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Blended CAC</span><span class="zmkt-kpi-icon-wrap">👥</span></div>',
      '    <div class="zmkt-kpi-val">₹420</div>',
      '    <div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">16.0% Efficiency</span><span>Benchmark: ₹500</span></div>',
      '  </div>',
      '  <div class="zmkt-kpi-card">',
      '    <div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Blended ROAS</span><span class="zmkt-kpi-icon-wrap">🚀</span></div>',
      '    <div class="zmkt-kpi-val">6.64x</div>',
      '    <div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">+1.1x vs target</span><span>₹17.25L Attributed GMV</span></div>',
      '  </div>',
      '</div>',

      '<div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(460px, 1fr));gap:20px;">',
      '  <div class="zmkt-card">',
      '    <div class="zmkt-card-head">',
      '      <div><h3 class="zmkt-card-title">Top Acquisition Channels</h3><p class="zmkt-card-sub">Multi-touch attribution share and ROAS return</p></div>',
      '      <button type="button" class="zmkt-btn zmkt-btn-secondary" onclick="window.ZenveMarketingDashboard.switchTab(\'lead-sources\')">All Sources →</button>',
      '    </div>',
      '    <div class="zmkt-table-wrap">',
      '      <table class="zmkt-table">',
      '        <thead><tr><th>Channel</th><th>Leads</th><th>Share</th><th>ROAS</th></tr></thead>',
      '        <tbody>' + (topChannelRows || '<tr><td colspan="4" style="text-align:center;padding:24px;color:#94a3b8;">No acquisition channel records found</td></tr>') + '</tbody>',
      '      </table>',
      '    </div>',
      '  </div>',

      '  <div class="zmkt-card">',
      '    <div class="zmkt-card-head">',
      '      <div><h3 class="zmkt-card-title">Conversion Funnel Velocity</h3><p class="zmkt-card-sub">5-Stage micro-conversion drop-off rate</p></div>',
      '      <button type="button" class="zmkt-btn zmkt-btn-secondary" onclick="window.ZenveMarketingDashboard.switchTab(\'conversion-funnel\')">Deep Funnel →</button>',
      '    </div>',
      '    <div>' + renderFunnelBarsSummary() + '</div>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderFunnelBarsSummary() {
    if (!FUNNEL_STEPS || FUNNEL_STEPS.length === 0) {
      return '<div style="text-align:center;padding:24px;color:#94a3b8;font-size:13px;">No conversion funnel velocity recorded</div>';
    }
    return FUNNEL_STEPS.map(function(s, idx) {
      return [
        '<div style="margin-bottom:12px;">',
        '  <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;">',
        '    <span style="font-weight:600;color:#334155;">' + s.stage + '</span>',
        '    <span style="font-weight:700;font-family:IBM Plex Mono,monospace;">' + s.volume + ' (' + s.convRate + ')</span>',
        '  </div>',
        '  <div style="height:6px;background:#e2e8f0;border-radius:9999px;overflow:hidden;">',
        '    <div style="width:' + s.width + ';height:100%;background:' + s.color + ';border-radius:9999px;"></div>',
        '  </div>',
        '</div>'
      ].join('');
    }).join('');
  }

  function renderCampaigns() {
    var q = (S.searchQuery || '').toLowerCase();
    var list = CAMPAIGNS.filter(function (c) {
      var matchQ = c.name.toLowerCase().indexOf(q) >= 0 || c.channel.toLowerCase().indexOf(q) >= 0 || c.id.toLowerCase().indexOf(q) >= 0;
      var matchS = S.statusFilter === 'ALL' || c.status === S.statusFilter;
      return matchQ && matchS;
    });

    var rows = list.map(function (c) {
      return [
        '<tr>',
        '  <td><b>' + c.name + '</b><div style="font-size:11px;color:#94a3b8;font-family:IBM Plex Mono,monospace;">' + c.id + '</div></td>',
        '  <td>' + c.channel + '</td>',
        '  <td><b style="font-family:IBM Plex Mono,monospace;">' + c.spend + '</b><div style="font-size:11px;color:#94a3b8;">Plan: ' + c.budget + '</div></td>',
        '  <td style="font-family:IBM Plex Mono,monospace;">' + c.impressions + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;font-weight:600;color:#16a34a;">' + c.ctr + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;font-weight:600;">' + c.conv.toLocaleString() + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;color:#2563eb;">' + c.cac + '</td>',
        '  <td><span class="zmkt-roas-pill">' + c.roas + '</span></td>',
        '  <td><span class="zmkt-tag zmkt-tag-' + c.status.toLowerCase() + '">' + c.status + '</span></td>',
        '  <td style="text-align:right;">',
        '    <button type="button" class="zmkt-btn zmkt-btn-secondary" style="padding:4px 8px;font-size:11px;" onclick="window.ZenveMarketingDashboard.toggleCampaignStatus(\'' + c.id + '\')">' + (c.status === 'Active' ? 'Pause' : 'Activate') + '</button>',
        '  </td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zmkt-kpi-grid">',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Active Flights</span><span class="zmkt-kpi-icon-wrap">🚀</span></div><div class="zmkt-kpi-val">' + CAMPAIGNS.filter(function(c){return c.status === 'Active';}).length + '</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">10 Total Flights</span><span>Meta, Google & YouTube</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Campaign Spend</span><span class="zmkt-kpi-icon-wrap">💳</span></div><div class="zmkt-kpi-val">₹2,60,000</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">Budget Adherence</span><span>₹20,000 under plan</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Ad Impressions</span><span class="zmkt-kpi-icon-wrap">👁️</span></div><div class="zmkt-kpi-val">1.84M</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">3.82% CTR</span><span>High pet intent</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Conversions</span><span class="zmkt-kpi-icon-wrap">🎯</span></div><div class="zmkt-kpi-val">1,115</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">+14.2% MoM</span><span>Consults & orders</span></div></div>',
      '</div>',

      '<div class="zmkt-card">',
      '  <div class="zmkt-filter-bar">',
      '    <div class="zmkt-search-wrap">',
      '      <span class="zmkt-search-icon">🔍</span>',
      '      <input type="text" class="zmkt-search-input" id="zmkt-camp-search" placeholder="Search campaign name, channel or ID…" value="' + S.searchQuery + '">',
      '    </div>',
      '    <div style="display:flex;gap:8px;">',
      '      <select class="zmkt-select" id="zmkt-camp-status">',
      '        <option value="ALL"' + (S.statusFilter === 'ALL' ? ' selected' : '') + '>All status</option>',
      '        <option value="Active"' + (S.statusFilter === 'Active' ? ' selected' : '') + '>Active</option>',
      '        <option value="Scheduled"' + (S.statusFilter === 'Scheduled' ? ' selected' : '') + '>Scheduled</option>',
      '        <option value="Completed"' + (S.statusFilter === 'Completed' ? ' selected' : '') + '>Completed</option>',
      '      </select>',
      '    </div>',
      '  </div>',
      '  <div class="zmkt-table-wrap">',
      '    <table class="zmkt-table">',
      '      <thead><tr><th>Campaign Name</th><th>Channel</th><th>Spend / Plan</th><th>Impressions</th><th>CTR</th><th>Conversions</th><th>CAC</th><th>ROAS</th><th>Status</th><th style="text-align:right;">Action</th></tr></thead>',
      '      <tbody>' + (rows || '<tr><td colspan="10" style="text-align:center;padding:24px;color:#94a3b8;">No campaigns found</td></tr>') + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderLeads() {
    var q = (S.searchQuery || '').toLowerCase();
    var list = LEADS.filter(function (l) {
      return l.parent.toLowerCase().indexOf(q) >= 0 || l.pet.toLowerCase().indexOf(q) >= 0 || l.city.toLowerCase().indexOf(q) >= 0 || l.id.toLowerCase().indexOf(q) >= 0;
    });

    var rows = list.map(function (l) {
      return [
        '<tr>',
        '  <td><b>' + l.parent + '</b><div style="font-size:11px;color:#94a3b8;font-family:IBM Plex Mono,monospace;">' + l.id + '</div></td>',
        '  <td style="font-weight:600;color:#0f172a;">' + l.pet + '</td>',
        '  <td style="color:#64748b;font-size:12px;">' + l.city + '</td>',
        '  <td><span class="zmkt-tag zmkt-tag-completed">' + l.source + '</span></td>',
        '  <td><b style="font-family:IBM Plex Mono,monospace;color:' + (l.score.startsWith('A') ? '#16a34a' : '#2563eb') + ';">' + l.score + '</b></td>',
        '  <td><span class="zmkt-tag ' + (l.stage === 'Converted' ? 'zmkt-tag-active' : l.stage === 'Consult Booked' ? 'zmkt-tag-scheduled' : 'zmkt-tag-paused') + '">' + l.stage + '</span></td>',
        '  <td>' + l.rep + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;font-weight:700;">' + l.value + '</td>',
        '  <td style="text-align:right;">',
        '    <button type="button" class="zmkt-btn zmkt-btn-secondary" style="padding:4px 8px;font-size:11px;" onclick="window.ZenveMarketingDashboard.viewLead(\'' + l.id + '\')">Details</button>',
        '  </td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zmkt-kpi-grid">',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Active Leads</span><span class="zmkt-kpi-icon-wrap">🎯</span></div><div class="zmkt-kpi-val">1,420</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">+14.2% MoM</span><span>Inbound pet prospects</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Consults Booked</span><span class="zmkt-kpi-icon-wrap">🩺</span></div><div class="zmkt-kpi-val">482</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">33.9% Booking Rate</span><span>Doctor appointments</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Pipeline Value</span><span class="zmkt-kpi-icon-wrap">💎</span></div><div class="zmkt-kpi-val">₹14,85,000</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">Avg ₹10,457/lead</span><span>Prescription + diet orders</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Lead Conv Rate</span><span class="zmkt-kpi-icon-wrap">🔄</span></div><div class="zmkt-kpi-val">24.1%</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">Benchmark: 18.0%</span><span>Lead to paid sale</span></div></div>',
      '</div>',

      '<div class="zmkt-card">',
      '  <div class="zmkt-filter-bar">',
      '    <div class="zmkt-search-wrap">',
      '      <span class="zmkt-search-icon">🔍</span>',
      '      <input type="text" class="zmkt-search-input" id="zmkt-lead-search" placeholder="Search pet parent, pet breed or city…" value="' + S.searchQuery + '">',
      '    </div>',
      '    <button type="button" class="zmkt-btn zmkt-btn-primary" id="zmkt-add-lead-btn"><span>➕</span> Capture Pet Lead</button>',
      '  </div>',
      '  <div class="zmkt-table-wrap">',
      '    <table class="zmkt-table">',
      '      <thead><tr><th>Pet Parent</th><th>Pet Companion</th><th>City & Zone</th><th>Source</th><th>Score</th><th>Pipeline Stage</th><th>Assigned Rep</th><th>Est. Value</th><th style="text-align:right;">Action</th></tr></thead>',
      '      <tbody>' + (rows || '<tr><td colspan="9" style="text-align:center;padding:24px;color:#94a3b8;">No leads found</td></tr>') + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderLeadSources() {
    var rows = SOURCES.map(function (s) {
      return [
        '<tr>',
        '  <td><b>' + s.name + '</b></td>',
        '  <td style="font-family:IBM Plex Mono,monospace;">' + s.visitors + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;font-weight:700;">' + s.leads + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;color:#16a34a;font-weight:600;">' + s.convRate + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;">' + s.spend + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;color:#2563eb;font-weight:600;">' + s.cac + '</td>',
        '  <td><span class="zmkt-tag zmkt-tag-active">' + s.quality + '</span></td>',
        '  <td><b>' + s.share + '</b></td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zmkt-kpi-grid">',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Top Lead Volume</span><span class="zmkt-kpi-icon-wrap">🔍</span></div><div class="zmkt-kpi-val">Google Search PPC</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">28.5% Share</span><span>2,410 pet leads</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Highest Quality</span><span class="zmkt-kpi-icon-wrap">🩺</span></div><div class="zmkt-kpi-val">Pet Referrals</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">9.8 / 10 Score</span><span>8.51% conversion</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Lowest CAC</span><span class="zmkt-kpi-icon-wrap">👥</span></div><div class="zmkt-kpi-val">Viral Referral</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">₹99 / Lead</span><span>Pet parent sharing</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Blended Conv</span><span class="zmkt-kpi-icon-wrap">⚡</span></div><div class="zmkt-kpi-val">4.12%</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">+0.8% MoM</span><span>Across all channels</span></div></div>',
      '</div>',

      '<div class="zmkt-card">',
      '  <div class="zmkt-card-head"><div><h3 class="zmkt-card-title">Channel Attribution & Conversion Economics</h3><p class="zmkt-card-sub">Multi-channel attribution share, quality score, and direct marketing CAC</p></div></div>',
      '  <div class="zmkt-table-wrap">',
      '    <table class="zmkt-table">',
      '      <thead><tr><th>Lead Source</th><th>Site Visitors</th><th>Leads Generated</th><th>Conv. Rate</th><th>Spend</th><th>CAC / Lead</th><th>Quality Index</th><th>Share</th></tr></thead>',
      '      <tbody>' + (rows || '<tr><td colspan="8" style="text-align:center;padding:24px;color:#94a3b8;">No lead sources found</td></tr>') + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderWebsiteAnalytics() {
    var rows = WEB_PAGES.map(function (p) {
      return [
        '<tr>',
        '  <td><b>' + p.title + '</b><div style="font-size:11px;color:#2563eb;font-family:IBM Plex Mono,monospace;">' + p.path + '</div></td>',
        '  <td style="font-family:IBM Plex Mono,monospace;font-weight:600;">' + p.views + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;">' + p.unique + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;">' + p.time + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;color:#64748b;">' + p.bounce + '</td>',
        '  <td><span class="zmkt-tag zmkt-tag-active">' + p.conv + '</span></td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zmkt-kpi-grid">',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Monthly Visitors</span><span class="zmkt-kpi-icon-wrap">👥</span></div><div class="zmkt-kpi-val">184,500</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">+12.4% MoM</span><span>68% mobile browser</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Avg Session Time</span><span class="zmkt-kpi-icon-wrap">⏱️</span></div><div class="zmkt-kpi-val">3m 38s</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">+42s vs bench</span><span>Clinical dwell time</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Bounce Rate</span><span class="zmkt-kpi-icon-wrap">📉</span></div><div class="zmkt-kpi-val">27.8%</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">4.2% Lower</span><span>High intent landing pages</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Goal Conversion</span><span class="zmkt-kpi-icon-wrap">🎯</span></div><div class="zmkt-kpi-val">5.92%</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">+0.75%</span><span>Cart & consult bookings</span></div></div>',
      '</div>',

      '<div class="zmkt-card">',
      '  <div class="zmkt-card-head"><div><h3 class="zmkt-card-title">Top Healthcare & Clinical Landing Pages</h3><p class="zmkt-card-sub">Page views, unique visitors, engagement time, and conversion actions</p></div></div>',
      '  <div class="zmkt-table-wrap">',
      '    <table class="zmkt-table">',
      '      <thead><tr><th>Landing Page URL & Content</th><th>Views</th><th>Unique Visitors</th><th>Avg Time</th><th>Bounce Rate</th><th>Goal Conv.</th></tr></thead>',
      '      <tbody>' + (rows || '<tr><td colspan="6" style="text-align:center;padding:24px;color:#94a3b8;">No website analytics data found</td></tr>') + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderAppAnalytics() {
    var platformRows = (APP_PLATFORMS || []).map(function(m) {
      return [
        '<tr>',
        '  <td style="font-weight:600;">' + m.platform + '</td>',
        '  <td style="text-align:right;font-family:IBM Plex Mono,monospace;">' + m.installs + '</td>',
        '  <td style="text-align:right;font-family:IBM Plex Mono,monospace;">' + m.dau + '</td>',
        '  <td style="text-align:right;color:#16a34a;font-weight:600;">' + m.rating + '</td>',
        '</tr>'
      ].join('');
    }).join('');

    var milestonesHtml = (APP_ACTIONS || []).map(function(a) {
      return [
        '<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 12px;background:#f8fafc;border-radius:8px;margin-bottom:8px;">',
        '  <div>',
        '    <div style="font-weight:600;font-size:13px;color:#0f172a;">' + a.action + '</div>',
        '    <div style="font-size:11px;color:#64748b;">' + a.volume + '</div>',
        '  </div>',
        '  <div style="text-align:right;">',
        '    <div style="font-weight:700;font-size:13px;color:#2563eb;">' + a.completion + '</div>',
        '    <div style="font-size:11px;color:#16a34a;">' + a.change + '</div>',
        '  </div>',
        '</div>'
      ].join('');
    }).join('');

    return [
      '<div class="zmkt-kpi-grid">',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Total Downloads</span><span class="zmkt-kpi-icon-wrap">📲</span></div><div class="zmkt-kpi-val">31,400</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">+18.4% MoM</span><span>Android 58% · iOS 42%</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Daily Active Users</span><span class="zmkt-kpi-icon-wrap">⚡</span></div><div class="zmkt-kpi-val">8,760</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">DAU / MAU: 27.9%</span><span>Pet parent stickiness</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Monthly Active Users</span><span class="zmkt-kpi-icon-wrap">🐾</span></div><div class="zmkt-kpi-val">31,400</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">+14.6% MoM</span><span>Recurring consults & Rx</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Store Rating</span><span class="zmkt-kpi-icon-wrap">⭐</span></div><div class="zmkt-kpi-val">4.85 ★</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">4,820 reviews</span><span>Play Store & App Store</span></div></div>',
      '</div>',

      '<div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(460px, 1fr));gap:20px;">',
      '  <div class="zmkt-card">',
      '    <div class="zmkt-card-head"><div><h3 class="zmkt-card-title">OS Platform Economics</h3><p class="zmkt-card-sub">Android vs iOS store downloads and engagement</p></div></div>',
      '    <div class="zmkt-table-wrap">',
      '      <table class="zmkt-table">',
      '        <thead><tr><th>Platform</th><th style="text-align:right;">Installs</th><th style="text-align:right;">DAU</th><th style="text-align:right;">Rating</th></tr></thead>',
      '        <tbody>' + (platformRows || '<tr><td colspan="4" style="text-align:center;padding:24px;color:#94a3b8;">No platform metrics recorded</td></tr>') + '</tbody>',
      '      </table>',
      '    </div>',
      '  </div>',

      '  <div class="zmkt-card">',
      '    <div class="zmkt-card-head"><div><h3 class="zmkt-card-title">In-App Health Milestones</h3><p class="zmkt-card-sub">Completion velocity for pet parent core actions</p></div></div>',
      '    <div>' + (milestonesHtml || '<div style="text-align:center;padding:24px;color:#94a3b8;font-size:13px;">No app milestones recorded</div>') + '</div>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderSocialMedia() {
    var rows = SOCIAL_CHANNELS.map(function (c) {
      return [
        '<tr>',
        '  <td><b>' + c.icon + ' ' + c.handle + '</b></td>',
        '  <td style="font-family:IBM Plex Mono,monospace;font-weight:700;">' + c.followers + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;color:#16a34a;font-weight:600;">' + c.growth + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;">' + c.engRate + '</td>',
        '  <td>' + c.topPost + '</td>',
        '  <td><span class="zmkt-tag zmkt-tag-scheduled">' + c.reach + '</span></td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zmkt-kpi-grid">',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Community Followers</span><span class="zmkt-kpi-icon-wrap">👥</span></div><div class="zmkt-kpi-val">494,900</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">+33,100 / mo</span><span>Across 10 social channels</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Engagement Rate</span><span class="zmkt-kpi-icon-wrap">💬</span></div><div class="zmkt-kpi-val">6.85%</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">Industry Avg: 2.4%</span><span>Pet parent love</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Content Reach</span><span class="zmkt-kpi-icon-wrap">🔥</span></div><div class="zmkt-kpi-val">4.85M</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">+24.5% MoM</span><span>Reels & video guides</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">UGC Submissions</span><span class="zmkt-kpi-icon-wrap">🐕</span></div><div class="zmkt-kpi-val">1,240</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">+18.2%</span><span>Tagging #ZenvePets</span></div></div>',
      '</div>',

      '<div class="zmkt-card">',
      '  <div class="zmkt-card-head"><div><h3 class="zmkt-card-title">Official Brand Social Accounts & Organic Reach</h3><p class="zmkt-card-sub">Follower acquisition velocity, viral reach, and community engagement</p></div></div>',
      '  <div class="zmkt-table-wrap">',
      '    <table class="zmkt-table">',
      '      <thead><tr><th>Network & Handle</th><th>Followers</th><th>Monthly Growth</th><th>Engagement Rate</th><th>Top Performing Content</th><th>Reach Impact</th></tr></thead>',
      '      <tbody>' + (rows || '<tr><td colspan="6" style="text-align:center;padding:24px;color:#94a3b8;">No social channels found</td></tr>') + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderAdvertising() {
    var rows = AD_SETS.map(function (a) {
      return [
        '<tr>',
        '  <td><b>' + a.name + '</b></td>',
        '  <td>' + a.platform + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;font-weight:600;">' + a.spend + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;">' + a.cpm + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;">' + a.cpc + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;color:#2563eb;font-weight:600;">' + a.cpa + '</td>',
        '  <td><span class="zmkt-roas-pill">' + a.roas + '</span></td>',
        '  <td><span class="zmkt-tag ' + (a.health === 'Optimal' ? 'zmkt-tag-active' : a.health === 'Scaling' ? 'zmkt-tag-scheduled' : 'zmkt-tag-paused') + '">' + a.health + '</span></td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zmkt-kpi-grid">',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Average CPM</span><span class="zmkt-kpi-icon-wrap">👁️</span></div><div class="zmkt-kpi-val">₹142</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">-8.5% MoM</span><span>Cost per 1K impressions</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Blended CPC</span><span class="zmkt-kpi-icon-wrap">🖱️</span></div><div class="zmkt-kpi-val">₹4.85</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">-12.0%</span><span>Cost per ad click</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Target CPA</span><span class="zmkt-kpi-icon-wrap">🎯</span></div><div class="zmkt-kpi-val">₹245</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">Cap at ₹350</span><span>Target ceiling</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Auction Share</span><span class="zmkt-kpi-icon-wrap">⚡</span></div><div class="zmkt-kpi-val">68.4%</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">+5.2%</span><span>Top ad placement rate</span></div></div>',
      '</div>',

      '<div class="zmkt-card">',
      '  <div class="zmkt-card-head"><div><h3 class="zmkt-card-title">Active Ad Sets & Creative Flighting</h3><p class="zmkt-card-sub">Ad network spend, cost per acquisition, and creative fatigue diagnostics</p></div></div>',
      '  <div class="zmkt-table-wrap">',
      '    <table class="zmkt-table">',
      '      <thead><tr><th>Ad Set / Campaign</th><th>Platform</th><th>Spend</th><th>CPM</th><th>CPC</th><th>CPA</th><th>ROAS</th><th>Creative Health</th></tr></thead>',
      '      <tbody>' + (rows || '<tr><td colspan="8" style="text-align:center;padding:24px;color:#94a3b8;">No ad sets found</td></tr>') + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderMarketingSpend() {
    var rows = SPEND_ITEMS.map(function (i) {
      return [
        '<tr>',
        '  <td><b>' + i.category + '</b></td>',
        '  <td style="font-family:IBM Plex Mono,monospace;">' + i.budget + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;font-weight:700;">' + i.actual + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;color:#16a34a;font-weight:600;">' + i.variance + '</td>',
        '  <td><span class="zmkt-tag zmkt-tag-active">' + i.status + '</span></td>',
        '  <td><b>' + i.share + '</b></td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zmkt-kpi-grid">',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Monthly Budget</span><span class="zmkt-kpi-icon-wrap">📋</span></div><div class="zmkt-kpi-val">₹2,80,000</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">Finance Approved</span><span>Current Period</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Actual Burn</span><span class="zmkt-kpi-icon-wrap">💳</span></div><div class="zmkt-kpi-val">₹2,60,000</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">7.1% Under Plan</span><span>₹20,000 surplus</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Media Spend Share</span><span class="zmkt-kpi-icon-wrap">📊</span></div><div class="zmkt-kpi-val">79.4%</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">Target: 80%</span><span>Paid ad networks</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Mkt % of GMV</span><span class="zmkt-kpi-icon-wrap">📈</span></div><div class="zmkt-kpi-val">1.82%</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">-0.3% MoM</span><span>Cost structure</span></div></div>',
      '</div>',

      '<div class="zmkt-card">',
      '  <div class="zmkt-card-head"><div><h3 class="zmkt-card-title">Marketing Expense Line Items & OPEX Adherence</h3><p class="zmkt-card-sub">Departmental cost centers, agency fees, and influencer disbursements</p></div></div>',
      '  <div class="zmkt-table-wrap">',
      '    <table class="zmkt-table">',
      '      <thead><tr><th>Spend Category</th><th>Monthly Budget</th><th>Actual Spend</th><th>Variance</th><th>Status</th><th>Share of Budget</th></tr></thead>',
      '      <tbody>' + (rows || '<tr><td colspan="6" style="text-align:center;padding:24px;color:#94a3b8;">No marketing spend records found</td></tr>') + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderCustomerAcquisition() {
    var rows = COHORTS.map(function (c) {
      return [
        '<tr>',
        '  <td><b>' + c.cohort + '</b></td>',
        '  <td style="font-family:IBM Plex Mono,monospace;font-weight:700;">' + c.acquired + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;color:#16a34a;font-weight:600;">' + c.m1Repeat + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;">' + c.m2Repeat + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;">' + c.aov + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;color:#2563eb;font-weight:700;">' + c.ltv60d + '</td>',
        '  <td><span class="zmkt-tag zmkt-tag-active">' + c.retention + '</span></td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zmkt-kpi-grid">',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">New Customers (MTD)</span><span class="zmkt-kpi-icon-wrap">👥</span></div><div class="zmkt-kpi-val">618</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">+18.4% MoM</span><span>First paid transaction</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">30D Repeat Rate</span><span class="zmkt-kpi-icon-wrap">🔄</span></div><div class="zmkt-kpi-val">38.2%</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">+2.4% MoM</span><span>Rx refills & nutrition</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">First Order AOV</span><span class="zmkt-kpi-icon-wrap">🛍️</span></div><div class="zmkt-kpi-val">₹2,150</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">+₹150 vs target</span><span>Basket size</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">60D Customer LTV</span><span class="zmkt-kpi-icon-wrap">💎</span></div><div class="zmkt-kpi-val">₹3,420</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">+11.8%</span><span>Pet lifetime value</span></div></div>',
      '</div>',

      '<div class="zmkt-card">',
      '  <div class="zmkt-card-head"><div><h3 class="zmkt-card-title">Monthly Cohort Repeat Behavior & 60D LTV</h3><p class="zmkt-card-sub">Retention tracking across acquired pet parent cohorts</p></div></div>',
      '  <div class="zmkt-table-wrap">',
      '    <table class="zmkt-table">',
      '      <thead><tr><th>Cohort</th><th>Acquired Pet Parents</th><th>30-Day Repeat</th><th>60-Day Repeat</th><th>First AOV</th><th>60-Day LTV</th><th>Retention Health</th></tr></thead>',
      '      <tbody>' + (rows || '<tr><td colspan="7" style="text-align:center;padding:24px;color:#94a3b8;">No cohort retention records found</td></tr>') + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderCAC() {
    var rows = CITY_CAC.map(function (c) {
      return [
        '<tr>',
        '  <td><b>' + c.city + '</b></td>',
        '  <td style="font-family:IBM Plex Mono,monospace;font-weight:700;color:#2563eb;">' + c.blendedCAC + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;">' + c.paidCAC + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;color:#16a34a;font-weight:600;">' + c.organicCAC + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;">' + c.newCustomers + '</td>',
        '  <td><span class="zmkt-roas-pill">' + c.ltvRatio + '</span></td>',
        '  <td><span class="zmkt-tag zmkt-tag-active">' + c.status + '</span></td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zmkt-kpi-grid">',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Blended CAC</span><span class="zmkt-kpi-icon-wrap">🎯</span></div><div class="zmkt-kpi-val">₹420</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">-16.0%</span><span>All marketing channels</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Paid Only CAC</span><span class="zmkt-kpi-icon-wrap">💳</span></div><div class="zmkt-kpi-val">₹512</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">-12.5%</span><span>Meta & Google ad spend</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Organic CAC</span><span class="zmkt-kpi-icon-wrap">🌱</span></div><div class="zmkt-kpi-val">₹152</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">-8.0%</span><span>Viral invite & SEO</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">LTV to CAC Ratio</span><span class="zmkt-kpi-icon-wrap">⚖️</span></div><div class="zmkt-kpi-val">8.14x</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">Healthy > 3.0x</span><span>Unit economics</span></div></div>',
      '</div>',

      '<div class="zmkt-card">',
      '  <div class="zmkt-card-head"><div><h3 class="zmkt-card-title">Metropolitan Territory CAC & LTV Multiple</h3><p class="zmkt-card-sub">City-by-city acquisition efficiency, customer volume, and payback multiples</p></div></div>',
      '  <div class="zmkt-table-wrap">',
      '    <table class="zmkt-table">',
      '      <thead><tr><th>Metro Territory</th><th>Blended CAC</th><th>Paid CAC</th><th>Organic CAC</th><th>New Customers</th><th>LTV : CAC Multiple</th><th>Unit Health</th></tr></thead>',
      '      <tbody>' + (rows || '<tr><td colspan="7" style="text-align:center;padding:24px;color:#94a3b8;">No city CAC records found</td></tr>') + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderROAS() {
    var rows = CATEGORY_ROAS.map(function (c) {
      return [
        '<tr>',
        '  <td><b>' + c.category + '</b></td>',
        '  <td style="font-family:IBM Plex Mono,monospace;">' + c.spend + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;font-weight:700;">' + c.revenue + '</td>',
        '  <td><span class="zmkt-roas-pill">' + c.roas + '</span></td>',
        '  <td style="font-family:IBM Plex Mono,monospace;color:#64748b;">' + c.target + '</td>',
        '  <td><span class="zmkt-tag zmkt-tag-active">' + c.status + '</span></td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zmkt-kpi-grid">',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Blended ROAS</span><span class="zmkt-kpi-icon-wrap">🚀</span></div><div class="zmkt-kpi-val">6.64x</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">+1.1x vs target</span><span>₹17.25L Attributed GMV</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Search Ads ROAS</span><span class="zmkt-kpi-icon-wrap">🔍</span></div><div class="zmkt-kpi-val">7.65x</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">High Intent</span><span>Google campaign return</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Social Ads ROAS</span><span class="zmkt-kpi-icon-wrap">📸</span></div><div class="zmkt-kpi-val">5.85x</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">Meta & Reels</span><span>Direct order checkout</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Incremental ROAS</span><span class="zmkt-kpi-icon-wrap">📈</span></div><div class="zmkt-kpi-val">5.10x</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">Baseline lift</span><span>Incremental revenue</span></div></div>',
      '</div>',

      '<div class="zmkt-card">',
      '  <div class="zmkt-card-head"><div><h3 class="zmkt-card-title">Category Ad Return & Revenue Generated</h3><p class="zmkt-card-sub">Ad efficiency mapped directly to top pet healthcare and wellness categories</p></div></div>',
      '  <div class="zmkt-table-wrap">',
      '    <table class="zmkt-table">',
      '      <thead><tr><th>Product & Clinical Category</th><th>Ad Spend</th><th>Attributed GMV</th><th>ROAS Multiple</th><th>Target Benchmark</th><th>Performance Status</th></tr></thead>',
      '      <tbody>' + (rows || '<tr><td colspan="6" style="text-align:center;padding:24px;color:#94a3b8;">No category ROAS records found</td></tr>') + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderMarketingROI() {
    var rows = FINANCIAL_ROI.map(function (f) {
      return [
        '<tr>',
        '  <td><b>' + f.channel + '</b></td>',
        '  <td style="font-family:IBM Plex Mono,monospace;">' + f.spend + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;font-weight:600;">' + f.grossProfitContrib + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;font-weight:700;color:#16a34a;">' + f.netProfitLift + '</td>',
        '  <td><span class="zmkt-roas-pill">' + f.netROI + '</span></td>',
        '  <td style="font-family:IBM Plex Mono,monospace;color:#475569;">' + f.paybackDays + '</td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zmkt-kpi-grid">',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Net Marketing ROI</span><span class="zmkt-kpi-icon-wrap">📈</span></div><div class="zmkt-kpi-val">394.2%</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">+42.5% MoM</span><span>Net profit / Ad spend</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Gross Profit Lift</span><span class="zmkt-kpi-icon-wrap">💰</span></div><div class="zmkt-kpi-val">₹12,88,000</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">Margin-adjusted</span><span>After product COGS</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Payback Window</span><span class="zmkt-kpi-icon-wrap">⏱️</span></div><div class="zmkt-kpi-val">23 Days</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">-6 Days</span><span>Time to recoup CAC</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Efficiency Ratio</span><span class="zmkt-kpi-icon-wrap">⚡</span></div><div class="zmkt-kpi-val">6.64</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">Total Sales / Spend</span><span>Capital efficiency</span></div></div>',
      '</div>',

      '<div class="zmkt-card">',
      '  <div class="zmkt-card-head"><div><h3 class="zmkt-card-title">Margin-Adjusted Marketing Return on Investment (ROI)</h3><p class="zmkt-card-sub">Bottom-line profit generation after deducting product cost and agency spend</p></div></div>',
      '  <div class="zmkt-table-wrap">',
      '    <table class="zmkt-table">',
      '      <thead><tr><th>Marketing Channel</th><th>Spend</th><th>Gross Profit Generated</th><th>Net Profit Lift</th><th>Net ROI %</th><th>Payback Window</th></tr></thead>',
      '      <tbody>' + (rows || '<tr><td colspan="6" style="text-align:center;padding:24px;color:#94a3b8;">No marketing ROI records found</td></tr>') + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderConversionFunnel() {
    var stepsHtml = FUNNEL_STEPS.map(function (s, idx) {
      return [
        '<div class="zmkt-funnel-step">',
        '  <div class="zmkt-funnel-head">',
        '    <div style="display:flex;align-items:center;">',
        '      <span class="zmkt-funnel-num" style="background:' + s.color + ';">' + (idx + 1) + '</span>',
        '      <span style="font-weight:700;font-size:14px;color:#0f172a;">' + s.stage + '</span>',
        '    </div>',
        '    <div style="text-align:right;">',
        '      <span style="font-weight:700;font-size:16px;color:#0f172a;font-family:IBM Plex Mono,monospace;">' + s.volume + '</span>',
        '      <span style="margin-left:8px;font-size:12px;color:#16a34a;font-weight:600;">(' + s.convRate + ')</span>',
        '    </div>',
        '  </div>',
        '  <div class="zmkt-bar-track">',
        '    <div class="zmkt-bar-fill" style="width:' + s.width + ';background:' + s.color + ';"></div>',
        '  </div>',
        '  <div style="display:flex;justify-content:space-between;font-size:12px;color:#64748b;">',
        '    <span>Key Driver: <b>' + s.channelLead + '</b></span>',
        '    ' + (s.dropPct !== '—' ? '<span style="color:#dc2626;font-weight:600;">Drop-off: ' + s.dropPct + '</span>' : '<span>Baseline</span>'),
        '  </div>',
        '</div>'
      ].join('');
    }).join('');

    return [
      '<div class="zmkt-kpi-grid">',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Top of Funnel</span><span class="zmkt-kpi-icon-wrap">👁️</span></div><div class="zmkt-kpi-val">1.84M</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">+16.5% MoM</span><span>Impressions across ads</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Click-to-Install</span><span class="zmkt-kpi-icon-wrap">📲</span></div><div class="zmkt-kpi-val">8.8%</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">High app intent</span><span>App Store / Play Store</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Cart-to-Paid</span><span class="zmkt-kpi-icon-wrap">🛒</span></div><div class="zmkt-kpi-val">43.6%</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">+3.8% MoM</span><span>Checkout flow</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Converted Buyers</span><span class="zmkt-kpi-icon-wrap">🎉</span></div><div class="zmkt-kpi-val">3,420</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">1.85% End-to-End</span><span>Paying pet parents</span></div></div>',
      '</div>',

      '<div class="zmkt-card">',
      '  <div class="zmkt-card-head"><div><h3 class="zmkt-card-title">Full Omni-Channel Conversion Funnel</h3><p class="zmkt-card-sub">Step-by-step visitor progression from initial ad view down to completed veterinary appointment</p></div></div>',
      '  <div>' + (stepsHtml || '<div style="text-align:center;padding:32px;color:#94a3b8;font-size:13px;">No conversion funnel data available</div>') + '</div>',
      '</div>'
    ].join('');
  }

  /* ── Event Listeners ──────────────────────────────────────────────── */
  function wireEvents() {
    // Tab switching chips
    root.querySelectorAll('.zmkt-chip').forEach(function (btn) {
      btn.onclick = function () {
        var t = btn.getAttribute('data-tab');
        switchTab(t);
      };
    });

    // Close button
    var closeBtn = root.querySelector('#zmkt-close-btn');
    if (closeBtn) {
      closeBtn.onclick = function () {
        close();
      };
    }

    // Launch Campaign button
    var addCampBtn = root.querySelector('#zmkt-add-campaign-btn');
    if (addCampBtn) {
      addCampBtn.onclick = function () {
        showLaunchCampaignModal();
      };
    }

    // ROAS Calculator button
    var calcBtn = root.querySelector('#zmkt-calc-btn');
    if (calcBtn) {
      calcBtn.onclick = function () {
        showCalculatorModal();
      };
    }

    // Export CSV button
    var expBtn = root.querySelector('#zmkt-export-btn');
    if (expBtn) {
      expBtn.onclick = function () {
        exportTabCSV();
      };
    }
  }

  function wireTabSpecificEvents() {
    // Campaign search
    var campSearch = root.querySelector('#zmkt-camp-search');
    if (campSearch) {
      campSearch.oninput = function () {
        S.searchQuery = campSearch.value;
        renderTabContent();
        var newInp = root.querySelector('#zmkt-camp-search');
        if (newInp) {
          newInp.focus();
          newInp.setSelectionRange(newInp.value.length, newInp.value.length);
        }
      };
    }

    // Campaign status select
    var campStatus = root.querySelector('#zmkt-camp-status');
    if (campStatus) {
      campStatus.onchange = function () {
        S.statusFilter = campStatus.value;
        renderTabContent();
      };
    }

    // Lead search
    var leadSearch = root.querySelector('#zmkt-lead-search');
    if (leadSearch) {
      leadSearch.oninput = function () {
        S.searchQuery = leadSearch.value;
        renderTabContent();
        var newInp = root.querySelector('#zmkt-lead-search');
        if (newInp) {
          newInp.focus();
          newInp.setSelectionRange(newInp.value.length, newInp.value.length);
        }
      };
    }

    // Add lead button in Leads tab
    var addLeadBtn = root.querySelector('#zmkt-add-lead-btn');
    if (addLeadBtn) {
      addLeadBtn.onclick = function () {
        showAddLeadModal();
      };
    }
  }

  /* ── Modals & Actions ─────────────────────────────────────────────── */
  function showLaunchCampaignModal() {
    var modal = document.createElement('div');
    modal.className = 'zmkt-modal-backdrop';
    modal.innerHTML = [
      '<div class="zmkt-modal-box">',
      '  <div class="zmkt-modal-head">',
      '    <h3>🚀 Launch Marketing Campaign Flight</h3>',
      '    <button type="button" class="zmkt-btn-icon" id="m-close">✕</button>',
      '  </div>',
      '  <div class="zmkt-modal-body">',
      '    <div class="zmkt-form-group"><label class="zmkt-label">Campaign Name</label><input class="zmkt-input" id="m-name" placeholder="e.g. Winter Dog Coat & Vitamin D Promotion" required></div>',
      '    <div class="zmkt-form-group"><label class="zmkt-label">Channel</label><select class="zmkt-select" id="m-channel" style="width:100%;"><option value="Google Search Ads">Google Search Ads</option><option value="Meta (Insta & FB)">Meta (Insta & FB)</option><option value="Meta Instagram Reels">Meta Instagram Reels</option><option value="YouTube Video Ads">YouTube Video Ads</option><option value="Partner Vet Clinics">Partner Vet Clinics</option><option value="WhatsApp & SMS">WhatsApp & SMS</option></select></div>',
      '    <div class="zmkt-form-group"><label class="zmkt-label">Allocated Budget (₹)</label><input class="zmkt-input" id="m-budget" placeholder="e.g. 150000" type="number" required></div>',
      '    <div class="zmkt-form-group"><label class="zmkt-label">Target ROAS (e.g. 4.5x)</label><input class="zmkt-input" id="m-roas" placeholder="e.g. 4.5x" value="4.5x" required></div>',
      '  </div>',
      '  <div class="zmkt-modal-foot">',
      '    <button type="button" class="zmkt-btn zmkt-btn-secondary" id="m-cancel">Cancel</button>',
      '    <button type="button" class="zmkt-btn zmkt-btn-primary" id="m-save">Launch Flight</button>',
      '  </div>',
      '</div>'
    ].join('');
    document.body.appendChild(modal);

    function closeM() { modal.remove(); }
    modal.querySelector('#m-close').onclick = closeM;
    modal.querySelector('#m-cancel').onclick = closeM;
    modal.querySelector('#m-save').onclick = function () {
      var name = document.getElementById('m-name').value;
      var chan = document.getElementById('m-channel').value;
      var budget = document.getElementById('m-budget').value;
      var roas = document.getElementById('m-roas').value;
      if (!name || !budget) { alert('Please enter campaign name and budget.'); return; }

      CAMPAIGNS.unshift({
        id: 'CMP-' + (200 + CAMPAIGNS.length + 1),
        name: name,
        channel: chan,
        budget: '₹' + Number(budget).toLocaleString(),
        spend: '₹0',
        impressions: '0',
        clicks: '0',
        ctr: '0.00%',
        conv: 0,
        cac: '—',
        roas: roas || '4.0x',
        status: 'Active'
      });

      showToast('Campaign "' + name + '" launched successfully!');
      closeM();
      S.tab = 'campaigns';
      render();
    };
  }

  function showAddLeadModal() {
    var modal = document.createElement('div');
    modal.className = 'zmkt-modal-backdrop';
    modal.innerHTML = [
      '<div class="zmkt-modal-box">',
      '  <div class="zmkt-modal-head">',
      '    <h3>🎯 Capture New Pet Parent Lead</h3>',
      '    <button type="button" class="zmkt-btn-icon" id="m-close">✕</button>',
      '  </div>',
      '  <div class="zmkt-modal-body">',
      '    <div class="zmkt-form-group"><label class="zmkt-label">Pet Parent Name</label><input class="zmkt-input" id="m-pname" placeholder="e.g. Shalini Roy" required></div>',
      '    <div class="zmkt-form-group"><label class="zmkt-label">Pet Companion (Breed & Name)</label><input class="zmkt-input" id="m-pet" placeholder="e.g. Beagle (Simba)" required></div>',
      '    <div class="zmkt-form-group"><label class="zmkt-label">City & Zone</label><input class="zmkt-input" id="m-city" placeholder="e.g. Bengaluru (HSR Layout)" required></div>',
      '    <div class="zmkt-form-group"><label class="zmkt-label">Acquisition Channel</label><select class="zmkt-select" id="m-source" style="width:100%;"><option value="Google Search Ads">Google Search Ads</option><option value="Instagram Reels">Instagram Reels</option><option value="Vet Clinic Referral">Vet Clinic Referral</option><option value="In-App Telehealth">In-App Telehealth</option><option value="Direct Website">Direct Website</option></select></div>',
      '  </div>',
      '  <div class="zmkt-modal-foot">',
      '    <button type="button" class="zmkt-btn zmkt-btn-secondary" id="m-cancel">Cancel</button>',
      '    <button type="button" class="zmkt-btn zmkt-btn-primary" id="m-save">Save Lead</button>',
      '  </div>',
      '</div>'
    ].join('');
    document.body.appendChild(modal);

    function closeM() { modal.remove(); }
    modal.querySelector('#m-close').onclick = closeM;
    modal.querySelector('#m-cancel').onclick = closeM;
    modal.querySelector('#m-save').onclick = function () {
      var pname = document.getElementById('m-pname').value;
      var pet = document.getElementById('m-pet').value;
      var city = document.getElementById('m-city').value;
      var source = document.getElementById('m-source').value;
      if (!pname || !pet) { alert('Please enter pet parent name and pet companion details.'); return; }

      LEADS.unshift({
        id: 'LD-' + (4090 + LEADS.length + 1),
        parent: pname,
        pet: pet,
        city: city || 'Bengaluru',
        source: source,
        score: 'A',
        stage: 'New',
        rep: 'Dr. Priya Sharma',
        value: '₹3,500',
        status: 'Active'
      });

      showToast('Lead for pet parent ' + pname + ' registered!');
      closeM();
      renderTabContent();
    };
  }

  function showCalculatorModal() {
    var modal = document.createElement('div');
    modal.className = 'zmkt-modal-backdrop';
    modal.innerHTML = [
      '<div class="zmkt-modal-box">',
      '  <div class="zmkt-modal-head">',
      '    <h3>⚡ Instant Marketing ROAS & CAC Calculator</h3>',
      '    <button type="button" class="zmkt-btn-icon" id="m-close">✕</button>',
      '  </div>',
      '  <div class="zmkt-modal-body">',
      '    <div class="zmkt-form-group"><label class="zmkt-label">Total Campaign Ad Spend (₹)</label><input class="zmkt-input" id="c-spend" value="100000" type="number"></div>',
      '    <div class="zmkt-form-group"><label class="zmkt-label">Total Revenue Generated (₹)</label><input class="zmkt-input" id="c-rev" value="450000" type="number"></div>',
      '    <div class="zmkt-form-group"><label class="zmkt-label">Total Customers Acquired</label><input class="zmkt-input" id="c-cust" value="260" type="number"></div>',
      '    <div style="background:#f8fafc;padding:14px;border-radius:10px;margin-top:10px;display:grid;grid-template-columns:1fr 1fr;gap:12px;">',
      '      <div><span style="font-size:11px;color:#64748b;">CALCULATED ROAS</span><div id="res-roas" style="font-size:22px;font-weight:700;color:#16a34a;">4.50x</div></div>',
      '      <div><span style="font-size:11px;color:#64748b;">BLENDED CAC</span><div id="res-cac" style="font-size:22px;font-weight:700;color:#2563eb;">₹385</div></div>',
      '    </div>',
      '  </div>',
      '  <div class="zmkt-modal-foot">',
      '    <button type="button" class="zmkt-btn zmkt-btn-primary" id="m-calc-close">Done</button>',
      '  </div>',
      '</div>'
    ].join('');
    document.body.appendChild(modal);

    function updateCalc() {
      var sp = Number(document.getElementById('c-spend').value) || 1;
      var rv = Number(document.getElementById('c-rev').value) || 0;
      var cu = Number(document.getElementById('c-cust').value) || 1;
      var roas = (rv / sp).toFixed(2) + 'x';
      var cac = '₹' + Math.round(sp / cu).toLocaleString();
      document.getElementById('res-roas').textContent = roas;
      document.getElementById('res-cac').textContent = cac;
    }

    modal.querySelector('#c-spend').oninput = updateCalc;
    modal.querySelector('#c-rev').oninput = updateCalc;
    modal.querySelector('#c-cust').oninput = updateCalc;
    modal.querySelector('#m-close').onclick = function () { modal.remove(); };
    modal.querySelector('#m-calc-close').onclick = function () { modal.remove(); };
  }

  function exportTabCSV() {
    var curMod = MODULES.find(function (m) { return m.id === S.tab; }) || MODULES[0];
    var csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Zenve BI Marketing Intelligence Export - " + curMod.label + "\n";
    csvContent += "Export Date: " + new Date().toISOString() + "\n\n";

    if (S.tab === 'campaigns') {
      csvContent += "Campaign ID,Campaign Name,Channel,Spend,Budget,Impressions,CTR,Conversions,CAC,ROAS,Status\n";
      CAMPAIGNS.forEach(function (c) {
        csvContent += [c.id, '"' + c.name + '"', '"' + c.channel + '"', c.spend, c.budget, c.impressions, c.ctr, c.conv, c.cac, c.roas, c.status].join(',') + "\n";
      });
    } else if (S.tab === 'leads') {
      csvContent += "Lead ID,Pet Parent,Pet,City,Source,Score,Stage,Rep,Value,Status\n";
      LEADS.forEach(function (l) {
        csvContent += [l.id, '"' + l.parent + '"', '"' + l.pet + '"', '"' + l.city + '"', '"' + l.source + '"', l.score, l.stage, '"' + l.rep + '"', l.value, l.status].join(',') + "\n";
      });
    } else {
      csvContent += "Category,Metric,Value,Note\n";
      csvContent += "Marketing Performance,Blended ROAS,0.0x,Across all paid channels\n";
      csvContent += "Marketing Economics,Blended CAC,₹0,Acquisition cost per pet parent\n";
      csvContent += "Funnel Velocity,Top of Funnel,0 impressions,Meta & Google\n";
    }

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "zenve_marketing_" + S.tab + "_report.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast('Downloaded ' + curMod.label + ' CSV report.');
  }

  function toggleCampaignStatus(id) {
    CAMPAIGNS.forEach(function (c) {
      if (c.id === id) {
        c.status = c.status === 'Active' ? 'Paused' : 'Active';
        showToast('Campaign ' + id + ' status updated to ' + c.status + '.');
      }
    });
    renderTabContent();
  }

  function viewLead(id) {
    var l = LEADS.find(function (x) { return x.id === id; });
    if (!l) return;
    alert('🐾 Pet Parent Lead 360° Profile:\n\n' +
      'Lead ID: ' + l.id + '\n' +
      'Pet Parent: ' + l.parent + '\n' +
      'Companion: ' + l.pet + '\n' +
      'Location: ' + l.city + '\n' +
      'Acquisition Source: ' + l.source + '\n' +
      'Score: ' + l.score + '\n' +
      'Pipeline Stage: ' + l.stage + '\n' +
      'Assigned Rep: ' + l.rep + '\n' +
      'Pipeline Est. Value: ' + l.value + '\n' +
      'Status: ' + l.status
    );
  }

  /* ── Navigation & Control ─────────────────────────────────────────── */
  function open(tab) {
    closeOthers();
    init();
    if (tab) S.tab = tab;
    S.open = true;
    render();
    root.classList.add('zpanel-open');
    var targetHash = (MODULES.find(function(m){ return m.id === S.tab; }) || {}).hash || '#marketing-dashboard';
    if (window.location.hash !== targetHash) {
      try { history.pushState(null, '', targetHash); } catch (e) { window.location.hash = targetHash; }
    }
  }

  function close() {
    if (root) root.classList.remove('zpanel-open');
    S.open = false;
    var h = window.location.hash;
    if (h.startsWith('#marketing') || h.startsWith('#campaign') || h.startsWith('#lead') || h.startsWith('#web') || h.startsWith('#app-') || h.startsWith('#social') || h.startsWith('#ad') || h.startsWith('#cac') || h.startsWith('#roas') || h.startsWith('#conversion')) {
      try { history.pushState(null, '', window.location.pathname + window.location.search); } catch (e) {}
    }
  }

  function switchTab(tab) {
    if (!tab) return;
    S.tab = tab;
    var targetHash = (MODULES.find(function(m){ return m.id === tab; }) || {}).hash || '#marketing-dashboard';
    if (window.location.hash !== targetHash) {
      try { history.pushState(null, '', targetHash); } catch (e) { window.location.hash = targetHash; }
    }
    render();
  }

  function init() {
    root = document.getElementById('zmkt-dashboard-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'zmkt-dashboard-root';
      root.className = 'zpanel-root zmkt-root';
      document.body.appendChild(root);
    }
  }

  /* ── Interceptor for Sidebar ──────────────────────────────────────── */
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;

    // Never intercept accordion group headers or search input
    if (t.closest('[aria-expanded]') || t.closest('button[aria-expanded]') || t.closest('[aria-label="Search menu"]')) return;

    var item = t.closest('button, [data-go], a, [role="button"], li');
    if (item && item.textContent) {
      var tab = tabFromText(item.textContent);
      if (tab) {
        if (!t.closest('#zmkt-dashboard-root')) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          open(tab);
        }
      }
    }
  }, true);

  // Keyboard Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && S.open) close();
  });

  // Hashchange Listener
  window.addEventListener('hashchange', function () {
    var tab = tabFromHash(window.location.hash);
    if (tab) {
      open(tab);
    } else if (S.open && !window.location.hash.startsWith('#marketing') && !window.location.hash.startsWith('#campaign') && !window.location.hash.startsWith('#lead') && !window.location.hash.startsWith('#roas') && !window.location.hash.startsWith('#cac') && !window.location.hash.startsWith('#conversion')) {
      close();
    }
  });

  /* ── Export Global API ────────────────────────────────────────────── */
  window.ZenveMarketingDashboard = {
    open: open,
    close: close,
    switchTab: switchTab,
    showLaunchCampaignModal: showLaunchCampaignModal,
    showAddLeadModal: showAddLeadModal,
    showCalculatorModal: showCalculatorModal,
    toggleCampaignStatus: toggleCampaignStatus,
    viewLead: viewLead,
    exportTabCSV: exportTabCSV
  };

  /* ── Boot ─────────────────────────────────────────────────────────── */
  function boot() {
    init();
    var initialTab = tabFromHash(window.location.hash);
    if (initialTab) {
      setTimeout(function () { open(initialTab); }, 200);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
