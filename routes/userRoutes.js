import express from "express";
import {
  getUsers,
  login,
  signup,
  deleteUserByAdmin,
  updateUserInfo,
  userRestriction,
  getUserInfo,
} from "../controllers/userControllers.js";
import {
  protectedRoute,
  protectedRouteAdmin,
} from "../middlewares/authMiddleware.js";
const userRouter = express.Router();

userRouter.route("/").get(getUsers);
userRouter.route("/signup").post(signup);
userRouter.route("/login").post(login);
userRouter
  .route("/:id")
  .get(getUserInfo)
  .delete(protectedRouteAdmin, deleteUserByAdmin)
  .patch(protectedRoute, updateUserInfo);

userRouter.route("/admin/:id").patch(protectedRouteAdmin, userRestriction);

export default userRouter;
