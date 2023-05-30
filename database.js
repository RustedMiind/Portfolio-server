const mongoose = require("mongoose");

const dbURI = process.env.DATABASE;
const connectDB = (cb) => {
  mongoose
    .connect(dbURI)
    .then((result) => cb())
    .catch((err) => cb(err));
};

module.exports = connectDB;
