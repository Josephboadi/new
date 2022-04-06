const pool = require("../../config/db");

let swiftdb = {};

swiftdb.all = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM systemprofile WHERE deletedAt IS NULL AND status = 1", (err, results) => {
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
      "INSERT INTO systemprofile SET ?",
      [postData],
      (err, results) => {
        if (err) {
          return reject(err);
        }

        return resolve(results);
      }
    );
  });
};

swiftdb.update = (postdata, idprofile) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE systemprofile SET ? WHERE id = ?",
      [postdata, idprofile],
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
    const sql = "SELECT * FROM systemprofile WHERE deletedAt IS NULL AND status = 1 AND id = ?";
    pool.query(sql, [id], function (error, results, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(results[0]);
    });
  });
};
module.exports = swiftdb;
