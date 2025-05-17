import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import '@testing-library/jest-dom';

// Mock the components that make API calls
jest.mock('../../components/games/GameList', () => {
  return function MockGameList({
    filters,
    onGameClick,
  }: {
    filters: unknown;
    onGameClick?: (game: { id: number; name: string }) => void;
  }) {
    return (
      <div
        data-testid="game-list"
        onClick={() => onGameClick?.({ id: 1, name: 'Test Game' })}
      >
        Game List Component with filters: {JSON.stringify(filters)}
      </div>
    );
  };
});

jest.mock('../../components/adventure/AdventureSelector', () => {
  return function MockAdventureSelector({
    onComplete,
  }: {
    onComplete?: (result: { genres: number }) => void;
  }) {
    return (
      <div
        data-testid="adventure-selector"
        onClick={() => onComplete?.({ genres: 4 })}
      >
        Adventure Selector Component
      </div>
    );
  };
});

describe('HomePage', () => {
  it('renders the header with title', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    expect(screen.getByText('GamePaths')).toBeInTheDocument();
    expect(
      screen.getByText('Discover your next favorite game')
    ).toBeInTheDocument();
  });

  it('renders the adventure selector', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    expect(screen.getByTestId('adventure-selector')).toBeInTheDocument();
  });

  it('renders game list sections', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const popularSection = screen.getByText('Popular Games');
    expect(popularSection).toBeInTheDocument();

    const actionSection = screen.getByText('Action Games');
    expect(actionSection).toBeInTheDocument();

    const gameLists = screen.getAllByTestId('game-list');
    expect(gameLists.length).toBeGreaterThan(1);
  });

  it('handles adventure completion', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Initially, adventure results section should not be present
    expect(screen.queryByText('Perfect Games for You')).not.toBeInTheDocument();

    // Trigger adventure completion
    fireEvent.click(screen.getByTestId('adventure-selector'));

    // Adventure results section should now be visible
    expect(screen.getByText('Perfect Games for You')).toBeInTheDocument();
  });
});
