const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    describtion: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    github: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("project", projectSchema);

module.exports = Project;
