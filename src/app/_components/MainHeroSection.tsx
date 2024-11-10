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
import {Input} from "@/components/ui/input";
import {FormField, FormLabel, FormControl, FormMessage, Form, FormItem} from "@/components/ui/form";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

// icon
import {Info} from "lucide-react";

// schema
import {recommendTrendSchema, recommendTrendSchemaType} from "@/service/schema/recommend.schema";

// react hook form + zod
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

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
  const recommendTrendForm = useForm<recommendTrendSchemaType>({
    resolver: zodResolver(recommendTrendSchema),
    defaultValues: {
      age: "",
      gender: "",
      category: "",
      keyword: "",
    },
  });

  return (
    <Form {...recommendTrendForm}>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div className="space-y-2">
          <FormField
            control={recommendTrendForm.control}
            name="age"
            render={({field}) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium text-muted-foreground" htmlFor="name">
                  연령대를 선택해주세요.
                </FormLabel>
                <FormControl>
                  <Select>
                    <SelectTrigger id="age">
                      <SelectValue placeholder="선택해주세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10대</SelectItem>
                      <SelectItem value="20">20대</SelectItem>
                      <SelectItem value="30">30대</SelectItem>
                      <SelectItem value="40">40대</SelectItem>
                      <SelectItem value="50">50대</SelectItem>
                      <SelectItem value="60">60대 이상</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-2">
          <FormField
            control={recommendTrendForm.control}
            name="gender"
            render={({field}) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium text-muted-foreground" htmlFor="name">
                  성별을 선택해주세요.
                </FormLabel>
                <FormControl>
                  <Select>
                    <SelectTrigger id="age">
                      <SelectValue placeholder="선택해주세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="f">남성</SelectItem>
                      <SelectItem value="m">여성</SelectItem>
                      <SelectItem value="other">기타</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-2">
          <FormField
            control={recommendTrendForm.control}
            name="gender"
            render={({field}) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium text-muted-foreground" htmlFor="name">
                  대분류를 선택해주세요.
                </FormLabel>
                <FormControl>
                  <Select>
                    <SelectTrigger id="age">
                      <SelectValue placeholder="선택해주세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="50000001">패션/잡화</SelectItem>
                      <SelectItem value="50000002">화장품/미용</SelectItem>
                      <SelectItem value="50000008">패션/의류</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={recommendTrendForm.control}
            name="keyword"
            render={({field}) => (
              <FormItem className="space-y-2 pb-4 md:pb-8">
                <FormLabel className="text-sm font-medium text-muted-foreground" htmlFor="name">
                  관심있는 키워드를 입력해주세요.
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="name"
                    placeholder="예) 셔츠/남방, 재킷, 코트"
                    maxLength={20}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full">
          맞춤 정보 저장하기
        </Button>
      </form>
    </Form>
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
          <Link href="/products/recommend">맞춤 추천 받기</Link>
        </Button>
      </div>
    </section>
  );
}
