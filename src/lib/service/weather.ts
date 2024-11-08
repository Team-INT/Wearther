export async function getCurrentWeather() {
  const response = await fetch(`${process.env.API_BASE_URL}/weather/current`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("현재 날씨 데이터를 가져오는데 실패했습니다.");
  }

  return response.json();
}
