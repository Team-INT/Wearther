"use client";

import {useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {Sun, Droplets, Wind, Shirt, Search, TrendingUp} from "lucide-react";
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

export default function WeatherFashionMain() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [style, setStyle] = useState("");

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

  const fashionCategories = [
    {name: "상의", count: 1250},
    {name: "하의", count: 980},
    {name: "신발", count: 750},
    {name: "액세서리", count: 620},
  ];

  const popularSearches = ["여름 원피스", "린넨 셔츠", "샌들", "선글라스", "스트로 햇"];

  const beautyTrends = [
    {name: "자외선 차단제", trend: "up"},
    {name: "틴티드 모이스처라이저", trend: "up"},
    {name: "워터프루프 마스카라", trend: "stable"},
    {name: "립 틴트", trend: "up"},
    {name: "페이셜 미스트", trend: "up"},
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <header className="py-12 px-4 md:px-8 text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">Wearther</h1>
        <p className="text-xl md:text-2xl mb-8 animate-fade-in-delay">
          당신만의 완벽한 룩, 오늘의 날씨에 맞춰 제안해드립니다
        </p>
        <Button
          size="lg"
          className="bg-white text-blue-600 hover:bg-blue-100 transition-colors duration-300"
        >
          맞춤 스타일 찾기
        </Button>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <Card className="md:col-span-2 lg:col-span-2 row-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sun className="mr-2" /> 오늘의 날씨와 추천 스타일
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                <div className="text-center md:text-left mb-4 md:mb-0">
                  <p className="text-4xl font-bold">{weatherData.temperature}°C</p>
                  <p className="text-xl text-muted-foreground capitalize">
                    {weatherData.condition}
                  </p>
                  <div className="flex justify-center md:justify-start mt-2">
                    <span className="flex items-center mr-4">
                      <Droplets className="w-4 h-4 text-blue-500 mr-1" />
                      {weatherData.humidity}%
                    </span>
                    <span className="flex items-center">
                      <Wind className="w-4 h-4 text-gray-500 mr-1" />
                      {weatherData.windSpeed}m/s
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {recommendedClothes.map((item) => (
                    <div key={item.id} className="bg-secondary rounded-lg p-2 text-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-24 object-cover rounded-md mb-2"
                      />
                      <p className="text-sm font-medium">{item.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shirt className="mr-2" /> 패션 카테고리
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {fashionCategories.map((category) => (
                  <li key={category.name} className="flex justify-between items-center">
                    <span>{category.name}</span>
                    <span className="bg-secondary px-2 py-1 rounded-full text-sm">
                      {category.count}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="mr-2" /> 인기 검색어
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((search, index) => (
                  <span key={index} className="bg-secondary px-3 py-1 rounded-full text-sm">
                    {search}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2" /> 뷰티 트렌드
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {beautyTrends.map((item, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>{item.name}</span>
                    <span className={`${item.trend === "up" ? "text-green-500" : "text-gray-500"}`}>
                      {item.trend === "up" ? "↑" : "→"}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="md:col-span-3 lg:col-span-4">
            <CardHeader>
              <CardTitle>스타일 트렌드</CardTitle>
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

          <Card className="md:col-span-3 lg:col-span-4">
            <CardHeader>
              <CardTitle>맞춤 추천을 위한 정보</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              </form>
              <Button type="submit" className="w-full mt-4">
                맞춤 추천 받기
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
