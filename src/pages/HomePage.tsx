import { useState } from 'react';
import AdventureSelector from '../components/adventure/AdventureSelector';
import GameList from '../components/games/GameList';
import type { GameFilters } from '../types/adventure.types';
import { GENRES } from '../utils/constants';

const HomePage = () => {
  const [adventureResults, setAdventureResults] = useState<GameFilters | null>(
    null
  );

  const handleAdventureComplete = (filters: GameFilters) => {
    setAdventureResults(filters);

    // Smoothly scroll to adventure results
    document.getElementById('adventure-results')?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-white">🎮 GamePaths</h1>
          <p className="text-gray-400 mt-2">Discover your next favorite game</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <section className="mb-12">
          <AdventureSelector onComplete={handleAdventureComplete} />
        </section>

        {adventureResults && (
          <section id="adventure-results" className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              Perfect Games for You
            </h2>
            <GameList filters={adventureResults} />
          </section>
        )}

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            🔥 Popular Games
          </h2>
          <GameList filters={{ ordering: '-metacritic', page_size: 8 }} />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            🎯 Action Games
          </h2>
          <GameList
            filters={{
              genres: GENRES.ACTION,
              ordering: '-metacritic',
              page_size: 6,
            }}
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            🐉 RPG Adventures
          </h2>
          <GameList
            filters={{
              genres: GENRES.RPG,
              ordering: '-metacritic',
              page_size: 6,
            }}
          />
        </section>
      </div>

      <footer className="bg-gray-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-center text-gray-400">
            GamePaths - Discover your next favorite game
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
