import './App.css';
import Header from './components/Header';
import { useEffect, useReducer } from 'react';
import MovieContext, { reducer } from './contexts/MovieContext';
import Banner from './components/Banner';
import List from './components/List';
import configVariables from './env.json';
const { BASE_URL, IMAGE_URL, API_KEY } = configVariables;

function App() {
  const initialState = {
    allMovies: [],
    displayedMovies: [],
    selectedMovie: {},
    page: 1,
    moviesPerPage: 5,
    order: 'asc',
    searchFilter: '',
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const setMovies = async () => {
      for (let i = 1; i <= 20; i++) {
        await getMovieListFromAPI(i);
      }
    };
    setMovies();
  }, []);

  const getMovieListFromAPI = async (page) => {
    const response = await fetch(
      `${BASE_URL}/popular?page=${page}&api_key=${API_KEY}&language=en-US`
    );
    const data = await response.json();
    const list = data.results.map((x) => ({
      title: x.title,
      images: {
        poster: `${IMAGE_URL}/w300${x.poster_path}`,
        backdrop: `${IMAGE_URL}/original${
          x.backdrop_path != null ? x.backdrop_path : x.poster_path
        }`,
      },
      description: x.overview,
      rating: x.vote_average,
    }));
    dispatch({
      type: page === 1 ? 'setMovies' : 'addMovies',
      movies: list,
    });
  };

  return (
    <div className="App">
      <MovieContext.Provider value={{ state, dispatch }}>
        <Header></Header>
        <main>
          {state.allMovies.length > 0 ? (
            <>
              <Banner />
              <List />
            </>
          ) : (
            <div>Loading...</div>
          )}
        </main>
        <footer></footer>
      </MovieContext.Provider>
    </div>
  );
}

export default App;
