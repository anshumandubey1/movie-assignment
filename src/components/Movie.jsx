import React, { useContext } from 'react';
import MovieContext from '../contexts/MovieContext';
import '../styles/Movie.sass';

const Movie = ({ movie }) => {
  const { state, dispatch } = useContext(MovieContext);
  const isSelected = state.selectedMovie.title === movie.title;
  return (
    <div
      onClick={() => {
        dispatch({
          type: 'setBanner',
          movie,
        });
        window.scroll(0, 0);
      }}
      className={(isSelected ? 'selected ' : '') + 'Movie'}
    >
      <img src={movie.images.poster} alt="" />
      <h2>{movie.title}</h2>
    </div>
  );
};

export default Movie;
