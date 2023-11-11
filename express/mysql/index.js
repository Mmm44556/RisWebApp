const mysql = require('mysql');


const conn = mysql.createConnection(
  {
    user: 'root',
    password: '',
    host: 'localhost',
    database: 'ris',
    port: 3307
  }
)

/**
 * 創建資料庫實例
 */
class MySQLConnection {
  constructor(db) {
    this.conn = db;
  }
}
const dbConn = new MySQLConnection(conn);


module.exports = dbConn ;