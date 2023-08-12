import React, { useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import TabBar from './components/TabBar';
import { Movie } from './components/types/movie';
import './styles/main.scss';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [activeTab, setActiveTab] = useState<'nowPlaying' | 'topRated'>('nowPlaying'); // Initial tab

  useEffect(() => {
    async function fetchMovies() {
      try {
        let apiUrl = '';

        if (activeTab === 'nowPlaying') {
          apiUrl = 'https://api.themoviedb.org/3/movie/now_playing';
        } else if (activeTab === 'topRated') {
          apiUrl = 'https://api.themoviedb.org/3/movie/top_rated';
        }

        const response = await fetch(
          `${apiUrl}?api_key=${process.env.REACT_APP_KEY}`
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    }

    fetchMovies();
  }, [activeTab]);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseDetails = () => {
    setSelectedMovie(null);
  };

  const handleTabChange = (tab: 'nowPlaying' | 'topRated') => {
    setActiveTab(tab);
  };

  return (
    <div className="section pt-1">
      <div className="wrap-2 centralized">
        <div className="flex-box gap-1">
          <div className="App">
            <h1>Now Playing Movies</h1>
            {!selectedMovie && (
              <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
            )}
            {selectedMovie ? (
              <MovieDetails movie={selectedMovie} onClose={handleCloseDetails} />
            ) : (
              <MovieList movies={movies} onMovieClick={handleMovieClick} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
