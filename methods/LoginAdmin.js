const Admin = require("../models/Admin");
const AdminToken = require("../models/AdminToken");

module.exports.createLoginSession = function ({ username, password }) {
  return new Promise((resolve, reject) => {
    Admin.login(username, password)
      .then((admin) => {
        const adminToken = new AdminToken({ adminId: admin._id });
        adminToken
          .save()
          .then((token) => {
            resolve(token);
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
};
