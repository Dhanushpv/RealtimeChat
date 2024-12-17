
const mongoose = require("mongoose");

const messageModel = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    content: {
      type: String,
      trim: true,
    },
    reciever: {  // Corrected to 'reciever' to match the controller field
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
  },
  {
    timestamps: true,  // Corrected 'timeStamp' to 'timestamps'
  }
);

const Message = mongoose.model("Message", messageModel);
module.exports = Message;
