const express = require('express');
let router = express.Router();
const userController = require('../controllers/userController');
//登入路由
router.get('/', userController.sessionCheck);
router.post('/', userController.login);




module.exports = router;