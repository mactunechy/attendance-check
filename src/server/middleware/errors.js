/*
 * Middleware for catpchering asyn errors
 *
 */

//Dependencies
const winston = require("winston");
const errorLogger= require("../lib/errorLogger")

module.exports = async function(err, req, res, next) {
  //Log the exception using winston
  winston.error(err.message, err);
  await errorLogger(error);
  res.status(500).send("something went wrong");
};
