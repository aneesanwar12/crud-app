const Log = require("../models/logModel.js"); // adjust path if needed

const saveLog = async (method, endpoint, statusCode) => {
  try {
    const log = new Log({
      method,
      endpoint,
      statusCode,
      loggedAt: Date.now(), // Unix timestamp in ms
    });

    await log.save();
    console.log("Log saved successfully");
  } catch (error) {
    console.error("Failed to save log", error.message);
  }
};

module.exports = { saveLog };
