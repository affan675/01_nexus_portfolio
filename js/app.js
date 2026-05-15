/* js/app.js */
/* Initializes theme, hamburger menu, smooth scroll, scroll animations, tab visibility, and dispatches 'components-ready' */

(function () {
  'use strict';

  // Wait until DOM is fully parsed
  document.addEventListener('DOMContentLoaded', () => {

    /* ========== DOM references ========== */
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle?.querySelector('.theme-icon');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link, .nav-cta'); // all clickable links inside nav
    const heroSection = document.getElementById('home');
    const originalTitle = 'Affan Adil | Polymath & Developer';

    /* ========== THEME MANAGEMENT ========== */
    function setTheme(theme) {
      body.setAttribute('data-theme', theme);
      localStorage.setItem('nexus-theme', theme);
      if (themeIcon) {
        themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
      }
    }

    function toggleTheme() {
      const current = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      setTheme(current);
    }

    // Load saved theme or default to 'dark'
    const savedTheme = localStorage.getItem('nexus-theme') || 'dark';
    setTheme(savedTheme);

    // Theme toggle button event
    if (themeToggle) {
      themeToggle.addEventListener('click', toggleTheme);
    }

    /* ========== HAMBURGER MENU (pure CSS toggle, JS for close on click) ========== */
    function closeNav() {
      if (navToggle && navToggle.checked) {
        navToggle.checked = false;
      }
    }

    // Close nav when a nav link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        // If it's an anchor link to a section, we handle smooth scroll manually
        const href = link.getAttribute('href');
        if (href && href.startsWith('#') && href.length > 1) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            smoothScrollTo(target);
          }
        }
        closeNav();
      });
    });

    // Close nav on outside click (only when menu is open)
    document.addEventListener('click', (e) => {
      if (!navToggle || !navToggle.checked) return;
      const target = e.target;
      // Check if click is outside navMenu and not on the hamburger label
      if (!navMenu.contains(target) && !target.closest('.hamburger')) {
        closeNav();
      }
    });

    // Also close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navToggle && navToggle.checked) {
        closeNav();
      }
    });

    /* ========== SMOOTH SCROLL WITH OFFSET ========== */
    const navbarHeight = 70; // matches .navbar-inner height + border

    function smoothScrollTo(element) {
      const top = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      window.scrollTo({
        top,
        behavior: 'smooth'
      });
    }

    // Also handle any other anchor links (e.g., hero CTA) that might not be nav items
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      // Skip those already handled by navLinks
      if (!anchor.classList.contains('nav-link') && !anchor.classList.contains('nav-cta')) {
        anchor.addEventListener('click', function (e) {
          const href = this.getAttribute('href');
          if (href === '#') return;
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            smoothScrollTo(target);
          }
        });
      }
    });

    /* ========== SCROLL ANIMATIONS (Intersection Observer) ========== */
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          // Handle single elements
          if (el.classList.contains('animate-on-scroll')) {
            el.classList.add('visible');
          }
          // Handle containers that stagger children
          if (el.classList.contains('stagger-children')) {
            el.classList.add('reveal-children');
          }
          // Unobserve after animation triggers once
          observer.unobserve(el);
        }
      });
    }, observerOptions);

    // Observe all initial elements with animation classes
    document.querySelectorAll('.animate-on-scroll, .stagger-children').forEach(el => {
      observer.observe(el);
    });

    // (Optional) If more elements are added dynamically, we could call observe again.

    /* ========== TAB VISIBILITY (Browser tab change) ========== */
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        document.title = '😢 Come back, explorer!';
      } else {
        document.title = originalTitle;
        // Trigger hero subtle opacity pulse
        if (heroSection) {
          heroSection.classList.add('attention-pulse');
          // Remove class after animation ends to allow re-trigger
          const onAnimationEnd = () => {
            heroSection.classList.remove('attention-pulse');
            heroSection.removeEventListener('animationend', onAnimationEnd);
          };
          heroSection.addEventListener('animationend', onAnimationEnd);
        }
      }
    });

    /* ========== DISPATCH COMPONENTS-READY ========== */
    // Signal that all DOM init is complete
    const event = new CustomEvent('components-ready', { bubbles: true });
    document.dispatchEvent(event);

    // Also mark body as loaded (optional, can be used for additional styling)
    body.classList.add('js-loaded');
  });

})();