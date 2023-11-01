const express = require('express');
let router = express.Router();
const userController = require('../controllers/userController');

router.put('/', userController.user);
router.patch('/', userController.user);


module.exports = router;