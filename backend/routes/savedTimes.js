const { db } = require("../Database");
const express = require("express");
const router = express.Router();
const SavedTime = require("../models/SavedTime");

router.get("/", async (req, res) => {
  try {
    console.log(db.SavedTimes);
    const savedTime = await db.SavedTimes.find().toArray();
    res.status(200).json(savedTime);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  const savedTime = new SavedTime({
    time: req.body.time,
  });
  await db.SavedTimes.insertOne({ time: req.body.time });
  res.status(201).send(savedTime);
});

module.exports = router;
