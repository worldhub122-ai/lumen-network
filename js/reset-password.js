document.addEventListener('DOMContentLoaded', function(){

  /* Language init (dictionary + toggle logic live in js/i18n.js) */
  let currentLang = window.LumenI18n ? window.LumenI18n.initLanguageToggle() : 'en';
  document.addEventListener('lumen:language', (e)=>{ currentLang = e.detail.lang; paintCaption(); });

  function dict(){
    return (window.LumenI18n && window.LumenI18n.translations[currentLang]) || {};
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
     PASSWORD VISIBILITY TOGGLES
     ============================================================ */
  function wirePasswordToggle(inputId, toggleId){
    const input = document.getElementById(inputId);
    const toggle = document.getElementById(toggleId);
    if(!input || !toggle) return;
    toggle.addEventListener('click', ()=>{
      const d = dict();
      const showing = input.type === 'text';
      input.type = showing ? 'password' : 'text';
      toggle.setAttribute('aria-pressed', String(!showing));
      toggle.setAttribute('aria-label', showing ? (d.showPassword || 'Show password') : (d.hidePassword || 'Hide password'));
      toggle.querySelector('.i-eye').hidden = !showing;
      toggle.querySelector('.i-eye-off').hidden = showing;
      input.focus({ preventScroll:true });
    });
  }
  wirePasswordToggle('password', 'pwToggle');
  wirePasswordToggle('confirmPassword', 'pwToggle2');

  /* ============================================================
     PASSWORD MATCH VALIDATION
     ============================================================ */
  const pwField = document.getElementById('password');
  const confirmField = document.getElementById('confirmPassword');
  const confirmWrap = confirmField ? confirmField.closest('.field') : null;
  const mismatchMsg = document.getElementById('mismatchMsg');

  function checkMatch(){
    if(!pwField || !confirmField) return true;
    const matches = confirmField.value === '' || confirmField.value === pwField.value;
    if(confirmWrap) confirmWrap.classList.toggle('field-error', !matches);
    if(mismatchMsg) mismatchMsg.style.display = matches ? 'none' : 'block';
    return matches;
  }
  if(pwField) pwField.addEventListener('input', checkMatch);
  if(confirmField) confirmField.addEventListener('input', checkMatch);

  /* ============================================================
     STATE SWITCHING + FORM SUBMIT (front-end only)
     ============================================================ */
  const stateForm = document.getElementById('stateForm');
  const stateDone = document.getElementById('stateDone');
  const form = document.getElementById('resetForm');
  const submitBtn = document.getElementById('submitBtn');

  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      if(!form.reportValidity()) return;
      if(pwField.value !== confirmField.value){
        if(confirmWrap) confirmWrap.classList.add('field-error');
        if(mismatchMsg) mismatchMsg.style.display = 'block';
        confirmField.focus();
        return;
      }
      const d = dict();
      submitBtn.disabled = true;
      submitBtn.querySelector('span').textContent = d.resettingPassword || 'Resetting…';
      setTimeout(()=>{
        submitBtn.disabled = false;
        submitBtn.querySelector('span').textContent = d.resetPasswordBtn || 'Reset password';
        stateForm.classList.remove('active');
        stateDone.classList.add('active');
      }, 900);
    });
  }

});
