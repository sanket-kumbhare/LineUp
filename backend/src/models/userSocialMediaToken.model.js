const mongoose = require("mongoose");

const userSocialMediaToken = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    socialMedia: {
      type: String,
      required: true,
    },
    token: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = {
  UserSocialMediaToken: mongoose.model(
    "UserSocialMediaToken",
    userSocialMediaToken
  ),
};
