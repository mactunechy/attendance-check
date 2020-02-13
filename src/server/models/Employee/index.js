/*
* User model
*/

//Dependencies
const mongoose = require ('mongoose');


//Users Schema
const userSchema = new mongoose.Schema ({
  firstName: {
    type: String,
    minlength: 1,
    maxlength: 255,
    required: true,
  },
  lastName: {
    type: String,
    minlength: 1,
    maxlength: 255,
    required: true,
  },
  department: {
    type: String,
    required: true,
    unique: true,
  },
    company: {
    type: String,
    required: true,
    unique: true,
  },
  isAdmin: {
    type: Boolean,
    defaulte : false
  },
});

//User Model
const Employee = mongoose.model ('Employee', userSchema);

//Exporting the Model
module.exports = Employee;
