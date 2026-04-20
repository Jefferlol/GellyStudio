/* =============================================
   GELLY SKIN STUDIO — Main Application Script
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  // ── Loading Overlay ──
  const loadingOverlay = document.getElementById('loadingOverlay');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingOverlay.classList.add('hidden');
    }, 1800);
  });

  // ── Header Scroll Effect ──
  const header = document.getElementById('header');
  const scrollThreshold = 50;

  function handleScroll() {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  // ── Mobile Menu Toggle ──
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mainNav.classList.toggle('open');
    document.body.style.overflow = mainNav.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile nav on link click
  mainNav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      mainNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ── Smooth Scroll for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ── Scroll Animations (Intersection Observer) ──
  const animatedElements = document.querySelectorAll('.fade-up, .fade-in, .slide-left, .slide-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger animation by index
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 80);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  animatedElements.forEach(el => observer.observe(el));

  // ── Counter Animation ──
  function animateCounter(element, target) {
    let current = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const suffix = target >= 1000 ? '+' : '+';

    function update() {
      current += increment;
      if (current >= target) {
        element.textContent = target.toLocaleString('es-PE') + suffix;
        return;
      }
      element.textContent = Math.floor(current).toLocaleString('es-PE');
      requestAnimationFrame(update);
    }

    update();
  }

  const statNumbers = document.querySelectorAll('.stat-number[data-count]');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-count'));
        animateCounter(entry.target, target);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => statsObserver.observe(el));

  // ── Scroll to Top Button ──
  const scrollTopBtn = document.getElementById('scrollTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ── Gallery Carousel ──
  const galleryTrack = document.getElementById('galleryTrack');
  const galleryPrev = document.getElementById('galleryPrev');
  const galleryNext = document.getElementById('galleryNext');

  if (galleryTrack && galleryPrev && galleryNext) {
    const scrollAmount = 380;

    galleryNext.addEventListener('click', () => {
      galleryTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    galleryPrev.addEventListener('click', () => {
      galleryTrack.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
  }

  // =============================================
  // SERVICE TABS
  // =============================================
  const serviceTabs = document.querySelectorAll('.service-tab');
  const serviceCategories = document.querySelectorAll('.service-category');

  if (serviceTabs.length > 0 && serviceCategories.length > 0) {
    serviceTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        serviceTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        serviceCategories.forEach(cat => cat.classList.remove('active'));
        
        const categoryId = tab.getAttribute('data-category');
        const activeCategory = document.getElementById(`cat-${categoryId}`);
        if (activeCategory) {
          activeCategory.classList.add('active');
        }
      });
    });
  }

  // =============================================
  // BOOKING WIDGET — Full Interactive System
  // =============================================

  const bookingState = {
    currentStep: 1,
    selectedService: null,
    selectedPrice: null,
    selectedDate: null,
    selectedTime: null,
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear()
  };

  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM',
    '10:30 AM', '11:00 AM', '11:30 AM',
    '2:00 PM', '2:30 PM', '3:00 PM',
    '3:30 PM', '4:00 PM', '4:30 PM',
    '5:00 PM', '5:30 PM', '6:00 PM'
  ];

  // Step Navigation
  function goToStep(stepNum) {
    bookingState.currentStep = stepNum;

    // Update step indicators
    document.querySelectorAll('.step').forEach(s => {
      const sNum = parseInt(s.dataset.step);
      s.classList.remove('active', 'completed');
      if (sNum === stepNum) s.classList.add('active');
      if (sNum < stepNum) s.classList.add('completed');
    });

    // Show/hide step content
    document.querySelectorAll('.step-content').forEach(sc => sc.classList.remove('active'));
    document.getElementById(`step${stepNum}`).classList.add('active');

    // If step 3, populate confirmation
    if (stepNum === 3) {
      populateConfirmation();
    }
  }

  // ── Step 1: Service Selection ──
  const serviceOptions = document.querySelectorAll('.service-option');
  const btnStep1Next = document.getElementById('btnStep1Next');

  serviceOptions.forEach(option => {
    option.addEventListener('click', () => {
      serviceOptions.forEach(o => o.classList.remove('selected'));
      option.classList.add('selected');
      bookingState.selectedService = option.dataset.service;
      bookingState.selectedPrice = option.dataset.price;
      btnStep1Next.disabled = false;
    });
  });

  btnStep1Next.addEventListener('click', () => {
    if (bookingState.selectedService) {
      goToStep(2);
      renderCalendar();
    }
  });

  // ── Step 2: Calendar ──
  const calendarGrid = document.getElementById('calendarGrid');
  const calMonthYear = document.getElementById('calMonthYear');
  const calPrev = document.getElementById('calPrev');
  const calNext = document.getElementById('calNext');
  const timeSlotsContainer = document.getElementById('timeSlotsContainer');
  const timeSlotsGrid = document.getElementById('timeSlotsGrid');
  const btnStep2Next = document.getElementById('btnStep2Next');
  const btnStep2Back = document.getElementById('btnStep2Back');

  function renderCalendar() {
    const year = bookingState.currentYear;
    const month = bookingState.currentMonth;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    calMonthYear.textContent = `${months[month]} ${year}`;

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startPad = (firstDay.getDay() + 6) % 7; // Monday = 0

    calendarGrid.innerHTML = '';

    // Empty cells for padding
    for (let i = 0; i < startPad; i++) {
      const empty = document.createElement('div');
      empty.className = 'calendar-day empty';
      calendarGrid.appendChild(empty);
    }

    // Day cells
    for (let d = 1; d <= lastDay.getDate(); d++) {
      const dayEl = document.createElement('div');
      dayEl.className = 'calendar-day';
      dayEl.textContent = d;

      const cellDate = new Date(year, month, d);
      cellDate.setHours(0, 0, 0, 0);

      // Check if it's today
      if (cellDate.getTime() === today.getTime()) {
        dayEl.classList.add('today');
      }

      // Check if Sunday (6 in mon-start grid)
      const dayOfWeek = cellDate.getDay();
      if (dayOfWeek === 0 || cellDate < today) {
        dayEl.classList.add('disabled');
      } else {
        dayEl.addEventListener('click', () => selectDate(dayEl, cellDate));
      }

      calendarGrid.appendChild(dayEl);
    }
  }

  function selectDate(dayEl, date) {
    document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
    dayEl.classList.add('selected');

    bookingState.selectedDate = date;

    // Show time slots
    renderTimeSlots();
    timeSlotsContainer.style.display = 'block';
  }

  function renderTimeSlots() {
    timeSlotsGrid.innerHTML = '';
    bookingState.selectedTime = null;
    btnStep2Next.disabled = true;

    // Randomly disable some slots to simulate availability
    const seed = bookingState.selectedDate.getDate();
    
    timeSlots.forEach((slot, i) => {
      const slotEl = document.createElement('div');
      slotEl.className = 'time-slot';
      slotEl.textContent = slot;

      // Simple pseudo-random availability based on date
      const isAvailable = !((seed + i) % 5 === 0);

      if (isAvailable) {
        slotEl.addEventListener('click', () => selectTime(slotEl, slot));
      } else {
        slotEl.classList.add('disabled');
        slotEl.style.opacity = '0.35';
        slotEl.style.cursor = 'not-allowed';
        slotEl.style.textDecoration = 'line-through';
      }

      timeSlotsGrid.appendChild(slotEl);
    });
  }

  function selectTime(slotEl, time) {
    document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
    slotEl.classList.add('selected');
    bookingState.selectedTime = time;
    btnStep2Next.disabled = false;
  }

  calPrev.addEventListener('click', () => {
    bookingState.currentMonth--;
    if (bookingState.currentMonth < 0) {
      bookingState.currentMonth = 11;
      bookingState.currentYear--;
    }
    renderCalendar();
    timeSlotsContainer.style.display = 'none';
    btnStep2Next.disabled = true;
  });

  calNext.addEventListener('click', () => {
    bookingState.currentMonth++;
    if (bookingState.currentMonth > 11) {
      bookingState.currentMonth = 0;
      bookingState.currentYear++;
    }
    renderCalendar();
    timeSlotsContainer.style.display = 'none';
    btnStep2Next.disabled = true;
  });

  btnStep2Next.addEventListener('click', () => {
    if (bookingState.selectedDate && bookingState.selectedTime) {
      goToStep(3);
    }
  });

  btnStep2Back.addEventListener('click', () => goToStep(1));

  // ── Step 3: Confirmation ──
  const btnStep3Back = document.getElementById('btnStep3Back');
  const btnConfirm = document.getElementById('btnConfirm');

  function populateConfirmation() {
    document.getElementById('confirmService').textContent = bookingState.selectedService || '—';
    document.getElementById('confirmPrice').textContent = bookingState.selectedPrice || '—';
    document.getElementById('confirmTime').textContent = bookingState.selectedTime || '—';

    if (bookingState.selectedDate) {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      document.getElementById('confirmDate').textContent = 
        bookingState.selectedDate.toLocaleDateString('es-PE', options);
    }
  }

  btnStep3Back.addEventListener('click', () => goToStep(2));

  btnConfirm.addEventListener('click', () => {
    const name = document.getElementById('confirmName').value.trim();
    const phone = document.getElementById('confirmPhone').value.trim();

    if (!name || !phone) {
      // Shake effect on empty inputs
      if (!name) {
        const nameInput = document.getElementById('confirmName');
        nameInput.style.borderColor = '#e74c3c';
        nameInput.focus();
        setTimeout(() => nameInput.style.borderColor = '', 2000);
      }
      if (!phone) {
        const phoneInput = document.getElementById('confirmPhone');
        phoneInput.style.borderColor = '#e74c3c';
        if (name) phoneInput.focus();
        setTimeout(() => phoneInput.style.borderColor = '', 2000);
      }
      return;
    }

    // Format WhatsApp message
    const dateStr = bookingState.selectedDate
      ? bookingState.selectedDate.toLocaleDateString('es-PE', { 
          weekday: 'long', day: 'numeric', month: 'long' 
        })
      : '';

    const message = encodeURIComponent(
      `¡Hola Gelly! 💆‍♀️ Quiero agendar una cita:\n\n` +
      `📋 Servicio: ${bookingState.selectedService}\n` +
      `📅 Fecha: ${dateStr}\n` +
      `🕐 Hora: ${bookingState.selectedTime}\n` +
      `👤 Nombre: ${name}\n` +
      `📱 Teléfono: ${phone}\n\n` +
      `¡Gracias! 🌿`
    );

    window.open(`https://wa.me/51996238939?text=${message}`, '_blank');
  });

  // ── WhatsApp Float Animation ──
  const whatsappFloat = document.getElementById('whatsappFloat');
  const whatsappBubble = whatsappFloat.querySelector('.whatsapp-bubble');

  // Show bubble after 4 seconds
  setTimeout(() => {
    whatsappBubble.style.opacity = '1';
    whatsappBubble.style.transform = 'translateY(0) scale(1)';
    whatsappBubble.style.pointerEvents = 'all';

    // Hide after another 5 seconds
    setTimeout(() => {
      whatsappBubble.style.opacity = '0';
      whatsappBubble.style.transform = 'translateY(10px) scale(0.95)';
      whatsappBubble.style.pointerEvents = 'none';
    }, 5000);
  }, 4000);

  // ── Active Nav Link Highlight ──
  const sections = document.querySelectorAll('section[id]');
  
  function highlightActiveNav() {
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);

      if (link) {
        if (scrollPos >= top && scrollPos < top + height) {
          document.querySelectorAll('.nav-link').forEach(l => l.style.color = '');
          link.style.color = '#4A5D3C';
        }
      }
    });
  }

  window.addEventListener('scroll', highlightActiveNav, { passive: true });

  // ── Parallax-like subtle effect on hero image ──
  const heroImage = document.querySelector('.hero-image-main');
  if (heroImage) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.08}px)`;
      }
    }, { passive: true });
  }
});
