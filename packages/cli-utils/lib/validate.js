/** @format */

const joi = require("@hapi/joi");
const { exit } = require("./exit");

// proxy to joi for option validation
exports.createSchema = fn => fn(joi);

exports.validate = (obj, schema, cb) => {
  joi.validate(obj, schema, {}, err => {
    if (err) {
      cb(err.message);
      exit(1);
    }
  });
};

exports.validateSync = (obj, schema) => {
  const result = joi.validate(obj, schema);
  if (result.error) {
    throw result.error;
  }
};
