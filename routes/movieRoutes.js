import express from "express";
import {
  createOpinionInMovie,
  getMoviewByID,
  getMoviews,
  movieDisLikeReaction,
  movieLikeReaction,
} from "../controllers/movieControllers.js";
import { protectedRoute } from "../middlewares/authMiddleware.js";
const movieRouter = express.Router();

movieRouter.route("/").get(getMoviews);
movieRouter
  .route("/:id")
  .get(getMoviewByID)
  .patch(protectedRoute, createOpinionInMovie);
movieRouter.route("/like/:id").patch(protectedRoute, movieLikeReaction);
movieRouter.route("/dislike/:id").patch(protectedRoute, movieDisLikeReaction);

export default movieRouter;
