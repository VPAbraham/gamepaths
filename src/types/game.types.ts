// Platform (console/PC) info
export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface PlatformInfo {
  platform: Platform;
  released_at: string;
}

// Genre info
export interface Genre {
  id: number;
  name: string;
  slug: string;
}
export interface Screenshot {
  id: number;
  image: string;
}

// Game info
export interface Game {
  id: number;
  slug: string;
  name: string;
  released: string;
  background_image: string;
  rating: number;
  metacritic: number | null;
  platforms: PlatformInfo[];
  genres: Genre[];
  short_screenshots: { id: number; image: string }[];
  description?: string;
  description_raw?: string;
  screenshots?: Screenshot[];
}

// API Response types
export interface GamesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Game[];
}

export interface GenreDetail {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
  games: {
    id: number;
    slug: string;
    name: string;
    added: number;
  }[];
}

export interface GenresResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: GenreDetail[];
}
