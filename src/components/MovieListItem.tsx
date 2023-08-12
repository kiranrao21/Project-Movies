import React from 'react';
import { Movie } from './types/movie';

interface MovieListItemProps {
  movie: Movie;
}

const MovieListItem: React.FC<MovieListItemProps> = ({ movie }) => {
    const baseUrl = "https://image.tmdb.org/t/p/";
    const posterSize = "w500"; // Choose the desired size
    const fullImageUrl = `${baseUrl}${posterSize}${movie.poster_path}`;

  return (
    <div className="movie-list-item">
      <img src={fullImageUrl} alt={movie.title} />
      <h3>{movie.title}</h3>
      {/* Other movie details */}
    </div>
  );
};

export default MovieListItem;
