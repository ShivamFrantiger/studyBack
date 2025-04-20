const mongoose = require("mongoose");

const LeaderboardSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    score: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster querying on subject and sorting by score
LeaderboardSchema.index({ subject: 1, score: -1 });

// Optional: Prevent duplicate entries for the same user-subject combination
// LeaderboardSchema.index({ user: 1, subject: 1 }, { unique: true });

const Leaderboard = mongoose.model("Leaderboard", LeaderboardSchema);

module.exports = Leaderboard;