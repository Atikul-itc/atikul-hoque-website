/* ─── NAV SCROLL STATE ─────────────────────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

/* ─── HAMBURGER ────────────────────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

/* ─── HERO CANVAS — ANIMATED PARTICLE CONSTELLATION ───────────────────── */
(function () {
  const canvas = document.getElementById('hero-canvas');
  const ctx    = canvas.getContext('2d');
  let W, H, particles = [], animId;

  const ACCENT     = [59, 184, 240];
  const ACCENT2    = [126, 232, 162];
  const N_PARTICLES = 90;
  const CONNECT_DIST = 120;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function rand(min, max) { return Math.random() * (max - min) + min; }

  function mkParticle() {
    const col = Math.random() < 0.7 ? ACCENT : ACCENT2;
    return {
      x: rand(0, W), y: rand(0, H),
      vx: rand(-0.25, 0.25), vy: rand(-0.25, 0.25),
      r: rand(1, 2.5),
      col, alpha: rand(0.3, 0.9)
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: N_PARTICLES }, mkParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECT_DIST) {
          const opacity = (1 - dist / CONNECT_DIST) * 0.18;
          ctx.strokeStyle = `rgba(59,184,240,${opacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // Draw particles
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.col.join(',')},${p.alpha})`;
      ctx.fill();

      // Move
      p.x += p.vx; p.y += p.vy;
      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10;
      if (p.y > H + 10) p.y = -10;
    });

    animId = requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); });
  init();
  draw();
})();

/* ─── COUNTER ANIMATION ────────────────────────────────────────────────── */
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    let current = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current;
      if (current >= target) clearInterval(timer);
    }, 40);
  });
}

/* ─── INTERSECTION OBSERVER — REVEALS ─────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

// Mark elements for reveal
const revealSelectors = [
  '.about-card', '.research-card', '.pub-item',
  '.teaching-card', '.cv-highlight-item',
  '.about-text p', '.section-title', '.section-intro'
];
revealSelectors.forEach(sel => {
  document.querySelectorAll(sel).forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 6) * 0.07}s`;
    revealObserver.observe(el);
  });
});

// Trigger counters when hero is visible
const heroSection = document.getElementById('hero');
const counterObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    setTimeout(animateCounters, 600);
    counterObserver.disconnect();
  }
}, { threshold: 0.4 });
counterObserver.observe(heroSection);

/* ─── PUBLICATION FILTERS ──────────────────────────────────────────────── */
document.querySelectorAll('.pub-filter').forEach(btn => {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.pub-filter').forEach(b => b.classList.remove('active'));
    this.classList.add('active');

    const filter = this.dataset.filter;
    document.querySelectorAll('.pub-item').forEach(item => {
      if (filter === 'all' || item.dataset.type === filter) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

/* ─── SMOOTH ACTIVE NAV LINK ───────────────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--accent)' : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));
