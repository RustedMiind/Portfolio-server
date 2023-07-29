const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const db = require("./database");

// Routes
const projectRoutes = require("./routes/projectRoutes");
const adminRoutes = require("./routes/adminRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();

// Middlewares :
app.use(
  cors({
    preflightContinue: true,
    origin: [
      "http://192.168.1.9:3000",
      "http://localhost:3000",
      "https://ali-soliman.web.app",
      "https://ali-soliman.firebaseapp.com",
    ],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
  })
);
app.use(function (req, res, next) {
  res.header("Set-Cookie: cross-site-cookie=whatever; SameSite=None; Secure");
  next();
});
app.use(express.json());
app.use(cookieParser());

// Connect to Database :
db((err) => {
  if (err) {
    console.log(err);
    return;
  }
  app.listen(process.env.PORT);
  console.log(
    "||||||||||||  LISTENING ON http://localhost:" +
      process.env.PORT.toString() +
      "/  ||||||||||||"
  );
});

app.use("/projects", projectRoutes);
app.use("/admin", adminRoutes);
app.use("/messages", messageRoutes);
