export async function getProductRecommendData(query) {
  const params = new URLSearchParams({
    queyr: "가디건",
    display: 6,
    start: 1,
    exclude: "used:rental",
  });

  try {
    const res = await fetch(`https://openapi.naver.com/v1/search/shop.json?${params.toString()}`);

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(`네이버 검색 API 호출 실패: ${res.status} ${JSON.stringify(errorData)}`);
    }

    const data = await res.json();
    return {data};
  } catch (error) {
    console.error("검색API 에러:", error);
    throw error;
  }
}
