import type Lenis from "lenis";

let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

export function getLenis(): Lenis | null {
  return lenis;
}

/** Instant jump to top (route changes). */
export function scrollToTop() {
  if (lenis) {
    lenis.scrollTo(0, { immediate: true });
  } else {
    window.scrollTo(0, 0);
  }
}

/** Smooth anchor scroll — the Lenis way (no CSS scroll-behavior). */
export function scrollToSection(target: string) {
  if (lenis) {
    lenis.scrollTo(target, { offset: -72, duration: 1.4 });
  } else {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  }
}
