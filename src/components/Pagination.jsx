import React, { useContext } from 'react';
import MovieContext from '../contexts/MovieContext';

const Pagination = () => {
  const { state, dispatch } = useContext(MovieContext);
  const { page, displayedMovies, moviesPerPage } = state;
  let lastPage = parseInt(displayedMovies.length / moviesPerPage);
  if (displayedMovies.length % moviesPerPage !== 0) lastPage++;
  const changePage = (toPage) => {
    dispatch({
      type: 'setPage',
      page: toPage,
    });
  };
  return (
    <>
      <div className="pages">
        <button hidden={page === 1} onClick={() => changePage(1)}>
          1
        </button>
        <button hidden={page === 1} onClick={() => changePage(page - 1)}>
          {'<'}
        </button>
        <button disabled>{page}</button>
        <button hidden={page === lastPage} onClick={() => changePage(page + 1)}>
          {'>'}
        </button>
        <button hidden={page === lastPage} onClick={() => changePage(lastPage)}>
          {lastPage}
        </button>
      </div>
      <div>
        <select
          onChange={(e) =>
            dispatch({
              type: 'setMoviesPerPage',
              moviesPerPage: parseInt(e.target.value),
            })
          }
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="40">40</option>
        </select>
      </div>
    </>
  );
};

export default Pagination;
