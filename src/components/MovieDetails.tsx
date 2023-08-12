import React from 'react';
import { Movie } from './types/movie';

interface MovieDetailsProps {
  movie: Movie;
  onClose: () => void;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie, onClose }) => {
    const baseUrl = "https://image.tmdb.org/t/p/";
    const posterSize = "w300"; // Choose the desired size
    const fullImageUrl = `${baseUrl}${posterSize}${movie.poster_path}`;

  return (
    <div className="movie-details">
      <img src={fullImageUrl} alt={movie.title} loading="lazy" />
      <h2>{movie.title}</h2>
      {/* Other movie details */}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default MovieDetails;
