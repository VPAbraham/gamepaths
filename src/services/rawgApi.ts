import { API_BASE_URL, API_KEY } from '../utils/constants';
import type { GamesResponse, GenresResponse } from '../types/game.types';
import type { GameFilters } from '../types/adventure.types';
import type { Game } from '../types/game.types';

// Helper function to build the  query string
export function buildApiUrl(endpoint: string, params = {}) {
  const url = new URL(`${API_BASE_URL}${endpoint}`);

  // Add the API key
  url.searchParams.append('key', API_KEY);

  // Add other parameters
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      // Handle arrays by joining with commas
      if (Array.isArray(value)) {
        url.searchParams.append(key, value.join(','));
      } else {
        url.searchParams.append(key, value.toString());
      }
    }
  });

  return url.toString();
}

// API fetch function
export async function fetchFromApi<T>(
  endpoint: string,
  params = {}
): Promise<T> {
  const url = buildApiUrl(endpoint, params);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status}`);
  }

  return response.json();
}

// Get all genres
export async function getGenres(): Promise<GenresResponse> {
  return fetchFromApi('/genres');
}

// Get games with filters
export async function getGames(
  filters: GameFilters = {}
): Promise<GamesResponse> {
  const params = {
    page_size: 20,
    ordering: '-metacritic',
    // API will return games in order of highest to lowest Metacritic score for best game results
    ...filters,
  };

  return fetchFromApi('/games', params);
}

// Get single game details
export async function getGameDetail(id: string | number): Promise<Game> {
  try {
    const gameData = await fetchFromApi<Game>(`/games/${id}`);

    // Try to get screenshots
    try {
      const screenshotsResponse = await getGameScreenshots(id);
      const gameWithScreenshots: Game = {
        ...gameData,
        screenshots: screenshotsResponse.results,
      };
      return gameWithScreenshots;
    } catch (error) {
      console.error('Failed to fetch screenshots:', error);
      // Return game data even if screenshots fail
      return gameData;
    }
  } catch (error) {
    console.error('Failed to fetch game details:', error);
    throw error;
  }
}

// Get screenshots for game

export async function getGameScreenshots(
  gameId: string | number
): Promise<{ results: { id: number; image: string }[] }> {
  return fetchFromApi(`/games/${gameId}/screenshots`);
}

// Get games for adventure results
export async function getAdventureResults(
  filters: GameFilters
): Promise<GamesResponse> {
  const params = {
    page_size: 12,
    ordering: '-metacritic',
    ...filters,
  };

  return fetchFromApi('/games', params);
}
