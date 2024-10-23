import React from "react";

// icons
import {Sun, Droplets, Wind} from "lucide-react";

export default function MainTodayWeather({weatherData}) {
  return (
    <div className="bg-secondary/50 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-4xl font-bold">{weatherData.temperature}°C</p>
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
          <span>{weatherData.windSpeed}m/s</span>
        </div>
      </div>
      <p className="mt-4">기준 시간: dayjs</p>
    </div>
  );
}
