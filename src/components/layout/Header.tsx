

import React from "react";
import Link from "next/link";

import {Button} from "@/components/ui/button";
import ThemeToogle from "../ui/ThemeToogle";
import {HeaderNavigation} from "@/components/blocks/HeaderNavigation";
import { getSession, signOutWithForm } from '@/server/auth';

export default async function Header() {
  const session = await getSession()
  
  return (
    <header className="relative z-10 flex justify-between items-center w-full max-w-7xl mx-auto py-4 px-6 md:px-12">
      <h1 className="text-2xl md:text-3xl font-bold text-primary">
        <Link href="/">Wearther</Link>
      </h1>
      <HeaderNavigation />
      <div className="flex items-center space-x-4">
        <ThemeToogle />
        {/* {
          session?.user ? (
            <>
              <form action={signOutWithForm}>
                <button type="submit">로그아웃</button>
              </form>
            </>
          ) : (
            <>
              <Button asChild>
                <Link href="/login">로그인</Link>
              </Button>
            </>
          )
        } */}

        <>
              <Button asChild>
                <Link href="/login">로그인</Link>
              </Button>
            </>
      </div>
    </header>
  );
}
