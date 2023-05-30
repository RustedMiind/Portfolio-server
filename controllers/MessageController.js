const Message = require("../models/Message");

module.exports.getUnreadMessages = function (req, res) {
  Message.find({ seen: false })
    .then((result) => {
      result
        ? res.status(200).json(result)
        : res.status(204).json({ message: "No Unread Messages" });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports.getAllMessages = function (req, res) {
  Message.find({})
    .then((result) => {
      result
        ? res.status(200).json(result)
        : res.status(204).json({ message: "No Any Messages" });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports.getUserMessages = function (req, res) {
  const query = req.params.query;

  Message.find({ $or: [{ email: query }, { phone: query }] })
    .then((result) => {
      result
        ? res.status(200).json(result)
        : res.status(204).json({ message: "No Any Messages" });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports.sendMeessage = function (req, res) {
  const message = new Message({ ...req.body, seen: false });
  message
    .save()
    .then((result) => {
      res.status(200).json({ message: "Send Succesfully", data: result });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports.readMessage = function (req, res) {
  const id = req.params.query;

  Message.findByIdAndUpdate(id, { seen: true }, { new: true })
    .then((result) => {
      if (!result) {
        res.status(404).json({ message: "No Message Found", data: result });
      } else {
        res
          .status(200)
          .json({ message: "Message have been set to seen", data: result });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
