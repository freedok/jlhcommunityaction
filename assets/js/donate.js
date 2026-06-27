(function () {
  'use strict';

  /* ── 1. Inject popup HTML ─────────────────────────────────────────── */
  var popupHTML = [
    '<div id="donate-popup" class="donate-popup" role="dialog" aria-modal="true" aria-labelledby="donate-heading">',
    '  <button class="close-donate" type="button" aria-label="Close donation form">',
    '    <i class="fas fa-times" aria-hidden="true"></i>',
    '  </button>',
    '  <div class="donate-popup-inner">',
    '    <div class="donate-content">',

    /* header */
    '      <div class="donate-header">',
    '        <div class="donate-header-icon" aria-hidden="true"><i class="fas fa-heart" aria-hidden="true"></i></div>',
    '        <h2 id="donate-heading">Support JLHCA</h2>',
    '        <p>Your generosity helps us serve Johnston, Lee &amp; Harnett County communities — providing housing, energy assistance, early education, and crisis support.</p>',
    '      </div>',

    /* frequency toggle */
    '      <div class="donate-frequency" role="group" aria-label="Donation frequency">',
    '        <button type="button" class="freq-btn active" data-freq="once">Give Once</button>',
    '        <button type="button" class="freq-btn" data-freq="monthly">Give Monthly</button>',
    '      </div>',

    /* amount grid */
    '      <div class="donate-amounts" role="group" aria-label="Select donation amount">',
    '        <button type="button" class="amt-btn" data-amount="10">$10</button>',
    '        <button type="button" class="amt-btn active" data-amount="25">$25</button>',
    '        <button type="button" class="amt-btn" data-amount="50">$50</button>',
    '        <button type="button" class="amt-btn" data-amount="100">$100</button>',
    '        <button type="button" class="amt-btn" data-amount="250">$250</button>',
    '        <button type="button" class="amt-btn amt-btn--custom" data-amount="custom">Other</button>',
    '      </div>',

    /* custom amount */
    '      <div class="donate-custom-wrap" id="donateCustomWrap" aria-hidden="true">',
    '        <div class="donate-custom-field">',
    '          <span class="donate-currency">$</span>',
    '          <input type="number" id="donateCustomInput" min="1" step="1" placeholder="Enter amount" aria-label="Custom donation amount">',
    '        </div>',
    '      </div>',

    /* impact bar */
    '      <ul class="donate-impact" aria-label="Donation impact">',
    '        <li><strong>$10</strong> emergency food for a family</li>',
    '        <li><strong>$50</strong> utility bill assistance</li>',
    '        <li><strong>$100</strong> housing support services</li>',
    '      </ul>',

    /* PayPal form */
    '      <form action="https://www.paypal.com/donate" method="post" target="_blank" id="donatePaypalForm" novalidate>',
    '        <input type="hidden" name="business" value="Info@jlhcommunityaction.org">',
    '        <input type="hidden" name="item_name" id="donateItemName" value="JLHCA One-Time Donation">',
    '        <input type="hidden" name="currency_code" value="USD">',
    '        <input type="hidden" name="amount" id="donatePaypalAmount" value="25">',
    '        <input type="hidden" name="no_recurring" id="donateRecurring" value="1">',
    '        <input type="hidden" name="return" value="https://jlhcommunityaction.org/thank-you.html">',
    '        <input type="hidden" name="cancel_return" value="https://jlhcommunityaction.org/">',
    '        <button type="submit" class="donate-submit-btn" id="donateSubmitBtn">',
    '          <i class="fas fa-heart" aria-hidden="true"></i> Donate $<span id="donateBtnAmt">25</span> via PayPal',
    '        </button>',
    '      </form>',

    '      <p class="donate-secure"><i class="fas fa-lock" aria-hidden="true"></i> 100 % secure — powered by PayPal</p>',
    '      <p class="donate-tax">JLHCA is a 501(c)(3) nonprofit. Your donation may be tax-deductible.</p>',

    '    </div>',
    '  </div>',
    '</div>'
  ].join('\n');

  document.body.insertAdjacentHTML('beforeend', popupHTML);

  /* ── 2. State ─────────────────────────────────────────────────────── */
  var selectedAmount = 25;
  var isMonthly = false;

  /* ── 3. DOM refs ──────────────────────────────────────────────────── */
  var popup          = document.getElementById('donate-popup');
  var closeBtn       = popup.querySelector('.close-donate');
  var freqBtns       = popup.querySelectorAll('.freq-btn');
  var amtBtns        = popup.querySelectorAll('.amt-btn');
  var customWrap     = document.getElementById('donateCustomWrap');
  var customInput    = document.getElementById('donateCustomInput');
  var paypalAmount   = document.getElementById('donatePaypalAmount');
  var paypalItemName = document.getElementById('donateItemName');
  var recurringField = document.getElementById('donateRecurring');
  var submitBtn      = document.getElementById('donateSubmitBtn');
  var btnAmtLabel    = document.getElementById('donateBtnAmt');

  /* ── 4. Helpers ───────────────────────────────────────────────────── */
  function updatePaypal() {
    paypalAmount.value   = selectedAmount;
    btnAmtLabel.textContent = selectedAmount;
    paypalItemName.value = isMonthly ? 'JLHCA Monthly Donation' : 'JLHCA One-Time Donation';
    recurringField.value = isMonthly ? '0' : '1';
    submitBtn.querySelector('span') && (submitBtn.querySelector('span') ? null : null);
  }

  function openPopup() {
    popup.classList.add('popup-visible');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closePopup() {
    popup.classList.remove('popup-visible');
    document.body.style.overflow = '';
  }

  /* ── 5. Inject heart icon into nav donate buttons ────────────────── */
  document.querySelectorAll('a.nav-donate-btn').forEach(function (btn) {
    var icon = document.createElement('i');
    icon.className = 'fas fa-heart';
    icon.setAttribute('aria-hidden', 'true');
    btn.insertBefore(icon, btn.firstChild);
  });

  /* ── 6. Triggers: all .donate-box-btn clicks ──────────────────────── */
  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('.donate-box-btn');
    if (trigger) {
      e.preventDefault();
      openPopup();
    }
  });

  /* ── 6. Close ─────────────────────────────────────────────────────── */
  closeBtn.addEventListener('click', closePopup);

  popup.addEventListener('click', function (e) {
    if (!e.target.closest('.donate-content')) closePopup();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && popup.classList.contains('popup-visible')) closePopup();
  });

  /* ── 7. Frequency toggle ──────────────────────────────────────────── */
  freqBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      freqBtns.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      isMonthly = (this.getAttribute('data-freq') === 'monthly');
      updatePaypal();
    });
  });

  /* ── 8. Amount selection ──────────────────────────────────────────── */
  amtBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      amtBtns.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');

      if (this.getAttribute('data-amount') === 'custom') {
        customWrap.removeAttribute('aria-hidden');
        customInput.focus();
        selectedAmount = parseInt(customInput.value, 10) || '';
      } else {
        customWrap.setAttribute('aria-hidden', 'true');
        customInput.value = '';
        selectedAmount = parseInt(this.getAttribute('data-amount'), 10);
      }
      updatePaypal();
    });
  });

  customInput.addEventListener('input', function () {
    selectedAmount = parseInt(this.value, 10) || '';
    paypalAmount.value = selectedAmount;
    btnAmtLabel.textContent = selectedAmount || '?';
  });

  /* ── 9. Form validation before PayPal redirect ────────────────────── */
  document.getElementById('donatePaypalForm').addEventListener('submit', function (e) {
    if (!selectedAmount || selectedAmount < 1) {
      e.preventDefault();
      customInput.focus();
      customInput.style.borderColor = '#dc3545';
      setTimeout(function () { customInput.style.borderColor = ''; }, 2000);
    }
  });

  /* ── 10. Initial state ────────────────────────────────────────────── */
  updatePaypal();

})();
