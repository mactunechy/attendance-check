/**
 * * Attendances Controllers 
 */

//Dependencies
const Attendance = require ('../models/Attendance');
const validator = require ('../models/Attendance/validator');
const Topic = require ('../models/Topic');
//container of the module
const lib = {};

lib.create = (req, res) => {
  const details = req.body;
  const valid = validator (details);
  console.log ('valid', valid);
  if (valid.error)
    return res.status (400).send ({error: 'Missing required fields'});
  Attendance.create (details)
    .then (async attendance => {
      return res.status (200).send (attendance);
    })
    .catch (error => {
      console.log ('error', error);
      return sendStatus (500);
    });
};

//Retreving a specific user
lib.getAttendance = async (req, res) => {
  //Required data
  let {id} = req.params;
  id = typeof id == 'string' && id.trim ().length > 0 ? id.trim () : false;

  if (!id) return res.status (400).json ({error: 'Missing Required fields'});

  let attendance = await Attendance.findById (id)
  .populate('employee')
  .exec()
    .catch (() => console.log ('failed to get Attendance'));

  if (!attendance) return res.sendStatus (404);
  res.status (200).send (attendance);
};

//Retreving a specific user
lib.getAttendances = async (req, res) => {
  //Required data
  let attendances = await Attendance.find ({})
    .catch (() => console.log ('failed to get attendance'));
  if (!attendances) return res.sendStatus (404);

  res.status (200).send (attendances);
};

//Updating  Attendance
lib.updateAttendances = async (req, res, next) => {
  const details = req.body;
  const {id} = req.params;
  if (!id) return res.status (400).send ({error: 'Missing required fields'});
  const valid = validator (details);
  if (valid.error)
    return res.status (400).send ({error: 'Invalid data format'});
  //save the new user date
  let attendance = await Attendance.findByIdAndUpdate (id, details, {new: true});
  if (!attendance) return res.sendStatus (404);
  return res.status (200).send (attendance);
};

//Delete a Attendance
lib.deleteAttendance = async (req, res, next) => {
  //Required data
  let {id} = req.params;
  id = typeof id == 'string' && id.trim ().length > 0 ? id.trim () : false;
  if (id) {
    let attendance = await Attendance.findByIdAndRemove (id).catch (() =>
      console.log ('failed to get attendance')
    );
    if (!attendance) return res.sendStatus (404);

    res.status (200).send (attendance);
  } else {
    return res.status (400).json ({error: 'Missing Required fields'});
  }
};

//Exportations of tge module
module.exports = lib;
