const Joi = require ('joi');

const schema = {
  firstName: Joi.string ().alphanum ().min (3).max (30).required (),
  lastName: Joi.string ().alphanum ().min (3).max (30).required (),
  department: Joi.string ().alphanum ().min (3).max (30).required (),
  company: Joi.string ().alphanum ().min (3).max (30).required (),
  phone: Joi.string ().alphanum ().min (10).max (30).required (),
};

module.exports = function (employee) {
  return Joi.validate (employee, schema);
};