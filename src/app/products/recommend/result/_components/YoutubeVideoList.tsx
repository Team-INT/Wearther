"use client";
import Image from "next/image";
import {ErrorBoundary} from "react-error-boundary";
import {YoutubeSearchResult} from "@/lib/types/youtube";
import {useImageLoading} from "@/lib/hooks/useImageLoading";

const ErrorFallback = ({error}: {error: Error}) => (
  <div className="p-4 border border-red-200 rounded-lg bg-red-50">
    <p className="text-red-600">유튜브 영상을 불러오는데 실패했습니다.</p>
    <p className="text-sm text-red-500">{error.message}</p>
  </div>
);

const YoutubeVideo = ({result}: {result: YoutubeSearchResult}) => {
  const {isLoading, handleLoadingComplete, imageStyles} = useImageLoading({
    containerHeight: "aspect-video",
  });

  return (
    <a
      href={result.url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary hover:underline"
    >
      <div className={imageStyles.container}>
        <div className={imageStyles.skeleton} style={{transition: "opacity 0.3s ease-in-out"}} />
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

const VideoList = ({searchResult}: {searchResult: YoutubeSearchResult[]}) => (
  <ul className="grid grid-cols-2 gap-4 mb-4">
    {searchResult.map((result) => (
      <li key={result.id}>
        <YoutubeVideo result={result} />
      </li>
    ))}
  </ul>
);

export default function YoutubeVideoList({searchResult}: {searchResult: YoutubeSearchResult[]}) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <VideoList searchResult={searchResult} />
    </ErrorBoundary>
  );
}
