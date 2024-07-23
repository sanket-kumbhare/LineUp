const Joi = require("joi");
const jwt = require("jsonwebtoken");

const asyncHandler = require("./../utils/asyncHandler");
const ApiError = require("./../utils/ApiError");
const ApiResponse = require("./../utils/ApiResponse");
const { User } = require("./../models/user.model");
const { cookieOptions } = require("./../constants");
const { validationErrors } = require("../utils/helpers");
const {
  UserSocialMediaToken,
} = require("../models/userSocialMediaToken.model");

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({
      validateBeforeSave: false,
    });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "something went wrong while generating access and refresh token",
      error
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const userSchema = Joi.object({
    fullName: Joi.string().required(),
    userName: Joi.string()
      .pattern(/^[a-zA-Z0-9._]+$/)
      .min(3)
      .max(24)
      .required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    // - at least 8 characters
    // - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
    // - Can contain special characters
    password: Joi.string()
      .pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
      .min(8)
      .required(),
  });

  const { _, error } = userSchema.validate(req.body);
  validationErrors(error);

  let userName = await User.findOne({ userName: req.body.userName });
  if (userName) {
    throw new ApiError(409, "Username already taken");
  }

  let userEmail = await User.findOne({ email: req.body.email });
  if (userEmail) {
    throw new ApiError(409, "Email already taken");
  }

  let user = await User.create(req.body);
  let createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(400, "something went wrong while registering user!");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "user created successfully."));
});

const loginUser = asyncHandler(async (req, res) => {
  const { userName, password } = req.body;

  const userSchema = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().required(),
  });

  let { _, error } = userSchema.validate(req.body);
  validationErrors(error);

  const user = await User.findOne({ userName });
  // .populate("userCredentials");
  if (!user) {
    throw new ApiError(401, "user does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "incorrect password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const socialMediaTokens = await UserSocialMediaToken.find({
    userId: user._id,
  }).select("socialMedia token");

  console.log(socialMediaTokens);
  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        { accessToken, refreshToken, socialMediaTokens, loggedUser },
        "user logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          refreshToken: undefined,
        },
      },
      {
        new: true,
      }
    );

    return res
      .status(200)
      .clearCookie("accessToken", cookieOptions)
      .clearCookie("refreshToken", cookieOptions)
      .json(new ApiResponse(200, null, "user logged out successfully"));
  } catch (error) {
    throw new ApiError(
      400,
      "something went wrong while trying to logout",
      error
    );
  }
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  try {
    const incomingRefreshToken =
      req.cookies?.refreshToken ||
      req.header("Authorization")?.replace("Bearer ", "") ||
      req.body?.refreshToken;
    if (!incomingRefreshToken) {
      throw new ApiError(401, "invalid refresh token");
    }

    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);
    if (!user) {
      throw new ApiError(401, "invalid refresh token");
    }

    if (user?.refreshToken !== incomingRefreshToken) {
      throw new ApiError(401, "invalid refresh token expired or used.");
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await generateAccessAndRefreshToken(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", newRefreshToken, cookieOptions)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "access token refreshed successfully"
        )
      );
  } catch (error) {
    throw new ApiError(
      400,
      "something went wrong while refreshing to access token",
      error
    );
  }
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
};
