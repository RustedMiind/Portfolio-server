const Admin = require("../models/Admin");
const { createLoginSession } = require("../methods/LoginAdmin");
const jwt = require("jsonwebtoken");
const { defaultOptions } = require("../methods/CookieSession");

module.exports.createAdminAccount = function (req, res) {
  const admin = new Admin(req.body);
  admin
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports.adminLogin = function (req, res) {
  const { username, password } = req.body;
  Admin.login(username, password)
    .then((adminToken) => {
      res
        .status(202)
        // .cookie("jwt", adminToken.token, defaultOptions())
        .json({ ...adminToken.admin, token: adminToken.token });
    })
    .catch((err) => {
      res
        .status(404)
        // .cookie("jwt", "", defaultOptions())
        .json(err);
    });
};

module.exports.adminLogout = function (req, res) {
  res
    .status(200)
    // .cookie("jwt", "Empty Token", defaultOptions({ maxAge: 100 }))
    .json({ message: "Logged out succesfully" });
};

module.exports.checkIsAdmin = function (req, res) {
  const token = req.cookies.jwt;
  // Check if there is no jwt
  if (!token)
    return res.status(406).json({ message: "Not logged in in this session" });

  jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
    if (err) {
      res.status(401).json(err);
    } else {
      Admin.findById(decodedToken.id)
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((err) => {
          res.status(403).json({ message: "Invalid Token Login To Proceed" });
        });
    }
  });
};
