/*
 * Attendance Model
 */

//Dependencies
const mongoose = require("mongoose");
//Users Schema
const schema = new mongoose.Schema({
  date: {
    type: Date,
    minlength: 1,
    default: Date.now
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true
  },
  reason: {
    type: String,
    minlength: 1
  },
  attended: {
    type: Boolean,
  }
});

//Attendance Model
const Attendance = mongoose.model("Attendance", schema);

//Exporting the Model
module.exports = Attendance;
