document.addEventListener('DOMContentLoaded', function(){
/* Language init (dictionary + toggle logic live in js/i18n.js) */
if(window.LumenI18n) window.LumenI18n.initLanguageToggle();

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
function fmt(n){
  if(typeof n !== 'number') return n;
  return n >= 1000 ? (n/1000).toFixed(n % 1000 === 0 ? 0 : 1)+'k' : String(n);
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
   NAV + TABS
   ============================================================ */
document.querySelectorAll('.nav-item[data-view]').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.nav-item[data-view]').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const view = btn.dataset.view;
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
