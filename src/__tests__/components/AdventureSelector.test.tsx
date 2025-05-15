import { render, screen } from '@testing-library/react';
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
});
