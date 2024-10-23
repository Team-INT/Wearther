import Link from "next/link";
import {Button} from "@/components/ui/button";

import {Home} from "lucide-react";

const NotFound = () => {
  return (
    <main className="flex-grow flex items-center justify-center h-[calc(100dvh_-_120px)] lg:h-[calc(100dvh_-_84px)]">
      <div className="text-center space-y-6 p-8 max-w-2xl">
        <div className="flex justify-center">
          <span className="text-9xl font-bold text-primary">404</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="text-xl text-muted-foreground">
          죄송합니다. 요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
        <div className="pt-6 flex flex-col sm:flex-row justify-center gap-4">
          <Button variant="outline" asChild>
            <Link href="/" className="flex items-center space-x-2">
              <Home className="h-4 w-4" />
              <span>홈으로</span>
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
