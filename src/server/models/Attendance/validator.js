const Joi = require("joi");

const schema = {
  date: Joi.string()
    .min(3),
  reason: Joi.string()
    .min(3),
  attended: Joi.boolean().required(),
  employee: Joi.string()
    .min(3)
    .required()
};

module.exports = function(question) {
  return Joi.validate(question, schema);
};
