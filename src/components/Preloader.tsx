import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";

const LOGO_CHARS = "//ARIYANA".split("");
const BOTTOM_LINES = 5;

type PreloaderProps = {
  onDone: () => void;
};

/**
 * Intro loader, faithful to the reference: near-black overlay, masked
 * char-stagger logo reveal, settle, hold, then a full slide-up exit with
 * the 5 bottom lines riding along as the wipe edge.
 */
export function Preloader({ onDone }: PreloaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const onDoneRef = useRef(onDone);
  const firedRef = useRef(false);

  useEffect(() => {
    onDoneRef.current = onDone;
  });

  const fireDone = () => {
    if (firedRef.current) return;
    firedRef.current = true;
    onDoneRef.current();
  };

  useGSAP(
    () => {
      // Reduced motion: skip the show entirely.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        fireDone();
        return;
      }

      const tl = gsap.timeline({ onComplete: fireDone });

      // 1 — char reveal, left to right
      tl.fromTo(
        ".pl-char-inner",
        { yPercent: 110 },
        { yPercent: 0, duration: 0.6, ease: "power3.out", stagger: 0.04 }
      )
        // 2 — settle
        .fromTo(
          ".pl-logo",
          { y: -12 },
          { y: 0, duration: 0.4, ease: "power2.out" }
        )
        // 3 — hold
        .to({}, { duration: 0.8 })
        // 4 — exit: whole overlay slides up, lines travel as the wipe edge
        .to(rootRef.current, {
          yPercent: -100,
          duration: 0.9,
          ease: "power4.inOut",
        });
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="fixed inset-0 z-50 overflow-hidden bg-ink"
    >
      <div className="flex h-full items-center justify-center px-6">
        <div className="pl-logo flex whitespace-nowrap" aria-label="//ARIYANA">
          {LOGO_CHARS.map((ch, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <span className="pl-char-inner inline-block font-display text-[clamp(2rem,4vw,3.5rem)] text-paper">
                {ch}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Bottom-edge wipe strip: 5 hairlines riding the exit */}
      <div className="absolute inset-x-0 bottom-0">
        {Array.from({ length: BOTTOM_LINES }).map((_, i) => (
          <div
            key={i}
            className="h-px w-full bg-paper/20"
            style={{ marginTop: i === 0 ? 0 : 6 }}
          />
        ))}
      </div>
    </div>
  );
}
