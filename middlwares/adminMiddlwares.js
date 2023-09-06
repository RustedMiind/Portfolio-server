// const AdminToken = require("../models/AdminToken");
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");

module.exports.checkAdmin = function (req, res, next) {
  // const token = req.cookies.jwt;
  const token = req.headers.token;
  // Check if there is no jwt
  if (!token) return res.status(406).json({ message: "Login to proceed" });

  jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
    if (err) {
      res.status(401).json(err);
    } else {
      Admin.findById(decodedToken.id)
        .then((result) => {
          next();
        })
        .catch((err) => {
          res.status(403).json({ message: "Invalid Token Login To Proceed" });
        });
    }
  });
};
