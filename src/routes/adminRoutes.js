const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin"); // Middleware to check if user is admin
const Subject = require("../models/Subject");
const Topic = require("../models/Topic");
const Question = require("../models/Question");

// Add new subject to database (admin only)
router.post("/subjects", [auth, admin], async (req, res) => {
  try {
    const { name, description, imageUrl } = req.body;

    const newSubject = new Subject({
      name,
      description,
      imageUrl,
    });

    const subject = await newSubject.save();
    res.json(subject);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Add new topic to database (admin only)
router.post("/topics", [auth, admin], async (req, res) => {
  try {
    const { name, subject, summary } = req.body;

    const newTopic = new Topic({
      name,
      subject,
      summary,
    });

    const topic = await newTopic.save();
    res.json(topic);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Add new questions to database (admin only)
router.post("/questions", [auth, admin], async (req, res) => {
  try {
    const { topic, question, options, correctAnswer, explanation } = req.body;

    const newQuestion = new Question({
      topic,
      question,
      options,
      correctAnswer,
      explanation,
    });

    const savedQuestion = await newQuestion.save();
    res.json(savedQuestion);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
