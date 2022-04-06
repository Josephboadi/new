const pool = require("../../config/db");

let swiftdb = {};

swiftdb.all = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM settings_company", (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

swiftdb.SetupCompany = (postData = req.body) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO settings_company SET ?",
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

swiftdb.UpdateCompany = (postdata, idsettings_company) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE settings_company SET ? WHERE idsettings_company  = ?",
      [postdata, idsettings_company],
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
