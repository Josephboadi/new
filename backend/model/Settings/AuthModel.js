const pool = require("../config/db");

let swiftdb = {};

swiftdb.all = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM settings_auth_type", (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

swiftdb.SetupAuthType = (postData = req.body) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO settings_auth_type SET ?",
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

swiftdb.UpdateAuthTypeSettings = (email) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE settings_auth_type SET ?  WHERE email = ?",
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
