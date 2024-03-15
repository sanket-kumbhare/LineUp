const mongoose = require("mongoose");
const { DB_NAME } = require("constants");

const express = require("express");
const app = express();

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\nMONGODB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB ERROR: ", error);
    process.exit(1);
  }
};

module.exports = connectDB;
