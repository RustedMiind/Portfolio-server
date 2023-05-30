const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  discription: {
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
  deployed: {
    type: String,
  },
});

const Project = mongoose.model("project", projectSchema);

module.exports = Project;
