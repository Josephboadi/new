const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { engine } = require("express-handlebars");
const path = require("path");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");
const morgan = require("morgan");
let axios = require("axios");
const User = require("./models/user");
const suid = require("rand-token").suid;
const unix = Math.round(+new Date() / 1000);
const passport = require("passport");

// const path = require('path');

// initialisation
const app = express();

// Settings
app.set("port", process.env.PORT || 4000);

// set morgan to log info about our requests for development use.
app.use(morgan("dev"));

// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.urlencoded({ extended: true }));

// initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.

app.use(
  session({
    key: "user_sid",
    secret: "somerandonstuffs",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
      httpOnly: true,
    },
  })
);

app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "main2",
    layoutsDir: __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/partials/",
  })
);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", ".hbs");

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.

// app.use((req, res, next) => {
//   if (req.cookies.user_sid && !req.session.user) {
//     res.clearCookie("user_sid");
//   }
//   next();
// });

// middleware function to check for logged-in users
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

let sessionChecker = (req, res, next) => {
  // console.log(req.session);
  if (req.session.user && !req.session.cookie._expires) {
    res.redirect("/dashboard");
  } else {
    next();
  }
};

// set flash messages to show
app.use(flash());

// Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

// Routes for Home-Page

app.get("/", sessionChecker, (req, res) => {
  // res.redirect("/dashboard");
  res.redirect("/signin");
});

app.use(require("./routes/notes.routes"));

app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
