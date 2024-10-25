"use client";

import React, {useEffect} from "react";
import Lenis from "@studio-freight/lenis";

const SmoothScrollProvider: React.FC = (): React.ReactElement => {
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth > 1024) {
      const lenis = new Lenis();

      // 함수 표현식으로 변경
      const raf = (time: number): void => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };

      requestAnimationFrame(raf);

      return (): void => {
        lenis.destroy();
        const frameId: number = requestAnimationFrame(raf);
        cancelAnimationFrame(frameId);
      };
    }
  }, []);

  return <></>;
};

export default SmoothScrollProvider;
