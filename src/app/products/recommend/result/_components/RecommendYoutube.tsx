import React from "react";

const recommendationData = {
  youtubeVideos: [
    {
      id: "video1",
      title: "50대 여성을 위한 봄 정장 스타일링",
      url: "https://youtube.com/watch?v=abcdefg",
    },
    {
      id: "video2",
      title: "결혼식 하객 패션 팁",
      url: "https://youtube.com/watch?v=hijklmn",
    },
  ],
};

export default function RecommendYoutube() {
  return (
    <ul className="grid grid-cols-2 gap-4 mb-4">
      {recommendationData.youtubeVideos.map((video) => (
        <li key={video.id}>
          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            <div className="w-[200px] h-[100px] bg-gray-200">썸네일</div>
            <p>{video.title}</p>
          </a>
        </li>
      ))}
    </ul>
  );
}
