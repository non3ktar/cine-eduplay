import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { initDb } from './db';
import moviesData from './movies.json';
import Home from './pages/Home';
import Player from './pages/Player';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initDb(moviesData).then(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen text-slate-200">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/player/:id" element={<Player />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
