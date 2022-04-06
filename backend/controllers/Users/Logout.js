const asynHandler = require("../../middleware/async");
exports.SingOut = asynHandler(async (req, res, next) => {
  res.cookie("sauth", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ success: true, message: "Logged out successfully" });
});
