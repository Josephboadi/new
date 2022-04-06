const pool = require("../../config/db");

let swiftdb = {};

swiftdb.all = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM smsgateway WHERE deletedAt IS NULL",
      (err, results) => {
        if (err) {
          return reject(err);
        }

        return resolve(results);
      }
    );
  });
};

swiftdb.allActive = () => {
    return new Promise((resolve, reject) => {
      pool.query(
        "SELECT * FROM smsgateway WHERE deletedAt IS NULL AND status = 1",
        (err, results) => {
          if (err) {
            return reject(err);
          }
  
          return resolve(results);
        }
      );
    });
  };

swiftdb.create = (postData = req.body) => {
  return new Promise((resolve, reject) => {
    pool.query("INSERT INTO smsgateway SET ?", [postData], (err, results) => {
      if (err) {
        return reject(err);
      }

      return resolve(results);
    });
  });
};

swiftdb.update = (postdata, id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE smsgateway SET ? WHERE id = ?",
      [postdata, id],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

swiftdb.updateAll = () => {
  return new Promise((resolve, reject) => {
    pool.query("UPDATE smsgateway SET status = 0", (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

swiftdb.find = (id) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT * FROM smsgateway WHERE deletedAt IS NULL AND status = 1";
    pool.query(sql, [id], function (error, results, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(results[0]);
    });
  });
};
module.exports = swiftdb;
