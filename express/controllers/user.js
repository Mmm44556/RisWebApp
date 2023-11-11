/**
 * @File 引入格式化函數
 */
const { formatDateTime, encodeJson } = require('../utils/formatting');


/**
 * 查詢SessionID後返回結果
 * @typedef {object} QueryResult
 * @property {number} QueryResult.status
 * @property {object} QueryResult.data
 */


// ----用戶請求模塊---- //
class UserController {
  constructor(userService) {
    this._userService = userService;
  }

  /**
    * 處理用戶登入請求並返回登入結果
    * @return {Promise.<object>} 
    */
  login = async (req, res) => {
    res.header('Cache-Control', 'no-store');
    res.header('Content-Type', 'application/json');
    const { session, sessionID } = req;
    const { name, password } = req.body;
    /**
     * @type {QueryResult}
     */
    const result = await this._userService.login({ name, password, session, sessionID });

    let encodeStr = encodeJson(result);
    res.status(result.status).send(encodeStr);
  }

  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @returns {Promise}
   */
  async register(req, res) {
    // 從 req 取得輸入
    // 呼叫 UserService 建立使用者 
    // 將結果回傳至 resp
  }


  /**
   * 判斷sessionID是否存在，查詢ID返回用戶資料
   * @return {Promise.<object>} 
   */
  sessionChecker = async (req, res) => {
    res.header('Cache-Control', 'no-store');
    res.header('Content-Type', 'html/text');

    /**
     * @type {QueryResult}
     */
    const sessionData = await this._userService.ValidateSessionID(req);
    //把用戶資料進行轉碼
    let encodeStr = encodeJson(sessionData);
    res.status(sessionData.status).send(encodeStr);
  }

}
//用戶驗證系統
// const sessionCheck = async (req, res, next) => {
//   if (req.session.sessionID) {
//     try {
//       const sessionData = await userModel.getSession(req.session.sessionID);
//       //把用戶資料進行轉碼
//       let encodeStr = encodeJson(sessionData)

//       res.status(200).send(encodeStr)
//       return
//     } catch (error) {
//       res.status(403).json(error)
//       return
//     }

//   }
//   res.redirect(401, 'http://localhost:3000/login')


// }

// const login = async (req, res) => {
//   try {


//     const userInfo = await userService.getUser(req.body)
//     req.session.sessionID = req.sessionID;
//     //登入後設置sessionID到資料庫
//     let currentDate = new Date();
//     //設置登入時間
//     let formattedDateTime = formatDateTime(currentDate);
//     userInfo.lastTimeLogin = formattedDateTime;
//     userModel.setSession(userInfo, req.sessionID, formattedDateTime);
//     req.session.user = userInfo;
//     const encodeStr = encodeJson(userInfo);
//     res.status(200).send(encodeStr);
//   } catch (error) {
//     res.status(403).json(error);
//   }
// }

// cosnt register = async (req, res) => {
//   try {
//     const registerState = await userModel.setUser(req.body);
//     res.status(registerState.state).send(registerState.msg)
//     return
//   } catch (error) {
//     res.status(error.state).send(error.msg)
//     return
//   }
// }

// const user = async (req, res) => {

//   try {
//     const userState = await userModel.updateUser(req.body);
//     const sessionData = await userModel.getSession(req.session.sessionID);
//     const updatedSessionData = { ...JSON.parse(sessionData.data), ...req.body };
//     userModel.setSession(updatedSessionData, req.sessionID);
//     res.status(userState.state).send(userState);
//   } catch (error) {
//     console.log(error)
//   }



// }

module.exports = UserController;