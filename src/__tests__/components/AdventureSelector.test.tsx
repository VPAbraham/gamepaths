import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdventureSelector from '../../components/adventure/AdventureSelector';

// Mock the constants to avoid import.meta issues
jest.mock('../../utils/constants', () => ({
  API_BASE_URL: 'https://api.rawg.io/api',
  API_KEY: 'test-key',
  PLATFORMS: {
    PC: 4,
    PS5: 187,
    PS4: 18,
    PS3: 16,
    XBOX_SERIES: 186,
    XBOX_ONE: 1,
    XBOX_360: 14,
    SWITCH: 7,
    WII: 11,
    NINTENDO_3DS: 8,
  },
  GENRES: {
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
  },
}));

describe('AdventureSelector', () => {
  it('should render the first question', () => {
    render(<AdventureSelector />);
    expect(
      screen.getByText("Can't choose a game to play?")
    ).toBeInTheDocument();
  });

  it('should show the first step question', () => {
    render(<AdventureSelector />);
    expect(
      screen.getByText('What is your preferred gaming platform?')
    ).toBeInTheDocument();
  });

  it('should show platform options', () => {
    render(<AdventureSelector />);
    expect(screen.getByText('PC Gaming')).toBeInTheDocument();
    expect(screen.getByText('Console Gaming')).toBeInTheDocument();
    expect(screen.getByText('Retro Gaming')).toBeInTheDocument();
  });

  it('should move to next step when option is selected', () => {
    render(<AdventureSelector />);

    // User clicks the PC gaming option
    fireEvent.click(screen.getByText('PC Gaming'));

    // Display should move to the second question
    expect(screen.getByText('How do you like to play?')).toBeInTheDocument();
  });

  it('should show reset button after making a selection', () => {
    render(<AdventureSelector />);

    // Initially no reset button
    expect(screen.queryByText('Start Over')).not.toBeInTheDocument();

    // Click an option
    fireEvent.click(screen.getByText('PC Gaming'));

    // Reset button now should appear
    expect(screen.getByText('Start Over')).toBeInTheDocument();
  });

  it('should call onComplete with filters after final step', () => {
    const mockOnComplete = jest.fn();
    render(<AdventureSelector onComplete={mockOnComplete} />);

    // Go through all CYOA steps
    fireEvent.click(screen.getByText('PC Gaming'));
    fireEvent.click(screen.getByText('Solo Adventures'));
    fireEvent.click(screen.getByText('Action Packed'));

    // Call onComplete will all filters
    expect(mockOnComplete).toHaveBeenCalledWith({
      platforms: 4,
      tags: 'singleplayer',
      genres: 4,
    });
  });
});
