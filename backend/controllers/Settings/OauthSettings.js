const Oauth = require("../../model/Settings/oAuthModel");
const asynHandler = require("../../middleware/async");
const ErrorResponse = require("../../utls/errorResponse");
exports.CreateOAuth = async (req, res, next) => {
  const { oauthurl, apikey, secret, redirect_uri, enabled } = req.body;

  /**
   ** Check Duplicate Email
   **/
  const newOauth = {
    oauth_url: oauthurl,
    oauth_api_key: apikey,
    oauth_api_secret: secret,
    oauth_redirect_url: redirect_uri,
    enabled: enabled,
  };
  let results = await Oauth.all();

  if (results.length < 1) {
    const client = await Oauth.SetupOauth(newOauth);
    if (client.affectedRows === 1) {
      return res.status(200).json({
        success: true,
        message: `Oauth Setup Successfully`,
      });
    } else {
      res.status(200).json({
        success: false,
        message:
          "Sorry we could not register this app for oauth, please try again",
      });
    }
  }

  return res.status(400).json({
    success: false,
    message: `You have an Existing Oauth In The System`,
  });
};

exports.GetOauth = asynHandler(async (req, res, next) => {
  let results = await Oauth.all();
  if (results.length == 0) {
    return res.status(401).json({
      success: false,
      message: "Sorry, No Record Found",
    });
  }
  res.json(results);
});

exports.updateOauth = asynHandler(async (req, res, next) => {
  let id = req.body.id;
  const newData = {
    oauth_url: req.body.url,
    oauth_api_key: req.body.apikey,
    oauth_api_secret: req.body.secret,
    oauth_redirect_url: req.body.redirect_uri,
    enabled: req.body.enabled,
  };
  let result = await Oauth.UpdateOauthSettings(newData, id);

  if (result.affectedRows === 1) {
    res.status(200).json({
      success: true,
      message: `Record Updated`,
    });
  } else {
    res.status(401).json({ success: false, message: "Error Updating Record" });
  }
});
