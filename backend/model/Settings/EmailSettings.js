const pool = require("../../config/db");

let swiftdb = {};

swiftdb.all = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM settings_email", (err, results) => {
      if (err) {
        return reject(err);
      }

      return resolve(results);
    });
  });
};

swiftdb.SetupEmail = (postData = req.body) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO settings_email SET ?",
      [postData],
      (err, results) => {
        if (err) {
          throw err;
        }

        return resolve(results);
      }
    );
  });
};

swiftdb.UpdateEmailSettings = (postdata, idsettings_sms) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE settings_email SET ? WHERE idsettings_sms  = ?",
      [postdata, idsettings_sms],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};
module.exports = swiftdb;
