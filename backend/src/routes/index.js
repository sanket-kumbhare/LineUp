const express = require("express");

const userRouter = require("./user.routes");
const postRouter = require("./post.routes");
const twitterRouter = require("./social/twitter.routes");

const apiRouter = express.Router();
const socialMediaRouter = express.Router();

apiRouter.use("/users", userRouter);
apiRouter.use("/posts", postRouter);

socialMediaRouter.use("/twitter", twitterRouter);

module.exports = { apiRouter, socialMediaRouter };
