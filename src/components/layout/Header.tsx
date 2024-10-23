"use client";

import React from "react";
import Link from "next/link";
import {useTheme} from "next-themes";

// components
import {Toggle} from "@/components/ui/toggle";
import {Button} from "@/components/ui/button";
import ThemeToogle from "../ui/ThemeToogle";

// icons
import {Sun, Moon} from "lucide-react";

export default function Header() {
  const {theme, setTheme} = useTheme();
  return (
    <header className="relative z-10 flex justify-between items-center w-full py-4 px-6">
      <h1 className="text-2xl md:text-3xl font-bold text-primary">
        <Link href="/">Wearther</Link>
      </h1>
      <nav>
        <ul>
          <li>About</li>
          <li>Pricing</li>
          <li>Notice</li>
        </ul>
      </nav>
      <div className="flex items-center space-x-4">
        <ThemeToogle />
        <Button variant="outline">로그인</Button>
      </div>
    </header>
  );
}
