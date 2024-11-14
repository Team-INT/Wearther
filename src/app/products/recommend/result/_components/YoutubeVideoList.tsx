"use client";

import Image from "next/image";
import {YoutubeSearchResult} from "@/lib/types/youtube";

// hooks
import {useImageLoading} from "@/lib/hooks/useImageLoading";

const YoutubeVideo = ({result}: {result: YoutubeSearchResult}) => {
  const {isLoading, handleLoadingComplete, imageStyles} = useImageLoading({
    containerHeight: "aspect-video",
  });

  return (
    <a
      href={result.url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      <div className={imageStyles.container}>
        {/* 스켈레톤 UI */}
        <div className={imageStyles.skeleton} style={{transition: "opacity 0.3s ease-in-out"}} />

        {/* 실제 이미지 */}
        <Image
          src={result.thumbnails}
          alt={result.title}
          fill
          className={imageStyles.image}
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{transition: "opacity 0.3s ease-in-out"}}
          onLoadingComplete={handleLoadingComplete}
        />
      </div>
      <p
        className={`mt-2 line-clamp-2 ${isLoading ? "opacity-0" : "opacity-100"}`}
        style={{transition: "opacity 0.3s ease-in-out"}}
      >
        {result.title}
      </p>
    </a>
  );
};

const YoutubeVideoList = ({searchResult}: {searchResult: YoutubeSearchResult[]}) => (
  <ul className="grid grid-cols-2 gap-4 mb-4">
    {searchResult.map((result) => (
      <li key={result.id}>
        <YoutubeVideo result={result} />
      </li>
    ))}
  </ul>
);

export default YoutubeVideoList;
