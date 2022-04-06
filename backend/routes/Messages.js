const express = require("express");

const router = express.Router();

const {
CreateMessage,
CreateHeaders,
SaveMessage,
GetMessages
} = require("../controllers/Messages/mtype");

// validation

//routes
router.route("/newmessage").post(CreateMessage);
router.route("/savemessage").post(SaveMessage);
router.route("/getmessages").post(GetMessages);
router.route("/newheader").post(CreateHeaders);

module.exports = router;
