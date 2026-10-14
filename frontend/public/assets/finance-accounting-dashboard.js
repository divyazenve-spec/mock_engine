/* =====================================================================
   Zenve BI — Finance & Accounting Domain Control Center & Subdomain Dashboards
   Suite (18 Subdomains):
     1. Finance Dashboard     (#finance-dashboard)
     2. Profit & Loss          (#profit-loss)
     3. Balance Sheet          (#balance-sheet)
     4. Cash Flow              (#cash-flow)
     5. Revenue                (#revenue)
     6. Expenses               (#expenses)
     7. COGS                   (#cogs)
     8. Gross Profit           (#gross-profit)
     9. EBITDA                 (#ebitda)
     10. Net Profit            (#net-profit)
     11. Accounts Receivable   (#accounts-receivable)
     12. Accounts Payable      (#accounts-payable)
     13. Invoices              (#invoices)
     14. Payments              (#payments)
     15. Refunds               (#refunds)
     16. Taxes                 (#taxes)
     17. Financial Forecast    (#financial-forecast)
     18. Cost Analysis         (#cost-analysis)
   ===================================================================== */

(function () {
  'use strict';

  function esc(s) {
    if (s == null) return '';
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ── Tabs Configuration ────────────────────────────────────────── */
  var TABS = [
    { id: 'dashboard',    label: 'Finance Dashboard',   icon: '💰', hash: '#finance-dashboard',   badge: 'EBITDA 20%', title: 'Finance Dashboard', sub: 'Network-wide GAAP profit and loss, operating liquidity, and statutory compliance' },
    { id: 'pnl',          label: 'Profit & Loss',       icon: '📈', hash: '#profit-loss',         badge: 'Audited',    title: 'Profit & Loss Statement (P&L)', sub: 'Management GAAP accounts, operating revenue streams, and cost absorption' },
    { id: 'balance-sheet',label: 'Balance Sheet',       icon: '🏛️', hash: '#balance-sheet',       badge: '₹0 NW', title: 'Balance Sheet & Capital Structure', sub: 'Current liquidity, hospital equipment capital assets, and shareholder net worth' },
    { id: 'cash-flow',    label: 'Cash Flow',           icon: '💧', hash: '#cash-flow',           badge: '14.2 Mo Run', title: 'Cash Flow Statement & Liquidity', sub: 'Direct operating cash conversion, clinical CAPEX, and liquid treasury' },
    { id: 'revenue',      label: 'Revenue',             icon: '💵', hash: '#revenue',             badge: '₹0 MRR', title: 'Revenue Intelligence & Inflows', sub: 'Clinical OPD, surgical IPD, veterinary pharmacy, and corporate B2B contracts' },
    { id: 'expenses',     label: 'Expenses',            icon: '🏢', hash: '#expenses',            badge: '35.9% OPEX', title: 'Operating Expenses (OPEX)', sub: 'Surgeon staffing, hospital leases, utilities, and marketing budget adherence' },
    { id: 'cogs',         label: 'COGS',                icon: '📦', hash: '#cogs',                badge: '44% Ratio',  title: 'Cost of Goods Sold (COGS)', sub: 'Pharma procurement, surgical titanium implants, consumables, and supplier rebates' },
    { id: 'gross-profit', label: 'Gross Profit',        icon: '💎', hash: '#gross-profit',        badge: '56% Margin', title: 'Gross Profit & Unit Economics', sub: 'Clinical department gross contribution and procedure-level profitability' },
    { id: 'ebitda',       label: 'EBITDA',              icon: '⚡', hash: '#ebitda',              badge: '20.02%',     title: 'Operating EBITDA & Bridge', sub: 'Pre-tax operating cash velocity, facility margins, and normalized bridge' },
    { id: 'net-profit',   label: 'Net Profit',          icon: '🏆', hash: '#net-profit',          badge: '11.8% PAT',  title: 'Net Profit (PAT) & Bottom Line', sub: 'Statutory earnings after tax, financing costs, and quarterly profit expansion' },
    { id: 'receivables',  label: 'Accounts Receivable', icon: '📥', hash: '#accounts-receivable', badge: 'DSO 22d',    title: 'Accounts Receivable (AR)', sub: 'Corporate B2B debtor aging, pet insurance TPA claims, and collection notices' },
    { id: 'payables',     label: 'Accounts Payable',    icon: '📤', hash: '#accounts-payable',    badge: 'DPO 34d',    title: 'Accounts Payable (AP)', sub: 'Supplier credit terms, 3-way matching, and scheduled NEFT/RTGS disbursements' },
    { id: 'invoices',     label: 'Invoices',            icon: '🧾', hash: '#invoices',            badge: 'IRN Live',   title: 'GST Tax Invoices Register', sub: 'Automated e-invoice generation, HSN/SAC codes, and client billing receipts' },
    { id: 'payments',     label: 'Payments',            icon: '💳', hash: '#payments',            badge: 'T+1 Sweep',  title: 'Payments & Gateway Settlement', sub: 'Multi-gateway reconciliation, Razorpay UPI, Pine Labs POS, and net credit' },
    { id: 'refunds',      label: 'Refunds',             icon: '🔄', hash: '#refunds',             badge: '1.07% Rate', title: 'Refunds & Reversals Ledger', sub: 'Appointment rescheduling, sealed medication returns, and dispute protection' },
    { id: 'taxes',        label: 'Taxes',               icon: '⚖️', hash: '#taxes',               badge: '100% Compliant', title: 'Statutory Tax Compliance', sub: 'GSTR-1 / 3B filings, ITC reconciliation, TDS 194J/194C, and advance corporate tax' },
    { id: 'forecast',     label: 'Financial Forecast',  icon: '🔮', hash: '#financial-forecast',  badge: '12M Rolling', title: 'Financial Forecasting & Models', sub: '12-month rolling P&L simulations, scenario modeling, and CAPEX roadmap' },
    { id: 'cost-analysis',label: 'Cost Analysis',       icon: '🔍', hash: '#cost-analysis',       badge: 'ABC Model',  title: 'Cost Structure & Breakeven Analysis', sub: 'Activity-based unit costs (ABC), marginal procedure absorption, and safety margin' }
  ];

  /* ── State ─────────────────────────────────────────────────────── */
  var S = {
    open: false,
    tab: 'dashboard',
    invSearch: '',
    invStatus: 'ALL',
    arBucket: 'ALL',
    apStatus: 'ALL',
    expCostCenter: 'ALL',
    forecastScenario: 'Base Case'
  };

  var root = null;

  /* ── Tab Resolution ────────────────────────────────────────────── */
  function tabFromHash(hash) {
    if (!hash) return null;
    var h = (hash.startsWith('#') ? hash.slice(1) : hash).toLowerCase();
    // Exclude other domains
    if (h.indexOf('alert') >= 0 || h.indexOf('report') >= 0 || h.indexOf('clinic') >= 0 || h.indexOf('hospital') >= 0 || h.indexOf('pharmacy') >= 0 || h.indexOf('doctor') >= 0 || h.indexOf('inventory') >= 0) {
      if (h !== 'finance-alerts' && h !== 'finance-reports') {
        // proceed
      } else {
        return null;
      }
    }
    if (h === 'finance-dashboard' || h === 'finance' || h === 'financial-dashboard') return 'dashboard';
    if (h === 'profit-loss' || h === 'pnl' || h === 'profit-and-loss') return 'pnl';
    if (h === 'balance-sheet') return 'balance-sheet';
    if (h === 'cash-flow' || h === 'cashflow') return 'cash-flow';
    if (h === 'finance-revenue' || h === 'revenue') return 'revenue';
    if (h === 'finance-expenses' || h === 'expenses') return 'expenses';
    if (h === 'cogs') return 'cogs';
    if (h === 'gross-profit') return 'gross-profit';
    if (h === 'ebitda') return 'ebitda';
    if (h === 'net-profit') return 'net-profit';
    if (h === 'accounts-receivable' || h === 'receivables') return 'receivables';
    if (h === 'accounts-payable' || h === 'payables') return 'payables';
    if (h === 'invoices') return 'invoices';
    if (h === 'finance-payments' || h === 'payments') return 'payments';
    if (h === 'finance-refunds' || h === 'refunds') return 'refunds';
    if (h === 'taxes' || h === 'tax') return 'taxes';
    if (h === 'financial-forecast' || h === 'forecast') return 'forecast';
    if (h === 'cost-analysis' || h === 'cost') return 'cost-analysis';
    return null;
  }

  function tabFromText(txt) {
    if (!txt) return null;
    var raw = txt.replace(/\s+/g, ' ').trim().toLowerCase();
    if (raw.indexOf('report') >= 0 || raw.indexOf('alert') >= 0 || raw.indexOf('setting') >= 0 || raw.indexOf('doctor') >= 0) return null;

    if (raw === 'finance dashboard' || raw === 'finance & accounting' || raw === 'finance' || raw === 'financial intelligence') return 'dashboard';
    if (raw === 'profit & loss' || raw === 'profit and loss' || raw === 'p&l') return 'pnl';
    if (raw === 'balance sheet') return 'balance-sheet';
    if (raw === 'cash flow') return 'cash-flow';
    if (raw === 'revenue' || raw === 'finance revenue') return 'revenue';
    if (raw === 'expenses' || raw === 'finance expenses') return 'expenses';
    if (raw === 'cogs' || raw === 'cost of goods sold') return 'cogs';
    if (raw === 'gross profit') return 'gross-profit';
    if (raw === 'ebitda') return 'ebitda';
    if (raw === 'net profit') return 'net-profit';
    if (raw === 'accounts receivable' || raw === 'receivables') return 'receivables';
    if (raw === 'accounts payable' || raw === 'payables') return 'payables';
    if (raw === 'invoices' || raw === 'tax invoices') return 'invoices';
    if (raw === 'payments' || raw === 'finance payments') return 'payments';
    if (raw === 'refunds' || raw === 'finance refunds') return 'refunds';
    if (raw === 'taxes' || raw === 'tax compliance') return 'taxes';
    if (raw === 'financial forecast' || raw === 'forecast') return 'forecast';
    if (raw === 'cost analysis') return 'cost-analysis';
    return null;
  }

  /* ── Helper Renderers ─────────────────────────────────────────── */
  function kpiHtml(label, val, delta, trend, subtext, icon) {
    return [
      '<div class="zfa-kpi">',
        '<div class="zfa-kpi-top">',
          '<span class="zfa-kpi-label">' + esc(label) + '</span>',
          '<span class="zfa-kpi-icon">' + esc(icon || '💰') + '</span>',
        '</div>',
        '<div class="zfa-kpi-val">' + esc(val) + '</div>',
        '<div class="zfa-kpi-bottom">',
          '<span class="zfa-delta ' + (trend === 'up' ? 'up' : trend === 'down' ? 'down' : 'warn') + '">' + (trend === 'up' ? '↑ ' : trend === 'down' ? '↓ ' : '• ') + esc(delta) + '</span>',
          '<span class="zfa-subtext">' + esc(subtext) + '</span>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Subdomain Renderers (18 Screens) ─────────────────────────── */

  // 1. Finance Dashboard
  function renderDashboard() {
    var pnlRows = [
      { metric: 'Gross Invoiced Revenue', actual: '₹1,42,85,000', budget: '₹1,35,00,000', variance: '+₹7,85,000 (+5.8%)', color: '#10b981' },
      { metric: 'Direct Cost of Goods Sold (COGS)', actual: '-₹62,85,000', budget: '-₹60,00,000', variance: '-₹2,85,000 (-4.8%)', color: '#f87171' },
      { metric: 'Gross Profit (Trading Margin: 56.0%)', actual: '₹80,00,000', budget: '₹75,00,000', variance: '+₹5,00,000 (+6.7%)', color: '#10b981' },
      { metric: 'Clinical Salaries & Doctor Fees', actual: '-₹24,80,000', budget: '-₹25,00,000', variance: '+₹20,000 (+0.8%)', color: '#38bdf8' },
      { metric: 'Hospital Facility Leases (14 Units)', actual: '-₹11,50,000', budget: '-₹11,50,000', variance: '₹0 (On Budget)', color: '#94a3b8' },
      { metric: 'Utilities, Digital Infrastructure & EHR', actual: '-₹9,41,600', budget: '-₹9,50,000', variance: '+₹8,400 (+0.9%)', color: '#38bdf8' },
      { metric: 'Total Operating Expenses (OPEX)', actual: '-₹45,71,600', budget: '-₹46,00,000', variance: '+₹28,400 (+0.6%)', color: '#10b981' },
      { metric: 'Operating EBITDA (Margin: 24.0%)', actual: '₹34,28,400', budget: '₹29,00,000', variance: '+₹5,28,400 (+18.2%)', color: '#10b981' },
      { metric: 'Depreciation, Amortization & Finance', actual: '-₹4,98,133', budget: '-₹5,00,000', variance: '+₹1,867 (+0.4%)', color: '#94a3b8' },
      { metric: 'Net Profit After Tax (PAT: 18.3%)', actual: '₹26,10,200', budget: '₹21,60,000', variance: '+₹4,50,200 (+20.8%)', color: '#10b981' }
    ];

    var pnlHtml = pnlRows.map(function(r) {
      return '<tr><td style="font-weight:600;color:#fff;">' + esc(r.metric) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;font-weight:700;color:' + r.color + ';">' + esc(r.actual) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;color:#94a3b8;">' + esc(r.budget) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;color:' + (r.variance.indexOf('+') >= 0 ? '#34d399' : '#f87171') + ';">' + esc(r.variance) + '</td></tr>';
    }).join('');

    return [
      '<div class="zfa-kpi-grid">',
        kpiHtml('Gross Invoiced Revenue', '₹1,42,85,000', '+12.4% MoM', 'up', 'Current month accrual', '💰'),
        kpiHtml('Operating EBITDA', '₹34,28,400', '24.0% margin', 'up', 'Core operational profit', '⚡'),
        kpiHtml('Net Profit (PAT)', '₹26,10,200', '18.3% margin', 'up', 'Bottom line statutory', '🏆'),
        kpiHtml('Liquid Cash & Bank', '₹8,84,00,000', '14.2M runway', 'up', 'HDFC treasury & sweep', '🏦'),
        kpiHtml('Accounts Receivable', '₹28,50,000', 'DSO: 22 Days', 'up', '10 key debtor accounts', '📥'),
        kpiHtml('Accounts Payable', '₹19,20,000', 'DPO: 34 Days', 'up', '10 approved suppliers', '📤'),
      '</div>',
      '<div class="zfa-grid-2">',
        '<div class="zfa-card">',
          '<div class="zfa-card-head">',
            '<div><h3 class="zfa-card-title">📊 Executive Profit & Loss Summary</h3><p class="zfa-card-sub">Management GAAP accounts for Current Month</p></div>',
            '<span class="zfa-badge green">AUDITED ACCRUAL</span>',
          '</div>',
          '<div class="zfa-table-wrap">',
            '<table class="zfa-table">',
              '<thead><tr><th>Financial Metric</th><th style="text-align:right;">Actual</th><th style="text-align:right;">Budget</th><th style="text-align:right;">Variance</th></tr></thead>',
              '<tbody>' + pnlHtml + '</tbody>',
            '</table>',
          '</div>',
        '</div>',
        '<div class="zfa-card">',
          '<div class="zfa-card-head">',
            '<div><h3 class="zfa-card-title">⚖️ Working Capital & Aging Profile</h3><p class="zfa-card-sub">Trade receivables vs supplier payables maturity</p></div>',
            '<button class="zfa-btn primary" onclick="ZenveFinanceDashboard.switchTab(\'cash-flow\')">View Cash Flow →</button>',
          '</div>',
          '<div style="display:flex;flex-direction:column;gap:12px;">',
            '<div style="background:rgba(0,0,0,0.2);padding:14px;border-radius:8px;border:1px solid rgba(255,255,255,0.06);"><div style="display:flex;justify-content:space-between;margin-bottom:6px;"><b>Current (0–30 Days)</b><span class="zfa-badge green">LOW RISK</span></div><div style="font-size:11px;color:#94a3b8;">Receivables: <strong style="color:#38bdf8;">₹18,20,000</strong> (63.9%) · Payables: <strong style="color:#fbbf24;">₹13,63,200</strong> (71.0%)</div></div>',
            '<div style="background:rgba(0,0,0,0.2);padding:14px;border-radius:8px;border:1px solid rgba(255,255,255,0.06);"><div style="display:flex;justify-content:space-between;margin-bottom:6px;"><b>31–60 Days (Grace Period)</b><span class="zfa-badge blue">NORMAL</span></div><div style="font-size:11px;color:#94a3b8;">Receivables: <strong style="color:#38bdf8;">₹6,80,000</strong> (23.8%) · Payables: <strong style="color:#fbbf24;">₹3,85,920</strong> (20.1%)</div></div>',
            '<div style="background:rgba(0,0,0,0.2);padding:14px;border-radius:8px;border:1px solid rgba(255,255,255,0.06);"><div style="display:flex;justify-content:space-between;margin-bottom:6px;"><b>61–90 Days (Overdue Warning)</b><span class="zfa-badge amber">MEDIUM RISK</span></div><div style="font-size:11px;color:#94a3b8;">Receivables: <strong style="color:#38bdf8;">₹2,45,000</strong> (8.6%) · Payables: <strong style="color:#fbbf24;">₹1,40,160</strong> (7.3%)</div></div>',
            '<div style="background:rgba(0,0,0,0.2);padding:14px;border-radius:8px;border:1px solid rgba(255,255,255,0.06);"><div style="display:flex;justify-content:space-between;margin-bottom:6px;"><b>90+ Days (Delinquent/Disputed)</b><span class="zfa-badge red">ACTION REQUIRED</span></div><div style="font-size:11px;color:#94a3b8;">Receivables: <strong style="color:#38bdf8;">₹1,05,000</strong> (3.7%) · Payables: <strong style="color:#fbbf24;">₹30,720</strong> (1.6%)</div></div>',
          '</div>',
        '</div>',
      '</div>'
    ].join('');
  }

  // 2. Profit & Loss
  function renderPnL() {
    var pnlItems = [
      { code: 'REV-01', desc: 'Veterinary Clinical & OPD Consultations', class: 'Operating Revenue', actual: '₹34,50,000', budget: '₹32,00,000', variance: '+₹2,50,000', pct: '24.2%' },
      { code: 'REV-02', desc: 'Advanced Orthopedic & Soft-Tissue Surgery', class: 'Operating Revenue', actual: '₹42,80,000', budget: '₹40,00,000', variance: '+₹2,80,000', pct: '30.0%' },
      { code: 'REV-03', desc: 'In-House Pathology & Radiology Diagnostics', class: 'Operating Revenue', actual: '₹28,40,000', budget: '₹27,00,000', variance: '+₹1,40,000', pct: '19.9%' },
      { code: 'REV-04', desc: 'Inpatient Hospitalization & 24/7 ICU Care', class: 'Operating Revenue', actual: '₹19,25,000', budget: '₹18,50,000', variance: '+₹75,000', pct: '13.5%' },
      { code: 'REV-05', desc: 'Specialty Pharmacy & Therapeutic Diet Dispense', class: 'Operating Revenue', actual: '₹17,90,000', budget: '₹17,50,000', variance: '+₹40,000', pct: '12.5%' },
      { code: 'COGS-01', desc: 'Direct Pharmaceuticals & Biologics Supplies', class: 'Cost of Goods Sold', actual: '-₹32,45,000', budget: '-₹31,00,000', variance: '-₹1,45,000', pct: '-22.7%' },
      { code: 'COGS-02', desc: 'Surgical Titanium Implants & Consumable Packs', class: 'Cost of Goods Sold', actual: '-₹18,20,000', budget: '-₹17,50,000', variance: '-₹70,000', pct: '-12.7%' },
      { code: 'COGS-03', desc: 'Diagnostic Reagents, Rapid Test Kits & Contrast', class: 'Cost of Goods Sold', actual: '-₹12,20,000', budget: '-₹11,50,000', variance: '-₹70,000', pct: '-8.5%' },
      { code: 'OPX-01', desc: 'Veterinary Doctors, Nurses & Staff Payroll', class: 'Operating Expense', actual: '-₹24,80,000', budget: '-₹25,00,000', variance: '+₹20,000', pct: '-17.4%' },
      { code: 'PAT-10', desc: 'Statutory Net Profit After Tax (PAT)', class: 'Bottom-Line Net', actual: '₹26,10,200', budget: '₹21,60,000', variance: '+₹4,50,200', pct: '18.3%' }
    ];

    var pnlRowsHtml = pnlItems.map(function(item) {
      return '<tr><td style="font-family:\'IBM Plex Mono\',monospace;color:#38bdf8;">' + esc(item.code) + '</td><td style="color:#fff;font-weight:600;">' + esc(item.desc) + '</td><td style="color:#94a3b8;">' + esc(item.class) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;font-weight:700;color:' + (item.actual.indexOf('-') >= 0 ? '#f87171' : '#10b981') + ';">' + esc(item.actual) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;color:#94a3b8;">' + esc(item.budget) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;color:' + (item.variance.indexOf('+') >= 0 ? '#34d399' : '#f87171') + ';">' + esc(item.variance) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;color:#38bdf8;">' + esc(item.pct) + '</td></tr>';
    }).join('');

    return [
      '<div class="zfa-kpi-grid">',
        kpiHtml('Operating Revenue', '₹1,42,85,000', '+12.4% MoM', 'up', 'Consults, surgery & lab', '💰'),
        kpiHtml('Total Direct COGS', '₹62,85,000', '44.0% of rev', 'neutral', 'Pharma & consumables', '📦'),
        kpiHtml('Gross Profit', '₹80,00,000', '56.0% margin', 'up', 'Clinical service gross', '💎'),
        kpiHtml('Total OPEX', '₹45,71,600', '32.0% of rev', 'neutral', 'Payroll, lease, cloud', '🏢'),
        kpiHtml('Operating EBITDA', '₹34,28,400', '24.0% margin', 'up', 'Operating cash income', '⚡'),
        kpiHtml('Net PAT', '₹26,10,200', '18.3% margin', 'up', 'Audited net profit', '🏆'),
      '</div>',
      '<div class="zfa-card">',
        '<div class="zfa-card-head">',
          '<div><h3 class="zfa-card-title">📑 Comprehensive GAAP Income Statement</h3><p class="zfa-card-sub">Audited waterfall from Top-line Gross Revenue to Bottom-line Net PAT</p></div>',
          '<button class="zfa-btn primary" onclick="alert(\'Downloading official signed GAAP P&L statement (PDF)...\')">Export Audited P&L</button>',
        '</div>',
        '<div class="zfa-table-wrap">',
          '<table class="zfa-table">',
            '<thead><tr><th>Code</th><th>Line Item Description</th><th>Classification</th><th style="text-align:right;">Actual</th><th style="text-align:right;">Budget</th><th style="text-align:right;">Variance</th><th style="text-align:right;">% Revenue</th></tr></thead>',
            '<tbody>' + pnlRowsHtml + '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  // 3. Balance Sheet
  function renderBalanceSheet() {
    var assets = [
      { name: 'Cash & Liquid Bank Balances', bal: '₹8,84,00,000', share: '48.0%' },
      { name: 'Overnight Mutual Funds & Liquid Bills', bal: '₹2,50,00,000', share: '13.6%' },
      { name: 'Trade Receivables (Insurance & B2B)', bal: '₹28,50,000', share: '1.5%' },
      { name: 'Specialty Pharmaceuticals Inventory', bal: '₹42,00,000', share: '2.3%' },
      { name: 'Surgical Consumables & Implants Stock', bal: '₹22,50,000', share: '1.2%' },
      { name: 'Diagnostic Reagents & Test Cartridges', bal: '₹14,50,000', share: '0.8%' },
      { name: 'Advanced Imaging (MRI & 64-Slice CT)', bal: '₹2,80,00,000', share: '15.2%' },
      { name: 'Surgical OT Suites & Anesthesia Units', bal: '₹1,65,00,000', share: '9.0%' },
      { name: 'Hospital Leasehold Improvements', bal: '₹1,10,00,000', share: '6.0%' },
      { name: 'Proprietary EHR & Telemedicine Software', bal: '₹46,00,000', share: '2.5%' }
    ];

    var liabilities = [
      { name: 'Trade Accounts Payable (Vendors)', bal: '₹19,20,000', share: '1.0%' },
      { name: 'Accrued Clinical Salaries & Doctor Fees', bal: '₹24,80,000', share: '1.3%' },
      { name: 'Statutory GST & TDS Withholding Dues', bal: '₹16,89,568', share: '0.9%' },
      { name: 'Customer Advance Deposits (Wellness Plans)', bal: '₹18,50,000', share: '1.0%' },
      { name: 'Long-Term Medical Equipment Term Loans', bal: '₹1,50,00,000', share: '8.1%' },
      { name: 'Working Capital Bank Overdraft (OD)', bal: '₹20,80,432', share: '1.1%' },
      { name: 'Issued & Paid-up Share Capital', bal: '₹6,00,00,000', share: '32.6%' },
      { name: 'Securities Premium Reserve', bal: '₹5,50,00,000', share: '29.9%' },
      { name: 'Retained Earnings (Accumulated Surplus)', bal: '₹3,16,19,800', share: '17.2%' },
      { name: 'Current Period Net Profit (PAT)', bal: '₹26,10,200', share: '1.4%' }
    ];

    var assetsHtml = assets.map(function(a) {
      return '<tr><td style="color:#fff;font-weight:600;">' + esc(a.name) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;font-weight:700;color:#10b981;">' + esc(a.bal) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;color:#38bdf8;">' + esc(a.share) + '</td></tr>';
    }).join('');

    var liabHtml = liabilities.map(function(l) {
      return '<tr><td style="color:#fff;font-weight:600;">' + esc(l.name) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;font-weight:700;color:#f87171;">' + esc(l.bal) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;color:#38bdf8;">' + esc(l.share) + '</td></tr>';
    }).join('');

    return [
      '<div class="zfa-kpi-grid">',
        kpiHtml('Total Capital Assets', '₹18,42,50,000', '+8.2% YoY', 'up', 'Liquid & fixed base', '🏛️'),
        kpiHtml('Shareholders Equity', '₹14,92,30,000', '81.0% of total', 'up', 'Net balance worth', '💎'),
        kpiHtml('Current Ratio', '3.82x', 'Healthy', 'up', 'Short-term liquidity', '💧'),
        kpiHtml('Quick Ratio', '3.15x', 'Ex-inventory', 'up', 'Instant coverage', '⚡'),
        kpiHtml('Debt to Equity', '0.11x', 'Conservative', 'up', 'Minimal leverage', '🛡️'),
        kpiHtml('Net Working Capital', '₹8,93,30,000', 'Strong buffer', 'up', 'Current surplus', '📈'),
      '</div>',
      '<div class="zfa-grid-2">',
        '<div class="zfa-card">',
          '<div class="zfa-card-head"><div><h3 class="zfa-card-title">💼 Assets (Total: ₹18,42,50,000)</h3><p class="zfa-card-sub">Current liquid resources and fixed clinical equipment</p></div></div>',
          '<div class="zfa-table-wrap">',
            '<table class="zfa-table">',
              '<thead><tr><th>Asset Class</th><th style="text-align:right;">Balance</th><th style="text-align:right;">Share %</th></tr></thead>',
              '<tbody>' + assetsHtml + '</tbody>',
            '</table>',
          '</div>',
        '</div>',
        '<div class="zfa-card">',
          '<div class="zfa-card-head"><div><h3 class="zfa-card-title">⚖️ Liabilities & Equity (Total: ₹18,42,50,000)</h3><p class="zfa-card-sub">External trade obligations and shareholder net worth</p></div></div>',
          '<div class="zfa-table-wrap">',
            '<table class="zfa-table">',
              '<thead><tr><th>Obligation / Capital Component</th><th style="text-align:right;">Balance</th><th style="text-align:right;">Share %</th></tr></thead>',
              '<tbody>' + liabHtml + '</tbody>',
            '</table>',
          '</div>',
        '</div>',
      '</div>'
    ].join('');
  }

  // 4. Cash Flow
  function renderCashFlow() {
    var cashItems = [
      { name: 'Cash Receipts from Veterinary Consults & Surgeries', sec: 'Operating (Inflow)', flow: '+₹1,02,40,000', color: '#10b981' },
      { name: 'Cash Receipts from Pharmacy & Retail Store Sales', sec: 'Operating (Inflow)', flow: '+₹28,60,000', color: '#10b981' },
      { name: 'Inbound Pet Insurance TPA Claims Settled', sec: 'Operating (Inflow)', flow: '+₹11,85,000', color: '#10b981' },
      { name: 'Cash Paid to Pharmaceutical & Surgical Suppliers', sec: 'Operating (Outflow)', flow: '-₹54,20,000', color: '#f87171' },
      { name: 'Salaries Disbursed to Doctors, Nurses & Clinic Teams', sec: 'Operating (Outflow)', flow: '-₹24,80,000', color: '#f87171' },
      { name: 'Hospital Facility Leases & Diagnostic Lab Utilities', sec: 'Operating (Outflow)', flow: '-₹14,95,000', color: '#f87171' },
      { name: 'Statutory GST Cash Remittance & Advance Income Tax', sec: 'Operating (Outflow)', flow: '-₹16,45,000', color: '#f87171' },
      { name: 'Purchase of Ultrasound & Hematology Machines', sec: 'Investing (CAPEX)', flow: '-₹8,20,000', color: '#f87171' },
      { name: 'Monthly Repayment of Equipment Term Loans', sec: 'Financing (Outflow)', flow: '-₹2,50,000', color: '#f87171' },
      { name: 'Net Consolidated Monthly Cash Inflow (Runway Expansion)', sec: 'Net Position', flow: '+₹21,75,000', color: '#38bdf8' }
    ];

    var cashHtml = cashItems.map(function(c) {
      return '<tr><td style="color:#fff;font-weight:600;">' + esc(c.name) + '</td><td style="color:#94a3b8;">' + esc(c.sec) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;font-weight:700;color:' + c.color + ';">' + esc(c.flow) + '</td></tr>';
    }).join('');

    return [
      '<div class="zfa-kpi-grid">',
        kpiHtml('Operating Cash (CFO)', '₹32,45,000', '+14.2% MoM', 'up', 'Operating collections', '💧'),
        kpiHtml('Free Cash Flow (FCF)', '₹24,25,000', '74.7% of CFO', 'up', 'Post-capex surplus', '💎'),
        kpiHtml('Monthly Net Burn', '+₹24.25L', 'Self-sustaining', 'up', 'Cash generative', '🛡️'),
        kpiHtml('Liquid Runway', '14.2 Months', 'Self-funded', 'up', 'Zero external debt', '⏳'),
        kpiHtml('Operating Cash Ratio', '1.69x', 'Healthy', 'up', 'Covers current liabilities', '📈'),
        kpiHtml('Treasury Cleared', '₹8,84,00,000', 'Audit-verified', 'up', 'Core bank balances', '🏦'),
      '</div>',
      '<div class="zfa-card">',
        '<div class="zfa-card-head"><div><h3 class="zfa-card-title">🌊 Direct Cash Flow Statement Waterfall</h3><p class="zfa-card-sub">Operating cash collections, capital investments, and financing service</p></div><span class="zfa-badge green">DIRECT GAAP</span></div>',
        '<div class="zfa-table-wrap">',
          '<table class="zfa-table">',
            '<thead><tr><th>Activity Item</th><th>Section</th><th style="text-align:right;">Net Flow (INR)</th></tr></thead>',
            '<tbody>' + cashHtml + '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  // 5. Revenue
  function renderRevenue() {
    var revStreams = [
      { name: 'Specialty Orthopedic & Soft-Tissue Surgery', channel: 'Inpatient Hospital', rev: '₹42,80,000', vol: '124 cases', avg: '₹34,516', share: '30.0%', growth: '+15.2%' },
      { name: 'Veterinary General & Specialist OPD Consults', channel: 'Clinical Outpatient', rev: '₹34,50,000', vol: '1,865 visits', avg: '₹1,850', share: '24.2%', growth: '+8.4%' },
      { name: 'In-House Pathology & Radiology Diagnostics', channel: 'Diagnostic Lab', rev: '₹28,40,000', vol: '2,980 tests', avg: '₹953', share: '19.9%', growth: '+14.1%' },
      { name: 'Emergency 24/7 Critical Care & ICU Care', channel: 'Emergency Hub', rev: '₹19,25,000', vol: '310 pet-days', avg: '₹6,210', share: '13.5%', growth: '+18.5%' },
      { name: 'Prescription Pharmaceuticals & Injectables', channel: 'Pharmacy Counter', rev: '₹10,50,000', vol: '3,420 orders', avg: '₹307', share: '7.3%', growth: '+6.2%' },
      { name: 'Therapeutic Diets & Veterinary Supplements', channel: 'Retail & Wellness', rev: '₹7,40,000', vol: '840 units', avg: '₹881', share: '5.2%', growth: '+9.0%' },
      { name: 'Preventive Wellness Annual Care Subscriptions', channel: 'Digital Membership', rev: '₹5,20,000', vol: '650 members', avg: '₹800/mo', share: '3.6%', growth: '+24.0%' },
      { name: 'Corporate Pet Benefits & NGO Welfare Plans', channel: 'B2B Enterprise', rev: '₹4,80,000', vol: '12 contracts', avg: '₹40,000', share: '3.4%', growth: '+12.5%' },
      { name: 'Veterinary Dental Scaling & Oral Maxillofacial', channel: 'Clinical Dentistry', rev: '₹3,80,000', vol: '82 cases', avg: '₹4,634', share: '2.7%', growth: '+11.8%' },
      { name: 'Telemedicine Remote Consults & Home Delivery', channel: 'Digital App Rail', rev: '₹2,20,000', vol: '440 calls', avg: '₹500', share: '1.5%', growth: '+31.4%' }
    ];

    var revHtml = revStreams.map(function(s) {
      return '<tr><td style="color:#fff;font-weight:600;">' + esc(s.name) + '</td><td style="color:#38bdf8;">' + esc(s.channel) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;font-weight:700;color:#10b981;">' + esc(s.rev) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;color:#cbd5e1;">' + esc(s.vol) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;color:#94a3b8;">' + esc(s.avg) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;color:#38bdf8;">' + esc(s.share) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;color:#10b981;font-weight:600;">' + esc(s.growth) + '</td></tr>';
    }).join('');

    return [
      '<div class="zfa-kpi-grid">',
        kpiHtml('Monthly Run-Rate (MRR)', '₹1,42,85,000', '+12.4% MoM', 'up', 'Gross monthly billings', '💰'),
        kpiHtml('Annualized Run-Rate (ARR)', '₹17.14 Cr', '+28.5% YoY', 'up', 'Forward pace', '🌐'),
        kpiHtml('Avg Ticket / Consultation', '₹1,850', '+6.8% MoM', 'up', 'OPD average value', '🐾'),
        kpiHtml('Avg Ticket / Surgery', '₹34,500', '+11.2% MoM', 'up', 'Ortho & soft-tissue', '🩺'),
        kpiHtml('Pharmacy Attach Rate', '76.4%', '+3.2% pts', 'up', 'Prescription fulfillment', '💊'),
        kpiHtml('ASC 606 / Ind-AS 115', '100.0%', 'Reconciled', 'up', 'Clean recognition', '🛡️'),
      '</div>',
      '<div class="zfa-card">',
        '<div class="zfa-card-head"><div><h3 class="zfa-card-title">💵 Revenue Stream Breakdown</h3><p class="zfa-card-sub">Commercial intake across outpatient clinics, surgical hospitals, pharmacy, and corporate accounts</p></div><button class="zfa-btn primary" onclick="alert(\'Exporting revenue breakdown ledger (CSV)...\')">Export Revenue CSV</button></div>',
        '<div class="zfa-table-wrap">',
          '<table class="zfa-table">',
            '<thead><tr><th>Stream Name</th><th>Channel Type</th><th style="text-align:right;">Monthly Revenue</th><th style="text-align:right;">Volume</th><th style="text-align:right;">Avg Ticket</th><th style="text-align:right;">Share %</th><th style="text-align:right;">MoM Growth</th></tr></thead>',
            '<tbody>' + revHtml + '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  // 6. Expenses
  function renderExpenses() {
    var opexLines = [
      { code: 'OPX-101', name: 'Clinical Surgeons & Specialists Compensation', center: 'Medical Operations', budget: '₹14,50,000', actual: '₹14,20,000', var: '+₹30,000', pct: '31.1%' },
      { code: 'OPX-102', name: 'Registered Veterinary Nurses & Para-vet Staff', center: 'Nursing & Care', budget: '₹6,80,000', actual: '₹6,60,000', var: '+₹20,000', pct: '14.4%' },
      { code: 'OPX-103', name: 'Hospital Facility Leases (14 Units Across Metros)', center: 'Real Estate', budget: '₹11,50,000', actual: '₹11,50,000', var: '₹0', pct: '25.2%' },
      { code: 'OPX-104', name: 'Medical Electricity, Backup Diesel & Clean HVAC', center: 'Facilities', budget: '₹2,60,000', actual: '₹2,45,000', var: '+₹15,000', pct: '5.4%' },
      { code: 'OPX-105', name: 'Liquid Oxygen & Medical Gas Pipeline Cylinders', center: 'OT Facilities', budget: '₹1,10,000', actual: '₹1,00,000', var: '+₹10,000', pct: '2.2%' },
      { code: 'OPX-106', name: 'Biohazard & Clinical Hazardous Waste Logistics', center: 'Sanitation', budget: '₹85,000', actual: '₹82,000', var: '+₹3,000', pct: '1.8%' },
      { code: 'OPX-107', name: 'Diagnostic Equipment AMCs (CT, MRI, Ultrasound)', center: 'Biomedical Engg', budget: '₹3,20,000', actual: '₹3,15,000', var: '+₹5,000', pct: '6.9%' },
      { code: 'OPX-108', name: 'AWS Cloud Infrastructure, Tele-EHR & IT SaaS', center: 'Technology', budget: '₹2,10,000', actual: '₹1,95,000', var: '+₹15,000', pct: '4.3%' },
      { code: 'OPX-109', name: 'Local Pet Parent Digital Acquisition & Camp CAC', center: 'Marketing', budget: '₹2,80,000', actual: '₹2,60,000', var: '+₹20,000', pct: '5.7%' },
      { code: 'OPX-110', name: 'Statutory Legal, Secretarial & CA Audit Retainer', center: 'Finance & Admin', budget: '₹1,55,000', actual: '₹1,44,600', var: '+₹10,400', pct: '3.2%' }
    ];

    var opexHtml = opexLines.map(function(o) {
      return '<tr><td style="font-family:\'IBM Plex Mono\',monospace;color:#38bdf8;">' + esc(o.code) + '</td><td style="color:#fff;font-weight:600;">' + esc(o.name) + '</td><td style="color:#94a3b8;">' + esc(o.center) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;color:#94a3b8;">' + esc(o.budget) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;font-weight:700;color:#10b981;">' + esc(o.actual) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;color:#34d399;">' + esc(o.var) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;color:#38bdf8;">' + esc(o.pct) + '</td></tr>';
    }).join('');

    return [
      '<div class="zfa-kpi-grid">',
        kpiHtml('Total Monthly OPEX', '₹45,71,600', '-1.8% vs budget', 'up', 'Total operating costs', '🏢'),
        kpiHtml('Staffing & Payroll', '₹24,80,00,0', '54.2% of OPEX', 'neutral', 'Surgeons, nurses, tech', '👨‍⚕️'),
        kpiHtml('Facility Leases', '₹11,50,000', '25.2% of OPEX', 'neutral', '14 hospital locations', '📍'),
        kpiHtml('Hospital Utilities', '₹3,45,000', '7.5% of OPEX', 'up', 'Electricity, medical O2', '⚡'),
        kpiHtml('Marketing & CAC', '₹2,60,000', 'CAC ₹420', 'up', 'Digital pet parent ads', '📣'),
        kpiHtml('Budget Compliance', '98.2%', 'Audited', 'up', 'Under strict limit', '🛡️'),
      '</div>',
      '<div class="zfa-card">',
        '<div class="zfa-card-head"><div><h3 class="zfa-card-title">📋 OPEX Departmental Ledger</h3><p class="zfa-card-sub">Approved budgets, actual disbursements, and variance</p></div><button class="zfa-btn primary" onclick="ZenveFinanceDashboard.showExpenseModal()">+ New Expense Voucher</button></div>',
        '<div class="zfa-table-wrap">',
          '<table class="zfa-table">',
            '<thead><tr><th>Code</th><th>Expense Line Item</th><th>Cost Center</th><th style="text-align:right;">Budget</th><th style="text-align:right;">Actual Spend</th><th style="text-align:right;">Variance</th><th style="text-align:right;">% OPEX</th></tr></thead>',
            '<tbody>' + opexHtml + '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  // 7. COGS
  function renderCOGS() {
    var cogsLines = [
      { code: 'CG-01', cat: 'Veterinary Vaccines & Immunoglobulins', spend: '₹14,50,000', rev: '₹34,50,000', margin: '58.0%', suppliers: 'Zoetis India, Boehringer' },
      { code: 'CG-02', cat: 'Surgical Implants & TPLO Fixation Plates', spend: '₹16,40,000', rev: '₹42,80,000', margin: '61.7%', suppliers: 'Synthes Vet, OrthoMed' },
      { code: 'CG-03', cat: 'IDEXX Catalyst Blood Chemistry Discs', spend: '₹8,60,000', rev: '₹21,50,000', margin: '60.0%', suppliers: 'IDEXX Laboratories India' },
      { code: 'CG-04', cat: 'Inpatient Anesthesia & Controlled Sedation', spend: '₹6,80,000', rev: '₹19,25,000', margin: '64.7%', suppliers: 'Neon Pharma, Piramal Critical' },
      { code: 'CG-05', cat: 'Therapeutic Prescription Pet Diets', spend: '₹4,50,000', rev: '₹7,40,000', margin: '39.2%', suppliers: 'Royal Canin, Hill\'s Pet' },
      { code: 'CG-06', cat: 'Wound Care, Catheters & Suture Packs', spend: '₹3,80,000', rev: '₹11,50,000', margin: '67.0%', suppliers: 'B. Braun Medical, Ethicon' },
      { code: 'CG-07', cat: 'Antimicrobials, NSAIDs & Chronic Rx', spend: '₹3,40,000', rev: '₹6,80,000', margin: '50.0%', suppliers: 'Virbac Animal Health, Intas' },
      { code: 'CG-08', cat: 'Digital X-Ray DR Plates & Ultrasound Gel', spend: '₹2,60,000', rev: '₹6,90,000', margin: '62.3%', suppliers: 'Fujifilm Sonosite, Wipro GE' },
      { code: 'CG-09', cat: 'Dental Prophy Consumables & Burs', spend: '₹1,25,000', rev: '₹3,80,000', margin: '67.1%', suppliers: 'iM3 Dental, Midmark' },
      { code: 'CG-10', cat: 'Chemotherapy Oncology Infusion Sets', spend: '₹1,00,000', rev: '₹3,10,000', margin: '67.7%', suppliers: 'Baxter Healthcare' }
    ];

    var cogsHtml = cogsLines.map(function(c) {
      return '<tr><td style="font-family:\'IBM Plex Mono\',monospace;color:#38bdf8;">' + esc(c.code) + '</td><td style="color:#fff;font-weight:600;">' + esc(c.cat) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;color:#f87171;font-weight:700;">' + esc(c.spend) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;color:#10b981;">' + esc(c.rev) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;color:#34d399;font-weight:600;">' + esc(c.margin) + '</td><td style="color:#94a3b8;">' + esc(c.suppliers) + '</td></tr>';
    }).join('');

    return [
      '<div class="zfa-kpi-grid">',
        kpiHtml('Total Monthly COGS', '₹62,85,000', '44.0% of rev', 'up', 'Direct care supplies', '📦'),
        kpiHtml('Pharma Procurement', '₹20,08,000', '31.9% of COGS', 'neutral', 'Vaccines & antibiotics', '💊'),
        kpiHtml('Surgical Hardware', '₹16,40,000', '26.1% of COGS', 'neutral', 'Implants & suture sets', '🔩'),
        kpiHtml('Diagnostic Consumables', '₹11,20,000', '17.8% of COGS', 'up', 'IDEXX reagent cartridges', '🔬'),
        kpiHtml('Manufacturer Rebates', '₹4,20,000', '6.7% yield', 'up', 'Quarterly volume tier', '🎁'),
        kpiHtml('Inventory Waste Rate', '0.42%', '-0.18% MoM', 'up', 'FEFO cold-chain control', '🛡️'),
      '</div>',
      '<div class="zfa-card">',
        '<div class="zfa-card-head"><div><h3 class="zfa-card-title">📦 Direct Material Absorption Schedule</h3><p class="zfa-card-sub">Procurement costs linked to healthcare service delivery</p></div><button class="zfa-btn primary" onclick="alert(\'Opening purchase order procurement terminal...\')">Vendor PO Run</button></div>',
        '<div class="zfa-table-wrap">',
          '<table class="zfa-table">',
            '<thead><tr><th>Code</th><th>Category</th><th style="text-align:right;">Direct Spend</th><th style="text-align:right;">Linked Revenue</th><th style="text-align:right;">Gross Margin</th><th>Key Suppliers</th></tr></thead>',
            '<tbody>' + cogsHtml + '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  // 8. Gross Profit
  function renderGrossProfit() {
    var depts = [
      { unit: 'Orthopedic & Neuro Surgery', rev: '₹42,80,000', cogs: '₹15,75,000', gp: '₹27,05,000', margin: '63.2%', target: '60.0%', status: 'Exceeding' },
      { unit: 'General & Laparoscopic Soft Surgery', rev: '₹21,50,000', cogs: '₹7,52,500', gp: '₹13,97,500', margin: '65.0%', target: '62.0%', status: 'Exceeding' },
      { unit: 'Advanced Radiology (MRI & CT-64)', rev: '₹16,40,000', cogs: '₹4,42,800', gp: '₹11,97,200', margin: '73.0%', target: '70.0%', status: 'Exceeding' },
      { unit: 'Inpatient Hospitalization & 24/7 ICU', rev: '₹19,25,000', cogs: '₹7,89,250', gp: '₹11,35,750', margin: '59.0%', target: '55.0%', status: 'Exceeding' },
      { unit: 'Outpatient Specialty Consultations', rev: '₹13,00,000', cogs: '₹3,64,000', gp: '₹9,36,000', margin: '72.0%', target: '68.0%', status: 'Exceeding' },
      { unit: 'Automated Pathology Laboratory', rev: '₹12,00,000', cogs: '₹4,63,200', gp: '₹7,36,800', margin: '61.4%', target: '60.0%', status: 'On Target' },
      { unit: 'Veterinary Oncology & Chemotherapy', rev: '₹6,40,000', cogs: '₹2,36,800', gp: '₹4,03,200', margin: '63.0%', target: '60.0%', status: 'Exceeding' },
      { unit: 'Preventive Vaccines & Parasiticides', rev: '₹4,20,000', cogs: '₹1,76,400', gp: '₹2,43,600', margin: '58.0%', target: '55.0%', status: 'Exceeding' },
      { unit: 'Specialty Prescription Pharmacy', rev: '₹5,80,000', cogs: '₹3,40,460', gp: '₹2,39,540', margin: '41.3%', target: '40.0%', status: 'On Target' },
      { unit: 'Veterinary Dental & Oral Surgery', rev: '₹3,80,000', cogs: '₹1,44,400', gp: '₹2,35,600', margin: '62.0%', target: '58.0%', status: 'Exceeding' }
    ];

    var deptHtml = depts.map(function(d) {
      return '<tr><td style="color:#fff;font-weight:600;">' + esc(d.unit) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;color:#38bdf8;">' + esc(d.rev) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;color:#f87171;">' + esc(d.cogs) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;font-weight:700;color:#10b981;">' + esc(d.gp) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;color:#34d399;font-weight:700;">' + esc(d.margin) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;color:#94a3b8;">' + esc(d.target) + '</td><td style="text-align:right;"><span class="zfa-badge green">' + esc(d.status) + '</span></td></tr>';
    }).join('');

    return [
      '<div class="zfa-kpi-grid">',
        kpiHtml('Total Gross Profit', '₹80,00,000', '+14.2% MoM', 'up', 'Consolidated trading', '💎'),
        kpiHtml('Blended Gross Margin', '56.0%', '+1.8% pts', 'up', 'Target: >54.0%', '📈'),
        kpiHtml('Surgical Gross Margin', '63.2%', 'High margin', 'up', 'Ortho & soft-tissue', '🩺'),
        kpiHtml('Diagnostics Margin', '61.4%', 'Automated lab', 'up', 'In-house IDEXX suites', '🔬'),
        kpiHtml('Pharmacy Gross Margin', '41.3%', 'Regulated trade', 'neutral', 'Cold-chain pharma', '💊'),
        kpiHtml('Price Realization Index', '108.4', '+2.4 pts', 'up', 'Premium care index', '🛡️'),
      '</div>',
      '<div class="zfa-card">',
        '<div class="zfa-card-head"><div><h3 class="zfa-card-title">💎 Gross Profit Contribution by Clinical Division</h3><p class="zfa-card-sub">Department gross margins after deducting direct medical materials</p></div><span class="zfa-badge green">ALL UNITS EXCEED TARGET</span></div>',
        '<div class="zfa-table-wrap">',
          '<table class="zfa-table">',
            '<thead><tr><th>Clinical Unit</th><th style="text-align:right;">Gross Revenue</th><th style="text-align:right;">Direct COGS</th><th style="text-align:right;">Gross Profit</th><th style="text-align:right;">Gross Margin %</th><th style="text-align:right;">Target Margin</th><th style="text-align:right;">Status</th></tr></thead>',
            '<tbody>' + deptHtml + '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  // 9. EBITDA
  function renderEBITDA() {
    var facs = [
      { code: 'FAC-01', name: 'Indiranagar Tertiary Flagship', city: 'Bengaluru', rev: '₹34,50,000', ebitda: '₹10,45,000', margin: '30.3%', status: 'Flagship Supercenter' },
      { code: 'FAC-02', name: 'Koramangala Supercare Centre', city: 'Bengaluru', rev: '₹28,20,000', ebitda: '₹7,89,600', margin: '28.0%', status: 'Mature Centre' },
      { code: 'FAC-03', name: 'Whitefield Emergency Hub', city: 'Bengaluru', rev: '₹22,40,000', ebitda: '₹5,82,400', margin: '26.0%', status: 'Mature Centre' },
      { code: 'FAC-04', name: 'Banjara Hills Multi-Specialty', city: 'Hyderabad', rev: '₹18,50,000', ebitda: '₹4,44,000', margin: '24.0%', status: 'Scaling Centre' },
      { code: 'FAC-05', name: 'Jayanagar Wellness Clinic', city: 'Bengaluru', rev: '₹12,80,000', ebitda: '₹3,07,200', margin: '24.0%', status: 'Steady State' },
      { code: 'FAC-06', name: 'Gachibowli Tech Care Annex', city: 'Hyderabad', rev: '₹8,50,000', ebitda: '₹1,87,000', margin: '22.0%', status: 'Ramping Up' },
      { code: 'FAC-07', name: 'Adyar Companion Care Unit', city: 'Chennai', rev: '₹6,40,000', ebitda: '₹1,28,000', margin: '20.0%', status: 'Ramping Up' },
      { code: 'FAC-08', name: 'HSR Layout Neighborhood Annex', city: 'Bengaluru', rev: '₹4,20,000', ebitda: '₹75,600', margin: '18.0%', status: 'Cash Positive' },
      { code: 'FAC-09', name: 'Anna Nagar Pet Wellness Point', city: 'Chennai', rev: '₹3,10,000', ebitda: '₹49,600', margin: '16.0%', status: 'Break-even Met' },
      { code: 'FAC-10', name: 'Lavelle Road Specialty Referral', city: 'Bengaluru', rev: '₹2,50,000', ebitda: '₹35,000', margin: '14.0%', status: 'Break-even Met' }
    ];

    var facHtml = facs.map(function(f) {
      return '<tr><td style="color:#fff;font-weight:600;"><span style="font-family:\'IBM Plex Mono\',monospace;color:#38bdf8;margin-right:6px;">' + esc(f.code) + '</span>' + esc(f.name) + '</td><td style="color:#94a3b8;">' + esc(f.city) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;color:#38bdf8;">' + esc(f.rev) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;font-weight:700;color:#10b981;">' + esc(f.ebitda) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;color:#34d399;font-weight:700;">' + esc(f.margin) + '</td><td style="text-align:right;"><span class="zfa-badge green">' + esc(f.status) + '</span></td></tr>';
    }).join('');

    return [
      '<div class="zfa-kpi-grid">',
        kpiHtml('Operating EBITDA (MTD)', '₹34,28,400', '24.0% margin', 'up', 'Core operational profit', '⚡'),
        kpiHtml('Normalized Adj. EBITDA', '₹35,88,400', '+1.6L add-backs', 'up', 'Excluding non-recurring', '💎'),
        kpiHtml('Annualized EBITDA Run-rate', '₹4.11 Cr', '+24.5% YoY', 'up', 'FY27 baseline', '📈'),
        kpiHtml('EBITDA-to-Cash Ratio', '94.6%', 'High quality', 'up', 'Zero paper profits', '💧'),
        kpiHtml('Flagship Hospital EBITDA', '30.3%', 'Indiranagar center', 'up', 'Mature facility margin', '🏥'),
        kpiHtml('Break-even Month', '8.4 Months', 'Speedy ramp', 'up', 'New clinic break-even', '⏱️'),
      '</div>',
      '<div class="zfa-card">',
        '<div class="zfa-card-head"><div><h3 class="zfa-card-title">⚡ Facility-Level EBITDA Ranking</h3><p class="zfa-card-sub">Operating profit generated by each hospital and outpatient center</p></div><span class="zfa-badge green">100% LOCATIONS POSITIVE</span></div>',
        '<div class="zfa-table-wrap">',
          '<table class="zfa-table">',
            '<thead><tr><th>Facility</th><th>City</th><th style="text-align:right;">Revenue</th><th style="text-align:right;">EBITDA</th><th style="text-align:right;">EBITDA Margin</th><th style="text-align:right;">Status</th></tr></thead>',
            '<tbody>' + facHtml + '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  // 10. Net Profit
  function renderNetProfit() {
    var quarters = [
      { quarter: 'FY24 Q1', rev: '₹92,50,000', ebitda: '₹19,42,500', pat: '₹11,10,000', margin: '12.0%', eps: '₹7.40' },
      { quarter: 'FY24 Q2', rev: '₹98,20,000', ebitda: '₹21,60,400', pat: '₹12,76,600', margin: '13.0%', eps: '₹8.51' },
      { quarter: 'FY24 Q3', rev: '₹1,04,50,000', ebitda: '₹24,03,500', pat: '₹14,63,000', margin: '14.0%', eps: '₹9.75' },
      { quarter: 'FY24 Q4', rev: '₹1,12,00,000', ebitda: '₹26,88,000', pat: '₹16,80,000', margin: '15.0%', eps: '₹11.20' },
      { quarter: 'FY25 Q1', rev: '₹1,18,40,000', ebitda: '₹28,41,600', pat: '₹18,35,200', margin: '15.5%', eps: '₹12.23' },
      { quarter: 'FY25 Q2', rev: '₹1,24,60,000', ebitda: '₹31,15,000', pat: '₹20,55,900', margin: '16.5%', eps: '₹13.71' },
      { quarter: 'FY25 Q3', rev: '₹1,31,20,000', ebitda: '₹34,11,200', pat: '₹22,96,000', margin: '17.5%', eps: '₹15.31' },
      { quarter: 'FY25 Q4', rev: '₹1,38,00,000', ebitda: '₹35,88,000', pat: '₹24,84,000', margin: '18.0%', eps: '₹16.56' },
      { quarter: 'FY26 Q1', rev: '₹1,40,50,000', ebitda: '₹36,53,000', pat: '₹25,57,100', margin: '18.2%', eps: '₹17.05' },
      { quarter: 'FY26 Q2 (Current)', rev: '₹1,42,85,000', ebitda: '₹37,14,100', pat: '₹26,10,200', margin: '18.3%', eps: '₹17.40' }
    ];

    var qHtml = quarters.map(function(q) {
      return '<tr><td style="color:#fff;font-weight:600;">' + esc(q.quarter) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;color:#94a3b8;">' + esc(q.rev) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;color:#38bdf8;">' + esc(q.ebitda) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;font-weight:700;color:#10b981;">' + esc(q.pat) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;color:#34d399;font-weight:600;">' + esc(q.margin) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;color:#fff;">' + esc(q.eps) + '</td></tr>';
    }).join('');

    return [
      '<div class="zfa-kpi-grid">',
        kpiHtml('Net Profit (PAT)', '₹26,10,200', '+14.8% YoY', 'up', 'Current month surplus', '🏆'),
        kpiHtml('Net Profit Margin', '18.3%', '+2.8% pts', 'up', 'Consolidated margin', '📈'),
        kpiHtml('Profit Before Tax (PBT)', '₹34,80,267', '+13.5% YoY', 'up', 'Operating surplus', '💼'),
        kpiHtml('Effective Tax Rate', '25.0%', 'Stable', 'neutral', 'Section 115BAA corporate', '🏛️'),
        kpiHtml('Annualized PAT Run-rate', '₹3.13 Cr', '+14.8% YoY', 'up', 'For network expansion', '🏗️'),
        kpiHtml('Earnings Per Share (EPS)', '₹17.40', '+12.4% YoY', 'up', 'Common equity base', '💎'),
      '</div>',
      '<div class="zfa-card">',
        '<div class="zfa-card-head"><div><h3 class="zfa-card-title">🏆 Bottom-Line Earnings Bridge & Quarterly Trend</h3><p class="zfa-card-sub">Consecutive quarterly profit acceleration</p></div><span class="zfa-badge green">CONSISTENT EXPANSION</span></div>',
        '<div class="zfa-table-wrap">',
          '<table class="zfa-table">',
            '<thead><tr><th>Reporting Quarter</th><th style="text-align:right;">Gross Revenue</th><th style="text-align:right;">Operating EBITDA</th><th style="text-align:right;">Net PAT</th><th style="text-align:right;">PAT Margin %</th><th style="text-align:right;">EPS (INR)</th></tr></thead>',
            '<tbody>' + qHtml + '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  // 11. Accounts Receivable
  function renderReceivables() {
    var debtors = [
      { id: 'AR-301', client: 'Bajaj Allianz Pet Insurance TPA', type: 'Insurance TPA', totalDue: '₹6,40,000', bucket: '0–30 Days', dso: '18 Days', status: 'Current' },
      { id: 'AR-302', client: 'Digit Pet Shield Direct Settlement', type: 'Insurance TPA', totalDue: '₹4,80,000', bucket: '0–30 Days', dso: '21 Days', status: 'Current' },
      { id: 'AR-303', client: 'Paws & Care Canine Rescue NGO', type: 'Charity / NGO', totalDue: '₹1,20,000', bucket: '0–30 Days', dso: '25 Days', status: 'Current' },
      { id: 'AR-304', client: 'Bangalore Police K9 Unit Care', type: 'Government Contract', totalDue: '₹3,50,000', bucket: '0–30 Days', dso: '28 Days', status: 'Scheduled' },
      { id: 'AR-305', client: 'Tails Corporate Pet Wellness Bengaluru', type: 'B2B Corporate Wellness', totalDue: '₹2,30,000', bucket: '0–30 Days', dso: '24 Days', status: 'Current' },
      { id: 'AR-306', client: 'Future Generali Pet Health Claim Desk', type: 'Insurance TPA', totalDue: '₹3,60,000', bucket: '31–60 Days', dso: '42 Days', status: 'Follow-up' },
      { id: 'AR-307', client: 'ZenVe Corporate Staff Pet Benefit Plan', type: 'Employee Benefit', totalDue: '₹1,80,000', bucket: '31–60 Days', dso: '36 Days', status: 'Scheduled' },
      { id: 'AR-308', client: 'Dr. Sharma Satellite Referral Clinic', type: 'Partner Clinic Network', totalDue: '₹1,40,000', bucket: '31–60 Days', dso: '45 Days', status: 'Warning' },
      { id: 'AR-309', client: 'Blue Cross Community Animal Aid', type: 'Animal Welfare Trust', totalDue: '₹2,10,000', bucket: '61–90 Days', dso: '68 Days', status: 'Escalated' },
      { id: 'AR-310', client: 'VIP Elite Kennel Club Breeding Group', type: 'Institutional Breeder', totalDue: '₹1,40,000', bucket: '90+ Days', dso: '104 Days', status: 'Notice Sent' }
    ];

    var dHtml = debtors.map(function(d) {
      return '<tr><td style="color:#fff;font-weight:600;"><span style="font-family:\'IBM Plex Mono\',monospace;color:#38bdf8;margin-right:6px;">' + esc(d.id) + '</span>' + esc(d.client) + '</td><td style="color:#94a3b8;">' + esc(d.type) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;font-weight:700;color:#38bdf8;">' + esc(d.totalDue) + '</td><td><span class="zfa-badge ' + (d.bucket.indexOf('0–30') >= 0 ? 'green' : d.bucket.indexOf('31–60') >= 0 ? 'blue' : 'amber') + '">' + esc(d.bucket) + '</span></td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;color:#cbd5e1;">' + esc(d.dso) + '</td><td style="text-align:right;"><span class="zfa-badge ' + (d.status === 'Current' || d.status === 'Scheduled' ? 'green' : 'red') + '">' + esc(d.status) + '</span></td></tr>';
    }).join('');

    return [
      '<div class="zfa-kpi-grid">',
        kpiHtml('Total Receivables (AR)', '₹28,50,000', '-4.2% MoM', 'up', '10 corporate accounts', '📥'),
        kpiHtml('Days Sales Outstanding (DSO)', '22 Days', '-3 Days MoM', 'up', 'Benchmark 35 days', '⏱️'),
        kpiHtml('Current (0–30 Days)', '₹18,20,000', '63.9% of AR', 'up', 'Healthy collections', '🛡️'),
        kpiHtml('31–60 Days Overdue', '₹6,80,000', '23.8% of AR', 'neutral', 'Active follow-up', '⚡'),
        kpiHtml('Overdue >60 Days', '₹3,50,000', '12.3% of AR', 'down', 'Escalated follow-up', '🚨'),
        kpiHtml('Bad Debt Provision', '₹45,000', '1.5% coverage', 'up', 'Negligible credit loss', '💎'),
      '</div>',
      '<div class="zfa-card">',
        '<div class="zfa-card-head"><div><h3 class="zfa-card-title">📋 Trade Debtors & Corporate Receivables Schedule</h3><p class="zfa-card-sub">Outstanding balances by insurance TPAs and corporate wellness programs</p></div><button class="zfa-btn primary" onclick="alert(\'Sending automated payment reminder WhatsApp/Email notices...\')">📢 Send Reminders</button></div>',
        '<div class="zfa-table-wrap">',
          '<table class="zfa-table">',
            '<thead><tr><th>Debtor / Partner</th><th>Account Type</th><th style="text-align:right;">Total Due</th><th>Aging Bucket</th><th style="text-align:right;">Client DSO</th><th style="text-align:right;">Status</th></tr></thead>',
            '<tbody>' + dHtml + '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  // 12. Accounts Payable
  function renderPayables() {
    var payables = [
      { id: 'AP-501', vendor: 'Zoetis India Biologicals Ltd', cat: 'Vaccines & Monoclonal', bal: '₹4,20,000', terms: 'Net 45', due: 'In 12 Days', disc: '₹8,400 (2%)', status: 'Approved for Batch' },
      { id: 'AP-502', vendor: 'Boehringer Ingelheim Animal Health', cat: 'Cardiology & Parasiticides', bal: '₹3,10,000', terms: 'Net 30', due: 'In 4 Days', disc: '₹6,200 (2%)', status: 'Approved for Batch' },
      { id: 'AP-503', vendor: 'IDEXX Laboratories Diagnostics India', cat: 'Analyzer Reagents & Cartridges', bal: '₹2,60,000', terms: 'Net 30', due: 'In 8 Days', disc: '₹5,200 (2%)', status: 'Approved for Batch' },
      { id: 'AP-504', vendor: 'Royal Canin India Clinical Feeds', cat: 'Therapeutic Nutrition', bal: '₹2,15,000', terms: 'Net 30', due: 'In 15 Days', disc: '₹4,300 (2%)', status: 'Scheduled' },
      { id: 'AP-505', vendor: 'B. Braun Medical Surgical Supplies', cat: 'IV Sets & Suture Consumables', bal: '₹1,85,000', terms: 'Net 60', due: 'In 22 Days', disc: '₹3,700 (2%)', status: 'Pending GRN' },
      { id: 'AP-506', vendor: 'Virbac Animal Health India', cat: 'Dermatology & Otic Care', bal: '₹1,60,000', terms: 'Net 45', due: 'In 18 Days', disc: '₹3,200 (2%)', status: 'Approved for Batch' },
      { id: 'AP-507', vendor: 'Wipro GE Healthcare Diagnostics', cat: 'Ultrasound AMC & Spares', bal: '₹1,40,000', terms: 'Net 30', due: 'In 5 Days', disc: '₹2,800 (2%)', status: 'Scheduled' },
      { id: 'AP-508', vendor: 'PetsFirst Sterilization & Waste Logistics', cat: 'Biohazard Medical Waste', bal: '₹65,000', terms: 'Net 15', due: 'Overdue', disc: 'None', status: 'Disputed' },
      { id: 'AP-509', vendor: 'Hill\'s Pet Nutrition Prescription Diet', cat: 'Renal & Mobility Kibble', bal: '₹95,000', terms: 'Net 30', due: 'In 19 Days', disc: '₹1,900 (2%)', status: 'Scheduled' },
      { id: 'AP-510', vendor: 'Elanco India Parasiticide Care', cat: 'Dewormers & Topical Sprays', bal: '₹70,000', terms: 'Net 45', due: 'In 25 Days', disc: '₹1,400 (2%)', status: 'Approved for Batch' }
    ];

    var pHtml = payables.map(function(p) {
      return '<tr><td style="color:#fff;font-weight:600;"><span style="font-family:\'IBM Plex Mono\',monospace;color:#38bdf8;margin-right:6px;">' + esc(p.id) + '</span>' + esc(p.vendor) + '</td><td style="color:#94a3b8;">' + esc(p.cat) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;font-weight:700;color:#f87171;">' + esc(p.bal) + '</td><td style="text-align:center;color:#cbd5e1;">' + esc(p.terms) + '</td><td style="text-align:center;font-family:\'IBM Plex Mono\',monospace;color:' + (p.due === 'Overdue' ? '#f87171' : '#38bdf8') + ';">' + esc(p.due) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;color:#10b981;">' + esc(p.disc) + '</td><td style="text-align:right;"><span class="zfa-badge ' + (p.status.indexOf('Approved') >= 0 || p.status.indexOf('Scheduled') >= 0 ? 'green' : 'amber') + '">' + esc(p.status) + '</span></td></tr>';
    }).join('');

    return [
      '<div class="zfa-kpi-grid">',
        kpiHtml('Total Payables (AP)', '₹19,20,000', 'Optimal working cap', 'up', '10 active suppliers', '📤'),
        kpiHtml('Days Payable Outstanding', '34 Days', '+4 Days MoM', 'up', 'Terms maximized', '⏱️'),
        kpiHtml('Approved for Immediate Run', '₹9,45,000', '49.2% of AP', 'up', '3-way match verified', '✅'),
        kpiHtml('Early Cash Discounts', '₹38,400', '2.0% average', 'up', 'Early settlement savings', '🎁'),
        kpiHtml('Pending GRN Match', '₹1,85,000', 'Warehouse hold', 'neutral', 'Physical count in-transit', '🔍'),
        kpiHtml('Disputed Invoices', '₹65,000', '1 billing mismatch', 'down', 'Biohazard waste billing', '⚠️'),
      '</div>',
      '<div class="zfa-card">',
        '<div class="zfa-card-head"><div><h3 class="zfa-card-title">📑 Trade Creditors & Supplier Settlement Queue</h3><p class="zfa-card-sub">3-way matching verified against Purchase Order (PO) and Goods Receipt Note (GRN)</p></div><button class="zfa-btn primary" onclick="alert(\'Executing batch payment run via HDFC CMS-NEFT...\')">💳 Execute NEFT Batch Run</button></div>',
        '<div class="zfa-table-wrap">',
          '<table class="zfa-table">',
            '<thead><tr><th>Vendor / Supplier</th><th>Category</th><th style="text-align:right;">Balance Due</th><th style="text-align:center;">Credit Terms</th><th style="text-align:center;">Due In</th><th style="text-align:right;">Early Cash Discount</th><th style="text-align:right;">Status</th></tr></thead>',
            '<tbody>' + pHtml + '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  // 13. Invoices
  function renderInvoices() {
    var invList = [
      { id: 'INV-2026-901', date: '2026-10-14', client: 'Vikram Rao (Max - Golden Retriever)', fac: 'Indiranagar Flagship', desc: 'TPLO Cruciate Knee Surgery & Implant', taxable: '₹48,000', gst: '₹8,640', total: '₹56,640', st: 'Paid' },
      { id: 'INV-2026-902', date: '2026-10-14', client: 'Ananya Deshmukh (Milo - Persian Cat)', fac: 'Koramangala Supercare', desc: 'Feline Renal Ultrasound & Bloods', taxable: '₹9,500', gst: '₹1,710', total: '₹11,210', st: 'Paid' },
      { id: 'INV-2026-903', date: '2026-10-13', client: 'Karan Singhania (Thor - Rottweiler)', fac: 'Whitefield Emergency Hub', desc: 'GDV Emergency Gastropexy', taxable: '₹62,000', gst: '₹11,160', total: '₹73,160', st: 'Paid' },
      { id: 'INV-2026-904', date: '2026-10-13', client: 'Pooja Hegde (Bella - Shih Tzu)', fac: 'Jayanagar Wellness Clinic', desc: 'Annual Vaccination & Dental Scaling', taxable: '₹6,800', gst: '₹1,224', total: '₹8,024', st: 'Paid' },
      { id: 'INV-2026-905', date: '2026-10-12', client: 'Bajaj Allianz Pet Claim (Bruno)', fac: 'Indiranagar Flagship', desc: 'Inpatient Chemotherapy & Monoclonal', taxable: '₹38,000', gst: '₹6,840', total: '₹44,840', st: 'Pending' },
      { id: 'INV-2026-906', date: '2026-10-12', client: 'Rohit Verma (Simba - German Shepherd)', fac: 'HSR Layout Annex', desc: 'Digital X-Ray Bilateral Hips & Rx', taxable: '₹8,200', gst: '₹1,476', total: '₹9,676', st: 'Paid' },
      { id: 'INV-2026-907', date: '2026-10-11', client: 'Digit Pet TPA (Luna - Labrador)', fac: 'Koramangala Supercare', desc: 'Arthroscopic Joint Debridement & MRI', taxable: '₹54,000', gst: '₹9,720', total: '₹63,720', st: 'Pending' },
      { id: 'INV-2026-908', date: '2026-10-10', client: 'Bangalore K9 Squad (Rex)', fac: 'Indiranagar Flagship', desc: 'Orthopedic Plate Revision & Rehab', taxable: '₹42,500', gst: '₹7,650', total: '₹50,150', st: 'Paid' },
      { id: 'INV-2026-909', date: '2026-10-09', client: 'Siddharth Nambiar (Oscar - Beagle)', fac: 'Lavelle Road Specialty', desc: 'Endoscopic Foreign Body Removal', taxable: '₹31,000', gst: '₹5,580', total: '₹36,580', st: 'Paid' },
      { id: 'INV-2026-910', date: '2026-09-28', client: 'Elite Kennel Breeders (Litter of 6)', fac: 'Whitefield Emergency Hub', desc: 'Pre-adoption Screening & Microchip', taxable: '₹24,000', gst: '₹4,320', total: '₹28,320', st: 'Overdue' }
    ];

    var invHtml = invList.map(function(inv) {
      return '<tr><td style="font-family:\'IBM Plex Mono\',monospace;color:#38bdf8;font-weight:600;">' + esc(inv.id) + '</td><td style="color:#cbd5e1;">' + esc(inv.date) + '</td><td style="color:#fff;font-weight:600;">' + esc(inv.client) + '</td><td style="color:#94a3b8;">' + esc(inv.fac) + '</td><td style="color:#cbd5e1;">' + esc(inv.desc) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;">' + esc(inv.taxable) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;color:#fbbf24;">' + esc(inv.gst) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;font-weight:700;color:#10b981;">' + esc(inv.total) + '</td><td><span class="zfa-badge ' + (inv.st === 'Paid' ? 'green' : inv.st === 'Pending' ? 'blue' : 'red') + '">' + esc(inv.st) + '</span></td><td style="text-align:center;"><button class="zfa-btn ghost" style="padding:2px 8px;font-size:11px;" onclick="alert(\'Printing tax invoice PDF for ' + esc(inv.id) + '...\')">📄 PDF</button></td></tr>';
    }).join('');

    return [
      '<div class="zfa-kpi-grid">',
        kpiHtml('Invoices Issued (MTD)', '3,420', '+11.4% MoM', 'up', 'GST Compliant', '🧾'),
        kpiHtml('Total Invoiced Value', '₹1,42,85,000', '₹21.79L GST Output', 'up', 'Consolidated billings', '💰'),
        kpiHtml('Settled / Paid', '₹1,14,35,000', '80.0% settlement', 'up', 'Instant POS & digital', '✅'),
        kpiHtml('Pending Settlement', '₹24,80,000', 'Within credit terms', 'neutral', 'Corporate & insurance', '⏳'),
        kpiHtml('Overdue Invoices', '₹3,70,000', '2.6% of total', 'down', 'Follow-up notices sent', '⚠️'),
        kpiHtml('e-Invoice IRN Sync', '99.9%', 'Sub-second sync', 'up', 'NIC e-Invoice portal', '📶'),
      '</div>',
      '<div class="zfa-card">',
        '<div class="zfa-card-head"><div><h3 class="zfa-card-title">📑 GST Tax Invoices Register</h3><p class="zfa-card-sub">Compliant digital receipts with HSN/SAC codes and automated IRN hash generation</p></div><button class="zfa-btn primary" onclick="ZenveFinanceDashboard.showInvoiceModal()">+ Generate Tax Invoice</button></div>',
        '<div class="zfa-table-wrap">',
          '<table class="zfa-table">',
            '<thead><tr><th>Invoice ID</th><th>Date</th><th>Client / Pet</th><th>Facility</th><th>Clinical Description</th><th style="text-align:right;">Taxable</th><th style="text-align:right;">18% GST</th><th style="text-align:right;">Total</th><th>Status</th><th style="text-align:center;">Action</th></tr></thead>',
            '<tbody>' + invHtml + '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  // 14. Payments
  function renderPayments() {
    var rails = [
      { name: 'Razorpay Dynamic QR UPI', vol: '₹46,20,000', txns: '4,120', mdr: '0.00%', fee: '₹0', net: '₹46,20,000', st: 'T+0 Instant' },
      { name: 'Pine Labs Android Smart POS (Debit)', vol: '₹32,50,000', txns: '1,840', mdr: '0.90%', fee: '₹29,250', net: '₹32,20,750', st: 'T+1 Morning' },
      { name: 'PhonePe Merchant QR Gateway', vol: '₹15,65,000', txns: '1,380', mdr: '0.00%', fee: '₹0', net: '₹15,65,000', st: 'T+0 Instant' },
      { name: 'Pine Labs Credit Card POS (Visa/MC)', vol: '₹10,30,000', txns: '410', mdr: '1.65%', fee: '₹16,995', net: '₹10,13,005', st: 'T+1 Morning' },
      { name: 'Cashfree B2B Virtual Accounts (NEFT)', vol: '₹5,80,000', txns: '85', mdr: '₹15/txn', fee: '₹1,275', net: '₹5,78,725', st: 'T+0 Direct' },
      { name: 'HDFC SmartHub Retail NetBanking', vol: '₹1,90,000', txns: '142', mdr: '1.20%', fee: '₹2,280', net: '₹1,87,720', st: 'T+1 Sweep' },
      { name: 'Stripe International Card Gateway', vol: '₹1,20,000', txns: '28', mdr: '2.90%', fee: '₹3,480', net: '₹1,16,520', st: 'T+2 Global' },
      { name: 'PayU PG Checkout Fallback Rail', vol: '₹80,000', txns: '64', mdr: '1.40%', fee: '₹1,120', net: '₹78,880', st: 'T+1 Morning' }
    ];

    var railHtml = rails.map(function(r) {
      return '<tr><td style="color:#fff;font-weight:600;">' + esc(r.name) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;font-weight:700;color:#38bdf8;">' + esc(r.vol) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;color:#cbd5e1;">' + esc(r.txns) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;color:#94a3b8;">' + esc(r.mdr) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;color:#f87171;">' + esc(r.fee) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;font-weight:700;color:#10b981;">' + esc(r.net) + '</td><td style="text-align:right;"><span class="zfa-badge green">' + esc(r.st) + '</span></td></tr>';
    }).join('');

    return [
      '<div class="zfa-kpi-grid">',
        kpiHtml('Digital Collections', '₹1,14,35,000', '+13.2% MoM', 'up', 'Inbound MTD flow', '💳'),
        kpiHtml('UPI Share', '54.2%', '+6.4% YoY', 'up', 'Zero MDR rail', '📱'),
        kpiHtml('Card & POS Volume', '₹42,80,000', '37.4% share', 'neutral', 'Pine Labs terminals', '🏧'),
        kpiHtml('Blended MDR Cost', '0.48%', '-0.12% MoM', 'up', 'Low transaction fees', '💰'),
        kpiHtml('Settlement Window', 'T+0 / T+1', 'Automated sweep', 'up', 'Direct HDFC sweep', '⚡'),
        kpiHtml('Reconciliation Accuracy', '99.8%', 'Sub-second sync', 'up', 'Core banking matched', '🛡️'),
      '</div>',
      '<div class="zfa-card">',
        '<div class="zfa-card-head"><div><h3 class="zfa-card-title">💳 Payment Gateways & Merchant Rails</h3><p class="zfa-card-sub">Inflow channels, merchant discount rates (MDR), and net bank realization</p></div><button class="zfa-btn primary" onclick="alert(\'Reconciling gateway batches with Core Banking API...\')">🔄 Run Reconciliation</button></div>',
        '<div class="zfa-table-wrap">',
          '<table class="zfa-table">',
            '<thead><tr><th>Gateway Rail</th><th style="text-align:right;">Processed Volume</th><th style="text-align:right;">Txns</th><th style="text-align:right;">MDR Rate</th><th style="text-align:right;">MDR Fee</th><th style="text-align:right;">Net Cleared</th><th style="text-align:right;">Status</th></tr></thead>',
            '<tbody>' + railHtml + '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  // 15. Refunds
  function renderRefunds() {
    var refList = [
      { id: 'REF-201', inv: 'INV-2026-880', client: 'Geeta Krishnan (Rusty - Beagle)', amt: '₹1,200', reason: 'Consult Rescheduled - Emergency Conflict', rail: 'Razorpay UPI', st: 'Refunded' },
      { id: 'REF-202', inv: 'INV-2026-874', client: 'Rahul Nair (Simba - Golden Retriever)', amt: '₹6,800', reason: 'Pharmacy Sealed Renal Diet Return', rail: 'Original Card Rail', st: 'Refunded' },
      { id: 'REF-203', inv: 'INV-2026-869', client: 'Sneha Kapoor (Bella - Persian Cat)', amt: '₹4,500', reason: 'Duplicate Front-Desk POS Tap', rail: 'Pine Labs Reversal', st: 'Settled' },
      { id: 'REF-204', inv: 'INV-2026-855', client: 'Arun Varma (Rocky - Rottweiler)', amt: '₹12,000', reason: 'Pre-Op Deposit Adjustment Post-Surgery', rail: 'NEFT Account Sweep', st: 'Refunded' },
      { id: 'REF-205', inv: 'INV-2026-848', client: 'Kavita Menon (Leo - Shih Tzu)', amt: '₹2,500', reason: 'Cold-chain Vaccine Delivery Delay Credit', rail: 'PhonePe UPI', st: 'Refunded' },
      { id: 'REF-206', inv: 'INV-2026-832', client: 'Aditya Sen (Milo - Indie Pup)', amt: '₹1,800', reason: 'OPD Consultation Doctor Out of Station', rail: 'Razorpay UPI', st: 'Refunded' },
      { id: 'REF-207', inv: 'INV-2026-820', client: 'Deepak Joshi (Thor - German Shepherd)', amt: '₹19,500', reason: 'Duplicate POS Debit Gateway Timeout', rail: 'HDFC PG Reversal', st: 'Settled' },
      { id: 'REF-208', inv: 'INV-2026-811', client: 'Sunita Rao (Zoe - Cocker Spaniel)', amt: '₹8,200', reason: 'Unused Surgical Implant Exchange Return', rail: 'Original Card Rail', st: 'Refunded' },
      { id: 'REF-209', inv: 'INV-2026-795', client: 'Farhan Akhtar (Bruno - Boxer)', amt: '₹3,400', reason: 'Telemetry ECG Artifact Cancellation', rail: 'Razorpay UPI', st: 'Refunded' },
      { id: 'REF-210', inv: 'INV-2026-788', client: 'Divya Nambisan (Coco - Dachshund)', amt: '₹14,600', reason: 'Insurance Settlement Overcharge Refund', rail: 'NEFT Client Sweep', st: 'Refunded' }
    ];

    var refHtml = refList.map(function(r) {
      return '<tr><td style="font-family:\'IBM Plex Mono\',monospace;color:#f87171;font-weight:600;">' + esc(r.id) + '</td><td style="font-family:\'IBM Plex Mono\',monospace;color:#38bdf8;">' + esc(r.inv) + '</td><td style="color:#fff;font-weight:600;">' + esc(r.client) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;font-weight:700;color:#f87171;">' + esc(r.amt) + '</td><td style="color:#cbd5e1;">' + esc(r.reason) + '</td><td style="color:#94a3b8;">' + esc(r.rail) + '</td><td style="text-align:right;"><span class="zfa-badge green">' + esc(r.st) + '</span></td></tr>';
    }).join('');

    return [
      '<div class="zfa-kpi-grid">',
        kpiHtml('Total Processed Refunds', '₹84,500', '0.59% of revenue', 'up', '10 audited cases', '🔄'),
        kpiHtml('Cancelled OPD Consults', '₹18,500', 'Doctor rescheduling', 'neutral', 'Instant credit reversal', '📅'),
        kpiHtml('Pharmacy Sealed Returns', '₹32,000', 'Sealed batch checked', 'up', 'Within 7-day policy', '💊'),
        kpiHtml('Duplicate POS Swipes', '₹24,000', 'Gateway timeout', 'up', '100% resolved in 24h', '💳'),
        kpiHtml('Average Dispute TAT', '4.2 Hours', '-1.5h MoM', 'up', 'Industry benchmark 48h', '⏱️'),
        kpiHtml('Chargeback Loss Rate', '0.02%', 'Minimal loss', 'up', 'Evidence audit trail', '🛡️'),
      '</div>',
      '<div class="zfa-card">',
        '<div class="zfa-card-head"><div><h3 class="zfa-card-title">🔄 Customer Refunds & Disputed Reversals Log</h3><p class="zfa-card-sub">Clinical refund authorizations linked directly to verified invoice records</p></div><button class="zfa-btn primary" onclick="ZenveFinanceDashboard.showRefundModal()">+ Authorize Refund</button></div>',
        '<div class="zfa-table-wrap">',
          '<table class="zfa-table">',
            '<thead><tr><th>Refund ID</th><th>Original Invoice</th><th>Pet Parent & Pet</th><th style="text-align:right;">Refund Amount</th><th>Clinical Reason</th><th>Settlement Channel</th><th style="text-align:right;">Status</th></tr></thead>',
            '<tbody>' + refHtml + '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  // 16. Taxes
  function renderTaxes() {
    var gstForms = [
      { form: 'GSTR-3B Monthly Return', period: 'Sep 2026', due: '20 Oct 2026', taxable: '₹1,42,85,000', taxAmt: '₹21,79,068', itc: '₹9,58,000', net: '₹12,21,068', st: 'Reconciled & Ready' },
      { form: 'GSTR-1 Outward Supplies', period: 'Sep 2026', due: '11 Oct 2026', taxable: '₹1,42,85,000', taxAmt: '₹21,79,068', itc: '₹0', net: '₹0 (Info)', st: 'Filed (ARN-4421)' },
      { form: 'GSTR-2B Auto-Drafted ITC', period: 'Sep 2026', due: '14 Oct 2026', taxable: '₹53,22,222', taxAmt: '₹9,58,000', itc: '₹9,58,000', net: 'Eligible ITC', st: 'Reconciled 100%' },
      { form: 'GSTR-3B Monthly Return', period: 'Aug 2026', due: '20 Sep 2026', taxable: '₹1,38,00,000', taxAmt: '₹21,05,200', itc: '₹9,12,000', net: '₹11,93,200', st: 'Filed & Paid' },
      { form: 'GSTR-1 Outward Supplies', period: 'Aug 2026', due: '11 Sep 2026', taxable: '₹1,38,00,000', taxAmt: '₹21,05,200', itc: '₹0', net: '₹0 (Info)', st: 'Filed (ARN-3891)' },
      { form: 'GSTR-3B Monthly Return', period: 'Jul 2026', due: '20 Aug 2026', taxable: '₹1,31,20,000', taxAmt: '₹20,01,400', itc: '₹8,84,000', net: '₹11,17,400', st: 'Filed & Paid' },
      { form: 'GSTR-1 Outward Supplies', period: 'Jul 2026', due: '11 Aug 2026', taxable: '₹1,31,20,000', taxAmt: '₹20,01,400', itc: '₹0', net: '₹0 (Info)', st: 'Filed (ARN-3120)' },
      { form: 'GSTR-9 Annual Return', period: 'FY 2025-26', due: '31 Dec 2026', taxable: '₹15,20,00,000', taxAmt: '₹2,31,80,000', itc: '₹1,02,40,000', net: 'Audited Final', st: 'Drafting' },
      { form: 'GSTR-9C Reconciliation', period: 'FY 2025-26', due: '31 Dec 2026', taxable: '₹15,20,00,000', taxAmt: '₹2,31,80,000', itc: '₹1,02,40,000', net: 'CA Certified', st: 'Under CA Audit' },
      { form: 'E-Way Bill Consolidated Log', period: 'Current Month', due: 'Real-time', taxable: '₹18,50,000', taxAmt: '₹3,33,000', itc: '₹0', net: 'Interstate Drug', st: 'Active (NIC Sync)' }
    ];

    var gstHtml = gstForms.map(function(g) {
      return '<tr><td style="color:#fff;font-weight:600;">' + esc(g.form) + '</td><td style="color:#38bdf8;">' + esc(g.period) + '</td><td style="color:#cbd5e1;">' + esc(g.due) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;">' + esc(g.taxable) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;color:#fbbf24;">' + esc(g.taxAmt) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;color:#10b981;">' + esc(g.itc) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;font-weight:700;color:#38bdf8;">' + esc(g.net) + '</td><td style="text-align:right;"><span class="zfa-badge green">' + esc(g.st) + '</span></td></tr>';
    }).join('');

    return [
      '<div class="zfa-kpi-grid">',
        kpiHtml('GST Output Liability', '₹21,79,068', '+11.4% MoM', 'up', 'Current month gross', '🏛️'),
        kpiHtml('Input Tax Credit (ITC)', '₹9,58,000', '100% matched GSTR-2B', 'up', 'Zero disputed credit', '📥'),
        kpiHtml('Net GST Payable', '₹12,21,068', 'Due 20 Oct 2026', 'neutral', 'Statutory due date', '💰'),
        kpiHtml('TDS Deposited', '₹4,68,500', '100% deposited', 'up', 'Challan ITNS 281', '📑'),
        kpiHtml('Advance Corporate Tax', '₹8,70,000', 'Q2 FY27 cleared', 'up', 'Section 115BAA rate', '🛡️'),
        kpiHtml('Compliance Rating', '100 / 100', 'Zero penalties', 'up', 'Tier-1 clean audit', '⭐'),
      '</div>',
      '<div class="zfa-card">',
        '<div class="zfa-card-head"><div><h3 class="zfa-card-title">⚖️ Goods & Services Tax (GST) Returns</h3><p class="zfa-card-sub">GSTIN: 29AABCZ8412K1Z9 · Government of India GST Portal Sync</p></div><button class="zfa-btn primary" onclick="alert(\'Generating GST e-Challan PMT-06...\')">Generate PMT-06</button></div>',
        '<div class="zfa-table-wrap">',
          '<table class="zfa-table">',
            '<thead><tr><th>Form Type</th><th>Tax Period</th><th>Due Date</th><th style="text-align:right;">Taxable Turnover</th><th style="text-align:right;">Output Tax</th><th style="text-align:right;">ITC Offset</th><th style="text-align:right;">Net Cash Paid</th><th style="text-align:right;">Status</th></tr></thead>',
            '<tbody>' + gstHtml + '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  // 17. Financial Forecast
  function renderForecast() {
    var quarters = [
      { q: 'FY27 Q1', rev: '₹1.52 Cr', cogs: '₹65.4L', opex: '₹48.2L', ebitda: '₹38.4L', pat: '₹29.2L', cash: '₹9.20 Cr' },
      { q: 'FY27 Q2', rev: '₹1.64 Cr', cogs: '₹69.8L', opex: '₹50.5L', ebitda: '₹43.7L', pat: '₹33.6L', cash: '₹9.55 Cr' },
      { q: 'FY27 Q3', rev: '₹1.78 Cr', cogs: '₹74.5L', opex: '₹53.2L', ebitda: '₹50.3L', pat: '₹38.9L', cash: '₹9.95 Cr' },
      { q: 'FY27 Q4', rev: '₹1.95 Cr', cogs: '₹81.2L', opex: '₹56.4L', ebitda: '₹57.4L', pat: '₹44.5L', cash: '₹10.42 Cr' },
      { q: 'FY28 Q1', rev: '₹2.12 Cr', cogs: '₹87.8L', opex: '₹60.1L', ebitda: '₹64.1L', pat: '₹49.8L', cash: '₹10.95 Cr' },
      { q: 'FY28 Q2', rev: '₹2.30 Cr', cogs: '₹94.5L', opex: '₹64.0L', ebitda: '₹71.5L', pat: '₹55.6L', cash: '₹11.55 Cr' },
      { q: 'FY28 Q3', rev: '₹2.50 Cr', cogs: '₹1.02 Cr', opex: '₹68.2L', ebitda: '₹79.8L', pat: '₹62.1L', cash: '₹12.22 Cr' },
      { q: 'FY28 Q4', rev: '₹2.75 Cr', cogs: '₹1.11 Cr', opex: '₹73.0L', ebitda: '₹91.0L', pat: '₹71.0L', cash: '₹13.05 Cr' },
      { q: 'FY29 Q1', rev: '₹3.00 Cr', cogs: '₹1.20 Cr', opex: '₹78.5L', ebitda: '₹1.01 Cr', pat: '₹79.2L', cash: '₹14.00 Cr' },
      { q: 'FY29 Q2', rev: '₹3.30 Cr', cogs: '₹1.31 Cr', opex: '₹84.5L', ebitda: '₹1.14 Cr', pat: '₹89.5L', cash: '₹15.10 Cr' }
    ];

    var fHtml = quarters.map(function(q) {
      return '<tr><td style="color:#fff;font-weight:600;">' + esc(q.q) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;font-weight:700;color:#10b981;">' + esc(q.rev) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;color:#f87171;">' + esc(q.cogs) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;color:#94a3b8;">' + esc(q.opex) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;font-weight:700;color:#38bdf8;">' + esc(q.ebitda) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;font-weight:700;color:#34d399;">' + esc(q.pat) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;color:#fff;">' + esc(q.cash) + '</td></tr>';
    }).join('');

    return [
      '<div class="zfa-kpi-grid">',
        kpiHtml('Next 12M Projected Revenue', '₹19.45 Cr', '+36.2% YoY', 'up', 'Base expansion path', '🔮'),
        kpiHtml('Projected FY28 EBITDA', '₹5.24 Cr', '26.9% margin', 'up', 'Operating leverage', '⚡'),
        kpiHtml('12M Free Cash Flow', '₹3.62 Cr', 'Post all CAPEX', 'up', 'Self-funded pipeline', '💧'),
        kpiHtml('Total Planned CAPEX', '₹5.20 Cr', 'Across 10 sites', 'neutral', 'Board approved', '🏗️'),
        kpiHtml('Target Breakeven / Bed', '12.8 Months', '-2.4 MoM', 'up', 'Capital efficiency', '⏱️'),
        kpiHtml('Sensitivity Risk Score', '0.18', 'Low risk', 'up', 'Stress-tested', '🛡️'),
      '</div>',
      '<div class="zfa-card">',
        '<div class="zfa-card-head"><div><h3 class="zfa-card-title">📈 4-Quarter Rolling Forward P&L Projections</h3><p class="zfa-card-sub">Management predictive model incorporating 14 existing sites + 4 planned expansions</p></div><button class="zfa-btn primary" onclick="alert(\'Exporting full dynamic forecast simulation model (Excel)...\')">Export Model (XLSX)</button></div>',
        '<div class="zfa-table-wrap">',
          '<table class="zfa-table">',
            '<thead><tr><th>Forward Quarter</th><th style="text-align:right;">Forecast Revenue</th><th style="text-align:right;">Direct COGS</th><th style="text-align:right;">Forecast OPEX</th><th style="text-align:right;">Projected EBITDA</th><th style="text-align:right;">Projected PAT</th><th style="text-align:right;">Closing Treasury</th></tr></thead>',
            '<tbody>' + fHtml + '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  // 18. Cost Analysis
  function renderCostAnalysis() {
    var actCosts = [
      { act: 'General Outpatient Consultation', type: 'Outpatient Care', cost: '₹280', bm: '₹450', var: '-37.8%', eff: 'Tier-1 Leader' },
      { act: 'Canine TPLO Knee Reconstruction', type: 'Surgical Theatre', cost: '₹16,400', bm: '₹22,000', var: '-25.5%', eff: 'High Margin' },
      { act: 'Abdominal Ultrasound Sonography', type: 'Diagnostic Imaging', cost: '₹620', bm: '₹950', var: '-34.7%', eff: 'Optimal Asset Use' },
      { act: 'Automated Complete Blood Count (CBC)', type: 'Pathology Lab', cost: '₹145', bm: '₹220', var: '-34.1%', eff: 'IDEXX High Volume' },
      { act: 'Overnight ICU Inpatient Bed-Day', type: 'Inpatient Critical Care', cost: '₹1,850', bm: '₹2,600', var: '-28.8%', eff: 'Staff Shift Optimal' },
      { act: 'Dental Ultrasonic Scaling & Polishing', type: 'Preventive Care', cost: '₹890', bm: '₹1,400', var: '-36.4%', eff: 'Automated Suite' },
      { act: 'High-Resolution Brain MRI Scan', type: 'Advanced Radiology', cost: '₹4,200', bm: '₹6,000', var: '-30.0%', eff: 'In-house Magnet' },
      { act: 'Emergency Gastric Decompression & Surgery', type: 'Emergency Care', cost: '₹18,500', bm: '₹25,000', var: '-26.0%', eff: 'Critical Response' },
      { act: 'Chemotherapy Intravenous Infusion', type: 'Oncology Services', cost: '₹2,900', bm: '₹4,200', var: '-31.0%', eff: 'Bio-Safety Cabinet' },
      { act: 'Canine/Feline Core Annual Vaccination', type: 'Wellness Program', cost: '₹320', bm: '₹500', var: '-36.0%', eff: 'Central Cold-Chain Bulk' }
    ];

    var actHtml = actCosts.map(function(a) {
      return '<tr><td style="color:#fff;font-weight:600;">' + esc(a.act) + '</td><td style="color:#38bdf8;">' + esc(a.type) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;font-weight:700;color:#34d399;">' + esc(a.cost) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;color:#94a3b8;">' + esc(a.bm) + '</td><td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;color:#10b981;font-weight:600;">' + esc(a.var) + '</td><td style="text-align:right;"><span class="zfa-badge green">' + esc(a.eff) + '</span></td></tr>';
    }).join('');

    return [
      '<div class="zfa-kpi-grid">',
        kpiHtml('Network Breakeven', '₹87,80,000', 'Actual: ₹1,42,85,000', 'up', '61.5% capacity achieved', '⚖️'),
        kpiHtml('Margin of Safety', '38.5%', '+4.2% pts', 'up', 'Substantial cushion', '🛡️'),
        kpiHtml('Cost / Inpatient Bed-Day', '₹1,850', '-6.2% vs BM', 'up', 'Nurse-to-pet ratio', '🛏️'),
        kpiHtml('Cost / Surgical OT Hour', '₹3,400 / hr', 'High throughput', 'up', 'Operating theatres', '🩺'),
        kpiHtml('Fixed Cost Ratio', '31.5%', 'Lean real estate', 'up', '₹34.2L fixed base', '🏢'),
        kpiHtml('Variable Cost Ratio', '68.5%', 'High elasticity', 'up', 'Low risk capital model', '📉'),
      '</div>',
      '<div class="zfa-card">',
        '<div class="zfa-card-head"><div><h3 class="zfa-card-title">🔍 Activity-Based Unit Costing (ABC Model)</h3><p class="zfa-card-sub">Granular clinical unit costs compared to private hospital industry benchmarks</p></div><span class="zfa-badge green">15–26% COST ADVANTAGE</span></div>',
        '<div class="zfa-table-wrap">',
          '<table class="zfa-table">',
            '<thead><tr><th>Activity / Service Unit</th><th>Classification</th><th style="text-align:right;">Zenve Unit Cost</th><th style="text-align:right;">Metro Benchmark</th><th style="text-align:right;">Variance</th><th style="text-align:right;">Efficiency</th></tr></thead>',
            '<tbody>' + actHtml + '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Master Render Function ───────────────────────────────────── */
  function render() {
    if (!root) return;

    var activeTab = TABS.find(function (t) { return t.id === S.tab; }) || TABS[0];

    // Update Header Content Dynamically
    var titleEl = root.querySelector('.zfa-title');
    if (titleEl) titleEl.textContent = activeTab.title || activeTab.label;

    var subEl = root.querySelector('.zfa-sub');
    if (subEl) subEl.textContent = activeTab.sub || '';

    var badgeEl = root.querySelector('.zfa-live-badge');
    if (badgeEl) {
      badgeEl.innerHTML = '<span class="zfa-pulse-dot"></span> ' + esc(activeTab.badge || 'Active');
    }

    // Contextual Action Button
    var actionBtn = root.querySelector('.zfa-context-action');
    if (actionBtn) {
      if (S.tab === 'invoices') {
        actionBtn.style.display = 'inline-flex';
        actionBtn.textContent = '+ Create Invoice';
        actionBtn.onclick = function () { ZenveFinanceDashboard.showInvoiceModal(); };
      } else if (S.tab === 'expenses') {
        actionBtn.style.display = 'inline-flex';
        actionBtn.textContent = '+ Expense Voucher';
        actionBtn.onclick = function () { ZenveFinanceDashboard.showExpenseModal(); };
      } else if (S.tab === 'refunds') {
        actionBtn.style.display = 'inline-flex';
        actionBtn.textContent = '+ Authorize Refund';
        actionBtn.onclick = function () { ZenveFinanceDashboard.showRefundModal(); };
      } else {
        actionBtn.style.display = 'inline-flex';
        actionBtn.textContent = '+ Add Transaction';
        actionBtn.onclick = function () { ZenveFinanceDashboard.showTxnModal(); };
      }
    }

    // Render Tabs Bar
    var tabsBar = root.querySelector('.zfa-tabs-bar');
    if (tabsBar) {
      tabsBar.innerHTML = TABS.map(function (t) {
        var isActive = t.id === S.tab;
        return [
          '<button class="zfa-tab ' + (isActive ? 'active' : '') + '" onclick="ZenveFinanceDashboard.switchTab(\'' + t.id + '\')">',
            '<span>' + t.icon + '</span>',
            '<span>' + esc(t.label) + '</span>',
            t.badge ? '<span class="zfa-tab-badge">' + esc(t.badge) + '</span>' : '',
          '</button>'
        ].join('');
      }).join('');
    }

    // Render Body Area (DIV with 0 margin, strictly no <main>)
    var body = root.querySelector('.zfa-body');
    if (body) {
      switch (S.tab) {
        case 'dashboard':     body.innerHTML = renderDashboard(); break;
        case 'pnl':           body.innerHTML = renderPnL(); break;
        case 'balance-sheet': body.innerHTML = renderBalanceSheet(); break;
        case 'cash-flow':     body.innerHTML = renderCashFlow(); break;
        case 'revenue':       body.innerHTML = renderRevenue(); break;
        case 'expenses':      body.innerHTML = renderExpenses(); break;
        case 'cogs':          body.innerHTML = renderCOGS(); break;
        case 'gross-profit':  body.innerHTML = renderGrossProfit(); break;
        case 'ebitda':        body.innerHTML = renderEBITDA(); break;
        case 'net-profit':    body.innerHTML = renderNetProfit(); break;
        case 'receivables':   body.innerHTML = renderReceivables(); break;
        case 'payables':      body.innerHTML = renderPayables(); break;
        case 'invoices':      body.innerHTML = renderInvoices(); break;
        case 'payments':      body.innerHTML = renderPayments(); break;
        case 'refunds':       body.innerHTML = renderRefunds(); break;
        case 'taxes':         body.innerHTML = renderTaxes(); break;
        case 'forecast':      body.innerHTML = renderForecast(); break;
        case 'cost-analysis': body.innerHTML = renderCostAnalysis(); break;
        default:              body.innerHTML = renderDashboard(); break;
      }
    }
  }

  /* ── Build Shell ──────────────────────────────────────────────── */
  function build() {
    if (root) return;
    root = document.createElement('div');
    root.id = 'zfa-root';
    root.innerHTML = [
      '<header class="zfa-head">',
        '<div class="zfa-head-left">',
          '<div class="zfa-title-row">',
            '<h1 class="zfa-title">Finance Dashboard</h1>',
            '<span class="zfa-live-badge"><span class="zfa-pulse-dot"></span> EBITDA 20.02%</span>',
          '</div>',
          '<p class="zfa-sub">Network-wide GAAP profit and loss, operating liquidity, and statutory compliance</p>',
        '</div>',
        '<div class="zfa-head-actions">',
          '<button class="zfa-btn" onclick="alert(\'Refreshing live treasury balances and general ledger accounts...\')">🔄 Refresh Ledgers</button>',
          '<button class="zfa-btn primary zfa-context-action">+ Add Transaction</button>',
        '</div>',
      '</header>',
      '<nav class="zfa-tabs-bar" aria-label="Finance & Accounting Subdomains"></nav>',
      '<div class="zfa-body"></div>'
    ].join('');
    document.body.appendChild(root);
  }

  /* ── Open / Close / Switch ────────────────────────────────────── */
  function open(tab) {
    // Close other domain overlays cleanly
    if (window.ZenveSalesDashboard && typeof window.ZenveSalesDashboard.close === 'function') {
      try { window.ZenveSalesDashboard.close(); } catch (e) {}
    }
    if (window.ZenveOperationsDashboard && typeof window.ZenveOperationsDashboard.close === 'function') {
      try { window.ZenveOperationsDashboard.close(); } catch (e) {}
    }
    if (window.ZenveProductsInventory && typeof window.ZenveProductsInventory.close === 'function') {
      try { window.ZenveProductsInventory.close(); } catch (e) {}
    }
    if (window.ZenvePharmacyDashboard && typeof window.ZenvePharmacyDashboard.close === 'function') {
      try { window.ZenvePharmacyDashboard.close(); } catch (e) {}
    }
    if (window.ZenveClinicsDashboard && typeof window.ZenveClinicsDashboard.close === 'function') {
      try { window.ZenveClinicsDashboard.close(); } catch (e) {}
    }
    if (window.ZenveReportsDashboard && typeof window.ZenveReportsDashboard.close === 'function') {
      try { window.ZenveReportsDashboard.close(); } catch (e) {}
    }
    if (window.ZenveAlertsDashboard && typeof window.ZenveAlertsDashboard.close === 'function') {
      try { window.ZenveAlertsDashboard.close(); } catch (e) {}
    }
    if (window.ZenveSettingsDashboard && typeof window.ZenveSettingsDashboard.close === 'function') {
      try { window.ZenveSettingsDashboard.close(); } catch (e) {}
    }

    document.querySelectorAll('.zpanel-root, [id$="-root"]').forEach(function (el) {
      if (el.id !== 'zfa-root') el.classList.remove('zpanel-open', 'zod-open', 'zsd-open', 'zpid-open', 'zph-open', 'zch-open', 'zrep-open', 'zalt-open', 'zset-open');
    });

    // Dismiss any Radix placeholder dialog
    try {
      document.querySelectorAll('[role="dialog"]').forEach(function (d) {
        if (d.closest('#zfa-root')) return;
        var btn = d.querySelector('button[aria-label*="close" i], button:last-child');
        if (btn) btn.click();
      });
    } catch (e) {}

    if (tab && TABS.some(function (t) { return t.id === tab; })) {
      S.tab = tab;
    } else if (!S.tab) {
      S.tab = 'dashboard';
    }

    build();
    S.open = true;
    root.classList.add('zfa-open');
    render();

    var targetTab = TABS.find(function (t) { return t.id === S.tab; });
    if (targetTab && targetTab.hash && window.location.hash !== targetTab.hash) {
      try { history.replaceState(null, '', targetTab.hash); } catch (e) {}
    }
  }

  function close() {
    S.open = false;
    if (root) root.classList.remove('zfa-open');
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

  /* ── Modals ───────────────────────────────────────────────────── */
  function showModal(html) {
    var existing = document.getElementById('zfa-active-modal');
    if (existing) existing.remove();

    var backdrop = document.createElement('div');
    backdrop.id = 'zfa-active-modal';
    backdrop.className = 'zfa-modal-backdrop';
    backdrop.innerHTML = '<div class="zfa-modal">' + html + '</div>';
    backdrop.onclick = function (e) {
      if (e.target === backdrop) backdrop.remove();
    };
    document.body.appendChild(backdrop);
  }

  function closeModal() {
    var existing = document.getElementById('zfa-active-modal');
    if (existing) existing.remove();
  }

  function showTxnModal() {
    var html = [
      '<div class="zfa-modal-head">',
        '<h3 class="zfa-modal-title">Record General Ledger Transaction</h3>',
        '<button class="zfa-btn" onclick="ZenveFinanceDashboard.closeModal()">✕</button>',
      '</div>',
      '<form onsubmit="event.preventDefault(); alert(\'Transaction recorded to General Ledger!\'); ZenveFinanceDashboard.closeModal();">',
        '<div class="zfa-form-group"><label>Transaction Description</label><input type="text" class="zfa-input" placeholder="e.g. Diagnostic Equipment Service Fee" required /></div>',
        '<div class="zfa-form-row">',
          '<div class="zfa-form-group"><label>Account Category</label><select class="zfa-select"><option>Operating Revenue</option><option>Direct COGS</option><option>Clinical OPEX</option><option>Capital CAPEX</option></select></div>',
          '<div class="zfa-form-group"><label>Amount (INR)</label><input type="text" class="zfa-input" placeholder="₹0" required /></div>',
        '</div>',
        '<div class="zfa-form-row">',
          '<div class="zfa-form-group"><label>Payment Rail</label><select class="zfa-select"><option>HDFC Core CMS (RTGS)</option><option>Razorpay UPI</option><option>Pine Labs POS</option><option>Corporate Card</option></select></div>',
          '<div class="zfa-form-group"><label>Linked Facility</label><select class="zfa-select"><option>Koramangala 0.0x7</option><option>Bandra Multi-Specialty</option><option>Okhla Animal Hospital</option><option>Network Wide</option></select></div>',
        '</div>',
        '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px;">',
          '<button type="button" class="zfa-btn" onclick="ZenveFinanceDashboard.closeModal()">Cancel</button>',
          '<button type="submit" class="zfa-btn primary">Record Entry</button>',
        '</div>',
      '</form>'
    ].join('');
    showModal(html);
  }

  function showInvoiceModal() {
    var html = [
      '<div class="zfa-modal-head">',
        '<h3 class="zfa-modal-title">Generate Compliant GST Tax Invoice</h3>',
        '<button class="zfa-btn" onclick="ZenveFinanceDashboard.closeModal()">✕</button>',
      '</div>',
      '<form onsubmit="event.preventDefault(); alert(\'GST Tax Invoice generated and IRN portal synced!\'); ZenveFinanceDashboard.closeModal();">',
        '<div class="zfa-form-group"><label>Pet Parent / Client Name</label><input type="text" class="zfa-input" placeholder="e.g. Kunal Sharma (Pet: Bruno)" required /></div>',
        '<div class="zfa-form-group"><label>Clinical Service Description</label><input type="text" class="zfa-input" placeholder="e.g. TPLO Surgical Package + Inpatient Care" required /></div>',
        '<div class="zfa-form-row">',
          '<div class="zfa-form-group"><label>Taxable Amount (INR)</label><input type="text" class="zfa-input" placeholder="₹0" required /></div>',
          '<div class="zfa-form-group"><label>GST Slab</label><select class="zfa-select"><option>18% GST (9% CGST + 9% SGST)</option><option>18% IGST (Interstate)</option><option>0% Exempted Healthcare</option></select></div>',
        '</div>',
        '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px;">',
          '<button type="button" class="zfa-btn" onclick="ZenveFinanceDashboard.closeModal()">Cancel</button>',
          '<button type="submit" class="zfa-btn primary">Issue e-Invoice</button>',
        '</div>',
      '</form>'
    ].join('');
    showModal(html);
  }

  function showExpenseModal() {
    var html = [
      '<div class="zfa-modal-head">',
        '<h3 class="zfa-modal-title">Submit New Expense Voucher</h3>',
        '<button class="zfa-btn" onclick="ZenveFinanceDashboard.closeModal()">✕</button>',
      '</div>',
      '<form onsubmit="event.preventDefault(); alert(\'Expense voucher submitted for finance controller review!\'); ZenveFinanceDashboard.closeModal();">',
        '<div class="zfa-form-group"><label>Expense Description</label><input type="text" class="zfa-input" placeholder="e.g. Shimadzu Digital X-Ray Annual Calibration" required /></div>',
        '<div class="zfa-form-row">',
          '<div class="zfa-form-group"><label>Cost Center</label><select class="zfa-select"><option>Clinical Operations</option><option>Facilities & Infrastructure</option><option>Hospital Utilities</option><option>Marketing & CAC</option></select></div>',
          '<div class="zfa-form-group"><label>Amount (INR)</label><input type="text" class="zfa-input" placeholder="₹0" required /></div>',
        '</div>',
        '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px;">',
          '<button type="button" class="zfa-btn" onclick="ZenveFinanceDashboard.closeModal()">Cancel</button>',
          '<button type="submit" class="zfa-btn primary">Submit Voucher</button>',
        '</div>',
      '</form>'
    ].join('');
    showModal(html);
  }

  function showRefundModal() {
    var html = [
      '<div class="zfa-modal-head">',
        '<h3 class="zfa-modal-title">Authorize Customer Refund</h3>',
        '<button class="zfa-btn" onclick="ZenveFinanceDashboard.closeModal()">✕</button>',
      '</div>',
      '<form onsubmit="event.preventDefault(); alert(\'Refund authorization sent to Payment Gateway!\'); ZenveFinanceDashboard.closeModal();">',
        '<div class="zfa-form-group"><label>Original Invoice #</label><input type="text" class="zfa-input" placeholder="e.g. INV-ZV-8021" required /></div>',
        '<div class="zfa-form-row">',
          '<div class="zfa-form-group"><label>Refund Amount (INR)</label><input type="text" class="zfa-input" placeholder="₹0" required /></div>',
          '<div class="zfa-form-group"><label>Refund Channel</label><select class="zfa-select"><option>Original UPI Rail</option><option>Original Card Rail</option><option>Zenve Wallet Credit</option></select></div>',
        '</div>',
        '<div class="zfa-form-group"><label>Clinical / Reason Justification</label><input type="text" class="zfa-input" placeholder="e.g. Consultation Cancelled Prior to Triage" required /></div>',
        '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px;">',
          '<button type="button" class="zfa-btn" onclick="ZenveFinanceDashboard.closeModal()">Cancel</button>',
          '<button type="submit" class="zfa-btn danger">Authorize Reversal</button>',
        '</div>',
      '</form>'
    ].join('');
    showModal(html);
  }

  /* ── Event Interception (Sidebar Clicks & Hash Change) ─────────── */
  function onHashChange() {
    var t = tabFromHash(window.location.hash);
    if (t) {
      open(t);
    } else if (S.open && window.location.hash && window.location.hash !== '#') {
      var otherDomains = ['sales', 'operations', 'inventory', 'pharmacy', 'clinics', 'doctors', 'reports', 'alerts', 'settings'];
      var isOther = otherDomains.some(function(d) { return window.location.hash.indexOf(d) >= 0; });
      if (isOther) close();
    }
  }

  function initInterception() {
    document.addEventListener('click', function (e) {
      // Ignore if user is only toggling the accordion dropdown
      var accordionBtn = e.target.closest('button[aria-expanded]');
      if (accordionBtn) {
        return;
      }

      var el = e.target.closest('button, a');
      if (!el) return;

      // Check hash attribute
      var href = el.getAttribute('href');
      var t = tabFromHash(href);
      if (t) {
        e.preventDefault();
        open(t);
        return;
      }

      // Check button text in sidebar
      var isSidebar = !!el.closest('aside, nav, [class*="sidebar"]');
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

    window.addEventListener('hashchange', onHashChange);
    // Initial load check
    if (window.location.hash) {
      var initial = tabFromHash(window.location.hash);
      if (initial) {
        setTimeout(function () { open(initial); }, 100);
      }
    }
  }

  /* ── Public API ────────────────────────────────────────────────── */
  window.ZenveFinanceDashboard = {
    open: open,
    close: close,
    switchTab: switchTab,
    closeModal: closeModal,
    showTxnModal: showTxnModal,
    showInvoiceModal: showInvoiceModal,
    showExpenseModal: showExpenseModal,
    showRefundModal: showRefundModal
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInterception);
  } else {
    initInterception();
  }
})();