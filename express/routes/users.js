const express = require('express');
let router = express.Router();
let router2 = express.Router();
const UserController = require('../controllers/user.js');
const dbConn = require('../mysql/index');
const UserService = require('../services/Authentication');
const UserRepository = require('../models/user');

const userRepository = new UserRepository(dbConn.conn);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.get('/', userController.sessionChecker);
router.get('/:id', userController.sessionChecker);
router.post('/', userController.login);

router.post('/', userController.register);



module.exports = router;