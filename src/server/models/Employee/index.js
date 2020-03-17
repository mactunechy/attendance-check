/*
 * User model
 */

//Dependencies
const mongoose = require("mongoose");

//Users Schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minlength: 1,
    maxlength: 255,
    required: true
  },
  lastName: {
    type: String,
    minlength: 1,
    maxlength: 255
  },
  department: {
    type: String
  },
  company: {
    type: String
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isActive : {
    type:Boolean,
    default:true
  },
  phone:{
    type:"string"
  }
});

//User Model
const Employee = mongoose.model("Employee", userSchema);

//Exporting the Model
module.exports = Employee;
