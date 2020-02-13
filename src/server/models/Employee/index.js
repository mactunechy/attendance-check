/*
* Employee Model
*/

//Dependencies
const mongoose = require ('mongoose');
//Users Schema
const schema = new mongoose.Schema ({
  date: {
    type: Date,
    minlength: 1,
    required: true,
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  excuse: {
    type: String,
    minlength: 1,
  },
  attended: {
    type: Boolean,
    required: true,
  },
});




//Employee Model
const Employee = mongoose.model ('Employee', schema);

//Exporting the Model
module.exports = Employee;
