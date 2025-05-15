import type { Game } from '../../types/game.types';

interface GameCardProps {
  game: Game;
}

const GameCard = ({ game }: GameCardProps) => {
  return (
    <div>
      <h3>{game.name}</h3>
    </div>
  );
};

export default GameCard;
