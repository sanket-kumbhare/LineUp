const { Client, auth } = require("twitter-api-sdk");
const mongoose = require("mongoose");

const { ObjectId } = mongoose.Types;
const {
  UserSocialMediaToken,
} = require("../models/userSocialMediaToken.model");
const { User } = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

const authClient = new auth.OAuth2User({
  client_id: process.env.TWITTER_CLIENT_ID,
  client_secret: process.env.TWITTER_CLIENT_SECRET,
  callback: process.env.TWITTER_CALLBACK_URL,
  scopes: ["tweet.read", "users.read", "offline.access"],
});

const twitterClient = new Client(authClient);

// TODO: use generateTwitterState function from helpers.js for this
// const STATE = "my-state1";

const callback = asyncHandler(async (req, res) => {
  const { code, state } = req.query;
  if (!code) {
    throw new ApiError(400, "Code not found");
  }

  const user = await User.findById(state);
  if (!user) {
    throw new ApiError(400, `User not found.`);
  }

  const accessTokenResponse = await authClient.requestAccessToken(code);

  const userSocialMediaToken = await UserSocialMediaToken.findOne({
    userId: ObjectId.createFromHexString(state),
    socialMedia: "twitter",
  });

  if (userSocialMediaToken) {
    userSocialMediaToken.token = accessTokenResponse.token;
    await userSocialMediaToken.save();
  } else {
    const creds = await UserSocialMediaToken.create({
      userId: ObjectId.createFromHexString(state),
      socialMedia: "twitter",
      token: accessTokenResponse.token,
    });
  }

  return res.redirect("http://localhost:5173/twitter/scheduler");
});

// currently state value is passed as userId
// TODO: R&D for state value and passing value of userId
const login = asyncHandler(async (req, res) => {
  const authUrl = authClient.generateAuthURL({
    state: req.user._id,
    code_challenge_method: "s256",
  });
  res.json({ authUrl });
});

module.exports = {
  login,
  callback,
};
