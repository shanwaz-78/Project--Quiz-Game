const mysql = require("mysql2");
const conn = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "portfolio",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = conn;
