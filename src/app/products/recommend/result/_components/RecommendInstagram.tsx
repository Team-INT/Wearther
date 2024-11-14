import React from "react";
import Image from "next/image";
const recommendationData = {
  instagramPosts: [
    {
      id: "post1",
      imageUrl: "/temp/temp_instagram01.jpg",
      username: "user1",
    },
    {
      id: "post2",
      hashtag: "블레이저",
      username: "@styleguru",
      imageUrl: "/temp/temp_instagram02.jpg",
    },
  ],
};

export default function RecommendInstagram() {
  return (
    <ul className="grid grid-cols-2 gap-4">
      {recommendationData.instagramPosts.map((post) => (
        <li key={post.id} className="text-center">
          <Image
            width={300}
            height={300}
            src={post.imageUrl}
            alt={`Instagram post by ${post.username}`}
            className="w-full h-auto rounded"
          />
          <p className="text-sm text-muted-foreground mt-1">{post.username}</p>
        </li>
      ))}
    </ul>
  );
}
