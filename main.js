lucide.createIcons();
    document.querySelectorAll('.project-slider').forEach(slider => {
    const prevBtn = slider.querySelector('.slider-btn.prev');
    if (prevBtn) prevBtn.style.visibility = 'hidden';
    });

    function handleCardClick(event, card) {
      if (event.target.closest('.project-details-body')) return;
      card.classList.toggle('expanded');
    }

    function getSliderState(slider) {
      if (slider._index === undefined) slider._index = 0;
      return slider._index;
    }

    function applySlide(slider, index) {
    const count = parseInt(slider.dataset.count);
    index = ((index % count) + count) % count;
    slider._index = index;
    slider.querySelector('.slider-track').style.transform = `translateX(-${index * 100}%)`;
    slider.querySelectorAll('.slider-dot').forEach((d, i) => {
      d.classList.toggle('active', i === index);
    });
   const prevBtn = slider.querySelector('.slider-btn.prev');
   const nextBtn = slider.querySelector('.slider-btn.next');
   if (prevBtn) prevBtn.style.visibility = index === 0 ? 'hidden' : 'visible';
   if (nextBtn) nextBtn.style.visibility = index === count - 1 ? 'hidden' : 'visible';
   }

    function slideMove(e, btn, dir) {
      e.stopPropagation();
      const slider = btn.closest('.project-slider');
      applySlide(slider, getSliderState(slider) + dir);
    }

    function slideTo(e, dot, index) {
      e.stopPropagation();
      const slider = dot.closest('.project-slider');
      applySlide(slider, index);
    }

    document.querySelectorAll('.project-slider').forEach(slider => {
      let startX = 0;
      slider.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
      slider.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        const current = getSliderState(slider);
        const count = parseInt(slider.dataset.count);
        if (diff > 0 && current < count - 1) applySlide(slider, current + 1);
        if (diff < 0 && current > 0) applySlide(slider, current - 1);
      }
    });
    });


    const hamburger  = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
    });

    function closeMobile() {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
    }

    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) closeMobile();
    });

    const progressBar = document.getElementById('progressBar');
    window.addEventListener('scroll', () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = (window.scrollY / total * 100) + '%';
    });


    const scrollTopBtn = document.getElementById('scrollTopBtn');
    window.addEventListener('scroll', () => {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    });
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.remove('active'));
          const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(s => navObserver.observe(s));

    const style = document.createElement('style');
    style.textContent = `.nav-links a.active { color: var(--accent) !important; }
      .nav-links a.active::after { transform: scaleX(1) !important; }`;
    document.head.appendChild(style);