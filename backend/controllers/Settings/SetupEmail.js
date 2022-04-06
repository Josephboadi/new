const EmailModel = require("../../model/Settings/EmailSettings");
const asynHandler = require("../../middleware/async");
const ErrorResponse = require("../../utls/errorResponse");
exports.CreateEmail = asynHandler(async (req, res, next) => {
  const { smtpHost, smtpPort, smtpTLS, smtpUser, smtpPass, smtpFrom, enabled } =
    req.body;

  /**
   ** Check Duplicate Email
   **/
  const Email = {
    smtpHost,
    smtpPort,
    smtpTLS,
    smtpUser,
    smtpPass,
    smtpFrom,
    enabled,
  };
  let results = await EmailModel.all();

  if (results.length < 1) {
    const client = await EmailModel.SetupEmail(Email);
    if (client.affectedRows === 1) {
      return res.status(200).json({
        success: true,
        message: `Great, You Created an Email Successfully`,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Sorry we could not register this new Email, please try again",
      });
    }
  }

  return res.status(401).json({
    success: false,
    message: `You have an Email In The System`,
  });
});

exports.GetEmail = asynHandler(async (req, res, next) => {
  let results = await EmailModel.all();
  if (results.length == 0) {
    return res.status(401).json({
      success: false,
      message: "Sorry, Failed To Retrieve Data",
    });
  }
  res.json(results);
});

exports.updateEmail = asynHandler(async (req, res, next) => {
  console.log(req.body);
  let id = req.body.id;
  const newData = {
    smtpHost: req.body.smtpHost,
    smtpPort: req.body.smtpPort,
    smtpTLS: req.body.smtpTLS,
    smtpUser: req.body.smtpUser,
    smtpPass: req.body.smtpPass,
    smtpFrom: req.body.smtpFrom,
    enabled: req.body.enabled,
  };
  let result = await EmailModel.UpdateEmailSettings(newData, id);

  if (result.affectedRows === 1) {
    res.status(200).json({
      success: true,
      message: `Record Updated`,
    });
  } else {
    res.status(401).json({ success: false, message: "Error Updating Record" });
  }
});
