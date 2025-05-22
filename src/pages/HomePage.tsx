import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdventureSelector from '../components/adventure/AdventureSelector';
import GameList from '../components/games/GameList';
import { GENRES } from '../utils/constants';
import type { GameFilters } from '../types/adventure.types';
import type { Game } from '../types/game.types';
import { getRandomPage } from '../services/rawgApi';

const HomePage = () => {
  const navigate = useNavigate();

  const [pageSeeds] = useState({
    popular: getRandomPage(3),
    action: getRandomPage(3),
    rpg: getRandomPage(3),
    indie: getRandomPage(3),
  });

  const [adventureResults, setAdventureResults] = useState<GameFilters | null>(
    null
  );

  // useEffect(() => {
  //   setPageSeeds({
  //     popular: getRandomPage(3),
  //     action: getRandomPage(3),
  //     rpg: getRandomPage(3),
  //     indie: getRandomPage(3),
  //   });
  // }, []);

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
      <header className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                🎮 GamePaths
              </h1>
              <p className="text-blue-300 mt-2">
                Discover your next favorite game
              </p>
            </div>
            <nav className="mt-4 md:mt-0 flex items-center gap-6">
              <Link
                to="/"
                className="text-blue-300 hover:text-blue-200 font-medium text-lg 
            hover:underline transition-colors"
              >
                Home
              </Link>
              <Link
                to="#popular"
                className="text-gray-300 hover:text-white text-lg font-medium
            hover:underline transition-colors"
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

        <div className="section-divider"></div>

        <section id="popular" className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            🔥 Popular Games
          </h2>
          <GameList
            filters={{
              ordering: '-metacritic',
              page_size: 12,
              page: pageSeeds.popular,
            }}
            onGameClick={handleGameClick}
          />
        </section>

        <div className="section-divider"></div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            🗡️ Action Games
          </h2>
          <GameList
            filters={{
              genres: GENRES.ACTION,
              ordering: '-metacritic',
              page_size: 12,
              page: pageSeeds.action,
            }}
            onGameClick={handleGameClick}
          />
        </section>

        <div className="section-divider"></div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            🐉 RPG Adventures
          </h2>
          <GameList
            filters={{
              genres: GENRES.RPG,
              ordering: '-metacritic',
              page_size: 12,
              page: pageSeeds.rpg,
            }}
            onGameClick={handleGameClick}
          />
        </section>

        <div className="section-divider"></div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">👾 Indie Games</h2>
          <GameList
            filters={{
              genres: GENRES.INDIE,
              ordering: '-metacritic',
              page_size: 12,
              page: pageSeeds.indie,
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
