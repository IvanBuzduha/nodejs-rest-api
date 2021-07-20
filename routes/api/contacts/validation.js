const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require('mongoose');

const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().optional(),
});

const updateContactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
   favorite: Joi.boolean().optional(),
}).min(1);
idValidationSchema = Joi.object({
  id: Joi.objectId(),
});
const updateStatusContactSchema = Joi.object({
  favorite: Joi.boolean(),
});

const validate = (schema, obj, next) => {
  const { err } = schema.validate(obj);

  if (err) {
    const [{ message }] = err.details;

    return next({
      status: 400,
      // message: `Not valid data`,
      message: message
    });
  }
  next();
};
module.exports.createContact = (req, res, next) => {
  return validate(createContactSchema, req.body, next);
};
module.exports.updateContact = (req, res, next) => {
  return validate(updateContactSchema, req.body, next);
};
module.exports.updateStatusContact = (req, res, next) => {
  return validate(updateStatusContactSchema, req.body, next);
};
module.exports.idValidation = (req, res, next) => {
  return validate(idValidationSchema, req.body, next);
};


