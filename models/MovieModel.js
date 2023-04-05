import mongoose from "mongoose";
import Comment from "./CommentModel.js";
import { Like, UnLike, Opinion } from "./LikeModel.js";
const { Schema, model } = mongoose;

const MovieSchema = new Schema(
  {
    movieId: { type: String, require: true },
    title: { type: String, require: true },
    overview: { type: String, require: true },
    backdrop_path: { type: String, require: true },
    poster_path: { type: String, require: true },
    vote_average: { type: Number, require: true },
    vote_count: { type: Number, require: true },
    Likes: [Like],
    UnLikes: [UnLike],
    opinions: [Opinion],
  },
  { timestamps: true }
);
const MovieModel = model("movies", MovieSchema);
export default MovieModel;
