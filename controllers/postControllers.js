import axios from "axios";
import catchAsync from "express-async-handler";
import MovieModel from "../models/MovieModel.js";
import Post from "../models/postModel.js";

export const createPost = catchAsync(async (req, res) => {
  const { postId, reviewText, rating } = req.body;
  const movie = await MovieModel.findById(postId);
  const newPost = new Post({
    user: req.user?._id,
    moviePoster: `https://image.tmdb.org/t/p/original${movie?.backdrop_path}`,
    review: reviewText,
    rating,
  });

  const post = await newPost.save();

  if (!post) {
    return res.status(500).json({ message: "Internal Server Error" });
  }

  return res.status(201).json(post);
});

export const getPosts = catchAsync(async (req, res) => {
  const posts = await Post.find()
    .populate({
      path: "user",
      select: "userName userCoverImg country",
    })
    .populate({
      path: "likes.user",
      select: "userName userCoverImg",
    })
    .populate({
      path: "comments.user",
      select: "userName userCoverImg",
    })
    .sort({ createdAt: -1 });

  res.status(200).json(posts);
});

export const addNewLikeInPost = catchAsync(async (req, res) => {
  const user = req.user;
  const post = await Post.findById(req.params.id);
  const existingLike = post.likes.find((like) => like.user.equals(user._id));

  if (existingLike) {
    await Post.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { likes: { user: user._id } } }
    );
    return res.status(200).json({ message: "Like Remove" });
  } else {
    post.likes.push({ user: user._id });
    await post.save();
    return res.status(200).json({ message: "Like Add" });
  }
});

export const createCommentInPost = catchAsync(async (req, res) => {
  const { commentText } = req.body;
  const user = req.user;
  const post = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $push: { comments: { user: user._id, commentText } },
    },
    { new: true }
  );

  if (!post) {
    return res.status(500).json({ message: "Comment Not Created" });
  }
  return res.status(201).json({ message: "Comment Added" });
});

export const deletePostByAdmin = catchAsync(async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  return res.status(200).json({ message: "Post deleted" });
});
