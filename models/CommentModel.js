import mongoose from "mongoose";
const { Schema } = mongoose;

const Comment = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    commentText: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default Comment;
