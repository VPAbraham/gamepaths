import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdventureSelector from '../components/adventure/AdventureSelector';
import GameList from '../components/games/GameList';
import { GENRES } from '../utils/constants';
import type { GameFilters } from '../types/adventure.types';
import type { Game } from '../types/game.types';

const HomePage = () => {
  const navigate = useNavigate();
  const [adventureResults, setAdventureResults] = useState<GameFilters | null>(
    null
  );

  const handleAdventureComplete = (filters: GameFilters) => {
    setAdventureResults(filters);
    document.getElementById('adventure-results')?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  const handleGameClick = (game: Game) => {
    navigate(`/game/${game.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                🎮 GamePaths
              </h1>
              <p className="text-gray-400 mt-2">
                Discover your next favorite game
              </p>
            </div>
            <nav className="mt-4 md:mt-0 flex items-center gap-6">
              <Link
                to="/"
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                Home
              </Link>
              <Link
                to="#popular"
                className="text-gray-300 hover:text-white"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById('popular')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Popular
              </Link>
            </nav>
          </div>
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
            <GameList
              filters={adventureResults}
              onGameClick={handleGameClick}
            />
          </section>
        )}

        <section id="popular" className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            🔥 Popular Games
          </h2>
          <GameList
            filters={{ ordering: '-metacritic', page_size: 8 }}
            onGameClick={handleGameClick}
          />
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
            onGameClick={handleGameClick}
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
            onGameClick={handleGameClick}
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
