interface RecommendInfo {
  age?: string;
  gender?: string;
  season?: string;
  style?: string;
  situation?: string;
  keywords?: string[];
  optimizedQuery?: string;
}

export async function getYoutubeSearchData(recommendInfo?: RecommendInfo) {
  const baseQuery = recommendInfo?.optimizedQuery || "";

  // 검색어 구성
  const searchQuery = [baseQuery, "코디", recommendInfo?.situation ? "패션" : "패션 코디"]
    .filter(Boolean)
    .join(" ");

  const params = new URLSearchParams({
    key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY as string,
    part: "snippet",
    maxResults: "4",
    q: searchQuery,
    type: "video",
    relevanceLanguage: "ko",
    videoDefinition: "high",
    order: "relevance",
    // 조회수가 일정 이상인 영상만 필터링
    // videoDuration: "medium", // 중간 길이 영상 (4-20분)
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
