const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

const revealElements = new Set([
  ...document.querySelectorAll(".container > section > h3"),
  ...document.querySelectorAll(".container > section h4"),
  ...document.querySelectorAll(".container > section img"),
  ...document.querySelectorAll(
    ".container > section > div > .mt-4:not(.text-center)",
  ),
  ...document.querySelectorAll(
    ".container > section .history > div:first-child, .container > section .torist > div:first-child, .container > section .tourist > div:first-child, .container > section .food > div:first-child, .container > section .people > div:first-child, .container > section .develop > div:first-child",
  ),
  ...document.querySelectorAll(".contact-me"),
  ...document.querySelectorAll(".link-page"),
  ...document.querySelectorAll(".contact-me img"),
  ...document.querySelectorAll('img[usemap]'),
]);

Array.from(revealElements).forEach((element, index) => {
  const isImage = element instanceof HTMLImageElement;

  if (!element.hasAttribute("data-aos")) {
    element.setAttribute("data-aos", isImage ? "zoom-in" : "fade-up");
  }
  element.style.transitionDuration = `${reducedMotion ? 220 : 700}ms`;

  if (isImage) {
    const delay = (index % 4) * 90;
    element.setAttribute("data-aos-delay", String(delay));
    element.style.transitionDelay = `${delay}ms`;
  }
});

if (window.AOS && typeof window.AOS.init === "function") {
  document.documentElement.classList.add("aos-ready");
  window.AOS.init({
    duration: reducedMotion ? 220 : 700,
    easing: "ease-out-cubic",
    once: true,
    offset: 70,
    mirror: false,
  });
} else if ("IntersectionObserver" in window && !reducedMotion) {
  document.documentElement.classList.add("scroll-reveal-ready");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );

  revealElements.forEach((element) => revealObserver.observe(element));
}
