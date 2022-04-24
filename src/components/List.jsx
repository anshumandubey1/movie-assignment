import React, { useContext } from 'react';
import MovieContext from '../contexts/MovieContext';
import Movie from './Movie';
import Pagination from './Pagination';
import '../styles/List.sass';

const List = () => {
  const { state } = useContext(MovieContext);
  const { page, moviesPerPage, displayedMovies } = state;
  const showMovies = displayedMovies.slice(
    (page - 1) * moviesPerPage,
    page * moviesPerPage
  );
  return (
    <div className="List">
      <div className="movies">
        {showMovies.map((movie, i) => (
          <Movie movie={movie} key={movie.title + '-' + i} />
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default List;
