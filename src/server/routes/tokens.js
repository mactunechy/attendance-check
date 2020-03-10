/*
 * Ping router
 */

//Depnendincies
const express = require("express");
const controller = require("../controllers/tokens");
const router = express.Router();

router.get("/tokens/verify-token/:token", controller.verifyToken);

//Exporting the router
module.exports = router;
