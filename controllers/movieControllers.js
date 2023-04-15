import axios from "axios";
import MovieModel from "../models/MovieModel.js";

export const createMovie = async () => {
  try {
    const { data } = await axios(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.MOVIE_API}`
    );
    const movies = await data?.results;

    if (movies?.length) {
      movies.forEach(async (movie) => {
        const isExistMovie = await MovieModel.findOne({ movieId: movie.id });

        if (isExistMovie) {
          return;
        } else {
          const newMovie = new MovieModel({
            movieId: movie.id,
            title: movie.title,
            overview: movie.overview,
            backdrop_path: movie.backdrop_path,
            poster_path: movie.poster_path,
            vote_average: movie.vote_average,
            vote_count: movie.vote_count,
          });
          await newMovie.save();
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getMoviews = async (req, res) => {
  try {
    const movies = await MovieModel.find();
    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getMoviewByID = async (req, res) => {
  try {
    const movie = await MovieModel.findById(req.params.id).populate(
      "opinions.user"
    );
    return res.status(200).json(movie);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const movieLikeReaction = async (req, res) => {
  try {
    const user = req.user;
    const movie = await MovieModel.findById(req.params.id);
    const existingLike = movie.Likes.find((like) => like.user.equals(user._id));

    if (existingLike) {
      await MovieModel.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { Likes: { user: user._id } } }
      );

      return res.status(200).json({ message: "Like Remove" });
    } else {
      await MovieModel.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { UnLikes: { user: user._id } } }
      );
      movie.Likes.push({ user: user._id });
      await movie.save();
      return res.status(200).json({ message: "Like Add" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const movieDisLikeReaction = async (req, res) => {
  try {
    const user = req.user;
    const movie = await MovieModel.findById(req.params.id);
    const existingDisLike = movie.UnLikes.find((unlike) =>
      unlike.user.equals(user._id)
    );

    if (existingDisLike) {
      await MovieModel.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { UnLikes: { user: user._id } } }
      );

      return res.status(200).json({ message: "DisLike Remove" });
    } else {
      await MovieModel.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { Likes: { user: user._id } } }
      );
      movie.UnLikes.push({ user: user._id });
      await movie.save();
      return res.status(200).json({ message: "DisLike Add" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createOpinionInMovie = async (req, res) => {
  try {
    const user = req.user;
    const movie = await MovieModel.findById(req.params.id);
    const { rate, commentText } = req.body;

    const existingOpinion = movie.opinions.find((opinion) =>
      opinion.user.equals(user._id)
    );

    if (existingOpinion) {
      // Update the existing opinion
      existingOpinion.rate = rate;
      existingOpinion.commentText = commentText;
      await movie.save();
      return res.status(200).json({ message: "Opinion updated successfully" });
    } else {
      // Create a new opinion
      movie.opinions.push({ user: user._id, rate, commentText });
      await movie.save();
      return res.status(201).json({ message: "Opinion created successfully" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
