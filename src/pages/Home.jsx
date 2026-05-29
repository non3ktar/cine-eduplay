import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PlayCircle, Film, Info } from 'lucide-react';

export default function Home() {
  const movies = useLiveQuery(() => db.movies.toArray());

  if (!movies) return null;

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto">
      <header className="mb-12 text-center md:text-left mt-8">
        <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 drop-shadow-lg mb-4">
          CineEdu Pro
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl">
          Uma curadoria de filmes com valores éticos, aprendizado e reflexão. Totalmente offline-first.
        </p>
      </header>

      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
      >
        {movies.map((movie, idx) => (
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Link to={`/player/${movie.id}`} className="block group relative rounded-2xl overflow-hidden glass-panel hover:ring-2 hover:ring-indigo-500 transition-all duration-300">
              <div className="aspect-[2/3] w-full bg-slate-800 relative">
                {movie.poster ? (
                  <img 
                    src={movie.poster} 
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 p-4 text-center">
                    <Film size={48} className="mb-2 opacity-50" />
                    <span className="text-xs uppercase tracking-widest">{movie.type}</span>
                  </div>
                )}
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <PlayCircle size={48} className="text-white mx-auto mb-4 drop-shadow-lg scale-75 group-hover:scale-100 transition-transform duration-300" />
                  <p className="text-xs text-indigo-300 font-semibold mb-1 line-clamp-1">
                    {movie.genres?.slice(0, 2).join(' • ')}
                  </p>
                  <p className="text-sm text-slate-300 line-clamp-2 leading-tight">
                    {movie.description || movie.original_title}
                  </p>
                </div>
              </div>
              <div className="p-3 bg-slate-800/80 backdrop-blur-md border-t border-white/5">
                <h3 className="font-semibold text-slate-100 truncate">{movie.title}</h3>
                <div className="flex items-center text-xs text-slate-400 mt-1">
                  <span>{movie.year || 'N/A'}</span>
                  <span className="mx-2">•</span>
                  <span className="capitalize">{movie.type} {movie.episode ? `E${movie.episode}` : ''}</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
