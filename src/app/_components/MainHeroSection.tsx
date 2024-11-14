"use client";

import Link from "next/link";
import {useState} from "react";


// components
import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerDescription,
} from "@/components/ui/drawer";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import { TrendInfoForm } from "@/components/blocks/TrendInfoForm";

// icon
import {Info} from "lucide-react";

// hooks
import {useMediaQuery} from "@/lib/hooks/useMediaQuery";


export default function MainHeroSection() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleCustomizationSubmit = () => {
    setOpen(false);
    // 여기에 맞춤 추천 로직을 추가할 수 있습니다.
  };

  return (
    <section className="text-center mb-12">
      <h2 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
        날씨, 스타일, 성공적.
      </h2>
      <p className="text-lg md:text-xl text-foreground my-6">
        날씨에 맞는 패션이
        <br className="md:hidden" /> 하입한 스타일의 완성입니다.
      </p>
      <div className="flex justify-center gap-6">
        {isDesktop ? (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">맞춤 트랜드 보기</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>맞춤 트랜드를 위한 정보</DialogTitle>
              </DialogHeader>
              <DialogDescription className="flex items-center justify-between">
                로그인을 하면 더욱 간편하게 정보를 볼 수 있어요.
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info />
                    </TooltipTrigger>
                    <TooltipContent>
                      <ol>
                        <li>1. 매번 정보를 입력하지 않고 쉽게 검색할 수 있어요.</li>
                        <li>2. 저장했던 결과들을 언제든지 sns로 공유 할 수 있어요. </li>
                        <li>3. 프로모션과 이벤트에 관한 알림들을 받아볼 수 있어요. </li>
                      </ol>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </DialogDescription>
              <TrendInfoForm onSubmit={handleCustomizationSubmit} />
            </DialogContent>
          </Dialog>
        ) : (
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <Button variant="outline">맞춤 트랜드 보기</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>맞춤 트랜드를 위한 정보</DrawerTitle>
              </DrawerHeader>
              <DrawerDescription>
                로그인을 하면 더욱 간편하게 정보를 볼 수 있어요.
              </DrawerDescription>
              <div className="px-4 py-2">
                <TrendInfoForm onSubmit={handleCustomizationSubmit} />
              </div>
            </DrawerContent>
          </Drawer>
        )}
        <Button asChild>
          <Link href="/products/recommend">맞춤 추천 받기</Link>
        </Button>
      </div>
    </section>
  );
}
