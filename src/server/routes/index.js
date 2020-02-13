/*
* Root router
*/

//Dependencies
const users = require ('./users');
const ping = require ('./ping');
const logger = require ('../middleware/logger');
const attendance = require ('./attendance');


//root router function
const rootRouter = function (app) {
  app.use ('/api', logger, users);
  app.use ('/api', logger, attendance);
  app.use ('/api', ping);
};

module.exports = rootRouter;
