import { useState } from 'react';
import type { Game } from '../../types/game.types';

interface GameCardProps {
  game: Game;
  onClick?: () => void;
}

const GameCard = ({ game, onClick }: GameCardProps) => {
  const [imageError, setImageError] = useState(false);
  const releaseYear = game.released
    ? new Date(game.released).getFullYear()
    : 'TBA';

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer 
    hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <div className="relative h-48 bg-gray-700">
        {!imageError && game.background_image ? (
          <img
            src={game.background_image}
            alt={game.name}
            className="w-full h-48 object-cover"
            onError={handleImageError}
          />
        ) : (
          <div className="flex items-center justify-center h-48 bg-gray-700">
            <div className="text-center">
              <div className="text-4xl mb-2">🎮</div>
              <div className="text-gray-400 text-sm px-4">{game.name}</div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-2">{game.name}</h3>

        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-400">{releaseYear}</span>

          {game.metacritic && (
            <span className="text-sm font-medium text-yellow-400">
              {game.metacritic}/100
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-1">
          {game.genres.slice(0, 2).map((genre) => (
            <span
              key={genre.id}
              className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded"
            >
              {genre.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameCard;
