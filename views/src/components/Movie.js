import React from "react";
import { Link } from "react-router-dom";

const Movie = ({ movieData }) => {
  return (
    <Link
      to={`/movie/${movieData._id}`}
      className="block rounded overflow-hidden"
    >
      <img
        src={`https://image.tmdb.org/t/p/original${movieData?.poster_path}`}
        alt={movieData?.title}
      />
    </Link>
  );
};

export default Movie;
