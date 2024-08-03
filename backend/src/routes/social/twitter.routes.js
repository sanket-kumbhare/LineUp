const { Router } = require("express");
const twitterRouter = Router();

const twitterController = require("../../controllers/twitter.controller");
const verifyJWT = require("../../middlewares/auth.middleware");

twitterRouter.get("/login", verifyJWT, twitterController.login);
twitterRouter.get("/callback", twitterController.callback);

module.exports = twitterRouter;
