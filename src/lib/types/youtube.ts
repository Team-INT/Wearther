export interface RecommendationInfo {
  summary?: string;
  details?: string;
  keywords?: string[];
  related?: string[];
}

export interface SearchInfo {
  season?: string;
  gender?: string;
  age?: string;
  situation?: string;
  style?: string;
  keywords: string[];
}

export interface WeatherResponse {
  temperature: number;
  condition: string;
  humidity: number;
  wind_speed: number;
  description: string;
  season: string;
}

export interface YoutubeSearchResult {
  id: string;
  title: string;
  url: string;
  thumbnails: string;
}
