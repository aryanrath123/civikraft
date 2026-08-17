import {
  animate,
  inView,
  scroll,
  stagger,
} from "https://cdn.jsdelivr.net/npm/motion@latest/+esm";

const SITE_IMAGES = {
  hero: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=85",
  restaurant:
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1000&q=80",
  gym: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1000&q=80",
  business:
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80",
  civic:
    "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1000&q=80",
  project1:
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85",
  project2:
    "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1200&q=85",
  project3:
    "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1200&q=85",
  project4:
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85",
};

const PROJECTS_DATA = {
  cafeflow: {
    title: "CafeFlow",
    category: "Restaurant Technology",
    details: {
      Project: "Restaurant digital ecosystem",
      Industry: "Food & Beverage",
      Challenge:
        "Streamline ordering, bookings, and customer management for modern cafes and restaurants.",
      Solution:
        "A unified platform combining POS, online ordering, reservations, and loyalty programs.",
      Features:
        "Order management, table booking, customer CRM, analytics dashboard",
      Technology: "React, Node.js, PostgreSQL, Firebase",
    },
  },
  fitforge: {
    title: "FitForge",
    category: "Fitness Technology",
    details: {
      Project: "Gym management platform",
      Industry: "Fitness & Wellness",
      Challenge:
        "Automate member management and class scheduling for gyms and fitness studios.",
      Solution:
        "A comprehensive gym management system with member portals and staff tools.",
      Features:
        "Member database, class booking, attendance tracking, payment processing",
      Technology: "Flutter, Python, Django, MySQL",
    },
  },
  civicconnect: {
    title: "CivicConnect",
    category: "Civic Technology",
    details: {
      Project: "Public service platform",
      Industry: "Public Sector",
      Challenge:
        "Digitize civic services and make them accessible to citizens.",
      Solution:
        "An intuitive platform for service applications and information dissemination.",
      Features:
        "Service applications, document uploads, status tracking, public information portal",
      Technology: "React, Node.js, MongoDB, AWS",
    },
  },
  localbiz: {
    title: "LocalBiz",
    category: "Business Platform",
    details: {
      Project: "Small business digital platform",
      Industry: "Small Business",
      Challenge: "Help small businesses establish a strong digital presence.",
      Solution:
        "A turnkey digital platform with website, booking, and lead management.",
      Features:
        "Custom website, online booking, lead tracking, email marketing",
      Technology: "Next.js, Firebase, Stripe, Tailwind",
    },
  },
};

const $ = (sel, scope = document) => scope.querySelector(sel);
const $$ = (sel, scope = document) => [...scope.querySelectorAll(sel)];

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
const finePointer = window.matchMedia("(pointer: fine)").matches;
const isDesktop =
  window.matchMedia("(min-width: 1024px)").matches && finePointer;

const dom = {
  loader: $("#loader"),
  loaderText: $("#loaderText"),
  scrollProgress: $("#scrollProgress"),
  cursorDot: $("#cursorDot"),
  cursorRing: $("#cursorRing"),
  navbar: $("#navbar"),
  hamburger: $("#hamburger"),
  mobileMenu: $("#mobileMenu"),
  mobileMenuClose: $(".mobile-menu-close"),
  heroParticles: $("#heroParticles"),
  servicePreview: $("#servicePreview"),
  servicePreviewImg: $("#servicePreview img"),
  industryTrack: $("#industryTrack"),
  projectModal: $("#projectModal"),
  modalOverlay: $("#modalOverlay"),
  modalClose: $("#modalClose"),
  modalTitle: $("#modalTitle"),
  modalCategory: $("#modalCategory"),
  modalDetails: $("#modalDetails"),
  testimonialTrack: $("#testimonialTrack"),
  prevTestimonial: $("#prevTestimonial"),
  nextTestimonial: $("#nextTestimonial"),
  testimonialProgress: $("#testimonialProgress"),
  contactForm: $("#contactForm"),
  formSuccess: $("#formSuccess"),
  storySection: $(".story-section"),
  storyTrack: $("#storyTrack"),
  heroImageMask: $(".hero-image-mask"),
  heroImg: $(".hero-img"),
};

function setBodyLock(locked) {
  document.body.style.overflow = locked ? "hidden" : "";
}

function initLoader() {
  if (!dom.loader) return;
  if (prefersReducedMotion) {
    dom.loader.classList.add("hidden");
    initHeroAnimations();
    return;
  }
  setTimeout(() => {
    dom.loader.classList.add("hidden");
    initHeroAnimations();
  }, 800);
}

