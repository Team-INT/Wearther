export async function getProductRecommendData(query: string) {
  try {
    // 환경 변수 확인
    if (!process.env.NAVER_CLIENT_ID || !process.env.NAVER_CLIENT_SECRET) {
      throw new Error("필요한 환경 변수가 설정되지 않았습니다.");
    }

    const params = new URLSearchParams({
      query,
      display: "2",
      start: "1",
      exclude: "used:rental",
    });

    const res = await fetch(
      `${process.env.NAVER_SHOP_BASE_URL}/search/shop.json?${params.toString()}`,
      {
        headers: {
          "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID,
          "X-Naver-Client-Secret": process.env.NAVER_CLIENT_SECRET,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error(`API 호출 실패: ${res.status}`);
    }

    const data = await res.json();

    // 검색 결과가 없는 경우 체크
    if (!data.items || data.items.length === 0) {
      return {
        success: false,
        status: 404,
        message: "검색 결과가 없습니다.",
      };
    }

    return {success: true, data};
  } catch (error) {
    console.error("상품 추천 데이터 조회 실패:", error);
    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "알 수 없는 에러가 발생했습니다.",
    };
  }
}
