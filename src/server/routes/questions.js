/*
* Qusetions router
*
*/

//Dependencies
const controller = require ('../controllers/attendance');
const express = require ('express');
const auth = require ('../middleware/auth');
const router = express.Router ();
const {upload} = require ('../lib/fileUploader');

router.post (
  '/attendance/create',
  controller.create
);
router.post ('/question/mark/:id', controller.mark);
router.put (
  '/attendance/update/:id',
  controller.updateAttendance
);
router.delete (
  '/attendance/delete/:id',
  controller.deleteAttendance
);
router.get ('/attendance/:id', controller.getAttendance)
router.get ('/attendance/all', controller.getAttendances; //@TODO add auth

//Exporting the router
module.exports = router;
