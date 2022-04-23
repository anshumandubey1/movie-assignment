import React, { useContext, useState } from 'react';
import MovieContext from '../contexts/MovieContext';
import AddMovie from './AddMovie';

const Header = () => {
  const { state, dispatch } = useContext(MovieContext);
  const [showAddDialog, setShowAddDialog] = useState(false);
  return (
    <>
      <div id="logo">Movies</div>
      <input
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
        A-Z
      </button>
      <button
        onClick={() =>
          dispatch({
            type: 'setOrder',
            order: 'desc',
          })
        }
      >
        Z-A
      </button>
      {showAddDialog ? (
        <AddMovie exit={() => setShowAddDialog(false)} />
      ) : (
        <button onClick={() => setShowAddDialog(true)}>Add Movie</button>
      )}
    </>
  );
};

export default Header;
