import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getGameDetail } from '../services/rawgApi';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import type { Game } from '../types/game.types';

const GameDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

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

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg">
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
          <h1 className="text-3xl font-bold text-white mt-4">
            {loading ? 'Game Details' : game?.name || 'Game Not Found'}
          </h1>
          {!loading && game && (
            <p className="text-gray-400 mt-2">
              {game.genres.map((genre) => genre.name).join(', ')}
            </p>
          )}
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {loading ? (
          <LoadingSpinner />
        ) : error || !game ? (
          <div className="text-center">
            <div className="text-red-400 text-xl">
              {error || 'Game not found'}
            </div>
          </div>
        ) : (
          <>
            <div className="relative mb-8 rounded-lg overflow-hidden bg-gray-800">
              {!imageError && game.background_image ? (
                <img
                  src={game.background_image}
                  alt={game.name}
                  className="w-full object-cover"
                  style={{
                    height: 'auto',
                    maxHeight: '500px',
                    minHeight: '300px',
                  }}
                  onError={handleImageError}
                />
              ) : (
                <div className="flex items-center justify-center h-80 bg-gray-700">
                  <div className="text-center">
                    <div className="text-5xl mb-3">🎮</div>
                    <div className="text-gray-400 text-lg px-4">
                      {game.name}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Game Information
              </h3>
              <div className="bg-gray-800 rounded-lg p-4 md:p-6">
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

                  <div className="mt-4">
                    <span className="text-gray-400">Rating:</span>
                    <div className="flex items-center gap-3 mt-1">
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
            </div>

            {game.description_raw && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-white mb-4">About</h3>
                <div className="bg-gray-800 rounded-lg p-4 md:p-6">
                  <p className="text-gray-300 leading-relaxed max-h-80 overflow-y-auto">
                    {game.description_raw}
                  </p>
                </div>
              </div>
            )}

            {game.screenshots && game.screenshots.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Screenshots
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {game.screenshots.slice(0, 6).map((screenshot) => (
                    <img
                      key={screenshot.id}
                      src={screenshot.image}
                      alt={`Screenshot of ${game.name}`}
                      className="rounded-lg w-full h-40 object-cover"
                      onError={(e) => {
                        e.currentTarget.src =
                          'https://via.placeholder.com/400x200/374151/ffffff?text=No+Image';
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default GameDetailPage;
