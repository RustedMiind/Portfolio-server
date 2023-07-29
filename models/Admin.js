const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// const AdminToken = require("./AdminToken");
const { createToken } = require("../methods/CookieSession");

const adminSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true }
);

// fire a function before doc saved to db
adminSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Login Promise
adminSchema.statics.login = function (username, password) {
  return new Promise((resolve, reject) => {
    this.findOne({ username })
      .then((admin) => {
        if (!admin) reject("Username is incorrect");
        else {
          bcrypt.compare(password, admin.password, (err, isCorrect) => {
            const token = createToken(admin);
            if (err) reject("Password compiling error");
            if (isCorrect) {
              const { password, createdAt, updatedAt, ...data } = admin._doc;
              resolve({ admin: admin._doc, token });
            } else reject("Password is incorrect");
          });
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;
