/*
 * Exam Model
 */

//Dependencies
const mongoose = require("mongoose");
const { pricing } = require("../../lib/config");
//Users Schema
const schema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  expiredAt: {
    type: Date
  },
  isValid: {
    type: Boolean,
    default: true
  }
});

//Token can only be checked for validity once
schema.methods.verify = function() {
  const isValid = this.isValid;
  if (this.isValid) {
    this.isValid = false;
    this.expiredAt = Date.now();
    this.save();
  }
  return isValid;
};

//User Model
const Token = mongoose.model("Token", schema);

//Exporting the Model
module.exports = Token;
