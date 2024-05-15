const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Conversation Schema
const conversationSchema = new Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "onModel",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
    onModel: {
      type: String,
      required: true,
      enum: ["User", "ServiceProvider"],
    },
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);
module.exports = Conversation;