const { Router } = require("express");
const twitterRouter = Router();

const twitterController = require("../controllers/twitter.controller");

twitterRouter.get("/login", twitterController.login);
twitterRouter.get("/callback", twitterController.callback);

module.exports = twitterRouter;
