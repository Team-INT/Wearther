import React from "react";
import dynamic from "next/dynamic";
import dayjs, {Dayjs} from "dayjs";

// components
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import BeautyTrends from "@/components/blocks/BeautyTrends";
import PopularFashionItems from "@/components/blocks/PopularFashionItems";
import RecentSearches from "@/components/blocks/RecentSearches";
const StyleTrendChart = dynamic(() => import("@/components/charts/StyleTrendChart"), {
  ssr: false,
});

import MainHeroSection from "./_components/MainHeroSection";
import MainTodayWeather from "./_components/MainTodayWeather";
import MainTodayFasion from "./_components/MainTodayFashion";

// icon
import {Sun, Sparkles, Search, TrendingUp} from "lucide-react";

// mocking
import {
  weatherData,
  recentSearches,
  recommendedClothes,
  trendData,
  popularItems,
  beautyTrends,
} from "@/mocks/mockingData";
import Link from "next/link";

export default function WeatherFashionMain() {
  const now: Dayjs = dayjs();

  return (
    <>
      <MainHeroSection />
      {/* content wrapping grid */}
      <div className="grid grid-cols-1 gap-6">
        {/* section grid 1 */}
        <div className="grid grid-cols-1 md:grid-cols-5 row-gap-6 md:gap-6">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sun className="w-6 h-6 text-yellow-500 mr-2" />
                {/* 위치 서비스 동의 시 위치 제공, 미 동의시 전국 날씨로 */}
                <span className="text-main-gradient">현재 서울특별시 중구의 날씨는?</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MainTodayWeather weatherData={weatherData} />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sun className="w-6 h-6 text-yellow-500 mr-2" />
                <span className="text-main-gradient">
                  현재 날씨에 맞는 추천 스타일을 알려 드릴게요.
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MainTodayFasion recommendedClothes={recommendedClothes} />
            </CardContent>
          </Card>
        </div>
        {/* section grid 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 스타일 트랜트 차트1 */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-6 h-6 text-blue-500 mr-2" />
                스타일 트렌드
                <Link href="">더보기</Link>
              </CardTitle>
              <CardDescription>
                <span>최근 한달 간 트랜디한 스타일을 보여줍니다.</span>
                <span>기준일: {now.format("YYYY년MM월")}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <StyleTrendChart trendData={trendData} />
            </CardContent>
            <CardFooter>
              <div className="flex w-full items-start gap-2 text-sm">
                <div className="grid gap-2">
                  <div className="flex items-center gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                  </div>
                  <div className="flex items-center gap-2 leading-none text-muted-foreground">
                    Showing total visitors for the last 6 months
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>

          {/* 스타일 트랜트 차트2 */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-6 h-6 text-blue-500 mr-2" />
                스타일 트렌드
                <Link href="">더보기</Link>
              </CardTitle>
              <CardDescription>
                <span>최근 한달 간 트랜디한 스타일을 보여줍니다.</span>
                <span>기준일: {now.format("YYYY년MM월")}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <StyleTrendChart trendData={trendData} />
            </CardContent>
            <CardFooter>
              <div className="flex w-full items-start gap-2 text-sm">
                <div className="grid gap-2">
                  <div className="flex items-center gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                  </div>
                  <div className="flex items-center gap-2 leading-none text-muted-foreground">
                    Showing total visitors for the last 6 months
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* section grid 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 인기 패션 아이템: PopularFashionItems */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="w-6 h-6 text-purple-500 mr-2" />
                인기 패션 아이템
                <Link href="">더보기</Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PopularFashionItems popularItems={popularItems} />
            </CardContent>
          </Card>

          {/* 뷰티 트렌드: BeautyTrends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-6 h-6 text-pink-500 mr-2" />
                뷰티 트렌드
                <Link href="">더보기</Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BeautyTrends beautyTrends={beautyTrends} />
            </CardContent>
          </Card>

          {/* 최근 검색어: RecentSearches*/}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="w-6 h-6 text-green-500 mr-2" />
                최근 검색어
                <Link href="">더보기</Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RecentSearches recentSearches={recentSearches} />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
