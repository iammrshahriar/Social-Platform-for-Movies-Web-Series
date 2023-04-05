import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { useCreatePostMutation } from "../features/posts/postSlice";

const Modal = ({ id, setShowModal }) => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(1);

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const [addNewPost, { isLoading, isSuccess, isError, error }] =
    useCreatePostMutation();

  const onSumbit = (e) => {
    e.preventDefault();
    const post = {
      reviewText,
      postId: id,
      rating,
    };
    addNewPost(post);
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      setShowModal(false);
      navigate("/posts");
    }
  }, [isSuccess, setShowModal, navigate]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-20">
      <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
      <div className="relative z-10 m-8 bg-slate-900 p-10 max-w-md rounded-md overflow-hidden">
        <button
          className="p-1 absolute top-0 right-0  text-white  text-sm"
          onClick={() => setShowModal(false)}
        >
          <FaTimes size={24} />
        </button>
        <form onSubmit={onSumbit}>
          <div>
            {isError && (
              <p className="text-sm text-red-600">{error?.data?.message}</p>
            )}
            <label htmlFor="review" className="text-white block mb-2 text-sm">
              Why are you recommend this?
            </label>
            <textarea
              name="text"
              className="w-full bg-slate-700 rounded text-white p-4 focus:outline-none"
              id="reivew"
              rows="5"
              required
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            ></textarea>
          </div>

          <div className="my-2">
            <label htmlFor="review" className="text-white block mb-2 text-sm">
              Rating
            </label>

            <select
              onChange={handleRatingChange}
              name="rating"
              id="rating"
              className="w-full block py-2 rounded text-center text-sm bg-slate-700 text-white"
            >
              <option value="1">1 Star</option>
              <option value="2">2 Star</option>
              <option value="3">3 Star</option>
              <option value="4">4 Star</option>
              <option value="5">5 Star</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="block w-full py-2 rounded text-white bg-slate-700"
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
