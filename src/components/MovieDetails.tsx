import React, { useState, useEffect } from 'react';
import { Movie } from './types/movie';
import { LanguageData } from './types/language';

interface MovieDetailsProps {
  movie: Movie;
  onClose: () => void;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie, onClose }) => {
  const baseUrl = "https://image.tmdb.org/t/p/";
  const posterSize = "w300"; 
  const fullImageUrl = `${baseUrl}${posterSize}${movie.poster_path}`;

  const releaseDate = new Date(movie.release_date);
  const formattedReleaseDate = releaseDate.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
  });

  const LazyLoadedImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
    const imgRef = React.useRef<HTMLImageElement | null>(null);
  
    useEffect(() => {
      if (imgRef.current) {
        imgRef.current.src = src;
      }
    }, [src]);
  
    return <img ref={imgRef} alt={alt} />;
  };

  const [languageData, setLanguageData] = useState<LanguageData[]>([]);

  useEffect(() => {
    async function fetchLanguageData() {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/configuration/languages?api_key=${process.env.REACT_APP_KEY}`);
        const data = await response.json();
        setLanguageData(data);
      } catch (error) {
        console.error('Error fetching languages:', error);
      }
    }

    fetchLanguageData();
  }, []);

  const originalLanguage = languageData.find(lang => lang.iso_639_1 === movie.original_language);

  return (
    <div className="movie-details">
      <button className="close-button" onClick={onClose}>X</button>
      <LazyLoadedImage src={fullImageUrl} alt={movie.title} />
      <h2>{movie.title}</h2>
      <div className='description'>
        <span className='description-title'>Overview: </span>
        <span>{movie.overview}</span>
      </div>
      <div className='description'>
        <span className='description-title'>Date Released: </span>
        <span>{formattedReleaseDate}</span>
      </div>
      <div className='description'>
        <span className='description-title'>Language: </span>
        <span>{originalLanguage ? originalLanguage.english_name : 'Unknown'}</span>
      </div>
    </div>
  );
};

export default MovieDetails;
