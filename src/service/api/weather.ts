"use client";

import {WeatherResponse} from "@/lib/types/youtube";
import {useQuery} from "@tanstack/react-query";

async function fetchWeather(): Promise<WeatherResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/weather/current`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`날씨 데이터를 가져오는데 실패했습니다: ${response.statusText}`);
  }

  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("날씨 데이터 파싱 에러:", error);
    throw new Error("날씨 데이터 형식이 올바르지 않습니다.");
  }
}

export function GetCurrentWeather() {
  return useQuery<WeatherResponse>({
    queryKey: ["weather", "current"],
    queryFn: fetchWeather,
    staleTime: 1000 * 60 * 30, // 30분
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
