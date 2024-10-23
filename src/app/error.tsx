"use client";

import {useEffect} from "react";
import Link from "next/link";

import {Button} from "@/components/ui/button";
import {RefreshCw, List} from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & {digest?: string};
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex-grow flex items-center justify-center">
      <div className="text-center space-y-6 p-8 max-w-2xl">
        <div className="flex justify-center">
          <span className="text-6xl font-bold text-primary">
            <RefreshCw className="h-24 w-24 animate-spin-slow" />
          </span>
        </div>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          페이지 로딩 실패.
        </h1>
        <p className="text-xl text-muted-foreground">
          죄송합니다. 페이지를 불러오는 데 문제가 발생했습니다. 일시적인 네트워크 문제이거나 서버
          오류일 수 있습니다.
        </p>
        <div className="pt-6 flex flex-col sm:flex-row justify-center gap-4">
          <Button onClick={() => reset()} className="flex items-center space-x-2">
            <RefreshCw className="h-4 w-4" />
            <span>다시 시도</span>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/mypage" className="flex items-center space-x-2">
              <List className="h-4 w-4" />
              <span>목록으로</span>
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
