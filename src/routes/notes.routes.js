const { Router } = require("express")

const {
  renderNotes,
  // showForm,
  showCompany,
  showAuthentication,
  showPath,
  showNotification,
  showUsers,
  showUserDetail,
  showMyDetail,
  showAddAlertProfileDetail,
  showAddAlertProfiles,
  showSwiftMessages,
  addUser,
  updateCompany,
  updateOauth,
  updateLdap,
  updateNotification,
  showPaths,
  addPath,
  updatePath,
  addAlert,
  updateAlert,
  showSmsgateways,
  showSmsgateway,
  addSmsgateway,
  signinUser,
  showLogin,
  updateSmsgateway,
  signoutUser,
  showSwiftMessageList,
  showSwiftMessagePreview,
  //   login,
} = require("../controllers/notes.controller")
const { authenticate } = require("../middleware/bounce")

const router = Router()

router.get("/signin", showLogin)
router.post("/login", signinUser)
router.post("/logout", signoutUser)

router.get("/dashboard", authenticate, renderNotes)

router.get("/settings/company", authenticate, showCompany)
router.post("/settings/updatecompany", authenticate, updateCompany)

router.get("/settings/auth", authenticate, showAuthentication)
router.post("/settings/updateoauth", authenticate, updateOauth)
router.post("/settings/updateldap", authenticate, updateLdap)

router.get("/settings/paths", authenticate, showPaths)
router.get("/settings/path/:id", authenticate, showPath)
router.post("/settings/addpath", authenticate, addPath)
router.post("/settings/updatepath", authenticate, updatePath)

router.get("/settings/smsgateways", authenticate, showSmsgateways)
router.get("/settings/smsgateway/:id", authenticate, showSmsgateway)
router.post("/settings/addsmsgateway", authenticate, addSmsgateway)
router.post("/settings/updatesmsgateway", authenticate, updateSmsgateway)

router.get("/settings/notification", authenticate, showNotification)
router.post("/settings/updatenotification", authenticate, updateNotification)

router.get("/users/users", authenticate, showUsers)
router.get("/user/detail", authenticate, showMyDetail)
router.get("/user/userdetail/:email", authenticate, showUserDetail)
router.post("/user/adduser", authenticate, addUser)

router.get("/alert/profiles", authenticate, showAddAlertProfiles)
router.get(
  "/alert/profiledetail/:email",
  authenticate,
  showAddAlertProfileDetail
)
router.post("/alert/addalert", authenticate, addAlert)
router.post("/alert/updatealert", authenticate, updateAlert)

router.get("/swift/messages", authenticate, showSwiftMessages)
router.get("/swift/showmessage/:msg", authenticate, showSwiftMessageList)
router.get("/swift/messagepreview", authenticate, showSwiftMessagePreview)

module.exports = router
