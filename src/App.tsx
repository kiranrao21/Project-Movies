// import React, { useState, useEffect } from 'react';
// import './styles/main.scss';
// import MovieList from './components/MovieList';
// import MovieDetails from './components/MovieDetails';
// import TabBar from './components/TabBar';
// import SearchBar from './components/SearchBar';

import React, { useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import { Movie } from './components/types/movie';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/movie/now_playing?api_key=29bc4fd485d9c906c159d74a55c31673'
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    }

    fetchMovies();
  }, []);

  return (
    <div className="App">
      <h1>Now Playing Movies</h1>
      <MovieList movies={movies} />
    </div>
  );
}

export default App;

