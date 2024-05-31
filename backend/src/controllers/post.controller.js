const Joi = require("joi");
const mongoose = require("mongoose");

const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const { Post } = require("../models/post.model");
const { ObjectId } = mongoose.Types;

const addPost = asyncHandler(async (req, res) => {
  const postSchema = Joi.object({
    content: Joi.string().max(280).required(),
    dateTime: Joi.string().isoDate().required(),
  });

  let { _, error } = postSchema.validate(req.body);

  if (error) {
    const { details } = error;
    const message = details.map((i) => i.message).join(",");
    throw new ApiError(400, message);
  }

  // make conditional after multiple platform implementation
  r;
  let socialMedia = "twitter";
  let postFields = {
    ...req.body,
    socialMedia: socialMedia,
    owner: req.user._id,
  };

  let scheduledPost = await Post.create(postFields);
  if (!scheduledPost) {
    throw new ApiError(
      400,
      `something went wrong while scheduling ${socialMedia} post`
    );
  }

  return res
    .status(201)
    .json(new ApiResponse(201, scheduledPost, "post added successfully."));
});

const listPosts = asyncHandler(async (req, res) => {
  // make conditional after multiple platform implementation
  let socialMedia = "twitter";
  let posts = await Post.find({
    owner: req.user._id,
    socialMedia,
    deleted: false,
  });
  if (posts?.length) {
    throw new ApiError(
      404,
      `something went wrong while searching for ${socialMedia} posts`
    );
  }

  return res.status(200).json(new ApiResponse(200, { posts }));
});

const showPostDetails = asyncHandler(async (req, res) => {
  let postId = req.params?.id;
  if (!postId) {
    throw new ApiError(400, "invalid post id");
  }

  let post = await Post.findOne({ _id: new ObjectId(postId), deleted: false });

  return res.status(200).json(new ApiResponse(200, { post }));
});

const editPost = asyncHandler(async (req, res) => {
  let postId = req.params?.id;
  if (!postId) {
    throw new ApiError(400, "invalid post id");
  }

  let post = await Post.updateOne({_id: new ObjectId(postId), deleted: false}, {$set: {}})
});

module.exports = {
  addPost,
  listPosts,
  showPostDetails,
};
