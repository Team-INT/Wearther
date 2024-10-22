"use client";
import {useTheme} from "next-themes";

// components
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Toggle} from "@/components/ui/toggle";
import MainHeroSection from "./_components/MainHeroSection";
import {AuroraBackground} from "@/components/ui/aurora-background";

// charts
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// icon
import {
  Sun,
  Moon,
  Cloud,
  Droplets,
  Wind,
  Sparkles,
  Search,
  TrendingUp,
  UserIcon,
} from "lucide-react";

export default function WeatherFashionMain() {
  const {theme, setTheme} = useTheme();

  // 실제 앱에서는 이 부분을 API 호출로 대체해야 합니다
  const weatherData = {
    temperature: 22,
    condition: "sunny",
    humidity: 60,
    windSpeed: 5,
  };

  const recommendedClothes = [
    {id: 1, name: "가벼운 셔츠", image: "/placeholder.svg?height=200&width=200"},
    {id: 2, name: "린넨 바지", image: "/placeholder.svg?height=200&width=200"},
    {id: 3, name: "샌들", image: "/placeholder.svg?height=200&width=200"},
    {id: 4, name: "가벼운 셔츠", image: "/placeholder.svg?height=200&width=200"},
    {id: 5, name: "린넨 바지", image: "/placeholder.svg?height=200&width=200"},
    {id: 6, name: "샌들", image: "/placeholder.svg?height=200&width=200"},
  ];

  const trendData = [
    {name: "1월", casual: 4000, formal: 2400, sporty: 2400},
    {name: "2월", casual: 3000, formal: 1398, sporty: 2210},
    {name: "3월", casual: 2000, formal: 9800, sporty: 2290},
    {name: "4월", casual: 2780, formal: 3908, sporty: 2000},
    {name: "5월", casual: 1890, formal: 4800, sporty: 2181},
    {name: "6월", casual: 2390, formal: 3800, sporty: 2500},
    {name: "7월", casual: 3490, formal: 4300, sporty: 2100},
  ];

  const popularItems = [
    {name: "오버사이즈 티셔츠", category: "상의"},
    {name: "와이드 데님", category: "하의"},
    {name: "버킷햇", category: "액세서리"},
    {name: "크롭 카디건", category: "아우터"},
  ];

  const beautyTrends = [
    {name: "글로우 메이크업", description: "자연스러운 광채 피부"},
    {name: "볼드 아이라이너", description: "과감한 아이 메이크업"},
    {name: "누드 립", description: "내추럴한 입술 연출"},
  ];

  const recentSearches = [
    "여름 원피스",
    "남자 린넨 셔츠",
    "데일리 스니커즈",
    "플로럴 스커트",
    "썸머 헤어스타일",
    "썸머 헤어스타일",
    "썸머 헤어스타일",
    "썸머 헤어스타일",
    "썸머 헤어스타일",
    "데일리 스니커즈",
    "플로럴 스커트",
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <header className="flex justify-between items-center mb-8 py-4 px-6">
        <h1 className="text-2xl md:text-3xl font-bold text-primary">Wearther</h1>
        <div className="flex items-center space-x-4">
          <Toggle
            aria-label="Toggle dark mode"
            pressed={theme === "dark"}
            onPressedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Toggle>
          <Button variant="outline">로그인</Button>
        </div>
      </header>
      <MainHeroSection />
      <div className="grid grid-cols-1 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sun className="w-6 h-6 text-yellow-500 mr-2" />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text">
                오늘의 날씨와 추천 스타일
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-secondary/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">현재 날씨</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-4xl font-bold">{weatherData.temperature}°C</p>
                    <p className="text-xl text-muted-foreground capitalize">
                      {weatherData.condition}
                    </p>
                  </div>
                  <Sun className="w-16 h-16 text-yellow-500" />
                </div>
                <div className="flex justify-between mt-4">
                  <div className="flex items-center">
                    <Droplets className="w-5 h-5 text-blue-500 mr-1" />
                    <span>강수 확률 {weatherData.humidity}%</span>
                  </div>
                  <div className="flex items-center">
                    <Wind className="w-5 h-5 text-gray-500 mr-1" />
                    <span>{weatherData.windSpeed}m/s</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex flex-wrap gap-3 space-y-4">
                  {recommendedClothes.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-4 bg-secondary rounded-lg p-2"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <p className="text-sm font-medium flex-grow">{item.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="casual" stroke="#8884d8" activeDot={{r: 8}} />
                <Line type="monotone" dataKey="formal" stroke="#82ca9d" />
                <Line type="monotone" dataKey="sporty" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>
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
              <ul className="space-y-2">
                {popularItems.map((item, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>{item.name}</span>
                    <span className="text-sm text-muted-foreground">{item.category}</span>
                  </li>
                ))}
              </ul>
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
              <ul className="space-y-2">
                {beautyTrends.map((trend, index) => (
                  <li key={index}>
                    <p className="font-medium">{trend.name}</p>
                    <p className="text-sm text-muted-foreground">{trend.description}</p>
                  </li>
                ))}
              </ul>
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
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((search, index) => (
                  <span
                    key={index}
                    className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-sm"
                  >
                    {search}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
