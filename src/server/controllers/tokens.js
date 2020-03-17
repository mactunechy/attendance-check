/*
 Token validation controller
*/

//dependencies
const Token = require("../models/Token");

const lib = {};

lib.verifyToken = async (req, res) => {
  console.log("token",req.params )
  if (!req.params.token)
    return res.status(400).send({ error: "Validation token required" });
  try {
    let token = await Token.findOne({ _id: req.params.token });
    if (!token.verifyToken())
      return res.status(403).send({ error: "Invalid token" });
    return res.status(200).send({ isValid: true });
  } catch (ex) {
    console.log(ex);
    return res
      .status(500)
      .send({ error: "Internal server error, Contact Service provider" });
  }
};

module.exports = lib;
