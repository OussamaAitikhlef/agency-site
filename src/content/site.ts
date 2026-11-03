export const site = {
  name: "Ariyana Studio",
  tagline: "Design-first Digital Agency",
  description:
    "A multi-awarded digital studio crafting immersive & interactive experiences for global brands since 2006.",
  url: "https://www.xiphon.us",
  email: "hello@ariyana.com",
  phone: "+91 98241 82099",
  address: "Road Alexanderplein 121018 CL, Amsterdam The Netherlands",
  brandMark: "// ARIYANA",
} as const;

export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const socials = [
  { label: "Instagram", href: "#" },
  { label: "Twitter", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Dribbble", href: "#" },
] as const;

export const footerPages = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
] as const;

export const footerUtilities = [
  { label: "Style guide", href: "#" },
  { label: "Licenses", href: "#" },
  { label: "Change Log", href: "#" },
] as const;
