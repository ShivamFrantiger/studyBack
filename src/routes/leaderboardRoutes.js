const express = require("express");
const router = express.Router();
const Leaderboard = require("../models/Leaderboard"); // Assuming you have a Leaderboard model

// Get leaderboard for a particular subject
router.get("/subject/:subjectId", async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find({
      subject: req.params.subjectId,
    })
      .sort({ score: -1 }) // Sort by score in descending order
      .limit(10) // Get top 10 scores
      .populate("user", "name profilePicture"); // Get user details

    res.json(leaderboard);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
