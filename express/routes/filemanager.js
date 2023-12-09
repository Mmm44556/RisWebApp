
const express = require('express');
let router = express.Router();
const multer = require('multer');
const { resolve } = require('path');

const preLoader = multer({
  dest: resolve(__dirname, '../temp/uploads'),
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(txt|json)/)) {
      cb(new TypeError('請上傳.txt或.json檔案!'))
    }
    cb(null, true);
  }
});
const uploader = multer();
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

router.get('/dataList', fileManagerController.browseDocs);
router.post('/dataList?', uploader.single('response'), fileManagerController.addNewDoc);

router.post('/dataList/preProcess?', preLoader.fields([{ name: 'file' }]), fileManagerController.preProcess);

router.delete('/dataList/:id', fileManagerController.deleteDisk);






module.exports = router;