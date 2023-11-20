
const express = require('express');
let router = express.Router();

const UserRepository = require('../models/user');
const EmployeeService = require('../services/Employees')
const EmployeeController = require('../controllers/employees');
const AuthenticationService = require('../services/Authentication.js');
const AuthenticationController = require('../controllers/authentication.js');


const authenticationService = new AuthenticationService(new UserRepository());
const authenticationController = new AuthenticationController(authenticationService);
const employeeService = new EmployeeService(new UserRepository());
const employeeController = new EmployeeController(employeeService);

/**
 * 用戶資料BREAD
 */
router.use((req, res, next) => {
  res.header('Content-Type', 'application/json');
  res.header('Cache-Control', 'no-store');
  next();
});
router.use(authenticationController.sessionChecker);
router.get('/employee/search?', employeeController.browse);
router.get('/employee/:id', employeeController.read);
router.put('/employee/:id',employeeController.update);
router.patch('/employee/:id', employeeController.edit);
router.post('/employee/:id', employeeController.add);
router.delete('/employee/id', employeeController.delete);







module.exports = router;