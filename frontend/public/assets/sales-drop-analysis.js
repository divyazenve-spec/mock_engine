/* Zenve BI — ZENVE AI SIGNAL · SALES DROP ANALYSIS (Executive Dashboard).
   Replaces the "Zenve AI signal" card on the Executive home dashboard and answers three questions
   for the selected window (7D / 14D / 30D, always ending today, IST):
     1. HOW MUCH did sales drop?   (₹, %, order volume, basket size)
     2. WHERE did it happen?       (city-wise ranking of the decline)
     3. WHY did it likely happen?  (evidence-based drivers + clearly separated hypotheses)

   Data: reuses the existing dashboard feeds only — /_serverFn (dashboard data) → /api/v1/data →
   /assets/sample-fallback.json, plus the inventory feed when it returns items. Nothing is invented:
   revenue/orders use status "Paid" (same basis as the dashboard's Paid Revenue and daily sales_total),
   windows use the same IST calendar-day boundaries as the dashboard (today − (N−1) … today), and any
   metric the dataset cannot support (stock, cancellations, campaigns …) is labelled "not available".

   This is a deterministic analytics engine (period-over-period decomposition + concentration tests),
   not a machine-learning model.

   Evidence vs. hypothesis:
     • EVIDENCE   — computed directly from the records (numbers shown, share of decline explained).
     • TO VERIFY  — plausible business explanations the data cannot confirm; never presented as fact. */
