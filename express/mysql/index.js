const mysql = require('mysql');


const conn = mysql.createPool(
  {
    connectionLimit: 10,
    user: 'root',
    password: '',
    host: '104.199.189.119',
    database: 'ris',
    port: 3306
  }
)

module.exports = conn;