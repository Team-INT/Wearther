import React, {Suspense} from "react";
import {extractSearchInfo, createOptimizedSearchQuery} from "@/utils/youtubeUtils";
import {getYoutubeSearchData} from "@/service/api/youtube";
import {RecommendationInfo} from "@/lib/types/youtube";

// components
import YoutubeVideoList from "./YoutubeVideoList";

interface Props {
  recommendationData: {
    info?: RecommendationInfo;
  };
}

const SkeletonLoader = () => (
  <ul className="grid grid-cols-2 gap-4 mb-4">
    {[1, 2, 3, 4].map((i) => (
      <li key={i} className="animate-pulse">
        <div className="bg-gray-200 aspect-video rounded"></div>
        <div className="h-4 bg-gray-200 rounded mt-2"></div>
      </li>
    ))}
  </ul>
);

export default async function RecommendYoutube({recommendationData}: Props) {
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

  return (
    <Suspense fallback={<SkeletonLoader />}>
      <YoutubeVideoList searchResult={searchResult} />
    </Suspense>
  );
}
