const header = document.querySelector("[data-header]");
const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const revealItems = document.querySelectorAll(".reveal");
const orbitItems = document.querySelectorAll(".hero-orbit");

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

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  window.addEventListener(
    "pointermove",
    (event) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;

      orbitItems.forEach((item, index) => {
        const depth = (index + 1) * 8;
        item.style.transform = `translate3d(${x * depth}px, ${y * depth}px, 0)`;
      });
    },
    { passive: true }
  );
}
