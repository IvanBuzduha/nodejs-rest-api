const Joi = require("joi");

const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.number().greater(13).required(),
});

const updateContactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.number().greater(13).optional(),
});

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj);

  if (error) {
    const [{ message }] = error.details;

    return next({
      status: 400,
      message: `Not valid data`,
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
