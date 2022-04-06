const pool = require("../../config/db");

let swiftdb = {};

swiftdb.all = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM settings_auth_oauth", (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

swiftdb.SetupOauth = (postData = req.body) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO settings_auth_oauth SET ?",
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

swiftdb.UpdateOauthSettings = (postdata, idsettings_auth_oauth) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE settings_auth_oauth SET ? WHERE idsettings_auth_oauth   = ?",
      [postdata, idsettings_auth_oauth],
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
