import React from "react";

import Link from "next/link";

export default function FooterContent() {
  return (
    <div className="bg-[#4E4E5A] py-8 px-12 h-full w-full flex flex-col justify-between">
      <Nav />
      <Section2 />
    </div>
  );
}

const Section2 = () => {
  return (
    <div className="flex justify-between items-end">
      <h1 className="text-[14vw] leading-[0.8] mt-10">Wearther</h1>
      <div className="">
        <address className="not-italic">newabekar@naver.com</address>
        <small className="font-size-[100%]">© 2024 Cho Kyung Moon. All Rights Reserved.</small>
      </div>
    </div>
  );
};

const Nav = () => {
  return (
    <div className="flex-col md:flex shrink-0 gap-8 md:gap-20">
      <dl className="flex md:flex-col gap-2">
        <dt className="mb-2 uppercase text-[#ffffff80]">Products</dt>
        <dd>
          <Link href="/products/recommend">Recommend</Link>
        </dd>
        <dd>
          <Link href="/products/trends">Trends</Link>
        </dd>
        <dd>
          <Link href="/products/match-colors">Match Colors</Link>
        </dd>
        <dd>Coming Soon</dd>
      </dl>
      <dl className="flex md:flex-col gap-2">
        <dt className="mb-2 uppercase text-[#ffffff80]">Resources</dt>
        <dd>
          <Link href="/resources/pricing">Pricing</Link>
        </dd>
        <dd>
          <Link href="/resources/notice">Notice</Link>
        </dd>
      </dl>
      <dl className="flex md:flex-col gap-2">
        <dt className="mb-2 uppercase text-[#ffffff80]">Company</dt>
        <dd>
          <Link href="/company/about">About</Link>
        </dd>
        <dd>
          <Link href="/company/contact-us">Contact Us</Link>
        </dd>
        <dd>
          <Link href="/company/privacy-policy">개인정보 처리방침</Link>
        </dd>
        <dd>
          <Link href="/company/terms">이용 약관</Link>
        </dd>
      </dl>
      <dl className="flex md:flex-col gap-2">
        <dt className="mb-2 uppercase text-[#ffffff80]">Social</dt>
        <dd>
          <Link href="https://github.com" target="_blank">
            Github
          </Link>
        </dd>
        <dd>
          <Link href="https://instagram.com" target="_blank">
            Instagram
          </Link>
        </dd>
      </dl>
    </div>
  );
};
