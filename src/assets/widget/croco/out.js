/**
 * CARCROCWidget - Vehicle History Report Widget Library
 * Usage: <script src="carcroc-widget.js"></script>
 *        <div id="croco-widget-mount" croc="YOUR_KEY"></div>
 */

(function (global) {
  'use strict';

  // ─── CSS ────────────────────────────────────────────────────────────────────
  const CSS = `
    .widgetReport {
      font-family: 'DM Sans', sans-serif;
      max-width: 420px;
      min-width: 260px;
      resize: horizontal;
      overflow: hidden;
      background: #ffffff;
      border-radius: 16px;
      padding: 22px 22px 22px;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.06), 0 12px 40px -4px rgba(0,0,0,0.1);
      margin: auto;
    }
    .rH1 {
      font-size: 1.25rem;
      font-weight: 700;
      color: #111827;
      line-height: 1.3;
      margin-bottom: 18px;
      letter-spacing: -0.02em;
      text-align: center;
    }
    .input-fieldReport {
      display: flex;
      align-items: center;
      gap: 12px;
      border: 1.5px solid #d1d9e0;
      border-radius: 12px;
      padding: 14px 18px;
      background: #fafbfc;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .input-fieldReport:focus-within {
      border-color: #6bb89e;
      box-shadow: 0 0 0 3px rgba(107,184,158,0.15);
      background: #fff;
    }
    .input-fieldReport .icon {
      color: #6b7280;
      flex-shrink: 0;
      font-size: 1.0rem;
      display: flex;
      align-items: center;
    }
    .input-fieldReport input {
      flex: 1;
      border: none;
      background: transparent;
      outline: none;
      font-family: 'DM Sans', sans-serif;
      font-size: 0.85rem;
      color: #1f2937;
    }
    .input-fieldReport input::placeholder { color: #9ca3af; }
    .key-sectionReport { margin-top: 6px; }
    .key-toggleReport {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      cursor: pointer;
      padding: 4px 0;
      user-select: none;
    }
    .key-toggleReport span {
      font-size: 0.8rem;
      font-weight: 600;
      color: #374151;
      letter-spacing: 0.03em;
    }
    .chevronReport {
      width: 20px;
      height: 20px;
      color: #6b7280;
      transition: transform 0.25s ease;
      flex-shrink: 0;
    }
    .chevronReport.open { transform: rotate(180deg); }
    .key-bodyReport {
      overflow: hidden;
      max-height: 0;
      transition: max-height 0.3s ease, margin-top 0.3s ease;
    }
    .key-bodyReport.open { max-height: 100px; margin-top: 7px; }
    .actionsReport {
      display: flex;
      gap: 15px;
      margin-top: 18px;
    }
    .btnReport {
      flex: 1;
      padding: 13px 20px;
      border-radius: 10px;
      border: none;
      font-family: 'DM Sans', sans-serif;
      font-size: 1.05rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.18s, transform 0.1s, box-shadow 0.18s;
      margin-right: 0px !important;
      margin-left: 0px !important;
    }
    .btnReport:active { transform: scale(0.97); }
    .btnReport-confirm { background: #6bb89e; color: #fff; }
    .btnReport-confirm:not(:disabled):hover {
      background: #5aa88e;
      box-shadow: 0 4px 12px rgba(107,184,158,0.4);
    }
    .btnReport-confirm:disabled {
      background: #d1d9e0;
      color: #9ca3af;
      cursor: not-allowed;
    }
    .btnReport-cancel { background: #f3f4f6; color: #374151; }
    .btnReport-cancel:hover { background: #e5e7eb; }
    .backdropcroco {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.5);
      z-index: 100;
      align-items: center;
      justify-content: center;
      animation: fadeIn 0.2s ease;
    }
    .opencroco { display: flex !important; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    .dialogcroco {
      background: #fff;
      border: 2px solid #374151;
      border-radius: 4px;
      width: 90vw;
      max-width: 560px;
      padding: 36px 40px 32px;
      animation: slideUp 0.22s ease;
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .croco-logocroco {
      display: flex;
      justify-content: center;
      margin-bottom: 16px;
    }
    .croco-logocroco .logo-boxcroco {
      border: 2px solid #111;
      padding: 3px 8px;
      font-size: 1rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: #111;
      margin-left: 2px;
    }
    .croco-logocroco .logo-boxcroco span { color: #6bb89e; }
    .vincroco {
      text-align: center;
      font-size: 1rem;
      font-weight: 700;
      color: #111;
      margin-bottom: 4px;
      letter-spacing: 0.04em;
    }
    .pricecroco {
      text-align: center;
      font-size: 0.9rem;
      font-weight: 600;
      color: #111;
      margin-bottom: 28px;
      text-decoration: underline;
    }
    .input-fieldcroco {
      display: none;
      align-items: center;
      gap: 12px;
      border: 1.5px solid #9ca3af;
      border-radius: 6px;
      padding: 13px 16px;
      margin-bottom: 16px;
      background: #fff;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .input-fieldcroco:focus-within {
      border-color: #374151;
      box-shadow: 0 0 0 3px rgba(55,65,81,0.1);
    }
    .input-fieldcroco.errorcroco { border-color: #f87171; }
    .input-fieldcroco svg { color: #9ca3af; flex-shrink: 0; }
    .input-fieldcroco input {
      flex: 1;
      border: none;
      outline: none;
      font-family: 'DM Sans', sans-serif;
      font-size: 0.95rem;
      color: #111;
    }
    .input-fieldcroco input::placeholder { color: #9ca3af; }
    .actionscroco {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 24px;
    }
    .btncroco {
      padding: 11px 28px;
      border-radius: 6px;
      border: none;
      font-family: 'DM Sans', sans-serif;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.18s, transform 0.1s;
    }
    .btncroco:active { transform: scale(0.97); }
    .btn-confirmcroco { display: none; background: #6bb89e; color: #fff; }
    .btn-confirmcroco:not(:disabled):hover { background: #5aa88e; }
    .btn-confirmcroco:disabled {
      background: #d1d5db;
      color: #9ca3af;
      cursor: not-allowed;
    }
    .btn-cancelcroco { background: #e5e7eb; color: #374151; }
    .btn-cancelcroco:hover { background: #d1d5db; }
    .report-result {
      display: none;
      justify-content: center;
      width: 100%;
      margin-top: 10px;
      padding: 14px 16px;
      border-radius: 12px;
      background: #edfaf4;
    }
    .report-result span { font-size: 15px; font-weight: 700; }
    .report-result .i {
      color: #2a7a5a;
      font-size: 18px;
      font-weight: 900;
      margin-right: 8px;
    }
    .report-result-success { color: #2a7a5a; }
    .report-result-fail { color: #052d1d; }
  `;

  // ─── HTML TEMPLATE ──────────────────────────────────────────────────────────
  function buildWidgetHTML(crocKey, uid) {
    // uid makes all IDs unique so multiple widgets can coexist on one page
    const id = (name) => `${name}_${uid}`;

    return `
      <div class="widgetReport">
        <h1 class="rH1">Get vehicle history report by VIN</h1>

        <div class="input-fieldReport">
          <span class="icon">
            <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.5 5H16.5L14.5 1C14.2 0.4 13.6 0 13 0H7C6.4 0 5.8 0.4 5.5 1L3.5 5H2.5C1.7 5 1 5.7 1 6.5V11.5C1 11.8 1.2 12 1.5 12H2V13.5C2 14.3 2.7 15 3.5 15H4.5C5.3 15 6 14.3 6 13.5V12H14V13.5C14 14.3 14.7 15 15.5 15H16.5C17.3 15 18 14.3 18 13.5V12H18.5C18.8 12 19 11.8 19 11.5V6.5C19 5.7 18.3 5 17.5 5ZM5 9C4.4 9 4 8.6 4 8C4 7.4 4.4 7 5 7C5.6 7 6 7.4 6 8C6 8.6 5.6 9 5 9ZM15 9C14.4 9 14 8.6 14 8C14 7.4 14.4 7 15 7C15.6 7 16 7.4 16 8C16 8.6 15.6 9 15 9ZM3.5 5L5.1 1.5C5.2 1.2 5.6 1 6 1H14C14.4 1 14.8 1.2 14.9 1.5L16.5 5H3.5Z" fill="currentColor"/>
            </svg>
          </span>
          <input type="text" id="${id('vinRInput')}" placeholder="VIN"
            autocomplete="off" spellcheck="false" maxlength="17">
        </div>

        <div class="key-sectionReport">
          <div class="key-toggleReport" data-toggle="${id('keyRBody')}" data-chevron="${id('chevronReport')}">
            <span>enter KEY</span>
            <svg class="chevronReport" id="${id('chevronReport')}" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          </div>
          <div class="key-bodyReport" id="${id('keyRBody')}">
            <div class="input-fieldReport">
              <span class="icon">
                <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 0C2.2 0 0 2.2 0 5C0 7.8 2.2 10 5 10C6.9 10 8.6 8.9 9.4 7.3L10 8L11 7L12 8L13 7L14 8L16 6L14.8 4.8L9.4 2.7C8.6 1.1 6.9 0 5 0ZM5 8C3.3 8 2 6.7 2 5C2 3.3 3.3 2 5 2C6.7 2 8 3.3 8 5C8 6.7 6.7 8 5 8ZM5 3C3.9 3 3 3.9 3 5C3 6.1 3.9 7 5 7C6.1 7 7 6.1 7 5C7 3.9 6.1 3 5 3Z" fill="currentColor"/>
                </svg>
              </span>
              <input type="text" id="${id('keyRInput')}" placeholder="Key" autocomplete="off">
            </div>
          </div>
        </div>

        <div class="actionsReport">
          <span id="${id('idPh')}" style="display:none;"></span>
          <button class="btnReport btnReport-confirm" id="${id('confirmRBtn')}" disabled
            data-uid="${uid}" data-crockey="${crocKey}">Confirm</button>
          <button class="btnReport btnReport-cancel" data-uid="${uid}" data-action="cancel">Cancel</button>
        </div>

        <button id="${id('succsess-croco')}" class="report-result btnReport btnReport-confirm"
          data-uid="${uid}" data-action="open-dialog">
          <div class="report-result-success">
            <span class="i">&#10004;</span>
            <span>Success!</span>
            <h5 id="${id('val-p-success')}"></h5>
          </div>
        </button>

        <button id="${id('error-croco')}" class="report-result btnReport btnReport-confirm">
          <div class="report-result-fail">
            <span class="i">&#10060;</span>
            <span>Error — No data found</span>
          </div>
        </button>
      </div>

      <div class="backdropcroco" id="${id('backdropcroco')}" data-uid="${uid}" data-action="backdrop-click">
        <div class="dialogcroco">
          <div class="croco-logocroco">
            <div class="logo-boxcroco">C A R F A <span>X</span></div>
            <div class="logo-boxcroco"><span>power by </span></div>
            <div class="logo-boxcroco">C A R C R O <span>C</span></div>
          </div>

          <div class="vincroco">VIN: <span id="${id('dialogVincroco')}">—</span></div>
          <div class="pricecroco">Price: <span id="${id('val-p-confirm')}"></span></div>

          <div class="input-fieldcroco" id="${id('nameFieldcroco')}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <input type="text" id="${id('nameInputcroco')}" placeholder="Name"
              data-uid="${uid}" data-field="name">
          </div>

          <div class="input-fieldcroco" id="${id('emailFieldcroco')}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <input type="email" id="${id('emailInputcroco')}" placeholder="Email"
              data-uid="${uid}" data-field="email">
          </div>

          <div class="actionscroco">
            <button class="btncroco btn-cancelcroco" data-uid="${uid}" data-action="dialog-cancel">Cancel</button>
            <button class="btncroco btn-confirmcroco" id="${id('confirmBtncrocoInputs')}"
              disabled data-uid="${uid}" data-action="confirm-inputs">Confirm</button>
            <button class="btncroco btn-confirmcroco" id="${id('confirmBtncrocoWithKey')}"
              data-uid="${uid}" data-action="confirm-key">Get</button>
          </div>
        </div>
      </div>
    `;
  }

  // ─── WIDGET CONTROLLER ──────────────────────────────────────────────────────
  function initWidget(container) {
    const crocKey = container.getAttribute('croc') || '';
    const uid = Math.random().toString(36).slice(2, 8); // unique per instance

    container.insertAdjacentHTML('beforeend', buildWidgetHTML(crocKey, uid));

    const $ = (name) => document.getElementById(`${name}_${uid}`);

    const API_BASE = 'https://serve.carcroc.com';

    // helpers
    function showError()  { $('error-croco').style.display = 'flex'; }
    function hideError()  { $('error-croco').style.display = 'none'; }
    function showSuccess(){ $('succsess-croco').style.display = 'flex'; }
    function resetDialog() {
      $('nameInputcroco').value = '';
      $('emailInputcroco').value = '';
      $('nameFieldcroco').classList.remove('errorcroco');
      $('emailFieldcroco').classList.remove('errorcroco');
      $('confirmBtncrocoInputs').disabled = true;
    }
    function closeBackdrop() {
      $('backdropcroco').classList.remove('opencroco');
      resetDialog();
    }

    // ── VIN input ────────────────────────────────────────────
    $('vinRInput').addEventListener('input', function () {
      $('confirmRBtn').disabled = this.value.trim().length < 17;
    });

    // ── Key toggle ───────────────────────────────────────────
    container.querySelector('.key-toggleReport').addEventListener('click', function () {
      const kb = $('keyRBody');
      const ch = $('chevronReport');
      const open = kb.classList.toggle('open');
      ch.classList.toggle('open', open);
    });

    // ── Confirm (Find) ───────────────────────────────────────
    $('confirmRBtn').addEventListener('click', function () {
      const vin = $('vinRInput').value.trim();
      const key = $('keyRInput').value.trim();
      $('dialogVincroco').textContent = vin || '—';

      fetch(`${API_BASE}/croco/find`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vin, key, crocKey })
      })
      .then(res => {
        if (!res.ok) { showError(); return null; }
        return res.json();
      })
      .then(data => {
        if (!data || !data.price) return;
        hideError();
        showSuccess();
        if (data.price.price > 0) {
          const label = `${data.price.price} ${data.price.currency}`;
          $('val-p-success').innerHTML = label;
          $('val-p-confirm').innerHTML = label;
        } else if (data.price.isLogIn && data.price.numReports > 0) {
          $('idPh').innerText = 'key';
          const label = `Get the report, you have ${data.price.numReports} left`;
          $('val-p-success').innerHTML = label;
          $('val-p-confirm').innerHTML = label;
        }
      })
      .catch(() => showError());
    });

    // ── Cancel ───────────────────────────────────────────────
    container.querySelector('[data-action="cancel"]').addEventListener('click', function () {
      $('vinRInput').value = '';
      $('keyRInput').value = '';
      $('confirmRBtn').disabled = true;
      $('succsess-croco').style.display = 'none';
      $('val-p-success').innerHTML = '';
      hideError();
    });

    // ── Open dialog (success button) ─────────────────────────
    $('succsess-croco').addEventListener('click', function () {
      const key = $('keyRInput').value.trim();
      const useKey = key || $('idPh').innerText.trim() === 'key';

      if (!useKey) {
        const vin = $('vinRInput').value.trim();
        fetch(`${API_BASE}/croco/init`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ vin, type: 'CF', crocKey })
        })
        .then(res => { if (!res.ok) { showError(); return null; } return res.json(); })
        .then(data => {
          if (!data || !data.id) return;
          $('idPh').innerText = data.id;
          $('backdropcroco').classList.add('opencroco');
          $('nameFieldcroco').style.display  = 'flex';
          $('emailFieldcroco').style.display = 'flex';
          $('confirmBtncrocoInputs').style.display = 'inline-flex';
          $('confirmBtncrocoWithKey').style.display = 'none';
        })
        .catch(err => alert('Request failed: ' + err.message));
      } else {
        $('backdropcroco').classList.add('opencroco');
        $('nameFieldcroco').style.display  = 'none';
        $('emailFieldcroco').style.display = 'none';
        $('confirmBtncrocoInputs').style.display = 'none';
        $('confirmBtncrocoWithKey').style.display = 'inline-flex';
      }
    });

    // ── Backdrop click (close) ───────────────────────────────
    $('backdropcroco').addEventListener('click', function (e) {
      if (e.target === this) closeBackdrop();
    });

    // ── Dialog cancel ────────────────────────────────────────
    container.querySelector('[data-action="dialog-cancel"]').addEventListener('click', closeBackdrop);

    // ── Name / Email validation ──────────────────────────────
    const emailRx = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    function validateInputs() {
      const n  = $('nameInputcroco').value.trim();
      const e  = $('emailInputcroco').value.trim();
      const ev = emailRx.test(e);
      $('nameFieldcroco').classList.toggle('errorcroco', n.length > 0 && n.length < 2);
      $('emailFieldcroco').classList.toggle('errorcroco', e.length > 0 && !ev);
      $('confirmBtncrocoInputs').disabled = !(n.length >= 2 && ev);
    }
    $('nameInputcroco').addEventListener('input', validateInputs);
    $('emailInputcroco').addEventListener('input', validateInputs);

    // ── Confirm with name + email ────────────────────────────
    $('confirmBtncrocoInputs').addEventListener('click', function () {
      const name  = $('nameInputcroco').value.trim();
      const email = $('emailInputcroco').value.trim();
      const idp   = $('idPh').innerText.trim();

      fetch(`${API_BASE}/croco/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: idp, type: 'CF', customerEmail: email, customerName: name })
      })
      .then(res => {
        if (!res.ok) { showError(); return null; }
        closeBackdrop();
        return res.json();
      })
      .then(data => {
        if (data && data.url) window.open(data.url, '_self');
      })
      .catch(err => alert('Request failed: ' + err.message));
    });

    // ── Confirm with key ─────────────────────────────────────
    $('confirmBtncrocoWithKey').addEventListener('click', function () {
      const vin = $('vinRInput').value.trim();
      const key = $('keyRInput').value.trim();

      fetch(`${API_BASE}/croco/get`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'CF', vin, key })
      })
      .then(res => {
        if (!res.ok) { showError(); return null; }
        closeBackdrop();
        return res.json();
      })
      .then(data => {
        if (data && data.report && data.report.path) {
          window.open(`http://localhost:4200/report/info/${data.report.path}`, '_self');
        }
      })
      .catch(err => alert('Request failed: ' + err.message));
    });

    // Hide optional show-button if present
    const showBtn = document.getElementById('carcrocButtonShowBYOpt');
    if (showBtn) showBtn.style.display = 'none';
  }

  // ─── STYLE INJECTION (once) ─────────────────────────────────────────────────
  function injectStyles() {
    if (document.getElementById('carcroc-widget-styles')) return;
    const style = document.createElement('style');
    style.id = 'carcroc-widget-styles';
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  // ─── MOUNT WATCHER ──────────────────────────────────────────────────────────
  function waitForDivAndInject(targetId) {
    const interval = setInterval(() => {
      const container = document.getElementById(targetId);
      if (!container || container.dataset.carcrocDone) return;

      clearInterval(interval);
      container.dataset.carcrocDone = 'true';
      injectStyles();
      initWidget(container);
    }, 300);
  }

  // ─── PUBLIC API ─────────────────────────────────────────────────────────────
  global.CARCROCWidget = {
    /**
     * Mount the widget into any element by ID.
     * @param {string} targetId - The ID of the container element.
     *
     * Example:
     *   CARCROCWidget.mount('croco-widget-mount');
     */
    mount: function (targetId) {
      waitForDivAndInject(targetId);
    },

    /**
     * Mount the widget into a DOM element directly.
     * @param {HTMLElement} el
     * @param {string} crocKey
     */
    mountEl: function (el, crocKey) {
      if (!el || el.dataset.carcrocDone) return;
      el.dataset.carcrocDone = 'true';
      if (crocKey) el.setAttribute('croc', crocKey);
      injectStyles();
      initWidget(el);
    }
  };

  // ─── AUTO-INIT on DOMContentLoaded ──────────────────────────────────────────
  // Automatically mounts any <div id="croco-widget-mount" croc="..."> found on the page.
  function autoInit() {
    const container = document.getElementById('croco-widget-mount');
    if (container && !container.dataset.carcrocDone) {
      injectStyles();
      container.dataset.carcrocDone = 'true';
      initWidget(container);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }

})(window);