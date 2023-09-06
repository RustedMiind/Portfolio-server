const mongoose = require("mongoose");

const messageScema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    seen: {
      type: Boolean,
      required: true,
    },

    organization: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("message", messageScema);

module.exports = Message;
