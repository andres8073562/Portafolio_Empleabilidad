document.addEventListener('DOMContentLoaded', () => {

  /* =========================================
     1. BOOT SCREEN
     ========================================= */
  const bootScreen = document.getElementById('boot-screen');
  setTimeout(() => {
    if (bootScreen) bootScreen.classList.add('hidden');
  }, 1600);

  /* =========================================
     2. TYPING EFFECT ON HERO TITLE
     ========================================= */
  const typedTitleEl = document.getElementById('typedTitle');
  const fullTitle = 'Creando experiencias digitales increíbles';
  if (typedTitleEl) {
    let i = 0;
    const typeSpeed = 45;
    function typeChar() {
      if (i <= fullTitle.length) {
        typedTitleEl.textContent = fullTitle.slice(0, i);
        i++;
        setTimeout(typeChar, typeSpeed);
      } else {
        typedTitleEl.classList.add('done');
      }
    }
    setTimeout(typeChar, 1700); // start right after boot screen fades
  }

  /* =========================================
     3. SCROLL REVEAL (achievement unlock style)
     ========================================= */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* =========================================
     4. ACTIVE NAV LINK ON SCROLL
     ========================================= */
  const sections = document.querySelectorAll('main section, header#sobre');
  const navLinks = document.querySelectorAll('.nav-link');
  if ('IntersectionObserver' in window && sections.length) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { rootMargin: '-45% 0px -45% 0px' });
    sections.forEach(sec => navObserver.observe(sec));
  }

  /* =========================================
     5. MOBILE NAV TOGGLE
     ========================================= */
  const navToggle = document.getElementById('navToggle');
  const navLinksWrap = document.getElementById('navLinks');
  if (navToggle && navLinksWrap) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinksWrap.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    navLinksWrap.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinksWrap.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* =========================================
     6. CRT / SCANLINE TOGGLE
     ========================================= */
  const crtOverlay = document.getElementById('crtOverlay');
  const crtToggle = document.getElementById('crtToggle');
  if (crtToggle && crtOverlay) {
    crtToggle.addEventListener('click', () => {
      const isOff = crtOverlay.classList.toggle('off');
      crtToggle.textContent = isOff ? 'CRT: OFF' : 'CRT: ON';
    });
  }

  /* =========================================
     7. COPY TO CLIPBOARD BUTTONS
     ========================================= */
  const toast = document.getElementById('toast');
  let toastTimer;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
  }

  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const value = btn.getAttribute('data-copy');
      try {
        await navigator.clipboard.writeText(value);
        showToast('¡Enlace copiado!');
      } catch (err) {
        showToast('No se pudo copiar');
      }
    });
  });

  /* =========================================
     8. BACK TO TOP ("RESPAWN")
     ========================================= */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* =========================================
     9. VISIT COUNTER (retro site-counter style)
     ========================================= */
  const visitCountEl = document.getElementById('visitCount');
  if (visitCountEl) {
    try {
      const key = 'av_portfolio_visits';
      const current = parseInt(localStorage.getItem(key) || '0', 10) + 1;
      localStorage.setItem(key, String(current));
      visitCountEl.textContent = String(current).padStart(6, '0');
    } catch (err) {
      visitCountEl.textContent = '------';
    }
  }

  /* =========================================
     10. FOOTER YEAR
     ========================================= */
  const footerYear = document.getElementById('footerYear');
  if (footerYear) footerYear.textContent = new Date().getFullYear();

  /* =========================================
     11. KONAMI CODE EASTER EGG
     ========================================= */
  const konamiSequence = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let konamiProgress = 0;

  document.addEventListener('keydown', (e) => {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (key === konamiSequence[konamiProgress]) {
      konamiProgress++;
      if (konamiProgress === konamiSequence.length) {
        activateCheatMode();
        konamiProgress = 0;
      }
    } else {
      konamiProgress = (key === konamiSequence[0]) ? 1 : 0;
    }
  });

  function activateCheatMode() {
    document.body.classList.add('cheat-mode');
    showToast('★ CÓDIGO SECRETO ACTIVADO ★');
    let hue = 0;
    const interval = setInterval(() => {
      hue += 20;
      document.body.style.filter = `hue-rotate(${hue}deg)`;
      if (hue >= 360) {
        clearInterval(interval);
        document.body.style.filter = '';
        document.body.classList.remove('cheat-mode');
      }
    }, 80);
  }

});