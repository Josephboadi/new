const express = require("express");

const router = express.Router();

const {
  CreateUser,
  GetAllUsers,
  updateSystemUser,
  GetRoles,
  GetStatus,
  SingleUser,
  RemoveUser,
} = require("../controllers/Users/User");
const { AuthUser } = require("../controllers/Users/Authenticate");
const { GetAuthUser } = require("../controllers/Users/GetAuthUser");
const { SingOut } = require("../controllers/Users/Logout");

// validation
const {
  userSignup,
  userSignIn,
  userUpdate,
} = require("../middleware/user.schema");

//guards for fetchme
const { protect } = require("../middleware/guard");

//routes
router.route("/create").post(userSignup, CreateUser);
router.route("/auth").post(userSignIn, AuthUser);
router.route("/find").post(SingleUser);
router.route("/fetchme").post(
  // protect,
  GetAuthUser
);
router.route("/fetchallusers").post(
  // protect,
  GetAllUsers
);
router.route("/fetchroles").post(
  // protect,
  GetRoles
);
router.route("/fetchstatus").post(
  // protect,
  GetStatus
);
router.route("/updateuser").post(
  // protect,
  userUpdate,
  updateSystemUser
);
router.route("/logout").post(SingOut);
router.route("/remove").post(RemoveUser);

module.exports = router;
