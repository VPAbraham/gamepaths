import { useParams } from 'react-router-dom';

const GameDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white">Game Detail Page</h1>
        <p className="text-gray-400 mt-2">Game ID: {id}</p>
        <p className="text-gray-400">Full game details coming soon...</p>
      </div>
    </div>
  );
};

export default GameDetailPage;
