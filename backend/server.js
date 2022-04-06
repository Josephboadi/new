const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");

const users = require("./routes/User");
const settings = require("./routes/Settings");
const msg = require("./routes/Messages");

//load env vars
dotenv.config({ path: "./config/config.env" });
//initialise express
const app = express();

//body parser
app.use(express.json());

app.use(fileupload());
//cookie parser
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
//Mount routes
app.use("/swiftapp/v1/users", users);
app.use("/swiftapp/v1/settings", settings);
app.use("/swiftapp/v1/msg", msg);

app.use(errorHandler);

//errror middleware
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
//create port
const PORT = process.env.PORT || 9000;
//listen to portnpm
app.listen(PORT, () => {
  console.log(
    `Swift App: Running in ${process.env.NODE_ENV} mode and listening on port http://:${PORT}`
  );
});
// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  // server.close(() => process.exit(1));
});
