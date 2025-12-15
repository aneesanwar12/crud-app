const express = require("express");
const router = express();
const Log = require("../models/logModel");

router.get("/getlogs", async (req, res) => {
  try {
    const logs = await Log.find();
    res.status(200).json({ status: 200, logs });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
});

router.delete("/clearlogs", async (req, res) => {
  try {
    await Log.deleteMany({});
    res.status(200).json({ status: 200, message: "Logs deleted successfully" });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
});

module.exports = router;
