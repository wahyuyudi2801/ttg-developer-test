const mysql = require("mysql2/promise");

async function connectDB() {
  const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_ttg_test",
  });
  return db;
}

module.exports = connectDB;