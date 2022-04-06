const express = require("express");

const router = express.Router();

const {
  CreateEmail,
  GetEmail,
  updateEmail,
} = require("../controllers/Settings/SetupEmail");

const { CreateTokens } = require("../controllers/Settings/SystemTokens");

const {
  CreatePath,
  SinglePath,
  updatePath,
  GetPath,
} = require("../controllers/Settings/SetupPath");
const {
  CreateCompany,
  GetCompany,
  updateCompany,
} = require("../controllers/Settings/SetupCompanynologo");

const {
  CreateLdap,
  GetLdap,
  updateLdapSettings,
} = require("../controllers/Settings/SetupLdap");
const {
  CreateOAuth,
  GetOauth,
  updateOauth,
} = require("../controllers/Settings/OauthSettings");

const {
  CreateProfile,
  GetProfiles,
  SingleProfile,
  updateProfile,
  RemoveProfile,
} = require("../controllers/Settings/alertProfile");

const {
  CreateGateway,
  GetGateways,
  SingleGateway,
  RemoveSmsGateway,
  ActiveGateway,
  updateGateways,
} = require("../controllers/Settings/SetupSmsGateway");

//schema
const {
  emailSettings,
  companySettings,
  OauthSettings,
  updatemailSettings,
  updatecompanySettings,
  updateOauthSettings,
  ldapSettings,
  updateldapConfig,
  Path,
  AlertProfile,
} = require("../middleware/user.schema");

// protect middleware
const { protect, authorisRole, authToken } = require("../middleware/guard");
const { updateldap } = require("../validation/swiftuser.schema");

//routes
router.route("/createsmtp").post(
  // emailSettings,
  CreateEmail
);
router.route("/updatesmtp").post(
  // updatemailSettings,
  updateEmail
);
router.route("/getsmtp").post(GetEmail);
router.route("/createcompany").post(
  // companySettings,
  CreateCompany
);
router.route("/updatecompany").post(
  // updatecompanySettings,
  updateCompany
);
router.route("/getcompany").post(
  // authToken,
  GetCompany
);

// oauth routes
router.route("/createoath").post(
  // OauthSettings,
  CreateOAuth
);
router.route("/updateoath").post(
  // updateOauthSettings,
  updateOauth
);
router.route("/getoath").post(GetOauth);

// ldap routes

router.route("/createldap").post(
  // ldapSettings,
  CreateLdap
);
router.route("/updateldap").post(
  // updateldapConfig,
  updateLdapSettings
);
router.route("/getldap").post(GetLdap);

//alertprofile
router.route("/createprofile").post(
  // AlertProfile,
  CreateProfile
);
router.route("/allprofile").post(GetProfiles);
router.route("/singleprofile").post(SingleProfile);
router.route("/removeprofile").post(RemoveProfile);
router.route("/updateprofile").post(
  // AlertProfile,
  updateProfile
);

//path settings
router.route("/createpath").post(
  // Path,
  CreatePath
);
router.route("/allpaths").post(GetPath);
router.route("/singlepaths").post(SinglePath);
router.route("/updatepath").post(
  // Path,
  updatePath
);
router.route("/token").post(CreateTokens);

//smsgateway settings
router.route("/createsmsgateway").post(CreateGateway);
router.route("/allsmsgateway").post(GetGateways);
router.route("/allactivegateway").post(ActiveGateway);
router.route("/findsmsgateway").post(SingleGateway);
router.route("/updatesmsgateway").post(updateGateways);
router.route("/removesmsgateway").post(RemoveSmsGateway);

module.exports = router;
