const userModel = require('../models/userModel');
//用戶驗證系統
exports.sessionCheck =async (req, res, next) => {
  console.log(req.session)
  if (req.session.sessionID) {
    try {
      const sessionData = await userModel.getSession(req.session.sessionID)
      res.status(200).json(sessionData)
      return
    } catch (error) {
      res.status(403).json(error)
      return
    }
  
  }
  res.status(403).json('')
  
  
}

exports.login = async (req, res) => {
  try {
    const userInfo = await userModel.getUser(req.body)
    delete userInfo['user_password'];
    req.session.sessionID = req.sessionID;
    //登入後設置sessionID到資料庫
    userModel.setSession(userInfo, req.sessionID);
    req.session.user = userInfo;
    res.status(200).json(userInfo);
  } catch (error) {
    res.status(403).json(error);
  }


}