import React from "react";
import dayjs, {Dayjs} from "dayjs";

// icons
import {Sun, Droplets, Wind} from "lucide-react";

interface MainTodayWeatherProps {
  weatherData: any;
}

export default async function MainTodayWeather({weatherData}: MainTodayWeatherProps) {
  const now: Dayjs = dayjs();

  console.log(weatherData);
  if (!weatherData) return <div>현재 제공된 날씨 데이터가 없습니다.</div>;

  return (
    <div className="bg-secondary/50 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-4xl font-bold">{Math.round(weatherData.temperature)}°C</p>
          <p className="text-xl text-muted-foreground capitalize">{weatherData.condition}</p>
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
          <span>{weatherData.wind_speed}m/s</span>
        </div>
      </div>
      <p className="mt-4">기준 시간: {now.format("YYYY년 MM월 DD일 HH시 mm분")}</p>
    </div>
  );
}
