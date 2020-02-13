/*
* Root router
*/

//Dependencies
const employees = require ('./employees');
const ping = require ('./ping');
const logger = require ('../middleware/logger');
const attendance = require ('./attendance');


//root router function
const rootRouter = function (app) {
  app.use ('/api', logger, employees);
  app.use ('/api', logger, attendance);
  app.use ('/api', ping);
};

module.exports = rootRouter;
