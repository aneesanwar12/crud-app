const User = require("../model/userModel");
const { saveLog } = require("../utils");
module.exports = async (req, res, next) => {
  console.log(req.user);
  // const user = await User.findOne({ email: req.user.email });
  if (req.user.permission !== "edit") {
    saveLog(req.method, req.originalUrl, 403, req.user?.email);
    return res.status(403).json({
      message: "User don't have permissions to perform this action",
    });
  }
  next();
};
