const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const postSchema = new mongoose.Schema(
  {
    content: {
      type: Object,
      required: true,
    },
    dateTime: {
      type: Date,
      required: true,
    },
    socialMedia: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

postSchema.plugin(aggregatePaginate);

module.exports = { Post: mongoose.model("Post", postSchema) };
