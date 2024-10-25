import React from "react";
import FooterContent from "../blocks/FooterContent";

export default function Footer() {
  return (
    <footer
      className="relative z-[1] w-full h-[100vh] lg:h-[70vh]"
      style={{clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"}}
    >
      <div className="fixed bottom-0 w-full h-[100vh] lg:h-[70vh]">
        <FooterContent />
      </div>
    </footer>
  );
}