function initCursor() {
  if (!dom.cursorDot || !dom.cursorRing) return;
  if (!isDesktop || prefersReducedMotion) {
    dom.cursorDot.style.display = "none";
    dom.cursorRing.style.display = "none";
    document.body.style.cursor = "auto";
    return;
  }
  document.body.classList.add("cursor-active");
  let mouseX = window.innerWidth / 2,
    mouseY = window.innerHeight / 2;
  let ringX = mouseX,
    ringY = mouseY;

  window.addEventListener(
    "pointermove",
    (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dom.cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    },
    { passive: true },
  );

  (function animateRing() {
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;
    dom.cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateRing);
  })();

  $$(
    "a, button, .service-item, .project-card, .industry-item, .orbit-node, .stat, .filter-btn",
  ).forEach((el) => {
    el.addEventListener("mouseenter", () => {
      dom.cursorRing.classList.remove(
        "cursor-hover",
        "cursor-view",
        "cursor-explore",
      );
      if (el.matches(".project-card, .industry-item"))
        dom.cursorRing.classList.add("cursor-view");
      else if (el.matches(".service-item, .orbit-node"))
        dom.cursorRing.classList.add("cursor-explore");
      else dom.cursorRing.classList.add("cursor-hover");
    });
    el.addEventListener("mouseleave", () => {
      dom.cursorRing.classList.remove(
        "cursor-hover",
        "cursor-view",
        "cursor-explore",
      );
    });
  });
}

function initMagneticButtons() {
  if (!isDesktop || prefersReducedMotion) return;
  $$(".magnetic").forEach((btn) => {
    btn.addEventListener("pointermove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    btn.addEventListener("pointerleave", () => {
      btn.style.transform = "translate(0, 0)";
    });
  });
}

function initScrollProgress() {
  if (!dom.scrollProgress) return;
  window.addEventListener(
    "scroll",
    () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      dom.scrollProgress.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
    },
    { passive: true },
  );
}

