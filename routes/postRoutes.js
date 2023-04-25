import express from "express";
import {
  addNewLikeInPost,
  createCommentInPost,
  createPost,
  deletePostByAdmin,
  getPosts,
} from "../controllers/postControllers.js";
import { protectedRoute } from "../middlewares/authMiddleware.js";
const postRouter = express.Router();

postRouter
  .route("/")
  .post(protectedRoute, createPost)
  .get(protectedRoute, getPosts);

postRouter
  .route("/:id")
  .patch(protectedRoute, addNewLikeInPost)
  .delete(protectedRoute, deletePostByAdmin)
  .put(protectedRoute, createCommentInPost);

export default postRouter;
