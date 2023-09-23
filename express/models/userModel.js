const conn = require('../mysql');
conn.connect();
class usersModel {
  constructor() {
    this.user = {}

  }

  getUser(LoginUser) {
    return new Promise((resolve, reject) => {
      //查詢用戶登入是否存在
      conn.query(`SELECT \`user_id\`,\`user_name\`,\`user_mail\`,\`user_password\`,\`user_password\`,\`user_sex\`,\`user_age\` FROM user
        WHERE user_mail=?`, [`${LoginUser.email}`], (err, row) => {
        if (err) {
        
          this.user = {state: '403',msg:'SQL syntax error' }
          reject(this.user)
          return
        };
        if(!row.length){
          this.user = { state: '403', msg: 'user not found' }
          reject(this.user)
          return
        }
         if (LoginUser.password !== row[0].user_password) {
          this.user = {  state: '403', msg: 'password error' }
          reject(this.user)
          return
        } else {
           this.user = { ...row[0],state:'200',msg:'success'}
          resolve(this.user)
          return
        }
      })
    })

  }

  setSession(userInfo,sessionID){
    //更新用戶sessionID
    conn.query(`UPDATE sessions SET sid='${sessionID}',data='${JSON.stringify(userInfo)}' WHERE user_id=?`, [`${userInfo.user_id}`])
  }
  getSession(sid){
    //獲取用戶的sessionID數據
    return new Promise((resolve,reject)=>{
      conn.query(`SELECT data FROM sessions WHERE sid='${sid}'`,(err,row)=>{
        if (!row.length) {
          this.user = { state: '403', msg: 'user not found' }
          reject(this.user)
          return
        }
        this.user = {...row[0]}; 
        resolve(this.user)
        return
      })
    })
    
  }

}

module.exports =new usersModel();