function initNavigation() {
  if (!dom.navbar || !dom.hamburger || !dom.mobileMenu) return;

  const syncNavbar = () => {
    dom.navbar.classList.toggle("scrolled", window.scrollY > 40);
  };

  const closeMenu = () => {
    dom.hamburger.classList.remove("active");
    dom.hamburger.setAttribute("aria-expanded", "false");
    dom.mobileMenu.classList.remove("active");
    dom.mobileMenu.setAttribute("aria-hidden", "true");
    setBodyLock(false);
  };

  dom.hamburger.addEventListener("click", () => {
    const open = !dom.mobileMenu.classList.contains("active");
    dom.hamburger.classList.toggle("active", open);
    dom.hamburger.setAttribute("aria-expanded", String(open));
    dom.mobileMenu.classList.toggle("active", open);
    dom.mobileMenu.setAttribute("aria-hidden", String(!open));
    setBodyLock(open);
  });

  dom.mobileMenuClose?.addEventListener("click", closeMenu);
  $$(".mobile-link, .mobile-cta", dom.mobileMenu).forEach((link) =>
    link.addEventListener("click", closeMenu),
  );
  window.addEventListener("scroll", syncNavbar, { passive: true });
  syncNavbar();

  const navLinks = $$(".nav-link");
  const sections = $$("main section[id]");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          navLinks.forEach((link) =>
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${id}`,
            ),
          );
        });
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
  }
}

function initHeroAnimations() {
  if (prefersReducedMotion) return;
  const heroElements = $$("[data-hero]");
  if (heroElements.length) {
    animate(
      heroElements,
      { opacity: [0, 1], y: [20, 0] },
      { duration: 0.7, delay: stagger(0.08), easing: [0.22, 1, 0.36, 1] },
    );
  }
  $$(".eco-card").forEach((card, i) => {
    animate(
      card,
      { y: [0, -6, 0] },
      {
        duration: 5 + i * 0.3,
        repeat: Infinity,
        easing: "easeInOut",
        delay: i * 0.2,
      },
    );
  });
}

function initHeroParticles() {
  if (!dom.heroParticles || prefersReducedMotion) return;
  const count = window.innerWidth < 768 ? 10 : 20;
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    p.style.cssText = `position:absolute;width:2px;height:2px;top:${Math.random() * 100}%;left:${Math.random() * 100}%;border-radius:50%;background:rgba(255,255,255,${0.15 + Math.random() * 0.3});pointer-events:none;`;
    fragment.appendChild(p);
  }
  dom.heroParticles.replaceChildren(fragment);
  $$("span", dom.heroParticles).forEach((p, i) => {
    animate(
      p,
      { y: [0, -30 - Math.random() * 30, 0], opacity: [0.2, 0.7, 0.2] },
      {
        duration: 3 + Math.random() * 3,
        repeat: Infinity,
        delay: i * 0.1,
        easing: "easeInOut",
      },
    );
  });
}

function initRevealAnimations() {
  if (prefersReducedMotion) return;
  $$("[data-reveal]").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    inView(
      el,
      () => {
        animate(
          el,
          { opacity: [0, 1], y: [24, 0] },
          { duration: 0.6, easing: [0.22, 1, 0.36, 1] },
        );
      },
      { amount: 0.3 },
    );
  });
}

function initServiceInteractions() {
  const items = $$(".service-item");
  if (!dom.servicePreview || !dom.servicePreviewImg || !items.length) return;
  if (isDesktop && !prefersReducedMotion) {
    items.forEach((item) => {
      const update = (e) => {
        dom.servicePreview.style.left = `${Math.min(e.clientX + 24, window.innerWidth - 340)}px`;
        dom.servicePreview.style.top = `${Math.max(e.clientY - 90, 20)}px`;
      };
      item.addEventListener("mouseenter", (e) => {
        if (item.dataset.image) dom.servicePreviewImg.src = item.dataset.image;
        dom.servicePreview.classList.add("active");
        update(e);
      });
      item.addEventListener("mousemove", update);
      item.addEventListener("mouseleave", () =>
        dom.servicePreview.classList.remove("active"),
      );
    });
  } else {
    items.forEach((item) => {
      item.addEventListener("click", () => {
        const wasActive = item.classList.contains("mobile-active");
        items.forEach((i) => i.classList.remove("mobile-active"));
        if (!wasActive) item.classList.add("mobile-active");
      });
    });
  }
}

function initIndustryDrag() {
  if (!dom.industryTrack) return;
  let dragging = false,
    startX = 0,
    startScroll = 0;
  dom.industryTrack.addEventListener("pointerdown", (e) => {
    dragging = true;
    startX = e.clientX;
    startScroll = dom.industryTrack.scrollLeft;
    dom.industryTrack.setPointerCapture?.(e.pointerId);
  });
  dom.industryTrack.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    dom.industryTrack.scrollLeft = startScroll - (e.clientX - startX) * 1.5;
  });
  dom.industryTrack.addEventListener("pointerup", () => (dragging = false));
  dom.industryTrack.addEventListener("pointercancel", () => (dragging = false));
}

function initPortfolioFilters() {
  const btns = $$(".filter-btn");
  const cards = $$(".project-card");
  if (!btns.length || !cards.length) return;
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;
      btns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      cards.forEach((card) => {
        const cats = card.dataset.category.split(" ");
        card.style.display =
          filter === "all" || cats.includes(filter) ? "" : "none";
      });
    });
  });
}

function openProjectModal(projectId) {
  const project = PROJECTS_DATA[projectId];
  if (!project || !dom.projectModal) return;
  dom.modalTitle.textContent = project.title;
  if (dom.modalCategory) dom.modalCategory.textContent = project.category;
  dom.modalDetails.replaceChildren();
  Object.entries(project.details).forEach(([key, value]) => {
    const p = document.createElement("p");
    const strong = document.createElement("strong");
    strong.textContent = `${key}: `;
    p.append(strong, document.createTextNode(value));
    dom.modalDetails.appendChild(p);
  });
  dom.projectModal.classList.add("active");
  dom.projectModal.setAttribute("aria-hidden", "false");
  setBodyLock(true);
  dom.modalClose?.focus();
}

function closeProjectModal() {
  if (!dom.projectModal) return;
  dom.projectModal.classList.remove("active");
  dom.projectModal.setAttribute("aria-hidden", "true");
  setBodyLock(false);
}

function initPortfolio() {
  $$(".project-card").forEach((card) => {
    const open = () => openProjectModal(card.dataset.project);
    card.addEventListener("click", open);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    });
  });
  dom.modalOverlay?.addEventListener("click", closeProjectModal);
  dom.modalClose?.addEventListener("click", closeProjectModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && dom.projectModal?.classList.contains("active"))
      closeProjectModal();
  });
  initPortfolioFilters();
  if (!isDesktop || prefersReducedMotion) return;
  $$("[data-tilt]").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(1000px) rotateX(${y * -4}deg) rotateY(${x * 4}deg)`;
    });
    card.addEventListener("pointerleave", () => (card.style.transform = ""));
  });
}

function initStats() {
  if (prefersReducedMotion) return;
  $$(".stat").forEach((stat, i) => {
    inView(
      stat,
      () => {
        animate(
          stat,
          { opacity: [0, 1], x: [-16, 0] },
          { duration: 0.5, delay: i * 0.08, easing: [0.22, 1, 0.36, 1] },
        );
      },
      { amount: 0.4, once: true },
    );
  });
}

