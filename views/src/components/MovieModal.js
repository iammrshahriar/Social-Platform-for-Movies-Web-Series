import React from "react";
import { useGetMoviesQuery } from "../features/movile/movieSlice";
import { FaTimes } from "react-icons/fa";
const MovieModal = ({ setCoverPhoto, setShowModal }) => {
  const { data, isLoading } = useGetMoviesQuery();
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
      <div className="relative z-10 m-8 bg-slate-900 p-10 max-w-md rounded-md overflow-hidden">
        {isLoading ? (
          <div className="text-center font-bold text-2xl text-white">
            Loading...
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4 items-center">
            {data?.map((item) => (
              <div className="col-span-1" key={item._id}>
                <img
                  onClick={() =>
                    setCoverPhoto(
                      `https://image.tmdb.org/t/p/original${item?.backdrop_path}`
                    )
                  }
                  className="cursor-pointer hover:scale-150 transition-all duration-300"
                  src={`https://image.tmdb.org/t/p/original${
                    item ? item?.backdrop_path : ""
                  }`}
                  alt="movie"
                />
              </div>
            ))}
          </div>
        )}
        <button
          className="p-1 absolute top-0 right-0  text-white  text-sm"
          onClick={() => setShowModal(false)}
        >
          <FaTimes size={24} />
        </button>
      </div>
    </div>
  );
};

export default MovieModal;
