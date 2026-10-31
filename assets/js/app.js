
document.querySelector('.menu')?.addEventListener('click',()=>document.querySelector('.links').classList.toggle('open'));
const talks=window.JUST_TALKS||[];
function card(t){return `<a class="card" href="/watch/?id=${encodeURIComponent(t.slug)}"><img loading="lazy" src="${t.image}" alt=""><div class="tag">${t.category}</div><h3>${t.title}</h3><small>${t.speaker} · ${t.duration}</small></a>`}
function render(id,items){const el=document.getElementById(id);if(el)el.innerHTML=items.length?items.map(card).join(''):'<p>No talks match your search.</p>'}
render('featured',talks.slice(0,6));render('latest',talks.slice(3,9));
let active='All';
function filter(){const q=(document.getElementById('search')?.value||'').toLowerCase();render('catalogue',talks.filter(t=>(active==='All'||t.category===active)&&[t.title,t.speaker,t.category].join(' ').toLowerCase().includes(q)))}
if(document.getElementById('catalogue')){filter();document.getElementById('search')?.addEventListener('input',filter);document.querySelectorAll('[data-topic]').forEach(b=>b.addEventListener('click',()=>{active=b.dataset.topic;document.querySelectorAll('[data-topic]').forEach(x=>x.classList.toggle('active',x===b));filter()}))}
if(document.getElementById('watch-title')){const t=talks.find(x=>x.slug===new URLSearchParams(location.search).get('id'))||talks[0];document.getElementById('watch-title').textContent=t.title;document.getElementById('watch-speaker').textContent=t.speaker+' · '+t.duration;document.getElementById('watch-image').style.background=`linear-gradient(#0006,#0008),url("${t.image}") center/cover`;document.title=t.title+' | Just Talks'}
document.querySelectorAll('form[data-demo]').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();alert('This is a demo form. Connect a form service or backend to receive submissions.')}))
