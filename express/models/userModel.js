const conn = require('../mysql');
conn.connect();
class usersModel {
  constructor() {
    this.user = {}

  }

  getUser(LoginUser) {
    return new Promise((resolve, reject) => {
      //查詢用戶登入是否存在
      conn.query(`SELECT user.\`user_id\`,\`user_name\`,\`user_mail\`,\`user_phone\`,\`user_password\`,\`user_sex\`,\`user_age\`,\`user_register_time\`,\`position_name\`,\`department_name\`,\`role_uid\` FROM user JOIN role ON user.user_id=role.user_id JOIN departments_position ON user.position_id = departments_position.position_id
      JOIN departments ON departments_position.department_id = departments.department_id WHERE user.user_name=?`, [LoginUser.name], (err, row) => {
        if (err) {
          this.user = { state: 403, msg: 'SQL syntax error' }
          reject(this.user)
          return
        };
        if (!row.length) {
          this.user = { state: 403, msg: 'user not found' }
          reject(this.user)
          return
        }
        if (LoginUser.password !== row[0].user_password) {
          this.user = { state: 403, msg: 'password error' }
          reject(this.user)
          return
        } else {
          this.user = { ...row[0], state: 200, msg: 'success' }
          resolve(this.user)
          return
        }
      })
    })

  }
  setUser(RegUser) {
    // 註冊新用戶
    return new Promise((resolve, reject) => {
      const { name, department, age, confirmPassword, email, gender, phone } = RegUser;
      conn.query(`INSERT INTO user(\`user_name\`,\`position_id\`,\`user_mail\`,\`user_password\`,\`user_phone\`,\`user_sex\`,\`user_age\`) VALUES(?,?,?,?,?,?,?)`, [name, department, email, confirmPassword, phone, gender, age], (err) => {
        if (err) {
          if (/name/i.test(err.sqlMessage)) {
            this.user = { state: 409, msg: '名稱已被註冊過' }
            reject(this.user)
            return
          } else if (/mail/i.test(err.sqlMessage)) {
            this.user = { state: 409, msg: '信箱已被註冊過' }
            reject(this.user)
            return
          } else if (/phone/i.test(err.sqlMessage)) {
            this.user = { state: 409, msg: '電話已被註冊過' }
            reject(this.user)
            return
          }
        }
        this.user = { state: 200, msg: 'success' }
        resolve(this.user)
        return
      })
    })

  }

  setSession(userInfo, sessionID, formattedDateTime) {
    //更新用戶sessionID
    conn.query(`UPDATE sessions SET sid='${sessionID}',data='${JSON.stringify(userInfo)}',created_at='${formattedDateTime}' WHERE user_id=?`, [`${userInfo.user_id}`])
  }

  getSession(sid) {
    //獲取用戶的sessionID數據
    return new Promise((resolve, reject) => {
      conn.query(`SELECT data FROM sessions WHERE sid='${sid}'`, (err, row) => {
        if (!row.length) {
          this.user = { state: '403', msg: 'user not found' }
          reject(this.user)
          return
        }

        this.user = { ...row[0] };
        resolve(this.user)
        return
      })
    })

  }

}

module.exports = new usersModel();