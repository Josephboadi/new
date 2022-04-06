const pool = require("../../config/db")

let swiftdb = {}
// ,cdatetime DATETIME,createdAt TIMESTAMP CURRENT_TIMESTAMP
swiftdb.CreateMessage = (message) => {
  return new Promise((resolve, reject) => {
    const sql =
      "CREATE TABLE ?? (id INT AUTO_INCREMENT PRIMARY KEY, docname VARCHAR(255), dir VARCHAR(255) NOT NULL,sender VARCHAR(255) NOT NULL,reciever VARCHAR(255) NOT NULL,jsondata LONGTEXT NOT NULL,cdatetime DATETIME,createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP)"
    pool.query(sql, [message], function (error, results, fields) {
      if (error) {
        return reject(error)
      }

      return resolve({ results: true })
    })
  })
}

swiftdb.msgRecord = (postData = req.body) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO message_record  SET ?",
      [postData],
      (err, results) => {
        if (err) {
          return reject(error)
        }

        return resolve(results)
      }
    )
  })
}

swiftdb.msgHeaders = (postData = req.body) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO message_headers  SET ?",
      [postData],
      (err, results) => {
        if (err) {
          return reject(err)
        }

        return resolve(results)
      }
    )
  })
}

swiftdb.DynamicMsg = (table, postData = req.body) => {
  return new Promise((resolve, reject) => {
    pool.query("INSERT INTO ??  SET ?", [table, postData], (err, results) => {
      if (err) {
        return reject(err)
      }

      return resolve(results)
    })
  })
}

swiftdb.MessageTypeRecords = (message_type) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT message_type FROM message_record WHERE message_type = ?"
    pool.query(sql, [message_type], function (error, results, fields) {
      if (error) {
        return reject(error)
      }
      return resolve(results[0])
    })
  })
}

swiftdb.GetMessages = (message_type) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM ??"
    pool.query(sql, [message_type], function (error, results, fields) {
      if (error) {
        return reject(error)
      }
      return resolve(results)
    })
  })
}

swiftdb.GetHeaders = (message_type) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT jsondata  FROM message_headers WHERE messagetype = ?"
    pool.query(sql, [message_type], function (error, results, fields) {
      if (error) {
        return reject(error)
      }
      return resolve(results[0])
    })
  })
}
module.exports = swiftdb
