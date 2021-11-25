const Sequelize = require("sequelize");
require("dotenv").config();

const database = process.env.SQL_DATABASE_NAME;
const username = process.env.SQL_USERNAME;
const password = process.env.SQL_PASSWORD;

const sequelize = new Sequelize(database, username, password, {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
