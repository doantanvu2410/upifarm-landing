const header = document.querySelector("[data-header]");
const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const revealItems = document.querySelectorAll(".reveal");
const slides = [...document.querySelectorAll("[data-slide]")];
const slideControls = [...document.querySelectorAll("[data-slide-control]")];

const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 10);
};

const closeMenu = () => {
  nav?.classList.remove("is-open");
  header?.classList.remove("is-open");
  menuButton?.setAttribute("aria-expanded", "false");
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

menuButton?.addEventListener("click", () => {
  const willOpen = !nav?.classList.contains("is-open");
  nav?.classList.toggle("is-open", willOpen);
  header?.classList.toggle("is-open", willOpen);
  menuButton.setAttribute("aria-expanded", String(willOpen));
});

navLinks.forEach((link) => link.addEventListener("click", closeMenu));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

let activeSlide = 0;
let slideTimer;

const setSlide = (index) => {
  if (!slides.length) return;

  activeSlide = (index + slides.length) % slides.length;

  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === activeSlide);
  });

  slideControls.forEach((control, controlIndex) => {
    control.classList.toggle("is-active", controlIndex === activeSlide);
  });
};

const startSlider = () => {
  if (slides.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  window.clearInterval(slideTimer);
  slideTimer = window.setInterval(() => setSlide(activeSlide + 1), 4200);
};

slideControls.forEach((control) => {
  control.addEventListener("click", () => {
    setSlide(Number(control.dataset.slideControl || 0));
    startSlider();
  });
});

setSlide(0);
startSlider();
