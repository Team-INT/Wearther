import React from "react";
import {extractSearchInfo, createOptimizedSearchQuery} from "@/utils/youtubeUtils";
import {getYoutubeSearchData} from "@/service/api/youtube";
import {RecommendationInfo} from "@/lib/types/youtube";
import YoutubeVideoList from "./YoutubeVideoList";

interface Props {
  recommendationData: {
    info?: RecommendationInfo;
  };
}

const YoutubeErrorFallback = () => (
  <div className="p-4 border border-red-200 rounded-lg bg-red-50">
    <p className="text-red-600">유튜브 영상을 불러오는데 실패했습니다.</p>
    <p className="text-sm text-red-500 mt-2">
      일일 할당량이 초과되었습니다. 잠시 후 다시 시도해주세요.
    </p>
  </div>
);

export default async function RecommendYoutube({recommendationData}: Props) {
  try {
    const searchInfo = extractSearchInfo(recommendationData);
    const optimizedSearchQuery = createOptimizedSearchQuery(searchInfo);

    const {data: youtubeData} = await getYoutubeSearchData({
      ...searchInfo,
      optimizedQuery: optimizedSearchQuery,
    } as const);

    const searchResult = youtubeData.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      thumbnails: item.snippet.thumbnails.high.url,
    }));

    return <YoutubeVideoList searchResult={searchResult} />;
  } catch (error) {
    console.error(error);
    return <YoutubeErrorFallback />;
  }
}
