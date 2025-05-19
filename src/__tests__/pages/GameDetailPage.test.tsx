import { render, screen } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom';
import GameDetailPage from '../../pages/GameDetailPage';
import { getGameDetail } from '../../services/rawgApi';

jest.mock('../../services/rawgApi', () => ({
  getGameDetail: jest.fn(),
}));

jest.mock('../../components/ui/LoadingSpinner', () => {
  return function MockLoadingSpinner() {
    return <div data-testid="loading-spinner">Loading Spinner</div>;
  };
});

describe('GameDetailPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    (getGameDetail as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    );

    render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<GameDetailPage />} />
        </Routes>
      </BrowserRouter>
    );

    expect(screen.getByText('Game Details')).toBeInTheDocument();
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('has working navigation elements', () => {
    (getGameDetail as jest.Mock).mockResolvedValue({});

    render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<GameDetailPage />} />
        </Routes>
      </BrowserRouter>
    );

    expect(screen.getByText('← Back')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
