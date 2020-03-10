/*
* User router
*
*/

//Dependencies
const controller = require ('../controllers/employees.js');
const express = require ('express');
//const auth = require ('../middleware/auth');
const router = express.Router ();

router.post (
  '/employees/create',
  controller.createEmployee
);
router.put (
  '/employees/update',
  controller.updateEmployee
);
router.delete ('/employees/delete/:id', controller.deleteEmployee);
router.get ('/employees/me/:id',controller.getEmployee);
router.get ('/employees/all',  controller.getEmployees); //@TODO add auth
//router.post ('/employees/login', controller.loginUser);
//router.put ('/employees/renew/token', auth, controller.renewToken);

//Exporting the router
module.exports = router;
