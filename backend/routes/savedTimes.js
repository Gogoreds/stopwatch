const express = require("express");
const router = express.Router();
const SavedTime = require("../models/SavedTime");

router.get("/", async (req, res) => {
  const savedTimes = await SavedTime.find();
  res.json(savedTimes);
});

router.post("/", async (req, res) => {
  const savedTime = new SavedTime({
    time: req.body.time,
  });
  await savedTime.save();
  res.status(201).send(savedTime);
});

module.exports = router;
