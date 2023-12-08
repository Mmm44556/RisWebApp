
const express = require('express');
let router = express.Router();
const multer = require('multer');
const { resolve } = require('path');

const uploader = multer({ dest: resolve(__dirname, '../temp/uploads') });
const FilesRepository = require('../models/files');
const FileManagerService = require('../services/FileManager');
const FileManagerController = require('../controllers/filemanager');

const fileManagerService = new FileManagerService(new FilesRepository());
const fileManagerController = new FileManagerController(fileManagerService);

// const UserRepository = require('../models/user');
// const EmployeeService = require('../services/Employees');
// const EmployeeController = require('../controllers/employees');
// const AuthenticationService = require('../services/Authentication.js');
// const AuthenticationController = require('../controllers/authentication.js');


/**
 * 用戶資料BREAD
 */
// router.use((req, res, next) => {
//   res.header('Content-Type', 'application/json');
//   res.header('Cache-Control', 'no-store');

//   next();
// });

router.post('/upload', uploader.fields([{ name: 'file' }, { name: 'private' }]), fileManagerController.addNewDoc);







module.exports = router;