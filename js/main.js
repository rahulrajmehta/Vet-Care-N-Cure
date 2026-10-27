/**
 * Vet Care N Cure - Interactive Features & Conversion Logic
 * High-performance, zero external dependency vanilla JS
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initClinicStatus();
  initAppointmentModal();
  initDeliveryModal();
  initGalleryFilter();
  initFaqAccordion();
  initServiceCalculator();
  initVideoControls();
});

// Clinic Open / Closed Realtime Indicator
function initClinicStatus() {
  const statusBadge = document.getElementById('clinicStatusBadge');
  if (!statusBadge) return;

  const now = new Date();
  const currentHour = now.getHours();
  // Open daily from 9:00 AM to 10:00 PM (22:00)
  const isOpen = currentHour >= 9 && currentHour < 22;

  if (isOpen) {
    statusBadge.innerHTML = `
      <span class="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse mr-2"></span>
      <span class="text-emerald-800 font-semibold text-xs uppercase tracking-wider">Open Today Till 10:00 PM</span>
    `;
    statusBadge.classList.add('bg-emerald-50', 'border-emerald-200');
  } else {
    statusBadge.innerHTML = `
      <span class="inline-block w-2.5 h-2.5 rounded-full bg-amber-500 mr-2"></span>
      <span class="text-amber-800 font-semibold text-xs uppercase tracking-wider">Opens at 9:00 AM (Emergency Support On-Call)</span>
    `;
    statusBadge.classList.add('bg-amber-50', 'border-amber-200');
  }
}

// Navigation & Mobile Menu
function initNavbar() {
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeMenu = document.getElementById('closeMobileMenu');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      document.body.classList.toggle('overflow-hidden');
    });

    if (closeMenu) {
      closeMenu.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      });
    }

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      });
    });
  }

  // Header background on scroll
  const header = document.getElementById('mainHeader');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('shadow-md', 'bg-white/95');
        header.classList.remove('bg-white/90');
      } else {
        header.classList.remove('shadow-md');
        header.classList.add('bg-white/90');
      }
    });
  }
}

// Appointment Booking Modal & WhatsApp Automation
function initAppointmentModal() {
  const modal = document.getElementById('appointmentModal');
  const openButtons = document.querySelectorAll('.open-appointment-modal');
  const closeBtn = document.getElementById('closeAppointmentModal');
  const form = document.getElementById('appointmentForm');

  if (!modal) return;

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      document.body.classList.add('overflow-hidden');
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.classList.remove('overflow-hidden');
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Handle Form Submission -> WhatsApp Link Generation
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const ownerName = document.getElementById('appOwnerName').value.trim();
      const phone = document.getElementById('appPhone').value.trim();
      const petType = document.getElementById('appPetType').value;
      const petBreed = document.getElementById('appPetBreed').value.trim();
      const service = document.getElementById('appService').value;
      const date = document.getElementById('appDate').value;
      const timeSlot = document.getElementById('appTimeSlot').value;
      const notes = document.getElementById('appNotes').value.trim();

      const message = `Hello Vet Care N Cure Jamshedpur!\n` +
        `I would like to book an appointment:\n\n` +
        `🐾 Pet Parent: ${ownerName}\n` +
        `📱 Phone: ${phone}\n` +
        `🐶 Pet: ${petType} (${petBreed || 'Breed not specified'})\n` +
        `🩺 Service Required: ${service}\n` +
        `📅 Date: ${date || 'Earliest Available'}\n` +
        `⏰ Preferred Time: ${timeSlot}\n` +
        `📝 Symptoms / Notes: ${notes || 'Regular Checkup'}\n\n` +
        `Location: Baridih Clinic (Beside R.K. Aquarium)`;

      const encodedMsg = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/918540803332?text=${encodedMsg}`;

      showToast('Redirecting to WhatsApp to confirm your slot...');
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        closeModal();
        form.reset();
      }, 1000);
    });
  }
}

// Delivery / Pet Supply Order Modal
function initDeliveryModal() {
  const modal = document.getElementById('deliveryModal');
  const openButtons = document.querySelectorAll('.open-delivery-modal');
  const closeBtn = document.getElementById('closeDeliveryModal');
  const form = document.getElementById('deliveryForm');

  if (!modal) return;

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      document.body.classList.add('overflow-hidden');
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.classList.remove('overflow-hidden');
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const customerName = document.getElementById('delCustomerName').value.trim();
      const phone = document.getElementById('delPhone').value.trim();
      const area = document.getElementById('delArea').value;
      const fullAddress = document.getElementById('delAddress').value.trim();
      const items = document.getElementById('delItems').value.trim();

      const message = `🐾 *Vet Care N Cure - Doorstep Delivery Order* 🐾\n\n` +
        `👤 Customer Name: ${customerName}\n` +
        `📞 Phone Number: ${phone}\n` +
        `📍 Delivery Area: ${area}, Jamshedpur\n` +
        `🏠 Complete Address: ${fullAddress}\n` +
        `📦 Order Details / Brand Needed:\n${items}\n\n` +
        `Please confirm item availability, total bill and delivery schedule. Thank you!`;

      const encodedMsg = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/918540803332?text=${encodedMsg}`;

      showToast('Creating your delivery order on WhatsApp...');
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        closeModal();
        form.reset();
      }, 1000);
    });
  }
}

// Interactive Gallery Filter
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (!filterBtns.length || !galleryItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-filter');

      // Update active button styling
      filterBtns.forEach(b => {
        b.classList.remove('bg-emerald-800', 'text-white', 'shadow-md');
        b.classList.add('bg-white', 'text-slate-700', 'hover:bg-slate-100');
      });
      btn.classList.remove('bg-white', 'text-slate-700', 'hover:bg-slate-100');
      btn.classList.add('bg-emerald-800', 'text-white', 'shadow-md');

      // Filter gallery cards
      galleryItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (category === 'all' || itemCat === category) {
          item.style.display = 'block';
          item.classList.add('animate-fadeIn');
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// FAQ Accordion
function initFaqAccordion() {
  const faqHeaders = document.querySelectorAll('.faq-header');

  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isOpen = item.classList.contains('active');

      // Close all other FAQs
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

      // Toggle clicked item
      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });
}

// Service Calculator / Package Estimator
function initServiceCalculator() {
  const petTypeSelect = document.getElementById('calcPetType');
  const serviceSelect = document.getElementById('calcService');
  const addGroomingCheck = document.getElementById('calcGrooming');
  const addDeWormingCheck = document.getElementById('calcDeworming');
  const totalDisplay = document.getElementById('calcTotalEstimate');
  const summaryDisplay = document.getElementById('calcSummaryText');

  if (!petTypeSelect || !serviceSelect || !totalDisplay) return;

  function calculate() {
    let base = 0;
    const pet = petTypeSelect.value;
    const service = serviceSelect.value;

    // Service pricing structure
    if (service === 'consultation') {
      base = 350;
    } else if (service === 'vaccination') {
      base = pet === 'cat' ? 750 : 850;
    } else if (service === 'full_checkup') {
      base = 1200;
    } else if (service === 'grooming_spa') {
      base = pet === 'cat' ? 999 : (pet === 'large_dog' ? 1499 : 1199);
    } else if (service === 'surgery_eval') {
      base = 600;
    }

    if (addGroomingCheck && addGroomingCheck.checked && service !== 'grooming_spa') {
      base += 600;
    }

    if (addDeWormingCheck && addDeWormingCheck.checked) {
      base += 200;
    }

    totalDisplay.textContent = `₹${base}`;
    if (summaryDisplay) {
      summaryDisplay.textContent = `Estimated transparent pricing for ${pet.replace('_', ' ')}: Includes consultation, disposable consumables & digital prescription.`;
    }
  }

  [petTypeSelect, serviceSelect, addGroomingCheck, addDeWormingCheck].forEach(el => {
    if (el) el.addEventListener('change', calculate);
  });

  calculate();
}

// Video Controls & Fallback Management
function initVideoControls() {
  const heroVideo = document.getElementById('heroBgVideo');
  const togglePlayBtn = document.getElementById('toggleVideoPlay');
  const toggleMuteBtn = document.getElementById('toggleVideoSound');

  if (!heroVideo) return;

  // Auto-play attempt
  heroVideo.play().catch(err => {
    console.log('Video autoplay prevented by browser policies, fallback poster engaged.', err);
  });

  if (togglePlayBtn) {
    togglePlayBtn.addEventListener('click', () => {
      if (heroVideo.paused) {
        heroVideo.play();
        togglePlayBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
      } else {
        heroVideo.pause();
        togglePlayBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
      }
    });
  }

  if (toggleMuteBtn) {
    toggleMuteBtn.addEventListener('click', () => {
      heroVideo.muted = !heroVideo.muted;
      if (heroVideo.muted) {
        toggleMuteBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
      } else {
        toggleMuteBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
      }
    });
  }
}

// Toast Alert Utility
function showToast(text) {
  let toast = document.getElementById('globalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'globalToast';
    toast.className = 'fixed top-20 right-5 z-[9999] bg-emerald-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 transform translate-y-[-20px] opacity-0 transition-all duration-300 font-medium text-sm border border-emerald-700';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fa-solid fa-circle-check text-amber-400 text-lg"></i><span>${text}</span>`;
  toast.style.transform = 'translateY(0)';
  toast.style.opacity = '1';

  setTimeout(() => {
    toast.style.transform = 'translateY(-20px)';
    toast.style.opacity = '0';
  }, 3500);
}

// Copy Plus Code or Text to Clipboard
function copyToClipboard(text, alertMsg = 'Copied to clipboard!') {
  navigator.clipboard.writeText(text).then(() => {
    showToast(alertMsg);
  }).catch(() => {
    showToast(`Code: ${text}`);
  });
}
