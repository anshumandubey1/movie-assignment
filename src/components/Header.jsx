import React, { useContext, useEffect, useState } from 'react';
import MovieContext from '../contexts/MovieContext';
import AddMovie from './AddMovie';
import '../styles/Header.sass';
import { RiMovie2Line, RiAddCircleLine } from 'react-icons/ri';
import { BiSortAZ, BiSortZA } from 'react-icons/bi';

const Header = () => {
  const { state, dispatch } = useContext(MovieContext);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [onBanner, setOnBanner] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () =>
        setOnBanner(window.pageYOffset < 200)
      );
    }
  }, []);

  return (
    <div className={`Header ${onBanner ? 'onBanner' : ''}`}>
      <div className="logo">
        <RiMovie2Line />
        <div className="text">Movies</div>
      </div>
      <div className="inputs">
        <input
          id="search"
          placeholder="Search"
          type="text"
          value={state.searchFilter}
          onChange={(x) =>
            dispatch({
              type: 'searchMovies',
              searchFilter: x.target.value,
            })
          }
        />
        <button
          onClick={() =>
            dispatch({
              type: 'setOrder',
              order: 'asc',
            })
          }
        >
          <BiSortAZ />
        </button>
        <button
          onClick={() =>
            dispatch({
              type: 'setOrder',
              order: 'desc',
            })
          }
        >
          <BiSortZA />
        </button>
        {showAddDialog ? (
          <AddMovie exit={() => setShowAddDialog(false)} />
        ) : (
          <button onClick={() => setShowAddDialog(true)}>
            <RiAddCircleLine />
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
