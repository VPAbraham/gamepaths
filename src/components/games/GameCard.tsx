import type { Game } from '../../types/game.types';

interface GameCardProps {
  game: Game;
  onClick?: () => void;
}

const GameCard = ({ game, onClick }: GameCardProps) => {
  const releaseYear = game.released
    ? new Date(game.released).getFullYear()
    : 'TBA';

  return (
    <div
      className="bg-gray-800 rounded-lg overflow-hidden"
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <img
        src={game.background_image}
        alt={game.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h3 className="text-lg font-semibold text-white">{game.name}</h3>

        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-gray-400">{releaseYear}</span>

          {game.metacritic && (
            <span className="text-sm text-yellow-400">
              {game.metacritic}/100
            </span>
          )}
        </div>

        {game.genres.length > 0 && (
          <div className="mt-2">
            <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
              {game.genres[0].name}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameCard;
