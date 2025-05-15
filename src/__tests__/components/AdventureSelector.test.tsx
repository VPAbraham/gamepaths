import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdventureSelector from '../../components/adventure/AdventureSelector';

describe('AdventureSelector', () => {
  it('should render the first question', () => {
    render(<AdventureSelector />);
    expect(
      screen.getByText("Don't know what you're looking for?")
    ).toBeInTheDocument();
  });

  it('should show the first step question', () => {
    render(<AdventureSelector />);
    expect(screen.getByText("What's your gaming setup?")).toBeInTheDocument();
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
});
