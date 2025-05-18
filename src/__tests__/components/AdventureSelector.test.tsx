import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdventureSelector from '../../components/adventure/AdventureSelector';

// Mock adventure steps
jest.mock('../../utils/adventureSteps', () => ({
  adventureSteps: [
    {
      id: 'platform',
      question: 'What is your preferred gaming platform?',
      options: [
        {
          id: 'pc',
          label: 'PC Gaming',
          icon: '🖥️',
          filters: { platforms: 4 },
        },
        {
          id: 'console',
          label: 'Console Gaming',
          icon: '🎮',
          filters: { platforms: [187, 186, 7] },
        },
        {
          id: 'retro',
          label: 'Retro Gaming',
          icon: '👾',
          filters: { platforms: [16, 14] },
        },
      ],
    },
    {
      id: 'playstyle',
      question: 'How do you like to play?',
      options: [
        {
          id: 'solo',
          label: 'Solo Adventures',
          icon: '🎯',
          filters: { tags: 'singleplayer' },
        },
        {
          id: 'coop',
          label: 'Co-op Fun',
          icon: '👥',
          filters: { tags: 'co-op' },
        },
        {
          id: 'competitive',
          label: 'Competitive',
          icon: '⚔️',
          filters: { tags: 'multiplayer' },
        },
      ],
    },
    {
      id: 'genre',
      question: 'What kind of experience?',
      options: [
        {
          id: 'action',
          label: 'Action Packed',
          icon: '💥',
          filters: { genres: 4 },
        },
        {
          id: 'story',
          label: 'Story Rich',
          icon: '📚',
          filters: { genres: [5, 3] },
        },
        {
          id: 'strategy',
          label: 'Mind Games',
          icon: '🧩',
          filters: { genres: [10, 7] },
        },
      ],
    },
  ],
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
