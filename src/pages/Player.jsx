import { useParams, Link } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { motion } from 'framer-motion';
import { ArrowLeft, Clapperboard, Calendar, Users } from 'lucide-react';

export default function Player() {
  const { id } = useParams();
  const movie = useLiveQuery(() => db.movies.get(id), [id]);

  if (!movie) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-slate-700 h-10 w-10"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-700 rounded w-24"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                <div className="h-2 bg-slate-700 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-slate-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen pb-12 relative"
    >
      {/* Background Banner */}
      <div className="absolute top-0 left-0 w-full h-96 z-0 overflow-hidden opacity-30 pointer-events-none">
        {movie.background || movie.poster ? (
          <img 
            src={movie.background || movie.poster} 
            alt="background" 
            className="w-full h-full object-cover filter blur-md transform scale-105" 
          />
        ) : (
          <div className="w-full h-full bg-indigo-900/20" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/60 to-slate-900" />
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-6 relative z-10">
        <Link to="/" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors mb-6 group">
          <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" /> 
          Voltar para o Catálogo
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content (Player & Info) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 ring-4 ring-indigo-500/10">
              {movie.stream_url ? (
                <iframe 
                  src={movie.stream_url} 
                  frameBorder="0" 
                  allowFullScreen
                  className="w-full h-full"
                  title={movie.title}
                  sandbox="allow-scripts allow-same-origin allow-presentation"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-500">
                  Link de stream indisponível
                </div>
              )}
            </div>

            <div className="glass-panel p-6 rounded-2xl">
              <h1 className="text-3xl font-bold text-white mb-2">{movie.title}</h1>
              {movie.original_title && movie.original_title !== movie.title && (
                <p className="text-slate-400 italic mb-4">{movie.original_title}</p>
              )}
              
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres?.map(genre => (
                  <span key={genre} className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-medium border border-indigo-500/20">
                    {genre}
                  </span>
                ))}
                <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs font-medium border border-slate-700">
                  <Calendar size={12} className="inline mr-1" /> {movie.year || 'N/A'}
                </span>
                <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs font-medium border border-slate-700 capitalize">
                  <Clapperboard size={12} className="inline mr-1" /> {movie.type}
                </span>
              </div>

              <div className="prose prose-invert max-w-none">
                <h3 className="text-lg font-semibold text-slate-200 border-b border-slate-800 pb-2 mb-3">Sinopse</h3>
                <p className="text-slate-300 leading-relaxed">
                  {movie.description || 'Nenhuma sinopse disponível para este título.'}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="glass-panel rounded-2xl overflow-hidden hidden lg:block">
              {movie.poster ? (
                <img src={movie.poster} alt={movie.title} className="w-full h-auto" />
              ) : (
                <div className="aspect-[2/3] bg-slate-800 flex items-center justify-center">
                  <Clapperboard size={48} className="text-slate-600" />
                </div>
              )}
            </div>

            {(movie.director?.length > 0 || movie.cast?.length > 0) && (
              <div className="glass-panel p-6 rounded-2xl">
                {movie.director?.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Direção</h3>
                    <p className="text-slate-200">{movie.director.join(', ')}</p>
                  </div>
                )}
                
                {movie.cast?.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center">
                      <Users size={16} className="mr-2" /> Elenco Principal
                    </h3>
                    <ul className="space-y-2">
                      {movie.cast.slice(0, 6).map(actor => (
                        <li key={actor} className="text-slate-200 flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-2" />
                          {actor}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
