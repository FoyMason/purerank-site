/* ============================================
   PureRank Strategies — App JavaScript
   Navigation, Animations, Interactions
   ============================================ */

(function() {
  'use strict';

  // ========== NAVBAR SCROLL EFFECT ==========
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;

  function handleNavScroll() {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // Init on load

  // ========== HAMBURGER MENU ==========
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function() {
      const isActive = this.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      this.setAttribute('aria-expanded', isActive);
      document.body.style.overflow = isActive ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // ========== SCROLL REVEAL ==========
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger-children');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealElements.forEach(function(el) { revealObserver.observe(el); });
  } else {
    revealElements.forEach(function(el) { el.classList.add('revealed'); });
  }

  // ========== FAQ ACCORDION ==========
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function(item) {
    const question = item.querySelector('.faq-question');
    if (!question) return;
    question.addEventListener('click', function() {
      const isActive = item.classList.contains('active');
      faqItems.forEach(function(otherItem) {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherQ = otherItem.querySelector('.faq-question');
          if (otherQ) otherQ.setAttribute('aria-expanded', 'false');
        }
      });
      item.classList.toggle('active');
      question.setAttribute('aria-expanded', !isActive);
    });
  });

  // ========== BLOG CATEGORY FILTERS ==========
  const filterBtns = document.querySelectorAll('.blog-filter-btn');
  const blogCards = document.querySelectorAll('.blog-card[data-category]');
  if (filterBtns.length > 0 && blogCards.length > 0) {
    filterBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');
        filterBtns.forEach(function(b) { b.classList.remove('active'); });
        this.classList.add('active');
        blogCards.forEach(function(card) {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = '';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            requestAnimationFrame(function() {
              requestAnimationFrame(function() {
                card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
              });
            });
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ========== CONTACT FORM ==========
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalHTML = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Sending...';
      submitBtn.disabled = true;
      setTimeout(function() {
        submitBtn.innerHTML = 'Message Sent!';
        submitBtn.style.background = '#22c55e';
        setTimeout(function() {
          submitBtn.innerHTML = originalHTML;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
          contactForm.reset();
        }, 3000);
      }, 1500);
    });
  }

  // ========== ACTIVE NAV LINK ==========
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinksAll = document.querySelectorAll('.nav-links a:not(.btn)');
  navLinksAll.forEach(function(link) {
    const href = link.getAttribute('href');
    if (href && href.includes(currentPage)) { link.classList.add('active'); }
  });

  // ========== SMOOTH SCROLL ==========
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ========== SPIN KEYFRAME ==========
  const style = document.createElement('style');
  style.textContent = '@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }';
  document.head.appendChild(style);

  // ========== RESPONSIVE RESULT CARDS ==========
  function handleResultCards() {
    const resultCards = document.querySelectorAll('.result-card[style*="grid-template-columns: 1fr 1.5fr"]');
    const isMobile = window.innerWidth <= 768;
    resultCards.forEach(function(card) {
      if (isMobile) {
        card.style.gridTemplateColumns = '1fr';
        card.style.gap = '24px';
        card.style.padding = '28px';
      } else {
        card.style.gridTemplateColumns = '1fr 1.5fr';
        card.style.gap = '40px';
        card.style.padding = '48px';
      }
    });
  }
  handleResultCards();
  window.addEventListener('resize', handleResultCards, { passive: true });

})();