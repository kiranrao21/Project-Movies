import React from 'react';
import MovieListItem from './MovieListItem';
import { Movie } from './types/movie';


interface MovieListProps {
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieListItem key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
