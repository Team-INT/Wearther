import apiRequest from "@/utils/api";

export interface WeatherResponse {
  temperature: number;
  condition: string;
  humidity: number;
  wind_speed: number;
  description: string;
  season: string;
}

export async function GetCurrentWeather() {
  const response = await fetch(`${process.env.API_BASE_URL}/weather/current`, {
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
