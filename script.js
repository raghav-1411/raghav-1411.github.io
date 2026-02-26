
// CUSTOM CURSOR
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  dot.style.left = mouseX + 'px';
  dot.style.top = mouseY + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.left = ringX + 'px';
  ring.style.top = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .skill-tag, .edu-card, .achieve-card, .project-card, .coding-stat, .highlight-chip').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});

// PARTICLE CANVAS
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.3;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.4 + 0.1;
    this.life = 0;
    this.maxLife = Math.random() * 400 + 200;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life++;
    if (this.life > this.maxLife) this.reset();
  }
  draw() {
    const fade = Math.sin((this.life / this.maxLife) * Math.PI);
    ctx.save();
    ctx.globalAlpha = this.opacity * fade;
    ctx.fillStyle = '#00d4ff';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

for (let i = 0; i < 80; i++) particles.push(new Particle());

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Draw connections
  particles.forEach((p, i) => {
    particles.slice(i + 1).forEach(p2 => {
      const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
      if (dist < 120) {
        ctx.save();
        ctx.globalAlpha = (1 - dist / 120) * 0.08;
        ctx.strokeStyle = '#00d4ff';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
        ctx.restore();
      }
    });
  });
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(drawParticles);
}
drawParticles();

// NAV SCROLL
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// MOBILE NAV
const toggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('navMobile');
const closeBtn = document.getElementById('navClose');
toggle.addEventListener('click', () => mobileNav.classList.add('open'));
closeBtn.addEventListener('click', () => mobileNav.classList.remove('open'));
document.querySelectorAll('.nav-mob-link').forEach(l => l.addEventListener('click', () => mobileNav.classList.remove('open')));

// REVEAL ON SCROLL
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// COUNTER ANIMATION
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current);
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

// TYPING EFFECT for hero subtitle (subtle)
const phrases = ['Data Science Enthusiast', 'ML Engineer', 'DSA Enthusiast', 'Problem Solver', 'CS Student @ TIET'];
let phraseIdx = 0, charIdx = 0, isDeleting = false;
const taglineEl = document.querySelector('.hero-tagline em');
if (taglineEl) {
  function type() {
    const current = phrases[phraseIdx];
    if (!isDeleting) {
      taglineEl.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) { isDeleting = true; setTimeout(type, 2000); return; }
    } else {
      taglineEl.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) { isDeleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; }
    }
    setTimeout(type, isDeleting ? 60 : 100);
  }
  setTimeout(type, 1500);
}

// SMOOTH ANCHOR SCROLLING
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Progress bars animate on scroll
const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.progress-fill').forEach(bar => {
        bar.style.width = bar.dataset.width;
      });
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skills-section').forEach(s => progressObserver.observe(s));

// ===== PREMIUM ANIMATION JS =====

// 3D Tilt effect on project cards
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -8;
    const rotateY = ((x - cx) / cx) * 8;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0)';
    card.style.transition = 'transform 0.5s cubic-bezier(0.23,1,0.32,1)';
  });
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.1s ease';
  });
});

// Magnetic button effect
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.04)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
    btn.style.transition = 'transform 0.5s cubic-bezier(0.23,1,0.32,1), box-shadow 0.3s ease';
  });
});

// Staggered reveal with delay
const staggerObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const children = entry.target.querySelectorAll('.reveal');
      children.forEach((child, i) => {
        setTimeout(() => child.classList.add('visible'), i * 120);
      });
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.edu-grid, .achievements-grid, .projects-grid, .about-grid').forEach(el => {
  staggerObserver.observe(el);
});

// Typewriter handled by existing script above

// Smooth parallax on hero section
const hero = document.querySelector('.hero');
if (hero) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const orbs = document.querySelectorAll('.orb');
    orbs.forEach((orb, i) => {
      const speed = 0.1 + i * 0.08;
      orb.style.transform = `translateY(${scrollY * speed}px)`;
    });
  }, { passive: true });
}

// Achievement card entrance with spring
const achObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const cards = entry.target.querySelectorAll('.achievement-card');
      cards.forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(60px) scale(0.95)';
        setTimeout(() => {
          card.style.transition = `opacity 0.7s cubic-bezier(0.23,1,0.32,1) ${i*0.1}s, transform 0.7s cubic-bezier(0.23,1,0.32,1) ${i*0.1}s`;
          card.style.opacity = '1';
          card.style.transform = 'translateY(0) scale(1)';
        }, 50);
      });
      achObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.achievements-grid').forEach(el => achObserver.observe(el));

// Ripple click effect on buttons
document.querySelectorAll('.btn-primary, .btn-secondary, .project-link').forEach(btn => {
  btn.addEventListener('click', e => {
    const ripple = document.createElement('span');
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
      position:absolute;width:${size}px;height:${size}px;
      border-radius:50%;background:rgba(0,212,255,0.25);
      top:${e.clientY-rect.top-size/2}px;left:${e.clientX-rect.left-size/2}px;
      transform:scale(0);animation:rippleAnim 0.6s ease forwards;pointer-events:none;
    `;
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Inject ripple keyframe
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes rippleAnim {
    to { transform: scale(2.5); opacity: 0; }
  }
`;
document.head.appendChild(rippleStyle);

// Add data-text attribute to name-main for glitch effect
const nameMain = document.querySelector('.name-main');
if (nameMain) nameMain.setAttribute('data-text', nameMain.textContent);

// Cursor trail sparkles
const canvas2 = document.createElement('canvas');
canvas2.id = 'sparkleCanvas';
canvas2.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9998;';
document.body.appendChild(canvas2);
const ctx2 = canvas2.getContext('2d');
canvas2.width = window.innerWidth;
canvas2.height = window.innerHeight;
window.addEventListener('resize', () => {
  canvas2.width = window.innerWidth;
  canvas2.height = window.innerHeight;
});
const sparkles = [];
document.addEventListener('mousemove', e => {
  if (Math.random() < 0.35) {
    sparkles.push({
      x: e.clientX, y: e.clientY,
      vx: (Math.random()-0.5)*2, vy: (Math.random()-0.5)*2 - 1.5,
      life: 1, size: Math.random()*3+1,
      color: Math.random() > 0.5 ? '0,212,255' : '0,255,157'
    });
  }
});
function animateSparkles() {
  ctx2.clearRect(0,0,canvas2.width,canvas2.height);
  for (let i = sparkles.length-1; i >= 0; i--) {
    const s = sparkles[i];
    s.x += s.vx; s.y += s.vy; s.vy += 0.05; s.life -= 0.03;
    if (s.life <= 0) { sparkles.splice(i,1); continue; }
    ctx2.beginPath();
    ctx2.arc(s.x, s.y, s.size * s.life, 0, Math.PI*2);
    ctx2.fillStyle = `rgba(${s.color},${s.life * 0.8})`;
    ctx2.fill();
  }
  requestAnimationFrame(animateSparkles);
}
animateSparkles();

document.querySelectorAll(
'a, button, .skill-tag, .edu-card, .achieve-card, .project-card, .coding-stat, .highlight-chip, .badge'
)