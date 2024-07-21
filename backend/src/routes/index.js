const express = require("express");

const userRouter = require("./user.routes");
const postRouter = require("./post.routes");
const twitterRouter = require("./twitter.routes");

const router = express.Router();

router.use("/users", userRouter);
router.use("/posts", postRouter);
router.use("/twitter", twitterRouter);

module.exports = router;
