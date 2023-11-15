const express = require('express');
let router = express.Router();
const UserRepository = require('../models/user.js');
const AuthenticationService = require('../services/Authentication.js');
const AuthenticationController = require('../controllers/authentication.js');


const authenticationService = new AuthenticationService(new UserRepository());
const authenticationController = new AuthenticationController(authenticationService);


router.use((req, res, next) => {
  res.header('Content-Type', 'html/text');
  res.header('Cache-Control', 'no-store');
  next();
});

/**
 * 用戶驗證
 */
router.get('/authentication',authenticationController.sessionChecker, authenticationController.authentication);
router.post('/login', authenticationController.login);
router.post('/register', authenticationController.register);



module.exports = router;