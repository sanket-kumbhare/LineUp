const ApiError = require("./ApiError");
const crypto = require("crypto");

const { cookieOptions } = require("../constants");

const validationErrors = (error) => {
  if (error) {
    const { details } = error;
    const message = details.map((i) => i.message).join(",");
    throw new ApiError(400, message);
  }
};

const generateRamdomString = (len) => {
  return crypto.randomBytes(len).toString("hex");
};

// TODO: move to other file or will use static value from .env if required.
// if require store in database.
// not implemented properly need to implement in future.
const generateTwitterState = (res) => {
  const state = generateRamdomString(16);
  res.cookie("twitterOAuthState", state, cookieOptions);
  return state;
};

module.exports = { validationErrors, generateTwitterState };
