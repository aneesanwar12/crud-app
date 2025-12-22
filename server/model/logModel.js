const mongoose = require("mongoose");

const Log = new mongoose.Schema({
  method: {
    type: String,
    required: true,
  },
  endpoint: {
    type: String,
    required: true,
  },
  statusCode: {
    type: Number,
    required: true,
  },
  loggedAt: {
    type: Number,
    required: true,
  },
  loggedBy: {
    type: String,
  },
});

module.exports = mongoose.model("Logs", Log);
