export async function getMonthlyTrendData({params}: {params: Record<string, string>}) {
  const queryString = new URLSearchParams(params).toString();

  const response = await fetch(`${process.env.API_BASE_URL}/trend?${queryString}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("현재 날씨 데이터를 가져오는데 실패했습니다.");
  }

  const data = await response.json();

  return data;
}
