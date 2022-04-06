const pool = require("../../config/db");

let swiftdb = {};

swiftdb.all = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM message_flow", (err, results) => {
      if (err) {
        return reject(err);
      }

      return resolve(results);
    });
  });
};

swiftdb.SetupMessageFlow = (postData = req.body) => {
  return new Promise((resolve, reject) => {
    pool.query("INSERT INTO message_flow SET ?", [postData], (err, results) => {
      if (err) {
        throw err;
      }

      return resolve(results);
    });
  });
};

swiftdb.UpdateMessageFlow = (postdata, idFlow) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE message_flow SET ? WHERE idFlow = ?",
      [postdata, idFlow],
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
