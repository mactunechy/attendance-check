/*
*Users Controller module
*/

//Dependencies
const Employee = require ('../models/Employee');
const {hash} = require ('../lib/helpers');
// const {confirmSignup} = require('../lib/helpers');
const path = require ('path');
const fs = require ('fs');
const config = require ('../lib/config');
const validator = require ('../models/Employee/validator');
const loginValidator = require ('../models/User/loginValidator');
const _ = require ('lodash');

//Container for the module
const lib = {};

//@NOTE a special controller for creating employees (customers) from the frontend website


//Creating a  new employee
lib.createEmployee = async (req, res, next) => {
  const employeeDetails = req.body;
  const valid = validator (employeeDetails);
  if (valid.error)
    return res.status (400).send ({error: 'Missing required fields'});
  Employee.create (employeeDetails)
    .then (async employee => {
      return res.status (200).send (employee);
    })
    .catch (err => {
      console.log (err);
      return res.status (500).send ({error: 'failed to create employee'});
    });
};




//Retreving a specific employee
lib.getEmpolyee = async (req, res, next) => {
  //Required data
  let {id} = req.params;
  id = typeof id == 'string' && id.trim ().length > 0 ? id.trim () : false;
  if (id) {
    let employee = await Employee.findById (id).catch (() =>
      console.log ('failed to get employee')
    );
    if (!employee) return res.sendStatus (404);
    res.status (200).send (employee);
  } else {
    return res.status (400).json ({error: 'Missing Required fields'});
  }
};
//Retreving a specific user
lib.getUsers = async (req, res, next) => {
  //Required data
  let users = await User.find ({}).catch (() =>
    console.log ('failed to get user')
  );
  if (!users) return res.sendStatus (404);
  const strippedUsers = await users.map (user => {
    delete user.password;
    return user;
  });
  res.status (200).send (strippedUsers);
};

//Updating  user
lib.updateUser = async (req, res, next) => {
  const userDetails = req.body;
  if (!userDetails)
    return res.status (400).send ({error: 'Missing fields to update'});
  const updateFields = _.omitBy (userDetails, _.isEmpty);
  if (Object.keys (userDetails).length === 0)
    return res.status (400).send ({error: 'Missing fields to update'});
  console.log ('updateFields', updateFields);
  //save the new user date
  let user = await User.findByIdAndUpdate (userDetails.id, updateFields, {
    new: true,
  });
  if (!user) return res.sendStatus (404);
  if (req.file)
    await user.setProfileImage (req.file).catch (e => console.log (e));
  _.remove (user, ['password']);
  return res.status (200).send (user);
};

//Delete a user
lib.deleteUser = async (req, res, next) => {
  //Required data
  let {id} = req.params;
  id = typeof id == 'string' && id.trim ().length > 0 ? id.trim () : false;
  if (id) {
    let user = await User.findByIdAndRemove (id).catch (() =>
      console.log ('failed to get user')
    );
    if (!user) return res.sendStatus (404);

    res.status (200).send (user);
  } else {
    return res.status (400).json ({error: 'Missing Required fields'});
  }
};

//loging use in
lib.loginUser = async (req, res) => {
  let credentials = req.body;
  let valid = loginValidator (credentials);
  if (valid.error)
    return res.status (400).send ({error: 'Missing required fields'});
  //lookup the user
  let user = await User.findOne ({email: credentials.email}).catch (() =>
    console.log ('failed to find user')
  );
  if (!user)
    return res
      .status (400)
      .send ({error: 'Incorrect user or email was entered'});
  let token = await user.authUser (credentials).catch (e => console.log (e));
  token.user = user;
  if (!token)
    return res
      .status (400)
      .send ({error: 'Incorrect user or email was entered'});
  return res.status (200).send (token);
};

lib.renewToken = async function (req, res) {
  let {id} = req.token;
  if (!id) return res.sendStatus (400);
  User.findOne ({_id: id})
    .then (user => {
      user
        .renewToken ()
        .then (token => {
          res.status (200).send (token);
        })
        .catch (ex => res.sendStatus (500));
    })
    .catch (ex => res.sendStatus (404));
};

//Exportation of the
module.exports = lib;
