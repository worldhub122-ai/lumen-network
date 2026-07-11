document.addEventListener('DOMContentLoaded', function(){

  /* Language init (dictionary + toggle logic live in js/i18n.js) */
  let currentLang = window.LumenI18n ? window.LumenI18n.initLanguageToggle() : 'en';
  document.addEventListener('lumen:language', (e)=>{ currentLang = e.detail.lang; paintCaption(); paintResend(); });

  function dict(){
    return (window.LumenI18n && window.LumenI18n.translations[currentLang]) || {};
  }

  /* ============================================================
     TOAST
     ============================================================ */
  function showToast(msg){
    const stack = document.getElementById('toastStack');
    if(!stack) return;
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    stack.appendChild(t);
    setTimeout(()=>{
      t.classList.add('leaving');
      setTimeout(()=> t.remove(), 260);
    }, 2200);
  }

  /* ============================================================
     RATING BADGE + ROTATING SCENE CAPTIONS (shared brand moment)
     ============================================================ */
  function meterMarkup(rating, size){
    const r = 15, c = 2*Math.PI*r;
    const dash = (Math.min(rating,5)/5) * c;
    return `<svg class="meter" viewBox="0 0 36 36" width="${size}" height="${size}">
      <circle class="meter-track" cx="18" cy="18" r="${r}"></circle>
      <circle class="meter-fill" cx="18" cy="18" r="${r}" stroke-dasharray="${dash.toFixed(1)} ${c.toFixed(1)}"></circle>
      <text x="18" y="21" class="meter-text">${rating.toFixed(1)}</text>
    </svg>`;
  }
  const sceneMeter = document.getElementById('sceneMeter');
  if(sceneMeter) sceneMeter.innerHTML = meterMarkup(4.8, 46);

  const captionKeys = ['caption1','caption2','caption3'];
  let captionIndex = 0;
  const captionEl = document.getElementById('sceneCaption');
  const indexEl = document.getElementById('sceneIndex');

  function paintCaption(){
    const d = dict();
    if(captionEl && d[captionKeys[captionIndex]]) captionEl.textContent = d[captionKeys[captionIndex]];
    if(indexEl) indexEl.textContent = `0${captionIndex+1} / 0${captionKeys.length}`;
  }
  paintCaption();

  setInterval(()=>{
    if(!captionEl) return;
    captionEl.style.opacity = '0';
    captionEl.style.transform = 'translateY(4px)';
    setTimeout(()=>{
      captionIndex = (captionIndex + 1) % captionKeys.length;
      paintCaption();
      captionEl.style.opacity = '1';
      captionEl.style.transform = 'translateY(0)';
    }, 380);
  }, 4600);

  /* ============================================================
     RESEND COOLDOWN
     ============================================================ */
  const resendBtn = document.getElementById('resendBtn');
  let cooldownRemaining = 0;
  let cooldownTimer = null;

  function paintResend(){
    if(!resendBtn) return;
    const d = dict();
    if(cooldownRemaining > 0){
      const mm = Math.floor(cooldownRemaining/60);
      const ss = String(cooldownRemaining%60).padStart(2,'0');
      resendBtn.textContent = `${d.resendIn || 'Resend in'} ${mm}:${ss}`;
      resendBtn.disabled = true;
    } else {
      resendBtn.textContent = d.resendEmail || 'Resend email';
      resendBtn.disabled = false;
    }
  }

  function startCooldown(){
    cooldownRemaining = 30;
    paintResend();
    clearInterval(cooldownTimer);
    cooldownTimer = setInterval(()=>{
      cooldownRemaining -= 1;
      if(cooldownRemaining <= 0){
        cooldownRemaining = 0;
        clearInterval(cooldownTimer);
      }
      paintResend();
    }, 1000);
  }

  if(resendBtn){
    resendBtn.addEventListener('click', ()=>{
      if(resendBtn.disabled) return;
      showToast('This concept has no backend yet — nothing was sent anywhere.');
      startCooldown();
    });
  }

  /* ============================================================
     SIMULATED VERIFICATION (demo-only, no backend)
     ============================================================ */
  const stateWaiting = document.getElementById('stateWaiting');
  const stateVerified = document.getElementById('stateVerified');
  const simulateBtn = document.getElementById('simulateBtn');

  if(simulateBtn){
    simulateBtn.addEventListener('click', ()=>{
      const d = dict();
      simulateBtn.disabled = true;
      setTimeout(()=>{
        simulateBtn.disabled = false;
        stateWaiting.classList.remove('active');
        stateVerified.classList.add('active');
      }, 700);
    });
  }

});
