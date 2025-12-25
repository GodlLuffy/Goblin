// ScrollReveal Animations
async function loadDesigns() {
  const res = await fetch('/api/designs');
  const designs = await res.json();
  // render designs...
}

// Load designs when page is ready
document.addEventListener('DOMContentLoaded', () => {
  loadDesigns();
});

async function addDesign(payload) {
  const res = await fetch('/api/designs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const err = await res.json();
    alert(err.error || 'Failed');
    return;
  }
  const created = await res.json();
  // update UI...
}
// ScrollReveal setup (single declaration, guarded)
const sr = (typeof ScrollReveal !== 'undefined')
  ? (window.sr || ScrollReveal({
      origin: 'top',
      distance: '80px',
      duration: 2000,
      reset: true
    }))
  : { reveal: () => {} }; // no-op fallback when ScrollReveal isn't loaded
if (typeof window !== 'undefined') window.sr = sr;

// Hero Section Animations
sr.reveal('.hero-text', {
    delay: 200,
    origin: 'top'
});

sr.reveal('.hero-img', {
    delay: 400,
    origin: 'right'
});

sr.reveal('.social-icons', {
    delay: 600,
    origin: 'left'
});

// Mobile Menu Toggle
const menuIcon = document.querySelector('#menu-icon');
const navList = document.querySelector('.navlist');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navList.classList.toggle('open');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navList.contains(e.target) && !menuIcon.contains(e.target)) {
        menuIcon.classList.remove('bx-x');
        navList.classList.remove('open');
    }
});

// Active Link Highlight
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navlist a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Stats Animation
const statsSection = document.querySelector('.stats');
const statBars = document.querySelectorAll('.stat-fill');

const animateStats = () => {
    statBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// Hero Image Animation
const heroImg = document.querySelector('.hero-img img');
if (heroImg) {
    heroImg.addEventListener('mouseover', () => {
        heroImg.style.transform = 'scale(1.1)';
    });
    
    heroImg.addEventListener('mouseout', () => {
        heroImg.style.transform = 'scale(1)';
    });
}

// Video Modal Functionality
const modal = document.getElementById('videoModal');
const watchGameplayBtn = document.getElementById('watchGameplay');
const closeModalBtn = document.querySelector('.close-modal');

// Open modal
watchGameplayBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
});

// Close modal
closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('show');
    document.body.style.overflow = ''; // Restore scrolling
});

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
});

// Town Hall Section Animations
sr.reveal('.townhall-card', {
    delay: 200,
    origin: 'bottom',
    distance: '50px',
    interval: 200,
    reset: false
});

// Optimize hover effects for Town Hall cards
const townhallCards = document.querySelectorAll('.townhall-card');
townhallCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        requestAnimationFrame(() => {
            card.style.transform = 'translateY(-10px)';
        });
    });
    
    card.addEventListener('mouseleave', () => {
        requestAnimationFrame(() => {
            card.style.transform = 'translateY(0)';
        });
    });
});

// Troops Section Animations
sr.reveal('.troop-card', {
    delay: 200,
    origin: 'bottom',
    distance: '50px',
    interval: 200,
    reset: false
});

// Add hover effect for Troop cards
const troopCards = document.querySelectorAll('.troop-card');
troopCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        requestAnimationFrame(() => {
            card.style.transform = 'translateY(-10px)';
        });
    });
    
    card.addEventListener('mouseleave', () => {
        requestAnimationFrame(() => {
            card.style.transform = 'translateY(0)';
        });
    });
});

// Contact Section Animations
sr.reveal('.contact-card', {
    delay: 200,
    origin: 'left',
    distance: '50px',
    interval: 200,
    reset: false
});

sr.reveal('.contact-form', {
    delay: 400,
    origin: 'right',
    distance: '50px',
    reset: false
});

// Form Input Animation
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

// About Section Animations
sr.reveal('.about-text', {
    delay: 200,
    origin: 'top',
    distance: '50px',
    reset: false
});

