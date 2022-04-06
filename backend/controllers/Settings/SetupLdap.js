const LdapModel = require("../../model/Settings/LdapSettings");
const asynHandler = require("../../middleware/async");
const ErrorResponse = require("../../utls/errorResponse");
exports.CreateLdap = asynHandler(async (req, res, next) => {
  const { ldap_user, ldap_url, ldap_password, ldap_domain, enabled } = req.body;

  /**
   ** Check Duplicate Ldap Settings
   **/
  const Ldap = {
    ldap_user,
    ldap_url,
    ldap_password,
    ldap_domain,
    enabled,
  };
  let results = await LdapModel.all();

  if (results.length < 1) {
    const client = await LdapModel.SetupLdap(Ldap);
    if (client.affectedRows === 1) {
      return res.status(200).json({
        success: true,
        message: `Great, You Created an Ldap Successfully`,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Sorry we could not register this new ldap, please try again",
      });
    }
  }

  return res.status(401).json({
    success: false,
    message: `You have an ldap In The System`,
  });
});

exports.GetLdap = asynHandler(async (req, res, next) => {
  let results = await LdapModel.all();
  if (results.length == 0) {
    return res.status(401).json({
      success: false,
      message: "Sorry, Failed To Retrieve Data",
    });
  }
  res.json(results);
});

exports.updateLdapSettings = asynHandler(async (req, res, next) => {
  console.log(req.body);
  let id = req.body.id;
  const newData = {
    ldap_user: req.body.ldap_user,
    ldap_url: req.body.ldap_url,
    ldap_password: req.body.ldap_password,
    ldap_domain: req.body.ldap_domain,
    enabled: req.body.enabled,
  };
  let result = await LdapModel.UpdateLdap(newData, id);

  if (result.affectedRows === 1) {
    res.status(200).json({
      success: true,
      message: `Record Updated`,
    });
  } else {
    res.status(401).json({ success: false, message: "Error Updating Record" });
  }
});
