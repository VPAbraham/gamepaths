// Types for 'choose your own adventure' (CYOA) game recommendation
export interface AdventureStep {
  id: string;
  question: string;
  options: AdventureOption[];
}

// Individual options
export interface AdventureOption {
  id: string;
  label: string;
  icon: string;
  filters: GameFilters;
}

// Filters down the recommendations based on the CYOA
export interface GameFilters {
  platforms?: number | number[];
  genres?: number | number[];
  tags?: string | string[];
  metacritic?: string;
  ordering?: string;
  page_size?: number;
  search?: string;
  dates?: string;
}

// Keeps track of where the user is in the CYOA
export interface AdventureState {
  currentStep: number;
  selectedOptions: AdventureOption[];
  finalFilters: GameFilters;
  isComplete: boolean;
}
