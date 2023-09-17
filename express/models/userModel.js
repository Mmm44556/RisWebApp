const conn = require('../mysql');
conn.connect();
class usersModel {
  constructor() {
    this.user = {}

  }

  getUser(LoginUser) {
    return new Promise((resolve, reject) => {
      conn.query(`select \`user_name\`,\`user_mail\`,\`user_password\` from user
        where user_mail= ?`, [`${LoginUser.email}`], (err, row, filed) => {
        if (err) {
          this.user = { ...LoginUser, state: '403',msg:'user not found' }
          reject(this.user)
          return
        };

        if ((LoginUser.email !== row[0].user_mail)) {
          this.user = { ...LoginUser, state: '403', msg: 'email not found' }
          reject(this.user)
          return
          
        } else if (LoginUser.password !== row[0].user_password) {
          this.user = { ...LoginUser, state: '403', msg: 'password error' }
          reject(this.user)
          return
        } else {
          this.user = {...LoginUser,state:'200',msg:'success'}
          resolve(this.user)
          return
        }
      })
    })

  }

}

module.exports =new usersModel();