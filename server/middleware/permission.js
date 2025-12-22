const User = require("../model/userModel");
const { saveLog } = require("../utils");
module.exports = async (req, res, next) => {
  if (req.user.userType !== "admin") {
    saveLog(req.method, req.originalUrl, 403, req.user?.email);
    return res.status(403).json({
      message: "User don't have permissions to perform this action",
    });
  }
  next();
};
