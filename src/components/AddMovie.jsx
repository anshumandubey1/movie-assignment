import React, { useContext, useRef, useState } from 'react';
import MovieContext from '../contexts/MovieContext';

const AddMovie = ({ exit }) => {
  const { dispatch } = useContext(MovieContext);
  const [poster, setPoster] = useState('');
  const [backdrop, setBackdrop] = useState('');
  const title = useRef(null);
  const rating = useRef(null);
  const description = useRef(null);

  const submit = (e) => {
    e.preventDefault();
    dispatch({
      type: 'addMovie',
      movie: {
        title: title.current.value,
        rating: rating.current.value,
        description: description.current.value,
        images: {
          poster,
          backdrop,
        },
      },
    });
  };

  return (
    <form onSubmit={submit}>
      <label htmlFor="title">Title</label>
      <input type="text" id="title" name="title" required ref={title} />
      <label htmlFor="rating">Rating</label>
      <input
        type="number"
        min="0"
        max="10"
        step="0.1"
        id="rating"
        name="rating"
        required
        ref={rating}
      />
      <label htmlFor="poster">Poster URL</label>
      <input
        type="url"
        id="poster"
        name="poster"
        value={poster}
        onChange={(e) => setPoster(e.target.value)}
        required
      />
      <label htmlFor="backdrop">Backdrop URL</label>
      <input
        type="url"
        id="backdrop"
        name="backdrop"
        value={backdrop}
        onChange={(e) => setBackdrop(e.target.value)}
        required
      />
      <label htmlFor="description">Description</label>
      <textarea
        name="description"
        id="description"
        cols="30"
        rows="4"
        ref={description}
      ></textarea>
      <button type="reset" onClick={() => exit()}>
        Cancel
      </button>
      <button>Submit</button>
    </form>
  );
};

export default AddMovie;
