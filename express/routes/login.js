const express = require('express');
let router = express.Router();
const userController = require('../controllers/userController');
router.post('/', userController.sessionCheck, userController.login)



module.exports = router;