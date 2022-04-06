const pool = require("../../config/db");

let swiftdb = {};

swiftdb.all = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM users", (err, results) => {
      if (err) {
        return reject(err);
      }
      var rec = JSON.parse(JSON.stringify(results));

      return resolve(results);
    });
  });
};

swiftdb.FindEmail = (email) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT email FROM users WHERE email = ?";
    pool.query(sql, [email], function (error, results, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(results[0]);
    });
  });
};

swiftdb.FindPhone = (phone) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT phone FROM users WHERE phone = ?";
    pool.query(sql, [phone], function (error, results, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(results[0]);
    });
  });
};

swiftdb.FindUsername = (username) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT username FROM users WHERE username = ?";
    pool.query(sql, [username], function (error, results, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(results[0]);
    });
  });
};

swiftdb.SetupUser = (postData = req.body) => {
  return new Promise((resolve, reject) => {
    pool.query("INSERT INTO users SET ?", [postData], (err, results) => {
      if (err) {
        throw err;
      }

      return resolve(results);
    });
  });
};

swiftdb.ActivateUser = (active, status, email) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE users SET active= ? status = ?  WHERE email = ?",
      [active, status, email],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

swiftdb.Authenticate = (username) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT username,password FROM users WHERE username = ? AND status = 1";
    pool.query(sql, [username], function (error, results, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(results[0]);
    });
  });
};

swiftdb.AuthenticateEmail = (email) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT email,password FROM users WHERE email = ? AND status = 1";
    pool.query(sql, [email], function (error, results, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(results[0]);
    });
  });
};

swiftdb.Token = () => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT issuer,audience,timetolive,token_name FROM settings_token";
    pool.query(sql, function (error, results, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(results[0]);
    });
  });
};

swiftdb.GetUser = (username) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT users.idsys_users , users.fullname,users.phone,users.email,users.email, users.username,sys_user_roles.name as role FROM users,sys_user_roles WHERE users.acl_role = sys_user_roles.code AND users.username = ?";
    pool.query(sql, [username], function (error, results, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(results[0]);
    });
  });
};

swiftdb.GetAllUser = () => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT users.idsys_users, users.fullname,users.phone, users.username, users.email,sys_user_roles.name as role FROM users,sys_user_roles WHERE users.acl_role = sys_user_roles.code";
    // WHERE deletedAt IS NULL AND status = 1";
    pool.query(sql, function (error, results, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
  });
};
// AND status = 1
swiftdb.SingleUser = (id) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT users.idsys_users, users.fullname,users.phone, users.username, users.email,sys_user_roles.name as role FROM users,sys_user_roles WHERE users.acl_role = sys_user_roles.code AND users.email = ? AND deletedAt IS NULL";
    pool.query(sql, [id], function (error, results, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
  });
};

swiftdb.UpdateUser = (postdata, username) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE users SET ? WHERE username = ?",
      [postdata, username],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

swiftdb.ViewRoles = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT name as label, code as value from sys_user_roles",
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};
swiftdb.ViewStatus = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM sys_users_status", (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

module.exports = swiftdb;
