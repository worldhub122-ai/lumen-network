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
     OBJECTIVE CHIPS
     ============================================================ */
  const objectiveRow = document.getElementById('objectiveRow');
  let selectedObjective = 'awareness';
  if(objectiveRow){
    objectiveRow.querySelectorAll('.chip-option').forEach(chip=>{
      chip.addEventListener('click', ()=>{
        objectiveRow.querySelectorAll('.chip-option').forEach(c=>c.classList.remove('active'));
        chip.classList.add('active');
        selectedObjective = chip.dataset.objective;
      });
    });
  }

  /* ============================================================
     DROPZONE (ad creative upload + preview)
     ============================================================ */
  const MAX_MEDIA_MB = 25;
  const dropzone = document.getElementById('dropzone');
  const adMediaInput = document.getElementById('adMediaInput');
  const dropzoneDefaultHTML = dropzone ? dropzone.innerHTML : '';

  function showPreview(file){
    const isVideo = file.type.startsWith('video/');
    if(isVideo){
      const url = URL.createObjectURL(file);
      dropzone.innerHTML = `
        <video class="dropzone-preview" src="${url}" controls muted></video>
        <button type="button" class="dropzone-remove" id="dropzoneRemove" aria-label="Remove">
          <svg class="icon" style="width:15px;height:15px;"><use href="#i-x"/></svg>
        </button>`;
      dropzone.classList.add('has-preview');
      wireRemove();
    } else {
      const reader = new FileReader();
      reader.onload = (e)=>{
        dropzone.innerHTML = `
          <img class="dropzone-preview" src="${e.target.result}" alt="">
          <button type="button" class="dropzone-remove" id="dropzoneRemove" aria-label="Remove">
            <svg class="icon" style="width:15px;height:15px;"><use href="#i-x"/></svg>
          </button>`;
        dropzone.classList.add('has-preview');
        wireRemove();
      };
      reader.readAsDataURL(file);
    }
  }

  function wireRemove(){
    const removeBtn = document.getElementById('dropzoneRemove');
    if(removeBtn) removeBtn.addEventListener('click', (ev)=>{
      ev.preventDefault(); ev.stopPropagation();
      resetDropzone();
    });
  }

  function resetDropzone(){
    dropzone.classList.remove('has-preview');
    dropzone.innerHTML = dropzoneDefaultHTML;
    adMediaInput.value = '';
  }

  if(adMediaInput){
    adMediaInput.addEventListener('change', ()=>{
      const file = adMediaInput.files && adMediaInput.files[0];
      if(!file) return;
      if(file.size > MAX_MEDIA_MB * 1024 * 1024){
        showToast(dict().mediaTooLarge || 'That file is over 25MB — pick a smaller one.');
        adMediaInput.value = '';
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
  const form = document.getElementById('adForm');
  const submitBtn = document.getElementById('submitBtn');

  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      if(!form.reportValidity()) return;
      const d = dict();
      submitBtn.disabled = true;
      submitBtn.querySelector('span').textContent = d.submittingLabel || 'Submitting…';
      setTimeout(()=>{
        submitBtn.disabled = false;
        submitBtn.querySelector('span').textContent = d.adSubmitBtn || 'Submit for review';
        stateForm.classList.remove('active');
        stateDone.classList.add('active');
      }, 900);
    });
  }

});
