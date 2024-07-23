const { Client, auth } = require("twitter-api-sdk");
const mongoose = require("mongoose");

const { ObjectId } = mongoose.Types;
const {
  UserSocialMediaToken,
} = require("../models/userSocialMediaToken.model");
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
const STATE = "my-state1";

const callback = asyncHandler(async (req, res) => {
  const { code, state } = req.query;

  if (state !== STATE) {
    throw new ApiError(
      400,
      `State isn't matching. Expected: ${STATE} Received: ${state}`
    );
  }

  if (!code) {
    throw new ApiError(400, "Code not found");
  }

  const accessTokenResponse = await authClient.requestAccessToken(code);

  // TODO: userId is hardcoded for now. Need to get it from middleware/session/cookies
  const creds = await UserSocialMediaToken.create({
    userId: new ObjectId("669ff5a4d6b8b7caea96c99f"),
    socialMedia: "twitter",
    token: accessTokenResponse.token,
  });

  return res.json({ creds });
});

const login = asyncHandler(async (req, res) => {
  const authUrl = authClient.generateAuthURL({
    state: STATE,
    code_challenge_method: "s256",
  });
  console.log({ authUrl });
  res.redirect(authUrl);
});

module.exports = {
  login,
  callback,
};
