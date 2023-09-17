const mysql = require('mysql');

const conn = mysql.createConnection(
  {
    user: 'root',
    password: '',
    host: 'localhost',
    database: 'ris',
    port: '3307'
  }
)

module.exports = conn;