import {RecommendationInfo, SearchInfo} from "@/types/youtube";

export const extractSearchInfo = (recommendationData: {info?: RecommendationInfo}): SearchInfo => {
  const summary = recommendationData?.info?.summary || "";
  const details = recommendationData?.info?.details || "";
  const keywords = recommendationData?.info?.keywords || [];

  // 1. 계절 추출
  const seasons = ["봄", "여름", "가을", "겨울"];
  const season = seasons.find(
    (s) => keywords.some((k: string) => k.includes(s)) || summary.includes(s) || details.includes(s)
  );

  // 2. 성별 추출
  const genders = ["여성", "남성"];
  const gender = genders.find(
    (g) => keywords.some((k: string) => k.includes(g)) || summary.includes(g) || details.includes(g)
  );

  // 3. 연령대 추출
  const ageMatch = keywords.find((k: string) => k.includes("대"))?.match(/\d+/);
  const age = ageMatch ? `${ageMatch[0]}대` : null;

  // 4. 장소/상황 추출
  const situations = ["결혼식", "데이트", "면접", "출근", "여행", "파티", "일상"];
  const situation = situations.find(
    (s) => keywords.some((k: string) => k.includes(s)) || summary.includes(s) || details.includes(s)
  );

  // 스타일 키워드 추출 (부가 정보)
  const styleKeywords = ["정장", "캐주얼", "빈티지", "모던", "클래식"];
  const style = styleKeywords.find(
    (s) => keywords.some((k: string) => k.includes(s)) || summary.includes(s) || details.includes(s)
  );

  return {
    season: season || undefined,
    gender: gender || undefined,
    age: age || undefined,
    situation: situation || undefined,
    style: style || undefined,
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
