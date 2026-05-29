import Dexie from 'dexie';

export const db = new Dexie('CineEduDatabase');

db.version(1).stores({
  movies: 'id, title, type, year, genres' // id is imdb_id or imdb_id_episode
});

export const initDb = async (moviesData) => {
  await db.movies.clear();
  await db.movies.bulkAdd(moviesData);
  console.log("Database initialized with movies.");
};
