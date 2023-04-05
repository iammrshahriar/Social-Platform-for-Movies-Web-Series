import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { BiDislike, BiLike, BiComment, BiShare } from "react-icons/bi";
import { BsStarFill } from "react-icons/bs";
import Modal from "../components/Modal";
import {
  useAddDisLikeInMovieMutation,
  useAddLikeInMovieMutation,
  useGetSingleMovieQuery,
  useAddOpinionInMovieMutation,
} from "../features/movile/movieSlice";
import ReactStars from "react-rating-stars-component";

const SingleMovie = () => {
  const [showModal, setShowModal] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();
  const [rate, setRate] = useState(5);
  const [comment, setComment] = useState("");
  const { isLoading, data } = useGetSingleMovieQuery(id);
  const [addDisLike] = useAddDisLikeInMovieMutation();
  const [addLike] = useAddLikeInMovieMutation();
  const [addOpinion, { isLoading: addOpinionLoading, isSuccess }] =
    useAddOpinionInMovieMutation();

  const handleCreatePost = () => {
    setShowModal(true);
  };

  const ratingChanged = (newRating) => {
    setRate(newRating);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment) {
      return;
    }
    const data = {
      rate,
      comment,
      id,
    };
    addOpinion(data);
  };

  useEffect(() => {
    if (isSuccess) {
      setComment("");
      setRate(5);
    }
  }, [isSuccess]);

  if (isLoading) {
    return (
      <div className="container grid grid-cols-3 gap-5">
        <div className="col-span-2 h-96 bg-slate-800 rounded animate-pulse"></div>
        <div className="col-span-1 h-96 bg-slate-800 rounded animate-pulse"></div>
      </div>
    );
  }
  return (
    <section className="py-5">
      {showModal && <Modal id={id} setShowModal={setShowModal} />}
      <div className="container grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <img
            src={`https://image.tmdb.org/t/p/original${data?.backdrop_path}`}
            alt={data?.title}
            className="rounded"
          />
        </div>

        <div className="lg:col-span-1 text-white lg:p-10">
          <h2 className="text-2xl font-bold ">{data?.title}</h2>

          <p className="my-5">{data ? data?.overview : ""}</p>

          <p>
            Rating{" "}
            <span className="text-orange-600 font-bold">
              {data?.vote_average}
            </span>{" "}
            from{" "}
            <span className="text-orange-600 font-bold">
              {data?.vote_count}
            </span>
          </p>

          {!user && (
            <h2 className="mt-3">
              Please{" "}
              <Link to="/login" className="text-orange-600 underline">
                Login
              </Link>{" "}
              for share your opinion
            </h2>
          )}
        </div>
        {user && (
          <div className={`${user ? "lg:col-span-2 w-full" : "hidden"}`}>
            <div>
              <div className="flex items-center gap-5">
                <button
                  onClick={() => addLike(id)}
                  className="py-2 px-6 bg-slate-800 rounded flex items-center gap-2 text-white"
                >
                  <BiLike size={30} color="white" />
                  <span>{data?.Likes?.length}</span>
                </button>
                <button
                  onClick={() => addDisLike(id)}
                  className="py-2 px-6 bg-slate-800 rounded flex items-center gap-2 text-white"
                >
                  <BiDislike size={30} color="white" />
                  <span>{data?.UnLikes?.length}</span>
                </button>
                <button className="py-2 px-6 bg-slate-800 rounded flex items-center gap-2 text-white">
                  <BiComment size={30} color="white" />
                  <span>{data?.opinions?.length}</span>
                </button>
                <button
                  onClick={handleCreatePost}
                  className="py-2 px-6 bg-slate-800 rounded flex items-center gap-2 text-white rotate-180	"
                >
                  <BiShare size={30} color="white" />
                </button>
              </div>

              <div className="mt-5">
                <h2 className="text-xl font-bold mb-3 text-white">
                  Your Opinion
                </h2>
                <hr />
              </div>
              <div className="flex items-center justify-between my-3">
                <h2 className="text-xl font-bold text-white">Rating</h2>
                <ReactStars
                  count={5}
                  onChange={ratingChanged}
                  size={24}
                  activeColor="#ffd700"
                />
              </div>

              <form onSubmit={handleSubmit}>
                <textarea
                  className="w-full block focus:outline-none bg-slate-700 rounded p-2 text-white"
                  rows="2"
                  placeholder="Enter Your Opinion"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                ></textarea>

                <div className="mt-3 flex items-center justify-end">
                  <button
                    type="submit"
                    disabled={addOpinionLoading}
                    className="px-6 py-2 bg-orange-600 rounded text-sm text-white"
                  >
                    {addOpinionLoading ? "Loading..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="lg:col-span-2 w-full">
          <h1 className="text-xl text-white font-bold">Opinions</h1>

          {data?.opinions?.map((opinion) => {
            return (
              <div className="my-5" key={opinion._id}>
                <div className="flex items-center gap-5">
                  {Array.from({ length: opinion?.rate }).map((_, index) => (
                    <BsStarFill key={index} size={20} color="#ffd700" />
                  ))}
                  <h2 className="text-white">Rating By</h2>
                  <h2 className="text-orange-600">{opinion?.user?.userName}</h2>
                </div>
                <p className="text-sm text-white mt-2">
                  {opinion?.commentText}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SingleMovie;
