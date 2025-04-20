const express = require("express");
const router = express.Router();
const Question = require("../models/Question"); // Assuming you have a Question model

// Get random 20 questions/answers for a particular topic
router.get("/topic/:topicId/random", async (req, res) => {
  try {
    const questions = await Question.aggregate([
      { $match: { topic: req.params.topicId } },
      { $sample: { size: 20 } },
    ]);
    res.json(questions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get all questions/answers for a particular topic
router.get("/topic/:topicId", async (req, res) => {
  try {
    const questions = await Question.find({ topic: req.params.topicId });
    res.json(questions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
