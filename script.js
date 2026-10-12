const glow=document.querySelector('.cursor-glow');
window.addEventListener('pointermove',e=>{if(glow&&e.pointerType!=='touch'){glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px';}});

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}}),{threshold:.1});
document.querySelectorAll('.reveal').forEach(e=>observer.observe(e));

const menu=document.querySelector('.menu'),nav=document.querySelector('.nav nav');
if(menu&&nav){menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.textContent=open?'✕':'☰';menu.setAttribute('aria-expanded',String(open));});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.textContent='☰';menu.setAttribute('aria-expanded','false');}));}

const wordEl=document.querySelector('.scramble-word');
if(wordEl&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
 const words=wordEl.dataset.words.split('|'),chars='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';let index=0;
 const scrambleTo=next=>{const old=wordEl.textContent,max=Math.max(old.length,next.length);let frame=0;const total=14;const timer=setInterval(()=>{frame++;wordEl.textContent=Array.from({length:max},(_,i)=>{if(frame>total-5&&i<next.length)return next[i];if(i<next.length&&Math.random()>.42)return next[i];return chars[Math.floor(Math.random()*chars.length)];}).join('');if(frame>=total){clearInterval(timer);wordEl.textContent=next;}},45);};
 setInterval(()=>{index=(index+1)%words.length;scrambleTo(words[index]);},2200);
}

const themeToggle=document.getElementById('themeToggle'),themeIcon=document.getElementById('themeIcon');
const applyTheme=theme=>{const light=theme==='light';document.body.classList.toggle('light-theme',light);if(themeIcon)themeIcon.textContent=light?'🌙':'☀️';try{localStorage.setItem('shashank-theme',light?'light':'dark');}catch(e){}};
let saved='dark';try{saved=localStorage.getItem('shashank-theme')||'dark';}catch(e){}applyTheme(saved);
if(themeToggle)themeToggle.addEventListener('click',()=>applyTheme(document.body.classList.contains('light-theme')?'dark':'light'));
