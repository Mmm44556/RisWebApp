/**
 * @File 引入格式化函數
 * 
 */
const { encodeJson } = require('../utils/formatting');


/**
 * 查詢SessionID後返回結果
 * @typedef {object} QueryResult
 * @property {number} QueryResult.status
 * @property {object} QueryResult.msg
 */


/**
 *  處理驗證請求Controller
 */
class AuthenticationController {
  constructor(authenticationService) {
    this.authenticationService = authenticationService;
  }

  /**
    * 處理用戶登入請求並返回登入結果
    * @return {Promise.<object>} 
    */
  login = async (req, res) => {
    const { session, sessionID } = req;
    const { name, password } = req.body;
    /**
     * @type {QueryResult}
     */
    //  Soeq8Nufz_75bkyV_m6u804fxl2MDgmn
    const result = await this.authenticationService.login({ name, password, session, sessionID });

    let encodeStr = encodeJson(result.msg);

    res.status(result.status).send(encodeStr);
  }

  /**
   * 用戶註冊服務
   * @returns {Promise.<object>}
   */
  register = async (req, res) => {
    const result = await this.authenticationService.register(req.body);
    res.status(result.status).send(result.msg);
  }

  logout = async (req, res) => {
    const {params,session} = req;
    const result = await this.authenticationService.logout(params.id);
    if(result.status==204){
      session.destroy(function (err) {
        console.log(err)
        res.cookie('sid', '', { expires: new Date(0) });
        res.status(result.status).send(result.msg);
      })
    }else{
      res.status(result.status).send(result.msg);
    }
   
  }

  /**
 * 判斷sessionID是否存在，查詢ID返回用戶資料
 * @return {Promise.<object>} 
 */
  authentication = async (req, res) => {
    const user = req.user;
    const sessionData = req.sessionData;
    

    //把用戶資料進行轉碼
    let encodeStr = encodeJson(user);

    res.status(sessionData.status).send(encodeStr);

  }


  /**
   * 查詢ID返回用戶資料
   * @return {Promise.<object>} 
   */
  sessionChecker = async (req, _, next) => {
  
    console.log(req._parsedUrl)
    if (req._parsedUrl.includes('logout') ) {
      _.status(204);
      return;
    }
    /**
     * @type {QueryResult}
     */
    const sessionData = await this.authenticationService.ValidateSessionID(req);
    console.log('-------------')
    req.sessionData = sessionData;
    req.user = sessionData.msg;

    next();

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

module.exports = AuthenticationController;