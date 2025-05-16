import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GameDetailPage from './pages/GameDetailPage';
import AdventureResultsPage from './pages/AdventureResultsPage';

import './App.scss';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game/:id" element={<GameDetailPage />} />
          <Route path="/adventure-results" element={<AdventureResultsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
