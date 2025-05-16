import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import GameList from '../components/games/GameList';
import type { GameFilters } from '../types/adventure.types';

const AdventureResultsPage = () => {
  const location = useLocation();
  const [filters, setFilters] = useState<GameFilters>({});

  useEffect(() => {
    // Get filters from URL state or localStorage
    const state = location.state as { filters?: GameFilters };
    if (state?.filters) {
      setFilters(state.filters);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link to="/" className="text-blue-400 hover:text-blue-300 text-sm">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-white mt-2">
            Your Game Recommendations
          </h1>
          <p className="text-gray-400 mt-2">
            Based on your adventure preferences
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">
            Perfect Games for You
          </h2>
          <GameList filters={filters} />
        </section>
      </div>
    </div>
  );
};

export default AdventureResultsPage;
