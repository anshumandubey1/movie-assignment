import './styles/App.sass';
import Header from './components/Header';
import { useEffect, useReducer } from 'react';
import MovieContext, { reducer } from './contexts/MovieContext';
import Banner from './components/Banner';
import List from './components/List';
import configVariables from './env.json';
import Loading from './components/Loading';
import ErrorBox from './components/ErrorBox';
const { BASE_URL, IMAGE_URL, API_KEY } = configVariables;

function App() {
  const initialState = {
    allMovies: [],
    displayedMovies: [],
    selectedMovie: {},
    page: 1,
    moviesPerPage: 20,
    order: 'asc',
    searchFilter: '',
    error: null,
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
      `${BASE_URL}/popular?page=${page}&api_key=${API_KEY}&language=en`
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

  if (state.allMovies.length === 0) {
    return <Loading />;
  }

  return (
    <div className="App">
      <MovieContext.Provider value={{ state, dispatch }}>
        <img
          className="background"
          src={state.selectedMovie.images.backdrop}
          alt=""
        />
        <Header className="Header" />
        <main>
          <Banner />
          <List />
        </main>
        <footer></footer>
      </MovieContext.Provider>
      {state.error !== null ? <ErrorBox error={state.error} /> : <></>}
    </div>
  );
}

export default App;
