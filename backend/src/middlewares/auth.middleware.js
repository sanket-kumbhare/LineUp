const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const { User } = require("../models/user.model");

const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const accessToken =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!accessToken) {
      throw new ApiError(401, "access token not found");
    }

    const decodedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      throw new ApiError(401, "invalid access token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, "invalid token");
  }
});

module.exports = verifyJWT;
