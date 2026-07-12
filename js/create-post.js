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
     DROPZONE (photo upload + preview)
     ============================================================ */
  const MAX_MEDIA_MB = 25;
  const dropzone = document.getElementById('dropzone');
  const photoInput = document.getElementById('photoInput');
  const dropzoneDefaultHTML = dropzone ? dropzone.innerHTML : '';
  let hasMedia = false;

  function showPreview(file){
    const reader = new FileReader();
    reader.onload = (e)=>{
      dropzone.classList.add('has-preview');
      dropzone.innerHTML = `
        <img class="dropzone-preview" src="${e.target.result}" alt="">
        <button type="button" class="dropzone-remove" id="dropzoneRemove" aria-label="Remove">
          <svg class="icon" style="width:15px;height:15px;"><use href="#i-x"/></svg>
        </button>`;
      document.getElementById('dropzoneRemove').addEventListener('click', (ev)=>{
        ev.preventDefault(); ev.stopPropagation();
        resetDropzone();
      });
      hasMedia = true;
    };
    reader.readAsDataURL(file);
  }

  function resetDropzone(){
    dropzone.classList.remove('has-preview');
    dropzone.innerHTML = dropzoneDefaultHTML;
    photoInput.value = '';
    hasMedia = false;
  }

  if(photoInput){
    photoInput.addEventListener('change', ()=>{
      const file = photoInput.files && photoInput.files[0];
      if(!file) return;
      if(file.size > MAX_MEDIA_MB * 1024 * 1024){
        showToast(dict().mediaTooLarge || 'That file is over 25MB — pick a smaller one.');
        photoInput.value = '';
        return;
      }
      showPreview(file);
    });
  }

  /* ============================================================
     FORM SUBMIT (front-end only — no backend wired up)
     ============================================================ */
  const stateForm = document.getElementById('stateForm');
  const stateDone = document.getElementById('stateDone');
  const form = document.getElementById('postForm');
  const submitBtn = document.getElementById('submitBtn');

  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      if(!form.reportValidity()) return;
      const d = dict();
      submitBtn.disabled = true;
      submitBtn.querySelector('span').textContent = d.postingLabel || 'Posting…';
      setTimeout(()=>{
        submitBtn.disabled = false;
        submitBtn.querySelector('span').textContent = d.postSubmitBtn || 'Post';
        stateForm.classList.remove('active');
        stateDone.classList.add('active');
      }, 900);
    });
  }

});
