const userModel = require('../models/userModel');
const { formatDateTime, encodeJson } = require('./formatting');
//用戶驗證系統
exports.sessionCheck = async (req, res, next) => {
  if (req.session.sessionID) {
    try {
      const sessionData = await userModel.getSession(req.session.sessionID);
      //把用戶資料加密編碼
      let encodeStr = encodeJson(sessionData)

      res.status(200).send(encodeStr)
      return
    } catch (error) {
      res.status(403).json(error)
      return
    }

  }
  res.redirect(401, 'http://localhost:3000/login')


}

exports.login = async (req, res) => {
  try {
    const userInfo = await userModel.getUser(req.body)
    delete userInfo['user_password'];
    req.session.sessionID = req.sessionID;
    //登入後設置sessionID到資料庫
    let currentDate = new Date();
    //設置登入時間
    let formattedDateTime = formatDateTime(currentDate);
    userInfo.lastTimeLogin = formattedDateTime;
    userModel.setSession(userInfo, req.sessionID, formattedDateTime);
    req.session.user = userInfo;
    const encodeStr = encodeJson(userInfo);
    res.status(200).send(encodeStr);
  } catch (error) {
    res.status(403).json(error);
  }
}

exports.register = async (req, res) => {
  try {
    const registerState = await userModel.setUser(req.body);
    res.status(registerState.state).send(registerState.msg)
    return
  } catch (error) {
    res.status(error.state).send(error.msg)
    return
  }
}