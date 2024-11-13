interface RecommendInfo {
  age?: string;
  gender?: string;
  season?: string;
  style?: string;
  keywords?: string[];
}

export async function getYoutubeSearchData(recommendInfo?: RecommendInfo) {
  // 검색어 최적화
  const searchKeywords = [
    recommendInfo?.age && `${recommendInfo.age} ${recommendInfo.gender}`,
    recommendInfo?.season,
    recommendInfo?.style,
    ...(recommendInfo?.keywords || []),
  ]
    .filter(Boolean)
    .slice(0, 3) // 가장 관련성 높은 3개 키워드만 선택
    .join(" ");

  // 기본 검색어 설정
  const searchQuery = searchKeywords || "패션 코디 추천";

  const params = new URLSearchParams({
    key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY as string,
    part: "snippet",
    maxResults: "4", // 상위 4개 결과만 표시
    q: `${searchQuery} 패션 코디`, // "패션 코디"를 항상 포함
    type: "video",
    relevanceLanguage: "ko", // 한국어 결과 우선
    videoDefinition: "high", // 고화질 영상 우선
    order: "relevance", // 관련성 기준 정렬
  });

  try {
    const res = await fetch(`https://www.googleapis.com/youtube/v3/search?${params.toString()}`);

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(`YouTube API 호출 실패: ${res.status} ${JSON.stringify(errorData)}`);
    }

    const data = await res.json();
    return {data};
  } catch (error) {
    console.error("YouTube API 에러:", error);
    throw error;
  }
}
