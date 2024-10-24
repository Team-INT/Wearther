import React from "react";

import Link from "next/link";

// constants
import {NAVIGATION_CONSTANTS} from "@/lib/constants/navigationConst";

export default function FooterContent() {
  return (
    <div className="bg-[#4E4E5A] py-12 px-12 h-full w-full flex flex-col justify-between">
      <Nav />
      <Section2 />
    </div>
  );
}

const Section2 = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 lg:justify-between items-start lg:items-end">
      <h1 className="text-[14vw] leading-[0.8] mt-10 font-bold text-foreground">Wearther</h1>
      <div className="text-foreground">
        <address className="not-italic">newabekar@naver.com</address>
        <small className="font-size-[100%]">© 2024 Cho Kyung Moon. All Rights Reserved.</small>
      </div>
    </div>
  );
};

const Nav = () => {
  return (
    <div className="flex flex-col md:flex-row shrink-0 gap-8 md:gap-20">
      {NAVIGATION_CONSTANTS.map((section) => (
        <dl key={section.title} className="flex md:flex-col gap-2">
          <dt className="mb-2 uppercase text-[#ffffff80]">{section.title}</dt>
          {section.items.map((item) => (
            <dd key={item.label}>
              {item.href ? (
                <Link
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  className="inline-block w-full py-2 pr-2 hover:text-white"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="inline-block w-full py-2 pr-2">{item.label}</span>
              )}
            </dd>
          ))}
        </dl>
      ))}
    </div>
  );
};
