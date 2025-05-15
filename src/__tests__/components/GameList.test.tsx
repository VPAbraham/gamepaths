import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import GameList from '../../components/games/GameList';

// Mock the API service
jest.mock('../../services/rawgApi', () => ({
  getGames: jest.fn(),
}));

import { getGames } from '../../services/rawgApi';

const mockGame = {
  id: 1,
  slug: 'test-game',
  name: 'Test Game',
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
};

describe('GameList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading state initially', () => {
    (getGames as jest.Mock).mockImplementation(() => new Promise(() => {}));

    render(<GameList />);
    expect(screen.getByText('Loading games...')).toBeInTheDocument();
  });

  it('should render games after loading', async () => {
    const mockGames = [
      { id: 1, name: 'Game 1' },
      { id: 2, name: 'Game 2' },
    ];

    (getGames as jest.Mock).mockResolvedValue({
      results: mockGames,
    });

    render(<GameList />);

    // Wait for games to load
    expect(await screen.findByTestId('game-1')).toBeInTheDocument();
    expect(await screen.findByTestId('game-2')).toBeInTheDocument();
  });

  it('should render error message on API failure', async () => {
    (getGames as jest.Mock).mockRejectedValue(new Error('API Error'));

    render(<GameList />);

    expect(await screen.findByText('Failed to load games')).toBeInTheDocument();
  });
});
