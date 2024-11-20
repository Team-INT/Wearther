"use client";

import React, {useEffect, useState} from "react";
import Image from "next/image";

interface InstagramPost {
  id: string;
  media_url: string;
  username: string;
  caption: string;
  permalink: string;
}

export default function RecommendInstagram() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        const response = await fetch(`/api/instagram-posts`); // 백엔드 API 엔드포인트
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching Instagram posts:", error);
      }
    };

    fetchInstagramPosts();
  }, []);

  return (
    <ul className="grid grid-cols-2 gap-4">
      {posts.map((post) => (
        <li key={post.id} className="text-center">
          <a href={post.permalink} target="_blank" rel="noopener noreferrer">
            <Image
              width={300}
              height={300}
              src={post.media_url}
              alt={`Instagram post by ${post.username}`}
              className="w-full h-auto rounded"
            />
          </a>
          <p className="text-sm text-muted-foreground mt-1">@{post.username}</p>
          <p className="text-xs text-muted-foreground mt-1 truncate">{post.caption}</p>
        </li>
      ))}
    </ul>
  );
}
