(()=>{(function(){if(document.getElementById("shopbot-root"))return;let T=document.createElement("style");T.textContent=`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@500;600;700&family=Inter:wght@400;500&display=swap');

    #shopbot-root {
      --bg:      #0c0c10;
      --bg2:     #141418;
      --bg3:     #1c1c22;
      --border:  rgba(255,255,255,0.07);
      --border2: rgba(255,255,255,0.13);
      --text:    #ededf0;
      --text2:   #8888a0;
      --text3:   #4a4a62;
      --accent:  #7c6af7;
      --accent2: #5b4fd4;
      --green:   #34d399;
      --red:     #f87171;
      --yellow:  #fbbf24;
      font-family: 'Inter', sans-serif;
      font-size: 13px;
      color: var(--text);
    }

    /* \u2500\u2500 FAB \u2500\u2500 */
    #sb-fab {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 52px;
      height: 52px;
      border-radius: 16px;
      background: linear-gradient(135deg, var(--accent) 0%, #a78bfa 100%);
      box-shadow: 0 8px 28px rgba(124,106,247,0.5), 0 2px 8px rgba(0,0,0,0.3);
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2147483646;
      transition: transform 0.25s cubic-bezier(.34,1.56,.64,1), box-shadow 0.2s;
      outline: none;
      color: #fff;
      font-size: 22px;
    }
    #sb-fab:hover {
      transform: scale(1.1) translateY(-2px);
      box-shadow: 0 12px 36px rgba(124,106,247,0.6);
    }
    #sb-fab.open {
      transform: scale(0.9) rotate(45deg);
    }
    #sb-fab-badge {
      position: absolute;
      top: -4px; right: -4px;
      min-width: 18px; height: 18px;
      background: var(--red);
      border-radius: 9px;
      border: 2px solid var(--bg);
      display: none;
      align-items: center; justify-content: center;
      font-size: 10px; font-weight: 700; color: #fff;
      font-family: 'Inter', sans-serif;
      padding: 0 4px;
    }
    #sb-fab-close {
      position: absolute;
      top: -7px; left: -7px;
      width: 18px; height: 18px;
      background: #2a2a35;
      border-radius: 50%;
      border: 1px solid rgba(255,255,255,0.2);
      color: #aaa;
      font-size: 9px;
      display: none;
      align-items: center; justify-content: center;
      cursor: pointer;
      z-index: 2147483647;
      line-height: 1;
    }
    #shopbot-root:hover #sb-fab-close { display: flex; }
    #sb-fab-close:hover { background: #f87171; color: #fff; border-color: #f87171; }

    /* \u2500\u2500 Panel \u2500\u2500 */
    #sb-panel {
      position: fixed;
      bottom: 88px;
      right: 24px;
      width: 400px;
      height: 568px;
      background: var(--bg);
      border-radius: 18px;
      border: 1px solid var(--border);
      box-shadow: 0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(124,106,247,0.1);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      z-index: 2147483645;
      transform: scale(0.88) translateY(16px);
      opacity: 0;
      pointer-events: none;
      transform-origin: bottom right;
      transition: transform 0.3s cubic-bezier(.34,1.56,.64,1), opacity 0.22s ease;
    }
    #sb-panel.open {
      transform: scale(1) translateY(0);
      opacity: 1;
      pointer-events: all;
    }

    /* \u2500\u2500 Header \u2500\u2500 */
    .sb-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 14px;
      border-bottom: 1px solid var(--border);
      background: var(--bg2);
      flex-shrink: 0;
    }
    .sb-logo {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .sb-logo-icon {
      width: 28px; height: 28px;
      border-radius: 8px;
      display: flex; align-items: center; justify-content: center;
      overflow: hidden;
    }
    .sb-logo-name {
      font-family: 'Syne', sans-serif;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: -0.3px;
      color: var(--text);
    }
    .sb-header-btn {
      width: 28px; height: 28px;
      background: transparent;
      border: 1px solid var(--border);
      border-radius: 7px;
      cursor: pointer;
      color: var(--text2);
      font-size: 15px;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.15s;
    }
    .sb-header-btn:hover { background: var(--bg3); color: var(--text); border-color: var(--border2); }

    /* \u2500\u2500 Tabs \u2500\u2500 */
    .sb-tabs {
      display: flex;
      border-bottom: 1px solid var(--border);
      background: var(--bg2);
      flex-shrink: 0;
    }
    .sb-tab {
      flex: 1; padding: 9px 6px;
      text-align: center;
      font-size: 11.5px; font-weight: 500;
      cursor: pointer; color: var(--text2);
      border-bottom: 2px solid transparent;
      transition: all 0.15s;
      user-select: none;
    }
    .sb-tab.active { color: var(--accent); border-bottom-color: var(--accent); }
    .sb-tab:hover:not(.active) { color: var(--text); background: var(--bg3); }
    .sb-tab-badge {
      display: inline-flex;
      align-items: center; justify-content: center;
      width: 16px; height: 16px;
      background: var(--accent);
      border-radius: 50%;
      font-size: 10px; font-weight: 700;
      color: #fff;
      margin-left: 4px;
      vertical-align: middle;
    }

    /* \u2500\u2500 Views \u2500\u2500 */
    .sb-view { display: none; flex: 1; flex-direction: column; overflow: hidden; min-height: 0; }
    .sb-view.active { display: flex; }

    /* \u2500\u2500 Capture View \u2500\u2500 */
    .sb-capture-top {
      padding: 12px 14px;
      border-bottom: 1px solid var(--border);
      flex-shrink: 0;
    }
    .sb-page-card {
      background: var(--bg3);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 10px 12px;
      margin-bottom: 10px;
    }
    .sb-platform-row {
      display: flex; align-items: center; gap: 6px;
      margin-bottom: 4px;
    }
    .sb-badge {
      padding: 2px 7px; border-radius: 4px;
      font-size: 10px; font-weight: 600;
    }
    .sb-badge-shopee { background: rgba(238,77,45,0.18); color: #ff6b47; }
    .sb-badge-lazada { background: rgba(0,102,255,0.18); color: #4d8eff; }
    .sb-badge-tiki   { background: rgba(0,134,255,0.18); color: #33a8ff; }
    .sb-badge-other  { background: rgba(120,120,140,0.18); color: var(--text2); }
    .sb-page-title {
      font-size: 12.5px; font-weight: 500; color: var(--text);
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .sb-btn-capture {
      width: 100%; padding: 10px;
      background: var(--accent);
      border: none; border-radius: 10px;
      color: #fff; font-size: 13px; font-weight: 600;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center; gap: 7px;
      transition: all 0.15s;
      font-family: 'Inter', sans-serif;
    }
    .sb-btn-capture:hover:not(:disabled) { background: var(--accent2); }
    .sb-btn-capture:disabled { opacity: 0.4; cursor: not-allowed; }

    .sb-progress { margin-top: 10px; display: none; }
    .sb-progress-track {
      height: 3px; background: var(--bg3);
      border-radius: 2px; overflow: hidden; margin-bottom: 6px;
    }
    .sb-progress-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--accent), #a78bfa);
      border-radius: 2px; transition: width 0.3s ease; width: 0%;
    }
    .sb-progress-text { font-size: 11px; color: var(--text2); text-align: center; }

    .sb-slots-header {
      padding: 10px 14px 6px;
      font-size: 11px; color: var(--text3);
      text-transform: uppercase; letter-spacing: 0.5px;
      flex-shrink: 0;
    }
    .sb-slots-list { flex: 1; overflow-y: auto; padding: 0 14px 12px; }

    .sb-slot-item {
      background: var(--bg2);
      border: 1px solid var(--border);
      border-radius: 10px; padding: 10px 12px;
      margin-bottom: 8px; display: flex; gap: 10px; align-items: flex-start;
      transition: border-color 0.15s;
    }
    .sb-slot-item:hover { border-color: var(--border2); }
    .sb-slot-thumb {
      width: 44px; height: 44px; border-radius: 6px;
      object-fit: cover; background: var(--bg3);
      flex-shrink: 0; border: 1px solid var(--border); cursor: pointer;
    }
    .sb-slot-thumb-ph {
      width: 44px; height: 44px; border-radius: 6px;
      background: var(--bg3); flex-shrink: 0;
      border: 1px solid var(--border);
      display: flex; align-items: center; justify-content: center;
      font-size: 18px; color: var(--text3);
    }
    .sb-slot-info { flex: 1; min-width: 0; }
    .sb-slot-name {
      font-size: 12px; font-weight: 500; color: var(--text);
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 3px;
    }
    .sb-slot-meta { font-size: 11px; color: var(--text2); }
    .sb-slot-price { color: var(--yellow); font-weight: 500; }
    .sb-slot-actions { display: flex; gap: 4px; flex-shrink: 0; }
    .sb-slot-btn {
      width: 24px; height: 24px; background: transparent;
      border: 1px solid var(--border); border-radius: 5px;
      cursor: pointer; color: var(--text2); font-size: 12px;
      display: flex; align-items: center; justify-content: center; transition: all 0.15s;
    }
    .sb-slot-btn:hover { background: var(--bg3); color: var(--text); }
    .sb-slot-btn.del:hover { border-color: var(--red); color: var(--red); }
    .sb-empty {
      text-align: center; padding: 28px 0;
      color: var(--text3); font-size: 12px; line-height: 1.8;
    }
    .sb-empty-icon { font-size: 30px; margin-bottom: 8px; }

    /* \u2500\u2500 Chat View \u2500\u2500 */
    .sb-messages {
      flex: 1; overflow-y: auto; padding: 12px 14px;
      display: flex; flex-direction: column; gap: 10px; min-height: 0;
    }
    .sb-msg { display: flex; gap: 8px; align-items: flex-start; }
    .sb-msg.user { flex-direction: row-reverse; }
    .sb-avatar {
      width: 26px; height: 26px; border-radius: 50%; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      font-size: 11px; font-weight: 700;
    }
    .sb-avatar.bot { background: linear-gradient(135deg, var(--accent), #a78bfa); color: #fff; }
    .sb-avatar.usr { background: var(--bg3); border: 1px solid var(--border); color: var(--text2); }
    .sb-bubble {
      max-width: 80%; padding: 8px 11px;
      border-radius: 10px; font-size: 12.5px; line-height: 1.55;
    }
    .sb-msg.bot .sb-bubble {
      background: var(--bg2); border: 1px solid var(--border);
      border-top-left-radius: 3px; color: var(--text);
    }
    .sb-msg.user .sb-bubble {
      background: var(--accent); color: #fff; border-top-right-radius: 3px;
    }
    .sb-typing {
      display: flex; gap: 4px; padding: 9px 12px;
      background: var(--bg2); border: 1px solid var(--border);
      border-radius: 10px; border-top-left-radius: 3px; width: fit-content;
    }
    .sb-dot {
      width: 5px; height: 5px; border-radius: 50%;
      background: var(--text3); animation: sbdot 1.2s infinite;
    }
    .sb-dot:nth-child(2) { animation-delay: 0.2s; }
    .sb-dot:nth-child(3) { animation-delay: 0.4s; }
    @keyframes sbdot { 0%,80%,100%{opacity:0.3} 40%{opacity:1} }

    .sb-quick-btns {
      padding: 8px 14px 0; display: flex; gap: 6px;
      flex-wrap: wrap; flex-shrink: 0;
    }
    .sb-quick-btn {
      padding: 5px 10px;
      background: var(--bg2); border: 1px solid var(--border);
      border-radius: 16px; cursor: pointer;
      font-size: 11px; color: var(--text2);
      transition: all 0.15s; white-space: nowrap;
      font-family: 'Inter', sans-serif;
    }
    .sb-quick-btn:hover { background: var(--bg3); color: var(--text); border-color: var(--border2); }

    .sb-input-area {
      padding: 10px 14px 12px;
      border-top: 1px solid var(--border);
      display: flex; gap: 8px; align-items: flex-end; flex-shrink: 0;
    }
    .sb-input {
      flex: 1; background: var(--bg2); border: 1px solid var(--border);
      border-radius: 10px; padding: 8px 12px;
      color: var(--text); font-size: 13px; resize: none;
      outline: none; font-family: 'Inter', sans-serif;
      line-height: 1.4; max-height: 80px; transition: border-color 0.15s;
    }
    .sb-input:focus { border-color: var(--accent); }
    .sb-input::placeholder { color: var(--text3); }
    .sb-send {
      width: 34px; height: 34px;
      background: var(--accent); border: none; border-radius: 8px;
      cursor: pointer; color: #fff; font-size: 16px;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.15s; flex-shrink: 0;
    }
    .sb-send:hover:not(:disabled) { background: var(--accent2); }
    .sb-send:disabled { opacity: 0.4; cursor: not-allowed; }

    /* \u2500\u2500 Settings View \u2500\u2500 */
    .sb-settings { padding: 10px 14px; flex: 1; overflow-y: auto; }
    .sb-settings-section { margin-bottom: 12px; }
    .sb-settings-label {
      font-size: 10px; color: var(--text3);
      text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;
    }
    .sb-select {
      width: 100%; background: var(--bg2); border: 1px solid var(--border);
      border-radius: 10px; padding: 8px 12px;
      color: var(--text); font-size: 13px; outline: none;
      font-family: 'Inter', sans-serif; cursor: pointer; transition: border-color 0.15s;
    }
    .sb-select:focus { border-color: var(--accent); }
    .sb-select option { background: #1a1a22; }
    .sb-btn-danger {
      width: 100%; padding: 8px; background: transparent;
      border: 1px solid rgba(248,113,113,0.28); border-radius: 10px;
      color: var(--red); font-size: 12px; cursor: pointer;
      transition: all 0.15s; font-family: 'Inter', sans-serif;
    }
    .sb-btn-danger:hover { background: rgba(248,113,113,0.08); }
    .sb-btn-dev {
      width: 100%; padding: 8px; background: transparent;
      border: 1px solid rgba(167,139,250,0.28); border-radius: 10px;
      color: #a78bfa; font-size: 12px; cursor: pointer; margin-top: 6px;
      transition: all 0.15s; font-family: 'Inter', sans-serif;
    }
    .sb-btn-dev:hover { background: rgba(167,139,250,0.08); }
    .sb-support-info {
      font-size: 11.5px; color: var(--text2); line-height: 1.7;
    }

    /* \u2500\u2500 Preview overlay \u2500\u2500 */
    #sb-preview {
      position: fixed; inset: 0;
      background: rgba(0,0,0,0.88);
      display: none; align-items: center; justify-content: center;
      z-index: 2147483647; padding: 24px;
    }
    #sb-preview.show { display: flex; }
    #sb-preview img { max-width: 100%; max-height: 100%; border-radius: 10px; object-fit: contain; }
    #sb-preview-close {
      position: absolute; top: 14px; right: 14px;
      width: 32px; height: 32px;
      background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15);
      border-radius: 50%; cursor: pointer; color: #fff; font-size: 15px;
      display: flex; align-items: center; justify-content: center;
    }

    /* Scrollbar */
    #shopbot-root ::-webkit-scrollbar { width: 3px; }
    #shopbot-root ::-webkit-scrollbar-track { background: transparent; }
    #shopbot-root ::-webkit-scrollbar-thumb { background: var(--bg3); border-radius: 2px; }
  `,document.head.appendChild(T);let h=document.createElement("div");h.id="shopbot-root",h.innerHTML=`
    <button id="sb-fab" title="ShopBot AI">
      <img src="data:image/jpeg;base64,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" style="width:36px;height:36px;border-radius:10px;display:block;">
      <div id="sb-fab-badge"></div>
      <div id="sb-fab-close" title="\u1EA8n ShopBot">\u2715</div>
    </button>

    <div id="sb-panel">
      <!-- Header -->
      <div class="sb-header">
        <div class="sb-logo">
          <div class="sb-logo-icon"><img src="data:image/jpeg;base64,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" style="width:28px;height:28px;border-radius:8px;display:block;"></div>
          <span class="sb-logo-name">ShopBot</span>
        </div>
        <button class="sb-header-btn" id="sb-btn-refresh" title="L\xE0m m\u1EDBi">\u21BB</button>
      </div>

      <!-- Tabs -->
      <div class="sb-tabs">
        <div class="sb-tab active" data-tab="capture">
          \u{1F4F8} Ch\u1EE5p
          <span id="sb-tab-badge" class="sb-tab-badge" style="display:none">0</span>
        </div>
        <div class="sb-tab" data-tab="chat">\u{1F4AC} So s\xE1nh</div>
        <div class="sb-tab" data-tab="settings">\u2699\uFE0F C\xE0i \u0111\u1EB7t</div>
      </div>

      <!-- Capture View -->
      <div class="sb-view active" id="sb-view-capture">
        <div class="sb-capture-top">
          <div class="sb-page-card">
            <div class="sb-platform-row">
              <span id="sb-platform-badge" class="sb-badge sb-badge-other">Web</span>
            </div>
            <div class="sb-page-title" id="sb-page-title">M\u1EDF trang s\u1EA3n ph\u1EA9m \u0111\u1EC3 b\u1EAFt \u0111\u1EA7u</div>
          </div>
          <button class="sb-btn-capture" id="sb-btn-capture" disabled>
            <span>\u{1F4F8}</span><span id="sb-btn-capture-text">Ch\u1EE5p trang n\xE0y</span>
          </button>
          <div class="sb-progress" id="sb-progress">
            <div class="sb-progress-track">
              <div class="sb-progress-fill" id="sb-progress-fill"></div>
            </div>
            <div class="sb-progress-text" id="sb-progress-text">\u0110ang chu\u1EA9n b\u1ECB...</div>
          </div>
        </div>
        <div class="sb-slots-header">S\u1EA3n ph\u1EA9m \u0111\xE3 l\u01B0u (<span id="sb-slot-count">0</span>/3)</div>
        <div class="sb-slots-list" id="sb-slots-list">
          <div class="sb-empty"><div class="sb-empty-icon">\u{1F4E6}</div>Ch\u01B0a c\xF3 s\u1EA3n ph\u1EA9m n\xE0o.<br>M\u1EDF trang SP v\xE0 b\u1EA5m Ch\u1EE5p \u0111\u1EC3 th\xEAm.</div>
        </div>
      </div>

      <!-- Chat View -->
      <div class="sb-view" id="sb-view-chat">
        <div class="sb-messages" id="sb-messages">
          <div class="sb-msg bot">
            <div class="sb-avatar bot">S</div>
            <div class="sb-bubble">\u{1F44B} Xin ch\xE0o! T\xF4i l\xE0 <strong>ShopBot</strong>.<br>H\xE3y ch\u1EE5p \xEDt nh\u1EA5t 2 s\u1EA3n ph\u1EA9m r\u1ED3i h\u1ECFi t\xF4i \u0111\u1EC3 so s\xE1nh nh\xE9!</div>
          </div>
        </div>
        <div class="sb-quick-btns">
          <button class="sb-quick-btn" data-q="So s\xE1nh t\u1EA5t c\u1EA3 s\u1EA3n ph\u1EA9m \u0111\xE3 l\u01B0u">\u{1F19A} So s\xE1nh t\u1EA5t c\u1EA3</button>
          <button class="sb-quick-btn" data-q="S\u1EA3n ph\u1EA9m n\xE0o \u0111\xE1ng mua nh\u1EA5t? Cho \u0111i\u1EC3m t\u1EEBng c\xE1i">\u2B50 Ch\u1EA5m \u0111i\u1EC3m</button>
          <button class="sb-quick-btn" data-q="C\xE1i n\xE0o gi\xE1 t\u1ED1t nh\u1EA5t so v\u1EDBi ch\u1EA5t l\u01B0\u1EE3ng?">\u{1F4B0} Gi\xE1 t\u1ED1t nh\u1EA5t</button>
          <button class="sb-quick-btn" data-q="T\xF3m t\u1EAFt \u01B0u nh\u01B0\u1EE3c \u0111i\u1EC3m t\u1EEBng s\u1EA3n ph\u1EA9m">\u{1F4CB} \u01AFu/nh\u01B0\u1EE3c \u0111i\u1EC3m</button>
        </div>
        <div class="sb-input-area">
          <textarea class="sb-input" id="sb-input" placeholder="H\u1ECFi v\u1EC1 s\u1EA3n ph\u1EA9m..." rows="1"></textarea>
          <button class="sb-send" id="sb-send">\u2191</button>
        </div>
      </div>

      <!-- Settings View -->
      <div class="sb-view" id="sb-view-settings">
        <div class="sb-settings">
          <div class="sb-settings-section">
            <div class="sb-settings-label">Model AI</div>
        <select class="sb-select" id="sb-model-select">
              <option value="gemini-2.5-flash">\u26A1 Gemini 2.5 Flash</option>     
              <option value="gemma-3-27b-it">\u{1F680} Gemma 3 27B</option>
              <option value="gemma-3-12b-it">\u{1F52C} Gemma 3 12B</option>
            </select>
          </div>
          <div class="sb-settings-section">
            <div class="sb-settings-label">D\u1EEF li\u1EC7u</div>
            <button class="sb-btn-danger" id="sb-btn-clear">\u{1F5D1}\uFE0F X\xF3a t\u1EA5t c\u1EA3 s\u1EA3n ph\u1EA9m \u0111\xE3 l\u01B0u</button>
          </div>
          <div class="sb-settings-section">
            <div class="sb-settings-label">Developer</div>
           <button class="sb-btn-danger" id="sb-btn-reload">\u{1F504} Reset to\xE0n b\u1ED9</button>
          </div>
          <div class="sb-settings-section">
            <div class="sb-settings-label">T\u01B0\u01A1ng th\xEDch</div>
            <div class="sb-support-info">
              \u2705 Shopee \xB7 Lazada \xB7 Tiki<br>
              \u2705 Amazon \xB7 eBay <br>
              \u2705 Taobao \xB7 Alibaba <br>
              \u26A0\uFE0F Trang kh\xE1c: ch\u1EE5p \u1EA3nh v\u1EABn ho\u1EA1t \u0111\u1ED9ng
            </div>
          </div>
          <div class="sb-settings-section">
            <div class="sb-settings-label">\u26A0\uFE0F L\u01B0u \xFD quan tr\u1ECDng</div>
            <div style="background:rgba(248,113,113,0.08);border:1px solid rgba(248,113,113,0.25);border-radius:8px;padding:10px 12px;font-size:11.5px;color:#fca5a5;line-height:1.7;">
              ShopBot <strong style="color:#f87171;">kh\xF4ng</strong> li\xEAn k\u1EBFt hay \u0111\u01B0\u1EE3c b\u1EA3o l\xE3nh b\u1EDFi Shopee, Lazada, Tiki hay b\u1EA5t k\u1EF3 s\xE0n n\xE0o. Extension ho\u1EA1t \u0111\u1ED9ng \u0111\u1ED9c l\u1EADp, ch\u1EC9 \u0111\u1ECDc th\xF4ng tin hi\u1EC3n th\u1ECB c\xF4ng khai tr\xEAn tr\xECnh duy\u1EC7t c\u1EE7a b\u1EA1n.
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Preview overlay -->
    <div id="sb-preview">
      <button id="sb-preview-close">\u2715</button>
      <img id="sb-preview-img" src="" alt="">
    </div>
  `,document.body.appendChild(h);let m=3,o=[],c=[],y=!1,l=!1;document.getElementById("sb-fab-close").addEventListener("click",t=>{t.stopPropagation(),h.style.display="none"});let v=document.getElementById("sb-fab"),B=document.getElementById("sb-panel");v.addEventListener("click",()=>{l=!l,B.classList.toggle("open",l),v.classList.toggle("open",l),document.getElementById("sb-fab-badge").style.display="none",l&&b()}),chrome.runtime.onMessage.addListener((t,e,A)=>{if(t.action==="reset_widget"){h.remove(),A({ok:!0});return}t.action==="toggle_widget"&&(h.style.display==="none"?(h.style.display="",l=!0,B.classList.add("open"),v.classList.add("open"),b()):(l=!l,B.classList.toggle("open",l),v.classList.toggle("open",l),l&&b()),A({ok:!0}))}),document.querySelectorAll(".sb-tab").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".sb-tab").forEach(e=>e.classList.remove("active")),document.querySelectorAll(".sb-view").forEach(e=>e.classList.remove("active")),t.classList.add("active"),document.getElementById(`sb-view-${t.dataset.tab}`).classList.add("active")})}),R().then(()=>{u(),x()}),U(),F(),document.getElementById("sb-btn-refresh").addEventListener("click",b);function b(){let t=window.location.href,e=document.title||"",A="Web",s="sb-badge-other";if(t.includes("shopee.vn"))A="Shopee",s="sb-badge-shopee";else if(t.includes("lazada.vn"))A="Lazada",s="sb-badge-lazada";else if(t.includes("tiki.vn"))A="Tiki",s="sb-badge-tiki";else try{A=new URL(t).hostname.replace("www.","")}catch{}let a=document.getElementById("sb-platform-badge");a.className=`sb-badge ${s}`,a.textContent=A,document.getElementById("sb-page-title").textContent=e||t;let r=document.getElementById("sb-btn-capture");r.disabled=o.length>=m,document.getElementById("sb-btn-capture-text").textContent=o.length>=m?`\u0110\xE3 \u0111\u1EE7 ${m} s\u1EA3n ph\u1EA9m`:"Ch\u1EE5p trang n\xE0y"}document.getElementById("sb-btn-capture").addEventListener("click",async()=>{if(o.length>=m)return;let t=document.getElementById("sb-btn-capture");t.disabled=!0,document.getElementById("sb-btn-capture-text").textContent="\u0110ang ch\u1EE5p...",document.getElementById("sb-progress").style.display="block";let e=A=>{A.action==="capture_progress"&&(document.getElementById("sb-progress-fill").style.width=A.progress+"%",document.getElementById("sb-progress-text").textContent=A.status)};chrome.runtime.onMessage.addListener(e);try{let A=!1;try{A=await new Promise(n=>{chrome.runtime.sendMessage({action:"ping_tab"},d=>n(d?.ok===!0))})}catch{}let s=await new Promise((n,d)=>{chrome.runtime.sendMessage({action:"inject_and_capture",tabId:null},i=>{chrome.runtime.lastError?d(new Error(chrome.runtime.lastError.message)):n(i)})});if(s?.error)throw new Error(s.error);if(!s?.success)throw new Error("Capture th\u1EA5t b\u1EA1i");let a=await L(s.imageData,88,88),r={id:Date.now(),platform:s.productInfo?.platform||"Web",name:s.productInfo?.title||document.title,price:s.productInfo?.price||"",rating:s.productInfo?.rating||"",sold:s.productInfo?.sold||"",url:window.location.href,capturedAt:new Date().toLocaleString("vi-VN"),imageData:s.imageData,thumbnail:a,segments:s.segments};o.push(r),await w(),u(),x(),p(`\u2705 \u0110\xE3 l\u01B0u <strong>${r.name.slice(0,40)}${r.name.length>40?"...":""}</strong> (${r.platform})<br>\u{1F4E6} \u0110\xE3 l\u01B0u ${o.length}/${m} s\u1EA3n ph\u1EA9m${o.length>=m?' \u2014 <span style="color:var(--yellow)">\u0110\xE3 \u0111\u1EE7 slot!</span>':` \u2014 c\xF2n tr\u1ED1ng ${m-o.length} slot`}`);let g=document.getElementById("sb-fab-badge");g.textContent=o.length,g.style.display="inline-flex"}catch(A){p(`\u274C L\u1ED7i: ${A.message}`)}finally{chrome.runtime.onMessage.removeListener(e),document.getElementById("sb-progress").style.display="none",document.getElementById("sb-progress-fill").style.width="0%",b()}});async function L(t,e,A){return new Promise(s=>{if(!t){s("");return}let a=new Image;a.onload=()=>{let r=document.createElement("canvas");r.width=e,r.height=A;let g=r.getContext("2d"),n=a.width/a.height,d=0,i=0,k=a.width,S=a.height;n>1?(k=a.height,d=(a.width-k)/2):(S=a.width,i=(a.height-S)/2),g.drawImage(a,d,i,k,S,0,0,e,A),s(r.toDataURL("image/jpeg",.7))},a.onerror=()=>s(""),a.src=t})}function u(){let t=document.getElementById("sb-slots-list");if(o.length===0){t.innerHTML='<div class="sb-empty"><div class="sb-empty-icon">\u{1F4E6}</div>Ch\u01B0a c\xF3 s\u1EA3n ph\u1EA9m n\xE0o.<br>M\u1EDF trang SP v\xE0 b\u1EA5m Ch\u1EE5p \u0111\u1EC3 th\xEAm.</div>';return}t.innerHTML=o.map((e,A)=>`
      <div class="sb-slot-item">
        ${e.thumbnail?`<img class="sb-slot-thumb" src="${e.thumbnail}" data-preview="${A}">`:'<div class="sb-slot-thumb-ph"><img src="data:image/jpeg;base64,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" style="width:28px;height:28px;border-radius:8px;display:block;"></div>'}
        <div class="sb-slot-info">
          <div class="sb-slot-name">${I(e.name)}</div>
          <div class="sb-slot-meta">
            <span class="sb-badge ${V(e.platform)}" style="font-size:10px;padding:1px 5px">${e.platform}</span>
            ${e.price?`<span class="sb-slot-price"> ${I(e.price.slice(0,20))}</span>`:""}
          </div>
          <div class="sb-slot-meta" style="margin-top:2px;font-size:10px;color:var(--text3)">${e.capturedAt}</div>
        </div>
        <div class="sb-slot-actions">
          <button class="sb-slot-btn" data-preview="${A}">\u{1F50D}</button>
          <button class="sb-slot-btn del" data-delete="${A}">\u2715</button>
        </div>
      </div>
    `).join(""),t.querySelectorAll("[data-preview]").forEach(e=>{e.addEventListener("click",()=>{let A=o[parseInt(e.dataset.preview)];A?.imageData&&(document.getElementById("sb-preview-img").src=A.imageData,document.getElementById("sb-preview").classList.add("show"))})}),t.querySelectorAll("[data-delete]").forEach(e=>{e.addEventListener("click",async()=>{o.splice(parseInt(e.dataset.delete),1),await w(),u(),x(),b()})})}function V(t){return t==="Shopee"?"sb-badge-shopee":t==="Lazada"?"sb-badge-lazada":t==="Tiki"?"sb-badge-tiki":"sb-badge-other"}function x(){document.getElementById("sb-slot-count").textContent=o.length;let t=document.getElementById("sb-tab-badge");t.textContent=o.length,t.style.display=o.length>0?"inline-flex":"none"}document.getElementById("sb-preview-close").addEventListener("click",()=>{document.getElementById("sb-preview").classList.remove("show")}),document.getElementById("sb-send").addEventListener("click",E),document.getElementById("sb-input").addEventListener("keydown",t=>{t.key==="Enter"&&!t.shiftKey&&(t.preventDefault(),E())}),document.getElementById("sb-input").addEventListener("input",function(){this.style.height="auto",this.style.height=Math.min(this.scrollHeight,80)+"px"}),document.querySelectorAll(".sb-quick-btn").forEach(t=>{t.addEventListener("click",()=>{document.getElementById("sb-input").value=t.dataset.q,document.querySelectorAll(".sb-tab")[1].click(),E()})});async function E(){let t=document.getElementById("sb-input"),e=t.value.trim();if(!e||y)return;if(t.value="",t.style.height="auto",document.querySelectorAll(".sb-tab")[1].click(),Q(e),c.push({role:"user",content:e}),f(),o.length===0){let s='B\u1EA1n ch\u01B0a ch\u1EE5p s\u1EA3n ph\u1EA9m n\xE0o! H\xE3y m\u1EDF trang s\u1EA3n ph\u1EA9m v\xE0 b\u1EA5m "Ch\u1EE5p trang n\xE0y".';p(s),c.push({role:"assistant",content:s}),f();return}y=!0,document.getElementById("sb-send").disabled=!0;let A=C();try{let s=[],a=`=== TH\xD4NG TIN S\u1EA2N PH\u1EA8M ===
`;o.forEach((n,d)=>{a+=`
SP${d+1}: ${n.name}
S\xE0n: ${n.platform}
`,n.price&&(a+=`Gi\xE1: ${n.price}
`),n.rating&&(a+=`S\u1ED1 sao: ${n.rating}
`),n.reviewCount&&(a+=`L\u01B0\u1EE3t \u0111\xE1nh gi\xE1: ${n.reviewCount}
`),n.sold&&(a+=`\u0110\xE3 b\xE1n: ${n.sold}
`),n.variants&&(a+=`${n.variants}
`),a+=`URL: ${n.url}
`}),s.push({type:"text",text:a}),window._sbImgSent||(o.forEach(n=>{if(n.imageData?.startsWith("data:image")){let d=n.imageData.split(",")[1],i=n.imageData.includes("jpeg")?"image/jpeg":"image/png";s.push({type:"image",source:{type:"base64",media_type:i,data:d}})}}),window._sbImgSent=!0),s.push({type:"text",text:e});let r=document.getElementById("sb-model-select").value,g=await new Promise((n,d)=>{chrome.runtime.sendMessage({action:"call_claude",payload:{model:r,system:`B\u1EA1n l\xE0 ShopBot - tr\u1EE3 l\xFD so s\xE1nh s\u1EA3n ph\u1EA9m chuy\xEAn nghi\u1EC7p tr\xEAn Shopee, Lazada, Tiki...

B\u01AF\u1EDAC 1 - Ph\xE2n t\xEDch T\u1EEANG s\u1EA3n ph\u1EA9m:
\u2501\u2501\u2501 S\u1EA2N PH\u1EA8M [s\u1ED1]: [T\xEAn] \u2501\u2501\u2501
\u{1F4B0} Gi\xE1: [gi\xE1]
\u2B50 \u0110\xE1nh gi\xE1: [sao] ([l\u01B0\u1EE3t])
\u{1F4E6} \u0110\xE3 b\xE1n: [s\u1ED1 l\u01B0\u1EE3ng]
\u{1F3EA} Shop: [t\xEAn + Mall/th\u01B0\u1EDDng]
\u2705 \u01AFu \u0111i\u1EC3m: [\xEDt nh\u1EA5t 3 \u0111i\u1EC3m]
\u274C Nh\u01B0\u1EE3c \u0111i\u1EC3m: [\xEDt nh\u1EA5t 2 \u0111i\u1EC3m]

Ch\u1EA5m \u0111i\u1EC3m C\u1ED0 \u0110\u1ECANH:
\u{1F4B0} Gi\xE1 c\u1EA3: [X/2]
\u2B50 \u0110\xE1nh gi\xE1 ng\u01B0\u1EDDi mua: [X/2]
\u{1F4E6} \u0110\u1ED9 tin c\u1EADy: [X/2]

Ch\u1EA5m \u0111i\u1EC3m \u0110\u1ED8NG (ch\u1EC9 khi th\u1EA5y trong \u1EA3nh):
- Th\u1EA5y ch\u1EA5t li\u1EC7u/v\u1EA3i \u2192 \u{1F9F5} Ch\u1EA5t li\u1EC7u: [X/1]
- Th\u1EA5y th\xF4ng s\u1ED1 k\u1EF9 thu\u1EADt \u2192 \u2699\uFE0F Th\xF4ng s\u1ED1: [X/2]
- Th\u1EA5y b\u1EA3o h\xE0nh \u2192 \u{1F6E1}\uFE0F B\u1EA3o h\xE0nh: [X/1]
- Th\u1EA5y size/k\xEDch th\u01B0\u1EDBc r\xF5 \u2192 \u{1F4D0} Size: [X/1]
- Th\u1EA5y th\xE0nh ph\u1EA7n \u2192 \u{1F9EA} Th\xE0nh ph\u1EA7n: [X/1]
- Th\u1EA5y c\xF4ng su\u1EA5t/\u0111i\u1EC7n n\u0103ng \u2192 \u26A1 C\xF4ng su\u1EA5t: [X/1]
\u{1F3AF} T\u1ED5ng: [X/t\u1ED5ng thang]

B\u01AF\u1EDAC 2 - So s\xE1nh & K\u1EBFt lu\u1EADn:
\u2501\u2501\u2501 K\u1EBET LU\u1EACN \u2501\u2501\u2501
\u{1F3C6} ShopBot g\u1EE3i \xFD: [T\xEAn s\u1EA3n ph\u1EA9m]
L\xFD do: [gi\u1EA3i th\xEDch ng\u1EAFn g\u1ECDn]
\u26A0\uFE0F L\u01B0u \xFD: [size, m\xE0u, li\xEAn h\u1EC7 shop...]

\u{1F4AC} \u0110\xE2y ch\u1EC9 l\xE0 g\u1EE3i \xFD tham kh\u1EA3o d\u1EF1a tr\xEAn th\xF4ng tin hi\u1EC3n th\u1ECB \u2014 b\u1EA1n m\u1EDBi l\xE0 ng\u01B0\u1EDDi hi\u1EC3u r\xF5 nhu c\u1EA7u v\xE0 \u0111\u01B0a ra quy\u1EBFt \u0111\u1ECBnh cu\u1ED1i c\xF9ng!

QUAN TR\u1ECCNG: KH\xD4NG d\xF9ng markdown. Tr\u1EA3 l\u1EDDi b\u1EB1ng ti\u1EBFng Vi\u1EC7t.`,messages:[...c.slice(0,-1).slice(-6).map(i=>({role:i.role,content:i.content})),{role:"user",content:s}]}},i=>{i?.error?d(new Error(i.error)):n(i)})});A.remove(),p(H(g.text)),c.push({role:"assistant",content:g.text}),f()}catch(s){A.remove(),p(`\u274C L\u1ED7i: ${s.message}`)}finally{y=!1,document.getElementById("sb-send").disabled=!1}}function H(t){return t.replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/\n\n/g,"<br><br>").replace(/\n/g,"<br>")}function Q(t){let e=document.getElementById("sb-messages"),A=document.createElement("div");A.className="sb-msg user",A.innerHTML=`<div class="sb-avatar usr">U</div><div class="sb-bubble">${I(t)}</div>`,e.appendChild(A),e.scrollTop=e.scrollHeight}function p(t){let e=document.getElementById("sb-messages"),A=document.createElement("div");A.className="sb-msg bot",A.innerHTML=`<div class="sb-avatar bot">S</div><div class="sb-bubble">${t}</div>`,e.appendChild(A),e.scrollTop=e.scrollHeight}function C(){let t=document.getElementById("sb-messages"),e=document.createElement("div");return e.className="sb-msg bot",e.innerHTML='<div class="sb-avatar bot">S</div><div class="sb-typing"><div class="sb-dot"></div><div class="sb-dot"></div><div class="sb-dot"></div></div>',t.appendChild(e),t.scrollTop=t.scrollHeight,e}document.getElementById("sb-model-select").addEventListener("change",function(){chrome.storage.local.set({shopbot_model:this.value})}),document.getElementById("sb-btn-clear").addEventListener("click",async()=>{confirm("X\xF3a t\u1EA5t c\u1EA3 s\u1EA3n ph\u1EA9m \u0111\xE3 l\u01B0u?")&&(o=[],await w(),u(),x(),b(),window._sbImgSent=!1,c=[],f(),document.getElementById("sb-messages").innerHTML="",p("\u{1F5D1}\uFE0F \u0110\xE3 x\xF3a t\u1EA5t c\u1EA3. B\u1EA1n c\xF3 th\u1EC3 th\xEAm s\u1EA3n ph\u1EA9m m\u1EDBi!"))}),document.getElementById("sb-btn-reload").addEventListener("click",async()=>{confirm("Reset to\xE0n b\u1ED9? T\u1EA5t c\u1EA3 s\u1EA3n ph\u1EA9m v\xE0 l\u1ECBch s\u1EED chat s\u1EBD b\u1ECB x\xF3a.")&&(await chrome.storage.local.clear(),o=[],c=[],window._sbImgSent=!1,u(),x(),b(),document.getElementById("sb-messages").innerHTML="",p("\u{1F504} \u0110\xE3 reset to\xE0n b\u1ED9. B\u1EA1n c\xF3 th\u1EC3 b\u1EAFt \u0111\u1EA7u l\u1EA1i!"),document.querySelectorAll(".sb-tab")[0].click())});async function R(){return new Promise(t=>chrome.storage.local.get(["shopbot_slots"],e=>{o=e.shopbot_slots||[],t()}))}async function w(){return new Promise(t=>chrome.storage.local.set({shopbot_slots:o},t))}function f(){chrome.storage.local.set({shopbot_chat:c.map(t=>({role:t.role,content:typeof t.content=="string"?t.content:"[\u1EA3nh]"}))})}async function F(){return new Promise(t=>chrome.storage.local.get(["shopbot_chat"],e=>{if(e.shopbot_chat?.length>0){c=e.shopbot_chat;let A=document.getElementById("sb-messages");A.innerHTML="",c.forEach(s=>s.role==="user"?Q(s.content):p(H(s.content)))}t()}))}async function U(){chrome.storage.local.get(["shopbot_model"],t=>{t.shopbot_model&&(document.getElementById("sb-model-select").value=t.shopbot_model)})}function I(t){return(t||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}})();})();
