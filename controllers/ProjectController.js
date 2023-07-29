const Project = require("../models/Project");

module.exports.getAllProjects = function (req, res) {
  Project.find({})
    .then((result) => {
      if (result.length) {
        res.status(200).json(result);
      } else {
        res.status(204).json({ message: "No Projects saved on the database." });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports.modifyProject = function (req, res) {
  const id = req.params.id;
  Project.findByIdAndUpdate(id, req.body, { new: true })
    .then((result) => {
      res.status(202).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports.deleteProject = function (req, res) {
  const id = req.params.id;
  Project.findByIdAndDelete(id)
    .then((result) => {
      res.status(202).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports.createNewProject = function (req, res) {
  // const { body } = req;
  // const data = {
  //   name: body.name,
  //   discribtion: body.discribtion,
  //   image: body.image,
  //   github: body.github,
  //   deployed: body.deployed,
  // };
  const project = new Project(req.body);
  project
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(406).json(err);
    });
};
