import {RecommendationInfo, SearchInfo, WeatherResponse} from "@/types/youtube";

export const extractSearchInfo = (recommendationData: {info?: RecommendationInfo}, weatherData?: WeatherResponse): SearchInfo => {
  const summary = recommendationData?.info?.summary || "";
  const details = recommendationData?.info?.details || "";
  const keywords = recommendationData?.info?.keywords || [];

  // 1. 계절 추출
  const seasons = ["봄", "여름", "가을", "겨울"];
  let season = seasons.find(
    (s) => keywords.some((k: string) => k.includes(s)) || summary.includes(s) || details.includes(s)
  );

  // 2. 성별 추출
  const genders = ["여성", "남성"];
  const gender = genders.find(
    (g) => keywords.some((k: string) => k.includes(g)) || summary.includes(g) || details.includes(g)
  );

  // 3. 연령대 추출
  const ageMatch = keywords.find((k: string) => k.includes("대"))?.match(/\d+/);
  const age = ageMatch ? `${ageMatch[0]}대` : undefined;

  // 4. 장소/상황 추출
  const situations = ["결혼식", "데이트", "면접", "출근", "여행", "파티", "일상"];
  const situation = situations.find(
    (s) => keywords.some((k: string) => k.includes(s)) || summary.includes(s) || details.includes(s)
  );

  // 5. 스타일 키워드 추출
  const styleKeywords = ["정장", "캐주얼", "빈티지", "모던", "클래식"];
  const style = styleKeywords.find(
    (s) => keywords.some((k: string) => k.includes(s)) || summary.includes(s) || details.includes(s)
  );

  // 날씨 데이터 기반 검색어 최적화
  if (weatherData) {
    // 계절이 없는 경우 현재 계절 사용
    if (!season) {
      season = weatherData.season;
    }

    // 날씨 상태에 따른 키워드 추가
    const weatherKeywords = [];
    
    if (weatherData.temperature >= 28) {
      weatherKeywords.push('시원한', '여름');
    } else if (weatherData.temperature <= 5) {
      weatherKeywords.push('따뜻한', '겨울');
    }

    if (weatherData.condition.includes('rain')) {
      weatherKeywords.push('비오는 날');
    }

    return {
      season,
      gender,
      age,
      situation,
      style,
      keywords: [...(recommendationData?.info?.related || []), ...weatherKeywords]
    };
  }

  return {
    season,
    gender,
    age,
    situation,
    style,
    keywords: recommendationData?.info?.related || [],
  };
};

export const createOptimizedSearchQuery = (searchInfo: SearchInfo): string => {
  return [
    searchInfo.age && searchInfo.gender && `${searchInfo.age} ${searchInfo.gender}`,
    searchInfo.season,
    searchInfo.situation,
    searchInfo.style,
  ]
    .filter(Boolean)
    .join(" ");
};
