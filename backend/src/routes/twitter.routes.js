const { Router } = require("express");
const twitterRouter = Router();

const twitterController = require("../controllers/twitter.controller");
const verifyJWT = require("../middlewares/auth.middleware");

twitterRouter.get("/tweet/list", twitterController.index);
twitterRouter.get("/tweet/:id", twitterController.show);
twitterRouter.post("/tweet/add", twitterController.store);
twitterRouter.post("/tweet/edit/:id", twitterController.update);

module.exports = twitterRouter;
