const pool = require("../../config/db");

let swiftdb = {};

swiftdb.all = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM settings_auth_ldap", (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

swiftdb.SetupLdap = (postData = req.body) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO settings_auth_ldap SET ?",
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

swiftdb.FindDomain = (ldap_domain) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT ldap_domain FROM settings_auth_ldap WHERE ldap_domain = ?";
    pool.query(sql, [ldap_domain], function (error, results, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(results[0]);
    });
  });
};

swiftdb.FinEnabledLdap = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM settings_auth_ldap WHERE enabled = 1";
    pool.query(sql, function (error, results, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(results[0]);
    });
  });
};

swiftdb.UpdateLdap = (postdata, idsettings_auth_LDAP) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE settings_auth_ldap SET ? WHERE idsettings_auth_LDAP   = ?",
      [postdata, idsettings_auth_LDAP],
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
