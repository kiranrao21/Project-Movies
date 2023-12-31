import React, { useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import TabBar from './components/TabBar';
import SearchBar from './components/SearchBar';
import { Movie } from './components/types/movie';
import './styles/main.scss';
import Loading from './components/Loading';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [activeTab, setActiveTab] = useState<'nowPlaying' | 'topRated'>('nowPlaying'); 
  const [searchResults, setSearchResults] = useState<Movie[]>([]); // State for search results
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [isSearchBarVisible, setSearchBarVisible] = useState(true);

  useEffect(() => {
    function handleOnlineStatusChange() {
      setIsOnline(navigator.onLine);
    }

    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);
    
    setIsLoading(true)
    async function fetchMovies() {
      try {

        setIsOnline(navigator.onLine);

        if (!navigator.onLine) {
          setIsLoading(false);
          return;
        }
        
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
      }finally{
        setIsLoading(false)
      }
    }

    setSearchResults([])
    fetchMovies();
  }, [activeTab]);

  const handleMovieClick = (movie: Movie) => {
    setSearchBarVisible(false);
    setSelectedMovie(movie);
  };

  const handleCloseDetails = () => {
    setSearchBarVisible(true);
    setSelectedMovie(null);
  };

  const handleTabChange = (tab: 'nowPlaying' | 'topRated') => {
    setActiveTab(tab);
  };

  const handleSearch = (query: string) => {
    // Filter movies based on the search query
    const filteredMovies = movies.filter(movie =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredMovies);
  };

  return (
    <div className="section pt-1">
    {isOnline ? (
      <div className={isLoading ? 'overlay' : 'overlay hidden'}>
        <Loading isLoading={isLoading} />
      </div>
    ) : (
      <div className='overlay'>
        <div className="error">You are not connected to the internet</div>
      </div>
    )}

      <div className="wrap-2 centralized">
        <div className="flex-box gap-1">
          <div className="App">
            <h1>Welcome to Project Movies</h1>
            {!selectedMovie && (
              <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
            )}
            {!selectedMovie && isSearchBarVisible && (
            <SearchBar onSearch={handleSearch} />
            )}
            {selectedMovie ? (
              <MovieDetails movie={selectedMovie} onClose={handleCloseDetails} />
            ) : (
              <MovieList
                movies={searchResults.length > 0 ? searchResults : movies} // Show search results if available, otherwise show all movies
                onMovieClick={handleMovieClick}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
