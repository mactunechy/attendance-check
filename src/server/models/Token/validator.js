const Joi = require("joi");

const schema = {
  createdAt: Joi.string(),
  expiredAt: Joi.string(),
  isValid: Joi.boolean()
};

module.exports = function(token) {
  return Joi.validate(token, schema);
};
