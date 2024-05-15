const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Message Schema
const messageSchema = new Schema({
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "onModel",
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "onModel",
    },
    onModel: {
      type: String,
      required: true,
      enum: ["User", "ServiceProvider"],
    },
    message: { 
        type: String,
         required: true 
    },
}, { timestamps: true }); 

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
