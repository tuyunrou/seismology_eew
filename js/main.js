;(function(){
'use strict';

/* ===== Mobile Nav Toggle ===== */
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if(toggle){
  toggle.addEventListener('click',()=>{
    navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded',navLinks.classList.contains('open'));
  });
  document.querySelectorAll('.nav-links a').forEach(a=>{
    a.addEventListener('click',()=>navLinks.classList.remove('open'));
  });
}

/* ===== Active nav link on scroll ===== */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
function updateActiveNav(){
  let current='';
  sections.forEach(s=>{
    const top=s.getBoundingClientRect().top;
    if(top<=200) current=s.getAttribute('id');
  });
  navAnchors.forEach(a=>{
    a.style.color=a.getAttribute('href')==='#'+current?'#38bdf8':'';
  });
}
window.addEventListener('scroll',updateActiveNav);

/* ===== Intersection Observer for animations ===== */
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}
  });
},{threshold:0.15});

document.querySelectorAll('.fade-in,.timeline-item,.workflow-row').forEach(el=>observer.observe(el));

/* ===== Tab switching ===== */
document.querySelectorAll('.tab-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const parent=btn.closest('[data-tabs]');
    if(!parent) return;
    const target=btn.dataset.tab;
    parent.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    parent.querySelectorAll('.tab-content').forEach(c=>c.classList.remove('active'));
    const content=parent.querySelector(`#${target}`);
    if(content) content.classList.add('active');
  });
});

/* ===== Go to top button ===== */
const gotop=document.querySelector('.gotop');
if(gotop){
  window.addEventListener('scroll',()=>gotop.classList.toggle('visible',window.scrollY>500));
  gotop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
}

/* ===== Pipeline arrow animation ===== */
const arrows=document.querySelectorAll('.pipeline-arrow');
if(arrows.length){
  setInterval(()=>{
    arrows.forEach(a=>{a.style.transform='translateX(0)';a.style.transition='.3s'});
    requestAnimationFrame(()=>arrows.forEach(a=>a.style.transform='translateX(4px)'));
  },2000);
}

/* ===== Smooth anchor scroll (fallback) ===== */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const id=a.getAttribute('href');
    if(id==='#') return;
    const target=document.querySelector(id);
    if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth'})}
  });
});

})();
