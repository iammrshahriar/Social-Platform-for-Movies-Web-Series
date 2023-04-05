import mongoose from "mongoose";
const { Schema } = mongoose;

export const Like = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const UnLike = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Opinion = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },

    rate: {
      type: Number,
    },

    commentText: {
      type: String,
    },
  },
  { timestamps: true }
);
