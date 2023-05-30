const jwt = require("jsonwebtoken");

// Create Json Web token function
const DAY = 1000 * 60 * 60 * 24;
const createToken = (id, days = 1) => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: DAY * days,
  });
};

module.exports.defaultOptions = function (obj) {
  return {
    sameSite: "none",
    httpOnly: true,
    ...obj,
  };
};
module.exports.createToken = createToken;
