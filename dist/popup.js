const MAX_SLOTS=5;let slots=[],chatHistory=[],isLoading=!1;document.addEventListener("DOMContentLoaded",async()=>{await loadSlots(),await loadChatHistory(),await updateCurrentPageInfo(),renderSlots(),updateSlotCount(),setupEventListeners()}),document.querySelectorAll(".tab").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".tab").forEach(e=>e.classList.remove("active")),document.querySelectorAll(".view").forEach(e=>e.classList.remove("active")),t.classList.add("active"),document.getElementById(`view-${t.dataset.tab}`).classList.add("active")})});function setupEventListeners(){document.getElementById("btn-capture").addEventListener("click",handleCapture),document.getElementById("btn-refresh-page").addEventListener("click",updateCurrentPageInfo),document.getElementById("btn-send").addEventListener("click",sendMessage),document.getElementById("chat-input").addEventListener("keydown",t=>{t.key==="Enter"&&!t.shiftKey&&(t.preventDefault(),sendMessage())}),document.getElementById("chat-input").addEventListener("input",function(){this.style.height="auto",this.style.height=Math.min(this.scrollHeight,80)+"px"}),document.querySelectorAll(".quick-btn").forEach(t=>{t.addEventListener("click",()=>{document.getElementById("chat-input").value=t.dataset.q,sendMessage(),document.querySelectorAll(".tab")[1].click()})}),document.getElementById("btn-clear-all").addEventListener("click",clearAllSlots),document.getElementById("btn-reload-ext").addEventListener("click",()=>{confirm("Reload extension? To\xE0n b\u1ED9 n\u1ED9i dung s\u1EBD \u0111\u01B0\u1EE3c t\u1EA3i l\u1EA1i.")&&chrome.storage.local.remove(["shopbot_chat"],()=>{chrome.runtime.sendMessage({action:"reload_extension"})})}),document.getElementById("preview-close").addEventListener("click",()=>{document.getElementById("preview-overlay").classList.remove("show")})}async function updateCurrentPageInfo(){try{const[t]=await chrome.tabs.query({active:!0,currentWindow:!0});if(!t)return;const e=t.url||"",a=t.title||"";let n="Web",i="badge-other";if(e.includes("shopee.vn"))n="Shopee",i="badge-shopee";else if(e.includes("lazada.vn"))n="Lazada",i="badge-lazada";else if(e.includes("tiki.vn"))n="Tiki",i="badge-tiki";else try{n=new URL(e).hostname.replace("www.","")}catch{}const s=document.getElementById("platform-badge");s.className=`platform-badge ${i}`,s.textContent=n;const c=document.getElementById("page-title");c.textContent=a||e,c.style.color="";const r=document.getElementById("btn-capture");r.disabled=slots.length>=5,slots.length>=5?document.getElementById("btn-capture-text").textContent="\u0110\xE3 \u0111\u1EE7 5 s\u1EA3n ph\u1EA9m":document.getElementById("btn-capture-text").textContent="Ch\u1EE5p trang n\xE0y",window._currentTab={tab:t,platform:n,url:e,title:a}}catch(t){console.error("updateCurrentPageInfo error:",t)}}async function handleCapture(){if(!window._currentTab?.url)return;if(slots.length>=5){addBotMessage("\u0110\xE3 \u0111\u1EE7 5 s\u1EA3n ph\u1EA9m r\u1ED3i! H\xE3y x\xF3a b\u1EDBt r\u1ED3i th\xEAm m\u1EDBi.");return}const t=document.getElementById("btn-capture");t.disabled=!0,document.getElementById("btn-capture-text").textContent="\u0110ang ch\u1EE5p...";const e=document.getElementById("capture-progress");e.style.display="block";const a=n=>{n.action==="capture_progress"&&(document.getElementById("progress-fill").style.width=n.progress+"%",document.getElementById("progress-text").textContent=n.status)};chrome.runtime.onMessage.addListener(a);try{const n=window._currentTab.tab.id;let i=!1;try{i=await new Promise(o=>{chrome.tabs.sendMessage(n,{action:"ping"},l=>{o(l?.ok===!0)})})}catch{}i||(await chrome.scripting.executeScript({target:{tabId:n},files:["content_script.js"]}),await sleep(600));const s=await new Promise((o,l)=>{chrome.tabs.sendMessage(n,{action:"capture_page"},d=>{chrome.runtime.lastError?l(new Error(chrome.runtime.lastError.message)):o(d)})});if(s?.error)throw new Error(s.error);if(!s?.success)throw new Error("Capture th\u1EA5t b\u1EA1i");const c=await createThumbnail(s.imageData,88,88),r={id:Date.now(),platform:s.productInfo.platform,name:s.productInfo.title||window._currentTab.title,price:s.productInfo.price||"",rating:s.productInfo.rating||"",sold:s.productInfo.sold||"",url:s.productInfo.url,capturedAt:s.productInfo.capturedAt,imageData:s.imageData,thumbnail:c,segments:s.segments};slots.push(r),await saveSlots(),renderSlots(),updateSlotCount(),addBotMessage(`\u2705 \u0110\xE3 l\u01B0u <strong>${r.name.slice(0,40)}${r.name.length>40?"...":""}</strong> (${r.platform}).<br>C\xF2n ${5-slots.length} slot tr\u1ED1ng.`),document.getElementById("btn-capture-text").textContent=slots.length>=5?"\u0110\xE3 \u0111\u1EE7 5 s\u1EA3n ph\u1EA9m":"Ch\u1EE5p trang n\xE0y",t.disabled=slots.length>=5}catch(n){addBotMessage(`\u274C L\u1ED7i khi ch\u1EE5p: ${n.message}`),document.getElementById("btn-capture-text").textContent="Ch\u1EE5p trang n\xE0y",t.disabled=!1}finally{chrome.runtime.onMessage.removeListener(a),document.getElementById("progress-fill").style.width="0%",e.style.display="none"}}async function createThumbnail(t,e,a){return new Promise(n=>{if(!t){n("");return}const i=new Image;i.onload=()=>{const s=document.createElement("canvas");s.width=e,s.height=a;const c=s.getContext("2d"),r=i.width/i.height;let o=0,l=0,d=i.width,m=i.height;r>1?(d=i.height,o=(i.width-d)/2):(m=i.width,l=(i.height-m)/2),c.drawImage(i,o,l,d,m,0,0,e,a),n(s.toDataURL("image/jpeg",.7))},i.onerror=()=>n(""),i.src=t})}function renderSlots(){const t=document.getElementById("slots-list");if(slots.length===0){t.innerHTML=`
      <div class="empty-slots">
        <div class="empty-icon">\u{1F4E6}</div>
        Ch\u01B0a c\xF3 s\u1EA3n ph\u1EA9m n\xE0o.<br>M\u1EDF trang SP v\xE0 b\u1EA5m Ch\u1EE5p \u0111\u1EC3 th\xEAm.
      </div>`;return}t.innerHTML=slots.map((e,a)=>`
    <div class="slot-item">
      ${e.thumbnail?`<img class="slot-thumb" src="${e.thumbnail}" alt="thumb" data-preview="${a}" style="cursor:pointer">`:'<div class="slot-thumb-placeholder">\u{1F6CD}\uFE0F</div>'}
      <div class="slot-info">
        <div class="slot-name">${escHtml(e.name)}</div>
        <div class="slot-meta">
          <span class="platform-badge ${getPlatformBadgeClass(e.platform)}" style="font-size:10px;padding:1px 5px">${e.platform}</span>
          ${e.price?`<span class="slot-price"> ${escHtml(e.price.slice(0,20))}</span>`:""}
          ${e.rating?` \xB7 ${escHtml(e.rating.slice(0,10))}`:""}
        </div>
        <div class="slot-meta" style="margin-top:2px;font-size:10px;color:var(--text3)">${e.capturedAt}</div>
      </div>
      <div class="slot-actions">
        <button class="slot-btn" title="Xem \u1EA3nh" data-preview="${a}">\u{1F50D}</button>
        <button class="slot-btn delete" title="X\xF3a" data-delete="${a}">\u2715</button>
      </div>
    </div>
  `).join(""),t.querySelectorAll("[data-preview]").forEach(e=>{e.addEventListener("click",()=>{const a=parseInt(e.dataset.preview);slots[a]?.imageData&&(document.getElementById("preview-img").src=slots[a].imageData,document.getElementById("preview-overlay").classList.add("show"))})}),t.querySelectorAll("[data-delete]").forEach(e=>{e.addEventListener("click",async()=>{const a=parseInt(e.dataset.delete);slots.splice(a,1),await saveSlots(),renderSlots(),updateSlotCount(),await updateCurrentPageInfo()})})}function getPlatformBadgeClass(t){return t==="Shopee"?"badge-shopee":t==="Lazada"?"badge-lazada":t==="Tiki"?"badge-tiki":"badge-other"}function updateSlotCount(){document.getElementById("slot-count").textContent=slots.length;const t=document.getElementById("slot-count-badge");slots.length>0?(t.textContent=slots.length,t.style.display="inline-flex"):t.style.display="none"}async function sendMessage(){const t=document.getElementById("chat-input"),e=t.value.trim();if(!e||isLoading)return;if(t.value="",t.style.height="auto",document.querySelectorAll(".tab")[1].click(),addUserMessage(e),chatHistory.push({role:"user",content:e}),saveChatHistory(),slots.length===0){const n='B\u1EA1n ch\u01B0a ch\u1EE5p s\u1EA3n ph\u1EA9m n\xE0o! H\xE3y m\u1EDF trang s\u1EA3n ph\u1EA9m tr\xEAn Shopee/Lazada/Tiki v\xE0 b\u1EA5m "Ch\u1EE5p trang n\xE0y".';addBotMessage(n),chatHistory.push({role:"assistant",content:n}),saveChatHistory();return}isLoading=!0,document.getElementById("btn-send").disabled=!0;const a=showTyping();try{const n=[];if(slots.length>0){let c=`=== TH\xD4NG TIN S\u1EA2N PH\u1EA8M \u0110\xC3 L\u01AFU ===
`;for(let r=0;r<slots.length;r++){const o=slots[r];c+=`
S\u1EA2N PH\u1EA8M ${r+1}: ${o.name}
`,c+=`S\xE0n: ${o.platform}
`,c+=`Gi\xE1: ${o.price||"N/A"}
`,c+=`\u0110\xE1nh gi\xE1: ${o.rating||"N/A"}
`,c+=`\u0110\xE3 b\xE1n: ${o.sold||"N/A"}
`,c+=`URL: ${o.url}
`}n.push({type:"text",text:c})}if(!window._imagesSentToAPI){for(let c=0;c<slots.length;c++){const r=slots[c];if(r.imageData&&r.imageData.startsWith("data:image")){const o=r.imageData.split(",")[1],l=r.imageData.includes("jpeg")?"image/jpeg":"image/png";n.push({type:"image",source:{type:"base64",media_type:l,data:o}})}}window._imagesSentToAPI=!0}n.push({type:"text",text:e});const i=`B\u1EA1n l\xE0 ShopBot - tr\u1EE3 l\xFD so s\xE1nh s\u1EA3n ph\u1EA9m chuy\xEAn nghi\u1EC7p, gi\xFAp ng\u01B0\u1EDDi d\xF9ng ra quy\u1EBFt \u0111\u1ECBnh mua h\xE0ng ch\xEDnh x\xE1c tr\xEAn Shopee, Lazada, Tiki.

B\u1EA1n s\u1EBD nh\u1EADn \u1EA3nh ch\u1EE5p m\xE0n h\xECnh \u0111\u1EA7y \u0111\u1EE7 c\u1EE7a t\u1EEBng trang s\u1EA3n ph\u1EA9m. H\xE3y \u0111\u1ECDc k\u1EF9 \u1EA3nh \u0111\u1EC3 l\u1EA5y th\xF4ng tin th\u1EF1c t\u1EBF.

NHI\u1EC6M V\u1EE4 - Ph\xE2n t\xEDch T\u1EEANG s\u1EA3n ph\u1EA9m theo \u0111\xFAng c\u1EA5u tr\xFAc sau:

\u2501\u2501\u2501 S\u1EA2N PH\u1EA8M [s\u1ED1]: [T\xEAn s\u1EA3n ph\u1EA9m] \u2501\u2501\u2501
\u{1F4B0} Gi\xE1: [gi\xE1 th\u1EF1c t\u1EBF t\u1EEB \u1EA3nh]
\u2B50 \u0110\xE1nh gi\xE1: [s\u1ED1 sao] ([s\u1ED1 l\u01B0\u1EE3t \u0111\xE1nh gi\xE1])
\u{1F4E6} \u0110\xE3 b\xE1n: [s\u1ED1 l\u01B0\u1EE3ng]
\u{1F3EA} Shop: [t\xEAn shop + tr\u1EA1ng th\xE1i uy t\xEDn n\u1EBFu c\xF3]
\u{1F4CB} Th\xF4ng s\u1ED1 n\u1ED5i b\u1EADt: [ch\u1EA5t li\u1EC7u, k\xEDch th\u01B0\u1EDBc, m\xE0u s\u1EAFc, \u0111\u1EB7c \u0111i\u1EC3m...]
\u2705 \u01AFu \u0111i\u1EC3m: [li\u1EC7t k\xEA r\xF5 \xEDt nh\u1EA5t 3 \u0111i\u1EC3m]
\u274C Nh\u01B0\u1EE3c \u0111i\u1EC3m: [li\u1EC7t k\xEA r\xF5 \xEDt nh\u1EA5t 2 \u0111i\u1EC3m]
\u{1F3AF} \u0110i\u1EC3m t\u1ED5ng: [X/10]
   - Gi\xE1 c\u1EA3: [X/2]
   - Ch\u1EA5t l\u01B0\u1EE3ng/Th\xF4ng s\u1ED1: [X/3]
   - \u0110\xE1nh gi\xE1 ng\u01B0\u1EDDi mua: [X/2]
   - \u0110\u1ED9 uy t\xEDn shop: [X/1.5]
   - Gi\xE1 tr\u1ECB \u0111\u1ED3ng ti\u1EC1n: [X/1.5]

Sau khi ph\xE2n t\xEDch xong T\u1EA4T C\u1EA2 s\u1EA3n ph\u1EA9m, \u0111\u01B0a ra:

\u2501\u2501\u2501 B\u1EA2NG SO S\xC1NH NHANH \u2501\u2501\u2501
[So s\xE1nh c\xE1c ti\xEAu ch\xED ch\xEDnh gi\u1EEFa c\xE1c s\u1EA3n ph\u1EA9m d\u1EA1ng text]

\u2501\u2501\u2501 QUY\u1EBET \u0110\u1ECANH CU\u1ED0I C\xD9NG \u2501\u2501\u2501
\u{1F3C6} N\xEAn mua: [T\xEAn s\u1EA3n ph\u1EA9m c\u1EE5 th\u1EC3]
L\xFD do: [Gi\u1EA3i th\xEDch r\xF5 r\xE0ng t\u1EA1i sao ch\u1ECDn c\xE1i n\xE0y, kh\xF4ng ch\u1ECDn c\xE1i kia]
\u26A0\uFE0F L\u01B0u \xFD khi mua: [nh\u1EEFng \u0111i\u1EC1u c\u1EA7n ch\xFA \xFD nh\u01B0 size, m\xE0u, li\xEAn h\u1EC7 shop...]

QUAN TR\u1ECCNG:
- KH\xD4NG d\xF9ng markdown (#, ##, **, *, ---)
- Ch\u1EC9 d\xF9ng text thu\u1EA7n + emoji + \u2501 \u0111\u1EC3 trang tr\xED
- Ph\xE2n t\xEDch \u0110\u1EA6Y \u0110\u1EE6 t\u1EA5t c\u1EA3 s\u1EA3n ph\u1EA9m, KH\xD4NG c\u1EAFt ng\u1EAFn
- D\u1EF1a v\xE0o th\xF4ng tin TH\u1EF0C T\u1EBE t\u1EEB \u1EA3nh, kh\xF4ng b\u1ECBa
- Tr\u1EA3 l\u1EDDi b\u1EB1ng ti\u1EBFng Vi\u1EC7t`,s=await new Promise((c,r)=>{chrome.runtime.sendMessage({action:"call_claude",payload:{system:i,messages:[...chatHistory.slice(0,-1).slice(-6).map(o=>({role:o.role,content:o.content})),{role:"user",content:n}]}},o=>{o?.error?r(new Error(o.error)):c(o)})});a.remove(),addBotMessage(formatBotResponse(s.text)),chatHistory.push({role:"assistant",content:s.text}),saveChatHistory()}catch(n){a.remove(),addBotMessage(`\u274C L\u1ED7i: ${n.message}`)}finally{isLoading=!1,document.getElementById("btn-send").disabled=!1}}function formatBotResponse(t){return t.replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/\*(.+?)\*/g,"<em>$1</em>").replace(/\n\n/g,"<br><br>").replace(/\n/g,"<br>")}function addUserMessage(t){const e=document.getElementById("chat-messages"),a=document.createElement("div");a.className="msg user",a.innerHTML=`
    <div class="msg-avatar user-av">U</div>
    <div class="msg-bubble">${escHtml(t)}</div>
  `,e.appendChild(a),e.scrollTop=e.scrollHeight}function addBotMessage(t){const e=document.getElementById("chat-messages"),a=document.createElement("div");a.className="msg bot",a.innerHTML=`
    <div class="msg-avatar bot">S</div>
    <div class="msg-bubble">${t}</div>
  `,e.appendChild(a),e.scrollTop=e.scrollHeight}function showTyping(){const t=document.getElementById("chat-messages"),e=document.createElement("div");return e.className="msg bot",e.innerHTML=`
    <div class="msg-avatar bot">S</div>
    <div class="typing-indicator">
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    </div>
  `,t.appendChild(e),t.scrollTop=t.scrollHeight,e}async function loadSlots(){return new Promise(t=>{chrome.storage.local.get(["shopbot_slots"],e=>{slots=e.shopbot_slots||[],t()})})}async function saveSlots(){return new Promise(t=>{chrome.storage.local.set({shopbot_slots:slots},t)})}async function clearAllSlots(){if(!confirm("X\xF3a t\u1EA5t c\u1EA3 s\u1EA3n ph\u1EA9m \u0111\xE3 l\u01B0u?"))return;slots=[],await saveSlots(),renderSlots(),updateSlotCount(),await updateCurrentPageInfo(),window._imagesSentToAPI=!1,chatHistory=[],saveChatHistory();const t=document.getElementById("chat-messages");t.innerHTML="",addBotMessage("\u{1F5D1}\uFE0F \u0110\xE3 x\xF3a t\u1EA5t c\u1EA3 s\u1EA3n ph\u1EA9m v\xE0 l\u1ECBch s\u1EED chat. B\u1EA1n c\xF3 th\u1EC3 th\xEAm m\u1EDBi!")}function saveChatHistory(){const t=chatHistory.map(e=>({role:e.role,content:typeof e.content=="string"?e.content:"[\u1EA3nh s\u1EA3n ph\u1EA9m]"}));chrome.storage.local.set({shopbot_chat:t})}async function loadChatHistory(){return new Promise(t=>{chrome.storage.local.get(["shopbot_chat"],e=>{if(e.shopbot_chat&&e.shopbot_chat.length>0){chatHistory=e.shopbot_chat;const a=document.getElementById("chat-messages");a.innerHTML="",chatHistory.forEach(n=>{n.role==="user"?addUserMessage(n.content):addBotMessage(formatBotResponse(n.content))})}t()})})}function escHtml(t){return(t||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function sleep(t){return new Promise(e=>setTimeout(e,t))}
