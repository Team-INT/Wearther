export async function getYoutubeSearchData() {
  const params = new URLSearchParams({
    key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY as string,
    part: "snippet",
    maxResults: "10",
    q: "겨울옷 트랜드",
    type: "video",
  });

  try {
    const res = await fetch(`https://www.googleapis.com/youtube/v3/search?${params.toString()}`);

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
}
