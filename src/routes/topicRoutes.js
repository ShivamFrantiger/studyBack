const express = require("express");
const router = express.Router();
const Topic = require("../models/Topic"); // Assuming you have a Topic model

// Get all topics from a subject
router.get("/subject/:subjectId", async (req, res) => {
  try {
    const topics = await Topic.find({ subject: req.params.subjectId });
    res.json(topics);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get summary notes for a specific topic
router.get("/:topicId/summary", async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.topicId).select("summary");
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }
    res.json(topic);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
