import { Link, NavLink } from "react-router-dom";

const LINKS = [
  { to: "/about-us", label: "About" },
  { to: "/projects", label: "Works" },
  { to: "/service", label: "Services" },
  { to: "/contact-us", label: "Contact" },
] as const;

type NavbarProps = {
  /** True after the Preloader calls onDone. Reserved for Part 2B (canvas menu wiring). */
  ready: boolean;
  /** Menu toggle — inert in Part 2A; Part 2B wires the fullscreen canvas menu. */
  onMenuToggle: () => void;
};

export default function Navbar({ ready, onMenuToggle }: NavbarProps) {
  // Recon (live site): the navbar has no entrance motion of its own — it is
  // revealed by the preloader wipe. `ready` is kept for the Part 2B menu API.
  void ready;

  return (
    <header className="fixed inset-x-0 top-0 z-40 text-paper">
      <nav
        aria-label="Main"
        className="mx-auto grid max-w-[var(--layout-container)] grid-cols-[1fr_auto] items-stretch px-[var(--nav-padding-x)] lg:grid-cols-[1fr_1fr_1fr_1fr_1fr_auto]"
      >
        {/* Column 1 — logo */}
        <Link
          to="/"
          className="flex items-center border-b border-[var(--nav-hairline-color)] py-[var(--nav-padding-y)]"
        >
          <span className="font-display text-(length:--nav-logo-size) leading-none">
            {"// ARIYANA"}
          </span>
        </Link>

        {/* Columns 2–5 — links (desktop only; source collapses below 992px) */}
        {LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className="group hidden items-center gap-[var(--nav-bullet-gap)] border-b border-[var(--nav-hairline-color)] py-[var(--nav-padding-y)] lg:flex"
          >
            <span
              aria-hidden="true"
              className="block size-[var(--nav-bullet-size)] shrink-0 rounded-full border border-paper/70 transition-all duration-[var(--nav-anim-duration)] ease-[var(--nav-anim-ease)] group-hover:scale-[var(--nav-bullet-scale)] group-hover:border-paper group-hover:bg-paper"
            />
            <span className="block h-[calc(var(--nav-link-size)*var(--nav-link-line-height))] overflow-hidden">
              <span className="flex flex-col transition-transform duration-[var(--nav-anim-duration)] ease-[var(--nav-anim-ease)] group-hover:-translate-y-1/2">
                <span className="font-nav-link block h-[calc(var(--nav-link-size)*var(--nav-link-line-height))] text-(length:--nav-link-size) uppercase leading-[var(--nav-link-line-height)] tracking-[var(--nav-link-tracking)]">
                  {link.label}
                </span>
                <span
                  aria-hidden="true"
                  className="font-nav-link block h-[calc(var(--nav-link-size)*var(--nav-link-line-height))] text-(length:--nav-link-size) uppercase leading-[var(--nav-link-line-height)] tracking-[var(--nav-link-tracking)]"
                >
                  {link.label}
                </span>
              </span>
            </span>
          </NavLink>
        ))}

        {/* Last column — hamburger icon */}
        <button
          type="button"
          onClick={onMenuToggle}
          aria-label="Open menu"
          className="group/icon flex w-[var(--nav-icon-width)] items-center justify-center border-b border-[var(--nav-hairline-color)] py-[var(--nav-padding-y)]"
        >
          <span
            aria-hidden="true"
            className="flex rotate-[-45deg] flex-col items-center gap-[var(--nav-icon-gap)] transition-transform duration-[var(--nav-anim-duration)] ease-[var(--nav-anim-ease)] group-hover/icon:rotate-0"
          >
            <span className="h-[var(--nav-icon-line-h)] w-4 rounded-full bg-paper" />
            <span className="h-[var(--nav-icon-line-h)] w-[var(--nav-icon-line-w)] rounded-full bg-paper" />
            <span className="h-[var(--nav-icon-line-h)] w-4 rounded-full bg-paper" />
          </span>
        </button>
      </nav>
    </header>
  );
}
