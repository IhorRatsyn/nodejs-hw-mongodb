const Joi = require('joi');

const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().optional(),
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.string().optional().min(3).max(20),
});

const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).optional(),
  phoneNumber: Joi.string().min(3).max(20).optional(),
  email: Joi.string().email().optional(),
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.string().optional().min(3).max(20),
}).or('name', 'phoneNumber', 'email', 'isFavourite', 'contactType');

module.exports = {
  createContactSchema,
  updateContactSchema,
};
