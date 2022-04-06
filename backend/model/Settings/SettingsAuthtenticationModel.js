const pool = require("../config/db");

let swiftdb = {};

swiftdb.all = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM settings_authentication", (err, results) => {
      if (err) {
        return reject(err);
      }

      return resolve(results);
    });
  });
};

swiftdb.SetupAuthentication = (postData = req.body) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO settings_authentication SET ?",
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

swiftdb.UpdateAuthenticationSettings = (email) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE settings_authentication SET ?  WHERE email = ?",
      [email],
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
