import React from "react";
import Movie from "../components/Movie";
import { useGetMoviesQuery } from "../features/movile/movieSlice";
import Loader from "../components/Loader";
const Home = () => {
  const { data, isLoading } = useGetMoviesQuery();

  return (
    <section>
      <div className="container py-5 text-white">
        <div className="grid lg:grid-cols-5 grid-cols-2 gap-2 items-center justify-between">
          {isLoading ? (
            <Loader count={20} />
          ) : (
            data?.map((movie) => <Movie key={movie._id} movieData={movie} />)
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
