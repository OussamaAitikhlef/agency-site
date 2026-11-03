import { useCallback, useEffect, useRef } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "../lib/gsap";

/**
 * Lenis smooth scroll, driven by a rAF loop. Exposes stop()/start()
 * so overlays (e.g. the preloader) can lock scroll. Destroys cleanly
 * on unmount.
 */
export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, infinite: false });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const loop = (time: number) => {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const stop = useCallback(() => lenisRef.current?.stop(), []);
  const start = useCallback(() => lenisRef.current?.start(), []);

  return { stop, start };
}
