import React from "react";
import Link from "next/link";

import {Button} from "@/components/ui/button";
import ThemeToogle from "../ui/ThemeToogle";
import {HeaderNavigation} from "@/components/blocks/HeaderNavigation";

export default function Header() {
  return (
    <header className="relative z-10 flex justify-between items-center w-full max-w-7xl mx-auto py-4 px-6 md:px-12">
      <h1 className="text-2xl md:text-3xl font-bold text-primary">
        <Link href="/">Wearther</Link>
      </h1>
      <HeaderNavigation />
      <div className="flex items-center space-x-4">
        <ThemeToogle />
        <Button variant="outline">로그인</Button>
      </div>
    </header>
  );
}
