const { Router } = require("express");
const postRouter = Router();

const postController = require("../controllers/post.controller");
const verifyJWT = require("../middlewares/auth.middleware");

postRouter.get("/list", verifyJWT, postController.listPosts);
postRouter.get("/:id", verifyJWT, postController.showPostDetails);
postRouter.post("/add", verifyJWT, postController.addPost);
postRouter.put("/edit/:id", postController.editPost);
// postRouter.delete("/delte", postController.deletePost);

module.exports = postRouter;
