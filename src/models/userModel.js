const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, default: "New User" },
  modules_completed: { type: Number, default: 0 },
  user_level: { type: Number, default: 1 },
  games_played: { type: Number, default: 0 },
  money_made: { type: Number, default: 0.0 },
  money_lost: { type: Number, default: 0.0 },
  experience_level: { type: String, default: "Beginner" },
  recent_achievements: {
    type: [
      {
        title: String,
        subtitle: String,
        progress: Number,
      },
    ],
    default: [],
  },
});

module.exports = mongoose.model("User", userSchema);
