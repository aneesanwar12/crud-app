const Log = require("../model/logModel.js"); // adjust path if needed

const saveLog = async (method, endpoint, statusCode, loggedBy) => {
  try {
    const log = new Log({
      method,
      endpoint,
      statusCode,
      loggedBy,
      loggedAt: Date.now(),
    });

    await log.save();
    console.log("Log saved successfully");
  } catch (error) {
    console.error("Failed to save log", error.message);
  }
};

module.exports = { saveLog };
