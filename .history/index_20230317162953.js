import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import movieRouter from "./routes/movieRoutes.js";
import postRouter from "./routes/postRoutes.js";
import { createMovie } from "./controllers/movieControllers.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.get("/", (req, res) => {
  res.send("Server Running....");
});

// API

setTimeout(() => {
  createMovie();
}, 1000);

app.use("/api/user", userRouter);
app.use("/api/movie", movieRouter);
app.use("/api/post", postRouter);

//ERROR HANDLEING

app.use(notFound);
app.use(errorHandler);

// DATABASE CONNECTION
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    if (process.env.NODE_ENV === "DEVELOPMENT") {
      console.log(`Database connection Successfull`);
    }
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  if (process.env.NODE_ENV === "DEVELOPMENT") {
    console.log(`App is Running at Port ${PORT}`);
  }
});
