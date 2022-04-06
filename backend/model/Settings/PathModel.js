const pool = require("../../config/db");

let swiftdb = {};

swiftdb.all = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM settings_paths", (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

swiftdb.create = (postData = req.body) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO settings_paths SET ?",
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

swiftdb.update = (postdata, idsettings_paths) => {
  return new Promise((resolve, reject) => {
    pool.query("UPDATE settings_paths SET ? WHERE  idsettings_paths = ?",[postdata, idsettings_paths],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

swiftdb.find = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM settings_paths WHERE idsettings_paths = ?";
    pool.query(sql, [id], function (error, results, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(results[0]);
    });
  });
};
module.exports = swiftdb;
