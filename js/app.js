document.addEventListener('DOMContentLoaded', function(){
/* Language init (dictionary + toggle logic live in js/i18n.js) */
let currentLang = window.LumenI18n ? window.LumenI18n.initLanguageToggle() : 'en';
function dict(){ return (window.LumenI18n && window.LumenI18n.translations[currentLang]) || {}; }
document.addEventListener('lumen:language', (e)=>{
  currentLang = e.detail.lang;
  renderNotifications();
  renderConvList();
  renderThread();
});

/* ============================================================
   DATA
   ============================================================ */
const stories = [
  { id:'s0', self:true, name:'You' },
  { id:'s1', name:'Nina', grad:'grad-2', rating:4.6 },
  { id:'s2', name:'Theo', grad:'grad-4', rating:4.1 },
  { id:'s3', name:'Elin', grad:'grad-3', rating:4.8, caption:'Homemade goodness, shot on Portra 400.', followers:'1.5k followers' },
  { id:'s4', name:'Marcus', grad:'grad-5', rating:3.9 },
  { id:'s5', name:'Priya', grad:'grad-6', rating:4.9 },
];

const posts = [
  {
    id:'p1', name:'Naomi Cole', grad:'grad-1', rating:4.8, time:'1h', gradient:'linear-gradient(150deg,#e8b458 0%,#c9793f 45%,#6f4630 100%)',
    tags:['#Portrait','#GoldenHour'], caption:'Chasing light before it disappears.',
    likes:1672, dislikes:232, comments:324, liked:false, disliked:false, saved:false,
    likedBy:['timur.kzb','and 651 others']
  },
  {
    id:'p2', name:'Theo Marsh', grad:'grad-2', rating:4.2, time:'5h', gradient:'linear-gradient(150deg,#d8d8d2 0%,#8b8f8a 45%,#2b2c28 100%)',
    tags:['#Street','#Monochrome'], caption:'Six a.m., the city still half-asleep.',
    likes:980, dislikes:34, comments:120, liked:false, disliked:false, saved:false,
    likedBy:['aya.mokhtar','and 214 others']
  },
  {
    id:'p3', name:'Priya Nair', grad:'grad-6', rating:4.9, time:'1d', gradient:'linear-gradient(150deg,#f0dca0 0%,#c9a35a 45%,#5a3f24 100%)',
    tags:['#StillLife','#Film'], caption:'Grain, glass, and morning light.',
    likes:2210, dislikes:18, comments:402, liked:false, disliked:false, saved:false,
    likedBy:['ken.d','and 908 others']
  },
];

const gallery = [
  { id:'g1', grad:'linear-gradient(150deg,#e9b154,#a95a2c)', rating:4.8, likes:'2.1k', locked:false },
  { id:'g2', grad:'linear-gradient(150deg,#cfd6d1,#6b756e)', rating:3.6, likes:467, locked:false },
  { id:'g3', grad:'linear-gradient(150deg,#3c3c38,#161615)', rating:4.2, likes:0, locked:true },
  { id:'g4', grad:'linear-gradient(150deg,#7c9bc7,#2d4468)', rating:4.4, likes:512, locked:false },
  { id:'g5', grad:'linear-gradient(150deg,#c9a3c1,#6b3d63)', rating:4.0, likes:340, locked:false },
  { id:'g6', grad:'linear-gradient(150deg,#e0d089,#8a6a2c)', rating:4.7, likes:1230, locked:false },
];

const tagCounts = [
  { tag:'#Portrait', count:18 }, { tag:'#GoldenHour', count:9 }, { tag:'#Documentary', count:14 },
  { tag:'#Film', count:22 }, { tag:'#StreetLife', count:7 }, { tag:'#Analog', count:11 },
];

const topRated = [
  { name:'Priya Nair', grad:'grad-6', rating:4.9, cat:'Still life' },
  { name:'Elin Vos', grad:'grad-3', rating:4.8, cat:'Portrait' },
  { name:'Naomi Cole', grad:'grad-1', rating:4.8, cat:'Golden hour' },
];

const suggestions = [
  { name:'Marcus Idun', grad:'grad-5', cat:'Landscape', following:false },
  { name:'Aya Mokhtar', grad:'grad-4', cat:'Documentary', following:false },
  { name:'Ken Duarte', grad:'grad-2', cat:'Street', following:true },
];

const notifications = [
  { id:'n1', type:'like', name:'Nina Solberg', grad:'grad-2', text:'liked your photo', target:'“Chasing light before it disappears.”', time:'12m', unread:true },
  { id:'n2', type:'comment', name:'Theo Marsh', grad:'grad-4', text:'commented: “That grain is gorgeous.”', time:'48m', unread:true },
  { id:'n3', type:'follow', name:'Aya Mokhtar', grad:'grad-5', text:'started following you', time:'2h', unread:true, followState:false },
  { id:'n4', type:'rating', name:null, text:'Your photo crossed a 4.8 rating — nice work.', time:'5h', unread:false },
  { id:'n5', type:'like', name:'Priya Nair', grad:'grad-6', text:'liked your photo', target:'“Six a.m., the city still half-asleep.”', time:'1d', unread:false },
  { id:'n6', type:'comment', name:'Marcus Idun', grad:'grad-5', text:'commented: “Where was this shot?”', time:'2d', unread:false },
  { id:'n7', type:'follow', name:'Ken Duarte', grad:'grad-2', text:'started following you', time:'4d', unread:false, followState:true },
];

const conversations = [
  { id:'c1', name:'Nina Solberg', grad:'grad-2', unread:2,
    messages:[
      { from:'them', text:'Hey! That golden hour shot is incredible.', time:'10:02' },
      { from:'me', text:'Thank you! Shot it on the rooftop near the harbor.', time:'10:05' },
      { from:'them', text:'Loved the low light on this one!', time:'10:07' },
    ] },
  { id:'c2', name:'Theo Marsh', grad:'grad-4', unread:0,
    messages:[
      { from:'them', text:'Where was the street series shot?', time:'Yesterday' },
      { from:'me', text:'Old town, mostly around 6am before the crowds.', time:'Yesterday' },
    ] },
  { id:'c3', name:'Elin Vos', grad:'grad-3', unread:0,
    messages:[
      { from:'me', text:'Your still-life set this week was beautiful.', time:'Mon' },
      { from:'them', text:'That means a lot, thank you 🙏', time:'Mon' },
    ] },
  { id:'c4', name:'Priya Nair', grad:'grad-6', unread:1,
    messages:[
      { from:'them', text:'Are you free to collaborate on a shoot next month?', time:'Sun' },
    ] },
];

/* ============================================================
   HELPERS
   ============================================================ */
function meterMarkup(rating, size, extraClass){
  const r = 15, c = 2*Math.PI*r;
  const dash = (Math.min(rating,5)/5) * c;
  return `<svg class="meter ${extraClass||''}" viewBox="0 0 36 36" width="${size}" height="${size}">
    <circle class="meter-track" cx="18" cy="18" r="${r}"></circle>
    <circle class="meter-fill" cx="18" cy="18" r="${r}" stroke-dasharray="${dash.toFixed(1)} ${c.toFixed(1)}"></circle>
    <text x="18" y="21" class="meter-text">${rating.toFixed(1)}</text>
  </svg>`;
}
function setMeterEl(svgEl, rating){
  const r = 15, c = 2*Math.PI*r;
  const dash = (Math.min(rating,5)/5) * c;
  svgEl.querySelector('.meter-fill').setAttribute('stroke-dasharray', `${dash.toFixed(1)} ${c.toFixed(1)}`);
  svgEl.querySelector('.meter-text').textContent = rating.toFixed(1);
}
function escapeHtml(str){
  return String(str).replace(/[&<>"']/g, ch => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[ch]));
}
function fmt(n){
  if(typeof n !== 'number') return n;
  return n >= 1000 ? (n/1000).toFixed(n % 1000 === 0 ? 0 : 1)+'k' : String(n);
}
function bytesToSize(bytes){
  if(bytes === undefined || bytes === null) return '';
  const units = ['B','KB','MB','GB'];
  let n = bytes, i = 0;
  while(n >= 1024 && i < units.length - 1){ n /= 1024; i++; }
  return `${n.toFixed(i > 0 && n < 10 ? 1 : 0)} ${units[i]}`;
}
function formatDuration(totalSeconds){
  const sec = Math.max(0, Math.floor(totalSeconds || 0));
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2,'0')}`;
}
function showToast(msg){
  const stack = document.getElementById('toastStack');
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
   RENDER: STORIES
   ============================================================ */
const storiesRail = document.getElementById('storiesRail');
storiesRail.innerHTML = stories.map(s=>{
  if(s.self){
    return `<button class="story-chip" data-action="toast" data-msg="Add to your story…">
      <div class="story-ring self"><div class="avatar plus"><svg class="icon"><use href="#i-plus"/></svg></div></div>
      <span>You</span></button>`;
  }
  const ringClass = s.rating >= 4.5 ? 'rated' : '';
  return `<button class="story-chip" data-story="${s.id}">
    <div class="story-ring ${ringClass}"><div class="avatar ${s.grad}"></div></div>
    <span>${s.name}</span></button>`;
}).join('');

/* ============================================================
   RENDER: POSTS
   ============================================================ */
const postsList = document.getElementById('postsList');
function renderPosts(){
  postsList.innerHTML = posts.map(p=>`
    <article class="post" data-post="${p.id}">
      <div class="post-head">
        <div class="post-who">
          <div class="avatar ${p.grad}" style="width:38px;height:38px;"></div>
          <div><b>${p.name}</b><div class="meta">Rated by the community</div></div>
        </div>
        <button class="post-more" data-action="toast" data-msg="Post options…"><svg class="icon"><use href="#i-more"/></svg></button>
      </div>
      <div class="post-media" style="background:${p.gradient};">
        <div class="meter-wrap meter-badge">${meterMarkup(p.rating, 44)}</div>
      </div>
      <div class="post-tags">${p.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
      <div class="post-caption">${p.caption}</div>
      <div class="post-actions">
        <div class="left">
          <button class="react-btn like ${p.liked?'on':''}" data-react="like" data-post="${p.id}">
            <svg class="icon"><use href="#i-heart"/></svg><span>${fmt(p.likes)}</span></button>
          <button class="react-btn dislike ${p.disliked?'on':''}" data-react="dislike" data-post="${p.id}">
            <svg class="icon"><use href="#i-thumbs-down"/></svg><span>${fmt(p.dislikes)}</span></button>
          <button class="react-btn" data-action="toast" data-msg="Comments opening…">
            <svg class="icon"><use href="#i-comment"/></svg><span>${fmt(p.comments)}</span></button>
        </div>
        <div class="right" style="display:flex; align-items:center; gap:10px;">
          <button class="react-btn save ${p.saved?'on':''}" data-react="save" data-post="${p.id}" style="padding:7px;">
            <svg class="icon"><use href="#i-bookmark"/></svg></button>
          <span class="post-time">${p.time} ago</span>
        </div>
      </div>
      <div class="post-likes">
        <div class="mini-stack"><div class="avatar grad-1" style="width:20px;height:20px;"></div><div class="avatar grad-2" style="width:20px;height:20px;"></div><div class="avatar grad-3" style="width:20px;height:20px;"></div></div>
        <span>Liked by ${p.likedBy[0]} ${p.likedBy[1]}</span>
      </div>
    </article>
  `).join('');
  observePosts();
}
renderPosts();

/* like / dislike / save reactions (event delegation) */
document.body.addEventListener('click', (e)=>{
  const btn = e.target.closest('[data-react]');
  if(!btn) return;
  const id = btn.dataset.post;
  const kind = btn.dataset.react;
  const p = posts.find(x=>x.id===id);
  if(!p) return;
  if(kind==='like'){
    if(p.liked){ p.liked=false; p.likes--; }
    else{ p.liked=true; p.likes++; if(p.disliked){ p.disliked=false; p.dislikes--; } }
  } else if(kind==='dislike'){
    if(p.disliked){ p.disliked=false; p.dislikes--; }
    else{ p.disliked=true; p.dislikes++; if(p.liked){ p.liked=false; p.likes--; } }
  } else if(kind==='save'){
    p.saved = !p.saved;
    showToast(p.saved ? 'Saved to your collection' : 'Removed from collection');
  }
  renderPosts();
});

/* fade-in on scroll */
function observePosts(){
  const items = document.querySelectorAll('.post');
  if(!('IntersectionObserver' in window)){ items.forEach(i=>i.classList.add('in-view')); return; }
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('in-view'); io.unobserve(en.target); } });
  }, { threshold:.15 });
  items.forEach(i=> io.observe(i));
}

/* ============================================================
   RENDER: SIDEBAR
   ============================================================ */
document.getElementById('topRatedList').innerHTML = topRated.map(r=>`
  <div class="rank-row">
    <div class="avatar ${r.grad}" style="width:34px;height:34px;"></div>
    <div class="who"><b>${r.name}</b><div class="cat">${r.cat}</div></div>
    ${meterMarkup(r.rating, 32, 'on-light')}
  </div>`).join('');

const suggestList = document.getElementById('suggestList');
function renderSuggestions(){
  suggestList.innerHTML = suggestions.map((s,i)=>`
    <div class="suggest-row">
      <div class="avatar ${s.grad}" style="width:36px;height:36px;"></div>
      <div class="who"><b>${s.name}</b><div class="cat">${s.cat}</div></div>
      <button class="follow-btn ${s.following?'following':''}" data-suggest-follow="${i}">${s.following?'Following':'Follow'}</button>
    </div>`).join('');
}
renderSuggestions();
suggestList.addEventListener('click',(e)=>{
  const btn = e.target.closest('[data-suggest-follow]');
  if(!btn) return;
  const i = +btn.dataset.suggestFollow;
  suggestions[i].following = !suggestions[i].following;
  showToast(suggestions[i].following ? `Following ${suggestions[i].name}` : `Unfollowed ${suggestions[i].name}`);
  renderSuggestions();
});

/* profile self-follow button */
document.querySelector('[data-follow="self"]').addEventListener('click', (e)=>{
  const btn = e.currentTarget;
  const on = btn.classList.toggle('following');
  btn.textContent = on ? 'Following' : 'Follow';
  showToast(on ? 'Following Sami Okafor' : 'Unfollowed Sami Okafor');
});

/* ============================================================
   RENDER: PROFILE GALLERY + TAGS
   ============================================================ */
document.getElementById('galleryPanel').innerHTML = gallery.map(g=>`
  <div class="g-tile ${g.locked?'locked':''}" style="background:${g.grad};">
    <div class="meter-wrap meter-badge">${meterMarkup(g.rating, 34)}</div>
    ${g.locked ? `
      <div class="lock-veil">
        <svg class="icon"><use href="#i-lock"/></svg>
        <span>Full resolution is a member preview</span>
        <button class="unlock-btn" data-unlock>Notify me</button>
      </div>` : `
      <div class="g-foot"><div class="mini-stack"><div class="avatar grad-2"></div><div class="avatar grad-4"></div></div>Liked by ${fmt(g.likes)}</div>`}
  </div>
`).join('');

document.getElementById('tagsPanel').innerHTML = tagCounts.map(t=>`
  <div class="tag-chip">${t.tag} <span>${t.count}</span></div>`).join('');

document.body.addEventListener('click', (e)=>{
  if(e.target.closest('[data-unlock]')){
    showToast('We’ll notify you when this preview unlocks.');
  }
});

/* ============================================================
   RENDER: NOTIFICATIONS
   ============================================================ */
const notifIconMap = { like:'i-heart', comment:'i-comment', follow:'i-user', rating:'i-aperture' };

function notifRow(n){
  const followLabel = n.followState ? 'Following' : (dict().followBack || 'Follow back');
  const rightControl = n.type === 'follow'
    ? `<button class="follow-btn small ${n.followState ? 'following':''}" data-notif-follow="${n.id}">${followLabel}</button>`
    : (n.unread ? `<span class="notif-dot"></span>` : '');

  const avatar = n.grad
    ? `<div class="avatar ${n.grad}" style="width:42px;height:42px;"></div>`
    : `<div class="notif-icon-circle"><svg class="icon"><use href="#${notifIconMap[n.type]}"/></svg></div>`;

  return `<div class="notif-row ${n.unread ? 'unread':''}" data-notif="${n.id}">
    ${avatar}
    <div class="notif-body">
      <p>${n.name ? `<b>${n.name}</b> ` : ''}${n.text}${n.target ? ` <span class="notif-target">${n.target}</span>` : ''}</p>
      <span class="notif-time">${n.time} ago</span>
    </div>
    ${rightControl}
  </div>`;
}

function renderNotifications(){
  const unread = notifications.filter(n=>n.unread);
  const read = notifications.filter(n=>!n.unread);
  const newGroup = document.getElementById('notifNewGroup');
  const earlierGroup = document.getElementById('notifEarlierGroup');
  const newList = document.getElementById('notifNewList');
  const earlierList = document.getElementById('notifEarlierList');

  newGroup.style.display = unread.length ? '' : 'none';
  newList.innerHTML = unread.map(notifRow).join('');
  earlierGroup.style.display = read.length ? '' : 'none';
  earlierList.innerHTML = read.length ? read.map(notifRow).join('')
    : `<div class="notif-empty" data-i18n="noNotifications">${dict().noNotifications || 'No notifications yet'}</div>`;

  updateNotifBadge();
}

function updateNotifBadge(){
  const count = notifications.filter(n=>n.unread).length;
  const badge = document.getElementById('notifBadge');
  const markAllBtn = document.getElementById('markAllReadBtn');
  if(badge){ badge.hidden = count === 0; badge.textContent = count > 9 ? '9+' : String(count); }
  if(markAllBtn) markAllBtn.disabled = count === 0;
}

document.getElementById('notifNewList').addEventListener('click', handleNotifClick);
document.getElementById('notifEarlierList').addEventListener('click', handleNotifClick);
function handleNotifClick(e){
  const followBtn = e.target.closest('[data-notif-follow]');
  if(followBtn){
    const n = notifications.find(x=>x.id === followBtn.dataset.notifFollow);
    if(n){
      n.followState = !n.followState;
      showToast(n.followState ? `Following ${n.name}` : `Unfollowed ${n.name}`);
      renderNotifications();
    }
    return;
  }
  const row = e.target.closest('.notif-row');
  if(row && row.classList.contains('unread')){
    const n = notifications.find(x=>x.id === row.dataset.notif);
    if(n){ n.unread = false; renderNotifications(); }
  }
}

document.getElementById('markAllReadBtn').addEventListener('click', ()=>{
  notifications.forEach(n=> n.unread = false);
  renderNotifications();
});

renderNotifications();

/* ============================================================
   RENDER: MESSAGES
   ============================================================ */
let activeConversationId = null;

function convPreviewText(last){
  if(!last) return '';
  const d = dict();
  if(!last.type || last.type === 'text'){
    return escapeHtml(last.from === 'me' ? `You: ${last.text}` : last.text);
  }
  const labels = {
    image: `\u{1F4F7} ${d.previewPhoto || 'Photo'}`,
    video: `\u{1F3A5} ${d.previewVideo || 'Video'}`,
    voice: `\u{1F3A4} ${d.previewVoice || 'Voice message'}`,
    file: `\u{1F4CE} ${last.fileName || ''}`
  };
  const label = labels[last.type] || '';
  return escapeHtml(last.from === 'me' ? `You: ${label}` : label);
}

function renderConvList(){
  const list = document.getElementById('msgList');
  if(!conversations.length){
    list.innerHTML = `<div class="notif-empty" data-i18n="noConversations">${dict().noConversations || 'No conversations yet'}</div>`;
    return;
  }
  list.innerHTML = conversations.map(c=>{
    const last = c.messages[c.messages.length - 1];
    const preview = convPreviewText(last);
    return `<button class="msg-row ${c.unread ? 'unread':''} ${c.id === activeConversationId ? 'active':''}" data-conv="${c.id}">
      <div class="avatar ${c.grad}"></div>
      <div class="msg-row-body">
        <div class="msg-row-top"><b>${c.name}</b><span>${last ? last.time : ''}</span></div>
        <div class="msg-row-preview">${preview}</div>
      </div>
      ${c.unread ? '<span class="msg-row-dot"></span>' : ''}
    </button>`;
  }).join('');
}

function updateMsgBadge(){
  const count = conversations.filter(c=>c.unread > 0).length;
  const badge = document.getElementById('msgBadge');
  if(badge){ badge.hidden = count === 0; badge.textContent = count > 9 ? '9+' : String(count); }
}

function voiceWaveBars(){
  let bars = '';
  for(let i=0;i<20;i++){
    const h = 22 + Math.round(Math.abs(Math.sin(i*1.7)) * 60);
    bars += `<span style="height:${h}%"></span>`;
  }
  return bars;
}

function bubbleContent(m){
  const d = dict();
  if(m.type === 'image'){
    return `<div class="msg-media-wrap"><img src="${m.src}" class="msg-media-img" alt="" loading="lazy"></div><span class="msg-bubble-time">${m.time}</span>`;
  }
  if(m.type === 'video'){
    return `<div class="msg-media-wrap"><video src="${m.src}" class="msg-media-video" controls preload="metadata"></video></div><span class="msg-bubble-time">${m.time}</span>`;
  }
  if(m.type === 'file'){
    const ext = (m.fileName || '').split('.').pop().slice(0,4).toUpperCase();
    return `<div class="msg-file">
        <div class="msg-file-icon"><svg class="icon"><use href="#i-file"/></svg><span class="msg-file-ext">${escapeHtml(ext)}</span></div>
        <div class="msg-file-info"><b>${escapeHtml(m.fileName||'')}</b><span>${bytesToSize(m.fileSize)}</span></div>
        <a class="msg-file-download" href="${m.src}" download="${escapeHtml(m.fileName||'')}" aria-label="${d.download || 'Download'}"><svg class="icon"><use href="#i-download"/></svg></a>
      </div><span class="msg-bubble-time">${m.time}</span>`;
  }
  if(m.type === 'voice'){
    const audioId = m._audioId || (m._audioId = 'voice_' + Math.random().toString(36).slice(2,9));
    return `<div class="msg-voice">
        <audio src="${m.src}" preload="metadata" id="${audioId}"></audio>
        <button type="button" class="voice-play-btn" data-play="${audioId}">
          <svg class="icon i-play-icon"><use href="#i-play"/></svg>
          <svg class="icon i-pause-icon" hidden><use href="#i-pause"/></svg>
        </button>
        <div class="voice-wave">${voiceWaveBars()}</div>
        <span class="voice-duration">${formatDuration(m.duration)}</span>
      </div><span class="msg-bubble-time">${m.time}</span>`;
  }
  return `${escapeHtml(m.text)}<span class="msg-bubble-time">${m.time}</span>`;
}

function renderThread(){
  const c = conversations.find(x=>x.id === activeConversationId);
  const emptyState = document.getElementById('msgEmptyState');
  const thread = document.getElementById('msgThread');
  if(!c){
    emptyState.hidden = false;
    thread.hidden = true;
    return;
  }
  emptyState.hidden = true;
  thread.hidden = false;
  document.getElementById('threadAvatar').className = 'avatar ' + c.grad;
  document.getElementById('threadName').textContent = c.name;
  const bubbles = document.getElementById('msgBubbles');
  bubbles.innerHTML = c.messages.map(m=>{
    const isMedia = m.type && m.type !== 'text';
    return `<div class="msg-bubble ${m.from}${isMedia ? ' msg-bubble-media' : ''}">${bubbleContent(m)}</div>`;
  }).join('');
  bubbles.querySelectorAll('audio').forEach(audio=>{
    audio.addEventListener('ended', ()=>{
      const btn = bubbles.querySelector(`[data-play="${audio.id}"]`);
      if(btn){ btn.querySelector('.i-play-icon').hidden = false; btn.querySelector('.i-pause-icon').hidden = true; }
    });
  });
  bubbles.scrollTop = bubbles.scrollHeight;
}

function openLightbox(src){
  let overlay = document.getElementById('mediaLightbox');
  if(!overlay){
    overlay = document.createElement('div');
    overlay.id = 'mediaLightbox';
    overlay.className = 'media-lightbox';
    overlay.innerHTML = `<button type="button" class="circle-btn media-lightbox-close" aria-label="Close"><svg class="icon"><use href="#i-x"/></svg></button><img src="" alt="">`;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', (e)=>{
      if(e.target === overlay || e.target.closest('.media-lightbox-close')) overlay.classList.remove('active');
    });
  }
  const d = dict();
  overlay.querySelector('.media-lightbox-close').setAttribute('aria-label', d.close || 'Close');
  overlay.querySelector('img').src = src;
  overlay.classList.add('active');
}

document.getElementById('msgBubbles').addEventListener('click', (e)=>{
  const playBtn = e.target.closest('[data-play]');
  if(playBtn){
    const audio = document.getElementById(playBtn.dataset.play);
    if(!audio) return;
    document.querySelectorAll('#msgBubbles audio').forEach(a=>{ if(a !== audio){ a.pause(); a.currentTime = 0; } });
    document.querySelectorAll('#msgBubbles .voice-play-btn').forEach(b=>{
      if(b !== playBtn){ b.querySelector('.i-play-icon').hidden = false; b.querySelector('.i-pause-icon').hidden = true; }
    });
    if(audio.paused){
      audio.play().catch(()=>{ showToast(dict().micUnsupported || 'Playback isn\u2019t available.'); });
      playBtn.querySelector('.i-play-icon').hidden = true;
      playBtn.querySelector('.i-pause-icon').hidden = false;
    } else {
      audio.pause();
      playBtn.querySelector('.i-play-icon').hidden = false;
      playBtn.querySelector('.i-pause-icon').hidden = true;
    }
    return;
  }
  const img = e.target.closest('.msg-media-img');
  if(img){ openLightbox(img.src); }
});

function openConversation(id){
  if(mediaRecorder && mediaRecorder.state === 'recording') cancelActiveRecording();
  activeConversationId = id;
  const c = conversations.find(x=>x.id === id);
  if(c) c.unread = 0;
  document.querySelector('.msg-layout').classList.add('thread-open');
  renderConvList();
  renderThread();
  updateMsgBadge();
}

document.getElementById('msgList').addEventListener('click', (e)=>{
  const row = e.target.closest('[data-conv]');
  if(row) openConversation(row.dataset.conv);
});

document.getElementById('msgBackBtn').addEventListener('click', ()=>{
  document.querySelector('.msg-layout').classList.remove('thread-open');
});

const msgComposer = document.getElementById('msgComposer');
const msgInput = document.getElementById('msgInput');
const sendBtn = document.getElementById('sendBtn');
const micBtn = document.getElementById('micBtn');
const cancelRecordBtn = document.getElementById('cancelRecordBtn');
const recordingTimeEl = document.getElementById('recordingTime');
const attachBtn = document.getElementById('attachBtn');
const attachMenu = document.getElementById('attachMenu');
const mediaInput = document.getElementById('mediaInput');
const fileInput = document.getElementById('fileInput');
const MAX_CHAT_FILE_MB = 25;

const canedReplies = [
  'That framing is gorgeous — what lens did you use?',
  'Noted, thank you!',
  'Sounds good, let\u2019s make it happen.',
  'Haha, exactly.',
];

function queueCannedReply(convId){
  setTimeout(()=>{
    const c = conversations.find(x=>x.id === convId);
    if(!c || activeConversationId !== convId) return;
    c.messages.push({ from:'them', type:'text', text: canedReplies[Math.floor(Math.random()*canedReplies.length)], time:'Now' });
    renderThread();
    renderConvList();
  }, 1200);
}

function sendChatMessage(payload){
  const c = conversations.find(x=>x.id === activeConversationId);
  if(!c) return;
  c.messages.push(Object.assign({ from:'me', time:'Now' }, payload));
  renderThread();
  renderConvList();
  queueCannedReply(c.id);
}

/* ---- text send / mic-send button toggle ---- */
function updateComposerButtons(){
  const hasText = msgInput.value.trim().length > 0;
  sendBtn.hidden = !hasText;
  micBtn.hidden = hasText;
}
msgInput.addEventListener('input', updateComposerButtons);
updateComposerButtons();

msgComposer.addEventListener('submit', (e)=>{
  e.preventDefault();
  const text = msgInput.value.trim();
  if(!text || !activeConversationId) return;
  msgInput.value = '';
  updateComposerButtons();
  sendChatMessage({ type:'text', text });
});

/* ============================================================
   ATTACH MENU (photo/video + document)
   ============================================================ */
attachBtn.addEventListener('click', (e)=>{
  e.stopPropagation();
  attachMenu.hidden = !attachMenu.hidden;
});
document.addEventListener('click', (e)=>{
  if(!attachMenu.hidden && !attachMenu.contains(e.target) && e.target !== attachBtn){
    attachMenu.hidden = true;
  }
});
attachMenu.querySelectorAll('[data-attach]').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    attachMenu.hidden = true;
    if(!activeConversationId){ showToast(dict().noConversation || 'Pick a conversation first.'); return; }
    if(btn.dataset.attach === 'media') mediaInput.click();
    else fileInput.click();
  });
});

function handleSelectedMedia(file){
  if(file.size > MAX_CHAT_FILE_MB * 1024 * 1024){
    showToast(dict().fileTooLargeChat || 'That file is over 25MB — pick a smaller one.');
    return;
  }
  const url = URL.createObjectURL(file);
  const isVideo = file.type.startsWith('video/');
  sendChatMessage({ type: isVideo ? 'video' : 'image', src:url, fileName:file.name });
}
function handleSelectedFile(file){
  if(file.size > MAX_CHAT_FILE_MB * 1024 * 1024){
    showToast(dict().fileTooLargeChat || 'That file is over 25MB — pick a smaller one.');
    return;
  }
  const url = URL.createObjectURL(file);
  sendChatMessage({ type:'file', src:url, fileName:file.name, fileSize:file.size });
}
mediaInput.addEventListener('change', ()=>{
  Array.from(mediaInput.files || []).forEach(handleSelectedMedia);
  mediaInput.value = '';
});
fileInput.addEventListener('change', ()=>{
  Array.from(fileInput.files || []).forEach(handleSelectedFile);
  fileInput.value = '';
});

/* ============================================================
   VOICE RECORDING (real mic capture via MediaRecorder)
   ============================================================ */
let mediaRecorder = null;
let recordedChunks = [];
let recordingStream = null;
let recordingStartedAt = 0;
let recordingTimerHandle = null;

function setRecordingUI(active){
  msgComposer.classList.toggle('is-recording', active);
  micBtn.classList.toggle('is-recording-btn', active);
  const d = dict();
  micBtn.setAttribute('aria-label', active ? (d.sendVoiceMessage || 'Send voice message') : (d.recordVoice || 'Record voice message'));
  micBtn.querySelector('svg use').setAttribute('href', active ? '#i-check' : '#i-mic');
}

function stopRecordingTimer(){
  if(recordingTimerHandle){ clearInterval(recordingTimerHandle); recordingTimerHandle = null; }
}

async function startRecording(){
  if(!activeConversationId){ showToast(dict().noConversation || 'Pick a conversation first.'); return; }
  if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || typeof MediaRecorder === 'undefined'){
    showToast(dict().micUnsupported || 'Voice recording isn\u2019t supported in this browser.');
    return;
  }
  try{
    recordingStream = await navigator.mediaDevices.getUserMedia({ audio:true });
  }catch(err){
    showToast(dict().micDenied || 'Allow microphone access in your browser to record a voice message.');
    return;
  }
  recordedChunks = [];
  try{
    mediaRecorder = new MediaRecorder(recordingStream);
  }catch(err){
    showToast(dict().micUnsupported || 'Voice recording isn\u2019t supported in this browser.');
    recordingStream.getTracks().forEach(t=>t.stop());
    recordingStream = null;
    return;
  }
  mediaRecorder.addEventListener('dataavailable', (e)=>{ if(e.data && e.data.size > 0) recordedChunks.push(e.data); });
  mediaRecorder.start();
  recordingStartedAt = Date.now();
  recordingTimeEl.textContent = '0:00';
  setRecordingUI(true);
  stopRecordingTimer();
  recordingTimerHandle = setInterval(()=>{
    const elapsed = (Date.now() - recordingStartedAt) / 1000;
    recordingTimeEl.textContent = formatDuration(elapsed);
    if(elapsed >= 120) finishRecording(true);
  }, 200);
}

function finishRecording(send){
  if(!mediaRecorder || mediaRecorder.state === 'inactive') return;
  const elapsed = (Date.now() - recordingStartedAt) / 1000;
  const convId = activeConversationId;
  const recorder = mediaRecorder;
  recorder.addEventListener('stop', function onStop(){
    recorder.removeEventListener('stop', onStop);
    if(recordingStream){ recordingStream.getTracks().forEach(t=>t.stop()); recordingStream = null; }
    if(send && recordedChunks.length && elapsed >= 0.6){
      const blob = new Blob(recordedChunks, { type: recorder.mimeType || 'audio/webm' });
      const url = URL.createObjectURL(blob);
      const c = conversations.find(x=>x.id === convId);
      if(c){
        c.messages.push({ from:'me', type:'voice', src:url, duration:elapsed, time:'Now' });
        if(activeConversationId === convId){ renderThread(); renderConvList(); }
        queueCannedReply(convId);
      }
    } else if(send){
      showToast(dict().recordingTooShort || 'Recording was too short to send.');
    }
  });
  recorder.stop();
  stopRecordingTimer();
  setRecordingUI(false);
  mediaRecorder = null;
}

function cancelActiveRecording(){
  finishRecording(false);
}

micBtn.addEventListener('click', ()=>{
  if(msgComposer.classList.contains('is-recording')){
    finishRecording(true);
  } else {
    startRecording();
  }
});
cancelRecordBtn.addEventListener('click', ()=>{
  cancelActiveRecording();
});

renderConvList();
renderThread();
updateMsgBadge();

/* ============================================================
   NAV + TABS
   ============================================================ */
document.querySelectorAll('[data-view]').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const view = btn.dataset.view;
    document.querySelectorAll('.nav-item[data-view]').forEach(b=>b.classList.toggle('active', b.dataset.view === view));
    document.querySelectorAll('.view').forEach(v=> v.classList.toggle('active', v.id === 'view-'+view));
  });
});

document.querySelectorAll('.feed-tab').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.feed-tab').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const tab = btn.dataset.tab;
    document.getElementById('feedPanel').style.display = tab==='feed' ? '' : 'none';
    document.getElementById('reelsPanel').style.display = tab==='reels' ? '' : 'none';
  });
});

document.querySelectorAll('.g-tab').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.g-tab').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const tab = btn.dataset.gtab;
    document.getElementById('galleryPanel').style.display = tab==='gallery' ? '' : 'none';
    document.getElementById('tagsPanel').style.display = tab==='tags' ? '' : 'none';
  });
});

/* generic toast trigger buttons */
document.body.addEventListener('click', (e)=>{
  const el = e.target.closest('[data-action="toast"]');
  if(el) showToast(el.dataset.msg || 'Coming soon');
});

/* ============================================================
   STORY VIEWER
   ============================================================ */
const viewableStories = stories.filter(s=>!s.self);
let viewerIndex = 0;
const viewerState = {}; // per-story liked/disliked/saved/following
viewableStories.forEach(s=> viewerState[s.id] = { liked:false, disliked:false, saved:false, following:false,
  likes: Math.round(300 + s.rating*300), dislikes: Math.round(40 + (5-s.rating)*60), comments: Math.round(8+s.rating*3) });

const viewerEl = document.getElementById('viewer');
const progressWrap = document.getElementById('viewerProgress');

function openViewer(storyId){
  viewerIndex = viewableStories.findIndex(s=>s.id===storyId);
  if(viewerIndex < 0) viewerIndex = 0;
  buildProgress();
  paintViewer();
  viewerEl.classList.add('open');
}
function closeViewer(){ viewerEl.classList.remove('open'); }

function buildProgress(){
  progressWrap.innerHTML = viewableStories.map(()=>`<div class="seg"><i></i></div>`).join('');
}
function paintViewer(){
  const segs = progressWrap.querySelectorAll('.seg');
  segs.forEach((seg,i)=>{
    seg.classList.remove('active','done');
    if(i < viewerIndex) seg.classList.add('done');
    if(i === viewerIndex) seg.classList.add('active');
  });

  const s = viewableStories[viewerIndex];
  const st = viewerState[s.id];

  document.getElementById('viewerAvatar').className = 'avatar '+s.grad;
  document.getElementById('viewerName').textContent = s.name === 'Elin' ? 'Elin Vos' : s.name;
  document.getElementById('viewerMeta').textContent = s.followers || '—';
  document.getElementById('viewerCaption').textContent = s.caption || 'Shot on location, developed at home.';
  document.getElementById('viewerLikesLine').textContent = `Liked by nate.diaz and ${Math.round(st.likes/8)} others`;

  setMeterEl(document.getElementById('viewerMeter'), s.rating);

  document.getElementById('viewerLikeCount').textContent = fmt(st.likes);
  document.getElementById('viewerDislikeCount').textContent = fmt(st.dislikes);
  document.getElementById('viewerCommentCount').textContent = fmt(st.comments);
  document.getElementById('viewerSaveCount').textContent = fmt(Math.round(st.likes/12));

  document.getElementById('viewerLike').classList.toggle('on', st.liked);
  document.getElementById('viewerDislike').classList.toggle('on', st.disliked);
  document.getElementById('viewerSave').classList.toggle('save-on', st.saved);

  const followBtn = document.getElementById('viewerFollow');
  followBtn.textContent = st.following ? 'Following' : 'Follow';
  followBtn.classList.toggle('following', st.following);
}

function nextStory(){
  if(viewerIndex < viewableStories.length - 1){ viewerIndex++; paintViewer(); }
  else closeViewer();
}
function prevStory(){
  if(viewerIndex > 0){ viewerIndex--; paintViewer(); }
  else paintViewer();
}

document.querySelectorAll('[data-story]').forEach(btn=>{
  btn.addEventListener('click', ()=> openViewer(btn.dataset.story));
});
document.getElementById('viewerClose').addEventListener('click', closeViewer);
document.getElementById('zoneNext').addEventListener('click', nextStory);
document.getElementById('zonePrev').addEventListener('click', prevStory);
document.addEventListener('keydown', (e)=>{
  if(!viewerEl.classList.contains('open')) return;
  if(e.key === 'Escape') closeViewer();
  if(e.key === 'ArrowRight') nextStory();
  if(e.key === 'ArrowLeft') prevStory();
});
viewerEl.addEventListener('click', (e)=>{ if(e.target === viewerEl) closeViewer(); });

document.getElementById('viewerLike').addEventListener('click', ()=>{
  const s = viewableStories[viewerIndex]; const st = viewerState[s.id];
  if(st.liked){ st.liked=false; st.likes--; } else { st.liked=true; st.likes++; if(st.disliked){ st.disliked=false; st.dislikes--; } }
  paintViewer();
});
document.getElementById('viewerDislike').addEventListener('click', ()=>{
  const s = viewableStories[viewerIndex]; const st = viewerState[s.id];
  if(st.disliked){ st.disliked=false; st.dislikes--; } else { st.disliked=true; st.dislikes++; if(st.liked){ st.liked=false; st.likes--; } }
  paintViewer();
});
document.getElementById('viewerSave').addEventListener('click', ()=>{
  const s = viewableStories[viewerIndex]; const st = viewerState[s.id];
  st.saved = !st.saved;
  showToast(st.saved ? 'Saved to your collection' : 'Removed from collection');
  paintViewer();
});
document.getElementById('viewerFollow').addEventListener('click', ()=>{
  const s = viewableStories[viewerIndex]; const st = viewerState[s.id];
  st.following = !st.following;
  showToast(st.following ? `Following ${s.name}` : `Unfollowed ${s.name}`);
  paintViewer();
});
});
