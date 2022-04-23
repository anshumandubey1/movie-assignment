import React, { useContext } from 'react';
import MovieContext from '../contexts/MovieContext';

const Banner = () => {
  const { state } = useContext(MovieContext);
  const movie = state.selectedMovie;
  if (movie.title === undefined) {
    return <div>No Movie Found</div>;
  }
  return (
    <div>
      <img src={movie.images.backdrop} alt="" height="400px" />
      <h2>{movie.title}</h2>
      <h4>{movie.rating}</h4>
      <p>{movie.description}</p>
    </div>
  );
};

export default Banner;
