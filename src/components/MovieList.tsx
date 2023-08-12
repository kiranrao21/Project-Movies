import React from 'react';
import MovieListItem from './MovieListItem';
import { Movie } from './types/movie';


interface MovieListProps {
    movies: Movie[];
    onMovieClick: (movie: Movie) => void;
  }

  const MovieList: React.FC<MovieListProps> = ({ movies, onMovieClick }) => {
    return (
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieListItem key={movie.id} movie={movie} onClick={() => onMovieClick(movie)} />
        ))}
      </div>
    );
  };

export default MovieList;