sr.reveal('.feature', {
    delay: 300,
    origin: 'bottom',
    distance: '50px',
    interval: 200,
    reset: false
});

sr.reveal('.stat-item', {
    delay: 400,
    origin: 'bottom',
    distance: '50px',
    interval: 200,
    reset: false
});

sr.reveal('.timeline-item', {
    delay: 500,
    origin: 'left',
    distance: '50px',
    interval: 200,
    reset: false
});

// Kick off initial load
document.addEventListener('DOMContentLoaded', () => {
  loadDesigns();
});

async function loadDesigns() {
  const res = await fetch('/api/designs');
  const designs = await res.json();

  const list = document.getElementById('design-list');
  list.innerHTML = '';

  designs.forEach(d => {
    const item = document.createElement('div');
    item.className = 'design-card';
    item.innerHTML = `<h3>${d.name}</h3><p>${d.description}</p>`;
    list.appendChild(item);
  });
}


document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value,
      phone: 'N/A' // Add phone field if needed later
    };
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (response.ok) {
        alert('✅ Message sent successfully to Anup!');
        contactForm.reset();
      } else {
        alert('❌ Error: ' + result.error || 'Please try email instead');
      }
    } catch (error) {
      alert('🌐 Network error. Contact Anup directly:\ngundelwaranup119@gmail.com\n+91 9226408230');
    }
  });
});
// Single DOMContentLoaded - ALL functionality here
document.addEventListener('DOMContentLoaded', function() {
    // ===== CONTACT FORM (Your MySQL code) =====
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
                phone: document.getElementById('phone')?.value || 'N/A'
            };
            
            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                
                const result = await response.json();
                
                if (response.ok) {
                    alert('✅ Message saved to database! Anup will respond soon.');
                    contactForm.reset();
                } else {
                    alert('❌ Error: ' + (result.error || 'Try email: gundelwaranup119@gmail.com'));
                }
            } catch (error) {
                alert('🌐 Backend not ready. Contact:\ngundelwaranup119@gmail.com\n+91 9226408230');
            }
        });
    }

    // ===== ALL YOUR EXISTING CODE (unchanged) =====
    loadDesigns(); // Your designs API
    
    // Mobile Menu Toggle
    const menuIcon = document.querySelector('#menu-icon');
    const navList = document.querySelector('.navlist');
    
    if (menuIcon && navList) {
        menuIcon.addEventListener('click', () => {
            menuIcon.classList.toggle('bx-x');
            navList.classList.toggle('open');
        });
    }
    
    // Hero Section Animations
    sr.reveal('.hero-text', { delay: 200, origin: 'top' });
    sr.reveal('.hero-img', { delay: 400, origin: 'right' });
    sr.reveal('.social-icons', { delay: 600, origin: 'left' });
    
    // Active Link Highlight & Smooth Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navlist a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // Video Modal (rest of your code...)
    const modal = document.getElementById('videoModal');
    const watchGameplayBtn = document.getElementById('watchGameplay');
    const closeModalBtn = document.querySelector('.close-modal');
    
    if (watchGameplayBtn && modal) {
        watchGameplayBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        });
    }
    
    // Close modal outside click & ESC
    if (modal) {
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
    
    // All your other animations (stats, townhall, troops, contact animations)...
    // [Copy ALL remaining ScrollReveal & event listeners from your original code]
});

// Your designs functions (unchanged)
async function loadDesigns() {
    try {
        const res = await fetch('/api/designs');
        const designs = await res.json();
        const list = document.getElementById('design-list');
        if (list) {
            list.innerHTML = '';
            designs.forEach(d => {
                const item = document.createElement('div');
                item.className = 'design-card';
                item.innerHTML = `<h3>${d.name}</h3><p>${d.description}</p>`;
                list.appendChild(item);
            });
        }
    } catch (error) {
        console.log('Designs not available');
    }
}
