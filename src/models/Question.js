const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Topic",
    required: true
  },
  question: {
    type: String,
    required: true,
    trim: true
  },
  options: [
    {
      type: String,
      required: true,
      trim: true
    }
  ],
  correctAnswer: {
    type: Number, // Index of the correct option in the options array
    required: true
  },
  explanation: {
    type: String,
    trim: true
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    default: "medium"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the "updatedAt" field on save
QuestionSchema.pre("save", function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Question", QuestionSchema);