import React from 'react';
import { render, screen } from '@testing-library/react';
import GameCard from '../../components/games/GameCard';
import type { Game } from '../../types/game.types';

const mockGame: Game = {
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

describe('GameCard', () => {
  it('should render game name', () => {
    render(<GameCard game={mockGame} />);

    expect(screen.getByText('Test Game')).toBeInTheDocument();
  });

  it('should display game image', () => {
    render(<GameCard game={mockGame} />);

    const image = screen.getByAltText('Test Game');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('should show release year', () => {
    render(<GameCard game={mockGame} />);
    expect(screen.getByText('2023')).toBeInTheDocument();
  });

  it('should display metacritic score', () => {
    render(<GameCard game={mockGame} />);
    expect(screen.getByText('85/100')).toBeInTheDocument();
  });

  it('should show first genre', () => {
    render(<GameCard game={mockGame} />);
    expect(screen.getByText('Action')).toBeInTheDocument();
  });
});
