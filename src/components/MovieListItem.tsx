import React from 'react';
import { Movie } from './types/movie';

interface MovieListItemProps {
  movie: Movie;
  onClick: () => void;
}

const MovieListItem: React.FC<MovieListItemProps> = ({ movie, onClick }) => {
    const baseUrl = "https://image.tmdb.org/t/p/";
    const posterSize = "w500";
    const fullImageUrl = `${baseUrl}${posterSize}${movie.poster_path}`;

  return (
    <div className="movie-list-item" onClick={onClick}>
      <img src={fullImageUrl} alt={movie.title} loading="lazy" />
      <h3>{movie.title}</h3>
    </div>
  );
};

export default MovieListItem;
