const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const apiRouter = require("./routes");

const app = express();

// middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(cookieParser());

// apiRoutes
app.use("/api/v1", apiRouter);

module.exports = app;
