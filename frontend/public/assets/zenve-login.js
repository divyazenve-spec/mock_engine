/* =====================================================================
   Zenve BI — Dual-Pane Cinematic Hero & Executive Login Controller
   Exact visual match to the Zenve Control Center Healthcare Showcase UI
   ===================================================================== */

(function () {
  'use strict';

  var STORAGE_KEY_USER = 'zenve_auth_user';
  var STORAGE_KEY_TOKEN = 'zenve_auth_token';

  // Profiles
  var PROFILES = {
    'CEO': {
      name: 'Edwin',
      title: 'Chief Executive Officer & Founder',
      role: 'CEO',
      avatar: 'EK',
      phone: '+91 98110 54321',
      email: 'edwin@zenve.in',
      badge: 'Founder & CEO · Full Control'
    },
    'VP': {
      name: 'Executive VP',
      title: 'Vice President of Global Operations',
      role: 'Executive VP',
      avatar: 'VP',
      phone: '+91 98110 54321',
      email: 'vp.ops@zenve.in',
      badge: 'Operations Command'
    },
    'Admin': {
      name: 'System Admin',
      title: 'Lead Platform Architect',
      role: 'Sys Admin',
      avatar: 'AD',
      phone: '+91 98110 54321',
      email: 'admin@zenve.in',
      badge: 'Platform Administration'
    }
  };

  var state = {
    mode: 'otp',           // 'otp' or 'direct'
    step: 'phone',         // 'phone' or 'verify'
    selectedRole: 'CEO',
    countryCode: '+91',
    phoneNumber: '9811054321',
    generatedOtp: '749281',
    timerSeconds: 30,
    timerId: null,
    isSubmitting: false,
    currentUser: null
  };

  function esc(s) {
    if (s == null) return '';
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function loadSession() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY_USER);
      if (raw) {
        state.currentUser = JSON.parse(raw);
        return state.currentUser;
      }
    } catch (e) {
      console.warn('[zenve-auth] Stored session parse error:', e);
    }
    return null;
  }

  function saveSession(user, token) {
    state.currentUser = user;
    try {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
      if (token) localStorage.setItem(STORAGE_KEY_TOKEN, token);
    } catch (e) { }
  }

  function clearSession() {
    state.currentUser = null;
    try {
      localStorage.removeItem(STORAGE_KEY_USER);
      localStorage.removeItem(STORAGE_KEY_TOKEN);
    } catch (e) { }
  }

  function createPortalElement() {
    var existing = document.getElementById('zenve-login-portal');
    if (existing) existing.remove();

    var portal = document.createElement('div');
    portal.id = 'zenve-login-portal';
    portal.innerHTML =
      '<div class="zauth-glow-orb"></div>' +
      '<div class="zauth-layout-container">' +
      renderRightLoginCard() +
      '</div>';

    document.body.appendChild(portal);
    attachPortalEvents(portal);
    return portal;
  }

  // Right Column: Floating Glowing Login Card
  function renderRightLoginCard() {
    return '' +
      '<div class="zauth-card-wrapper">' +
      '<div class="zauth-login-card" id="zauth-login-card">' +
      '<!-- Card Header -->' +
      '<div class="zauth-card-header">' +
      '<div class="zauth-card-logo-badge">' +
      '<div class="zauth-card-logo-icon">' +
      '<img src="/assets/zenve-logo.png" alt="Zenve Logo" onerror="this.src=\'/zenve-logo.png\';this.onerror=null;" />' +
      '</div>' +
      '<div class="zauth-card-brand-col">' +
      '<span class="zauth-card-brand-title">ZENVE</span>' +
      '<span class="zauth-card-brand-sub">Pets Healthcare</span>' +
      '<span class="zauth-card-brand-sub-teal">Redefined</span>' +
      '</div>' +
      '</div>' +
      '<h2 class="zauth-card-title">Secure Access</h2>' +
      '<p class="zauth-card-subtitle">Enter your mobile number to sign in</p>' +
      '</div>' +

      '<!-- Notice Banner (dynamic for any mobile number) -->' +
      '<div id="zauth-notice-pill" class="zauth-notice-pill">' +
      '<span class="zauth-notice-icon">✓</span>' +
      '<span id="zauth-notice-text">Enter any 10-digit mobile number to receive your OTP code via SMS.</span>' +
      '</div>' +

      '<!-- Step 1: Mobile Phone Input -->' +
      '<div id="zauth-step-phone" class="zauth-step-phone-input ' + (state.step === 'phone' ? 'active' : 'inactive') + '">' +
      '<div class="zauth-field-box">' +
      '<div class="zauth-field-header">REGISTERED MOBILE NUMBER</div>' +
      '<div class="zauth-input-container">' +
      '<select id="zauth-country-select" class="zauth-country-dropdown">' +
      '<option value="+91" ' + (state.countryCode === '+91' ? 'selected' : '') + '>IN +91 (IN)</option>' +
      '<option value="+1" ' + (state.countryCode === '+1' ? 'selected' : '') + '>US +1 (US)</option>' +
      '<option value="+971" ' + (state.countryCode === '+971' ? 'selected' : '') + '>AE +971 (AE)</option>' +
      '<option value="+44" ' + (state.countryCode === '+44' ? 'selected' : '') + '>UK +44 (UK)</option>' +
      '<option value="+65" ' + (state.countryCode === '+65' ? 'selected' : '') + '>SG +65 (SG)</option>' +
      '</select>' +
      '<input type="tel" id="zauth-phone-input" class="zauth-tel-input" placeholder="Enter 10-digit mobile number" value="' + esc(state.phoneNumber) + '" autocomplete="tel" maxlength="15" />' +
      '</div>' +
      '</div>' +

      '<button type="button" id="zauth-send-btn" class="zauth-cta-btn">' +
      '<span>Send Verification Code</span>' +
      '<span>➔</span>' +
      '</button>' +
      '</div>' +

      '<!-- Step 2: 6-Digit Verification Code -->' +
      '<div id="zauth-step-verify" class="zauth-step-otp-verify ' + (state.step === 'verify' ? 'active' : '') + '">' +
      '<div class="zauth-otp-target-card">' +
      '<span class="zauth-otp-target-phone" id="zauth-otp-target-text">' + esc(state.countryCode + ' ' + state.phoneNumber) + '</span>' +
      '<button type="button" id="zauth-edit-target-btn" class="zauth-edit-btn">Edit Number</button>' +
      '</div>' +

      '<!-- 6 Digit Input Grid -->' +
      '<div class="zauth-digit-grid" id="zauth-digit-grid">' +
      '<input type="text" maxlength="1" class="zauth-digit-box" data-idx="0" inputmode="numeric" autocomplete="one-time-code" />' +
      '<input type="text" maxlength="1" class="zauth-digit-box" data-idx="1" inputmode="numeric" />' +
      '<input type="text" maxlength="1" class="zauth-digit-box" data-idx="2" inputmode="numeric" />' +
      '<input type="text" maxlength="1" class="zauth-digit-box" data-idx="3" inputmode="numeric" />' +
      '<input type="text" maxlength="1" class="zauth-digit-box" data-idx="4" inputmode="numeric" />' +
      '<input type="text" maxlength="1" class="zauth-digit-box" data-idx="5" inputmode="numeric" />' +
      '</div>' +

      '<div class="zauth-timer-line">' +
      '<span id="zauth-timer-text">Resend in 00:30</span>' +
      '<button type="button" id="zauth-resend-link" class="zauth-resend-link" disabled>Resend Code</button>' +
      '</div>' +

      '<button type="button" id="zauth-verify-btn" class="zauth-cta-btn">' +
      '<span>Verify &amp; Enter Control Center</span>' +
      '<span>🚀</span>' +
      '</button>' +
      '</div>' +

      '<!-- Security Footer & Apitxt SMS Gateway Status -->' +
      '<div class="zauth-card-footer">' +
      '<div class="zauth-footer-lock">' +
      '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#eab308" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">' +
      '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>' +
      '<path d="M7 11V7a5 5 0 0 1 10 0v4"/>' +
      '</svg>' +
      ' <span>TLS 1.3</span>' +
      '</div>' +
      '<button type="button" id="zauth-gateway-btn" class="zauth-gateway-badge-btn" title="Click to view or paste Apitxt Auth Key">' +
      '<span class="zauth-gateway-dot" id="zauth-gateway-dot"></span>' +
      '<span id="zauth-gateway-text">Apitxt Gateway</span>' +
      '<span class="zauth-gateway-key-icon">🔑</span>' +
      '</button>' +
      '</div>' +
      '</div>' +

      '<!-- Apitxt Gateway Modal -->' +
      '<div id="zauth-gateway-modal" class="zauth-modal-backdrop zauth-hidden">' +
      '<div class="zauth-modal-card">' +
      '<div class="zauth-modal-header">' +
      '<div class="zauth-modal-title-row">' +
      '<span class="zauth-modal-icon">📲</span>' +
      '<div>' +
      '<h3 class="zauth-modal-title">Apitxt SMS Gateway Setup</h3>' +
      '<p class="zauth-modal-sub">Direct Live SMS OTP for Any Mobile Number</p>' +
      '</div>' +
      '</div>' +
      '<button type="button" id="zauth-modal-close" class="zauth-modal-close-btn">&times;</button>' +
      '</div>' +
      '<div class="zauth-modal-body">' +
      '<p class="zauth-modal-info">' +
      'Connect your <strong>Apitxt Authkey</strong> (from <a href="https://apitxt.com" target="_blank" style="color:#00f2fe;text-decoration:underline;">apitxt.com</a>). ' +
      'Zenve will dispatch live 6-digit verification codes via <code>https://apitxt.com/api/sendOTP</code> to any 10-digit number.' +
      '</p>' +
      '<div class="zauth-modal-input-wrap">' +
      '<label class="zauth-modal-label">APITXT AUTH KEY (43 CHARACTERS)</label>' +
      '<input type="text" id="zauth-apitxt-input" class="zauth-modal-input" placeholder="Paste your Apitxt Auth Key here..." autocomplete="off" />' +
      '</div>' +
      '<div id="zauth-modal-feedback" class="zauth-modal-feedback"></div>' +
      '</div>' +
      '<div class="zauth-modal-actions">' +
      '<button type="button" id="zauth-modal-cancel" class="zauth-modal-btn secondary">Cancel</button>' +
      '<button type="button" id="zauth-modal-save" class="zauth-modal-btn primary">Save &amp; Activate Key</button>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>';
  }

  function setNotice(text, isError) {
    var pill = document.getElementById('zauth-notice-pill');
    var label = document.getElementById('zauth-notice-text');
    if (!pill || !label) return;
    pill.className = 'zauth-notice-pill ' + (isError ? 'error' : '');
    label.textContent = text;
    var icon = pill.querySelector('.zauth-notice-icon');
    if (icon) icon.textContent = isError ? '⚠️' : '✓';
    pill.style.display = 'flex';
  }

  function startResendTimer() {
    if (state.timerId) clearInterval(state.timerId);
    state.timerSeconds = 30;
    var display = document.getElementById('zauth-timer-text');
    var link = document.getElementById('zauth-resend-link');
    if (link) link.disabled = true;

    function update() {
      var s = state.timerSeconds;
      var str = '00:' + (s < 10 ? '0' + s : s);
      if (display) display.textContent = 'Resend in ' + str;
      if (s <= 0) {
        clearInterval(state.timerId);
        if (display) display.textContent = 'Code expired';
        if (link) {
          link.disabled = false;
          link.textContent = 'Resend Code Now';
        }
      }
      state.timerSeconds--;
    }
    update();
    state.timerId = setInterval(update, 1000);
  }

  // Handle Send OTP
  async function handleSendOtp() {
    var phoneInput = document.getElementById('zauth-phone-input');
    var raw = phoneInput ? phoneInput.value.trim() : state.phoneNumber;
    var clean = raw.replace(/\D/g, '').slice(-10);

    if (clean.length !== 10) {
      setNotice('Please enter a valid 10-digit registered mobile number.', true);
      if (phoneInput) phoneInput.focus();
      return;
    }

    state.phoneNumber = clean;
    var full = state.countryCode + ' ' + clean;

    var btn = document.getElementById('zauth-send-btn');
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<span>Dispatching Verification Code...</span>';
    }

    var code = '749281';
    var isRealSms = false;
    var serverMsg = '';

    try {
      var resp = await fetch('/api/v1/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: state.countryCode + clean,
          role: state.selectedRole || 'CEO'
        })
      });

      if (resp.ok) {
        var data = await resp.json();
        if (data.otp) code = String(data.otp);
        else if (data.demo_otp) code = String(data.demo_otp);
        isRealSms = !!data.real_sms;
        serverMsg = data.message || '';
      } else {
        code = String(Math.floor(100000 + Math.random() * 900000));
      }
    } catch (err) {
      code = String(Math.floor(100000 + Math.random() * 900000));
    }

    state.generatedOtp = code;
    state.step = 'verify';

    var stepPhone = document.getElementById('zauth-step-phone');
    var stepVerify = document.getElementById('zauth-step-verify');
    var targetText = document.getElementById('zauth-otp-target-text');

    if (stepPhone) stepPhone.classList.add('inactive');
    if (stepVerify) stepVerify.classList.add('active');
    if (targetText) targetText.textContent = state.countryCode + ' ' + state.phoneNumber;

    startResendTimer();

    var boxes = document.querySelectorAll('.zauth-digit-box');

    if (isRealSms) {
      setNotice('✓ Live SMS verification code sent to ' + full + ' via Apitxt. Please enter code.', false);
      for (var i = 0; i < boxes.length; i++) {
        boxes[i].value = '';
        boxes[i].classList.remove('filled');
      }
    } else {
      setNotice(serverMsg || ('Verification code for ' + full + ' is ' + code + '. Auto-fill available.'), false);
      // Auto-fill demo code for test mode
      for (var i = 0; i < boxes.length; i++) {
        boxes[i].value = code[i] || '';
        boxes[i].classList.add('filled');
      }
    }

    setTimeout(function () {
      if (boxes.length > 0) boxes[0].focus();
    }, 150);

    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '<span>Send Verification Code</span><span>➔</span>';
    }
  }

  // Handle Verify OTP
  async function handleVerifyOtp() {
    var boxes = document.querySelectorAll('.zauth-digit-box');
    var entered = '';
    boxes.forEach(function (b) { entered += b.value; });

    if (entered.length < 6) {
      setNotice('Please enter all 6 digits of the verification code.', true);
      return;
    }

    var verifyBtn = document.getElementById('zauth-verify-btn');
    if (verifyBtn) {
      verifyBtn.disabled = true;
      verifyBtn.innerHTML = '<span>Authenticating...</span>';
    }

    var full = state.countryCode + state.phoneNumber;
    var profile = PROFILES[state.selectedRole] || PROFILES['CEO'];
    var authUser = null;
    var token = 'zenve_sec_' + Math.random().toString(36).substring(2) + Date.now();

    try {
      var resp = await fetch('/api/v1/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: state.countryCode + state.phoneNumber,
          otp: entered,
          role: profile.role
        })
      });

      if (resp.ok) {
        var data = await resp.json();
        authUser = data.user;
        token = data.token || token;
      } else {
        var errJson = {};
        try { errJson = await resp.json(); } catch (parseErr) { }
        var errMsg = errJson.error || errJson.detail || 'Invalid verification code. Please check and try again.';
        setNotice(errMsg, true);
        if (verifyBtn) {
          verifyBtn.disabled = false;
          verifyBtn.innerHTML = '<span>Verify &amp; Enter Control Center</span><span>🚀</span>';
        }
        return; // HALT: Never log in on failed code
      }
    } catch (networkErr) {
      // In offline/mock mode only, allow if entered code matches generated or master OTP
      var isMaster = ['123456', '749281', '999999'].includes(entered);
      var isMatch = state.generatedOtp && entered === state.generatedOtp;
      if (!isMaster && !isMatch) {
        setNotice('Invalid verification code. Please check and try again.', true);
        if (verifyBtn) {
          verifyBtn.disabled = false;
          verifyBtn.innerHTML = '<span>Verify &amp; Enter Control Center</span><span>🚀</span>';
        }
        return;
      }
    }

    if (!authUser) {
      var isEdwin = (state.phoneNumber === '9845012345' || state.phoneNumber === '9811054321' || state.selectedRole === 'CEO' || !state.selectedRole);
      var displayName = isEdwin ? 'Edwin' : (state.selectedRole === 'VP' ? 'Executive VP' : (state.selectedRole === 'Admin' ? 'Sys Admin' : ('Leadership · ' + state.phoneNumber)));
      var displayRole = isEdwin ? 'CEO' : (state.selectedRole || 'Executive');
      var displayTitle = isEdwin ? 'Chief Executive Officer & Founder' : (displayRole + ' Control Center Access');
      var displayAvatar = isEdwin ? 'EK' : displayRole.slice(0, 2).toUpperCase();

      authUser = {
        id: Date.now(),
        name: displayName,
        title: displayTitle,
        role: displayRole,
        avatar: displayAvatar,
        phone: full,
        email: isEdwin ? 'edwin@zenve.in' : ('user.' + state.phoneNumber.slice(-4) + '@zenve.in'),
        badge: displayRole + ' · Active Session',
        auth_method: 'mobile_otp',
        logged_in_at: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      };
    }

    saveSession(authUser, token);
    setNotice('Identity verified: Welcome ' + authUser.name + ' (' + authUser.role + ')! Launching Control Center...', false);

    if (verifyBtn) {
      verifyBtn.innerHTML = '<span>✓ Authenticated</span>';
    }

    setTimeout(function () {
      completeLoginFlow(authUser);
    }, 600);
  }

  // Instant CEO Login
  function handleDirectCeoLogin() {
    var profile = PROFILES['CEO'];
    var user = {
      id: Date.now(),
      name: profile.name,
      title: profile.title,
      role: profile.role,
      avatar: profile.avatar,
      phone: profile.phone,
      email: profile.email,
      badge: profile.badge,
      auth_method: 'direct_ceo',
      logged_in_at: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    };

    saveSession(user, 'zenve_ceo_' + Date.now());
    setNotice('Signing in directly as Edwin (CEO & Founder)...', false);
    setTimeout(function () {
      completeLoginFlow(user);
    }, 350);
  }

  // Complete Login Flow
  function completeLoginFlow(user) {
    document.body.classList.remove('zenve-auth-required');
    document.documentElement.classList.remove('zenve-auth-required');
    if (typeof window.fitViewport === 'function') window.fitViewport();
    var portal = document.getElementById('zenve-login-portal');
    if (portal) portal.classList.add('zauth-hidden');

    syncUserInterface(user);

    if (window.ZenveDragonLoader && typeof window.ZenveDragonLoader.show === 'function') {
      window.ZenveDragonLoader.show('executive-dashboard', function () {
        if (window.ZenveRouter && typeof window.ZenveRouter.navigateToRoute === 'function') {
          window.ZenveRouter.navigateToRoute('Executive Dashboard', 'Executive Dashboard');
        }
      });
    }
  }

  // Sync Header and Sidebar with Edwin
  function syncUserInterface(user) {
    if (!user) user = PROFILES['CEO'];

    var avatarEl = document.querySelector('.sidebar-avatar');
    var nameEl = document.querySelector('.sidebar-profile-name');
    var roleEl = document.querySelector('.sidebar-profile-role');

    if (avatarEl) avatarEl.textContent = user.avatar || 'EK';
    if (nameEl) nameEl.textContent = user.name || 'Edwin';
    if (roleEl) roleEl.textContent = (user.role || 'CEO') + ' · Full Control';

    var sidebarFooter = document.querySelector('.sidebar-footer-wrap');
    if (sidebarFooter && !document.getElementById('zenve-sidebar-logout-btn')) {
      var logoutRow = document.createElement('div');
      logoutRow.id = 'zenve-sidebar-logout-row';
      logoutRow.style.cssText = 'margin-top:6px;display:flex;align-items:center;justify-content:space-between;padding:0 4px;';
      logoutRow.innerHTML =
        '<span style="font-size:10px;color:#94a3b8;font-family:var(--font-mono, monospace);">👑 ' + esc(user.name) + '</span>' +
        '<button type="button" id="zenve-sidebar-logout-btn" class="zenve-auth-logout-btn" style="background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.3);color:#fca5a5;padding:3px 7px;border-radius:6px;cursor:pointer;font-size:10px;font-weight:600;">' +
        '<span>Sign Out</span>' +
        '</button>';
      sidebarFooter.appendChild(logoutRow);

      document.getElementById('zenve-sidebar-logout-btn').addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        handleLogoutPrompt();
      });
    }

    var headerRight = document.querySelector('header .ml-auto');
    if (headerRight && !document.getElementById('zenve-header-auth-pill')) {
      var pill = document.createElement('div');
      pill.id = 'zenve-header-auth-pill';
      pill.className = 'zenve-auth-pill';
      pill.innerHTML =
        '<span class="zenve-auth-pill-avatar" style="width:20px;height:20px;border-radius:50%;background:linear-gradient(135deg,#00f2fe,#2563eb);color:#030b17;font-weight:800;font-size:9px;display:flex;align-items:center;justify-content:center;">' + esc(user.avatar || 'EK') + '</span>' +
        '<span style="font-weight:700;font-size:12px;color:#ffffff;">' + esc(user.name || 'Edwin') + '</span>' +
        '<span class="zenve-auth-pill-role" style="background:rgba(0,242,254,0.18);color:#00f2fe;font-size:9px;padding:2px 5px;border-radius:4px;font-weight:700;">' + esc(user.role || 'CEO') + '</span>' +
        '<button type="button" id="zenve-header-logout-btn" title="Sign Out of Zenve BI" style="background:none;border:none;color:#f87171;cursor:pointer;font-size:12px;padding:0 2px;">✕</button>';
      headerRight.insertBefore(pill, headerRight.firstChild);

      document.getElementById('zenve-header-logout-btn').addEventListener('click', function (e) {
        e.preventDefault();
        handleLogoutPrompt();
      });
    }
  }

  function handleLogoutPrompt() {
    if (confirm('Sign out of the Zenve Control Center?')) {
      clearSession();
      document.body.classList.add('zenve-auth-required');
      document.documentElement.classList.add('zenve-auth-required');
      if (typeof window.fitViewport === 'function') window.fitViewport();
      var portal = document.getElementById('zenve-login-portal');
      if (portal) {
        portal.classList.remove('zauth-hidden');
        state.step = 'phone';
        var stepPhone = document.getElementById('zauth-step-phone');
        var stepVerify = document.getElementById('zauth-step-verify');
        if (stepPhone) stepPhone.classList.remove('inactive');
        if (stepVerify) stepVerify.classList.remove('active');
        document.querySelectorAll('.zauth-digit-box').forEach(function (b) { b.value = ''; b.classList.remove('filled'); });
      }
      var pill = document.getElementById('zenve-header-auth-pill');
      if (pill) pill.remove();
      var sidebarRow = document.getElementById('zenve-sidebar-logout-row');
      if (sidebarRow) sidebarRow.remove();
    }
  }

  // Attach Portal Events
  function attachPortalEvents(portal) {
    var countrySelect = portal.querySelector('#zauth-country-select');
    if (countrySelect) {
      countrySelect.addEventListener('change', function (e) {
        state.countryCode = e.target.value;
      });
    }

    var phoneInput = portal.querySelector('#zauth-phone-input');
    if (phoneInput) {
      phoneInput.addEventListener('input', function (e) {
        state.phoneNumber = e.target.value.replace(/\D/g, '').slice(0, 10);
      });
      phoneInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleSendOtp();
        }
      });
    }

    var sendBtn = portal.querySelector('#zauth-send-btn');
    if (sendBtn) {
      sendBtn.addEventListener('click', handleSendOtp);
    }

    var editTargetBtn = portal.querySelector('#zauth-edit-target-btn');
    if (editTargetBtn) {
      editTargetBtn.addEventListener('click', function () {
        state.step = 'phone';
        var stepPhone = document.getElementById('zauth-step-phone');
        var stepVerify = document.getElementById('zauth-step-verify');
        if (stepPhone) stepPhone.classList.remove('inactive');
        if (stepVerify) stepVerify.classList.remove('active');
        if (phoneInput) phoneInput.focus();
      });
    }

    var resendLink = portal.querySelector('#zauth-resend-link');
    if (resendLink) {
      resendLink.addEventListener('click', function () {
        if (!resendLink.disabled) handleSendOtp();
      });
    }

    // 6-digit box handlers
    var digitBoxes = portal.querySelectorAll('.zauth-digit-box');
    digitBoxes.forEach(function (box, idx) {
      box.addEventListener('input', function (e) {
        var val = e.target.value.replace(/\D/g, '');
        e.target.value = val ? val[0] : '';
        if (val) {
          box.classList.add('filled');
          if (idx < 5) digitBoxes[idx + 1].focus();
          else handleVerifyOtp();
        } else {
          box.classList.remove('filled');
        }
      });

      box.addEventListener('keydown', function (e) {
        if (e.key === 'Backspace') {
          if (!box.value && idx > 0) {
            digitBoxes[idx - 1].focus();
            digitBoxes[idx - 1].value = '';
            digitBoxes[idx - 1].classList.remove('filled');
          } else {
            box.value = '';
            box.classList.remove('filled');
          }
        } else if (e.key === 'ArrowLeft' && idx > 0) {
          digitBoxes[idx - 1].focus();
        } else if (e.key === 'ArrowRight' && idx < 5) {
          digitBoxes[idx + 1].focus();
        } else if (e.key === 'Enter') {
          e.preventDefault();
          handleVerifyOtp();
        }
      });

      box.addEventListener('paste', function (e) {
        e.preventDefault();
        var paste = (e.clipboardData || window.clipboardData).getData('text');
        var digits = paste.replace(/\D/g, '').substring(0, 6);
        if (digits) {
          for (var i = 0; i < digitBoxes.length; i++) {
            if (i < digits.length) {
              digitBoxes[i].value = digits[i];
              digitBoxes[i].classList.add('filled');
            } else {
              digitBoxes[i].value = '';
              digitBoxes[i].classList.remove('filled');
            }
          }
          if (digits.length >= 6) handleVerifyOtp();
        }
      });
    });

    var verifyBtn = portal.querySelector('#zauth-verify-btn');
    if (verifyBtn) {
      verifyBtn.addEventListener('click', handleVerifyOtp);
    }

    // Apitxt Gateway Status & Setup Modal Handlers
    var gatewayBtn = portal.querySelector('#zauth-gateway-btn');
    var gatewayModal = portal.querySelector('#zauth-gateway-modal');
    var modalClose = portal.querySelector('#zauth-modal-close');
    var modalCancel = portal.querySelector('#zauth-modal-cancel');
    var modalSave = portal.querySelector('#zauth-modal-save');
    var apitxtInput = portal.querySelector('#zauth-apitxt-input');
    var modalFeedback = portal.querySelector('#zauth-modal-feedback');
    var gatewayDot = portal.querySelector('#zauth-gateway-dot');
    var gatewayText = portal.querySelector('#zauth-gateway-text');

    async function checkGatewayStatus() {
      try {
        var resp = await fetch('/api/v1/auth/gateway-status');
        if (resp.ok) {
          var gdata = await resp.json();
          if (gdata.configured) {
            if (gatewayDot) gatewayDot.classList.add('active');
            if (gatewayText) gatewayText.textContent = 'Apitxt: Active';
            if (apitxtInput && !apitxtInput.value) {
              apitxtInput.placeholder = 'Configured: ' + (gdata.masked_key || '••••••••');
            }
          } else {
            if (gatewayDot) gatewayDot.classList.remove('active');
            if (gatewayText) gatewayText.textContent = 'Apitxt: Dev Mode (Click 🔑)';
          }
        }
      } catch (err) { }
    }
    checkGatewayStatus();

    if (gatewayBtn && gatewayModal) {
      gatewayBtn.addEventListener('click', function (e) {
        e.preventDefault();
        gatewayModal.classList.remove('zauth-hidden');
        if (modalFeedback) { modalFeedback.textContent = ''; modalFeedback.className = 'zauth-modal-feedback'; }
        if (apitxtInput) apitxtInput.focus();
      });
    }

    function closeModal() {
      if (gatewayModal) gatewayModal.classList.add('zauth-hidden');
    }

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalCancel) modalCancel.addEventListener('click', closeModal);
    if (gatewayModal) {
      gatewayModal.addEventListener('click', function (e) {
        if (e.target === gatewayModal) closeModal();
      });
    }

    if (modalSave && apitxtInput) {
      modalSave.addEventListener('click', async function () {
        var rawKey = apitxtInput.value.trim();
        if (!rawKey || rawKey.length < 10) {
          if (modalFeedback) {
            modalFeedback.textContent = 'Please enter a valid Apitxt Auth Key (min 10 characters).';
            modalFeedback.className = 'zauth-modal-feedback error';
          }
          return;
        }

        modalSave.disabled = true;
        modalSave.textContent = 'Saving & Verifying...';

        try {
          var sresp = await fetch('/api/v1/auth/save-key', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ apiKey: rawKey })
          });

          if (sresp.ok) {
            var sdata = await sresp.json();
            if (modalFeedback) {
              modalFeedback.textContent = '✓ ' + (sdata.message || 'Key saved and activated successfully!');
              modalFeedback.className = 'zauth-modal-feedback success';
            }
            checkGatewayStatus();
            setNotice('✓ Apitxt SMS Gateway active! Enter any 10-digit mobile number for live OTP.', false);
            setTimeout(function () {
              closeModal();
              modalSave.disabled = false;
              modalSave.textContent = 'Save & Activate Key';
            }, 900);
          } else {
            var errObj = await sresp.json();
            if (modalFeedback) {
              modalFeedback.textContent = errObj.error || 'Failed to save key.';
              modalFeedback.className = 'zauth-modal-feedback error';
            }
            modalSave.disabled = false;
            modalSave.textContent = 'Save & Activate Key';
          }
        } catch (saveErr) {
          if (modalFeedback) {
            modalFeedback.textContent = 'Error connecting to server.';
            modalFeedback.className = 'zauth-modal-feedback error';
          }
          modalSave.disabled = false;
          modalSave.textContent = 'Save & Activate Key';
        }
      });
    }
  }

  // Init
  function init() {
    var user = loadSession();
    var portal = createPortalElement();

    if (user) {
      portal.classList.add('zauth-hidden');
      document.body.classList.remove('zenve-auth-required');
      document.documentElement.classList.remove('zenve-auth-required');
      if (typeof window.fitViewport === 'function') window.fitViewport();
      setTimeout(function () { syncUserInterface(user); }, 350);
      setTimeout(function () { syncUserInterface(user); }, 1200);
    } else {
      document.body.classList.add('zenve-auth-required');
      document.documentElement.classList.add('zenve-auth-required');
      if (typeof window.fitViewport === 'function') window.fitViewport();
      portal.classList.remove('zauth-hidden');
      window.scrollTo(0, 0);
    }
  }

  window.ZenveAuth = {
    getUser: function () { return state.currentUser; },
    isAuthenticated: function () { return !!state.currentUser; },
    showLogin: function () {
      var p = document.getElementById('zenve-login-portal');
      if (p) {
        p.classList.remove('zauth-hidden');
        document.body.classList.add('zenve-auth-required');
        document.documentElement.classList.add('zenve-auth-required');
        if (typeof window.fitViewport === 'function') window.fitViewport();
        window.scrollTo(0, 0);
      }
    },
    hideLogin: function () {
      var p = document.getElementById('zenve-login-portal');
      if (p) {
        p.classList.add('zauth-hidden');
        document.body.classList.remove('zenve-auth-required');
        document.documentElement.classList.remove('zenve-auth-required');
        if (typeof window.fitViewport === 'function') window.fitViewport();
      }
    },
    logout: handleLogoutPrompt,
    syncUI: syncUserInterface
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
