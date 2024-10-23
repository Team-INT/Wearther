import React from "react";
import Link from "next/link";

// components
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import StyleTrendChart from "@/components/blocks/StyleTrendChart";
import BeautyTrends from "@/components/blocks/BeautyTrends";
import PopularFashionItems from "@/components/blocks/PopularFashionItems";
import RecentSearches from "@/components/blocks/RecentSearches";

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

export default function WeatherFashionMain() {
  return (
    <>
      <MainHeroSection />
      <Button asChild>
        <Link href="/recommend">맞춤 추천 받기</Link>
      </Button>
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
