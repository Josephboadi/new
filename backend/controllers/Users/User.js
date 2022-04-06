const USERS = require("../../model/User/UserModel");
const bcyrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
var suid = require("rand-token").suid;
var unix = Math.round(+new Date() / 1000);
const asynHandler = require("../../middleware/async");

exports.CreateUser = asynHandler(async (req, res, next) => {
  const { fullname, phone, email, password, username } = req.body;
  const uuid = suid(16);
  const finaluuid = uuid + unix;

  try {
    /**
     ** Check Duplicate Email
     **/
    const newUser = {
      fullname,
      phone,
      email,
      password,
      username,
      uid: finaluuid,
      acl_role: 16,
      status: 1,
      authtype: 4,
    };
    let results = await USERS.FindEmail(email);
    if (results) {
      return res.status(400).json({
        success: false,
        message: `Email Already exist`,
      });
    }

    /**
     ** Check Duplicate Username
     **/

    let resultT = await USERS.FindUsername(username);
    if (resultT) {
      return res.status(400).json({
        success: false,
        message: `Username  Already exist`,
      });
    }

    let checkPhone = await USERS.FindPhone(phone);
    if (checkPhone) {
      return res.status(400).json({
        success: false,
        message: `Phone Number Already exist`,
      });
    }

    user = req.body;

    /**
     ** Encrypt Password
     **/

    const salt = await bcyrpt.genSalt(10);
    newUser.password = await bcyrpt.hash(password, salt);

    /**
     *
     * Now you can create users
     * * */
    const users = await USERS.SetupUser(newUser);
    if (users.affectedRows === 1) {
      return res.status(200).json({
        success: true,
        message: `User Created Successfully`,
      });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Error Setting Up User" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

exports.GetAllUsers = asynHandler(async (req, res, next) => {
  let results = await USERS.GetAllUser();
  if (results.length == 0) {
    return res.status(401).json({
      success: false,
      message: "Sorry, Failed To Retrieve Data",
    });
  }
  res.json(results);
});

exports.GetRoles = asynHandler(async (req, res, next) => {
  let results = await USERS.ViewRoles();
  if (results.length == 0) {
    return res.status(401).json({
      success: false,
      message: "Sorry, Failed To Retrieve Data",
    });
  }
  res.json(results);
});

exports.GetStatus = asynHandler(async (req, res, next) => {
  let results = await USERS.ViewStatus();
  if (results.length == 0) {
    return res.status(401).json({
      success: false,
      message: "Sorry, Failed To Retrieve Data",
    });
  }
  res.json(results);
});
exports.updateSystemUser = asynHandler(async (req, res, next) => {
  let id = req.body.username;
  const newData = {
    fullname: req.body.fullname,
    phone: req.body.phone,
    email: req.body.email,
    acl_role: req.body.acl_role,
    status: req.body.status,
  };
  let result = await USERS.UpdateUser(newData, id);

  if (result.affectedRows === 1) {
    res.status(200).json({
      success: true,
      message: `Record Updated`,
    });
  } else {
    res.status(401).json({ success: false, message: "Error Updating Record" });
  }
});

exports.SingleUser = asynHandler(async (req, res, next) => {
  let email = req.body.email;
  let dbresult = await USERS.SingleUser(email);

  if (dbresult.length < 1) {
    return res.status(200).json({
      Status: 0,
      Data: [],
      Message: `No record found`,
    });
  }

  res.json({
    Status: 1,
    Message: "Record Found",
    Data: dbresult,
  });
});

exports.RemoveUser = asynHandler(async (req, res, next) => {
  let id = req.body.id;

  const newData = {
    status: 0,
    deletedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
  };
  if (!id) {
    return res.status(400).json({
      Status: 0,
      Message: `Please provide an id`,
    });
  }
  let result = await USERS.UpdateUser(newData, id);

  if (result.affectedRows === 1) {
    res.status(200).json({
      Status: 1,
      Message: `Record Deleted`,
    });
  } else {
    res.status(500).json({ Status: 0, Message: "Error Removing Record" });
  }
});
