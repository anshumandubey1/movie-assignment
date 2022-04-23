import React, { useContext } from 'react';
import MovieContext from '../contexts/MovieContext';
import Movie from './Movie';
import Pagination from './Pagination';

const List = () => {
  const { state } = useContext(MovieContext);
  const { page, moviesPerPage, displayedMovies } = state;
  const showMovies = displayedMovies.slice(
    (page - 1) * moviesPerPage,
    page * moviesPerPage
  );
  return (
    <>
      <Pagination />
      <div>
        {showMovies.map((movie, i) => (
          <Movie movie={movie} key={i} />
        ))}
      </div>
    </>
  );
};

export default List;
