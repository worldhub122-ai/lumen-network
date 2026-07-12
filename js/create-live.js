document.addEventListener('DOMContentLoaded', function(){

  /* Language init (dictionary + toggle logic live in js/i18n.js) */
  let currentLang = window.LumenI18n ? window.LumenI18n.initLanguageToggle() : 'en';
  document.addEventListener('lumen:language', (e)=>{ currentLang = e.detail.lang; paintCaption(); });

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
     START / END BROADCAST (front-end only — no backend wired up)
     ============================================================ */
  const stateWaiting = document.getElementById('stateWaiting');
  const stateLive = document.getElementById('stateLive');
  const startBtn = document.getElementById('startBtn');
  const endBtn = document.getElementById('endBtn');

  if(startBtn){
    startBtn.addEventListener('click', ()=>{
      const d = dict();
      startBtn.disabled = true;
      startBtn.querySelector('span').textContent = d.connectingLabel || 'Connecting…';
      setTimeout(()=>{
        startBtn.disabled = false;
        startBtn.querySelector('span').textContent = d.startBroadcastBtn || 'Start broadcast';
        stateWaiting.classList.remove('active');
        stateLive.classList.add('active');
      }, 900);
    });
  }

  if(endBtn){
    endBtn.addEventListener('click', ()=>{
      stateLive.classList.remove('active');
      stateWaiting.classList.add('active');
      showToast('This concept has no backend yet — nothing was streamed anywhere.');
    });
  }

});
