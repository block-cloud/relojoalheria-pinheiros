document.addEventListener('DOMContentLoaded', () => {
  const currentYear = document.querySelector('.js-current-year');
  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  const revealItems = document.querySelectorAll('.reveal');
  const theoWidget = document.querySelector('.theo-widget');
  const theoClose = document.querySelector('.theo-close');

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  if (theoWidget && theoClose) {
    theoClose.addEventListener('click', () => {
      theoWidget.hidden = true;
    });
  }

  if (header) {
    const updateHeaderState = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 24);
    };

    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });
  }

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 760) {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  if (revealItems.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealItems.forEach((item) => observer.observe(item));
  }
});