(function () {
  'use strict';

  var FN = '/_serverFn/bcbf405abb63715daaf1487f2958492789217ff1449ff447570bc418404b6901';
  var FALLBACK = '/api/v1/data';
  var STATIC_FALLBACK = '/assets/sample-fallback.json';
  var INV_FN = '/_serverFn/b12577a9f2c2e9e5f8dbe451a3d99d3815e1707ea5d584b55a2dd420dfd92a17';
  var FETCH_TIMEOUT = 7000;
  var DAY = 86400000;
  var DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
  var inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

  var BAND_LABEL = {
    Morning: 'Morning (6 AM–12 PM)',
    Afternoon: 'Afternoon (12–5 PM)',
    Evening: 'Evening (5–10 PM)',
    Night: 'Night (10 PM–6 AM)',
    Unknown: 'Unknown time'
  };

  var S = {
    period: 14,
    focus: 'ALL',          // 'ALL' (network) or a city name — drives the root-cause panel
    sales: [],
    metrics: [],
    inventory: { status: 'idle', items: [] },
    via: '',               // 'api' | 'file'
    loaded: false,
    loading: false,
    error: '',
    refreshWarn: '',
    sig: '',
    updatedAt: null,
    loadPromise: null
  };

  var host = null;

  /* ───────────────────────── generic helpers ───────────────────────── */

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function dayOf(s) { return String((s && s.sold_at) || '').slice(0, 10); }

  function hourOf(s) {
    var h = parseInt(String((s && s.sold_at) || '').slice(11, 13), 10);
    return isNaN(h) ? null : h;
  }

  function bandOf(h) {
    if (h == null) return 'Unknown';
    if (h >= 6 && h < 12) return 'Morning';
    if (h >= 12 && h < 17) return 'Afternoon';
    if (h >= 17 && h < 22) return 'Evening';
    return 'Night';
  }

  function keyToUTC(key) {
    var p = key.split('-');
    return Date.UTC(+p[0], +p[1] - 1, +p[2]);
  }
  function shiftKey(key, delta) { return new Date(keyToUTC(key) + delta * DAY).toISOString().slice(0, 10); }
  function diffDays(a, b) { return Math.round((keyToUTC(b) - keyToUTC(a)) / DAY); }

  /* Same definition as the dashboard's `gf`: today's date in IST. */
  function todayKey() {
    try {
      return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(new Date());
    } catch (e) {
      return new Date().toISOString().slice(0, 10);
    }
  }

  /* Determines the effective anchor date:
     - If the user picked an End Date in the overview header, honor it.
     - If todayKey() is past the latest date in the stored records, anchor to span.end
       so that analysis always evaluates the actual stored business records.
     - Otherwise, uses todayKey(). */
  function getAnchorDate(sales, metrics) {
    var span = dataSpan(sales, metrics);
    var today = todayKey();
    try {
      var endInput = document.querySelector('input[aria-label="End date"], input[type="date"]:last-of-type');
      if (endInput && endInput.value && DATE_RE.test(endInput.value)) {
        if (!span || !span.end || endInput.value <= span.end) {
          return endInput.value;
        }
      }
    } catch (e) {}
    if (span && span.end && today > span.end) {
      return span.end;
    }
    return today;
  }

  function fmtKey(key, withYear) {
    var o = { day: '2-digit', month: 'short', timeZone: 'UTC' };
    if (withYear) o.year = 'numeric';
    return new Date(keyToUTC(key)).toLocaleDateString('en-IN', o);
  }

  function pctTxt(v) {
    if (v == null || !isFinite(v)) return 'n/a';
    return (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(v).toFixed(1) + '%';
  }
  function sInr(v) { return (v < 0 ? '−' : v > 0 ? '+' : '') + inr.format(Math.abs(v)); }
  function plural(n, one, many) { return n + ' ' + (n === 1 ? one : many); }
  function zeros(n) { var a = [], i; for (i = 0; i < n; i++) a.push(0); return a; }

  /* ───────────────────────── data loading ───────────────────────── */

  function fetchJson(url) {
    var ctl = (typeof AbortController !== 'undefined') ? new AbortController() : null;
    var timer = ctl ? setTimeout(function () { ctl.abort(); }, FETCH_TIMEOUT) : null;
    return fetch(url, { headers: { accept: 'application/json' }, signal: ctl ? ctl.signal : undefined }).then(
      function (r) {
        if (timer) clearTimeout(timer);
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      },
      function (e) {
        if (timer) clearTimeout(timer);
        throw e;
      }
    );
  }

  function loadSales() {
    var tries = [
      { url: FN, via: 'api' },
      { url: FALLBACK, via: 'api' },
      { url: STATIC_FALLBACK, via: 'file' }
    ];
    var i = 0;
    function next(lastErr) {
      if (i >= tries.length) {
        return Promise.reject(lastErr || new Error('No data source responded.'));
      }
      var t = tries[i++];
      return fetchJson(t.url).then(function (d) {
        if (!d || !Array.isArray(d.sales)) throw new Error('Unexpected data format from ' + t.url);
        return { data: d, via: t.via };
      }).catch(next);
    }
    return next();
  }

  function loadInventory() {
    return fetchJson(INV_FN).then(function (d) {
      var items = d && Array.isArray(d.items) ? d.items : [];
      S.inventory = { status: items.length ? 'ready' : 'empty', items: items };
    }).catch(function () {
      S.inventory = { status: 'unreachable', items: [] };
    });
  }

  function signature(sales) {
    var sum = 0, last = '';
    sales.forEach(function (s) { sum += Number(s.amount) || 0; if (s.sold_at > last) last = s.sold_at; });
    return sales.length + ':' + Math.round(sum) + ':' + last;
  }

  function load(force) {
    if (S.loading) return S.loadPromise;
    S.loading = true;
    S.loadPromise = loadSales().then(function (res) {
      var d = res.data;
      var sig = signature(d.sales);
      var changed = sig !== S.sig || !!S.error || !!S.refreshWarn || !S.loaded;
      S.sales = d.sales;
      S.metrics = Array.isArray(d.metrics) ? d.metrics : [];
      S.via = res.via;
      S.sig = sig;
      S.error = '';
      S.refreshWarn = '';
      S.loaded = true;
      S.updatedAt = new Date();
      return loadInventory().then(function () { return changed; });
    }).catch(function (e) {
      var msg = (e && e.message) || 'Could not load sales data.';
      if (S.sales.length) { S.refreshWarn = 'Could not refresh data (' + msg + '). Showing the last loaded records.'; }
      else { S.error = msg; }
      S.loaded = true;
      return true;
    }).then(function (changed) {
      S.loading = false;
      if (changed || force) render();
    });
    return S.loadPromise;
  }

  /* ───────────────────────── analytics engine ───────────────────────── */

  function emptyAgg() {
    return { rev: 0, n: 0, pendN: 0, pendRev: 0, otherN: 0, prod: Object.create(null), chan: Object.create(null), band: Object.create(null) };
  }

  function bump(map, k, amt) {
    var o = map[k] || (map[k] = { rev: 0, n: 0 });
    o.rev += amt;
    o.n += 1;
  }

  function addSale(a, s) {
    var amt = Number(s.amount) || 0;
    if (s.status === 'Paid') {
      a.rev += amt;
      a.n += 1;
      bump(a.prod, s.source || 'Unspecified', amt);
      bump(a.chan, s.app_source || 'Other', amt);
      bump(a.band, bandOf(hourOf(s)), amt);
    } else if (s.status === 'Pending') {
      a.pendN += 1;
      a.pendRev += amt;
    } else {
      a.otherN += 1;   // Cancelled / Refunded / anything else
    }
  }

  /* Union of two {name: {rev,n}} maps → rows sorted by change (largest decline first). */
  function diffMaps(pm, qm) {
    var keys = Object.create(null), out = [];
    Object.keys(pm).forEach(function (k) { keys[k] = 1; });
    Object.keys(qm).forEach(function (k) { keys[k] = 1; });
    Object.keys(keys).forEach(function (k) {
      var a = pm[k] || { rev: 0, n: 0 }, b = qm[k] || { rev: 0, n: 0 };
      out.push({ name: k, prev: a.rev, cur: b.rev, prevN: a.n, curN: b.n, delta: b.rev - a.rev });
    });
    out.sort(function (x, y) { return x.delta - y.delta; });
    return out;
  }

  /* ΔRevenue = volume effect (Δorders × prior AOV) + basket effect (current orders × ΔAOV). Exact identity. */
  function decompose(p, q) {
    if (p.n === 0) return null;
    var paov = p.rev / p.n;
    if (q.n === 0) return { volume: q.rev - p.rev, ticket: 0, paov: paov, qaov: 0 };
    var qaov = q.rev / q.n;
    return { volume: (q.n - p.n) * paov, ticket: q.n * (qaov - paov), paov: paov, qaov: qaov };
  }

  function dataSpan(sales, metrics) {
    var lo = null, hi = null;
    function see(k) {
      if (!DATE_RE.test(k)) return;
      if (lo === null || k < lo) lo = k;
      if (hi === null || k > hi) hi = k;
    }
    sales.forEach(function (s) { see(dayOf(s)); });
    (metrics || []).forEach(function (m) { see(String((m && m.business_date) || '').slice(0, 10)); });
    return lo ? { start: lo, end: hi } : null;
  }

  function coverage(a, b, span) {
    var total = diffDays(a, b) + 1;
    if (!span) return { days: 0, total: total, ratio: 0 };
    var lo = a > span.start ? a : span.start;
    var hi = b < span.end ? b : span.end;
    var days = hi >= lo ? diffDays(lo, hi) + 1 : 0;
    return { days: days, total: total, ratio: days / total };
  }

  function normName(s) { return String(s || '').toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim(); }
  function tokens(s) { return normName(s).split(' ').filter(function (t) { return t.length >= 3; }); }

  /* Conservative SKU match (name containment or ≥2 shared words). Inventory has no city dimension. */
  function matchStock(product, inv) {
    if (!inv || inv.status !== 'ready') return null;
    var n = normName(product), tk = tokens(product), i, it, m, shared, j;
    if (!n) return null;
    for (i = 0; i < inv.items.length; i++) {
      it = inv.items[i];
      m = normName(it && (it.name || it.product));
      if (!m) continue;
      if (m.indexOf(n) >= 0 || n.indexOf(m) >= 0) return it;
      var mt = tokens(it.name || it.product);
      shared = 0;
      for (j = 0; j < tk.length; j++) { if (mt.indexOf(tk[j]) >= 0) shared++; }
      if (shared >= 2) return it;
    }
    return null;
  }

  function riskOf(e) {
    if (e.state !== 'decline' || e.deltaPct == null) return 'Stable';
    var d = -e.deltaPct;
    return d >= 35 ? 'Critical' : d >= 20 ? 'High' : d >= 5 ? 'Moderate' : 'Low';
  }

  /* Explain one slice (network or a city): sizes the change and ranks the evidence behind it. */
  function explain(p, q, label, ctx) {
    var delta = q.rev - p.rev, drop = -delta;
    var e = {
      label: label,
      prev: { rev: p.rev, n: p.n, aov: p.n ? p.rev / p.n : 0, pendN: p.pendN, pendRev: p.pendRev },
      cur: { rev: q.rev, n: q.n, aov: q.n ? q.rev / q.n : 0, pendN: q.pendN, pendRev: q.pendRev, otherN: q.otherN },
      delta: delta,
      drop: drop,
      deltaPct: p.rev > 0 ? delta / p.rev * 100 : null,
      dN: q.n - p.n,
      dNPct: p.n > 0 ? (q.n - p.n) / p.n * 100 : null,
      sample: p.n + q.n,
      decomp: decompose(p, q),
      products: diffMaps(p.prod, q.prod),
      channels: diffMaps(p.chan, q.chan),
      bands: diffMaps(p.band, q.band),
      lenses: [],
      primary: null,
      hypotheses: [],
      state: 'flat'
    };
    e.confidence = e.sample >= 12 ? 'High' : e.sample >= 6 ? 'Medium' : 'Low';

    if (p.rev === 0 && q.rev > 0) { e.state = 'new'; e.risk = 'Stable'; return e; }
    if (delta >= 0) { e.state = delta > 0 ? 'growth' : 'flat'; e.risk = 'Stable'; return e; }
    e.state = 'decline';
    e.risk = riskOf(e);

    var lenses = [], d = e.decomp, topP = e.products[0], topC = e.channels[0], topB = e.bands[0];
    var activeChannels = e.channels.filter(function (c) { return c.prev > 0 || c.cur > 0; }).length;

    if (topP && topP.delta < 0) {
      var stock = matchStock(topP.name, ctx.inventory);
      lenses.push({
        key: 'product', title: 'Product demand', share: Math.min(1, -topP.delta / drop), item: topP, stock: stock,
        text: topP.name + ' fell ' + inr.format(topP.prev) + ' → ' + inr.format(topP.cur) + ' (' + topP.prevN + ' → ' + topP.curN + ' paid orders)'
      });
    }
    if (topC && topC.delta < 0 && activeChannels >= 2) {
      lenses.push({
        key: 'channel', title: 'Sales channel', share: Math.min(1, -topC.delta / drop), item: topC,
        text: topC.name + ' channel fell ' + inr.format(topC.prev) + ' → ' + inr.format(topC.cur)
      });
    }
    if (topB && topB.delta < 0) {
      var grossB = 0;
      e.bands.forEach(function (b) { if (b.delta < 0) grossB += -b.delta; });
      var bShare = Math.min(1, -topB.delta / drop);
      if (bShare >= 0.4 && -topB.delta / grossB >= 0.5) {
        lenses.push({
          key: 'time', title: 'Time of day', share: bShare, item: topB,
          text: 'Largest dip in ' + BAND_LABEL[topB.name] + ': ' + inr.format(topB.prev) + ' → ' + inr.format(topB.cur)
        });
      }
    }
    if (d) {
      if (d.volume < 0) {
        lenses.push({
          key: 'volume', title: 'Order volume', share: Math.min(1, -d.volume / drop),
          text: q.n === 0
            ? 'No paid orders in the current period (was ' + p.n + ')'
            : 'Paid orders ' + p.n + ' → ' + q.n + ' (' + pctTxt(e.dNPct) + '); volume effect ' + sInr(d.volume)
        });
      }
      if (d.ticket < 0) {
        lenses.push({
          key: 'ticket', title: 'Basket size', share: Math.min(1, -d.ticket / drop),
          text: 'Average order value ' + inr.format(d.paov) + ' → ' + inr.format(d.qaov) + ' (' + pctTxt((d.qaov - d.paov) / d.paov * 100) + '); basket effect ' + sInr(d.ticket)
        });
      }
    }
    if (q.pendRev > 0 && q.pendRev / drop >= 0.1) {
      lenses.push({
        key: 'pending', title: 'Unsettled orders', share: Math.min(1, q.pendRev / drop),
        text: plural(q.pendN, 'pending order', 'pending orders') + ' worth ' + inr.format(q.pendRev) + ' not yet counted as paid'
      });
    }

    /* Specificity-first rule: a single product / channel that explains most of the decline is more actionable
       than the generic "fewer orders", so it is promoted to primary; otherwise volume vs basket size decides. */
    function pick(k) { var i; for (i = 0; i < lenses.length; i++) { if (lenses[i].key === k) return lenses[i]; } return null; }
    var lp = pick('product'), lc = pick('channel'), lv = pick('volume'), lt = pick('ticket'), primary = null;
    if (lp && lp.share >= 0.4) primary = lp;
    else if (lc && lc.share >= 0.5) primary = lc;
    else if (lv && (!lt || lv.share >= lt.share)) primary = lv;
    else if (lt) primary = lt;
    else primary = lenses[0] || null;

    lenses.sort(function (a, b) { return b.share - a.share; });
    if (primary) { lenses.splice(lenses.indexOf(primary), 1); lenses.unshift(primary); }
    e.lenses = lenses;
    e.primary = primary;

    /* Hypotheses — explicitly unconfirmed. Only suggested when the evidence pattern makes them relevant. */
    var H = [], where = label === 'Network' ? '' : ' in ' + label;
    if (primary) {
      if (primary.key === 'product') {
        var st = primary.stock;
        if (st) {
          var qty = Number(st.quantity), rl = Number(st.reorder_level);
          if (isFinite(qty) && isFinite(rl) && qty <= rl) {
            H.push('Stock availability: network stock for “' + (st.name || primary.item.name) + '” is at/below its reorder level — check whether it was unavailable' + where + '.');
          } else {
            H.push('Demand or pricing for “' + primary.item.name + '”: network stock looks adequate, so check price changes, promotions or seasonal demand' + where + '.');
          }
        } else {
          H.push('Demand, price/promotion change or stock availability for “' + primary.item.name + '” (no stock data to confirm) — verify' + where + '.');
        }
      } else if (primary.key === 'channel') {
        H.push('A ' + primary.item.name + ' channel issue (release, campaign or checkout change) — verify the ' + primary.item.name + ' channel' + where + '.');
      } else if (primary.key === 'volume') {
        H.push('Broad-based fall in orders: check campaign activity, clinic/store operations and app engagement' + where + '.');
      } else if (primary.key === 'ticket') {
        H.push('Smaller baskets: check discounting and any shift toward lower-priced items' + where + '.');
      }
    }
    var pend = pick('pending');
    if (pend) H.push('Payment settlement: check the gateway/settlement flow for pending orders' + where + '.');
    if (e.confidence === 'Low') H.push('Only ' + plural(e.sample, 'paid order', 'paid orders') + ' across both periods — this may be normal fluctuation rather than a trend.');
    e.hypotheses = H.slice(0, 3);
    return e;
  }

  /* Full analysis for a window of `period` days ending on `today` (YYYY-MM-DD, IST). Pure — used by render() and tests. */
  function analyse(sales, period, today, ctx) {
    ctx = ctx || {};
    var curStart = shiftKey(today, -(period - 1));
    var prevEnd = shiftKey(today, -period);
    var prevStart = shiftKey(today, -(2 * period - 1));
    var span = dataSpan(sales, ctx.metrics);
    var cov = { cur: coverage(curStart, today, span), prev: coverage(prevStart, prevEnd, span) };
    var tot = { cur: emptyAgg(), prev: emptyAgg() };
    var cities = Object.create(null);
    var series = { cur: zeros(period), prev: zeros(period) };

    sales.forEach(function (s) {
      var d = dayOf(s);
      if (!DATE_RE.test(d)) return;
      var w = (d >= curStart && d <= today) ? 'cur' : (d >= prevStart && d <= prevEnd) ? 'prev' : null;
      if (!w) return;
      var city = (s.city && s.city !== 'All') ? String(s.city) : 'Unspecified';
      var c = cities[city] || (cities[city] = { city: city, cur: emptyAgg(), prev: emptyAgg() });
      addSale(tot[w], s);
      addSale(c[w], s);
      if (s.status === 'Paid') series[w][diffDays(w === 'cur' ? curStart : prevStart, d)] += Number(s.amount) || 0;
    });

    var hasEnoughRecords = (cov.prev.days > 0 && cov.cur.days > 0 && tot.prev.n > 0);
    var comparable = hasEnoughRecords;
    var why = '';
    if (!comparable) {
      if (cov.prev.days === 0) why = 'the prior period (' + fmtKey(prevStart) + ' – ' + fmtKey(prevEnd) + ') has no records on file';
      else if (cov.cur.days === 0) why = 'the current period has no records on file';
      else why = 'there are no paid orders in the prior period';
    }

    var net = explain(tot.prev, tot.cur, 'Network', ctx);
    var rows = Object.keys(cities).map(function (k) {
      var r = explain(cities[k].prev, cities[k].cur, k, ctx);
      r.city = k;
      return r;
    });
    if (comparable) rows.sort(function (a, b) { return a.delta - b.delta || b.cur.rev - a.cur.rev; });
    else rows.sort(function (a, b) { return b.cur.rev - a.cur.rev; });
    rows.forEach(function (r, i) { r.rank = i + 1; r.share = tot.cur.rev > 0 ? r.cur.rev / tot.cur.rev * 100 : 0; });

    /* Like-for-like daily run-rate over days that actually have records (guards against stale feeds). */
    var rate = null;
    if (comparable && cov.cur.days > 0 && cov.prev.days > 0) {
      var cr = tot.cur.rev / cov.cur.days, pr = tot.prev.rev / cov.prev.days;
      rate = { cur: cr, prev: pr, pct: pr > 0 ? (cr - pr) / pr * 100 : null };
    }

    return {
      period: period, today: today, curStart: curStart, curEnd: today, prevStart: prevStart, prevEnd: prevEnd,
      span: span, cov: cov, comparable: comparable, why: why,
      net: net, cities: rows, series: series, rate: rate,
      declining: rows.filter(function (r) { return r.state === 'decline'; })
    };
  }

  /* ───────────────────────── view helpers ───────────────────────── */

  function riskClass(r) { return 'zsda-risk zsda-risk-' + r.toLowerCase(); }

  function sourceLabel() {
    var demo = 0;
    S.sales.forEach(function (s) { if (s.is_demo === true || s.is_demo === 1) demo++; });
    var share = S.sales.length ? demo / S.sales.length : 0;
    var base = S.via === 'file' ? 'Bundled sample file (API unreachable)' : 'Zenve data API';
    return base + (share >= 0.5 ? ' · demo records' : '');
  }

  function lensTagHtml(kind) {
    return kind === 'ev'
      ? '<span class="zsda-tag zsda-tag-ev">Evidence</span>'
      : '<span class="zsda-tag zsda-tag-hyp">To verify</span>';
  }

  function headerHtml(period, rangeText) {
    function pill(p) {
      return '<button type="button" role="tab" aria-selected="' + (period === p) + '" class="zsda-pill-btn ' + (period === p ? 'active' : '') + '" data-set-period="' + p + '">' + p + 'D</button>';
    }
    return [
      '<div class="zsda-ambient-glow"></div>',
      '<div class="zsda-header-row">',
        '<div class="zsda-header-left">',
          '<div class="zsda-badge-ai">',
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="zsda-pulse-icon">',
              '<path d="M12 2a10 10 0 1 0 10 10H12V2z"></path><path d="M12 12 2.1 12.5"></path><path d="m4.5 15 7.5-3"></path><circle cx="12" cy="12" r="3"></circle>',
            '</svg>',
            'ZENVE AI SIGNAL · SALES DROP ANALYSIS',
          '</div>',
          '<h2 class="zsda-title">Your live decision brief</h2>',
          '<p class="zsda-sub">' + rangeText + '</p>',
        '</div>',
        '<div class="zsda-period-pills" role="tablist" aria-label="Select analysis period">', pill(7), pill(14), pill(30), '</div>',
      '</div>'
    ].join('');
  }

  function rangeSub(A) {
    return 'Reads only your stored records · past ' + A.period + ' days <b>' + fmtKey(A.curStart) + ' – ' + fmtKey(A.curEnd) + '</b>' +
      ' compared with the previous ' + A.period + ' days <b>' + fmtKey(A.prevStart) + ' – ' + fmtKey(A.prevEnd) + '</b>.';
  }

  function kpi(label, value, sub, cls) {
    return '<div class="zsda-kpi-item ' + (cls || '') + '"><span>' + label + '</span><b>' + value + '</b><i>' + sub + '</i></div>';
  }

  function notices(A) {
    var out = [];
    if (S.error) return out;
    if (S.via === 'file') out.push({ lvl: 'warn', text: 'The data API is unreachable — analysing the bundled sample dataset (demo records).' });
    if (S.refreshWarn) out.push({ lvl: 'warn', text: S.refreshWarn });
    if (!A.span) {
      out.push({ lvl: 'warn', text: 'No dated sales records were found.' });
    } else if (!A.comparable) {
      out.push({ lvl: 'warn', text: 'Period comparison is not reliable: ' + A.why + '. Showing current-period figures only — no decline is reported.' });
    } else {
      var missCur = A.period - A.cov.cur.days, missPrev = A.period - A.cov.prev.days;
      if (missCur > 0) {
        out.push({
          lvl: 'warn',
          text: 'Records end on ' + fmtKey(A.span.end) + ': ' + plural(missCur, 'day', 'days') + ' of the current ' + A.period + '-day window (up to ' + fmtKey(A.curEnd) + ') ' + (missCur === 1 ? 'has' : 'have') + ' no records yet, so the decline may be overstated.' +
            (A.rate ? ' Like-for-like per reporting day: ' + inr.format(A.rate.cur) + ' vs ' + inr.format(A.rate.prev) + ' (' + pctTxt(A.rate.pct) + ').' : '')
        });
      }
      if (missPrev > 0) out.push({ lvl: 'info', text: 'The prior period has records for ' + A.cov.prev.days + ' of ' + A.period + ' days, so the baseline is partial.' });
    }
    return out;
  }

  function overallConfidence(A) {
    if (!A.comparable) return 'Low';
    var r = Math.min(A.cov.cur.ratio, A.cov.prev.ratio);
    var byCov = r >= 0.9 ? 'High' : r >= 0.5 ? 'Medium' : 'Low';
    var order = { Low: 0, Medium: 1, High: 2 };
    return order[A.net.confidence] < order[byCov] ? A.net.confidence : byCov;
  }

  /* ── Brief card (existing look: coloured dot rows) ── */
  function briefRow(dot, label, valueHtml) {
    return '<div class="zsda-brief-row"><div class="zsda-brief-label"><span class="zsda-dot zsda-dot-' + dot + '"></span><span>' + label + '</span></div>' +
      '<div class="zsda-brief-val">' + valueHtml + '</div></div>';
  }

  function briefHtml(A) {
    var n = A.net, top = A.declining[0], rows = [];
    rows.push(briefRow('orange', 'Analysis window',
      'Past ' + A.period + ' days (' + fmtKey(A.curStart) + ' – ' + fmtKey(A.curEnd) + ') vs ' + fmtKey(A.prevStart) + ' – ' + fmtKey(A.prevEnd)));
    if (!A.comparable) {
      rows.push(briefRow('red', 'Sales drop', '<span class="zsda-muted">Not determinable — no reliable prior period</span>'));
      rows.push(briefRow('purple', 'Most affected city', '<span class="zsda-muted">Not determinable</span>'));
      rows.push(briefRow('blue', 'Likely root cause', '<span class="zsda-muted">Needs a comparable prior period</span>'));
    } else {
      var isDrop = n.delta < 0;
      rows.push(briefRow(isDrop ? 'red' : 'green', isDrop ? '① Sales drop' : '① Sales change',
        '<span class="' + (isDrop ? 'zsda-neg' : 'zsda-pos') + '">' + (isDrop ? '▼ ' : '▲ ') + sInr(n.delta) + ' (' + pctTxt(n.deltaPct) + ')</span>' +
        ' · orders ' + n.prev.n + ' → ' + n.cur.n + ' (' + (n.dN > 0 ? '+' : n.dN < 0 ? '−' : '') + Math.abs(n.dN) + ')'));
      rows.push(briefRow('purple', '② Most affected city', top
        ? '<b>' + esc(top.city) + '</b> · <span class="zsda-neg">' + sInr(top.delta) + ' (' + pctTxt(top.deltaPct) + ')</span>' +
          (n.delta < 0 && A.declining.length ? ' · ' + Math.round(top.drop / sumDrops(A) * 100) + '% of all city declines' : '')
        : '<span class="zsda-muted">No city declined</span>'));
      rows.push(briefRow('blue', '③ Likely root cause', top && top.primary
        ? lensTagHtml('ev') + ' <b>' + esc(top.primary.title) + '</b> — ' + esc(top.primary.text)
        : (n.primary ? lensTagHtml('ev') + ' <b>' + esc(n.primary.title) + '</b> — ' + esc(n.primary.text) : '<span class="zsda-muted">No decline to explain</span>')));
    }
    rows.push(briefRow('green', 'Data confidence',
      '<b>' + overallConfidence(A) + '</b> · ' + A.cov.cur.days + '/' + A.period + ' current and ' + A.cov.prev.days + '/' + A.period + ' prior days on record' +
      (A.span ? ' · latest record ' + fmtKey(A.span.end) : '')));
    return '<div class="zsda-decision-brief-card">' + rows.join('') + '</div>';
  }

  function sumDrops(A) {
    var t = 0;
    A.declining.forEach(function (r) { t += r.drop; });
    return t || 1;
  }

  function kpiHtml(A) {
    var n = A.net, c = [];
    if (!A.comparable) {
      c.push(kpi('Paid revenue (current)', inr.format(n.cur.rev), 'Prior period: no comparable data'));
      c.push(kpi('Paid orders (current)', String(n.cur.n), plural(n.cur.pendN, 'pending order', 'pending orders') + ' not counted'));
      c.push(kpi('Avg order value', inr.format(n.cur.aov), 'Prior period: n/a'));
      c.push(kpi('Net change', 'n/a', 'Baseline unavailable'));
    } else {
      var dr = n.delta < 0, cls = dr ? 'zsda-kpi-drop' : 'zsda-kpi-gain';
      c.push(kpi('Paid revenue', inr.format(n.cur.rev), 'Prior ' + inr.format(n.prev.rev) + ' · <em class="' + (dr ? 'zsda-neg' : 'zsda-pos') + '">' + pctTxt(n.deltaPct) + '</em>', cls));
      c.push(kpi('Paid orders', String(n.cur.n), 'Prior ' + n.prev.n + ' · <em class="' + (n.dN < 0 ? 'zsda-neg' : 'zsda-pos') + '">' + (n.dN > 0 ? '+' : n.dN < 0 ? '−' : '') + Math.abs(n.dN) + ' (' + pctTxt(n.dNPct) + ')</em>'));
      var aovPct = n.prev.aov > 0 ? (n.cur.aov - n.prev.aov) / n.prev.aov * 100 : null;
      c.push(kpi('Avg order value', inr.format(n.cur.aov), 'Prior ' + inr.format(n.prev.aov) + ' · <em class="' + (aovPct < 0 ? 'zsda-neg' : 'zsda-pos') + '">' + pctTxt(aovPct) + '</em>'));
      c.push(kpi(dr ? 'Net revenue drop' : 'Net revenue gain', sInr(n.delta),
        n.decomp ? 'Volume ' + sInr(n.decomp.volume) + ' · Basket ' + sInr(n.decomp.ticket) : 'No prior paid orders', cls));
    }
    return '<div class="zsda-kpi-strip">' + c.join('') + '</div>';
  }

  /* Daily revenue, prior vs current window aligned by day index; days with no records are marked, not drawn as zero sales. */
  function sparkHtml(A) {
    var N = A.period, w = 100 / N, max = 1, i, bars = '';
    for (i = 0; i < N; i++) { max = Math.max(max, A.series.cur[i], A.series.prev[i]); }
    function inSpan(k) { return A.span && k >= A.span.start && k <= A.span.end; }
    function bar(x, bw, v, key, fill) {
      var tip = fmtKey(key) + ': ';
      if (!inSpan(key)) {
        return '<rect x="' + x.toFixed(2) + '" y="92" width="' + bw.toFixed(2) + '" height="8" fill="none" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="2 2" vector-effect="non-scaling-stroke"><title>' + tip + 'no records</title></rect>';
      }
      var h = v > 0 ? Math.max(2, v / max * 100) : 1;
      return '<rect x="' + x.toFixed(2) + '" y="' + (100 - h).toFixed(1) + '" width="' + bw.toFixed(2) + '" height="' + h.toFixed(1) + '" rx="1" fill="' + fill + '"><title>' + tip + inr.format(v) + '</title></rect>';
    }
    for (i = 0; i < N; i++) {
      bars += bar(i * w + w * 0.06, w * 0.42, A.series.prev[i], shiftKey(A.prevStart, i), '#94a3b8');
      bars += bar(i * w + w * 0.52, w * 0.42, A.series.cur[i], shiftKey(A.curStart, i), '#0284c7');
    }
    return '<svg class="zsda-spark" viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label="Daily paid revenue, previous versus current period">' + bars + '</svg>';
  }

  function decompHtml(n) {
    var d = n.decomp;
    if (!d) return '<p class="zsda-note">No paid orders in the prior period, so the change cannot be split into volume and basket effects.</p>';
    var gv = Math.abs(d.volume), gt = Math.abs(d.ticket), sum = gv + gt || 1;
    return [
      '<div class="zsda-decomp">',
        '<div class="zsda-decomp-bar"><span class="zsda-seg-vol" style="width:' + (gv / sum * 100).toFixed(1) + '%"></span><span class="zsda-seg-tick" style="width:' + (gt / sum * 100).toFixed(1) + '%"></span></div>',
        '<div class="zsda-decomp-legend">',
          '<span><i class="zsda-seg-vol"></i>Order volume <b class="' + (d.volume < 0 ? 'zsda-neg' : 'zsda-pos') + '">' + sInr(d.volume) + '</b></span>',
          '<span><i class="zsda-seg-tick"></i>Basket size <b class="' + (d.ticket < 0 ? 'zsda-neg' : 'zsda-pos') + '">' + sInr(d.ticket) + '</b></span>',
        '</div>',
      '</div>'
    ].join('');
  }

  function panelSales(A) {
    var n = A.net, body;
    if (!A.comparable) {
      body = '<p class="zsda-note">' + esc('Comparison unavailable: ' + A.why + '.') + ' Current period: <b>' + inr.format(n.cur.rev) + '</b> from ' + plural(n.cur.n, 'paid order', 'paid orders') + '.</p>';
    } else {
      body = '<div class="zsda-big ' + (n.delta < 0 ? 'zsda-neg' : 'zsda-pos') + '">' + (n.delta < 0 ? '▼ ' : '▲ ') + sInr(n.delta) + ' <small>' + pctTxt(n.deltaPct) + '</small></div>' +
        '<p class="zsda-note">Orders ' + n.prev.n + ' → <b>' + n.cur.n + '</b> (' + pctTxt(n.dNPct) + ') · revenue ' + inr.format(n.prev.rev) + ' → <b>' + inr.format(n.cur.rev) + '</b></p>' +
        decompHtml(n);
    }
    return [
      '<section class="zsda-panel" aria-labelledby="zsda-h1">',
        '<h3 class="zsda-panel-h" id="zsda-h1"><span class="zsda-step">1</span>How much did sales drop?</h3>',
        body,
        '<div class="zsda-panel-title"><span>Daily paid revenue</span><span class="zsda-legend"><i class="zsda-leg-gray"></i> Prior ' + A.period + 'D &nbsp; <i class="zsda-leg-blue"></i> Current ' + A.period + 'D</span></div>',
        sparkHtml(A),
        '<div class="zsda-axis"><span>Day 1 · ' + fmtKey(A.prevStart) + ' / ' + fmtKey(A.curStart) + '</span><span>Day ' + A.period + ' · ' + fmtKey(A.prevEnd) + ' / ' + fmtKey(A.curEnd) + '</span></div>',
        '<p class="zsda-foot">Dashed marks = days with no records on file.</p>',
      '</section>'
    ].join('');
  }

  function panelCities(A) {
    var rows, head, maxV = 1;
    if (!A.comparable) {
      head = 'Where? <small>Top cities by current revenue</small>';
      A.cities.forEach(function (r) { maxV = Math.max(maxV, r.cur.rev); });
      rows = A.cities.slice(0, 5).map(function (r) {
        return '<div class="zsda-rank-row zsda-rank-static"><span class="zsda-rank-n">' + r.rank + '</span><span class="zsda-rank-city">' + esc(r.city) + '</span>' +
          '<span class="zsda-rank-bar"><i class="zsda-bar-blue" style="width:' + (r.cur.rev / maxV * 100).toFixed(1) + '%"></i></span>' +
          '<span class="zsda-rank-val">' + inr.format(r.cur.rev) + '<em>' + r.share.toFixed(1) + '%</em></span></div>';
      }).join('');
    } else {
      head = 'Which cities are hit hardest?';
      A.declining.forEach(function (r) { maxV = Math.max(maxV, r.drop); });
      rows = A.declining.slice(0, 5).map(function (r) {
        return '<button type="button" class="zsda-rank-row' + (S.focus === r.city ? ' active' : '') + '" data-zsda-focus="' + esc(r.city) + '" aria-pressed="' + (S.focus === r.city) + '" title="Show root cause for ' + esc(r.city) + '">' +
          '<span class="zsda-rank-n">' + r.rank + '</span><span class="zsda-rank-city">' + esc(r.city) + '</span>' +
          '<span class="zsda-rank-bar"><i style="width:' + (r.drop / maxV * 100).toFixed(1) + '%"></i></span>' +
          '<span class="zsda-rank-val zsda-neg">' + sInr(r.delta) + '<em>' + pctTxt(r.deltaPct) + '</em></span></button>';
      }).join('') || '<p class="zsda-note">No city recorded a decline in this window.</p>';
    }
    var gains = A.comparable ? A.cities.filter(function (r) { return r.state === 'growth' || r.state === 'new'; }).length : 0;
    return [
      '<section class="zsda-panel" aria-labelledby="zsda-h2">',
        '<h3 class="zsda-panel-h" id="zsda-h2"><span class="zsda-step">2</span>' + head + '</h3>',
        '<div class="zsda-rank-list">' + rows + '</div>',
        '<p class="zsda-foot">' + (A.comparable
          ? (A.declining.length > 5 ? '+' + (A.declining.length - 5) + ' more declining · ' : '') + (gains ? plural(gains, 'city', 'cities') + ' grew · ' : '') + 'click a city to see its root cause'
          : 'Ranked by current-period paid revenue') + '</p>',
      '</section>'
    ].join('');
  }

  function lensRow(l, isPrimary) {
    var pct = Math.round(l.share * 100);
    var stock = '';
    if (l.key === 'product' && l.stock) {
      var qty = Number(l.stock.quantity), rl = Number(l.stock.reorder_level);
      stock = '<div class="zsda-lens-sub">Stock check (network-level, matched “' + esc(l.stock.name || '') + '”): ' + esc(isFinite(qty) ? qty + ' units' : 'quantity n/a') + (isFinite(rl) ? ', reorder level ' + rl : '') + '</div>';
    }
    return '<div class="zsda-lens' + (isPrimary ? ' zsda-lens-primary' : '') + '">' +
      '<div class="zsda-lens-top"><span class="zsda-lens-title">' + (isPrimary ? '★ ' : '') + esc(l.title) + '</span><span class="zsda-lens-pct">explains up to ' + pct + '%</span></div>' +
      '<div class="zsda-lens-bar"><i style="width:' + pct + '%"></i></div>' +
      '<div class="zsda-lens-text">' + esc(l.text) + '</div>' + stock + '</div>';
  }

  function focusRow(A) {
    if (S.focus === 'ALL') return null;
    var i;
    for (i = 0; i < A.cities.length; i++) { if (A.cities[i].city === S.focus) return A.cities[i]; }
    return null;
  }

  function panelCause(A) {
    var f = focusRow(A) || A.net, label = f.label === 'Network' ? 'Network overall' : f.city;
    var chips = '<button type="button" class="zsda-chip' + (f.label === 'Network' ? ' active' : '') + '" data-zsda-focus="ALL">Network</button>';
    A.declining.slice(0, 5).forEach(function (r) {
      chips += '<button type="button" class="zsda-chip' + (f.label === r.city ? ' active' : '') + '" data-zsda-focus="' + esc(r.city) + '">' + esc(r.city) + '</button>';
    });
    var body;
    if (!A.comparable) {
      body = '<p class="zsda-note">Root-cause analysis compares two periods, and ' + esc(A.why) + '. No cause is asserted for this window.</p>';
    } else if (f.state !== 'decline') {
      body = '<p class="zsda-note"><b>' + esc(label) + '</b> did not decline in this window (' + sInr(f.delta) + ', ' + pctTxt(f.deltaPct) + '); there is no drop to explain.</p>';
    } else {
      var lenses = f.lenses.slice(0, 4).map(function (l, i) { return lensRow(l, i === 0); }).join('');
      var hyp = f.hypotheses.length
        ? '<div class="zsda-hyp-box"><div class="zsda-hyp-h">' + lensTagHtml('hyp') + ' Possible causes — not confirmed by the data</div><ul class="zsda-hyp">' +
          f.hypotheses.map(function (h) { return '<li>' + esc(h) + '</li>'; }).join('') + '</ul></div>'
        : '';
      body = '<div class="zsda-ev-head">' + lensTagHtml('ev') + ' <span>Evidence from your records · ' + f.confidence + ' confidence (n = ' + f.sample + ' paid orders)</span></div>' + lenses + hyp;
    }
    return [
      '<section class="zsda-panel" aria-labelledby="zsda-h3">',
        '<h3 class="zsda-panel-h" id="zsda-h3"><span class="zsda-step">3</span>Why did it happen? <small>' + esc(label) + '</small></h3>',
        '<div class="zsda-chips">' + chips + '</div>',
        body,
      '</section>'
    ].join('');
  }

  function cityTableHtml(A) {
    var head, rows;
    if (!A.comparable) {
      head = '<th>#</th><th style="min-width:140px;">City</th><th class="zsda-r">Current revenue</th><th class="zsda-r">Share</th><th class="zsda-r">Paid orders</th><th class="zsda-r">Avg order value</th>';
      rows = A.cities.map(function (r) {
        return '<tr><td>' + r.rank + '</td><td class="zsda-cell-loc"><div class="zsda-loc-name">📍 ' + esc(r.city) + '</div></td>' +
          '<td class="zsda-r">' + inr.format(r.cur.rev) + '</td><td class="zsda-r">' + r.share.toFixed(1) + '%</td><td class="zsda-r">' + r.cur.n + '</td><td class="zsda-r">' + inr.format(r.cur.aov) + '</td></tr>';
      }).join('');
    } else {
      head = '<th>#</th><th style="min-width:130px;">City</th><th style="min-width:170px;">Paid revenue<br><span class="zsda-th-sub">prior → current</span></th>' +
        '<th class="zsda-r" style="min-width:120px;">Change &amp; risk</th><th style="min-width:110px;">Paid orders<br><span class="zsda-th-sub">prior → current</span></th>' +
        '<th style="min-width:280px;">Root cause — evidence ' + lensTagHtml('ev') + '</th><th style="min-width:250px;">Possible causes — to verify ' + lensTagHtml('hyp') + '</th>';
      rows = A.cities.map(function (r) {
        var dec = r.state === 'decline';
        var chg = dec
          ? '<div class="zsda-drop-badge">▼ ' + pctTxt(r.deltaPct) + '</div><span class="zsda-drop-amt">' + sInr(r.delta) + '</span>'
          : '<div class="zsda-gain-badge">' + (r.state === 'new' ? '▲ New' : '▲ ' + pctTxt(r.deltaPct)) + '</div><span class="zsda-gain-amt">' + sInr(r.delta) + '</span>';
        var cause, hyp;
        if (dec && r.primary) {
          var more = r.lenses.slice(1, 3).map(function (l) { return '<li>' + esc(l.title) + ' · up to ' + Math.round(l.share * 100) + '%</li>'; }).join('');
          cause = '<div class="zsda-ev-primary"><b>' + esc(r.primary.title) + '</b> <span class="zsda-lens-pct">up to ' + Math.round(r.primary.share * 100) + '% of decline</span></div>' +
            '<div class="zsda-ev-text">' + esc(r.primary.text) + '</div>' + (more ? '<ul class="zsda-ev-more">' + more + '</ul>' : '');
          hyp = r.hypotheses.length ? '<ul class="zsda-hyp">' + r.hypotheses.map(function (h) { return '<li>' + esc(h) + '</li>'; }).join('') + '</ul>' : '<span class="zsda-muted">—</span>';
        } else if (dec) {
          cause = '<span class="zsda-muted">Decline without a dominant driver in the available fields.</span>';
          hyp = '<span class="zsda-muted">—</span>';
        } else {
          cause = '<span class="zsda-muted">No decline — ' + (r.state === 'new' ? 'no paid orders in the prior period.' : 'revenue ' + sInr(r.delta) + ', orders ' + r.prev.n + ' → ' + r.cur.n + '.') + '</span>';
          hyp = '<span class="zsda-muted">—</span>';
        }
        return '<tr' + (S.focus === r.city ? ' class="zsda-row-active"' : '') + '>' +
          '<td>' + r.rank + '</td>' +
          '<td class="zsda-cell-loc"><div class="zsda-loc-name">📍 ' + esc(r.city) + '</div><div class="zsda-loc-sub">' + r.confidence + ' confidence · n = ' + r.sample + '</div></td>' +
          '<td><div class="zsda-details-flow">' + inr.format(r.prev.rev) + ' → <b>' + inr.format(r.cur.rev) + '</b></div>' +
            (r.cur.pendN ? '<div class="zsda-details-cat">' + plural(r.cur.pendN, 'pending order', 'pending orders') + ' (' + inr.format(r.cur.pendRev) + ')</div>' : '') + '</td>' +
          '<td class="zsda-r">' + chg + '<div><span class="' + riskClass(r.risk) + '">' + r.risk + ' risk</span></div></td>' +
          '<td>' + r.prev.n + ' → <b>' + r.cur.n + '</b><div class="zsda-details-cat">' + pctTxt(r.dNPct) + '</div></td>' +
          '<td><div class="zsda-reason-box">' + cause + '</div></td>' +
          '<td><div class="zsda-hyp-cell">' + hyp + '</div></td></tr>';
      }).join('');
    }
    return [
      '<div class="zsda-table-container">',
        '<div class="zsda-table-head-bar"><div>',
          '<h3 class="zsda-table-title">City-wise sales drop &amp; root-cause audit</h3>',
          '<p class="zsda-table-sub">' + (A.comparable ? 'Ranked by ₹ decline (rank 1 = largest drop). Paid orders only, same basis as the dashboard.' : 'Current-period snapshot — a comparable prior period is required to rank declines.') + '</p>',
        '</div></div>',
        '<div class="zsda-table-scroll"><table class="zsda-table"><thead><tr>' + head + '</tr></thead><tbody>' +
          (rows || '<tr><td colspan="7" style="text-align:center;padding:24px;color:#94a3b8;">No paid orders in this window.</td></tr>') + '</tbody></table></div>',
      '</div>'
    ].join('');
  }

  function methodHtml(A) {
    var statuses = Object.create(null), demo = 0;
    S.sales.forEach(function (s) { statuses[s.status || 'Unknown'] = 1; if (s.is_demo === true || s.is_demo === 1) demo++; });
    var unavailable = [];
    var inv = S.inventory.status;
    unavailable.push(inv === 'ready'
      ? 'Stock: network-level only (' + S.inventory.items.length + ' SKUs from the inventory feed; no city-level stock) — matched by product name.'
      : 'Stock levels: ' + (inv === 'empty' ? 'the inventory feed returned no items' : 'the inventory feed is unreachable') + ' — stock-outs cannot be confirmed or ruled out.');
    var failed = ['Cancelled', 'Refunded', 'Failed'].filter(function (k) { return statuses[k]; });
    if (!failed.length) unavailable.push('Cancellations / refunds / failed payments: none recorded in the dataset (statuses present: ' + Object.keys(statuses).join(', ') + ').');
    unavailable.push('Marketing campaigns, price history, delivery SLAs and clinic capacity: not part of the sales dataset.');
    return [
      '<div class="zsda-method">',
        '<div class="zsda-method-col"><h4>How this is calculated</h4><ul>',
          '<li>Window = last ' + A.period + ' IST calendar days ending today (' + fmtKey(A.today, true) + '), vs the ' + A.period + ' days before — same boundaries as the dashboard’s 7D / 14D / 30D filter.</li>',
          '<li>Revenue and orders count status <b>Paid</b> (matches the dashboard’s Paid Revenue and daily sales_total). Pending orders are reported separately.</li>',
          '<li>Change = volume effect (Δ orders × prior order value) + basket effect (current orders × Δ order value).</li>',
          '<li>“Explains up to X%” = share of the net decline carried by that single factor; factors overlap and are not additive.</li>',
        '</ul></div>',
        '<div class="zsda-method-col"><h4>Data &amp; limits</h4><ul>',
          '<li>Source: ' + esc(sourceLabel()) + ' · ' + S.sales.length + ' records' + (demo ? ' (' + demo + ' demo)' : '') + (A.span ? ' · ' + fmtKey(A.span.start, true) + ' – ' + fmtKey(A.span.end, true) : '') + '.</li>',
          unavailable.map(function (u) { return '<li class="zsda-unavail">Not available: ' + esc(u) + '</li>'; }).join(''),
        '</ul></div>',
      '</div>'
    ].join('');
  }

  /* ───────────────────────── render ───────────────────────── */

  function stateHtml(period, sub, inner) {
    return '<div class="zsda-container">' + headerHtml(period, sub) + inner + '</div>';
  }

  function render() {
    if (!host) return;

    if (!S.loaded) {
      host.innerHTML = stateHtml(S.period, 'Loading your stored records…',
        '<div class="zsda-loading"><span class="zsda-pulse"></span> Computing sales drop analysis…</div>');
      bindInteractions();
      return;
    }
    if (S.error) {
      host.innerHTML = stateHtml(S.period, 'Sales records could not be loaded.',
        '<div class="zsda-state zsda-state-err" role="alert"><b>Could not load sales data</b><p class="zsda-err">' + esc(S.error) + '</p>' +
        '<button type="button" class="zsda-btn-ghost" data-zsda-retry>Retry</button></div>');
      bindInteractions();
      return;
    }
    if (!S.sales.length) {
      host.innerHTML = stateHtml(S.period, 'No sales records are stored yet.',
        '<div class="zsda-state"><b>No sales records available</b><p>Add or import sales to see where and why sales dropped.</p>' +
        '<button type="button" class="zsda-btn-ghost" data-zsda-retry>Reload</button></div>');
      bindInteractions();
      return;
    }

    var anchor = getAnchorDate(S.sales, S.metrics);
    var A = analyse(S.sales, S.period, anchor, { metrics: S.metrics, inventory: S.inventory });
    S.last = A;
    if (S.focus !== 'ALL' && !focusRow(A)) S.focus = 'ALL';

    var nt = notices(A).map(function (n) {
      return '<div class="zsda-notice zsda-notice-' + n.lvl + '" role="status">' + (n.lvl === 'warn' ? '⚠ ' : 'ℹ ') + esc(n.text) + '</div>';
    }).join('');

    host.innerHTML = [
      '<div class="zsda-container">',
        headerHtml(A.period, rangeSub(A)),
        '<div class="zsda-datastrip"><span class="zsda-chip-static">Source · ' + esc(sourceLabel()) + '</span>' +
          '<span class="zsda-chip-static">Latest record · ' + (A.span ? fmtKey(A.span.end, true) : 'n/a') + '</span>' +
          '<span class="zsda-chip-static">Updated · ' + (S.updatedAt ? S.updatedAt.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : '—') + '</span></div>',
        nt,
        briefHtml(A),
        '<button type="button" class="zsda-btn-analyze" id="zsda-btn-trigger">',
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z"></path></svg>',
          (S.loading ? 'Refreshing records…' : 'Analyze my records (' + A.period + 'D view)'),
        '</button>',
        kpiHtml(A),
        '<div class="zsda-insight-grid">', panelSales(A), panelCities(A), panelCause(A), '</div>',
        cityTableHtml(A),
        methodHtml(A),
      '</div>'
    ].join('');

    bindInteractions();
  }

  function setPeriod(p) {
    if (!p || p === S.period) return;
    S.period = p;
    render();
    triggerHeaderButton(p);   // keeps the rest of the dashboard on the same 7D / 14D / 30D range
  }

  function bindInteractions() {
    if (!host) return;
    var i, pills = host.querySelectorAll('[data-set-period]');
    for (i = 0; i < pills.length; i++) {
      pills[i].addEventListener('click', function () { setPeriod(parseInt(this.getAttribute('data-set-period'), 10)); });
    }
    var foc = host.querySelectorAll('[data-zsda-focus]');
    for (i = 0; i < foc.length; i++) {
      foc[i].addEventListener('click', function () { S.focus = this.getAttribute('data-zsda-focus') || 'ALL'; render(); });
    }
    var retry = host.querySelector('[data-zsda-retry]');
    if (retry) {
      retry.addEventListener('click', function () {
        S.loaded = false; S.error = '';
        render();
        load(true);
      });
    }
    var btn = host.querySelector('#zsda-btn-trigger');
    if (btn) {
      btn.addEventListener('click', function () {
        if (S.loading) return;
        btn.disabled = true;
        btn.style.opacity = '0.75';
        btn.lastChild.nodeValue = 'Refreshing records…';
        load(true);
      });
    }
  }

  /* Trigger matching header button (7D / 14D / 30D) so the whole dashboard follows the panel. */
  function triggerHeaderButton(p) {
    var str = p + 'D', btns = document.querySelectorAll('header button'), i;
    for (i = 0; i < btns.length; i++) {
      if ((btns[i].textContent || '').trim() === str) { btns[i].click(); break; }
    }
  }

  /* Sync period from the top-right header buttons. */
  function syncPeriodFromHeader() {
    var btns = document.querySelectorAll('header button'), i;
    for (i = 0; i < btns.length; i++) {
      var t = (btns[i].textContent || '').trim();
      if ((t === '7D' || t === '14D' || t === '30D') && (btns[i].classList.contains('active') || btns[i].getAttribute('data-state') === 'active')) {
        var p = parseInt(t, 10);
        if (p && p !== S.period) { S.period = p; render(); }
        return;
      }
    }
  }

  /* ───────────────────────── styles ───────────────────────── */

  function injectStyle() {
    if (document.getElementById('zsda-style')) return;
    var st = document.createElement('style');
    st.id = 'zsda-style';
    st.textContent = [
      '#zsda-root { grid-column: 1 / -1; margin: 8px 0 16px; }',
      '.zsda-container { position: relative; overflow: hidden; border-radius: 18px; border: 1.5px solid rgba(186, 230, 253, 0.85); background: radial-gradient(135% 100% at 100% 0%, rgba(186, 230, 253, 0.45) 0%, rgba(240, 249, 255, 0.85) 45%, rgba(255, 255, 255, 0.96) 100%); box-shadow: 0 10px 30px -5px rgba(14, 165, 233, 0.12), 0 2px 8px -1px rgba(0, 0, 0, 0.04); backdrop-filter: blur(16px); padding: 26px 28px; color: #0f172a; font-family: var(--font-sans, "Manrope", sans-serif); }',
      '.zsda-ambient-glow { position: absolute; right: 0; top: 0; width: 300px; height: 300px; background: radial-gradient(circle at top right, rgba(56, 189, 248, 0.32), transparent 70%); pointer-events: none; }',
      '.zsda-header-row { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; flex-wrap: wrap; position: relative; z-index: 2; }',
      '.zsda-badge-ai { display: inline-flex; align-items: center; gap: 8px; font-family: "IBM Plex Mono", monospace; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #0284c7; }',
      '.zsda-pulse-icon { animation: zsdaPulse 2s infinite ease-in-out; }',
      '@keyframes zsdaPulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.75; transform: scale(1.08); } }',
      '.zsda-title { margin: 10px 0 4px; font-family: "Sora", "Manrope", sans-serif; font-size: 26px; font-weight: 700; color: #0f172a; letter-spacing: -0.02em; }',
      '.zsda-sub { margin: 0; font-size: 13px; color: #64748b; line-height: 1.55; max-width: 760px; }',
      '.zsda-sub b { color: #334155; font-weight: 700; }',
      '.zsda-period-pills { display: flex; align-items: center; gap: 6px; background: rgba(255, 255, 255, 0.85); border: 1.5px solid rgba(186, 230, 253, 0.9); border-radius: 12px; padding: 4px; box-shadow: 0 2px 8px rgba(14, 165, 233, 0.06); }',
      '.zsda-pill-btn { border: none; background: transparent; color: #475569; font-size: 12.5px; font-weight: 700; padding: 6px 14px; border-radius: 8px; cursor: pointer; transition: all 0.2s ease; }',
      '.zsda-pill-btn:hover { color: #0284c7; background: rgba(240, 249, 255, 0.8); }',
      '.zsda-pill-btn.active { background: #0284c7; color: #ffffff; box-shadow: 0 2px 8px rgba(2, 132, 199, 0.35); }',
      '.zsda-pill-btn:focus-visible, .zsda-chip:focus-visible, .zsda-rank-row:focus-visible, .zsda-btn-analyze:focus-visible, .zsda-btn-ghost:focus-visible { outline: 2px solid #0284c7; outline-offset: 2px; }',

      '.zsda-datastrip { display: flex; flex-wrap: wrap; gap: 8px; margin: 16px 0 0; position: relative; z-index: 2; }',
      '.zsda-chip-static { font-family: "IBM Plex Mono", monospace; font-size: 10.5px; font-weight: 600; color: #475569; background: rgba(255, 255, 255, 0.85); border: 1px solid rgba(186, 230, 253, 0.9); border-radius: 999px; padding: 4px 10px; }',
      '.zsda-notice { position: relative; z-index: 2; margin-top: 10px; font-size: 12.5px; line-height: 1.5; border-radius: 10px; padding: 9px 12px; }',
      '.zsda-notice-warn { background: #fffbeb; border: 1px solid #fcd34d; color: #92400e; }',
      '.zsda-notice-info { background: #f0f9ff; border: 1px solid #bae6fd; color: #075985; }',

      '.zsda-decision-brief-card { margin: 18px 0 14px; border: 1.5px solid rgba(186, 230, 253, 0.75); border-radius: 14px; background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(12px); padding: 12px 22px; box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.95), 0 2px 8px rgba(14, 165, 233, 0.04); position: relative; z-index: 2; }',
      '.zsda-brief-row { display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 11px 0; border-bottom: 1px solid rgba(226, 232, 240, 0.8); font-size: 13.5px; }',
      '.zsda-brief-row:last-child { border-bottom: none; }',
      '.zsda-brief-label { display: flex; align-items: center; gap: 11px; color: #334155; font-weight: 600; font-size: 13.5px; white-space: nowrap; }',
      '.zsda-dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }',
      '.zsda-dot-orange { background: #f59e0b; box-shadow: 0 0 8px rgba(245, 158, 11, 0.55); }',
      '.zsda-dot-green { background: #10b981; box-shadow: 0 0 8px rgba(16, 185, 129, 0.55); }',
      '.zsda-dot-blue { background: #0284c7; box-shadow: 0 0 8px rgba(2, 132, 199, 0.55); }',
      '.zsda-dot-red { background: #ef4444; box-shadow: 0 0 8px rgba(239, 68, 68, 0.55); }',
      '.zsda-dot-purple { background: #8b5cf6; box-shadow: 0 0 8px rgba(139, 92, 246, 0.55); }',
      '.zsda-brief-val { font-size: 13px; font-weight: 600; color: #0f172a; text-align: right; max-width: 640px; line-height: 1.5; }',
      '.zsda-muted { color: #94a3b8; font-weight: 500; }',
      '.zsda-btn-analyze { width: 100%; margin-top: 4px; border: none; border-radius: 12px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; padding: 13px 22px; font-size: 14.5px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 10px; cursor: pointer; box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35); transition: all 0.2s ease; position: relative; z-index: 2; }',
      '.zsda-btn-analyze:hover:not(:disabled) { background: linear-gradient(135deg, #059669 0%, #047857 100%); box-shadow: 0 6px 20px rgba(16, 185, 129, 0.45); transform: translateY(-1px); }',
      '.zsda-btn-analyze:disabled { cursor: progress; }',
      '.zsda-btn-ghost { border: 1.5px solid #bae6fd; background: #fff; color: #0369a1; font-weight: 700; font-size: 13px; padding: 8px 18px; border-radius: 10px; cursor: pointer; }',
      '.zsda-btn-ghost:hover { background: #f0f9ff; }',

      '.zsda-kpi-strip { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin: 18px 0; position: relative; z-index: 2; }',
      '.zsda-kpi-item { border: 1.5px solid rgba(186, 230, 253, 0.7); background: rgba(255, 255, 255, 0.85); border-radius: 12px; padding: 14px 16px; display: flex; flex-direction: column; gap: 4px; box-shadow: 0 2px 6px rgba(14, 165, 233, 0.04); }',
      '.zsda-kpi-item span { font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.04em; }',
      '.zsda-kpi-item b { font-family: "Sora", sans-serif; font-size: 22px; font-weight: 700; color: #0f172a; }',
      '.zsda-kpi-item i { font-size: 11.5px; font-style: normal; color: #64748b; line-height: 1.4; }',
      '.zsda-kpi-item em { font-style: normal; font-weight: 700; }',
      '.zsda-kpi-drop { border-color: rgba(254, 202, 202, 0.85); background: rgba(254, 242, 242, 0.75); }',
      '.zsda-kpi-gain { border-color: rgba(187, 247, 208, 0.85); background: rgba(240, 253, 244, 0.75); }',

      '.zsda-insight-grid { display: grid; grid-template-columns: 1.1fr 1fr 1.2fr; gap: 14px; margin-bottom: 18px; position: relative; z-index: 2; align-items: stretch; }',
      '.zsda-panel { border: 1.5px solid rgba(186, 230, 253, 0.75); border-radius: 12px; background: rgba(255, 255, 255, 0.92); padding: 16px 18px; box-shadow: 0 2px 6px rgba(14, 165, 233, 0.04); min-width: 0; display: flex; flex-direction: column; gap: 10px; }',
      '.zsda-panel-h { margin: 0; font-family: "Sora", sans-serif; font-size: 14.5px; font-weight: 700; color: #0f172a; display: flex; align-items: center; flex-wrap: wrap; gap: 8px; }',
      '.zsda-panel-h small { font-family: "Manrope", sans-serif; font-size: 11.5px; font-weight: 600; color: #0369a1; background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 999px; padding: 2px 9px; }',
      '.zsda-step { width: 22px; height: 22px; border-radius: 50%; background: #0284c7; color: #fff; font-size: 12px; font-weight: 800; display: inline-grid; place-items: center; flex-shrink: 0; }',
      '.zsda-big { font-family: "Sora", sans-serif; font-size: 26px; font-weight: 800; letter-spacing: -0.02em; }',
      '.zsda-big small { font-size: 14px; font-weight: 700; margin-left: 4px; }',
      '.zsda-note { margin: 0; font-size: 12.5px; color: #475569; line-height: 1.55; }',
      '.zsda-foot { margin: 0; font-size: 11px; color: #94a3b8; }',
      '.zsda-panel-title { display: flex; justify-content: space-between; align-items: center; gap: 8px; flex-wrap: wrap; font-size: 12px; font-weight: 700; color: #334155; }',
      '.zsda-legend { font-size: 11px; color: #64748b; font-weight: 500; }',
      '.zsda-leg-gray { display: inline-block; width: 9px; height: 9px; background: #94a3b8; border-radius: 2px; }',
      '.zsda-leg-blue { display: inline-block; width: 9px; height: 9px; background: #0284c7; border-radius: 2px; }',
      '.zsda-spark { width: 100%; height: 96px; display: block; }',
      '.zsda-axis { display: flex; justify-content: space-between; gap: 8px; font-size: 10px; color: #94a3b8; font-family: "IBM Plex Mono", monospace; }',
      '.zsda-decomp-bar { display: flex; height: 10px; border-radius: 999px; overflow: hidden; background: #e2e8f0; }',
      '.zsda-seg-vol { background: #0284c7; }',
      '.zsda-seg-tick { background: #8b5cf6; }',
      '.zsda-decomp-legend { display: flex; flex-wrap: wrap; gap: 6px 16px; margin-top: 6px; font-size: 11.5px; color: #475569; }',
      '.zsda-decomp-legend i { display: inline-block; width: 9px; height: 9px; border-radius: 2px; margin-right: 6px; }',

      '.zsda-rank-list { display: flex; flex-direction: column; gap: 6px; }',
      '.zsda-rank-row { display: grid; grid-template-columns: 22px minmax(70px, 1fr) minmax(50px, 1.1fr) auto; align-items: center; gap: 10px; width: 100%; text-align: left; padding: 8px 10px; border: 1px solid #e2e8f0; border-radius: 10px; background: #fff; font-size: 12.5px; color: #0f172a; font-family: inherit; }',
      'button.zsda-rank-row { cursor: pointer; transition: all 0.15s ease; }',
      'button.zsda-rank-row:hover { border-color: #7dd3fc; background: #f0f9ff; }',
      '.zsda-rank-row.active { border-color: #0284c7; background: #f0f9ff; box-shadow: 0 0 0 2px rgba(2, 132, 199, 0.12); }',
      '.zsda-rank-n { width: 22px; height: 22px; border-radius: 6px; background: #f1f5f9; color: #475569; font-weight: 800; font-size: 11px; display: grid; place-items: center; }',
      '.zsda-rank-city { font-weight: 700; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }',
      '.zsda-rank-bar { height: 8px; border-radius: 999px; background: #f1f5f9; overflow: hidden; }',
      '.zsda-rank-bar i { display: block; height: 100%; border-radius: 999px; background: linear-gradient(90deg, #f87171, #dc2626); }',
      '.zsda-rank-bar i.zsda-bar-blue { background: linear-gradient(90deg, #38bdf8, #0284c7); }',
      '.zsda-rank-val { font-family: "IBM Plex Mono", monospace; font-weight: 700; font-size: 12px; text-align: right; white-space: nowrap; }',
      '.zsda-rank-val em { display: block; font-style: normal; font-size: 10.5px; font-weight: 600; opacity: 0.85; }',

      '.zsda-chips { display: flex; flex-wrap: wrap; gap: 6px; }',
      '.zsda-chip { border: 1px solid #bae6fd; background: #fff; color: #0369a1; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 999px; cursor: pointer; font-family: inherit; }',
      '.zsda-chip:hover { background: #f0f9ff; }',
      '.zsda-chip.active { background: #0284c7; border-color: #0284c7; color: #fff; }',
      '.zsda-tag { display: inline-block; font-family: "IBM Plex Mono", monospace; font-size: 9.5px; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase; padding: 2px 7px; border-radius: 6px; vertical-align: middle; }',
      '.zsda-tag-ev { background: #e0f2fe; color: #0369a1; border: 1px solid #7dd3fc; }',
      '.zsda-tag-hyp { background: #fef3c7; color: #92400e; border: 1px solid #fcd34d; }',
      '.zsda-ev-head { display: flex; align-items: center; gap: 8px; font-size: 11.5px; color: #475569; }',
      '.zsda-lens { border: 1px solid #e2e8f0; border-radius: 10px; padding: 9px 11px; background: #fff; }',
      '.zsda-lens-primary { border-color: #7dd3fc; background: #f0f9ff; }',
      '.zsda-lens-top { display: flex; justify-content: space-between; gap: 8px; align-items: baseline; }',
      '.zsda-lens-title { font-weight: 800; font-size: 12.5px; color: #0f172a; }',
      '.zsda-lens-pct { font-family: "IBM Plex Mono", monospace; font-size: 10.5px; font-weight: 700; color: #0369a1; white-space: nowrap; }',
      '.zsda-lens-bar { height: 5px; border-radius: 999px; background: #e2e8f0; margin: 6px 0; overflow: hidden; }',
      '.zsda-lens-bar i { display: block; height: 100%; background: #0284c7; border-radius: 999px; }',
      '.zsda-lens-text { font-size: 12px; color: #334155; line-height: 1.45; }',
      '.zsda-lens-sub { font-size: 11px; color: #64748b; margin-top: 3px; }',
      '.zsda-hyp-box { border: 1.5px dashed #fcd34d; border-radius: 10px; background: #fffbeb; padding: 9px 12px; }',
      '.zsda-hyp-h { font-size: 11.5px; font-weight: 700; color: #92400e; margin-bottom: 4px; }',
      '.zsda-hyp { margin: 0; padding-left: 16px; font-size: 11.8px; line-height: 1.5; color: #78350f; list-style: disc; }',
      '.zsda-hyp li { margin-bottom: 3px; }',

      '.zsda-table-container { border: 1.5px solid rgba(186, 230, 253, 0.85); border-radius: 14px; background: rgba(255, 255, 255, 0.95); overflow: hidden; box-shadow: 0 4px 18px rgba(14, 165, 233, 0.06); position: relative; z-index: 2; }',
      '.zsda-table-head-bar { padding: 16px 20px 14px; border-bottom: 1.5px solid rgba(186, 230, 253, 0.7); background: linear-gradient(180deg, #f0f9ff 0%, #ffffff 100%); }',
      '.zsda-table-title { margin: 0; font-family: "Sora", sans-serif; font-size: 17px; font-weight: 700; color: #0f172a; }',
      '.zsda-table-sub { margin: 3px 0 0; font-size: 12px; color: #64748b; }',
      '.zsda-table-scroll { overflow-x: auto; width: 100%; }',
      '.zsda-table { width: 100%; border-collapse: collapse; font-size: 12.5px; min-width: 1040px; }',
      '.zsda-table th { background: #f8fafc; color: #0369a1; font-family: "IBM Plex Mono", monospace; font-size: 10.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; padding: 12px 14px; text-align: left; border-bottom: 1.5px solid #bae6fd; white-space: nowrap; vertical-align: bottom; }',
      '.zsda-th-sub { text-transform: none; letter-spacing: 0; font-weight: 500; color: #94a3b8; }',
      '.zsda-table td { padding: 13px 14px; border-bottom: 1px solid #f1f5f9; vertical-align: top; color: #1e293b; line-height: 1.45; }',
      '.zsda-table tr:hover td { background: rgba(240, 249, 255, 0.45); }',
      '.zsda-table tr.zsda-row-active td { background: rgba(224, 242, 254, 0.5); }',
      '.zsda-r { text-align: right !important; }',
      '.zsda-loc-name { font-weight: 700; font-size: 13.5px; color: #0f172a; }',
      '.zsda-loc-sub { font-size: 11px; color: #64748b; margin-top: 2px; }',
      '.zsda-drop-amt { font-family: "IBM Plex Mono", monospace; font-weight: 700; font-size: 12.5px; color: #dc2626; display: block; margin-top: 3px; }',
      '.zsda-gain-amt { font-family: "IBM Plex Mono", monospace; font-weight: 700; font-size: 12.5px; color: #16a34a; display: block; margin-top: 3px; }',
      '.zsda-details-flow { font-size: 12px; color: #475569; }',
      '.zsda-details-cat { font-size: 11px; color: #64748b; margin-top: 2px; }',
      '.zsda-drop-badge { display: inline-block; font-family: "IBM Plex Mono", monospace; font-weight: 800; font-size: 12.5px; color: #dc2626; background: #fee2e2; padding: 3px 8px; border-radius: 6px; border: 1px solid #fca5a5; }',
      '.zsda-gain-badge { display: inline-block; font-family: "IBM Plex Mono", monospace; font-weight: 800; font-size: 12.5px; color: #16a34a; background: #dcfce7; padding: 3px 8px; border-radius: 6px; border: 1px solid #86efac; }',
      '.zsda-reason-box { font-size: 12px; line-height: 1.5; color: #1e293b; background: rgba(240, 249, 255, 0.7); border: 1px solid #bae6fd; border-radius: 8px; padding: 8px 10px; }',
      '.zsda-ev-primary { display: flex; justify-content: space-between; gap: 8px; align-items: baseline; }',
      '.zsda-ev-text { margin-top: 3px; color: #334155; }',
      '.zsda-ev-more { margin: 5px 0 0; padding-left: 16px; list-style: disc; font-size: 11px; color: #64748b; }',
      '.zsda-hyp-cell { font-size: 11.8px; line-height: 1.5; color: #78350f; background: #fffbeb; border: 1px dashed #fcd34d; border-radius: 8px; padding: 8px 10px; }',
      '.zsda-hyp-cell .zsda-muted { color: #b45309; opacity: 0.6; }',
      '.zsda-risk { display: inline-block; margin-top: 4px; font-size: 9.5px; font-weight: 800; padding: 2px 7px; border-radius: 999px; text-transform: uppercase; letter-spacing: 0.04em; }',
      '.zsda-risk-critical { background: #fee2e2; color: #b91c1c; border: 1px solid #f87171; }',
      '.zsda-risk-high { background: #ffedd5; color: #c2410c; border: 1px solid #fdba74; }',
      '.zsda-risk-moderate { background: #fef9c3; color: #a16207; border: 1px solid #fde047; }',
      '.zsda-risk-low { background: #e0f2fe; color: #0369a1; border: 1px solid #7dd3fc; }',
      '.zsda-risk-stable { background: #dcfce7; color: #15803d; border: 1px solid #86efac; }',
      '.zsda-neg { color: #dc2626 !important; }',
      '.zsda-pos { color: #16a34a !important; }',

      '.zsda-method { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 16px; position: relative; z-index: 2; }',
      '.zsda-method-col { border: 1px solid rgba(186, 230, 253, 0.8); border-radius: 12px; background: rgba(255, 255, 255, 0.7); padding: 12px 16px; }',
      '.zsda-method-col h4 { margin: 0 0 6px; font-family: "Sora", sans-serif; font-size: 12.5px; font-weight: 700; color: #0f172a; }',
      '.zsda-method-col ul { margin: 0; padding-left: 16px; list-style: disc; font-size: 11.5px; line-height: 1.55; color: #475569; }',
      '.zsda-method-col li { margin-bottom: 3px; }',
      '.zsda-unavail { color: #92400e; }',

      '.zsda-loading { position: relative; z-index: 2; margin-top: 22px; padding: 28px; text-align: center; color: #0369a1; font-weight: 600; font-size: 13.5px; }',
      '.zsda-pulse { display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: #0284c7; margin-right: 8px; animation: zsdaPulse 1.2s infinite ease-in-out; }',
      '.zsda-state { position: relative; z-index: 2; margin-top: 22px; padding: 26px; text-align: center; border: 1.5px dashed #bae6fd; border-radius: 12px; background: rgba(255,255,255,0.7); color: #334155; }',
      '.zsda-state p { margin: 6px 0 14px; font-size: 12.5px; }',
      '.zsda-state-err { border-color: #fca5a5; background: #fef2f2; }',
      '.zsda-err { color: #b91c1c; }',

      '@media (max-width: 1100px) {',
      '  .zsda-insight-grid { grid-template-columns: 1fr 1fr; }',
      '  .zsda-insight-grid .zsda-panel:nth-child(3) { grid-column: 1 / -1; }',
      '}',
      '@media (max-width: 960px) {',
      '  .zsda-container { padding: 20px 16px; }',
      '  .zsda-kpi-strip { grid-template-columns: repeat(2, 1fr); }',
      '  .zsda-insight-grid, .zsda-method { grid-template-columns: 1fr; }',
      '  .zsda-brief-row { flex-direction: column; align-items: flex-start; gap: 4px; }',
      '  .zsda-brief-val { text-align: left; }',
      '  .zsda-brief-label { white-space: normal; }',
      '}'
    ].join('');
    document.head.appendChild(st);
  }

  /* ───────────────────────── mounting ───────────────────────── */

  function mount() {
    var ai = document.getElementById('ai');
    if (!ai || !ai.parentNode) return;

    injectStyle();
    ai.style.display = 'none'; // Replace the original Zenve AI signal card

    var existing = document.getElementById('zsda-root');
    if (existing && existing.parentNode === ai.parentNode) {
      host = existing;
      existing.style.removeProperty('display');
      existing.style.display = '';
      if (!existing.innerHTML.trim() || !existing.querySelector('.zsda-container')) {
        render();
      }
      syncPeriodFromHeader();
      return;
    }

    host = existing || document.createElement('section');
    host.id = 'zsda-root';
    host.style.removeProperty('display');
    host.style.display = '';
    ai.parentNode.insertBefore(host, ai.nextSibling);

    render();
    syncPeriodFromHeader();
  }

  var tick = null;
  function schedule() {
    if (tick) return;
    tick = setTimeout(function () {
      tick = null;
      mount();
      syncPeriodFromHeader();
    }, 80);
  }

  function init() {
    load();

    // Listen for header 7D / 14D / 30D button clicks anywhere on page
    document.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('header button');
      if (!b) return;
      var t = (b.textContent || '').trim();
      if (t === '7D' || t === '14D' || t === '30D') {
        var p = parseInt(t, 10);
        if (p !== S.period) { S.period = p; render(); }
      }
    }, true);

    // Re-mount whenever navigation returns to Executive Dashboard
    window.addEventListener('hashchange', function () {
      var h = (window.location.hash || '').toLowerCase();
      if (!h || h === '#' || h === '#overview' || h === '#executive-dashboard' || h === '#executive') {
        mount();
      }
    });
    window.addEventListener('popstate', function () {
      mount();
    });

    new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true });
    mount();
    setInterval(function () { load(); }, 60000);
  }

  window.ZenveSalesDropAnalysis = {
    mount: mount,
    render: render,
    show: function () {
      mount();
    },
    _internals: { analyse: analyse, todayKey: todayKey, getAnchorDate: getAnchorDate, shiftKey: shiftKey, explain: explain, matchStock: matchStock }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