function initTestimonials() {
  if (!dom.testimonialTrack) return;
  const cards = $$(".testimonial-card", dom.testimonialTrack);
  if (!cards.length) return;
  let current = 0;
  let startX = 0;

  if (dom.testimonialProgress) {
    dom.testimonialProgress.replaceChildren();
    cards.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.setAttribute("role", "button");
      dot.setAttribute("tabindex", "0");
      dot.setAttribute("aria-label", `Go to testimonial ${i + 1}`);
      dot.addEventListener("click", () => goTo(i));
      dot.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          goTo(i);
        }
      });
      dom.testimonialProgress.appendChild(dot);
    });
  }

  const update = () => {
    dom.testimonialTrack.style.transform = `translateX(-${current * 100}%)`;
    if (dom.testimonialProgress) {
      $$("span", dom.testimonialProgress).forEach((dot, i) => {
        dot.classList.toggle("active", i === current);
      });
    }
  };

  const goTo = (i) => {
    current = (i + cards.length) % cards.length;
    update();
  };

  dom.prevTestimonial?.addEventListener("click", () => goTo(current - 1));
  dom.nextTestimonial?.addEventListener("click", () => goTo(current + 1));
  dom.testimonialTrack.addEventListener(
    "touchstart",
    (e) => {
      startX = e.changedTouches[0].clientX;
    },
    { passive: true },
  );
  dom.testimonialTrack.addEventListener(
    "touchend",
    (e) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) goTo(current + (diff > 0 ? 1 : -1));
    },
    { passive: true },
  );

  update();
  setInterval(() => {
    if (!prefersReducedMotion) goTo(current + 1);
  }, 6000);
}

function initContactForm() {
  if (!dom.contactForm) return;
  dom.contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const fields = {
      name: $("#name"),
      email: $("#email"),
      projectType: $("#projectType"),
      message: $("#message"),
    };
    Object.values(fields).forEach((f) => f?.removeAttribute("aria-invalid"));
    let valid = true;
    if (!fields.name?.value.trim()) {
      fields.name?.setAttribute("aria-invalid", "true");
      valid = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email?.value.trim() || "")) {
      fields.email?.setAttribute("aria-invalid", "true");
      valid = false;
    }
    if (!fields.projectType?.value) {
      fields.projectType?.setAttribute("aria-invalid", "true");
      valid = false;
    }
    if (!fields.message?.value.trim()) {
      fields.message?.setAttribute("aria-invalid", "true");
      valid = false;
    }
    if (!valid) {
      const firstInvalid = $("[aria-invalid='true']", dom.contactForm);
      firstInvalid?.focus();
      return;
    }
    const formData = Object.fromEntries(
      new FormData(dom.contactForm).entries(),
    );
    formData.submittedAt = new Date().toISOString();
    console.log("Form data ready:", formData);
    dom.contactForm.reset();
    dom.contactForm.style.display = "none";
    dom.formSuccess?.classList.add("show");
    setTimeout(() => {
      dom.contactForm.style.display = "flex";
      dom.formSuccess?.classList.remove("show");
    }, 5000);
  });
}

function initScrollLinkedEffects() {
  if (prefersReducedMotion) return;
  if (dom.heroImageMask && dom.heroImg) {
    scroll(
      ({ progress }) => {
        dom.heroImg.style.transform = `translate3d(0, ${progress * 40}px, 0)`;
      },
      { target: dom.heroImageMask, offset: ["start end", "end start"] },
    );
  }
  if (dom.storySection && dom.storyTrack) {
    scroll(
      ({ progress }) => {
        const maxScroll = Math.max(
          0,
          dom.storyTrack.scrollWidth - dom.storyTrack.clientWidth,
        );
        dom.storyTrack.scrollLeft = progress * maxScroll;
      },
      { target: dom.storySection, offset: ["start start", "end end"] },
    );
  }
}

function initOrbit() {
  if (prefersReducedMotion) return;
  const orbit = $("#orbitWrapper");
  if (!orbit) return;
  $$(".orbit-node", orbit).forEach((node, i) => {
    animate(
      node,
      { y: [0, i % 2 ? -6 : 6, 0] },
      {
        duration: 4 + i * 0.15,
        repeat: Infinity,
        easing: "easeInOut",
        delay: i * 0.1,
      },
    );
  });
}

function init() {
  initNavigation();
  initCursor();
  initMagneticButtons();
  initScrollProgress();
  initHeroParticles();
  initRevealAnimations();
  initServiceInteractions();
  initIndustryDrag();
  initPortfolio();
  initStats();
  initTestimonials();
  initContactForm();
  initScrollLinkedEffects();
  initOrbit();
  initLoader();
  console.log("CiviKraft Technologies initialized");
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}
