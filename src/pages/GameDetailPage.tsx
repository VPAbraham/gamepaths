import { useParams, Link, useNavigate } from 'react-router-dom';

const GameDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

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
          <h1 className="text-3xl font-bold text-white mt-4">Game Details</h1>
          <p className="text-gray-400 mt-2">Game ID: {id}</p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Loading game information...
          </h2>
          <p className="text-gray-400">Full game details coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default GameDetailPage;
