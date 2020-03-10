/*
 * Root router
 */

//Dependencies
const employees = require("./employees");
const ping = require("./ping");
const logger = require("../middleware/logger");
const attendance = require("./attendance");
const tokens = require("./tokens");

//root router function
const rootRouter = function(app) {
  app.use("/api", logger, employees);
  app.use("/api", logger, attendance);
  app.use("/api", ping);
  app.use("/api", tokens);
};

module.exports = rootRouter;
