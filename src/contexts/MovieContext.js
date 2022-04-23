import React from 'react';

const MovieContext = React.createContext({});

const searchMovies = (movieList, key) => {
  const re = new RegExp('^' + key, 'i');
  return movieList.filter((x) => x.title.search(re) !== -1);
};

const sortMovies = (movieList, order) => {
  order = order === 'asc' ? 1 : -1;
  return [...movieList].sort(
    (a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()) * order
  );
};

export const reducer = (state, action) => {
  console.log(action.type, { state, action });
  switch (action.type) {
    case 'setMovies':
      return {
        ...state,
        allMovies: action.movies,
        displayedMovies: action.movies,
        selectedMovie: action.movies[0],
      };
    case 'addMovies':
      const allMoviesFetched = [...state.allMovies, ...action.movies];
      return {
        ...state,
        allMovies: allMoviesFetched,
        displayedMovies: allMoviesFetched,
      };
    case 'setBanner':
      return {
        ...state,
        selectedMovie: action.movie,
      };
    case 'searchMovies':
      const displayedMovies = searchMovies(
        state.allMovies,
        action.searchFilter
      );
      return {
        ...state,
        displayedMovies,
        selectedMovie: displayedMovies[0] || {},
        page: 1,
        searchFilter: action.searchFilter,
      };
    case 'setOrder':
      const sortedMovies = sortMovies(state.displayedMovies, action.order);
      return {
        ...state,
        displayedMovies: sortedMovies,
        selectedMovie: sortedMovies[0],
        page: 1,
        order: action.order,
      };
    case 'setPage':
      return {
        ...state,
        selectedMovie:
          state.displayedMovies[(action.page - 1) * state.moviesPerPage],
        page: action.page,
      };
    case 'setMoviesPerPage':
      return {
        ...state,
        selectedMovie:
          state.displayedMovies[(state.page - 1) * action.moviesPerPage],
        moviesPerPage: action.moviesPerPage,
      };
    case 'addMovie':
      const allMovies = sortMovies(
        [...state.allMovies, action.movie],
        state.order
      );
      const movieIndex = allMovies.findIndex(
        (x) => x.title === action.movie.title
      );
      const page = parseInt(movieIndex / state.moviesPerPage) + 1;
      return {
        ...state,
        allMovies,
        displayedMovies: allMovies,
        selectedMovie: action.movie,
        page,
        searchFilter: '',
      };
    default:
      return state;
  }
};

export default MovieContext;
