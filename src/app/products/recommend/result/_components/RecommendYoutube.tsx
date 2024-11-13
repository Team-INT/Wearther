import React from "react";
import Image from "next/image";

import {getYoutubeSearchData} from "@/service/api/youtube";

export default async function RecommendYoutube() {
  const {data: youtubeData} = await getYoutubeSearchData();
  const searchResult = youtubeData.items.map((item: any) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    thumbnails: item.snippet.thumbnails.high.url,
  }));

  console.log(searchResult);

  return (
    <ul className="grid grid-cols-2 gap-4 mb-4">
      {searchResult.map((result: any) => (
        <li key={result.id}>
          <a
            href={result.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            <Image src={result.thumbnails} alt={result.title} width={480} height={360} />
            <p>{result.title}</p>
          </a>
        </li>
      ))}
    </ul>
  );
}
