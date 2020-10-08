const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  answerBeingRepliedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Answer"
  },
  replies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Answer"
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  votes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    value: {
      type: mongoose.Schema.Types.Number, //-1 for downvote, 1 for upvote
      required: true
    }
  }]
});

module.exports = mongoose.model("Answer", answerSchema);
