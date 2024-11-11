import React from "react";
import dynamic from "next/dynamic";
import dayjs, {Dayjs} from "dayjs";

// api
import {getCurrentWeather} from "@/lib/service/weather";

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
import StyleTrendChart from "@/components/charts/StyleTrendChart";

import MainHeroSection from "./_components/MainHeroSection";
import MainTodayWeather from "./_components/MainTodayWeather";
import MainTodayFasion from "./_components/MainTodayFashion";

// icon
import {Sun, Sparkles, Search, TrendingUp} from "lucide-react";

// mocking
import {
  recentSearches,
  recommendedClothes,
  trendData,
  popularItems,
  beautyTrends,
} from "@/mocks/mockingData";
import Link from "next/link";

export default async function WeatherFashionMain() {
  const weatherData = await getCurrentWeather();

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

                <span className="text-main-gradient">오늘의 날씨는?</span>
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
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <TrendingUp className="w-6 h-6 text-blue-500 mr-2" />
                  스타일 트렌드
                </div>
                <Link href="" className="text-sm text-muted-foreground hover:text-primary">
                  더보기
                </Link>
              </CardTitle>
              <CardDescription className="flex flex-col gap-2">
                <span>최근 한달 간 트랜디한 스타일을 보여줍니다.</span>
                <span>기준일: {now.format("YYYY년 MM월 DD일")}</span>
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
                    일별 데이터는 익일 8~10시간 후 결과에 반영됩니다.
                    <br />
                    그래프는 네이버에서 해당 검색어가 검색된 횟수를 일별/주별/월별 각각 합산하여
                    조회기간 내 최다 검색량을 100으로 설정하여 상대적인 변화를 나타냅니다.
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>

          {/* 스타일 트랜트 차트2 */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <TrendingUp className="w-6 h-6 text-blue-500 mr-2" />
                  스타일 트렌드
                </div>
                <Link href="" className="text-sm text-muted-foreground hover:text-primary">
                  더보기
                </Link>
              </CardTitle>
              <CardDescription className="flex flex-col gap-2">
                <span>최근 한달 간 트랜디한 스타일을 보여줍니다.</span>
                <span>기준일: {now.format("YYYY년 MM월 DD일")}</span>
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
                    일별 데이터는 익일 8~10시간 후 결과에 반영됩니다.
                    <br />
                    그래프는 네이버에서 해당 검색어가 검색된 횟수를 일별/주별/월별 각각 합산하여
                    조회기간 내 최다 검색량을 100으로 설정하여 상대적인 변화를 나타냅니다.
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
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Sparkles className="w-6 h-6 text-purple-500 mr-2" />
                  인기 패션 아이템
                </div>
                <Link href="" className="text-sm text-muted-foreground hover:text-primary">
                  더보기
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PopularFashionItems popularItems={popularItems} />
            </CardContent>
          </Card>

          {/* 뷰티 트렌드: BeautyTrends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <TrendingUp className="w-6 h-6 text-pink-500 mr-2" />
                  뷰티 트렌드
                </div>
                <Link href="" className="text-sm text-muted-foreground hover:text-primary">
                  더보기
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BeautyTrends beautyTrends={beautyTrends} />
            </CardContent>
          </Card>

          {/* 최근 검색어: RecentSearches*/}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Search className="w-6 h-6 text-green-500 mr-2" />
                  최근 검색어
                </div>
                <Link href="" className="text-sm text-muted-foreground hover:text-primary">
                  더보기
                </Link>
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
