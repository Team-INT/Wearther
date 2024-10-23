import React from "react";
import dynamic from "next/dynamic";

// components
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import BeautyTrends from "@/components/blocks/BeautyTrends";
import PopularFashionItems from "@/components/blocks/PopularFashionItems";
import RecentSearches from "@/components/blocks/RecentSearches";
const StyleTrendChart = dynamic(() => import("@/components/blocks/StyleTrendChart"), {
  ssr: false,
});

import MainHeroSection from "./_components/MainHeroSection";
import MainTodayWeatherFasion from "./_components/TodayWeatherFasion";

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
  return (
    <>
      <MainHeroSection />
      <div className="grid grid-cols-1 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sun className="w-6 h-6 text-yellow-500 mr-2" />
              <span className="text-main-gradient">
                현재 날씨에 맞는 추천 스타일을 알려 드릴게요.
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MainTodayWeatherFasion
              weatherData={weatherData}
              recommendedClothes={recommendedClothes}
            />
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-6 h-6 text-blue-500 mr-2" />
              스타일 트렌드
              <Link href="">더보기</Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <StyleTrendChart trendData={trendData} />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
