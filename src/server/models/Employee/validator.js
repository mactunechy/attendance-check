const Joi = require ('joi');

const schema = {
  firstName: Joi.string ().required (),
  lastName: Joi.string ().required (),
  department: Joi.string ().required (),
  company: Joi.string ().required (),
  phone: Joi.string ().required (),
};

module.exports = function (employee) {
  return Joi.validate (employee, schema);
};

// 5e6ff546530ab20924040750
// 5e6ff5a9530ab20924040751