import mongoose from "mongoose";
const { Schema, model } = mongoose;
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "Please enter your userName"],
    },
    userCoverImg: {
      type: String,
      default:
        "https://image.tmdb.org/t/p/original/sANUefL2v8VI6fSfK3gWAG3XBt4.jpg",
    },

    profile: {
      type: String,
      default: `https://randomuser.me/api/portraits/men/${
        Math.floor(Math.random() * 50) + 1
      }.jpg`,
    },
    email: {
      type: String,
      required: [true, "Please enter your email address"],
      unique: [true, "Please enter a valid email address"],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: [6, "Password must be at least 6 character"],
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    country: {
      type: String,
      default: "Bangladesh",
    },
    contact: {
      type: String,
      default: "",
    },
    isPublic: {
      type: Boolean,
      default: true,
    },

    isRestricted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

const User = model("User", userSchema);
export default User;
