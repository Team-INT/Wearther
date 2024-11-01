interface NavItem {
  label: string;
  href: string | null;
  external?: boolean;
  description?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export const NAVIGATION_CONSTANTS: NavSection[] = [
  {
    title: "Products",
    items: [
      {
        label: "Recommend",
        href: "/products/recommend",
        description: "맞춤 추천 받기를 안내해드려요.",
      },
      {label: "Trends", href: "/products/trends", description: "현재 트렌드를 확인해보세요."},
      {
        label: "Match Colors",
        href: "/products/match-colors",
        description: "컬러 매칭 도우미로 최적의 색상 조합을 찾으세요.",
      },
      {label: "Coming Soon", href: null, description: "곧 출시 예정입니다."},
    ],
  },
  {
    title: "Resources",
    items: [
      {label: "Pricing", href: "/resources/pricing", description: "가격 정보를 확인하세요."},
      {label: "Notice", href: "/resources/notice", description: "중요 공지 사항을 확인하세요."},
    ],
  },
  {
    title: "Company",
    items: [
      {label: "About", href: "/company/about", description: "저희 회사에 대해 알아보세요."},
      {
        label: "Contact Us",
        href: "/company/etc/contact-us",
        description: "문의사항이 있으시면 연락주세요.",
      },
      {
        label: "개인정보 처리방침",
        href: "/company/etc/privacy-policy",
        description: "개인정보 처리 방침을 확인하세요.",
      },
      {label: "이용 약관", href: "/company/etc/terms", description: "이용 약관을 확인하세요."},
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
