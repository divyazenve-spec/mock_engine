/* =====================================================================
   Zenve BI — Adaptive Thematic Celestial Stars Revolving Logo Loader
   Domain-Based Star Color System:
     - Exact Sidebar Font Color inheritance per Parent Domain
     - All Subdomains inherit their Parent Domain's exact font color
     - Zero random color generation
     - Revolving Celestial Orbit Rings, Logo Halo & Twinkling Stars
   ===================================================================== */
(function () {
  'use strict';

  var LOADER_ID = 'zenve-dragon-loader';
  var _lastShownAt = 0;
  var _hideTimer = null;
  var MIN_DISPLAY_MS = 450; // Smooth viewing window for revolving stars animation

  // Authoritative Domain Registry: Exact sidebar font colors for all 25 domains
  var DOMAIN_PALETTES = {
    'executive-dashboard': {
      title: 'Executive Dashboard',
      color: '#38bdf8',
      tag: 'Executive Control'
    },
    'revenue-sales': {
      title: 'Revenue & Sales',
      color: '#00f2fe',
      tag: 'Revenue & Sales'
    },
    'orders-operations': {
      title: 'Orders & Operations',
      color: '#38bdf8',
      tag: 'Operations & Dispatch'
    },
    'products-inventory': {
      title: 'Products & Inventory',
      color: '#a855f7',
      tag: 'Products & Inventory'
    },
    'pharmacy': {
      title: 'Pharmacy',
      color: '#f97316',
      tag: 'Pharmacy Dispensary'
    },
    'veterinary-services': {
      title: 'Veterinary Services',
      color: '#ec4899',
      tag: 'Veterinary Services'
    },
    'doctors': {
      title: 'Doctors',
      color: '#06b6d4',
      tag: 'Doctor Practitioners'
    },
    'clinics-hospitals': {
      title: 'Clinics & Hospitals',
      color: '#8b5cf6',
      tag: 'Clinics & Hospitals'
    },
    'customers-360': {
      title: 'Customers 360°',
      color: '#10b981',
      tag: 'Customers 360°'
    },
    'pets-360': {
      title: 'Pets 360°',
      color: '#f59e0b',
      tag: 'Pets 360° Health'
    },
    'employees-hr': {
      title: 'Employees & HR',
      color: '#6366f1',
      tag: 'Human Resources & Talent'
    },
    'finance-accounting': {
      title: 'Finance & Accounting',
      color: '#eab308',
      tag: 'Finance & Treasury'
    },
    'marketing': {
      title: 'Marketing',
      color: '#f43f5e',
      tag: 'Growth & Marketing'
    },
    'vendors-procurement': {
      title: 'Vendors & Procurement',
      color: '#14b8a6',
      tag: 'Vendors & Procurement'
    },
    'logistics-delivery': {
      title: 'Logistics & Delivery',
      color: '#3b82f6',
      tag: 'Logistics & Fleet'
    },
    'fashion': {
      title: 'Zenve Fashion',
      color: '#d946ef',
      tag: 'Zenve Fashion'
    },
    'b2b-enterprise': {
      title: 'B2B & Enterprise',
      color: '#2563eb',
      tag: 'B2B & Enterprise'
    },
    'import-export': {
      title: 'Import & Export',
      color: '#0284c7',
      tag: 'Import & Export'
    },
    'subscriptions': {
      title: 'Subscriptions',
      color: '#8b5cf6',
      tag: 'Subscription Commerce'
    },
    'reports-analytics': {
      title: 'Reports & Analytics',
      color: '#38bdf8',
      tag: 'Reports & Analytics'
    },
    'ai-assistant': {
      title: 'AI Assistant',
      color: '#a855f7',
      tag: 'Neural AI Engine'
    },
    'alerts': {
      title: 'Alerts & Notifications',
      color: '#ef4444',
      tag: 'Real-Time Alerts'
    },
    'audit-compliance': {
      title: 'Audit & Compliance',
      color: '#64748b',
      tag: 'Audit & Governance'
    },
    'system-health': {
      title: 'System Health',
      color: '#10b981',
      tag: 'System Diagnostics'
    },
    'settings': {
      title: 'Settings',
      color: '#94a3b8',
      tag: 'Platform Settings'
    }
  };

  // Domain aliases mapping normalized input to canonical domain keys
  var DOMAIN_ALIASES = {
    'executive': 'executive-dashboard',
    'executive dashboard': 'executive-dashboard',
    'executive control': 'executive-dashboard',
    'revenue & sales': 'revenue-sales',
    'revenue and sales': 'revenue-sales',
    'sales': 'revenue-sales',
    'revenue': 'revenue-sales',
    'orders & operations': 'orders-operations',
    'orders and operations': 'orders-operations',
    'orders': 'orders-operations',
    'operations': 'orders-operations',
    'products & inventory': 'products-inventory',
    'products and inventory': 'products-inventory',
    'products': 'products-inventory',
    'inventory': 'products-inventory',
    'pharmacy': 'pharmacy',
    'veterinary services': 'veterinary-services',
    'veterinary': 'veterinary-services',
    'doctors': 'doctors',
    'clinics & hospitals': 'clinics-hospitals',
    'clinics and hospitals': 'clinics-hospitals',
    'clinics': 'clinics-hospitals',
    'hospitals': 'clinics-hospitals',
    'customers 360°': 'customers-360',
    'customers 360': 'customers-360',
    'customers': 'customers-360',
    'pets 360°': 'pets-360',
    'pets 360': 'pets-360',
    'pets': 'pets-360',
    'employees & hr': 'employees-hr',
    'employees and hr': 'employees-hr',
    'employees': 'employees-hr',
    'hr': 'employees-hr',
    'finance & accounting': 'finance-accounting',
    'finance and accounting': 'finance-accounting',
    'finance': 'finance-accounting',
    'accounting': 'finance-accounting',
    'marketing': 'marketing',
    'vendors & procurement': 'vendors-procurement',
    'vendors and procurement': 'vendors-procurement',
    'vendors': 'vendors-procurement',
    'procurement': 'vendors-procurement',
    'logistics & delivery': 'logistics-delivery',
    'logistics and delivery': 'logistics-delivery',
    'logistics': 'logistics-delivery',
    'delivery': 'logistics-delivery',
    'zenve fashion': 'fashion',
    'fashion': 'fashion',
    'b2b & enterprise': 'b2b-enterprise',
    'b2b and enterprise': 'b2b-enterprise',
    'b2b / enterprise': 'b2b-enterprise',
    'b2b enterprise': 'b2b-enterprise',
    'b2b': 'b2b-enterprise',
    'enterprise': 'b2b-enterprise',
    'import & export': 'import-export',
    'import and export': 'import-export',
    'import/export': 'import-export',
    'import': 'import-export',
    'export': 'import-export',
    'subscriptions': 'subscriptions',
    'subscription': 'subscriptions',
    'reports & analytics': 'reports-analytics',
    'reports and analytics': 'reports-analytics',
    'reports': 'reports-analytics',
    'analytics': 'reports-analytics',
    'ai assistant': 'ai-assistant',
    'ai': 'ai-assistant',
    'alerts & notifications': 'alerts',
    'alerts and notifications': 'alerts',
    'alerts': 'alerts',
    'notifications': 'alerts',
    'audit & compliance': 'audit-compliance',
    'audit and compliance': 'audit-compliance',
    'audit': 'audit-compliance',
    'compliance': 'audit-compliance',
    'system health': 'system-health',
    'system': 'system-health',
    'health': 'system-health',
    'settings': 'settings'
  };

  // Authoritative Subdomain-to-Parent-Domain inheritance map
  // Guarantees all subdomains strictly inherit their parent domain's font color
  var SUBDOMAIN_TO_DOMAIN_KEY = {
    // Executive Dashboard
    'executive dashboard': 'executive-dashboard',
    'ceo control center': 'executive-dashboard',
    'business overview': 'executive-dashboard',
    'kpi dashboard': 'executive-dashboard',

    // Revenue & Sales
    'sales dashboard': 'revenue-sales',
    'revenue by channel': 'revenue-sales',
    'revenue by location': 'revenue-sales',
    'revenue by product': 'revenue-sales',
    'revenue by employee': 'revenue-sales',
    'revenue by doctor': 'revenue-sales',
    'revenue by customer': 'revenue-sales',
    'sales funnel': 'revenue-sales',
    'targets & achievement': 'revenue-sales',
    'targets & achievements': 'revenue-sales',
    'sales forecast': 'revenue-sales',

    // Orders & Operations
    'all orders': 'orders-operations',
    'order management': 'orders-operations',
    'order status': 'orders-operations',
    'returns & refunds': 'orders-operations',
    'cancellations': 'orders-operations',
    'delivery performance': 'orders-operations',
    '60-minute delivery': 'orders-operations',
    'operations dashboard': 'orders-operations',

    // Products & Inventory
    'product catalog': 'products-inventory',
    'products catalog': 'products-inventory',
    'all products': 'products-inventory',
    'sku management': 'products-inventory',
    'inventory dashboard': 'products-inventory',
    'inventory': 'products-inventory',
    'stock management': 'products-inventory',
    'low stock': 'products-inventory',
    'out of stock': 'products-inventory',
    'expiry management': 'products-inventory',
    'warehouse management': 'products-inventory',
    'stock transfers': 'products-inventory',
    'inventory valuation': 'products-inventory',
    'inventory movement': 'products-inventory',

    // Pharmacy
    'pharmacy dashboard': 'pharmacy',
    'pharmacy sales': 'pharmacy',
    'medicines': 'pharmacy',
    'prescriptions': 'pharmacy',
    'pharmacy orders': 'pharmacy',
    'batch management': 'pharmacy',
    'expiry tracking': 'pharmacy',
    'pharmacy inventory': 'pharmacy',
    'pharmacy revenue': 'pharmacy',
    'pharmacy profitability': 'pharmacy',

    // Veterinary Services
    'services dashboard': 'veterinary-services',
    'consultations': 'veterinary-services',
    'appointments': 'veterinary-services',
    'treatments': 'veterinary-services',
    'vaccinations': 'veterinary-services',
    'diagnostics': 'veterinary-services',
    'procedures': 'veterinary-services',
    'service revenue': 'veterinary-services',
    'service profitability': 'veterinary-services',

    // Doctors
    'doctors dashboard': 'doctors',
    'all doctors': 'doctors',
    'doctor performance': 'doctors',
    'doctor revenue': 'doctors',
    'doctor patients': 'doctors',
    'doctor orders': 'doctors',
    'doctor commissions': 'doctors',
    'doctor activity': 'doctors',
    'doctor network': 'doctors',

    // Clinics & Hospitals
    'clinics dashboard': 'clinics-hospitals',
    'all clinics': 'clinics-hospitals',
    'hospitals': 'clinics-hospitals',
    'clinic performance': 'clinics-hospitals',
    'clinic revenue': 'clinics-hospitals',
    'clinic orders': 'clinics-hospitals',
    'clinic patients': 'clinics-hospitals',
    'clinic doctors': 'clinics-hospitals',
    'clinic commissions': 'clinics-hospitals',
    'clinic network': 'clinics-hospitals',

    // Customers 360°
    'customer dashboard': 'customers-360',
    'all customers': 'customers-360',
    'new customers': 'customers-360',
    'active customers': 'customers-360',
    'repeat customers': 'customers-360',
    'customer lifetime value': 'customers-360',
    'customer segmentation': 'customers-360',
    'customer orders': 'customers-360',
    'customer revenue': 'customers-360',
    'customer retention': 'customers-360',
    'customer complaints': 'customers-360',

    // Pets 360°
    'all pets': 'pets-360',
    'pet profiles': 'pets-360',
    'pet health records': 'pets-360',
    'vaccination records': 'pets-360',
    'treatment history': 'pets-360',
    'prescription history': 'pets-360',
    'purchase history': 'pets-360',
    'pets purchase history': 'pets-360',
    'pet analytics': 'pets-360',
    'pet health insights': 'pets-360',

    // Employees & HR
    'hr dashboard': 'employees-hr',
    'all employees': 'employees-hr',
    'departments': 'employees-hr',
    'employee performance': 'employees-hr',
    'employee targets': 'employees-hr',
    'employee productivity': 'employees-hr',
    'attendance': 'employees-hr',
    'leave management': 'employees-hr',
    'payroll': 'employees-hr',
    'salary cost': 'employees-hr',
    'recruitment': 'employees-hr',
    'onboarding': 'employees-hr',
    'employee expenses': 'employees-hr',

    // Finance & Accounting
    'finance dashboard': 'finance-accounting',
    'profit & loss': 'finance-accounting',
    'profit and loss': 'finance-accounting',
    'balance sheet': 'finance-accounting',
    'cash flow': 'finance-accounting',
    'revenue': 'finance-accounting',
    'expenses': 'finance-accounting',
    'cogs': 'finance-accounting',
    'gross profit': 'finance-accounting',
    'ebitda': 'finance-accounting',
    'net profit': 'finance-accounting',
    'accounts receivable': 'finance-accounting',
    'accounts payable': 'finance-accounting',
    'invoices': 'finance-accounting',
    'payments': 'finance-accounting',
    'refunds': 'finance-accounting',
    'taxes': 'finance-accounting',
    'financial forecast': 'finance-accounting',
    'cost analysis': 'finance-accounting',

    // Marketing
    'marketing dashboard': 'marketing',
    'campaigns': 'marketing',
    'leads': 'marketing',
    'lead sources': 'marketing',
    'website analytics': 'marketing',
    'app analytics': 'marketing',
    'social media': 'marketing',
    'advertising': 'marketing',
    'marketing spend': 'marketing',
    'customer acquisition': 'marketing',
    'cac': 'marketing',
    'roas': 'marketing',
    'marketing roi': 'marketing',
    'conversion funnel': 'marketing',

    // Vendors & Procurement
    'vendor dashboard': 'vendors-procurement',
    'all vendors': 'vendors-procurement',
    'vendor performance': 'vendors-procurement',
    'vendor payments': 'vendors-procurement',
    'purchase orders': 'vendors-procurement',
    'procurement': 'vendors-procurement',
    'vendor purchase history': 'vendors-procurement',
    'supplier pricing': 'vendors-procurement',
    'supplier performance': 'vendors-procurement',
    'procurement savings': 'vendors-procurement',

    // Logistics & Delivery
    'logistics dashboard': 'logistics-delivery',
    'delivery orders': 'logistics-delivery',
    'delivery partners': 'logistics-delivery',
    'delivery tracking': 'logistics-delivery',
    'delivery sla': 'logistics-delivery',
    'delivery cost': 'logistics-delivery',
    'failed deliveries': 'logistics-delivery',
    '60-minute delivery (logistics)': 'logistics-delivery',
    'delivery performance (logistics)': 'logistics-delivery',

    // Zenve Fashion
    'fashion dashboard': 'fashion',
    'fashion products': 'fashion',
    'fashion orders': 'fashion',
    'fashion customers': 'fashion',
    'fashion inventory': 'fashion',
    'fashion showrooms': 'fashion',
    'online fashion sales': 'fashion',
    'fashion revenue': 'fashion',
    'fashion profitability': 'fashion',

    // B2B & Enterprise
    'b2b dashboard': 'b2b-enterprise',
    'enterprise customers': 'b2b-enterprise',
    'corporate accounts': 'b2b-enterprise',
    'b2b orders': 'b2b-enterprise',
    'b2b sales': 'b2b-enterprise',
    'b2b revenue': 'b2b-enterprise',
    'contracts': 'b2b-enterprise',
    'enterprise pricing': 'b2b-enterprise',
    'b2b receivables': 'b2b-enterprise',

    // Import & Export
    'import dashboard': 'import-export',
    'export dashboard': 'import-export',
    'import orders': 'import-export',
    'export orders': 'import-export',
    'suppliers': 'import-export',
    'buyers': 'import-export',
    'customs & documentation': 'import-export',
    'logistics': 'import-export',
    'import/export profitability': 'import-export',

    // Subscriptions
    'subscription dashboard': 'subscriptions',
    'active subscriptions': 'subscriptions',
    'new subscriptions': 'subscriptions',
    'renewals': 'subscriptions',
    'expiring subscriptions': 'subscriptions',
    'churn': 'subscriptions',
    'subscription revenue': 'subscriptions',
    'subscription analytics': 'subscriptions',

    // Reports & Analytics
    'sales reports': 'reports-analytics',
    'revenue reports': 'reports-analytics',
    'customer reports': 'reports-analytics',
    'pet reports': 'reports-analytics',
    'doctor reports': 'reports-analytics',
    'clinic reports': 'reports-analytics',
    'product reports': 'reports-analytics',
    'inventory reports': 'reports-analytics',
    'finance reports': 'reports-analytics',
    'hr reports': 'reports-analytics',
    'marketing reports': 'reports-analytics',
    'operations reports': 'reports-analytics',
    'vendor reports': 'reports-analytics',
    'custom reports': 'reports-analytics',
    'scheduled reports': 'reports-analytics',
    'export center': 'reports-analytics',

    // AI Assistant
    'ask zenve ai': 'ai-assistant',
    'business insights': 'ai-assistant',
    'revenue intelligence': 'ai-assistant',
    'ai sales forecast': 'ai-assistant',
    'demand forecast': 'ai-assistant',
    'inventory prediction': 'ai-assistant',
    'customer prediction': 'ai-assistant',
    'churn prediction': 'ai-assistant',
    'profit prediction': 'ai-assistant',
    'anomaly detection': 'ai-assistant',
    'ai recommendations': 'ai-assistant',

    // Alerts & Notifications
    'critical alerts': 'alerts',
    'revenue alerts': 'alerts',
    'inventory alerts': 'alerts',
    'payment alerts': 'alerts',
    'order alerts': 'alerts',
    'delivery alerts': 'alerts',
    'finance alerts': 'alerts',
    'hr alerts': 'alerts',
    'system alerts': 'alerts',
    'alert rules': 'alerts',
    'notification center': 'alerts',

    // Audit & Compliance
    'audit log': 'audit-compliance',
    'user activity': 'audit-compliance',
    'login history': 'audit-compliance',
    'data changes': 'audit-compliance',
    'financial audit trail': 'audit-compliance',
    'order audit trail': 'audit-compliance',
    'inventory audit trail': 'audit-compliance',
    'approval history': 'audit-compliance',
    'compliance dashboard': 'audit-compliance',

    // System Health
    'application health': 'system-health',
    'api health': 'system-health',
    'database health': 'system-health',
    'payment gateway': 'system-health',
    'crm status': 'system-health',
    'inventory system': 'system-health',
    'accounting system': 'system-health',
    'marketing integrations': 'system-health',
    'notification services': 'system-health',
    'integration logs': 'system-health',

    // Settings
    'company settings': 'settings',
    'business units': 'settings',
    'locations': 'settings',
    'users': 'settings',
    'roles & permissions': 'settings',
    'approval workflows': 'settings',
    'notification settings': 'settings',
    'dashboard settings': 'settings',
    'tax settings': 'settings',
    'payment settings': 'settings',
    'delivery settings': 'settings',
    'api & integrations': 'settings',
    'security': 'settings',
    'backup & recovery': 'settings'
  };

  /**
   * Helper: converts hex color to RGB object
   */
  function hexToRgb(hex) {
    if (!hex) return { r: 56, g: 189, b: 248 };
    hex = hex.replace('#', '').trim();
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    var num = parseInt(hex, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255
    };
  }

  /**
   * Helper: blends an RGB color with white (tint)
   */
  function blendWithWhite(rgb, factor) {
    var r = Math.round(rgb.r + (255 - rgb.r) * factor);
    var g = Math.round(rgb.g + (255 - rgb.g) * factor);
    var b = Math.round(rgb.b + (255 - rgb.b) * factor);
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  /**
   * Helper: darkens an RGB color
   */
  function darken(rgb, factor) {
    var r = Math.round(rgb.r * (1 - factor));
    var g = Math.round(rgb.g * (1 - factor));
    var b = Math.round(rgb.b * (1 - factor));
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  /**
   * Generates a complete theme specification from the exact sidebar font color
   */
  function buildTheme(title, hexColor, tag) {
    var rgb = hexToRgb(hexColor);
    var light = blendWithWhite(rgb, 0.45);
    var dark = darken(rgb, 0.20);
    var accent = blendWithWhite(rgb, 0.25);
    var r = rgb.r, g = rgb.g, b = rgb.b;

    return {
      tag: tag || title,
      domainTitle: title,
      domainColor: hexColor, // Exact sidebar font color
      primary: hexColor,
      secondary: hexColor,
      light: light,
      dark: dark,
      accent: accent,
      glow: 'rgba(' + r + ', ' + g + ', ' + b + ', 0.22)',
      glowBorder: 'rgba(' + r + ', ' + g + ', ' + b + ', 0.38)',
      coreBorder: 'rgba(' + r + ', ' + g + ', ' + b + ', 0.68)',
      coreInner: '#f8fafc',
      bgTint: 'rgba(255, 255, 255, 0.96)',
      badgeBg: 'rgba(' + r + ', ' + g + ', ' + b + ', 0.12)',
      badgeBorder: 'rgba(' + r + ', ' + g + ', ' + b + ', 0.35)',
      badgeColor: dark,
      starColor: hexColor, // Every star displays the exact parent domain font color
      starGlow1: 'rgba(' + r + ', ' + g + ', ' + b + ', 0.95)',
      starGlow2: 'rgba(' + r + ', ' + g + ', ' + b + ', 0.70)',
      runnerGrad: 'linear-gradient(90deg, transparent, ' + accent + ', ' + hexColor + ', ' + dark + ', transparent)',
      titleGrad: 'linear-gradient(135deg, #0f172a 0%, #1e293b 35%, ' + dark + ' 70%, ' + hexColor + ' 100%)'
    };
  }

  // Aliases for canonical key variants
  DOMAIN_PALETTES['zenve-fashion'] = DOMAIN_PALETTES['fashion'];
  DOMAIN_PALETTES['alerts-notifications'] = DOMAIN_PALETTES['alerts'];

  // Pre-generate authoritative themes for all domains
  var THEMES = {};
  Object.keys(DOMAIN_PALETTES).forEach(function (key) {
    var p = DOMAIN_PALETTES[key];
    THEMES[key] = buildTheme(p.title, p.color, p.tag);
  });
  // Add theme aliases
  THEMES['zenve-fashion'] = THEMES['fashion'];
  THEMES['alerts-notifications'] = THEMES['alerts'];
  // Default fallback theme (Executive Sky Blue #38bdf8)
  THEMES['default'] = THEMES['executive-dashboard'];

  /**
   * Intelligently resolves the active theme key by inspecting:
   * 1. moduleName (parent domain passed from router)
   * 2. targetName (subdomain lookup via SUBDOMAIN_TO_DOMAIN_KEY or ROUTE_MAP)
   * 3. window.location.hash
   * 4. Currently expanded/active domain in DOM
   * 5. Deterministic fallback to 'executive-dashboard' (Never random!)
   */
  function resolveThemeKey(targetName, moduleName) {
    // 1. Module Name Priority (Direct Parent Domain)
    if (moduleName && typeof moduleName === 'string') {
      var modNorm = moduleName.trim().toLowerCase();
      if (DOMAIN_ALIASES[modNorm]) {
        return DOMAIN_ALIASES[modNorm];
      }
      if (DOMAIN_PALETTES[modNorm]) {
        return modNorm;
      }
      // Check partial alias containment
      var aliasKeys = Object.keys(DOMAIN_ALIASES);
      for (var i = 0; i < aliasKeys.length; i++) {
        var ak = aliasKeys[i];
        if (modNorm === ak || modNorm.indexOf(ak) !== -1 || ak.indexOf(modNorm) !== -1) {
          return DOMAIN_ALIASES[ak];
        }
      }
    }

    // 2. Subdomain Lookup Table (Inheritance from destination subdomain)
    if (targetName && typeof targetName === 'string') {
      var tgtNorm = targetName.replace(/^[•·●\s]+/, '').trim().toLowerCase();
      if (SUBDOMAIN_TO_DOMAIN_KEY[tgtNorm]) {
        return SUBDOMAIN_TO_DOMAIN_KEY[tgtNorm];
      }
      if (DOMAIN_ALIASES[tgtNorm]) {
        return DOMAIN_ALIASES[tgtNorm];
      }
      if (DOMAIN_PALETTES[tgtNorm]) {
        return tgtNorm;
      }
    }

    // 3. Router ROUTE_MAP integration
    if (window.ZenveRouter && window.ZenveRouter.ROUTE_MAP && targetName) {
      var tKey = targetName.replace(/^[•·●\s]+/, '').trim().toLowerCase();
      var r = window.ZenveRouter.ROUTE_MAP[tKey];
      if (r && r.module) {
        var rMod = r.module.trim().toLowerCase();
        if (DOMAIN_ALIASES[rMod]) {
          return DOMAIN_ALIASES[rMod];
        }
      }
    }

    // 4. URL Hash Lookup
    if (window.location && window.location.hash) {
      var hashClean = window.location.hash.replace(/^#/, '').trim().toLowerCase();
      if (SUBDOMAIN_TO_DOMAIN_KEY[hashClean]) {
        return SUBDOMAIN_TO_DOMAIN_KEY[hashClean];
      }
      if (DOMAIN_ALIASES[hashClean]) {
        return DOMAIN_ALIASES[hashClean];
      }
      if (window.ZenveRouter && window.ZenveRouter.ROUTE_MAP) {
        var rKeys = Object.keys(window.ZenveRouter.ROUTE_MAP);
        for (var j = 0; j < rKeys.length; j++) {
          var item = window.ZenveRouter.ROUTE_MAP[rKeys[j]];
          if (item && ((item.hash && item.hash.replace(/^#/, '').toLowerCase() === hashClean) || (item.tab && item.tab.toLowerCase() === hashClean))) {
            if (item.module && DOMAIN_ALIASES[item.module.toLowerCase()]) {
              return DOMAIN_ALIASES[item.module.toLowerCase()];
            }
          }
        }
      }
    }

    // 5. Active DOM Sidebar Domain Inspection
    try {
      var activeDomainBtn = document.querySelector('.sidebar-scope nav button[aria-expanded="true"], .sidebar-nav-active');
      if (activeDomainBtn) {
        var dAttr = (activeDomainBtn.getAttribute('data-domain') || '').trim().toLowerCase();
        if (dAttr && DOMAIN_ALIASES[dAttr]) {
          return DOMAIN_ALIASES[dAttr];
        }
      }
    } catch (e) {}

    // 6. Deterministic default fallback (Never random!)
    return 'executive-dashboard';
  }

  function getLoaderMarkup() {
    var starFlarePath = 'M12 0 C12 6.5, 17.5 12, 24 12 C17.5 12, 12 17.5, 12 24 C12 17.5, 6.5 12, 0 12 C6.5 12, 12 6.5, 12 0 Z';

    function starSvg(sizeClass, isEightPoint, delayClass) {
      var extra = isEightPoint
        ? '<path d="' + starFlarePath + '" fill="url(#zdlThemeStarGrad)" transform="rotate(45 12 12) scale(0.62)" transform-origin="center" />'
        : '';
      var coreRadius = sizeClass === 'zdl-star-lg' ? '3' : (sizeClass === 'zdl-star-md' ? '2.2' : '1.8');
      return [
        '<svg viewBox="0 0 24 24" class="zdl-star ' + sizeClass + ' ' + (delayClass || '') + '">',
        '  <path d="' + starFlarePath + '" fill="url(#zdlThemeStarGrad)" />',
        extra,
        '  <circle cx="12" cy="12" r="' + coreRadius + '" fill="#ffffff" />',
        '</svg>'
      ].join('');
    }

    return [
      '<!-- Dynamic SVG Definitions for Themed Celestial Stars -->',
      '<svg width="0" height="0" style="position:absolute;visibility:hidden;pointer-events:none;">',
      '  <defs>',
      '    <linearGradient id="zdlThemeStarGrad" x1="0%" y1="0%" x2="100%" y2="100%">',
      '      <stop offset="0%" stop-color="#ffffff" />',
      '      <stop offset="25%" stop-color="#bae6fd" />',
      '      <stop offset="65%" stop-color="#38bdf8" />',
      '      <stop offset="100%" stop-color="#38bdf8" />',
      '    </linearGradient>',
      '    <linearGradient id="zdlGoldStarGrad" x1="0%" y1="0%" x2="100%" y2="100%">',
      '      <stop offset="0%" stop-color="#ffffff" />',
      '      <stop offset="25%" stop-color="#bae6fd" />',
      '      <stop offset="65%" stop-color="#38bdf8" />',
      '      <stop offset="100%" stop-color="#38bdf8" />',
      '    </linearGradient>',
      '  </defs>',
      '</svg>',
      '<div class="zdl-stage">',
      '  <!-- Starlight Ambient Radiance Aura -->',
      '  <div class="zdl-ambient-aura"></div>',
      '  <!-- Orbit Tracks -->',
      '  <div class="zdl-orbit-track-outer"></div>',
      '  <div class="zdl-orbit-track-inner"></div>',
      '  <div class="zdl-logo-halo"></div>',
      '  <!-- Central Zenve Logo in a Circular Badge -->',
      '  <div class="zdl-emblem-core">',
      '    <img src="/zenve-logo.png" alt="Zenve Logo" onerror="this.src=\'/assets/zenve-logo.png\'" />',
      '  </div>',
      '  <!-- OUTER REVOLVING ORBIT WITH STARS -->',
      '  <div class="zdl-orbit-outer">',
      '    <div class="zdl-star-holder zdl-star-pos-0">' + starSvg('zdl-star-lg', true, 'zdl-delay-0') + '</div>',
      '    <div class="zdl-star-holder zdl-star-pos-60">' + starSvg('zdl-star-md', false, 'zdl-delay-1') + '</div>',
      '    <div class="zdl-star-holder zdl-star-pos-120">' + starSvg('zdl-star-sm', false, 'zdl-delay-2') + '</div>',
      '    <div class="zdl-star-holder zdl-star-pos-180">' + starSvg('zdl-star-lg', true, 'zdl-delay-3') + '</div>',
      '    <div class="zdl-star-holder zdl-star-pos-240">' + starSvg('zdl-star-md', false, 'zdl-delay-4') + '</div>',
      '    <div class="zdl-star-holder zdl-star-pos-300">' + starSvg('zdl-star-sm', false, 'zdl-delay-5') + '</div>',
      '  </div>',
      '  <!-- INNER REVOLVING COUNTER-ORBIT WITH STARS -->',
      '  <div class="zdl-orbit-inner">',
      '    <div class="zdl-star-holder zdl-star-pos-in-45">' + starSvg('zdl-star-md', false, 'zdl-delay-2') + '</div>',
      '    <div class="zdl-star-holder zdl-star-pos-in-135">' + starSvg('zdl-star-xs', false, 'zdl-delay-3') + '</div>',
      '    <div class="zdl-star-holder zdl-star-pos-in-225">' + starSvg('zdl-star-md', false, 'zdl-delay-4') + '</div>',
      '    <div class="zdl-star-holder zdl-star-pos-in-315">' + starSvg('zdl-star-xs', false, 'zdl-delay-1') + '</div>',
      '  </div>',
      '  <!-- Twinkling Stardust Embers -->',
      '  <div class="zdl-stardust zdl-dust-1"></div>',
      '  <div class="zdl-stardust zdl-dust-2"></div>',
      '  <div class="zdl-stardust zdl-dust-3"></div>',
      '  <div class="zdl-stardust zdl-dust-4"></div>',
      '</div>',
      '<div class="zdl-caption">',
      '  <div class="zdl-category-pill" id="zdl-category-pill">Executive Control</div>',
      '  <div class="zdl-title">ZENVE INTELLIGENCE</div>',
      '  <div class="zdl-subtitle">',
      '    <span class="zdl-status-dot"></span>',
      '    <span id="zdl-target-label">Synchronizing Dashboard...</span>',
      '  </div>',
      '  <div class="zdl-progress-track">',
      '    <div class="zdl-progress-runner"></div>',
      '  </div>',
      '</div>'
    ].join('\n');
  }

  function ensureLoaderElement() {
    var el = document.getElementById(LOADER_ID);
    if (!el) {
      el = document.createElement('div');
      el.id = LOADER_ID;
      el.innerHTML = getLoaderMarkup();
      document.body.appendChild(el);
    }
    return el;
  }

  /**
   * Applies all theme colors and CSS variables to the loader overlay and SVG gradients.
   * Every revolving star receives the exact font color of the selected parent domain.
   */
  function applyTheme(themeKey, theme) {
    var loader = ensureLoaderElement();
    if (!loader || !theme) return;

    loader.setAttribute('data-theme', themeKey);
    loader.setAttribute('data-domain-color', theme.domainColor || theme.primary);

    // Apply CSS custom properties dynamically
    loader.style.setProperty('--zdl-primary', theme.domainColor || theme.primary);
    loader.style.setProperty('--zdl-secondary', theme.domainColor || theme.secondary);
    loader.style.setProperty('--zdl-light', theme.light);
    loader.style.setProperty('--zdl-dark', theme.dark);
    loader.style.setProperty('--zdl-accent', theme.accent);
    loader.style.setProperty('--zdl-glow', theme.glow);
    loader.style.setProperty('--zdl-glow-border', theme.glowBorder);
    loader.style.setProperty('--zdl-core-border', theme.coreBorder);
    loader.style.setProperty('--zdl-core-inner', theme.coreInner);
    loader.style.setProperty('--zdl-bg-tint', theme.bgTint);
    loader.style.setProperty('--zdl-badge-bg', theme.badgeBg);
    loader.style.setProperty('--zdl-badge-border', theme.badgeBorder);
    loader.style.setProperty('--zdl-badge-color', theme.badgeColor);
    loader.style.setProperty('--zdl-star-color', theme.domainColor || theme.primary);
    loader.style.setProperty('--zdl-star-glow1', theme.starGlow1);
    loader.style.setProperty('--zdl-star-glow2', theme.starGlow2);
    loader.style.setProperty('--zdl-runner-grad', theme.runnerGrad);
    loader.style.setProperty('--zdl-title-grad', theme.titleGrad);

    // Update SVG star gradients dynamically matching the exact parent domain font color
    var starColor = theme.domainColor || theme.primary;
    var grad = document.getElementById('zdlThemeStarGrad');
    if (grad) {
      grad.innerHTML = [
        '<stop offset="0%" stop-color="#ffffff" />',
        '<stop offset="25%" stop-color="' + theme.light + '" />',
        '<stop offset="65%" stop-color="' + starColor + '" />',
        '<stop offset="100%" stop-color="' + starColor + '" />'
      ].join('');
    }
    var goldGrad = document.getElementById('zdlGoldStarGrad');
    if (goldGrad) {
      goldGrad.innerHTML = [
        '<stop offset="0%" stop-color="#ffffff" />',
        '<stop offset="25%" stop-color="' + theme.light + '" />',
        '<stop offset="65%" stop-color="' + starColor + '" />',
        '<stop offset="100%" stop-color="' + starColor + '" />'
      ].join('');
    }

    // Update domain pill badge
    var pillEl = document.getElementById('zdl-category-pill');
    if (pillEl) {
      pillEl.textContent = theme.tag || theme.domainTitle || 'Zenve Intelligence';
    }
  }

  function show(targetName, moduleName) {
    if (_hideTimer) {
      clearTimeout(_hideTimer);
      _hideTimer = null;
    }
    var loader = ensureLoaderElement();

    // 1. Resolve theme strictly based on destination dashboard's parent domain
    var themeKey = resolveThemeKey(targetName, moduleName);
    var theme = THEMES[themeKey] || THEMES['default'];
    applyTheme(themeKey, theme);

    // 2. Set synchronous label with clean target name
    var labelEl = document.getElementById('zdl-target-label');
    if (labelEl) {
      var displayTarget = targetName || moduleName || theme.tag || 'Dashboard';
      displayTarget = displayTarget.replace(/^[•·●\s]+/, '').trim();
      labelEl.textContent = 'Synchronizing ' + displayTarget + '...';
    }

    loader.classList.add('zdl-active');
    _lastShownAt = Date.now();

    // Safety timeout: auto-hide after 2500ms max so user is never frozen
    _hideTimer = setTimeout(function () {
      if (loader.classList.contains('zdl-active')) {
        loader.classList.remove('zdl-active');
      }
    }, 2500);
  }

  function hide(callback) {
    var elapsed = Date.now() - _lastShownAt;
    var remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);

    if (_hideTimer) clearTimeout(_hideTimer);

    _hideTimer = setTimeout(function () {
      var loader = document.getElementById(LOADER_ID);
      if (loader) {
        loader.classList.remove('zdl-active');
      }
      if (typeof callback === 'function') {
        callback();
      }
    }, remaining);
  }

  // Pre-instantiate loader early so elements and fonts are ready instantly
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      ensureLoaderElement();
    });
  } else {
    ensureLoaderElement();
  }

  // Expose global API attached to window
  window.ZenveDragonLoader = {
    show: show,
    hide: hide,
    applyTheme: applyTheme,
    getTheme: function(key) { return THEMES[key] || THEMES[resolveThemeKey(key, null)]; },
    getThemeKey: resolveThemeKey,
    DOMAIN_PALETTES: DOMAIN_PALETTES,
    THEMES: THEMES
  };
})();
