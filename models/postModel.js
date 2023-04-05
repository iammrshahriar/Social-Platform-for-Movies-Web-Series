import mongoose from "mongoose";
import Comment from "./CommentModel.js";
import { Like } from "./LikeModel.js";
const { Schema, model } = mongoose;

const postSchema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    moviePoster: {
      type: String,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comments: [Comment],
    likes: [Like],
  },
  { timestamps: true }
);

const Post = model("Post", postSchema);
export default Post;
