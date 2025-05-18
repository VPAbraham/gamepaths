import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import GameList from '../../components/games/GameList';

jest.mock('../../components/ui/LoadingSpinner', () => {
  return function MockLoadingSpinner() {
    return <div data-testid="loading-spinner">Loading Spinner</div>;
  };
});

// Mock the API service
jest.mock('../../services/rawgApi', () => ({
  getGames: jest.fn(),
}));

import { getGames } from '../../services/rawgApi';

// Complete mock game with all required properties
const createMockGame = (id: number, name: string) => ({
  id,
  slug: `test-game-${id}`,
  name,
  released: '2023-01-15',
  background_image: 'https://example.com/image.jpg',
  rating: 4.5,
  metacritic: 85,
  platforms: [
    {
      platform: { id: 4, name: 'PC', slug: 'pc' },
      released_at: '2023-01-15',
    },
  ],
  genres: [{ id: 4, name: 'Action', slug: 'action' }],
  short_screenshots: [],
});

describe('GameList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading state initially', () => {
    (getGames as jest.Mock).mockImplementation(() => new Promise(() => {}));

    render(<GameList />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('should render games after loading', async () => {
    const mockGames = [
      createMockGame(1, 'Game 1'),
      createMockGame(2, 'Game 2'),
    ];

    (getGames as jest.Mock).mockResolvedValue({
      results: mockGames,
    });

    await act(async () => {
      render(<GameList />);
    });

    expect(await screen.findByText('Game 1')).toBeInTheDocument();
    expect(await screen.findByText('Game 2')).toBeInTheDocument();
  });

  it('should render error message on API failure', async () => {
    (getGames as jest.Mock).mockRejectedValue(new Error('API Error'));

    await act(async () => {
      render(<GameList />);
    });

    expect(await screen.findByText('Failed to load games')).toBeInTheDocument();
  });

  it('should pass filters to getGames', async () => {
    const mockFilters = { genres: 4 };
    (getGames as jest.Mock).mockResolvedValue({ results: [] });

    render(<GameList filters={mockFilters} />);

    expect(getGames).toHaveBeenCalledWith(mockFilters);
  });
});
