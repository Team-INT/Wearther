import React, {Suspense} from "react";
import Image from "next/image";
import {extractSearchInfo, createOptimizedSearchQuery} from "@/utils/youtubeUtils";
import {getYoutubeSearchData} from "@/service/api/youtube";
import {RecommendationInfo, YoutubeSearchResult} from "@/types/youtube";

interface Props {
  recommendationData: {
    info?: RecommendationInfo;
  };
}

const YoutubeVideoList = ({searchResult}: {searchResult: YoutubeSearchResult[]}) => (
  <ul className="grid grid-cols-2 gap-4 mb-4">
    {searchResult.map((result) => (
      <li key={result.id}>
        <a
          href={result.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          <div className="relative aspect-video">
            <Image
              src={result.thumbnails}
              alt={result.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
            />
          </div>
          <p className="mt-2 line-clamp-2">{result.title}</p>
        </a>
      </li>
    ))}
  </ul>
);

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
