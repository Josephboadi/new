const asynHandler = require("../../middleware/async");
exports.GetAuthUser = asynHandler(async (req, res, next) => {
  let currentUser = req.user;
  res.json(currentUser);
});
