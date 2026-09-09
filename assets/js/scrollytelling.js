/**
 * LAKSHAY COMPUTER CARE - CLEAN SCROLLYTELLING & 3D CARD ENGINE
 * Professional doorstep computer, laptop, and CCTV service in Delhi
 */

(function () {
  'use strict';

  // --- 1. SMOOTH SCROLL ENGINE ---
  class SmoothScrollEngine {
    constructor() {
      this.scrollProgress = document.getElementById('scroll-progress');
      this.initLenis();
      this.bindAnchorClicks();
    }

    initLenis() {
      if (typeof Lenis !== 'undefined') {
        this.lenis = new Lenis({
          duration: 1.1,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          direction: 'vertical',
          smooth: true,
          smoothTouch: false,
          touchMultiplier: 1.2,
        });

        window.lenis = this.lenis;

        const raf = (time) => {
          this.lenis.raf(time);
          this.updateProgress();
          requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
      } else {
        window.addEventListener('scroll', () => this.updateProgress(), { passive: true });
      }
    }

    updateProgress() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (scrollHeight > 0 && this.scrollProgress) {
        const pct = (scrollTop / scrollHeight) * 100;
        this.scrollProgress.style.width = `${pct}%`;
      }
    }

    bindAnchorClicks() {
      document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.addEventListener('click', (e) => {
          const targetId = a.getAttribute('href');
          if (!targetId || targetId === '#' || !targetId.startsWith('#')) return;
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            if (this.lenis) {
              this.lenis.scrollTo(targetEl, { offset: -70 });
            } else {
              targetEl.scrollIntoView({ behavior: 'smooth' });
            }
          }
        });
      });
    }
  }

  // --- 2. 3D PERSPECTIVE TILT CARDS ENGINE ---
  class TiltCardEngine {
    constructor() {
      this.initCards();
    }

    initCards() {
      const cards = document.querySelectorAll('.card-3d, [data-tilt]');
      cards.forEach((card) => this.attachTilt(card));
    }

    attachTilt(card) {
      if (card._tiltDone) return;
      card._tiltDone = true;

      // Ensure subtle glare layer
      if (!card.querySelector('.card-glare')) {
        const glare = document.createElement('div');
        glare.className = 'card-glare';
        card.appendChild(glare);
      }

      const maxTilt = parseFloat(card.dataset.maxTilt) || 10; // Gentle, clean tilt angle

      const onMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -maxTilt;
        const rotateY = ((x - centerX) / centerX) * maxTilt;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;

        const pctX = (x / rect.width) * 100;
        const pctY = (y / rect.height) * 100;
        card.style.setProperty('--mouse-x', `${pctX.toFixed(1)}%`);
        card.style.setProperty('--mouse-y', `${pctY.toFixed(1)}%`);
      };

      const onMouseLeave = () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        card.style.transition = 'transform 0.4s ease-out';
        setTimeout(() => {
          card.style.transition = '';
        }, 400);
      };

      const onMouseEnter = () => {
        card.style.transition = 'none';
      };

      card.addEventListener('mousemove', onMouseMove, { passive: true });
      card.addEventListener('mouseleave', onMouseLeave);
      card.addEventListener('mouseenter', onMouseEnter);
    }

    refresh() {
      this.initCards();
    }
  }

  // --- 3. SCROLLYTELLING NARRATIVE SCENE MANAGER ---
  class ScrollytellingManager {
    constructor() {
      this.steps = document.querySelectorAll('.scrolly-story-step');
      this.stages = document.querySelectorAll('.stage-view');
      this.stageTag = document.getElementById('stage-telemetry-tag');
      this.init();
    }

    init() {
      if (!this.steps.length) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const stepIndex = entry.target.getAttribute('data-step');
              this.activateStep(stepIndex, entry.target);
            }
          });
        },
        {
          threshold: 0.3,
          rootMargin: '-20% 0px -20% 0px',
        }
      );

      this.steps.forEach((step) => observer.observe(step));
    }

    activateStep(stepIndex, stepEl) {
      this.steps.forEach((s) => s.classList.remove('active-step'));
      if (stepEl) stepEl.classList.add('active-step');

      this.stages.forEach((stage) => {
        if (stage.getAttribute('data-stage') === stepIndex) {
          stage.classList.add('stage-active');
        } else {
          stage.classList.remove('stage-active');
        }
      });

      if (this.stageTag) {
        const labels = {
          '1': 'STEP 01: QUICK DOORSTEP BOOKING',
          '2': 'STEP 02: 45-MIN DOORSTEP ARRIVAL',
          '3': 'STEP 03: TRANSPARENT ONSITE REPAIR',
          '4': 'STEP 04: QUALITY TESTED & 90-DAY WARRANTY',
        };
        this.stageTag.textContent = labels[stepIndex] || 'HOW OUR SERVICE WORKS';
      }
    }
  }

  // --- 4. 3D DIAGNOSTICS & LIVE ESTIMATOR ---
  class DiagnosticsEstimator {
    constructor() {
      this.cards = document.querySelectorAll('.triage-card');
      this.estTitle = document.getElementById('est-title');
      this.estDesc = document.getElementById('est-desc');
      this.estPrice = document.getElementById('est-price');
      this.estTime = document.getElementById('est-time');
      this.estIncludes = document.getElementById('est-includes');
      this.estWarranty = document.getElementById('est-warranty');
      this.estBookBtn = document.getElementById('est-book-btn');
      this.init();
    }

    init() {
      this.cards.forEach((card) => {
        card.addEventListener('click', () => {
          this.cards.forEach((c) => c.classList.remove('active-triage'));
          card.classList.add('active-triage');

          const title = card.getAttribute('data-title');
          const desc = card.getAttribute('data-desc');
          const time = card.getAttribute('data-time');
          const includes = card.getAttribute('data-includes');
          const warranty = card.getAttribute('data-warranty');

          if (this.estTitle) this.estTitle.textContent = title;
          if (this.estDesc) this.estDesc.textContent = desc;
          if (this.estPrice) this.estPrice.textContent = '';
          if (this.estTime) this.estTime.textContent = time;
          if (this.estIncludes) this.estIncludes.textContent = includes;
          if (this.estWarranty) this.estWarranty.textContent = warranty;
        });
      });

      if (this.estBookBtn) {
        this.estBookBtn.addEventListener('click', () => {
          const currentTitle = this.estTitle ? this.estTitle.textContent : 'Laptop Diagnostic Check';
          window.openBookingModal({
            title: currentTitle,
            reason: currentTitle,
            desc: `Selected service: ${currentTitle}`,
          });
        });
      }
    }
  }

  // --- 5. 3D REFURBISHED PRODUCT SHOWROOM ---
  class ProductShowroom {
    constructor(tiltEngine) {
      this.tiltEngine = tiltEngine;
      this.container = document.getElementById('product-grid');
      this.filterBtns = document.querySelectorAll('.filter-pill');
      this.products = [];
      this.currentFilter = 'all';
      this.init();
    }

    async init() {
      this.bindFilters();
      await this.loadProducts();
      this.render();
    }

    bindFilters() {
      this.filterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          this.filterBtns.forEach((b) => {
            b.classList.remove('bg-cyan-500/20', 'text-cyan-300', 'border-cyan-500/50');
            b.classList.add('bg-white/5', 'text-slate-400', 'border-white/10');
          });
          btn.classList.add('bg-cyan-500/20', 'text-cyan-300', 'border-cyan-500/50');
          btn.classList.remove('bg-white/5', 'text-slate-400', 'border-white/10');

          this.currentFilter = btn.getAttribute('data-filter') || 'all';
          this.render();
        });
      });
    }

    async loadProducts() {
      // 1. Check local storage first (Admin panel sync)
      const stored = localStorage.getItem('lcc_custom_products');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            this.products = parsed;
            return;
          }
        } catch (e) {
          console.warn('Failed parsing lcc_custom_products', e);
        }
      }

      // 2. Fetch from catalogue.json
      try {
        const res = await fetch('assets/products/catalogue.json');
        if (res.ok) {
          this.products = await res.json();
          return;
        }
      } catch (e) {
        console.warn('Failed loading catalogue.json', e);
      }

      // 3. Fallback catalogue
      this.products = [
        {
          id: 'vostro-3520',
          name: 'DELL Vostro 3520 (11th Gen Core i3)',
          category: 'Ultrabook',
          condition: 'Grade A+ Clean · 100% Tested',
          specs: 'Core i3-1115G4 · 8GB DDR4 RAM · 512GB NVMe SSD · 15.6" Full HD Anti-Glare',
          warranty: '6 Months Onsite Warranty',
          image_file: 'dell-vostro-3520.jpg',
          badge: 'Popular',
        },
        {
          id: 'asus-rog-g16',
          name: 'ASUS ROG Strix G16 Gaming (14th Gen i7)',
          category: 'Gaming',
          condition: 'Open Box Like-New · 100% Battery Health',
          specs: 'Intel Core i7-14650HX · 16GB DDR5 · 1TB Gen4 SSD · RTX 4060 8GB GDDR6 · 165Hz Display',
          warranty: '1 Year Full Warranty',
          image_file: 'asus-rog-strix-g16.jpg',
          badge: 'Gaming',
        },
        {
          id: 'dell-g15',
          name: 'DELL G15 5520 Gaming Edition',
          category: 'Gaming',
          condition: 'Grade A+ Clean · Certified Stress-Tested',
          specs: 'Intel Core i5-12500H · 16GB RAM · 512GB NVMe · RTX 3050 4GB · 120Hz Screen',
          warranty: '6 Months Warranty',
          image_file: 'dell-g15-gaming.jpg',
          badge: 'High Value',
        },
        {
          id: 'dell-inspiron-16-plus',
          name: 'Dell Inspiron 16 Plus (Core i7-13700H)',
          category: 'Ultrabook',
          condition: 'Open Box Mint · 0 Cycle Count',
          specs: 'Intel Core i7-13700H · 16GB RAM · 1TB NVMe · 16" 2.5K 16:10 Display · Thunderbolt 4',
          warranty: '6 Months Warranty',
          image_file: 'dell-inspiron-16-plus.png',
          badge: 'Creator Choice',
        },
        {
          id: 'dell-inspiron-14-touch',
          name: 'Dell Inspiron 14 (2-in-1 Touchscreen)',
          category: 'Touch',
          condition: 'Grade A+ Clean · Stylus Pen Supported',
          specs: 'Core i5-1135G7 · 8GB RAM · 512GB SSD · 14" Full HD Touch 360° Flip · Backlit Keys',
          warranty: '6 Months Warranty',
          image_file: 'dell-inspiron-14-2in1.jpg',
          badge: '2-in-1 Touch',
        },
        {
          id: 'lapcare-keyboard',
          name: 'Lapcare Wired USB Ergonomic Keyboard',
          category: 'Accessories',
          condition: 'Brand New Sealed Box',
          specs: 'Spill-Resistant Membrane Keys · 10M Keystroke Life · Braided Copper USB Cable',
          warranty: '1 Year Brand Replacement',
          image_file: 'lapcare-keyboard.jpg',
          badge: 'Accessory',
        },
        {
          id: 'lapcare-mouse',
          name: 'Lapcare USB Optical Precision Mouse',
          category: 'Accessories',
          condition: 'Brand New Sealed Box',
          specs: '1200 DPI Optical Sensor · Ambidextrous Comfort Grip · Smooth Teflon Gliders',
          warranty: '1 Year Brand Replacement',
          image_file: 'lapcare-mouse.jpg',
          badge: 'Accessory',
        },
      ];
    }

    render() {
      if (!this.container) return;

      const filtered = this.products.filter((p) => {
        if (this.currentFilter === 'all') return true;
        const cat = (p.category || '').toLowerCase();
        return cat.includes(this.currentFilter.toLowerCase());
      });

      if (filtered.length === 0) {
        this.container.innerHTML = `
          <div class="col-span-full py-12 text-center text-slate-400 font-mono text-xs border border-dashed border-white/10 rounded-2xl">
            No devices currently matching this category in stock. Contact our Delhi store via WhatsApp!
          </div>
        `;
        return;
      }

      this.container.innerHTML = filtered
        .map((p) => {
          let imgSrc = p.image_file ? `assets/products/${p.image_file}` : 'assets/logo.svg';
          if (p.image_file && (p.image_file.startsWith('http') || p.image_file.startsWith('data:'))) {
            imgSrc = p.image_file;
          }

          const waText = encodeURIComponent(
            `Hi Lakshay Computer Care, I am interested in ${p.name} from your Delhi store. Is it available?`
          );

          return `
            <div class="card-3d-wrap">
              <div class="card-3d p-3 sm:p-5 group cursor-pointer" data-max-tilt="10">
                <div class="card-glare"></div>

                <!-- Badge & Stock Status -->
                <div class="depth-subtle flex items-center justify-between gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                  <span class="px-2 sm:px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/25 text-[9px] sm:text-[11px] font-mono font-medium">
                    ${p.badge || p.category || 'Certified'}
                  </span>
                  <span class="px-1.5 sm:px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/20 text-[9px] sm:text-[10px] font-mono font-semibold">
                    In Stock
                  </span>
                </div>

                <!-- Product Image -->
                <div class="depth-image relative rounded-lg sm:rounded-xl overflow-hidden bg-slate-950/40 p-2 sm:p-4 h-28 sm:h-44 flex items-center justify-center border border-white/5 mb-2 sm:mb-3 group-hover:border-cyan-500/30 transition-colors">
                  <img 
                    src="${imgSrc}" 
                    alt="${p.name}" 
                    class="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    onerror="this.src='assets/logo.svg'"
                    loading="lazy"
                  />
                </div>

                <!-- Product Info -->
                <div class="depth-subtle flex-1 flex flex-col justify-between">
                  <div>
                    <div class="flex items-center gap-1 text-[9px] sm:text-[11px] text-emerald-400 font-mono mb-1">
                      <span class="material-symbols-outlined text-[11px] sm:text-[13px]">verified</span>
                      <span>${p.condition || 'Tested & Certified'}</span>
                    </div>
                    <h3 class="font-headline font-bold text-white text-xs sm:text-base group-hover:text-cyan-300 transition-colors line-clamp-1">
                      ${p.name}
                    </h3>
                    <p class="text-[10px] sm:text-xs text-slate-400 font-mono mt-0.5 sm:mt-1 leading-snug sm:leading-relaxed line-clamp-2">
                      ${p.specs}
                    </p>
                  </div>

                  <!-- Warranty & Actions -->
                  <div class="depth-pop pt-2 sm:pt-3 mt-2 sm:mt-3 border-t border-white/10">
                    <div class="flex items-center justify-between mb-2 sm:mb-3 text-[10px] sm:text-xs font-mono">
                      <div class="flex items-center gap-1.5 text-slate-300">
                        <span class="material-symbols-outlined text-xs sm:text-sm text-cyan-400">verified</span>
                        <span>${p.warranty || '6 Months Warranty'}</span>
                      </div>
                      <span class="text-emerald-400 font-semibold text-[10px]">Ready Stock</span>
                    </div>

                    <div class="depth-cta grid grid-cols-2 gap-1.5 sm:gap-2">
                      <a 
                        href="https://wa.me/919210721868?text=${waText}" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        class="py-1.5 sm:py-2 px-1 sm:px-2.5 rounded-lg sm:rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[10px] sm:text-xs flex items-center justify-center gap-1 sm:gap-1.5 transition-all whitespace-nowrap"
                      >
                        <span class="material-symbols-outlined text-[12px] sm:text-[15px]">chat</span> WhatsApp
                      </a>
                      <button 
                        type="button" 
                        onclick="window.openBookingModal({ title: '${p.name.replace(/'/g, "\\'")}', reason: 'Inquiry: ${p.name.replace(/'/g, "\\'")}', desc: 'Availability inquiry for ${p.name.replace(/'/g, "\\'")}' })" 
                        class="py-1.5 sm:py-2 px-1 sm:px-2.5 rounded-lg sm:rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/10 font-semibold text-[10px] sm:text-xs flex items-center justify-center gap-1 sm:gap-1.5 transition-all whitespace-nowrap"
                      >
                        <span class="material-symbols-outlined text-[12px] sm:text-[15px]">calendar_today</span> Inquire
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          `;
        })
        .join('');

      if (this.tiltEngine) {
        this.tiltEngine.refresh();
      }
    }
  }

  // --- 6. BOOKING DISPATCH MODAL & ADMIN INTEGRATION ---
  class BookingModalManager {
    constructor() {
      this.modal = document.getElementById('booking-modal');
      this.closeBtn = document.getElementById('close-modal-btn');
      this.form = document.getElementById('simple-enquiry-form');
      this.formView = document.getElementById('modal-form-view');
      this.successView = document.getElementById('modal-success-view');

      this.inputName = document.getElementById('enquiry-name');
      this.inputPhone = document.getElementById('enquiry-phone');
      this.inputArea = document.getElementById('enquiry-area');
      this.inputAddress = document.getElementById('enquiry-address');
      this.inputReason = document.getElementById('enquiry-reason');
      this.inputDesc = document.getElementById('enquiry-description');

      this.selectedPill = document.getElementById('modal-selected-service-pill');
      this.selectedText = document.getElementById('modal-selected-service-text');
      this.clearSelectedBtn = document.getElementById('clear-selected-service-btn');
      this.waQuickBtn = document.getElementById('whatsapp-quick-submit-btn');

      this.confirmedDoneBtn = document.getElementById('confirmed-done-btn');
      this.init();
    }

    init() {
      window.openBookingModal = (prefill = null) => this.open(prefill);
      window.closeBookingModal = () => this.close();

      document.querySelectorAll('.open-modal-trigger').forEach((btn) => {
        btn.addEventListener('click', () => {
          const serviceTitle = btn.getAttribute('data-service-title');
          const productTitle = btn.getAttribute('data-product-title');
          if (serviceTitle) {
            this.open({ title: serviceTitle, reason: serviceTitle });
          } else if (productTitle) {
            this.open({
              title: productTitle,
              reason: 'Second Hand Device Inquiry',
              desc: `Inquiring about ${productTitle}`,
            });
          } else {
            this.open();
          }
        });
      });

      if (this.closeBtn) this.closeBtn.addEventListener('click', () => this.close());
      if (this.confirmedDoneBtn) this.confirmedDoneBtn.addEventListener('click', () => this.close());

      if (this.modal) {
        this.modal.addEventListener('click', (e) => {
          if (e.target === this.modal) this.close();
        });
      }

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.modal && !this.modal.classList.contains('hidden-modal')) {
          this.close();
        }
      });

      // Quick area chips
      document.querySelectorAll('.area-chip').forEach((chip) => {
        chip.addEventListener('click', () => {
          if (this.inputArea) {
            this.inputArea.value = chip.textContent.trim();
            this.inputArea.focus();
          }
          this.updateWhatsAppLink();
        });
      });

      // WhatsApp sync
      [this.inputName, this.inputPhone, this.inputArea, this.inputAddress, this.inputReason, this.inputDesc].forEach(
        (el) => {
          if (el) {
            el.addEventListener('input', () => this.updateWhatsAppLink());
            el.addEventListener('change', () => this.updateWhatsAppLink());
          }
        }
      );

      if (this.form) {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
      }
    }

    open(prefill = null) {
      if (!this.modal) return;
      if (prefill) {
        if (this.selectedPill && this.selectedText) {
          this.selectedText.textContent = `Service: ${prefill.title || 'Computer Repair'}`;
          this.selectedPill.classList.remove('hidden');
        }
        if (prefill.reason && this.inputReason) this.inputReason.value = prefill.reason;
        if (prefill.desc && this.inputDesc) this.inputDesc.value = prefill.desc;
      }

      if (this.formView) this.formView.classList.remove('hidden');
      if (this.successView) this.successView.classList.add('hidden');
      this.modal.classList.remove('hidden-modal');
      document.body.style.overflow = 'hidden';
      if (this.inputName) this.inputName.focus();
      this.updateWhatsAppLink();
    }

    close() {
      if (!this.modal) return;
      this.modal.classList.add('hidden-modal');
      document.body.style.overflow = '';
    }

    updateWhatsAppLink() {
      if (!this.waQuickBtn) return;
      const name = this.inputName ? this.inputName.value.trim() : '';
      const phone = this.inputPhone ? this.inputPhone.value.trim() : '';
      const area = this.inputArea ? this.inputArea.value.trim() : '';
      const address = this.inputAddress ? this.inputAddress.value.trim() : '';
      const reason = this.inputReason ? this.inputReason.value : 'Laptop Repair';
      const desc = this.inputDesc ? this.inputDesc.value.trim() : '';

      let msg = `Hi Lakshay Computer Care, I need doorstep computer service:\n`;
      if (name) msg += `- Name: ${name}\n`;
      if (phone) msg += `- Phone: ${phone}\n`;
      if (area) msg += `- Area: ${area}\n`;
      if (address) msg += `- Address: ${address}\n`;
      msg += `- Service: ${reason}\n`;
      if (desc) msg += `- Notes: ${desc}\n`;

      this.waQuickBtn.href = `https://wa.me/919210721868?text=${encodeURIComponent(msg)}`;
    }

    handleSubmit(e) {
      e.preventDefault();

      const ticketNo = '#LCC-' + Math.floor(1000 + Math.random() * 9000);
      const name = (this.inputName && this.inputName.value) || 'Customer';
      const phone = (this.inputPhone && this.inputPhone.value) || '9210721868';
      const area = (this.inputArea && this.inputArea.value) || 'Delhi';
      const address = (this.inputAddress && this.inputAddress.value) || area;
      const reason = (this.inputReason && this.inputReason.value) || 'Laptop Repair';
      const desc = (this.inputDesc && this.inputDesc.value) || '';

      // Save enquiry to localStorage for Admin Panel
      try {
        const ENQUIRIES_KEY = 'lcc_customer_enquiries';
        const stored = JSON.parse(localStorage.getItem(ENQUIRIES_KEY) || '[]');
        const newLead = {
          id: ticketNo,
          date: new Date().toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
          name: name,
          phone: phone,
          area: area,
          address: address,
          service: reason,
          notes: desc,
          status: 'New Lead',
        };
        stored.unshift(newLead);
        localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(stored));
      } catch (err) {
        console.error('Error saving inquiry into localStorage', err);
      }

      // Success view
      const confirmedTicket = document.getElementById('confirmed-ticket');
      const confirmedName = document.getElementById('confirmed-name');
      const confirmedPhone = document.getElementById('confirmed-phone');
      const confirmedAddress = document.getElementById('confirmed-address');
      const confirmedReason = document.getElementById('confirmed-reason');
      const confirmedWhatsappBtn = document.getElementById('confirmed-whatsapp-btn');

      if (confirmedTicket) confirmedTicket.textContent = ticketNo;
      if (confirmedName) confirmedName.textContent = name;
      if (confirmedPhone) confirmedPhone.textContent = phone;
      if (confirmedAddress) confirmedAddress.textContent = `${address}${area ? ' (' + area + ')' : ''}`;
      if (confirmedReason) confirmedReason.textContent = reason;

      if (confirmedWhatsappBtn) {
        const waMsg = `Hi Lakshay Computer Care, I just requested doorstep service ${ticketNo}.\nName: ${name}\nPhone: ${phone}\nArea: ${area}\nAddress: ${address}\nService: ${reason}${desc ? '\nNotes: ' + desc : ''}`;
        confirmedWhatsappBtn.href = `https://wa.me/919210721868?text=${encodeURIComponent(waMsg)}`;
      }

      if (this.formView) this.formView.classList.add('hidden');
      if (this.successView) this.successView.classList.remove('hidden');
    }
  }

  // --- 7. MOBILE HAMBURGER NAVIGATION DRAWER ---
  class MobileNavManager {
    constructor() {
      this.hamburgerBtn = document.getElementById('hamburger-menu-btn');
      this.closeBtn = document.getElementById('close-mobile-nav');
      this.backdrop = document.getElementById('mobile-nav-backdrop');
      this.drawer = document.getElementById('mobile-nav-drawer');
      this.links = document.querySelectorAll('.drawer-nav-link');
      this.init();
    }

    init() {
      window.openMobileNav = () => this.open();
      window.closeMobileNav = () => this.close();

      if (this.hamburgerBtn) {
        this.hamburgerBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.open();
        });
      }
      if (this.closeBtn) {
        this.closeBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.close();
        });
      }
      if (this.backdrop) {
        this.backdrop.addEventListener('click', () => this.close());
      }

      this.links.forEach((link) => {
        link.addEventListener('click', () => {
          this.close();
        });
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.drawer && !this.drawer.classList.contains('translate-x-full')) {
          this.close();
        }
      });
    }

    open() {
      if (!this.drawer || !this.backdrop) return;
      this.backdrop.classList.remove('opacity-0', 'pointer-events-none');
      this.backdrop.classList.add('opacity-100', 'pointer-events-auto');
      this.drawer.classList.remove('translate-x-full');
      this.drawer.classList.add('translate-x-0');
      document.body.classList.add('overflow-hidden');
    }

    close() {
      if (!this.drawer || !this.backdrop) return;
      this.backdrop.classList.add('opacity-0', 'pointer-events-none');
      this.backdrop.classList.remove('opacity-100', 'pointer-events-auto');
      this.drawer.classList.add('translate-x-full');
      this.drawer.classList.remove('translate-x-0');
      document.body.classList.remove('overflow-hidden');
    }
  }

  // --- 8. INITIALIZE ---
  document.addEventListener('DOMContentLoaded', () => {
    const scrollEngine = new SmoothScrollEngine();
    const tiltEngine = new TiltCardEngine();
    const scrollyManager = new ScrollytellingManager();
    const triageEstimator = new DiagnosticsEstimator();
    const showroom = new ProductShowroom(tiltEngine);
    const modalManager = new BookingModalManager();
    const navManager = new MobileNavManager();
  });
})();
