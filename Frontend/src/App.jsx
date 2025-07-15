
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ShortenerPage from './pages/ShortenerPage';
import StatsPage from './pages/StatsPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ShortenerPage />} />
      <Route path="/stats/:code" element={<StatsPage />} />
    </Routes>
  );
};

export default App;
