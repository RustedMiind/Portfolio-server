const Admin = require("../models/Admin");
const { createLoginSession } = require("../methods/LoginAdmin");
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
  Admin.login(username, password).then((adminToken) => {
    // console.log(adminToken);
    res
      .status(202)
      .cookie("jwt", adminToken.token, defaultOptions())
      .json(adminToken.admin);
  });
};

module.exports.adminLogout = function (req, res) {
  console.log(defaultOptions({ maxAge: 100 }));
  res
    .status(200)
    .cookie("jwt", "Empty Token", defaultOptions({ maxAge: 100 }))
    .json({ message: "Logged out succesfully" });
};
