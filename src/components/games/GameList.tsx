import { useState, useEffect } from 'react';
import { getGames } from '../../services/rawgApi';
import GameCard from './GameCard';
import type { Game } from '../../types/game.types';

const GameList = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadGames();
  }, []);

  const loadGames = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getGames();
      setGames(response.results);
    } catch (err) {
      setError('Failed to load games');
      console.log(`Error: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading games...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
};

export default GameList;
