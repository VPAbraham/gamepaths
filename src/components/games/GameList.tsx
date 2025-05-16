import { useState, useEffect } from 'react';
import { getGames } from '../../services/rawgApi';
import GameCard from './GameCard';
import type { Game } from '../../types/game.types';
import type { GameFilters } from '../../types/adventure.types';

interface GameListProps {
  filters?: GameFilters;
  onGameClick?: (game: Game) => void;
}

const GameList = ({ filters = {}, onGameClick }: GameListProps) => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadGames();
  }, [filters]);

  const loadGames = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getGames(filters);
      setGames(response.results);
    } catch (err) {
      setError('Failed to load games');
      console.log(`Error: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="text-white text-lg">Loading games...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="text-red-400 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {games.map((game) => (
        <GameCard
          key={game.id}
          game={game}
          onClick={() => onGameClick?.(game)}
        />
      ))}
    </div>
  );
};

export default GameList;
