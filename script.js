// Base URL for backend API (empty = same origin as page)
const API_BASE = '';

// ScrollReveal setup (guarded so page still works if library fails to load)
const sr =
  typeof ScrollReveal !== 'undefined'
    ? ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 2000,
        reset: false,
      })
    : { reveal: () => {} };

function setupScrollReveal() {
  sr.reveal('.hero-text', { delay: 200, origin: 'top' });
  sr.reveal('.hero-img', { delay: 400, origin: 'right' });
  sr.reveal('.social-icons', { delay: 600, origin: 'left' });

  sr.reveal('.townhall-card', {
    delay: 200,
    origin: 'bottom',
    distance: '50px',
    interval: 200,
  });

  sr.reveal('.troop-card', {
    delay: 200,
    origin: 'bottom',
    distance: '50px',
    interval: 200,
  });

  sr.reveal('.contact-card', {
    delay: 200,
    origin: 'left',
    distance: '50px',
    interval: 200,
  });

  sr.reveal('.contact-form', {
    delay: 400,
    origin: 'right',
    distance: '50px',
  });

  sr.reveal('.about-text', {
    delay: 200,
    origin: 'top',
    distance: '50px',
  });

  sr.reveal('.feature', {
    delay: 300,
    origin: 'bottom',
    distance: '50px',
    interval: 200,
  });

  sr.reveal('.stat-item', {
    delay: 400,
    origin: 'bottom',
    distance: '50px',
    interval: 200,
  });

  sr.reveal('.timeline-item', {
    delay: 500,
    origin: 'left',
    distance: '50px',
    interval: 200,
  });

  sr.reveal('.design-card', {
    delay: 200,
    origin: 'bottom',
    distance: '40px',
    interval: 150,
  });
}

function setupNavigation() {
  const menuIcon = document.querySelector('#menu-icon');
  const navList = document.querySelector('.navlist');

  if (menuIcon && navList) {
    menuIcon.addEventListener('click', () => {
      menuIcon.classList.toggle('bx-x');
      navList.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!navList.contains(e.target) && !menuIcon.contains(e.target)) {
        menuIcon.classList.remove('bx-x');
        navList.classList.remove('open');
      }
    });
  }

  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.navlist a');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 80) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      const href = link.getAttribute('href') || '';
      if (href.slice(1) === current) {
        link.classList.add('active');
      }
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });
}

function setupStatsAnimation() {
  const statsSection = document.querySelector('.stats');
  const statBars = document.querySelectorAll('.stat-fill');

  if (!statsSection || !statBars.length) return;

  const animateStats = () => {
    statBars.forEach((bar) => {
      const width = bar.style.width;
      bar.style.width = '0';
      requestAnimationFrame(() => {
        setTimeout(() => {
          bar.style.width = width;
        }, 120);
      });
    });
  };

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateStats();
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statsObserver.observe(statsSection);
}

function setupHeroImageHover() {
  const heroImg = document.querySelector('.hero-img img');
  if (!heroImg) return;

  heroImg.addEventListener('mouseover', () => {
    heroImg.style.transform = 'scale(1.06) translateY(-4px)';
  });

  heroImg.addEventListener('mouseout', () => {
    heroImg.style.transform = 'scale(1) translateY(0)';
  });
}

function setupVideoModal() {
  const modal = document.getElementById('videoModal');
  const watchGameplayBtn = document.getElementById('watchGameplay');
  const closeModalBtn = document.querySelector('.close-modal');

  if (!modal || !watchGameplayBtn || !closeModalBtn) return;

  watchGameplayBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  });

  closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('show');
      document.body.style.overflow = '';
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      modal.classList.remove('show');
      document.body.style.overflow = '';
    }
  });
}

function setupFormFocusAnimations() {
  const formInputs = document.querySelectorAll(
    '.form-group input, .form-group textarea'
  );
  formInputs.forEach((input) => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
      if (!input.value) {
        input.parentElement.classList.remove('focused');
      }
    });
  });
}

async function loadDesigns() {
  const list = document.getElementById('design-list');
  if (!list) return;

  list.innerHTML =
    '<div class="design-placeholder">Loading live Goblin designs...</div>';

  try {
    const response = await fetch(`${API_BASE}/api/designs`);
    if (!response.ok) {
      throw new Error('Failed to reach designs API');
    }
    const designs = await response.json();

    if (!Array.isArray(designs) || designs.length === 0) {
      list.innerHTML =
        '<div class="design-empty">No designs in MongoDB yet. Add some from the backend to see them here.</div>';
      return;
    }

    list.innerHTML = '';

    designs.forEach((d) => {
      const rarityClass = `design-rarity--${(d.rarity || 'rare').toLowerCase()}`;
      const created = d.createdAt ? new Date(d.createdAt) : null;

      const card = document.createElement('article');
      card.className = 'design-card';
      card.innerHTML = `
        <div class="design-meta">
          <span class="design-rarity ${rarityClass}">${(d.rarity || 'Rare')
            .toString()
            .toUpperCase()}</span>
          <span>${created ? created.toLocaleDateString() : ''}</span>
        </div>
        <h3 class="design-title">${d.name}</h3>
        <p class="design-description">${d.description}</p>
        <div class="design-footer">
          <span class="design-theme">
            <span class="design-theme-dot"></span>
            ${d.theme || 'Goblin Core'}
          </span>
          <span class="design-power">Power ${d.powerLevel || 50}/100</span>
        </div>
      `;
      list.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    list.innerHTML =
      '<div class="design-error">Could not load designs from MongoDB yet. Make sure the backend and MongoDB are running.</div>';
  }
}

function setupContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value,
      phone: document.getElementById('phone')?.value || 'N/A',
    };

    try {
      const response = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert('✅ Message saved to MySQL! Anup will respond soon.');
        contactForm.reset();
      } else {
        alert(
          '❌ Error: ' +
            (result.error || 'Try email: gundelwaranup119@gmail.com')
        );
      }
    } catch (error) {
      alert(
        '🌐 Backend not reachable. Contact directly:\n' +
          'gundelwaranup119@gmail.com\n' +
          '+91 9226408230'
      );
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupStatsAnimation();
  setupHeroImageHover();
  setupVideoModal();
  setupFormFocusAnimations();
  setupScrollReveal();
  loadDesigns();
  setupContactForm();
});
