import React from 'react';
import { Movie } from './types/movie';

interface MovieDetailsProps {
  movie: Movie;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie }) => {
  return (
    <div className="movie-details">
      <img src={movie.posterUrl} alt={movie.title} />
      <h2>{movie.title}</h2>
      {/* Other movie details */}
    </div>
  );
};

export default MovieDetails;
