interface NavItem {
  label: string;
  href: string | null;
  external?: boolean;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export const NAVIGATION_CONSTANTS: NavSection[] = [
  {
    title: "Products",
    items: [
      {label: "Recommend", href: "/products/recommend"},
      {label: "Trends", href: "/products/trends"},
      {label: "Match Colors", href: "/products/match-colors"},
      {label: "Coming Soon", href: null},
    ],
  },
  {
    title: "Resources",
    items: [
      {label: "Pricing", href: "/resources/pricing"},
      {label: "Notice", href: "/resources/notice"},
    ],
  },
  {
    title: "Company",
    items: [
      {label: "About", href: "/company/about"},
      {label: "Contact Us", href: "/company/contact-us"},
      {label: "개인정보 처리방침", href: "/company/privacy-policy"},
      {label: "이용 약관", href: "/company/terms"},
    ],
  },
  {
    title: "Social",
    items: [
      {label: "Github", href: "https://github.com", external: true},
      {label: "Instagram", href: "https://instagram.com", external: true},
    ],
  },
];
