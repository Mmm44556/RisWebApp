const mysql = require('mysql');


const conn = mysql.createPool(
  {
    connectionLimit :10,
    user: 'root',
    password: '',
    host: 'localhost',
    database: 'ris',
    port: 3307
  }
)

module.exports = conn;