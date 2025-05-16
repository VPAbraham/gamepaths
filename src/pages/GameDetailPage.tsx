import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getGameDetail } from '../services/rawgApi';
import type { Game } from '../types/game.types';

const GameDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadGameDetail(id);
    }
  }, [id]);

  const loadGameDetail = async (gameId: string) => {
    try {
      setLoading(true);
      setError(null);
      const gameData = (await getGameDetail(gameId)) as Game;
      setGame(gameData);
    } catch (err) {
      setError('Failed to load game details');
      console.error('Error loading game detail:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading game details...</div>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="min-h-screen bg-gray-900">
        <header className="bg-gray-800 shadow-lg">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex items-center gap-4">
              <button
                onClick={handleGoBack}
                className="text-blue-400 hover:text-blue-300 text-sm"
              >
                ← Back
              </button>
              <Link
                to="/"
                className="text-blue-400 hover:text-blue-300 text-sm"
              >
                Home
              </Link>
            </div>
          </div>
        </header>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="text-red-400 text-xl">
              {error || 'Game not found'}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-800 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={handleGoBack}
              className="text-blue-400 hover:text-blue-300 text-sm"
            >
              ← Back
            </button>
            <Link to="/" className="text-blue-400 hover:text-blue-300 text-sm">
              Home
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-white mt-4">{game.name}</h1>
          <p className="text-gray-400 mt-2">
            {game.genres.map((genre) => genre.name).join(', ')}
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="relative mb-8 rounded-lg overflow-hidden">
          <img
            src={game.background_image}
            alt={game.name}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white">{game.name}</h2>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-yellow-400 font-semibold">
                  ⭐ {game.rating}/5
                </span>
                {game.metacritic && (
                  <span className="text-green-400 font-semibold">
                    {game.metacritic}/100 Metacritic
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Game Information
            </h3>
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="space-y-3">
                <div>
                  <span className="text-gray-400">Release Date:</span>
                  <span className="text-white ml-2">
                    {game.released
                      ? new Date(game.released).toLocaleDateString()
                      : 'TBA'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Platforms:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {game.platforms.map((platform) => (
                      <span
                        key={platform.platform.id}
                        className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-sm"
                      >
                        {platform.platform.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-gray-400">Genres:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {game.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="bg-blue-900 text-blue-300 px-2 py-1 rounded text-sm"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Screenshots
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {game.short_screenshots && game.short_screenshots.length > 0 ? (
                game.short_screenshots
                  .slice(0, 4)
                  .map((screenshot) => (
                    <img
                      key={screenshot.id}
                      src={screenshot.image}
                      alt="Game screenshot"
                      className="rounded-lg object-cover h-24 w-full"
                    />
                  ))
              ) : (
                <div className="col-span-2 text-gray-400 text-center py-8">
                  No screenshots available
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetailPage;
