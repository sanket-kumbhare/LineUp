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
      `\n MONGODB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
