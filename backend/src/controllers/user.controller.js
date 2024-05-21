const Joi = require("joi");
const jwt = require("jsonwebtoken");

const asyncHandler = require("./../utils/asyncHandler");
const ApiError = require("./../utils/ApiError");
const ApiResponse = require("./../utils/ApiResponse");
const { User } = require("./../models/user.model");
const { cookieOPtions } = require("./../constants");

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
      "something went wrong while generating access and refresh token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const userSchema = Joi.object({
    fullName: Joi.string().required(),
    userName: Joi.string().alphanum().min(3).max(12).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    // - at least 8 characters
    // - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
    // - Can contain special characters
    password: Joi.string()
      .pattern(
        new RegExp(
          "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
        )
      )
      .required(),
  });

  const { value, error } = userSchema.validate(req.body);

  if (error) {
    const { details } = error;
    const message = details.map((i) => i.message).join(",");
    throw new ApiError(400, message);
  }

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

  let { value, error } = userSchema.validate(req.body);

  if (error) {
    const { details } = error;
    const message = details.map((i) => i.message).join(",");
    throw new ApiError(400, message);
  }

  const user = await User.findOne({ userName });
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

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOPtions)
    .cookie("refreshToken", refreshToken)
    .json(
      new ApiResponse(
        200,
        { user: accessToken, refreshToken, loggedUser },
        "user logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
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
    .clearCookie("accessToken", cookieOPtions)
    .clearCookie("refreshToken", cookieOPtions)
    .json(new ApiResponse(200, null, "user logged out successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookie?.refreshToken ||
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
    .cookie("accessToken", accessToken, cookieOPtions)
    .cookie("refreshToken", newRefreshToken, cookieOPtions)
    .json(
      new ApiResponse(
        200,
        { accessToken, refreshToken: newRefreshToken },
        "access token refreshed successfully"
      )
    );
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
};
