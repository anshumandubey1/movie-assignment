import React, { useContext } from 'react';
import MovieContext from '../contexts/MovieContext';
import '../styles/Banner.sass';
import { TiStar, TiStarHalf } from 'react-icons/ti';

const Banner = () => {
  const { state } = useContext(MovieContext);
  const movie = state.selectedMovie;
  if (movie.title === undefined) {
    return <div>No Movie Found</div>;
  }

  const stars = [];
  for (let i = 1; i < movie.rating; i++) {
    stars.push(<TiStar key={i - 1} />);
  }

  if ((movie.rating * 10) % 10 > 4)
    stars.push(<TiStarHalf key={movie.rating} />);

  return (
    <div className="Banner">
      <img className="backdrop" src={movie.images.backdrop} alt="" />
      <section className="text">
        <h2>{movie.title}</h2>
        <h4>{stars}</h4>
        <p>{movie.description}</p>
      </section>
      <section className="img">
        <img src={movie.images.poster.replace('w300', 'original')} alt="" />
      </section>
    </div>
  );
};

export default Banner;
