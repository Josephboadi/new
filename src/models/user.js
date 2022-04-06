const Sequelize = require("sequelize");
const dotenv = require("dotenv");
var bcrypt = require("bcrypt");
dotenv.config({ path: "../config/config.env" });

// const sequelize = new Sequelize(
//   process.env.DB_DATABASE,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     port: process.env.PORT,
//     dialect: 'mysql',
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000,
//     },
//     operatorsAliases: false,
//   }
// );

const sequelize = new Sequelize("myswiftalert", "root", "", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  operatorsAliases: false,
});

// set up User table
var User = sequelize.define("users", {
  idsys_users: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  fullname: {
    type: Sequelize.STRING,
    // unique: true,
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING,
    // unique: true,
    allowNull: false,
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
    default: null,
    allowNull: false,
  },
  uid: {
    type: Sequelize.STRING,
    // unique: true,
    default: null,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    default: null,
    allowNull: false,
  },
  acl_role: {
    type: Sequelize.INTEGER,
    default: null,
    allowNull: false,
  },
  authtype: {
    type: Sequelize.INTEGER,
    // unique: true,
    allowNull: false,
  },
  status: {
    type: Sequelize.INTEGER,
    default: null,
    // unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    default: null,
    allowNull: false,
  },
});

User.beforeCreate((user, options) => {
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(user.password, salt);
});

User.prototype.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

// create all defined tables in the specified database
sequelize
  .sync()
  .then(() =>
    console.log(
      "user tables has been successfully created if one does not exist"
    )
  )
  .catch((error) => console.log("This error occurred", error));

// export User module for other files
module.exports = User;
