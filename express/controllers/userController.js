const userModel = require('../models/userModel');

exports.sessionCheck = (req, res, next) => {
  if (req.session.sessionID) {
    res.status(200).send(req.session.name);
    return
  }
  next()
}

exports.login = async (req, res) => {
  // const { email, password, keeping } = req.body;
  const userInfo =await userModel.getUser(req.body)
  console.log(userInfo)
  res.json(userInfo);
  // req.session.sessionID = req.sessionID;
  // req.session.name = row[0].user_name;
  // res.status(200).send('success');
}