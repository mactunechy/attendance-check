/*
 *Employees Controller module
 */

//Dependencies
const Employee = require("../models/Employee");
// const {hash} = require ('../lib/helpers');
// const {confirmSignup} = require('../lib/helpers');
const path = require("path");
const fs = require("fs");
const config = require("../lib/config");
const validator = require("../models/Employee/validator");
const _ = require("lodash");

//Container for the module
const lib = {};

//@NOTE a special controller for creating employees (customers) from the frontend website

//Creating a  new employee
lib.createEmployee = async (req, res, next) => {
  const employeeDetails = req.body;
  const valid = await  validator(employeeDetails);
  // console.log(valid)
  if (valid.error)
    return res.status(400).send({ error: "Missing required fields" });
  Employee.create(employeeDetails)
    .then(async employee => {
      return res.status(200).send(employee);
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send({ error: "failed to create employee" });
    });
};

//Retreving a specific employee
lib.getEmployee = async (req, res, next) => {
  //Required data
  let { id } = req.params;
  id = typeof id == "string" && id.trim().length > 0 ? id.trim() : false;
  if (id) {
    let employee = await Employee.findById(id).catch(() =>
      console.log("failed to get employee")
    );
    if (!employee) return res.sendStatus(404);
    res.status(200).send(employee);
  } else {
    return res.status(400).json({ error: "Missing Required fields" });
  }
};
//Retreving a specific employee
lib.getEmployees = async (req, res, next) => {
  //Required data
  let employees = await Employee.find({}).catch(() =>
    console.log("failed to get employee")
  );
  if (!employees) return res.sendStatus(404);
  res.status(200).send(employees);
};

//Updating  employee
lib.updateEmployee = async (req, res, next) => {
  const employeeDetails = req.body;
  // console.log(employeeDetails)
  if (!employeeDetails && req.params.id)
    return res.status(400).send({ error: "Missing fields to update" });
  // const updateFields = _.omitBy(employeeDetails, _.isEmpty);
  // if (Object.keys(employeeDetails).length === 0)
  //   return res.status(400).send({ error: "Missing fields to update" });
  // console.log("updateFields", updateFields);
  //save the new employee date
  let employee = await Employee.findByIdAndUpdate(
    req.params.id,
    employeeDetails,
    {
      new: true
    }
  );
  if (!employee) return res.sendStatus(404);
  return res.status(200).send(employee);
  console.log(employee)
  
};

//Delete a employee
lib.deleteEmployee = async (req, res, next) => {
  //Required data
  let { id } = req.params;
  id = typeof id == "string" && id.trim().length > 0 ? id.trim() : false;
  if (id) {
    let employee = await Employee.findByIdAndRemove(id).catch(() =>
      console.log("failed to get employee")
    );
    if (!employee) return res.sendStatus(404);
    res.status(200).send(employee);
  } else {
    return res.status(400).json({ error: "Missing Required fields" });
  }
};

//Exportation of the
module.exports = lib;
