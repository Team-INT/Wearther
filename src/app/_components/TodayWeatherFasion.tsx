import React from "react";

// icons
import {Sun, Droplets, Wind} from "lucide-react";

export default function MainTodayWeatherFasion({weatherData, recommendedClothes}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-secondary/50 rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-2">현재 날씨</h3>
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
      </div>
      <div className="flex flex-wrap gap-3 ">
        {recommendedClothes.map((item) => (
          <div key={item.id} className="flex items-center space-x-4 bg-secondary rounded-lg p-2">
            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
            <p className="sr-only">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
