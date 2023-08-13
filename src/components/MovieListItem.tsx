import React, { useEffect } from 'react';
import { Movie } from './types/movie';

interface LazyLoadedImageProps {
  src: string;
  alt: string;
}

const LazyLoadedImage: React.FC<LazyLoadedImageProps> = ({ src, alt }) => {
  const imgRef = React.useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.src = src;
    }
  }, [src]);

  return <img ref={imgRef} alt={alt} />;
};

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
      <LazyLoadedImage src={fullImageUrl} alt={movie.title} />
      <h3>{movie.title}</h3>
    </div>
  );
};

export default MovieListItem;
