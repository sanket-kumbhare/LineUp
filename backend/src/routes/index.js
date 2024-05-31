const express = require("express");

const userRouter = require("./user.routes");
const postRouter = require("./post.routes");

const router = express.Router();

router.use("/users", userRouter);
router.use("/posts", postRouter);

module.exports = router;
