/**
 * @import 用戶SQL語法查詢字串
 */
const userQuery = require('../sql_query/user.constant');

/**
 * @File 引入格式化函數
 */
const { formatDateTime } = require('../utils/formatting');

const dbConn = require('../mysql/index');
/**
* 註冊用戶資料
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

  connectDB() {
    return this.conn = dbConn;
  }
  /**
   * 獲取用戶資料
   * @param {string} username 
   * @param {string} sessionID 
   * @returns {Promise.<object>} 查詢用戶資料結果
   */
  async getUser(username, sessionID) {
  }

  /**
 * 註冊新用戶
 *
 * @param {UserData} userData 用戶數據對象
 * @return {Promise.<object>} 返回註冊結果
 */
  async createUser(userData) {
  }

  /**
 * 更新用戶個人資料
 * @param {object} userInfo 用戶所需更新的資料
 * @param {string} sessionID 用戶sessionID
 * @returns {Promise.<object>} 更新結果物件
 */
  async updateUser(userInfo, sessionID){
  }

  /**
 * 根據已有的sessionID去查詢用戶資料
 * @param {string} sid 用戶sessionID 
 * @returns {Promise.<object>} 用戶詳細物件
 */
  async getSessionData(sid){

  }
}


/**
 * 用戶資料庫
 * @extends IUserRepository
 */
class UserRepository extends IUserRepository {

  constructor() {
    super();
    this.connectDB();
  }

  /**
   * 登入服務
   * @param {string} username 用戶名稱 
   * @param {string} sessionID 用戶sessionID
   * @return {Promise.<object>} 用戶物件資料
   */
  getUser = async (username, sessionID) => {
    // 與資料庫交互取得使用者
    return new Promise((resolve, reject) => {
      //查詢用戶登入是否存在
      this.conn.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(userQuery.getUserData, [username], (err, row) => {
          if (err) {
            reject(err);
            conn.release();
          } else {
            //設置sessionID登入、過期時間
            let currentDate = new Date();
            let { formattedDate, formattedExpiresDate } = formatDateTime(currentDate);
            // @ts-ignore
            const userInfo = { ...row[0], lastTimeLogin: formattedDate };
            resolve(userInfo);
            //登入後將用戶資料插入session DB
            const insertSession = new UserSession(this.conn);
            insertSession.setSession(userInfo, sessionID, formattedDate, formattedExpiresDate);
          }
          return;
        })
      })

    })
  }


  createUser = async (userData) => {

    return new Promise((resolve, reject) => {

      const { name, department, age, confirmPassword, email, gender, phone } = userData;
      this.conn.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(userQuery.createUserData, [name, department, email, confirmPassword, phone, gender, age], (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(true);
          }
          conn.release();
        })
      })

    })
  }


  updateUser = async (userInfo, updateUserData, sessionID) => {
    try {
      const userSession = new UserSession(this.conn);
      const result = await userSession.updateSession(userInfo);
      
      userSession.setSession(updateUserData, sessionID);
      return result;
    } catch (error) {
      return error;
    }
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
   * 登入後設置用戶sessionID數據
   * @param {object} userInfo 用戶詳細資料
   * @param {string} sessionID 用戶sessionID
   * @param {string} formattedDate 格式化後當前時間 
   * @param {string} formattedExpiresDate 格式化後延後2小時時間 
   */
  setSession(userInfo, sessionID, formattedDate = "", formattedExpiresDate = "") {
  }

  /**
   * 根據已有的sessionID獲取用戶的數據
   * @param {string} sid 
   */
  getSession(sid) {

  }

  /**
   * 更新用戶資料
 * @param {object} userInfo
 */
  updateSession(userInfo) {

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

  setSession = (userInfo, sessionID, formattedDateTime = "", formattedExpiresDate = "") => {

    let queryProps;
    let queryParams;
    if (formattedDateTime && formattedExpiresDate) {
      //登入動作
      queryProps = `sid=?,data=?,created_at=?,expires=?`;
      queryParams = [sessionID, JSON.stringify(userInfo), formattedDateTime, formattedExpiresDate];
    } else {
      //更新動作
      queryProps = `sid=?,data=?`;
      queryParams = [sessionID, JSON.stringify(userInfo)];
    }

    this.conn.getConnection((err, conn) => {
      if (err) throw err;
      conn.query(`UPDATE sessions SET ${queryProps} WHERE user_id=?`, [...queryParams, userInfo.user_id], (err) => {
        if (err) {
          throw new Error("Setting Session Fail.");
        }
        conn.release();
      })
    })


  }


  getSession = (sid) => {
    return new Promise((resolve, reject) => {
      this.conn.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(`SELECT data FROM sessions WHERE sid='${sid}'`, (err, row) => {
          if (!row.length) {
            reject({});
            conn.release();
            return
          }
          //@ts-ignore
          resolve(row[0].data);
          conn.release();
          return
        })
      })

    })

  }


  updateSession = async (userInfo) => {

    return new Promise((resolve, reject) => {
      this.conn.getConnection((err, conn) => {

        if (err) throw err;
        //保存用戶編輯
        const { user_id } = userInfo;
        //自動化參數
        const { queryProps, queryParams } = this.queryHandler(userInfo);

        conn.query(`UPDATE user set ${queryProps} where user_id=?`, [...queryParams, user_id], (err, row) => {
          if (err) {
            reject({ status: 409, msg: 'Update error' });

            conn.release();
            return
          }

          resolve({ status: 200, msg: 'Update success' });
          conn.release();
        })

      })

    })
  }


  queryHandler(body) {
    //將請求體自動化成sql參數
    const bodyEntries = new Map(Object.entries(body));
    const arr = [];
    const queryParams = [];
    bodyEntries.forEach((value, key, map) => {
      if (key == 'user_id' || key == 'role_uid') return;
      arr.push(`${key}=?`);
      queryParams.push(value);
    })
    const queryProps = arr.toString();
    return { queryProps, queryParams };

  }
}




module.exports = UserRepository;