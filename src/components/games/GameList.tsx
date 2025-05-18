import { useState, useEffect } from 'react';
import { getGames } from '../../services/rawgApi';
import GameCard from './GameCard';
import type { Game } from '../../types/game.types';
import type { GameFilters } from '../../types/adventure.types';
import LoadingSpinner from '../ui/LoadingSpinner';

interface GameListProps {
  filters?: GameFilters;
  onGameClick?: (game: Game) => void;
}

const GameList = ({ filters = {}, onGameClick }: GameListProps) => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    loadGames();
  }, [JSON.stringify(filters)]);

  if (loading) {
    return <LoadingSpinner />;
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
