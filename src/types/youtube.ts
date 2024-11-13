export interface RecommendationInfo {
  summary?: string;
  details?: string;
  keywords?: string[];
  related?: string[];
  gender?: string;
  age?: string;
  situation?: string;
  style?: string;
}

export interface SearchInfo {
  season?: string;
  gender?: string;
  age?: string;
  situation?: string;
  style?: string;
  keywords: string[];
}

export interface YoutubeSearchResult {
  id: string;
  title: string;
  url: string;
  thumbnails: string;
}
