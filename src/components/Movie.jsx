import React, { useContext } from 'react';
import MovieContext from '../contexts/MovieContext';

const Movie = ({ movie }) => {
  const { dispatch } = useContext(MovieContext);
  return (
    <div
      onClick={() =>
        dispatch({
          type: 'setBanner',
          movie,
        })
      }
    >
      <img src={movie.images.poster} alt="" height="400px" />
      <h2>{movie.title}</h2>
    </div>
  );
};

export default Movie;
