/**
 * @import 用戶SQL語法查詢字串
 */
const userQuery = require('../sql_query/user.constant');

/**
 * @File 引入格式化函數
 */
const { formatDateTime } = require('../utils/formatting');

/**
* 註冊用戶
* @typedef {object} UserData
* @property {string} name 
* @property {string} department 
* @property {Number} age 
* @property {string} confirmPassword 
* @property {string} email 
* @property {string} gender 
* @property {Number} phone 
*/



/**
 * 
 * @interface IUserRepository
 */
class IUserRepository {
  /**
   * 獲取用戶資料
   * @param {string} username 
   * @param {string} sessionID 
   * @returns {Promise.<object>} 查詢用戶資料結果
   */
  async getUser(username, sessionID) {
  }

  /**
 * 註冊用戶
 *
 * @param {UserData} userData 用戶數據對象
 * @return {Promise.<object>} 返回註冊結果
 */
  async createUser(userData) {
  }
}


/**
 * 用戶資料庫
 * @extends IUserRepository
 */
class UserRepository extends IUserRepository {

  constructor(db) {
    super();
    this.conn = db;
  }


  getUser = async (username, session, sessionID) => {
    // 與資料庫交互取得使用者
    return new Promise((resolve, reject) => {
      //查詢用戶登入是否存在
      this.conn.connect();
      this.conn.query(userQuery.getUserData, [username], (err, row) => {

        if (err) {
          reject(err);
          this.conn.end();
        } else {
          //設置sessionID登入、過期時間
          let currentDate = new Date();
          let { formattedDate, formattedExpiresDate } = formatDateTime(currentDate);
          // @ts-ignore
          const userInfo = { ...row[0], lastTimeLogin: formattedDate };
          resolve(userInfo);
          //將用戶資料插入session DB
          const insertSession = new UserSession(this.conn);
          insertSession.setSession(userInfo, sessionID, formattedDate, formattedExpiresDate);

        }
        return;
      })
    })

  }



  async createUser(userData) {

    // 註冊新用戶
    return new Promise((resolve, reject) => {

      const { name, department, age, confirmPassword, email, gender, phone } = userData;
      this.conn.connect();
      this.conn.query(userQuery.createUserData, [name, department, email, confirmPassword, phone, gender, age], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
        this.conn.end();
      })
    })
  }

  getSessionData = async (sid) => {

    try {
      const userSession = new UserSession(this.conn);
      const SessionData = await userSession.getSession(sid);

      return SessionData;

    } catch (error) {

      return error
    }

  }

}



class IUserSession {

  /**
   * 
   * @param {object} userInfo 用戶詳細資料
   * @param {string} sessionID 用戶sessionID
   * @param {string} formattedDate 格式化後當前時間 
   * @param {string} formattedExpiresDate 格式化後延後2小時時間 
   */
  setSession(userInfo, sessionID, formattedDate = "", formattedExpiresDate = "") {

  }
  getSession(sid) {

  }
  updateUser(body) {

  }
}

/**
 *  新增、更新SessionID
 */
class UserSession extends IUserSession {
  constructor(db) {
    super();
    this.conn = db;
  }

  setSession = (userInfo, sessionID, formattedDateTime, formattedExpiresDate) => {
    //設置用戶sessionID
    this.conn.query(`UPDATE sessions SET sid='${sessionID}',data='${JSON.stringify(userInfo)}',created_at='${formattedDateTime}',expires='${formattedExpiresDate}' WHERE user_id=?`, [`${userInfo.user_id}`], (err) => {
      if (err) {
        throw new Error("Setting Session Fail.");
      }
      this.conn.end();
    })

  }


  getSession(sid) {
    //獲取用戶的sessionID數據

    return new Promise((resolve, reject) => {
      this.conn.connect();
      this.conn.query(`SELECT data FROM sessions WHERE sid='${sid}'`, (err, row) => {

        if (!row.length) {
          reject({});
          this.conn.end();
          return
        }

        //@ts-ignore
        resolve(row[0].data)
        this.conn.end();
        return
      })
    })

  }


  queryHandler(body) {
    //將請求體自動化成sql參數
    const bodyEntries = new Map(Object.entries(body));
    const arr = [];
    const arrParams = [];
    bodyEntries.forEach((value, key, map) => {
      if (key == 'user_id' || key == 'role_uid') return;
      arr.push(`${key}=?`);
      arrParams.push(value);
    })
    const bodyQuery = arr.toString();
    return [bodyQuery, arrParams];

  }
  updateUser(body) {
    //保存用戶編輯
    const { user_id } = body;
    //自動化參數
    const [bodyQuery, arrParams] = this.queryHandler(body);
    return new Promise((resolve, reject) => {
      this.conn.query(`UPDATE user set ${bodyQuery} where user_id=?`, [...arrParams, user_id], (err, row) => {
        if (err) {
          this.user = { state: 409, msg: '更新失敗' }
          reject(this.user)
        }

        this.user = { state: 200, msg: 'success' }
        resolve(this.user);
      })
    })
  }
}




module.exports = UserRepository;