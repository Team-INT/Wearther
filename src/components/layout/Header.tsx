"use client";

import React from "react";
import {useTheme} from "next-themes";

// components
import {Toggle} from "@/components/ui/toggle";
import {Button} from "@/components/ui/button";

// icons
import {Sun, Moon} from "lucide-react";

export default function Header() {
  const {theme, setTheme} = useTheme();
  return (
    <header className="relative z-10 flex justify-between items-center w-full mb-8 py-4 px-6">
      <h1 className="text-2xl md:text-3xl font-bold text-primary">Wearther</h1>
      <div className="flex items-center space-x-4">
        <Toggle
          aria-label="Toggle dark mode"
          pressed={theme === "dark"}
          onPressedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </Toggle>
        <Button variant="outline">로그인</Button>
      </div>
    </header>
  );
}
