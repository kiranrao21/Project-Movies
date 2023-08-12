import React, { useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import { Movie } from './components/types/movie';
import './styles/main.scss';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_KEY}`
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
    <div className="section pt-1 ">
      <div className="wrap-2 centralized">
          <div className="flex-box gap-1">
            <div className="App">
              <h1>Now Playing Movies</h1>
              <MovieList movies={movies} />
            </div>
          </div>
        </div>
    </div>
  );
}

export default App;

