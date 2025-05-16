// Define base API URL and API key as constants
export const API_BASE_URL =
  import.meta.env.VITE_RAWG_BASE_URL || 'https://api.rawg.io/api';
export const API_KEY = import.meta.env.VITE_RAWG_API_KEY || '';

// Platform IDs from RAWG API
export const PLATFORMS = {
  // PC
  PC: 4,

  // PlayStation consoles
  PS5: 187,
  PS4: 18,
  PS3: 16,

  // Xbox consoles
  XBOX_SERIES: 186,
  XBOX_ONE: 1,
  XBOX_360: 14,

  // Nintendo consoles
  SWITCH: 7,
  WII: 11,
  NINTENDO_3DS: 8,
};

// Popular Genre IDs from RAWG API
export const GENRES = {
  ACTION: 4,
  ADVENTURE: 3,
  RPG: 5,
  STRATEGY: 10,
  SHOOTER: 2,
  PUZZLE: 7,
  INDIE: 51,
  PLATFORMER: 83,
  RACING: 1,
  SPORTS: 15,
  FIGHTING: 6,
  SIMULATION: 14,
  ARCADE: 11,
  FAMILY: 19,
  BOARD_GAMES: 28,
  CARD: 17,
  CASUAL: 40,
  EDUCATIONAL: 34,
  MASSIVELY_MULTIPLAYER: 59,
};
