const pool = require("../../config/db");

let swiftdb = {};

swiftdb.all = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM message_type", (err, results) => {
      if (err) {
        return reject(err);
      }

      return resolve(results);
    });
  });
};

swiftdb.SetupMessageType = (postData = req.body) => {
  return new Promise((resolve, reject) => {
    pool.query("INSERT INTO message_type SET ?", [postData], (err, results) => {
      if (err) {
        throw err;
      }

      return resolve(results);
    });
  });
};

swiftdb.UpdateMessageType = (postdata, idMsgType) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE message_type SET ? WHERE idMsgType = ?",
      [postdata, idMsgType],
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
