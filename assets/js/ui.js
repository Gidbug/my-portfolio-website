export const toggleMenu = () => {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isShown = navMenu.classList.toggle('show');
      navMenu.setAttribute('aria-hidden', !isShown);
      navToggle.setAttribute('aria-expanded', isShown);
    });
  }

  document.addEventListener('click', (e) => {
    if (!navMenu || !navToggle) return;
    const target = e.target;
    if (!navMenu.contains(target) && !navToggle.contains(target)) {
      navMenu.classList.remove('show');
      navMenu.setAttribute('aria-hidden', 'true');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  const navLinks = document.querySelectorAll('.nav__link');
  navLinks.forEach(link => link.addEventListener('click', () => {
    const navMenu = document.getElementById('nav-menu');
    if (navMenu) {
      navMenu.classList.remove('show');
      navMenu.setAttribute('aria-hidden', 'true');
      document.getElementById('nav-toggle')?.setAttribute('aria-expanded', 'false');
    }
  }));
};

export const scrollHeader = () => {
  const header = document.querySelector('.l-header');
  const handleScroll = () => {
    if (!header) return;
    if (window.scrollY >= 80) {
      header.classList.add('scroll-header');
      header.style.boxShadow = '0 6px 18px rgba(0,0,0,0.6)';
    } else {
      header.classList.remove('scroll-header');
      header.style.boxShadow = '0 1px 6px rgba(0,0,0,0.25)';
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
};

export const activeSectionLink = () => {
  const sections = document.querySelectorAll('section[id]');
  const offset = document.querySelector('.l-header')?.offsetHeight || 80;

  const scrollActive = () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - offset - 8;
      const sectionId = current.getAttribute('id');
      const link = document.querySelector(`.nav__menu a[href="#${sectionId}"]`);
      if (!link) return;
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        link.classList.add('active-link');
      } else {
        link.classList.remove('active-link');
      }
    });
  };

  window.addEventListener('scroll', scrollActive, { passive: true });
};

export const smoothScroll = () => {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (!target) return;
      const headerHeight = document.querySelector('.l-header')?.offsetHeight || 0;
      const top = target.offsetTop - headerHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
};

export const skillCardsInteraction = () => {
  const skillCards = document.querySelectorAll('.skill__card');
  skillCards.forEach(card => {
    card.addEventListener('click', function () {
      skillCards.forEach(c => c.classList.remove('active'));
      this.classList.add('active');
    });
    card.setAttribute('tabindex', '0');
    card.addEventListener('keypress', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        skillCards.forEach(c => c.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });
};

export const formValidation = () => {
  const form = document.querySelector('.contact__form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    const name = this.querySelector('input[name="name"]');
    const email = this.querySelector('input[name="email"]');
    const message = this.querySelector('textarea[name="message"]');

    let isValid = true;
    let errorMessage = '';

    if (!name.value.trim()) { isValid = false; errorMessage += 'Please enter your name.\n'; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) { isValid = false; errorMessage += 'Please enter your email.\n'; }
    else if (!emailRegex.test(email.value)) { isValid = false; errorMessage += 'Please enter a valid email address.\n'; }
    if (!message.value.trim()) { isValid = false; errorMessage += 'Please enter your message.\n'; }
    else if (message.value.trim().length < 10) { isValid = false; errorMessage += 'Message must be at least 10 characters long.\n'; }

    if (!isValid) { e.preventDefault(); alert(errorMessage); }
    else { console.log('Form valid — submitting.'); }
  });

  
  form.querySelectorAll('input,textarea').forEach(input => {
    input.addEventListener('blur', function () {
      this.style.borderColor = this.value.trim() ? 'rgba(43,170,255,0.6)' : '#ff6b6b';
    });
    input.addEventListener('focus', function () { this.style.borderColor = 'rgba(43,170,255,0.8)'; });
  });
};

export const backToTopButton = () => {
  const existing = document.querySelector('.back-to-top');
  if (existing) return; // 

  const button = document.createElement('button');
  button.className = 'back-to-top';
  button.setAttribute('aria-label', 'Back to top');
  button.innerHTML = '<i class="bx bx-up-arrow-alt"></i>';
  document.body.appendChild(button);

  const toggle = () => {
    if (window.scrollY > 400) { button.classList.add('show'); }
    else { button.classList.remove('show'); }
  };
  window.addEventListener('scroll', toggle, { passive: true });

  button.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
};

export const showLoadingAnimation = () => {
  document.body.style.opacity = '0';
  window.addEventListener('load', () => {
    document.body.style.transition = 'opacity 0.45s ease';
    document.body.style.opacity = '1';
  });
};

export const initUI = () => {
  toggleMenu();
  scrollHeader();
  activeSectionLink();
  smoothScroll();
  skillCardsInteraction();
  formValidation();
  backToTopButton();
  showLoadingAnimation();
  console.log('UI Module Initialized ✓');
};
