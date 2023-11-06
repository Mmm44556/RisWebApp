const express = require('express');
let router = express.Router();
const userController = require('../controllers/userController');
//註冊路由
router.post('/', userController.register);



module.exports = router;