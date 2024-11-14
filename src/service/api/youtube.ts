interface RecommendInfo {
  age?: string;
  gender?: string;
  season?: string;
  style?: string;
  situation?: string;
  keywords?: string[];
  optimizedQuery?: string;
}

import {unstable_cache as cache} from "next/cache";

export async function getYoutubeSearchData(recommendInfo?: RecommendInfo) {
  const getCachedYoutubeData = cache(
    async (searchQuery: string) => {
      const params = new URLSearchParams({
        key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY as string,
        part: "snippet",
        maxResults: "4",
        q: searchQuery,
        type: "video",
        relevanceLanguage: "ko",
        videoDefinition: "high",
        order: "relevance",
      });

      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/search?${params.toString()}`,
          {next: {revalidate: 60 * 60}}
        );

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
    },
    ["youtube-search"], // 캐시 키
    {revalidate: 60 * 60}
  );

  const baseQuery = recommendInfo?.optimizedQuery || "";
  const searchQuery = [baseQuery, "코디", recommendInfo?.situation ? "패션" : "패션 코디"]
    .filter(Boolean)
    .join(" ");

  return getCachedYoutubeData(searchQuery);
}

// 로직 변경 고민.. 할당량 때문에

// 재생목록 내 아이템을 불러오는 playlistItems API의 list 메서드는 1 Cost 차감인데 반해
// Search API 의 list 메서드는 1회 호출당 100 Cost를 차감한다.. 100배다!!
// 이러니.. 반나절도 되지 않아 일일 할당량을 초과 할 수 밖에..

// 물론 Youtube에 할당량 증가 신청을 할 수는 있겠지만, 감사에..절차가 제법 까다로워서 쉽지 않다.

// PlaylistItems.list를 활용하여 최근 영상 목록 가져오기
// 유투브 채널의 고유 ID를 살펴보자.
// 고유ID를 모르겠다면, Youtube Data API의 Channels.list 를 활용하면 알수있다.

// UCD3KjaGE4xxxxxxxxxxx

// 채널ID로 Playlists.list를 검색해도 채널내 생성된 재생목록만 나오지만 추가된 최신영상을 받고 싶다면

// UUD3KjaGE4xxxxxxxxxxx

// 두번째 텍스트를 C에서 U로 바꾸고 PlaylistItems.list 에 playlistId 값으로 입력하고 조회하면
// 최근영상이 출력되는 것을 볼 수 있다.

// PlaylistItems.list 의 Cost는 1 밖에 들어가지 않기 때문에 할당량을 세이브 할 수 있다.

// https://velog.io/@koreakky/youtube-data-api-20221223
