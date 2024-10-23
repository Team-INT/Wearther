"use client";

import Link from "next/link";
import {useState, useEffect} from "react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
};

const CustomizationForm = ({onSubmit}: {onSubmit: () => void}) => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [style, setStyle] = useState("");

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className="space-y-2">
        <label htmlFor="age" className="text-sm font-medium text-muted-foreground">
          연령대
        </label>
        <Select value={age} onValueChange={setAge}>
          <SelectTrigger id="age">
            <SelectValue placeholder="선택해주세요" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10s">10대</SelectItem>
            <SelectItem value="20s">20대</SelectItem>
            <SelectItem value="30s">30대</SelectItem>
            <SelectItem value="40s">40대 이상</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <label htmlFor="gender" className="text-sm font-medium text-muted-foreground">
          성별
        </label>
        <Select value={gender} onValueChange={setGender}>
          <SelectTrigger id="gender">
            <SelectValue placeholder="선택해주세요" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">남성</SelectItem>
            <SelectItem value="female">여성</SelectItem>
            <SelectItem value="other">기타</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <label htmlFor="style" className="text-sm font-medium text-muted-foreground">
          선호 스타일
        </label>
        <Select value={style} onValueChange={setStyle}>
          <SelectTrigger id="style">
            <SelectValue placeholder="선택해주세요" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="casual">캐주얼</SelectItem>
            <SelectItem value="formal">포멀</SelectItem>
            <SelectItem value="sporty">스포티</SelectItem>
            <SelectItem value="vintage">빈티지</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full">
        맞춤 추천 받기
      </Button>
    </form>
  );
};

export default function MainHeroSection() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleCustomizationSubmit = () => {
    setOpen(false);
    // 여기에 맞춤 추천 로직을 추가할 수 있습니다.
  };

  return (
    <section className="text-center mb-12 pb-8">
      <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">날씨, 스타일, 성공적.</h2>
      <p className="text-xl md:text-2xl text-muted-foreground mb-6">
        날씨에 맞는 패션이 하입한 스타일의 완성입니다.
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
              <DialogDescription>
                로그인을 하면 더욱 간편하게 정보를 볼 수 있어요.비로그인 횟수 안내 툴팁
              </DialogDescription>
              <CustomizationForm onSubmit={handleCustomizationSubmit} />
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
                <CustomizationForm onSubmit={handleCustomizationSubmit} />
              </div>
            </DrawerContent>
          </Drawer>
        )}
        <Button asChild>
          <Link href="/recommend">맞춤 추천 받기</Link>
        </Button>
      </div>
    </section>
  );
}
