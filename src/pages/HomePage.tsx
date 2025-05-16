import AdventureSelector from '../components/adventure/AdventureSelector';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header goes here */}
      <header className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-white">🎮 GamePaths</h1>
          <p className="text-gray-400 mt-2">Discover your next favorite game</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Adventure Selector Section goes here */}
        <section className="mb-12">
          <AdventureSelector />
        </section>
      </div>
    </div>
  );
};

export default HomePage;
