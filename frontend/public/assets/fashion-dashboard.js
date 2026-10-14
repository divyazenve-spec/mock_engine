/* =====================================================================
   Zenve BI — Zenve Fashion & Haute Couture Executive Control Center
   Suite (10 Subdomains):
     1. Fashion Dashboard      (#fashion-dashboard / #zenve-fashion)
     2. Fashion Products       (#fashion-products)
     3. Fashion Orders         (#fashion-orders)
     4. Fashion Customers      (#fashion-customers)
     5. Fashion Inventory      (#fashion-inventory)
     6. Fashion Showrooms      (#fashion-showrooms)
     7. Online Fashion Sales   (#online-fashion-sales)
     8. Fashion Revenue        (#fashion-revenue)
     9. Fashion Profitability  (#fashion-profitability)
     10. Fashion Collections   (#fashion-collections)
   ===================================================================== */

(function () {
  'use strict';

  function esc(s) {
    if (s == null) return '';
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ── 10 Subdomains Configuration ─────────────────────────────────── */
  var TABS = [
    { id: 'dashboard',     label: 'Fashion Dashboard',     icon: '🎀', hash: '#fashion-dashboard',     badge: '',    title: 'Zenve Pet Haute Couture & Lifestyle Command Center', sub: 'Bespoke luxury pet apparel, flagship showroom footfalls, online drops, and premium lifestyle unit economics' },
    { id: 'products',      label: 'Fashion Products',      icon: '👗', hash: '#fashion-products',      badge: '',     title: 'Haute Couture Product Line & Sizing Master', sub: 'Bespoke pet apparel catalog, fabric specifications, ergonomic sizing matrices, and retail inventory valuation' },
    { id: 'orders',        label: 'Fashion Orders',        icon: '🛍️', hash: '#fashion-orders',        badge: '',     title: 'Fashion Orders & Tailoring Pipeline', sub: 'Bespoke atelier tailoring queues, showroom styling orders, online drops, and custom monogram fulfillment' },
    { id: 'customers',     label: 'Fashion Customers',     icon: '💎', hash: '#fashion-customers',     badge: '',      title: 'Haute Couture Clientele & Pet Sizing Profiles', sub: 'Exclusive pet fashion client directory, precision ergonomic sizing records, lifetime value, and styling consultation history' },
    { id: 'inventory',     label: 'Fashion Inventory',     icon: '📦', hash: '#fashion-inventory',     badge: '',  title: 'Fashion Stock Allocation & Sizing Matrix', sub: 'Finished pet garments distribution across sizing grids (XS to XXL), raw atelier materials, and showroom stock cover' },
    { id: 'showrooms',     label: 'Fashion Showrooms',     icon: '🛍️', hash: '#fashion-showrooms',     badge: '',    title: 'Flagship Pet Couture Showrooms & Experience Centers', sub: 'Physical boutique performance, in-store trial room conversions, pet footfall, and retail revenue per square foot' },
    { id: 'online-sales',  label: 'Online Fashion Sales',  icon: '📱', hash: '#online-fashion-sales',  badge: '', title: 'Online Fashion E-Commerce & Digital Drops', sub: 'Mobile app luxury storefront, limited-edition drop sell-through, digital 3D sizing guide, and social commerce' },
    { id: 'revenue',       label: 'Fashion Revenue',       icon: '💵', hash: '#fashion-revenue',       badge: '',     title: 'Fashion Revenue Streams & Financial Trajectory', sub: 'Financial performance across apparel lines, seasonal holiday surges, geographic luxury hubs, and channel distribution' },
    { id: 'profitability', label: 'Fashion Profitability', icon: '💎', hash: '#fashion-profitability', badge: '',   title: 'Fashion Margins, COGS & Contribution Profitability', sub: 'Bespoke pet apparel unit economics, artisan atelier labor costs, channel contribution margins, and markdown protection' },
    { id: 'collections',   label: 'Fashion Collections',   icon: '✨', hash: '#fashion-collections',   badge: '',   title: 'Haute Couture Collections & Designer Runway Drops', sub: 'Limited-edition seasonal capsule launches, sell-through velocity, fabric sourcing lead times, and designer portfolios' }
  ];

    /* ── Master Datasets ─────────────────────────────────────────────── */
  var PRODUCTS = [
    { sku: 'ZFS-0101', name: 'Royal Brocade Pet Sherwani', cat: 'Formal Atelier', petType: 'Dog (All Breeds)', sizes: 'S, M, L, XL', material: 'Benarasi Silk & Gold Zari', price: '₹4,850', cost: '₹1,420', stock: 38, margin: '70.7%', status: 'In Stock' },
    { sku: 'ZFS-0102', name: 'Italian Nappa Leather Harness', cat: 'Ergonomic Harnesses', petType: 'Dog (Med/Large)', sizes: 'S, M, L', material: 'Full-Grain Nappa & Brass', price: '₹3,650', cost: '₹1,120', stock: 52, margin: '69.3%', status: 'In Stock' },
    { sku: 'ZFS-0103', name: 'Himalayan Cashmere Knit Sweater', cat: 'Winter Knits', petType: 'Dog & Cat', sizes: 'XS, S, M, L', material: '100% Grade-A Cashmere', price: '₹2,950', cost: '₹860', stock: 44, margin: '70.8%', status: 'In Stock' },
    { sku: 'ZFS-0104', name: 'Alpine StormShield Waterproof Trench', cat: 'Weatherwear', petType: 'Dog (All Breeds)', sizes: 'S, M, L, XL, XXL', material: '3-Layer GORE-TEX Membrane', price: '₹4,200', cost: '₹1,340', stock: 65, margin: '68.1%', status: 'In Stock' },
    { sku: 'ZFS-0105', name: 'Florentine Calfskin Collar & Leash', cat: 'Collars & Leashes', petType: 'Dog & Cat', sizes: 'XS, S, M, L', material: 'Tuscan Vegetable Leather', price: '₹3,200', cost: '₹950', stock: 78, margin: '70.3%', status: 'In Stock' },
    { sku: 'ZFS-0106', name: 'Monaco Riviera Linen Sailor Polo', cat: 'Loungewear', petType: 'Dog (Small/Med)', sizes: 'XS, S, M, L', material: 'Organic French Flax Linen', price: '₹2,150', cost: '₹620', stock: 30, margin: '71.2%', status: 'In Stock' },
    { sku: 'ZFS-0107', name: 'Velvet Evening Tuxedo & Bowtie', cat: 'Formal Atelier', petType: 'Dog (All Breeds)', sizes: 'S, M, L, XL', material: 'Italian Velvet & Mulberry Silk', price: '₹5,400', cost: '₹1,680', stock: 22, margin: '68.9%', status: 'Low Stock' },
    { sku: 'ZFS-0108', name: 'All-Terrain Orthopedic Rain Booties', cat: 'Footwear', petType: 'Dog (All Breeds)', sizes: 'S, M, L, XL', material: 'Natural Vulcanized Rubber', price: '₹1,850', cost: '₹580', stock: 85, margin: '68.6%', status: 'In Stock' },
    { sku: 'ZFS-0109', name: '24K Gold-Plated Bespoke ID Medallion', cat: 'Accessories', petType: 'Dog & Cat', sizes: 'One Size', material: 'Solid Brass with 24K Gold', price: '₹2,450', cost: '₹690', stock: 96, margin: '71.8%', status: 'In Stock' },
    { sku: 'ZFS-0110', name: 'Merino Wool Thermal Base Layer', cat: 'Winter Knits', petType: 'Cat & Toy Dogs', sizes: 'XS, S, M', material: '100% Australian Merino Wool', price: '₹2,250', cost: '₹680', stock: 40, margin: '69.8%', status: 'In Stock' }
  ];

  var ORDERS = [
    { orderId: 'ORD-F801', customer: 'Natasha Poonawalla', pet: 'Princess (Maltipoo)', items: 'Royal Brocade Pet Sherwani + Gold ID', channel: 'Bandra Boutique', customDetails: 'Gold Monogram "P"', value: '₹7,300', date: '2026-10-14', payment: 'Amex Centurion', status: 'In Tailoring' },
    { orderId: 'ORD-F802', customer: 'Vikram Oberoi', pet: 'Thor (Golden Retriever)', items: 'Italian Leather Harness + Leash', channel: 'Online Store Drop', customDetails: 'Brass Nameplate Engraved', value: '₹6,850', date: '2026-10-14', payment: 'Razorpay CC', status: 'Dispatched' },
    { orderId: 'ORD-F803', customer: 'Tanya Dubash', pet: 'Bella (Shih Tzu)', items: 'Cashmere Sweater + Linen Polo', channel: 'Indiranagar Studio', customDetails: 'Custom Back Length (32cm)', value: '₹5,100', date: '2026-10-13', payment: 'NetBanking', status: 'Delivered' },
    { orderId: 'ORD-F804', customer: 'Rohit Singhania', pet: 'Simba (French Bulldog)', items: 'Velvet Evening Tuxedo & Bowtie', channel: 'Koramangala Lounge', customDetails: 'Silk Collar Initial "S"', value: '₹5,400', date: '2026-10-13', payment: 'POS Card', status: 'Delivered' },
    { orderId: 'ORD-F805', customer: 'Meera Deora', pet: 'Coco (Persian Cat)', items: 'Merino Thermal Layer + Calfskin Collar', channel: 'Concierge Atelier', customDetails: 'Made-to-Measure Cat Pattern', value: '₹5,450', date: '2026-10-13', payment: 'UPI Instant', status: 'Delivered' },
    { orderId: 'ORD-F806', customer: 'Kabir Wadia', pet: 'Ghost (Siberian Husky)', items: 'Alpine StormShield Trench (XXL)', channel: 'Bandra Boutique', customDetails: 'High-Vis Patch "GHOST"', value: '₹4,200', date: '2026-10-12', payment: 'Apple Pay', status: 'Delivered' },
    { orderId: 'ORD-F807', customer: 'Ananya Birla', pet: 'Mochi (Pomeranian)', items: 'Monaco Linen Polo + Rose Gold Leash', channel: 'Online Store Drop', customDetails: 'Rose Gold Charm Engraving', value: '₹4,350', date: '2026-10-12', payment: 'Razorpay CC', status: 'Delivered' },
    { orderId: 'ORD-F808', customer: 'Devika Ruia', pet: 'Zara (Beagle)', items: 'Orthopedic Rain Booties (Set of 4)', channel: 'Indiranagar Studio', customDetails: 'In-Store Paw Sizing Verified', value: '₹1,850', date: '2026-10-12', payment: 'UPI Instant', status: 'Delivered' },
    { orderId: 'ORD-F809', customer: 'Siddharth Goenka', pet: 'Bruno (Labrador)', items: 'Alpine StormShield + Leather Harness', channel: 'Online Store Drop', customDetails: 'Reflective Name Stamping', value: '₹7,850', date: '2026-10-11', payment: 'Visa Infinite', status: 'Delivered' },
    { orderId: 'ORD-F810', customer: 'Rhea Kapoor', pet: 'Leo (Toy Poodle)', items: 'Royal Brocade Sherwani + Velvet Bowtie', channel: 'Concierge Atelier', customDetails: 'Bridal Collection Custom Fit', value: '₹6,900', date: '2026-10-11', payment: 'Amex Platinum', status: 'Delivered' }
  ];

  var SHOWROOMS = [
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

  /* ── State ───────────────────────────────────────────────────────── */
  var S = {
    open: false,
    tab: 'dashboard',
    productCat: 'ALL',
    productSearch: '',
    orderChannel: 'ALL',
    orderSearch: '',
    customerTier: 'ALL',
    customerSearch: ''
  };

  var root = null;

  /* ── Route Resolution ────────────────────────────────────────────── */
  function tabFromHash(hash) {
    if (!hash) return null;
    var h = (hash.startsWith('#') ? hash.slice(1) : hash).toLowerCase();
    if (h.indexOf('report') >= 0 || h.indexOf('alert') >= 0 || h.indexOf('clinic') >= 0 || h.indexOf('pharmacy') >= 0 || h.indexOf('vendor') >= 0 || h.indexOf('procurement') >= 0) {
      return null;
    }
    if (h === 'fashion-dashboard' || h === 'zenve-fashion' || h === 'fashion' || h === 'pet-fashion') return 'dashboard';
    if (h === 'fashion-products' || h === 'fashion-catalog' || h === 'fashion-product') return 'products';
    if (h === 'fashion-orders' || h === 'fashion-order') return 'orders';
    if (h === 'fashion-customers' || h === 'fashion-clients') return 'customers';
    if (h === 'fashion-inventory' || h === 'fashion-stock') return 'inventory';
    if (h === 'fashion-showrooms' || h === 'pet-boutiques' || h === 'showrooms') return 'showrooms';
    if (h === 'online-fashion-sales' || h === 'online-fashion') return 'online-sales';
    if (h === 'fashion-revenue') return 'revenue';
    if (h === 'fashion-profitability' || h === 'fashion-margins') return 'profitability';
    if (h === 'fashion-collections' || h === 'fashion-capsules' || h === 'collections') return 'collections';
    return null;
  }

  function tabFromText(txt) {
    if (!txt) return null;
    var raw = txt.replace(/\s+/g, ' ').trim().toLowerCase();
    if (raw.indexOf('report') >= 0 || raw.indexOf('alert') >= 0 || raw.indexOf('vendor') >= 0 || raw.indexOf('finance') >= 0) return null;

    if (raw === 'fashion dashboard' || raw === 'zenve fashion' || raw === 'pet fashion & lifestyle') return 'dashboard';
    if (raw === 'fashion products') return 'products';
    if (raw === 'fashion orders') return 'orders';
    if (raw === 'fashion customers') return 'customers';
    if (raw === 'fashion inventory') return 'inventory';
    if (raw === 'fashion showrooms') return 'showrooms';
    if (raw === 'online fashion sales' || raw === 'online fashion') return 'online-sales';
    if (raw === 'fashion revenue') return 'revenue';
    if (raw === 'fashion profitability') return 'profitability';
    if (raw === 'fashion collections') return 'collections';
    return null;
  }

  /* ── KPI Helper ──────────────────────────────────────────────────── */
  function kpiHtml(label, val, delta, trend, subtext, icon) {
    return [
      '<div class="zfsh-kpi">',
        '<div class="zfsh-kpi-top">',
          '<span class="zfsh-kpi-label">' + esc(label) + '</span>',
          '<span class="zfsh-kpi-icon">' + esc(icon || '🎀') + '</span>',
        '</div>',
        '<div class="zfsh-kpi-val">' + esc(val) + '</div>',
        '<div class="zfsh-kpi-bottom">',
          '<span class="zfsh-delta ' + (trend === 'up' ? 'up' : trend === 'down' ? 'down' : 'warn') + '">' + (trend === 'up' ? '↑ ' : trend === 'down' ? '↓ ' : '• ') + esc(delta) + '</span>',
          '<span class="zfsh-subtext">' + esc(subtext) + '</span>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Render Subdomains ───────────────────────────────────────────── */
    function renderDashboard() {
    return [
      '<div class="zfsh-kpi-grid">',
        kpiHtml('Fashion Gross Revenue (MTD)', '₹48.60L', '+34.8%', 'up', 'Combined online & boutique', '🎀'),
        kpiHtml('Apparel Units Sold', '730 Items', '+22.4%', 'up', 'Average 2.4 items/cart', '👗'),
        kpiHtml('Blended Gross Margin', '68.4%', '+3.1%', 'up', 'High atelier contribution', '💎'),
        kpiHtml('Flagship Showroom Footfall', '1,640 Visitors', '+18.5%', 'up', 'BLR & MUM Boutiques', '🛍️'),
        kpiHtml('Bespoke Atelier Orders', '64 Custom', '100% Fit', 'up', 'Handcrafted tailored fit', '✂️'),
        kpiHtml('Return & Exchange Rate', '1.2%', '-1.4%', 'up', 'Precision 3D pet sizing', '📐'),
      '</div>',

      '<div class="zfsh-grid-2">',
        '<div class="zfsh-card">',
          '<div class="zfsh-card-head">',
            '<div>',
              '<h3 class="zfsh-card-title">👗 Best-Selling Pet Couture Lines</h3>',
              '<p class="zfsh-card-sub">Top apparel velocity across Italian leather, rainwear, and cashmere knits</p>',
            '</div>',
            '<button class="zfsh-btn primary" onclick="ZenveFashionDashboard.showAddStyleModal()">+ Add Style</button>',
          '</div>',
          '<div class="zfsh-table-wrap">',
            '<table class="zfsh-table">',
              '<thead><tr><th>SKU</th><th>Product Name</th><th>Category</th><th>Retail Price</th><th>Stock</th><th>Margin</th><th>Status</th></tr></thead>',
              '<tbody>',
                (PRODUCTS.length ? PRODUCTS.slice(0, 10).map(function (p) {
                  return '<tr>' +
                    '<td style="font-family:monospace;color:#f472b6;font-size:11px;">' + esc(p.sku) + '</td>' +
                    '<td style="font-weight:600;color:var(--foreground,#0f172a);">' + esc(p.name) + '</td>' +
                    '<td style="color:var(--muted-foreground,#64748b);">' + esc(p.cat) + '</td>' +
                    '<td style="font-family:monospace;font-weight:700;color:#34d399;">' + esc(p.price) + '</td>' +
                    '<td style="color:var(--foreground,#334155);">' + esc(p.stock) + '</td>' +
                    '<td style="font-weight:700;color:#a78bfa;">' + esc(p.margin) + '</td>' +
                    '<td><span class="zfsh-tag green">' + esc(p.status) + '</span></td>' +
                  '</tr>';
                }).join('') : '<tr><td colspan="7" style="text-align:center;padding:24px;color:#94a3b8;">No best-selling couture records found</td></tr>'),
              '</tbody>',
            '</table>',
          '</div>',
        '</div>',

        '<div class="zfsh-card">',
          '<div class="zfsh-card-head">',
            '<div>',
              '<h3 class="zfsh-card-title">🛍️ Flagship Boutique Experience Metrics</h3>',
              '<p class="zfsh-card-sub">Footfall, trial room conversions, and average order value</p>',
            '</div>',
            '<button class="zfsh-btn" onclick="ZenveFashionDashboard.switchTab(\'showrooms\')">All Boutiques</button>',
          '</div>',
          '<div style="display:grid;gap:12px;">',
            (SHOWROOMS.length ? SHOWROOMS.slice(0, 5).map(function (s) {
              return '<div style="background:rgba(0,0,0,0.22);border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:14px;">' +
                '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">' +
                  '<strong style="font-size:13px;color:var(--foreground,#0f172a);">' + esc(s.name) + '</strong>' +
                  '<span style="padding:2px 7px;border-radius:4px;font-size:10px;font-weight:700;background:rgba(251,191,36,0.15);color:#fbbf24;">' + esc(s.rating) + '</span>' +
                '</div>' +
                '<div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:6px;font-size:11px;">' +
                  '<div><span style="color:#64748b;">Footfall:</span> <strong style="color:var(--foreground,#334155);">' + esc(s.footfall) + '</strong></div>' +
                  '<div><span style="color:#64748b;">Sales:</span> <strong style="color:#34d399;font-family:monospace;">' + esc(s.sales) + '</strong></div>' +
                  '<div><span style="color:#64748b;">Conversion:</span> <strong style="color:#38bdf8;">' + esc(s.conversion) + '</strong></div>' +
                '</div>' +
              '</div>';
            }).join('') : '<div style="padding:20px;text-align:center;color:#94a3b8;font-size:12px;">No boutique experience records found</div>'),
          '</div>',
        '</div>',
      '</div>'
    ].join('');
  }

    function renderProducts() {
    return [
      '<div class="zfsh-kpi-grid">',
        kpiHtml('Active Fashion SKUs', '42 Styles', '8 Categories', 'up', 'Across apparel & leather', '👗'),
        kpiHtml('Avg. Retail Price (ASP)', '₹3,420', '+14.2%', 'up', 'Luxury price realization', '🏷️'),
        kpiHtml('Average Product Margin', '69.8%', '+2.4%', 'up', 'Artisan direct production', '💎'),
        kpiHtml('Eco-Certified Fabrics', '92.4%', 'OEKO-TEX', 'up', 'Cruelty-free & organic', '🌱'),
        kpiHtml('Low Stock Styles', '2 SKUs', '<15u cover', 'warn', 'Replenishment queued', '⚠️'),
        kpiHtml('Custom Atelier Queue', '64 Orders', '4.8d TAT', 'up', 'Bespoke tailoring active', '✂️'),
      '</div>',

      '<div class="zfsh-card">',
        '<div class="zfsh-card-head">',
          '<div>',
            '<h3 class="zfsh-card-title">👗 Pet Fashion Master Catalog</h3>',
            '<p class="zfsh-card-sub">Fabrics, ergonomic cut specifications, and production unit economics</p>',
          '</div>',
          '<button class="zfsh-btn primary" onclick="ZenveFashionDashboard.showAddStyleModal()">+ Add New Style</button>',
        '</div>',

        '<div class="zfsh-table-wrap">',
          '<table class="zfsh-table">',
            '<thead><tr><th>SKU</th><th>Product Name</th><th>Category</th><th>Target Pet</th><th>Sizes</th><th>Price</th><th>Cost</th><th>Stock</th><th>Margin</th><th>Status</th></tr></thead>',
            '<tbody>',
              (PRODUCTS.length ? PRODUCTS.map(function (p) {
                return '<tr>' +
                  '<td style="font-family:monospace;color:#f472b6;font-size:11px;">' + esc(p.sku) + '</td>' +
                  '<td style="font-weight:600;color:var(--foreground,#0f172a);">' + esc(p.name) + '</td>' +
                  '<td style="color:var(--muted-foreground,#64748b);">' + esc(p.cat) + '</td>' +
                  '<td style="color:var(--foreground,#334155);">' + esc(p.petType) + '</td>' +
                  '<td style="color:#a78bfa;">' + esc(p.sizes) + '</td>' +
                  '<td style="font-family:monospace;font-weight:700;color:#34d399;">' + esc(p.price) + '</td>' +
                  '<td style="color:#64748b;">' + esc(p.cost) + '</td>' +
                  '<td style="color:var(--foreground,#0f172a);font-weight:600;">' + esc(p.stock) + '</td>' +
                  '<td style="font-weight:700;color:#a78bfa;">' + esc(p.margin) + '</td>' +
                  '<td><span class="zfsh-tag ' + (p.status === 'In Stock' ? 'green' : 'amber') + '">' + esc(p.status) + '</span></td>' +
                '</tr>';
              }).join('') : '<tr><td colspan="10" style="text-align:center;padding:24px;color:#94a3b8;">No fashion product records found</td></tr>'),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

    function renderOrders() {
    return [
      '<div class="zfsh-kpi-grid">',
        kpiHtml('Fashion Orders (MTD)', '730 Orders', '+24.6%', 'up', 'Showroom & e-commerce', '🛍️'),
        kpiHtml('Average Order Value', '₹6,650', '+₹820', 'up', 'Bundled collar & harness', '💳'),
        kpiHtml('Monogram Customization', '48.5%', '354 items', 'up', 'Custom name embroidery', '✨'),
        kpiHtml('In-Store Trial Conversion', '68.2%', '+4.1%', 'up', 'Pet dressing rooms', '🐕'),
        kpiHtml('Atelier Turnaround (TAT)', '4.8 Days', '-1.2d faster', 'up', 'Bespoke made-to-measure', '⏱️'),
        kpiHtml('On-Time Delivery Rate', '99.4%', 'Zero damage', 'up', 'Luxury packaging', '📦'),
      '</div>',

      '<div class="zfsh-card">',
        '<div class="zfsh-card-head">',
          '<div>',
            '<h3 class="zfsh-card-title">🛍️ Real-Time Fashion Order Stream</h3>',
            '<p class="zfsh-card-sub">Omnichannel pet fashion orders, custom monogramming details, and fulfillment statuses</p>',
          '</div>',
          '<button class="zfsh-btn primary" onclick="ZenveFashionDashboard.showBespokeOrderModal()">+ Bespoke Order</button>',
        '</div>',

        '<div class="zfsh-table-wrap">',
          '<table class="zfsh-table">',
            '<thead><tr><th>Order ID</th><th>Pet Parent & Pet</th><th>Items Ordered</th><th>Channel</th><th>Custom Details</th><th>Value</th><th>Date</th><th>Payment</th><th>Status</th></tr></thead>',
            '<tbody>',
              (ORDERS.length ? ORDERS.map(function (o) {
                return '<tr>' +
                  '<td style="font-family:monospace;color:#f472b6;font-size:11px;font-weight:600;">' + esc(o.orderId) + '</td>' +
                  '<td style="color:var(--foreground,#0f172a);font-weight:600;">' + esc(o.customer) + '<br/><span style="font-size:11px;color:#38bdf8;">' + esc(o.pet) + '</span></td>' +
                  '<td style="color:var(--foreground,#334155);">' + esc(o.items) + '</td>' +
                  '<td style="color:var(--muted-foreground,#64748b);">' + esc(o.channel) + '</td>' +
                  '<td style="color:#a78bfa;font-size:11px;">' + esc(o.customDetails) + '</td>' +
                  '<td style="font-family:monospace;font-weight:700;color:#34d399;">' + esc(o.value) + '</td>' +
                  '<td style="color:#64748b;font-size:11px;">' + esc(o.date) + '</td>' +
                  '<td style="color:var(--foreground,#334155);">' + esc(o.payment) + '</td>' +
                  '<td><span class="zfsh-tag ' + (o.status === 'Delivered' ? 'green' : o.status === 'Dispatched' ? 'blue' : 'pink') + '">' + esc(o.status) + '</span></td>' +
                '</tr>';
              }).join('') : '<tr><td colspan="9" style="text-align:center;padding:24px;color:#94a3b8;">No fashion order records found</td></tr>'),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

    function renderCustomers() {
    var vips = [
      { id: 'CLI-901', name: 'Natasha Poonawalla', pet: 'Princess', breed: 'Maltipoo', ltv: '₹3,48,000', orders: 42, tier: 'Platinum Atelier' },
      { id: 'CLI-902', name: 'Vikram Oberoi', pet: 'Thor', breed: 'Golden Retriever', ltv: '₹2,92,000', orders: 36, tier: 'Platinum Atelier' },
      { id: 'CLI-903', name: 'Tanya Dubash', pet: 'Bella', breed: 'Shih Tzu', ltv: '₹2,45,000', orders: 28, tier: 'Platinum Atelier' },
      { id: 'CLI-904', name: 'Rohit Singhania', pet: 'Simba', breed: 'French Bulldog', ltv: '₹2,15,000', orders: 25, tier: 'Platinum Atelier' },
      { id: 'CLI-905', name: 'Ananya Birla', pet: 'Mochi', breed: 'Pomeranian', ltv: '₹1,98,000', orders: 22, tier: 'Gold Couture' },
      { id: 'CLI-906', name: 'Devika Ruia', pet: 'Zara', breed: 'Beagle', ltv: '₹1,65,000', orders: 19, tier: 'Gold Couture' },
      { id: 'CLI-907', name: 'Kabir Wadia', pet: 'Ghost', breed: 'Siberian Husky', ltv: '₹1,78,000', orders: 18, tier: 'Gold Couture' },
      { id: 'CLI-908', name: 'Siddharth Goenka', pet: 'Bruno', breed: 'Labrador', ltv: '₹1,42,000', orders: 16, tier: 'Gold Couture' },
      { id: 'CLI-909', name: 'Rhea Kapoor', pet: 'Leo', breed: 'Toy Poodle', ltv: '₹1,56,000', orders: 17, tier: 'Gold Couture' },
      { id: 'CLI-910', name: 'Meera Deora', pet: 'Coco', breed: 'Persian Cat', ltv: '₹1,18,000', orders: 14, tier: 'Gold Couture' }
    ];

    return [
      '<div class="zfsh-kpi-grid">',
        kpiHtml('Total Couture Clients', '1,840 Parents', '+16.4%', 'up', 'Registered size profiles', '👥'),
        kpiHtml('Average Client LTV', '₹42,800', '+₹6,400', 'up', 'Across apparel & accessories', '💎'),
        kpiHtml('Repeat Purchase Rate', '64.8%', '+5.2%', 'up', 'Seasonal capsule drops', '🔄'),
        kpiHtml('Platinum VIP Members', '142 Clients', 'Spend > ₹1.5L', 'up', 'Bespoke atelier priority', '👑'),
        kpiHtml('Personal Stylist Bookings', '88 Sessions', '94% CSAT', 'up', 'In-showroom fittings', '✂️'),
        kpiHtml('Pet Sizing Accuracy', '98.8%', '3D scan fit', 'up', 'Virtually zero fit returns', '📐'),
      '</div>',

      '<div class="zfsh-card">',
        '<div class="zfsh-card-head">',
          '<div>',
            '<h3 class="zfsh-card-title">👑 VIP Pet Couture Clientele Roster</h3>',
            '<p class="zfsh-card-sub">Client measurement profiles, styling preferences, and lifetime luxury volume</p>',
          '</div>',
          '<button class="zfsh-btn primary" onclick="alert(\'Booking VIP private stylist consultation lounge session...\')">✨ Book Styling</button>',
        '</div>',

        '<div class="zfsh-table-wrap">',
          '<table class="zfsh-table">',
            '<thead><tr><th>Client ID</th><th>Pet Parent</th><th>Pet & Breed</th><th>Total LTV</th><th>Orders</th><th>VIP Tier</th><th>Action</th></tr></thead>',
            '<tbody>',
              (vips.length ? vips.map(function (v) {
                return '<tr>' +
                  '<td style="font-family:monospace;color:#f472b6;font-size:11px;">' + esc(v.id) + '</td>' +
                  '<td style="font-weight:600;color:var(--foreground,#0f172a);">' + esc(v.name) + '</td>' +
                  '<td style="color:var(--foreground,#334155);">' + esc(v.pet) + ' (' + esc(v.breed) + ')</td>' +
                  '<td style="font-family:monospace;font-weight:700;color:#34d399;">' + esc(v.ltv) + '</td>' +
                  '<td style="color:var(--foreground,#334155);">' + esc(v.orders) + ' orders</td>' +
                  '<td><span class="zfsh-tag ' + (v.tier === 'Platinum Atelier' ? 'pink' : 'amber') + '">' + esc(v.tier) + '</span></td>' +
                  '<td><button class="zfsh-btn" style="height:26px;padding:2px 8px;font-size:11px;" onclick="alert(\'Opening 3D sizing profile for ' + esc(v.pet) + '.\')">View Measurements</button></td>' +
                '</tr>';
              }).join('') : '<tr><td colspan="7" style="text-align:center;padding:24px;color:#94a3b8;">No VIP client records found</td></tr>'),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

    function renderInventory() {
    var rawMaterials = [
      { fabric: 'Grade-A Himalayan Cashmere Yarn', stock: '120 kg (480 Sweaters)', allocated: 'Winter Knitwear Line', leadTime: '18 days', reorder: 'Safe' },
      { fabric: 'Tuscan Full-Grain Vegetable Nappa Leather', stock: '420 sq meters', allocated: 'Luxury Harnesses & Collars', leadTime: '24 days', reorder: 'Safe' },
      { fabric: 'Benarasi Pure Silk Brocade with Real Zari', stock: '180 meters', allocated: 'Wedding Atelier Sherwanis', leadTime: '14 days', reorder: 'Safe' },
      { fabric: '3-Layer GORE-TEX Waterproof Membrane', stock: '350 meters', allocated: 'Alpine StormShield Line', leadTime: '21 days', reorder: 'Safe' }
    ];

    var sizeMatrix = [
      { sku: 'ZFS-0101', name: 'Royal Brocade Pet Sherwani', cat: 'Formal Atelier', xs: 6, s: 10, m: 12, l: 8, xl: 2, total: 38, val: '₹1,84,300', loc: 'Central Hub', status: 'Healthy' },
      { sku: 'ZFS-0102', name: 'Italian Nappa Leather Harness', cat: 'Ergonomic Harnesses', xs: 0, s: 14, m: 22, l: 16, xl: 0, total: 52, val: '₹1,89,800', loc: 'Central Hub', status: 'Healthy' },
      { sku: 'ZFS-0103', name: 'Himalayan Cashmere Knit Sweater', cat: 'Winter Knits', xs: 8, s: 14, m: 12, l: 10, xl: 0, total: 44, val: '₹1,29,800', loc: 'Central Hub', status: 'Healthy' },
      { sku: 'ZFS-0104', name: 'Alpine StormShield Waterproof Trench', cat: 'Weatherwear', xs: 4, s: 12, m: 20, l: 18, xl: 11, total: 65, val: '₹2,73,000', loc: 'Central Hub', status: 'Healthy' },
      { sku: 'ZFS-0105', name: 'Florentine Calfskin Collar & Leash', cat: 'Collars & Leashes', xs: 14, s: 22, m: 26, l: 16, xl: 0, total: 78, val: '₹2,49,600', loc: 'Bandra Boutique', status: 'Healthy' },
      { sku: 'ZFS-0106', name: 'Monaco Riviera Linen Sailor Polo', cat: 'Loungewear', xs: 6, s: 10, m: 8, l: 6, xl: 0, total: 30, val: '₹64,500', loc: 'Indiranagar Studio', status: 'Healthy' },
      { sku: 'ZFS-0107', name: 'Velvet Evening Tuxedo & Bowtie', cat: 'Formal Atelier', xs: 0, s: 6, m: 8, l: 6, xl: 2, total: 22, val: '₹1,18,800', loc: 'Bandra Boutique', status: 'Low Stock' },
      { sku: 'ZFS-0108', name: 'All-Terrain Orthopedic Rain Booties', cat: 'Footwear', xs: 0, s: 25, m: 32, l: 20, xl: 8, total: 85, val: '₹1,57,250', loc: 'Central Hub', status: 'Healthy' },
      { sku: 'ZFS-0109', name: '24K Gold-Plated Bespoke ID Medallion', cat: 'Accessories', xs: 0, s: 0, m: 96, l: 0, xl: 0, total: 96, val: '₹2,35,200', loc: 'Bandra Boutique', status: 'Healthy' },
      { sku: 'ZFS-0110', name: 'Merino Wool Thermal Base Layer', cat: 'Winter Knits', xs: 10, s: 16, m: 14, l: 0, xl: 0, total: 40, val: '₹90,000', loc: 'Indiranagar Studio', status: 'Healthy' }
    ];

    return [
      '<div class="zfsh-kpi-grid">',
        kpiHtml('Finished Apparel Valuation', '₹16.92L', '1,746 Units', 'up', 'Across all 3 locations', '💎'),
        kpiHtml('Raw Fabric Inventory', '₹8.40L', 'Certified Rolls', 'up', 'Italian leather & cashmere', '🧵'),
        kpiHtml('Sizing Completeness Rate', '96.2%', 'XS - XXL coverage', 'up', 'Zero stockouts on core sizes', '📐'),
        kpiHtml('Low Stock Styles (<20u)', '2 Styles', 'Tuxedo & Knits', 'warn', 'Replenishment in progress', '⚠️'),
        kpiHtml('Showroom Display Stock', '₹4.80L', 'Bandra + BLR', 'up', 'Trial room samples', '🛍️'),
        kpiHtml('Inventory Turnover Ratio', '4.6x', '+0.8x vs FY25', 'up', 'Rapid fashion cycles', '⚡'),
      '</div>',

      '<div class="zfsh-card" style="margin-bottom:18px;">',
        '<h3 class="zfsh-card-title" style="margin-bottom:16px;">🧵 Atelier Raw Fabric & Hardware Reserves</h3>',
        '<div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(240px, 1fr));gap:14px;">',
          rawMaterials.map(function (rm) {
            return '<div style="background:rgba(0,0,0,0.22);border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:16px;">' +
              '<div style="font-size:13px;font-weight:700;color:#f472b6;margin-bottom:6px;">' + esc(rm.fabric) + '</div>' +
              '<div style="font-size:16px;font-weight:800;color:var(--foreground,#0f172a);margin-bottom:8px;">' + esc(rm.stock) + '</div>' +
              '<div style="font-size:11px;color:var(--muted-foreground,#64748b);">Allocated to: <strong style="color:var(--foreground,#334155);">' + esc(rm.allocated) + '</strong></div>' +
              '<div style="margin-top:8px;display:flex;justify-content:space-between;font-size:11px;">' +
                '<span style="color:#64748b;">Lead: ' + esc(rm.leadTime) + '</span>' +
                '<span style="color:#34d399;font-weight:700;">' + esc(rm.reorder) + '</span>' +
              '</div>' +
            '</div>';
          }).join(''),
        '</div>',
      '</div>',

      '<div class="zfsh-card">',
        '<div class="zfsh-card-head">',
          '<div>',
            '<h3 class="zfsh-card-title">📦 Finished Garment Stock by Size Breakdown</h3>',
            '<p class="zfsh-card-sub">Unit distribution across sizing runs XS to XXL and hub locations</p>',
          '</div>',
          '<button class="zfsh-btn" onclick="alert(\'Rebalance stock requested across Mumbai and Bengaluru hubs.\')">🔄 Rebalance Stock</button>',
        '</div>',

        '<div class="zfsh-table-wrap">',
          '<table class="zfsh-table">',
            '<thead><tr><th>SKU Code</th><th>Product Name</th><th>Category</th><th>XS</th><th>S</th><th>M</th><th>L</th><th>XL</th><th>Total Stock</th><th>Valuation</th><th>Location</th><th>Status</th></tr></thead>',
            '<tbody>',
              (sizeMatrix.map(function (p) {
                return '<tr>' +
                  '<td style="font-family:monospace;color:#f472b6;font-size:11px;">' + esc(p.sku) + '</td>' +
                  '<td style="font-weight:600;color:var(--foreground,#0f172a);">' + esc(p.name) + '</td>' +
                  '<td style="color:var(--muted-foreground,#64748b);">' + esc(p.cat) + '</td>' +
                  '<td style="color:var(--foreground,#334155);">' + p.xs + '</td><td style="color:var(--foreground,#334155);">' + p.s + '</td><td style="color:var(--foreground,#334155);">' + p.m + '</td><td style="color:var(--foreground,#334155);">' + p.l + '</td><td style="color:var(--foreground,#334155);">' + p.xl + '</td>' +
                  '<td style="font-weight:700;color:var(--foreground,#0f172a);">' + esc(p.total) + '</td>' +
                  '<td style="font-family:monospace;font-weight:700;color:#34d399;">' + esc(p.val) + '</td>' +
                  '<td style="color:var(--foreground,#334155);">' + esc(p.loc) + '</td>' +
                  '<td><span class="zfsh-tag ' + (p.status === 'Healthy' ? 'green' : 'amber') + '">' + esc(p.status) + '</span></td>' +
                '</tr>';
              }).join('')),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

    function renderShowrooms() {
    return [
      '<div class="zfsh-kpi-grid">',
        kpiHtml('Showroom Revenue (MTD)', '₹27.20L', '+28.4%', 'up', 'Physical flagship locations', '🛍️'),
        kpiHtml('Pet Footfall (MTD)', '1,640 Pets', '+18.5%', 'up', 'Across 10 urban showrooms', '🐾'),
        kpiHtml('Dressing Room Trials', '1,160 Trials', '70.7% Trial Rate', 'up', 'Private fitting rooms', '👗'),
        kpiHtml('Avg. Revenue per Sq Ft', '₹580 / sqft', '+₹45 vs FY25', 'up', 'Prime high-street retail', '📐'),
        kpiHtml('On-Spot Customization', '194 Orders', '8-min monogram', 'up', 'Laser embroidery bar', '✨'),
        kpiHtml('Showroom Client Rating', '4.86 ★', '840 Reviews', 'up', 'World-class hospitality', '⭐'),
      '</div>',

      '<div class="zfsh-card">',
        '<div class="zfsh-card-head">',
          '<div>',
            '<h3 class="zfsh-card-title">🛍️ Showroom Performance Matrix</h3>',
            '<p class="zfsh-card-sub">Footfall conversion, sales volume, and retail square footage efficiency</p>',
          '</div>',
          '<button class="zfsh-btn primary" onclick="alert(\'Opening Boutique Event & Masterclass Scheduling Portal...\')">✨ VIP Boutique Event</button>',
        '</div>',

        '<div class="zfsh-table-wrap">',
          '<table class="zfsh-table">',
            '<thead><tr><th>ID</th><th>Showroom Name</th><th>City & Hub Area</th><th>Sq. Ft</th><th>Pet Footfall</th><th>Trials</th><th>Sales MTD</th><th>Rev / Sq Ft</th><th>Conversion</th><th>Avg Ticket</th><th>Rating</th></tr></thead>',
            '<tbody>',
              (SHOWROOMS.length ? SHOWROOMS.map(function (s) {
                return '<tr>' +
                  '<td style="font-family:monospace;color:#f472b6;font-size:11px;">' + esc(s.id) + '</td>' +
                  '<td style="font-weight:600;color:var(--foreground,#0f172a);">' + esc(s.name) + '</td>' +
                  '<td style="color:var(--foreground,#334155);">' + esc(s.area) + ', ' + esc(s.city) + '</td>' +
                  '<td style="color:var(--muted-foreground,#64748b);">' + esc(s.sqft) + ' sqft</td>' +
                  '<td style="color:var(--foreground,#0f172a);font-weight:600;">' + esc(s.footfall) + '</td>' +
                  '<td style="color:#a78bfa;">' + esc(s.trials) + '</td>' +
                  '<td style="font-family:monospace;font-weight:700;color:#34d399;">' + esc(s.sales) + '</td>' +
                  '<td style="color:#38bdf8;font-weight:600;">' + esc(s.revPerSqft) + '</td>' +
                  '<td style="color:#34d399;font-weight:700;">' + esc(s.conversion) + '</td>' +
                  '<td style="color:var(--foreground,#334155);">' + esc(s.avgTicket) + '</td>' +
                  '<td><span class="zfsh-tag amber">' + esc(s.rating) + '</span></td>' +
                '</tr>';
              }).join('') : '<tr><td colspan="11" style="text-align:center;padding:24px;color:#94a3b8;">No showroom performance records found</td></tr>'),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

    function renderOnlineSales() {
    var channels = [
      { channel: 'iOS Native Luxury App', sessions: '48,200', orders: '1,480', convRate: '3.07%', aov: '₹5,680', revenue: '₹84.06L', share: '44.2%' },
      { channel: 'Android Flagship App', sessions: '42,600', orders: '1,120', convRate: '2.63%', aov: '₹5,120', revenue: '₹57.34L', share: '30.1%' },
      { channel: 'Mobile Responsive Web', sessions: '28,400', orders: '460', convRate: '1.62%', aov: '₹4,890', revenue: '₹22.49L', share: '11.8%' },
      { channel: 'Instagram Shopping Boutique', sessions: '24,100', orders: '390', convRate: '1.62%', aov: '₹5,450', revenue: '₹21.26L', share: '11.2%' },
      { channel: 'WhatsApp VIP Concierge Drops', sessions: '2,800', orders: '280', convRate: '10.00%', aov: '₹9,650', revenue: '₹27.02L', share: '14.2%' },
      { channel: 'Desktop Web Atelier', sessions: '12,500', orders: '210', convRate: '1.68%', aov: '₹6,420', revenue: '₹13.48L', share: '7.1%' },
      { channel: 'Tata CliQ Luxury Integration', sessions: '8,900', orders: '140', convRate: '1.57%', aov: '₹7,100', revenue: '₹9.94L', share: '5.2%' },
      { channel: 'Nykaa Man / Pet Luxe Corner', sessions: '7,600', orders: '110', convRate: '1.45%', aov: '₹6,200', revenue: '₹6.82L', share: '3.6%' },
      { channel: 'Cred Monarch Exclusives', sessions: '4,200', orders: '95', convRate: '2.26%', aov: '₹6,800', revenue: '₹6.46L', share: '3.4%' },
      { channel: 'Private Atelier Direct Link Drops', sessions: '1,600', orders: '115', convRate: '7.19%', aov: '₹11,200', revenue: '₹12.88L', share: '6.8%' }
    ];

    return [
      '<div class="zfsh-kpi-grid">',
        kpiHtml('Online Fashion Revenue', '₹21.40L', '+38.6%', 'up', 'MTD e-commerce volume', '📱'),
        kpiHtml('Online Orders (MTD)', '420 Orders', '+29.2%', 'up', 'Average 2.2 units/order', '🛍️'),
        kpiHtml('Average Online AOV', '₹5,420', '+₹640', 'up', 'Multi-item pet styling kits', '💳'),
        kpiHtml('E-Commerce Conversion', '2.84%', '+0.42%', 'up', 'Luxury fashion standard', '⚡'),
        kpiHtml('3D AI Pet Sizing Assist', '78.4% Adoption', '1,420 scans', 'up', 'Reduces returns to 1.2%', '📐'),
        kpiHtml('60-Min Rush Delivery', '42.6% of Orders', 'Rapid EV drop', 'up', 'Available in BLR & MUM', '🚀'),
      '</div>',

      '<div class="zfsh-card">',
        '<div class="zfsh-card-head">',
          '<div>',
            '<h3 class="zfsh-card-title">📱 Digital Channel Sales & Mobile Performance</h3>',
            '<p class="zfsh-card-sub">Conversion rates, checkout volume, and revenue by digital sales channel</p>',
          '</div>',
          '<button class="zfsh-btn primary" onclick="alert(\'Push notification scheduled for flash fashion drop!\')">📢 Flash Drop Push</button>',
        '</div>',

        '<div class="zfsh-table-wrap">',
          '<table class="zfsh-table">',
            '<thead><tr><th>Channel Platform</th><th>Sessions</th><th>Orders</th><th>Conversion %</th><th>AOV</th><th>Revenue</th><th>Share</th></tr></thead>',
            '<tbody>',
              (channels.map(function (c) {
                return '<tr>' +
                  '<td style="font-weight:600;color:var(--foreground,#0f172a);">' + esc(c.channel) + '</td>' +
                  '<td style="color:var(--foreground,#334155);">' + esc(c.sessions) + '</td>' +
                  '<td style="color:var(--foreground,#0f172a);font-weight:600;">' + esc(c.orders) + '</td>' +
                  '<td style="color:#38bdf8;font-weight:700;">' + esc(c.convRate) + '</td>' +
                  '<td style="color:var(--foreground,#334155);">' + esc(c.aov) + '</td>' +
                  '<td style="font-family:monospace;font-weight:700;color:#34d399;">' + esc(c.revenue) + '</td>' +
                  '<td style="color:#a78bfa;font-weight:700;">' + esc(c.share) + '</td>' +
                '</tr>';
              }).join('')),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

    function renderRevenue() {
    var categories = [
      { cat: 'Formal Atelier & Wedding Wear', rev: '₹18.60L', share: '38.3%', growth: '+44.2%', aov: '₹8,450' },
      { cat: 'Ergonomic Harnesses & Leashes', rev: '₹10.40L', share: '21.4%', growth: '+28.6%', aov: '₹5,200' },
      { cat: 'Weatherwear & Rain Trenchcoats', rev: '₹7.80L', share: '16.0%', growth: '+36.4%', aov: '₹4,850' },
      { cat: 'Himalayan Winter Knitwear', rev: '₹5.20L', share: '10.7%', growth: '+24.8%', aov: '₹3,450' },
      { cat: 'Loungewear & Resort Polos', rev: '₹2.80L', share: '5.8%', growth: '+18.2%', aov: '₹2,600' },
      { cat: 'Bridal Trousseau Trunk Sets', rev: '₹2.40L', share: '4.9%', growth: '+64.0%', aov: '₹24,000' },
      { cat: 'Footwear & All-Terrain Boots', rev: '₹1.60L', share: '3.3%', growth: '+14.5%', aov: '₹1,850' },
      { cat: 'Solid Gold & Brass Accessories', rev: '₹1.40L', share: '2.9%', growth: '+32.0%', aov: '₹2,450' },
      { cat: 'Bespoke Monogramming Services', rev: '₹0.80L', share: '1.6%', growth: '+52.0%', aov: '₹750' },
      { cat: 'In-Home Stylist Consultation Fees', rev: '₹0.60L', share: '1.2%', growth: '+40.0%', aov: '₹2,500' }
    ];

    return [
      '<div class="zfsh-kpi-grid">',
        kpiHtml('Fashion Gross Revenue (FYTD)', '₹6.28 Cr', '+38.4%', 'up', 'On track to beat FY26 target', '💵'),
        kpiHtml('Monthly Revenue Run-Rate', '₹52.40L / Mo', '+24.8%', 'up', 'High seasonal velocity', '📈'),
        kpiHtml('Showroom vs Online Mix', '54% : 46%', 'Balanced omnichannel', 'up', 'Boutique trials drive app', '⚖️'),
        kpiHtml('Festive Season Surge', '+74.2%', 'Wedding season surge', 'up', 'High demand for Sherwanis', '✨'),
        kpiHtml('Blended Average Order Value', '₹6,650', '+₹820 vs FY25', 'up', 'Higher bundled items', '🛒'),
        kpiHtml('Fashion Revenue / Pet Parent', '₹42,800', '+18.6%', 'up', 'Loyal luxury customer base', '💎'),
      '</div>',

      '<div class="zfsh-card">',
        '<h3 class="zfsh-card-title" style="margin-bottom:16px;">💵 Revenue by Product Category</h3>',
        '<div class="zfsh-table-wrap">',
          '<table class="zfsh-table">',
            '<thead><tr><th>Category</th><th>Revenue FYTD</th><th>Share %</th><th>Growth YoY</th><th>Avg Ticket</th></tr></thead>',
            '<tbody>',
              (categories.map(function (c) {
                return '<tr>' +
                  '<td style="font-weight:600;color:var(--foreground,#0f172a);">' + esc(c.cat) + '</td>' +
                  '<td style="font-family:monospace;font-weight:700;color:#34d399;">' + esc(c.rev) + '</td>' +
                  '<td style="color:#a78bfa;font-weight:600;">' + esc(c.share) + '</td>' +
                  '<td style="color:#34d399;font-weight:700;">' + esc(c.growth) + '</td>' +
                  '<td style="color:var(--foreground,#334155);">' + esc(c.aov) + '</td>' +
                '</tr>';
              }).join('')),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

    function renderProfitability() {
    var unitEconomics = [
      { product: 'Royal Brocade Pet Sherwani', asp: '₹4,850', fabric: '₹720', labor: '₹480', hdw: '₹220', cogs: '₹1,420', profit: '₹3,430', margin: '70.7%' },
      { product: 'Italian Nappa Leather Harness', asp: '₹3,650', fabric: '₹580', labor: '₹360', hdw: '₹180', cogs: '₹1,120', profit: '₹2,530', margin: '69.3%' },
      { product: 'Himalayan Cashmere Sweater', asp: '₹2,950', fabric: '₹480', labor: '₹280', hdw: '₹100', cogs: '₹860', profit: '₹2,090', margin: '70.8%' },
      { product: 'Alpine StormShield Trench', asp: '₹4,200', fabric: '₹740', labor: '₹420', hdw: '₹180', cogs: '₹1,340', profit: '₹2,860', margin: '68.1%' },
      { product: 'Florentine Calfskin Collar', asp: '₹3,200', fabric: '₹510', labor: '₹300', hdw: '₹140', cogs: '₹950', profit: '₹2,250', margin: '70.3%' },
      { product: 'Monaco Riviera Linen Polo', asp: '₹2,150', fabric: '₹320', labor: '₹220', hdw: '₹80', cogs: '₹620', profit: '₹1,530', margin: '71.2%' },
      { product: 'Velvet Evening Tuxedo', asp: '₹5,400', fabric: '₹880', labor: '₹560', hdw: '₹240', cogs: '₹1,680', profit: '₹3,720', margin: '68.9%' },
      { product: 'Orthopedic Rain Booties', asp: '₹1,850', fabric: '₹280', labor: '₹210', hdw: '₹90', cogs: '₹580', profit: '₹1,270', margin: '68.6%' },
      { product: '24K Gold ID Medallion', asp: '₹2,450', fabric: '₹340', labor: '₹240', hdw: '₹110', cogs: '₹690', profit: '₹1,760', margin: '71.8%' },
      { product: 'Merino Wool Thermal Layer', asp: '₹2,250', fabric: '₹360', labor: '₹240', hdw: '₹80', cogs: '₹680', profit: '₹1,570', margin: '69.8%' }
    ];

    return [
      '<div class="zfsh-kpi-grid">',
        kpiHtml('Blended Gross Margin', '68.4%', '+3.1%', 'up', 'Direct atelier sourcing', '💎'),
        kpiHtml('Net Contribution Margin', '54.2%', '+4.2%', 'up', 'After showroom OPEX', '📊'),
        kpiHtml('Full-Price Sell-Through', '94.6%', 'Markdowns <5.4%', 'up', 'No discount brand equity', '🏷️'),
        kpiHtml('Custom Monogram Margin', '86.4%', '₹750 add-on fee', 'up', 'Artisan laser embroidery', '✨'),
        kpiHtml('Sizing Exchange Cost', '1.2% of Rev', '-0.8% reduction', 'up', 'Precise 3D size fitting', '📐'),
        kpiHtml('Fashion Operating EBITDA', '₹17.92L', '36.9% EBITDA', 'up', 'Highly lucrative luxury line', '⚡'),
      '</div>',

      '<div class="zfsh-card">',
        '<h3 class="zfsh-card-title" style="margin-bottom:16px;">💎 Core SKU Unit Economics & Margin Matrix</h3>',
        '<div class="zfsh-table-wrap">',
          '<table class="zfsh-table">',
            '<thead><tr><th>Apparel Item</th><th>Retail ASP</th><th>Fabric</th><th>Artisan Labor</th><th>Hardware</th><th>COGS</th><th>Gross Profit</th><th>Margin</th></tr></thead>',
            '<tbody>',
              (unitEconomics.map(function (u) {
                return '<tr>' +
                  '<td style="font-weight:600;color:var(--foreground,#0f172a);">' + esc(u.product) + '</td>' +
                  '<td style="color:var(--foreground,#334155);">' + esc(u.asp) + '</td>' +
                  '<td style="color:var(--muted-foreground,#64748b);">' + esc(u.fabric) + '</td>' +
                  '<td style="color:var(--muted-foreground,#64748b);">' + esc(u.labor) + '</td>' +
                  '<td style="color:var(--muted-foreground,#64748b);">' + esc(u.hdw) + '</td>' +
                  '<td style="color:#f87171;">' + esc(u.cogs) + '</td>' +
                  '<td style="font-family:monospace;font-weight:700;color:#34d399;">' + esc(u.profit) + '</td>' +
                  '<td style="font-weight:800;color:#a78bfa;">' + esc(u.margin) + '</td>' +
                '</tr>';
              }).join('')),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

    function renderCollections() {
    var cols = [
      { id: 'CAP-2601', name: 'Royal Brocade Wedding Capsule', season: 'Festive / Bridal 2026', styles: 12, sellThrough: '94.2%', rev: '₹34.80L', designer: 'Sabyasachi Mukherjee Collab', status: 'Active Drop' },
      { id: 'CAP-2602', name: 'Alpine StormShield Weatherwear', season: 'Monsoon / Autumn 2026', styles: 10, sellThrough: '91.8%', rev: '₹28.50L', designer: 'Marc Jacobs Studio', status: 'Active Drop' },
      { id: 'CAP-2603', name: 'Himalayan Cashmere Runway Series', season: 'Winter 2026', styles: 8, sellThrough: '96.4%', rev: '₹22.40L', designer: 'Zenve Atelier In-House', status: 'Active Drop' },
      { id: 'CAP-2504', name: 'Monaco Riviera Cruise Linen Line', season: 'Spring / Summer 2026', styles: 14, sellThrough: '98.2%', rev: '₹18.60L', designer: 'Roberto Cavalli Atelier', status: 'Archived' },
      { id: 'CAP-2505', name: 'Black Tie Gala Velvet Edition', season: 'Winter Gala 2025', styles: 6, sellThrough: '97.5%', rev: '₹16.20L', designer: 'Zenve Atelier In-House', status: 'Archived' },
      { id: 'CAP-2506', name: 'Florentine Tuscan Leather Heritage', season: 'Core Heritage 2025', styles: 8, sellThrough: '95.0%', rev: '₹19.40L', designer: 'Bottega Master Artisan', status: 'Active Drop' },
      { id: 'CAP-2507', name: 'Zenve Olympic High-Performance', season: 'Summer Sports 2025', styles: 9, sellThrough: '89.4%', rev: '₹12.80L', designer: 'Nike Trail Collab', status: 'Archived' },
      { id: 'CAP-2508', name: 'Diwali Zari & Velvet Shimmer', season: 'Festive 2025', styles: 11, sellThrough: '99.1%', rev: '₹26.50L', designer: 'Manish Malhotra Studio', status: 'Archived' },
      { id: 'CAP-2509', name: 'Parisian Silk Pajamas & Loungewear', season: 'Loungewear 2025', styles: 7, sellThrough: '93.6%', rev: '₹11.20L', designer: 'Zenve Atelier In-House', status: 'Archived' },
      { id: 'CAP-2510', name: '24K Gold Vermeil Heirloom Keepsakes', season: 'Luxury Jewelry 2025', styles: 5, sellThrough: '92.0%', rev: '₹14.50L', designer: 'Cartier Master Jeweler', status: 'Active Drop' }
    ];

    return [
      '<div class="zfsh-kpi-grid">',
        kpiHtml('Active Capsule Collections', '4 Live Drops', 'Festive + Winter', 'up', 'Current retail circulation', '✨'),
        kpiHtml('Avg. Drop Sell-Through', '94.8%', '+5.4% YoY', 'up', 'Zero deadstock policy', '🎯'),
        kpiHtml('Highest Grossing Drop', '₹34.80L', 'Royal Velvet', 'up', 'Sold out in 22 days', '👑'),
        kpiHtml('Design-to-Rack Lead Time', '28 Days', '-8 days faster', 'up', 'In-house artisan studio', '⏱️'),
        kpiHtml('VIP Pre-Order Conversion', '84.2%', 'Platinum reserve', 'up', 'Sold prior to public launch', '💎'),
        kpiHtml('Runway Pet Models', '36 Verified', 'Ambassador pets', 'up', 'Instagram campaign reach', '📸'),
      '</div>',

      '<div class="zfsh-card">',
        '<div class="zfsh-card-head">',
          '<div>',
            '<h3 class="zfsh-card-title">✨ Seasonal Capsule Collections Portfolio</h3>',
            '<p class="zfsh-card-sub">Limited-edition capsule launches, designer runway series, and sell-through rates</p>',
          '</div>',
          '<button class="zfsh-btn primary" onclick="alert(\'Creating new capsule drop blueprint...\')">✨ Create Capsule Drop</button>',
        '</div>',

        '<div class="zfsh-table-wrap">',
          '<table class="zfsh-table">',
            '<thead><tr><th>Collection ID</th><th>Collection Name</th><th>Season</th><th>Styles</th><th>Sell-Through</th><th>Revenue</th><th>Lead Designer</th><th>Status</th></tr></thead>',
            '<tbody>',
              (cols.length ? cols.map(function (c) {
                return '<tr>' +
                  '<td style="font-family:monospace;color:#f472b6;font-size:11px;">' + esc(c.id) + '</td>' +
                  '<td style="font-weight:600;color:var(--foreground,#0f172a);">' + esc(c.name) + '</td>' +
                  '<td style="color:var(--foreground,#334155);">' + esc(c.season) + '</td>' +
                  '<td style="color:var(--muted-foreground,#64748b);">' + esc(c.styles) + ' styles</td>' +
                  '<td style="font-weight:700;color:#34d399;">' + esc(c.sellThrough) + '</td>' +
                  '<td style="font-family:monospace;font-weight:700;color:#38bdf8;">' + esc(c.rev) + '</td>' +
                  '<td style="color:#a78bfa;">' + esc(c.designer) + '</td>' +
                  '<td><span class="zfsh-tag ' + (c.status === 'Active Drop' ? 'green' : 'purple') + '">' + esc(c.status) + '</span></td>' +
                '</tr>';
              }).join('') : '<tr><td colspan="8" style="text-align:center;padding:24px;color:#94a3b8;">No capsule collection records found</td></tr>'),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Master Render Function ──────────────────────────────────────── */
  function render() {
    if (!root) return;
    var currentTab = TABS.find(function (t) { return t.id === S.tab; }) || TABS[0];

    var html = [
      '<header class="zfsh-head">',
        '<div class="zfsh-head-left">',
          '<div class="zfsh-title-row">',
            '<h1 class="zfsh-title">' + esc(currentTab.title) + '</h1>',
            '<span class="zfsh-live-badge"><span class="zfsh-pulse-dot"></span>' + esc(currentTab.badge) + '</span>',
          '</div>',
          '<p class="zfsh-sub">' + esc(currentTab.sub) + '</p>',
        '</div>',
        '<div class="zfsh-head-actions">',
          '<button class="zfsh-btn" onclick="ZenveFashionDashboard.showBespokeOrderModal()">+ Bespoke Order</button>',
          '<button class="zfsh-btn primary" onclick="ZenveFashionDashboard.showAddStyleModal()">+ New Style</button>',
        '</div>',
      '</header>',

      '<nav class="zfsh-tabs-bar">',
        TABS.map(function (t) {
          var active = t.id === S.tab ? ' active' : '';
          return '<button class="zfsh-tab' + active + '" onclick="ZenveFashionDashboard.switchTab(\'' + t.id + '\')">' +
            '<span>' + t.icon + '</span>' +
            '<span>' + esc(t.label) + '</span>' +
            '<span class="zfsh-tab-badge">' + esc(t.badge) + '</span>' +
          '</button>';
        }).join(''),
      '</nav>',

      '<main class="zfsh-body">'
    ];

    switch (S.tab) {
      case 'dashboard':     html.push(renderDashboard()); break;
      case 'products':      html.push(renderProducts()); break;
      case 'orders':        html.push(renderOrders()); break;
      case 'customers':     html.push(renderCustomers()); break;
      case 'inventory':     html.push(renderInventory()); break;
      case 'showrooms':     html.push(renderShowrooms()); break;
      case 'online-sales':  html.push(renderOnlineSales()); break;
      case 'revenue':       html.push(renderRevenue()); break;
      case 'profitability': html.push(renderProfitability()); break;
      case 'collections':   html.push(renderCollections()); break;
      default:              html.push(renderDashboard());
    }

    html.push('</main>');
    root.innerHTML = html.join('');
  }

  /* ── Modals & Actions ────────────────────────────────────────────── */
  function showModal(contentHtml) {
    closeModal();
    var backdrop = document.createElement('div');
    backdrop.id = 'zfsh-active-modal';
    backdrop.className = 'zfsh-modal-backdrop';
    backdrop.innerHTML = '<div class="zfsh-modal">' + contentHtml + '</div>';
    backdrop.onclick = function (e) {
      if (e.target === backdrop) closeModal();
    };
    document.body.appendChild(backdrop);
  }

  function closeModal() {
    var existing = document.getElementById('zfsh-active-modal');
    if (existing) existing.remove();
  }

  function showAddStyleModal() {
    var formHtml = [
      '<div class="zfsh-modal-head">',
        '<h3 class="zfsh-modal-title">👗 Add New Fashion Couture Style</h3>',
        '<button class="zfsh-btn" onclick="ZenveFashionDashboard.closeModal()">✕</button>',
      '</div>',
      '<form onsubmit="event.preventDefault(); alert(\'New style added to Zenve Fashion master catalog!\'); ZenveFashionDashboard.closeModal();">',
        '<div class="zfsh-form-group"><label>Product Title</label><input type="text" class="zfsh-input" placeholder="e.g. Royal Brocade Wedding Sherwani" required /></div>',
        '<div class="zfsh-form-row">',
          '<div class="zfsh-form-group"><label>Category</label><select class="zfsh-select"><option>Formal Atelier</option><option>Ergonomic Harnesses</option><option>Weatherwear</option><option>Winter Knits</option><option>Collars & Leashes</option></select></div>',
          '<div class="zfsh-form-group"><label>Target Pet</label><select class="zfsh-select"><option>Dog (All Breeds)</option><option>Dog (Small / Toy)</option><option>Dog (Large)</option><option>Cat</option></select></div>',
        '</div>',
        '<div class="zfsh-form-row">',
          '<div class="zfsh-form-group"><label>Retail ASP (INR)</label><input type="text" class="zfsh-input" placeholder="₹3,450" required /></div>',
          '<div class="zfsh-form-group"><label>Production COGS (INR)</label><input type="text" class="zfsh-input" placeholder="₹980" required /></div>',
        '</div>',
        '<div class="zfsh-form-group"><label>Fabric & Material Spec</label><input type="text" class="zfsh-input" placeholder="e.g. 100% Pure Silk with Zari Embroidery" required /></div>',
        '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px;">',
          '<button type="button" class="zfsh-btn" onclick="ZenveFashionDashboard.closeModal()">Cancel</button>',
          '<button type="submit" class="zfsh-btn primary">Save & Publish</button>',
        '</div>',
      '</form>'
    ].join('');
    showModal(formHtml);
  }

  function showBespokeOrderModal() {
    var formHtml = [
      '<div class="zfsh-modal-head">',
        '<h3 class="zfsh-modal-title">✂️ New Bespoke Measurement Order</h3>',
        '<button class="zfsh-btn" onclick="ZenveFashionDashboard.closeModal()">✕</button>',
      '</div>',
      '<form onsubmit="event.preventDefault(); alert(\'Bespoke order created and routed to atelier master tailor!\'); ZenveFashionDashboard.closeModal();">',
        '<div class="zfsh-form-group"><label>Pet Parent Full Name</label><input type="text" class="zfsh-input" placeholder="e.g. Natasha Poonawalla" required /></div>',
        '<div class="zfsh-form-row">',
          '<div class="zfsh-form-group"><label>Pet Name & Breed</label><input type="text" class="zfsh-input" placeholder="e.g. Princess (Maltipoo)" required /></div>',
          '<div class="zfsh-form-group"><label>Occasion / Event</label><input type="text" class="zfsh-input" placeholder="e.g. Family Wedding / Gala" required /></div>',
        '</div>',
        '<div class="zfsh-form-row">',
          '<div class="zfsh-form-group"><label>Neck Girth (cm)</label><input type="text" class="zfsh-input" placeholder="24 cm" required /></div>',
          '<div class="zfsh-form-group"><label>Chest Girth (cm)</label><input type="text" class="zfsh-input" placeholder="36 cm" required /></div>',
        '</div>',
        '<div class="zfsh-form-group"><label>Custom Monogram / Embroidery Text</label><input type="text" class="zfsh-input" placeholder="e.g. Gold Thread Initial &quot;P&quot;" /></div>',
        '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px;">',
          '<button type="button" class="zfsh-btn" onclick="ZenveFashionDashboard.closeModal()">Cancel</button>',
          '<button type="submit" class="zfsh-btn primary">Submit Atelier Order</button>',
        '</div>',
      '</form>'
    ].join('');
    showModal(formHtml);
  }

  /* ── Open & Close Mechanics ──────────────────────────────────────── */
  function build() {
    root = document.getElementById('zfsh-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'zfsh-root';
      root.className = 'zpanel-root';
      document.body.appendChild(root);
    }
  }

  function open(tab) {
    // Close other domain overlays
    ['zfa-root', 'zmkt-dashboard-root', 'zvp-root', 'zod-root', 'zsd-root', 'zpid-root', 'zph-root', 'zch-root', 'zrep-root', 'zalt-root', 'zset-root', 'zhr-root', 'zsys-root'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) {
        el.classList.remove('zfa-open', 'zmkt-open', 'zvp-open', 'zod-open', 'zsd-open', 'zpid-open', 'zph-open', 'zch-open', 'zrep-open', 'zalt-open', 'zset-open', 'zhr-open', 'zsys-open', 'zpanel-open');
        el.style.display = 'none';
      }
    });
    if (document.querySelectorAll) {
      document.querySelectorAll('.zpanel-root').forEach(function(el) {
        if (el.id !== 'zfsh-root') {
          el.style.display = 'none';
          el.classList.remove('zfa-open', 'zmkt-open', 'zvp-open', 'zod-open', 'zsd-open', 'zpid-open', 'zph-open', 'zch-open', 'zrep-open', 'zalt-open', 'zset-open', 'zhr-open', 'zsys-open', 'zpanel-open');
        }
      });
    }

    if (tab && TABS.some(function (t) { return t.id === tab; })) {
      S.tab = tab;
    } else if (!S.tab) {
      S.tab = 'dashboard';
    }

    build();
    S.open = true;
    root.style.display = 'block';
    root.classList.add('zfsh-open', 'zpanel-open');
    try {
      document.documentElement.classList.remove('zvp-locked', 'zalt-locked');
      document.body.classList.remove('zvp-locked', 'zalt-locked');
      document.documentElement.classList.add('zfsh-locked');
      document.body.classList.add('zfsh-locked');
    } catch (e) {}
    render();

    var targetTab = TABS.find(function (t) { return t.id === S.tab; });
    if (targetTab && targetTab.hash && window.location.hash !== targetTab.hash) {
      try { history.replaceState(null, '', targetTab.hash); } catch (e) {}
    }
    root.scrollTop = 0;
  }

  function close() {
    S.open = false;
    if (root) {
      root.classList.remove('zfsh-open', 'zpanel-open');
      root.style.display = 'none';
    }
    try {
      document.documentElement.classList.remove('zfsh-locked');
      document.body.classList.remove('zfsh-locked');
    } catch (e) {}
    if (window.location.hash && tabFromHash(window.location.hash)) {
      try { history.replaceState(null, '', window.location.pathname + window.location.search); } catch (e) {}
    }
  }

  function switchTab(tabId) {
    if (!tabId || !TABS.some(function (t) { return t.id === tabId; })) return;
    S.tab = tabId;
    render();
    var targetTab = TABS.find(function (t) { return t.id === tabId; });
    if (targetTab && targetTab.hash) {
      try { history.replaceState(null, '', targetTab.hash); } catch (e) {}
    }
    if (root) root.scrollTop = 0;
  }

  /* ── Interceptor for Hash & Sidebar Clicks ───────────────────────── */
  function onHashChange() {
    var t = tabFromHash(window.location.hash);
    if (t) {
      open(t);
    } else if (S.open && window.location.hash && window.location.hash !== '#') {
      var otherDomains = ['sales', 'operations', 'inventory', 'pharmacy', 'clinics', 'doctors', 'reports', 'alerts', 'settings', 'finance', 'marketing', 'vendors', 'procurement'];
      var isOther = otherDomains.some(function(d) { return window.location.hash.indexOf(d) >= 0; });
      if (isOther) close();
    }
  }

  function initInterception() {
    document.addEventListener('click', function (e) {
      var accordionBtn = e.target.closest('button[aria-expanded]');
      if (accordionBtn) return;

      var el = e.target.closest('button, a, [data-go], [role="button"], li');
      if (!el) return;

      var href = el.getAttribute('href');
      var t = tabFromHash(href);
      if (t) {
        e.preventDefault();
        open(t);
        return;
      }

      var isSidebar = !!el.closest('aside, [class*="sidebar"]') && !el.closest('#zfsh-root');
      if (isSidebar) {
        var txt = el.textContent || '';
        var t2 = tabFromText(txt);
        if (t2) {
          e.preventDefault();
          e.stopPropagation();
          open(t2);
        }
      }
    }, true);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && S.open) close();
    });

    window.addEventListener('hashchange', onHashChange);

    if (window.location.hash) {
      var initial = tabFromHash(window.location.hash);
      if (initial) {
        setTimeout(function () { open(initial); }, 150);
      }
    }
  }

  /* ── Public API ──────────────────────────────────────────────────── */
  window.ZenveFashionDashboard = {
    open: open,
    close: close,
    switchTab: switchTab,
    closeModal: closeModal,
    showAddStyleModal: showAddStyleModal,
    showBespokeOrderModal: showBespokeOrderModal
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInterception);
  } else {
    initInterception();
  }
})();
