const Joi = require("joi");
const mongoose = require("mongoose");

const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const { validationErrors } = require("../utils/helpers.js");
const { Post } = require("../models/post.model");
const { ObjectId } = mongoose.Types;

const addPost = asyncHandler(async (req, res) => {
  const postSchema = Joi.object({
    content: Joi.string().max(280).required(),
    socialMedia: Joi.string().required(),
    dateTime: Joi.string().isoDate().required(),
  });

  let { _, error } = postSchema.validate(req.body);
  validationErrors(error);

  let postFields = {
    ...req.body,
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
  if (!posts?.length) {
    throw new ApiError(404, `${socialMedia} posts Not Found`);
  }

  return res.status(200).json(new ApiResponse(200, { posts }));
});

const showPostDetails = asyncHandler(async (req, res) => {
  let postId = req.params?.id;
  if (!postId) {
    throw new ApiError(400, "invalid post id");
  }

  let post = await Post.findOne({
    _id: new ObjectId(postId),
    owner: req.user._id,
    deleted: false,
  });

  return res.status(200).json(new ApiResponse(200, { post }));
});

const editPost = asyncHandler(async (req, res) => {
  try {
    let postSchema = Joi.object({
      content: Joi.string().max(280),
      dateTime: Joi.string().isoDate(),
    });

    let { _, error } = postSchema.validate(req.body);
    validationErrors(error);

    let postId = req.params?.id;
    let postFields = req.body;
    if (!postId) {
      throw new ApiError(400, "invalid post id");
    }
    let post = await Post.updateOne(
      {
        _id: new ObjectId(postId),
        owner: req.user._id,
        deleted: false,
      },
      { $set: postFields }
    );

    return res
      .status(200)
      .json(new ApiResponse(200, { post }, "post updated successfully"));
  } catch (error) {}
});

// soft delete
const deletePost = asyncHandler(async (req, res) => {
  let postId = req.params?.id;
  if (!postId) {
    throw new ApiError(400, "invalid post id");
  }
  let post = await Post.updateOne(
    {
      _id: new ObjectId(postId),
      owner: req.user._id,
      deleted: false,
    },
    { $set: { deleted: true } }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, { post }, "post deleted successfully"));
});

module.exports = {
  addPost,
  listPosts,
  showPostDetails,
  editPost,
  deletePost,
};
