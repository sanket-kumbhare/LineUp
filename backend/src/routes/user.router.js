const { Router } = require("express");
const userRouter = Router();

const userController = require("./../controllers/user.controller");
const verifyJWT = require("../middlewares/auth.middleware");

userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);
userRouter.post("/logout", verifyJWT, userController.logoutUser);

module.exports = userRouter;
