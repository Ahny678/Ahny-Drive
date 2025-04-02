require("dotenv").config();
const { Sequelize } = require("sequelize");
const { Pool } = require("pg");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: (msg) => console.log(msg),
  }
);

//PG POOL FOR SESSION CONFIG SINCE WE CANT USE SEQELEIZE BUT ONLY THE PG CLIENT DIRECTLY

const pgPool = new Pool({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

module.exports = { sequelize, pgPool };
